"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Rotates a single word in place: winning -> ranking -> running -> learning.
 *
 * Layout: an inline-grid where every word (the hidden sizers and the visible
 * animated one) occupies the SAME single cell. That makes the element exactly
 * one line tall and as wide as the widest word, so it sits on the heading's own
 * line instead of adding height below it. The earlier version stacked the sizer
 * words in a flex column, which made the box four lines tall and pushed the rest
 * of the headline down.
 *
 * Under reduced motion it holds the first word and never cycles.
 */
export default function TextRotator({
  words,
  intervalMs = 2200,
  color = "var(--accent)",
}: {
  words: string[];
  intervalMs?: number;
  color?: string;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), intervalMs);
    return () => clearInterval(t);
  }, [reduce, words.length, intervalMs]);

  return (
    <span style={{ display: "inline-grid", verticalAlign: "baseline", color, textAlign: "left" }}>
      {/* Hidden sizers: one per word, all in cell 1/1. They overlap, so the grid
          sizes to the widest word and to a single line of height. Bottom padding
          matches the visible wrapper below — without it, descenders (the tail on
          a "g") sit right at the overflow:hidden edge and get clipped. */}
      {words.map((w) => (
        <span key={w} aria-hidden="true" style={{ gridArea: "1 / 1", visibility: "hidden", whiteSpace: "nowrap", paddingBottom: "0.14em" }}>
          {w}
        </span>
      ))}

      {/* Visible, animated word, in the same cell. */}
      <span style={{ gridArea: "1 / 1", position: "relative", overflow: "hidden", paddingBottom: "0.14em" }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[i]}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.55em" }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-0.55em" }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
            aria-live="polite"
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
