'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Car, Loader2, MapPin } from 'lucide-react'
import { PriceBreakdown } from '@/features/cars/components/PriceBreakdown'
import { carService } from '@/services/carService'
import { calcRental } from '@/services/bookingService'

const LOCATIONS = ['Dubai Marina','Downtown Dubai','Dubai Airport','Abu Dhabi Airport','Sharjah City Centre','Ajman','Palm Jumeirah']

function Field({ label, children }) {
  return (
    <label className="block">
      <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{label}</p>
      {children}
    </label>
  )
}

const inp = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-800 outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-100"

export default function RentPage({ params }) {
  const { id } = use(params)
  const router = useRouter()

  const [car,     setCar]     = useState(null)
  const [loading, setLoading] = useState(true)

  const today = new Date().toISOString().split('T')[0]
  const [form, setForm] = useState({
    pickupDate: today, returnDate: '', pickupTime: '10:00', returnTime: '10:00',
    pickupLocation: '', dropoffLocation: '', driverAge: '', driverLicense: '', notes: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    carService.getCarById(id).then(setCar).finally(() => setLoading(false))
  }, [id])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const days = (() => {
    if (!form.pickupDate || !form.returnDate) return 1
    const d = Math.round((new Date(form.returnDate) - new Date(form.pickupDate)) / 86400000)
    return Math.max(1, d)
  })()

  const breakdown = car ? calcRental({ dailyRate: car.price, days }) : null

  const validate = () => {
    const e = {}
    if (!form.returnDate) e.returnDate = 'Return date is required'
    if (form.returnDate && form.returnDate <= form.pickupDate) e.returnDate = 'Return date must be after pickup'
    if (!form.pickupLocation) e.pickupLocation = 'Pickup location required'
    if (!form.dropoffLocation) e.dropoffLocation = 'Drop-off location required'
    if (!form.driverAge || Number(form.driverAge) < 21) e.driverAge = 'Driver must be at least 21'
    if (!form.driverLicense) e.driverLicense = 'License number required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (!validate()) return
    const booking = { ...form, days, dailyRate: car.price, ...breakdown, carId: car.id, car: { brand: car.brand, model: car.model, year: car.year, image: car.images?.[0] } }
    sessionStorage.setItem('drivex_booking_draft', JSON.stringify(booking))
    router.push('/rental/review')
  }

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="animate-spin text-green-500" size={32} /></div>
  if (!car) return <div className="py-24 text-center text-red-500 font-bold">Car not found</div>

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-12">
          <a href={`/cars/${id}`} className="flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-green-600 transition mb-4">
            ← Back to listing
          </a>
          <p className="text-[11px] font-bold uppercase tracking-widest text-green-600">Step 1 of 3</p>
          <h1 className="mt-1 text-[26px] font-black text-gray-900">Book your rental</h1>
          <p className="mt-1 text-[14px] text-gray-500">{car.brand} {car.model} · {car.year}</p>
        </div>
      </div>

      <div className="w-full px-4 py-10 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid gap-7 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>

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
                <p className="text-[22px] font-black text-green-600">${car.price}</p>
                <p className="text-[11px] text-gray-400">per day</p>
              </div>
            </div>

            <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 font-bold text-gray-900"><CalendarDays size={17} className="text-green-500" /> Rental Dates</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Pickup Date">
                  <input type="date" value={form.pickupDate} min={today}
                    onChange={e => set('pickupDate', e.target.value)} className={inp} />
                </Field>
                <Field label="Pickup Time">
                  <input type="time" value={form.pickupTime} onChange={e => set('pickupTime', e.target.value)} className={inp} />
                </Field>
                <Field label="Return Date">
                  <input type="date" value={form.returnDate} min={form.pickupDate || today}
                    onChange={e => set('returnDate', e.target.value)} className={`${inp} ${errors.returnDate ? 'border-red-400' : ''}`} />
                  {errors.returnDate && <p className="mt-1 text-[11px] text-red-500">{errors.returnDate}</p>}
                </Field>
                <Field label="Return Time">
                  <input type="time" value={form.returnTime} onChange={e => set('returnTime', e.target.value)} className={inp} />
                </Field>
              </div>

              <div className="h-px bg-gray-100" />
              <h2 className="flex items-center gap-2 font-bold text-gray-900"><MapPin size={17} className="text-green-500" /> Pickup & Drop-off</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Pickup Location">
                  <select value={form.pickupLocation} onChange={e => set('pickupLocation', e.target.value)}
                    className={`${inp} ${errors.pickupLocation ? 'border-red-400' : ''}`}>
                    <option value="">Select location</option>
                    {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                  </select>
                  {errors.pickupLocation && <p className="mt-1 text-[11px] text-red-500">{errors.pickupLocation}</p>}
                </Field>
                <Field label="Drop-off Location">
                  <select value={form.dropoffLocation} onChange={e => set('dropoffLocation', e.target.value)}
                    className={`${inp} ${errors.dropoffLocation ? 'border-red-400' : ''}`}>
                    <option value="">Select location</option>
                    {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                  </select>
                  {errors.dropoffLocation && <p className="mt-1 text-[11px] text-red-500">{errors.dropoffLocation}</p>}
                </Field>
              </div>

              <div className="h-px bg-gray-100" />
              <h2 className="flex items-center gap-2 font-bold text-gray-900"><Car size={17} className="text-green-500" /> Driver Information</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Driver Age">
                  <input type="number" min="21" placeholder="e.g. 28" value={form.driverAge}
                    onChange={e => set('driverAge', e.target.value)}
                    className={`${inp} ${errors.driverAge ? 'border-red-400' : ''}`} />
                  {errors.driverAge && <p className="mt-1 text-[11px] text-red-500">{errors.driverAge}</p>}
                </Field>
                <Field label="Driver License Number">
                  <input type="text" placeholder="DL-XXXXXXXX" value={form.driverLicense}
                    onChange={e => set('driverLicense', e.target.value)}
                    className={`${inp} ${errors.driverLicense ? 'border-red-400' : ''}`} />
                  {errors.driverLicense && <p className="mt-1 text-[11px] text-red-500">{errors.driverLicense}</p>}
                </Field>
              </div>

              <Field label="Notes (optional)">
                <textarea rows={3} placeholder="Any special requests?" value={form.notes}
                  onChange={e => set('notes', e.target.value)}
                  className={`${inp} resize-none`} />
              </Field>
            </div>

            <button onClick={handleNext}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 text-[15px] font-bold text-white shadow-sm shadow-green-200 transition hover:bg-green-500">
              Continue to Review <ArrowRight size={17} />
            </button>
          </motion.div>

          {/* Sticky summary */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .4, delay: .1 }}
            className="h-fit lg:sticky lg:top-[84px]">
            {breakdown && <PriceBreakdown breakdown={breakdown} />}
            <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-[12px] text-amber-800">
              <p className="font-bold">Deposit required</p>
              <p className="mt-0.5">A refundable deposit of <strong>${car.deposit}</strong> is held at pickup and released on return.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
