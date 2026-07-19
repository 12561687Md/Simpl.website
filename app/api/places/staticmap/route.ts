import { NextResponse } from "next/server";
import { z } from "zod";
import { isRateLimited, getClientIp } from "../../../../lib/rate-limit";
import { verifyScanToken } from "../../../../lib/scan-token";

/**
 * A dark-styled Google Static Map of the scanned business, streamed through our
 * origin so the key never ships to the browser. Metered (~$2/1000), hence the gate.
 *
 * Three things this route learned the hard way:
 *
 * 1. `center=place_id:...` does NOT work. Static Maps only geocodes coordinates
 *    or address strings. It "succeeds" with the place_id form — HTTP 200,
 *    Content-Type: image/png — and hands back a picture of an error message.
 * 2. Which is why the X-Staticmap-API-Warning check below exists. Status code and
 *    content-type both pass on a broken map; that header is the only honest signal.
 * 3. Style rules need an explicit `feature:` prefix. A bare `element:geometry|...`
 *    is silently ignored, which renders a default *light* map — a white hole in a
 *    dark page.
 *
 * Coordinates are signed rather than trusted: /api/places/details mints a token
 * scoped to `map:<placeId>:<lat>,<lng>`, so a valid token can't be replayed with
 * a different centre to render arbitrary maps on our bill.
 */

const querySchema = z.object({
  placeId: z.string().trim().min(4).max(255),
  lat: z.string().trim().min(1).max(24),
  lng: z.string().trim().min(1).max(24),
  scan: z.string().trim().min(16).max(256),
});

const RATE_LIMIT_MAX = 60;

// Tuned to the scan theater's cream surface (CREAM_THEME in
// ScanTheater.tsx — the only consumer of this map), not Google's default
// light map and not the site's dark theme. Every rule still carries a
// `feature:` prefix, see note 3 above.
const STYLE = [
  "feature:all|element:geometry|color:0xf3ecd9",
  "feature:all|element:labels.icon|visibility:off",
  "feature:all|element:labels.text.fill|color:0x8a7a5c",
  "feature:all|element:labels.text.stroke|color:0xf7f2e7",
  "feature:administrative|element:geometry|color:0xe2d6b8",
  "feature:poi|element:geometry|color:0xebe1ca",
  "feature:poi|element:labels.text|visibility:off",
  "feature:road|element:geometry|color:0xfdfbf5",
  "feature:road|element:labels.text.fill|color:0x9c8f72",
  "feature:road.highway|element:geometry|color:0xe8dcc0",
  "feature:transit|element:geometry|color:0xe2d6b8",
  "feature:water|element:geometry|color:0xcfe0f0",
];

export async function GET(req: Request) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(`places-staticmap:${ip}`, RATE_LIMIT_MAX)) {
      return new NextResponse(null, { status: 429 });
    }

    const { searchParams } = new URL(req.url);
    const parsed = querySchema.safeParse({
      placeId: searchParams.get("placeId") ?? "",
      lat: searchParams.get("lat") ?? "",
      lng: searchParams.get("lng") ?? "",
      scan: searchParams.get("scan") ?? "",
    });
    if (!parsed.success) return new NextResponse(null, { status: 400 });

    const { placeId, lat, lng, scan } = parsed.data;

    // Scoped to the exact centre Details signed, so the coordinates are ours even
    // though they travelled through the client.
    if (!verifyScanToken(scan, `map:${placeId}:${lat},${lng}`)) {
      return new NextResponse(null, { status: 403 });
    }

    const key = process.env.GOOGLE_PLACES_API_KEY;
    if (!key) {
      console.error("places/staticmap: GOOGLE_PLACES_API_KEY is not set");
      return new NextResponse(null, { status: 503 });
    }

    const center = `${lat},${lng}`;
    const params = new URLSearchParams({
      center,
      zoom: "15",
      size: "640x480",
      // Retina. 640x480 is the free-tier ceiling; scale=2 renders 1280x960 from
      // the same billable request.
      scale: "2",
      maptype: "roadmap",
      // The on-light accent variant — baby blue washes out on the cream map.
      markers: `color:0x3E9BC4|${center}`,
      key,
    });
    for (const s of STYLE) params.append("style", s);

    const resp = await fetch(`https://maps.googleapis.com/maps/api/staticmap?${params}`, {
      signal: AbortSignal.timeout(8000),
    });

    if (!resp.ok || !resp.body) {
      console.error("places/staticmap: upstream HTTP", resp.status);
      return new NextResponse(null, { status: 502 });
    }

    // The only reliable failure signal. Without this a broken map renders as a
    // grey rectangle reading "Map error" inside our scan, which is worse than no
    // map at all.
    const warning = resp.headers.get("x-staticmap-api-warning");
    if (warning) {
      console.error("places/staticmap: upstream warning", warning);
      return new NextResponse(null, { status: 502 });
    }

    const contentType = resp.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) {
      console.error("places/staticmap: unexpected content-type", contentType);
      return new NextResponse(null, { status: 502 });
    }

    return new NextResponse(resp.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // A place's map is stable. Cache hard so a re-scan costs nothing.
        "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
      },
    });
  } catch (error) {
    console.error("places/staticmap: unexpected error", error);
    return new NextResponse(null, { status: 500 });
  }
}
