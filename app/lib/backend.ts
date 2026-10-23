/**
 * Server-side hand-off of leads to the Simpl backend (Cloud Run), which keeps
 * the CRM-facing copy and, when Matt switches it on, creates the contact and
 * the Outreach deal (Simpl.master/backend/contact_leads.py, ghl_contact_sync.py,
 * ghl_scan_sync.py). The website's own DB row and emails never depend on it:
 * this never throws, and gives up after a few seconds.
 *
 * SIMPL_API_URL overrides the backend for local testing.
 */
export const SIMPL_API =
  process.env.SIMPL_API_URL || process.env.NEXT_PUBLIC_SIMPL_API || "https://simpl-506452749067.us-east1.run.app";

const TIMEOUT_MS = 4000;

export async function forwardLead(
  path: "/lead/contact" | "/lead/scan",
  payload: Record<string, unknown>,
  meta: { ip?: string; userAgent?: string | null } = {}
): Promise<boolean> {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    // The backend rate-limits per visitor, so pass the visitor's IP, not ours.
    if (meta.ip && meta.ip !== "unknown") headers["X-Forwarded-For"] = meta.ip;
    if (meta.userAgent) headers["User-Agent"] = meta.userAgent.slice(0, 300);
    const res = await fetch(`${SIMPL_API}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    if (!res.ok) console.error(`lead forward ${path}: backend answered ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error(`lead forward ${path}: ${err instanceof Error ? err.name : "error"}`);
    return false;
  }
}
