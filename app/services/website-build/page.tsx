import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScanTool from "../../components/ScanTool";
import ScrollReveal, { StaggerReveal, StaggerItem } from "../../components/ScrollReveal";

export const metadata: Metadata = {
  title: "Custom Website Build",
  description:
    "A fast, findable website built to turn visitors into calls. Free when you start on Team.",
  openGraph: {
    title: "Custom Website Build | Simpl",
    description: "A fast, findable website built to turn visitors into calls. Free when you start on Team.",
    url: "https://simpl.pro/services/website-build",
    siteName: "Simpl",
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

// No priceSpecification: prices are a sales-call conversation now, so we don't
// expose one in structured data either (it would surface in rich results / AI).
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Website Build",
  description: "A fast, findable website built to turn visitors into calls. Free when you start on the Simpl Team plan with a 3-month commitment.",
  provider: { "@type": "Organization", name: "Simpl", url: "https://simpl.pro" },
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://simpl.pro/services/website-build",
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://simpl.pro" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://simpl.pro/services" },
    { "@type": "ListItem", position: 3, name: "Custom Website Build", item: "https://simpl.pro/services/website-build" },
  ],
};

const eyebrow: React.CSSProperties = { fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 };
const h2: React.CSSProperties = { margin: "0 0 20px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 };
const rule = <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />;

export default function WebsiteBuild() {
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([SERVICE_SCHEMA, BREADCRUMB_SCHEMA]) }} />

        {/* Hero */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "140px 32px 64px" }}>
          <ScrollReveal>
            <div className="mono" style={{ ...eyebrow, marginBottom: 24 }}>Custom Website</div>
            <h1 style={{ margin: 0, fontSize: "clamp(34px, 5.2vw, 56px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 500, maxWidth: 860 }}>
              A site built to turn visitors into calls.
              <br /><span style={{ color: "var(--muted)" }}>Not a template with your logo dropped in.</span>
            </h1>
            <p style={{ marginTop: 28, maxWidth: 660, fontSize: 19, lineHeight: 1.55, color: "var(--muted)" }}>
              A site built around how your customers actually search, click, and call, from the first page load.
            </p>
            <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16 }}>
              <Link href="/start-now" className="cta-primary" style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "14px 26px", fontSize: 15, fontWeight: 600, borderRadius: 999 }}>
                Get your build quote, free →
              </Link>
              <Link href="/scan" style={{ color: "var(--fg)", textDecoration: "none", padding: "13px 24px", fontSize: 15, border: "1px solid var(--rule-strong)", borderRadius: 999 }}>
                Run the free scan
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {rule}

        {/* What's included */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <ScrollReveal>
            <div className="mono" style={eyebrow}>What&apos;s included</div>
            <h2 style={{ ...h2, marginBottom: 40 }}>Everything the other services need to work.</h2>
          </ScrollReveal>
          <StaggerReveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {INCLUDES.map((item) => (
              <StaggerItem key={item}>
                <div className="service-include" style={{ padding: "18px 20px", background: "var(--bg-elev)", border: "1px solid var(--rule)", borderRadius: 10, fontSize: 15, lineHeight: 1.5, height: "100%" }}>
                  {item}
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </section>

        {rule}

        {/* What it costs (the one accent moment) */}
        <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
            <ScrollReveal>
              <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 32, maxWidth: 760 }}>
                <div className="mono" style={eyebrow}>What it costs</div>
                <h2 style={h2}>Free when you start on Team.</h2>
                <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 28 }}>
                  Start Simpl.team and the build is on us, we cover it because a client with a fast, findable site is a
                  client who sticks around. And the site is yours, you keep it no matter what. Standalone builds are scoped
                  to what your business actually needs, we&apos;ll quote yours on a free call, usually in under 20 minutes.
                </p>
                <Link href="/start-now" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 4, fontSize: 15 }}>
                  Get your build quote, free<span>→</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* What comes next */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <ScrollReveal>
            <div className="mono" style={eyebrow}>What comes next</div>
            <h2 style={h2}>A site is the foundation. Traffic is what makes it worth having.</h2>
            <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 32 }}>
              The best site in your market still needs to be found. Once it&apos;s live, the next layer puts it in front of the
              people already searching for what you sell.
            </p>
            <Link href="/services/local-seo" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 4, fontSize: 15 }}>
              Local SEO & AI Search Visibility<span>→</span>
            </Link>
          </ScrollReveal>
        </section>

        {rule}

        {/* CTA */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "88px 32px 100px" }}>
          <ScrollReveal>
            <h2 style={{ margin: "0 0 12px", fontSize: "clamp(26px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 500 }}>
              See what your current site is costing you.
            </h2>
            <p style={{ maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 32 }}>
              Start with a free audit. If a rebuild isn&apos;t what&apos;s holding you back, we&apos;ll tell you that too.
            </p>
            <ScanTool compact />
            <p className="mono" style={{ marginTop: 18, fontSize: 12, letterSpacing: "0.04em", color: "var(--fg-dim)" }}>
              No credit card. Your score in about 60 seconds.
            </p>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
