"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, type Variants } from "framer-motion";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { VitalsignIcon } from "@/components/ui/simpl-mark";
import { RippleLink } from "@/components/ui/ripple-link";

const NAV_LINKS = [
  { name: "Free Scan", href: "/scan" },
  { name: "Why SIMPL", href: "/about" },
  { name: "Pricing", href: "/start" },
];

const SERVICE_LINKS = [
  { href: "/services/quick-wins", label: "Quick Wins" },
  { href: "/services/local-seo", label: "Local SEO" },
  { href: "/services/paid-ads", label: "Paid Ads" },
  { href: "/services/organic-growth", label: "Organic Growth" },
  { href: "/services/strategy", label: "Strategy" },
];

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants: Variants = {
  expanded: {
    width: "auto",
    transition: { type: "spring", damping: 22, stiffness: 260, staggerChildren: 0.06, delayChildren: 0.12 },
  },
  collapsed: {
    width: "3rem",
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

export default function Header() {
  const pathname = usePathname();
  const [isExpanded, setExpanded] = React.useState(true);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const collapsePos = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      setServicesOpen(false);
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

  return (
    <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={isExpanded ? "expanded" : "collapsed"}
        whileInView={{ opacity: 1 }}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.08 } : undefined}
        whileTap={!isExpanded ? { scale: 0.95 } : undefined}
        onClick={expandIfCollapsed}
        className={cn(
          "relative flex h-12 items-center rounded-full border shadow-lg backdrop-blur-md",
          !isExpanded && "cursor-pointer justify-center overflow-hidden"
        )}
        style={{ background: "color-mix(in srgb, var(--bg) 78%, transparent)", borderColor: "var(--rule)" }}
      >
        {/* Brand mark (left when expanded) */}
        <motion.div variants={itemVariants} className="flex flex-shrink-0 items-center pl-3 pr-1">
          <Link href="/" onClick={(e) => e.stopPropagation()} aria-label="SIMPL home" className="flex items-center">
            <VitalsignIcon size={24} />
          </Link>
        </motion.div>

        <div className={cn("flex items-center gap-1 pr-2 sm:gap-2", !isExpanded && "pointer-events-none")}>
          {NAV_LINKS.slice(0, 1).map((item) => (
            <motion.div key={item.href} variants={itemVariants}>
              <Link href={item.href} onClick={(e) => e.stopPropagation()}
                className="whitespace-nowrap px-2 py-1 text-sm font-medium transition-colors hover:text-[var(--fg)]"
                style={{ color: linkColor(pathname === item.href) }}>
                {item.name}
              </Link>
            </motion.div>
          ))}

          {/* Services hover dropdown */}
          <motion.div
            variants={itemVariants}
            className="relative"
            onMouseEnter={() => isExpanded && setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <span
              onClick={(e) => e.stopPropagation()}
              className="flex cursor-pointer items-center gap-1 whitespace-nowrap px-2 py-1 text-sm font-medium transition-colors hover:text-[var(--fg)]"
              style={{ color: pathname.startsWith("/services") ? "var(--accent)" : "var(--muted)" }}
            >
              Services
              <svg width="9" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            {servicesOpen && isExpanded && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3" onClick={(e) => e.stopPropagation()}>
                <div className="min-w-[190px] overflow-hidden rounded-xl border p-1 shadow-2xl"
                  style={{ background: "var(--bg-elev)", borderColor: "var(--rule)" }}>
                  {SERVICE_LINKS.map((s) => (
                    <Link key={s.href} href={s.href}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[var(--bg-elev-2)] hover:text-[var(--accent)]"
                      style={{ color: pathname === s.href ? "var(--accent)" : "var(--fg)" }}>
                      <span>{s.label}</span>
                      <MoveRight className="h-3.5 w-3.5" style={{ color: "var(--muted)" }} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {NAV_LINKS.slice(1).map((item) => (
            <motion.div key={item.href} variants={itemVariants}>
              <Link href={item.href} onClick={(e) => e.stopPropagation()}
                className="whitespace-nowrap px-2 py-1 text-sm font-medium transition-colors hover:text-[var(--fg)]"
                style={{ color: linkColor(pathname === item.href) }}>
                {item.name}
              </Link>
            </motion.div>
          ))}

          <motion.div variants={itemVariants} className="pl-1">
            <RippleLink href="/what-am-i-missing" className="cta-primary hidden whitespace-nowrap sm:inline-flex"
              style={{ color: "var(--accent-ink)", padding: "8px 14px", fontSize: 13, fontWeight: 600, borderRadius: 999 }}>
              What am I missing?
            </RippleLink>
          </motion.div>
        </div>

        {/* Collapsed centered mark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div variants={collapsedIconVariants} animate={isExpanded ? "expanded" : "collapsed"}>
            <VitalsignIcon size={24} />
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
}
