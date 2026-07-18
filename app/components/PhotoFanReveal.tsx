"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Real business photos scattered across the panel with spring physics.
 * Positions are percentages of the container, not fixed pixels — the
 * previous version placed 200px photos only 128px apart (a guaranteed
 * overlap) and never adapted to a narrower container, so on smaller
 * screens they piled into an unreadable stack. Percentage placement with
 * a fixed minimum gap between edges makes non-overlap a property of the
 * layout, not something tuned per breakpoint. Caps at 3 (more starts
 * feeling cluttered), and re-centers for 1 or 2 real photos rather than
 * leaving empty slots.
 */

interface Slot {
  rotate: number;
  left: string;
  top: string;
  width: string;
  /** Half of `width`, negated, as a margin — centers the photo on `left`
   *  without touching `transform` (framer-motion owns that for rotate/
   *  scale, and would silently clobber a static translateX in the same
   *  property). Percentage margins resolve against the same containing-
   *  block width as `left`, so this centers correctly at any container size. */
  marginLeft: string;
  z: number;
}

// Left-edge-to-next-left-edge gaps are wide enough that even the widest
// photo (28%) never touches its neighbor: 18/50/82 spacing with 28% width
// leaves a real ~6% gap on each side.
const THREE: Slot[] = [
  { rotate: -7, left: "18%", top: "6%", width: "27%", marginLeft: "-13.5%", z: 30 },
  { rotate: 5, left: "50%", top: "24%", width: "28%", marginLeft: "-14%", z: 20 },
  { rotate: 8, left: "82%", top: "2%", width: "26%", marginLeft: "-13%", z: 10 },
];
const TWO: Slot[] = [
  { rotate: -6, left: "30%", top: "10%", width: "34%", marginLeft: "-17%", z: 20 },
  { rotate: 6, left: "70%", top: "18%", width: "34%", marginLeft: "-17%", z: 10 },
];
const ONE: Slot[] = [{ rotate: 0, left: "50%", top: "12%", width: "42%", marginLeft: "-21%", z: 20 }];

export default function PhotoFanReveal({ photos, delay = 0, stagger = 2.5 }: { photos: string[]; delay?: number; stagger?: number }) {
  const reduce = useReducedMotion();
  const shown = photos.slice(0, 3);
  if (shown.length === 0) return null;

  const slots = shown.length === 1 ? ONE : shown.length === 2 ? TWO : THREE;

  return (
    <div style={{ position: "relative", width: "100%", height: "clamp(220px, 30vw, 300px)" }}>
      {shown.map((src, i) => {
        const slot = slots[i];
        return (
          <motion.div
            key={src}
            initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: 0, y: 22, scale: 0.86 }}
            animate={{ opacity: 1, rotate: slot.rotate, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 110, damping: 14, delay: reduce ? 0 : delay + i * stagger }}
            whileHover={
              reduce
                ? undefined
                : { rotate: slot.rotate * 0.25, scale: 1.05, transition: { type: "spring", stiffness: 220, damping: 16 } }
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
