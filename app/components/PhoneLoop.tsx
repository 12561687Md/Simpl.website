"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SimplMark } from "@/components/ui/simpl-brand";
import ScanReport from "./ScanReport";
import { DEMO_PLACE, DEMO_RESULT, DEMO_BOARD } from "../lib/demo-audit";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

/**
 * The phone runs the REAL Simpl audit, start to finish, exactly how a customer
 * experiences the app: a cold-start splash, the scan working through its
 * checks, then the actual ScanReport (the same component the live scan renders)
 * auto-scrolling inside the screen. This replaced the old four-tab mockup and
 * the separate browser-framed AuditDemo section, so the homepage shows one
 * honest thing: what you actually get.
 *
 * Sample data is the clearly-fictional Wildgrove Landscaping set (see
 * lib/demo-audit.ts), never a claim about a real business.
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

/**
 * The real report inside the phone, auto-scrolling top to bottom on a slow
 * loop so the "app" plays through the whole audit. Any user interaction
 * (wheel, touch, pointer) hands control over and stops the auto-scroll.
 */
function ReportPhase({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const takenOver = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const stop = () => { takenOver.current = true; };
    el.addEventListener("wheel", stop, { passive: true });
    el.addEventListener("touchstart", stop, { passive: true });
    el.addEventListener("pointerdown", stop, { passive: true });

    let raf = 0;
    let waitUntil = performance.now() + 900; // brief pause on the score before moving
    const tick = (t: number) => {
      if (!takenOver.current && el) {
        if (t >= waitUntil) {
          const max = el.scrollHeight - el.clientHeight;
          if (el.scrollTop >= max - 1) {
            // reached the bottom: hold, then loop back to the top
            waitUntil = t + 2600;
            el.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            el.scrollTop += 0.5; // ~30px/sec, calm and legible
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchstart", stop);
      el.removeEventListener("pointerdown", stop);
    };
  }, [reduce]);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={ref}
        className="phone-report-scroll"
        style={{ height: 392, overflowY: "auto", overflowX: "hidden", WebkitOverflowScrolling: "touch" }}
      >
        <div className="phone-report-body">
          <ScanReport place={DEMO_PLACE} result={DEMO_RESULT} board={DEMO_BOARD} teaser={false} />
        </div>
      </div>
      {/* Bottom fade so the report dissolves into the phone chrome. */}
      <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 46, pointerEvents: "none", background: "linear-gradient(180deg, transparent, var(--bg))" }} />
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
                {phase === "report" && <ReportPhase reduce={!!reduce} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {phase === "report" && (
        <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.06em", color: "var(--fg-dim)", display: "flex", alignItems: "center", gap: 7 }}>
          <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: 99, background: "var(--accent)" }} />
          The real report. Scroll it.
        </div>
      )}
    </div>
  );
}
