"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SimplWordmark } from "@/components/ui/simpl-brand";

/**
 * Full scrollable before/after demo for a landscaping business (Wildgrove),
 * modeled on the Stone Creek build. A sticky header toggles the WHOLE page
 * between the dated site and the Simpl site. This is the first per-niche demo
 * template (see docs/PRODUCT_VISION_APP.md): drop in a business's name/city/
 * services/photos and the "free demo" site is instant.
 *
 * Images are Unsplash stock (hot-linked). Every photo sits over a green
 * gradient and hides itself onError, so a failed image degrades to the gradient
 * instead of a broken tile. Swap these URLs for verified/real photos anytime.
 */

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523419409543-a5e549c1faa8?w=1600&q=80&auto=format&fit=crop",
];

const GALLERY = [
  "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600240644455-3edc55c375fe?w=800&q=80&auto=format&fit=crop",
];

const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

/* ---------------- Before/After toggle header ---------------- */
function ToggleHeader({ view, setView }: { view: "after" | "before"; setView: (v: "after" | "before") => void }) {
  const pill = (active: boolean): React.CSSProperties => ({
    padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer", border: 0,
    background: active ? "var(--accent)" : "transparent", color: active ? "var(--accent-ink)" : "var(--fg)",
    transition: "background 160ms ease, color 160ms ease",
  });
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(11,12,13,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--rule)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <SimplWordmark size={20} />
          <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-dim)" }}>Live demo</span>
        </div>
        <div style={{ display: "inline-flex", padding: 4, borderRadius: 999, border: "1px solid var(--rule-strong)", background: "var(--bg-soft)" }}>
          <button style={pill(view === "before")} onClick={() => setView("before")}>Their old site</button>
          <button style={pill(view === "after")} onClick={() => setView("after")}>Built by Simpl</button>
        </div>
        <Link href="/start-now" className="cta-primary" style={{ color: "var(--accent-ink)", textDecoration: "none", padding: "9px 16px", fontSize: 13, fontWeight: 600, borderRadius: 999 }}>
          Get mine free
        </Link>
      </div>
    </div>
  );
}

/* ---------------- The new Simpl site ---------------- */
const G = { green: "#2e7d32", greenDark: "#1b5e20", bright: "#43a047", ink: "#17281b", muted: "#5b6b5e", soft: "#f5f7f1", gold: "#f5b301" };

