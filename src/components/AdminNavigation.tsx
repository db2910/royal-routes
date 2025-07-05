"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { 
  LogOut, 
  Menu, 
  X,
  LayoutDashboard,
  MapPin,
  Car,
  Building2,
  Calendar,
  Users,
  Settings,
  ChevronDown
} from "lucide-react"
import { supabase } from "@/src/lib/supabase"

interface AdminNavigationProps {
  user?: any
}

export default function AdminNavigation({ user }: AdminNavigationProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const navigation = [
    { 
      name: "Dashboard", 
      href: "/admin/dashboard", 
      icon: LayoutDashboard,
      current: pathname === "/admin/dashboard"
    },
    { 
      name: "Tours", 
      href: "/admin/tours", 
      icon: MapPin,
      current: pathname.startsWith("/admin/tours")
    },
    { 
      name: "Cars", 
      href: "/admin/cars", 
      icon: Car,
      current: pathname.startsWith("/admin/cars")
    },
    { 
      name: "Accommodations", 
      href: "/admin/accommodations", 
      icon: Building2,
      current: pathname.startsWith("/admin/accommodations")
    },
    { 
      name: "Events", 
      href: "/admin/events", 
      icon: Calendar,
      current: pathname.startsWith("/admin/events")
    },
    { 
      name: "Users", 
      href: "/admin/users", 
      icon: Users,
      current: pathname.startsWith("/admin/users")
    },
    { 
      name: "Settings", 
      href: "/admin/settings", 
      icon: Settings,
      current: pathname.startsWith("/admin/settings")
    }
  ]

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#001934] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white font-arizona">Royal Routes</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.href)
                    setIsSidebarOpen(false)
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.current
                      ? "bg-[#B8860B] text-[#001934]"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              )
            })}
          </div>
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#B8860B] rounded-full flex items-center justify-center">
              <span className="text-[#001934] font-semibold text-sm">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.email}
              </p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Top navigation */}
      <div className="lg:hidden bg-[#001934] text-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-white hover:text-[#B8860B] transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold font-arizona">Royal Routes Admin</h1>
          </div>

          {/* Mobile user menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 text-white hover:text-[#B8860B] transition-colors"
            >
              <div className="w-8 h-8 bg-[#B8860B] rounded-full flex items-center justify-center">
                <span className="text-[#001934] font-semibold text-sm">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <p className="font-medium">{user?.email}</p>
                  <p className="text-gray-500">Administrator</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
} 