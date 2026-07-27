import Link from "next/link";
import CardCoverflow, { type CoverflowSlide } from "@/components/ui/card-coverflow";

/**
 * "What we do" showcases. Custom Website embeds the live Wildgrove demo; every
 * other tab rotates (coverflow) through real MARKETING visuals: a site-health
 * score, the Google local pack, an AI overview, positively trending graphs of
 * week/month progress and profit, an ad dashboard, a quarterly plan, and
 * references to our own blog guides on the same subject.
 *
 * All coded SVG/markup so the numbers stay crisp and honest (never AI-garbled),
 * and it's all server markup except the coverflow itself. Every showcase uses
 * SHOW_H so the box is the same height on every tab and never jumps.
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
const GOLD = "#f5b301";

/* ---------- shared chrome ---------- */
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

/* ---------- card primitives ---------- */
const tileS: React.CSSProperties = { background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 9, padding: "9px 10px" };
const chipS = (c: string): React.CSSProperties => ({ fontSize: 10, fontWeight: 700, color: c, background: `color-mix(in srgb, ${c} 16%, transparent)`, padding: "2px 7px", borderRadius: 999, whiteSpace: "nowrap" });

function MCard({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "var(--bg-elev)", border: "1px solid var(--rule)", borderRadius: 14, padding: 16, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 24px 60px -30px rgba(0,0,0,0.75)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, gap: 8 }}>
        <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>{title}</span>
        {right ? <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.06em", color: "var(--fg-dim)", whiteSpace: "nowrap" }}>{right}</span> : null}
      </div>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>{children}</div>
    </div>
  );
}

/* ===== Site health ===== */
const TRIAGE: [string, string][] = [
  ["Contact form fixed", "Fixed"],
  ["SSL renewed · 4 dead links repaired", "Done"],
  ["Mobile load 6.1s → 1.8s", "Faster"],
];
function HealthCard() {
  return (
    <MCard title="Site health" right="week one">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 12.5, color: "var(--muted)" }}>Overall score</span>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 22, fontWeight: 800, lineHeight: 1 }}>
          <span style={{ color: BAD }}>52</span><span style={{ color: "var(--fg-dim)", fontSize: 15 }}>→</span><span style={{ color: GOOD }}>88</span>
        </span>
      </div>
      <div style={{ height: 8, borderRadius: 999, background: "var(--bg)", border: "1px solid var(--rule)", overflow: "hidden", marginBottom: 14 }}>
        <div style={{ width: "88%", height: "100%", background: `linear-gradient(90deg, ${GOOD}, var(--accent))` }} />
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {TRIAGE.map(([label, status]) => (
          <div key={label} style={{ ...tileS, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "var(--fg)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={GOOD} strokeWidth="2.6" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {label}
            </span>
            <span style={chipS(GOOD)}>{status}</span>
          </div>
        ))}
      </div>
    </MCard>
  );
}

/* ===== Google local pack ===== */
const PACK: [string, string, string, boolean][] = [
  ["Wildgrove Landscaping", "4.9", "84", true],
  ["Green Valley Lawn Co.", "4.4", "31", false],
  ["Triangle Yard Pros", "4.2", "58", false],
];
function LocalPackCard() {
  return (
    <MCard title="Google local pack" right="lawn care near me">
      <div style={{ display: "grid", gap: 8 }}>
        {PACK.map(([name, rating, count, top], i) => (
          <div key={name} style={{ ...tileS, display: "flex", alignItems: "center", gap: 10, borderColor: top ? "var(--accent)" : "var(--rule)", background: top ? "var(--accent-soft)" : "var(--bg)" }}>
            <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: top ? "var(--accent)" : "var(--muted)", width: 14 }}>{i + 1}</span>
            <span style={{ flex: 1, minWidth: 0, fontSize: 12.5, fontWeight: top ? 700 : 500, color: "var(--fg)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
            <span style={{ color: GOLD, fontSize: 11 }}>★ {rating}</span>
            <span style={{ fontSize: 10, color: "var(--fg-dim)" }}>({count})</span>
            {top ? <span style={chipS(GOOD)}>▲ #7→#1</span> : null}
          </div>
        ))}
      </div>
      <div style={{ ...tileS, marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" strokeLinecap="round" /></svg>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>Ranked #1 in Cary for the searches that call.</span>
      </div>
    </MCard>
  );
}

/* ===== AI overview ===== */
const AIRANKS: [string, string][] = [["lawn care cary", "#1"], ["landscaping apex", "#2"], ["paver patio", "#3"]];
function AIOverviewCard() {
  return (
    <MCard title="AI overview" right="ChatGPT · Gemini">
      <div style={{ ...tileS, display: "flex", gap: 9, alignItems: "flex-start" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="var(--accent)" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" /></svg>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: "var(--fg)" }}>&ldquo;Wildgrove Landscaping is one of the top-rated landscapers in Cary, NC, known for lawn care, patios, and fast free estimates.&rdquo;</p>
      </div>
      <div style={{ marginTop: "auto", paddingTop: 12 }}>
        <div className="mono" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-dim)", marginBottom: 8 }}>Ranking for</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {AIRANKS.map(([kw, pos]) => (
            <span key={kw} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--fg)", ...tileS, padding: "5px 10px", borderRadius: 999 }}>
              {kw} <span style={{ color: GOOD, fontWeight: 700 }}>{pos} ▲</span>
            </span>
          ))}
        </div>
      </div>
    </MCard>
  );
}

