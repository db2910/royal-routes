"use client"

import { useState, useEffect } from "react"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MapPin, 
  Car, 
  Building2,
  Calendar,
  DollarSign
} from "lucide-react"
import { supabase } from "@/src/lib/supabase"

interface AnalyticsData {
  totalTours: number
  totalCars: number
  totalAccommodations: number
  totalEvents: number
  recentAdditions: {
    tours: number
    cars: number
    accommodations: number
    events: number
  }
  popularLocations: Array<{
    location: string
    count: number
  }>
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      // Fetch counts
      const [tours, cars, accommodations, events] = await Promise.all([
        supabase.from("tours").select("id", { count: "exact" }),
        supabase.from("cars").select("id", { count: "exact" }),
        supabase.from("accommodations").select("id", { count: "exact" }),
        supabase.from("upcoming_events").select("id", { count: "exact" })
      ])

      // Fetch recent additions (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const [recentTours, recentCars, recentAccommodations, recentEvents] = await Promise.all([
        supabase.from("tours").select("id", { count: "exact" }).gte("created_at", thirtyDaysAgo.toISOString()),
        supabase.from("cars").select("id", { count: "exact" }).gte("created_at", thirtyDaysAgo.toISOString()),
        supabase.from("accommodations").select("id", { count: "exact" }).gte("created_at", thirtyDaysAgo.toISOString()),
        supabase.from("upcoming_events").select("id", { count: "exact" }).gte("created_at", thirtyDaysAgo.toISOString())
      ])

      // Fetch popular locations
      const { data: locationData } = await supabase
        .from("tours")
        .select("location")

      const locationCounts = locationData?.reduce((acc: any, tour) => {
        acc[tour.location] = (acc[tour.location] || 0) + 1
        return acc
      }, {}) || {}

      const popularLocations = Object.entries(locationCounts)
        .map(([location, count]) => ({ location, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      setAnalytics({
        totalTours: tours.count || 0,
        totalCars: cars.count || 0,
        totalAccommodations: accommodations.count || 0,
        totalEvents: events.count || 0,
        recentAdditions: {
          tours: recentTours.count || 0,
          cars: recentCars.count || 0,
          accommodations: recentAccommodations.count || 0,
          events: recentEvents.count || 0
        },
        popularLocations
      })
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-500">Failed to load analytics</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tours</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalTours}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{analytics.recentAdditions.tours} this month
              </p>
            </div>
            <MapPin className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cars</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalCars}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{analytics.recentAdditions.cars} this month
              </p>
            </div>
            <Car className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Accommodations</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalAccommodations}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{analytics.recentAdditions.accommodations} this month
              </p>
            </div>
            <Building2 className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Events</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalEvents}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{analytics.recentAdditions.events} this month
              </p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Popular Locations */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-[#001934] mb-4 font-arizona">Popular Locations</h3>
        <div className="space-y-3">
          {analytics.popularLocations.map((location, index) => (
            <div key={location.location} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-[#B8860B] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
                <span className="font-medium text-gray-900">{location.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#B8860B] h-2 rounded-full" 
                    style={{ width: `${(location.count / Math.max(...analytics.popularLocations.map(l => l.count))) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{location.count} tours</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-[#001934] mb-4 font-arizona">Recent Activity (Last 30 Days)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{analytics.recentAdditions.tours}</p>
            <p className="text-sm text-gray-600">New Tours</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Car className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{analytics.recentAdditions.cars}</p>
            <p className="text-sm text-gray-600">New Cars</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Building2 className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">{analytics.recentAdditions.accommodations}</p>
            <p className="text-sm text-gray-600">New Accommodations</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Calendar className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">{analytics.recentAdditions.events}</p>
            <p className="text-sm text-gray-600">New Events</p>
          </div>
        </div>
      </div>
    </div>
  )
} 