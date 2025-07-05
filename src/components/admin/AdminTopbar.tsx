"use client"

import { supabase } from "@/src/lib/supabase"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

export default function AdminTopbar() {
  const router = useRouter()
  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }, [router])
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-[#001934] text-[#b8860b] shadow md:pl-64">
      <h1 className="text-lg font-bold tracking-wide">Royal Routes Admin</h1>
      <div className="flex items-center gap-4">
        {/* Placeholder for user info/logout */}
        <div className="hidden md:block text-white font-medium">Admin</div>
        <button className="rounded-full w-8 h-8 bg-[#b8860b] text-[#001934] flex items-center justify-center font-bold">N</button>
        <button onClick={handleLogout} className="ml-4 px-3 py-1 border border-[#b8860b] text-[#b8860b] bg-transparent rounded hover:bg-[#b8860b] hover:text-[#001934] transition-all text-sm font-semibold">Logout</button>
      </div>
    </header>
  )
} 