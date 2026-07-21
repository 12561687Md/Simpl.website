"use client";

import { Sparkles } from "@/components/ui/sparkles";
import PlatformLogos from "./PlatformLogos";

/**
 * The curved, glowing bottom of the hero. A giant ellipse gives a horizon line,
 * a baby-blue radial glow rises from it, and particle sparkles drift up, masked
 * so they concentrate near the centre. The existing platform marquee sits on the
 * lip of the curve, so "Trusted by experts" + the logos read as one section with
 * the glow rather than a separate strip.
 *
 * PERF: the sparkles run a requestAnimationFrame particle loop (tsparticles) near
 * the top of the page. Fine for preview; for production it should be lazy-loaded
 * / paused off-screen, per the CSS-first performance rule.
 */
export default function HeroCurvedBottom() {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* Curved glowing horizon. The marquee + "Trusted by experts" now sit
          INSIDE the half circle, below the horizon line, over the small stars. */}
      <div
        style={{
          position: "relative",
          height: 300,
          overflow: "hidden",
          WebkitMaskImage: "radial-gradient(85% 110% at 50% 100%, #000 62%, transparent)",
          maskImage: "radial-gradient(85% 110% at 50% 100%, #000 62%, transparent)",
        }}
      >
        {/* Baby-blue glow rising from the bottom. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(70% 90% at 50% 100%, rgba(137,207,240,0.45), transparent 70%)",
          }}
        />
        {/* The curve: an OPAQUE "ground" ellipse whose lit top edge is the
            horizon, capping the big-blue sky above it. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-50%",
            top: "16%",
            width: "200%",
            aspectRatio: "1 / 0.7",
            borderRadius: "100%",
            borderTop: "1px solid rgba(137,207,240,0.45)",
            background: "var(--bg)",
            zIndex: 1,
            boxShadow: "0 -1px 44px rgba(137,207,240,0.28)",
          }}
        />
        {/* Small stars inside the half circle, same params as the page-wide
            SpaceField so they read as one continuous field flowing down. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            WebkitMaskImage: "radial-gradient(90% 100% at 50% 100%, #000 70%, transparent)",
            maskImage: "radial-gradient(90% 100% at 50% 100%, #000 70%, transparent)",
          }}
        >
          <Sparkles density={180} color="#89CFF0" size={1.1} speed={0.4} className="absolute inset-0 h-full w-full" />
        </div>
        {/* Marquee + "Trusted by experts", now INSIDE the half circle, sitting
            in the dark star field below the horizon line. */}
        <div style={{ position: "absolute", top: "32%", left: 0, right: 0, zIndex: 3 }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
            <PlatformLogos />
          </div>
        </div>
      </div>
    </div>
  );
}
