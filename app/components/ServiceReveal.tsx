"use client";

import { GripVertical } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Interactive before/after for the "What we do" section. Unlike the image-based
 * Reveal1, this clips two RENDERED mockups (dated vs Simpl) because the content
 * is UI (sites, dashboards, search results, charts), not photography. Drag the
 * handle to wipe between them. One mockup pair per service; services without a
 * mockup yet fall back to the text description in CategoryShowcase.
 */

/** Which service hrefs currently have a before/after mockup built. */
export const REVEAL_HREFS = new Set<string>(["/services/website-build"]);

function Compare({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: ReactNode;
  after: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    if (!drag) return;
    const mm = (e: MouseEvent) => move(e.clientX);
    const tm = (e: TouchEvent) => e.touches[0] && move(e.touches[0].clientX);
    const end = () => setDrag(false);
    document.addEventListener("mousemove", mm);
    document.addEventListener("touchmove", tm);
    document.addEventListener("mouseup", end);
    document.addEventListener("touchend", end);
    return () => {
      document.removeEventListener("mousemove", mm);
      document.removeEventListener("touchmove", tm);
      document.removeEventListener("mouseup", end);
      document.removeEventListener("touchend", end);
    };
  }, [drag, move]);

  const label: React.CSSProperties = {
    position: "absolute", top: 12, zIndex: 20, padding: "4px 10px", borderRadius: 999,
    background: "rgba(0,0,0,0.62)", color: "#fff", fontSize: 11, fontWeight: 600, backdropFilter: "blur(4px)",
  };

  return (
    <div
      ref={ref}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onMouseDown={(e) => { e.preventDefault(); setDrag(true); move(e.clientX); }}
      onTouchStart={(e) => { setDrag(true); e.touches[0] && move(e.touches[0].clientX); }}
      style={{
        position: "relative", width: "100%", aspectRatio: "16 / 10", borderRadius: 12,
        overflow: "hidden", border: "1px solid var(--rule)", cursor: "ew-resize", userSelect: "none",
        boxShadow: "0 30px 80px -40px rgba(0,0,0,0.8)",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>{after}</div>
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>{before}</div>

      {/* Divider + handle */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: 3, background: "#fff", transform: "translateX(-50%)", zIndex: 10, boxShadow: "0 0 12px rgba(0,0,0,0.5)" }}>
        <div
          style={{
            position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) scale(${drag ? 1.1 : 1})`,
            width: 38, height: 38, borderRadius: 999, background: "var(--accent)", color: "var(--accent-ink)",
            display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff",
            boxShadow: "0 6px 18px -4px rgba(0,0,0,0.6)", transition: "transform 140ms ease",
          }}
        >
          <GripVertical className="size-5" />
        </div>
      </div>

      <div style={{ ...label, left: 12 }}>{beforeLabel}</div>
      <div style={{ ...label, right: 12 }}>{afterLabel}</div>
    </div>
  );
}

/* ---------- Custom Website mockups ---------- */

function OldSiteMock() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#fbfbf4", fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden" }}>
      {/* Dated header + clashing nav */}
      <div style={{ background: "linear-gradient(#3a6b2a,#284d1c)", color: "#fff", padding: "7px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700 }}>Green Lawns Landscaping</span>
        <span style={{ fontSize: 8, opacity: 0.9 }}>Call: (919) 555-0100</span>
      </div>
      <div style={{ background: "#cbb63a", color: "#3a2f00", fontSize: 7.5, padding: "3px 10px", display: "flex", gap: 9, fontWeight: 700 }}>
        <span>HOME</span><span>ABOUT US</span><span>SERVICES</span><span>GALLERY</span><span>CONTACT</span>
      </div>
      <div style={{ padding: "11px 12px" }}>
        <div style={{ color: "#a11", fontSize: 14, fontWeight: 700, marginBottom: 7, fontFamily: "Georgia, serif" }}>Welcome to our website!</div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: "52%", background: "#dcdcd0", border: "1px solid #b9b9a8", height: 66, display: "flex", alignItems: "center", justifyContent: "center", color: "#8a8a78", fontSize: 8.5, textAlign: "center", lineHeight: 1.3 }}>
            image<br />not found
          </div>
          <div style={{ flex: 1, fontSize: 8.5, color: "#444", lineHeight: 1.45 }}>
            Family owned lawn care serving the area since 1998. Best prices in town!!
            <div style={{ marginTop: 7, background: "linear-gradient(#f0d000,#d4a000)", border: "1px solid #a80", color: "#3a2f00", padding: "3px 8px", fontSize: 9, fontWeight: 700, display: "inline-block" }}>CLICK HERE!!!</div>
          </div>
        </div>
        <div style={{ marginTop: 9, fontSize: 7.5, color: "#999", fontStyle: "italic" }}>© 2011 &middot; Best viewed in Internet Explorer 8</div>
      </div>
    </div>
  );
}

function SimplSiteMock() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        // Manicured-lawn hero: mowing stripes under a dark scrim so text pops.
        background:
          "linear-gradient(180deg, rgba(6,18,9,0.35), rgba(6,18,9,0.72)), repeating-linear-gradient(102deg, #2f6d3f 0 15px, #357a46 15px 30px)",
      }}
    >
      {/* Nav */}
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 15px" }}>
        <span style={{ color: "#fff", fontSize: 12.5, fontWeight: 800, letterSpacing: "0.02em" }}>WILDGROVE</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 8.5, fontWeight: 500 }}>Services</span>
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 8.5, fontWeight: 500 }}>Reviews</span>
          <span style={{ background: "#eafff0", color: "#14421f", fontSize: 9, fontWeight: 800, padding: "5px 11px", borderRadius: 7 }}>Free quote</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ position: "relative", padding: "16px 16px 0" }}>
        <div style={{ color: "#c6ecd0", fontSize: 8.5, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>
          Landscaping in Cary &amp; Apex, NC
        </div>
        <div style={{ color: "#fff", fontSize: 21, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em", textShadow: "0 2px 12px rgba(0,0,0,0.45)", maxWidth: 250 }}>
          The best lawn on the block.
        </div>
        <div style={{ color: "rgba(255,255,255,0.92)", fontSize: 10, marginTop: 9, lineHeight: 1.5, maxWidth: 235, textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
          Full-service lawn care, hardscaping, and cleanups. On-time crews, fair prices.
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 13 }}>
          <span style={{ background: "#2fb457", color: "#06210f", fontSize: 10, fontWeight: 800, padding: "7px 14px", borderRadius: 8, boxShadow: "0 10px 22px -10px rgba(0,0,0,0.7)" }}>Get my free estimate</span>
          <span style={{ border: "1px solid rgba(255,255,255,0.55)", color: "#fff", fontSize: 10, fontWeight: 600, padding: "7px 13px", borderRadius: 8, backdropFilter: "blur(2px)" }}>See our work</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 13 }}>
          <span style={{ color: "#ffd24a", fontSize: 12, letterSpacing: 1 }}>★★★★★</span>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 9, fontWeight: 500 }}>84 five-star Google reviews</span>
        </div>
      </div>
    </div>
  );
}

const MOCKS: Record<string, { before: ReactNode; after: ReactNode; beforeLabel: string; afterLabel: string }> = {
  "/services/website-build": {
    before: <OldSiteMock />,
    after: <SimplSiteMock />,
    beforeLabel: "Their old site",
    afterLabel: "Your Simpl site",
  },
};

export default function ServiceReveal({ href }: { href: string }) {
  const m = MOCKS[href];
  if (!m) return null;
  return <Compare before={m.before} after={m.after} beforeLabel={m.beforeLabel} afterLabel={m.afterLabel} />;
}
