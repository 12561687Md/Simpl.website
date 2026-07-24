"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SimplMark } from "@/components/ui/simpl-brand";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

/**
 * The Simpl app, four tabs on a loop: score/overview, rankings + positive
 * notifications, competitors, and issues fixed. Real app structure (a status
 * bar, a pinned header, tab content), not a slideshow of unrelated screens.
 *
 * Every line is plain English: an owner reads "your site loads twice as
 * fast" instantly and "reduced LCP" not at all. No SEO vocabulary anywhere on
 * this screen.
 *
 * Names in the competitor tab ("Oakwood Landscaping") are illustrative
 * placeholders for the demo, not real businesses, same rule as the rest of
 * the mockup: nothing here is a fabricated claim about a real company or a
 * real Simpl customer (docs/standards/TRUST_SIGNALS.md).
 *
 * `optimized` freezes on the overview tab at its winning value, for the
 * "here's where you'd be" panel beside an unlocked report.
 */

const TABS = ["overview", "rankings", "competitors", "fixed"] as const;
type Tab = (typeof TABS)[number];
const TAB_LABEL: Record<Tab, string> = {
  overview: "Your score",
  rankings: "This week",
  competitors: "Local rankings",
  fixed: "Fixed for you",
};

function StatusBar() {
  return (
    <div className="phone-status-bar">
      <span style={{ ...mono, fontSize: 13, fontWeight: 600, letterSpacing: "0.01em" }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }} aria-hidden="true">
        {/* Signal */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <rect x="0" y="7" width="3" height="4" rx="0.6" fill="currentColor" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.6" fill="currentColor" />
          <rect x="9" y="3" width="3" height="8" rx="0.6" fill="currentColor" />
          <rect x="13" y="0" width="3" height="11" rx="0.6" fill="currentColor" />
        </svg>
        {/* Wifi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 9.6a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Z" fill="currentColor" />
          <path d="M4.6 6.3a4.1 4.1 0 0 1 5.8 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
          <path d="M2 3.6a7.8 7.8 0 0 1 11 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        </svg>
        {/* Battery */}
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
          <rect x="0.75" y="0.75" width="19.5" height="10.5" rx="2.5" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
          <rect x="2.2" y="2.2" width="15" height="7.6" rx="1.3" fill="currentColor" />
          <path d="M21.5 4v4a1.6 1.6 0 0 0 1-1.5V5.5A1.6 1.6 0 0 0 21.5 4Z" fill="currentColor" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

function AppHeader({ tab, optimized }: { tab: Tab; optimized: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px 12px" }}>
      <SimplMark size={18} inverted />
      <span style={{ ...mono, fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
        {TAB_LABEL[tab]}
      </span>
      {/* "live" is true on the homepage demo (a real, if illustrative,
          running-app mockup), but false here specifically means something
          on the unlocked report: this instance sits beside a visitor's real
          scan data as the "where you could be" preview, and a pulsing
          "live" badge on an admittedly hypothetical future score would read
          as a claim about real data it doesn't have. */}
      <span style={{ ...mono, fontSize: 9.5, color: "var(--accent)", marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5 }}>
        {!optimized && <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: 99, background: "var(--accent)" }} />}
        {optimized ? "example" : "live"}
      </span>
    </div>
  );
}

/* ---- Tab 1: score + overview ---- */

function OverviewTab({ optimized, reduce }: { optimized: boolean; reduce: boolean }) {
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

  const r = 40;
  const c = 2 * Math.PI * r;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 18px" }}>
        <div style={{ position: "relative", width: 108, height: 108 }}>
          <svg width="108" height="108" viewBox="0 0 108 108" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="54" cy="54" r={r} fill="none" stroke="var(--rule)" strokeWidth="6" />
            <circle
              cx="54" cy="54" r={r} fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round"
              strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)}
              style={{ transition: "stroke-dashoffset 120ms linear" }}
            />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 30, fontWeight: 300, color: "var(--accent)", lineHeight: 1 }}>{grade}</span>
            <span style={{ ...mono, fontSize: 10.5, color: "var(--muted)" }}>{pct}%</span>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginBottom: 4 }}>
        <div style={{ fontSize: 14.5, fontWeight: 600 }}>{optimized ? "You're already winning." : "Climbing every week."}</div>
        <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 3 }}>
          {optimized ? "Every issue fixed. Score locked in." : "3 issues fixed this week."}
        </div>
      </div>
    </div>
  );
}

/* ---- Tab 2: rankings + positive notifications ---- */

