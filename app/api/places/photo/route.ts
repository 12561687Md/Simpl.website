import { NextResponse } from "next/server";
import { z } from "zod";
import { isRateLimited, getClientIp } from "../../../../lib/rate-limit";

/**
 * Streams a Google Places photo through our origin.
 *
 * Places photo URLs require the API key as a query param, so linking them
 * directly from an <img src> would publish the key to every visitor. We fetch
 * server-side and pipe the bytes back instead.
 *
 * These are the photos of the visitor's own business that paint during the scan.
 */

const querySchema = z.object({
  ref: z.string().trim().min(10).max(1000),
  w: z.coerce.number().int().min(80).max(1600).optional(),
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
      ref: searchParams.get("ref") ?? "",
      w: searchParams.get("w") ?? undefined,
    });
    if (!parsed.success) {
      return new NextResponse(null, { status: 400 });
    }

    const key = process.env.GOOGLE_PLACES_API_KEY;
    if (!key) {
      console.error("places/photo: GOOGLE_PLACES_API_KEY is not set");
      return new NextResponse(null, { status: 503 });
    }

    const params = new URLSearchParams({
      photo_reference: parsed.data.ref,
      maxwidth: String(parsed.data.w ?? 800),
      key,
    });

    // Google answers with a 302 to a signed googleusercontent URL; following it
    // here means the browser never sees a URL carrying our key.
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/photo?${params}`,
      { redirect: "follow", signal: AbortSignal.timeout(8000) }
    );

    if (!resp.ok || !resp.body) {
      console.error("places/photo: upstream HTTP", resp.status);
      return new NextResponse(null, { status: 502 });
    }

    const contentType = resp.headers.get("content-type") ?? "";
    // A non-image body means Google returned an error page, not a photo. Never
    // pass that through to an <img>.
    if (!contentType.startsWith("image/")) {
      console.error("places/photo: unexpected content-type", contentType);
      return new NextResponse(null, { status: 502 });
    }

    return new NextResponse(resp.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // A photo_reference resolves to the same image every time, so this is
        // safe to cache hard. It also keeps repeat scans off the Places bill.
        "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
      },
    });
  } catch (error) {
    console.error("places/photo: unexpected error", error);
    return new NextResponse(null, { status: 500 });
  }
}
