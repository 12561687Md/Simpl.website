"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SimplWordmark } from "@/components/ui/simpl-brand";

/**
 * Full before/after demo for a landscaping business, built to the Simpl website
 * SOP: real NAP, service tabs, service-area pages, reviews, blog, FAQ, a lead
 * form on the homepage, LocalBusiness-style trust, and a "Powered by Simpl"
 * footer. A sticky header toggles the whole page between the dated site and the
 * Simpl site. First per-niche demo template (docs/PRODUCT_VISION_APP.md).
 *
 * Images are Unsplash stock over a green gradient with an onError fallback, so a
 * failed image degrades to the gradient instead of a broken tile.
 */

/* ---- Business identity (NAP) ----
   Fictional demo business. No real street address, phone (555 is the reserved
   fiction prefix), email, or domain, so nothing maps to a real business. */
const NAP = {
  name: "Wildgrove Landscaping",
  city: "Cary",
  state: "NC",
  area: "Cary, NC · Serving the Triangle",
  phone: "(919) 555-0142",
  phoneHref: "tel:+19195550142",
  hours: "Mon–Sat, 7am–6pm",
  since: "2011",
  reviews: 84,
  rating: "4.9",
};

/* Landscaping stock (Unsplash). The mountains/scenery shot was removed, a
   landscaper doesn't do that; these are yard/garden work. onError degrades to
   the green gradient behind each image. */
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1729058015948-592a8e4a1772?w=1600&q=80&auto=format&fit=crop", // grassy backyard
  "https://images.unsplash.com/photo-1722881445875-bdd5f4d9e6fa?w=1600&q=80&auto=format&fit=crop", // backyard deck
  "https://images.unsplash.com/photo-1694885186013-5aa7d91ae5d5?w=1600&q=80&auto=format&fit=crop", // pond + gazebo (park-like)
];
const GALLERY = [
  "https://images.unsplash.com/photo-1749803915455-a7642520d0d3?w=800&q=80&auto=format&fit=crop", // garden in bloom
  "https://images.unsplash.com/photo-1681853108586-f29b4ef5c0fb?w=800&q=80&auto=format&fit=crop", // grassy yard
  "https://images.unsplash.com/photo-1722881445875-bdd5f4d9e6fa?w=800&q=80&auto=format&fit=crop", // backyard deck
  "https://images.unsplash.com/photo-1772040942277-b194d9d0b648?w=800&q=80&auto=format&fit=crop", // hot tub + lush garden
];

const SERVICES = [
  { t: "Lawn Care & Maintenance", b: "Weekly mowing, edging, fertilization, and weed control for the greenest lawn on the street.", img: GALLERY[0] },
  { t: "Hardscaping & Patios", b: "Paver patios, retaining walls, walkways, and fire pits built to last and boost home value.", img: GALLERY[1] },
  { t: "Landscape Design & Install", b: "Full design, planting, and installs that transform your yard from the curb back.", img: GALLERY[3] },
  { t: "Irrigation & Drainage", b: "Sprinkler systems, French drains, and grading that fix standing water for good.", img: GALLERY[2] },
  { t: "Seasonal Cleanups", b: "Spring and fall cleanups, leaf removal, mulch, and bed refreshes.", img: GALLERY[0] },
  { t: "Sod, Seeding & Aeration", b: "New sod, overseeding, and core aeration for a thick, healthy lawn.", img: GALLERY[1] },
];

const AREAS = ["Cary", "Apex", "Morrisville", "Holly Springs", "Fuquay-Varina", "Raleigh", "Garner", "Wake Forest"];

const REVIEWS = [
  { q: "Best lawn on the block now. On time, fair price, and they actually pick up the phone.", n: "Dana R.", city: "Cary" },
  { q: "Fixed our drainage nightmare in a single day. Yard's never looked better.", n: "Mike T.", city: "Apex" },
  { q: "Showed up exactly when they said. We booked them monthly on the spot.", n: "Priya S.", city: "Morrisville" },
];

const POSTS = [
  { t: "How much does landscaping cost in Cary, NC?", d: "A plain-English breakdown of what lawn care, hardscaping, and design actually cost in the Triangle in 2026.", img: GALLERY[1] },
  { t: "The best time to aerate and seed your lawn in North Carolina", d: "Timing is everything for fescue. Here's the window that gives you a thick lawn by spring.", img: GALLERY[3] },
  { t: "5 hardscaping ideas that boost your home's value", d: "Patios, walls, and walkways that pay you back when it's time to sell.", img: GALLERY[2] },
];

