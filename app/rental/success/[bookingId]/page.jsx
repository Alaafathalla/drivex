'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Download } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { useCurrency } from '@/context/CurrencyContext'

export default function RentalSuccessPage({ params }) {
  const { bookingId }  = use(params)
  const { t, isRTL }   = useLang()
  const { format }     = useCurrency()
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

  const methodLabel = (m) => {
    if (m === 'card')       return t('pay_method_credit')
    if (m === 'apple_pay')  return t('pay_method_apple_short')
    if (m === 'google_pay') return t('pay_method_google_short')
    return t('pay_method_cash_short')
  }

  const rows = [
    [t('success_booking_id'),  bookingId || '—'],
    [t('success_txn_id'),      txnId || '—'],
    [t('success_pay_method'),  methodLabel(result?.method)],
    [t('success_amount'),      booking?.total ? format(booking.total) : '—'],
    [t('success_pickup'),      booking?.pickupDate || '—'],
    [t('success_return'),      booking?.returnDate || '—'],
    [t('success_pickup_loc'),  booking?.pickupLocation || '—'],
    [t('success_dropoff'),     booking?.dropoffLocation || '—'],
  ]

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-16">
      <motion.div initial={{ opacity:0, scale:.94, y:20 }} animate={{ opacity:1, scale:1, y:0 }}
        transition={{ duration:.55, ease:[.22,1,.36,1] }} className="w-full max-w-lg">

        {/* Checkmark */}
        <div className="mb-6 flex justify-center">
          <motion.div initial={{ scale:0 }} animate={{ scale:1 }}
            transition={{ type:'spring', stiffness:260, damping:20, delay:.15 }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:.35, type:'spring', stiffness:300 }}>
              <CheckCircle2 size={52} className="text-green-600" />
            </motion.div>
          </motion.div>
        </div>

        <div className="mb-7 text-center">
          <motion.h1 initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:.2 }}
            className="text-[30px] font-black text-gray-900">{t('success_title')}</motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.3 }}
            className="mt-2 text-[15px] text-gray-500">{t('success_desc')}</motion.p>
        </div>

        {/* Booking card */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.35 }}
          className="mb-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {car && (
            <div className="flex items-center gap-4 border-b border-gray-100 p-5">
              {(car.image || car.images?.[0])
                ? <img src={car.image || car.images[0]} alt="Car" className="h-16 w-24 shrink-0 rounded-xl object-cover bg-gray-100" />
                : <div className="h-16 w-24 shrink-0 rounded-xl bg-gray-100" />
              }
              <div>
                <p className="font-bold text-gray-900">{car.brand} {car.model}</p>
                <p className="text-[12px] text-gray-400">{car.year}</p>
              </div>
            </div>
          )}

          <div className="divide-y divide-gray-50 px-4 py-2">
            {rows.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between py-3">
                <p className="text-[12px] text-gray-400">{label}</p>
                <p className="max-w-[55%] truncate text-right text-[13px] font-semibold text-gray-900">{value}</p>
              </div>
            ))}
          </div>

          {booking?.total && (
            <div className="flex items-center justify-between border-t border-green-100 bg-green-50 px-4 py-4">
              <p className="font-bold text-gray-700">{t('success_total')}</p>
              <p className="text-[22px] font-black text-green-600">{format(booking.total)}</p>
            </div>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:.45 }}
          className="flex flex-col gap-3">
          <Link href="/my-rentals"
            className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-green-600 py-3.5 text-[14px] font-bold text-white shadow-sm shadow-green-200 transition hover:bg-green-500">
            {t('success_track')} <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
          </Link>
          <button onClick={() => window.print()}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3 text-[13px] font-semibold text-gray-700 transition hover:border-green-400 hover:text-green-700">
            <Download size={15} /> {t('success_invoice')}
          </button>
          <Link href="/"
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-gray-200 text-[13px] font-semibold text-gray-700 transition hover:border-gray-300">
            {t('success_home')}
          </Link>
        </motion.div>

        {/* What happens next */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.55 }}
          className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="mb-3 text-[13px] font-bold text-blue-800">{t('success_next_title')}</p>
          <ul className="space-y-2 text-[12px] text-blue-700">
            {[t('success_next_1'), t('success_next_2'), t('success_next_3'), t('success_next_4')].map(item => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-blue-500" />{item}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  )
}
