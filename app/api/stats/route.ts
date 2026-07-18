import { NextResponse } from "next/server";
import { getPool } from "../../../lib/db";

/**
 * Real counts for the homepage trust strip, not a formula pretending to be
 * one. The old version generated "sites scanned" from a growth formula
 * (day-of-year * 7 + hour * 3) and presented it as a real number — that's
 * exactly the fabricated-statistic problem this whole night was about
 * fixing on the backend, just on the frontend instead.
 *
 * Counts every `leads` row with a place_id, same definition the daily spend
 * cap in /api/scan/authorize already uses: every scan actually run, whether
 * or not the visitor finished the gate.
 */
export async function GET() {
  try {
    const pool = getPool();
    const { rows } = await pool.query(
      `SELECT count(*)::int AS n FROM leads WHERE place_id IS NOT NULL`
    );
    return NextResponse.json({ scans: rows[0]?.n ?? 0 }, { headers: { "Cache-Control": "public, max-age=300" } });
  } catch (error) {
    console.error("stats: failed to count scans", error);
    // Zero, not a fabricated fallback number, if the count genuinely fails.
    return NextResponse.json({ scans: 0 }, { status: 200 });
  }
}
