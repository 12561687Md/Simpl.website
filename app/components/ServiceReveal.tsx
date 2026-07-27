import Link from "next/link";

/**
 * "What we do" showcases. Each service tab gets a real product shot instead of a
 * paragraph: the Custom Website tab embeds the live Wildgrove demo; the rest are
 * branded mock dashboards that show the concrete deliverable (a triaged site, a
 * #1 local ranking, an ad dashboard, an organic growth curve, a strategy board).
 *
 * All static markup on purpose, so this stays a server component (no client
 * bundle, no event-handler-in-server-component build errors). Every showcase
 * uses SHOW_H so the box is the same height on every tab and never jumps.
 */
export const REVEAL_HREFS = new Set<string>([
  "/services/website-build",
  "/services/quick-wins",
  "/services/local-seo",
  "/services/paid-ads",
  "/services/organic-growth",
  "/services/strategy",
]);

const SHOW_H = "clamp(360px, 50vh, 440px)";
const GOOD = "#34A853";
const BAD = "#E05252";

/* ---- shared chrome ---- */
function Labels({ left, right }: { left: string; right: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9, gap: 8 }}>
      <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>{left}</span>
      <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.06em", color: "var(--fg-dim)", whiteSpace: "nowrap" }}>{right}</span>
    </div>
  );
}

function Frame({ children, pad = true }: { children: React.ReactNode; pad?: boolean }) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--rule)", boxShadow: "0 30px 80px -40px rgba(0,0,0,0.8)", height: SHOW_H, background: "var(--bg-soft)", padding: pad ? 16 : 0, display: "flex", flexDirection: "column" }}>
      {children}
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: "12px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "var(--muted)" }}>{children}</p>;
}

const tile: React.CSSProperties = { background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 10, padding: "12px 13px" };
const chip = (color: string): React.CSSProperties => ({ fontSize: 10.5, fontWeight: 700, color, background: `color-mix(in srgb, ${color} 16%, transparent)`, padding: "2px 8px", borderRadius: 999, whiteSpace: "nowrap" });

/* ===================================================================== */
/* 1. Custom Website — the real, live Wildgrove site                     */
/* ===================================================================== */
function WebsiteBuild() {
  return (
    <div>
      <Labels left="A real Simpl-built site" right="scroll it · it's live" />
      <Frame pad={false}>
        <iframe
          src="/demo/wildgrove?embed=1"
          title="Wildgrove Landscaping, a real site built by Simpl"
          loading="lazy"
          style={{ width: "100%", height: "100%", border: 0, display: "block", background: "#fff" }}
        />
      </Frame>
      <Caption>
        This is a real, complete site we built, scroll through it. <Link href="/demo/wildgrove" style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)" }}>Open the full demo →</Link>
      </Caption>
    </div>
  );
}

