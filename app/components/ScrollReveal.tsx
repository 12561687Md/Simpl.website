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
 * animate in one monotonous way. Reduced-motion collapses to a plain render.
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
  if (reduce) return <div>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, ...offset[direction], ...(scale ? { scale: 0.965 } : {}) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EXPO }}
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
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
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
  const item: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EXPO } },
      };
  return (
    <motion.div className={className} style={style} variants={item}>
      {children}
    </motion.div>
  );
}
