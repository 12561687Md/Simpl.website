"use client";

import { motion, useReducedMotion } from "framer-motion";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

/**
 * Beliefs section, in the spirit of Owner.com's "3 beliefs that guide our
 * company" — a trust block that states what we stand for.
 *
 * Written to SIMPL's real positioning, not Owner's. Deliberately NOT "we believe
 * all businesses should benefit from AI": we never sell the delivery method, and
 * the cost story is "no account manager, no sales team, no office" — never
 * "because AI does it" (see .agents/product-marketing.md).
 */

const BELIEFS = [
  {
    t: "You should never be the last to know.",
    p1: "Most owners find out something's wrong when the calls stop. A listing dropped, a form broke, a competitor passed you, and nobody said a word.",
    p2: "We watch everything you are online, around the clock. When something moves, you hear it from us first, with the fix already underway.",
  },
  {
    t: "Winning beats being busy.",
    p1: "Plenty of agencies send you reports full of activity: posts published, hours logged, tasks closed. None of it tells you whether you're actually ahead.",
    p2: "We measure one thing: are you winning more customers than you were last month? Every decision we make starts and ends there.",
  },
  {
    t: "You're paying for results, not overhead.",
    p1: "We cost less than the agencies you've been quoted, and people assume that means less. It doesn't.",
    p2: "You're not paying for an account manager, a sales team, or an office. You're paying for the work, and the results that come from it.",
  },
];

export default function Beliefs() {
  const reduce = useReducedMotion();

  return (
    <section style={{ borderTop: "1px solid var(--rule)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 32px" }}>
        <div className="beliefs-grid">
          <div>
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="mono"
                style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 12 }}
              >
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--pulse)" }} />
                What we stand for
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(30px, 4.4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 600 }}>
                Three beliefs that
                <br />
                run the company.
              </h2>
            </motion.div>
          </div>

          <div style={{ display: "grid", gap: 0 }}>
            {BELIEFS.map((b, i) => (
              <motion.div
                key={b.t}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.12 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
                  gap: 28,
                  padding: "30px 0",
                  borderTop: "1px solid var(--rule)",
                }}
                className="belief-row"
              >
                <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                  We believe {b.t}
                </h3>
                <div>
                  <p style={{ margin: "0 0 14px", fontSize: 14.5, lineHeight: 1.6, color: "var(--muted)" }}>{b.p1}</p>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--muted)" }}>{b.p2}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
