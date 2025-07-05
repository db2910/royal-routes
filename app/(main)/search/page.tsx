"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, CarIcon, ChevronDown, ChevronUp, Filter, X, DollarSign } from "lucide-react"
import TourCard from "@/src/components/TourCard"
import CarCard from "@/src/components/CarCard"
import BookingModal from "@/src/components/BookingModal"
import { supabase } from "@/src/lib/supabase"

function SearchResults() {
  const searchParams = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    features: [] as string[],
    category: ""
  })

  const searchType = searchParams.get("type") || "tour"
  const location = searchParams.get("location") || ""

  // Available features for filtering
  const availableFeatures = {
    tour: ["Wildlife", "Culture", "Adventure", "Nature", "City", "Mountain", "Lake", "Forest"],
    car: ["AC", "GPS", "Bluetooth", "Leather Seats", "Sunroof", "4WD", "Automatic", "Manual"]
  }

  // Available categories for tours
  const tourCategories = ["Wildlife Safari", "Cultural Tour", "Adventure", "City Tour", "Nature Walk", "Mountain Trek"]

  useEffect(() => {
    fetchSearchResults()
  }, [searchType, location, filters])

  async function fetchSearchResults() {
      setLoading(true)
    
    try {
      let query = supabase
        .from(searchType === "tour" ? "tours" : "cars")
        .select("*")
        .eq("is_active", true)

      // Location filter
      if (location && location.trim()) {
        if (searchType === "tour") {
          query = query.or(`destination.ilike.%${location}%,title.ilike.%${location}%,short_description.ilike.%${location}%,category.ilike.%${location}%`)
        } else {
          query = query.or(`name.ilike.%${location}%,short_description.ilike.%${location}%`)
        }
      }

      // Price filters - use correct field names
      if (filters.minPrice) {
        const priceField = searchType === "tour" ? "price_per_person" : "price_per_day"
        query = query.gte(priceField, parseFloat(filters.minPrice))
      }
      if (filters.maxPrice) {
        const priceField = searchType === "tour" ? "price_per_person" : "price_per_day"
        query = query.lte(priceField, parseFloat(filters.maxPrice))
      }

      // Category filter (tours only)
      if (searchType === "tour" && filters.category) {
        query = query.eq("category", filters.category)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching search results:", error)
        setResults([])
      } else {
        // Client-side feature filtering (since features are stored as arrays)
        let filteredResults = data || []
        
        if (filters.features.length > 0) {
          filteredResults = filteredResults.filter(item => {
            const itemFeatures = searchType === "tour" 
              ? (item.features || [])
              : (item.features || [])
            
            return filters.features.every(feature => 
              itemFeatures.some((itemFeature: any) => 
                itemFeature.toLowerCase().includes(feature.toLowerCase())
              )
        )
          })
    }

        // Transform car data to match CarCard component expectations
    if (searchType === "car") {
          filteredResults = filteredResults.map(car => ({
            ...car,
            mainImage: car.main_image,
            shortDescription: car.short_description,
            pricePerDay: car.price_per_day,
            galleryImages: car.gallery_images || [],
            capabilities: car.capabilities || []
          }))
        }
        
        setResults(filteredResults)
    }
    } catch (error) {
      console.error("Error in fetchSearchResults:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleOpenBookingModal = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleCloseBookingModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const handleFeatureToggle = (feature) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const clearFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      features: [],
      category: ""
    })
  }

  const hasActiveFilters = filters.minPrice || filters.maxPrice || filters.features.length > 0 || filters.category

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
              {results.length} {searchType === "tour" ? "tours" : "cars"} found
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
          <button
              onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-[#B8860B] transition-colors"
          >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
                <span>Clear Filters</span>
              </button>
            )}
                </div>

          {showFilters && (
            <div className="mt-4 space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        placeholder="0"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-[#B8860B] focus:border-[#B8860B]"
                      />
                    </div>
                  </div>
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        placeholder="1000"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-[#B8860B] focus:border-[#B8860B]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Filter (Tours only) */}
              {searchType === "tour" && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#B8860B] focus:border-[#B8860B]"
                  >
                    <option value="">All Categories</option>
                    {tourCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Features Filter */}
                <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {availableFeatures[searchType].map(feature => (
                    <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.features.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="rounded border-gray-300 text-[#B8860B] focus:ring-[#B8860B]"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8860B] mx-auto mb-4"></div>
              <p className="text-xl text-gray-500">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((item) => (
                searchType === "tour" ? (
                  <TourCard 
                    key={item.id} 
                    imageUrl={item.main_image || "/placeholder.svg"}
                    title={item.title}
                    description={item.short_description}
                    ctaText="Book"
                    ctaLink={`/tours/${item.id}`}
                    tourId={item.id}
                    tour={item}
                    onBookClick={handleOpenBookingModal} 
                  />
                ) : (
                  <CarCard key={item.id} car={item} onBookClick={handleOpenBookingModal} />
                )
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No {searchType === "tour" ? "tours" : "cars"} found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search criteria or filters to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 bg-[#B8860B] text-white rounded-md hover:bg-[#A67A0A] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={handleCloseBookingModal} 
        itemName={selectedItem?.title || selectedItem?.name || ""}
        price={searchType === "tour" ? (selectedItem?.price_per_person || 0) : (selectedItem?.price_per_day || 0)}
        type={searchType}
      />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}
