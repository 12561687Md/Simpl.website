"use client";

import React, { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "pink" | "blue" | "purple" | "red" | "orange";
}

// Hue map. "pink" is the default card glow: a bright magenta/rose (~330°)
// picked specifically to complement the baby-blue brand accent (~200°) —
// close to a split-complementary pair, and far enough from green/amber/red
// that it never reads as success/warning/error. Small spread keeps it in
// family as the cursor moves, same reasoning the old yellow-green ("green",
// retired with the neon-green brand) used.
const glowColorMap: Record<string, { base: number; spread: number }> = {
  pink: { base: 330, spread: 40 },
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

/**
 * Cursor-tracking spotlight card. The border glows toward the pointer. The
 * ::before/::after spotlight CSS is defined once in globals.css (keyed off
 * [data-glow]); this component just feeds --x/--y and the theme vars.
 */
export const GlowCard: React.FC<GlowCardProps> = ({ children, className, glowColor = "pink" }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const { clientX: x, clientY: y } = e;
      el.style.setProperty("--x", x.toFixed(2));
      el.style.setProperty("--xp", (x / window.innerWidth).toFixed(2));
      el.style.setProperty("--y", y.toFixed(2));
      el.style.setProperty("--yp", (y / window.innerHeight).toFixed(2));
    };
    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor] ?? glowColorMap.pink;

  const styleVars = {
    "--base": base,
    "--spread": spread,
    "--radius": "14",
    "--border": "2",
    "--backdrop": "hsl(213 14% 10% / 0.55)",
    "--backup-border": "hsl(210 8% 22% / 1)",
    "--size": "220",
    "--outer": "1",
    "--saturation": "90",
    "--lightness": "58",
    "--bg-spot-opacity": "0.08",
    "--border-spot-opacity": "0.9",
    "--border-light-opacity": "0.8",
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
    )`,
    backgroundColor: "var(--backdrop, transparent)",
    backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    backgroundAttachment: "fixed",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative",
    // NOT touchAction: "none" — that was blocking scroll entirely on mobile
    // the moment a finger landed on one of these cards (the pointermove
    // listener below is document-level and needs no touch-gesture capture of
    // its own, so there was never a reason to disable default touch
    // behavior here).
  } as React.CSSProperties;

  return (
    <div
      ref={cardRef}
      data-glow
      style={styleVars}
      className={cn("relative rounded-[14px] shadow-[0_1rem_2rem_-1rem_black] backdrop-blur-[5px]", className)}
    >
      <div data-glow />
      {children}
    </div>
  );
};

export default GlowCard;
