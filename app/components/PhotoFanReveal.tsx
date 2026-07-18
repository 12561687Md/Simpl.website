"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Real business photos scattered big across the panel with spring physics.
 *
 * The 4-photo case (the common one — the details API pulls exactly 4) uses
 * a real CSS grid instead of absolute-percentage placement: two big cells
 * per row, generous gaps, each photo tilted via a per-cell transform.
 * Rotation is a paint-time transform, not a layout property, so grid cells
 * guarantee zero overlap regardless of how much a photo visually leans into
 * its neighbor's gap — that's a much safer way to go big than trying to
 * hand-tune percentage bounding boxes not to collide.
 *
 * 1-3 photos fall back to the percentage-based single-row scatter (same
 * technique as before, just bigger), since a 2x2 grid looks sparse and
 * lopsided with fewer than 4 tiles.
 */

interface Slot {
  rotate: number;
  left: string;
  top: string;
  width: string;
  marginLeft: string;
  z: number;
}

const THREE: Slot[] = [
  { rotate: -6, left: "17%", top: "8%", width: "33%", marginLeft: "-16.5%", z: 30 },
  { rotate: 4, left: "50%", top: "28%", width: "34%", marginLeft: "-17%", z: 20 },
  { rotate: 7, left: "83%", top: "2%", width: "32%", marginLeft: "-16%", z: 10 },
];
const TWO: Slot[] = [
  { rotate: -6, left: "28%", top: "10%", width: "42%", marginLeft: "-21%", z: 20 },
  { rotate: 6, left: "72%", top: "20%", width: "42%", marginLeft: "-21%", z: 10 },
];
const ONE: Slot[] = [{ rotate: 0, left: "50%", top: "10%", width: "52%", marginLeft: "-26%", z: 20 }];

// Deterministic per-slot tilt/lift for the 4-up grid — a real CSS grid
// underneath (guaranteed non-overlapping cells), rotation is purely visual.
const GRID_TILT = [-5, 4, 6, -4];
const GRID_LIFT = [0, 14, -10, 4];

function Photo({ src, rotate, delay, reduce }: { src: string; rotate: number; delay: number; reduce: boolean | null }) {
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: 0, y: 26, scale: 0.86 }}
      animate={{ opacity: 1, rotate, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 14, delay: reduce ? 0 : delay }}
      whileHover={reduce ? undefined : { rotate: rotate * 0.2, scale: 1.04, transition: { type: "spring", stiffness: 200, damping: 16 } }}
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid var(--rule)",
        boxShadow: "0 28px 64px -20px rgba(0,0,0,0.65)",
        background: "var(--bg-soft)",
      }}
    >
      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </motion.div>
  );
}

export default function PhotoFanReveal({ photos, delay = 0, stagger = 2.5 }: { photos: string[]; delay?: number; stagger?: number }) {
  const reduce = useReducedMotion();
  const shown = photos.slice(0, 4);
  if (shown.length === 0) return null;

  if (shown.length === 4) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(24px, 4vw, 44px)",
          width: "100%",
        }}
      >
        {shown.map((src, i) => (
          <div key={src} style={{ transform: `translateY(${GRID_LIFT[i]}px)` }}>
            <Photo src={src} rotate={GRID_TILT[i]} delay={delay + i * stagger} reduce={reduce} />
          </div>
        ))}
      </div>
    );
  }

  const slots = shown.length === 1 ? ONE : shown.length === 2 ? TWO : THREE;

  return (
    <div style={{ position: "relative", width: "100%", height: "clamp(280px, 34vw, 360px)" }}>
      {shown.map((src, i) => {
        const slot = slots[i];
        return (
          <motion.div
            key={src}
            initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: 0, y: 22, scale: 0.86 }}
            animate={{ opacity: 1, rotate: slot.rotate, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 14, delay: reduce ? 0 : delay + i * stagger }}
            whileHover={
              reduce ? undefined : { rotate: slot.rotate * 0.25, scale: 1.05, transition: { type: "spring", stiffness: 220, damping: 16 } }
            }
            style={{
              position: "absolute",
              left: slot.left,
              top: slot.top,
              width: slot.width,
              marginLeft: slot.marginLeft,
              aspectRatio: "1 / 1",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid var(--rule)",
              boxShadow: "0 28px 64px -20px rgba(0,0,0,0.65)",
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
