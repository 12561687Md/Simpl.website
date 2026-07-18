import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScanTool from "../../components/ScanTool";

export const metadata: Metadata = {
  title: "Long-Term Organic Growth",
  description:
    "Build compounding search authority that outlasts any ad budget. Content architecture, essential page builds, domain authority, and backlink acquisition.",
  openGraph: {
    title: "Long-Term Organic Growth | SIMPL",
    description: "Build compounding search authority that outlasts any ad budget. Content architecture, essential page builds, domain authority, and backlink acquisition.",
    url: "https://simpl.pro/services/organic-growth",
    siteName: "SIMPL",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/services/organic-growth" },
};

const INCLUDES = [
  "Content architecture and topic clustering",
  "Essential page builds (services, about, FAQ, location)",
  "Internal linking strategy and implementation",
  "Crawlability maintenance and monitoring",
  "Domain authority building",
  "Backlink acquisition through digital PR",
  "Competitor content gap analysis",
  "Monthly organic traffic reporting",
];

export default function OrganicGrowth() {
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Long-Term Organic Growth",
          "description": "Build compounding search authority with content architecture, essential page builds, domain authority growth, and backlink acquisition that outlasts any ad budget.",
          "provider": {
            "@type": "Organization",
            "name": "SIMPL",
            "url": "https://simpl.pro"
          },
          "areaServed": { "@type": "Country", "name": "United States" },
          "url": "https://simpl.pro/services/organic-growth"
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simpl.pro" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://simpl.pro/services" },
            { "@type": "ListItem", "position": 3, "name": "Long-Term Organic Growth", "item": "https://simpl.pro/services/organic-growth" }
          ]
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How long does SEO take to show results?",
              "acceptedAnswer": { "@type": "Answer", "text": "Most businesses start seeing meaningful organic traffic growth within 3-6 months. The first improvements, like better indexing and fixing technical issues, show up within weeks. But the real compounding effect, where pages climb to page one and stay there, typically takes 4-6 months of consistent work." }
            },
            {
              "@type": "Question",
              "name": "What kind of content do you create?",
              "acceptedAnswer": { "@type": "Answer", "text": "We build the pages that drive revenue: service pages, location pages, FAQ content, and industry-specific articles that target the exact searches your customers are making. Every piece is written to rank and convert, not just to fill a blog. We focus on the content your competitors already have that you are missing." }
            },
            {
              "@type": "Question",
              "name": "Will I own the content you produce?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes, 100%. Every page, article, and asset we create belongs to you. If you ever stop working with SIMPL, all the content stays on your site. That is the whole point of organic growth: you are building assets you own, not renting attention from an ad platform." }
            }
          ]
        }) }} />
        {/* Hero */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px 64px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24 }}>
            04 / Long-Term Organic Growth
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 800 }}>
            Long-Term Organic Growth
          </h1>
          <p style={{ marginTop: 24, maxWidth: 640, fontSize: 19, lineHeight: 1.5, color: "var(--muted)" }}>
            Every month without a content strategy is a month your competitors are building authority you&apos;ll have to outspend to catch.
          </p>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* What's included */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            What&apos;s included
          </div>
          <h2 style={{ margin: "0 0 40px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
            Assets that grow in value every month you own them.
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

        {/* The compounding effect */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            The compounding effect
          </div>
          <h2 style={{ margin: "0 0 20px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
            Every page you build today drives traffic for years.
          </h2>
          <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)" }}>
            Organic content is the only marketing channel where your cost-per-acquisition drops over time. A service page written today ranks higher next month, earns more backlinks next quarter, and drives more traffic next year. While paid ads stop the second you stop paying, organic assets compound. The longer you invest, the harder it becomes for competitors to catch up.
          </p>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* What comes next */}
        <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
              What comes next
            </div>
            <h2 style={{ margin: "0 0 20px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
              The machine is running. Who makes sure it stays that way?
            </h2>
            <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 32 }}>
              Growth without direction eventually stalls. Continuous strategy keeps every channel aligned, catches regressions before they cost you, and finds the next opportunity before your competitors do.
            </p>
            <Link href="/services/strategy" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 4, fontSize: 15 }}>
              Fractional CMO & Strategy<span>→</span>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            Common questions
          </div>
          <h2 style={{ margin: "0 0 40px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
            Questions we hear from every business investing in SEO.
          </h2>
          <div style={{ display: "grid", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)" }}>
            <div style={{ background: "var(--bg)", padding: "28px 32px" }}>
              <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 12px" }}>How long does SEO take to show results?</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
                Most businesses start seeing meaningful organic traffic growth within 3-6 months. The first improvements, like better indexing and fixing technical issues, show up within weeks. But the real compounding effect, where pages climb to page one and stay there, typically takes 4-6 months of consistent work.
              </p>
            </div>
            <div style={{ background: "var(--bg)", padding: "28px 32px" }}>
              <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 12px" }}>What kind of content do you create?</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
                We build the pages that drive revenue: service pages, location pages, FAQ content, and industry-specific articles that target the exact searches your customers are making. Every piece is written to rank and convert, not just to fill a blog. We focus on the content your competitors already have that you are missing.
              </p>
            </div>
            <div style={{ background: "var(--bg)", padding: "28px 32px" }}>
              <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 12px" }}>Will I own the content you produce?</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
                Yes, 100%. Every page, article, and asset we create belongs to you. If you ever stop working with SIMPL, all the content stays on your site. That is the whole point of organic growth: you are building assets you own, not renting attention from an ad platform.
              </p>
            </div>
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* CTA */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px" }}>
          <h2 style={{ margin: "0 0 12px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400 }}>
            See where your organic presence stands today.
          </h2>
          <p style={{ maxWidth: 540, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 40 }}>
            Get your free audit and find the gaps holding back your search authority.
          </p>
          <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 620, lineHeight: 1.55, marginBottom: 24 }}>
            How thin is your content compared to competitors? Type your domain to see your content grade.
          </p>
          <ScanTool compact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
