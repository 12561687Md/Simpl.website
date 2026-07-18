import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScanTool from "../../components/ScanTool";

export const metadata: Metadata = {
  title: "Local SEO & AI Search Visibility",
  description:
    "Dominate the local 3-pack and show up when someone asks AI who to call. GBP optimization, citation building, review strategy, local keyword targeting, and AI-search visibility.",
  openGraph: {
    title: "Local SEO & AI Search Visibility | SIMPL",
    description: "Dominate the local 3-pack and show up when someone asks AI who to call. GBP optimization, citation building, review strategy, and AI-search visibility.",
    url: "https://simpl.pro/services/local-seo",
    siteName: "SIMPL",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/services/local-seo" },
};

const INCLUDES = [
  "Google Business Profile optimization",
  "GBP suspension protection and recovery",
  "Citation building and NAP consistency",
  "Review velocity strategy and response templates",
  "On-page schema markup implementation",
  "Local keyword targeting and mapping",
  "Service area page creation",
  "Local pack ranking monitoring",
  "AI-search visibility (showing up when someone asks ChatGPT or Gemini who to call)",
];

export default function LocalSEO() {
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Local SEO & AI Search Visibility",
          "description": "Dominate the local 3-pack with GBP optimization, citation building, review strategy, and local keyword targeting for high-intent searchers.",
          "provider": {
            "@type": "Organization",
            "name": "SIMPL",
            "url": "https://simpl.pro"
          },
          "areaServed": { "@type": "Country", "name": "United States" },
          "url": "https://simpl.pro/services/local-seo"
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simpl.pro" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://simpl.pro/services" },
            { "@type": "ListItem", "position": 3, "name": "Local SEO & AI Search Visibility", "item": "https://simpl.pro/services/local-seo" }
          ]
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How long does it take to rank in the local 3-pack?",
              "acceptedAnswer": { "@type": "Answer", "text": "Most businesses start seeing movement within 4-8 weeks, depending on competition in your area and how optimized your profile is today. Some clients with a solid foundation but poor GBP hygiene see results in as little as two weeks after cleanup." }
            },
            {
              "@type": "Question",
              "name": "Do I need a Google Business Profile?",
              "acceptedAnswer": { "@type": "Answer", "text": "If you serve customers in a specific area, yes. A Google Business Profile is the single most important factor in local search rankings. Without one, you are invisible in Google Maps and the local 3-pack, which is where most high-intent local searches end up." }
            },
            {
              "@type": "Question",
              "name": "What's a citation and why does it matter?",
              "acceptedAnswer": { "@type": "Answer", "text": "A citation is any online mention of your business name, address, and phone number (NAP). Consistent citations across directories like Yelp, BBB, and industry-specific sites tell Google your business is real and trustworthy. Inconsistent citations confuse Google and hurt your rankings." }
            }
          ]
        }) }} />
        {/* Hero */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px 64px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24 }}>
            02 / Local SEO & AI Search Visibility
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 800 }}>
            Local SEO & AI Search Visibility
          </h1>
          <p style={{ marginTop: 24, maxWidth: 640, fontSize: 19, lineHeight: 1.5, color: "var(--muted)" }}>
            Three businesses show up when someone searches for what you do. If you&apos;re not one of them, those leads are going to your competitors. Every single day.
          </p>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* What's included */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            What&apos;s included
          </div>
          <h2 style={{ margin: "0 0 40px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
            Show up where your customers are already looking.
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
            Local visibility generates revenue without paying for every click.
          </h2>
          <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)" }}>
            When someone searches &quot;plumber near me&quot; or &quot;best accountant in [city],&quot; they are ready to buy. Showing up in the local 3-pack puts you in front of buyers at the exact moment they need you, and every review, citation, and optimized listing compounds over time. Unlike paid ads, this traffic keeps growing without increasing your spend.
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
              Organic is working. Ready to pour fuel on the fire?
            </h2>
            <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 32 }}>
              Local visibility brings in steady leads. Paid performance marketing lets you scale that demand instantly while feeding data back into your organic strategy.
            </p>
            <Link href="/services/paid-ads" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 4, fontSize: 15 }}>
              Paid Performance Marketing<span>→</span>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            Common questions
          </div>
          <h2 style={{ margin: "0 0 40px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
            Questions we hear from every local business.
          </h2>
          <div style={{ display: "grid", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)" }}>
            <div style={{ background: "var(--bg)", padding: "28px 32px" }}>
              <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 12px" }}>How long does it take to rank in the local 3-pack?</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
                Most businesses start seeing movement within 4-8 weeks, depending on competition in your area and how optimized your profile is today. Some clients with a solid foundation but poor GBP hygiene see results in as little as two weeks after cleanup.
              </p>
            </div>
            <div style={{ background: "var(--bg)", padding: "28px 32px" }}>
              <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 12px" }}>Do I need a Google Business Profile?</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
                If you serve customers in a specific area, yes. A Google Business Profile is the single most important factor in local search rankings. Without one, you are invisible in Google Maps and the local 3-pack, which is where most high-intent local searches end up.
              </p>
            </div>
            <div style={{ background: "var(--bg)", padding: "28px 32px" }}>
              <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 12px" }}>What&apos;s a citation and why does it matter?</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
                A citation is any online mention of your business name, address, and phone number (NAP). Consistent citations across directories like Yelp, BBB, and industry-specific sites tell Google your business is real and trustworthy. Inconsistent citations confuse Google and hurt your rankings.
              </p>
            </div>
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* CTA */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px" }}>
          <h2 style={{ margin: "0 0 12px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400 }}>
            See how visible you really are.
          </h2>
          <p style={{ maxWidth: 540, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 40 }}>
            Start now and find out where you stand in local search.
          </p>
          <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 620, lineHeight: 1.55, marginBottom: 24 }}>
            Can customers actually find you on Google Maps? Type your domain to check your local visibility.
          </p>
          <ScanTool compact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
