"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Rotates a single word in place: winning -> ranking -> running -> learning.
 *
 * The word is absolutely positioned inside a span sized to the *widest* option,
 * so the surrounding line never reflows as the word changes. The reserved width
 * is measured from a hidden copy of every word rather than guessed, so it stays
 * correct if the font or the word list changes.
 *
 * Under reduced motion it holds the first word and never cycles — a word
 * swapping itself every two seconds is exactly the kind of motion that setting
 * exists to stop.
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
  const sizerRef = useRef<HTMLSpanElement>(null);
  const [minWidth, setMinWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (sizerRef.current) setMinWidth(sizerRef.current.getBoundingClientRect().width);
  }, [words]);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), intervalMs);
    return () => clearInterval(t);
  }, [reduce, words.length, intervalMs]);

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        minWidth,
        // Bottom-aligned so descenders (g in winning/ranking/running) share a
        // baseline with the static text around them.
        verticalAlign: "bottom",
        color,
      }}
    >
      {/* Invisible sizer: one copy of every word stacked, establishing the widest
          box. aria-hidden so it is never read or selectable. */}
      <span
        ref={sizerRef}
        aria-hidden="true"
        style={{ visibility: "hidden", display: "inline-flex", flexDirection: "column" }}
      >
        {words.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.5em" }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-0.5em" }}
          transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "absolute", left: 0, bottom: 0, whiteSpace: "nowrap" }}
          // Announce each word as it changes, so a screen reader hears the
          // rotation rather than only the first word.
          aria-live="polite"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
