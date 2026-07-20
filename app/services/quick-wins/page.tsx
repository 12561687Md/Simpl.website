import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScanTool from "../../components/ScanTool";

export const metadata: Metadata = {
  title: "Quick Wins & Site Triage",
  description:
    "Stop leaking leads from broken elements you don't know are failing. Simpl fixes core web vitals, mobile issues, crawler errors, and more.",
  openGraph: {
    title: "Quick Wins & Site Triage | Simpl",
    description: "Stop leaking leads from broken elements you don't know are failing. Simpl fixes core web vitals, mobile issues, crawler errors, and more.",
    url: "https://simpl.pro/services/quick-wins",
    siteName: "Simpl",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/services/quick-wins" },
};

const INCLUDES = [
  "Core Web Vitals audit and fixes",
  "Mobile responsiveness repair",
  "Crawler error identification and resolution",
  "Indexing regression detection",
  "Broken form and tracking code repair",
  "SSL certificate verification",
  "Page speed optimization",
  "Security header implementation",
];

export default function QuickWins() {
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Quick Wins & Site Triage",
          "description": "Fix broken site elements, speed issues, and technical problems that silently leak leads. Core web vitals, mobile repair, crawler errors, and more.",
          "provider": {
            "@type": "Organization",
            "name": "Simpl",
            "url": "https://simpl.pro"
          },
          "areaServed": { "@type": "Country", "name": "United States" },
          "url": "https://simpl.pro/services/quick-wins"
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simpl.pro" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://simpl.pro/services" },
            { "@type": "ListItem", "position": 3, "name": "Quick Wins & Site Triage", "item": "https://simpl.pro/services/quick-wins" }
          ]
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How long does a site triage take?",
              "acceptedAnswer": { "@type": "Answer", "text": "Most site triages are completed within the first week. Simpl runs a full diagnostic scan, prioritizes the critical issues, and starts fixing them immediately. You will see measurable improvements in speed and functionality within days, not months." }
            },
            {
              "@type": "Question",
              "name": "Will fixing these issues actually increase leads?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes. Broken forms, slow load times, and mobile failures are the top reasons visitors leave without converting. Our clients typically see a 15-30% increase in form submissions within the first month after triage, simply because visitors can now complete the actions they came to take." }
            },
            {
              "@type": "Question",
              "name": "Do I need to give you access to my website?",
              "acceptedAnswer": { "@type": "Answer", "text": "For most quick wins, yes. We will need access to your CMS or hosting environment to implement fixes directly. We use secure, role-limited access and never store credentials beyond the active engagement." }
            }
          ]
        }) }} />
        {/* Hero */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px 64px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24 }}>
            01 / Quick Wins & Site Triage
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 800 }}>
            Quick Wins & Site Triage
          </h1>
          <p style={{ marginTop: 24, maxWidth: 640, fontSize: 19, lineHeight: 1.5, color: "var(--muted)" }}>
            Every second your site takes to load costs you visitors. Every broken form costs you leads. Every missing SSL warning costs you trust. Right now.
          </p>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* What's included */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            What&apos;s included
          </div>
          <h2 style={{ margin: "0 0 40px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
            The foundation everything else gets built on.
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
            Every dollar you spend on marketing after this actually converts.
          </h2>
          <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)" }}>
            Most businesses pour money into ads and SEO while their site silently leaks leads through broken forms, slow pages, and mobile failures. Triage stops the bleeding first. Once the foundation is solid, every channel you invest in performs better because visitors can actually convert when they arrive.
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
              Your site works now. But can anyone find it?
            </h2>
            <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 32 }}>
              A working site that nobody discovers is just an expensive business card. The next layer puts you in front of the people already searching for what you sell.
            </p>
            <Link href="/services/local-seo" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 4, fontSize: 15 }}>
              Local SEO & AI Search Visibility<span>→</span>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>
            Common questions
          </div>
          <h2 style={{ margin: "0 0 40px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 700 }}>
            Questions we hear before every triage.
          </h2>
          <div style={{ display: "grid", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)" }}>
            <div style={{ background: "var(--bg)", padding: "28px 32px" }}>
              <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 12px" }}>How long does a site triage take?</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
                Most site triages are completed within the first week. Simpl runs a full diagnostic scan, prioritizes the critical issues, and starts fixing them immediately. You will see measurable improvements in speed and functionality within days, not months.
              </p>
            </div>
            <div style={{ background: "var(--bg)", padding: "28px 32px" }}>
              <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 12px" }}>Will fixing these issues actually increase leads?</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
                Yes. Broken forms, slow load times, and mobile failures are the top reasons visitors leave without converting. Our clients typically see a 15-30% increase in form submissions within the first month after triage, simply because visitors can now complete the actions they came to take.
              </p>
            </div>
            <div style={{ background: "var(--bg)", padding: "28px 32px" }}>
              <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 12px" }}>Do I need to give you access to my website?</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
                For most quick wins, yes. We will need access to your CMS or hosting environment to implement fixes directly. We use secure, role-limited access and never store credentials beyond the active engagement.
              </p>
            </div>
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* CTA */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px" }}>
          <h2 style={{ margin: "0 0 12px", fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 400 }}>
            Find out what&apos;s leaking.
          </h2>
          <p style={{ maxWidth: 540, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 40 }}>
            Start now and see which quick wins are waiting.
          </p>
          <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 620, lineHeight: 1.55, marginBottom: 24 }}>
            Is your site silently failing visitors right now? Type your domain and find out in 30 seconds.
          </p>
          <ScanTool compact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