const FAQS = [
  { q: "Do you offer free estimates?", a: "Yes. Every project starts with a free, no-pressure estimate, usually same week." },
  { q: "What areas do you serve?", a: `We serve ${AREAS.slice(0, 4).join(", ")}, and the greater Triangle. If you're nearby, just ask.` },
  { q: "Are you licensed and insured?", a: "Fully licensed and insured, with workers' comp on every crew, so you're never liable." },
  { q: "How much does lawn care cost?", a: "Most weekly maintenance plans start around $45–$65 per visit depending on lot size. You'll get an exact quote before anything begins." },
  { q: "How fast can you start?", a: "Most maintenance clients start within the same week; larger installs are scheduled around your timeline." },
];

const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = "none"; };
const G = { green: "#2e7d32", greenDark: "#1b5e20", bright: "#43a047", ink: "#17281b", muted: "#5b6b5e", soft: "#f5f7f1", line: "#e6e9df", gold: "#f5b301" };

/* ---------------- Before/After toggle header ---------------- */
function ToggleHeader({ view, setView }: { view: "after" | "before"; setView: (v: "after" | "before") => void }) {
  const pill = (active: boolean): React.CSSProperties => ({
    padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer", border: 0,
    background: active ? "var(--accent)" : "transparent", color: active ? "var(--accent-ink)" : "var(--fg)",
    transition: "background 160ms ease, color 160ms ease",
  });
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(11,12,13,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--rule)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
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

const wrap: React.CSSProperties = { maxWidth: 1120, margin: "0 auto", padding: "0 24px" };
const eyebrow: React.CSSProperties = { fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: G.green, fontWeight: 700 };

/* ---------------- Homepage lead form ---------------- */
function LeadForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: 12, background: "#fff", border: `1px solid ${G.line}`, borderRadius: 16, padding: "24px 22px", boxShadow: "0 30px 60px -40px rgba(0,0,0,0.3)" }}>
      <div style={{ fontSize: 18, fontWeight: 800, color: G.ink }}>Get your free quote</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <input placeholder="Name" style={inp} />
        <input placeholder="Phone" style={inp} />
      </div>
      <input placeholder="Email" style={inp} />
      <select style={{ ...inp, color: G.muted }} defaultValue="">
        <option value="" disabled>What do you need?</option>
        {SERVICES.map((s) => <option key={s.t}>{s.t}</option>)}
      </select>
      <button type="submit" style={{ marginTop: 4, background: G.green, color: "#fff", border: 0, borderRadius: 10, padding: "13px", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>Request my free quote</button>
      <div style={{ fontSize: 11.5, color: G.muted, textAlign: "center" }}>No obligation. We reply the same day.</div>
    </form>
  );
}
const inp: React.CSSProperties = { border: `1px solid ${G.line}`, borderRadius: 9, padding: "11px 12px", fontSize: 14, color: G.ink, background: "#fff", outline: "none", width: "100%" };

/* ---------------- Wildgrove logo (leaf mark + wordmark) ---------------- */
function WildgroveLogo({ light = false }: { light?: boolean }) {
  const word = light ? "#fff" : G.greenDark;
  const tag = light ? "rgba(255,255,255,0.8)" : G.green;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill={light ? "rgba(255,255,255,0.14)" : "#e7f3e9"} />
        <path d="M16 26C9.5 22.5 8 14.5 16 6.5C24 14.5 22.5 22.5 16 26Z" fill={G.green} />
        <path d="M16 25.5V11.5" stroke={light ? "#0f2a15" : G.greenDark} strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
      </svg>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontSize: 16.5, fontWeight: 800, color: word, letterSpacing: "-0.01em" }}>Wildgrove</div>
        <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.22em", color: tag, marginTop: 2 }}>LANDSCAPING</div>
      </div>
    </div>
  );
}

