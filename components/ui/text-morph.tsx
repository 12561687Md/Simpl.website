"use client";

import { useEffect, useMemo, useState } from "react";
// Imported from framer-motion (already the repo's animation lib, v12) rather
// than the pasted "motion/react" — same API, avoids adding a duplicate package.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type TextMorphProps = {
  words?: string[];
  interval?: number;
  className?: string;
  charClassName?: string;
  /** Colour of the morphing word. Defaults to the brand accent. */
  color?: string;
};

const defaultWords = ["engineer", "developer", "designer"];

/**
 * Cycles a single word in place, animating in character-by-character with a
 * blur/rise stagger.
 *
 * Inline-safe: like TextRotator, it renders one hidden sizer per word in a
 * shared inline-grid cell, so the element is exactly one line tall and as wide
 * as the widest word. Without that, swapping words of different widths would
 * shift the surrounding heading text on every cycle. Holds the first word and
 * skips the animation under reduced-motion.
 */
export function TextMorph({
  words = defaultWords,
  interval = 2500,
  className,
  charClassName,
  color = "var(--accent)",
}: TextMorphProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [reduce, words, interval]);

  const chars = useMemo(() => Array.from(words[index] ?? ""), [index, words]);

  if (!words.length) return null;

  return (
    <span style={{ display: "inline-grid", verticalAlign: "baseline", color, textAlign: "left" }}>
      {/* Hidden sizers: one per word, all stacked in cell 1/1, so the grid sizes
          to the widest word and to a single line. paddingBottom clears
          descenders from the overflow edge. */}
      {words.map((w) => (
        <span
          key={w}
          aria-hidden="true"
          style={{ gridArea: "1 / 1", visibility: "hidden", whiteSpace: "nowrap", paddingBottom: "0.14em" }}
        >
          {w}
        </span>
      ))}

      {/* Visible, animated word, in the same cell. */}
      <span style={{ gridArea: "1 / 1", position: "relative", overflow: "hidden", paddingBottom: "0.14em" }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            className={className}
            style={{ display: "flex", gap: "0.5px", whiteSpace: "nowrap" }}
            aria-live="polite"
          >
            {chars.map((char, i) => (
              <motion.span
                key={i}
                className={charClassName}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 5, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -5, filter: "blur(5px)" }}
                transition={{ delay: reduce ? 0 : i * 0.03, duration: 0.3 }}
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

export default TextMorph;
