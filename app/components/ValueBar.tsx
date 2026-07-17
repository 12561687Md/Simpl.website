/**
 * Static value bar. Replaces the scrolling checks marquee: no motion, just a
 * calm band stating what SIMPL actually does for the owner. Wraps on mobile.
 */
const VALUES = [
  "Found on Google",
  "Trusted at a glance",
  "More jobs booked",
  "Watched around the clock",
  "Fixed before it costs you",
];

export default function ValueBar() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.018), transparent)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "18px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px 28px",
        }}
      >
        {VALUES.map((v) => (
          <span
            key={v}
            className="mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              aria-hidden="true"
              style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)", flexShrink: 0, opacity: 0.85 }}
            />
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}
