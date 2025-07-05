"use client"

import { useState, useEffect } from "react"
import CarCard from "./CarCard"
import { supabase } from "@/src/lib/supabase"
import type { Car } from "@/src/data/carsData"

export default function OurFleetSection() {
  const [visibleCars, setVisibleCars] = useState(6)
  const [cars, setCars] = useState<any[]>([])

  useEffect(() => {
    async function fetchCars() {
      const { data, error } = await supabase.from("cars").select("*")
      if (!error) {
        const iconMap = ["users", "fuel", "settings", "snowflake", "wind", "leaf"]
        const mapped = (data || []).map((car: any) => ({
          ...car,
          mainImage: car.main_image,
          galleryImages: car.gallery_images,
          shortDescription: car.short_description,
          detailedDescription: car.detailed_description,
          capabilities: (car.features || []).map((feature: any, i: any) => ({
            icon: iconMap[i % iconMap.length],
            text: feature,
          })),
        }))
        setCars(mapped.filter(car => car.is_active))
      }
    }
    fetchCars()
  }, [])

  const handleLoadMore = () => {
    setVisibleCars((prev) => Math.min(prev + 2, cars.length))
  }

  const showLoadMore = visibleCars < cars.length

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#001934] mb-4">Our Fleet</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our diverse range of well-maintained vehicles for your perfect journey
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {cars.slice(0, visibleCars).map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* Load More Button */}
        {showLoadMore && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="bg-[#B8860B] text-[#001934] font-semibold py-3 px-8 rounded-lg hover:bg-[#B8860B]/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
