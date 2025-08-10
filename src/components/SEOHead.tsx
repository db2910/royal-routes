import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
  structuredData?: any
}

export default function SEOHead({
  title = 'Royal Routes Tours - Premium Travel & Tourism in Rwanda',
  description = 'Discover Rwanda with Royal Routes Tours. Premium car rentals, guided tours, luxury accommodations, and event management services. Experience the best of Rwanda with our expert travel services.',
  keywords = 'Rwanda tours, car rental Rwanda, accommodation Rwanda, event management Rwanda, travel Rwanda, tourism Rwanda, gorilla trekking, Kigali tours, Lake Kivu, Volcanoes National Park',
  image = '/images/hero/hero1.jpg',
  url = 'https://royalroutestours.com',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Royal Routes Tours',
  section,
  tags = ['Rwanda', 'tourism', 'travel', 'tours', 'car rental', 'accommodation'],
  structuredData
}: SEOHeadProps) {
  const fullTitle = title.includes('Royal Routes') ? title : `${title} | Royal Routes Tours`
  const fullUrl = url.startsWith('http') ? url : `https://royalroutestours.com${url}`
  const fullImage = image.startsWith('http') ? image : `https://royalroutestours.com${image}`

  // Default structured data for organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Royal Routes Tours",
    "url": "https://royalroutestours.com",
    "logo": "https://royalroutestours.com/images/logo.jpeg",
    "description": "Premium travel and tourism services in Rwanda",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RW",
      "addressLocality": "Kigali",
      "addressRegion": "Kigali"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+250-788-123-456",
      "contactType": "customer service",
      "availableLanguage": ["English", "French", "Kinyarwanda"]
    },
    "sameAs": [
      "https://facebook.com/royalroutestours",
      "https://instagram.com/royalroutestours",
      "https://twitter.com/royalroutestours"
    ]
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Royal Routes Tours" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@royalroutestours" />
      <meta name="twitter:creator" content="@royalroutestours" />
      
      {/* Additional Meta Tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Manifest */}
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#001934" />
      <meta name="msapplication-TileColor" content="#001934" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData || defaultStructuredData)
        }}
      />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://iqaykxbglqqqtrwdkonn.supabase.co" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//iqaykxbglqqqtrwdkonn.supabase.co" />
    </Head>
  )
}