/* ---------------- The new Simpl site ---------------- */
function NewSite({ embed = false }: { embed?: boolean }) {
  const [idx, setIdx] = useState(0);
  const [resOpen, setResOpen] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % HERO_IMAGES.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "#fff", color: G.ink, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      {/* Nav with NAP + service tabs. In embed mode there's no Simpl toggle bar
          above it, so it sticks to the very top and never collapses to mobile. */}
      <div style={{ position: "sticky", top: embed ? 0 : 57, zIndex: 40, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${G.line}` }}>
        <div style={{ ...wrap, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 24px", gap: 14 }}>
          <WildgroveLogo />
          <div className={embed ? "wg-nav wg-nav-embed" : "wg-nav"} style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <a href="#services" style={{ fontSize: 13.5, color: G.muted, textDecoration: "none" }}>Services</a>
            <a href="#about" style={{ fontSize: 13.5, color: G.muted, textDecoration: "none" }}>About Us</a>
            <a href="#gallery" style={{ fontSize: 13.5, color: G.muted, textDecoration: "none" }}>See Our Work</a>
            {/* Minimalist Resources dropdown: everything else lives here. */}
            <div style={{ position: "relative" }} onMouseEnter={() => setResOpen(true)} onMouseLeave={() => setResOpen(false)}>
              <span style={{ fontSize: 13.5, color: G.muted, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
                Resources
                <svg width="9" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              {resOpen && (
                <div style={{ position: "absolute", top: "100%", left: 0, marginTop: 6, background: "#fff", border: `1px solid ${G.line}`, borderRadius: 10, boxShadow: "0 22px 44px -18px rgba(0,0,0,0.25)", padding: 8, minWidth: 190, display: "grid", gap: 2, zIndex: 50 }}>
                  {[["Service Areas", "#areas"], ["Reviews", "#reviews"], ["Blog", "#blog"], ["FAQ", "#faq"]].map(([t, h]) => (
                    <a key={t} href={h} style={{ display: "block", padding: "9px 11px", borderRadius: 7, fontSize: 13.5, color: G.ink, textDecoration: "none" }}>{t}</a>
                  ))}
                </div>
              )}
            </div>
            <a href="#quote" style={{ background: G.green, color: "#fff", fontSize: 13, fontWeight: 700, padding: "9px 15px", borderRadius: 8, textDecoration: "none" }}>Free quote</a>
          </div>
        </div>
      </div>

      {/* Rotating hero */}
      <section style={{ position: "relative", height: "clamp(460px, 74vh, 660px)", overflow: "hidden", background: `linear-gradient(135deg, ${G.greenDark}, ${G.green})` }}>
        {HERO_IMAGES.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="" onError={hideOnError} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === idx ? 1 : 0, transition: "opacity 1.2s ease" }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,25,12,0.3), rgba(10,25,12,0.76))" }} />
        <div style={{ ...wrap, position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ color: "#c8ecca", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>Landscaping in {NAP.city} &amp; the Triangle</div>
          <h1 style={{ margin: 0, color: "#fff", fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 700, textShadow: "0 2px 18px rgba(0,0,0,0.4)" }}>
            The best lawn on the block, without lifting a finger.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.92)", fontSize: 17, marginTop: 16, lineHeight: 1.5, maxWidth: 540, textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>
            Full-service lawn care, hardscaping, and design in {NAP.city}, {NAP.state}. On-time crews, fair prices, and a yard you'll be proud of.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
            <a href="#quote" style={{ background: G.bright, color: "#06210f", fontSize: 15, fontWeight: 800, padding: "13px 24px", borderRadius: 10, textDecoration: "none", boxShadow: "0 16px 34px -14px rgba(0,0,0,0.6)" }}>Get my free estimate</a>
            <a href={NAP.phoneHref} style={{ border: "1px solid rgba(255,255,255,0.6)", color: "#fff", fontSize: 15, fontWeight: 600, padding: "13px 22px", borderRadius: 10, textDecoration: "none" }}>Call {NAP.phone}</a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 22 }}>
            <span style={{ color: G.gold, fontSize: 16, letterSpacing: 1 }}>★★★★★</span>
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>{NAP.rating} from {NAP.reviews} Google reviews</span>
          </div>
        </div>
      </section>

      {/* Trust bar / about */}
      <div id="about" style={{ background: G.soft, borderBottom: `1px solid ${G.line}` }}>
        <div style={{ ...wrap, display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", padding: "16px 24px", fontSize: 13, fontWeight: 600, color: G.ink }}>
          <span>★ {NAP.rating} ({NAP.reviews} reviews)</span>
          <span>Licensed &amp; insured</span>
          <span>Serving the Triangle since {NAP.since}</span>
          <span>Free same-week estimates</span>
        </div>
      </div>

      {/* Credentials / licensed row */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${G.line}` }}>
        <div style={{ ...wrap, padding: "18px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "12px 22px" }}>
          {["NC Licensed Landscape Contractor", "Licensed & Insured", "Bonded", "EPA WaterSense Partner", "NC Nursery & Landscape Assn. Member"].map((c) => (
            <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 600, color: G.ink }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G.green} strokeWidth="2.4" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section id="services" style={{ ...wrap, padding: "72px 24px" }}>
        <div style={eyebrow}>Our services</div>
        <h2 style={{ margin: "12px 0 0", fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", maxWidth: 640 }}>Everything your property needs, one crew.</h2>
        <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {SERVICES.map((s) => (
            <div key={s.t} style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${G.line}`, background: "#fff", boxShadow: "0 20px 40px -30px rgba(0,0,0,0.3)" }}>
              <div style={{ height: 130, background: `linear-gradient(135deg, ${G.green}, #8fbc8f)` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt="" onError={hideOnError} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "16px 16px 20px" }}>
                <div style={{ fontSize: 16.5, fontWeight: 800, marginBottom: 7 }}>{s.t}</div>
                <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.55, color: G.muted }}>{s.b}</p>
                <span style={{ fontSize: 13, fontWeight: 700, color: G.green }}>Learn more →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service areas */}
      <section id="areas" style={{ background: G.soft, borderTop: `1px solid ${G.line}`, borderBottom: `1px solid ${G.line}` }}>
        <div style={{ ...wrap, padding: "56px 24px" }}>
          <div style={eyebrow}>Service areas</div>
          <h2 style={{ margin: "12px 0 20px", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Proudly serving the Triangle.</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {AREAS.map((a) => (
              <span key={a} style={{ background: "#fff", border: `1px solid ${G.line}`, borderRadius: 999, padding: "9px 16px", fontSize: 13.5, fontWeight: 600, color: G.ink }}>{a}, {NAP.state}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery / see our work */}
      <section id="gallery" style={{ ...wrap, padding: "64px 24px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Recent work</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
          {GALLERY.map((src, i) => (
            <div key={i} style={{ aspectRatio: "4/3", borderRadius: 12, overflow: "hidden", background: `linear-gradient(135deg, ${G.green}, #8fbc8f)` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" onError={hideOnError} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" style={{ background: G.soft, borderTop: `1px solid ${G.line}`, borderBottom: `1px solid ${G.line}` }}>
        <div style={{ ...wrap, padding: "56px 24px" }}>
          <div style={eyebrow}>Reviews</div>
          <h2 style={{ margin: "12px 0 24px", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em" }}>{NAP.rating} stars from {NAP.reviews} happy neighbors.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            {REVIEWS.map((r) => (
              <div key={r.n} style={{ border: `1px solid ${G.line}`, borderRadius: 14, padding: "22px 20px", background: "#fff" }}>
                <div style={{ color: G.gold, fontSize: 14, letterSpacing: 1 }}>★★★★★</div>
                <p style={{ margin: "12px 0 14px", fontSize: 15, lineHeight: 1.55 }}>{r.q}</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: G.muted }}>{r.n} · {r.city}, {NAP.state}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" style={{ ...wrap, padding: "64px 24px" }}>
        <div style={eyebrow}>From the blog</div>
        <h2 style={{ margin: "12px 0 24px", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Lawn &amp; landscape tips for the Triangle.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {POSTS.map((p) => (
            <div key={p.t} style={{ border: `1px solid ${G.line}`, borderRadius: 14, overflow: "hidden", background: "#fff" }}>
              <div style={{ height: 120, background: `linear-gradient(135deg, ${G.greenDark}, #8fbc8f)`, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt="" onError={hideOnError} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "16px 18px 20px" }}>
                <div style={{ fontSize: 15.5, fontWeight: 800, lineHeight: 1.3, marginBottom: 8 }}>{p.t}</div>
                <p style={{ margin: "0 0 10px", fontSize: 13, lineHeight: 1.55, color: G.muted }}>{p.d}</p>
                <span style={{ fontSize: 13, fontWeight: 700, color: G.green }}>Read more →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: G.soft, borderTop: `1px solid ${G.line}` }}>
        <div style={{ ...wrap, padding: "56px 24px", maxWidth: 820 }}>
          <div style={eyebrow}>FAQ</div>
          <h2 style={{ margin: "12px 0 24px", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Questions we hear a lot.</h2>
          <div style={{ display: "grid", gap: 1, background: G.line, border: `1px solid ${G.line}`, borderRadius: 12, overflow: "hidden" }}>
            {FAQS.map((f) => (
              <div key={f.q} style={{ background: "#fff", padding: "18px 20px" }}>
                <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 7 }}>{f.q}</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: G.muted }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form (bottom of homepage) */}
      <section id="quote" style={{ background: `linear-gradient(135deg, ${G.greenDark}, ${G.green})`, color: "#fff" }}>
        <div style={{ ...wrap, padding: "64px 24px", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,420px)", gap: 44, alignItems: "center" }} className="wg-quote">
          <div>
            <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Ready for the best yard on the block?</h2>
            <p style={{ margin: "14px 0 0", maxWidth: 440, fontSize: 16, color: "rgba(255,255,255,0.9)" }}>Free estimate, same-week scheduling. Serving {NAP.city}, {NAP.state} and the greater Triangle.</p>
            <div style={{ marginTop: 20, fontSize: 14.5, lineHeight: 1.9 }}>
              <div>📍 {NAP.area}</div>
              <div>📞 <a href={NAP.phoneHref} style={{ color: "#fff" }}>{NAP.phone}</a></div>
              <div>🕑 {NAP.hours}</div>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* Footer with full NAP + Powered by Simpl */}
      <footer style={{ background: "#0f1a12", color: "rgba(255,255,255,0.72)" }}>
        <div style={{ ...wrap, padding: "44px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 28 }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, marginBottom: 10 }}>{NAP.name}</div>
            <div style={{ fontSize: 13, lineHeight: 1.7 }}>
              {NAP.area}<br />
              <a href={NAP.phoneHref} style={{ color: "#c8ecca" }}>{NAP.phone}</a><br />
              {NAP.hours}
            </div>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Services</div>
            <div style={{ fontSize: 13, lineHeight: 1.9 }}>{SERVICES.slice(0, 5).map((s) => <div key={s.t}>{s.t}</div>)}</div>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Service areas</div>
            <div style={{ fontSize: 13, lineHeight: 1.9 }}>{AREAS.slice(0, 6).map((a) => <div key={a}>{a}, {NAP.state}</div>)}</div>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Company</div>
            <div style={{ fontSize: 13, lineHeight: 1.9 }}><div>Reviews</div><div>Blog</div><div>FAQ</div><div>Contact</div></div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ ...wrap, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, fontSize: 12 }}>
            <span>© {new Date().getFullYear()} {NAP.name}. All rights reserved.</span>
            <a href="https://simpl.pro" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,0.85)", textDecoration: "none" }}>
              Powered by <SimplWordmark size={15} />
            </a>
          </div>
        </div>
      </footer>
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
          <div style={{ width: 300, maxWidth: "100%", height: 180, background: "#dcdcd0", border: "1px solid #b9b9a8", display: "flex", alignItems: "center", justifyContent: "center", color: "#8a8a78", fontSize: 13 }}>image not found</div>
          <div style={{ flex: 1, minWidth: 220, fontSize: 13.5, lineHeight: 1.6 }}>
            We are a family owned lawn care business serving the local area since 1998. We do mowing, trees, and more. Best prices in town!! Please call us today for a FREE estimate.
            <div style={{ marginTop: 14, background: "linear-gradient(#f0d000,#d4a000)", border: "1px solid #a80", color: "#3a2f00", padding: "8px 16px", fontSize: 14, fontWeight: 700, display: "inline-block" }}>CLICK HERE!!!</div>
          </div>
        </div>
        <ul style={{ marginTop: 24, fontSize: 13, color: "#444", lineHeight: 1.9 }}>
          <li>&#9642; Mowing and lawn cutting</li><li>&#9642; Tree trimming</li><li>&#9642; Leaf removal</li><li>&#9642; And more!!!</li>
        </ul>
        <div style={{ marginTop: 30, fontSize: 11, color: "#999", fontStyle: "italic", borderTop: "1px solid #ddd", paddingTop: 12 }}>© 2011 Green Lawns Landscaping · Best viewed in Internet Explorer 8 · Hit counter: 04127</div>
      </div>
    </div>
  );
}

export default function WildgroveDemo({ embed = false }: { embed?: boolean }) {
  const [view, setView] = useState<"after" | "before">("after");
  // Embed mode (iframed on the homepage showcase): just the real site, no
  // Simpl Before/After bar.
  if (embed) {
    return <div style={{ minHeight: "100vh", background: "#fff" }}><NewSite embed /></div>;
  }
  return (
    <div style={{ minHeight: "100vh", background: "#0B0C0D" }}>
      <ToggleHeader view={view} setView={setView} />
      {view === "after" ? <NewSite /> : <OldSite />}
    </div>
  );
}
