import { NextResponse } from "next/server";
import { z } from "zod";
import { getPool } from "../../../../lib/db";
import { issueScanToken } from "../../../../lib/scan-token";
import { isRateLimited, getClientIp } from "../../../../lib/rate-limit";

/**
 * The gate. Capture the lead, then hand back permission to spend.
 *
 * Everything expensive lives behind this: Places Details (~$17/1000), Places
 * Photos (~$7/1000) and the backend scan. Before this route existed those ran
 * for any anonymous visitor, which meant our costs scaled with traffic while our
 * pipeline didn't. Now a scan can only happen for someone who told us who they
 * are, so every dollar of Places spend buys a lead we can actually email.
 *
 * The token is a spend guard, not proof of identity — we never verify the
 * address. A fake email still burns one scan, which is an acceptable floor: the
 * alternative (verify first) costs us the visitor at the exact moment they're
 * most curious.
 */

const startSchema = z.object({
  placeId: z.string().trim().min(4).max(255),
  email: z.string().trim().email("Enter a valid email address."),
  relationship: z.enum(["owner", "works_with", "other"]).optional(),
  optIn: z.boolean().optional(),
  businessName: z.string().max(300).optional(),
});

// Deliberately tight. A human scans a handful of businesses; anything past this
// from one IP is someone farming reports.
const RATE_LIMIT_MAX = 8;

/**
 * Hard global ceiling on scans per day.
 *
 * This is the Google quota cap we cannot set. Free-trial billing accounts can't
 * edit API quotas, so the ceiling has to live here instead — and it can't live in
 * the in-memory rate limiter either, because every Vercel instance keeps its own
 * counter and cold starts wipe them. Postgres is the only thing all instances
 * agree on.
 *
 * At ~$0.055 a scan (Details + 4 photos + map), 100/day caps worst-case spend
 * around $5.50/day no matter how many instances are running or who is attacking.
 *
 * Raise it when real traffic justifies it. Hitting this pre-launch would be a
 * good problem and a one-line change.
 */
const DAILY_SCAN_CAP = Number(process.env.DAILY_SCAN_CAP ?? 100);

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(`scan-start:${ip}`, RATE_LIMIT_MAX)) {
      return NextResponse.json(
        { error: "Too many scans from this connection. Try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = startSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid request." },
        { status: 400 }
      );
    }

    const { placeId, email, relationship, optIn, businessName } = parsed.data;

    try {
      const pool = getPool();

      // The global ceiling, checked before anything is spent. One COUNT on the
      // gate (not per keystroke), so it costs nothing that matters.
      const { rows } = await pool.query(
        `SELECT count(*)::int AS n FROM leads
          WHERE source = 'scan_gate' AND created_at >= CURRENT_DATE`
      );
      if (rows[0]?.n >= DAILY_SCAN_CAP) {
        console.error(`scan/start: daily cap of ${DAILY_SCAN_CAP} reached`);
        return NextResponse.json(
          { error: "We've hit today's scan limit. Try again tomorrow." },
          { status: 429 }
        );
      }

      // Save the lead. If this fails we have not spent anything yet, so refusing
      // is cheap and honest — the whole point of the gate is that we never pay
      // Google for a visitor we failed to capture.
      // No scan_url here on purpose: at gate time we have the name (free, from
      // the autocomplete prediction) but not the website, which only arrives from
      // Places Details after this token is issued.
      await pool.query(
        `INSERT INTO leads (email, source, source_page, place_id, relationship, opt_in, business_name)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [email, "scan_gate", "/audit", placeId, relationship ?? null, optIn ?? null, businessName ?? null]
      );
    } catch (dbError) {
      console.error("scan/start: failed to insert lead", dbError);
      return NextResponse.json({ error: "Could not start your scan. Try again." }, { status: 500 });
    }

    return NextResponse.json({ token: issueScanToken(placeId) });
  } catch (error) {
    console.error("scan/start: unexpected error", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
