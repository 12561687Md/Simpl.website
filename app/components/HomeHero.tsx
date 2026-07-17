"use client";

import { useState, useEffect } from "react";
import ScanTool from "./ScanTool";
import PlatformLogos from "./PlatformLogos";
import { ShaderBackground } from "@/components/ui/shader-background";

export default function HomeHero() {
  const [scanState, setScanState] = useState<"idle" | "scanning" | "done">("idle");
  const showHero = scanState === "idle";

  useEffect(() => {
    if (scanState !== "idle") window.scrollTo(0, 0);
  }, [scanState]);

  return (
    <div style={{ position: "relative" }}>
      {showHero && (
        <>
          <ShaderBackground fade={false} />
          {/* Legibility scrim, centre-weighted to sit behind the centred copy. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              background:
                "radial-gradient(95% 85% at 50% 42%, rgba(11,13,15,0.66) 0%, rgba(11,13,15,0.38) 55%, rgba(11,13,15,0.14) 100%)",
            }}
          />
        </>
      )}
      <section style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1120,
        margin: "0 auto",
        padding: showHero ? "104px 32px 64px" : "48px 32px 32px",
        transition: "padding 0.4s ease",
        textAlign: showHero ? "center" : "left",
      }}>
      {showHero ? (
        <>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 30, display: "inline-flex", alignItems: "center", gap: 14 }}>
            <span style={{ display: "inline-block", width: 6, height: 6, background: "var(--pulse)", borderRadius: 999 }} />
            <span>Free website audit · Real results in 30 seconds</span>
          </div>
          <h1 style={{ margin: "0 auto", fontSize: "clamp(36px, 5.6vw, 68px)", lineHeight: 1.05, letterSpacing: "-0.035em", fontWeight: 600, maxWidth: 940 }}>
            Your business is always online.<br />
            SIMPL makes sure it&apos;s always <span style={{ color: "var(--accent)" }}>winning.</span>
          </h1>
          <p style={{ margin: "24px auto 0", maxWidth: 660, fontSize: 17, lineHeight: 1.55, color: "var(--muted)" }}>
            The platform businesses use to repeatedly win online. We grow your website and reputation, we dominate Google&apos;s rankings and paid ads, and we connect with everything else the internet is saying about your business.
          </p>
        </>
      ) : (
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "inline-block", width: 6, height: 6, background: "var(--pulse)", borderRadius: 999 }} />
          <span>Free audit. Real problems. 30 seconds.</span>
        </div>
      )}
      <div style={{ marginTop: showHero ? 40 : 0 }}>
        {showHero && (
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 12 }}>
            <span>See where you stand. Type your domain</span>
            <a href="#" onClick={(e) => { e.preventDefault(); document.querySelector("[data-section='simpl-score']")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 1, fontSize: 11 }}>How it works ↓</a>
          </div>
        )}
        <div style={{ maxWidth: showHero ? 660 : undefined, margin: showHero ? "0 auto" : undefined, textAlign: "left" }}>
          <ScanTool onStateChange={setScanState} />
        </div>
        {showHero && <PlatformLogos />}
      </div>
      </section>
    </div>
  );
}
