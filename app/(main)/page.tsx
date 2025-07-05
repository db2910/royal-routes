"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/src/components/HeroSection"
import AboutUsSection from "@/src/components/AboutUsSection"
import FeaturedAdventuresSection from "@/src/components/FeaturedAdventuresSection"
import OurFleetSection from "@/src/components/OurFleetSection"
import PartnersSection from "@/src/components/PartnersSection"
import BookingModal from "@/src/components/BookingModal"
import { Car } from "@/src/data/carsData"
import { Tour } from "@/src/data/toursData"

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<{
    name: string
    price: number
    type: "car" | "tour"
  } | null>(null)

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Accepts a car or tour object and opens the modal with correct info
  const handleOpenBookingModal = (item: Car | Tour) => {
    if ("pricePerDay" in item) {
      // Car
      const price = typeof item.pricePerDay === "string"
        ? parseFloat(item.pricePerDay.replace(/[^0-9.]/g, ""))
        : item.pricePerDay ?? 0
      setSelectedItem({ name: item.name, price, type: "car" })
    } else if ("pricePerPerson" in item) {
      // Tour
      const price = typeof item.pricePerPerson === "string"
        ? parseFloat(item.pricePerPerson.replace(/[^0-9.]/g, ""))
        : item.pricePerPerson ?? 0
      setSelectedItem({ name: item.title, price, type: "tour" })
    }
    setIsModalOpen(true)
  }

  const handleCloseBookingModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* About Us Section */}
      <AboutUsSection />

      {/* Featured Adventures */}
      <FeaturedAdventuresSection onBookClick={handleOpenBookingModal} />

      {/* Our Fleet */}
      <OurFleetSection onBookClick={handleOpenBookingModal} />

      {/* Partners Section */}
      <PartnersSection />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseBookingModal}
        itemName={selectedItem?.name || ""}
        price={selectedItem?.price ?? 0}
        type={selectedItem?.type || "car"}
      />
    </div>
  )
}
