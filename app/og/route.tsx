import { ImageResponse } from "next/og";

/**
 * Default social preview image (1200x630), rendered at build time.
 * Brand: black ground, off-white type, one baby-blue accent. The only number
 * on it (3,454) is the Miami-Dade recertification count, sourced in
 * app/lib/records.ts (STATS.miami) and printed on the image.
 */
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0B0C0D", color: "#F3F2ED", padding: "64px 72px", fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>
          SIMPL<span style={{ color: "#89CFF0" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 62, lineHeight: 1.08, letterSpacing: -2, maxWidth: 980 }}>We find the buildings that need you, before your competitors know they exist.</div>
          <div style={{ fontSize: 28, color: "#ADACA7", marginTop: 26 }}>The market intelligence partner for commercial building services.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid #33373B", paddingTop: 22, fontSize: 20, color: "#8E8D87" }}>
          <div style={{ display: "flex" }}>
            <span style={{ color: "#89CFF0", marginRight: 14 }}>3,454</span> buildings in unincorporated Miami-Dade past their recertification deadline. County records, Nov 20, 2026.
          </div>
          <div style={{ display: "flex" }}>simpl.pro</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
