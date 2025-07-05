'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../../../src/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminToursPage() {
  const [tours, setTours] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTours() {
      setLoading(true)
      setError('')
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) setError('Failed to load tours')
      else setTours(data || [])
      setLoading(false)
    }
    fetchTours()
  }, [])

  // Delete tour
  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this tour?')) return
    setActionLoading(id)
    const { error } = await supabase.from('tours').delete().eq('id', id)
    if (!error) setTours(tours => tours.filter(t => t.id !== id))
    setActionLoading(null)
  }

  // Toggle publish/unpublish
  async function handleToggleActive(id: string, isActive: boolean) {
    setActionLoading(id)
    const { error } = await supabase.from('tours').update({ is_active: !isActive }).eq('id', id)
    if (!error) setTours(tours => tours.map(t => t.id === id ? { ...t, is_active: !isActive } : t))
    setActionLoading(null)
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 mt-2">
        <h1 className="text-2xl font-bold text-[#001934]">Tours</h1>
        <Link
          href="/admin/tours/new"
          className="inline-block bg-[#b8860b] text-[#001934] font-semibold px-5 py-2 rounded-lg shadow hover:bg-[#b8860b]/90 transition"
        >
          + Add Tour
        </Link>
      </div>
      {/* Search/filter placeholder */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tours..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent"
        />
      </div>
      {/* Animated list/table */}
      <div className="rounded-xl bg-white shadow p-0 overflow-x-auto min-h-[200px]">
        {loading ? (
          <div className="flex items-center justify-center h-32 text-gray-400">Loading tours...</div>
        ) : error ? (
          <div className="flex items-center justify-center h-32 text-red-500">{error}</div>
        ) : tours.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-gray-400">No tours found.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#001934]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Duration</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              <AnimatePresence>
                {tours.map((tour) => (
                  <motion.tr
                    key={tour.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-[#f5f6fa] transition"
                  >
                    <td className="px-4 py-3 font-medium text-[#001934]">{tour.title}</td>
                    <td className="px-4 py-3 text-gray-600">{tour.destination || tour.location}</td>
                    <td className="px-4 py-3 text-gray-600">{tour.price_per_person || tour.price}</td>
                    <td className="px-4 py-3 text-gray-600">{tour.duration || tour.duration_days + ' days'}</td>
                    <td className="px-4 py-3 text-center">
                      {tour.is_active ? (
                        <span className="inline-block px-2 py-1 text-xs rounded bg-[#b8860b]/20 text-[#b8860b] font-semibold">Published</span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs rounded bg-gray-200 text-gray-500 font-semibold">Draft</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {/* Actions placeholder */}
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="text-[#001934] hover:text-[#b8860b] transition"
                          title="Edit"
                          onClick={() => router.push(`/admin/tours/${tour.id}/edit`)}
                          disabled={!!actionLoading}
                        >
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M16.475 5.408a2.2 2.2 0 1 1 3.112 3.112l-9.1 9.1a2 2 0 0 1-.707.464l-3.2 1.067a.5.5 0 0 1-.633-.633l1.067-3.2a2 2 0 0 1 .464-.707l9.1-9.1Z"/></svg>
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 transition"
                          title="Delete"
                          onClick={() => handleDelete(tour.id)}
                          disabled={!!actionLoading}
                        >
                          {actionLoading === tour.id ? (
                            <span className="animate-spin">🗑️</span>
                          ) : (
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12Z"/></svg>
                          )}
                        </button>
                        <button
                          className={tour.is_active ? "text-gray-400 hover:text-[#b8860b]" : "text-[#b8860b] hover:text-[#001934]"}
                          title={tour.is_active ? "Unpublish" : "Publish"}
                          onClick={() => handleToggleActive(tour.id, tour.is_active)}
                          disabled={!!actionLoading}
                        >
                          {actionLoading === tour.id ? (
                            <span className="animate-spin">⏳</span>
                          ) : (
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 19V5m0 0-7 7m7-7 7 7"/></svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
} 