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

    // Save the lead first. If this fails we have not spent anything yet, so
    // refusing is cheap and honest — the whole point of the gate is that we do
    // not pay Google for visitors we failed to capture.
    try {
      const pool = getPool();
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
