'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, CheckCircle2, MapPin, ShieldCheck } from 'lucide-react'
import { PriceBreakdown } from '@/features/cars/components/PriceBreakdown'
import { BookingSummary } from '@/features/cars/components/BookingSummary'
import { bookingService } from '@/services/bookingService'
import { carService } from '@/services/carService'
import { useToast } from '@/context/ToastContext'

export default function ReviewPage() {
  const router = useRouter()
  const toast  = useToast()
  const [booking, setBooking] = useState(null)
  const [car,     setCar]     = useState(null)
  const [agreed,  setAgreed]  = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('drivex_booking_draft')
      if (!raw) { router.replace('/cars'); return }
      const b = JSON.parse(raw)
      setBooking(b)
      if (b.carId) carService.getCarById(b.carId).then(setCar).catch(() => {})
    } catch { router.replace('/cars') }
  }, [router])

  const handleConfirm = async () => {
    if (!agreed) { toast({ message: 'Please agree to the terms to continue.', type: 'error' }); return }
    setLoading(true)
    try {
      const created = await bookingService.createBooking({ ...booking, driverName: 'Alex Morgan' })
      sessionStorage.setItem('drivex_booking_pending', JSON.stringify({ ...created, car: booking.car }))
      router.push('/checkout')
    } catch (e) {
      toast({ message: e.message || 'Failed to create booking.', type: 'error' })
    } finally { setLoading(false) }
  }

  if (!booking) return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
    </div>
  )

  const infoRows = [
    ['Pickup',    `${booking.pickupDate} at ${booking.pickupTime}`],
    ['Return',    `${booking.returnDate} at ${booking.returnTime}`],
    ['Pickup location',   booking.pickupLocation],
    ['Drop-off location', booking.dropoffLocation],
    ['Driver age',        booking.driverAge],
    ['License',           booking.driverLicense],
    ...(booking.notes ? [['Notes', booking.notes]] : []),
  ]

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="border-b border-gray-100 bg-white">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-12">
          <a href={car ? `/cars/${car.id}/rent` : '/cars'} className="text-[13px] font-semibold text-gray-500 hover:text-green-600 transition mb-4 block">← Edit booking</a>
          <p className="text-[11px] font-bold uppercase tracking-widest text-green-600">Step 2 of 3</p>
          <h1 className="mt-1 text-[26px] font-black text-gray-900">Review your booking</h1>
        </div>
      </div>

      <div className="w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-5">

            {/* Car summary */}
            {car && <BookingSummary car={car} booking={booking} />}

            {/* Booking details */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, delay: .1 }}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 px-4 py-4">
                <h3 className="font-bold text-gray-900">Booking Details</h3>
              </div>
              <div className="divide-y divide-gray-50 px-5">
                {infoRows.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-3">
                    <p className="text-[12px] text-gray-400">{k}</p>
                    <p className="text-[13px] font-semibold text-gray-900">{v}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cancellation policy */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, delay: .15 }}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-3"><ShieldCheck size={17} className="text-green-500" />Cancellation Policy</h3>
              <ul className="space-y-2 text-[13px] text-gray-600">
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green-500" />Free cancellation up to 48 hours before pickup</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green-500" />50% refund for cancellations 24–48 hours before pickup</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green-500" />No refund for cancellations less than 24 hours before pickup</li>
              </ul>
            </motion.div>

            {/* Terms */}
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-green-600 rounded" />
              <span className="text-[13px] leading-6 text-gray-700">
                I agree to the <a href="#" className="text-green-600 hover:underline font-semibold">rental terms and conditions</a>, <a href="#" className="text-green-600 hover:underline font-semibold">privacy policy</a>, and confirm that all the information provided is accurate.
              </span>
            </label>

            <button onClick={handleConfirm} disabled={loading || !agreed}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 text-[15px] font-bold text-white shadow-sm shadow-green-200 transition hover:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? <><div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> Confirming…</> : <>Proceed to Payment <ArrowRight size={17} /></>}
            </button>
          </div>

          {/* Price breakdown */}
          <div className="h-fit lg:sticky lg:top-[84px] space-y-4">
            <PriceBreakdown breakdown={booking} />
          </div>
        </div>
      </div>
    </div>
  )
}
