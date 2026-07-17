"use client";

import { useId } from "react";

/**
 * The SIMPL vitalsign mark, from the brand kit (brand/icon-vitalsign.svg):
 * a thin pulse line with the green identity dot beneath it.
 *
 * `inverted` flips the pulse to ink for use on light backgrounds. The dot stays
 * green in both modes: per the brand kit the green dot IS the identity, so it
 * never recolours.
 */
export function VitalsignIcon({
  size = 26,
  inverted = false,
  className,
  style,
}: {
  size?: number;
  inverted?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  // Gradient ids must be unique per instance. These were hardcoded, so with two
  // marks on a page (expanded + collapsed in the header) both referenced the
  // first instance's defs, and unmounting it blanked the other.
  const uid = useId().replace(/:/g, "");
  const ink = `vs-ink-${uid}`;
  const dot = `vs-dot-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      role="img"
      aria-label="SIMPL"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id={ink} x1="0" y1="18" x2="0" y2="96" gradientUnits="userSpaceOnUse">
          {inverted ? (
            <>
              <stop offset="0" stopColor="#0E0F10" />
              <stop offset="1" stopColor="#33383B" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#DAD7CF" />
            </>
          )}
        </linearGradient>
        <radialGradient id={dot} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#9BFF1A" stopOpacity={inverted ? 0.6 : 0.45} />
          <stop offset="0.62" stopColor="#9BFF1A" stopOpacity={inverted ? 0.18 : 0.12} />
          <stop offset="1" stopColor="#9BFF1A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M22 62H44L55 26L66 94L78 52H98"
        stroke={`url(#${ink})`}
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="66" cy="103" r="12" fill={`url(#${dot})`} />
      {/* On white the pure brand green is thin; a hair of depth keeps the dot
          reading as the identity rather than a stray pixel. */}
      <circle cx="66" cy="103" r="4.5" fill={inverted ? "#7BD100" : "#9BFF1A"} />
    </svg>
  );
}
