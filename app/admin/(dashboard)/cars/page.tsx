"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { supabase } from "@/src/lib/supabase"
import { Pencil, Trash2, EyeOff, Eye } from "lucide-react"

export default function AdminCarsPage() {
  const [cars, setCars] = useState<any[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("cars")
        .select("id, name, model, year, price_per_day, is_active, main_image, features")
      if (!error && data) {
        setCars(data)
      } else {
        setCars([])
      }
      setLoading(false)
    }
    fetchCars()
  }, [])

  // Filtered and searched cars
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase()) || car.model.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus ? car.status === filterStatus : true
    return matchesSearch && matchesStatus
  })

  const toggleSelect = (id: string) => {
    setSelected(sel => sel.includes(id) ? sel.filter(s => s !== id) : [...sel, id])
  }

  const selectAll = () => {
    setSelected(filteredCars.map(car => car.id))
  }

  const clearSelected = () => setSelected([])

  // Placeholder bulk actions
  const handleBulkDelete = (id: string) => {
    setCars(cars.filter(car => car.id !== id))
    setSelected([])
  }

  const handleBulkStatus = (status: string) => {
    setCars(cars.map(car => selected.includes(car.id) ? { ...car, status } : car))
    setSelected([])
  }

  const handleToggleActive = async (carId: string, currentActive: boolean) => {
    const { error } = await supabase
      .from("cars")
      .update({ is_active: !currentActive })
      .eq("id", carId)
    if (!error) {
      setCars(cars => cars.map(car => car.id === carId ? { ...car, is_active: !currentActive } : car))
    }
  }

  const handleBulkPublish = async () => {
    const { error } = await supabase
      .from("cars")
      .update({ is_active: true })
      .in("id", selected)
    if (!error) {
      setCars(cars => cars.map(car => selected.includes(car.id) ? { ...car, is_active: true } : car))
      setSelected([])
    }
  }

  const handleBulkUnpublish = async () => {
    const { error } = await supabase
      .from("cars")
      .update({ is_active: false })
      .in("id", selected)
    if (!error) {
      setCars(cars => cars.map(car => selected.includes(car.id) ? { ...car, is_active: false } : car))
      setSelected([])
    }
  }

  const handleDelete = async (carId: string) => {
    const { error } = await supabase.from("cars").delete().eq("id", carId)
    if (!error) {
      setCars(cars => cars.filter(car => car.id !== carId))
      setSelected(sel => sel.filter(id => id !== carId))
    } else {
      alert("Failed to delete car. Please try again.")
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <Input
            placeholder="Search by name or model..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-64"
          />
        </div>
        <Link href="/admin/cars/new">
          <Button style={{ backgroundColor: '#B8860B', color: '#001934', fontWeight: 600 }}>Add New Car</Button>
        </Link>
      </div>

      {selected.length > 0 && (
        <div className="mb-4 flex gap-2 items-center bg-yellow-50 border border-yellow-200 rounded p-3">
          <span>{selected.length} selected</span>
          <Button variant="destructive" onClick={() => handleBulkDelete(selected[0])}>Delete</Button>
          <Button style={{ backgroundColor: '#B8860B', color: '#001934' }} onClick={handleBulkPublish}>Publish</Button>
          <Button style={{ backgroundColor: '#001934', color: '#B8860B' }} onClick={handleBulkUnpublish}>Unpublish</Button>
          <Button variant="outline" onClick={clearSelected}>Clear</Button>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3"><Checkbox checked={selected.length === filteredCars.length && filteredCars.length > 0} onCheckedChange={selectAll} /></th>
              <th className="px-4 py-3 text-[#001934]">Image</th>
              <th className="px-4 py-3 text-[#001934]">Name</th>
              <th className="px-4 py-3 text-[#001934]">Model</th>
              <th className="px-4 py-3 text-[#001934]">Year</th>
              <th className="px-4 py-3 text-[#001934]">Price/Day</th>
              <th className="px-4 py-3 text-[#001934]">Features</th>
              <th className="px-4 py-3 text-[#001934]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="text-center py-8 text-[#001934]">Loading cars...</td></tr>
            ) : filteredCars.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-8 text-[#001934]">No cars found.</td></tr>
            ) : (
              <AnimatePresence>
                {filteredCars.map(car => (
                  <motion.tr
                    key={car.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-[#B8860B]/10"
                  >
                    <td className="px-4 py-3 text-center">
                      <Checkbox checked={selected.includes(car.id)} onCheckedChange={() => toggleSelect(car.id)} />
                    </td>
                    <td className="px-4 py-3">
                      <img src={car.main_image || "/placeholder.svg"} alt={car.name} className="w-16 h-12 object-cover rounded border-2 border-[#001934]" />
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#001934]">{car.name}</td>
                    <td className="px-4 py-3 text-[#001934]">{car.model}</td>
                    <td className="px-4 py-3 text-[#001934]">{car.year}</td>
                    <td className="px-4 py-3 text-[#B8860B] font-bold">{typeof car.price_per_day === 'number' ? `$${car.price_per_day}/day` : `$${car.price_per_day}/day`}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(car.features) && car.features.map((feature: string, idx: number) => (
                          <span key={idx} className="bg-[#B8860B]/20 text-[#001934] px-2 py-1 rounded text-xs font-medium">{feature}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <Link href={`/admin/cars/${car.id}/edit`} className="ml-2 text-[#B8860B] hover:underline font-semibold">Edit</Link>
                      <button title="Delete" className="hover:text-red-600 text-[#001934]" onClick={() => handleDelete(car.id)}>
                        <Trash2 size={18} />
                      </button>
                      {car.is_active ? (
                        <button title="Unpublish" className="hover:text-[#B8860B] text-[#001934]" onClick={() => handleToggleActive(car.id, true)}>
                          <EyeOff size={18} />
                        </button>
                      ) : (
                        <button title="Publish" className="hover:text-[#001934] text-[#B8860B]" onClick={() => handleToggleActive(car.id, false)}>
                          <Eye size={18} />
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
} 