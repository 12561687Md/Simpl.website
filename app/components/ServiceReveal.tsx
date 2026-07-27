import Link from "next/link";
import ImageCoverflow, { type CoverflowImage } from "@/components/ui/image-coverflow";

/**
 * "What we do" showcases. Each service tab gets a real visual instead of a
 * paragraph: Custom Website embeds the live Wildgrove demo; Quick Wins, Local
 * SEO, and Strategy show a real-photo coverflow (auto-advancing) with a glass
 * result badge; Paid Ads and Organic Growth show real coded charts of
 * week-over-week / month-over-month progress and profit.
 *
 * Photos are stock stand-ins (verified Unsplash) until custom Simpl brand images
 * are generated; the charts stay coded SVG so the numbers are crisp and honest,
 * not AI-garbled. Mostly server markup; the coverflow is the only client child.
 * Every showcase uses SHOW_H so the box is the same height and never jumps.
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

/* Real project photography (verified Unsplash stand-ins for custom Simpl brand
   images, generated once credits are on the Higgsfield account). */
const P = (id: string, alt: string, caption: string): CoverflowImage => ({
  src: `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`,
  alt,
  caption,
});
const PHOTOS: CoverflowImage[] = [
  P("1729058015948-592a8e4a1772", "Freshly renewed backyard lawn", "Full lawn renewal"),
  P("1722881445875-bdd5f4d9e6fa", "New backyard deck and patio", "Deck & patio build"),
  P("1749803915455-a7642520d0d3", "Garden in full bloom", "Garden design & install"),
  P("1694885186013-5aa7d91ae5d5", "Pond and gazebo landscaping", "Water feature & hardscape"),
  P("1681853108586-f29b4ef5c0fb", "Manicured green yard", "Weekly maintenance"),
  P("1772040942277-b194d9d0b648", "Lush garden with hot tub", "Backyard transformation"),
];
/* Rotate the start image so each tab's coverflow doesn't open on the same shot. */
const rot = (k: number): CoverflowImage[] => [...PHOTOS.slice(k), ...PHOTOS.slice(0, k)];

/* Frosted glass badge that floats over the active photo, carrying the tab's proof. */
function GlassBadge({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(8,12,16,0.62)", backdropFilter: "blur(9px)", WebkitBackdropFilter: "blur(9px)", border: "1px solid rgba(137,207,240,0.38)", borderRadius: 12, padding: "11px 15px", boxShadow: "0 22px 55px -26px rgba(0,0,0,0.85)", maxWidth: 240 }}>
      {children}
    </div>
  );
}

/* ===================================================================== */
/* 1. Custom Website — the real, live Wildgrove site                     */
/* ===================================================================== */
function WebsiteBuild() {
  return (
    <div>
      <Frame pad={false}>
        <iframe
          src="/demo/wildgrove?embed=1"
          title="Wildgrove Landscaping, a real site built by Simpl"
          loading="lazy"
          style={{ width: "100%", height: "100%", border: 0, display: "block", background: "#fff" }}
        />
      </Frame>
      <Caption>
        <Link href="/demo/wildgrove" style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)" }}>Open the full demo →</Link>
      </Caption>
    </div>
  );
}

/* ===================================================================== */
/* 2. Quick Wins & Site Triage — the fix list + health score climbing    */
/* ===================================================================== */
function QuickWins() {
  return (
    <div>
      <Labels left="Quick wins & site triage" right="week one" />
      <Frame>
        <ImageCoverflow
          images={rot(0)}
          overlay={
            <GlassBadge>
              <div className="mono" style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 5 }}>Site health</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 20, fontWeight: 800, lineHeight: 1 }}>
                <span style={{ color: BAD }}>52</span>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 15 }}>→</span>
                <span style={{ color: GOOD }}>88</span>
              </div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.82)", marginTop: 6 }}>5 fixes shipped in week one: form, SSL, dead links, mobile speed.</div>
            </GlassBadge>
          }
        />
      </Frame>
      <Caption>The fast fixes that turn the visitors you already have into calls, before you spend on anything bigger.</Caption>
    </div>
  );
}

/* ===================================================================== */
/* 3. Local SEO & AI Search Visibility — the local 3-pack + AI answer     */
/* ===================================================================== */
function LocalSeo() {
  return (
    <div>
      <Labels left="Local SEO & AI search" right="Google · Maps · AI" />
      <Frame>
        <ImageCoverflow
          images={rot(2)}
          overlay={
            <GlassBadge>
              <div className="mono" style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 5 }}>Google local pack</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: "#fff", lineHeight: 1 }}>#1</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: GOOD }}>▲ up from #7</span>
              </div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.82)", marginTop: 6 }}>&ldquo;lawn care near me&rdquo; in Cary, plus the AI answer customers now trust.</div>
            </GlassBadge>
          }
        />
      </Frame>
      <Caption>Get found first in Google Maps, local search, and the AI answers for the searches that bring calls.</Caption>
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
  ["Revenue", "$11.8k", GOOD],
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
function Strategy() {
  return (
    <div>
      <Labels left="Fractional CMO & strategy" right="quarterly plan" />
      <Frame>
        <ImageCoverflow
          images={rot(4)}
          overlay={
            <GlassBadge>
              <div className="mono" style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 5 }}>North-star metric</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>Booked revenue</div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.82)", marginTop: 6 }}>Foundation → Visibility → Demand → Scale, one team accountable for the number.</div>
            </GlassBadge>
          }
        />
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
