import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Renamed 2026-07-19 to match the "Start Now" CTA it's linked from.
      // Permanent redirect so any bookmarked/shared/indexed link still lands.
      { source: "/what-am-i-missing", destination: "/start-now", permanent: true },

      // Deprecated 2026-07-21: the four deep-dive pages were folded into the
      // six service pages. 301 so any indexed URL passes its SEO to the new
      // home instead of 404ing.
      // /performance re-pointed 2026-10-22 so it lands in one hop now that
      // /services/quick-wins itself redirects (see below).
      { source: "/performance", destination: "/free-tools", permanent: true },
      { source: "/discoverability", destination: "/services/local-seo", permanent: true },
      { source: "/reputation", destination: "/services/local-seo", permanent: true },
      { source: "/spend", destination: "/services/paid-ads", permanent: true },

      // Revamp 2026-10-22 (Account Engine positioning, docs/REVAMP_PLAN.md §9).
      // Retired pages 301 to their closest new home so indexed URLs keep their
      // equity instead of 404ing.
      // 2026-10-22 (second pass): prices are off the site, so /pricing and the
      // old /start tier grid land on the Account Engine page; /top-25 became
      // /top-prospects; the noindexed /success-stories placeholder became the
      // Noovis case study.
      { source: "/start", destination: "/services/account-engine", permanent: true },
      { source: "/pricing", destination: "/services/account-engine", permanent: true },
      { source: "/top-25", destination: "/top-prospects", permanent: true },
      { source: "/success-stories", destination: "/case-studies/noovis", permanent: true },
      { source: "/case-studies", destination: "/case-studies/noovis", permanent: false },
      { source: "/contact", destination: "/book", permanent: true },
      { source: "/how-it-works", destination: "/services/account-engine", permanent: true },
      { source: "/services/quick-wins", destination: "/free-tools", permanent: true },
      { source: "/services/organic-growth", destination: "/services/local-seo", permanent: true },
      { source: "/services/strategy", destination: "/services", permanent: true },
      { source: "/services/ai-quoting-agent", destination: "/services/ai-receptionist", permanent: true },
    ];
  },
};

export default nextConfig;
