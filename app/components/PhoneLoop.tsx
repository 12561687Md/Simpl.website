"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SimplMark } from "@/components/ui/simpl-brand";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

/**
 * The phone depicts the real Simpl app (see docs/PRODUCT_VISION_APP.md), not a
 * static audit card. It auto-cycles three app screens, no user scrolling:
 *   1. Home  — logged in: vital-sign, notifications, the always-on AI ask box,
 *              and the primary "Fix your business" action.
 *   2. Fix   — a few first-grade-simple actions, each priced $ / $$ / $$$.
 *   3. Report— this period's progress and a one-tap "fix everything" payment.
 * First-grade simple: what, why, how, at a glance.
 */

const INK = "var(--fg)";
const SUB = "var(--muted)";
const DIM = "var(--fg-dim)";
const LINE = "var(--rule)";
const CARD = "var(--bg-elev)";
const CARD2 = "var(--bg-elev-2)";
const BLUE = "var(--accent)";
const INKON = "var(--accent-ink)";
const GREEN = "#34A853";

/* ---- Chrome ---- */

function StatusBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 22px 4px", color: "var(--fg)" }}>
      <span style={{ ...mono, fontSize: 13, fontWeight: 600 }}>9:47</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }} aria-hidden="true">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none"><rect x="0" y="7" width="3" height="4" rx="0.6" fill="currentColor" /><rect x="4.5" y="5" width="3" height="6" rx="0.6" fill="currentColor" /><rect x="9" y="3" width="3" height="8" rx="0.6" fill="currentColor" /><rect x="13" y="0" width="3" height="11" rx="0.6" fill="currentColor" /></svg>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none"><rect x="0.75" y="0.75" width="19.5" height="10.5" rx="2.5" stroke="currentColor" strokeWidth="1.1" opacity="0.5" /><rect x="2.2" y="2.2" width="15" height="7.6" rx="1.3" fill="currentColor" /></svg>
      </div>
    </div>
  );
}

function AppHeader() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 20px 14px", borderBottom: `1px solid ${LINE}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <SimplMark size={22} />
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em" }}>Simpl</span>
      </div>
      <span style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #2f6d3f, #79b34a)", flexShrink: 0 }} aria-hidden="true" />
    </div>
  );
}

/** The always-on AI ask box. */
function AskBox() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: CARD, border: `1px solid ${LINE}`, borderRadius: 12, padding: "11px 13px" }}>
      <span aria-hidden="true" style={{ display: "flex", color: BLUE }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a9 9 0 0 0-9 9c0 1.6.4 3 1.2 4.3L3 21l4.9-1.2A9 9 0 1 0 12 3Z" strokeLinejoin="round" /></svg>
      </span>
      <span style={{ fontSize: 12.5, color: DIM }}>Ask Simpl anything...</span>
    </div>
  );
}

/* ---- Screen 1: Home ---- */
function HomeScreen() {
  return (
    <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 13 }}>
      <div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: SUB, textTransform: "uppercase" }}>Good morning</div>
        <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.01em", marginTop: 3 }}>Wildgrove Landscaping</div>
      </div>

      <AskBox />

      <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 12, padding: "13px 14px", display: "flex", flexDirection: "column", gap: 9 }}>
        <div className="mono" style={{ fontSize: 9.5, letterSpacing: "0.12em", color: SUB, textTransform: "uppercase" }}>2 new</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: BLUE, flexShrink: 0 }} />
          <span style={{ fontSize: 12.5, lineHeight: 1.35 }}>3 people searched for you and didn&apos;t call.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: GREEN, flexShrink: 0 }} />
          <span style={{ fontSize: 12.5, lineHeight: 1.35 }}>Your review score went up this week.</span>
        </div>
      </div>

      <div style={{ marginTop: 2, background: BLUE, color: INKON, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: 700, fontSize: 15 }}>
        <span>Fix your business</span>
        <span aria-hidden="true" style={{ fontSize: 17 }}>→</span>
      </div>
    </div>
  );
}

/* ---- Screen 2: Fix your business ---- */
const FIXES = [
  { t: "Find customers looking for landscaping", price: "$$" },
  { t: "Publish a new fall cleanup offer", price: "$" },
  { t: "See this week's progress report", price: "›" },
];

