"use client";

import { useEffect, useState } from "react";

/**
 * A coverflow that rotates through arbitrary card nodes (marketing visuals:
 * trending graphs, a Google local pack, a site-health score, blog references),
 * not just images. The centre card is full and readable; the side cards peek in
 * tilted, dimmed, and blurred so they read as "more in the stack" without
 * competing. Auto-advances; pauses while the tab is hidden.
 */
export interface CoverflowSlide {
  key: string;
  node: React.ReactNode;
  /** Short line shown under the stage while this slide is active. */
  caption?: string;
}

export default function CardCoverflow({
  slides,
  interval = 2600,
}: {
  slides: CoverflowSlide[];
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const n = slides.length;

  useEffect(() => {
    if (n <= 1) return;
    const t = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      setActive((p) => (p + 1) % n);
    }, interval);
    return () => clearInterval(t);
  }, [n, interval]);

  const styleFor = (i: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "76%",
      height: "86%",
      transition: "transform .7s cubic-bezier(.4,1.25,.4,1), opacity .7s ease, filter .7s ease",
      willChange: "transform, opacity",
    };
    const isActive = i === active;
    const isLeft = (active - 1 + n) % n === i;
    const isRight = (active + 1) % n === i;
    if (isActive) return { ...base, transform: "translate(-50%,-50%) scale(1) rotateY(0deg)", opacity: 1, zIndex: 3, filter: "none" };
    if (isLeft) return { ...base, transform: "translate(-92%,-48%) scale(0.82) rotateY(26deg)", opacity: 0.4, zIndex: 2, filter: "blur(1.5px)", pointerEvents: "none" };
    if (isRight) return { ...base, transform: "translate(-8%,-48%) scale(0.82) rotateY(-26deg)", opacity: 0.4, zIndex: 2, filter: "blur(1.5px)", pointerEvents: "none" };
    return { ...base, transform: "translate(-50%,-50%) scale(0.6)", opacity: 0, zIndex: 1, pointerEvents: "none" };
  };

  const caption = slides[active]?.caption;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", flex: 1, minHeight: 0, perspective: 1300 }}>
        {slides.map((s, i) => (
          <div key={s.key} style={styleFor(i)}>{s.node}</div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, paddingTop: 12, minHeight: 22 }}>
        {caption ? <span style={{ fontSize: 12.5, color: "var(--muted)", marginRight: 4 }}>{caption}</span> : null}
        {slides.map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              width: i === active ? 16 : 6,
              height: 6,
              borderRadius: 999,
              background: i === active ? "var(--accent)" : "var(--rule-strong)",
              transition: "width 0.4s ease, background 0.4s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
