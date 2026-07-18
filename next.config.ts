import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Renamed 2026-07-19 to match the "Start Now" CTA it's linked from.
      // Permanent redirect so any bookmarked/shared/indexed link still lands.
      { source: "/what-am-i-missing", destination: "/start-now", permanent: true },
    ];
  },
};

export default nextConfig;
