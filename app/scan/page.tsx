import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScanTool from "../components/ScanTool";

export const metadata: Metadata = {
  title: "Free Website Scan | SIMPL",
  description: "See exactly what SIMPL checks: discoverability, performance, reputation, and spend. Type your domain, get your SIMPL Score in 30 seconds.",
  openGraph: {
    title: "Free Website Scan | SIMPL",
    description: "Type your domain, get your SIMPL Score in 30 seconds. No signup, no email required.",
    url: "https://simpl.pro/scan",
    siteName: "SIMPL",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/scan" },
};

const SURFACES = [
  { code: "01 / DISCOVERABILITY", title: "Whether Google can find you.", items: ["Indexing health across every page", "Google Business Profile status and integrity", "Schema, sitemap, robots regressions", "Branded search results and SERP layout", "Map pack ranking and competitor displacement"] },
  { code: "02 / PERFORMANCE", title: "Whether your site actually works.", items: ["Uptime monitoring (60-second resolution)", "Core Web Vitals across mobile and desktop", "Form submission delivery (silent fails)", "Checkout and order flow integrity", "Plugin, CMS, and framework regressions"] },
  { code: "03 / REPUTATION", title: "What people are saying when you're not looking.", items: ["Review monitoring across Google, Yelp, industry sites", "Sentiment drift and rating velocity", "Response cadence on negative reviews", "Competitor rating delta over time", "New mentions across the social web"] },
  { code: "04 / SPEND", title: "Where your marketing dollars actually end up.", items: ["Branded search defense (competitor bidding)", "Wasted spend detection on dead keywords", "Landing-page mismatch with ad copy", "Bid efficiency vs. category benchmarks", "Inventory audit across Google, Meta, Bing"] },
];

const STEPS = [
  { n: "01", h: "You give us a domain.", p: "No login, no credit card, no questionnaire. A field and a button." },
  { n: "02", h: "SIMPL runs all eight checks.", p: "Website, crawlability, SEO, content, trust, schema, social, and Google Business Profile. 50+ individual signals, most of which you've never seen." },
  { n: "03", h: "We rank what's wrong.", p: "Findings get sorted by severity. Critical issues first, nice-to-haves last. The order usually surprises people." },
  { n: "04", h: "You see your SIMPL Score.", p: "A grade from A to F across 8 categories. Every finding explained in plain English. No jargon, no upsell walls." },
  { n: "05", h: "We fix it, or you do.", p: "Start a plan and our team handles everything. Or take the findings and fix them yourself. Either way, you'll know exactly what's broken." },
];

export default function ScanPage() {
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "SIMPL Free Website Scanner",
          "description": "Free tool that scans your website, Google Business Profile, SEO, and digital presence. Get a SIMPL Score from 0 to 100 in 30 seconds.",
          "url": "https://simpl.pro/scan",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "provider": {
            "@type": "Organization",
            "name": "SIMPL",
            "url": "https://simpl.pro"
          }
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simpl.pro" },
            { "@type": "ListItem", "position": 2, "name": "Free Scan", "item": "https://simpl.pro/scan" }
          ]
        }) }} />
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "140px 32px 96px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 48 }}>The SIMPL Scan</div>
          <h1 style={{ margin: 0, fontSize: "clamp(40px, 6.4vw, 81px)", lineHeight: 1.04, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 1000 }}>
            Type your domain.<br /><span style={{ color: "var(--muted)" }}>See what nobody told you.</span>
          </h1>
          <p style={{ marginTop: 40, maxWidth: 680, fontSize: 19, lineHeight: 1.55 }}>
            One scan. No signup. No email. SIMPL checks your entire digital presence and gives you a score from 0 to 100. Most businesses score lower than they expect.
          </p>
          <div style={{ marginTop: 56 }}><ScanTool /></div>
        </section>

        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "159px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 48 }}>How the scan works</div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400 }}>Five steps. Thirty seconds. Here&apos;s what happens.</h2>
          <div style={{ marginTop: 72, display: "grid", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)" }}>
            {STEPS.map((s) => (
              <div key={s.n} style={{ background: "var(--bg)", padding: "32px 36px", display: "grid", gridTemplateColumns: "60px minmax(220px, 1fr) minmax(0, 2fr)", gap: 28, alignItems: "baseline" }}>
                <div className="mono" style={{ color: "var(--fg)", fontSize: 13 }}>{s.n}</div>
                <h3 style={{ fontSize: 22, fontWeight: 400, margin: 0 }}>{s.h}</h3>
                <div style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.55 }}>{s.p}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 40, fontSize: 17, lineHeight: 1.55, color: "var(--muted)", maxWidth: 680 }}>That&apos;s the process. But what exactly are those 50+ signals? Here&apos;s where it gets interesting.</p>
        </section>

        <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "159px 32px" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 48 }}>What gets checked</div>
            <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400 }}>Four surfaces. 50+ signals. Most tools only check one.</h2>
            <div style={{ marginTop: 72, display: "grid", gap: 1, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", background: "var(--rule)", border: "1px solid var(--rule)" }}>
              {SURFACES.map((s) => (
                <div key={s.code} style={{ background: "var(--bg)", padding: "44px 36px 40px", minHeight: 360, display: "flex", flexDirection: "column", gap: 24 }}>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--fg)", textTransform: "uppercase" }}>{s.code}</div>
                  <h3 style={{ fontSize: 24, fontWeight: 400, margin: 0 }}>{s.title}</h3>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 12, color: "var(--muted)", fontSize: 15 }}>
                    {s.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ borderTop: "1px solid var(--rule)", padding: "140px 0", textAlign: "center" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
            <h2 style={{ margin: 0, fontSize: "clamp(36px, 5.2vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 880, marginInline: "auto" }}>
              Your competitors have already been scanned.<br /><span style={{ color: "var(--muted)" }}>Your turn takes thirty seconds.</span>
            </h2>
            <div style={{ marginTop: 56, maxWidth: 760, marginInline: "auto", textAlign: "left" }}><ScanTool compact /></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
