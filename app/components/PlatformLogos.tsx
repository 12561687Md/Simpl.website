"use client";

const PLATFORMS = [
  { name: "WordPress", color: "#21759B", weight: 400, size: 18, icon: "W" },
  { name: "Shopify", color: "#95BF47", weight: 600, size: 19, icon: "S" },
  { name: "Squarespace", color: "#EDEBE4", weight: 500, size: 15, icon: "◼" },
  { name: "Google Ads", color: "#4285F4", weight: 500, size: 17, icon: "▲" },
  { name: "HighLevel", color: "#49C1A2", weight: 600, size: 17, icon: "↑↑" },
];

export default function PlatformLogos() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 36,
      flexWrap: "wrap",
      padding: "28px 36px",
      marginTop: 20,
      background: "rgba(255,255,255,0.02)",
      border: "1px solid var(--rule)",
      borderRadius: 10,
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.15)",
    }}>
      {PLATFORMS.map((p) => (
        <div
          key={p.name}
          className="platform-logo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "default",
            userSelect: "none",
            filter: "grayscale(100%)",
            opacity: 0.4,
            transition: "filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <span style={{
            fontSize: p.size - 2,
            fontWeight: 700,
            color: p.color,
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1,
          }}>
            {p.icon}
          </span>
          <span style={{
            fontSize: p.size,
            fontWeight: p.weight,
            color: p.color,
            letterSpacing: p.name === "Squarespace" ? "0.06em" : "-0.01em",
            textTransform: p.name === "Squarespace" ? "uppercase" as const : "none" as const,
          }}>
            {p.name}
          </span>
        </div>
      ))}
    </div>
  );
}
