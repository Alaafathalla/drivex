'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, CalendarDays, MapPin, Search, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { api } from '@/lib/api'
import { RENTAL_CATEGORIES, RENTAL_LOCATIONS, getDefaultRentalDates } from '@/lib/rental-catalog'

const CATEGORIES = ['All', ...RENTAL_CATEGORIES.map((item) => item.name)]

function RentalCard({ car, index, search }) {
  const href = `/rentals/${car.slug}?${search.toString()}`
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: .98 }}
      transition={{ duration: .38, delay: index * .045 }}
      whileHover={{ y: -5 }}
      className="group overflow-hidden rounded-[24px] border border-[#E2E6DE] bg-white shadow-[0_18px_50px_rgba(15,23,42,.055)]"
    >
      <a href={href} className="relative block aspect-[1.48] overflow-hidden">
        <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={car.image} alt={car.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091219]/65 via-transparent to-transparent" />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[.12em] ${car.available ? 'bg-[#B5E92E] text-[#091219]' : 'bg-white/90 text-[#091219]'}`}>
          {car.available ? 'Available' : 'Unavailable'}
        </span>
        <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[10px] font-bold text-white backdrop-blur">{car.category}</span>
      </a>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2"><h3 className="text-lg font-black tracking-[-.02em] text-[#0F172A]">{car.name}</h3><ShieldCheck size={15} className="text-[#7C8B55]" /></div>
            <p className="mt-1 text-xs text-[#64748B]">{car.year} · {car.seats} seats · {car.transmission} · {car.fuel}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-black text-[#0F172A]">${car.pricePerDay}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[.1em] text-[#94A3B8]">per day</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {car.locations?.slice(0, 2).map((location) => <span key={location} className="rounded-full bg-[#F3F5F1] px-2.5 py-1 text-[10px] font-bold text-[#52604D]">{location}</span>)}
        </div>
        <a href={href} className="mt-5 flex h-11 items-center justify-center gap-2 rounded-full bg-[#0E1418] text-xs font-black text-white transition hover:bg-[#B5E92E] hover:text-[#0E1418]">View & book <ArrowRight size={14} /></a>
      </div>
    </motion.article>
  )
}

