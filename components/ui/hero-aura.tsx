"use client";

/**
 * Hero background, replacing the old plasma-lines WebGL shader (warped neon
 * grid lines + pulsing circles — read as a sci-fi game HUD, not a premium
 * agency; that was the "Ben 10" complaint). This is deliberately calm: soft,
 * slow-drifting gradient blobs in the brand baby blue at varying depth, over
 * a faint precision dot-grid that's static, not animated.
 *
 * Why this reads as trust in the first two seconds instead of energy/hype:
 * the motion is glacial (24-30s per cycle, barely perceptible frame to
 * frame) and the only sharp, legible mark is the brand accent itself — nothing
 * competes with the hero copy for attention. Pure CSS (transform + opacity),
 * no WebGL: cheaper, more reliable across devices, and follows the project's
 * animation rule (transform/opacity only, no GSAP-grade choreography here).
 */
export function HeroAura({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      style={style}
    >
      {/* Precision dot-grid: a quiet nod to "instrument," not "arcade" — static,
          never animated, so it reads as texture rather than a scene. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: "radial-gradient(circle, rgba(243,242,237,0.9) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(80% 65% at 50% 38%, #000 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(80% 65% at 50% 38%, #000 0%, transparent 75%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "62vw",
          height: "62vw",
          maxWidth: 820,
          maxHeight: 820,
          left: "8%",
          top: "-18%",
          borderRadius: "50%",
          filter: "blur(120px)",
          background: "radial-gradient(circle, rgba(137,207,240,0.16) 0%, transparent 68%)",
          animation: "hero-aura-a 28s ease-in-out infinite alternate",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "54vw",
          height: "54vw",
          maxWidth: 720,
          maxHeight: 720,
          right: "4%",
          top: "6%",
          borderRadius: "50%",
          filter: "blur(130px)",
          background: "radial-gradient(circle, rgba(110,180,215,0.11) 0%, transparent 66%)",
          animation: "hero-aura-b 34s ease-in-out infinite alternate",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "40vw",
          height: "40vw",
          maxWidth: 520,
          maxHeight: 520,
          left: "50%",
          bottom: "-22%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          filter: "blur(110px)",
          background: "radial-gradient(circle, rgba(137,207,240,0.09) 0%, transparent 70%)",
          animation: "hero-aura-c 24s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}

export default HeroAura;
