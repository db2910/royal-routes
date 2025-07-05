"use client"

import Image from "next/image"
import Link from "next/link"
import type { Tour } from "@/src/data/toursData"

interface TourCardProps {
  imageUrl: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
  tourId: string
  onBookClick?: (tour: Tour | string) => void
  tour?: Tour // Optional full tour object
}

export default function TourCard({
  imageUrl,
  title,
  description,
  ctaText,
  ctaLink,
  tourId,
  onBookClick,
  tour,
}: TourCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 min-w-[300px] sm:min-w-[350px]">
      {/* Image */}
      <div className="relative h-48 sm:h-56">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#001934] mb-3 line-clamp-2">{title}</h3>
        <p className="text-gray-600 mb-6 line-clamp-3">{description}</p>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link
            href={`/tours/${tourId}`}
            className="flex-1 border-2 border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#001934] font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-center"
          >
            Details
          </Link>
          {onBookClick ? (
          <button
              onClick={() => onBookClick && onBookClick(tour || title)}
              className="flex-1 bg-[#B8860B] text-[#001934] font-semibold py-2 px-4 rounded-lg hover:bg-[#B8860B]/90 transition-all duration-200 shadow-md hover:shadow-lg text-center"
          >
            {ctaText}
          </button>
          ) : (
            <Link
              href={`/tours/${tourId}`}
              className="flex-1 bg-[#B8860B] text-[#001934] font-semibold py-2 px-4 rounded-lg hover:bg-[#B8860B]/90 transition-all duration-200 shadow-md hover:shadow-lg text-center"
            >
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
