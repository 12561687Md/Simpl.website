"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SimplMark } from "@/components/ui/simpl-brand";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

/**
 * Replaces the ValueBar ("Win the search / Win the click / ...") that sat here.
 *
 * Two jobs:
 *  1. Show the product instead of asserting adjectives about it. A phone with
 *     real-shaped notifications says "we watch this for you" far better than a
 *     row of slogans did.
 *  2. Give the root pitch a home. It was cut from the hero so the scan input
 *     could stand alone, but it's the canonical description of SIMPL
 *     (.agents/product-marketing.md) and needed to land somewhere.
 *
 * On the notifications: these are illustrations of what SIMPL sends, not claims
 * about results we've delivered. Everything is second-person and unattributed —
 * no client names, no invented ratings, no "4.9 across 1,000+ reviews". SIMPL has
 * no clients to cite yet, and a mockup is not a licence to fabricate one.
 * See docs/standards/TRUST_SIGNALS.md.
 */

interface Note {
  kind: string;
  title: string;
  body: string;
  when: string;
  tone: "accent" | "warn" | "plain";
}

const NOTES: Note[] = [
  {
    kind: "SIMPL Score",
    title: "Your score moved C → A−",
    body: "Schema, meta descriptions and alt text all fixed this week.",
    when: "2m",
    tone: "accent",
  },
  {
    kind: "Competitors",
    title: "You passed two competitors",
    body: "You're now #2 in the map pack for “deck builder raleigh”.",
    when: "1h",
    tone: "accent",
  },
  {
    kind: "Reputation",
    title: "New 5-star review on Google",
    body: "We replied for you in 4 minutes.",
    when: "3h",
    tone: "plain",
  },
  {
    kind: "Uptime",
    title: "Your site went down",
    body: "We caught it and had you back up before anyone called.",
    when: "1d",
    tone: "warn",
  },
];

function toneColor(t: Note["tone"]) {
  if (t === "accent") return "var(--accent)";
  if (t === "warn") return "#E0A852";
  return "var(--muted)";
}

export default function PhoneShowcase() {
  const reduce = useReducedMotion();

  return (
    <section
      style={{
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.018), transparent)",
      }}
    >
      <div
        className="phone-showcase-grid"
        style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}
      >
        {/* The pitch */}
        <div>
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 20,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--pulse)" }} />
              What SIMPL does
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: "clamp(28px, 4vw, 48px)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                fontWeight: 600,
              }}
            >
              We make sure your business is always{" "}
              <span style={{ color: "var(--accent)" }}>winning</span> online.
            </h2>

            <p style={{ margin: "22px 0 0", maxWidth: 520, fontSize: 16.5, lineHeight: 1.6, color: "var(--muted)" }}>
              The platform businesses use to repeatedly win online. We grow your website and reputation, we dominate
              Google&apos;s rankings and paid ads, and we connect with everything else the internet is saying about your
              business.
            </p>

            <p style={{ margin: "18px 0 0", maxWidth: 520, fontSize: 16.5, lineHeight: 1.6, color: "var(--muted)" }}>
              We constantly watch your top competitors for you, and we make scaling your business as simpl as it sounds.
            </p>
          </motion.div>
        </div>

        {/* The phone */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="phone-frame"
          >
            {/* Screen */}
            <div className="phone-screen">
              <div className="phone-notch" aria-hidden="true" />

              <div style={{ padding: "34px 12px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 6px 14px" }}>
                  <SimplMark size={18} />
                  <span style={{ ...mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
                    Today
                  </span>
                </div>

                {/* Notifications land on scroll rather than looping. A permanent
                    loop would need a pause control under WCAG 2.2.2, and a
                    one-shot reveal reads as arrival, which is the actual point. */}
                {NOTES.map((n, i) => (
                  <motion.div
                    key={n.title}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.45,
                      delay: reduce ? 0 : 0.35 + i * 0.28,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="phone-note"
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                      <span
                        aria-hidden="true"
                        style={{ width: 5, height: 5, borderRadius: 99, background: toneColor(n.tone), flexShrink: 0 }}
                      />
                      <span style={{ ...mono, fontSize: 8.5, letterSpacing: "0.12em", textTransform: "uppercase", color: toneColor(n.tone) }}>
                        {n.kind}
                      </span>
                      <span style={{ ...mono, fontSize: 8.5, color: "var(--muted)", marginLeft: "auto", opacity: 0.7 }}>
                        {n.when}
                      </span>
                    </div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.3, marginBottom: 3 }}>{n.title}</div>
                    <div style={{ fontSize: 11, lineHeight: 1.4, color: "var(--muted)" }}>{n.body}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
