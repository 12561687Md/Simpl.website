"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Horizontal process timeline, adapted from the "how-it-works" zig-zag
 * reference to the Simpl theme: a left-to-right animated dashed connector
 * flowing through numbered steps, dark surface cards with the baby-blue
 * accent (no Comic Sans, no rainbow pastels), slight alternating tilt for
 * the hand-placed feel, hover lift. Desktop is the absolute-positioned
 * timeline; mobile stacks vertically with an accent spine (see
 * .pt-* rules in globals.css).
 */

export interface TimelineStep {
  n: string;
  title: string;
  body: string;
}

/* Card anchors along the 1200x430 stage: alternating high/low so the line
   weaves. left is % of stage width. */
const POS = [
  { left: "0%", top: 26, rotate: -1.6 },
  { left: "26.5%", top: 150, rotate: 1.4 },
  { left: "53%", top: 26, rotate: -1.2 },
  { left: "79.5%", top: 150, rotate: 1.6 },
];

/* One S-curve through the four card mouths (drawn in the 1200x430 viewBox). */
const PATH =
  "M 40 120 C 200 120, 220 250, 380 250 C 520 250, 540 120, 700 120 C 840 120, 860 250, 1020 250 C 1090 250, 1130 250, 1170 250";

export default function ProcessTimeline({ steps }: { steps: TimelineStep[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="pt-wrap" style={{ position: "relative", height: 430, marginTop: 48 }}>
      {/* Animated dashed connector (marching toward the next step). */}
      <svg
        className="pt-svg"
        viewBox="0 0 1200 430"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <motion.path
          d={PATH}
          stroke="var(--accent-line)"
          strokeWidth="2"
          strokeDasharray="8 7"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ strokeDashoffset: 0 }}
          animate={reduce ? {} : { strokeDashoffset: -150 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />
        {/* A pulse dot traveling the path, the vital-sign motif on the move. */}
        {!reduce && (
          <motion.circle
            r="5"
            fill="var(--accent)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ offsetPath: `path("${PATH}")` } as React.CSSProperties}
          />
        )}
      </svg>

      {steps.map((s, i) => {
        const pos = POS[i % POS.length];
        return (
          <motion.div
            key={s.n}
            className="pt-card"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, rotate: pos.rotate }}
            whileInView={{ opacity: 1, y: 0, rotate: pos.rotate }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.14, ease: [0.16, 1, 0.3, 1] }}
            whileHover={reduce ? {} : { scale: 1.04, rotate: 0, zIndex: 5 }}
            style={{
              position: "absolute",
              left: pos.left,
              top: pos.top,
              width: "20.5%",
              minWidth: 218,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 34%), var(--bg-elev)",
              border: "1px solid var(--rule)",
              borderRadius: 16,
              padding: "20px 20px 22px",
              boxShadow: "0 24px 50px -30px rgba(0,0,0,0.7)",
            }}
          >
            {/* Number chip, sits like a pin on the line. */}
            <div
              className="mono"
              style={{
                position: "absolute",
                top: -16,
                left: 18,
                width: 34,
                height: 34,
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12.5,
                fontWeight: 700,
                color: "var(--accent-ink)",
                background: "var(--accent)",
                boxShadow: "0 6px 18px -6px var(--accent)",
              }}
            >
              {s.n}
            </div>
            <h3 style={{ margin: "14px 0 10px", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>{s.title}</h3>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "var(--muted)" }}>{s.body}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
