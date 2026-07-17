"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SimplMark } from "@/components/ui/simpl-brand";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

/**
 * A realistic phone that loops through three perspectives on what SIMPL does:
 *
 *   1. Score climbing + live lead signals arriving
 *   2. A stream of problems caught and fixed
 *   3. A competitor breakdown with a "Fix it now" action
 *
 * Everything on screen is illustrative and written in the second person — no
 * client names, no invented ratings, no fabricated review counts. A mockup is
 * not a licence to manufacture proof we don't have (docs/standards/TRUST_SIGNALS).
 *
 * `optimized` freezes it on the score screen in an already-won state (A, all
 * green). That's the version shown beside the unlocked report: "here's where
 * you'd be."
 */

const SCREENS = ["score", "fixes", "competitors"] as const;
type Screen = (typeof SCREENS)[number];

export default function PhoneLoop({ optimized = false }: { optimized?: boolean }) {
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || optimized) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % SCREENS.length), 4200);
    return () => clearInterval(t);
  }, [reduce, optimized]);

  const screen: Screen = optimized ? "score" : SCREENS[idx];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <div className="phone-frame">
        <div className="phone-screen">
          {/* Dynamic-island pill, like a real device. */}
          <div className="phone-island" aria-hidden="true" />

          <div style={{ padding: "40px 12px 16px", minHeight: 452 }}>
            {/* Status header */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 6px 14px" }}>
              <SimplMark size={18} />
              <span style={{ ...mono, fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
                {screen === "score" ? "Your score" : screen === "fixes" ? "This week" : "Local rankings"}
              </span>
              <span style={{ ...mono, fontSize: 9.5, color: "var(--accent)", marginLeft: "auto" }}>live</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={screen + (optimized ? "-opt" : "")}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {screen === "score" && <ScoreScreen optimized={optimized} reduce={!!reduce} />}
                {screen === "fixes" && <FixesScreen reduce={!!reduce} />}
                {screen === "competitors" && <CompetitorScreen reduce={!!reduce} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Progress dots (hidden in the frozen optimized view). */}
      {!optimized && (
        <div style={{ display: "flex", gap: 7 }} aria-hidden="true">
          {SCREENS.map((s, i) => (
            <span
              key={s}
              style={{
                width: i === idx ? 20 : 6,
                height: 6,
                borderRadius: 99,
                background: i === idx ? "var(--accent)" : "var(--rule-strong)",
                transition: "width 300ms ease, background 300ms ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- Screen 1: score climbing + lead signals ---- */

function ScoreScreen({ optimized, reduce }: { optimized: boolean; reduce: boolean }) {
  const target = optimized ? 94 : 78;
  const grade = optimized ? "A" : "A−";
  const [pct, setPct] = useState(reduce ? target : 41);

  useEffect(() => {
    if (reduce) return;
    setPct(41);
    const start = performance.now();
    const from = 41;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min((t - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      setPct(Math.round(from + (target - from) * eased));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduce]);

  const r = 34;
  const c = 2 * Math.PI * r;

  const signals = [
    { t: "New lead from Google", w: "now" },
    { t: "You moved up to #2 locally", w: "2m" },
    { t: "5-star review came in", w: "1h" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "6px 0 16px" }}>
        <div style={{ position: "relative", width: 92, height: 92 }}>
          <svg width="92" height="92" viewBox="0 0 92 92" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="46" cy="46" r={r} fill="none" stroke="var(--rule)" strokeWidth="5" />
            <circle
              cx="46" cy="46" r={r} fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round"
              strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)}
              style={{ transition: "stroke-dashoffset 120ms linear" }}
            />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 26, fontWeight: 300, color: "var(--accent)", lineHeight: 1 }}>{grade}</span>
            <span style={{ ...mono, fontSize: 10, color: "var(--muted)" }}>{pct}%</span>
          </div>
        </div>
      </div>

      {signals.map((s, i) => (
        <motion.div
          key={s.t}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: reduce ? 0 : 0.5 + i * 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="phone-note"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 5, height: 5, borderRadius: 99, background: "var(--accent)", flexShrink: 0 }} aria-hidden="true" />
            <span style={{ fontSize: 12, fontWeight: 600 }}>{s.t}</span>
            <span style={{ ...mono, fontSize: 9, color: "var(--muted)", marginLeft: "auto" }}>{s.w}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---- Screen 2: problems caught + fixed ---- */

function FixesScreen({ reduce }: { reduce: boolean }) {
  const items = [
    { k: "Fixed", t: "Missing meta descriptions", b: "Rewritten across 8 pages.", tone: "accent" },
    { k: "Fixed", t: "Site was loading slowly", b: "Cut load time to under 2s.", tone: "accent" },
    { k: "Caught", t: "Contact form stopped sending", b: "Flagged and repaired same day.", tone: "warn" },
    { k: "Fixed", t: "9 images had no alt text", b: "All tagged for search + access.", tone: "accent" },
  ];
  return (
    <div>
      {items.map((n, i) => (
        <motion.div
          key={n.t}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.22 }}
          className="phone-note"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
            <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: 99, background: n.tone === "warn" ? "#E0A852" : "var(--accent)", flexShrink: 0 }} />
            <span style={{ ...mono, fontSize: 8.5, letterSpacing: "0.12em", textTransform: "uppercase", color: n.tone === "warn" ? "#E0A852" : "var(--accent)" }}>{n.k}</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>{n.t}</div>
          <div style={{ fontSize: 10.5, lineHeight: 1.4, color: "var(--muted)" }}>{n.b}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---- Screen 3: competitor breakdown + Fix it now ---- */

function CompetitorScreen({ reduce }: { reduce: boolean }) {
  const rows = [
    { name: "Top competitor", score: 91, you: false },
    { name: "Another competitor", score: 84, you: false },
    { name: "You", score: 65, you: true },
    { name: "Down the street", score: 58, you: false },
  ];
  return (
    <div>
      <div style={{ ...mono, fontSize: 9.5, color: "var(--muted)", padding: "2px 4px 10px" }}>
        “deck builder near me”
      </div>
      {rows.map((r, i) => (
        <motion.div
          key={r.name}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.16 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 11px",
            marginBottom: 6,
            borderRadius: 9,
            border: r.you ? "1px solid var(--accent)" : "1px solid var(--rule)",
            background: r.you ? "rgba(155,255,26,0.08)" : "var(--bg-soft)",
          }}
        >
          <span style={{ ...mono, fontSize: 10, color: "var(--muted)", width: 14 }}>{i + 1}</span>
          <span style={{ fontSize: 11.5, fontWeight: r.you ? 700 : 500, color: r.you ? "var(--accent)" : "var(--fg)" }}>{r.name}</span>
          <span style={{ ...mono, fontSize: 11, marginLeft: "auto", color: r.you ? "var(--accent)" : "var(--muted)" }}>{r.score}</span>
        </motion.div>
      ))}

      <motion.button
        type="button"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: reduce ? 0 : 0.7 }}
        onClick={() => {
          window.location.href = "/start";
        }}
        className="cta-primary"
        style={{
          width: "100%",
          marginTop: 8,
          color: "var(--accent-ink)",
          border: 0,
          borderRadius: 10,
          padding: "11px 0",
          fontSize: 12.5,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Fix it now →
      </motion.button>
    </div>
  );
}
