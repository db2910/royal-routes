"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { CheckCircle } from "lucide-react"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function BookingSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) {
      setError("Missing session ID. Please check your email for confirmation.")
      setLoading(false)
      return
    }
    async function fetchBooking() {
      setLoading(true)
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("stripe_session_id", sessionId)
        .single()
      if (error || !data) {
        setError("We could not find your booking. If you paid, please check your email for confirmation.")
      } else {
        setBooking(data)
      }
      setLoading(false)
    }
    fetchBooking()
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#B8860B]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Booking Not Found</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-gray-500 text-sm">If you have any questions, please contact us at <a href="mailto:donkyleben@gmail.com" className="underline">donkyleben@gmail.com</a>.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center">
        <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
        <h2 className="text-3xl font-bold text-[#001934] mb-2">Booking Confirmed!</h2>
        <p className="text-lg text-gray-700 mb-6">Thank you, <span className="font-semibold">{booking.customer_name}</span>! Your booking is confirmed and your deposit has been received.</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6 text-left">
          <div className="mb-2"><b>Type:</b> {booking.type === "car" ? "Car Rental" : "Tour"}</div>
          <div className="mb-2"><b>{booking.type === "car" ? "Car" : "Tour"}:</b> {booking.item_name}</div>
          {booking.people && (
            <div className="mb-2"><b>People:</b> {booking.people}</div>
          )}
          {booking.arrival_date && (
            <div className="mb-2"><b>Arrival Date:</b> {booking.arrival_date}</div>
          )}
          <div className="mb-2"><b>Email:</b> {booking.customer_email}</div>
          {booking.customer_phone && (
            <div className="mb-2"><b>Phone:</b> {booking.customer_phone}</div>
          )}
          {booking.message && (
            <div className="mb-2"><b>Message:</b> {booking.message}</div>
          )}
          <div className="mb-2"><b>Deposit Paid:</b> ${ (booking.amount_paid / 100).toFixed(2) }</div>
          <div className="mb-2"><b>Payment Status:</b> {booking.payment_status}</div>
        </div>
        <p className="text-gray-700 mb-2">A confirmation email has been sent to <b>{booking.customer_email}</b>.</p>
        <p className="text-gray-500 text-sm">If you have any questions, please contact us at <a href="mailto:donkyleben@gmail.com" className="underline">donkyleben@gmail.com</a>.</p>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>}>
      <BookingSuccessPage />
    </Suspense>
  )
} 