import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { SimplWordmark } from "@/components/ui/simpl-brand";
import { GROWTH_SERVICES, LOCAL_SERVICES, INDUSTRIES, RESOURCES, COMPANY, SITE } from "../lib/site";

/**
 * Site footer (revamp 2026-10-22). Every key page is linked here, so nothing
 * on the site is more than two clicks from anywhere (no orphan pages).
 * The props are kept for older call sites; the slide-in lead form is retired
 * because every page now ends on the FinalCta band.
 */

function Column({ label, links }: { label: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="lbl">{label}</div>
      <nav aria-label={label}>
        {links.map((l) => (
          <Link key={l.href + l.label} href={l.href}>{l.label}</Link>
        ))}
      </nav>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Footer(_props: { showLeadForm?: boolean; sourcePage?: string } = {}) {
  return (
    <footer className="sf">
      <div className="eg-wrap">
        <div className="grid">
          <div>
            <Link href="/" aria-label="Simpl home" style={{ display: "inline-flex" }}>
              <SimplWordmark size={32} />
            </Link>
            <p className="about">
              Simpl is a client acquisition partner for B2B companies. We build your Account Engine: who to call this week, why now and who decides, with a source on every fact.
            </p>
            <div style={{ display: "grid", gap: 10 }}>
              <a href={`mailto:${SITE.email}`} style={{ display: "inline-flex", gap: 10, alignItems: "center" }}><Mail size={15} color="#89CFF0" aria-hidden="true" /> {SITE.email}</a>
              <a href={SITE.phoneHref} style={{ display: "inline-flex", gap: 10, alignItems: "center" }}><Phone size={15} color="#89CFF0" aria-hidden="true" /> {SITE.phone}</a>
              <span style={{ display: "inline-flex", gap: 10, alignItems: "center", color: "#ADACA7", fontSize: 14 }}><MapPin size={15} color="#89CFF0" aria-hidden="true" /> Raleigh, NC. Serving the US.</span>
            </div>
          </div>
          <Column label="B2B growth" links={[...GROWTH_SERVICES, { href: "/top-prospects", label: "See your top prospects" }]} />
          <Column label="Industries" links={[...INDUSTRIES, { href: "/industries", label: "All industries" }]} />
          <Column label="Local businesses" links={[...LOCAL_SERVICES, { href: "/services", label: "All services" }]} />
          <Column label="Company" links={[...RESOURCES, ...COMPANY]} />
        </div>
        <div className="bottom">
          <span>&copy; {new Date().getFullYear()} Simpl Systems LLC. All rights reserved.</span>
          <span style={{ display: "flex", gap: 20 }}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
