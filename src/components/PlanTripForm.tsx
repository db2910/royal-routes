"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { sendFormEmail } from "@/src/actions/send-form-email"

interface PlanTripFormProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  phone: string
  nationality: string
  numberOfPeople: string
  arrivalDate: string
  departureDate: string
  category: string
  interests: string[]
  message: string
}

export default function PlanTripForm({ isOpen, onClose }: PlanTripFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    numberOfPeople: "",
    arrivalDate: "",
    departureDate: "",
    category: "",
    interests: [],
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  // Prevent body scroll when form is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.width = "100%"
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
      }
    }

    return () => {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (category: string) => {
    setFormData((prev) => ({ ...prev, category }))
  }

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.nationality ||
        !formData.numberOfPeople ||
        !formData.arrivalDate ||
        !formData.departureDate ||
        !formData.category
      ) {
        throw new Error("Please fill in all required fields")
      }

      // Prepare form data for email
      const emailData = {
        ...formData,
        interests: formData.interests.join(", ") || "None specified",
        formType: "Trip Planning Request",
      }

      // Send emails
      const result = await sendFormEmail({
        formType: "Trip Planning Request",
        formData: emailData,
        userEmail: formData.email,
        userName: formData.name,
      })

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message:
            result.message ||
            "✅ Your trip planning request has been submitted successfully! We'll contact you within 24 hours.",
        })

        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            nationality: "",
            numberOfPeople: "",
            arrivalDate: "",
            departureDate: "",
            category: "",
            interests: [],
            message: "",
          })
          setSubmitStatus({ type: null, message: "" })
          onClose()
        }, 3000)
      } else {
        throw new Error(result.error || "Failed to submit trip planning request")
      }
    } catch (error) {
      console.error("Trip planning form submission error:", error)
      setSubmitStatus({
        type: "error",
        message: `❌ ${error instanceof Error ? error.message : "Failed to submit request"}. Please try again or contact us at +250 788 123 456.`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const interestOptions = [
    "Gorilla Tracking",
    "Chimpanzee Tracking",
    "Golden Monkey Tracking",
    "Games Drives",
    "Cultural Safaris",
    "Easy to Moderate Hiking",
    "Moderate to Difficult Hiking",
    "Birding",
    "Boat trips",
    "Relaxation",
    "Visiting Community Projects",
    "Volunteering",
    "Other",
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Form Panel - Always positioned from top-left */}
      <div
        className={`relative h-full w-full sm:w-96 md:w-[28rem] lg:w-[32rem] bg-gradient-to-br from-yellow-100 to-yellow-50 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 bg-gradient-to-r from-yellow-100 to-yellow-50 border-b border-yellow-200 p-4 sm:p-6 z-10 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#001934] font-arizona">Start Planning</h2>
              <p className="text-lg sm:text-xl font-semibold text-[#001934] font-arizona">Your Dream Vacation</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-yellow-200 rounded-full transition-colors duration-200 flex-shrink-0"
            >
              <X className="w-5 h-5 text-[#001934]" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Status Message */}
            {submitStatus.type && (
              <div
                className={`mb-4 p-4 rounded-lg border ${
                  submitStatus.type === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <p className="text-sm font-medium">{submitStatus.message}</p>
              </div>
            )}
            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#001934] mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full Name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#001934] mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your Email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                />
              </div>
            </div>

            {/* Phone and Nationality */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#001934] mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#001934] mb-2">Nationality *</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  placeholder="Enter your Nationality"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                />
              </div>
            </div>

            {/* Number of People and Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#001934] mb-2">Number of people *</label>
                <input
                  type="number"
                  name="numberOfPeople"
                  value={formData.numberOfPeople}
                  onChange={handleInputChange}
                  placeholder="people"
                  min="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#001934] mb-2">Arrival Date *</label>
                <input
                  type="date"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#001934] mb-2">Departure Date *</label>
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-[#001934] mb-3">Categories *</label>
              <div className="flex flex-wrap gap-4">
                {["Luxury", "Moderate", "Budget"].map((category) => (
                  <label key={category} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={formData.category === category}
                      onChange={() => handleCategoryChange(category)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
                        formData.category === category ? "border-[#B8860B] bg-[#B8860B]" : "border-gray-400"
                      }`}
                    >
                      {formData.category === category && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-[#001934]">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-[#001934] mb-3">Interests</label>
              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3 bg-white">
                <div className="grid grid-cols-1 gap-2">
                  {interestOptions.map((interest) => (
                    <label key={interest} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="w-4 h-4 text-[#B8860B] border-gray-300 rounded focus:ring-[#B8860B] focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-[#001934]">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-[#001934] mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message/More detail"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed text-gray-600"
                  : "bg-[#B8860B] hover:bg-[#996f09] text-white"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Request</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
