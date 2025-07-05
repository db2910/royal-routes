"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/src/lib/supabase"
import BookThisTourForm from "@/src/components/BookThisTourForm"
import ImageCarousel from "@/src/components/ImageCarousel"
import { Calendar, MapPin, Clock, Users, DollarSign } from "lucide-react"

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

export default function EventDetailPage() {
  const params = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      if (!params.slug) return
      
      setLoading(true)
      const { data, error } = await supabase
        .from("upcoming_events")
        .select("*")
        .eq("id", params.slug)
        .single()
      
      if (!error && data) {
        setEvent(data)
      } else {
        console.error("Error fetching event:", error)
      }
      setLoading(false)
    }
    fetchEvent()
  }, [params.slug])

  if (loading) {
    return (
      <div className="bg-white min-h-screen pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8860B] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading event details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="bg-white min-h-screen pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Event not found</h1>
            <p className="mt-2 text-gray-600">The event you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    )
  }

  const allImages = [event.cover_image, ...(event.gallery_images || [])].filter(Boolean)

  return (
    <div className="bg-white min-h-screen pt-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Title and Basic Info */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#001934] font-arizona mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                {event.destination && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.destination}</span>
                  </div>
                )}
                {event.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.duration}</span>
                  </div>
                )}
                {event.price_per_person && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>${event.price_per_person.toLocaleString()} per person</span>
                  </div>
                )}
              </div>
            </div>

            {/* Image Gallery */}
            {allImages.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#001934] mb-4">Gallery</h2>
                <ImageCarousel images={allImages} />
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-[#001934] mb-4">About This Event</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>
            </div>

            {/* Itinerary */}
            {event.itinerary && event.itinerary.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#001934] mb-4">Itinerary</h2>
                <div className="space-y-4">
                  {event.itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-[#B8860B] pl-4">
                      <h3 className="font-semibold text-lg text-[#001934]">Day {index + 1}</h3>
                      <p className="text-gray-700 mt-1">{day.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included/Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.included && event.included.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#001934] mb-4">What's Included</h2>
                  <ul className="space-y-2">
                    {event.included.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {event.excluded && event.excluded.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#001934] mb-4">What's Not Included</h2>
                  <ul className="space-y-2">
                    {event.excluded.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Booking Form Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookThisTourForm 
                eventTitle={event.title}
                eventDate={event.date}
                pricePerPerson={event.price_per_person}
                eventId={event.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
