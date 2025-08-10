const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('Supabase environment variables not found. Creating empty sitemaps...');
  // Create empty sitemaps if no database connection
  const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
  
  fs.writeFileSync(path.join(process.cwd(), 'public', 'tours-sitemap.xml'), emptySitemap);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'cars-sitemap.xml'), emptySitemap);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'accommodations-sitemap.xml'), emptySitemap);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'events-sitemap.xml'), emptySitemap);
  
  console.log('Empty sitemaps created successfully!');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const SITE_URL = 'https://royalroutestours.com';

// Generate XML sitemap content
function generateSitemapXML(urls) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  return xml;
}

// Generate tours sitemap
async function generateToursSitemap() {
  try {
    const { data: tours, error } = await supabase
      .from('tours')
      .select('id, title, updated_at')
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching tours:', error);
      return;
    }

    const urls = tours.map(tour => ({
      loc: `${SITE_URL}/tours/${tour.id}`,
      lastmod: new Date(tour.updated_at || Date.now()).toISOString(),
      changefreq: 'weekly',
      priority: 0.8
    }));

    const xml = generateSitemapXML(urls);
    fs.writeFileSync(path.join(process.cwd(), 'public', 'tours-sitemap.xml'), xml);
    console.log(`Generated tours sitemap with ${urls.length} URLs`);
  } catch (error) {
    console.error('Error generating tours sitemap:', error);
  }
}

// Generate cars sitemap
async function generateCarsSitemap() {
  try {
    const { data: cars, error } = await supabase
      .from('cars')
      .select('id, name, updated_at')
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching cars:', error);
      return;
    }

    const urls = cars.map(car => ({
      loc: `${SITE_URL}/cars/${car.id}`,
      lastmod: new Date(car.updated_at || Date.now()).toISOString(),
      changefreq: 'weekly',
      priority: 0.8
    }));

    const xml = generateSitemapXML(urls);
    fs.writeFileSync(path.join(process.cwd(), 'public', 'cars-sitemap.xml'), xml);
    console.log(`Generated cars sitemap with ${urls.length} URLs`);
  } catch (error) {
    console.error('Error generating cars sitemap:', error);
  }
}

// Generate accommodations sitemap
async function generateAccommodationsSitemap() {
  try {
    const { data: accommodations, error } = await supabase
      .from('accommodations')
      .select('id, name, type, updated_at');

    if (error) {
      console.error('Error fetching accommodations:', error);
      return;
    }

    const urls = accommodations.map(acc => ({
      loc: `${SITE_URL}/accommodation/${acc.type}/${acc.id}`,
      lastmod: new Date(acc.updated_at || Date.now()).toISOString(),
      changefreq: 'weekly',
      priority: 0.7
    }));

    const xml = generateSitemapXML(urls);
    fs.writeFileSync(path.join(process.cwd(), 'public', 'accommodations-sitemap.xml'), xml);
    console.log(`Generated accommodations sitemap with ${urls.length} URLs`);
  } catch (error) {
    console.error('Error generating accommodations sitemap:', error);
  }
}

// Generate events sitemap
async function generateEventsSitemap() {
  try {
    const { data: events, error } = await supabase
      .from('upcoming_events')
      .select('id, title, slug, updated_at')
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching events:', error);
      return;
    }

    const urls = events.map(event => ({
      loc: `${SITE_URL}/UpcomingEvent/${event.slug || event.id}`,
      lastmod: new Date(event.updated_at || Date.now()).toISOString(),
      changefreq: 'daily',
      priority: 0.8
    }));

    const xml = generateSitemapXML(urls);
    fs.writeFileSync(path.join(process.cwd(), 'public', 'events-sitemap.xml'), xml);
    console.log(`Generated events sitemap with ${urls.length} URLs`);
  } catch (error) {
    console.error('Error generating events sitemap:', error);
  }
}

// Main function
async function generateAllSitemaps() {
  console.log('Generating dynamic sitemaps...');
  
  await generateToursSitemap();
  await generateCarsSitemap();
  await generateAccommodationsSitemap();
  await generateEventsSitemap();
  
  console.log('All dynamic sitemaps generated successfully!');
}

// Run if called directly
if (require.main === module) {
  generateAllSitemaps().catch(console.error);
}

module.exports = { generateAllSitemaps };
