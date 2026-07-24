import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { SimplWordmark } from "@/components/ui/simpl-brand";
import PreFooterCTA from "./PreFooterCTA";

/**
 * Site footer. Structure adapted from the mvpblocks 4-column reference
 * (app/components/ui/footer-column.tsx) but rebuilt on the Simpl theme with
 * real links, contact, and the brand mark, inline styles + CSS vars to match
 * the rest of the site.
 *
 * `showLeadForm` (default true) renders the slide-in <PreFooterCTA> above the
 * footer on key pages; pages that ARE a form (start-now) or don't want it
 * (legal) pass showLeadForm={false}.
 */

const linkStyle: React.CSSProperties = { color: "var(--muted)", textDecoration: "none", fontSize: 14, lineHeight: 1.5 };
const colLabel: React.CSSProperties = { fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)", marginBottom: 18 };

const PRODUCT = [
  { label: "Free Scan", href: "/scan" },
  { label: "Why Simpl", href: "/about" },
  { label: "Results", href: "/results" },
];
const SERVICES = [
  { label: "Custom Website", href: "/services/website-build" },
  { label: "Quick Wins", href: "/services/quick-wins" },
  { label: "Local SEO", href: "/services/local-seo" },
  { label: "Paid Ads", href: "/services/paid-ads" },
  { label: "Organic Growth", href: "/services/organic-growth" },
  { label: "Fractional CMO", href: "/services/strategy" },
];
const RESOURCES = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Success Stories", href: "/success-stories" },
];

function Column({ label, links }: { label: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="mono" style={colLabel}>{label}</div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="footer-link" style={linkStyle}>{l.label}</Link>
        ))}
      </nav>
    </div>
  );
}

export default function Footer({ showLeadForm = true, sourcePage }: { showLeadForm?: boolean; sourcePage?: string }) {
  return (
    <>
      {showLeadForm && <PreFooterCTA sourcePage={sourcePage} />}
      <footer style={{ borderTop: "1px solid var(--rule)", background: "var(--bg-soft)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 32px 40px" }}>
          <div className="grid-footer" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
            {/* Brand + contact */}
            <div>
              <Link href="/" aria-label="Simpl home" style={{ textDecoration: "none", display: "inline-flex" }}>
                <SimplWordmark size={34} />
              </Link>
              <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, maxWidth: 300, margin: "18px 0 22px" }}>
                Your digital presence, handled. One free scan to see where you stand, one team to win you more customers.
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 11 }}>
                <li>
                  <a href="mailto:team@simpl.pro" className="footer-contact" style={{ display: "flex", alignItems: "center", gap: 10, ...linkStyle }}>
                    <Mail size={16} style={{ color: "var(--accent)", flexShrink: 0 }} /> team@simpl.pro
                  </a>
                </li>
                <li>
                  <a href="tel:+19194289452" className="footer-contact" style={{ display: "flex", alignItems: "center", gap: 10, ...linkStyle }}>
                    <Phone size={16} style={{ color: "var(--accent)", flexShrink: 0 }} /> (919) 428-9452
                  </a>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 10, ...linkStyle }}>
                  <MapPin size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
                  <address style={{ fontStyle: "normal", margin: 0 }}>Raleigh, NC · Serving the US</address>
                </li>
              </ul>
            </div>

            <Column label="Product" links={PRODUCT} />
            <Column label="Services" links={SERVICES} />
            <Column label="Resources" links={RESOURCES} />
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--fg-dim)", letterSpacing: "0.04em" }}>
              &copy; {new Date().getFullYear()} Simpl. All rights reserved.
            </div>
            <div style={{ display: "flex", gap: 22 }}>
              <Link href="/privacy" className="footer-link" style={{ ...linkStyle, fontSize: 12.5 }}>Privacy</Link>
              <Link href="/terms" className="footer-link" style={{ ...linkStyle, fontSize: 12.5 }}>Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
