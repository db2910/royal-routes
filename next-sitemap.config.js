module.exports = {
  siteUrl: 'https://royalroutestours.com',
  generateRobotsTxt: true,
  exclude: [
    '/admin/*',
    '/api/*',
    '/test-all-forms',
    '/test-email',
    '/test-search',
    '/_next/*',
    '/404',
    '/500',
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/api', '/_next', '/test-*'] },
    ],
    additionalSitemaps: [
      'https://royalroutestours.com/sitemap.xml',
      'https://royalroutestours.com/tours-sitemap.xml',
      'https://royalroutestours.com/cars-sitemap.xml',
      'https://royalroutestours.com/accommodations-sitemap.xml',
      'https://royalroutestours.com/events-sitemap.xml',
    ],
  },
  // Custom sitemap generation for dynamic content
  additionalPaths: async (config) => {
    const result = []
    
    // Add priority pages with custom settings
    result.push({
      loc: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    })
    
    result.push({
      loc: '/about',
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    })
    
    result.push({
      loc: '/contact',
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    })
    
    result.push({
      loc: '/services',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    })
    
    result.push({
      loc: '/services/tours',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    })
    
    result.push({
      loc: '/services/car-rental',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    })
    
    result.push({
      loc: '/services/accommodation',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    })
    
    result.push({
      loc: '/services/event-management',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    })
    
    result.push({
      loc: '/accommodation/hotels',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    })
    
    result.push({
      loc: '/accommodation/apartments',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    })
    
    result.push({
      loc: '/UpcomingEvent',
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    })
    
    result.push({
      loc: '/portfolio/events',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    })
    
    result.push({
      loc: '/search',
      changefreq: 'daily',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    })
    
    return result
  },
  // Default settings for all pages
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: true,
  // Add image sitemap support
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
} 