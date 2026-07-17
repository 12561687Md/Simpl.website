"use client";

import Image from "next/image";

function GoogleMapsMark() {
  // Inline recreation of the Google Maps pin: green tail/right, blue top,
  // red left, yellow lower-left, white center. Colour wedges are drawn as
  // fans from the centre and clipped to the pin silhouette.
  return (
    <svg viewBox="0 0 92 132" width="28" height="40" style={{ display: "block" }} role="img" aria-label="Google Maps">
      <defs>
        <clipPath id="gm-pin">
          <path d="M46 2C21 2 2 21 2 46c0 20 24 50 40 75 2 3 6 3 8 0 16-25 40-55 40-75 0-25-19-44-44-44z" />
        </clipPath>
      </defs>
      <g clipPath="url(#gm-pin)">
        <rect x="-260" y="-260" width="600" height="600" fill="#34A853" />
        <polygon points="46,46 -213.8,-104 46,-254" fill="#1A73E8" />
        <polygon points="46,46 46,-254 291.8,-126.1" fill="#4285F4" />
        <polygon points="46,46 -56.6,327.9 -235.9,148.6" fill="#FBBC04" />
        <polygon points="46,46 -235.9,148.6 -213.8,-104" fill="#EA4335" />
      </g>
      <circle cx="46" cy="46" r="19" fill="#fff" />
    </svg>
  );
}

type Platform =
  | { name: string; src: string; width: number; height: number; text?: string }
  | { name: string; node: React.ReactNode; text: string };

const PLATFORMS: Platform[] = [
  { name: "WordPress", src: "/logos/wordpress-full.png", width: 160, height: 40 },
  { name: "Google Ads", src: "/logos/googleads-full.png", width: 150, height: 40 },
  { name: "HighLevel", src: "/logos/highlevel.png", width: 150, height: 40 },
  { name: "Shopify", src: "/logos/shopify.svg", width: 28, height: 32, text: "Shopify" },
  { name: "Google Maps", node: <GoogleMapsMark />, text: "Google Maps" },
];

export default function PlatformLogos() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
      gap: 20,
      flexWrap: "wrap",
      padding: "32px 24px",
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
            // Some colour at rest (partly desaturated), full colour + pop on hover.
            filter: "grayscale(45%) brightness(0.92)",
            opacity: 0.75,
            transition:
              "filter 0.3s ease, opacity 0.3s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {"node" in p ? (
            p.node
          ) : (
            <Image
              src={p.src}
              alt={p.name}
              width={p.width}
              height={p.height}
              style={{ display: "block", objectFit: "contain", height: 40, width: "auto" }}
            />
          )}
          {"text" in p && p.text && (
            <span style={{ fontSize: 18, fontWeight: 500, color: "var(--fg)", letterSpacing: "-0.01em" }}>{p.text}</span>
          )}
        </div>
      ))}
    </div>
  );
}
