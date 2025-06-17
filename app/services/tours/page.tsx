"use client"

import { useState } from "react"
import Image from "next/image"
import TourCardHorizontal from "@/src/components/TourCardHorizontal"
import BookingModal from "@/src/components/BookingModal"
import { toursData } from "@/src/data/toursData"
import Pagination from "@/src/components/Pagination"

const ITEMS_PER_PAGE = 4 // Reduced since horizontal cards take more vertical space

export default function ToursPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTourTitle, setSelectedTourTitle] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)

  const handleOpenBookingModal = (tourTitle: string) => {
    setSelectedTourTitle(tourTitle)
    setIsModalOpen(true)
  }

  const handleCloseBookingModal = () => {
    setIsModalOpen(false)
    setSelectedTourTitle("")
  }

  const totalPages = Math.ceil(toursData.length / ITEMS_PER_PAGE)
  const currentTours = toursData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

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

          {currentTours.length > 0 ? (
            <div className="space-y-8">
              {currentTours.map((tour, index) => (
                <div
                  key={tour.id}
                  className="animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <TourCardHorizontal tour={tour} onBookClick={handleOpenBookingModal} />
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

      <BookingModal isOpen={isModalOpen} onClose={handleCloseBookingModal} selectedItemName={selectedTourTitle} />
    </div>
  )
}
