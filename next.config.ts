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
      { source: "/performance", destination: "/services/quick-wins", permanent: true },
      { source: "/discoverability", destination: "/services/local-seo", permanent: true },
      { source: "/reputation", destination: "/services/local-seo", permanent: true },
      { source: "/spend", destination: "/services/paid-ads", permanent: true },
    ];
  },
};

export default nextConfig;
