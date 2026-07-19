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
  // Face width plus a wide gap decides the drum circumference, and the
  // radius follows from it — sizing from the photo out, not the screen in,
  // so the front face is always `size` wide regardless of viewport.
  const faceWidth = size + 44;
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
                  borderRadius: 24,
                  overflow: "hidden",
                  border: "1px solid var(--rule)",
                  background: "var(--bg-soft)",
                  boxShadow: "0 20px 40px -18px rgba(0,0,0,0.22)",
                }}
              >
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
