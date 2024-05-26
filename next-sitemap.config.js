// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || "https://www.hackpost.guide",
    changefreq: 'daily',
    priority: 0.7,
    generateRobotsTxt: true, // (optional)
    
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/dashboard', '/onboarding', '/discord', '/enter'],
        },
      ],
      additionalSitemaps: [
      ],
    },
  };