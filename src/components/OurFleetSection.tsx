"use client"

import { useState } from "react"
import CarCard from "./CarCard"
import type { Car } from "@/src/data/carsData"

interface OurFleetSectionProps {
  onBookClick: (carName: string) => void
}

export default function OurFleetSection({ onBookClick }: OurFleetSectionProps) {
  const [visibleCars, setVisibleCars] = useState(6)

  // Extended placeholder car data (8 cars total)
  const cars: Car[] = [
    {
      id: "toyota-land-cruiser-v8",
      name: "Toyota Land Cruiser V8",
      shortDescription: "Premium 4WD vehicle perfect for safari adventures and rough terrain exploration.",
      detailedDescription: "Detailed description for Toyota Land Cruiser V8...", // Add detailed description
      mainImage: "/images/vehicles/land4.JPG",
    galleryImages: [
      "/images/vehicles/land4.JPG",
      "/images/vehicles/land5.JPG",
      "/images/vehicles/land6.JPG",
      "/images/vehicles/land7.JPG",
      "/images/vehicles/land8.JPG",
    ],
      capabilities: [
        { icon: "users", text: "7 Passengers" },
        { icon: "fuel", text: "Diesel Engine" },
        { icon: "settings", text: "Automatic" },
        { icon: "snowflake", text: "Air Conditioning" },
      ],
      specifications: {
        // Add specifications
        model: "SUV",
        year: 2022,
        doors: 4,
        color: "White",
        seats: 7,
        transmission: "Automatic",
        engine: "4.5L V8",
        fuelType: "Diesel",
      },
      pricePerDay: "$250/day", // Add price
    },
    {
      id: "land-rover-range-rover", // A good, clear ID for a Range Rover
      name: "Land Rover Range Rover", // Full, common name
      shortDescription: "Premium luxury SUV for unparalleled comfort and versatile performance.",
      detailedDescription:
        "Experience the pinnacle of luxury and capability with the Land Rover Range Rover. This iconic SUV offers a supremely comfortable ride, advanced technology, and robust off-road prowess, making it perfect for executive travel, family adventures, or exploring Rwanda's diverse landscapes in style. Its opulent interior, intuitive infotainment, and powerful engine ensure every journey is an indulgence. Equipped with advanced safety features and a refined automatic transmission, it delivers a smooth and secure drive on any terrain.",
      mainImage: "/images/vehicles/range.png", // Placeholder - you'd replace with the actual path to the main image
      galleryImages: [
        "/images/vehicles/range.PNG",
        "/images/vehicles/range1.PNG", 
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
        "/images/vehicles/benzc.JPG", // Placeholder for interior shot
        "/images/vehicles/benzc1.JPG",    // Placeholder for side view
        "/images/vehicles/benzc2.JPG",
        "/images/vehicles/benzc3.JPG",
        "/images/vehicles/benzc4.JPG",
        "/images/vehicles/benzc6.JPG",    // Placeholder for rear view
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
    // Additional cars for Load More functionality
    {
      id: "toyota-corolla-hatchback", // A good, specific ID
      name: "Toyota Corolla Hatchback", // Clear name
      shortDescription: "Economical and reliable hatchback, perfect for city commutes and small trips.",
      detailedDescription:
        "The Toyota Corolla Hatchback is renowned for its exceptional fuel efficiency, legendary reliability, and easy maneuverability, making it an ideal choice for navigating Kigali's urban landscape and short excursions. Its compact size belies a surprisingly spacious interior for up to five passengers, providing comfort for daily errands or quick getaways. With a dependable engine and user-friendly features, this Corolla offers a practical and cost-effective solution for your transportation needs in Rwanda.",
      mainImage: "/images/vehicles/col1.jpg", // Placeholder - replace with the actual path to your main image
      galleryImages: [
        "/images/vehicles/col.JPG",    // Placeholder for front view
        "/images/vehicles/col1.JPG", // Placeholder for interior shot
        "/images/vehicles/col2.JPG",
        "/images/vehicles/col3.JPG",
        "/images/vehicles/col4.JPG",
        "/images/vehicles/col5.JPG",
        "/images/vehicles/col6.JPG",
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
    {
      id: "mitsubishi-pajero-sport",
      name: "Mitsubishi Pajero Sport",
      shortDescription: "Rugged SUV designed for off-road adventures and comfortable highway cruising.",
      detailedDescription: "Detailed description for Mitsubishi Pajero Sport...",
      mainImage: "/placeholder.svg?height=300&width=400",
      galleryImages: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      capabilities: [
        { icon: "users", text: "7 Passengers" },
        { icon: "fuel", text: "Diesel Engine" },
        { icon: "settings", text: "Automatic" },
        { icon: "users", text: "4WD Capability" },
      ],
      specifications: {
        model: "SUV",
        year: 2021,
        doors: 5,
        color: "Silver",
        seats: 7,
        transmission: "Automatic",
        engine: "3.2L Diesel",
        fuelType: "Diesel",
      },
      pricePerDay: "$260/day",
    },
  ]

  const handleLoadMore = () => {
    setVisibleCars((prev) => Math.min(prev + 2, cars.length))
  }

  const showLoadMore = visibleCars < cars.length

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#001934] mb-4">Our Fleet</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our diverse range of well-maintained vehicles for your perfect journey
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {cars.slice(0, visibleCars).map((car) => (
            <CarCard key={car.id} car={car} onBookClick={onBookClick} />
          ))}
        </div>

        {/* Load More Button */}
        {showLoadMore && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="bg-[#B8860B] text-[#001934] font-semibold py-3 px-8 rounded-lg hover:bg-[#B8860B]/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
