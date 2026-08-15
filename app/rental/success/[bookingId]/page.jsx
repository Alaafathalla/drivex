'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, CheckCircle2, Download, MapPin, ReceiptText } from 'lucide-react'

export default function RentalSuccessPage({ params }) {
  const { bookingId } = use(params)
  const [result, setResult] = useState(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('drivex_payment_result')
      if (raw) setResult(JSON.parse(raw))
    } catch {}
  }, [])

  const booking = result?.booking
  const car     = result?.car || result?.booking?.car
  const txnId   = result?.transactionId

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: .94, y: 20 }}
        animate={{ opacity: 1, scale: 1,   y: 0 }}
        transition={{ duration: .55, ease: [.22,1,.36,1] }}
        className="w-full max-w-lg"
      >
        {/* Animated checkmark */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: .15 }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: .35, type: 'spring', stiffness: 300 }}>
              <CheckCircle2 size={52} className="text-green-600" />
            </motion.div>
          </motion.div>
        </div>

        <div className="text-center mb-7">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}
            className="text-[30px] font-black text-gray-900">Booking Confirmed!</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }}
            className="mt-2 text-[15px] text-gray-500">Your rental has been successfully booked and payment processed.</motion.p>
        </div>

        {/* Booking card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 }}
          className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-5">

          {/* Car */}
          {car && (
            <div className="flex items-center gap-4 border-b border-gray-100 p-5">
              {car.image || car.images?.[0] ? (
                <img src={car.image || car.images[0]} alt="Car"
                  className="h-16 w-24 shrink-0 rounded-xl object-cover bg-gray-100" />
              ) : (
                <div className="h-16 w-24 shrink-0 rounded-xl bg-gray-100" />
              )}
              <div>
                <p className="font-bold text-gray-900">{car.brand} {car.model}</p>
                <p className="text-[12px] text-gray-400">{car.year}</p>
              </div>
            </div>
          )}

          {/* Booking details */}
          <div className="divide-y divide-gray-50 px-4 py-2">
            {[
              ['Booking ID',       bookingId || '—'],
              ['Transaction ID',   txnId || '—'],
              ['Payment Method',   result?.method === 'card' ? 'Credit/Debit Card' : result?.method === 'apple_pay' ? 'Apple Pay' : result?.method === 'google_pay' ? 'Google Pay' : 'Cash'],
              ['Amount Paid',      booking?.total ? `$${booking.total}` : '—'],
              ['Pickup Date',      booking?.pickupDate || '—'],
              ['Return Date',      booking?.returnDate || '—'],
              ['Pickup Location',  booking?.pickupLocation || '—'],
              ['Drop-off',         booking?.dropoffLocation || '—'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between py-3">
                <p className="text-[12px] text-gray-400">{label}</p>
                <p className="max-w-[55%] truncate text-right text-[13px] font-semibold text-gray-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Total footer */}
          {booking?.total && (
            <div className="flex items-center justify-between bg-green-50 px-4 py-4 border-t border-green-100">
              <p className="font-bold text-gray-700">Total Paid</p>
              <p className="text-[22px] font-black text-green-600">${booking.total}</p>
            </div>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45 }}
          className="flex flex-col gap-3">
          <Link href="/my-rentals"
            className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-green-600 py-3.5 text-[14px] font-bold text-white transition hover:bg-green-500 shadow-sm shadow-green-200">
            Track My Rental <ArrowRight size={16} />
          </Link>
          <button onClick={() => window.print()}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3 text-[13px] font-semibold text-gray-700 transition hover:border-green-400 hover:text-green-700">
            <Download size={15} /> Download Invoice
          </button>
          <Link href="/"
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-gray-200 text-[13px] font-semibold text-gray-700 transition hover:border-gray-300">
            Back to Home
          </Link>
        </motion.div>

        {/* What happens next */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }}
          className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-bold text-blue-800 mb-3 text-[13px]">What happens next?</p>
          <ul className="space-y-2 text-[12px] text-blue-700">
            {[
              'A confirmation email has been sent to your inbox.',
              'You will receive pickup instructions 24 hours before your rental.',
              'Bring your driver\'s license and the booking reference at pickup.',
              'The security deposit will be held at pickup and released on return.',
            ].map(t => (
              <li key={t} className="flex items-start gap-2">
                <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-blue-500" />
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  )
}