function NewSite() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % HERO_IMAGES.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "#fff", color: G.ink, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      {/* Site nav */}
      <div style={{ position: "sticky", top: 57, zIndex: 30, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e9df" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 800, letterSpacing: "0.02em", fontSize: 18, color: G.greenDark }}>WILDGROVE</span>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <span className="wg-navlink" style={{ fontSize: 14, color: G.muted }}>Services</span>
            <span className="wg-navlink" style={{ fontSize: 14, color: G.muted }}>Gallery</span>
            <span className="wg-navlink" style={{ fontSize: 14, color: G.muted }}>Reviews</span>
            <span style={{ background: G.green, color: "#fff", fontSize: 13, fontWeight: 700, padding: "9px 16px", borderRadius: 8 }}>Free quote</span>
          </div>
        </div>
      </div>

      {/* Rotating hero */}
      <section style={{ position: "relative", height: "clamp(440px, 72vh, 640px)", overflow: "hidden", background: `linear-gradient(135deg, ${G.greenDark}, ${G.green})` }}>
        {HERO_IMAGES.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="" onError={hideOnError} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === idx ? 1 : 0, transition: "opacity 1.2s ease" }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,25,12,0.3), rgba(10,25,12,0.74))" }} />
        <div style={{ position: "relative", maxWidth: 1120, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ color: "#c8ecca", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>Landscaping in Cary &amp; Apex, NC</div>
          <h1 style={{ margin: 0, color: "#fff", fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 680, textShadow: "0 2px 18px rgba(0,0,0,0.4)" }}>
            The best lawn on the block, without lifting a finger.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.92)", fontSize: 17, marginTop: 16, lineHeight: 1.5, maxWidth: 520, textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>
            Full-service lawn care, hardscaping, and seasonal cleanups. On-time crews, fair prices, and a yard you'll be proud of.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
            <span style={{ background: G.bright, color: "#06210f", fontSize: 15, fontWeight: 800, padding: "13px 24px", borderRadius: 10, boxShadow: "0 16px 34px -14px rgba(0,0,0,0.6)" }}>Get my free estimate</span>
            <span style={{ border: "1px solid rgba(255,255,255,0.6)", color: "#fff", fontSize: 15, fontWeight: 600, padding: "13px 22px", borderRadius: 10 }}>See our work</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 22 }}>
            <span style={{ color: G.gold, fontSize: 16, letterSpacing: 1 }}>★★★★★</span>
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>84 five-star Google reviews</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: G.green, fontWeight: 700, marginBottom: 14 }}>What we do</div>
        <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", maxWidth: 640 }}>Everything your property needs, one crew.</h2>
        <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {[
            { t: "Lawn Care & Mowing", b: "Weekly mowing, edging, fertilization, and weed control that keeps your lawn the greenest on the street.", img: GALLERY[0] },
            { t: "Hardscaping & Patios", b: "Paver patios, retaining walls, walkways, and fire pits built to last and boost your home's value.", img: GALLERY[1] },
            { t: "Cleanups & Design", b: "Spring and fall cleanups, mulch, planting, and full landscape design to transform your yard.", img: GALLERY[3] },
          ].map((s) => (
            <div key={s.t} style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #e6e9df", background: "#fff", boxShadow: "0 20px 40px -30px rgba(0,0,0,0.3)" }}>
              <div style={{ height: 140, background: `linear-gradient(135deg, ${G.green}, #8fbc8f)`, position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt="" onError={hideOnError} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "18px 18px 22px" }}>
                <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{s.t}</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: G.muted }}>{s.b}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section style={{ background: G.soft, borderTop: "1px solid #e6e9df", borderBottom: "1px solid #e6e9df" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px" }}>
          <h2 style={{ margin: "0 0 28px", fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Recent work</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {GALLERY.map((src, i) => (
              <div key={i} style={{ aspectRatio: "4/3", borderRadius: 12, overflow: "hidden", background: `linear-gradient(135deg, ${G.green}, #8fbc8f)` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" onError={hideOnError} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {[
            { q: "Best lawn on the block now. On time, fair price, and they actually pick up the phone.", n: "Dana R." },
            { q: "Fixed our drainage nightmare in a single day. Yard's never looked better.", n: "Mike T." },
            { q: "Showed up exactly when they said. We booked them monthly on the spot.", n: "Priya S." },
          ].map((r) => (
            <div key={r.n} style={{ border: "1px solid #e6e9df", borderRadius: 14, padding: "22px 20px", background: "#fff" }}>
              <div style={{ color: G.gold, fontSize: 14, letterSpacing: 1 }}>★★★★★</div>
              <p style={{ margin: "12px 0 14px", fontSize: 15, lineHeight: 1.55 }}>{r.q}</p>
              <div style={{ fontSize: 13, fontWeight: 600, color: G.muted }}>{r.n}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${G.greenDark}, ${G.green})`, color: "#fff" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px", textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Ready for the best yard on the block?</h2>
          <p style={{ margin: "14px auto 0", maxWidth: 480, fontSize: 16, color: "rgba(255,255,255,0.9)" }}>Free estimate, same-week scheduling. Serving Cary, Apex, and the Triangle.</p>
          <div style={{ marginTop: 26 }}>
            <span style={{ background: "#fff", color: G.greenDark, fontSize: 15, fontWeight: 800, padding: "14px 28px", borderRadius: 10, display: "inline-block" }}>Get my free estimate</span>
          </div>
        </div>
      </section>
      <div style={{ background: "#0f1a12", color: "rgba(255,255,255,0.6)", fontSize: 12, textAlign: "center", padding: "16px" }}>
        © Wildgrove Landscaping · Cary, NC · <span style={{ color: "#c8ecca" }}>Site by Simpl</span>
      </div>
    </div>
  );
}

/* ---------------- The dated old site ---------------- */
function OldSite() {
  return (
    <div style={{ background: "#fbfbf4", color: "#333", fontFamily: "Arial, Helvetica, sans-serif", minHeight: "60vh" }}>
      <div style={{ background: "linear-gradient(#3a6b2a,#284d1c)", color: "#fff", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700 }}>Green Lawns Landscaping</span>
        <span style={{ fontSize: 12 }}>Call: (919) 555-0100</span>
      </div>
      <div style={{ background: "#cbb63a", color: "#3a2f00", fontSize: 12, padding: "6px 16px", display: "flex", gap: 18, fontWeight: 700 }}>
        <span>HOME</span><span>ABOUT US</span><span>SERVICES</span><span>GALLERY</span><span>CONTACT</span>
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ color: "#a11", fontSize: 26, fontWeight: 700, fontFamily: "Georgia, serif", marginBottom: 14 }}>Welcome to our website!</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ width: 300, maxWidth: "100%", height: 180, background: "#dcdcd0", border: "1px solid #b9b9a8", display: "flex", alignItems: "center", justifyContent: "center", color: "#8a8a78", fontSize: 13, textAlign: "center" }}>
            image not found
          </div>
          <div style={{ flex: 1, minWidth: 220, fontSize: 13.5, lineHeight: 1.6 }}>
            We are a family owned lawn care business serving the local area since 1998. We do mowing, trees, and more. Best prices in town!! Please call us today for a FREE estimate, we look forward to hearing from you.
            <div style={{ marginTop: 14, background: "linear-gradient(#f0d000,#d4a000)", border: "1px solid #a80", color: "#3a2f00", padding: "8px 16px", fontSize: 14, fontWeight: 700, display: "inline-block" }}>CLICK HERE!!!</div>
          </div>
        </div>
        <ul style={{ marginTop: 24, fontSize: 13, color: "#444", lineHeight: 1.9 }}>
          <li>&#9642; Mowing and lawn cutting</li>
          <li>&#9642; Tree trimming</li>
          <li>&#9642; Leaf removal</li>
          <li>&#9642; And more!!!</li>
        </ul>
        <div style={{ marginTop: 30, fontSize: 11, color: "#999", fontStyle: "italic", borderTop: "1px solid #ddd", paddingTop: 12 }}>
          © 2011 Green Lawns Landscaping · Best viewed in Internet Explorer 8 · Hit counter: 04127
        </div>
      </div>
    </div>
  );
}

export default function WildgroveDemo() {
  const [view, setView] = useState<"after" | "before">("after");
  return (
    <div style={{ minHeight: "100vh", background: "#0B0C0D" }}>
      <ToggleHeader view={view} setView={setView} />
      {view === "after" ? <NewSite /> : <OldSite />}
    </div>
  );
}
