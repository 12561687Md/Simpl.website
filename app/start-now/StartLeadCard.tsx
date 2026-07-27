"use client";

import { motion, useReducedMotion } from "framer-motion";
import ContactForm from "../components/ContactForm";

/**
 * The wide, blue-glowing lead-form card that slides into the page (the same
 * treatment as the homepage pre-footer CTA). Slide is a mount animation, never
 * scroll-gated, so the form can't get stranded invisible.
 */
export default function StartLeadCard() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, x: 40, y: 12 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: "100%",
        maxWidth: 620,
        borderRadius: 24,
        border: "1px solid var(--accent-line)",
        background: "linear-gradient(155deg, rgba(137,207,240,0.13), rgba(137,207,240,0.02) 60%)",
        boxShadow: "0 44px 120px -50px rgba(137,207,240,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
        padding: "clamp(28px, 4vw, 44px)",
      }}
    >
      <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
        Ready when you are
      </div>
      <h2 style={{ margin: "0 0 8px", fontSize: "clamp(23px, 2.4vw, 32px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.12 }}>
        Tell us what&apos;s going on.<br />
        <span style={{ color: "var(--muted)" }}>We&apos;ll find what it&apos;s costing you.</span>
      </h2>
      <p style={{ margin: "0 0 18px", fontSize: 14.5, lineHeight: 1.55, color: "var(--muted)", maxWidth: 440 }}>
        Real people read every message and reply the same business day.
      </p>
      <ContactForm ctaLabel="Fix my business" sourcePage="/start-now" compact />
    </motion.div>
  );
}
