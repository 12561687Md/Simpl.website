"use client";

import { useState } from "react";
import ScanReport from "./ScanReport";
import { DEMO_PLACE, DEMO_RESULT, DEMO_BOARD } from "../lib/demo-audit";

/**
 * Homepage "what the real audit looks like" demo. Renders the ACTUAL ScanReport
 * component (not a mockup) with clearly-fictional sample data, inside a browser
 * frame with a fixed-height scroll viewport, so a prospect can scroll the real
 * deliverable. Full report (teaser=false) so nothing is gated behind a blur.
 */
export default function AuditDemo() {
  const [scrolled, setScrolled] = useState(false);

  return (
    <div
      style={{
        maxWidth: 960,
        margin: "0 auto",
        border: "1px solid var(--rule)",
        borderRadius: 12,
        overflow: "hidden",
        background: "var(--bg)",
        boxShadow: "0 40px 120px -50px rgba(0,0,0,0.85), 0 0 60px rgba(137,207,240,0.05)",
      }}
    >
      {/* Browser chrome */}
      <div style={{ background: "var(--bg-soft)", borderBottom: "1px solid var(--rule)", padding: "11px 16px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 9, height: 9, borderRadius: 99, background: "#E05252", opacity: 0.6 }} />
        <span style={{ width: 9, height: 9, borderRadius: 99, background: "#E0A852", opacity: 0.6 }} />
        <span style={{ width: 9, height: 9, borderRadius: 99, background: "var(--ok)", opacity: 0.6 }} />
        <span className="mono" style={{ marginLeft: 8, fontSize: 10, letterSpacing: "0.04em", color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          simpl.pro/audit
        </span>
        <span
          className="mono"
          style={{ marginLeft: "auto", flexShrink: 0, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", border: "1px solid var(--accent-line, rgba(137,207,240,0.3))", borderRadius: 999, padding: "3px 9px" }}
        >
          Sample audit
        </span>
      </div>

      {/* Scroll viewport: real report inside a fixed window. */}
      <div style={{ position: "relative" }}>
        <div
          className="audit-demo-scroll"
          onScroll={(e) => setScrolled((e.target as HTMLDivElement).scrollTop > 40)}
          style={{ overflowY: "auto", overflowX: "hidden", WebkitOverflowScrolling: "touch" }}
        >
          {/* Horizontal padding so the report breathes, and a slight zoom-down
              so it isn't squished in the narrow desktop column (zoom keeps the
              scroll intact, and the extra effective width stops the masthead
              wrapping, which was isolating the logo at the top). On mobile the
              zoom drops to 1 and padding tightens (see .audit-demo-report). */}
          <div className="audit-demo-report">
            <ScanReport place={DEMO_PLACE} result={DEMO_RESULT} board={DEMO_BOARD} teaser={false} />
          </div>
        </div>

        {/* Bottom fade + scroll hint, pinned to the visible window (they live
            outside the scrolling div so they don't scroll away). */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 72,
            pointerEvents: "none",
            background: "linear-gradient(180deg, transparent, var(--bg))",
            opacity: scrolled ? 0 : 1,
            transition: "opacity 300ms ease",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            bottom: 16,
            transform: "translateX(-50%)",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "6px 13px",
            borderRadius: 999,
            background: "var(--bg-soft)",
            border: "1px solid var(--rule)",
            fontSize: 11.5,
            color: "var(--muted)",
            opacity: scrolled ? 0 : 1,
            transition: "opacity 300ms ease",
          }}
          className="mono"
        >
          Scroll the real report <span aria-hidden="true">↓</span>
        </div>
      </div>
    </div>
  );
}
