"use client"

export default function PartnersSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-arizona mb-4">
            <span className="text-[#001934]">Our </span>
            <span className="text-[#B8860B]">Partners</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proudly partnered with Rwanda's leading tourism organizations to deliver exceptional experiences
          </p>
        </div>

        {/* Partners Grid */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {/* RDB Partner */}
          <div className="group flex flex-col items-center">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mb-4 transition-all duration-300 group-hover:scale-105">
              {/* Dark/Grayscale Version */}
              <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">
                <img
                  src="/images/partners/RDB.png"
                  alt="Rwanda Development Board"
                  className="w-full h-full object-contain filter grayscale brightness-50"
                />
              </div>
              {/* Color Version */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <img
                  src="/images/partners/RDB.png"
                  alt="Rwanda Development Board"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#001934] group-hover:text-[#B8860B] transition-colors duration-300">
              Rwanda Development Board
            </h3>
            <p className="text-sm text-gray-500 text-center mt-1">Official Tourism Partner</p>
          </div>

          {/* Visit Rwanda Partner */}
          <div className="group flex flex-col items-center">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mb-4 transition-all duration-300 group-hover:scale-105">
              {/* Dark/Grayscale Version */}
              <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">
                <img
                  src="/images/partners/visitrwanda.png"
                  alt="Visit Rwanda"
                  className="w-full h-full object-contain filter grayscale brightness-50"
                />
              </div>
              {/* Color Version */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <img
                  src="/images/partners/vist-rwanda.png"
                  alt="Visit Rwanda"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#001934] group-hover:text-[#B8860B] transition-colors duration-300">
              Visit Rwanda
            </h3>
            <p className="text-sm text-gray-500 text-center mt-1">Tourism Promotion Partner</p>
          </div>
        </div>

        {/* Partnership Statement */}
        <div className="text-center mt-12">
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Through our strategic partnerships with RDB and Visit Rwanda, we ensure that every journey meets the highest
            standards of quality, safety, and authenticity that Rwanda is known for.
          </p>
        </div>
      </div>
    </section>
  )
}