/* ===================================================================== */
/* 2. Quick Wins & Site Triage — the fix list + health score climbing    */
/* ===================================================================== */
const TRIAGE = [
  ["Contact form wasn't submitting", "Fixed"],
  ["SSL certificate expired", "Renewed"],
  ["4 broken links", "Repaired"],
  ["Mobile load 6.1s", "Now 1.8s"],
  ["No click-to-call on mobile", "Added"],
];
function QuickWins() {
  return (
    <div>
      <Labels left="Site triage" right="week one" />
      <Frame>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fg)" }}>Site health</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700 }}>
            <span style={{ color: BAD }}>52</span>
            <span style={{ color: "var(--fg-dim)" }}>→</span>
            <span style={{ color: GOOD }}>88</span>
          </div>
        </div>
        <div style={{ height: 8, borderRadius: 999, background: "var(--bg)", border: "1px solid var(--rule)", overflow: "hidden", marginBottom: 14 }}>
          <div style={{ width: "88%", height: "100%", background: `linear-gradient(90deg, ${GOOD}, var(--accent))` }} />
        </div>
        <div style={{ display: "grid", gap: 8, overflow: "hidden" }}>
          {TRIAGE.map(([label, status]) => (
            <div key={label} style={{ ...tile, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 12px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, color: "var(--fg)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOOD} strokeWidth="2.4" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {label}
              </span>
              <span style={chip(GOOD)}>{status}</span>
            </div>
          ))}
        </div>
      </Frame>
      <Caption>Five fixes shipped in the first week, before you spend a dollar on anything bigger.</Caption>
    </div>
  );
}

/* ===================================================================== */
/* 3. Local SEO & AI Search Visibility — the local 3-pack + AI answer     */
/* ===================================================================== */
const PACK = [
  ["Wildgrove Landscaping", "4.9", "84", true],
  ["Green Valley Lawn Co.", "4.4", "31", false],
  ["Triangle Yard Pros", "4.2", "58", false],
];
const RANKS = [
  ["lawn care cary nc", "#1"],
  ["landscaping apex", "#2"],
  ["paver patio raleigh", "#3"],
];
function LocalSeo() {
  return (
    <div>
      <Labels left="Local visibility" right="Google · Maps · AI" />
      <Frame>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 999, padding: "8px 12px", marginBottom: 12 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" strokeLinecap="round" /></svg>
          <span style={{ fontSize: 12.5, color: "var(--muted)" }}>lawn care near me</span>
        </div>
        <div style={{ display: "grid", gap: 7, marginBottom: 12 }}>
          {PACK.map(([name, rating, count, top], i) => (
            <div key={name as string} style={{ ...tile, display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderColor: top ? "var(--accent)" : "var(--rule)", background: top ? "var(--accent-soft)" : "var(--bg)" }}>
              <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: top ? "var(--accent)" : "var(--muted)", width: 16 }}>{i + 1}</span>
              <span style={{ flex: 1, minWidth: 0, fontSize: 12.5, fontWeight: top ? 700 : 500, color: "var(--fg)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
              <span style={{ color: "#f5b301", fontSize: 11 }}>★ {rating}</span>
              <span style={{ fontSize: 10.5, color: "var(--fg-dim)" }}>({count})</span>
              {top ? <span style={chip(GOOD)}>▲ #7 → #1</span> : null}
            </div>
          ))}
        </div>
        <div style={{ ...tile, padding: "11px 13px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--accent)" aria-hidden="true"><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" /></svg>
            <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>AI overview</span>
          </div>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: "var(--muted)" }}>&ldquo;Wildgrove Landscaping is one of the top-rated landscapers in Cary, NC, known for lawn care, patios, and fast free estimates.&rdquo;</p>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
          {RANKS.map(([kw, pos]) => (
            <span key={kw} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--fg)", background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 999, padding: "4px 10px" }}>
              {kw} <span style={{ color: GOOD, fontWeight: 700 }}>{pos} ▲</span>
            </span>
          ))}
        </div>
      </Frame>
      <Caption>The local three-pack, the AI answer, and the searches that bring calls, all working for you.</Caption>
    </div>
  );
}

/* ===================================================================== */
/* 4. Paid Performance Marketing — the ad dashboard                       */
/* ===================================================================== */
const KPIS: [string, string, string][] = [
  ["Leads", "68", GOOD],
  ["Cost / lead", "$41", GOOD],
  ["ROAS", "4.2×", "var(--accent)"],
  ["Spend", "$2,800", "var(--fg)"],
];
const BARS = [34, 41, 38, 52, 61, 58, 74, 82];
function PaidAds() {
  return (
    <div>
      <Labels left="Paid performance" right="Google + Meta · example" />
      <Frame>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
          {KPIS.map(([label, value, color]) => (
            <div key={label} style={tile}>
              <div className="mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ ...tile, flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div className="mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>Leads per week</div>
          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 7, minHeight: 70 }}>
            {BARS.map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "4px 4px 0 0", background: i === BARS.length - 1 ? "var(--accent)" : "color-mix(in srgb, var(--accent) 42%, transparent)" }} />
            ))}
          </div>
        </div>
      </Frame>
      <Caption>Every dollar tracked to a booked job, with a plain-English report on cost per lead.</Caption>
    </div>
  );
}

