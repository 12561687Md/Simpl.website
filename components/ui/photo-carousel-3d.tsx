"use client";

import { useMemo } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

/**
 * Auto-rotating 3D photo cylinder, adapted from the 21st.dev "3D carousel"
 * reference. Three deliberate departures:
 *
 *  - No drag, no click-to-expand: it spins on its own at a slow constant
 *    rate. This lives inside the scan theater, which is a presentation the
 *    visitor watches, not a gallery they operate.
 *  - Real business photos (the same proxied Places photos the theater
 *    already pulls), not picsum placeholders.
 *  - Our inline-style idiom instead of the reference's Tailwind classes —
 *    the bg-mauve-dark-2 tokens it leans on don't exist in this codebase.
 *
 * With only ~4 real photos a 4-face cylinder reads as a lonely square, so
 * the set repeats to 8 faces to fill the drum. Under prefers-reduced-motion
 * the drum holds still (front faces remain visible) instead of spinning.
 */
export default function PhotoCarousel3D({ photos, size = 260 }: { photos: string[]; size?: number }) {
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

  const faceCount = faces.length;
  // Face width plus a small gap decides the drum circumference, and the
  // radius follows from it — sizing from the photo out, not the screen in,
  // so the front face is always `size` wide regardless of viewport.
  const faceWidth = size + 24;
  const cylinderWidth = faceWidth * faceCount;
  const radius = cylinderWidth / (2 * Math.PI);

  if (faces.length === 0) return null;

  return (
    <div style={{ position: "relative", width: "100%", height: size + 36, overflow: "hidden" }}>
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
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid var(--rule)",
                background: "var(--bg-soft)",
                boxShadow: "0 20px 44px -18px rgba(0,0,0,0.65)",
              }}
            >
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
