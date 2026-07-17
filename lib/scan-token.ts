import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Short-lived signed permission to run one scan.
 *
 * Why this exists: the expensive endpoints (Places Details, Places Photo, and
 * the backend scan) cost real money per call — Details alone is ~$17/1000. The
 * email gate in the UI does nothing to protect them, because anyone can read
 * this repo (it's public), find the route, and call it directly. So the gate is
 * enforced here instead: /api/scan/start captures the lead and hands back a
 * token, and the metered routes refuse to run without a valid one.
 *
 * Stateless by design — an HMAC over placeId + expiry. No DB round-trip on the
 * hot path, nothing to clean up, and it can't be forged without the secret.
 *
 * This is a spend guard, not an authentication system. It proves "someone went
 * through the gate for this placeId in the last 10 minutes". It deliberately
 * does not prove who they are: we never verified the email, and pretending
 * otherwise would be security theatre of a different kind.
 */

const TTL_MS = 10 * 60 * 1000;

function getSecret(): string {
  const s = process.env.SCAN_TOKEN_SECRET;
  // Failing loudly beats falling back to a default secret, which would make
  // every token forgeable by anyone who read this file.
  if (!s || s.length < 32) {
    throw new Error("SCAN_TOKEN_SECRET is missing or shorter than 32 chars");
  }
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function issueScanToken(placeId: string): string {
  const exp = Date.now() + TTL_MS;
  return `${exp}.${sign(`${placeId}.${exp}`)}`;
}

/** Bound to the placeId, so a token minted for one business can't scan another. */
export function verifyScanToken(token: string | null, placeId: string): boolean {
  if (!token) return false;

  const dot = token.indexOf(".");
  if (dot < 1) return false;

  const expStr = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;

  const expected = sign(`${placeId}.${exp}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  // timingSafeEqual throws on length mismatch, so check length first — and do it
  // without short-circuiting on content.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