/* ===== Trending graph (climbing = good up, falling = good down e.g. cost) ===== */
function TrendCard({ title, right, metric, from, to, climbing, sub }: { title: string; right: string; metric: string; from: string; to: string; climbing: boolean; sub: string }) {
  const line = climbing
    ? "M0,82 C60,76 90,58 140,46 C190,34 220,16 300,8"
    : "M0,10 C60,16 90,34 140,46 C190,58 220,74 300,82";
  const area = `${line} L300,90 L0,90 Z`;
  return (
    <MCard title={title} right={right}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 9, marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>{metric}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 17, fontWeight: 800 }}>
          <span style={{ color: "var(--fg-dim)" }}>{from}</span><span style={{ color: "var(--fg-dim)", fontSize: 13 }}>→</span><span style={{ color: GOOD }}>{to}</span>
          <span style={{ color: GOOD, fontSize: 13 }}>{climbing ? "▲" : "▼"}</span>
        </span>
      </div>
      <div style={{ flex: 1, minHeight: 0, ...tileS, padding: 12, display: "flex", flexDirection: "column" }}>
        <svg viewBox="0 0 300 90" preserveAspectRatio="none" style={{ width: "100%", flex: 1, display: "block" }} aria-hidden="true">
          <defs>
            <linearGradient id={`tf-${title.replace(/\W/g, "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GOOD} stopOpacity="0.32" />
              <stop offset="100%" stopColor={GOOD} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#tf-${title.replace(/\W/g, "")})`} />
          <path d={line} fill="none" stroke={GOOD} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ marginTop: 10, fontSize: 11.5, color: "var(--muted)" }}>{sub}</div>
    </MCard>
  );
}

/* ===== Paid ads dashboard ===== */
const KPIS: [string, string, string][] = [["Leads", "68", GOOD], ["Cost / lead", "$41", GOOD], ["ROAS", "4.2×", "var(--accent)"], ["Revenue", "$11.8k", GOOD]];
const BARS = [34, 41, 38, 52, 61, 58, 74, 82];
function AdsCard() {
  return (
    <MCard title="Paid performance" right="Google + Meta · example">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 10 }}>
        {KPIS.map(([label, value, color]) => (
          <div key={label} style={tileS}>
            <div className="mono" style={{ fontSize: 8.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color }}>{value}</div>
          </div>
        ))}
      </div>
      <div style={{ ...tileS, flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div className="mono" style={{ fontSize: 8.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>Leads per week ▲</div>
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 6, minHeight: 44 }}>
          {BARS.map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "3px 3px 0 0", background: i === BARS.length - 1 ? "var(--accent)" : "color-mix(in srgb, var(--accent) 42%, transparent)" }} />
          ))}
        </div>
      </div>
    </MCard>
  );
}