/* ===================================================================== */
/* 5. Long-Term Organic Growth — the compounding traffic curve           */
/* ===================================================================== */
const ORG_POSTS = [
  ["How much does landscaping cost in Cary?", "#1"],
  ["Best time to aerate & seed in NC", "#2"],
  ["5 hardscaping ideas that add value", "#4"],
];
function OrganicGrowth() {
  return (
    <div>
      <Labels left="Organic growth" right="12-month trend" />
      <Frame>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
          {[["Organic visits", "+180%", GOOD], ["Keywords ranked", "240", "var(--fg)"], ["Leads / mo", "22", "var(--accent)"]].map(([l, v, c]) => (
            <div key={l} style={tile}>
              <div className="mono" style={{ fontSize: 8.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>{l}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: c }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ ...tile, padding: 12, marginBottom: 12 }}>
          <svg viewBox="0 0 300 84" preserveAspectRatio="none" style={{ width: "100%", height: 72, display: "block" }} aria-hidden="true">
            <defs>
              <linearGradient id="orgfill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,74 C40,70 60,60 100,52 C140,44 160,30 210,22 C250,16 280,10 300,6 L300,84 L0,84 Z" fill="url(#orgfill)" />
            <path d="M0,74 C40,70 60,60 100,52 C140,44 160,30 210,22 C250,16 280,10 300,6" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          {ORG_POSTS.map(([t, pos]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, fontSize: 12, color: "var(--fg)" }}>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t}</span>
              <span style={chip(GOOD)}>{pos}</span>
            </div>
          ))}
        </div>
      </Frame>
      <Caption>Content built around what customers search, compounding into traffic you don&apos;t pay per click for.</Caption>
    </div>
  );
}

/* ===================================================================== */
/* 6. Fractional CMO & Strategy — the quarterly plan board               */
/* ===================================================================== */
const QUARTERS: [string, string, string][] = [
  ["Q1", "Foundation", "Site + tracking live, GBP optimized"],
  ["Q2", "Visibility", "Local SEO ranks, first content set"],
  ["Q3", "Demand", "Paid campaigns, cost-per-lead dialed in"],
  ["Q4", "Scale", "Double down on what books revenue"],
];
function Strategy() {
  return (
    <div>
      <Labels left="The plan" right="quarterly roadmap" />
      <Frame>
        <div style={{ ...tile, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12, borderColor: "var(--accent)", background: "var(--accent-soft)" }}>
          <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>North-star metric</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--fg)" }}>Booked revenue</span>
        </div>
        <div style={{ display: "grid", gap: 8, flex: 1, minHeight: 0 }}>
          {QUARTERS.map(([q, theme, detail]) => (
            <div key={q} style={{ ...tile, display: "flex", alignItems: "center", gap: 12, padding: "10px 12px" }}>
              <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", width: 22 }}>{q}</span>
              <span style={{ display: "grid", gap: 2, minWidth: 0 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--fg)" }}>{theme}</span>
                <span style={{ fontSize: 11.5, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{detail}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="mono" style={{ marginTop: 12, fontSize: 10, letterSpacing: "0.06em", color: "var(--fg-dim)", textAlign: "center" }}>Monthly strategy session · one team accountable for the number</div>
      </Frame>
      <Caption>A senior marketing lead steering the whole thing, with one plan and one number that matters.</Caption>
    </div>
  );
}

/* ===================================================================== */
const SHOWCASES: Record<string, () => React.ReactElement> = {
  "/services/website-build": WebsiteBuild,
  "/services/quick-wins": QuickWins,
  "/services/local-seo": LocalSeo,
  "/services/paid-ads": PaidAds,
  "/services/organic-growth": OrganicGrowth,
  "/services/strategy": Strategy,
};

export default function ServiceReveal({ href }: { href: string }) {
  const Showcase = SHOWCASES[href];
  if (!Showcase) return null;
  return <Showcase />;
}
