'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, MapPin, Search, ShieldCheck, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { useLang } from '@/context/LangContext'
import { api } from '@/lib/api'

const CATEGORIES = ['All', 'SUV', 'Luxury', 'Sports', 'Electric']

function RentalCard({ car, index, t }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-[7px] border border-border bg-card transition hover:border-[#2ee52b]/50"
    >
      <a href={`/rentals/${car.slug}`} className="relative block aspect-[1.35] overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={car.image} alt={car.name}
        />
        {!car.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <span className="rounded-full border border-white/30 px-4 py-2 text-xs font-black text-white">
              {t('rent_unavailable')}
            </span>
          </div>
        )}
        <span className={`absolute start-3 top-3 rounded-[3px] px-2 py-1 text-[9px] font-black ${
          car.available ? 'bg-[#2ee52b] text-black' : 'bg-white/20 text-white'
        }`}>
          {car.available ? t('rent_available') : t('rent_unavailable')}
        </span>
      </a>
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="font-black">{car.name}</h3>
          <ShieldCheck size={17} className="shrink-0 text-accent" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {car.seats} {t('rent_seats')} · {car.transmission} · {t('rent_delivery')}
        </p>
        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-xl font-black text-accent">
              ${car.pricePerDay}
              <span className="text-xs font-normal text-muted-foreground"> {t('rent_per_day')}</span>
            </p>
          </div>
          <a href={`/rentals/${car.slug}`} className="cursor-pointer text-xs font-black text-accent hover:underline flex items-center gap-1">
            {t('rent_book_now')} <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function RentalsPage() {
  const { t } = useLang()
  const [rentals, setRentals] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    setLoading(true)
    api.getRentals({ category: activeCategory }).then(data => { setRentals(data); setLoading(false) })
  }, [activeCategory])

  return (
    <main className="min-h-screen bg-background">
      <PageHero
        eyebrow={t('rent_eyebrow')}
        title={t('rent_title')}
        description={t('rent_desc')}
        image="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=2200&q=86"
      >
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.3 }}
          className="mt-8 grid max-w-3xl gap-1 overflow-hidden rounded-[7px] border border-white/15 bg-black/30 p-1 backdrop-blur sm:grid-cols-4">
          {[
            [MapPin, 'rent_pickup', 'Dubai Marina'],
            [CalendarDays, 'rent_from_date', '12 Aug'],
            [CalendarDays, 'rent_until_date', '16 Aug'],
          ].map(([Icon, labelKey, placeholder]) => (
            <div key={labelKey} className="bg-white/[.07] px-4 py-3 rounded-[5px]">
              <Icon size={14} className="text-[#d7ff3f]" />
              <p className="mt-2 text-[9px] uppercase tracking-[.15em] text-white/35">{t(labelKey)}</p>
              <p className="mt-1 text-sm font-bold">{placeholder}</p>
            </div>
          ))}
          <button className="cursor-pointer rounded-[5px] bg-[#d7ff3f] px-4 py-3 text-xs font-black text-[#090c10] transition hover:bg-[#c7f134]">
            {t('rent_find_btn')}
          </button>
        </motion.div>
      </PageHero>

      {/* Category tabs */}
      <section className="w-full sticky top-[72px] z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex gap-1 py-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
                  activeCategory === cat
                    ? 'bg-accent text-black'
                    : 'border border-border text-muted-foreground hover:border-accent hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="w-full px-4 py-12 sm:px-6 lg:px-8 xl:px-12">
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({length:6}).map((_,i) => <div key={i} className="aspect-[1.35] animate-pulse rounded-[7px] bg-white/5" />)}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rentals.map((car, i) => <RentalCard key={car.id} car={car} index={i} t={t} />)}
            </motion.div>
          </AnimatePresence>
        )}
      </section></main>
  )
}
