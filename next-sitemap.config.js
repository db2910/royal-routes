module.exports = {
  siteUrl: 'https://royalroutestours.com',
  generateRobotsTxt: true,
  exclude: [
    '/admin/*',
    '/api/*',
    '/test-all-forms',
    '/test-email',
    '/test-search',
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/api'] },
    ],
    additionalSitemaps: [
      // Add additional sitemaps here if needed
    ],
  },
}; 