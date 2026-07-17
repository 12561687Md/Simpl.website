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
  // Order matters. `x-forwarded-for` is a client-supplied header that proxies
  // append to, so its leftmost entry is whatever the caller claimed — trusting
  // it first let anyone rotate their own rate-limit bucket by sending a random
  // value. Vercel sets x-vercel-forwarded-for and x-real-ip itself, so prefer
  // those and treat x-forwarded-for as the last resort.
  const vercelIp = req.headers.get("x-vercel-forwarded-for");
  if (vercelIp) return vercelIp.split(",")[0].trim();

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwardedFor = req.headers.get("x-forwarded-for");
  // Rightmost entry is the one appended closest to us and hardest to spoof.
  if (forwardedFor) {
    const parts = forwardedFor.split(",");
    return parts[parts.length - 1].trim();
  }

  return "unknown";
}
