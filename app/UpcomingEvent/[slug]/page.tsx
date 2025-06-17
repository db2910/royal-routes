"use client"

import { useParams } from "next/navigation"
import ImageCarousel from "@/src/components/ImageCarousel"
import BookThisTourForm from "@/src/components/BookThisTourForm"
import { CalendarDays, DollarSign, MapPin, CheckCircle, XCircle, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

// Placeholder data (same as listing page)
const eventsData = [
  {
    id: "gorilla-trekking-4days",
    title: "4 Days Visit Rwanda with Double Gorilla Trekking Safari Experiences",
    pricePerPerson: "$4608",
    description:
      "This trip takes you to the Volcanoes National Park, home to the Gorillas and have yourself a lifetime experience of trekking the mountain and Cultural experience at the Gorilla Guardian village plus city tour in Kigali on this 4 days' tour, you will be using your own private safari jeep. Explore the lush landscapes, encounter majestic wildlife, and immerse yourself in the rich Rwandan culture. Our expert guides will ensure a safe and memorable journey, providing insights into the local flora, fauna, and traditions. This package is perfect for adventure seekers and nature lovers looking for an authentic African experience.",
    imageUrl: "/images/upcoming/gorrila1.webp",
    category: "Popular Gorilla Trekking",
    duration: "4 Days",
    destination: "Volcanoes National Park",
    images: [
      "/images/upcoming/gorrila1.webp",
      "/images/upcoming/gorrila2.png",
      "/images/upcoming/gorrila3.jpg",
      "/images/upcoming/volca1.jpg",    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kigali & City Tour",
        description:
          "Arrive at Kigali International Airport, meet your guide, and transfer to your hotel. In the afternoon, embark on a city tour of Kigali, visiting key sites such as the Kigali Genocide Memorial, local markets, and art galleries to get a feel for Rwanda's capital.",
      },
      {
        day: 2,
        title: "Transfer to Volcanoes NP & Cultural Village",
        description:
          "After breakfast, enjoy a scenic drive to Musanze, the gateway to Volcanoes National Park. Check into your lodge and in the afternoon, visit the Iby'Iwacu Cultural Village (now Gorilla Guardian Village) for an immersive experience of Rwandan traditions, dance, and local lifestyle.",
      },
      {
        day: 3,
        title: "Gorilla Trekking Experience",
        description:
          "An early start for a briefing at the park headquarters. Then, venture into the forest with experienced trackers to find a mountain gorilla family. Spend a magical hour observing these gentle giants in their natural habitat. Return to the lodge for relaxation.",
      },
      {
        day: 4,
        title: "Second Gorilla Trek or Golden Monkeys & Departure",
        description:
          "Choose between a second gorilla trek (permit extra) or a trek to see the playful golden monkeys. Alternatively, you can opt for a Dian Fossey hike. In the afternoon, drive back to Kigali for your departure flight.",
      },
    ],
    included: [
      "Private 4x4 safari jeep with pop-up roof for game viewing",
      "Experienced English-speaking driver-guide",
      "2 Gorilla permits per person ($1500 each)",
      "Gorilla Guardian Village cultural visit",
      "Accommodation and meals as per itinerary (Full Board)",
      "Park entrance fees",
      "Bottled water in the vehicle",
    ],
    excluded: [
      "International flights and Rwandan visa",
      "Travel insurance",
      "Personal expenses (souvenirs, laundry, etc.)",
      "Tips and gratuities for guides and staff",
      "Optional activities not mentioned in the itinerary",
    ],
  },
  // ... (other events from the provided data)
  {
    id: "chimpanzee-trek-10days",
    title: "10-Day Discounted Rwanda Gorilla & Chimpanzee Trek Safari",
    pricePerPerson: "$3986",
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
    pricePerPerson: "$1850",
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
    pricePerPerson: "$1200",
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
    pricePerPerson: "$2500",
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
    pricePerPerson: "$950",
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

const ItineraryItem = ({
  day,
  title,
  description,
  isOpen,
  onToggle,
}: { day: number; title: string; description: string; isOpen: boolean; onToggle: () => void }) => (
  <div className="border-b border-gray-200 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center py-4 px-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
      aria-expanded={isOpen}
    >
      <span className="text-base sm:text-lg font-semibold text-[#001934] pr-2 break-words">
        Day {day}: {title}
      </span>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-[#B8860B] flex-shrink-0" />
      ) : (
        <ChevronDown className="w-5 h-5 text-[#B8860B] flex-shrink-0" />
      )}
    </button>
    {isOpen && (
      <div className="px-4 pb-4 bg-gray-50">
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed break-words">{description}</p>
      </div>
    )}
  </div>
)

export default function EventDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const event = eventsData.find((e) => e.id === slug)
  const [openItineraryDay, setOpenItineraryDay] = useState<number | null>(1) // Open first day by default

  const toggleItineraryDay = (day: number) => {
    setOpenItineraryDay(openItineraryDay === day ? null : day)
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-16 lg:pt-20">
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#001934] mb-4">Event not found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the event you're looking for.</p>
          <Link
            href="/UpcomingEvent"
            className="inline-flex items-center bg-[#B8860B] text-[#001934] font-semibold py-3 px-6 rounded-lg hover:bg-[#B8860B]/90 transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  const infoBoxes = [
    {
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-[#B8860B]" />,
      title: "Price",
      value: event.pricePerPerson,
    },
    {
      icon: <CalendarDays className="w-6 h-6 sm:w-8 sm:h-8 text-[#B8860B]" />,
      title: "Duration",
      value: event.duration,
    },
    {
      icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-[#B8860B]" />,
      title: "Destination",
      value: event.destination,
    },
  ]

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* Fixed header with back button - no longer sticky to avoid blocking */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 mt-16 lg:mt-20">
        <Link
          href="/UpcomingEvent"
          className="inline-flex items-center text-[#B8860B] hover:text-[#B8860B]/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Back to Events</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Event title - now with proper spacing */}
        <header className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#001934] font-arizona leading-tight break-words">
            {event.title}
          </h1>
        </header>

        {/* Rest of the content remains the same */}
        <div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          {/* Main Content - Full width on mobile, 2/3 on desktop */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Image Gallery - Optimized for mobile */}
            <div className="w-full">
              <ImageCarousel images={event.images} altText={event.title} />
            </div>

            {/* Quick Info Cards - Mobile grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {infoBoxes.map((box, index) => (
                <div key={index} className="bg-[#001934] text-white p-4 sm:p-6 rounded-lg shadow-lg text-center">
                  <div className="flex justify-center mb-2 sm:mb-3">{box.icon}</div>
                  <h3 className="text-sm sm:text-lg font-semibold text-[#B8860B] font-arizona mb-1">{box.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-tight">{box.value}</p>
                </div>
              ))}
            </div>

            {/* Event Overview */}
            <section className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#001934] mb-4 font-arizona">Event Overview</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base break-words">{event.description}</p>
            </section>

            {/* Itinerary - Mobile-optimized accordion */}
            <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl sm:text-2xl font-bold text-[#001934] font-arizona">Daily Itinerary</h2>
              </div>
              <div>
                {event.itinerary.map((item) => (
                  <ItineraryItem
                    key={item.day}
                    day={item.day}
                    title={item.title}
                    description={item.description}
                    isOpen={openItineraryDay === item.day}
                    onToggle={() => toggleItineraryDay(item.day)}
                  />
                ))}
              </div>
            </section>

            {/* Included/Excluded - Mobile-optimized */}
            <section className="space-y-6 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
              <div className="bg-green-50 rounded-lg p-4 sm:p-6 border border-green-200">
                <h2 className="text-lg sm:text-xl font-bold text-[#001934] mb-4 font-arizona flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  What's Included
                </h2>
                <ul className="space-y-2">
                  {event.included.map((item, index) => (
                    <li key={index} className="flex items-start text-sm sm:text-base">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-4 sm:p-6 border border-red-200">
                <h2 className="text-lg sm:text-xl font-bold text-[#001934] mb-4 font-arizona flex items-center">
                  <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  What's Excluded
                </h2>
                <ul className="space-y-2">
                  {event.excluded.map((item, index) => (
                    <li key={index} className="flex items-start text-sm sm:text-base">
                      <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Booking Form Sidebar - Full width on mobile, sticky on desktop */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-32">
              <BookThisTourForm eventName={event.title} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
