/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://simpl.pro',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
}
