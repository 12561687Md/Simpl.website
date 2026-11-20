import Link from "next/link";
import { SimplWordmark } from "@/components/ui/simpl-brand";
import { INDUSTRIES, SITE } from "../lib/site";

/**
 * Site footer (market intelligence site, 2026-11-20). Every page is linked
 * here so nothing is more than two clicks away. The props are kept for older
 * call sites (blog, scan) that still pass them.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Footer(_props: { showLeadForm?: boolean; sourcePage?: string } = {}) {
  return (
    <footer className="m-foot">
      <div className="m-wrap">
        <div className="grid">
          <div>
            <Link href="/" aria-label="Simpl home" style={{ display: "inline-flex" }}>
              <SimplWordmark size={26} />
            </Link>
            <p className="about">
              Simpl, the market intelligence partner for commercial building services. We find the buildings that need you, before your competitors know they exist.
            </p>
            <div style={{ display: "grid", gap: 8, fontSize: 14.5 }}>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
              <span>Raleigh, NC. Working across the US.</span>
            </div>
          </div>
          <div>
            <div className="lbl">Industries</div>
            <nav aria-label="Industries">
              {INDUSTRIES.map((i) => (
                <Link key={i.href} href={i.href}>{i.label}</Link>
              ))}
            </nav>
          </div>
          <div>
            <div className="lbl">Simpl</div>
            <nav aria-label="Simpl">
              <Link href="/how-it-works">How it works</Link>
              <Link href="/how-it-works#sample">Sample brief</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
          <div>
            <div className="lbl">Get in touch</div>
            <nav aria-label="Get in touch">
              <Link href="/book">See your market</Link>
              <Link href="/login">Client login</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </nav>
          </div>
        </div>
        <div className="bottom">
          <span>&copy; {new Date().getFullYear()} Simpl Systems LLC</span>
          <span>Every number on this site links to the public record it came from.</span>
        </div>
      </div>
    </footer>
  );
}
