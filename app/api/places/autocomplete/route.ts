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
 * Scanner calibration.
 *
 * SIMPL serves local SERVICE businesses. We deliberately do NOT serve, and in
 * some cases cannot touch: restaurants and food (not our motion, and not copying
 * Owner.com), universities and schools, government, worship, transit, parks, and
 * lodging. This is the exclusion set, verified against the live Places API types.
 *
 * Why exclusion and not an allowlist (`includedPrimaryTypes`):
 *  - Google caps includedPrimaryTypes at 5. Our niche set is dozens wide.
 *  - There is no `landscaping` type at all; Google files Stone Creek under
 *    `general_contractor` + `service`. An allowlist risks dropping real service
 *    businesses that Google typed unexpectedly. Exclusion never does: a service
 *    business we didn't anticipate still passes.
 *  - The bias we want: a missed playground costs nothing, a missed contractor
 *    costs a lead.
 *
 * Autocomplete returns `types` per prediction for free, so we filter the
 * response. Verified this drops: universities (`university` /
 * `educational_institution` / `academic_department`), campus facilities
 * (`sports_activity_location`), restaurants (`*_restaurant` / `food`), the "Stone
 * Creek" river (`natural_feature`) and street (`route`), while keeping Stone Creek
 * Landscaping (`general_contractor`).
 */
const EXCLUDED_TYPES = new Set([
  // Education (universities + K-12 + campus facilities)
  "university", "educational_institution", "academic_department", "preschool",
  "primary_school", "secondary_school", "school_district", "sports_activity_location",
  // Government / civic + institutional orgs (catches university student centers,
  // which carry `association_or_organization` but not `university`).
  "local_government_office", "government_office", "city_hall", "courthouse",
  "embassy", "police", "fire_station", "post_office", "district_attorney",
  "association_or_organization",
  // Worship
  "place_of_worship", "church", "hindu_temple", "mosque", "synagogue",
  // Transit
  "airport", "international_airport", "bus_station", "bus_stop", "train_station",
  "subway_station", "light_rail_station", "transit_station", "transit_depot",
  "parking", "park_and_ride", "rest_stop", "ferry_terminal",
  // Recreation / civic space / attractions
  "playground", "park", "national_park", "state_park", "dog_park", "hiking_area",
  "beach", "campground", "rv_park", "garden", "plaza", "monument",
  "tourist_attraction", "museum", "library", "stadium", "arena", "zoo",
  "amusement_park", "aquarium", "national_reserve", "historical_landmark",
  "historical_place",
  // Lodging + residential (student housing surfaces as apartment_complex)
  "lodging", "hotel", "motel", "resort_hotel", "bed_and_breakfast",
  "extended_stay_hotel", "hostel", "apartment_complex", "apartment_building",
  // Institutional healthcare (we serve practices, not hospitals)
  "hospital",
  // Finance kiosks
  "atm",
  // Not a business at all: geo / address entries
  "natural_feature", "river", "route", "geocode", "premise", "street_address",
  "plus_code", "postal_code", "political", "administrative_area_level_1",
  "administrative_area_level_2", "locality", "sublocality", "neighborhood",
  "country", "intersection",
]);

// Substring guards catch families we can't enumerate: every cuisine subtype ends
// in "_restaurant", and school variants contain "school".
//
// Known residual edge case: university-affiliated MEDICAL clinics (e.g. a dental
// school clinic, a hospital transplant clinic) type as `medical_clinic` /
// `dental_clinic` / `health`, not `university`, so they pass. We leave them,
// because those are the exact types a real independent practice carries, and
// name-matching "university"/"college"/"school" would wrongly block legitimate
// businesses (College Hunks Hauling Junk, University Ford, Old School Barber).
// A rare campus clinic slipping through costs nothing until it self-gates; a
// blocked real business costs a lead.
function isExcluded(types: string[]): boolean {
  return types.some(
    (t) => EXCLUDED_TYPES.has(t) || t.endsWith("_restaurant") || t.includes("school") || t === "restaurant" || t === "food"
  );
}

