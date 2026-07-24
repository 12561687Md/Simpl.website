"use client";

import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import ScanTool from "./ScanTool";
import ScrollReveal, { StaggerReveal, StaggerItem } from "./ScrollReveal";

/**
 * The one shell every service page renders through. Data in, design-system-
 * compliant page out. Extracted 2026-07-23 from six near-identical hand-built
 * pages so styling, motion, and the template order live in exactly one place
 * (see .agents/design-system.md §6). Schema JSON-LD stays in each page.tsx
 * (server component) so it's server-rendered; this shell owns layout + motion.
 */

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceNext {
  eyebrow: string;
  heading: string;
  body: string;
  /** Single cross-link (most pages) ... */
  link?: { href: string; label: string };
  /** ... or a chip stack (the strategy "full stack" section). */
  chips?: { href: string; label: string }[];
}

export interface ServiceData {
  /** e.g. "02 / Local SEO & AI Search Visibility" */
  code: string;
  title: string;
  /** Second, muted line of the two-tone H1. */
  titleTail?: string;
  heroSub: string;
  includesHeading: string;
  includes: string[];
  compoundingHeading: string;
  compoundingBody: string;
  next: ServiceNext;
  faqHeading: string;
  faqs: ServiceFAQ[];
  ctaHeading: string;
  ctaSub: string;
  ctaScanPrompt: string;
}

const eyebrow: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: 32,
};

const h2: React.CSSProperties = {
  margin: "0 0 20px",
  fontSize: "clamp(24px, 3.5vw, 40px)",
  lineHeight: 1.15,
  letterSpacing: "-0.02em",
  fontWeight: 400,
  maxWidth: 700,
};

const rule = <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: 0 }} />;

export default function ServiceLayout({ data }: { data: ServiceData }) {
  return (
    <div>
      <Header />
      <main>
        {/* Hero */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "140px 32px 64px" }}>
          <ScrollReveal>
            <div className="mono" style={{ ...eyebrow, marginBottom: 24 }}>{data.code}</div>
            <h1 style={{ margin: 0, fontSize: "clamp(34px, 5.2vw, 56px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 500, maxWidth: 860 }}>
              {data.title}
              {data.titleTail && <><br /><span style={{ color: "var(--muted)" }}>{data.titleTail}</span></>}
            </h1>
            <p style={{ marginTop: 28, maxWidth: 660, fontSize: 19, lineHeight: 1.55, color: "var(--muted)" }}>{data.heroSub}</p>
            <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16 }}>
              <Link href="/start-now" className="cta-primary" style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "14px 26px", fontSize: 15, fontWeight: 600, borderRadius: 999 }}>
                Get your free strategy call →
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
            <h2 style={{ ...h2, marginBottom: 40 }}>{data.includesHeading}</h2>
          </ScrollReveal>
          <StaggerReveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {data.includes.map((item) => (
              <StaggerItem key={item}>
                <div className="service-include" style={{ padding: "18px 20px", background: "var(--bg-elev)", border: "1px solid var(--rule)", borderRadius: 10, fontSize: 15, lineHeight: 1.5, height: "100%" }}>
                  {item}
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </section>

        {rule}

        {/* The compounding effect (the one accent moment) */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <ScrollReveal direction="up">
            <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 32, maxWidth: 760 }}>
              <div className="mono" style={eyebrow}>The compounding effect</div>
              <h2 style={h2}>{data.compoundingHeading}</h2>
              <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>{data.compoundingBody}</p>
            </div>
          </ScrollReveal>
        </section>

        {rule}

        {/* What comes next / the full stack */}
        <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
            <ScrollReveal>
              <div className="mono" style={eyebrow}>{data.next.eyebrow}</div>
              <h2 style={h2}>{data.next.heading}</h2>
              <p style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 32 }}>{data.next.body}</p>
              {data.next.link && (
                <Link href={data.next.link.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 4, fontSize: 15 }}>
                  {data.next.link.label}<span>→</span>
                </Link>
              )}
              {data.next.chips && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {data.next.chips.map((c) => (
                    <Link key={c.href} href={c.href} className="service-chip" style={{ padding: "9px 18px", border: "1px solid var(--rule-strong)", color: "var(--fg)", textDecoration: "none", fontSize: 14, borderRadius: 999 }}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
          <ScrollReveal>
            <div className="mono" style={eyebrow}>Common questions</div>
            <h2 style={{ ...h2, marginBottom: 40 }}>{data.faqHeading}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div style={{ display: "grid", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)", borderRadius: 8, overflow: "hidden" }}>
              {data.faqs.map((f) => (
                <div key={f.q} style={{ background: "var(--bg)", padding: "28px 32px" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 12px" }}>{f.q}</h3>
                  <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>{f.a}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {rule}

        {/* Closing CTA + scan */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "88px 32px 100px" }}>
          <ScrollReveal>
            <h2 style={{ margin: "0 0 12px", fontSize: "clamp(26px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 500 }}>{data.ctaHeading}</h2>
            <p style={{ maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: "var(--muted)", marginBottom: 32 }}>{data.ctaSub}</p>
            <p style={{ fontSize: 16, color: "var(--muted)", maxWidth: 620, lineHeight: 1.55, marginBottom: 20 }}>{data.ctaScanPrompt}</p>
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
