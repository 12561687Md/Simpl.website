"use client";

/**
 * The left-side render for /start-now: the Wildgrove hero we build, with the
 * Simpl audit going from bad (week 1) to 90+ a few weeks later. Client
 * component because the hero <img> uses an onError fallback (event handlers
 * can't live in a server component).
 */

const hideImg = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = "none"; };

function ScoreCard({ label, score, word, wordColor, ring, sub, style }: { label: string; score: number; word: string; wordColor: string; ring: string; sub?: string; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#fff", color: "#0f1a12", borderRadius: 12, padding: "11px 12px", boxShadow: "0 22px 46px -16px rgba(0,0,0,0.5)", textAlign: "center", ...style }}>
      <div style={{ fontSize: 8, color: "#6b6b6b", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 58, height: 58, borderRadius: "50%", background: `conic-gradient(${ring} 0turn ${score / 100}turn, #e6e9e0 ${score / 100}turn 1turn)` }}>
          <div style={{ position: "absolute", inset: 5, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800 }}>{score}</div>
        </div>
      </div>
      <div style={{ fontSize: 12, fontWeight: 800, color: wordColor, marginTop: 5 }}>{word}</div>
      {sub && <div style={{ fontSize: 8, color: "#6b6b6b", marginTop: 1 }}>{sub}</div>}
    </div>
  );
}

export default function WildgroveShot() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 470, margin: "0 auto" }}>
      {/* Browser window with the Wildgrove hero */}
      <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.16)", background: "#0e1519", boxShadow: "0 40px 90px -40px rgba(0,0,0,0.85)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 12px", background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} style={{ width: 9, height: 9, borderRadius: 99, background: c }} />)}
          <span style={{ marginLeft: 8, fontSize: 10, color: "rgba(255,255,255,0.5)" }}>wildgrovelandscaping.com</span>
        </div>
        <div style={{ position: "relative", height: 236, background: "repeating-linear-gradient(102deg, #2f6d3f 0 15px, #357a46 15px 30px)", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1722881445875-bdd5f4d9e6fa?w=1200&q=80&auto=format&fit=crop" alt="" onError={hideImg} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,18,9,0.35), rgba(6,18,9,0.8))" }} />
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px" }}>
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 800, letterSpacing: "0.02em" }}>WILDGROVE</span>
            <span style={{ background: "#eafff0", color: "#14421f", fontSize: 8.5, fontWeight: 800, padding: "5px 10px", borderRadius: 6 }}>Free quote</span>
          </div>
          <div style={{ position: "relative", padding: "14px 14px 0" }}>
            <div style={{ color: "#c6ecd0", fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>Landscaping in Cary, NC</div>
            <div style={{ color: "#fff", fontSize: 21, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em", marginTop: 7, textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>The best lawn on the block.</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
              <span style={{ background: "#2fb457", color: "#06210f", fontSize: 10, fontWeight: 800, padding: "7px 13px", borderRadius: 8 }}>Get my free estimate</span>
              <span style={{ color: "#ffd24a", fontSize: 11 }}>★★★★★</span>
            </div>
          </div>
        </div>
      </div>

      <ScoreCard label="Week 1" score={41} word="Needs work" wordColor="#c0392b" ring="#E05252" style={{ position: "absolute", top: -14, left: -14, width: 108, opacity: 0.96 }} />
      <ScoreCard label="A few weeks later" score={92} word="Great" wordColor="#2e7d32" ring="#34A853" sub="up from 41" style={{ position: "absolute", top: -20, right: -14, width: 132 }} />
    </div>
  );
}
