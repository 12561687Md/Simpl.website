import type { Metadata } from "next";
import { Shell, PageHero } from "../components/mi/kit";
import MarketForm from "../components/mi/MarketForm";
import { SITE } from "../lib/site";
import { pageMeta, webPage, ldJson } from "../lib/schema";

const PATH = "/book";
const TITLE = "See Your Market: Book a 15-Minute Call | Simpl";
const DESCRIPTION =
  "Book a 15-minute call with Simpl. Tell us your trade and territory and see what the public record says about the buildings in it.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

// The booking calendar (Simpl's CRM calendar, white-labeled). Set BOOKING_URL
// in Vercel to its https share link and redeploy: the calendar is embedded and
// the request form stays below it as a fallback. Only https links are used.
function bookingUrl(): string | null {
  const raw = (process.env.BOOKING_URL || process.env.NEXT_PUBLIC_BOOKING_URL || "").trim();
  try {
    const u = new URL(raw);
    return u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

const NEXT = [
  { k: "01", h: "We confirm a time", b: "Within one business day, by calendar invite." },
  { k: "02", h: "We look at your territory first", b: "Before we talk, we check which records your trade and territory publish." },
  { k: "03", h: "You see it on screen", b: "Real buildings, real records, open while we talk. Then the price and terms in writing." },
];

export default function BookPage() {
  const BOOKING_URL = bookingUrl();
  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(webPage({ path: PATH, name: TITLE, description: DESCRIPTION, type: "ContactPage" }))} />
      <PageHero
        crumbs={[{ name: "See your market", path: PATH }]}
        h1={<>See your market. <span className="m-blue">Fifteen minutes.</span></>}
        lead="Tell us your trade and territory. On the call we show you what the public record says about the buildings in it, and you leave with a price and the terms in writing."
      />
      <section className="m-sec flush" style={{ paddingTop: 0 }}>
        <div className="m-wrap m-split">
          <div>
            <ul className="m-terms">
              {NEXT.map((n) => (
                <li key={n.k}><span className="t" style={{ fontSize: 18 }}>{n.h}</span><span className="b">{n.b}</span></li>
              ))}
            </ul>
            <p className="m-body" style={{ marginTop: 28 }}>
              Or call <a className="m-link" href={SITE.phoneHref}>{SITE.phone}</a>, or email <a className="m-link" href={`mailto:${SITE.email}?subject=See%20my%20market`}>{SITE.email}</a>.
            </p>
          </div>
          <div style={{ display: "grid", gap: 24 }}>
            {BOOKING_URL && (
              <div className="m-formcard">
                <h2 className="m-h3">Pick a time</h2>
                <iframe className="m-cal" src={BOOKING_URL} title="Book a call with Simpl: pick a time" loading="lazy" />
                <p className="m-body" style={{ fontSize: 14, marginTop: 12 }}>
                  Calendar not loading? <a className="m-link" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Open it in a new tab</a>, or send the form below.
                </p>
              </div>
            )}
            <div className="m-formcard" id="request">
              <h2 className="m-h3" style={{ marginBottom: 18 }}>{BOOKING_URL ? "Or send a request" : "Request a time"}</h2>
              <MarketForm sourcePage={PATH} idPrefix="bk" />
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
