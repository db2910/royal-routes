"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import TourCardHorizontal from "@/src/components/TourCardHorizontal"
import BookingModal from "@/src/components/BookingModal"
import Pagination from "@/src/components/Pagination"
import { supabase } from "@/src/lib/supabase"

const ITEMS_PER_PAGE = 4

export default function ToursPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTour, setSelectedTour] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [tours, setTours] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  console.log("Tours page loaded");

  useEffect(() => {
    async function fetchTours() {
      setLoading(true)
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('is_active', true)
      if (error) {
        console.error("❌ Supabase error:", error)
      } else {
        console.log("✅ Tours fetched from Supabase:", data)
        setTours(data || [])
      }
      setLoading(false)
    }
    fetchTours()
  }, [])

  const handleOpenBookingModal = (tour: any) => {
    console.log("Opening booking modal for tour:", tour);
    setSelectedTour(tour)
    setIsModalOpen(true)
  }

  const handleCloseBookingModal = () => {
    setIsModalOpen(false)
    setSelectedTour(null)
  }

  const totalPages = Math.ceil(tours.length / ITEMS_PER_PAGE)
  const currentTours = tours.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  console.log("Selected tour:", selectedTour);

  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-80 lg:h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/tours/kivu1.jpg"
            alt="Scenic Rwandan landscape for tours"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#001934]/60"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-arizona">
            Discover <span className="text-[#B8860B]">Rwanda</span> With Us
          </h1>
          <p className="text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto">
            Explore breathtaking landscapes, rich culture, and unforgettable wildlife experiences.
          </p>
        </div>
      </section>

      {/* Tours Grid Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#001934] mb-4 font-arizona">Our Signature Tours</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked adventures designed to showcase the best of Rwanda.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">Loading tours from Supabase...</p>
            </div>
          ) : currentTours.length > 0 ? (
            <div className="space-y-8">
              {currentTours.map((tour, index) => (
                <div
                  key={tour.id}
                  className="animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <TourCardHorizontal tour={tour} onBookClick={() => handleOpenBookingModal(tour)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No tours available at the moment. Please check back later.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </div>
      </section>

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseBookingModal}
        itemName={selectedTour?.title || ""}
        price={selectedTour ? parseFloat((selectedTour.price_per_person || "").toString().replace(/[^0-9.]/g, "")) || 0 : 0}
        type="tour"
      />
    </div>
  )
}
