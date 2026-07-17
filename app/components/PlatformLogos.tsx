"use client";

import Image from "next/image";
import { LampGlow } from "@/components/ui/lamp";

function GoogleMapsMark() {
  return (
    <svg viewBox="0 0 92 132" width="26" height="38" style={{ display: "block" }} role="img" aria-label="Google Maps">
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
  | { name: string; src: string; text?: string }
  | { name: string; node: React.ReactNode; text: string };

const PLATFORMS: Platform[] = [
  { name: "WordPress", src: "/logos/wordpress-full.png" },
  { name: "Google Ads", src: "/logos/googleads-full.png" },
  { name: "HighLevel", src: "/logos/highlevel.png" },
  { name: "Shopify", src: "/logos/shopify.svg", text: "Shopify" },
  { name: "Google Maps", node: <GoogleMapsMark />, text: "Google Maps" },
];

function LogoChip({ p }: { p: Platform }) {
  return (
    <div className="platform-logo">
      {"node" in p ? (
        p.node
      ) : (
        <Image src={p.src} alt={p.name} width={150} height={38} style={{ display: "block", objectFit: "contain", height: 38, width: "auto" }} />
      )}
      {"text" in p && p.text && (
        <span style={{ fontSize: 17, fontWeight: 500, color: "var(--fg)", letterSpacing: "-0.01em" }}>{p.text}</span>
      )}
    </div>
  );
}

export default function PlatformLogos() {
  const group = (hidden: boolean) => (
    <div className="marquee-group" aria-hidden={hidden || undefined} style={{ gap: 14 }}>
      {PLATFORMS.map((p) => (
        <LogoChip key={p.name} p={p} />
      ))}
    </div>
  );

  return (
    <div
      style={{
        position: "relative",
        marginTop: 20,
        padding: "34px 0 26px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid var(--rule)",
        borderRadius: 12,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.12)",
        overflow: "hidden",
      }}
    >
      <LampGlow />

      <div className="mono" style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-dim)", marginBottom: 22 }}>
        We work in the tools you already use
      </div>

      <div
        className="logos-strip"
        style={{
          overflow: "hidden",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)",
          maskImage: "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)",
        }}
      >
        <div className="marquee-track" style={{ ["--marquee-speed" as string]: "34s" }}>
          {group(false)}
          {group(true)}
        </div>
      </div>
    </div>
  );
}
