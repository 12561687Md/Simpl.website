"use client";

import Image from "next/image";

function GoogleMapsMark() {
  return (
    <svg viewBox="0 0 92 132" width="32" height="46" style={{ display: "block" }} role="img" aria-label="Google Maps">
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
        <Image src={p.src} alt={p.name} width={190} height={46} style={{ display: "block", objectFit: "contain", height: 46, width: "auto" }} />
      )}
      {"text" in p && p.text && (
        <span style={{ fontSize: 20, fontWeight: 500, color: "var(--fg)", letterSpacing: "-0.01em" }}>{p.text}</span>
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
    <>
      {/* NOTE: "Trusted by experts" over platform logos is not literally true
          yet (these are integrations, not client/expert endorsements, and there
          are 0 signed clients). Kept per explicit request for local preview.
          Change or remove before this homepage is committed + deployed. */}
      <p
        style={{
          textAlign: "center",
          margin: "0 0 18px",
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "var(--muted)",
        }}
      >
        Trusted by <span style={{ color: "var(--fg)" }}>experts</span>
      </p>
      <div
      style={{
        position: "relative",
        marginTop: 10,
      }}
    >
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
    </>
  );
}
