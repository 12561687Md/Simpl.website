import { NextResponse } from "next/server";
import { z } from "zod";
import { isRateLimited, getClientIp } from "../../../../lib/rate-limit";
import { verifyScanToken, issueScanToken } from "../../../../lib/scan-token";

/**
 * Resolve a place_id into the identity payload the scan paints: name, address,
 * phone, website, photos, rating, and the coordinates the map is centred on.
 *
 * This is the call that makes the scan feel like it already knows who you are —
 * and the most expensive one in the flow, hence the gate.
 */

const querySchema = z.object({
  placeId: z.string().trim().min(4).max(255),
  // Places session token (billing). Unrelated to `scan`, which is the spend gate.
  token: z.string().trim().min(8).max(64).optional(),
  // Signed permission from /api/scan/start. Required: this call is metered.
  scan: z.string().trim().min(16).max(256),
});

const RATE_LIMIT_MAX = 30;

/**
 * The field mask sets the SKU tier, so this list is a price, not a preference.
 *
 * `reviews` and `editorialSummary` push this into the top (Enterprise + Atmosphere)
 * tier. That's a deliberate spend: they are the "how did they know all that?"
 * payload the scan theatre pops in — a real review in the owner's own customers'
 * words, and Google's one-line description of the business (often carrying the
 * "since 19xx" the owner is proud of). Everything here is real; nothing is
 * invented. Still absent: googleMapsUri, types — nothing renders them.
 */
const FIELD_MASK = [
  "id",
  "displayName",
  "formattedAddress",
  "nationalPhoneNumber",
  "websiteUri",
  "rating",
  "userRatingCount",
  "photos",
  // Powers the static map. Static Maps cannot geocode a place_id.
  "location",
  // Enrichment for the theatre. Real, or absent — never fabricated.
  "editorialSummary",
  "reviews",
].join(",");

interface NewPhoto {
  name?: string;
}

interface NewReview {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: { displayName?: string };
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
      scan: searchParams.get("scan") ?? "",
    });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // The gate, enforced. A UI form protects nothing: this repo is public, so
    // anyone can read this route and call it directly. Bound to placeId, so a
    // token minted for one business cannot resolve another.
    if (!verifyScanToken(parsed.data.scan, parsed.data.placeId)) {
      return NextResponse.json({ error: "This scan link has expired." }, { status: 403 });
    }

    const key = process.env.GOOGLE_PLACES_API_KEY;
    if (!key) {
      console.error("places/details: GOOGLE_PLACES_API_KEY is not set");
      return NextResponse.json({ error: "Lookup unavailable." }, { status: 503 });
    }

    const url = new URL(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(parsed.data.placeId)}`
    );
    // Closes the session opened by autocomplete: this is what makes a whole
    // typeahead session bill once rather than per keystroke.
    if (parsed.data.token) url.searchParams.set("sessionToken", parsed.data.token);

    const resp = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      signal: AbortSignal.timeout(6000),
      cache: "no-store",
    });

    if (!resp.ok) {
      const detail = await resp.text().catch(() => "");
      console.error("places/details: upstream", resp.status, detail.slice(0, 300));
      return NextResponse.json({ error: "Lookup failed." }, { status: 502 });
    }

    const r = await resp.json();

    // Four, not more. Photos are the biggest line item in a scan — more than the
    // Details call itself — and the theatre only shows about five frames: map +
    // 4 photos at 2.6s each fills the ~14s scan exactly. (The New API returns 10
    // where legacy returned 6, so this cap matters more than it used to.)
    const photos = (r.photos ?? [])
      .slice(0, 4)
      .map((p: NewPhoto) => p.name)
      .filter(Boolean)
      // The photo route is metered too. Its `name` already embeds the placeId
      // (places/<placeId>/photos/<ref>), so that route re-derives the binding
      // itself — no separate placeId for it to trust. Legacy's photo_reference
      // was opaque and couldn't do this.
      .map(
        (name: string) =>
          `/api/places/photo?name=${encodeURIComponent(name)}` +
          `&scan=${encodeURIComponent(parsed.data.scan)}`
      );

    // Static Maps cannot geocode a place_id — it returns a picture of an error
    // message instead — so the map needs real coordinates. They travel through
    // the client, so they are signed: the token is scoped to this exact centre
    // and cannot be replayed with another.
    const loc = r.location;
    let mapUrl: string | null = null;
    if (typeof loc?.latitude === "number" && typeof loc?.longitude === "number") {
      const lat = String(loc.latitude);
      const lng = String(loc.longitude);
      const mapToken = issueScanToken(`map:${parsed.data.placeId}:${lat},${lng}`);
      mapUrl =
        `/api/places/staticmap?placeId=${encodeURIComponent(parsed.data.placeId)}` +
        `&lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}` +
        `&scan=${encodeURIComponent(mapToken)}`;
    }

    // Three real reviews, trimmed for the theatre — the theater needs at
    // least 3 visible before it wraps up, so this pulls one more than it
    // shows to survive the empty-text filter below. The author name is
    // public review attribution from Google; the text is the customer's own
    // words. Empty when Google has none — which is itself a finding, not a
    // blank to fill.
    const reviews = (r.reviews ?? [])
      .map((rv: NewReview) => {
        const text = rv.text?.text ?? rv.originalText?.text ?? "";
        return {
          rating: typeof rv.rating === "number" ? rv.rating : null,
          text: text.length > 160 ? text.slice(0, 157).trimEnd() + "…" : text,
          author: rv.authorAttribution?.displayName ?? null,
          when: rv.relativePublishTimeDescription ?? null,
        };
      })
      .filter((rv: { text: string }) => rv.text)
      .slice(0, 4);

    return NextResponse.json({
      placeId: r.id ?? parsed.data.placeId,
      mapUrl,
      name: r.displayName?.text ?? null,
      address: r.formattedAddress ?? null,
      phone: r.nationalPhoneNumber ?? null,
      website: r.websiteUri ?? null,
      // Passed through raw. These are Google's real numbers about the visitor's
      // own business, never rounded and never invented. If Google has no rating,
      // this stays null and the UI shows nothing.
      rating: typeof r.rating === "number" ? r.rating : null,
      reviewCount: typeof r.userRatingCount === "number" ? r.userRatingCount : null,
      // Google's own one-line description, e.g. "Counter-service pizzeria known
      // for classic New York slices since 1975." Real or null.
      summary: r.editorialSummary?.text ?? null,
      reviews,
      photos,
    });
  } catch (error) {
    console.error("places/details: unexpected error", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
