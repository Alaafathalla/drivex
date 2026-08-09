'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, BadgeCheck, CalendarDays, CarFront, ChevronDown,
  Fuel, Gauge, Heart, Headphones, MapPin, Search, ShieldCheck,
  SlidersHorizontal, Tag, Zap,
} from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { api } from '@/lib/api'

/* ─────────── Animated counter ─────────── */
function Counter({ target, suffix = '' }) {
  const [n, setN] = useState(0)
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!go) return
    const dur = 1600, t0 = performance.now()
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [go, target])
  return (
    <motion.span onViewportEnter={() => setGo(true)} className="tabular-nums">
      {n.toLocaleString()}{suffix}
    </motion.span>
  )
}

/* ─────────── Car card ─────────── */
function CarCard({ car, index }) {
  const { toggle, isFav } = useFavorites()
  const toast = useToast()
  const { t } = useLang()
  const fav = isFav(car.slug)
  const isRent = car.type === 'rent'
  const href = isRent ? `/rentals/${car.slug}` : `/cars/${car.slug}`
  const price = isRent ? `$${car.pricePerDay}/day` : `$${car.price?.toLocaleString()}`

  const handleHeart = e => {
    e.preventDefault()
    toggle(car.slug)
    toast({ message: fav ? 'Removed from wishlist' : `${car.name} added to wishlist`, type: fav ? 'info' : 'fav' })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.42, delay: index * 0.06, ease: [.22, 1, .36, 1] }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <a href={href} className="relative block overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img src={car.image} alt={car.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Badge */}
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
          isRent ? 'bg-blue-600 text-white' : car.condition === 'New' ? 'bg-green-600 text-white' : 'bg-amber-500 text-white'
        }`}>
          {isRent ? 'Rent' : car.condition}
        </span>

        {/* Heart */}
        <motion.button
          onClick={handleHeart}
          whileTap={{ scale: 0.82 }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition hover:bg-white"
          aria-label="Toggle wishlist"
        >
          <motion.span animate={fav ? { scale: [1, 1.4, 1] } : {}}>
            <Heart size={16} className={fav ? 'fill-rose-500 text-rose-500' : 'text-gray-500'} />
          </motion.span>
        </motion.button>
      </a>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-bold text-gray-900">{car.name}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-400">
              <MapPin size={10} /> {car.location} · {car.year}
            </p>
          </div>
          <p className="shrink-0 font-black text-green-600">{price}</p>
        </div>

        {!isRent && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[car.transmission, car.fuel, `${car.mileage?.toLocaleString()} km`].map(tag => (
              <span key={tag} className="rounded-md bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-500 border border-gray-100">{tag}</span>
            ))}
          </div>
        )}

        <a href={href}
          className="mt-4 flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-green-50 text-[12px] font-bold text-green-700 transition hover:bg-green-600 hover:text-white">
          {isRent ? 'Book Now' : 'View Details'} <ArrowRight size={13} />
        </a>
      </div>
    </motion.article>
  )
}

/* ─────────── Category pill ─────────── */
function CatCard({ cat, index }) {
  return (
    <motion.a href={`/cars?body=${cat.slug}`}
      initial={{ opacity: 0, scale: .94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm"
      style={{ aspectRatio: '4/3' }}
    >
      <img src={cat.image} alt={cat.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <p className="font-black text-white">{cat.title}</p>
        <p className="text-[11px] text-white/70">{cat.count}+ cars</p>
      </div>
    </motion.a>
  )
}

const BENEFITS = [
  { icon: ShieldCheck, title: 'Verified Listings',   text: 'Every car is inspected and certified' },
  { icon: Tag,         title: 'Best Market Prices',  text: 'Competitive pricing guaranteed' },
  { icon: Zap,         title: 'Instant Booking',     text: 'Reserve in under 2 minutes' },
  { icon: Headphones,  title: '24/7 Support',        text: 'Real people, always available' },
]

const STATS = [
  { val: 10000, suf: '+', label: 'Cars Listed' },
  { val: 5000,  suf: '+', label: 'Happy Customers' },
  { val: 50,    suf: '+', label: 'Trusted Dealers' },
  { val: 12,    suf: '',  label: 'Cities Covered' },
]

export default function Home() {
  const { t } = useLang()
  const [mode, setMode] = useState('buy')
  const [cars, setCars] = useState([])
  const [cats, setCats] = useState([])

  useEffect(() => {
    Promise.all([api.getFeaturedCars(), api.getCategories()]).then(([c, k]) => {
      setCars(c); setCats(k)
    })
  }, [])

  return (
    <div className="bg-white">

      {/* ── HERO ──────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
        {/* Subtle green glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(34,197,94,.18),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />

        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="grid min-h-[560px] items-center gap-8 py-16 lg:grid-cols-[1fr_1fr]">

            {/* Text */}
            <div className="z-10">
              <motion.div
                initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, ease: [.22,1,.36,1] }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-[11px] font-bold text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" /> Premium Car Marketplace
                </span>

                <h1 className="mt-5 text-[clamp(42px,6vw,76px)] font-black leading-[.92] tracking-[-0.05em] text-white">
                  Find Your<br />
                  <span className="text-green-400">Perfect</span> Car
                </h1>

                <p className="mt-5 max-w-md text-[17px] leading-7 text-gray-400">
                  Buy or rent from 10,000+ verified premium cars. Transparent pricing, trusted dealers.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="/cars"
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-green-500 px-7 text-[14px] font-bold text-white transition hover:bg-green-400">
                    Browse Cars <ArrowRight size={16} />
                  </a>
                  <a href="/rentals"
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-7 text-[14px] font-bold text-white transition hover:bg-white/10">
                    Rent a Car
                  </a>
                </div>

                {/* Trust row */}
                <div className="mt-8 flex flex-wrap gap-5">
                  {[['✓', 'Free inspection'], ['✓', 'Verified dealers'], ['✓', 'Secure payment']].map(([ic, label]) => (
                    <span key={label} className="flex items-center gap-1.5 text-[12px] text-gray-400">
                      <span className="text-green-400 font-bold">{ic}</span> {label}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Hero car image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [.22,1,.36,1] }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-12 bg-green-400/10 blur-3xl rounded-full" />
              <img
                src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=90"
                alt="Premium car"
                className="relative w-full rounded-2xl object-cover opacity-90 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]"
                style={{ aspectRatio: '16/10' }}
              />
            </motion.div>
          </div>

          {/* ── Search bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [.22,1,.36,1] }}
            className="relative z-10 -mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
          >
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {[['buy', CarFront, 'Buy Cars'], ['rent', CalendarDays, 'Rent Cars']].map(([m, Icon, label]) => (
                <button key={m} onClick={() => setMode(m)}
                  className={`flex h-13 items-center gap-2 border-b-2 px-6 py-3.5 text-[13px] font-bold transition ${
                    mode === m
                      ? 'border-green-500 text-green-700'
                      : 'border-transparent text-gray-400 hover:text-gray-700'
                  }`}>
                  <Icon size={16} className={mode === m ? 'text-green-500' : ''} />
                  {label}
                </button>
              ))}
            </div>
            <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
              {['All Makes', 'All Models', 'Min Price', 'Max Price', 'Year'].map(label => (
                <button key={label}
                  className="flex h-11 items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 text-[12px] text-gray-500 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700">
                  <span>{label}</span><ChevronDown size={13} />
                </button>
              ))}
              <a href={mode === 'buy' ? '/cars' : '/rentals'}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 text-[13px] font-bold text-white transition hover:bg-green-500 sm:col-span-2 lg:col-span-1">
                <Search size={15} /> Search
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────── */}
      <section className="w-full bg-gray-50 pt-24 pb-10">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(({ icon: Icon, title, text }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38, delay: i * 0.07 }}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
                  <Icon size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-900">{title}</p>
                  <p className="mt-0.5 text-[11px] text-gray-500">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ──────────────────────────────── */}
      <section className="w-full bg-gray-50 py-10">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="mb-7 flex items-center justify-between">
            <motion.h2
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4 }}
              className="text-[22px] font-black text-gray-900">
              Browse by Category
            </motion.h2>
            <a href="/cars" className="flex items-center gap-1 text-[13px] font-semibold text-green-600 hover:text-green-700">
              View all <ArrowRight size={14} />
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {cats.length
              ? cats.map((c, i) => <CatCard key={c.slug} cat={c} index={i} />)
              : Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton rounded-2xl" style={{ aspectRatio: '4/3' }} />)}
          </div>
        </div>
      </section>

      {/* ── FEATURED CARS ──────────────────────────── */}
      <section className="w-full py-14">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="mb-7 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4 }}
            >
              <p className="text-[11px] font-bold uppercase tracking-widest text-green-600">Hand-picked</p>
              <h2 className="mt-1 text-[22px] font-black text-gray-900">Featured Cars</h2>
            </motion.div>
            <a href="/cars" className="flex items-center gap-1 text-[13px] font-semibold text-green-600 hover:text-green-700">
              View all <ArrowRight size={14} />
            </a>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {cars.length
              ? cars.slice(0, 8).map((car, i) => <CarCard key={car.id} car={car} index={i} />)
              : Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-[320px] rounded-2xl" />)}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────── */}
      <section className="w-full bg-green-600 py-14">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-px bg-green-500/30 overflow-hidden rounded-2xl lg:grid-cols-4">
            {STATS.map(({ val, suf, label }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex flex-col items-center bg-green-600 py-10 gap-1"
              >
                <p className="text-[42px] font-black text-white tabular-nums">
                  <Counter target={val} suffix={suf} />
                </p>
                <p className="text-[12px] text-green-200">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────── */}
      <section className="w-full py-16">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-14 lg:px-14"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(34,197,94,.2),transparent_60%)]" />
            <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
              <img src="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=90"
                alt="Car" className="h-full w-full object-cover opacity-30 [mask-image:linear-gradient(to_left,black_60%,transparent)]" />
            </div>
            <div className="relative z-10 max-w-lg">
              <p className="text-[11px] font-bold uppercase tracking-widest text-green-400">Sell smarter</p>
              <h2 className="mt-3 text-[clamp(28px,4vw,44px)] font-black leading-tight text-white">
                Ready to sell your car?
              </h2>
              <p className="mt-3 text-[14px] leading-7 text-gray-400">
                Get an instant valuation, list in minutes and reach thousands of verified buyers.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/valuation"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-green-500 px-7 text-[13px] font-bold text-white transition hover:bg-green-400">
                  Get free valuation <ArrowRight size={15} />
                </a>
                <a href="/sell"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-7 text-[13px] font-bold text-white transition hover:bg-white/10">
                  List my car
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
