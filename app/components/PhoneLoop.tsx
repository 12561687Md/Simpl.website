"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SimplMark } from "@/components/ui/simpl-brand";
import { DEMO_PLACE, DEMO_BOARD } from "../lib/demo-audit";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

/**
 * The phone runs the Simpl audit like a real, polished app: a centered
 * vital-sign (pulse) logo loading animation the moment the screen appears,
 * then the report auto-cycling through its tabs (score gauge, category
 * grades, who's ranking above you), no user scrolling. Dark app screen on
 * the brand palette (Matt's call after trying light). Sample data is the
 * fictional Wildgrove Landscaping set.
 */
const INK = "var(--fg)";
const SUB = "var(--muted)";
const LINE = "var(--rule)";
const CARD = "var(--bg-elev)";
const SCREEN = "var(--bg)";
const BLUE = "var(--accent)";
const GREEN = "#34A853";
const AMBER = "#E0A852";
const CORAL = "#E05252";

function gradeColor(g: string) {
  if (g.startsWith("A") || g.startsWith("B")) return GREEN;
  if (g.startsWith("C")) return AMBER;
  return CORAL;
}

/* ---- Chrome ---- */

function StatusBar() {
  const c = "var(--fg)";
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 22px 4px", color: c }}>
      <span style={{ ...mono, fontSize: 13, fontWeight: 600 }}>9:47</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }} aria-hidden="true">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none"><rect x="0" y="7" width="3" height="4" rx="0.6" fill="currentColor" /><rect x="4.5" y="5" width="3" height="6" rx="0.6" fill="currentColor" /><rect x="9" y="3" width="3" height="8" rx="0.6" fill="currentColor" /><rect x="13" y="0" width="3" height="11" rx="0.6" fill="currentColor" /></svg>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none"><rect x="0.75" y="0.75" width="19.5" height="10.5" rx="2.5" stroke="currentColor" strokeWidth="1.1" opacity="0.5" /><rect x="2.2" y="2.2" width="15" height="7.6" rx="1.3" fill="currentColor" /></svg>
      </div>
    </div>
  );
}

/* ---- Phase 1: pulse-logo loading + scan ---- */

const CHECKS = ["Finding you on Google", "Reading your website", "Checking your reviews", "Sizing up competitors"];

