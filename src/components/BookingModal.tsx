"use client"

import React, { useState } from "react"
import { Dialog } from "@headlessui/react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  itemName: string
  price: number | string
  type: "car" | "tour"
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, itemName, price, type }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    // Car-specific fields
    days: 1,
    startDate: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | { type: "success" | "error"; message: string }>(null)

  // Calculate price per day (car) or per person (tour)
  const priceNumber = typeof price === "string" ? parseFloat(price.replace(/[^0-9.]/g, "")) : price;
  const safePriceNumber = isNaN(priceNumber) ? 0 : priceNumber;
  const total = type === "car" ? safePriceNumber * formData.days : safePriceNumber;
  const deposit = total * 0.5;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "days" ? Number(value) : value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus(null)
    // Validate all fields
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setSubmitStatus({ type: "error", message: "Please fill in all fields." })
      return
    }
    if (!itemName || !price || !formData.email) {
      setSubmitStatus({ type: "error", message: "Booking error: missing required data. Please try again." })
      return
    }
    if (type === "car" && (!formData.days || !formData.startDate)) {
      setSubmitStatus({ type: "error", message: "Please enter number of days and start date." })
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          itemName,
          price: total, // send total for all days/people
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          message: formData.message,
          days: type === "car" ? formData.days : undefined,
          startDate: type === "car" ? formData.startDate : undefined,
        }),
      })
      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
        return
      } else {
        setSubmitStatus({ type: "error", message: data.error || "Failed to create payment session." })
      }
    } catch (error: any) {
      setSubmitStatus({ type: "error", message: error.message || "Booking failed. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded bg-white">
          <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900 p-4 border-b">
            Book {itemName}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {submitStatus && (
              <div
                className={`p-3 rounded text-sm font-medium mb-2 ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Your Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            {type === "car" && (
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1">Number of Days</label>
                  <input
                    type="number"
                    name="days"
                    min={1}
                    value={formData.days}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Additional Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows={3}
                required
              />
            </div>
            {/* Show calculated total and deposit */}
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-[#001934] mb-2">
              {type === "car" ? (
                <>
                  <div>Total for {formData.days} day{formData.days > 1 ? "s" : ""}: <span className="font-bold">${(total || 0).toFixed(2)}</span></div>
                  <div>Deposit (50%): <span className="font-bold">${(deposit || 0).toFixed(2)}</span></div>
                  <div className="text-xs text-gray-500 mt-1">You will pay the deposit now. The balance is due later.</div>
                  <div className="text-xs text-red-700 mt-2 font-semibold">NB: After receiving your payment, we'll contact you to arrange delivery of the car.</div>
                </>
              ) : (
                <>
                  <div>Total: <span className="font-bold">${(total || 0).toFixed(2)}</span></div>
                  <div>Deposit (50%): <span className="font-bold">${(deposit || 0).toFixed(2)}</span></div>
                  <div className="text-xs text-gray-500 mt-1">You will pay the deposit now. The balance is due later.</div>
                </>
              )}
            </div>
            <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed text-gray-600"
                  : "bg-[#B8860B] hover:bg-[#996f09] text-white shadow-md hover:shadow-lg"
              }`}
            >
                {isSubmitting ? "Sending..." : "Send Booking Request"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full font-semibold py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                disabled={isSubmitting}
              >
                Cancel
            </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default BookingModal