/* ===== Organic growth ===== */
const ORG_POSTS: [string, string][] = [["How much does landscaping cost in Cary?", "#1"], ["Best time to aerate & seed in NC", "#2"]];
function OrganicCard() {
  return (
    <MCard title="Organic growth" right="12-month trend">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 7, marginBottom: 10 }}>
        {[["Visits", "+180%", GOOD], ["Keywords", "240", "var(--fg)"], ["Leads/mo", "22", "var(--accent)"]].map(([l, v, c]) => (
          <div key={l} style={tileS}>
            <div className="mono" style={{ fontSize: 8, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 3 }}>{l}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: c }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ ...tileS, padding: 10, marginBottom: 10 }}>
        <svg viewBox="0 0 300 70" preserveAspectRatio="none" style={{ width: "100%", height: 56, display: "block" }} aria-hidden="true">
          <defs>
            <linearGradient id="orgfill2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" /><stop offset="100%" stopColor="var(--accent)" stopOpacity="0" /></linearGradient>
          </defs>
          <path d="M0,62 C40,58 60,50 100,43 C140,36 160,24 210,17 C250,12 280,8 300,5 L300,70 L0,70 Z" fill="url(#orgfill2)" />
          <path d="M0,62 C40,58 60,50 100,43 C140,36 160,24 210,17 C250,12 280,8 300,5" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        {ORG_POSTS.map(([t, pos]) => (
          <div key={t} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, fontSize: 11.5, color: "var(--fg)" }}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t}</span>
            <span style={chipS(GOOD)}>{pos}</span>
          </div>
        ))}
      </div>
    </MCard>
  );
}

/* ===== Strategy ===== */
function NorthStarCard() {
  return (
    <MCard title="The plan" right="north-star metric">
      <div style={{ ...tileS, borderColor: "var(--accent)", background: "var(--accent-soft)", padding: "16px 14px", textAlign: "center", marginBottom: 12 }}>
        <div className="mono" style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 6 }}>What we're accountable for</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "var(--fg)" }}>Booked revenue</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
        {["Foundation", "Visibility", "Demand", "Scale"].map((t, i) => (
          <div key={t} style={{ ...tileS, flex: 1, textAlign: "center", padding: "10px 4px" }}>
            <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: "var(--accent)" }}>Q{i + 1}</div>
            <div style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 3 }}>{t}</div>
          </div>
        ))}
      </div>
      <div className="mono" style={{ marginTop: "auto", paddingTop: 12, fontSize: 10, letterSpacing: "0.05em", color: "var(--fg-dim)", textAlign: "center" }}>Monthly strategy session · one team on the number</div>
    </MCard>
  );
}
function RoadmapCard() {
  const rows: [string, string, string][] = [["Q1", "Foundation", "Site + tracking live, GBP optimized"], ["Q2", "Visibility", "Local SEO ranks, first content set"], ["Q3", "Demand", "Paid campaigns, cost-per-lead dialed in"], ["Q4", "Scale", "Double down on what books revenue"]];
  return (
    <MCard title="Quarterly roadmap" right="the plan">
      <div style={{ display: "grid", gap: 8 }}>
        {rows.map(([q, theme, detail]) => (
          <div key={q} style={{ ...tileS, display: "flex", alignItems: "center", gap: 11 }}>
            <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", width: 20 }}>{q}</span>
            <span style={{ display: "grid", gap: 1, minWidth: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--fg)" }}>{theme}</span>
              <span style={{ fontSize: 11, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{detail}</span>
            </span>
          </div>
        ))}
      </div>
    </MCard>
  );
}

/* ===== Blog reference ===== */
function BlogCard({ slug, tag, title, read }: { slug: string; tag: string; title: string; read: string }) {
  return (
    <Link href={`/blog/${slug}`} style={{ textDecoration: "none", display: "block", width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "100%", background: "var(--bg-elev)", border: "1px solid var(--rule)", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 24px 60px -30px rgba(0,0,0,0.75)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" aria-hidden="true"><path d="M4 5h16M4 12h16M4 19h10" strokeLinecap="round" /></svg>
          <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>From the blog · {tag}</span>
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.22, letterSpacing: "-0.01em", color: "var(--fg)" }}>{title}</div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16 }}>
          <span style={{ fontSize: 12.5, color: "var(--accent)", borderBottom: "1px solid var(--accent)", paddingBottom: 2 }}>Read the guide →</span>
          <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-dim)" }}>{read}</span>
        </div>
      </div>
    </Link>
  );
}

/* ---------- per-tab slide sets ---------- */
const S = (key: string, node: React.ReactNode): CoverflowSlide => ({ key, node });

