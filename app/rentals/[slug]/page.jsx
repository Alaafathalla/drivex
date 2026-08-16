'use client'

import { use, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CalendarDays, Check, CheckCircle2, Fuel, Gauge, MapPin, Settings2, Sparkles, Users } from 'lucide-react'
import { api } from '@/lib/api'
import { calcRental } from '@/lib/booking-service'
import { RENTAL_ADDONS, RENTAL_LOCATIONS, getDefaultRentalDates } from '@/lib/rental-catalog'
import { useCurrency } from '@/context/CurrencyContext'

export default function RentalDetailsPage({ params }) {
  const { slug } = use(params)
  const { format } = useCurrency()
  const router = useRouter()
  const query = useSearchParams()
  const defaults = useMemo(() => getDefaultRentalDates(), [])
  const [car, setCar] = useState(null)
  const [activeImg, setActiveImg] = useState(0)
  const [pickup, setPickup] = useState(query.get('start') || defaults.start)
  const [returnDate, setReturnDate] = useState(query.get('end') || defaults.end)
  const [location, setLocation] = useState(query.get('location') || '')
  const [dropoff, setDropoff] = useState(query.get('location') || '')
  const [selectedAddons, setSelectedAddons] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { api.getRentalBySlug(slug).then(setCar) }, [slug])

  const days = useMemo(() => {
    if (!pickup || !returnDate) return 1
    return Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickup)) / 86400000))
  }, [pickup, returnDate])

  const addOnTotal = selectedAddons.reduce((sum, id) => sum + (RENTAL_ADDONS.find((item) => item.id === id)?.price || 0), 0)
  const breakdown = car ? calcRental({ dailyRate: car.pricePerDay, days, addons: addOnTotal }) : null

  const toggleAddon = (id) => setSelectedAddons((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])

  const handleBook = () => {
    if (!pickup || !returnDate || returnDate <= pickup) { setError('Choose a valid rental start and end date.'); return }
    if (!location) { setError('Choose your pickup location.'); return }
    if (!car?.available) { setError('This vehicle is currently unavailable.'); return }
    setError('')
    const booking = {
      pickupDate: pickup,
      returnDate,
      pickupTime: '10:00',
      returnTime: '10:00',
      pickupLocation: location,
      dropoffLocation: dropoff || location,
      driverAge: '25+',
      driverLicense: 'To be verified',
      days,
      dailyRate: car.pricePerDay,
      ...breakdown,
      addons: selectedAddons.map((id) => RENTAL_ADDONS.find((item) => item.id === id)).filter(Boolean),
      carId: `rental-${car.id}`,
      car: {
        id: car.id,
        brand: car.make,
        model: car.name.replace(`${car.make} `, ''),
        name: car.name,
        year: car.year,
        image: car.image,
        images: [car.image],
        transmission: car.transmission,
        fuelType: car.fuel,
        city: location,
        rentalSlug: car.slug,
      },
    }
    sessionStorage.setItem('drivex_booking_draft', JSON.stringify(booking))
    router.push('/rental/review')
  }

  if (!car) return <main className="min-h-[70vh] bg-[#F5F6F3] grid place-items-center"><div className="h-10 w-10 animate-spin rounded-full border-2 border-[#B5E92E] border-t-transparent" /></main>

  const specs = [[Settings2, car.transmission], [Users, `${car.seats} seats`], [Fuel, car.fuel], [Gauge, 'Unlimited km']]

  return (
    <main className="min-h-screen bg-[#F5F6F3]">
      <section className="page-inner py-10 sm:py-14">
        <a href="/rentals" className="mb-6 inline-flex text-xs font-black uppercase tracking-[.12em] text-[#64748B] hover:text-[#0F172A]">← Back to rentals</a>
        <div className="grid gap-8 lg:grid-cols-[1.35fr_.75fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative aspect-[1.62] overflow-hidden rounded-[28px] bg-[#111]">
              <img src={car.gallery?.[activeImg] || car.image} alt={car.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[.12em] ${car.available ? 'bg-[#B5E92E] text-[#091219]' : 'bg-white text-[#091219]'}`}>{car.available ? 'Available' : 'Unavailable'}</span>
            </motion.div>
            {car.gallery?.length > 1 && <div className="mt-3 flex gap-2">{car.gallery.map((img, i) => <button key={img} onClick={() => setActiveImg(i)} className={`h-16 w-24 overflow-hidden rounded-xl border-2 ${activeImg === i ? 'border-[#B5E92E]' : 'border-transparent opacity-65'}`}><img src={img} alt="" className="h-full w-full object-cover" /></button>)}</div>}

            <div className="mt-8">
              <p className="text-xs font-black uppercase tracking-[.18em] text-[#7C8B55]">{car.category} rental</p>
              <h1 className="mt-2 text-4xl font-black tracking-[-.05em] text-[#0F172A]">{car.name}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#64748B]">{car.description}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">{specs.map(([Icon, label]) => <div key={label} className="rounded-2xl border border-[#E2E6DE] bg-white p-4"><Icon size={18} className="text-[#7C8B55]" /><p className="mt-3 text-sm font-black text-[#0F172A]">{label}</p></div>)}</div>

            <div className="mt-8 grid gap-6 rounded-[26px] border border-[#E2E6DE] bg-white p-6 md:grid-cols-2">
              <div><h2 className="font-black text-[#0F172A]">Included with your rental</h2><div className="mt-4 space-y-3">{car.features?.map((feature) => <p key={feature} className="flex items-center gap-2 text-sm text-[#64748B]"><Check size={15} className="text-[#7C8B55]" /> {feature}</p>)}</div></div>
              <div><h2 className="font-black text-[#0F172A]">Service add-ons</h2><p className="mt-1 text-xs text-[#94A3B8]">Select extras for this booking.</p><div className="mt-4 space-y-2">{RENTAL_ADDONS.slice(0, 4).map((addon) => { const active = selectedAddons.includes(addon.id); return <button key={addon.id} onClick={() => toggleAddon(addon.id)} className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${active ? 'border-[#B5E92E] bg-[#F7FBEA]' : 'border-[#E6E9E2] bg-[#FAFBF9]'}`}><span><span className="block text-xs font-black text-[#0F172A]">{addon.name}</span><span className="mt-0.5 block text-[10px] text-[#94A3B8]">{addon.description}</span></span><span className="ml-4 shrink-0 text-xs font-black">+{format(addon.price)}</span></button> })}</div></div>
            </div>
          </div>

          <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-fit rounded-[28px] border border-[#E2E6DE] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,.08)] lg:sticky lg:top-24">
            <div className="flex items-end justify-between"><div><p className="text-xs font-bold text-[#94A3B8]">Daily rate</p><p className="mt-1 text-4xl font-black tracking-[-.04em] text-[#0F172A]">{format(car.pricePerDay)}<span className="text-xs font-bold text-[#94A3B8]"> / day</span></p></div><Sparkles className="text-[#7C8B55]" size={20} /></div>

            <div className="mt-6 grid gap-3">
              <label className="rounded-2xl border border-[#E6E9E2] bg-[#FAFBF9] p-3"><span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.12em] text-[#94A3B8]"><CalendarDays size={13} /> Rental start</span><input type="date" value={pickup} min={defaults.start} onChange={(e) => setPickup(e.target.value)} className="mt-2 w-full bg-transparent text-sm font-bold outline-none" /></label>
              <label className="rounded-2xl border border-[#E6E9E2] bg-[#FAFBF9] p-3"><span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.12em] text-[#94A3B8]"><CalendarDays size={13} /> Rental end</span><input type="date" value={returnDate} min={pickup || defaults.start} onChange={(e) => setReturnDate(e.target.value)} className="mt-2 w-full bg-transparent text-sm font-bold outline-none" /></label>
              <label className="rounded-2xl border border-[#E6E9E2] bg-[#FAFBF9] p-3"><span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.12em] text-[#94A3B8]"><MapPin size={13} /> Pickup location</span><select value={location} onChange={(e) => { setLocation(e.target.value); if (!dropoff) setDropoff(e.target.value) }} className="mt-2 w-full bg-transparent text-sm font-bold outline-none"><option value="">Choose location</option>{(car.locations?.length ? car.locations : RENTAL_LOCATIONS.map((item) => item.city)).map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="rounded-2xl border border-[#E6E9E2] bg-[#FAFBF9] p-3"><span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.12em] text-[#94A3B8]"><MapPin size={13} /> Return location</span><select value={dropoff} onChange={(e) => setDropoff(e.target.value)} className="mt-2 w-full bg-transparent text-sm font-bold outline-none"><option value="">Same as pickup</option>{RENTAL_LOCATIONS.map((item) => <option key={item.city}>{item.city}</option>)}</select></label>
            </div>

            {breakdown && <div className="mt-5 rounded-2xl bg-[#F3F5F1] p-4"><div className="flex justify-between text-xs text-[#64748B]"><span>{days} day{days !== 1 ? 's' : ''} × {format(car.pricePerDay)}</span><span className="font-black text-[#0F172A]">{format(breakdown.base)}</span></div>{addOnTotal > 0 && <div className="mt-2 flex justify-between text-xs text-[#64748B]"><span>Selected services</span><span className="font-black text-[#0F172A]">{format(addOnTotal)}</span></div>}<div className="mt-3 flex items-end justify-between border-t border-[#DDE2D8] pt-3"><span className="text-xs font-black uppercase tracking-[.12em] text-[#64748B]">Estimated total</span><span className="text-2xl font-black text-[#0F172A]">{format(breakdown.total)}</span></div></div>}

            {error && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">{error}</p>}
            <button onClick={handleBook} disabled={!car.available} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0E1418] text-xs font-black uppercase tracking-[.08em] text-white transition hover:bg-[#B5E92E] hover:text-[#0E1418] disabled:opacity-45"><CheckCircle2 size={15} /> Continue booking</button>
            <p className="mt-4 text-center text-[11px] leading-5 text-[#94A3B8]">Free cancellation up to 24 hours before pickup. Security deposit: {format(car.deposit)}.</p>
          </motion.aside>
        </div>
      </section>
    </main>
  )
}
