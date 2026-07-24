"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SimplMark } from "@/components/ui/simpl-brand";
import { DEMO_PLACE, DEMO_RESULT, DEMO_BOARD } from "../lib/demo-audit";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

/**
 * The phone runs the Simpl audit like the real app: a cold-start splash, the
 * scan working through its checks, then the handful of highest-value insight
 * cards, the score, your Google Maps position vs local competitors, the
 * biggest problems, and the reputation gap. Not the full report (that would be
 * unreadable at phone width); the sections a customer actually reacts to.
 *
 * Every number is pulled from the clearly-fictional Wildgrove Landscaping
 * sample (lib/demo-audit.ts), never a claim about a real business.
 */

function StatusBar() {
  return (
    <div className="phone-status-bar">
      <span style={{ ...mono, fontSize: 13, fontWeight: 600, letterSpacing: "0.01em" }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }} aria-hidden="true">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <rect x="0" y="7" width="3" height="4" rx="0.6" fill="currentColor" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.6" fill="currentColor" />
          <rect x="9" y="3" width="3" height="8" rx="0.6" fill="currentColor" />
          <rect x="13" y="0" width="3" height="11" rx="0.6" fill="currentColor" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 9.6a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Z" fill="currentColor" />
          <path d="M4.6 6.3a4.1 4.1 0 0 1 5.8 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
          <path d="M2 3.6a7.8 7.8 0 0 1 11 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        </svg>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
          <rect x="0.75" y="0.75" width="19.5" height="10.5" rx="2.5" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
          <rect x="2.2" y="2.2" width="15" height="7.6" rx="1.3" fill="currentColor" />
          <path d="M21.5 4v4a1.6 1.6 0 0 0 1-1.5V5.5A1.6 1.6 0 0 0 21.5 4Z" fill="currentColor" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

function AppHeader({ label, live }: { label: string; live: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px 12px" }}>
      <SimplMark size={18} inverted />
      <span style={{ ...mono, fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{label}</span>
      <span style={{ ...mono, fontSize: 9.5, color: "var(--accent)", marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5 }}>
        {live && <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: 99, background: "var(--accent)" }} />}
        {live ? "scanning" : "sample"}
      </span>
    </div>
  );
}

function SplashPhase() {
  return (
    <div style={{ minHeight: 392, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: [0.85, 1.04, 1] }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
        <SimplMark size={52} inverted />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }} style={{ ...mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
        Simpl
      </motion.div>
      <div style={{ width: 92, height: 3, borderRadius: 99, background: "var(--rule)", overflow: "hidden", marginTop: 4 }}>
        <motion.div initial={{ x: -40 }} animate={{ x: 96 }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }} style={{ width: 40, height: "100%", borderRadius: 99, background: "var(--accent)" }} />
      </div>
    </div>
  );
}

const SCAN_CHECKS = [
  "Finding your business on Google",
  "Reading your website",
  "Checking your reviews",
  "Comparing local competitors",
  "Scoring 6 categories",
];

function ScanPhase({ reduce }: { reduce: boolean }) {
  return (
    <div style={{ minHeight: 392, paddingTop: 30 }}>
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <div style={{ fontSize: 14.5, fontWeight: 600 }}>Scanning your presence…</div>
        <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 3 }}>The same audit we run for real clients.</div>
      </div>
      {SCAN_CHECKS.map((c, i) => (
        <motion.div
          key={c}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: reduce ? 0 : 0.2 + i * 0.55 }}
          className="phone-note"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <motion.span
            aria-hidden="true"
            initial={{ background: "var(--rule-strong)" }}
            animate={{ background: "var(--accent)" }}
            transition={{ delay: reduce ? 0 : 0.2 + i * 0.55 + 0.4, duration: 0.2 }}
            style={{ width: 6, height: 6, borderRadius: 99, flexShrink: 0 }}
          />
          <span style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.35 }}>{c}</span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : 0.2 + i * 0.55 + 0.45 }} className="mono" style={{ fontSize: 9, color: "var(--accent)", marginLeft: "auto" }}>
            ✓
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

/* Animated score ring: counts up from a low number to the real sample score. */
function ScoreRing({ reduce }: { reduce: boolean }) {
  const target = DEMO_RESULT.percentage; // 52
  const [pct, setPct] = useState(reduce ? target : 8);
  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min((t - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      setPct(Math.round(8 + (target - 8) * eased));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduce]);
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: 92, height: 92, flexShrink: 0 }}>
      <svg width="92" height="92" viewBox="0 0 92 92" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="46" cy="46" r={r} fill="none" stroke="var(--rule)" strokeWidth="6" />
        <circle cx="46" cy="46" r={r} fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} style={{ transition: "stroke-dashoffset 120ms linear" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 26, fontWeight: 300, color: "var(--accent)", lineHeight: 1 }}>{DEMO_RESULT.grade}</span>
        <span style={{ ...mono, fontSize: 10, color: "var(--muted)" }}>{pct}%</span>
      </div>
    </div>
  );
}

function InsightCard({ title, children, delay, reduce }: { title: string; children: React.ReactNode; delay: number; reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ border: "1px solid var(--rule)", borderRadius: 14, background: "var(--bg-soft)", padding: "14px 15px", marginBottom: 10 }}
    >
      <div className="mono" style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 11 }}>{title}</div>
      {children}
    </motion.div>
  );
}

