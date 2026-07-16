"use client";

import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";

export type Category = {
  name: string;
  grade: string;
  hook: string;
  detail: string;
  fix: string;
  /** Deep-dive or service page this category maps to. */
  href: string;
  hrefLabel: string;
};

const GRADE_COLOR: Record<string, string> = {
  A: "var(--accent)",
  B: "var(--accent)",
  C: "#E0A852",
  D: "#E05252",
  F: "#E05252",
};

function Arrow({ dir = "right" }: { dir?: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"
      style={{ transform: dir === "left" ? "rotate(180deg)" : undefined }}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CategoryShowcase({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = categories[active];

  const next = () => setActive((p) => (p + 1) % categories.length);
  const prev = () => setActive((p) => (p - 1 + categories.length) % categories.length);

  return (
    <div className="grid-showcase">
      {/* LEFT: the six category cards. Always rendered and always visible so
          crawlers and no-JS visitors get the full copy. Only the active
          highlight moves. */}
      <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
        {categories.map((c, i) => {
          const on = i === active;
          return (
            <button
              key={c.name}
              onClick={() => setActive(i)}
              aria-pressed={on}
              className="category-card"
              style={{
                textAlign: "left",
                background: on ? "var(--accent-soft)" : "var(--bg)",
                border: `1px solid ${on ? "var(--accent)" : "var(--rule)"}`,
                padding: "16px 18px",
                cursor: "pointer",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 12,
                alignItems: "center",
                color: "var(--fg)",
                minHeight: 44,
              }}
            >
              <span style={{ display: "grid", gap: 3 }}>
                <span className="mono" style={{ fontSize: 9, letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 15, fontWeight: on ? 500 : 400 }}>{c.name}</span>
              </span>
              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.08em", color: GRADE_COLOR[c.grade] || "var(--muted)", whiteSpace: "nowrap" }}>
                Most sites: {c.grade}
              </span>
            </button>
          );
        })}
      </div>

      {/* RIGHT: detail for the active category. The animation lives here
          because it's driven by interaction, not by first paint. */}
      <div style={{ border: "1px solid var(--rule)", background: "var(--bg)", padding: "32px 30px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 400 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 14 }}>
              {current.name}
            </div>
            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.35, fontWeight: 500 }}>{current.hook}</p>
            <p style={{ margin: "10px 0 0", fontSize: 17, lineHeight: 1.5, color: "var(--fg)" }}>{current.detail}</p>

            {/* Word-by-word reveal, ported from the 21st pattern. Short copy
                only: one element per word, so this never runs on long text. */}
            <p style={{ margin: "22px 0 0", fontSize: 15, lineHeight: 1.6, color: "var(--muted)" }}>
              {reduce
                ? current.fix
                : current.fix.split(" ").map((word, i) => (
                    <motion.span
                      key={`${current.name}-${i}`}
                      initial={{ filter: "blur(6px)", opacity: 0, y: 3 }}
                      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut", delay: 0.012 * i }}
                      style={{ display: "inline-block" }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
            </p>
          </motion.div>
        </AnimatePresence>

        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link href={current.href} className="tier-cta tier-cta-ghost">
              {current.hrefLabel} <Arrow />
            </Link>
            <Link href="/what-am-i-missing" className="tier-cta tier-cta-solid">
              What am I missing? <Arrow />
            </Link>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={prev} aria-label="Previous category" className="showcase-nav"><Arrow dir="left" /></button>
            <button onClick={next} aria-label="Next category" className="showcase-nav"><Arrow /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
