"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Subtle "lamp" light, adapted from the full-screen lamp effect down to a small
 * accent glow for the top-center of a container. A thin accent bar with a soft
 * pool of light spilling downward. Animates its width in on scroll.
 */
export function LampGlow({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const grow = reduce
    ? {}
    : {
        initial: { opacity: 0.4, width: "10rem" },
        whileInView: { opacity: 1, width: "34rem" },
        viewport: { once: true },
        transition: { duration: 0.9, ease: "easeInOut" as const },
      };

  return (
    <div
      className={cn("pointer-events-none absolute left-1/2 top-0 z-10 flex -translate-x-1/2 flex-col items-center", className)}
      aria-hidden="true"
    >
      {/* wide light pool spilling down into the box */}
      <div
        className="absolute top-0 h-28 w-[52rem] max-w-[92vw] blur-3xl"
        style={{ background: "radial-gradient(50% 100% at 50% 0%, var(--accent), transparent 74%)", opacity: 0.13 }}
      />
      <div
        className="absolute top-0 h-16 w-[30rem] max-w-[80vw] blur-2xl"
        style={{ background: "radial-gradient(50% 100% at 50% 0%, var(--accent), transparent 72%)", opacity: 0.15 }}
      />
      {/* the lamp bar */}
      <motion.div
        {...grow}
        className="relative h-px w-[34rem] max-w-[86vw]"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)", boxShadow: "0 0 12px 0 var(--accent-line)" }}
      />
    </div>
  );
}
