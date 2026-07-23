import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScanTool from "../../components/ScanTool";

export const metadata: Metadata = {
  title: "Paid Performance Marketing",
  description:
    "Scale traffic instantly with campaigns that actually convert. Google Ads, LSAs, Meta retargeting, landing page optimization, and full conversion tracking.",
  openGraph: {
    title: "Paid Performance Marketing | Simpl",
    description: "Scale traffic instantly with campaigns that actually convert. Google Ads, LSAs, Meta retargeting, landing page optimization, and full conversion tracking.",
    url: "https://simpl.pro/services/paid-ads",
    siteName: "Simpl",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/services/paid-ads" },
};

const INCLUDES = [
  "Google Search Ads setup and management",
  "Local Services Ads (LSA) optimization",
  "Meta retargeting campaigns",
  "Branded search defense",
  "Landing page optimization for ad traffic",
  "Full conversion tracking implementation",
  "Keyword-level ROI reporting",
  "A/B testing for ad creative and landing pages",
];

export default function PaidAds() {
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Paid Performance Marketing",
          "description": "Scale traffic instantly with Google Ads, LSAs, Meta retargeting, landing page optimization, and full conversion tracking that proves ROI.",
          "provider": {
            "@type": "Organization",
            "name": "Simpl",
            "url": "https://simpl.pro"
          },
          "areaServed": { "@type": "Country", "name": "United States" },
          "url": "https://simpl.pro/services/paid-ads"
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simpl.pro" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://simpl.pro/services" },
            { "@type": "ListItem", "position": 3, "name": "Paid Performance Marketing", "item": "https://simpl.pro/services/paid-ads" }
          ]
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How much should I budget for Google Ads?",
              "acceptedAnswer": { "@type": "Answer", "text": "It depends on your industry and market, and we'll give you a straight number for yours on a free call before anything launches. Simpl helps you avoid wasted spend from day one by building campaigns around the keywords that actually convert, not just the ones with the most volume. You own the ad account either way, and every dollar of spend goes to the platform, not to us." }
            },
            {
              "@type": "Question",
              "name": "How quickly will I see results from paid ads?",
              "acceptedAnswer": { "@type": "Answer", "text": "Paid ads can generate leads within the first week of launch. Unlike SEO, you do not have to wait for Google to crawl and rank your pages. Most Simpl clients see their first qualified leads within 7-14 days of campaign launch, with optimization improving results every week after that." }
            },
            {
              "@type": "Question",
              "name": "Can competitors really bid on my brand name?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes, and many do. It is completely legal for a competitor to bid on your business name as a keyword in Google Ads. That means when someone searches for you specifically, a competitor's ad can appear above your organic listing. Simpl includes branded search defense to protect the traffic you have already earned." }
            }
          ]
        }) }} />
        {/* Hero */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px 64px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24 }}>
            03 / Paid Performance Marketing
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 800 }}>
            Paid Performance Marketing
          </h1>
          <p style={{ marginTop: 24, maxWidth: 640, fontSize: 19, lineHeight: 1.5, color: "var(--muted)" }}>
            Your competitors are bidding on your brand name right now. Every click they steal is a customer you already earned, paying someone else.
          </p>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* What's included */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            What&apos;s included
          </div>
          <h2 style={{ margin: "0 0 40px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
            Paid channels that pay for themselves.
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
            Clean data on what converts, feeding your long-term organic strategy.
          </h2>
          <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)" }}>
            Paid campaigns do more than generate leads today. Every click, conversion, and bounce tells you exactly which keywords and pages your audience cares about. That data directly informs your content strategy, page builds, and SEO priorities. The result: your organic growth gets smarter every month because paid already proved what works.
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
              Ads are driving leads. Now build the assets that make ads optional.
            </h2>
            <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 32 }}>
              Paid traffic is fast but it stops the moment you stop spending. Organic growth builds compounding assets that reduce your cost-per-acquisition every month.
            </p>
            <Link href="/services/organic-growth" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 4, fontSize: 15 }}>
              Long-Term Organic Growth<span>→</span>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            Common questions
          </div>
          <h2 style={{ margin: "0 0 40px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
            Questions we hear before every campaign.
          </h2>
          <div style={{ display: "grid", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)" }}>
            <div style={{ background: "var(--bg)", padding: "28px 32px" }}>
              <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 12px" }}>How much should I budget for Google Ads?</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
                It depends on your industry and market, and we'll give you a straight number for yours on a free call before anything launches. Simpl helps you avoid wasted spend from day one by building campaigns around the keywords that actually convert, not just the ones with the most volume. You own the ad account either way, and every dollar of spend goes to the platform, not to us.
              </p>
            </div>
            <div style={{ background: "var(--bg)", padding: "28px 32px" }}>
              <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 12px" }}>How quickly will I see results from paid ads?</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
                Paid ads can generate leads within the first week of launch. Unlike SEO, you do not have to wait for Google to crawl and rank your pages. Most Simpl clients see their first qualified leads within 7-14 days of campaign launch, with optimization improving results every week after that.
              </p>
            </div>
            <div style={{ background: "var(--bg)", padding: "28px 32px" }}>
              <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 12px" }}>Can competitors really bid on my brand name?</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
                Yes, and many do. It is completely legal for a competitor to bid on your business name as a keyword in Google Ads. That means when someone searches for you specifically, a competitor&apos;s ad can appear above your organic listing. Simpl includes branded search defense to protect the traffic you have already earned.
              </p>
            </div>
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* CTA */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px" }}>
          <h2 style={{ margin: "0 0 12px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400 }}>
            Find out if your site is ready for paid traffic.
          </h2>
          <p style={{ maxWidth: 540, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 40 }}>
            Start now, before spending a dollar on ads.
          </p>
          <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 620, lineHeight: 1.55, marginBottom: 24 }}>
            Are competitors bidding on your brand name? Start with a scan to see what you&apos;re up against.
          </p>
          <ScanTool compact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
