"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Real business photos scattered across the panel with spring physics.
 *
 * One row, percentage-positioned, capped photo size — NOT sized as a
 * fraction of the container (a 2-column grid at 1/1 aspect-ratio in a wide
 * column balloons each photo to 500px+ tall, forcing a scroll to see the
 * bottom row, which is exactly the "why did you make these so big" bug).
 * The container height is a small fixed clamp, not vw-driven, so this fits
 * next to the reviews above it without pushing the fold — everything should
 * read in one viewport, same as it does on the Owner.com reference this is
 * matched against.
 */

interface Slot {
  rotate: number;
  left: string;
  top: string;
  width: string;
  marginLeft: string;
  z: number;
}

// Widths intentionally modest (18-19%) and fixed regardless of how wide the
// container is — 4 across in one row, real gaps between every pair.
const FOUR: Slot[] = [
  { rotate: -6, left: "12%", top: "10%", width: "19%", marginLeft: "-9.5%", z: 40 },
  { rotate: 4, left: "37%", top: "0%", width: "19%", marginLeft: "-9.5%", z: 30 },
  { rotate: -3, left: "62%", top: "12%", width: "19%", marginLeft: "-9.5%", z: 20 },
  { rotate: 6, left: "87%", top: "2%", width: "19%", marginLeft: "-9.5%", z: 10 },
];
const THREE: Slot[] = [
  { rotate: -6, left: "18%", top: "6%", width: "23%", marginLeft: "-11.5%", z: 30 },
  { rotate: 4, left: "50%", top: "14%", width: "24%", marginLeft: "-12%", z: 20 },
  { rotate: 7, left: "82%", top: "0%", width: "22%", marginLeft: "-11%", z: 10 },
];
const TWO: Slot[] = [
  { rotate: -6, left: "30%", top: "6%", width: "28%", marginLeft: "-14%", z: 20 },
  { rotate: 6, left: "70%", top: "12%", width: "28%", marginLeft: "-14%", z: 10 },
];
const ONE: Slot[] = [{ rotate: 0, left: "50%", top: "6%", width: "34%", marginLeft: "-17%", z: 20 }];

export default function PhotoFanReveal({ photos, delay = 0, stagger = 2.5 }: { photos: string[]; delay?: number; stagger?: number }) {
  const reduce = useReducedMotion();
  const shown = photos.slice(0, 4);
  if (shown.length === 0) return null;

  const slots = shown.length === 1 ? ONE : shown.length === 2 ? TWO : shown.length === 3 ? THREE : FOUR;

  return (
    <div style={{ position: "relative", width: "100%", height: "clamp(160px, 15vw, 210px)" }}>
      {shown.map((src, i) => {
        const slot = slots[i];
        return (
          <motion.div
            key={src}
            initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: 0, y: 22, scale: 0.86 }}
            animate={{ opacity: 1, rotate: slot.rotate, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 110, damping: 14, delay: reduce ? 0 : delay + i * stagger }}
            whileHover={
              reduce ? undefined : { rotate: slot.rotate * 0.25, scale: 1.08, transition: { type: "spring", stiffness: 220, damping: 16 } }
            }
            style={{
              position: "absolute",
              left: slot.left,
              top: slot.top,
              width: slot.width,
              marginLeft: slot.marginLeft,
              aspectRatio: "1 / 1",
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid var(--rule)",
              boxShadow: "0 20px 44px -18px rgba(0,0,0,0.65)",
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
