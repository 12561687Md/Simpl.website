import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import WhatAmIMissingScanner from "./Scanner";

export const metadata: Metadata = {
  title: "What am I missing? | Simpl",
  description: "Tell us what's going on and we'll tell you what's costing you calls. Real people read every message and reply the same business day, usually within four hours.",
  openGraph: {
    title: "What am I missing? | Simpl",
    description: "Tell us what's going on and we'll tell you what's costing you calls. We reply the same business day.",
    url: "https://simpl.pro/start-now",
    siteName: "Simpl",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/start-now" },
};

const label = { fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--muted)" };

const PROMISES = [
  { k: "Reply window", v: "Same business day, usually within four hours." },
  { k: "Who answers", v: "Real people. Not a sequence. Not a calendar link." },
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
          "url": "https://simpl.pro/start-now",
          "description": "Tell Simpl what's going on and we'll tell you what's costing you calls. We reply the same business day.",
          "mainEntity": {
            "@type": "Organization",
            "name": "Simpl",
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
            { "@type": "ListItem", "position": 2, "name": "What am I missing?", "item": "https://simpl.pro/start-now" }
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

        {/* Two doors into the same funnel, side by side on purpose: scan it
            yourself, or skip straight to the team. Neither is buried under
            the other. */}
        <section data-section="contact" style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px" }}>
            <div className="grid-diagnosis-split" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 48, alignItems: "start" }}>
              <div>
                <div className="mono" style={{ ...label, marginBottom: 16 }}>Scan it yourself</div>
                <p style={{ margin: "0 0 24px", fontSize: 15, lineHeight: 1.6, color: "var(--muted)" }}>
                  Type your business name. Get your score in about a minute, no waiting and no conversation required.
                </p>
                <WhatAmIMissingScanner />
              </div>
              <div>
                <div className="mono" style={{ ...label, marginBottom: 16 }}>Skip straight to a person</div>
                <ContactForm ctaLabel="Tell me what's broken" sourcePage="/start-now" />
              </div>
            </div>

            <div style={{ marginTop: 56, paddingTop: 40, borderTop: "1px solid var(--rule)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 28 }}>
              {PROMISES.map((p) => (
                <div key={p.k}>
                  <div className="mono" style={{ ...label, marginBottom: 10 }}>{p.k}</div>
                  <div style={{ fontSize: 15, lineHeight: 1.5 }}>{p.v}</div>
                </div>
              ))}
              <div>
                <div className="mono" style={{ ...label, marginBottom: 10 }}>Direct</div>
                <a href="mailto:team@simpl.pro" className="mono" style={{ display: "block", fontSize: 13, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 2, width: "fit-content" }}>team@simpl.pro</a>
                <a href="tel:+19194289452" className="mono" style={{ display: "block", marginTop: 10, fontSize: 13, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 2, width: "fit-content" }}>Call now: (919) 428-9452</a>
              </div>
            </div>
          </div>
        </section>

        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />

        {/* Already know what you want? */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px 96px" }}>
          <div className="mono" style={{ ...label, marginBottom: 24 }}>Already know what you want?</div>
          <p style={{ margin: 0, maxWidth: 640, fontSize: 17, lineHeight: 1.6 }}>
            Tell us in the form above and say so, we&apos;ll skip the diagnosis and come back with a scoped plan and a
            straight price for exactly what you need. Every engagement still starts with a conversation, because we
            won&apos;t take your money before we know we can help.
          </p>
          <div style={{ marginTop: 28 }}>
            <Link href="/scan" className="tier-cta tier-cta-ghost">Not sure yet? Run the free scan <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
