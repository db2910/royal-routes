import { Suspense } from "react"
import HeroSection from "@/src/components/HeroSection"
import AboutUsSection from "@/src/components/AboutUsSection"
import FeaturedAdventuresSection from "@/src/components/FeaturedAdventuresSection"
import OurFleetSection from "@/src/components/OurFleetSection"
import PartnersSection from "@/src/components/PartnersSection"
import { createClient } from "@/src/lib/supabase-server"

// Server-side data fetching
async function getHomePageData() {
  const supabase = createClient()
  
  // Fetch cars and tours in parallel
  const [carsResponse, toursResponse] = await Promise.all([
    supabase.from("cars").select("*").eq("is_active", true).limit(6),
    supabase.from("tours").select("id, title, short_description, main_image, is_active").eq("is_active", true).limit(4)
  ])

  return {
    cars: carsResponse.data || [],
    tours: toursResponse.data || []
  }
}

export default async function HomePage() {
  const { cars, tours } = await getHomePageData()

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* About Us Section */}
      <AboutUsSection />

      {/* Featured Adventures */}
      <Suspense fallback={<div className="py-16 lg:py-24 bg-gray-50"><div className="text-center">Loading featured adventures...</div></div>}>
        <FeaturedAdventuresSection initialTours={tours} />
      </Suspense>

      {/* Our Fleet */}
      <Suspense fallback={<div className="py-16 lg:py-24 bg-white"><div className="text-center">Loading fleet...</div></div>}>
        <OurFleetSection initialCars={cars} />
      </Suspense>

      {/* Partners Section */}
      <PartnersSection />
    </div>
  )
}
