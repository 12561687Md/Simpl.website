import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import ScanTool from "../components/ScanTool";

export const metadata: Metadata = {
  title: "What am I missing? | SIMPL",
  description: "Tell us what's going on and we'll tell you what's costing you calls. A person reads every message and replies the same business day, usually within four hours.",
  openGraph: {
    title: "What am I missing? | SIMPL",
    description: "Tell us what's going on and we'll tell you what's costing you calls. A person replies the same business day.",
    url: "https://simpl.pro/what-am-i-missing",
    siteName: "SIMPL",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/what-am-i-missing" },
};

const label = { fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--muted)" };

const PROMISES = [
  { k: "Reply window", v: "Same business day, usually within four hours." },
  { k: "Who answers", v: "A person. Not a sequence. Not a calendar link." },
  { k: "What it costs", v: "Nothing. There's no pitch attached to a first reply." },
  { k: "What happens next", v: "We look at your site and your listing, then tell you what we'd fix first." },
];

export default function WhatAmIMissingPage() {
  return (
    <div>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "What am I missing?",
          "url": "https://simpl.pro/what-am-i-missing",
          "description": "Tell SIMPL what's going on and we'll tell you what's costing you calls. A person replies the same business day.",
          "mainEntity": {
            "@type": "Organization",
            "name": "SIMPL",
            "url": "https://simpl.pro",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "team@simpl.pro",
              "contactType": "sales",
              "availableLanguage": "English"
            }
          }
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simpl.pro" },
            { "@type": "ListItem", "position": 2, "name": "What am I missing?", "item": "https://simpl.pro/what-am-i-missing" }
          ]
        }) }} />

        {/* Hero */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 32px 56px" }}>
          <div className="mono" style={{ ...label, marginBottom: 40 }}>What am I missing?</div>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 900 }}>
            Tell us what&apos;s going on.<br />
            <span style={{ color: "var(--muted)" }}>We&apos;ll tell you what it&apos;s costing you.</span>
          </h1>
          <p style={{ marginTop: 28, maxWidth: 640, fontSize: 17, lineHeight: 1.55 }}>
            You don&apos;t need to know what&apos;s broken. That&apos;s the whole point. Tell us the symptom, the phone&apos;s quieter than it was, and we&apos;ll go find the cause.
          </p>
        </section>

        {/* The form: the primary action on this page */}
        <section data-section="contact" style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px" }}>
            <div className="grid-contact" style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(220px, 1fr)", gap: 56, alignItems: "start" }}>
              <ContactForm ctaLabel="Tell me what's broken" sourcePage="/what-am-i-missing" />
              <div style={{ display: "grid", gap: 28 }}>
                {PROMISES.map((p) => (
                  <div key={p.k}>
                    <div className="mono" style={{ ...label, marginBottom: 10 }}>{p.k}</div>
                    <div style={{ fontSize: 16, lineHeight: 1.5 }}>{p.v}</div>
                  </div>
                ))}
                <div>
                  <div className="mono" style={{ ...label, marginBottom: 10 }}>Direct</div>
                  <a href="mailto:team@simpl.pro" className="mono" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 2 }}>team@simpl.pro</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Don't want to wait? */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <div className="mono" style={{ ...label, marginBottom: 28 }}>
            <span style={{ color: "var(--accent)" }}>Don&apos;t want to wait?</span> · see it yourself
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(24px, 3.2vw, 36px)", lineHeight: 1.12, fontWeight: 400, maxWidth: 660 }}>
            Type your domain. Get your score in about a minute.
          </h2>
          <p style={{ marginTop: 20, maxWidth: 620, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
            Same answer, no waiting and no conversation. Most businesses land between 40 and 65.
          </p>
          <div style={{ marginTop: 40 }}><ScanTool compact /></div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* Already know what you want? */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px 96px" }}>
          <div className="mono" style={{ ...label, marginBottom: 24 }}>Already know what you want?</div>
          <p style={{ margin: 0, maxWidth: 640, fontSize: 17, lineHeight: 1.6 }}>
            Pricing is public and starts at $497 a month. Every engagement still starts with a conversation, because we won&apos;t take your money before we know we can help.
          </p>
          <div style={{ marginTop: 28 }}>
            <Link href="/start" className="tier-cta tier-cta-ghost">See pricing <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
