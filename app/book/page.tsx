import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookForm from "../components/engine/BookForm";
import { Crumbs, Eyebrow, Section } from "../components/engine/ui";
import { SITE } from "../lib/site";
import { pageMeta, webPage, ldJson } from "../lib/schema";

/* Transactional page. Primary keyword: brand + "book a call". */
const PATH = "/book";
const TITLE = "Book a Call With Simpl: 30 Minutes, No Pitch Deck | Simpl";
const DESCRIPTION = "Book a 30-minute call with Simpl. Talk through your market, your best reasons to call, or your local SEO, with the person who builds the work.";

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

// The "Book a call" calendar (Simpl's CRM calendar, white-labeled). Set
// BOOKING_URL in Vercel to its https share link and redeploy: the calendar is
// embedded here and the request form moves below it as a fallback. Until then
// the request form (and email) is the way to book. Only https links are used.
function bookingUrl(): string | null {
  const raw = (process.env.BOOKING_URL || process.env.NEXT_PUBLIC_BOOKING_URL || "").trim();
  try {
    const u = new URL(raw);
    return u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

export default function BookPage() {
  const BOOKING_URL = bookingUrl();
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(webPage({ path: PATH, name: TITLE, description: DESCRIPTION, type: "ContactPage" }))} />
        <section className="eg-hero tone-ink" style={{ paddingBottom: 80 }}>
          <div className="eg-wrap">
            <Crumbs items={[{ name: "Book a call", path: PATH }]} />
            <div className="eg-split">
              <div>
                <Eyebrow>Book a call</Eyebrow>
                <h1 className="eg-h1" style={{ fontSize: "clamp(36px, 4.4vw, 58px)" }}>Book a call with Simpl.</h1>
                <p className="eg-sub">Thirty minutes. No pitch deck.</p>
                <p className="eg-lead">You talk with the person who builds the work. Bring your market and your best accounts, or the local business you want found, and leave with a clear next step.</p>
                <ul className="eg-list" style={{ marginTop: 30 }}>
                  <li><span><b>B2B teams:</b> your territory, your reasons to call, and what your Account Engine would show</span></li>
                  <li><span><b>Local businesses:</b> your site, your Google listing and the fastest wins</span></li>
                  <li><span><b>Either way:</b> a written scope and price after the call, no pressure</span></li>
                </ul>
                <p className="eg-body" style={{ marginTop: 28 }}>
                  Or call <a className="eg-link" href={SITE.phoneHref}>{SITE.phone}</a>, or email <a className="eg-link" href={`mailto:${SITE.email}?subject=Book%20a%20call`}>{SITE.email}</a>.
                </p>
              </div>
              {BOOKING_URL ? (
                <div className="eg-form-card">
                  <h2 className="eg-h3" style={{ fontSize: 22, marginBottom: 16 }}>Pick a time</h2>
                  <iframe className="eg-cal" src={BOOKING_URL} title="Book a call with Simpl: pick a time" loading="lazy" />
                  <p className="eg-body" style={{ fontSize: 14, margin: "14px 0 0" }}>
                    Calendar not loading? <a className="eg-link" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Open it in a new tab</a>, or <a className="eg-link" href="#request">request a time</a> below.
                  </p>
                </div>
              ) : (
                <div className="eg-form-card" id="request">
                  <h2 className="eg-h3" style={{ fontSize: 22, marginBottom: 20 }}>Request a time</h2>
                  <BookForm />
                </div>
              )}
            </div>
          </div>
        </section>
        {BOOKING_URL && (
          <Section tone="paper" tight label="Prefer to send a request?">
            <div className="eg-form-card" id="request" style={{ maxWidth: 760 }}>
              <h2 className="eg-h3" style={{ fontSize: 22, marginBottom: 20 }}>Request a time instead</h2>
              <BookForm />
            </div>
          </Section>
        )}
        <Section tone={BOOKING_URL ? "mist" : "paper"} tight label="What happens next">
          <div className="eg-g3">
            {[
              { k: "01", h: "We confirm a time", b: "Within one business day, by calendar invite." },
              { k: "02", h: "We do the homework", b: "A first look at your market or your site before we talk." },
              { k: "03", h: "You get a written next step", b: "Scope and price in writing. Yes or no, it's yours to keep." },
            ].map((s) => (
              <div key={s.k} className="eg-card">
                <span className="eg-num">{s.k}</span>
                <h2 className="eg-h3">{s.h}</h2>
                <p className="eg-body" style={{ fontSize: 15 }}>{s.b}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
