"use client"

import { useState, useEffect } from "react"
import CarCard from "@/src/components/CarCard"
import BookingModal from "@/src/components/BookingModal"
import { supabase } from "@/src/lib/supabase"
import type { Car } from "@/src/data/carsData"

const INITIAL_ITEMS_DISPLAYED = 6 // Initially show 6 cars (2 rows of 3)
const ITEMS_PER_LOAD = 6 // Load next 6 cars on click

function mapCarDbToCard(car: any): Car {
  // Map features to capabilities with icons
  const iconMap = [
    "users", "fuel", "settings", "snowflake", "wind", "leaf"
  ];
  const capabilities = (car.features || []).map((feature: string, i: number) => ({
    icon: iconMap[i % iconMap.length],
    text: feature,
  }));
  return {
    ...car,
    mainImage: car.main_image,
    galleryImages: car.gallery_images,
    shortDescription: car.short_description,
    detailedDescription: car.detailed_description,
    capabilities,
  };
}

export default function CarRentalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [isLoadingInitial, setIsLoadingInitial] = useState(true) // For initial skeleton
  const [displayedCars, setDisplayedCars] = useState<Car[]>([])
  const [numDisplayed, setNumDisplayed] = useState(INITIAL_ITEMS_DISPLAYED)
  const [allCars, setAllCars] = useState<Car[]>([])

  useEffect(() => {
    setIsLoadingInitial(true)
    async function fetchCars() {
      const { data, error } = await supabase.from("cars").select("*")
      if (!error) {
        const mapped = (data || []).map(mapCarDbToCard)
        // Only show active cars
        const activeCars = mapped.filter(car => car.is_active)
        setAllCars(activeCars)
        setDisplayedCars(activeCars.slice(0, INITIAL_ITEMS_DISPLAYED))
      }
      setIsLoadingInitial(false)
    }
    fetchCars()
  }, [])

  const handleLoadMore = () => {
    const newNumDisplayed = Math.min(numDisplayed + ITEMS_PER_LOAD, allCars.length)
    setNumDisplayed(newNumDisplayed)
    // To ensure smooth animation for newly added items, we can add them incrementally
    // or just update the slice. For simplicity, updating the slice.
    setDisplayedCars(allCars.slice(0, newNumDisplayed))
  }

  const handleOpenBookingModal = (car: Car) => {
    setSelectedCar(car)
    setIsModalOpen(true)
  }

  const handleCloseBookingModal = () => {
    setIsModalOpen(false)
    setSelectedCar(null)
  }

  const allCarsLoaded = numDisplayed >= allCars.length

  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-80 lg:h-96 flex items-center justify-center overflow-hidden animate-in fade-in-0 duration-700">
        <div className="absolute inset-0">
          <img
            src="/images/vehicles/bg3.jpg"
            alt="Our Car Fleet"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#001934]/60"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-arizona">
            Our <span className="text-[#B8860B]">Cars</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto">
            Choose from our diverse fleet of well-maintained vehicles for your perfect journey in Rwanda.
          </p>
        </div>
      </section>

      {/* Car Showcase Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoadingInitial && displayedCars.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(INITIAL_ITEMS_DISPLAYED)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : displayedCars.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedCars.map((car, index) => (
                  <div
                    key={car.id}
                    className="animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
                    style={{
                      animationDelay: `${(index % (displayedCars.length <= INITIAL_ITEMS_DISPLAYED ? INITIAL_ITEMS_DISPLAYED : ITEMS_PER_LOAD)) * 100}ms`,
                    }}
                  >
                    <CarCard car={car} onBookClick={() => handleOpenBookingModal(car)} />
                  </div>
                ))}
              </div>
              {!allCarsLoaded && allCars.length > INITIAL_ITEMS_DISPLAYED && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    className="bg-[#B8860B] text-[#001934] font-semibold py-3 px-8 rounded-lg hover:bg-[#B8860B]/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Load More Cars
                  </button>
                </div>
              )}
            </>
          ) : (
            !isLoadingInitial && (
              <p className="text-center text-gray-600 text-xl">
                No cars available at the moment. Please check back later.
              </p>
            )
          )}
        </div>
      </section>

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseBookingModal}
        itemName={selectedCar?.name || ""}
        price={selectedCar ? parseFloat((selectedCar.pricePerDay || "").replace(/[^0-9.]/g, "")) || 0 : 0}
        type="car"
      />
    </div>
  )
}
