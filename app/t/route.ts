import { NextResponse } from "next/server";

/**
 * /t — the destination behind the business card's QR code and NFC chip.
 *
 * WHY THIS EXISTS
 *
 * A QR code is ink and an NFC chip is usually write-locked once it is handed
 * out. Whatever URL either one carries is fixed the moment the cards are
 * printed, so pointing them straight at simpl.pro would mean a box of 500
 * cards that can never lead anywhere else.
 *
 * They point here instead. Changing where every card in circulation leads is
 * then one edit: set CARD_DESTINATION in the Vercel project, redeploy, done.
 * The cards never change. Today it is the homepage; tomorrow it can be a
 * landing page, the Google Business Profile, a booking link, or a campaign
 * page that only exists for a month.
 *
 * WHY 302 AND NOT 301
 *
 * A 301 is permanent and browsers cache it hard, sometimes indefinitely.
 * Ship one and the phones that already tapped a card will keep going to the
 * old destination long after it changed, which defeats the entire point. 302
 * keeps the redirect re-pointable, which is what this route is for.
 *
 * SAFETY
 *
 * The destination is validated against an allowlist of hosts. Without that,
 * anyone who could set the environment variable could turn every card Simpl
 * has handed out into an open redirect, and open redirects on a real domain
 * get used for phishing.
 */

/** Hosts this route is permitted to send someone to. */
const ALLOWED_HOSTS = new Set([
  "simpl.pro",
  "www.simpl.pro",
  // Google Business Profile / Maps, so a card can point at reviews.
  "g.page",
  "maps.app.goo.gl",
  "www.google.com",
  // Scheduling, for when a card should book a call directly.
  "cal.com",
  "calendly.com",
]);

const FALLBACK = "https://simpl.pro/";

function resolveDestination(): string {
  const configured = process.env.CARD_DESTINATION?.trim();
  if (!configured) return FALLBACK;

  let url: URL;
  try {
    url = new URL(configured);
  } catch {
    console.error("[/t] CARD_DESTINATION is not a valid URL, using fallback");
    return FALLBACK;
  }

  if (url.protocol !== "https:") {
    console.error("[/t] CARD_DESTINATION must be https, using fallback");
    return FALLBACK;
  }

  if (!ALLOWED_HOSTS.has(url.hostname)) {
    console.error(
      `[/t] CARD_DESTINATION host "${url.hostname}" is not allowlisted, using fallback. ` +
        "Add it to ALLOWED_HOSTS in app/t/route.ts if it is genuinely ours.",
    );
    return FALLBACK;
  }

  return url.toString();
}

export async function GET(req: Request) {
  const destination = resolveDestination();

  /* Anything after /t is carried through as a campaign tag, so a batch of
     cards can be told apart: /t?c=tradeshow, /t?c=doorhanger. It is only ever
     logged and appended, never used to choose the destination, so it cannot
     be used to redirect anyone anywhere. */
  const tag = new URL(req.url).searchParams.get("c");

  console.log(
    JSON.stringify({
      event: "card_tap",
      tag: tag && /^[a-z0-9_-]{1,32}$/i.test(tag) ? tag : null,
      destination,
      at: new Date().toISOString(),
    }),
  );

  const out = new URL(destination);
  /* UTM so the tap shows up as its own source in analytics rather than
     disappearing into direct traffic. */
  out.searchParams.set("utm_source", "card");
  out.searchParams.set("utm_medium", tag ? "nfc" : "qr");
  if (tag && /^[a-z0-9_-]{1,32}$/i.test(tag)) out.searchParams.set("utm_campaign", tag);

  return NextResponse.redirect(out.toString(), {
    status: 302,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
