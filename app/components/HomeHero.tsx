"use client";

import { useState, useEffect } from "react";
import ScanTool from "./ScanTool";
import PlatformLogos from "./PlatformLogos";
import { HeroBackgroundPaths } from "@/components/ui/background-paths";

export default function HomeHero() {
  const [scanState, setScanState] = useState<"idle" | "scanning" | "done">("idle");
  const showHero = scanState === "idle";

  useEffect(() => {
    if (scanState !== "idle") window.scrollTo(0, 0);
  }, [scanState]);

  return (
    <section style={{
      position: "relative",
      maxWidth: 1120,
      margin: "0 auto",
      padding: showHero ? "100px 32px 64px" : "48px 32px 32px",
      transition: "padding 0.4s ease",
    }}>
      {showHero && <HeroBackgroundPaths />}
      <div style={{ position: "relative", zIndex: 1 }}>
      {showHero ? (
        <>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32, display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ display: "inline-block", width: 6, height: 6, background: "var(--pulse)", borderRadius: 999 }} />
            <span>Free website audit · Real results in 30 seconds</span>
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 60px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, maxWidth: 900 }}>
            Your business is always online.<br />
            <span style={{ color: "var(--muted)" }}>SIMPL makes sure it&apos;s always working.</span>
          </h1>
          <p style={{ marginTop: 24, maxWidth: 580, fontSize: 17, lineHeight: 1.55 }}>
            We watch your site, your listings, your reviews, and your ads. When something breaks, our team fixes what they can and flags the rest before it costs you.
          </p>
        </>
      ) : (
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "inline-block", width: 6, height: 6, background: "var(--pulse)", borderRadius: 999 }} />
          <span>Free audit. Real problems. 30 seconds.</span>
        </div>
      )}
      <div style={{ marginTop: showHero ? 36 : 0 }}>
        {showHero && (
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
            <span>Try the scan. Type your domain</span>
            <a href="#" onClick={(e) => { e.preventDefault(); document.querySelector("[data-section='simpl-score']")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 1, fontSize: 11 }}>How it works ↓</a>
          </div>
        )}
        <ScanTool onStateChange={setScanState} />
        {showHero && <PlatformLogos />}
      </div>
      </div>
    </section>
  );
}
