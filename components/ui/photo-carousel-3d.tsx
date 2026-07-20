"use client";

import { useMemo } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

/**
 * Auto-rotating 3D photo cylinder, adapted from the 21st.dev "3D carousel"
 * reference. Deliberate departures:
 *
 *  - No drag, no click-to-expand: it spins on its own at a slow constant
 *    rate. This lives inside the scan theater, which is a presentation the
 *    visitor watches, not a gallery they operate.
 *  - Real business photos (the same proxied Places photos the theater
 *    already pulls), not picsum placeholders.
 *  - Faces don't all pop in at once: each unique photo joins the spinning
 *    drum on the `stagger` cadence (its duplicate face appears with it), so
 *    the carousel builds up photo by photo like the rest of the reveal.
 *  - Our inline-style idiom instead of the reference's Tailwind classes —
 *    the bg-mauve-dark-2 tokens it leans on don't exist in this codebase.
 *
 * With only ~4 real photos a 4-face cylinder reads as a lonely square, so
 * the set repeats to 8 faces to fill the drum. Under prefers-reduced-motion
 * the drum holds still (front faces remain visible) instead of spinning.
 */
// One uniform slant for every face: parallel edges read as a deliberate
// design line; alternating directions read as photos colliding.
const TILT = -3.5;

export default function PhotoCarousel3D({
  photos,
  size = 300,
  stagger = 1.5,
}: {
  photos: string[];
  size?: number;
  /** Seconds between each unique photo joining the drum. */
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const rotation = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    // ~9°/s: a full lap every ~40s. Present, never frantic.
    rotation.set(rotation.get() + delta * 0.009);
  });
  const transform = useTransform(rotation, (v) => `rotate3d(0, 1, 0, ${v}deg)`);

  const faces = useMemo(() => {
    if (photos.length === 0) return [];
    const out: string[] = [];
    while (out.length < 8) out.push(...photos);
    return out.slice(0, 8);
  }, [photos]);

  const uniqueCount = Math.min(photos.length, 8) || 1;
  const faceCount = faces.length;
  // Face width plus a gap decides the drum circumference, and the radius
  // follows from it — sizing from the photo out, not the screen in, so the
  // front face is always `size` wide regardless of viewport. Tightened from
  // +44 to +18: with a big gap, neighboring frames drift apart as the drum
  // turns; a tight gap keeps their bordered edges reading as one continuous,
  // flush filmstrip instead of separate floating cards.
  const faceWidth = size + 18;
  const cylinderWidth = faceWidth * faceCount;
  const radius = cylinderWidth / (2 * Math.PI);

  if (faces.length === 0) return null;

  return (
    <div style={{ position: "relative", width: "100%", height: size + 44, overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          perspective: 1100,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            height: size,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {faces.map((src, i) => (
            // Placement transform lives on a static wrapper: framer-motion
            // owns `transform` on the animated element (it composes scale/
            // opacity into it), and would silently clobber a static
            // rotateY/translateZ written on the same node.
            <div
              key={`${src}-${i}`}
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: size,
                height: size,
                marginLeft: -size / 2,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
            >
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: reduce ? 0 : (i % uniqueCount) * stagger }}
                style={{
                  width: "100%",
                  height: "100%",
                  // Same radius as the review cards, so the frame family
                  // reads as one system across the theater.
                  borderRadius: 12,
                  // Uniform slant, every face the same angle — parallel
                  // ("flush") edges. The old alternating ± directions made
                  // neighboring photos lean INTO each other. `rotate` goes
                  // through framer-motion's own transform pipeline, so it
                  // composes with the scale entrance instead of being
                  // clobbered by it.
                  rotate: TILT,
                  overflow: "hidden",
                  // A thin brand-blue frame, no cream mat: the cream padding
                  // read as a "white blob" around photos that don't fill a
                  // square. A slim accent border directly on the image (2px
                  // inset so it doesn't clip the corners) is the fix.
                  border: "1.5px solid var(--accent)",
                  background: "var(--bg-soft)",
                  padding: 2,
                  boxShadow: "0 20px 40px -18px rgba(0,0,0,0.4), 0 0 0 1px rgba(137,207,240,0.12)",
                }}
              >
                {/* contain, not cover: the whole photo shows, letterboxed on
                    the dark mat, instead of being crop-chopped to a square. */}
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 9 }} />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
