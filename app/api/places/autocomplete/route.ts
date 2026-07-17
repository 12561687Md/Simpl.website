import { NextResponse } from "next/server";
import { z } from "zod";
import { isRateLimited, getClientIp } from "../../../../lib/rate-limit";

/**
 * Server-side proxy for Places Autocomplete (New).
 *
 * The Places key must never reach the browser: an unrestricted key in client JS
 * is billable by anyone who views source. Every keystroke goes through here
 * instead, and the key stays in the server environment.
 *
 * Billing: Autocomplete is priced per *session*, not per request. The client
 * generates one `token` per typeahead session and passes the same token to Place
 * Details on selection, which collapses the whole session into a single billable
 * event. Dropping the token multiplies the bill by roughly the number of
 * characters typed.
 */

const querySchema = z.object({
  q: z.string().trim().min(2).max(120),
  token: z.string().trim().min(8).max(64).optional(),
});

// Typeahead fires per keystroke, so this ceiling is far above the email/contact
// routes and is a runaway-cost guard, not a spam guard.
const RATE_LIMIT_MAX = 120;

interface Suggestion {
  placePrediction?: {
    placeId?: string;
    types?: string[];
    text?: { text?: string };
    structuredFormat?: {
      mainText?: { text?: string };
      secondaryText?: { text?: string };
    };
  };
}

/**
 * Things that are not businesses we can help.
 *
 * Why a denylist and not `includedPrimaryTypes`, which is the obvious lever:
 *
 *  - Google caps includedPrimaryTypes at 5. Service businesses don't fit in 5.
 *    (Owner.com gets away with a whitelist because restaurants happen to fit:
 *    restaurant, cafe, bakery, meal_delivery, meal_takeaway. Exactly five.)
 *  - There is no `landscaping` or `landscaper` type at all — verified, both are
 *    rejected — and landscaping is our primary ICP. Google files Stone Creek
 *    under `general_contractor`. A whitelist would have excluded our best
 *    prospects to keep out playgrounds.
 *
 * Autocomplete returns `types` on every prediction at no extra cost, so we filter
 * after the fact instead. Unlimited entries, and unknown business types pass by
 * default — which is the right bias: a missed playground costs nothing, a missed
 * landscaper costs a lead.
 *
 * Verified before this existed: "raleigh high school", "pullen park" and "wake
 * county courthouse" all returned results a visitor could scan, burning a
 * Details call on each.
 */
const NOT_A_BUSINESS = new Set([
  // Recreation / civic space
  "playground", "park", "national_park", "state_park", "dog_park", "hiking_area",
  "beach", "campground", "camping_cabin", "garden", "plaza", "monument",
  // Education
  "school", "primary_school", "secondary_school", "preschool", "university",
  // Government
  "local_government_office", "city_hall", "courthouse", "embassy", "police",
  "fire_station", "post_office",
  // Worship
  "church", "place_of_worship", "hindu_temple", "mosque", "synagogue",
  // Transit
  "airport", "international_airport", "bus_station", "bus_stop", "train_station",
  "subway_station", "light_rail_station", "transit_station", "transit_depot",
  "parking", "park_and_ride", "rest_stop", "ferry_terminal",
  // Landmarks / attractions
  "tourist_attraction", "museum", "library", "stadium", "arena",
  "historical_landmark", "historical_place", "natural_feature",
]);

export async function GET(req: Request) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(`places-autocomplete:${ip}`, RATE_LIMIT_MAX)) {
      return NextResponse.json({ predictions: [] }, { status: 429 });
    }

    const { searchParams } = new URL(req.url);
    const parsed = querySchema.safeParse({
      q: searchParams.get("q") ?? "",
      token: searchParams.get("token") ?? undefined,
    });

    // A too-short query is the normal state of an input someone just focused,
    // not an error. Empty predictions, not a 400.
    if (!parsed.success) {
      return NextResponse.json({ predictions: [] });
    }

    const key = process.env.GOOGLE_PLACES_API_KEY;
    if (!key) {
      console.error("places/autocomplete: GOOGLE_PLACES_API_KEY is not set");
      return NextResponse.json({ predictions: [] }, { status: 503 });
    }

    const body: Record<string, unknown> = {
      input: parsed.data.q,
      // Businesses only. Verified: without this, typing "123 main st" returns
      // street addresses, which are not scannable.
      includedPrimaryTypes: ["establishment"],
      includedRegionCodes: ["us"],
    };
    if (parsed.data.token) body.sessionToken = parsed.data.token;

    const resp = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });

    // Unlike the legacy API there is no in-body `status`: errors are real HTTP
    // codes, and no results is simply an empty `suggestions` with a 200.
    if (!resp.ok) {
      const detail = await resp.text().catch(() => "");
      console.error("places/autocomplete: upstream", resp.status, detail.slice(0, 300));
      return NextResponse.json({ predictions: [] }, { status: 502 });
    }

    const data = await resp.json();

    const predictions = (data.suggestions ?? [])
      // Filter before slicing, or one playground pushes a real business off the
      // list of five.
      .filter((s: Suggestion) => !(s.placePrediction?.types ?? []).some((t) => NOT_A_BUSINESS.has(t)))
      .slice(0, 5)
      .map((s: Suggestion) => {
        const p = s.placePrediction;
        return {
          placeId: p?.placeId ?? "",
          name: p?.structuredFormat?.mainText?.text ?? p?.text?.text ?? "",
          address: p?.structuredFormat?.secondaryText?.text ?? "",
        };
      })
      .filter((p: { placeId: string; name: string }) => p.placeId && p.name);

    return NextResponse.json({ predictions });
  } catch (error) {
    console.error("places/autocomplete: unexpected error", error);
    return NextResponse.json({ predictions: [] }, { status: 500 });
  }
}
