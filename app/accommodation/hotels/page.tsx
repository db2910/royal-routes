import AccommodationCarousel from "@/src/components/accommodation/AccommodationCarousel"
import AccommodationBookingForm from "@/src/components/accommodation/AccommodationBookingForm"
import { hotelImages } from "@/src/data/accommodationData"

export default function HotelsPage() {
  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-gray-50 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001934] font-arizona mb-4">Hotels</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse a handpicked list of Rwanda's best hotels, from boutique to five-star. Each property is carefully
            selected to ensure exceptional service and memorable experiences.
          </p>
        </div>

        {/* Image Carousel */}
        <div className="mb-12 sm:mb-16">
          <AccommodationCarousel images={hotelImages} showRating={true} />
        </div>

        {/* Booking Form */}
        <div className="mb-12">
          <AccommodationBookingForm type="hotels" />
        </div>

        {/* Disclaimer */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-blue-50 border-l-4 border-[#001934] p-4 sm:p-6 rounded-r-lg">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <strong className="text-[#001934]">Please note:</strong> We do not own these hotels; we provide a seamless
              booking channel so you can focus on your stay. Our partnerships with premium properties ensure you receive
              the best rates and service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
