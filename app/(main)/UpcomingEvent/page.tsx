"use client"

import { useState, useEffect, useMemo } from "react"
import EventCard from "@/src/components/EventCard"
import EventSearchBar from "@/src/components/EventSearchBar"
import EventCategoriesFilter from "@/src/components/EventCategoriesFilter"
import Pagination from "@/src/components/Pagination"
import { supabase } from "@/src/lib/supabase"

interface Event {
  id: string
  title: string
  date: string
  description: string
  cover_image: string
  gallery_images: string[]
  category: string
  price_per_person?: number
  duration?: string
  destination?: string
  itinerary?: any[]
  included?: string[]
  excluded?: string[]
  is_active?: boolean
}

const ITEMS_PER_PAGE = 3

export default function UpcomingEventPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("upcoming_events")
        .select("*")
        .eq("is_active", true)
        .order("date", { ascending: true })
      
      if (!error && data) {
        setEvents(data)
      } else {
        console.error("Error fetching events:", error)
        setEvents([])
      }
      setLoading(false)
    }
    fetchEvents()
  }, [])

  // Get unique categories from events
  const allCategoriesList = useMemo(() => {
    const categories = events.map(event => event.category)
    return Array.from(new Set(categories))
  }, [events])

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.destination && event.destination.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category)
      return matchesSearch && matchesCategory
    })
  }, [events, searchQuery, selectedCategories])

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE)
  const currentEvents = filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1) // Reset to first page on filter change
  }, [searchQuery, selectedCategories])

  if (loading) {
    return (
      <div className="bg-white min-h-screen pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8860B] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen pt-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#001934] font-arizona">Upcoming Events</h1>
          <p className="text-lg text-gray-600 mt-2">Discover exciting tours and adventures awaiting you in Rwanda.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar: Search and Filters */}
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 h-fit">
            <EventSearchBar onSearchSubmit={setSearchQuery} />
            <EventCategoriesFilter onFilterChange={setSelectedCategories} allCategories={allCategoriesList} />
          </aside>

          {/* Main Content: Event Cards and Pagination */}
          <main className="w-full lg:w-3/4">
            {currentEvents.length > 0 ? (
              <div className="space-y-8">
                {currentEvents.map((event) => (
                  <EventCard key={event.id} event={{
                    ...event,
                    pricePerPerson: event.price_per_person 
                      ? `$${event.price_per_person.toLocaleString()} / Per person sharing`
                      : "Price on request"
                  }} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">No events found matching your criteria.</p>
              </div>
            )}

            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