function FixScreen() {
  return (
    <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 13 }}>
      <div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: SUB, textTransform: "uppercase" }}>Fix your business</div>
        <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", marginTop: 4, lineHeight: 1.25 }}>Pick what to fix. We do the rest.</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {FIXES.map((f) => (
          <div key={f.t} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: CARD, border: `1px solid ${LINE}`, borderRadius: 12, padding: "13px 14px" }}>
            <span style={{ fontSize: 12.5, lineHeight: 1.35, flex: 1 }}>{f.t}</span>
            <span
              className="mono"
              style={{
                flexShrink: 0, fontSize: f.price === "›" ? 15 : 12, fontWeight: 700,
                color: f.price === "›" ? SUB : INKON,
                background: f.price === "›" ? "transparent" : BLUE,
                borderRadius: 7, padding: f.price === "›" ? "0 4px" : "4px 9px",
                minWidth: f.price === "›" ? 0 : 30, textAlign: "center",
              }}
            >
              {f.price}
            </span>
          </div>
        ))}
      </div>

      <div className="mono" style={{ fontSize: 10, color: DIM, letterSpacing: "0.04em", textAlign: "center", marginTop: 2 }}>
        Pay once. It&apos;s done today.
      </div>
    </div>
  );
}

/* ---- Screen 3: Progress report + pay-to-fix ---- */
function ReportScreen() {
  return (
    <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 13 }}>
      <div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: SUB, textTransform: "uppercase" }}>This week</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
          <span style={{ fontSize: 34, fontWeight: 700, color: GREEN, letterSpacing: "-0.03em", lineHeight: 1 }}>+4%</span>
          <span style={{ fontSize: 14, color: SUB }}>better than last week</span>
        </div>
      </div>

      <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 12, padding: "13px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { t: "Fixed your contact form", done: true },
          { t: "Answered 6 missed calls", done: true },
          { t: "3 quick fixes ready", done: false },
        ].map((r) => (
          <div key={r.t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span aria-hidden="true" style={{ width: 16, height: 16, borderRadius: 5, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: r.done ? GREEN : "transparent", border: r.done ? "none" : `1.5px solid ${CARD2}`, color: "#06210f" }}>
              {r.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </span>
            <span style={{ fontSize: 12.5, color: r.done ? SUB : INK }}>{r.t}</span>
          </div>
        ))}
      </div>

      <div style={{ background: BLUE, color: INKON, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: 700, fontSize: 14.5 }}>
        <span>Fix everything</span>
        <span className="mono" style={{ fontSize: 13 }}>$$</span>
      </div>
    </div>
  );
}

const SCREENS = [
  { key: "home", el: <HomeScreen /> },
  { key: "fix", el: <FixScreen /> },
  { key: "report", el: <ReportScreen /> },
];

export default function PhoneLoop() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % SCREENS.length), 3000);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, position: "relative" }}>
      {/* Branded glow behind the phone so the screen pops on the dark site. */}
      <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(137,207,240,0.20), transparent 68%)", filter: "blur(20px)", pointerEvents: "none" }} />
      <div className="phone-frame" style={{ position: "relative" }}>
        <div className="phone-screen">
          <div className="phone-island" aria-hidden="true" style={{ background: "#08090a" }} />
          <StatusBar />
          <AppHeader />
          <div style={{ height: 400, position: "relative" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={SCREENS[i].key}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {SCREENS[i].el}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 7, padding: "6px 0 14px" }} aria-hidden="true">
            {SCREENS.map((s, idx) => (
              <span key={s.key} style={{ width: idx === i ? 20 : 6, height: 6, borderRadius: 99, background: idx === i ? BLUE : LINE, transition: "width 300ms ease, background 300ms ease" }} />
            ))}
          </div>
        </div>
      </div>

      <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.06em", color: "var(--fg-dim)", display: "flex", alignItems: "center", gap: 7 }}>
        <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: 99, background: "var(--accent)" }} />
        The Simpl app. Fix your business in a tap.
      </div>
    </div>
  );
}
