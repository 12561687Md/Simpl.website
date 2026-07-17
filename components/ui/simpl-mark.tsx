/**
 * The SIMPL vitalsign mark, from the brand kit (brand/icon-vitalsign.svg):
 * a thin off-white pulse line with the green identity dot beneath it.
 * Inlined so it inherits size/color and needs no asset pipeline.
 */
export function VitalsignIcon({
  size = 26,
  className,
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
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
        <linearGradient id="vs-ink" x1="0" y1="18" x2="0" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DAD7CF" />
        </linearGradient>
        <radialGradient id="vs-dot" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#9BFF1A" stopOpacity="0.45" />
          <stop offset="0.62" stopColor="#9BFF1A" stopOpacity="0.12" />
          <stop offset="1" stopColor="#9BFF1A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M22 62H44L55 26L66 94L78 52H98" stroke="url(#vs-ink)" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="66" cy="103" r="12" fill="url(#vs-dot)" />
      <circle cx="66" cy="103" r="4.5" fill="#9BFF1A" />
    </svg>
  );
}
