export interface TourItineraryItem {
  day: number
  title: string
  description: string
}

export interface Tour {
  id: string
  title: string
  shortDescription: string // For card
  longDescription: string // For detail page
  mainImage: string // For card and hero on detail page
  galleryImages: string[] // For detail page gallery
  pricePerPerson?: string // e.g., "$1500 / Per person"
  duration: string // e.g., "5 Days"
  destination: string // e.g., "Volcanoes National Park, Lake Kivu"
  category?: string // e.g., "Gorilla Trekking", "Cultural"
  itinerary: TourItineraryItem[]
  included: string[]
  excluded: string[]
}

export const toursData: Tour[] = [
  {
    id: "volcanoes-gorilla-trek",
    title: "Volcanoes National Park Gorilla Trek",
    shortDescription:
      "Experience the magnificent mountain gorillas in their natural habitat. A once-in-a-lifetime adventure through Rwanda's pristine wilderness.",
    longDescription:
      "Embark on an unforgettable journey into the heart of Volcanoes National Park to witness the majestic mountain gorillas. This tour offers an intimate experience with one of Rwanda's most iconic wildlife species. Trek through lush bamboo forests, guided by experienced trackers, and spend a magical hour observing a gorilla family in their natural environment. Beyond the trek, you'll learn about conservation efforts and the local culture that protects these magnificent creatures.",
    mainImage: "/images/tours/volca1.jpg",
    galleryImages: [
      "/images/tours/volca1.jpg",
      "/images/tours/volca2.jpg",
      "/images/tours/volca3.jpg",
      "/images/tours/volca4.jpg",
      "/images/tours/volca5.gif",
    ],
    pricePerPerson: "$1500 / Per person",
    duration: "1 Day Trek",
    destination: "Volcanoes National Park",
    category: "Gorilla Trekking",
    itinerary: [
      {
        day: 1,
        title: "Gorilla Trekking Adventure",
        description:
          "Early morning departure to the park headquarters for a briefing. Embark on the gorilla trek, which can take several hours depending on the gorillas' location. Spend one hour with the gorillas. Descend and return to your accommodation or transfer back to Kigali.",
      },
    ],
    included: [
      "Gorilla trekking permit (if package selected)",
      "Experienced park guides and trackers",
      "Park entrance fees",
      "Bottled water during trek",
      "Transportation to/from park",
    ],
    excluded: [ "Accommodation", "Meals", "Tips"],
  },
  {
    id: "lake-kivu-scenic-tour",
    title: "Lake Kivu Scenic Escape",
    shortDescription:
      "Discover the beauty of Lake Kivu with boat rides, stunning sunsets, and peaceful lakeside relaxation in one of Africa's most beautiful lake settings.",
    longDescription:
      "Escape to the tranquil shores of Lake Kivu, one of Africa's Great Lakes. This tour offers a perfect blend of relaxation and exploration. Enjoy scenic boat trips to nearby islands, witness traditional fishing methods, and soak in breathtaking sunsets over the water. Explore the lakeside towns of Gisenyi or Kibuye, and learn about local life and coffee production in the region. Ideal for unwinding and experiencing Rwanda's natural beauty.",
    mainImage: "/images/tours/kivu6.jpg",
    galleryImages: [
      "/images/tours/kivu6.jpg",
      "/images/tours/kivu1.jpg",
      "/images/tours/kivu2.jpg",
      "/images/tours/kivu5.jpg",
      "/images/tours/kivu3.webp",
    ],
    pricePerPerson: "$350 / Per person",
    duration: "2-3 Days",
    destination: "Lake Kivu (Gisenyi/Kibuye)",
    category: "Scenic & Relaxation",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Gisenyi & Lakeside Relaxation",
        description:
          "Transfer to Gisenyi (Rubavu) on the shores of Lake Kivu. Check into your hotel and enjoy an afternoon relaxing by the lake, swimming, or exploring the town.",
      },
      {
        day: 2,
        title: "Boat Trip & Coffee Experience",
        description:
          "Morning boat trip on Lake Kivu to visit nearby islands and see local fishing communities. In the afternoon, visit a coffee washing station to learn about Rwanda's renowned coffee.",
      },
      {
        day: 3,
        title: "Optional Activities & Departure",
        description:
          "Enjoy optional activities like kayaking or visiting hot springs. Later, transfer back to Kigali or your next destination.",
      },
    ],
    included: [
      "Accommodation (mid-range)",
      "Meals as specified",
      "Boat trip on Lake Kivu",
      "Coffee tour",
      "Local guide",
      "Transportation to/from Lake Kivu",
    ],
    excluded: ["Optional activities", "Drinks", "Tips"],
  },
  {
    id: "nyungwe-forest-canopy-walk",
    title: "Nyungwe Forest Canopy Walk & Primates",
    shortDescription:
      "Walk among the treetops in one of Africa's oldest rainforests. Spot primates and enjoy breathtaking forest views from the famous canopy walkway.",
    longDescription:
      "Journey into the ancient Nyungwe Forest National Park, a biodiversity hotspot. The highlight is the thrilling canopy walkway, offering a unique perspective of the rainforest from 50 meters above ground. Search for colobus monkeys, chimpanzees (optional trek), and a myriad of bird species. This tour is an immersive experience in one of Africa's most important montane rainforests, home to 13 primate species and over 300 bird species.",
    mainImage: "/images/tours/nyungwe1.jpg",
    galleryImages: [
      "/images/tours/nyungwe1.jpg",
      "/images/tours/nyungwe2.jpg",
      "/images/tours/nyungwe3.jpg",
      "/images/tours/nyungwe4.jpg",
    ],
    pricePerPerson: "$450 / Per person",
    duration: "2-3 Days",
    destination: "Nyungwe Forest National Park",
    category: "Nature & Wildlife",
    itinerary: [
      {
        day: 1,
        title: "Transfer to Nyungwe & Colobus Monkey Trek",
        description:
          "Drive to Nyungwe Forest National Park. In the afternoon, embark on a trek to see the large troops of Angolan colobus monkeys.",
      },
      {
        day: 2,
        title: "Canopy Walk & Waterfall Hike",
        description:
          "Experience the famous Nyungwe Canopy Walk in the morning. In the afternoon, you can opt for a hike to a scenic waterfall or relax at your lodge.",
      },
      {
        day: 3,
        title: "Optional Chimpanzee Trek & Departure",
        description:
          "Optional early morning chimpanzee trek (requires pre-booking). Afterwards, transfer back to Kigali.",
      },
    ],
    included: [
      "Accommodation",
      "Meals as specified",
      "Park entrance fees",
      "Canopy walk permit",
      "Colobus monkey trek",
      "Professional guide",
      "Transportation",
    ],
    excluded: ["Chimpanzee trekking permit", "Drinks", "Tips"],
  },
  {
    id: "kigali-city-cultural-tour",
    title: "Kigali City & Cultural Exploration",
    shortDescription:
      "Explore Rwanda's vibrant capital city. Visit museums, bustling markets, and learn about the country's remarkable history and rich cultural heritage.",
    longDescription:
      "Discover the heart of Rwanda with a comprehensive tour of Kigali. Visit the Kigali Genocide Memorial for a poignant understanding of the country's past and remarkable recovery. Explore bustling local markets like Kimironko, art galleries showcasing Rwandan talent, and significant historical landmarks. This tour provides insight into Kigali's transformation into a clean, safe, and dynamic African city, often called the 'Singapore of Africa'.",
    mainImage: "/images/tours/kigali3.jpg",
    galleryImages: [
      "/images/tours/kigali3.jpg",
      "/images/tours/kigali4.jpg",
      "/images/tours/kigali2.jpg",
      "/images/tours/kigali1.jpg",
    ],
    pricePerPerson: "$120 / Per person",
    duration: "1 Day",
    destination: "Kigali",
    category: "Cultural & City",
    itinerary: [
      {
        day: 1,
        title: "Full Day Kigali City Tour",
        description:
          "Visit the Kigali Genocide Memorial, Kandt House Museum, Niyo Arts Gallery, Kimironko Market, and drive through different neighborhoods of the city. Lunch at a local restaurant included.",
      },
    ],
    included: [
      "Professional guide",
      "Entrance fees to sites mentioned",
      "Lunch",
      "Bottled water",
      "Transportation within city",
    ],
    excluded: ["Hotel pickup/drop-off (can be arranged)", "Dinner", "Personal shopping", "Tips"],
  },
  {
    id: "akagera-wildlife-safari",
    title: "Akagera National Park Wildlife Safari",
    shortDescription:
      "Experience Rwanda's only savanna park with game drives to see the Big Five, boat safaris on Lake Ihema, and stunning African wildlife.",
    longDescription:
      "Discover Rwanda's premier wildlife destination at Akagera National Park. This expansive savanna park is home to the Big Five - lions, elephants, buffalos, leopards, and rhinos. Enjoy thrilling game drives across diverse landscapes, from rolling hills to wetlands. Take a boat safari on Lake Ihema to spot hippos, crocodiles, and numerous bird species. This park represents one of Africa's greatest conservation success stories.",
    mainImage: "/images/tours/akagera1.jpg",
    galleryImages: [
      "/images/tours/akagera1.jpg",
      "/images/tours/akagera2.webp",
      "/images/tours/akagera3.jpg",
      "/images/tours/akagera4.jpg",
      "/images/tours/akagera5.jpg",
    ],
    pricePerPerson: "$650 / Per person",
    duration: "2-3 Days",
    destination: "Akagera National Park",
    category: "Wildlife Safari",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Afternoon Game Drive",
        description:
          "Transfer to Akagera National Park. Check into your lodge and enjoy an afternoon game drive to spot elephants, giraffes, zebras, and various antelope species.",
      },
      {
        day: 2,
        title: "Full Day Safari & Boat Trip",
        description:
          "Early morning game drive for the best wildlife viewing. Afternoon boat safari on Lake Ihema to see hippos, crocodiles, and water birds.",
      },
      {
        day: 3,
        title: "Morning Game Drive & Departure",
        description:
          "Final morning game drive with chances to spot the Big Five. Transfer back to Kigali in the afternoon.",
      },
    ],
    included: ["Park entrance fees", "Game drives", "Boat safari", "Accommodation", "All meals", "Professional guide", "Transportation to/from park", ],
    excluded: ["Drinks", "Tips", "Optional activities"],
  },
  {
    id: "rwanda-cultural-heritage",
    title: "Rwanda Cultural Heritage Experience",
    shortDescription:
      "Immerse yourself in authentic Rwandan culture with traditional dance, craft workshops, local cuisine, and visits to cultural villages.",
    longDescription:
      "Experience the rich cultural tapestry of Rwanda through this immersive cultural tour. Visit traditional villages, participate in local craft workshops, enjoy authentic Rwandan cuisine, and witness spectacular traditional dance performances. Learn about ancient customs, traditional medicine, and the social structures that have shaped Rwandan society. This tour offers a deep dive into the heart of Rwandan culture and traditions.",
    mainImage: "/images/tours/culture1.jpg",
    galleryImages: [
      "/images/tours/culture1.jpg",
      "/images/tours/culture2.webp",
      "/images/tours/culture3.jpeg",
      "/images/tours/culture4.webp",
      "/images/tours/culture5.jpg",
    ],
    pricePerPerson: "$280 / Per person",
    duration: "2 Days",
    destination: "Various Cultural Sites",
    category: "Cultural Heritage",
    itinerary: [
      {
        day: 1,
        title: "Traditional Village & Craft Workshops",
        description:
          "Visit a traditional Rwandan village, participate in basket weaving and pottery workshops, and enjoy a traditional lunch prepared by local families.",
      },
      {
        day: 2,
        title: "Cultural Performances & King's Palace",
        description:
          "Visit the King's Palace Museum in Nyanza, witness traditional Intore dance performances, and learn about Rwanda's royal history and traditions.",
      },
    ],
    included: [
      "Cultural site entrance fees",
      "Workshop materials",
      "Traditional meals",
      "Cultural performances",
      "Local guides",
      "Transportation",
    ],
    excluded: ["Accommodation", "Personal purchases", "Tips"],
  },
]
