"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Real business photos fanning out with spring physics — same technique as
 * a staggered card-reveal component (rotation + offset + stagger, spring
 * not easing), rebuilt in this codebase's inline-style/CSS-var idiom
 * instead of Tailwind, and fed real photos instead of stock placeholders.
 * Caps at 3 (the fan reads cleanly at 3, more starts overlapping into mud),
 * and re-centers gracefully for 1 or 2 real photos rather than leaving
 * empty slots.
 */

interface Slot {
  rotate: number;
  x: number;
  y: number;
  z: number;
}

const THREE: Slot[] = [
  { rotate: -9, x: -128, y: 18, z: 30 },
  { rotate: 6, x: 0, y: -10, z: 20 },
  { rotate: 8, x: 128, y: 24, z: 10 },
];
const TWO: Slot[] = [
  { rotate: -7, x: -84, y: 10, z: 20 },
  { rotate: 7, x: 84, y: 10, z: 10 },
];
const ONE: Slot[] = [{ rotate: 0, x: 0, y: 0, z: 20 }];

export default function PhotoFanReveal({ photos, delay = 0, stagger = 2.5 }: { photos: string[]; delay?: number; stagger?: number }) {
  const reduce = useReducedMotion();
  const shown = photos.slice(0, 3);
  if (shown.length === 0) return null;

  const slots = shown.length === 1 ? ONE : shown.length === 2 ? TWO : THREE;

  return (
    <div style={{ position: "relative", width: "100%", height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {shown.map((src, i) => {
        const slot = slots[i];
        return (
          <motion.div
            key={src}
            initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: 0, x: 0, y: 22, scale: 0.86 }}
            animate={{ opacity: 1, rotate: slot.rotate, x: slot.x, y: slot.y, scale: 1 }}
            transition={{ type: "spring", stiffness: 110, damping: 14, delay: reduce ? 0 : delay + i * stagger }}
            whileHover={
              reduce
                ? undefined
                : { rotate: slot.rotate * 0.25, y: slot.y - 12, scale: 1.05, transition: { type: "spring", stiffness: 220, damping: 16 } }
            }
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid var(--rule)",
              boxShadow: "0 24px 56px -18px rgba(0,0,0,0.65)",
              background: "var(--bg-soft)",
              zIndex: slot.z,
            }}
          >
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </motion.div>
        );
      })}
    </div>
  );
}
