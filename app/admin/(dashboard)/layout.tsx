"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from '@/src/lib/supabase'
import AdminSidebar from '@/src/components/admin/AdminSidebar'
import AdminTopbar from '@/src/components/admin/AdminTopbar'

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.replace("/admin/login")
      } else {
        setChecking(false)
      }
    }
    checkSession()
  }, [router])

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center text-[#001934]">Checking authentication...</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminTopbar />
      <div className="flex-1 flex overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
} 