/**
 * Catches university-affiliated clinics and facilities that type as a normal
 * practice (dentist, medical_clinic) with no `university` signal. Matches only
 * unambiguous institutional PHRASES, never bare words, so real service businesses
 * pass: "University Ford", "University Animal Hospital", "College Hunks Hauling
 * Junk", and "Old School Barber Shop" all survive; "East Carolina University
 * School of Dental Medicine" and "University of North Carolina Wilmington" do not.
 */
function looksInstitutional(name: string): boolean {
  const n = name.toLowerCase();
  if (/\buniversity of\b|\bcollege of\b|\bschool of\b/.test(n)) return true;
  if (/\buniversity\b/.test(n) && /\bschool\b|\bcampus\b|\bmedicine\b/.test(n)) return true;
  return false;
}

/**
 * The target niches SIMPL covers, mapped to Google place types. Documentation and
 * a hook for future lead-scoring; the runtime gate above is exclusion-based so we
 * never drop a real service business that isn't on this list. Grouped by vertical:
 *
 *   Home & trades:   general_contractor, electrician, plumber, roofing_contractor,
 *                     painter, locksmith, moving_company, storage, hardware_store
 *   Automotive:      car_repair, car_wash, car_dealer, auto_parts_store
 *   Personal care:   hair_salon, beauty_salon, nail_salon, spa, barber_shop, gym
 *   Health practice: dentist, doctor, physiotherapist, chiropractor, veterinary_care,
 *                     medical_clinic, dental_clinic, wellness_center
 *   Professional:    lawyer, accounting, insurance_agency, real_estate_agency,
 *                     travel_agency, consultant
 *   Local service:   laundry, funeral_home, florist, cleaning_service, pest_control,
 *                     landscaping (via general_contractor/service), electrician
 *
 * Kept in sync with docs/standards/SCANNER_V2_SPEC.md §7.
 */

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

    // Location bias. Without this, a well-established local business can lose
    // to a same-named business in another state entirely — verified live:
    // "stone creek landscaping apex nc" (the real client's registered name +
    // city) surfaced a same-named business in Doylestown, PA before a real
    // 4.7-star, 84-review Apex, NC listing. Autocomplete has no location
    // context by default; Vercel supplies the visitor's approximate location
    // as request headers on every production request, no extra API call or
    // permission prompt needed. Absent locally (no `x-vercel-ip-*` headers
    // outside Vercel's own infrastructure), so this degrades to unbiased
    // search in dev, matching today's behavior there.
    const lat = req.headers.get("x-vercel-ip-latitude");
    const lng = req.headers.get("x-vercel-ip-longitude");
    if (lat && lng) {
      body.locationBias = {
        circle: {
          center: { latitude: Number(lat), longitude: Number(lng) },
          // Wide enough to cover a metro area (a searcher in Raleigh scanning
          // a business in Apex is common), narrow enough to still separate
          // "nearby" from "a different state." A bias, not a restriction —
          // a real match further out still surfaces, just ranked lower.
          // 50,000 is a hard ceiling: the Places API rejects anything above
          // it with INVALID_ARGUMENT, which was silently 502-ing every
          // production autocomplete request (dev has no x-vercel-ip-* headers,
          // so locationBias never activated there, and the bug never
          // reproduced locally). Verified against the live API error text.
          radius: 50000,
        },
      };
    }

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
      // Filter before slicing, or one excluded entry pushes a real business off
      // the list of five. Type exclusion first, then the institutional-name guard
      // for campus clinics that type as ordinary practices.
      .filter((s: Suggestion) => {
        const p = s.placePrediction;
        if (isExcluded(p?.types ?? [])) return false;
        const name = p?.structuredFormat?.mainText?.text ?? p?.text?.text ?? "";
        return !looksInstitutional(name);
      })
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
