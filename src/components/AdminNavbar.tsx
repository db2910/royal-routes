"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  LogOut, 
  Menu, 
  X,
  Dashboard,
  MapPin,
  Car,
  Building,
  Calendar,
  Users
} from "lucide-react"
import { supabase } from "@/src/lib/supabase"

interface AdminNavbarProps {
  user?: any
  currentPage?: string
}

export default function AdminNavbar({ user, currentPage }: AdminNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Dashboard },
    { name: "Tours", href: "/admin/tours", icon: MapPin },
    { name: "Cars", href: "/admin/cars", icon: Car },
    { name: "Accommodations", href: "/admin/accommodations", icon: Building },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Users", href: "/admin/users", icon: Users },
  ]

  return (
    <nav className="bg-[#001934] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold font-arizona">Royal Routes Admin</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === item.name
                      ? "bg-[#B8860B] text-[#001934]"
                      : "text-white hover:bg-[#B8860B]/10 hover:text-[#B8860B]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-gray-300">Welcome, {user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-[#B8860B] text-[#001934] px-4 py-2 rounded-lg hover:bg-[#B8860B]/90 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#B8860B] transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      router.push(item.href)
                      setIsMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      currentPage === item.name
                        ? "bg-[#B8860B] text-[#001934]"
                        : "text-white hover:bg-[#B8860B]/10 hover:text-[#B8860B]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-[#B8860B] text-[#001934] px-4 py-2 rounded-lg hover:bg-[#B8860B]/90 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 