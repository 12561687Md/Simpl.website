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

function GoogleAnalyticsMark() {
  return (
    <svg viewBox="0 0 48 48" width="32" height="32" style={{ display: "block" }} role="img" aria-label="Google Analytics">
      <rect x="31" y="5" width="12" height="38" rx="6" fill="#F9AB00" />
      <rect x="18" y="17" width="12" height="26" rx="6" fill="#E37400" />
      <circle cx="11" cy="37" r="6" fill="#E37400" />
    </svg>
  );
}

function SemrushMark() {
  return (
    <svg viewBox="0 0 48 48" width="32" height="32" style={{ display: "block" }} role="img" aria-label="Semrush">
      <circle cx="31" cy="24" r="13" fill="#FF642D" />
      <path d="M25 24a6 6 0 0 1 6-6" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="31" cy="24" r="2.4" fill="#fff" />
      <path d="M17 17H4M15 24H7M17 31H4" stroke="#FF642D" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

function GoogleTagManagerMark() {
  return (
    <svg viewBox="0 0 48 48" width="32" height="32" style={{ display: "block" }} role="img" aria-label="Google Tag Manager">
      <rect x="11" y="11" width="26" height="26" rx="5" transform="rotate(45 24 24)" fill="#8AB4F8" />
      <rect x="15" y="15" width="18" height="18" rx="4" transform="rotate(45 24 24)" fill="#4285F4" />
      <rect x="19.5" y="19.5" width="9" height="9" rx="2" transform="rotate(45 24 24)" fill="#fff" />
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
  { name: "Google Analytics", node: <GoogleAnalyticsMark />, text: "Google Analytics" },
  { name: "Semrush", node: <SemrushMark />, text: "Semrush" },
  { name: "Google Tag Manager", node: <GoogleTagManagerMark />, text: "Google Tag Manager" },
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
      {/* These are the platforms we work across (integrations/tooling), so the
          line says exactly that. The old "Trusted by experts" implied
          endorsements we don't have yet; swap in real client proof here when
          it exists. */}
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
        Every platform your business <span style={{ color: "var(--fg)" }}>wins on</span>
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
