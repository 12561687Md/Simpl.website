import { NextResponse } from "next/server";
import { z } from "zod";
import { isRateLimited, getClientIp } from "../../../../lib/rate-limit";

/**
 * Resolve a place_id into the identity payload the scan page paints immediately:
 * name, address, phone, website, photos, rating.
 *
 * This is the call that makes the scan feel like it already knows who you are.
 * It runs the instant a prediction is clicked, before any scanning starts, so the
 * page can render the business before the first progress line appears.
 */

const querySchema = z.object({
  placeId: z.string().trim().min(4).max(255),
  token: z.string().trim().min(8).max(64).optional(),
});

const RATE_LIMIT_MAX = 30;

// Requesting only what we paint. Places bills by field group, so every unused
// field here is money spent per scan on data nobody sees.
const FIELDS = [
  "place_id",
  "name",
  "formatted_address",
  "formatted_phone_number",
  "website",
  "rating",
  "user_ratings_total",
  "photos",
  "editorial_summary",
  "url",
  "types",
].join(",");

interface GooglePhoto {
  photo_reference?: string;
  width?: number;
  height?: number;
}

export async function GET(req: Request) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(`places-details:${ip}`, RATE_LIMIT_MAX)) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const { searchParams } = new URL(req.url);
    const parsed = querySchema.safeParse({
      placeId: searchParams.get("placeId") ?? "",
      token: searchParams.get("token") ?? undefined,
    });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const key = process.env.GOOGLE_PLACES_API_KEY;
    if (!key) {
      console.error("places/details: GOOGLE_PLACES_API_KEY is not set");
      return NextResponse.json({ error: "Lookup unavailable." }, { status: 503 });
    }

    const params = new URLSearchParams({
      place_id: parsed.data.placeId,
      fields: FIELDS,
      key,
    });
    // Closing the session token started by autocomplete. This is what turns a
    // whole typeahead session into one billable Details call.
    if (parsed.data.token) params.set("sessiontoken", parsed.data.token);

    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params}`,
      { signal: AbortSignal.timeout(6000), cache: "no-store" }
    );

    if (!resp.ok) {
      console.error("places/details: upstream HTTP", resp.status);
      return NextResponse.json({ error: "Lookup failed." }, { status: 502 });
    }

    const data = await resp.json();
    if (data.status !== "OK" || !data.result) {
      console.error("places/details: upstream status", data.status, data.error_message);
      return NextResponse.json({ error: "Lookup failed." }, { status: 502 });
    }

    const r = data.result;

    const photos = (r.photos ?? [])
      .slice(0, 6)
      .map((p: GooglePhoto) => p.photo_reference)
      .filter(Boolean)
      // Routed through our own photo proxy so the key never ships to the client.
      .map((ref: string) => `/api/places/photo?ref=${encodeURIComponent(ref)}`);

    return NextResponse.json({
      placeId: r.place_id ?? parsed.data.placeId,
      name: r.name ?? null,
      address: r.formatted_address ?? null,
      phone: r.formatted_phone_number ?? null,
      website: r.website ?? null,
      // Deliberately passed through raw. These are Google's real numbers about
      // the visitor's own business, never rounded and never invented. If Google
      // has no rating, this is null and the UI must show nothing.
      rating: typeof r.rating === "number" ? r.rating : null,
      reviewCount: typeof r.user_ratings_total === "number" ? r.user_ratings_total : null,
      summary: r.editorial_summary?.overview ?? null,
      mapsUrl: r.url ?? null,
      types: Array.isArray(r.types) ? r.types.slice(0, 6) : [],
      photos,
    });
  } catch (error) {
    console.error("places/details: unexpected error", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
