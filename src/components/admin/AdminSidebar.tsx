"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Home, Map, Car, Bed, Calendar, Users, Settings, X } from 'lucide-react'

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/tours', label: 'Tours', icon: Map },
  { href: '/admin/cars', label: 'Cars', icon: Car },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { href: '/admin/accommodations', label: 'Accommodations', icon: Bed },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#001934] text-[#b8860b] p-2 rounded-lg shadow-lg"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <span className="sr-only">Open sidebar</span>
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
      </button>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#001934] text-white z-40 transform transition-transform duration-300 md:relative md:translate-x-0 md:flex md:flex-col md:w-56 md:h-auto ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        style={{ boxShadow: '2px 0 8px rgba(0,0,0,0.04)' }}
      >
        {/* Close button on mobile */}
        <div className="flex items-center justify-between md:hidden p-4 border-b border-[#b8860b]/20">
          <span className="font-bold text-lg text-[#b8860b]">Menu</span>
          <button onClick={() => setOpen(false)} aria-label="Close sidebar">
            <X className="w-6 h-6 text-[#b8860b]" />
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-1 mt-8 md:mt-0">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-6 py-3 text-base font-medium hover:bg-[#b8860b]/20 transition-colors rounded-r-full focus:outline-none focus:bg-[#b8860b]/30"
            >
              <Icon className="w-5 h-5 text-[#b8860b]" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}
    </>
  )
} 