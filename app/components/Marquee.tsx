"use client";

import { useState } from "react";

/**
 * Infinite marquee. Pure CSS animation, no animation libraries.
 *
 * The track is duplicated once and translated by exactly -50%, which is what
 * makes the loop seamless: at -50% the second copy sits precisely where the
 * first started, so the reset is invisible. The duplicate is aria-hidden so
 * screen readers read the list once, not twice.
 *
 * Accessibility (WCAG 2.2.2 Pause, Stop, Hide is Level A): anything that moves
 * automatically for more than 5 seconds needs a way to stop it. Hover-pause is
 * not enough because it excludes keyboard users, so there's a real focusable
 * toggle. The marquee also pauses on hover and on focus-within, and
 * prefers-reduced-motion stops it before it ever starts.
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
  const [paused, setPaused] = useState(false);

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
      className={`marquee${paused ? " is-paused" : ""}`}
      style={{ ["--marquee-speed" as string]: `${speed}s`, ["--marquee-dir" as string]: reverse ? "reverse" : "normal" }}
    >
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>

      <button
        type="button"
        className="marquee-toggle mono"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Resume the scrolling list of checks" : "Pause the scrolling list of checks"}
      >
        {paused ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
        )}
        <span className="marquee-toggle-text">{paused ? "Play" : "Pause"}</span>
      </button>
    </div>
  );
}
