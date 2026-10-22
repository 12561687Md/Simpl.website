/** @type {import('next-sitemap').IConfig} */

/**
 * Sitemap and robots.txt.
 *
 * WWW, MATCHING THE REDIRECT AND THE CANONICALS. This was the apex,
 * https://simpl.pro, while Vercel 308-redirects the apex to www. So every one
 * of the forty URLs in the sitemap pointed at a URL that immediately bounces,
 * and robots.txt declared the apex as `Host`. A sitemap is a list of the URLs
 * you want indexed; filling it with redirects asks Google to make a round trip
 * on every page and weakens the signal for all of them.
 *
 * If the apex is ever made primary instead, this file, `metadataBase` in
 * app/layout.tsx, and the Vercel domain setting all change together. Any one of
 * them alone reintroduces the same split.
 */
module.exports = {
  siteUrl: "https://www.simpl.pro",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,

  /**
   * Excluded, each for its own reason:
   *
   *   /api/*        not pages.
   *   /start        superseded by /start-now.
   *   /results      a client-rendered scan result. Its content depends entirely
   *                 on whose website was scanned, so there is nothing stable to
   *                 index, and it is explicitly noindexed in
   *                 app/results/layout.tsx. Listing a noindexed URL in a
   *                 sitemap is a contradiction: it asks Google to index a page
   *                 that refuses to be indexed.
   *   /audit        same shape, same reason.
   *   icon/manifest not pages at all. next-sitemap treats them as routes, and
   *                 they were sitting in the sitemap as though they were
   *                 content.
   */
  exclude: [
    "/api/*",
    "/start",
    // Revamp 2026-10-22: retired routes (301s in next.config.ts), the noindexed
    // success-stories placeholder, the demo and the /t business-card redirect.
    "/how-it-works",
    "/success-stories",
    "/demo/*",
    "/t",
    "/results",
    "/audit",
    "/icon.svg",
    "/manifest.webmanifest",
  ],

  // Money pages first in priority; blog posts and easy-win services after.
  transform: async (config, path) => {
    const top = ["/", "/services/account-engine", "/pricing", "/top-25"];
    const high = ["/services", "/industries", "/services/crm-follow-up", "/services/ai-receptionist", "/free-tools"];
    const priority = top.includes(path) ? 1.0 : high.includes(path) || path.startsWith("/industries/") ? 0.9 : config.priority;
    return { loc: path, changefreq: config.changefreq, priority, lastmod: new Date().toISOString() };
  },

  // /top-25 reads ?plan= so it renders on demand, which next-sitemap skips.
  additionalPaths: async (config) => [await config.transform(config, "/top-25")],

  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      { userAgent: "*", allow: "/" },
      /* Held back by robots as well as by each page's own meta, so a crawler
         that arrives via a shared link does not spend budget on an unbounded
         set of one-off scan results. */
      { userAgent: "*", disallow: ["/results", "/audit", "/api/"] },
    ],
  },
};
