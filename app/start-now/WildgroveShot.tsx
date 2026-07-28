/**
 * The left-side render for /start-now: two small, distinct phones, coded so we
 * control the content (the baked-in duo PNG was two identical phones with a
 * caption burned in and was too tall).
 *   - Phone A: the Simpl app audit (dark, live Simpl Score).
 *   - Phone B: the customer's brand-new mobile website (the site we build).
 * Deliberately small so the left panel never needs to scroll. Server component:
 * the hero photo is a CSS background-image, so a failed load degrades to the
 * green gradient instead of a broken tile (no client onError handler needed).
 */

const HERO = "https://images.unsplash.com/photo-1722881445875-bdd5f4d9e6fa?w=600&q=80&auto=format&fit=crop"; // backyard deck (verified)

function PhoneFrame({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ width: 132, aspectRatio: "132 / 282", borderRadius: 24, background: "#141719", border: "5px solid #202426", boxShadow: "0 30px 58px -28px rgba(0,0,0,0.85)", overflow: "hidden", position: "relative", ...style }}>
      <div style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 40, height: 7, borderRadius: 99, background: "#000", zIndex: 6 }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 19, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? "#0f1a12" : "#fff";
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 11px 3px" }}>
      <span style={{ fontSize: 8, fontWeight: 700, color: c }}>9:47</span>
      <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
        <span style={{ width: 12, height: 6, borderRadius: 2, border: `1px solid ${c}`, opacity: 0.8 }} />
      </span>
    </div>
  );
}

/* Phone A: the Simpl audit app */
function AuditPhone() {
  return (
    <div style={{ height: "100%", background: "#0b0f11", color: "#fff", display: "flex", flexDirection: "column", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <StatusBar />
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px 8px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(135deg,#3a7d46,#2e6d3f)", flexShrink: 0 }} />
        <span style={{ display: "grid", gap: 1, flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 8.5, fontWeight: 800, lineHeight: 1 }}>Wildgrove</span>
          <span style={{ fontSize: 6.5, color: "rgba(255,255,255,0.55)" }}>Raleigh, NC</span>
        </span>
        <span style={{ fontSize: 6, fontWeight: 800, color: "#89CFF0", border: "1px solid #89CFF0", borderRadius: 99, padding: "2px 5px" }}>LIVE</span>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 10px", textAlign: "center" }}>
        <div style={{ fontSize: 6.5, letterSpacing: "0.14em", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>YOUR SIMPL SCORE</div>
        <div style={{ width: 62, height: 62, borderRadius: "50%", background: "conic-gradient(#89CFF0 0 0.52turn, rgba(255,255,255,0.12) 0.52turn 1turn)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#0b0f11", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 20, fontWeight: 800, lineHeight: 1 }}>52</span>
            <span style={{ fontSize: 6, color: "rgba(255,255,255,0.45)" }}>/ 100</span>
          </div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 800, color: "#89CFF0", marginTop: 9 }}>Room to grow</div>
        <div style={{ fontSize: 7, color: "rgba(255,255,255,0.55)", marginTop: 3, lineHeight: 1.3 }}>Big upside. The leaders sit in the 80s.</div>
      </div>
    </div>
  );
}

/* Phone B: the customer's brand-new mobile website */
function SitePhone() {
  return (
    <div style={{ height: "100%", background: "#fff", display: "flex", flexDirection: "column", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <StatusBar dark />
      <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 9px 6px" }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} style={{ width: 5, height: 5, borderRadius: 99, background: c }} />)}
        <span style={{ marginLeft: 4, fontSize: 6.5, color: "#8a8f8b" }}>wildgrovelandscaping.com</span>
      </div>
      {/* hero */}
      <div style={{ position: "relative", flex: 1, minHeight: 0, backgroundImage: `linear-gradient(180deg, rgba(6,18,9,0.25), rgba(6,18,9,0.82)), url(${HERO})`, backgroundColor: "#2f6d3f", backgroundSize: "cover", backgroundPosition: "center", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 9px" }}>
          <span style={{ color: "#fff", fontSize: 8, fontWeight: 800, letterSpacing: "0.02em" }}>WILDGROVE</span>
          <span style={{ background: "#eafff0", color: "#14421f", fontSize: 5.5, fontWeight: 800, padding: "3px 6px", borderRadius: 4 }}>Free quote</span>
        </div>
        <div style={{ marginTop: "auto", padding: "0 9px 10px" }}>
          <div style={{ color: "#c6ecd0", fontSize: 5.5, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>Landscaping in Cary, NC</div>
          <div style={{ color: "#fff", fontSize: 12.5, fontWeight: 800, lineHeight: 1.08, marginTop: 4, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>The best lawn on the block.</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
            <span style={{ background: "#2fb457", color: "#06210f", fontSize: 6.5, fontWeight: 800, padding: "5px 8px", borderRadius: 6 }}>Get my free estimate</span>
            <span style={{ color: "#ffd24a", fontSize: 7 }}>★★★★★</span>
          </div>
        </div>
      </div>
      {/* trust strip */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 9px", fontSize: 6, fontWeight: 700, color: "#17281b", borderTop: "1px solid #e6e9df" }}>
        <span>★ 4.9 (84)</span><span>Licensed &amp; insured</span><span>Free est.</span>
      </div>
    </div>
  );
}

export default function WildgroveShot() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0, width: "100%" }}>
      <PhoneFrame style={{ transform: "rotate(-5deg)", zIndex: 1, marginRight: -14 }}><AuditPhone /></PhoneFrame>
      <PhoneFrame style={{ transform: "rotate(5deg) translateY(8px)", zIndex: 2 }}><SitePhone /></PhoneFrame>
    </div>
  );
}
