// Simple in-memory rate limiter, keyed by IP. Fine for a single-instance
// deployment without Redis. Resets on cold start / redeploy.
const buckets = new Map<string, number[]>();
const ONE_HOUR_MS = 60 * 60 * 1000;

export function isRateLimited(key: string, maxRequests: number): boolean {
  const now = Date.now();
  const timestamps = (buckets.get(key) || []).filter((t) => now - t < ONE_HOUR_MS);

  if (timestamps.length >= maxRequests) {
    buckets.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  buckets.set(key, timestamps);
  return false;
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