function LoadingScan({ reduce }: { reduce: boolean }) {
  const [done, setDone] = useState(reduce ? CHECKS.length : 0);
  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const t = setInterval(() => { i += 1; setDone(i); if (i >= CHECKS.length) clearInterval(t); }, 620);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div style={{ height: 452, background: CARD, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 26px" }}>
      {/* Vital-sign pulse logo, heartbeat animation + soft accent halo */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 26 }}>
        <motion.div
          aria-hidden="true"
          style={{ position: "absolute", width: 96, height: 96, borderRadius: "50%", background: "radial-gradient(circle, rgba(137,207,240,0.22), transparent 70%)" }}
          animate={reduce ? {} : { scale: [1, 1.35, 1], opacity: [0.7, 0.2, 0.7] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          animate={reduce ? {} : { scale: [1, 1.14, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
        >
          <SimplMark size={62} />
        </motion.div>
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: INK, marginBottom: 3 }}>Scanning your presence</div>
      <div style={{ fontSize: 12, color: SUB, marginBottom: 22 }}>The same audit we run for real clients.</div>
      <div style={{ width: "100%", maxWidth: 210, display: "grid", gap: 9 }}>
        {CHECKS.map((c, i) => {
          const on = i < done;
          return (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: 9, opacity: on ? 1 : 0.4, transition: "opacity 250ms ease" }}>
              <span style={{ width: 16, height: 16, borderRadius: 99, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: on ? BLUE : "transparent", border: on ? "none" : `1.5px solid ${LINE}` }}>
                {on && <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.5L5 9L9.5 3.5" stroke="#081420" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </span>
              <span style={{ fontSize: 12.5, color: INK, fontWeight: 500 }}>{c}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---- Phase 2: the report (auto-cycling tabs) ---- */

function Gauge({ pct, reduce }: { pct: number; reduce: boolean }) {
  const [v, setV] = useState(reduce ? pct : 0);
  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min((t - start) / 1300, 1);
      setV(Math.round((1 - Math.pow(1 - k, 3)) * pct));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pct, reduce]);

  const r = 52, C = 2 * Math.PI * r, arc = 0.72; // 260-ish deg gauge
  return (
    <div style={{ position: "relative", width: 148, height: 128 }}>
      <svg width="148" height="148" viewBox="0 0 148 148" style={{ transform: "rotate(129deg)" }}>
        <circle cx="74" cy="74" r={r} fill="none" stroke={LINE} strokeWidth="11" strokeLinecap="round" strokeDasharray={`${arc * C} ${C}`} />
        <circle cx="74" cy="74" r={r} fill="none" stroke={BLUE} strokeWidth="11" strokeLinecap="round" strokeDasharray={`${arc * C * (v / 100)} ${C}`} style={{ transition: "stroke-dasharray 90ms linear" }} />
      </svg>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 148, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 44, fontWeight: 800, color: INK, lineHeight: 1, letterSpacing: "-0.02em" }}>{v}</span>
        <span style={{ fontSize: 12, color: SUB, fontWeight: 600, marginTop: 2 }}>/ 100</span>
      </div>
    </div>
  );
}

const CATEGORIES = [
  { name: "Website", grade: "C", score: "9/15" },
  { name: "Local SEO", grade: "D", score: "12/24" },
  { name: "Reviews", grade: "B", score: "8/10" },
  { name: "Google Profile", grade: "C", score: "10/15" },
];

function MiniRing({ grade }: { grade: string }) {
  const pct = grade.startsWith("A") ? 0.95 : grade.startsWith("B") ? 0.8 : grade.startsWith("C") ? 0.6 : 0.35;
  const r = 9, C = 2 * Math.PI * r, col = gradeColor(grade);
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx="12" cy="12" r={r} fill="none" stroke={LINE} strokeWidth="3" />
      <circle cx="12" cy="12" r={r} fill="none" stroke={col} strokeWidth="3" strokeLinecap="round" strokeDasharray={`${pct * C} ${C}`} />
    </svg>
  );
}

const REPORT_TABS = ["Score", "Grades", "Google Maps"] as const;

function Report({ reduce }: { reduce: boolean }) {
  const board = DEMO_BOARD.snapshots[0];
  // Auto-advance through the report tabs, no user scrolling required.
  const [tab, setTab] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setTab((i) => (i + 1) % REPORT_TABS.length), 4300);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div style={{ height: 452, background: SCREEN, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* App header with avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 18px 12px", background: CARD, borderBottom: `1px solid ${LINE}`, flexShrink: 0 }}>
        <div style={{ width: 30, height: 30, borderRadius: 99, overflow: "hidden", flexShrink: 0, border: `1px solid ${LINE}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={DEMO_PLACE.photos[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: INK }}>Wildgrove Landscaping</div>
          <div style={{ fontSize: 10.5, color: SUB }}>Raleigh, NC</div>
        </div>
        <span style={{ ...mono, marginLeft: "auto", fontSize: 9, color: BLUE, border: `1px solid ${BLUE}`, borderRadius: 999, padding: "2px 8px", fontWeight: 600 }}>LIVE</span>
      </div>

      {/* Auto-cycling screens */}
      <div style={{ flex: 1, position: "relative", padding: "14px 14px 6px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: "100%" }}
          >
            {tab === 0 && (
              <div style={{ background: CARD, borderRadius: 18, padding: "22px 16px", border: "1px solid var(--rule)", textAlign: "center", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ ...mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: SUB, marginBottom: 6 }}>Your Simpl Score</div>
                <div style={{ display: "flex", justifyContent: "center" }}><Gauge pct={52} reduce={reduce} /></div>
                <div style={{ fontSize: 16, fontWeight: 700, color: BLUE, marginTop: 4 }}>Room to grow</div>
                <div style={{ fontSize: 12.5, color: SUB, marginTop: 6, lineHeight: 1.45, maxWidth: 200, marginInline: "auto" }}>
                  Big upside. The leaders above you sit in the 80s.
                </div>
              </div>
            )}
            {tab === 1 && (
              <div style={{ background: CARD, borderRadius: 18, padding: "10px 16px", border: "1px solid var(--rule)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ ...mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: SUB, margin: "4px 0 6px" }}>Category grades</div>
                {CATEGORIES.map((c, i) => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 11, padding: "13px 0", borderBottom: i < CATEGORIES.length - 1 ? `1px solid ${LINE}` : "none" }}>
                    <MiniRing grade={c.grade} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: INK }}>{c.name}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: gradeColor(c.grade) }}>{c.grade === "D" ? "Needs work" : c.grade === "C" ? "Fair" : "Good"}</div>
                    </div>
                    <span style={{ ...mono, fontSize: 12, color: SUB }}>{c.score}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === 2 && (
              <div style={{ background: CARD, borderRadius: 18, padding: "14px 16px", border: "1px solid var(--rule)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: INK, marginBottom: 3 }}>Who&apos;s ranking above you</div>
                <div style={{ ...mono, fontSize: 10, color: SUB, marginBottom: 10 }}>&ldquo;{board.keyword}&rdquo;</div>
                {board.maps.slice(0, 4).map((m) => (
                  <div key={m.title} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 9px", marginBottom: 6, borderRadius: 10, background: m.is_you ? "rgba(137,207,240,0.08)" : SCREEN, border: m.is_you ? `1px solid ${BLUE}` : `1px solid transparent` }}>
                    <span style={{ ...mono, fontSize: 11, color: m.is_you ? BLUE : SUB, width: 14, fontWeight: 700 }}>{m.rank}</span>
                    <span style={{ fontSize: 12, fontWeight: m.is_you ? 700 : 500, color: m.is_you ? BLUE : INK, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.is_you ? "You" : m.title}</span>
                    <span style={{ ...mono, fontSize: 11, marginLeft: "auto", color: AMBER, fontWeight: 600 }}>★{m.rating}</span>
                  </div>
                ))}
                <div style={{ fontSize: 11.5, color: SUB, marginTop: 6, lineHeight: 1.45 }}>
                  You&apos;re <span style={{ color: BLUE, fontWeight: 700 }}>#{board.your_maps_rank}</span>. The top 3 get the calls.
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 7, padding: "8px 0 14px", flexShrink: 0 }} aria-hidden="true">
        {REPORT_TABS.map((t, i) => (
          <span key={t} style={{ width: i === tab ? 20 : 6, height: 6, borderRadius: 99, background: i === tab ? BLUE : LINE, transition: "width 300ms ease, background 300ms ease" }} />
        ))}
      </div>
    </div>
  );
}

type Phase = "loading" | "report";

export default function PhoneLoop() {
  const [phase, setPhase] = useState<Phase>("loading");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) { setPhase("report"); return; }
    const t = setTimeout(() => setPhase("report"), 3400);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, position: "relative" }}>
      {/* Branded glow behind the phone so the light screen pops on the dark site. */}
      <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(137,207,240,0.20), transparent 68%)", filter: "blur(20px)", pointerEvents: "none" }} />
      <div className="phone-frame" style={{ position: "relative" }}>
        <div className="phone-screen">
          <div className="phone-island" aria-hidden="true" style={{ background: "#08090a" }} />
          <StatusBar />
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={reduce ? { opacity: 0 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {phase === "loading" ? <LoadingScan reduce={!!reduce} /> : <Report reduce={!!reduce} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {phase === "report" && (
        <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.06em", color: "var(--fg-dim)", display: "flex", alignItems: "center", gap: 7 }}>
          <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: 99, background: "var(--accent)" }} />
          A real Simpl audit, in seconds.
        </div>
      )}
    </div>
  );
}
