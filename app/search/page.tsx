"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, CarIcon, Bug, ChevronDown, ChevronUp } from "lucide-react"
import TourCard from "@/src/components/TourCard"
import CarCard from "@/src/components/CarCard"
import BookingModal from "@/src/components/BookingModal"
import { toursData } from "@/src/data/toursData"
import { carsData } from "@/src/data/carsData"
import type { Tour } from "@/src/data/toursData"
import type { Car } from "@/src/data/carsData"

function SearchResults() {
  const searchParams = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItemName, setSelectedItemName] = useState<string>("")
  const [filteredTours, setFilteredTours] = useState<Tour[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [showDebug, setShowDebug] = useState(true)
  const [showTourData, setShowTourData] = useState(false)
  const [showCarData, setShowCarData] = useState(false)

  // Get search parameters
  const searchType = searchParams.get("type") || "tour"
  const location = searchParams.get("location") || ""
  const fromDate = searchParams.get("fromDate") || ""
  const toDate = searchParams.get("toDate") || ""

  useEffect(() => {
    console.log("Search params:", { searchType, location, fromDate, toDate })
    console.log("Tours data available:", toursData.length)
    console.log("Cars data available:", carsData.length)

    // Filter tours based on search criteria
    if (searchType === "tour") {
      let filtered = [...toursData] // Create a copy to avoid mutation

      console.log("Initial tours count:", filtered.length)

      // If location is provided, filter by it, otherwise show all tours
      if (location && location.trim()) {
        filtered = filtered.filter(
          (tour) =>
            (tour.destination && tour.destination.toLowerCase().includes(location.toLowerCase())) ||
            (tour.title && tour.title.toLowerCase().includes(location.toLowerCase())) ||
            (tour.shortDescription && tour.shortDescription.toLowerCase().includes(location.toLowerCase())) ||
            (tour.category && tour.category.toLowerCase().includes(location.toLowerCase())),
        )
        console.log("Tours after location filter:", filtered.length)
      }

      // If no location provided, show all tours
      setFilteredTours(filtered)
      console.log("Final filtered tours:", filtered.length)
    }

    // Filter cars based on search criteria
    if (searchType === "car") {
      let filtered = [...carsData] // Create a copy to avoid mutation

      console.log("Initial cars count:", filtered.length)

      // If location is provided, filter by it, otherwise show all cars
      if (location && location.trim()) {
        filtered = filtered.filter(
          (car) =>
            (car.name && car.name.toLowerCase().includes(location.toLowerCase())) ||
            (car.shortDescription && car.shortDescription.toLowerCase().includes(location.toLowerCase())) ||
            (car.specifications.model && car.specifications.model.toLowerCase().includes(location.toLowerCase())) ||
            (car.specifications.fuelType && car.specifications.fuelType.toLowerCase().includes(location.toLowerCase())),
        )
        console.log("Cars after location filter:", filtered.length)
      }

      // If no location provided, show all cars
      setFilteredCars(filtered)
      console.log("Final filtered cars:", filtered.length)
    }
  }, [searchType, location, fromDate, toDate])

  const handleOpenBookingModal = (itemName: string) => {
    setSelectedItemName(itemName)
    setIsModalOpen(true)
  }

  const handleCloseBookingModal = () => {
    setIsModalOpen(false)
    setSelectedItemName("")
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const resultsCount = searchType === "tour" ? filteredTours.length : filteredCars.length

  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-[#001934] hover:text-[#B8860B] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>
            <div className="text-sm text-gray-600">
              {resultsCount} {searchType === "tour" ? "tours" : "cars"} found
            </div>
          </div>
        </div>
      </section>

      {/* Debug Panel */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-[#B8860B] transition-colors"
          >
            <Bug className="w-4 h-4" />
            <span>Debug Information</span>
            {showDebug ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showDebug && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Search Debug Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-yellow-700 mb-1">Search Parameters:</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>
                      <span className="font-medium">Type:</span> {searchType}
                    </li>
                    <li>
                      <span className="font-medium">Location:</span> "{location}"
                    </li>
                    <li>
                      <span className="font-medium">From Date:</span> {fromDate || "Not specified"}
                    </li>
                    <li>
                      <span className="font-medium">To Date:</span> {toDate || "Not specified"}
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-yellow-700 mb-1">Data Statistics:</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>
                      <span className="font-medium">Total Tours:</span> {toursData.length}
                    </li>
                    <li>
                      <span className="font-medium">Filtered Tours:</span> {filteredTours.length}
                    </li>
                    <li>
                      <span className="font-medium">Total Cars:</span> {carsData.length}
                    </li>
                    <li>
                      <span className="font-medium">Filtered Cars:</span> {filteredCars.length}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                {/* Tour Data Debug */}
                <div>
                  <button
                    onClick={() => setShowTourData(!showTourData)}
                    className="flex items-center space-x-2 text-sm font-medium text-yellow-800 hover:text-yellow-900"
                  >
                    <span>Tour Data Sample</span>
                    {showTourData ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showTourData && (
                    <div className="mt-2 bg-white border border-yellow-200 rounded p-3 text-xs overflow-auto max-h-60">
                      <pre>{JSON.stringify(toursData.slice(0, 2), null, 2)}</pre>
                    </div>
                  )}
                </div>

                {/* Car Data Debug */}
                <div>
                  <button
                    onClick={() => setShowCarData(!showCarData)}
                    className="flex items-center space-x-2 text-sm font-medium text-yellow-800 hover:text-yellow-900"
                  >
                    <span>Car Data Sample</span>
                    {showCarData ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showCarData && (
                    <div className="mt-2 bg-white border border-yellow-200 rounded p-3 text-xs overflow-auto max-h-60">
                      <pre>{JSON.stringify(carsData.slice(0, 2), null, 2)}</pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Search Summary */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-[#001934] text-white rounded-lg p-6">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4 font-arizona">
              Search Results for {searchType === "tour" ? "Tours" : "Cars"}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#B8860B]" />
                  <span>Location: {location}</span>
                </div>
              )}
              {fromDate && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#B8860B]" />
                  <span>From: {formatDate(fromDate)}</span>
                </div>
              )}
              {toDate && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#B8860B]" />
                  <span>To: {formatDate(toDate)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchType === "tour" ? (
            filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTours.map((tour, index) => (
                  <div
                    key={tour.id}
                    className="animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TourCard
                      imageUrl={tour.mainImage}
                      title={tour.title}
                      description={tour.shortDescription}
                      ctaText="Book Now"
                      ctaLink={`/tours/${tour.id}`}
                      tourId={tour.id}
                      onBookClick={handleOpenBookingModal}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tours Found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any tours matching your search criteria. Try adjusting your search terms.
                  </p>
                  <Link
                    href="/services/tours"
                    className="inline-flex items-center px-4 py-2 bg-[#B8860B] text-[#001934] font-medium rounded-lg hover:bg-[#B8860B]/90 transition-colors"
                  >
                    View All Tours
                  </Link>
                </div>
              </div>
            )
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car, index) => (
                <div
                  key={car.id}
                  className="animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CarCard car={car} onBookClick={handleOpenBookingModal} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CarIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Cars Found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any cars matching your search criteria. Try adjusting your search terms.
                </p>
                <Link
                  href="/services/car-rental"
                  className="inline-flex items-center px-4 py-2 bg-[#B8860B] text-[#001934] font-medium rounded-lg hover:bg-[#B8860B]/90 transition-colors"
                >
                  View All Cars
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <BookingModal isOpen={isModalOpen} onClose={handleCloseBookingModal} selectedItemName={selectedItemName} />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-16 lg:pt-20 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8860B] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading search results...</p>
          </div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  )
}
