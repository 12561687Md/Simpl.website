import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScanTool from "../../components/ScanTool";

export const metadata: Metadata = {
  title: "Custom Website Build",
  description:
    "A fast, findable website built to turn visitors into calls. $997 to $2,997, or free when you start on Team.",
  openGraph: {
    title: "Custom Website Build | SIMPL",
    description: "A fast, findable website built to turn visitors into calls. Free when you start on Team.",
    url: "https://simpl.pro/services/website-build",
    siteName: "SIMPL",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/services/website-build" },
};

const INCLUDES = [
  "Every page your business actually needs, not a five-page template",
  "Mobile-first, built to load fast on a jobsite connection",
  "Schema markup and technical SEO from day one, not bolted on later",
  "Click-to-call, quote forms, and booking wired in from the start",
  "Your reviews and real photos, not stock imagery",
  "Built to be found: sitemap, indexing, and crawlability handled",
];

export default function WebsiteBuild() {
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Custom Website Build",
          "description": "A fast, findable website built to turn visitors into calls. Flat-rate, scope-based pricing, free when starting on Team with a 3-month commitment.",
          "provider": { "@type": "Organization", "name": "SIMPL", "url": "https://simpl.pro" },
          "areaServed": { "@type": "Country", "name": "United States" },
          "url": "https://simpl.pro/services/website-build",
          "offers": { "@type": "Offer", "priceSpecification": { "@type": "PriceSpecification", "minPrice": "997", "maxPrice": "2997", "priceCurrency": "USD" } }
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simpl.pro" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://simpl.pro/start" },
            { "@type": "ListItem", "position": 3, "name": "Custom Website Build", "item": "https://simpl.pro/services/website-build" }
          ]
        }) }} />

        {/* Hero */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px 64px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24 }}>
            Custom Website
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 800 }}>
            A site built to turn visitors into calls.
          </h1>
          <p style={{ marginTop: 24, maxWidth: 640, fontSize: 19, lineHeight: 1.5, color: "var(--muted)" }}>
            Not a template with your logo dropped in. A site built around how your customers actually search, click, and call, from the first page load.
          </p>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* What's included */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            What&apos;s included
          </div>
          <h2 style={{ margin: "0 0 40px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
            Everything the other services on this page need to work.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {INCLUDES.map((item) => (
              <div key={item} style={{ padding: "16px 20px", background: "var(--bg-soft)", border: "1px solid var(--rule)", fontSize: 15, lineHeight: 1.5 }}>
                {item}
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* Pricing, plain */}
        <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
              What it costs
            </div>
            <h2 style={{ margin: "0 0 20px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
              $997 to $2,997, scope-based. Or $0 on Team.
            </h2>
            <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 32 }}>
              Start Simpl.team with a 3-month commitment and the build is free, we cover it because a client with a fast,
              findable site is a client who sticks around. Leave before month three and the remaining minimum comes due,
              or we invoice the build at its normal rate. Either way, you keep the site.
            </p>
            <Link href="/start" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 4, fontSize: 15 }}>
              See the full pricing breakdown<span>→</span>
            </Link>
          </div>
        </section>

        {/* What comes next */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            What comes next
          </div>
          <h2 style={{ margin: "0 0 20px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
            A site is the foundation. Traffic is what makes it worth having.
          </h2>
          <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 32 }}>
            The best site in your market still needs to be found. Once it's live, the next layer puts it in front of the
            people already searching for what you sell.
          </p>
          <Link href="/services/local-seo" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 4, fontSize: 15 }}>
            Local SEO & AI Search Visibility<span>→</span>
          </Link>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* CTA */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px" }}>
          <h2 style={{ margin: "0 0 12px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400 }}>
            See what your current site is costing you.
          </h2>
          <p style={{ maxWidth: 540, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 40 }}>
            Run a free scan first. If a rebuild isn&apos;t what's holding you back, we&apos;ll tell you that too.
          </p>
          <ScanTool compact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
