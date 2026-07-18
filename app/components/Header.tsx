"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, type Variants } from "framer-motion";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SimplMark, SimplWordmark } from "@/components/ui/simpl-brand";
import { RippleLink } from "@/components/ui/ripple-link";

const NAV_LINKS = [
  { name: "Why SIMPL", href: "/about" },
  { name: "Pricing", href: "/start" },
];

/**
 * Three functional groups instead of one flat list, same shape as
 * Owner.com's mega-menu (see the reference screenshots in chat,
 * 2026-07-17): "start here" vs. "scale up" mirrors the actual compounding
 * stack described in CLAUDE.md, not an arbitrary split.
 *
 * Went with a wider tab over nested sub-dropdowns for the third group
 * (2026-07-17 decision): everything scannable in one hover, no nested
 * hover-chain to lose the pointer on and accidentally close the menu.
 * Nested submenus generally convert worse for exactly that reason.
 */
const SERVICE_GROUPS = [
  {
    label: "Start here",
    items: [
      { href: "/services/website-build", label: "Custom Website", desc: "Free when you start on Team" },
      { href: "/services/quick-wins", label: "Quick Wins & Site Triage", desc: "Fix the leaks first" },
      { href: "/services/local-seo", label: "Local SEO & AI Search Visibility", desc: "Own local search" },
    ],
  },
  {
    label: "Scale up",
    items: [
      { href: "/services/paid-ads", label: "Paid Performance Marketing", desc: "Scale with ads" },
      { href: "/services/organic-growth", label: "Long-Term Organic Growth", desc: "Build lasting authority" },
      { href: "/services/strategy", label: "Fractional CMO & Strategy", desc: "Ongoing oversight" },
    ],
  },
];

/** Component-level add-ons that don't warrant their own page yet, all real
 *  line items already priced out on /start rather than thin duplicate
 *  pages. "SEO + AI Search" was retired here, it and Local SEO & AI Search
 *  Visibility (left column) were two names for one thing (decided
 *  2026-07-17). Personalized Audit is retired too, the breakdown is free
 *  the moment someone unlocks their scan report, not a priced line item. */
const ALSO_AVAILABLE = [
  { label: "Google Business Profile", desc: "from $197/mo" },
  { label: "AI Response/Quoting Agent", desc: "$147 to $447/mo" },
  { label: "Free Strategy Call", desc: "Free, once you've unlocked your scan" },
];

const RESOURCE_LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/success-stories", label: "Success Stories" },
];

const EXPAND_SCROLL_THRESHOLD = 80;

// y/opacity MUST be in both variants: `initial` starts the nav hidden and
// offscreen, and a variant-driven `animate` only animates the keys it declares.
// Omitting them here left the whole header stuck at opacity 0.
const containerVariants: Variants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    // Collapsing to a white puck means the shell colour has to animate too, or
    // the fill would snap while the width springs.
    backgroundColor: "rgba(14,15,16,0.78)",
    transition: { type: "spring", damping: 22, stiffness: 260, staggerChildren: 0.06, delayChildren: 0.12 },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3.75rem",
    backgroundColor: "rgba(255,255,255,1)",
    transition: { type: "spring", damping: 22, stiffness: 260, when: "afterChildren", staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const itemVariants: Variants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 16 } },
  collapsed: { opacity: 0, x: -14, scale: 0.95, transition: { duration: 0.18 } },
};

const collapsedIconVariants: Variants = {
  expanded: { opacity: 0, scale: 0.7, transition: { duration: 0.18 } },
  collapsed: { opacity: 1, scale: 1, transition: { type: "spring", damping: 15, stiffness: 300, delay: 0.12 } },
};

/** Solid gradient panel, brand green, same role Owner fills with a photo or a
 *  flat color card ("We're hiring") when there's no case study to show. */
