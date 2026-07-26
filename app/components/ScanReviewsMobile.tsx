"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Mobile-only scan animation (replaces the app carousel on phones, which read as
 * less clean at small size). Two beats, same cadence:
 *   1. Four reviews pop in one after another, cascading DOWN the screen.
 *   2. Reviews clear, then four photos pop in at the same speed in random
 *      up/down positions.
 * Then it loops. Minimal borders on purpose.
 */

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };
const GOLD = "#F4B400";

const REVIEWS = [
  { q: "Best lawn on the block now. On time, fair price.", n: "Dana R." },
  { q: "Fixed our drainage nightmare in a single day.", n: "Mike T." },
  { q: "Showed up exactly when they said. Rare these days.", n: "Priya S." },
  { q: "Yard's never looked better. Booked them monthly.", n: "Carlos M." },
];

// Deterministic "random" placements (fixed so SSR and client match).
const PHOTOS = [
  { top: "6%", left: "8%", w: 116, h: 92, rot: -4, bg: "linear-gradient(135deg,#2f6d3f,#6ba84f)" },
  { top: "52%", left: "40%", w: 128, h: 100, rot: 5, bg: "linear-gradient(135deg,#3a5a40,#a3b18a)" },
  { top: "28%", left: "44%", w: 108, h: 86, rot: -6, bg: "linear-gradient(135deg,#4a7c59,#8fbc8f)" },
  { top: "70%", left: "6%", w: 120, h: 94, rot: 3, bg: "linear-gradient(135deg,#5c4033,#8b6f47)" },
];

const INTERVAL = 620;
const CYCLE = 10; // 0-4 reviews (+hold), 5-9 photos (+hold), then loop

function Stars() {
  return (
    <span aria-hidden="true" style={{ color: GOLD, fontSize: 11, letterSpacing: 1 }}>
      {"★★★★★"}
    </span>
  );
}

export default function ScanReviewsMobile() {
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setT((v) => (v + 1) % CYCLE), INTERVAL);
    return () => clearInterval(id);
  }, [reduce]);

  const reviewsShown = reduce ? REVIEWS.length : t < 5 ? Math.min(t + 1, REVIEWS.length) : 0;
  const photosShown = reduce ? 0 : t >= 5 ? Math.min(t - 4, PHOTOS.length) : 0;
  const phase = photosShown > 0 ? "photos" : "reviews";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, position: "relative" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(137,207,240,0.18), transparent 68%)", filter: "blur(20px)", pointerEvents: "none" }} />
      <div className="phone-frame" style={{ position: "relative" }}>
        <div className="phone-screen">
          <div className="phone-island" aria-hidden="true" style={{ background: "#08090a" }} />

          {/* Scan status */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 10px" }}>
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
              {phase === "reviews" ? "Reading reviews" : "Scanning photos"}
            </span>
            <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: 99, background: "var(--accent)" }} aria-hidden="true" />
          </div>

          {/* Content stage */}
          <div style={{ position: "relative", height: 452, padding: "6px 16px 16px", overflow: "hidden" }}>
            {/* Reviews cascade down */}
            <AnimatePresence>
              {phase === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "grid", gap: 12 }}
                >
                  {REVIEWS.slice(0, reviewsShown).map((r) => (
                    <motion.div
                      key={r.n}
                      initial={reduce ? false : { opacity: 0, y: 14, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                      style={{ background: "var(--bg-elev)", borderRadius: 14, padding: "13px 15px" }}
                    >
                      <Stars />
                      <div style={{ fontSize: 13, lineHeight: 1.4, marginTop: 7, color: "var(--fg)" }}>{r.q}</div>
                      <div className="mono" style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 8 }}>{r.n}</div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Photos pop in at random up/down positions */}
            {PHOTOS.slice(0, photosShown).map((p, i) => (
              <motion.div
                key={`photo-${i}`}
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  top: p.top,
                  left: p.left,
                  width: p.w,
                  height: p.h,
                  borderRadius: 12,
                  background: p.bg,
                  transform: `rotate(${p.rot}deg)`,
                  boxShadow: "0 18px 40px -20px rgba(0,0,0,0.8)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mono" style={{ ...mono, fontSize: 10.5, letterSpacing: "0.06em", color: "var(--fg-dim)", display: "flex", alignItems: "center", gap: 7 }}>
        <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: 99, background: "var(--accent)" }} />
        Simpl reads everything customers see.
      </div>
    </div>
  );
}