const QUICK_SLIDES: CoverflowSlide[] = [
  S("health", <HealthCard />),
  S("speed", <TrendCard title="Page speed" right="mobile" metric="Load time" from="6.1s" to="1.8s" climbing={false} sub="Faster pages keep the visitors you already paid to earn." />),
  S("b1", <BlogCard slug="why-is-my-website-not-showing-up-on-google" tag="Local SEO" title="Why isn't my website showing up on Google?" read="5 min" />),
  S("b2", <BlogCard slug="what-happens-when-you-miss-a-customer-call" tag="Lead Capture" title="What a missed call actually costs a service business" read="4 min" />),
];
const LOCAL_SLIDES: CoverflowSlide[] = [
  S("pack", <LocalPackCard />),
  S("ai", <AIOverviewCard />),
  S("b1", <BlogCard slug="how-to-rank-higher-on-google-maps" tag="Local SEO" title="How to rank higher on Google Maps (the local 3-pack)" read="6 min" />),
  S("b2", <BlogCard slug="how-long-does-local-seo-take" tag="Local SEO" title="How long does local SEO take to work? An honest timeline" read="4 min" />),
];
const ADS_SLIDES: CoverflowSlide[] = [
  S("ads", <AdsCard />),
  S("cpl", <TrendCard title="Cost per lead" right="90 days" metric="Per booked lead" from="$96" to="$41" climbing={false} sub="Every dollar tracked to a booked job, not a click." />),
  S("b1", <BlogCard slug="google-ads-for-remodelers" tag="Paid Ads" title="Google Ads that actually book kitchen and bath jobs" read="6 min" />),
  S("b2", <BlogCard slug="local-services-ads-vs-google-ads" tag="Paid Ads" title="Local Services Ads vs Google Ads: which books more jobs?" read="5 min" />),
];
const ORGANIC_SLIDES: CoverflowSlide[] = [
  S("org", <OrganicCard />),
  S("visits", <TrendCard title="Organic traffic" right="12 months" metric="Monthly visits" from="0" to="+180%" climbing={true} sub="Content that compounds into traffic you don't pay per click for." />),
  S("b1", <BlogCard slug="seo-for-landscapers" tag="Industry Guides" title="SEO for landscapers: rank for local lawn care and design" read="6 min" />),
  S("b2", <BlogCard slug="how-to-get-your-business-recommended-by-ai" tag="AI Search" title="How to get your business recommended by ChatGPT & AI" read="5 min" />),
];
const STRATEGY_SLIDES: CoverflowSlide[] = [
  S("north", <NorthStarCard />),
  S("road", <RoadmapCard />),
  S("b1", <BlogCard slug="how-much-should-a-service-business-spend-on-marketing" tag="Strategy" title="How much should a service business spend on marketing?" read="5 min" />),
  S("b2", <BlogCard slug="automated-lead-follow-up-for-service-businesses" tag="Lead Capture" title="Automated lead follow-up that turns traffic into booked jobs" read="5 min" />),
];

/* ---------- tab showcases ---------- */
function WebsiteBuild() {
  return (
    <div>
      <Frame pad={false}>
        <iframe src="/demo/wildgrove?embed=1" title="Wildgrove Landscaping, a real site built by Simpl" loading="lazy" style={{ width: "100%", height: "100%", border: 0, display: "block", background: "#fff" }} />
      </Frame>
      <Caption>
        <Link href="/demo/wildgrove" style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)" }}>Open the full demo →</Link>
      </Caption>
    </div>
  );
}
function CarouselTab({ label, slides, caption }: { label: string; slides: CoverflowSlide[]; caption: string }) {
  return (
    <div>
      <Labels left={label} right="rotating" />
      <Frame><CardCoverflow slides={slides} /></Frame>
      <Caption>{caption}</Caption>
    </div>
  );
}

const SHOWCASES: Record<string, () => React.ReactElement> = {
  "/services/website-build": WebsiteBuild,
  "/services/quick-wins": () => <CarouselTab label="Quick wins & site triage" slides={QUICK_SLIDES} caption="The fast fixes that turn the visitors you already have into calls." />,
  "/services/local-seo": () => <CarouselTab label="Local SEO & AI search" slides={LOCAL_SLIDES} caption="Get found first in Google Maps, local search, and the AI answers." />,
  "/services/paid-ads": () => <CarouselTab label="Paid performance" slides={ADS_SLIDES} caption="Google and Meta ads that bring back more than they cost, every dollar tracked." />,
  "/services/organic-growth": () => <CarouselTab label="Long-term organic growth" slides={ORGANIC_SLIDES} caption="Content and SEO that compound into free traffic every month." />,
  "/services/strategy": () => <CarouselTab label="Fractional CMO & strategy" slides={STRATEGY_SLIDES} caption="A senior marketing lead steering it all, with one plan and one number that matters." />,
};

export default function ServiceReveal({ href }: { href: string }) {
  const Showcase = SHOWCASES[href];
  if (!Showcase) return null;
  return <Showcase />;
}
