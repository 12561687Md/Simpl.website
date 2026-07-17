import { NextResponse } from "next/server";
import { z } from "zod";
import { isRateLimited, getClientIp } from "../../../../lib/rate-limit";
import { verifyScanToken } from "../../../../lib/scan-token";

/**
 * Streams a Places photo through our origin.
 *
 * Photo URLs require the API key, so linking them straight from an <img src>
 * would publish the key to every visitor. We fetch server-side and pipe the
 * bytes back instead.
 *
 * These are the photos of the visitor's own business that paint during the scan.
 * Metered, hence the gate.
 */

// A photo name looks like: places/<placeId>/photos/<ref>
// Anchored, with no slashes inside the segments, so nothing can traverse out of
// the media path or smuggle a second resource into the URL we build.
const PHOTO_NAME = /^places\/([A-Za-z0-9_-]{4,255})\/photos\/([A-Za-z0-9_-]{10,900})$/;

const querySchema = z.object({
  name: z.string().trim().regex(PHOTO_NAME, "bad photo name"),
  w: z.coerce.number().int().min(80).max(1600).optional(),
  scan: z.string().trim().min(16).max(256),
});

const RATE_LIMIT_MAX = 120;

export async function GET(req: Request) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(`places-photo:${ip}`, RATE_LIMIT_MAX)) {
      return new NextResponse(null, { status: 429 });
    }

    const { searchParams } = new URL(req.url);
    const parsed = querySchema.safeParse({
      name: searchParams.get("name") ?? "",
      w: searchParams.get("w") ?? undefined,
      scan: searchParams.get("scan") ?? "",
    });
    if (!parsed.success) return new NextResponse(null, { status: 400 });

    // The placeId is inside the photo name, so the binding is re-derived here
    // rather than taken on trust from a separate parameter. A token for one
    // business cannot fetch another's photos.
    const placeId = parsed.data.name.match(PHOTO_NAME)![1];
    if (!verifyScanToken(parsed.data.scan, placeId)) {
      return new NextResponse(null, { status: 403 });
    }

    const key = process.env.GOOGLE_PLACES_API_KEY;
    if (!key) {
      console.error("places/photo: GOOGLE_PLACES_API_KEY is not set");
      return new NextResponse(null, { status: 503 });
    }

    const url = new URL(`https://places.googleapis.com/v1/${parsed.data.name}/media`);
    // 640, not 800. There is a compression cliff right between them: Google
    // re-encodes at or below 640 (~89KB) and serves near-original above it
    // (~600KB at 800px) — 6.7x the bytes for 1.25x the width. Measured, not
    // guessed. Across 4 photos that is 2.3MB vs 0.35MB per scan, and these render
    // at 62% opacity behind a scrim with a scanline over them, so the detail was
    // never going to be visible. The first frame has 2.6s to paint before the
    // theatre moves on.
    url.searchParams.set("maxWidthPx", String(parsed.data.w ?? 640));

    // Google answers with a redirect to a signed googleusercontent URL; following
    // it here means the browser never sees a URL carrying our key.
    const resp = await fetch(url, {
      headers: { "X-Goog-Api-Key": key },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });

    if (!resp.ok || !resp.body) {
      console.error("places/photo: upstream HTTP", resp.status);
      return new NextResponse(null, { status: 502 });
    }

    const contentType = resp.headers.get("content-type") ?? "";
    // A non-image body means an error payload, not a photo. Never pass that
    // through to an <img>.
    if (!contentType.startsWith("image/")) {
      console.error("places/photo: unexpected content-type", contentType);
      return new NextResponse(null, { status: 502 });
    }

    return new NextResponse(resp.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // A photo name resolves to the same image every time, so this is safe to
        // cache hard. It also keeps repeat scans off the Places bill.
        "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
      },
    });
  } catch (error) {
    console.error("places/photo: unexpected error", error);
    return new NextResponse(null, { status: 500 });
  }
}