export default function RentalsPage() {
  const router = useRouter()
  const query = useSearchParams()
  const defaults = useMemo(() => getDefaultRentalDates(), [])
  const [rentals, setRentals] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(query.get('category') || 'All')
  const [location, setLocation] = useState(query.get('location') || '')
  const [startDate, setStartDate] = useState(query.get('start') || defaults.start)
  const [endDate, setEndDate] = useState(query.get('end') || defaults.end)

  const syncUrl = (next = {}) => {
    const values = { category, location, start: startDate, end: endDate, ...next }
    const params = new URLSearchParams()
    if (values.category && values.category !== 'All') params.set('category', values.category)
    if (values.location) params.set('location', values.location)
    if (values.start) params.set('start', values.start)
    if (values.end) params.set('end', values.end)
    router.replace(`/rentals?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    setLoading(true)
    api.getRentals({ category, location }).then((data) => { setRentals(data); setLoading(false) })
  }, [category, location])

  const bookingSearch = useMemo(() => {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (startDate) params.set('start', startDate)
    if (endDate) params.set('end', endDate)
    return params
  }, [location, startDate, endDate])

  const updateCategory = (value) => { setCategory(value); syncUrl({ category: value }) }
  const updateLocation = (value) => { setLocation(value); syncUrl({ location: value }) }

  return (
    <main className="min-h-screen bg-[#F5F6F3]">
      <PageHero eyebrow="Premium car rental" title="Rent the right car. In the right place." description="Choose your location and exact rental dates, then compare a verified fleet with transparent daily pricing." image="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=2200&q=86">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }} className="mt-8 grid max-w-5xl gap-2 rounded-[20px] border border-white/15 bg-black/35 p-2 backdrop-blur lg:grid-cols-[1.2fr_1fr_1fr_auto]">
          <label className="rounded-[15px] bg-white/[.08] px-4 py-3 text-white">
            <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.15em] text-white/45"><MapPin size={13} className="text-[#B5E92E]" /> Pickup location</span>
            <select value={location} onChange={(e) => updateLocation(e.target.value)} className="mt-2 w-full bg-transparent text-sm font-bold outline-none [&>option]:text-black">
              <option value="">Any location</option>
              {RENTAL_LOCATIONS.map((item) => <option key={item.city} value={item.city}>{item.city}</option>)}
            </select>
          </label>
          <label className="rounded-[15px] bg-white/[.08] px-4 py-3 text-white">
            <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.15em] text-white/45"><CalendarDays size={13} className="text-[#B5E92E]" /> Rental start</span>
            <input type="date" value={startDate} min={defaults.start} onChange={(e) => { setStartDate(e.target.value); syncUrl({ start: e.target.value }) }} className="mt-2 w-full bg-transparent text-sm font-bold outline-none [color-scheme:dark]" />
          </label>
          <label className="rounded-[15px] bg-white/[.08] px-4 py-3 text-white">
            <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.15em] text-white/45"><CalendarDays size={13} className="text-[#B5E92E]" /> Rental end</span>
            <input type="date" value={endDate} min={startDate || defaults.start} onChange={(e) => { setEndDate(e.target.value); syncUrl({ end: e.target.value }) }} className="mt-2 w-full bg-transparent text-sm font-bold outline-none [color-scheme:dark]" />
          </label>
          <button onClick={() => syncUrl()} className="flex min-h-16 items-center justify-center gap-2 rounded-[15px] bg-[#B5E92E] px-6 text-xs font-black uppercase tracking-[.08em] text-[#091219] transition hover:brightness-105"><Search size={15} /> Find cars</button>
        </motion.div>
      </PageHero>

      <section className="sticky top-[68px] z-30 border-b border-[#E2E6DE] bg-[#F5F6F3]/95 backdrop-blur-xl">
        <div className="page-inner flex items-center gap-2 overflow-x-auto py-3">
          <SlidersHorizontal size={15} className="mr-1 shrink-0 text-[#7C8B55]" />
          {CATEGORIES.map((item) => (
            <button key={item} onClick={() => updateCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-black transition ${category === item ? 'bg-[#0E1418] text-white' : 'border border-[#DDE2D8] bg-white text-[#64748B] hover:border-[#B5E92E] hover:text-[#0F172A]'}`}>{item}</button>
          ))}
        </div>
      </section>

      <section className="page-inner py-12 sm:py-16">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[.16em] text-[#7C8B55]">Available fleet</p><h2 className="mt-2 text-3xl font-black tracking-[-.04em] text-[#0F172A]">{loading ? 'Searching…' : `${rentals.length} rental${rentals.length === 1 ? '' : 's'} found`}</h2></div>
          <a href="/rent-by-location" className="hidden items-center gap-2 text-sm font-black sm:flex">Browse locations <ArrowRight size={15} /></a>
        </div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-[1.15] animate-pulse rounded-[24px] bg-[#E9ECE6]" />)}</div>
        ) : rentals.length ? (
          <AnimatePresence mode="popLayout"><motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{rentals.map((car, i) => <RentalCard key={car.id} car={car} index={i} search={bookingSearch} />)}</motion.div></AnimatePresence>
        ) : (
          <div className="rounded-[24px] border border-dashed border-[#CBD3C3] bg-white px-6 py-16 text-center"><h3 className="text-xl font-black text-[#0F172A]">No cars match these filters</h3><p className="mt-2 text-sm text-[#64748B]">Try another location or vehicle category.</p><button onClick={() => { setCategory('All'); setLocation(''); syncUrl({ category: 'All', location: '' }) }} className="mt-5 rounded-full bg-[#0E1418] px-5 py-3 text-xs font-black text-white">Reset filters</button></div>
        )}
      </section>
    </main>
  )
}
