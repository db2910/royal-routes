import AccommodationCarousel from "@/src/components/accommodation/AccommodationCarousel"
import AccommodationBookingForm from "@/src/components/accommodation/AccommodationBookingForm"
import { apartmentImages } from "@/src/data/accommodationData"

export default function ApartmentsPage() {
  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-gray-50 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001934] font-arizona mb-4">Apartments</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from a curated selection of serviced apartments—ideal for families, groups, or extended stays.
            Experience the comfort of home with the convenience of hotel services.
          </p>
        </div>

        {/* Image Carousel */}
        <div className="mb-12 sm:mb-16">
          <AccommodationCarousel images={apartmentImages} />
        </div>

        {/* Booking Form */}
        <div className="mb-12">
          <AccommodationBookingForm type="apartments" />
        </div>

        {/* Disclaimer */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-blue-50 border-l-4 border-[#001934] p-4 sm:p-6 rounded-r-lg">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <strong className="text-[#001934]">Please note:</strong> We do not own these apartments; we simply make
              booking easy so you arrive in Rwanda with everything ready. Our team works with trusted partners to ensure
              quality accommodations that meet our standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
