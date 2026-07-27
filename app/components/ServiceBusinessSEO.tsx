"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import ProcessTimeline from "@/components/ui/process-timeline";

/**
 * Homepage section for the ICP: SERVICE-BASED BUSINESSES. Instead of a wall of
 * blog links, it explains the Simpl process, the same audit -> strategy ->
 * build -> grow motion from our funnel + onboarding SOP, framed so it obviously
 * applies to any trade. Keyword-rich (names the niche + the real work: audit,
 * Simpl Score, strategy, website, Google Business Profile, local SEO, Google
 * Ads, CRM, reviews) for Google and AI, but written for an owner first.
 */

const STEPS = [
  {
    n: "01",
    title: "Free audit",
    body: "We scan your website, Google Business Profile, reviews, and local rankings and hand you a Simpl Score, so you see exactly where you stand and the biggest wins waiting.",
  },
  {
    n: "02",
    title: "Strategy call & plan",
    body: "A real conversation, no pitch. We map the fastest path to more customers for your business and hand you a prioritized plan, whether you hire us or not.",
  },
  {
    n: "03",
    title: "Build & optimize",
    body: "We build or fix the foundation: a fast, findable website and a fully optimized Google Business Profile, with the schema, reviews, and technical fixes that get you found.",
  },
  {
    n: "04",
    title: "Grow & convert",
    body: "Then we drive it: local SEO, Google Ads, and lead capture like missed-call text-back and instant quoting, so more of the people who find you become booked jobs.",
  },
];

export default function ServiceBusinessSEO() {
  return (
    // Transparent background so the page-wide starfield (SpaceField) flows
    // through this section like the others, instead of the old solid band.
    <section style={{ background: "transparent", padding: "88px 0" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
        {/* Glassy blue box: baby-blue border + gradient + glow, with a soft
            radial highlight up top. The starfield reads faintly through it. */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 28,
            border: "1px solid rgba(137,207,240,0.32)",
            background: "linear-gradient(180deg, rgba(137,207,240,0.10), rgba(137,207,240,0.03) 42%, rgba(10,12,14,0.55))",
            boxShadow: "0 50px 140px -60px rgba(137,207,240,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            padding: "clamp(40px, 5vw, 64px) clamp(24px, 4vw, 60px)",
          }}
        >
          {/* top-center glow */}
          <div aria-hidden="true" style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 520, height: 240, background: "radial-gradient(closest-side, rgba(137,207,240,0.22), transparent)", pointerEvents: "none" }} />

          <div style={{ position: "relative" }}>
            <ScrollReveal>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>
                Supporting service-based business growth
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 500, maxWidth: 900 }}>
                One proven process. <span style={{ color: "var(--muted)" }}>Custom built for your business, no matter the service.</span>
              </h2>
              <p style={{ marginTop: 22, maxWidth: 720, fontSize: 17.5, lineHeight: 1.6, color: "var(--muted)" }}>
                Landscapers, plumbers, HVAC companies, remodelers, roofers, electricians, detailers, whatever the trade, getting more customers online comes down to the same four steps. We run all four for you, so you can stay on the job.
              </p>
            </ScrollReveal>

            {/* The 4-step process as a horizontal timeline: an animated dashed
                line weaves left-to-right through the steps with a traveling
                pulse dot (the vital-sign motif in motion). */}
            <ProcessTimeline steps={STEPS} />

            {/* CTA */}
            <ScrollReveal>
              <div style={{ marginTop: 44, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                <Link href="/scan" className="cta-primary" style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "14px 26px", fontSize: 15, fontWeight: 600, borderRadius: 999 }}>
                  Start with your free audit →
                </Link>
                <Link href="/start-now" style={{ color: "var(--fg)", textDecoration: "none", padding: "13px 24px", fontSize: 15, border: "1px solid var(--rule-strong)", borderRadius: 999 }}>
                  Book a strategy call
                </Link>
                <span style={{ fontSize: 14, color: "var(--muted)" }}>
                  Not sure it fits your trade? <Link href="/blog" style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 1 }}>See the playbook for yours</Link>.
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
