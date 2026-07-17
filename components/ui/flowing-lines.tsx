"use client";

import { motion, useReducedMotion } from "framer-motion";

const COUNT = 14;

// Long, gentle S-curves drawn bottom -> top. Because the path is drawn upward,
// animating pathOffset 0 -> 1 sends the lit segment travelling up the curve.
const LINES = Array.from({ length: COUNT }, (_, i) => {
  const x = -80 + i * 62;
  const drift = 50 + (i % 5) * 14;
  return {
    id: i,
    d: `M${x} 440 C ${x + drift} 320, ${x - drift * 0.7} 170, ${x + drift * 0.5} -30`,
    width: 0.7 + (i % 4) * 0.15,
    dur: 9 + (i % 5) * 2.4,
    delay: i * 0.4,
  };
});

/**
 * Flowing lines that rise out of the top of a section. Two layers: faint static
 * curves for structure, plus lit segments travelling upward. SVG paths (not a
 * shader) so it stays cheap. Reduced motion keeps the static curves only.
 */
export function FlowingLinesUp() {
  const reduce = useReducedMotion();
  // Solid at the bottom, dissolving toward the top so the lines read as
  // flowing up and out into the section above.
  const mask = "linear-gradient(180deg, transparent 0%, #000 34%, #000 100%)";

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ WebkitMaskImage: mask, maskImage: mask }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 420" fill="none" preserveAspectRatio="xMidYMid slice">
        {LINES.map((l) => (
          <path key={`s-${l.id}`} d={l.d} stroke="var(--fg)" strokeOpacity={0.055} strokeWidth={l.width} strokeLinecap="round" fill="none" />
        ))}
        {!reduce &&
          LINES.map((l) => (
            <motion.path
              key={`f-${l.id}`}
              d={l.d}
              stroke="var(--accent)"
              strokeOpacity={0.32}
              strokeWidth={l.width + 0.35}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0.2, pathOffset: 0 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{ duration: l.dur, delay: l.delay, repeat: Infinity, ease: "linear" }}
            />
          ))}
      </svg>
    </div>
  );
}
