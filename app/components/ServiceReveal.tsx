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
    <div style={{ position: "absolute", inset: 0, background: "#e9e6df", fontFamily: "Times New Roman, serif", overflow: "hidden" }}>
      <div style={{ background: "#4a5a34", color: "#dfe3d0", padding: "6px 10px", fontSize: 11, display: "flex", justifyContent: "space-between" }}>
        <span>Green Lawns Landscaping</span>
        <span style={{ fontSize: 9 }}>Home | About | Services | Contact</span>
      </div>
      <div style={{ padding: "14px 12px" }}>
        <div style={{ color: "#7a1f1f", fontSize: 17, fontWeight: 700, textDecoration: "underline", marginBottom: 6 }}>Welcome To Our Website!!!</div>
        <div style={{ background: "#c9cabf", height: 64, border: "1px solid #9a9b8f", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b6c60", fontSize: 10, marginBottom: 8 }}>[ image not found ]</div>
        <div style={{ fontSize: 9.5, color: "#333", lineHeight: 1.4 }}>We are a family owned lawn care company serving the local area since 1998. Please call us for a free quote today. Best prices in town!!!</div>
        <div style={{ marginTop: 8, display: "inline-block", background: "#d4d0c4", border: "1px solid #888", padding: "3px 8px", fontSize: 10, color: "#333" }}>Click Here</div>
        <div style={{ marginTop: 10, fontSize: 8, color: "#a33", fontStyle: "italic" }}>Site best viewed in Internet Explorer</div>
      </div>
    </div>
  );
}

function SimplSiteMock() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0B0C0D", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 13px", borderBottom: "1px solid #1f2224" }}>
        <span style={{ color: "#F3F2ED", fontSize: 12, fontWeight: 700, letterSpacing: "-0.02em" }}>Wildgrove</span>
        <span style={{ color: "#89CFF0", fontSize: 9, fontWeight: 600, background: "rgba(137,207,240,0.14)", padding: "3px 8px", borderRadius: 999 }}>Book free estimate</span>
      </div>
      <div style={{ padding: "16px 14px" }}>
        <div style={{ color: "#F3F2ED", fontSize: 18, fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          The best lawn on the block,<br /><span style={{ color: "#89CFF0" }}>without lifting a finger.</span>
        </div>
        <div style={{ color: "#ADACA7", fontSize: 10, marginTop: 8, lineHeight: 1.5, maxWidth: 230 }}>Full-service landscaping in Cary and Apex. Fast quotes, on-time crews, 84 five-star reviews.</div>
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <span style={{ background: "#89CFF0", color: "#081420", fontSize: 10, fontWeight: 700, padding: "6px 12px", borderRadius: 999 }}>Get my estimate</span>
          <span style={{ border: "1px solid #3A3E41", color: "#F3F2ED", fontSize: 10, padding: "6px 12px", borderRadius: 999 }}>Our work</span>
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
          {["#2f6d3f", "#6ba84f", "#3a5a40"].map((c) => (
            <div key={c} style={{ flex: 1, height: 30, borderRadius: 6, background: `linear-gradient(135deg, ${c}, #8fbc8f)` }} />
          ))}
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
