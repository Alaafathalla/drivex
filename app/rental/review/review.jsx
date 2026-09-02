'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'
import { PriceBreakdown } from '@/features/cars/components/PriceBreakdown'
import { BookingSummary } from '@/features/cars/components/BookingSummary'
import { bookingService } from '@/services/bookingService'
import { carService } from '@/services/carService'
import { useToast } from '@/context/ToastContext'
import { useLang } from '@/context/LangContext'

export default function ReviewPage() {
  const router       = useRouter()
  const toast        = useToast()
  const { t, isRTL } = useLang()
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
      if (b.car) setCar(b.car)
      else if (b.carId) carService.getCarById(b.carId).then(setCar).catch(() => {})
    } catch { router.replace('/cars') }
  }, [router])

  const handleConfirm = async () => {
    if (!agreed) { toast({ message: t('review_agree_error'), type: 'error' }); return }
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
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#B5E92E] border-t-transparent" />
    </div>
  )

  const infoRows = [
    [t('review_pickup'),      `${booking.pickupDate} at ${booking.pickupTime}`],
    [t('review_return'),      `${booking.returnDate} at ${booking.returnTime}`],
    [t('review_pickup_loc'),  booking.pickupLocation],
    [t('review_dropoff_loc'), booking.dropoffLocation],
    [t('review_driver_age'),  booking.driverAge],
    [t('review_license'),     booking.driverLicense],
    ...(booking.addons?.length ? [[t('review_services'), booking.addons.map(a => a.name).join(', ')]] : []),
    ...(booking.notes ? [[t('review_notes'), booking.notes]] : []),
  ]

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="border-b border-gray-100 bg-white">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-12">
          <a href={car ? `/cars/${car.id}/rent` : '/rentals'}
            className="mb-4 block text-[13px] font-semibold text-gray-500 transition hover:text-green-600">
            {isRTL ? `${t('review_back')} →` : t('review_back')}
          </a>
          <p className="text-[11px] font-bold uppercase tracking-widest text-green-600">{t('review_step')}</p>
          <h1 className="mt-1 text-[26px] font-black text-gray-900">{t('review_title')}</h1>
        </div>
      </div>

      <div className="w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-5">
            {car && <BookingSummary car={car} booking={booking} />}

            {/* Booking details */}
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.35, delay:.1 }}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-4 py-4">
                <h3 className="font-bold text-gray-900">{t('review_booking_details')}</h3>
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
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.35, delay:.15 }}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 font-bold text-gray-900">
                <ShieldCheck size={17} className="text-green-500" />{t('review_cancel_title')}
              </h3>
              <ul className="space-y-2 text-[13px] text-gray-600">
                {[t('review_cancel_1'), t('review_cancel_2'), t('review_cancel_3')].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green-500" />{item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Terms */}
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 rounded accent-green-600" />
              <span className="text-[13px] leading-6 text-gray-700">
                {t('review_terms_agree')}{' '}
                <a href="/terms" className="font-semibold text-green-700 hover:underline">{t('review_terms_link')}</a>,{' '}
                <a href="/privacy" className="font-semibold text-green-700 hover:underline">{t('review_privacy_link')}</a>{' '}
                {t('review_confirm_info')}
              </span>
            </label>

            <button onClick={handleConfirm} disabled={loading || !agreed}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 text-[15px] font-bold text-white shadow-sm shadow-green-200 transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60">
              {loading
                ? <><div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> {t('review_confirming')}</>
                : <>{t('review_proceed')} <ArrowRight size={17} className={isRTL ? 'rotate-180' : ''} /></>
              }
            </button>
          </div>

          <div className="h-fit space-y-4 lg:sticky lg:top-[84px]">
            <PriceBreakdown breakdown={booking} />
          </div>
        </div>
      </div>
    </div>
  )
}
