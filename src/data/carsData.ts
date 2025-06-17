export interface CarSpecification {
  model: string
  year: number
  doors: number
  color: string
  seats: number
  transmission: string
  engine: string
  fuelType: string
}

export interface CarCapability {
  icon: string
  text: string
}

export interface Car {
  id: string // Unique identifier for URL slug
  name: string
  shortDescription: string // For CarCard
  detailedDescription: string // For details page
  mainImage: string // Primary image for CarCard and details page
  galleryImages: string[] // Additional images for gallery
  capabilities: CarCapability[] // For CarCard display
  specifications: CarSpecification
  pricePerDay: string // Example: "$120/day"
}

export const carsData: Car[] = [
  {
    id: "toyota-land-cruiser-v8",
    name: "Toyota Land Cruiser V8",
    shortDescription: "Premium 4WD for safari adventures and rough terrain.",
    detailedDescription:
      "The Toyota Land Cruiser V8 is a legendary off-road vehicle, renowned for its durability, comfort, and unparalleled capability. Whether you're navigating city streets or exploring Rwanda's most challenging terrains, the Land Cruiser V8 offers a smooth, powerful, and secure ride. Its spacious interior, advanced safety features, and robust V8 engine make it the perfect choice for families, adventure groups, and VIP transport. Experience luxury and ruggedness combined.",
    mainImage: "/images/vehicles/land4.jpg",
    galleryImages: [
      "/images/vehicles/land5.jpg",
      "/images/vehicles/land6.jpg",
      "/images/vehicles/land7.jpg",
      "/images/vehicles/land8.jpg",
    ],
    capabilities: [
      { icon: "users", text: "7 Passengers" },
      { icon: "fuel", text: "Diesel" },
      { icon: "settings", text: "Automatic" },
      { icon: "snowflake", text: "Air Conditioned" },
    ],
    specifications: {
      model: "SUV",
      year: 2022,
      doors: 4,
      color: "Pearl White",
      seats: 7,
      transmission: "Automatic",
      engine: "4.5L V8 Turbo Diesel",
      fuelType: "Diesel",
    },
    pricePerDay: "$250/day",
  },
    {
      id: "land-rover-range-rover", // A good, clear ID for a Range Rover
      name: "Land Rover Range Rover", // Full, common name
      shortDescription: "Premium luxury SUV for unparalleled comfort and versatile performance.",
      detailedDescription:
        "Experience the pinnacle of luxury and capability with the Land Rover Range Rover. This iconic SUV offers a supremely comfortable ride, advanced technology, and robust off-road prowess, making it perfect for executive travel, family adventures, or exploring Rwanda's diverse landscapes in style. Its opulent interior, intuitive infotainment, and powerful engine ensure every journey is an indulgence. Equipped with advanced safety features and a refined automatic transmission, it delivers a smooth and secure drive on any terrain.",
      mainImage: "/images/vehicles/range.png", // Placeholder - you'd replace with the actual path to the main image
      galleryImages: [
        "/images/vehicles/range1.png", 
      ],
      capabilities: [
        { icon: "users", text: "4-5 Passengers" }, // Standard seating for a luxury SUV
        { icon: "fuel", text: "Petrol" },         // Or Diesel, depending on exact model, Petrol is common
        { icon: "settings", text: "Automatic" },
        { icon: "wind", text: "Climate Control" },
        { icon: "briefcase", text: "Luxury & Executive Travel" }, // Added a specific capability
      ],
      specifications: {
        model: "SUV",
        year: 2020, // A reasonable recent year based on the image's classic Range Rover aesthetic, adjust if you know the exact year
        doors: 5,   // 4 passenger doors + tailgate
        color: "Santorini Black", // A common and fitting black for Range Rovers
        seats: 5,   // Most Range Rovers are 5-seaters
        transmission: "Automatic",
        engine: "5.0L Supercharged V8", // A common powerful engine option, or "3.0L V6 Turbo" for a more common one
        fuelType: "Petrol", // Matches capability, ensure consistency
      },
      pricePerDay: "$450/day", // This is an estimate, adjust based on your pricing strategy for a luxury SUV in Rwanda.
    },
    {
      id: "kia-sportage", // Unique ID for Kia Sportage
      name: "Kia Sportage", // Full name
      shortDescription: "Stylish and versatile compact SUV, ideal for city and comfortable adventures.",
      detailedDescription:
        "The Kia Sportage offers a compelling blend of modern design, comfortable interiors, and reliable performance, making it a perfect choice for navigating both city streets and more adventurous routes in Rwanda. Its spacious cabin accommodates up to five passengers with ample luggage room, ensuring a pleasant journey for families or small groups. Equipped with a responsive engine and smooth automatic transmission, the Sportage delivers an enjoyable driving experience, complemented by essential safety features and climate control for comfort.",
      mainImage: "/images/vehicles/sportage.jpg", // Placeholder - replace with the actual path to your Sportage main image
      galleryImages: [
        "/images/vehicles/sportage.jpg", // Placeholder for interior shot
        "/images/vehicles/sportage1.jpg",    // Placeholder for side view
        "/images/vehicles/sportage3.jpg",
        "/images/vehicles/sportage4.jpg",
        "/images/vehicles/sportage5.jpg",
        "/images/vehicles/sportage6.jpg",
        "/images/vehicles/sportage7.jpg",   
      ],
      capabilities: [
        { icon: "users", text: "5 Passengers" },
        { icon: "fuel", text: "Petrol" }, // Assuming Petrol, common for this generation
        { icon: "settings", text: "Automatic" },
        { icon: "road", text: "City & Highway Driving" }, // Added a relevant capability
      ],
      specifications: {
        model: "SUV",
        year: 2014, // Based on the visual style, this is likely a 3rd generation Sportage (2010-2015). Adjust if you know the exact year.
        doors: 5, // 4 passenger doors + tailgate
        color: "Grey Metallic", // A common and fitting color from the image
        seats: 5,
        transmission: "Automatic",
        engine: "2.0L Petrol", // A common engine size for this model. Could also be 2.4L or 1.6L depending on trim/market.
        fuelType: "Petrol", // Matches capability, ensure consistency
      },
      pricePerDay: "$100/day", // This is an estimate, adjust based on your pricing strategy for a compact SUV in Rwanda.
    },
    {
      id: "mercedes-benz-g-class", // Unique ID for G-Class
      name: "Mercedes-Benz G-Class (G-Wagon)", // Full name, including G-Wagon for common recognition
      shortDescription: "Iconic luxury SUV combining rugged capability with unparalleled sophistication.",
      detailedDescription:
        "The Mercedes-Benz G-Class, famously known as the G-Wagon, stands as a symbol of uncompromising luxury and legendary off-road prowess. Its distinctive, timeless design houses a highly refined interior featuring premium materials and cutting-edge technology. Perfect for making a statement, executive travel, or tackling challenging terrains in Rwanda, the G-Wagon delivers a powerful and commanding drive with unmatched comfort and prestige. Equipped with advanced safety systems and a sophisticated all-wheel-drive system, it ensures a secure and exhilarating journey.",
      mainImage: "/images/vehicles/g-wagon.jpg", // Placeholder - replace with the actual path to your G-Wagon main image
      galleryImages: [
        "/images/vehicles/g-wagon.jpg", // Placeholder for interior shot
        "/images/vehicles/g-wagon1.jpg",    // Placeholder for front view (if different from main)
        "/images/vehicles/g-wagon2.jpg",     // Placeholder for side view
        "/images/vehicles/g-wagon4.jpg",     // Placeholder for rear view (could be the provided image)
      ],
      capabilities: [
        { icon: "users", text: "5 Passengers" },
        { icon: "fuel", text: "Petrol" }, // Most common in higher trims like G63
        { icon: "settings", text: "Automatic" },
        { icon: "shield", text: "4MATIC All-Wheel Drive" }, // Specific to Mercedes
        { icon: "briefcase", text: "Luxury & Executive Travel" },
      ],
      specifications: {
        model: "Luxury SUV",
        year: 2020, // Based on the modern look, likely a W463A generation (2018+). Adjust if you know the exact year.
        doors: 5,   // 4 passenger doors + rear tailgate
        color: "Obsidian Black", // The color in the image
        seats: 5,
        transmission: "9-speed Automatic", // Common for newer G-Class models
        engine: "4.0L Bi-Turbo V8", // Common for G550/G63, adjust if different model
        fuelType: "Petrol",
      },
      pricePerDay: "$600/day", // This is an estimate, adjust significantly based on your market and specific G-Class model (e.g., G63 would be higher).
    },
    {
      id: "mercedes-benz-c-class", // Unique ID for C-Class
      name: "Mercedes-Benz C-Class Sedan", // Full name
      shortDescription: "Elegant compact luxury sedan offering comfort, style, and a refined driving experience.",
      detailedDescription:
        "The Mercedes-Benz C-Class combines sophisticated design with dynamic performance, making it an ideal choice for business travelers, couples, or individuals seeking a premium driving experience in Rwanda. Its meticulously crafted interior offers comfort and advanced features, while its responsive engine and smooth automatic transmission ensure a pleasurable journey whether navigating city streets or cruising on highways. Experience the renowned Mercedes-Benz luxury and reliability in this stylish sedan.",
      mainImage: "/images/vehicles/benzc.jpg", // Placeholder - replace with the actual path to your main C-Class image
      galleryImages: [
        "/images/vehicles/benzc.jpg", // Placeholder for interior shot
        "/images/vehicles/benzc1.jpg",    // Placeholder for side view
        "/images/vehicles/benzc2.jpg",
        "/images/vehicles/benzc3.jpg",
        "/images/vehicles/benzc4.jpg",
        "/images/vehicles/benzc6.jpg",    // Placeholder for rear view
        // Add more as needed, e.g., "/images/benzc-front-quarter.jpg"
      ],
      capabilities: [
        { icon: "users", text: "4-5 Passengers" },
        { icon: "fuel", text: "Petrol" }, // Common for this model, could also be Diesel depending on exact spec
        { icon: "settings", text: "Automatic" },
        { icon: "wind", text: "Climate Control" },
        { icon: "briefcase", text: "Executive & City Driving" },
      ],
      specifications: {
        model: "Sedan",
        year: 2012, // Estimated year based on W204 facelifted model. Adjust if you know the exact year from the license plate (RAE 600 G).
        doors: 4,
        color: "Polar White", // The color visible in the image
        seats: 5,
        transmission: "Automatic",
        engine: "1.8L Turbo Petrol", // Common engine for C180 or C200 in this generation. Could be 2.5L V6 for C250/C300.
        fuelType: "Petrol", // Matches capability, ensure consistency
      },
      pricePerDay: "$150/day", // This is an estimate, adjust based on your pricing strategy for a luxury compact sedan.
    },
    {
      id: "toyota-corolla-hatchback", // A good, specific ID
      name: "Toyota Corolla Hatchback", // Clear name
      shortDescription: "Economical and reliable hatchback, perfect for city commutes and small trips.",
      detailedDescription:
        "The Toyota Corolla Hatchback is renowned for its exceptional fuel efficiency, legendary reliability, and easy maneuverability, making it an ideal choice for navigating Kigali's urban landscape and short excursions. Its compact size belies a surprisingly spacious interior for up to five passengers, providing comfort for daily errands or quick getaways. With a dependable engine and user-friendly features, this Corolla offers a practical and cost-effective solution for your transportation needs in Rwanda.",
      mainImage: "/images/vehicles/col1.jpg", // Placeholder - replace with the actual path to your main image
      galleryImages: [
        "/images/vehicles/col.jpg",    // Placeholder for front view
        "/images/vehicles/col1.jpg", // Placeholder for interior shot
        "/images/vehicles/col2.jpg",
        "/images/vehicles/col3.jpg",
        "/images/vehicles/col4.jpg",
        "/images/vehicles/col5.jpg",
        "/images/vehicles/col6.jpg",
           // Another detail shot
      ],
      capabilities: [
        { icon: "users", text: "5 Passengers" },
        { icon: "fuel", text: "Petrol" },
        { icon: "settings", text: "Manual/Automatic" }, // Common to find both for this model
        { icon: "briefcase", text: "Economical & City Driving" },
      ],
      specifications: {
        model: "Hatchback",
        year: 2005, // Estimated year based on the E120 generation (2000-2006). Adjust if you know the exact year from the license plate (RAG 822 B).
        doors: 5,   // 4 passenger doors + hatchback tailgate
        color: "Silver Metallic", // The color in the image
        seats: 5,
        transmission: "Automatic", // Assuming automatic for rental ease, but manual is common too
        engine: "1.6L Petrol", // A common engine size for this model. Could also be 1.4L or 1.8L.
        fuelType: "Petrol", // Matches capability
      },
      pricePerDay: "$50/day", // This is an estimate, adjust based on your pricing strategy for an economy hatchback.
    },
  // Adding 6 more cars to reach 12
  {
    id: "ford-ranger-raptor",
    name: "Ford Ranger Raptor",
    shortDescription: "High-performance off-road pickup truck.",
    detailedDescription:
      "The Ford Ranger Raptor is built to dominate any terrain. With its specialized suspension, powerful engine, and aggressive styling, it's ready for the toughest adventures Rwanda has to offer. Perfect for those seeking an adrenaline rush and ultimate off-road capability.",
    mainImage: "/placeholder.svg?height=300&width=400",
    galleryImages: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    capabilities: [
      { icon: "users", text: "5 Passengers" },
      { icon: "fuel", text: "Diesel" },
      { icon: "settings", text: "Automatic" },
      { icon: "settings", text: "4x4 Off-road" },
    ],
    specifications: {
      model: "Pickup Truck",
      year: 2023,
      doors: 4,
      color: "Performance Blue",
      seats: 5,
      transmission: "10-speed Automatic",
      engine: "2.0L Bi-Turbo Diesel",
      fuelType: "Diesel",
    },
    pricePerDay: "$270/day",
  },
  {
    id: "toyota-coaster",
    name: "Toyota Coaster Bus",
    shortDescription: "Spacious bus for large groups and corporate events.",
    detailedDescription:
      "The Toyota Coaster is the ideal solution for transporting large groups comfortably and safely. With ample seating capacity and reliable performance, it's perfect for corporate events, school trips, or extended tours across Rwanda. Features include air conditioning and generous luggage space.",
    mainImage: "/placeholder.svg?height=300&width=400",
    galleryImages: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    capabilities: [
      { icon: "users", text: "25-30 Passengers" },
      { icon: "fuel", text: "Diesel" },
      { icon: "settings", text: "Manual" },
      { icon: "snowflake", text: "Air Conditioned" },
    ],
    specifications: {
      model: "Bus",
      year: 2020,
      doors: 1, // Main passenger door
      color: "White",
      seats: 29,
      transmission: "Manual",
      engine: "4.2L Diesel",
      fuelType: "Diesel",
    },
    pricePerDay: "$350/day",
  },
  {
    id: "mitsubishi-pajero-sport",
    name: "Mitsubishi Pajero Sport",
    shortDescription: "Rugged and reliable 7-seater SUV for family adventures.",
    detailedDescription:
      "The Mitsubishi Pajero Sport combines rugged capability with family-friendly features. Its 7-seat configuration, robust 4WD system, and comfortable interior make it a great choice for exploring Rwanda's national parks and scenic routes with peace of mind.",
    mainImage: "/placeholder.svg?height=300&width=400",
    galleryImages: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    capabilities: [
      { icon: "users", text: "7 Passengers" },
      { icon: "fuel", text: "Diesel" },
      { icon: "settings", text: "Automatic" },
      { icon: "settings", text: "Super Select 4WD" },
    ],
    specifications: {
      model: "SUV",
      year: 2022,
      doors: 4,
      color: "Deep Red",
      seats: 7,
      transmission: "8-speed Automatic",
      engine: "2.4L MIVEC Turbo Diesel",
      fuelType: "Diesel",
    },
    pricePerDay: "$230/day",
  },
  {
    id: "hyundai-creta",
    name: "Hyundai Creta",
    shortDescription: "Stylish and compact SUV, great for city driving.",
    detailedDescription:
      "The Hyundai Creta is a modern compact SUV that offers a blend of style, comfort, and efficiency. It's well-suited for navigating Kigali's urban environment and for day trips. Features a user-friendly infotainment system and good fuel economy.",
    mainImage: "/placeholder.svg?height=300&width=400",
    galleryImages: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    capabilities: [
      { icon: "users", text: "5 Passengers" },
      { icon: "fuel", text: "Petrol" },
      { icon: "settings", text: "Automatic" },
      { icon: "leaf", text: "Fuel Efficient" },
    ],
    specifications: {
      model: "Compact SUV",
      year: 2023,
      doors: 4,
      color: "Polar White",
      seats: 5,
      transmission: "Automatic",
      engine: "1.5L Petrol",
      fuelType: "Petrol",
    },
    pricePerDay: "$130/day",
  },
  {
    id: "volkswagen-amarok",
    name: "Volkswagen Amarok",
    shortDescription: "Premium pickup with comfort and strong performance.",
    detailedDescription:
      "The Volkswagen Amarok stands out in the pickup segment with its premium feel, comfortable ride, and powerful engine options. It's capable both on and off the road, making it a versatile choice for various needs in Rwanda, from business to leisure.",
    mainImage: "/placeholder.svg?height=300&width=400",
    galleryImages: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    capabilities: [
      { icon: "users", text: "5 Passengers" },
      { icon: "fuel", text: "Diesel" },
      { icon: "settings", text: "Automatic" },
      { icon: "settings", text: "4MOTION AWD" },
    ],
    specifications: {
      model: "Pickup Truck",
      year: 2022,
      doors: 4,
      color: "Indium Grey",
      seats: 5,
      transmission: "8-speed Automatic",
      engine: "3.0L V6 TDI Diesel",
      fuelType: "Diesel",
    },
    pricePerDay: "$260/day",
  },
  {
    id: "kia-seltos",
    name: "Kia Seltos",
    shortDescription: "Feature-packed compact SUV with a bold design.",
    detailedDescription:
      "The Kia Seltos is a compact SUV that doesn't skimp on features or style. It offers a comfortable and tech-savvy interior, making it an enjoyable ride for city exploration and short trips around Rwanda. Its distinctive design is sure to turn heads.",
    mainImage: "/placeholder.svg?height=300&width=400",
    galleryImages: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    capabilities: [
      { icon: "users", text: "5 Passengers" },
      { icon: "fuel", text: "Petrol" },
      { icon: "settings", text: "Automatic (CVT)" },
      { icon: "wind", text: "Sunroof" },
    ],
    specifications: {
      model: "Compact SUV",
      year: 2023,
      doors: 4,
      color: "Punchy Orange",
      seats: 5,
      transmission: "Automatic (CVT)",
      engine: "1.6L Petrol",
      fuelType: "Petrol",
    },
    pricePerDay: "$140/day",
  },
]
