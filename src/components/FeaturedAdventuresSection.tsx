"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import TourCard from "./TourCard"
import { supabase } from "@/src/lib/supabase"

export default function FeaturedAdventuresSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [tours, setTours] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("tours")
        .select("id, title, short_description, main_image, is_active")
        .eq("is_active", true)
        .limit(4)
      if (!error && data) {
        setTours(data)
      } else {
        setTours([])
      }
      setLoading(false)
    }
    fetchTours()
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#001934] mb-4">Featured Adventures</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked tours and discover the beauty of Rwanda
          </p>
        </div>

        {/* Tours Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200 hidden lg:block"
          >
            <ChevronLeft className="w-6 h-6 text-[#001934]" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200 hidden lg:block"
          >
            <ChevronRight className="w-6 h-6 text-[#001934]" />
          </button>

          {/* Scrollable Tours */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loading ? (
              <div className="w-full flex justify-center items-center min-h-[200px]">
                <span className="text-gray-500 text-lg">Loading featured tours...</span>
              </div>
            ) : tours.length === 0 ? (
              <div className="w-full flex justify-center items-center min-h-[200px]">
                <span className="text-gray-500 text-lg">No featured tours available.</span>
              </div>
            ) : (
              tours.map((tour) => (
              <TourCard
                  key={tour.id}
                  imageUrl={tour.main_image || "/placeholder.svg"}
                title={tour.title}
                  description={tour.short_description}
                  ctaText="Book"
                  ctaLink={`/tours/${tour.id}`}
                  tourId={tour.id}
                  tour={tour}
              />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
