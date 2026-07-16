import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA";
import ScanTool from "../components/ScanTool";
import ContactForm from "../components/ContactForm";
import TierGrid from "./TierGrid";

export const metadata: Metadata = {
  title: "Pricing | SIMPL",
  description: "More leads. Fewer Saturdays. Pick what you need, add to it when it's working. Local SEO from $497/mo, website build free on Team. No contracts you can't leave.",
  openGraph: {
    title: "Pricing | SIMPL",
    description: "More leads. Fewer Saturdays. Pick what you need, add to it when it's working. Local SEO from $497/mo, website build free on Team.",
    url: "https://simpl.pro/start",
    siteName: "SIMPL",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/start" },
};

const PARTS = [
  { name: "Strategy audit", price: "$247", cadence: "once", desc: "The whole picture: where the leads are leaking out and what to fix first. Included free with any tier." },
  { name: "Google Business Profile", price: "from $197", cadence: "/ mo", desc: "Claimed, filled out, posted to, and watched. The listing most of your calls come from." },
  { name: "SEO + AI search", price: "$247 to $497", cadence: "/ mo", desc: "Rank on Google, and show up when someone asks AI who to call. Price moves with how hard you want to push." },
  { name: "Website build", price: "$997 to $2,997", cadence: "once", desc: "Fast, findable, built to turn visitors into calls. Free when you start on Team." },
  { name: "Answering bot", price: "$147 to $447", cadence: "/ mo", desc: "Answers leads, quotes jobs, and books calls while you're on a jobsite or asleep. Chat or voice. $497 to $747 to set up, waived on Pro." },
];

const ELSEWHERE = [
  { what: "Local SEO for a one-location service business", them: "$2,000 to $2,500 / mo", us: "from $497 / mo" },
  { what: "What the average agency retainer runs", them: "about $3,200 / mo", us: "from $497 / mo" },
  { what: "A small business website rebuild", them: "$3,000 to $15,000", us: "$0 on Team" },
  { what: "A professional SEO audit", them: "$500 to $5,000", us: "$247, free with any tier" },
];

const FAQS = [
  {
    q: "Why are you so much cheaper than the agency that keeps calling me?",
    a: "You're not paying for an account manager, a sales team, or an office. You work directly with the person doing the work. The typical agency quote for a one-location service business runs $2,000 to $2,500 a month, and a big share of that is overhead you never see.",
  },
  {
    q: "What does \"starting at\" actually mean? Am I going to get upsold?",
    a: "No. It means your price is built from the pieces you need, and we agree on it in writing before any work starts. A lawn care crew that only needs its Google listing handled pays closer to the $197 floor. A remodeler who needs a new site, project galleries, and reviews pays more. You will never get an invoice you did not approve.",
  },
  {
    q: "Is the free website really free?",
    a: "Yes, when you start on Team and stay three months. The build normally runs $997 to $2,997. We cover it because a client with a fast, findable site is a client who sticks around. If you leave before month three, the remaining months of the minimum come due or we invoice the build at its normal rate. You keep the website either way.",
  },
  {
    q: "How long until I actually see more calls?",
    a: "Honest answer: the fixes are visible in 30 days, the leads are not. Month one is your score jump, your listing, the technical work, and tracking that proves what's happening. Rankings and call volume compound over three to six months. Anyone promising page one in 30 days is lying to you. If your score isn't above 80 in 90 days, that month is free.",
  },
  {
    q: "Do I have to sign a long contract?",
    a: "No. Core and Pro are month to month, cancel whenever. The only minimum is three months on Team, and that exists solely because we gave you a website for free.",
  },
  {
    q: "Why aren't ads included in a tier?",
    a: "Because a lawn crew booking out spring cleanups and a remodeler chasing three kitchen jobs a year don't have the same ad problem, so a flat price would either overcharge you or underdeliver. Ads are quoted against your account and market, starting at $497 a month plus a one-time setup at half the monthly fee. Your ad spend goes to Google or Meta directly. We never mark it up, and you own the account.",
  },
  {
    q: "Can something answer my phone and my website when I'm on a job?",
    a: "Yes, and it's the closest thing we sell to buying your evenings back. The answering bot picks up chats and calls, answers the questions you get asked forty times a week, ballparks a quote, and books the job straight onto your calendar. It runs at 2am and on Sundays. Setup is $497 to $747 depending on how much it needs to know about your pricing, then $147 to $447 a month. Setup is waived on Pro. Most owners find it pays for itself the first time it catches a job that would have gone to voicemail.",
  },
  {
    q: "What if I already have a website I like?",
    a: "Then keep it. Core works on the site you have. We only rebuild when the site is what's holding you back, and the free scan will tell you whether that's true before you spend anything.",
  },
];

const label = { fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--muted)" };

export default function StartPage() {
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "SIMPL",
          "url": "https://simpl.pro",
          "description": "Digital presence platform that scans, scores, and fixes businesses' online presence.",
          "contactPoint": { "@type": "ContactPoint", "email": "team@simpl.pro", "contactType": "customer service" },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "SIMPL Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SIMPL Scan", "description": "Free digital presence scan with the full report emailed free" }, "price": "0", "priceCurrency": "USD" },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SIMPL Core", "description": "Google Business Profile optimization, on-page SEO, AI search visibility, and lead tracking. Includes the strategy audit." }, "priceSpecification": { "@type": "UnitPriceSpecification", "minPrice": "497", "priceCurrency": "USD", "billingDuration": "P1M" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SIMPL Team", "description": "Everything in Core, plus a free website build on a 3-month start, content, social, reviews, and rank tracking." }, "priceSpecification": { "@type": "UnitPriceSpecification", "minPrice": "997", "priceCurrency": "USD", "billingDuration": "P1M" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SIMPL Pro", "description": "Everything in Team, plus landing pages, conversion optimization, monthly strategy, multi-location coverage, and waived answering-bot setup." }, "priceSpecification": { "@type": "UnitPriceSpecification", "minPrice": "1997", "priceCurrency": "USD", "billingDuration": "P1M" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SIMPL Pro Performance", "description": "Pro on a lower monthly base plus a per-qualified-lead or per-booked-appointment fee, billed on tracked calls and bookings both sides see in one dashboard. Requires SIMPL ad management and call/conversion tracking. Not a share of revenue." }, "priceSpecification": { "@type": "UnitPriceSpecification", "minPrice": "997", "priceCurrency": "USD", "billingDuration": "P1M" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paid Ads Management", "description": "Google, Meta, and LSA campaign management. Quoted per account. No markup on ad spend." }, "priceSpecification": { "@type": "CompoundPriceSpecification", "priceCurrency": "USD", "priceComponent": [
                { "@type": "UnitPriceSpecification", "name": "Monthly management", "minPrice": "497", "priceCurrency": "USD", "billingDuration": "P1M" },
                { "@type": "UnitPriceSpecification", "name": "One-time setup, 50% of the monthly management fee", "minPrice": "248", "priceCurrency": "USD" }
              ] } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Answering Bot", "description": "Chat and voice bot that answers leads, quotes jobs, and books calls 24/7. Setup waived on SIMPL Pro." }, "priceSpecification": { "@type": "CompoundPriceSpecification", "priceCurrency": "USD", "priceComponent": [
                { "@type": "UnitPriceSpecification", "name": "Monthly", "minPrice": "147", "maxPrice": "447", "priceCurrency": "USD", "billingDuration": "P1M" },
                { "@type": "UnitPriceSpecification", "name": "One-time setup, waived on SIMPL Pro", "minPrice": "497", "maxPrice": "747", "priceCurrency": "USD" }
              ] } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Strategy Audit", "description": "One-time marketing strategy audit. Included free with any tier." }, "price": "247", "priceCurrency": "USD" },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Build", "description": "Flat-rate website build, scope-based. Free when starting on Team with a 3-month commitment." }, "priceSpecification": { "@type": "PriceSpecification", "minPrice": "997", "maxPrice": "2997", "priceCurrency": "USD" } }
            ]
          }
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simpl.pro" },
            { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://simpl.pro/start" }
          ]
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQS.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        }) }} />

        {/* Hero */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 32px 64px" }}>
          <div className="mono" style={{ ...label, marginBottom: 40 }}>Pricing</div>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 900 }}>
            More leads.<br />
            <span style={{ color: "var(--muted)" }}>Fewer Saturdays.</span>
          </h1>
          <p style={{ marginTop: 28, maxWidth: 640, fontSize: 17, lineHeight: 1.55 }}>
            You didn&apos;t start your business to write meta descriptions and argue with Google. Pick what you need, add to it once it&apos;s working. Every price below is where it starts, because no two businesses need the same thing.
          </p>
        </section>

        {/* Tiers */}
        <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px" }}>
            <div className="mono" style={{ ...label, marginBottom: 48 }}>The stack</div>

            <TierGrid />

            <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 24, textAlign: "center", letterSpacing: "0.06em" }}>
              Every engagement starts with a conversation, not a checkout page.
            </div>
          </div>
        </section>

        {/* Paid ads: separate on purpose */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ ...label, marginBottom: 28 }}>
            <span style={{ color: "var(--accent)" }}>Separate</span> · paid ads
          </div>
          <div className="grid-contact" style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(220px, 1fr)", gap: 56, alignItems: "start" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: "clamp(24px, 3.2vw, 36px)", lineHeight: 1.12, fontWeight: 400, maxWidth: 620 }}>
                Ads are quoted on your account, not on a menu.
              </h2>
              <p style={{ marginTop: 24, maxWidth: 620, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
                A lawn crew filling next week&apos;s route and a remodeler who needs three kitchen jobs a year do not have the same ad problem, so they should not have the same ad price. We quote it against your account, your market, and what you want to spend. It bolts onto any tier.
              </p>
              <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: "6px 24px" }}>
                {[
                  "Google, Meta, and Local Services Ads",
                  "You own the account and the data, always",
                  "No markup on your ad spend, ever",
                  "One-time setup at half the monthly fee",
                ].map((b) => (
                  <div key={b} style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>+ {b}</div>
                ))}
              </div>
            </div>
            <div style={{ border: "1px solid var(--rule)", padding: "28px 24px", background: "var(--bg-soft)" }}>
              <div className="mono" style={{ fontSize: 10, ...label, marginBottom: 8 }}>Management</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 30, fontWeight: 300 }}>from $497</span>
                <span className="mono" style={{ color: "var(--muted)", fontSize: 12 }}>/ mo</span>
              </div>
              <p style={{ marginTop: 14, fontSize: 13, lineHeight: 1.6, color: "var(--muted)" }}>
                Plus a one-time setup fee at 50% of the monthly management fee. Ad spend is billed by Google or Meta directly to you.
              </p>
            </div>
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* Pay for performance */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ ...label, marginBottom: 28 }}>
            <span style={{ color: "var(--accent)" }}>Rather pay for results?</span> · performance pricing
          </div>
          <div className="grid-contact" style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(220px, 1fr)", gap: 56, alignItems: "start" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: "clamp(24px, 3.2vw, 36px)", lineHeight: 1.12, fontWeight: 400, maxWidth: 640 }}>
                Pay less up front. Pay more only when leads come in.
              </h2>
              <p style={{ marginTop: 24, maxWidth: 620, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
                On our top tier, you can trade a lower monthly base for a small fee on each qualified lead or booked appointment we send you. Not a cut of your revenue, we never see your books. A fee on the tracked calls, forms, and bookings you and we both watch in the same dashboard. You still pay the lower base each month; if no qualified leads come in, there are simply no per-lead fees on top.
              </p>
              <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: "6px 24px" }}>
                {[
                  "Lower monthly base, plus a fee per qualified lead or booking",
                  "You see every lead and booking we count, in real time",
                  "A qualified lead is a real call, form, or booking, defined in writing",
                  "Spam and your existing customers never count",
                  "Needs call and conversion tracking installed first",
                ].map((b) => (
                  <div key={b} style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>+ {b}</div>
                ))}
              </div>
            </div>
            <div style={{ border: "1px solid var(--accent)", padding: "28px 24px", background: "var(--accent-soft)" }}>
              <div className="mono" style={{ fontSize: 10, ...label, marginBottom: 8 }}>Pro Performance</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 30, fontWeight: 300 }}>from $997</span>
                <span className="mono" style={{ color: "var(--muted)", fontSize: 12 }}>/ mo</span>
              </div>
              <p style={{ marginTop: 14, fontSize: 13, lineHeight: 1.6, color: "var(--muted)" }}>
                Lower base than flat Pro, plus a per-lead or per-booked-appointment fee quoted for your market. Only available with our ad management and tracking in place.
              </p>
            </div>
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* À la carte */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ ...label, marginBottom: 28 }}>
            <span style={{ color: "var(--accent)" }}>Only want one thing?</span> · buy the piece
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(24px, 3.2vw, 36px)", lineHeight: 1.12, fontWeight: 400, maxWidth: 660 }}>
            Start with one piece. The tiers just cost less than buying them separately.
          </h2>
          <p style={{ marginTop: 24, maxWidth: 620, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
            Some owners only want their Google listing fixed. That&apos;s fine, start there. Here&apos;s what each piece costs on its own.
          </p>

          <div style={{ marginTop: 44, display: "grid", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)" }}>
            {PARTS.map((p) => (
              <div key={p.name} className="grid-parts" style={{ background: "var(--bg)", padding: "22px 28px" }}>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                  <span style={{ fontSize: 19, fontWeight: 300 }}>{p.price}</span>
                  {p.cadence && <span className="mono" style={{ color: "var(--muted)", fontSize: 11 }}>{p.cadence}</span>}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: "var(--muted)" }}>{p.desc}</div>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 28, maxWidth: 620, fontSize: 14, lineHeight: 1.6, color: "var(--muted)" }}>
            Been with us a couple of months and want to lock it in? Annual prepay takes about 25% off. We only offer it once you&apos;ve seen the work, never on day one.
          </p>
        </section>

        {/* The anchor */}
        <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
            <div className="mono" style={{ ...label, marginBottom: 28 }}>
              <span style={{ color: "var(--accent)" }}>For comparison</span> · what this costs elsewhere
            </div>
            <h2 style={{ margin: 0, fontSize: "clamp(24px, 3.2vw, 36px)", lineHeight: 1.12, fontWeight: 400, maxWidth: 660 }}>
              The same work, at what the rest of the market charges for it.
            </h2>

            <div style={{ marginTop: 44, display: "grid", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)" }}>
              <div className="mono grid-anchor anchor-head" style={{ background: "var(--bg)", padding: "14px 28px", ...label, fontSize: 10 }}>
                <div>What you need</div>
                <div>Everyone else</div>
                <div style={{ color: "var(--accent)" }}>SIMPL</div>
              </div>
              {ELSEWHERE.map((e) => (
                <div key={e.what} className="grid-anchor" style={{ background: "var(--bg)", padding: "20px 28px" }}>
                  <div className="anchor-what" style={{ fontSize: 15 }}>{e.what}</div>
                  <div>
                    <div className="mono anchor-mini" style={{ ...label, fontSize: 9, marginBottom: 3 }}>Everyone else</div>
                    <div className="mono" style={{ fontSize: 13, color: "var(--muted)", textDecoration: "line-through", textDecorationColor: "var(--muted)" }}>{e.them}</div>
                  </div>
                  <div>
                    <div className="mono anchor-mini" style={{ ...label, fontSize: 9, marginBottom: 3, color: "var(--accent)" }}>SIMPL</div>
                    <div className="mono" style={{ fontSize: 13, color: "var(--accent)", fontWeight: 500 }}>{e.us}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 48, maxWidth: 620 }}>
              <div className="mono" style={{ ...label, marginBottom: 12 }}>Why we cost less</div>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6 }}>
                You&apos;re not paying for an account manager, a sales team, or an office. You work directly with the person doing the work.
              </p>
            </div>

            <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 32, lineHeight: 1.7 }}>
              Comparison figures are 2026 published agency rates for one-location local service businesses. Sources: SEOProfy, Arc4, Digital Applied, Tenet.
            </div>
          </div>
        </section>

        {/* FAQ: objection handling */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ ...label, marginBottom: 28 }}>
            <span style={{ color: "var(--accent)" }}>Before you ask</span> · the awkward questions
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(24px, 3.2vw, 36px)", lineHeight: 1.12, fontWeight: 400, maxWidth: 660, marginBottom: 44 }}>
            The things you&apos;re actually wondering.
          </h2>
          <div style={{ display: "grid", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)", maxWidth: 860 }}>
            {FAQS.map((f) => (
              <details key={f.q} style={{ background: "var(--bg)", padding: "22px 28px" }}>
                <summary style={{ cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", gap: 24, alignItems: "baseline", fontSize: 16, minHeight: 24 }}>
                  {f.q}
                  <span aria-hidden="true" style={{ color: "var(--accent)", fontSize: 20, lineHeight: 1, flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.6, color: "var(--muted)", maxWidth: 660 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* Free scan */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ ...label, marginBottom: 28 }}>
            <span style={{ color: "var(--accent)" }}>Start here</span> · run a free scan
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(24px, 3.2vw, 36px)", lineHeight: 1.12, fontWeight: 400, maxWidth: 620 }}>
            Type a domain. See what it&apos;s costing you. Decide from there.
          </h2>
          <div style={{ marginTop: 40 }}><ScanTool compact /></div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* Contact */}
        <section data-section="contact" style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ ...label, marginBottom: 28 }}>
            <span style={{ color: "var(--accent)" }}>Ready?</span> · send a note
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(24px, 3.2vw, 36px)", lineHeight: 1.12, fontWeight: 400, maxWidth: 620, marginBottom: 48 }}>
            Tell us what you need. Hear back same day.
          </h2>
          <div className="grid-contact" style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(220px, 1fr)", gap: 56, alignItems: "start" }}>
            <ContactForm />
            <div style={{ display: "grid", gap: 28 }}>
              <div>
                <div className="mono" style={{ ...label, marginBottom: 10 }}>Reply window</div>
                <div style={{ fontSize: 16, lineHeight: 1.5 }}>Same business day, usually within four hours.</div>
              </div>
              <div>
                <div className="mono" style={{ ...label, marginBottom: 10 }}>From</div>
                <div style={{ fontSize: 16, lineHeight: 1.5 }}>A person. Not a sequence. Not a calendar link.</div>
              </div>
              <div>
                <div className="mono" style={{ ...label, marginBottom: 10 }}>Direct</div>
                <a href="mailto:team@simpl.pro" className="mono" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 2 }}>team@simpl.pro</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FloatingCTA label="Get my price" glyph="→" target="[data-section='contact']" />
      <Footer />
    </div>
  );
}
