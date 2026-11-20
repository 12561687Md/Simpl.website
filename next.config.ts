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
      { source: "/discoverability", destination: "/", permanent: true },
      { source: "/reputation", destination: "/", permanent: true },
      { source: "/spend", destination: "/", permanent: true },

      // Market intelligence site (2026-11-20). Every retired page 301s to its
      // closest new home so indexed URLs keep their equity instead of 404ing.
      // The Noovis case study is NOT redirected to the draft partner page
      // (that page is unlisted until Noovis approves it).
      { source: "/start", destination: "/pricing", permanent: true },
      { source: "/top-25", destination: "/book", permanent: true },
      { source: "/top-prospects", destination: "/book", permanent: true },
      { source: "/contact", destination: "/book", permanent: true },
      { source: "/faq", destination: "/#faq", permanent: true },
      { source: "/success-stories", destination: "/", permanent: true },
      { source: "/case-studies", destination: "/", permanent: true },
      { source: "/case-studies/:path*", destination: "/", permanent: true },
      { source: "/services", destination: "/how-it-works", permanent: true },
      { source: "/services/account-engine", destination: "/how-it-works", permanent: true },
      { source: "/services/:path*", destination: "/", permanent: true },
      { source: "/industries/low-voltage-security", destination: "/industries/low-voltage-fiber-telecom", permanent: true },
      { source: "/industries/building-systems", destination: "/industries", permanent: true },
      { source: "/industries/senior-living-technology", destination: "/industries", permanent: true },
      { source: "/industries/facility-services", destination: "/industries", permanent: true },
      { source: "/industries/healthcare-technology", destination: "/industries", permanent: true },
    ];
  },
};

export default nextConfig;
