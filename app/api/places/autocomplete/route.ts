import { NextResponse } from "next/server";
import { z } from "zod";
import { isRateLimited, getClientIp } from "../../../../lib/rate-limit";

/**
 * Server-side proxy for Google Places Autocomplete.
 *
 * The Places key must never reach the browser: an unrestricted key in client
 * JS is billable by anyone who views source. Every keystroke goes through here
 * instead, and the key stays in the server environment.
 *
 * Billing note: Autocomplete is priced per *request* unless requests are grouped
 * into a session. The client generates one `token` per typeahead session and
 * passes the same token to Place Details on selection, which collapses the whole
 * session into a single Details charge. Dropping the token multiplies the bill by
 * roughly the number of characters typed.
 */

const querySchema = z.object({
  q: z.string().trim().min(2).max(120),
  token: z.string().trim().min(8).max(64).optional(),
});

// Typeahead fires per keystroke, so this ceiling is far above the email/contact
// routes and is a runaway-cost guard, not a spam guard.
const RATE_LIMIT_MAX = 120;

interface GooglePrediction {
  place_id?: string;
  description?: string;
  structured_formatting?: {
    main_text?: string;
    secondary_text?: string;
  };
}

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

    const params = new URLSearchParams({
      input: parsed.data.q,
      // Businesses only. Without this, typing a business name surfaces street
      // addresses and cities, which are not scannable.
      types: "establishment",
      components: "country:us",
      key,
    });
    if (parsed.data.token) params.set("sessiontoken", parsed.data.token);

    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`,
      { signal: AbortSignal.timeout(4000), cache: "no-store" }
    );

    if (!resp.ok) {
      console.error("places/autocomplete: upstream HTTP", resp.status);
      return NextResponse.json({ predictions: [] }, { status: 502 });
    }

    const data = await resp.json();

    // ZERO_RESULTS is a valid answer. Anything else non-OK is our problem to log,
    // never the visitor's to read: upstream messages leak quota and key state.
    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      console.error("places/autocomplete: upstream status", data.status, data.error_message);
      return NextResponse.json({ predictions: [] }, { status: 502 });
    }

    const predictions = (data.predictions ?? [])
      .slice(0, 5)
      .map((p: GooglePrediction) => ({
        placeId: p.place_id ?? "",
        name: p.structured_formatting?.main_text ?? p.description ?? "",
        address: p.structured_formatting?.secondary_text ?? "",
      }))
      .filter((p: { placeId: string; name: string }) => p.placeId && p.name);

    return NextResponse.json({ predictions });
  } catch (error) {
    console.error("places/autocomplete: unexpected error", error);
    return NextResponse.json({ predictions: [] }, { status: 500 });
  }
}
