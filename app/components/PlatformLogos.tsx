"use client";

import Image from "next/image";

const PLATFORMS = [
  { name: "WordPress", src: "/logos/wordpress-full.png", width: 160, height: 40 },
  { name: "Google Ads", src: "/logos/googleads-full.png", width: 150, height: 40 },
  { name: "HighLevel", src: "/logos/highlevel.png", width: 150, height: 40 },
  { name: "Shopify", src: "/logos/shopify.svg", width: 28, height: 32, text: "Shopify" },
  { name: "Squarespace", src: "/logos/squarespace.svg", width: 26, height: 26, text: "Squarespace" },
];

export default function PlatformLogos() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 44,
      flexWrap: "wrap",
      padding: "28px 36px",
      marginTop: 20,
      background: "rgba(255,255,255,0.02)",
      border: "1px solid var(--rule)",
      borderRadius: 10,
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.12)",
    }}>
      {PLATFORMS.map((p) => (
        <div
          key={p.name}
          className="platform-logo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "default",
            userSelect: "none",
            filter: "grayscale(100%) brightness(0.6)",
            opacity: 0.5,
            transition: "filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <Image
            src={p.src}
            alt={p.name}
            width={p.width}
            height={p.height}
            style={{ display: "block", objectFit: "contain", height: 32, width: "auto" }}
          />
          {"text" in p && p.text && (
            <span style={{ fontSize: 16, fontWeight: 500, color: "var(--fg)", letterSpacing: "-0.01em" }}>{p.text}</span>
          )}
        </div>
      ))}
    </div>
  );
}
