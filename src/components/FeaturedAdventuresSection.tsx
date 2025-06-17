"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import TourCard from "./TourCard"

interface FeaturedAdventuresSectionProps {
  onBookClick: (tourTitle: string) => void
}

export default function FeaturedAdventuresSection({ onBookClick }: FeaturedAdventuresSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  // Placeholder tour data
  const tours = [
    {
      imageUrl: "/images/tours/volca1.jpg",
      title: "Volcanoes National Park Gorilla Trek",
      description:
        "Experience the magnificent mountain gorillas in their natural habitat. A once-in-a-lifetime adventure.",
      ctaText: "Book",
      ctaLink: "/tours/volcanoes-gorilla-trek",
      tourId: "volcanoes-gorilla-trek",
    },
    {
      imageUrl: "/images/tours/kivu6.jpg",
      title: "Lake Kivu Scenic Escape",
      description:
        "Discover the beauty of Lake Kivu. Enjoy boat rides, stunning sunsets, and peaceful lakeside relaxation.",
      ctaText: "Book",
      ctaLink: "/tours/lake-kivu-scenic-tour",
      tourId: "lake-kivu-scenic-tour",
    },
    {
      imageUrl: "/images/tours/nyungwe1.jpg",
      title: "Nyungwe Forest Canopy Walk & Primates",
      description:
        "Walk among the treetops in one of Africa's oldest rainforests. Spot primates and enjoy breathtaking forest views.",
      ctaText: "Book",
      ctaLink: "/tours/nyungwe-forest-canopy-walk",
      tourId: "nyungwe-forest-canopy-walk",
    },
    {
      imageUrl: "/images/tours/kigali3.jpg",
      title: "Kigali City & Cultural Exploration",
      description:
        "Explore Rwanda's vibrant capital. Visit museums, markets, and learn about the country's rich history and culture.",
      ctaText: "Book",
      ctaLink: "/tours/kigali-city-cultural-tour",
      tourId: "kigali-city-cultural-tour",
    },
  ]

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
            {tours.map((tour, index) => (
              <TourCard
                key={index}
                imageUrl={tour.imageUrl}
                title={tour.title}
                description={tour.description}
                ctaText={tour.ctaText}
                ctaLink={tour.ctaLink}
                tourId={tour.tourId}
                onBookClick={onBookClick}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
