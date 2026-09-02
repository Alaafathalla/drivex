'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Car, Loader2, MapPin } from 'lucide-react'
import { PriceBreakdown } from '@/features/cars/components/PriceBreakdown'
import { carService } from '@/services/carService'
import { calcRental } from '@/lib/booking-service'
import { useLang } from '@/context/LangContext'
import { useCurrency } from '@/context/CurrencyContext'

const LOCATIONS = ['Dubai Marina','Downtown Dubai','Dubai Airport','Abu Dhabi Airport','Sharjah City Centre','Ajman','Palm Jumeirah']

export default function RentPage({ params }) {
  const { id }         = use(params)
  const router         = useRouter()
  const { t, isRTL }   = useLang()
  const { format }     = useCurrency()
  const [car,     setCar]     = useState(null)
  const [loading, setLoading] = useState(true)

  const today = new Date().toISOString().split('T')[0]
  const [form, setForm] = useState({
    pickupDate: today, returnDate: '', pickupTime: '10:00', returnTime: '10:00',
    pickupLocation: '', dropoffLocation: '', driverAge: '', driverLicense: '', notes: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => { carService.getCarById(id).then(setCar).finally(() => setLoading(false)) }, [id])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const days = (() => {
    if (!form.pickupDate || !form.returnDate) return 1
    const d = Math.round((new Date(form.returnDate) - new Date(form.pickupDate)) / 86400000)
    return Math.max(1, d)
  })()

  const breakdown = car ? calcRental({ dailyRate: car.price, days }) : null

  const validate = () => {
    const e = {}
    if (!form.returnDate)                                      e.returnDate      = t('rent_return_req')
    if (form.returnDate && form.returnDate <= form.pickupDate) e.returnDate      = t('rent_return_after')
    if (!form.pickupLocation)                                  e.pickupLocation  = t('rent_pickup_req')
    if (!form.dropoffLocation)                                 e.dropoffLocation = t('rent_dropoff_req')
    if (!form.driverAge || Number(form.driverAge) < 21)        e.driverAge       = t('rent_age_req')
    if (!form.driverLicense)                                   e.driverLicense   = t('rent_license_req')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (!validate()) return
    const booking = { ...form, days, dailyRate: car.price, ...breakdown, carId: car.id, car: { brand: car.brand, model: car.model, year: car.year, image: car.images?.[0] } }
    sessionStorage.setItem('drivex_booking_draft', JSON.stringify(booking))
    router.push('/rental/review')
  }

  const inp = `w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-800 outline-none transition focus:border-[#B5E92E] focus:ring-2 focus:ring-[#B5E92E]/10`

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="animate-spin text-green-500" size={32} /></div>
  if (!car)    return <div className="py-24 text-center font-bold text-red-500">{t('car_not_found')}</div>

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="border-b border-gray-100 bg-white">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-12">
          <a href={`/cars/${id}`} className="mb-4 flex items-center gap-2 text-[13px] font-semibold text-gray-500 transition hover:text-green-600">
            {isRTL ? `${t('rent_back')} →` : t('rent_back')}
          </a>
          <p className="text-[11px] font-bold uppercase tracking-widest text-green-600">{t('rent_step1')}</p>
          <h1 className="mt-1 text-[26px] font-black text-gray-900">{t('rent_book_title')}</h1>
          <p className="mt-1 text-[14px] text-gray-500">{car.brand} {car.model} · {car.year}</p>
        </div>
      </div>

      <div className="w-full px-4 py-10 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid gap-7 lg:grid-cols-[1fr_360px]">
          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.4 }}>

            {/* Car summary */}
            <div className="mb-6 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                {car.images?.[0] && <img src={car.images[0]} alt={car.brand} className="h-full w-full object-cover" />}
              </div>
              <div>
                <p className="font-bold text-gray-900">{car.brand} {car.model}</p>
                <p className="text-[12px] text-gray-400">{car.year} · {car.transmission} · {car.fuelType}</p>
                <p className="mt-1 flex items-center gap-1 text-[12px] text-gray-500"><MapPin size={11} />{car.city}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-[22px] font-black text-green-600">{format(car.price)}</p>
                <p className="text-[11px] text-gray-400">{t('rent_per_day_label')}</p>
              </div>
            </div>

            <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              {/* Dates */}
              <h2 className="flex items-center gap-2 font-bold text-gray-900">
                <CalendarDays size={17} className="text-green-500" /> {t('rent_dates_title')}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [t('rent_pickup_date'), 'date',  'pickupDate',  today, inp,           null],
                  [t('rent_pickup_time'), 'time',  'pickupTime',  null,  inp,           null],
                  [t('rent_return_date'), 'date',  'returnDate',  form.pickupDate||today, `${inp} ${errors.returnDate?'border-red-400':''}`, errors.returnDate],
                  [t('rent_return_time'), 'time',  'returnTime',  null,  inp,           null],
                ].map(([label, type, key, min, cls, err]) => (
                  <label key={key} className="block">
                    <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{label}</p>
                    <input type={type} value={form[key]} min={min || undefined}
                      onChange={e => set(key, e.target.value)} className={cls} />
                    {err && <p className="mt-1 text-[11px] text-red-500">{err}</p>}
                  </label>
                ))}
              </div>

              <div className="h-px bg-gray-100" />
              {/* Locations */}
              <h2 className="flex items-center gap-2 font-bold text-gray-900">
                <MapPin size={17} className="text-green-500" /> {t('rent_pickup_loc_title')}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [t('rent_pickup_loc'),  'pickupLocation',  errors.pickupLocation],
                  [t('rent_dropoff_loc'), 'dropoffLocation', errors.dropoffLocation],
                ].map(([label, key, err]) => (
                  <label key={key} className="block">
                    <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{label}</p>
                    <select value={form[key]} onChange={e => set(key, e.target.value)}
                      className={`${inp} ${err ? 'border-red-400' : ''}`}>
                      <option value="">{t('rent_select_loc')}</option>
                      {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                    </select>
                    {err && <p className="mt-1 text-[11px] text-red-500">{err}</p>}
                  </label>
                ))}
              </div>

              <div className="h-px bg-gray-100" />
              {/* Driver */}
              <h2 className="flex items-center gap-2 font-bold text-gray-900">
                <Car size={17} className="text-green-500" /> {t('rent_driver_title')}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{t('rent_driver_age')}</p>
                  <input type="number" min="21" placeholder={t('rent_driver_age_ph')} value={form.driverAge}
                    onChange={e => set('driverAge', e.target.value)}
                    className={`${inp} ${errors.driverAge ? 'border-red-400' : ''}`} />
                  {errors.driverAge && <p className="mt-1 text-[11px] text-red-500">{errors.driverAge}</p>}
                </label>
                <label className="block">
                  <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{t('rent_driver_license')}</p>
                  <input type="text" placeholder="DL-XXXXXXXX" value={form.driverLicense}
                    onChange={e => set('driverLicense', e.target.value)}
                    className={`${inp} ${errors.driverLicense ? 'border-red-400' : ''}`} />
                  {errors.driverLicense && <p className="mt-1 text-[11px] text-red-500">{errors.driverLicense}</p>}
                </label>
              </div>
              <label className="block">
                <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{t('rent_notes_opt')}</p>
                <textarea rows={3} placeholder={t('rent_notes_ph')} value={form.notes}
                  onChange={e => set('notes', e.target.value)} dir="auto"
                  className={`${inp} resize-none`} />
              </label>
            </div>

            <button onClick={handleNext}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 text-[15px] font-bold text-white shadow-sm shadow-green-200 transition hover:bg-green-500">
              {t('rent_continue')} <ArrowRight size={17} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </motion.div>

          {/* Sticky summary */}
          <motion.div initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ duration:.4, delay:.1 }}
            className="h-fit lg:sticky lg:top-[84px]">
            {breakdown && <PriceBreakdown breakdown={breakdown} />}
            <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-[12px] text-amber-800">
              <p className="font-bold">{t('rent_deposit_req')}</p>
              <p className="mt-0.5">{t('rent_deposit_desc')} ({format(car.deposit)})</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
