import { NextResponse } from "next/server";
import { z } from "zod";
import { getPool } from "../../../../lib/db";
import { issueScanToken } from "../../../../lib/scan-token";
import { isRateLimited, getClientIp } from "../../../../lib/rate-limit";

/**
 * Scanner V2 gate: authorize spend, no email required.
 *
 * Replaces /api/scan/start. That route captured the lead BEFORE the scan ran,
 * because the email gate came first. It no longer does: the scan now runs on
 * page load so the visitor gets a real result before we ask for anything, and
 * email capture moved to /api/capture-email, called once they choose to
 * unlock. See docs/standards/SCANNER_V2_SPEC.md §4.7 ("instant unlock, no
 * inbox round-trip").
 *
 * That reordering removes the one thing the old gate protected: the daily
 * spend cap can no longer count completed leads, because a visitor who
 * abandons after the preview still cost us a Details call and a backend scan.
 * So this route inserts its own tracking row (source='scan_started', no
 * email) purely so the cap counts every scan we paid for, not just the ones
 * that finished the funnel.
 */

const authorizeSchema = z.object({
  placeId: z.string().trim().min(4).max(255),
  businessName: z.string().max(300).optional(),
});

// Generous relative to the old gate's 8/hr: this now fires once per page
// load automatically instead of after two deliberate clicks. The daily
// global cap below is the real cost backstop; this is just an abuse
// tripwire for one IP hammering the endpoint directly.
const RATE_LIMIT_MAX = 20;

/**
 * Same ceiling and reasoning as the old /api/scan/start: the Google quota
 * can't be capped on a free-trial billing account, so the cap lives here.
 * Counts every row with a place_id today, regardless of source, because a
 * 'scan_started' row already represents spent money even if the visitor
 * never reaches the gate.
 */
const DAILY_SCAN_CAP = Number(process.env.DAILY_SCAN_CAP ?? 100);

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(`scan-authorize:${ip}`, RATE_LIMIT_MAX)) {
      return NextResponse.json(
        { error: "Too many scans from this connection. Try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = authorizeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid request." },
        { status: 400 }
      );
    }

    const { placeId, businessName } = parsed.data;

    try {
      const pool = getPool();

      const { rows } = await pool.query(
        `SELECT count(*)::int AS n FROM leads
          WHERE place_id IS NOT NULL AND created_at >= CURRENT_DATE`
      );
      if (rows[0]?.n >= DAILY_SCAN_CAP) {
        console.error(`scan/authorize: daily cap of ${DAILY_SCAN_CAP} reached`);
        return NextResponse.json(
          { error: "We've hit today's scan limit. Try again tomorrow." },
          { status: 429 }
        );
      }

      // Tracking row only, no email yet. If the visitor unlocks later,
      // /api/capture-email inserts the real lead row with their email and a
      // snapshot of the score, this row is not updated in place, it just has
      // to exist so the cap query above sees it.
      await pool.query(
        `INSERT INTO leads (source, source_page, place_id, business_name)
         VALUES ($1, $2, $3, $4)`,
        ["scan_started", "/audit", placeId, businessName ?? null]
      );
    } catch (dbError) {
      console.error("scan/authorize: failed to insert tracking row", dbError);
      return NextResponse.json({ error: "Could not start your scan. Try again." }, { status: 500 });
    }

    return NextResponse.json({ token: issueScanToken(placeId) });
  } catch (error) {
    console.error("scan/authorize: unexpected error", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
