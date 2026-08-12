'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CarFront,
  ChevronDown,
  Fuel,
  Gauge,
  Headphones,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  Zap,
} from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { api } from '@/lib/api'

const getItemKey = (item, index) => {
  const prefix = item?.type || item?.category || 'item'
  const id = item?.slug || item?.id || index
  return `${prefix}-${id}`
}

function Counter({ target, suffix = '' }) {
  const [n, setN] = useState(0)
  const [go, setGo] = useState(false)

  useEffect(() => {
    if (!go) return
    const dur = 1600
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [go, target])

  return (
    <motion.span onViewportEnter={() => setGo(true)} className="tabular-nums">
      {n.toLocaleString()}
      {suffix}
    </motion.span>
  )
}

function CarCard({ car, index }) {
  const { toggle, isFav } = useFavorites()
  const toast = useToast()
  const fav = isFav(car.slug)
  const isRent = car.type === 'rent'
  const href = isRent ? `/rentals/${car.slug}` : `/cars/${car.slug}`
  const price = isRent ? `$${car.pricePerDay}/day` : `$${car.price?.toLocaleString()}`

  const handleHeart = (e) => {
    e.preventDefault()
    toggle(car.slug)
    toast({ message: fav ? 'Removed from wishlist' : `${car.name} added to wishlist`, type: fav ? 'info' : 'fav' })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10px' }}
      transition={{ duration: 0.42, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[24px] border border-[#E7E9E5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
    >
      <a href={href} className="relative block overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img src={car.image} alt={car.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/55 via-transparent to-transparent" />

        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${
          isRent ? 'bg-[#B5E92E] text-[#0E1418]' : car.condition === 'New' ? 'bg-[#0E1418] text-white' : 'bg-[#F4C65A] text-[#0E1418]'
        }`}>
          {isRent ? 'Rent' : car.condition}
        </span>

        <button
          onClick={handleHeart}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition hover:bg-white"
          aria-label="Toggle wishlist"
        >
          <Heart size={16} className={fav ? 'fill-[#F43F5E] text-[#F43F5E]' : 'text-[#475569]'} />
        </button>
      </a>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[16px] font-black text-[#0F172A]">{car.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-[#64748B]">
              <MapPin size={10} /> {car.location} · {car.year}
            </p>
          </div>
          <p className="shrink-0 text-[18px] font-black text-[#0E1418]">{price}</p>
        </div>

        {!isRent && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[car.transmission, car.fuel, `${car.mileage?.toLocaleString()} km`].map((tag) => (
              <span key={tag} className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1 text-[10px] font-semibold text-[#475569]">
                {tag}
              </span>
            ))}
          </div>
        )}

        <a
          href={href}
          className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#0E1418] text-[12px] font-bold text-white transition hover:bg-[#B5E92E] hover:text-[#0E1418]"
        >
          {isRent ? 'Book Now' : 'View Details'} <ArrowRight size={13} />
        </a>
      </div>
    </motion.article>
  )
}

function CatCard({ cat, index }) {
  return (
    <motion.a
      href={`/cars?body=${cat.slug}`}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-[24px] border border-[#E7E9E5] bg-white shadow-[0_12px_25px_rgba(15,23,42,0.04)]"
      style={{ aspectRatio: '4/3' }}
    >
      <img src={cat.image} alt={cat.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/75 via-[#0B1220]/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-[16px] font-black text-white">{cat.title}</p>
        <p className="mt-1 text-[11px] text-white/75">{cat.count}+ cars</p>
      </div>
    </motion.a>
  )
}

const BENEFITS = [
  { icon: ShieldCheck, title: 'Verified Listings', text: 'Every car is inspected and certified' },
  { icon: Tag, title: 'Best Book Prices', text: 'Transparent pricing and market-matched offers' },
  { icon: Zap, title: 'Instant Booking', text: 'Find and reserve in under two minutes' },
  { icon: Headphones, title: '24/7 Support', text: 'Real experts, always ready to help' },
]

const STATS = [
  { val: 10000, suf: '+', label: 'Cars Listed' },
  { val: 5000, suf: '+', label: 'Happy Drivers' },
  { val: 50, suf: '+', label: 'Dealer Partners' },
  { val: 12, suf: '', label: 'Cities Covered' },
]

const PROCESS = [
  { step: '01', title: 'Search smarter', text: 'Filter by body type, budget, range, condition, and city in seconds.' },
  { step: '02', title: 'Compare details', text: 'Review specs, photos, and verified dealer data side by side.' },
  { step: '03', title: 'Book securely', text: 'Reserve your car with a simple, transparent checkout flow.' },
]

export default function Home() {
  const { t } = useLang()
  const [mode, setMode] = useState('buy')
  const [cars, setCars] = useState([])
  const [cats, setCats] = useState([])

  useEffect(() => {
    Promise.all([api.getFeaturedCars(), api.getCategories()]).then(([c, k]) => {
      setCars(c)
      setCats(k)
    })
  }, [])

  return (
    <div className="bg-[#F5F6F3] text-[#0F172A]">
      <section className="relative w-full overflow-hidden bg-[#091219]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(181,233,46,0.20),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(181,233,46,0.10),transparent_35%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F5F6F3] to-transparent" />

        <div className="page-inner relative py-6 sm:py-8 lg:py-10">
          <div className="grid min-h-[620px] items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="z-10 py-8 lg:py-12"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#B5E92E]/30 bg-[#B5E92E]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#B5E92E]">
                <span className="h-2 w-2 rounded-full bg-[#B5E92E] shadow-[0_0_20px_rgba(181,233,46,0.8)]" />
                Premium Car Marketplace
              </span>

              <h1 className="mt-6 text-[clamp(46px,6vw,88px)] font-black leading-[0.9] tracking-[-0.06em] text-white">
                Find Your
                <span className="mt-2 block text-[#B5E92E]">Perfect Car</span>
              </h1>

              <p className="mt-5 max-w-xl text-[17px] leading-7 text-[#CBD5E1]">
                Buy or rent from 10,000+ verified premium cars with transparent pricing, trusted dealers, and a faster way to find your next drive.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/cars" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#B5E92E] px-7 text-[14px] font-bold text-[#0B1220] transition hover:brightness-110">
                  Browse Cars <ArrowRight size={16} />
                </a>
                <a href="/rentals" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 text-[14px] font-bold text-white transition hover:bg-white/10">
                  Rent a Car
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-5 text-[12px] text-[#CBD5E1]">
                {['Free inspection', 'Verified dealers', 'Secure payment'].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="font-black text-[#B5E92E]">✓</span>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 34 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-8 rounded-full bg-[#B5E92E]/15 blur-3xl" />
              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0E1418] p-3 shadow-[0_35px_80px_rgba(0,0,0,0.45)]">
                <div className="overflow-hidden rounded-[22px]">
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90"
                    alt="Luxury car"
                    className="h-[560px] w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-l from-[#B5E92E]/15 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 -mb-8 mt-4 overflow-hidden rounded-[28px] border border-[#E7E9E5] bg-white shadow-[0_28px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="flex border-b border-[#EEF0EC]">
              {[
                ['buy', CarFront, 'Buy Cars'],
                ['rent', CalendarDays, 'Rent Cars'],
              ].map(([m, Icon, label]) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex items-center gap-2 border-b-2 px-6 py-4 text-[13px] font-bold transition ${
                    mode === m ? 'border-[#B5E92E] text-[#0E1418]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <Icon size={16} className={mode === m ? 'text-[#B5E92E]' : 'text-[#64748B]'} />
                  {label}
                </button>
              ))}
            </div>

            <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
              {['All Makes', 'All Models', 'Min Price', 'Max Price', 'Year'].map((label) => (
                <button
                  key={label}
                  className="flex h-12 items-center justify-between rounded-2xl border border-[#E7E9E5] bg-[#F8FAFC] px-4 text-[12px] font-semibold text-[#475569] transition hover:border-[#B5E92E]/50 hover:bg-[#F7FBE9]"
                >
                  <span>{label}</span>
                  <ChevronDown size={14} className="text-[#64748B]" />
                </button>
              ))}

              <a href={mode === 'buy' ? '/cars' : '/rentals'} className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#B5E92E] px-5 text-[13px] font-black text-[#0B1220] transition hover:brightness-110 sm:col-span-2 lg:col-span-1">
                <Search size={15} /> Search
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-[#F5F6F3] py-18 sm:py-20 lg:py-24">
        <div className="page-inner">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex items-center gap-4 rounded-[22px] border border-[#E7E9E5] bg-white p-5 shadow-[0_12px_25px_rgba(15,23,42,0.04)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F6FBEA]">
                  <Icon size={20} className="text-[#0E1418]" />
                </div>
                <div>
                  <p className="text-[13px] font-black text-[#0F172A]">{title}</p>
                  <p className="mt-1 text-[11px] leading-5 text-[#64748B]">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F5F6F3] py-8 sm:py-10 lg:py-14">
        <div className="page-inner">
          <div className="mb-7 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0E1418]/55">Shop by style</p>
              <h2 className="mt-2 text-[clamp(24px,3vw,36px)] font-black tracking-[-0.04em] text-[#0F172A]">Popular categories</h2>
            </div>
            <a href="/cars" className="flex items-center gap-1 text-[12px] font-bold text-[#0E1418] hover:text-[#0E1418]/80">
              View all <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {cats.length
              ? cats.map((c, i) => <CatCard key={c.slug} cat={c} index={i} />)
              : Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton rounded-[24px]" style={{ aspectRatio: '4/3' }} />)}
          </div>
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 lg:py-24">
        <div className="page-inner">
          <div className="mb-7 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0E1418]/55">Our picks</p>
              <h2 className="mt-2 text-[clamp(24px,3vw,36px)] font-black tracking-[-0.04em] text-[#0F172A]">Featured inventory</h2>
            </div>
            <a href="/cars" className="flex items-center gap-1 text-[12px] font-bold text-[#0E1418] hover:text-[#0E1418]/80">
              Explore more <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {cars.length
              ? cars.slice(0, 8).map((car, i) => <CarCard key={getItemKey(car, i)} car={car} index={i} />)
              : Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-[320px] rounded-[24px]" />)}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#0E1418] py-16 sm:py-20 lg:py-24">
        <div className="page-inner">
          <div className="grid gap-6 lg:grid-cols-4">
            {STATS.map(({ val, suf, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="rounded-[24px] border border-white/10 bg-white/5 p-6 text-center"
              >
                <p className="text-[42px] font-black text-[#B5E92E] tabular-nums">
                  <Counter target={val} suffix={suf} />
                </p>
                <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-[#CBD5E1]">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F5F6F3] py-16 sm:py-20 lg:py-24">
        <div className="page-inner">
          <div className="mb-8 flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0E1418]/55">How it works</p>
              <h2 className="mt-2 text-[clamp(24px,3vw,36px)] font-black tracking-[-0.04em] text-[#0F172A]">Fast, simple, and secure</h2>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {PROCESS.map(({ step, title, text }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="rounded-[28px] border border-[#E7E9E5] bg-white p-6 shadow-[0_12px_25px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F6FBEA] text-[12px] font-black text-[#0E1418]">{step}</span>
                  <Sparkles size={18} className="text-[#B5E92E]" />
                </div>
                <h3 className="mt-5 text-[22px] font-black text-[#0F172A]">{title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#64748B]">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 lg:py-24">
        <div className="page-inner">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative overflow-hidden rounded-[32px] bg-[#0B1220] px-6 py-10 sm:px-8 lg:px-12 lg:py-14"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(181,233,46,0.18),transparent_28%)]" />
            <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
              <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=90" alt="Premium car" className="h-full w-full object-cover opacity-30" />
            </div>

            <div className="relative z-10 max-w-xl">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#B5E92E]">Sell smarter</p>
              <h2 className="mt-3 text-[clamp(30px,4vw,52px)] font-black leading-[0.95] tracking-[-0.05em] text-white">
                Ready to sell at the right price?
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-[#CBD5E1]">
                Get a free valuation, enjoy a faster listing flow, and reach buyers who are already looking for cars like yours.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/valuation" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#B5E92E] px-7 text-[13px] font-black text-[#0B1220] transition hover:brightness-110">
                  Get free valuation <ArrowRight size={15} />
                </a>
                <a href="/sell" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 text-[13px] font-black text-white transition hover:bg-white/10">
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
