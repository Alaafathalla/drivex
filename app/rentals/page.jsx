'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, CalendarDays, Fuel, Loader2, MapPin, Search, Settings2, Users, X,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-section'
import { api } from '@/lib/api'

const CATEGORIES = ['All', 'Economy', 'SUV', 'Luxury', 'Sports', 'Electric', 'Monthly']

function RentalCard({ rental, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -5 }}
      className="group overflow-hidden rounded-[8px] border border-white/10 bg-[#0b0d0c] transition hover:border-[#2ee52b]/40"
    >
      <div className="relative aspect-[1.45] overflow-hidden">
        <img
          src={rental.image}
          alt={rental.name}
          className="h-full w-full object-cover transition duration-600 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {!rental.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
            <span className="rounded-full border border-white/30 px-4 py-1.5 text-[11px] font-bold text-white">
              Currently Unavailable
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="rounded-[3px] bg-black/50 px-2 py-1 text-[9px] font-bold text-white backdrop-blur-sm">
            {rental.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold">{rental.name}</h3>
          <div className="shrink-0 text-right">
            <p className="text-[18px] font-black text-[#2ee52b]">${rental.pricePerDay}</p>
            <p className="text-[10px] text-white/40">/ day</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="flex items-center gap-1 text-[11px] text-white/50">
            <Settings2 size={12} /> {rental.transmission}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-white/50">
            <Users size={12} /> {rental.seats} seats
          </span>
          <span className="flex items-center gap-1 text-[11px] text-white/50">
            <Fuel size={12} /> {rental.fuel}
          </span>
        </div>
        <a
          href={`/rentals/${rental.slug}`}
          className={`mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-[5px] text-[12px] font-bold transition ${
            rental.available
              ? 'bg-[#2ee52b] text-black hover:bg-[#50f14d]'
              : 'cursor-not-allowed border border-white/10 text-white/30'
          }`}
        >
          {rental.available ? <>Book Now <ArrowRight size={14} /></> : 'Unavailable'}
        </a>
      </div>
    </motion.article>
  )
}

export default function RentalsPage() {
  const [rentals, setRentals] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState('')
  const [q, setQ] = useState('')

  useEffect(() => {
    setLoading(true)
    api.getRentals({ category: activeCategory, maxPrice: maxPrice || undefined, q }).then((data) => {
      setRentals(data)
      setLoading(false)
    })
  }, [activeCategory, maxPrice, q])

  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8 pt-[72px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(46,229,43,.12),transparent_45%)]" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=2200&q=85"
            alt="Rental hero"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070908] via-[#070908]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070908]" />
        </div>
        <div className="relative mx-auto max-w-[1450px] px-5 py-16 sm:px-8 lg:px-10">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.1em] text-[#2ee52b]"
          >
            <span className="h-[2px] w-8 bg-[#2ee52b]" /> Premium Rental
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-[clamp(42px,6vw,80px)] font-black leading-[.9] tracking-[-.05em]"
          >
            The road<br />is yours.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-5 max-w-md text-[15px] leading-7 text-white/55"
          >
            Choose the right car for a day, a week or a month. Transparent pricing, flexible delivery.
          </motion.p>

          {/* Quick booking bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 grid max-w-3xl gap-2 rounded-[7px] border border-white/12 bg-[#0a0c0b]/90 p-3 backdrop-blur-sm sm:grid-cols-4"
          >
            <div className="flex items-center gap-3 rounded-[5px] bg-white/5 px-4 py-3 sm:col-span-1">
              <MapPin size={15} className="shrink-0 text-[#2ee52b]" />
              <div>
                <p className="text-[9px] uppercase tracking-[.12em] text-white/35">Pick-up</p>
                <p className="mt-0.5 text-[12px] font-bold">Dubai Marina</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-[5px] bg-white/5 px-4 py-3">
              <CalendarDays size={15} className="shrink-0 text-[#2ee52b]" />
              <div>
                <p className="text-[9px] uppercase tracking-[.12em] text-white/35">From</p>
                <p className="mt-0.5 text-[12px] font-bold">Pick a date</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-[5px] bg-white/5 px-4 py-3">
              <CalendarDays size={15} className="shrink-0 text-[#2ee52b]" />
              <div>
                <p className="text-[9px] uppercase tracking-[.12em] text-white/35">Until</p>
                <p className="mt-0.5 text-[12px] font-bold">Pick a date</p>
              </div>
            </div>
            <button className="rounded-[5px] bg-[#2ee52b] py-3 text-[12px] font-bold text-black transition hover:bg-[#50f14d]">
              Find a car
            </button>
          </motion.div>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="mx-auto max-w-[1450px] px-5 py-12 sm:px-8 lg:px-10">
        {/* Category filter pills */}
        <FadeIn direction="up">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full border px-5 py-2 text-[12px] font-semibold transition ${
                    activeCategory === cat
                      ? 'border-[#2ee52b] bg-[#2ee52b]/10 text-[#2ee52b]'
                      : 'border-white/12 text-white/60 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-[5px] border border-white/12 bg-transparent px-3 py-2">
                <Search size={13} className="text-[#2ee52b]" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search…"
                  className="w-24 bg-transparent text-[12px] text-white outline-none placeholder:text-white/35"
                />
              </div>
              <div className="flex items-center gap-2 rounded-[5px] border border-white/12 px-3 py-2">
                <span className="text-[11px] text-white/50">Max $</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="∞"
                  className="w-16 bg-transparent text-[12px] text-white outline-none"
                />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Count */}
        <FadeIn direction="right">
          <p className="mb-6 text-[13px] text-white/50">
            Showing <span className="font-bold text-white">{rentals.length}</span> rental cars
          </p>
        </FadeIn>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-[#2ee52b]" size={32} />
          </div>
        ) : rentals.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[18px] font-bold">No rentals found</p>
            <p className="mt-2 text-white/50">Try a different category</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rentals.map((r, i) => <RentalCard key={r.id} rental={r} index={i} />)}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <FadeIn direction="up">
        <section className="border-t border-white/8 bg-[#0a0c0b] py-16">
          <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#2ee52b]">Long-term freedom</p>
                <h2 className="mt-3 text-[36px] font-black leading-tight tracking-tight">
                  One car. One monthly payment. Zero hassle.
                </h2>
                <p className="mt-3 text-[14px] text-white/55">Subscribe monthly and enjoy free delivery, maintenance included and easy swaps.</p>
              </div>
              <div className="flex lg:justify-end">
                <a href="/rentals" className="inline-flex items-center gap-3 rounded-[5px] bg-[#2ee52b] px-8 py-4 text-[13px] font-bold text-black transition hover:bg-[#50f14d]">
                  Explore subscriptions <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <SiteFooter />
    </main>
  )
}
