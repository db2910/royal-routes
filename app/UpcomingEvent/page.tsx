"use client"

import { useState, useEffect, useMemo } from "react"
import EventCard from "@/src/components/EventCard"
import EventSearchBar from "@/src/components/EventSearchBar"
import EventCategoriesFilter from "@/src/components/EventCategoriesFilter"
import Pagination from "@/src/components/Pagination"

// Placeholder data
const eventsData = [
  {
    id: "gorilla-trekking-4days",
    title: "4 Days Visit Rwanda with Double Gorilla Trekking Safari Experiences",
    pricePerPerson: "$4608 / Per person sharing",
    description:
      "This trip takes you to the Volcanoes National Park, home to the Gorillas and have yourself a lifetime experience of trekking the mountain and Cultural experience at the Gorilla Guardian village plus city tour in Kigali on this 4 days' tour, you will be using your own private safari jeep.",
    imageUrl: "/images/upcoming/gorrila1.webp",
    category: "Popular Gorilla Trekking",
    duration: "4 Days",
    destination: "Volcanoes National Park",
    images: [
      "/images/upcoming/gorrila1.webp",
      "/images/upcoming/gorrila2.png",
      "/images/upcoming/gorrila3.jpg",
      "/images/upcoming/volca1.jpg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kigali & City Tour",
        description:
          "Arrive at Kigali International Airport, transfer to hotel. Afternoon city tour including Genocide Memorial and local markets.",
      },
      {
        day: 2,
        title: "Transfer to Volcanoes NP & Cultural Village",
        description:
          "Drive to Musanze, check-in near Volcanoes National Park. Afternoon visit to Gorilla Guardian Village for cultural immersion.",
      },
      {
        day: 3,
        title: "Gorilla Trekking Experience",
        description:
          "Early morning briefing, then embark on an unforgettable gorilla trekking adventure. Spend an hour with the gorillas.",
      },
      {
        day: 4,
        title: "Second Gorilla Trek & Departure",
        description:
          "Another chance to trek gorillas or visit golden monkeys. Afternoon drive back to Kigali for departure.",
      },
    ],
    included: [
      "Private 4x4 safari jeep",
      "Experienced driver-guide",
      "2 Gorilla permits",
      "Cultural village visit",
      "Accommodation & meals as per itinerary",
    ],
    excluded: ["International flights", "Visas", "Travel insurance", "Personal expenses", "Tips & gratuities"],
  },
  {
    id: "chimpanzee-trek-10days",
    title: "10-Day Discounted Rwanda Gorilla & Chimpanzee Trek Safari",
    pricePerPerson: "$3986 / Per person sharing",
    description:
      "This trip takes you to experience the authentic Rwanda and her beauty from the wildlife safaris of Akagera park and the sunset boat cruise, Kigali city tours, you will trek chimpanzees, canopy walk adventure and tea experience in Nyungwe Forest National Park, Visit Lake Kivu, coffee experience, have a life time experience.",
    imageUrl: "https://via.placeholder.com/300x200/B8860B/001934?text=Chimpanzee+Trek",
    category: "Luxury Safaris",
    duration: "10 Days",
    destination: "Akagera NP, Nyungwe NP, Lake Kivu",
    images: [
      "https://via.placeholder.com/800x600/B8860B/001934?text=Chimp+1",
      "https://via.placeholder.com/800x600/001934/B8860B?text=Chimp+2",
      "https://via.placeholder.com/800x600/B8860B/001934?text=Chimp+3",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Kigali City Tour", description: "Arrival in Kigali, transfer to hotel, city tour." },
      {
        day: 2,
        title: "Akagera National Park Safari",
        description: "Morning game drive and afternoon boat cruise in Akagera.",
      },
      { day: 3, title: "Transfer to Nyungwe Forest", description: "Drive to Nyungwe, prepare for chimpanzee trek." },
      {
        day: 4,
        title: "Chimpanzee Trekking & Canopy Walk",
        description: "Chimpanzee trek in Nyungwe, followed by a canopy walk.",
      },
      {
        day: 5,
        title: "Tea Experience & Lake Kivu",
        description: "Visit a tea plantation, then transfer to Lake Kivu for relaxation.",
      },
      { day: 6, title: "Lake Kivu Activities", description: "Boat trip on Lake Kivu, visit coffee plantations." },
      {
        day: 7,
        title: "Transfer to Volcanoes NP",
        description: "Scenic drive to Musanze, near Volcanoes National Park.",
      },
      { day: 8, title: "Gorilla Trekking", description: "Unforgettable gorilla trekking experience." },
      {
        day: 9,
        title: "Golden Monkey Trek / Cultural Tour",
        description: "Trek golden monkeys or visit a local community.",
      },
      { day: 10, title: "Departure", description: "Drive back to Kigali for departure." },
    ],
    included: ["Accommodation", "Meals", "Park fees", "Permits (Gorilla, Chimpanzee)", "Safari vehicle", "Guide"],
    excluded: ["Flights", "Visas", "Insurance", "Personal items"],
  },
  {
    id: "cultural-immersion-5days",
    title: "5-Day Rwanda Cultural Immersion & Lake Kivu Retreat",
    pricePerPerson: "$1850 / Per person sharing",
    description:
      "Immerse yourself in Rwandan culture with visits to local communities, historical sites, and relax by the beautiful Lake Kivu.",
    imageUrl: "https://via.placeholder.com/300x200/001934/B8860B?text=Culture+Kivu",
    category: "Family Packages",
    duration: "5 Days",
    destination: "Kigali, Nyanza, Lake Kivu",
    images: [
      "https://via.placeholder.com/800x600/001934/B8860B?text=Culture1",
      "https://via.placeholder.com/800x600/B8860B/001934?text=Kivu1",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Kigali Exploration",
        description: "Arrival in Kigali, transfer to hotel, city tour.",
      },
      {
        day: 2,
        title: "Southern Province Cultural Tour",
        description: "Visit the King's Palace Museum in Nyanza and Murambi Genocide Memorial.",
      },
      {
        day: 3,
        title: "Transfer to Lake Kivu & Relaxation",
        description: "Drive to Lake Kivu, enjoy the lakefront and optional water activities.",
      },
      {
        day: 4,
        title: "Community Visit & Coffee Experience",
        description: "Explore local communities around Lake Kivu, learn about traditional crafts and coffee making.",
      },
      { day: 5, title: "Departure", description: "Morning at leisure, drive back to Kigali for departure." },
    ],
    included: ["Accommodation", "Meals", "Cultural site entries", "Transport", "Guide"],
    excluded: ["Drinks", "Tips", "Personal items"],
  },
  {
    id: "akagera-wildlife-3days",
    title: "3-Day Akagera National Park Wildlife Safari",
    pricePerPerson: "$1200 / Per person sharing",
    description:
      "A short but intense safari experience in Akagera National Park, home to the Big Five and various wildlife species.",
    imageUrl: "https://via.placeholder.com/300x200/B8860B/001934?text=Akagera",
    category: "Group Tours",
    duration: "3 Days",
    destination: "Akagera National Park",
    images: [
      "https://via.placeholder.com/800x600/B8860B/001934?text=Akagera1",
      "https://via.placeholder.com/800x600/001934/B8860B?text=Akagera2",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Game Drive", description: "Transfer to Akagera NP, afternoon game drive." },
      {
        day: 2,
        title: "Full Day Safari & Boat Cruise",
        description: "Morning game drive, afternoon boat cruise on Lake Ihema.",
      },
      {
        day: 3,
        title: "Morning Game Drive & Departure",
        description: "Final morning game drive, then return to Kigali.",
      },
    ],
    included: ["Park entry fees", "Game drives", "Boat cruise", "Accommodation", "Meals", "Transport"],
    excluded: ["Drinks", "Personal expenses"],
  },
  {
    id: "honeymoon-kivu-7days",
    title: "7-Day Romantic Rwanda Honeymoon Retreat in Lake Kivu",
    pricePerPerson: "$2500 / Per person sharing",
    description:
      "A perfect blend of relaxation and soft adventure for honeymooners, focusing on the serene beauty of Lake Kivu.",
    imageUrl: "https://via.placeholder.com/300x200/001934/B8860B?text=Honeymoon+Kivu",
    category: "Honeymoon Packages",
    duration: "7 Days",
    destination: "Lake Kivu",
    images: [
      "https://via.placeholder.com/800x600/001934/B8860B?text=Honeymoon1",
      "https://via.placeholder.com/800x600/B8860B/001934?text=KivuSunset",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Kivu Transfer",
        description: "Arrive in Kigali, direct transfer to a luxury resort on Lake Kivu.",
      },
      { day: 2, title: "Lake Exploration", description: "Relax by the lake, optional boat trip or kayaking." },
      {
        day: 3,
        title: "Coffee & Culture Tour",
        description: "Visit a local coffee plantation and cultural sites around the lake.",
      },
      { day: 4, title: "Relaxation Day", description: "Enjoy resort amenities, spa treatments, or simply relax." },
      {
        day: 5,
        title: "Optional Activities",
        description: "Choose from fishing, nature walks, or a visit to a local island.",
      },
      {
        day: 6,
        title: "Sunset Cruise & Romantic Dinner",
        description: "Evening sunset boat cruise followed by a private dinner.",
      },
      { day: 7, title: "Departure", description: "Morning leisure, then transfer back to Kigali for departure." },
    ],
    included: ["Luxury accommodation", "Romantic meals", "Lake activities", "Transport", "Guide"],
    excluded: ["Flights", "Spa treatments", "Personal expenses"],
  },
  {
    id: "volcanoes-golden-monkeys-2days",
    title: "2-Day Golden Monkey Trekking & Twin Lakes Visit",
    pricePerPerson: "$950 / Per person sharing",
    description:
      "A quick yet rewarding trip to Volcanoes National Park for golden monkey trekking and exploration of the beautiful Twin Lakes.",
    imageUrl: "https://via.placeholder.com/300x200/B8860B/001934?text=Golden+Monkey",
    category: "Solo Tour Packages",
    duration: "2 Days",
    destination: "Volcanoes National Park, Twin Lakes",
    images: [
      "https://via.placeholder.com/800x600/B8860B/001934?text=GoldenMonkey1",
      "https://via.placeholder.com/800x600/001934/B8860B?text=TwinLakes",
    ],
    itinerary: [
      {
        day: 1,
        title: "Transfer & Golden Monkey Trek",
        description: "Morning transfer to Musanze, afternoon golden monkey trekking.",
      },
      {
        day: 2,
        title: "Twin Lakes & Departure",
        description: "Visit the Twin Lakes (Burera and Ruhondo), then return to Kigali.",
      },
    ],
    included: ["Accommodation", "Meals", "Permit", "Transport", "Guide"],
    excluded: ["Flights", "Personal expenses"],
  },
]

const ITEMS_PER_PAGE = 3
const allCategoriesList = [
  "Family Packages",
  "Group Tours",
  "Honeymoon Packages",
  "Luxury Safaris",
  "Most Popular Tours",
  "Popular Gorilla Trekking",
  "Solo Tour Packages",
  "Summer Adventures",
]

export default function UpcomingEventPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.destination.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category)
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategories])

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE)
  const currentEvents = filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1) // Reset to first page on filter change
  }, [searchQuery, selectedCategories])

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
                  <EventCard key={event.id} event={event} />
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
