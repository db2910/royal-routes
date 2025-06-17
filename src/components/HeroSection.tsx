"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Calendar, MapPin } from "lucide-react"

export default function HeroSection() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"tour" | "car">("tour")
  const [location, setLocation] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const handleSearch = async () => {
    setIsSearching(true)

    // Build search parameters
    const searchParams = new URLSearchParams()
    searchParams.set("type", activeTab)

    // Always add location, even if empty (this helps with debugging)
    searchParams.set("location", location.trim())

    if (fromDate) {
      searchParams.set("fromDate", fromDate)
    }

    if (toDate) {
      searchParams.set("toDate", toDate)
    }

    console.log("Searching with params:", searchParams.toString()) // Debug log

    // Navigate to search results page
    router.push(`/search?${searchParams.toString()}`)

    // Reset loading state after a short delay
    setTimeout(() => {
      setIsSearching(false)
    }, 1000)
  }

  // Remove this line: const isSearchDisabled = !location.trim() && !fromDate && !toDate

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden mt-16 lg:mt-20">
      {/* Background Video */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/images/hero/Visit.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#001934]/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Headlines */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">Find Next Place To Visit</h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8">
          Discover amazing places in Rwanda at exclusive deals
        </p>

        {/* Tab Toggle - Separated from search container */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab("tour")}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === "tour" ? "bg-[#B8860B] text-[#001934] shadow-md" : "text-white hover:text-gray-200"
              }`}
            >
              Tour
            </button>
            <button
              onClick={() => setActiveTab("car")}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === "car" ? "bg-[#B8860B] text-[#001934] shadow-md" : "text-white hover:text-gray-200"
              }`}
            >
              Car
            </button>
          </div>
        </div>

        {/* Search Container - Now separate */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-4xl mx-auto">
          {/* Search Form */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Location Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === "tour" ? "Destination" : "Car Type/Location"}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={activeTab === "tour" ? "e.g., Volcanoes, Nyungwe, Akagera" : "e.g., SUV, Toyota, Luxury"}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* From Date */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === "tour" ? "Departure Date" : "Pickup Date"}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  min={getCurrentDate()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* To Date */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === "tour" ? "Return Date" : "Return Date"}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  min={fromDate || getCurrentDate()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full bg-[#B8860B] text-[#001934] font-semibold py-3 px-6 rounded-lg hover:bg-[#B8860B]/90 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#001934]"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Search Tips */}
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              {activeTab === "tour"
                ? "Search by destination, tour type, or activity. Leave fields empty to see all tours."
                : "Search by car type, brand, or features. Leave fields empty to see all cars."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
