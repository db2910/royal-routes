"use client"
import ServiceCard from "@/src/components/ServiceCard"

const servicesData = [
  {
    id: "car-rental",
    title: "Car Rental",
    description: "Premium vehicle rentals for all your transportation needs across Rwanda",
    imageUrl: "/images/services/car-rental.jpg",
    link: "/services/car-rental",
  },
  {
    id: "event-management",
    title: "Event Management",
    description: "Complete event transportation and logistics management services",
    imageUrl: "/images/services/Event-Management.jpg",
    link: "/services/event-management",
  },
  {
    id: "tours",
    title: "Tours",
    description: "Guided tours and safari experiences showcasing the beauty of Rwanda",
    imageUrl: "/images/services/tours.gif",
    link: "/services/tours",
  },
  {
    id: "accommodation",
    title: "Accommodation",
    description: "Comfortable lodging arrangements and hospitality services",
    imageUrl: "/images/services/accomodation.webp",
    link: "/services/accommodation",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative h-96 lg:h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/vehicles/bg3.jpg"
            alt="Professional Fleet Services"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#001934]/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-arizona">Our Services</h1>
          <p className="text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto">
            Comprehensive transportation solutions tailored to meet your every need in Rwanda
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#001934] mb-4 font-arizona">What We Offer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From premium car rentals to comprehensive event management, we provide exceptional transportation and
              hospitality services across Rwanda
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section - Changed background to grey */}
      <section className="py-16 bg-gray-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-arizona">
            Ready to Experience Premium Service?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Contact us today to discuss your transportation needs and let us create a customized solution for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-[#B8860B] text-[#001934] font-semibold py-3 px-8 rounded-lg hover:bg-[#ae7d0a] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Quote
            </a>
            <a
              href="tel:+250788547440"
              className="border-2 border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#001934] font-semibold py-3 px-8 rounded-lg transition-all duration-300"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
