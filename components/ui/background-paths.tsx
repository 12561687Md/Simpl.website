"use client";

import { motion, useReducedMotion } from "framer-motion";

function FloatingPaths({ position, animate }: { position: number; animate: boolean }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      style={{ color: "var(--fg)" }}
      viewBox="-240 -20 1040 380"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="currentColor"
          strokeWidth={path.width}
          strokeOpacity={0.05 + path.id * 0.014}
          initial={{ pathLength: 0.3, opacity: 0.6 }}
          animate={
            animate
              ? { pathLength: 1, opacity: [0.15, 0.4, 0.15], pathOffset: [0, 1, 0] }
              : { pathLength: 1, opacity: 0.3 }
          }
          transition={
            animate
              ? { duration: 20 + Math.random() * 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
              : { duration: 0 }
          }
        />
      ))}
    </svg>
  );
}

/**
 * Background-only flowing paths for layering behind a section. Absolute,
 * pointer-events-none. The diagonal mask makes the lines read as if they enter
 * from the middle-left and fade out toward the bottom-right corner.
 */
export function FlowingPathsBackground() {
  const reduce = useReducedMotion();
  const mask =
    "linear-gradient(108deg, #000 0%, #000 30%, rgba(0,0,0,0.45) 58%, transparent 86%)";
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ WebkitMaskImage: mask, maskImage: mask }}
    >
      <FloatingPaths position={1} animate={!reduce} />
      <FloatingPaths position={-1} animate={!reduce} />
    </div>
  );
}
