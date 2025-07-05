"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/src/lib/supabase"

export default function TestSearchPage() {
  const [tours, setTours] = useState([])
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const [{ data: toursData }, { data: carsData }] = await Promise.all([
        supabase.from("tours").select("*"),
        supabase.from("cars").select("*")
      ])
      setTours(toursData || [])
      setCars(carsData || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen pt-20 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Data Test Page</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tours Data ({tours.length} items)</h2>
          <div className="grid gap-4">
            {tours.slice(0, 3).map((tour) => (
              <div key={tour.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold">{tour.title}</h3>
                <p className="text-sm text-gray-600">{tour.destination}</p>
                <p className="text-sm">{tour.short_description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cars Data ({cars.length} items)</h2>
          <div className="grid gap-4">
            {cars.slice(0, 3).map((car) => (
              <div key={car.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold">{car.name}</h3>
                <p className="text-sm text-gray-600">{car.specifications?.model}</p>
                <p className="text-sm">{car.short_description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Test Search Links:</h3>
          <div className="space-y-2">
            <a href="/search?type=tour&location=" className="block text-blue-600 hover:underline">
              Search All Tours
            </a>
            <a href="/search?type=car&location=" className="block text-blue-600 hover:underline">
              Search All Cars
            </a>
            <a href="/search?type=tour&location=volcanoes" className="block text-blue-600 hover:underline">
              Search Tours: "volcanoes"
            </a>
            <a href="/search?type=car&location=toyota" className="block text-blue-600 hover:underline">
              Search Cars: "toyota"
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
