import type { Metadata } from "next";
import Link from "next/link";
import StartSearch from "./StartSearch";
import StartLeadCard from "./StartLeadCard";
import { SimplWordmark } from "@/components/ui/simpl-brand";

export const metadata: Metadata = {
  title: "Fix your business | Simpl",
  description: "Find your business and start your free demo, or contact us directly. Real people reply the same business day.",
  alternates: { canonical: "https://simpl.pro/start-now" },
};

/* Simpl-branded dashboard composite (our version of the Owner screenshot):
   an editor rail + a website preview, a floating Simpl Score card, and the app
   phone. Static picture, not an interactive widget. */
function SimplComposite() {
  const A = "var(--accent)", AI = "var(--accent-ink)", W = "#fff";
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 460, margin: "0 auto" }}>
      {/* Dashboard card */}
      <div style={{ display: "flex", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.16)", background: "#0e1519", boxShadow: "0 40px 90px -40px rgba(0,0,0,0.85)" }}>
        {/* Editor rail */}
        <div style={{ width: 104, flexShrink: 0, background: "rgba(255,255,255,0.05)", borderRight: "1px solid rgba(255,255,255,0.08)", padding: "11px 9px" }}>
          <div style={{ color: W, fontSize: 10.5, fontWeight: 800, marginBottom: 9 }}>Website</div>
          <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
            <span style={{ flex: 1, background: A, color: AI, fontSize: 7.5, fontWeight: 800, textAlign: "center", padding: "4px 0", borderRadius: 5 }}>Editor</span>
            <span style={{ flex: 1, color: "rgba(255,255,255,0.55)", fontSize: 7.5, textAlign: "center", padding: "4px 0" }}>Chat</span>
          </div>
          {["Update home", "Update nav", "Reviews", "Add a page"].map((x) => (
            <div key={x} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "8px", fontSize: 8, color: "rgba(255,255,255,0.85)", marginBottom: 6 }}>{x}</div>
          ))}
        </div>
        {/* Website preview */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ color: W, fontSize: 10, fontWeight: 700 }}>Your Business</span>
            <span style={{ background: A, color: AI, fontSize: 8, fontWeight: 800, padding: "4px 9px", borderRadius: 5 }}>Book now</span>
          </div>
          <div style={{ height: 168, background: "linear-gradient(135deg, #0b2a45, #123a63 60%, #1a6199)", padding: "16px 14px" }}>
            <div style={{ color: A, fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 800 }}>Top-rated in your city</div>
            <div style={{ color: W, fontSize: 17, fontWeight: 800, lineHeight: 1.1, marginTop: 7, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>The best in town,<br />booked in seconds.</div>
            <div style={{ marginTop: 12, display: "inline-block", background: A, color: AI, fontSize: 9, fontWeight: 800, padding: "6px 12px", borderRadius: 6 }}>Get a free quote</div>
          </div>
        </div>
      </div>

      {/* Floating Simpl Score card (top-center) */}
      <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", width: 172, background: "#fff", color: "#0f1a12", borderRadius: 13, padding: "12px 13px", boxShadow: "0 22px 46px -16px rgba(0,0,0,0.55)" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: 72, height: 72, borderRadius: "50%", background: "conic-gradient(#34A853 0turn 0.72turn, #e6e9e0 0.72turn 1turn)" }}>
            <div style={{ position: "absolute", inset: 6, borderRadius: "50%", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>87</span>
              <span style={{ fontSize: 7.5, color: "#6b6b6b" }}>/100</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 6 }}>
          <div style={{ fontSize: 8.5, color: "#6b6b6b", letterSpacing: "0.06em" }}>Simpl Score</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#2e7d32" }}>Great</div>
        </div>
        <div style={{ marginTop: 9, display: "grid", gap: 6 }}>
          {[["Search results", 0.9], ["Reviews", 0.72], ["Local listings", 0.95]].map(([t, v]) => (
            <div key={t as string}>
              <div style={{ fontSize: 8, color: "#555", marginBottom: 2 }}>{t}</div>
              <div style={{ height: 4, borderRadius: 99, background: "#e6e9e0", overflow: "hidden" }}>
                <div style={{ width: `${(v as number) * 100}%`, height: "100%", background: "#34A853" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* App phone (bottom-right) */}
      <div style={{ position: "absolute", bottom: -18, right: -8, width: 92, borderRadius: 16, overflow: "hidden", border: "3px solid #17181a", background: "#0B0C0D", boxShadow: "0 22px 40px -14px rgba(0,0,0,0.65)" }}>
        <div style={{ padding: "8px 8px 10px" }}>
          <div style={{ ...{ fontFamily: "var(--font-jetbrains-mono), monospace" }, fontSize: 7, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>9:47</div>
          <div style={{ color: W, fontSize: 9, fontWeight: 800, marginBottom: 6 }}>Fix your business</div>
          {[["Find customers", A], ["New offer", "rgba(255,255,255,0.14)"], ["This week +4%", "#34A853"]].map(([t, c]) => (
            <div key={t as string} style={{ background: c as string, color: (c as string) === A ? AI : W, fontSize: 6.5, fontWeight: 700, padding: "5px 6px", borderRadius: 5, marginBottom: 4 }}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FixYourBusinessPage() {
  return (
    <main className="start-split">
      {/* LEFT: logo -> branded composite -> search -> SEO/conversion copy */}
      <section className="start-panel start-left" style={{ textAlign: "center" }}>
        <Link href="/" aria-label="Simpl home" style={{ display: "inline-flex", marginBottom: 16 }}>
          <SimplWordmark size={40} />
        </Link>

        <SimplComposite />

        {/* Search sits between the image and the copy. */}
        <div style={{ maxWidth: 480, margin: "26px auto 0", width: "100%" }}>
          <StartSearch />
        </div>

        {/* SEO / conversion copy under the search. */}
        <div style={{ maxWidth: 480, margin: "22px auto 0", width: "100%", textAlign: "left" }}>
          <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>
            Growth platform for service businesses
          </div>
          <h1 style={{ margin: "9px 0 0", color: "#fff", fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            See how service businesses win more customers online.
          </h1>
          <div style={{ marginTop: 14, display: "grid", gap: 9 }}>
            {[
              { h: "Get found by more customers.", b: "Rank higher on Google and AI search, with your 5-star reviews working for you." },
              { h: "Win more of the jobs you earn.", b: "A faster site, a complete Google profile, and follow-up that never drops a lead." },
              { h: "Get your time back.", b: "One team runs it all. You get the calls, the jobs, and your evenings." },
            ].map((x) => (
              <div key={x.h} style={{ display: "flex", gap: 9 }}>
                <span aria-hidden="true" style={{ color: "#fff", flexShrink: 0, marginTop: 1 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><circle cx="12" cy="12" r="10" opacity="0.4" /><path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span style={{ fontSize: 12.5, lineHeight: 1.4, color: "rgba(255,255,255,0.92)" }}>
                  <span style={{ fontWeight: 700, color: "#fff" }}>{x.h}</span> {x.b}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RIGHT: the wide, blue-glowing lead form (contact us directly) */}
      <section className="start-panel start-right">
        <StartLeadCard />
      </section>
    </main>
  );
}