/**
 * The curated insight cards, the sections a customer actually reacts to, built
 * from the sample data: the score, Maps position vs local competitors, the
 * biggest problems, and the reputation gap.
 */
function InsightPhase({ reduce }: { reduce: boolean }) {
  const board = DEMO_BOARD.snapshots[0]; // "landscaping raleigh nc"
  const mapsRank = board.your_maps_rank; // 6
  const topReviews = Math.max(...board.maps.map((m) => m.reviews ?? 0)); // 206

  // The three criticals, framed as wins to gain rather than problems to fear.
  const WINS = [
    "Get recommended by Google and AI with schema",
    "Load fast on mobile and keep every visitor",
    "Turn Instagram into a steady lead source",
  ];

  return (
    <div className="phone-insight-scroll" style={{ height: 392, overflowY: "auto", overflowX: "hidden", padding: "2px 12px 20px", WebkitOverflowScrolling: "touch" }}>
      {/* 1. Simpl Score */}
      <InsightCard title="Your Simpl Score" delay={0.05} reduce={reduce}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <ScoreRing reduce={reduce} />
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3 }}>Big upside to win.</div>
            <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 4, lineHeight: 1.4 }}>
              The businesses ranking above you sit in the 80s. Closing that gap is your next {DEMO_RESULT.critical_count + DEMO_RESULT.warning_count} wins.
            </div>
          </div>
        </div>
      </InsightCard>

      {/* 2. Who's ranking above you (Google positioning) */}
      <InsightCard title="Who's ranking above you" delay={0.14} reduce={reduce}>
        <div className="mono" style={{ fontSize: 10, color: "var(--muted)", marginBottom: 9 }}>“{board.keyword}”</div>
        {board.maps.slice(0, 4).map((m) => (
          <div key={m.title} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", marginBottom: 5, borderRadius: 8, border: m.is_you ? "1px solid var(--accent)" : "1px solid var(--rule)", background: m.is_you ? "rgba(137,207,240,0.08)" : "transparent" }}>
            <span style={{ ...mono, fontSize: 10, color: "var(--muted)", width: 14 }}>{m.rank}</span>
            <span style={{ fontSize: 11, fontWeight: m.is_you ? 700 : 500, color: m.is_you ? "var(--accent)" : "var(--fg)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.is_you ? "You" : m.title}</span>
            <span style={{ ...mono, fontSize: 10, marginLeft: "auto", color: "var(--muted)" }}>★{m.rating}</span>
          </div>
        ))}
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 8, lineHeight: 1.4 }}>
          You&apos;re <span style={{ color: "var(--accent)", fontWeight: 600 }}>#{mapsRank}</span>. Climb into the top 3 and most of these calls become yours.
        </div>
      </InsightCard>

      {/* 3. Fastest wins (criticals, gain-framed) */}
      <InsightCard title="Your fastest wins" delay={0.22} reduce={reduce}>
        {WINS.map((w) => (
          <div key={w} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 9 }}>
            <span aria-hidden="true" style={{ color: "var(--accent)", fontSize: 12, fontWeight: 700, lineHeight: 1.2, marginTop: 1 }}>→</span>
            <span style={{ fontSize: 12, lineHeight: 1.4 }}>{w}</span>
          </div>
        ))}
      </InsightCard>

      {/* 4. Reviews vs the leaders (still "who's ranking better", gain-framed) */}
      <InsightCard title="Reviews vs the leaders" delay={0.3} reduce={reduce}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 600, color: "var(--accent)" }}>{DEMO_PLACE.rating}★</span>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>{DEMO_PLACE.reviewCount} reviews</span>
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 8, lineHeight: 1.4 }}>
          The leaders are near <span style={{ color: "var(--fg)", fontWeight: 600 }}>{topReviews}</span>. Reviews are the #2 local ranking factor, so catching up moves you up the map.
        </div>
      </InsightCard>

      <div style={{ textAlign: "center", padding: "6px 0 2px" }}>
        <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.1em", color: "var(--fg-dim)", textTransform: "uppercase" }}>+ full report unlocks free</span>
      </div>
    </div>
  );
}

type Phase = "splash" | "scan" | "report";

export default function PhoneLoop() {
  const [phase, setPhase] = useState<Phase>("splash");
  const reduce = useReducedMotion();

  // Boot: splash (1.4s) -> scan (3.8s) -> live report. Reduced motion skips
  // straight to the report so there's no motion, just the deliverable.
  useEffect(() => {
    if (reduce) {
      setPhase("report");
      return;
    }
    const t1 = setTimeout(() => setPhase("scan"), 1400);
    const t2 = setTimeout(() => setPhase("report"), 1400 + 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <div className="phone-frame">
        <div className="phone-screen">
          <div className="phone-island" aria-hidden="true" />
          <StatusBar />
          {phase !== "splash" && <AppHeader label={phase === "report" ? "Your audit" : "Scanning"} live={phase === "scan"} />}

          <div className="phone-content" style={{ padding: phase === "report" ? "0" : "4px 12px 16px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {phase === "splash" && <SplashPhase />}
                {phase === "scan" && <ScanPhase reduce={!!reduce} />}
                {phase === "report" && <InsightPhase reduce={!!reduce} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {phase === "report" && (
        <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.06em", color: "var(--fg-dim)", display: "flex", alignItems: "center", gap: 7 }}>
          <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: 99, background: "var(--accent)" }} />
          Your top insights, in seconds.
        </div>
      )}
    </div>
  );
}
