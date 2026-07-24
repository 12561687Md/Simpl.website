"use client";

import Link from "next/link";
import ScrollReveal, { StaggerReveal, StaggerItem } from "./ScrollReveal";

/**
 * Homepage SEO section aimed squarely at the ICP: SERVICE-BASED BUSINESSES.
 * It names the niche and the specific trades in real text (entity signals for
 * Google and AI search), states the work in the exact terms owners search
 * ("local SEO," "Google Business Profile," "Google Ads," "AI search"), and
 * interlinks to the industry blog guides + service pages so crawlers can map
 * intent. Keyword-dense but written for a human first.
 */

// Each trade links to its dedicated blog guide (the industry-cluster posts),
// which is the strongest entity signal: trade + marketing, connected on-site.
const INDUSTRIES = [
  { label: "Landscapers & lawn care", href: "/blog/seo-for-landscapers" },
  { label: "Plumbers", href: "/blog/how-to-get-more-plumbing-leads" },
  { label: "HVAC companies", href: "/blog/how-to-get-more-hvac-leads" },
  { label: "Remodelers & contractors", href: "/blog/google-ads-for-remodelers" },
  { label: "Roofers", href: "/blog/how-to-get-more-roofing-leads" },
  { label: "Electricians", href: "/blog/marketing-for-electricians" },
  { label: "Car detailers", href: "/blog/how-to-market-a-car-detailing-business" },
  { label: "Auto body shops", href: "/blog/local-seo-for-auto-body-shops" },
];

const CAPABILITIES = [
  { label: "Local SEO & the Google Maps 3-pack", href: "/services/local-seo" },
  { label: "Google Business Profile optimization", href: "/services/local-seo" },
  { label: "Websites that turn visitors into calls", href: "/services/website-build" },
  { label: "Reviews & reputation management", href: "/services/local-seo" },
  { label: "Google Ads & Local Services Ads", href: "/services/paid-ads" },
  { label: "AI search visibility (ChatGPT, Gemini)", href: "/blog/how-to-get-your-business-recommended-by-ai" },
];

export default function ServiceBusinessSEO() {
  return (
    <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
        <ScrollReveal>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>
            Built for service-based businesses
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 500, maxWidth: 900 }}>
            Digital marketing built for service-based businesses, not everyone.
          </h2>
          <p style={{ marginTop: 22, maxWidth: 720, fontSize: 17.5, lineHeight: 1.6, color: "var(--muted)" }}>
            Simpl helps local service businesses win more customers online. We do the work that actually moves the phone for the trades, <strong style={{ color: "var(--fg)", fontWeight: 500 }}>local SEO</strong>, <strong style={{ color: "var(--fg)", fontWeight: 500 }}>Google Business Profile optimization</strong>, fast <strong style={{ color: "var(--fg)", fontWeight: 500 }}>websites</strong>, <strong style={{ color: "var(--fg)", fontWeight: 500 }}>reviews</strong>, <strong style={{ color: "var(--fg)", fontWeight: 500 }}>Google Ads</strong>, and <strong style={{ color: "var(--fg)", fontWeight: 500 }}>AI search visibility</strong>, so you show up first when someone nearby searches for what you do.
          </p>
        </ScrollReveal>

        {/* Industries we serve, each a keyword-rich internal link to its guide. */}
        <div style={{ marginTop: 44 }}>
          <ScrollReveal>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)", marginBottom: 18 }}>
              Who we work with
            </div>
          </ScrollReveal>
          <StaggerReveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {INDUSTRIES.map((it) => (
              <StaggerItem key={it.href}>
                <Link href={it.href} className="service-include" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "15px 18px", background: "var(--bg-elev)", border: "1px solid var(--rule)", borderRadius: 10, textDecoration: "none", color: "var(--fg)", fontSize: 14.5, height: "100%" }}>
                  {it.label}
                  <span aria-hidden="true" style={{ color: "var(--accent)" }}>→</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerReveal>
          <ScrollReveal>
            <p style={{ marginTop: 16, fontSize: 14.5, color: "var(--muted)" }}>
              Don&apos;t see your trade? If your customers search &quot;near me,&quot; Simpl was built for you.{" "}
              <Link href="/scan" style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 1 }}>Run your free scan</Link>.
            </p>
          </ScrollReveal>
        </div>

        {/* What we do, the capability keywords, linked to services. */}
        <div style={{ marginTop: 48 }}>
          <ScrollReveal>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)", marginBottom: 18 }}>
              What we handle for you
            </div>
          </ScrollReveal>
          <StaggerReveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            {CAPABILITIES.map((c) => (
              <StaggerItem key={c.label}>
                <Link href={c.href} className="service-include" style={{ display: "flex", alignItems: "center", gap: 11, padding: "15px 18px", background: "var(--bg-elev)", border: "1px solid var(--rule)", borderRadius: 10, textDecoration: "none", color: "var(--fg)", fontSize: 14.5, height: "100%" }}>
                  <span aria-hidden="true" style={{ color: "var(--accent)", fontWeight: 700 }}>+</span>
                  {c.label}
                </Link>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
