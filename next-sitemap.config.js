/** @type {import('next-sitemap').IConfig} */

/**
 * Sitemap and robots.txt.
 *
 * WWW, MATCHING THE REDIRECT AND THE CANONICALS. Vercel 308-redirects the apex
 * to www, so the sitemap, robots `Host`, every canonical and `metadataBase` in
 * app/layout.tsx all use https://www.simpl.pro. If the apex is ever made
 * primary, change all of them together.
 *
 * Only indexable, canonical URLs belong here. Noindexed or merged pages are
 * excluded so the sitemap never asks Google to index a page that refuses it.
 */
module.exports = {
  siteUrl: "https://www.simpl.pro",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,

  exclude: [
    "/api/*",
    "/t",
    "/demo/*",
    "/results",
    "/audit",
    // Noindexed: /scan (merged into /free-tools via canonical), /start-now
    // (local conversion landing page), /login (utility).
    "/scan",
    "/start-now",
    "/login",
    "/icon.svg",
    "/manifest.webmanifest",
  ],

  // Money pages first in priority; blog posts and the local door after.
  transform: async (config, path) => {
    const top = ["/", "/services/account-engine", "/top-prospects"];
    const high = ["/services", "/industries", "/case-studies/noovis", "/services/crm-follow-up", "/services/ai-receptionist", "/services/local-seo", "/free-tools"];
    const priority = top.includes(path) ? 1.0 : high.includes(path) || path.startsWith("/industries/") ? 0.9 : config.priority;
    return { loc: path, changefreq: config.changefreq, priority, lastmod: new Date().toISOString() };
  },

  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/results", "/audit", "/api/"] },
      // AI search and answer engines are welcome: being cited is the point.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
  },
};
