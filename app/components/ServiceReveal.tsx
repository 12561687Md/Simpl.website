"use client";

import { GripVertical } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Double-interactive before/after for the "What we do" Custom Website tab:
 *  - drag the handle to wipe between the dated site and the Simpl site,
 *  - scroll either side (scroll is synced so they stay aligned),
 *  - click the tabs on the NEW site to switch its pages.
 * Content is UI mockups (fictional Wildgrove), not photography. Drag is on the
 * handle only, so the panels are free to scroll/click.
 */

export const REVEAL_HREFS = new Set<string>(["/services/website-build"]);

const G = { green: "#2e7d32", greenDark: "#1b5e20", bright: "#43a047", ink: "#17281b", muted: "#5b6b5e", soft: "#f5f7f1", line: "#e6e9df", gold: "#f5b301" };
const hideImg = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = "none"; };

/* ---------------- BEFORE: dated Wildgrove (scrollable) ---------------- */
function BeforeSiteFull() {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", background: "#eef0ea", color: "#333" }}>
      <div style={{ position: "sticky", top: 0, background: "#3f6b34", color: "#fff", padding: "9px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700 }}>Wildgrove Landscaping</span>
        <span style={{ fontSize: 8.5 }}>(919) 555-0142</span>
      </div>
      <div style={{ background: "#e7e9e1", color: "#4a5540", fontSize: 8, padding: "5px 12px", display: "flex", gap: 12, fontWeight: 700, borderBottom: "1px solid #cfd3c6" }}>
        <span>Home</span><span>About</span><span>Services</span><span>Gallery</span><span>Contact</span>
      </div>
      <div style={{ background: "linear-gradient(#6f9e58,#567f43)", padding: "28px 14px", textAlign: "center" }}>
        <div style={{ color: "#fff", fontSize: 16, fontWeight: 700, textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>Quality Landscaping You Can Trust</div>
        <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 9.5, marginTop: 6 }}>Serving the local area for over 10 years.</div>
        <div style={{ marginTop: 13, display: "inline-block", background: "#e8b500", color: "#3a2f00", padding: "7px 15px", fontSize: 10, fontWeight: 700, borderRadius: 3 }}>Get a Free Quote</div>
      </div>
      <div style={{ padding: "14px 12px", display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["Lawn Care", "Mulching", "Cleanups", "Trees"].map((s) => (
          <div key={s} style={{ flex: "1 1 42%", background: "#dfe2d8", border: "1px solid #cfd3c6", borderRadius: 3, padding: "16px 6px", textAlign: "center", fontSize: 9, color: "#4a5540", fontWeight: 700 }}>{s}</div>
        ))}
      </div>
      <div style={{ padding: "4px 14px 16px", fontSize: 9, color: "#555", lineHeight: 1.7 }}>
        We are a family owned business. We do mowing, mulch, and cleanups. Call us today for a free estimate. We have the best prices in town and many years of experience serving local homeowners.
      </div>
      <div style={{ background: "#dfe2d8", borderTop: "1px solid #cfd3c6", padding: "16px 12px", textAlign: "center", fontSize: 9, color: "#4a5540" }}>
        Call today: (919) 555-0142
      </div>
      <div style={{ background: "#2f4a26", color: "rgba(255,255,255,0.7)", fontSize: 8, padding: "14px 14px" }}>© Wildgrove Landscaping · Cary, NC</div>
    </div>
  );
}

/* ---------------- AFTER: premium Wildgrove with tabs (scrollable) ---------------- */
const AFTER_TABS = ["Home", "Services", "Reviews"] as const;

function AfterSiteFull({ tab, setTab }: { tab: string; setTab: (t: string) => void }) {
  const eyebrow: React.CSSProperties = { color: G.green, fontSize: 8.5, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 800 };
  return (
    <div style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", background: "#fff", color: G.ink }}>
      {/* Sticky nav with working tabs */}
      <div style={{ position: "sticky", top: 0, zIndex: 5, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(6px)", borderBottom: `1px solid ${G.line}`, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 13px" }}>
        <span style={{ fontWeight: 800, fontSize: 13, color: G.greenDark }}>WILDGROVE</span>
        <div style={{ display: "flex", gap: 4 }}>
          {AFTER_TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ border: 0, cursor: "pointer", fontSize: 9.5, fontWeight: 700, padding: "5px 10px", borderRadius: 6, background: tab === t ? G.green : "transparent", color: tab === t ? "#fff" : G.muted }}>{t}</button>
          ))}
        </div>
      </div>

      {tab === "Home" && (
        <>
          <div style={{ position: "relative", height: 190, background: "repeating-linear-gradient(102deg, #2f6d3f 0 15px, #357a46 15px 30px)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1722881445875-bdd5f4d9e6fa?w=1200&q=80&auto=format&fit=crop" alt="" onError={hideImg} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,18,9,0.3), rgba(6,18,9,0.78))" }} />
            <div style={{ position: "relative", padding: "16px 16px" }}>
              <div style={{ ...eyebrow, color: "#c6ecd0" }}>Landscaping in Cary, NC</div>
              <div style={{ color: "#fff", fontSize: 22, fontWeight: 800, lineHeight: 1.08, marginTop: 7, textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>The best lawn on the block.</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
                <span style={{ background: "#2fb457", color: "#06210f", fontSize: 10, fontWeight: 800, padding: "7px 13px", borderRadius: 8 }}>Get my free estimate</span>
                <span style={{ color: G.gold, fontSize: 11 }}>★★★★★</span>
              </div>
            </div>
          </div>
          <div style={{ padding: "18px 16px" }}>
            <div style={eyebrow}>Why Wildgrove</div>
            <div style={{ fontSize: 15, fontWeight: 800, marginTop: 6, letterSpacing: "-0.01em" }}>On-time crews, fair prices, a yard you're proud of.</div>
            <p style={{ margin: "8px 0 0", fontSize: 11, lineHeight: 1.6, color: G.muted }}>Full-service lawn care, hardscaping, and design across Cary, Apex, and the Triangle. Licensed, insured, and 4.9 stars from 84 reviews.</p>
          </div>

          {/* Services preview */}
          <div style={{ background: G.soft, borderTop: `1px solid ${G.line}`, borderBottom: `1px solid ${G.line}`, padding: "16px 16px" }}>
            <div style={eyebrow}>What we do</div>
            <div style={{ marginTop: 8, display: "grid", gap: 7 }}>
              {[["Lawn Care", "Mowing, edging, fertilization."], ["Hardscaping", "Patios, walls, walkways."], ["Design & Install", "Full landscape transformations."]].map(([t, b]) => (
                <div key={t} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", border: `1px solid ${G.line}`, borderRadius: 9, padding: "10px 12px" }}>
                  <div><div style={{ fontSize: 12, fontWeight: 800 }}>{t}</div><div style={{ fontSize: 9.5, color: G.muted, marginTop: 1 }}>{b}</div></div>
                  <span style={{ color: G.green, fontSize: 13, fontWeight: 800 }}>→</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery strip */}
          <div style={{ padding: "16px 16px" }}>
            <div style={eyebrow}>Recent work</div>
            <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7 }}>
              {["linear-gradient(135deg,#2f6d3f,#6ba84f)", "linear-gradient(135deg,#3a5a40,#a3b18a)", "linear-gradient(135deg,#4a7c59,#8fbc8f)"].map((bg, i) => (
                <div key={i} style={{ aspectRatio: "1/1", borderRadius: 8, background: bg }} />
              ))}
            </div>
          </div>

          {/* Reviews preview */}
          <div style={{ background: G.soft, borderTop: `1px solid ${G.line}`, padding: "16px 16px" }}>
            <div style={eyebrow}>Reviews</div>
            <div style={{ marginTop: 8, display: "grid", gap: 7 }}>
              {[["Best lawn on the block now. Fair price, on time.", "Dana R."], ["Fixed our drainage in a day. Booked monthly.", "Mike T."]].map(([q, n]) => (
                <div key={n} style={{ background: "#fff", border: `1px solid ${G.line}`, borderRadius: 9, padding: "10px 12px" }}>
                  <div style={{ color: G.gold, fontSize: 10 }}>★★★★★</div>
                  <p style={{ margin: "5px 0 5px", fontSize: 10.5, lineHeight: 1.45 }}>{q}</p>
                  <div style={{ fontSize: 9, fontWeight: 700, color: G.muted }}>{n}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === "Services" && (
        <div style={{ padding: "16px 16px" }}>
          <div style={eyebrow}>Our services</div>
          <div style={{ fontSize: 15, fontWeight: 800, margin: "6px 0 12px" }}>Everything your property needs.</div>
          <div style={{ display: "grid", gap: 8 }}>
            {[
              ["Lawn Care & Maintenance", "Mowing, edging, fertilization, weed control."],
              ["Hardscaping & Patios", "Paver patios, walls, walkways, fire pits."],
              ["Landscape Design & Install", "Full design and planting, curb to back."],
              ["Irrigation & Drainage", "Sprinklers and grading that fix standing water."],
              ["Seasonal Cleanups", "Spring and fall cleanups, mulch, bed refreshes."],
            ].map(([t, b]) => (
              <div key={t} style={{ border: `1px solid ${G.line}`, borderRadius: 9, padding: "11px 12px" }}>
                <div style={{ fontSize: 12, fontWeight: 800 }}>{t}</div>
                <div style={{ fontSize: 10, color: G.muted, marginTop: 3, lineHeight: 1.5 }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Reviews" && (
        <div style={{ padding: "16px 16px" }}>
          <div style={eyebrow}>Reviews</div>
          <div style={{ fontSize: 15, fontWeight: 800, margin: "6px 0 12px" }}>4.9 stars from 84 neighbors.</div>
          <div style={{ display: "grid", gap: 8 }}>
            {[
              ["Best lawn on the block now. On time, fair price.", "Dana R. · Cary"],
              ["Fixed our drainage nightmare in a single day.", "Mike T. · Apex"],
              ["Showed up exactly when they said. Booked monthly.", "Priya S. · Morrisville"],
            ].map(([q, n]) => (
              <div key={n} style={{ border: `1px solid ${G.line}`, borderRadius: 9, padding: "11px 12px" }}>
                <div style={{ color: G.gold, fontSize: 11 }}>★★★★★</div>
                <p style={{ margin: "6px 0 6px", fontSize: 11, lineHeight: 1.5 }}>{q}</p>
                <div style={{ fontSize: 9.5, fontWeight: 700, color: G.muted }}>{n}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: "#0f1a12", color: "rgba(255,255,255,0.72)", fontSize: 9, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>© Wildgrove Landscaping</span>
        <span style={{ color: "#c8ecca" }}>Powered by Simpl</span>
      </div>
    </div>
  );
}

/* ---------------- The double-interactive compare ---------------- */
function WebsiteCompare() {
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);
  const [tab, setTab] = useState<string>("Home");
  const wrapRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const syncing = useRef(false);

  const move = useCallback((clientX: number) => {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    setPos(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)));
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

  const sync = (from: "before" | "after") => () => {
    if (syncing.current) return;
    const src = from === "before" ? beforeRef.current : afterRef.current;
    const dst = from === "before" ? afterRef.current : beforeRef.current;
    if (!src || !dst) return;
    syncing.current = true;
    dst.scrollTop = src.scrollTop;
    requestAnimationFrame(() => { syncing.current = false; });
  };

  const panel: React.CSSProperties = { position: "absolute", inset: 0, overflowY: "auto", overflowX: "hidden" };

  return (
    <div
      ref={wrapRef}
      onMouseMove={(e) => move(e.clientX)}
      style={{ position: "relative", width: "100%", height: 348, borderRadius: 12, overflow: "hidden", border: "1px solid var(--rule)", boxShadow: "0 30px 80px -40px rgba(0,0,0,0.8)", userSelect: drag ? "none" : "auto" }}
    >
      {/* After (underneath, full width). Interactive tabs live here. */}
      <div ref={afterRef} className="reveal-panel" onScroll={sync("after")} style={panel}>
        <AfterSiteFull tab={tab} setTab={setTab} />
      </div>
      {/* Before (on top, clipped to the left of the handle). clip-path also clips
          pointer events, so the right region interacts with the After site. */}
      <div ref={beforeRef} className="reveal-panel" onScroll={sync("before")} style={{ ...panel, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <BeforeSiteFull />
      </div>

      {/* Divider + handle (drag only here; line ignores the pointer so scroll works). */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: 3, background: "#fff", transform: "translateX(-50%)", zIndex: 10, pointerEvents: "none", boxShadow: "0 0 12px rgba(0,0,0,0.5)" }}>
        <button
          type="button"
          aria-label="Drag to compare"
          onMouseDown={(e) => { e.preventDefault(); setDrag(true); }}
          onTouchStart={() => setDrag(true)}
          style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) scale(${drag ? 1.1 : 1})`, pointerEvents: "auto", width: 40, height: 40, borderRadius: 999, background: "var(--accent)", color: "var(--accent-ink)", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "ew-resize", boxShadow: "0 6px 18px -4px rgba(0,0,0,0.6)", transition: "transform 140ms ease" }}
        >
          <GripVertical className="size-5" />
        </button>
      </div>
    </div>
  );
}

export default function ServiceReveal({ href }: { href: string }) {
  if (!REVEAL_HREFS.has(href)) return null;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9, gap: 8 }}>
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>The old site</span>
        <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.06em", color: "var(--fg-dim)", whiteSpace: "nowrap" }}>drag · scroll · tap tabs</span>
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>Built by Simpl</span>
      </div>
      <WebsiteCompare />
      <p style={{ margin: "12px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "var(--muted)" }}>
        Scroll either site, drag to compare, and click the tabs on the new one, the same site we build for you.
      </p>
    </div>
  );
}
