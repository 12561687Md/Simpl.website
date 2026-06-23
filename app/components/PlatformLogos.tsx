"use client";

const PLATFORMS = [
  { name: "WordPress", text: "WordPress", weight: 400, size: 18, tracking: "0.01em" },
  { name: "Shopify", text: "Shopify", weight: 500, size: 20, tracking: "0.02em" },
  { name: "Squarespace", text: "squarespace", weight: 300, size: 16, tracking: "0.12em" },
  { name: "Wix", text: "Wix", weight: 700, size: 24, tracking: "-0.02em" },
  { name: "Webflow", text: "Webflow", weight: 400, size: 18, tracking: "0.01em" },
  { name: "Custom", text: "Custom", weight: 300, size: 16, tracking: "0.14em" },
];

export default function PlatformLogos() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      flexWrap: "wrap",
      padding: "24px 0 8px",
    }}>
      {PLATFORMS.map((p) => (
        <span
          key={p.name}
          className="platform-logo"
          style={{
            fontSize: p.size,
            fontWeight: p.weight,
            letterSpacing: p.tracking,
            color: "var(--fg)",
            opacity: 0.25,
            transition: "opacity 0.3s ease, transform 0.3s ease",
            cursor: "default",
            userSelect: "none",
            textTransform: p.name === "Squarespace" || p.name === "Custom" ? "uppercase" : "none",
          }}
        >
          {p.text}
        </span>
      ))}
    </div>
  );
}
