import React from "react";

/**
 * Infinite marquee. Pure CSS, no dependencies, no JS.
 *
 * The track is duplicated once and translated by exactly -50%, which is what
 * makes the loop seamless: at -50% the second copy sits precisely where the
 * first started, so the reset is invisible. The duplicate is aria-hidden so
 * screen readers read the list once, not twice.
 *
 * Honors prefers-reduced-motion: the animation stops and the row becomes a
 * plain scrollable strip.
 */
export default function Marquee({
  items,
  speed = 40,
  reverse = false,
}: {
  items: string[];
  /** Seconds for one full pass. Higher is slower. */
  speed?: number;
  reverse?: boolean;
}) {
  const row = (hidden: boolean) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={`${t}-${i}`} className="marquee-item mono">
          <span className="marquee-dot" aria-hidden="true" />
          {t}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="marquee"
      style={{ ["--marquee-speed" as string]: `${speed}s`, ["--marquee-dir" as string]: reverse ? "reverse" : "normal" }}
    >
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