function RankingsTab({ reduce }: { reduce: boolean }) {
  const signals = [
    { t: "New lead from Google", w: "now" },
    { t: "You moved up to #2 for “near me” searches", w: "12m" },
    { t: "5-star review came in", w: "2h" },
    { t: "You're now showing in the map pack", w: "1d" },
  ];
  return (
    <div>
      {signals.map((s, i) => (
        <motion.div
          key={s.t}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: reduce ? 0 : 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="phone-note"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 5, height: 5, borderRadius: 99, background: "var(--accent)", flexShrink: 0 }} aria-hidden="true" />
            <span style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.35 }}>{s.t}</span>
            <span style={{ ...mono, fontSize: 9, color: "var(--muted)", marginLeft: "auto", flexShrink: 0 }}>{s.w}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---- Tab 3: competitor breakdown + Fix it now ---- */

function CompetitorsTab({ reduce }: { reduce: boolean }) {
  const rows = [
    { name: "Riverside Roofing Co.", score: 91, you: false },
    { name: "Oakwood Landscaping", score: 84, you: false },
    { name: "You", score: 65, you: true },
    { name: "BlueStone Exteriors", score: 58, you: false },
  ];
  return (
    <div>
      <div style={{ ...mono, fontSize: 9.5, color: "var(--muted)", padding: "2px 4px 10px" }}>
        “landscaper near me”
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
            background: r.you ? "rgba(137,207,240,0.08)" : "var(--bg-soft)",
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
          window.location.href = "/start-now";
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

/* ---- Tab 4: issues fixed ---- */

function FixedTab({ reduce }: { reduce: boolean }) {
  const items = [
    { k: "Fixed", t: "Your site now loads in under 2 seconds", tone: "accent" },
    { k: "Fixed", t: "Every page is now showing up in Google", tone: "accent" },
    { k: "Caught", t: "Your contact form had stopped sending, fixed same day", tone: "warn" },
    { k: "Fixed", t: "Your photos are finally showing up in search", tone: "accent" },
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
          <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.35 }}>{n.t}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---- Boot phases: splash (app launch) -> scan (live audit running) -> tabs ---- */

function SplashPhase() {
  return (
    <div style={{ minHeight: 372, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: [0.85, 1.04, 1] }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <SimplMark size={52} inverted />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ ...mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}
      >
        Simpl
      </motion.div>
      {/* Indeterminate loader bar, like a real app cold start. */}
      <div style={{ width: 92, height: 3, borderRadius: 99, background: "var(--rule)", overflow: "hidden", marginTop: 4 }}>
        <motion.div
          initial={{ x: -40 }}
          animate={{ x: 96 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 40, height: "100%", borderRadius: 99, background: "var(--accent)" }}
        />
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
    <div style={{ minHeight: 372, paddingTop: 26 }}>
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
          {/* Check flips from spinner-dot to accent tick as its line "completes". */}
          <motion.span
            aria-hidden="true"
            initial={{ background: "var(--rule-strong)" }}
            animate={{ background: "var(--accent)" }}
            transition={{ delay: reduce ? 0 : 0.2 + i * 0.55 + 0.4, duration: 0.2 }}
            style={{ width: 6, height: 6, borderRadius: 99, flexShrink: 0 }}
          />
          <span style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.35 }}>{c}</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 0.2 + i * 0.55 + 0.45 }}
            className="mono"
            style={{ fontSize: 9, color: "var(--accent)", marginLeft: "auto" }}
          >
            ✓
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

type Phase = "splash" | "scan" | "tabs";

export default function PhoneLoop({ optimized = false }: { optimized?: boolean }) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>(optimized ? "tabs" : "splash");
  const reduce = useReducedMotion();

  // Boot sequence: splash (1.4s) -> scan (3.8s) -> tab loop. Reduced motion
  // (or the frozen optimized panel) skips straight to the content.
  useEffect(() => {
    if (optimized) return;
    if (reduce) {
      setPhase("tabs");
      return;
    }
    const t1 = setTimeout(() => setPhase("scan"), 1400);
    const t2 = setTimeout(() => setPhase("tabs"), 1400 + 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce, optimized]);

  useEffect(() => {
    if (reduce || optimized || phase !== "tabs") return;
    const t = setInterval(() => setIdx((i) => (i + 1) % TABS.length), 4500);
    return () => clearInterval(t);
  }, [reduce, optimized, phase]);

  const tab: Tab = optimized ? "overview" : TABS[idx];
  const booting = phase !== "tabs";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <div className="phone-frame">
        <div className="phone-screen">
          <div className="phone-island" aria-hidden="true" />
          <StatusBar />
          {/* Header hides during splash, exactly like a native cold start. */}
          {phase !== "splash" && <AppHeader tab={phase === "scan" ? "overview" : tab} optimized={optimized} />}

          <div style={{ padding: "4px 12px 16px", minHeight: 372 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={phase === "tabs" ? tab + (optimized ? "-opt" : "") : phase}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: phase === "tabs" ? 24 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: phase === "tabs" ? -24 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {phase === "splash" && <SplashPhase />}
                {phase === "scan" && <ScanPhase reduce={!!reduce} />}
                {phase === "tabs" && tab === "overview" && <OverviewTab optimized={optimized} reduce={!!reduce} />}
                {phase === "tabs" && tab === "rankings" && <RankingsTab reduce={!!reduce} />}
                {phase === "tabs" && tab === "competitors" && <CompetitorsTab reduce={!!reduce} />}
                {phase === "tabs" && tab === "fixed" && <FixedTab reduce={!!reduce} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Progress dots (hidden while booting and in the frozen optimized view). */}
      {!optimized && !booting && (
        <div style={{ display: "flex", gap: 7 }} aria-hidden="true">
          {TABS.map((t, i) => (
            <span
              key={t}
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