function FeaturedCard({ eyebrow, title, href }: { eyebrow: string; title: string; href: string }) {
  return (
    <Link
      href={href}
      className="no-underline"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        minWidth: 190,
        height: 180,
        borderRadius: 12,
        padding: 18,
        background: "radial-gradient(120% 140% at 100% 0%, rgba(255,255,255,0.22), transparent 60%), linear-gradient(155deg, #4372FF, #1A3699 70%)",
        border: "1px solid var(--rule)",
      }}
    >
      <div className="mono" style={{ fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", marginBottom: 8 }}>
        {eyebrow}
      </div>
      <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.35, color: "#fff" }}>{title}</div>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isExpanded, setExpanded] = React.useState(true);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [resourcesOpen, setResourcesOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const collapsePos = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      setServicesOpen(false);
      setResourcesOpen(false);
    } else if (!isExpanded && latest < previous && collapsePos.current - latest > EXPAND_SCROLL_THRESHOLD) {
      setExpanded(true);
    }
    if (isExpanded && latest > previous && latest > 150) collapsePos.current = latest;
    lastScrollY.current = latest;
  });

  const expandIfCollapsed = () => {
    if (!isExpanded) setExpanded(true);
  };

  const linkColor = (active: boolean) => (active ? "var(--accent)" : "var(--muted)");
  const linkClass = "no-underline whitespace-nowrap px-3 py-2 text-[15px] font-medium transition-colors hover:text-[var(--fg)]";

  return (
    <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
      <motion.nav
        // No hidden `initial`: the header must render visible server-side. A
        // JS-dependent entrance means no header at all until hydration.
        initial={false}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.08 } : undefined}
        whileTap={!isExpanded ? { scale: 0.95 } : undefined}
        onClick={expandIfCollapsed}
        className={cn(
          "relative flex h-[60px] items-center rounded-full border shadow-lg backdrop-blur-md",
          !isExpanded && "cursor-pointer justify-center overflow-hidden"
        )}
        // backgroundColor is animated by the variants; only the border is set
        // here, and it goes transparent on white so the puck reads as one solid
        // shape rather than a ringed button.
        style={{ borderColor: isExpanded ? "var(--rule)" : "transparent" }}
      >
        {/* Brand mark (left when expanded) */}
        <motion.div variants={itemVariants} className="flex flex-shrink-0 items-center pl-4 pr-1.5">
          <Link href="/" onClick={(e) => e.stopPropagation()} aria-label="SIMPL home" className="flex items-center no-underline">
            <SimplWordmark size={26} />
          </Link>
        </motion.div>

        <div className={cn("flex items-center gap-1.5 pr-2.5 sm:gap-3", !isExpanded && "pointer-events-none")}>
          {/* Services mega-menu */}
          <motion.div
            variants={itemVariants}
            className="relative"
            onMouseEnter={() => isExpanded && setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <span
              onClick={(e) => e.stopPropagation()}
              className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[15px] font-medium transition-colors hover:text-[var(--fg)]"
              style={{ color: pathname.startsWith("/services") ? "var(--accent)" : "var(--muted)" }}
            >
              Services
              <svg width="9" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            {servicesOpen && isExpanded && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3" onClick={(e) => e.stopPropagation()}>
                <div
                  className="flex overflow-hidden rounded-xl border shadow-2xl"
                  style={{ background: "var(--bg-elev)", borderColor: "var(--rule)" }}
                >
                  <div style={{ display: "flex", gap: 36, padding: "20px 24px" }}>
                    {SERVICE_GROUPS.map((group) => (
                      <div key={group.label} style={{ minWidth: 220 }}>
                        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                          {group.label}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {group.items.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              className="no-underline flex items-center justify-between gap-4 rounded-lg px-2.5 py-2.5 text-sm transition-colors hover:bg-[var(--bg-elev-2)]"
                              style={{ color: pathname === s.href ? "var(--accent)" : "var(--fg)" }}
                            >
                              <span>
                                <span style={{ display: "block", fontWeight: 500 }}>{s.label}</span>
                                <span style={{ display: "block", fontSize: 12, color: "var(--muted)", marginTop: 1 }}>{s.desc}</span>
                              </span>
                              <MoveRight className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--muted)" }} />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div style={{ minWidth: 200 }}>
                      <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                        Also available
                      </div>
                      <div className="flex flex-col gap-0.5">
                        {ALSO_AVAILABLE.map((s) => (
                          <Link
                            key={s.label}
                            href="/start#a-la-carte"
                            className="no-underline flex items-center justify-between gap-4 rounded-lg px-2.5 py-2.5 text-sm transition-colors hover:bg-[var(--bg-elev-2)]"
                            style={{ color: "var(--fg)" }}
                          >
                            <span>
                              <span style={{ display: "block", fontWeight: 500 }}>{s.label}</span>
                              <span className="mono" style={{ display: "block", fontSize: 11.5, color: "var(--muted)", marginTop: 1 }}>{s.desc}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ borderLeft: "1px solid var(--rule)", padding: 16, display: "flex", alignItems: "center" }}>
                    <FeaturedCard eyebrow="Not sure where to start?" title="Run your free scan and see what's actually broken." href="/" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {NAV_LINKS.slice(0, 1).map((item) => (
            <motion.div key={item.href} variants={itemVariants}>
              <Link href={item.href} onClick={(e) => e.stopPropagation()} className={linkClass} style={{ color: linkColor(pathname === item.href) }}>
                {item.name}
              </Link>
            </motion.div>
          ))}

          {NAV_LINKS.slice(1).map((item) => (
            <motion.div key={item.href} variants={itemVariants}>
              <Link href={item.href} onClick={(e) => e.stopPropagation()} className={linkClass} style={{ color: linkColor(pathname === item.href) }}>
                {item.name}
              </Link>
            </motion.div>
          ))}

          {/* Resources mega-menu */}
          <motion.div
            variants={itemVariants}
            className="relative"
            onMouseEnter={() => isExpanded && setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <span
              onClick={(e) => e.stopPropagation()}
              className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[15px] font-medium transition-colors hover:text-[var(--fg)]"
              style={{ color: RESOURCE_LINKS.some((r) => r.href === pathname) ? "var(--accent)" : "var(--muted)" }}
            >
              Resources
              <svg width="9" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            {resourcesOpen && isExpanded && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3" onClick={(e) => e.stopPropagation()}>
                <div
                  className="flex overflow-hidden rounded-xl border shadow-2xl"
                  style={{ background: "var(--bg-elev)", borderColor: "var(--rule)" }}
                >
                  <div style={{ minWidth: 190, padding: "20px 12px" }}>
                    {RESOURCE_LINKS.map((r) => (
                      <Link
                        key={r.href}
                        href={r.href}
                        className="no-underline block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--bg-elev-2)]"
                        style={{ color: pathname === r.href ? "var(--accent)" : "var(--fg)" }}
                      >
                        {r.label}
                      </Link>
                    ))}
                  </div>
                  <div style={{ borderLeft: "1px solid var(--rule)", padding: 16, display: "flex", alignItems: "center" }}>
                    <FeaturedCard
                      eyebrow="From the blog"
                      title="How to rank higher on Google Maps, the local 3-pack explained."
                      href="/blog/how-to-rank-higher-on-google-maps"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="pl-1">
            {/* Leads to the diagnosis form (business search + a lead-capture
                form to book a custom plan/call), NOT the pricing tab, on
                purpose. Pricing is one click away from there for anyone who
                already knows what they want, but it's not the default push. */}
            <RippleLink href="/what-am-i-missing" className="cta-primary hidden whitespace-nowrap sm:inline-flex"
              style={{ color: "var(--accent-ink)", padding: "10px 18px", fontSize: 14, fontWeight: 600, borderRadius: 999 }}>
              Start Now
            </RippleLink>
          </motion.div>
        </div>

        {/* Collapsed centered mark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div variants={collapsedIconVariants} animate={isExpanded ? "expanded" : "collapsed"}>
            {/* Inverted: the puck is white once collapsed, and the off-white
                pulse would vanish into it. Sized to fill the puck — the mark is
                portrait (roughly 63x145), so `size` is its height and 32 left it
                only ~14px wide, swimming in a 60px circle. */}
            <SimplMark size={42} inverted />
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
}
