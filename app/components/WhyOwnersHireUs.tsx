"use client";

import { motion, useReducedMotion } from "framer-motion";
import PhoneLoop from "./PhoneLoop";
import { SlideIn } from "./ScrollReveal";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

/**
 * The second section. Left: concrete reasons owners hire us, each a distinct
 * promise, not a paraphrase of the headline. Right: the looping phone showing
 * the product doing those things. Reasons and proof, side by side.
 */

const REASONS = [
  {
    t: "You'll see problems before your customers do.",
    b: "We watch your site, your Google profile and your rankings around the clock. When something breaks or slips, you hear it from us first, not from a phone that stopped ringing.",
  },
  {
    t: "We watch your competitors so you don't have to.",
    b: "You'll know exactly who's ahead of you locally, for which searches, and what it takes to pass them. Every month, the gap gets smaller.",
  },
  {
    t: "One team for everything you're online.",
    b: "Website, SEO, Google Business Profile, reviews, ads. Not five vendors and five invoices. One team, one number to call, one score that tells you it's working.",
  },
];

export default function WhyOwnersHireUs() {
  const reduce = useReducedMotion();

  return (
    <section style={{ overflow: "hidden", padding: "40px 24px" }}>{/* Transparent:
        sits on the shared page-wide starfield. overflow-hidden so the side-slide
        never spawns a horizontal scrollbar. */}
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className="split-phone-grid" style={{ gap: 88 }}>
          {/* Text column: boxed, slides in from the FAR right (slower), while
              the phone slides in from the far left at the same pace, so the two
              cross each other on the way in. */}
          <SlideIn from="right" boxed distance={760} duration={1.5} style={{ padding: "40px 56px" }}>
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="mono"
                style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 12 }}
              >
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--pulse)" }} />
                Why owners hire us
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 46px)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 600, maxWidth: 620 }}>
                You run the business. We run the internet.
              </h2>
            </motion.div>

            <div style={{ marginTop: 36, display: "grid", gap: 26, maxWidth: 620 }}>
              {REASONS.map((r, i) => (
                <motion.div
                  key={r.t}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.1 }}
                  style={{ paddingLeft: 18, borderLeft: "2px solid var(--accent)" }}
                >
                  <div style={{ fontSize: 17.5, fontWeight: 600, lineHeight: 1.3, marginBottom: 7 }}>{r.t}</div>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--muted)" }}>{r.b}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.3 }}
              style={{ marginTop: 32 }}
            >
              <a
                href="/start"
                style={{ ...mono, fontSize: 13, color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 3 }}
              >
                See how we fit your business →
              </a>
            </motion.div>
          </SlideIn>

          <div className="split-phone-visual" style={{ display: "flex", justifyContent: "center" }}>
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -760 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Scaled locally (the global phone-frame scale was removed so
                  ScanReport is unaffected). */}
              <div style={{ transform: "scale(1.35)", transformOrigin: "center" }}>
                <PhoneLoop />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
