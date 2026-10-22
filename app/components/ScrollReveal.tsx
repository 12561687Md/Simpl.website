"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

const EXPO = [0.16, 1, 0.3, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

/**
 * Scroll-triggered entrance. Expo.out easing, small offset, fires once.
 * `direction` + `scale` let a section vary its motion so the page doesn't
 * animate in one monotonous way.
 *
 * Reduced motion: the SAME motion.div renders on server and client (a different
 * tree caused a hydration mismatch that left the server's opacity:0 in place, so
 * reduced-motion visitors saw blank sections). It just shows instantly instead
 * of waiting for scroll. Fixed 2026-10-22.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  scale = false,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  scale?: boolean;
}) {
  const reduce = useReducedMotion();
  const shown = { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <motion.div
      initial={{ opacity: 0, ...offset[direction], ...(scale ? { scale: 0.965 } : {}) }}
      {...(reduce ? { animate: shown } : { whileInView: shown })}
      viewport={{ once: true, margin: "-60px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.7, delay, ease: EXPO }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container. Children wrapped in <StaggerItem> reveal in sequence as the
 * group scrolls into view. Use for card grids, benefit lists, anything with
 * sibling rhythm.
 */
export function StaggerReveal({
  children,
  each = 0.09,
  className,
  style,
}: {
  children: ReactNode;
  each?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : each } },
  };
  return (
    <motion.div
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      {...(reduce ? { animate: "show" } : { whileInView: "show" })}
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Attention wiggle: rocks back and forth. By default it fires once when
 * scrolled into view. `loop` makes it keep jingling on a forever loop with a
 * short pause between takes, so the icon stays lively the whole time. Used on
 * the outcome-pillar icons so the eye keeps landing on them. Reduced-motion
 * renders flat either way.
 */
const WIGGLE_KEYS = [0, -12, 10, -8, 6, -3, 0];
const WIGGLE_TIMES = [0, 0.14, 0.3, 0.46, 0.62, 0.8, 1];

export function WiggleIn({
  children,
  delay = 0,
  loop = false,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} style={style}>{children}</div>;

  if (loop) {
    return (
      <motion.div
        className={className}
        style={{ transformOrigin: "50% 85%", ...style }}
        animate={{ rotate: WIGGLE_KEYS }}
        transition={{ duration: 1.2, delay, ease: "easeInOut", times: WIGGLE_TIMES, repeat: Infinity, repeatDelay: 1.4 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      style={{ transformOrigin: "50% 85%", ...style }}
      initial={{ rotate: 0 }}
      whileInView={{ rotate: WIGGLE_KEYS }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 1.2, delay, ease: "easeInOut", times: WIGGLE_TIMES }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Section-scale entrance: the whole block slides in from its side (left/right)
 * and fades, once, on scroll. `boxed` wraps it in a subtle panel so the section
 * reads as a card floating on the starfield. Larger offset than ScrollReveal so
 * it reads as "flowing onto the page from the side," not a nudge.
 */
export function SlideIn({
  children,
  from = "left",
  boxed = false,
  distance = 90,
  duration = 0.8,
  className,
  style,
}: {
  children: ReactNode;
  from?: "left" | "right" | "top" | "bottom";
  boxed?: boolean;
  /** How far off-screen it starts, in px. Bigger = harder slide. */
  distance?: number;
  /** Seconds. Larger = slower slide. */
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const boxStyle: React.CSSProperties = boxed
    ? {
        border: "1px solid var(--rule)",
        borderRadius: 24,
        background: "rgba(255,255,255,0.018)",
        boxShadow: "0 24px 70px -34px rgba(0,0,0,0.85)",
      }
    : {};
  const merged = { ...boxStyle, ...style };
  const offset =
    from === "left" ? { x: -distance }
    : from === "right" ? { x: distance }
    : from === "top" ? { y: -distance }
    : { y: distance }; // "bottom": starts below and slides up into place
  const shown = { opacity: 1, x: 0, y: 0 };
  return (
    <motion.div
      className={className}
      style={merged}
      initial={{ opacity: 0, ...offset }}
      {...(reduce ? { animate: shown } : { whileInView: shown })}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduce ? { duration: 0 } : { duration, ease: EXPO }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  // Same hidden state on server and client (see ScrollReveal); reduced motion
  // only zeroes the duration.
  const item: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: reduce ? { duration: 0 } : { duration: 0.6, ease: EXPO } },
  };
  return (
    <motion.div className={className} style={style} variants={item}>
      {children}
    </motion.div>
  );
}
