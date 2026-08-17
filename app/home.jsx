'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight, CalendarDays, CarFront, CheckCircle2, ChevronDown,
  ChevronLeft, ChevronRight, Gauge, GitCompare, Headphones,
  HeartHandshake, MapPin, Search, ShieldCheck, Sparkles,
  Star, Tag, Wrench, Users, Zap,
} from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { useCurrency } from '@/context/CurrencyContext'
import { useLang } from '@/context/LangContext'
import { api } from '@/lib/api'
import { carService } from '@/services/carService'

// ─── Hero slides ──────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    eyebrow: 'Premium marketplace',
    title: 'Find your\nnext car\nwith confidence.',
    description: 'Verified inventory, transparent pricing and a professional experience from first search to final signature.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=90',
    cta: '/cars', ctaLabel: 'Browse inventory',
    accent: '#B5E92E',
  },
  {
    eyebrow: 'Luxury rentals',
    title: 'Rent an\ninspiring\nvehicle.',
    description: 'Executive sedans, standout SUVs and supercar experiences — clear rates, trusted partners, fast booking.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=90',
    cta: '/cars?listingType=rent', ctaLabel: 'Explore rentals',
    accent: '#38bdf8',
  },
  {
    eyebrow: 'Ownership services',
    title: 'One platform\nfor every\nautomotive need.',
    description: 'Inspection, maintenance, roadside and airport transfers — all under the same professional experience.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1800&q=90',
    cta: '/services', ctaLabel: 'Explore services',
    accent: '#fb923c',
  },
]

const BRANDS = [
  { name: 'BMW', logo: '🔵' }, { name: 'Mercedes-Benz', logo: '⭐' },
  { name: 'Audi', logo: '◎' }, { name: 'Porsche', logo: '🏎' },
  { name: 'Tesla', logo: '⚡' }, { name: 'Toyota', logo: '🔴' },
  { name: 'Lexus', logo: '◈' }, { name: 'Range Rover', logo: '🟩' },
  { name: 'Ferrari', logo: '🐎' }, { name: 'Lamborghini', logo: '🐂' },
]

const STATS = [
  { value: '18K+', label: 'Verified listings', icon: CheckCircle2 },
  { value: '5K+',  label: 'Happy drivers',     icon: Star },
  { value: '50+',  label: 'Dealer partners',   icon: ShieldCheck },
  { value: '12',   label: 'Cities covered',    icon: MapPin },
]

const SERVICES_LIST = [
  { title: 'Inspection',       desc: 'Pre-purchase condition reports.',    href: '/services/inspection', icon: ShieldCheck, bg: '#0b3d2e', fg: '#4ade80' },
  { title: 'Maintenance',      desc: 'Workshop care and routine service.',  href: '/services/maintenance', icon: Wrench,      bg: '#1e1b4b', fg: '#818cf8' },
  { title: 'Roadside',         desc: 'Fast help when your journey pauses.', href: '/services/roadside',   icon: HeartHandshake, bg: '#431407', fg: '#fb923c' },
  { title: 'Airport Transfer', desc: 'Business-class mobility on time.',   href: '/services/airport',    icon: Users,       bg: '#0c1a4d', fg: '#60a5fa' },
  { title: 'Test Drive',       desc: 'Book at your nearest showroom.',      href: '/test-drive',          icon: CarFront,    bg: '#1a0533', fg: '#c084fc' },
  { title: 'Trade-In',         desc: 'Instant estimate for your car.',      href: '/trade-in',            icon: Tag,         bg: '#3f1515', fg: '#f87171' },
]

const PROCESS = [
  { n: '01', title: 'Search smarter',      text: 'Filters for body type, brand, price, range and city.',  icon: Search },
  { n: '02', title: 'Compare confidently', text: 'Stack up to 4 vehicles side by side on every spec.',    icon: GitCompare },
  { n: '03', title: 'Book or enquire',     text: 'Straight into checkout, contact or service flows.',      icon: Zap },
]

const getItemKey = (item, i) => item?.id ?? `item-${i}`

// ─── CarCard (local, optimised for home grid) ─────────────────────────────
function HomeCarCard({ car, index }) {
  const { toggle, isFav } = useFavorites()
  const toast   = useToast()
  const { format } = useCurrency()
  const fav     = isFav(String(car.id))
  const isRent  = car.listingType === 'rent'
  const image   = car.images?.[0] || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80'

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.42, delay: Math.min(index * 0.06, 0.25), ease: [.22,1,.36,1] }}
      className="group relative flex flex-col overflow-hidden rounded-[22px] bg-[#0d1922] transition-all hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,.35)]"
    >
      {/* Image */}
      <a href={`/cars/${car.id}`} className="relative block overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img src={image} alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1922] via-[#0d1922]/20 to-transparent" />

        {/* badges */}
        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${
            isRent ? 'bg-[#38bdf8] text-[#071016]' : car.condition === 'New' ? 'bg-[#B5E92E] text-[#071016]' : 'bg-white/20 text-white backdrop-blur-sm'
          }`}>
            {isRent ? 'Rent' : car.condition}
          </span>
          {car.fuelType === 'Electric' && (
            <span className="flex items-center gap-1 rounded-full bg-[#B5E92E]/90 px-2 py-1 text-[9px] font-black text-[#071016]"><Zap size={8} />EV</span>
          )}
        </div>

        {/* heart */}
        <motion.button whileTap={{ scale: 0.75 }} onClick={e => { e.preventDefault(); toggle(String(car.id)); toast({ message: fav ? 'Removed' : `${car.brand} ${car.model} saved`, type: fav ? 'info' : 'fav' }) }}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/40 backdrop-blur-sm transition hover:bg-black/60"
          aria-label="Wishlist">
          <Star size={14} className={fav ? 'fill-[#B5E92E] text-[#B5E92E]' : 'text-white/70'} />
        </motion.button>
      </a>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="truncate text-[14px] font-black text-white">{car.brand} {car.model}</h3>
        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/40"><MapPin size={9} />{car.city} · {car.year}</p>

        <div className="mt-3 flex flex-wrap gap-1">
          {[car.transmission, car.fuelType].filter(Boolean).map(t => (
            <span key={t} className="rounded-md bg-white/8 px-2 py-0.5 text-[10px] text-white/55">{t}</span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="text-[10px] text-white/35">{isRent ? 'per day' : 'asking price'}</p>
            <p className="text-[17px] font-black text-white">{format(car.price)}{isRent && <span className="text-[11px] font-normal text-white/40">/day</span>}</p>
          </div>
          <a href={`/cars/${car.id}`}
            className="rounded-xl bg-[#B5E92E] px-3.5 py-2 text-[11px] font-black text-[#071016] transition hover:brightness-110">
            {isRent ? 'Book' : 'View'}
          </a>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────
function Hero({ meta }) {
  const [slide, setSlide] = useState(0)
  const [mode, setMode]   = useState('buy')
  const [filters, setFilters] = useState({ brand: '', model: '', minPrice: '', maxPrice: '' })
  const s = HERO_SLIDES[slide]
  const setF = (k, v) => setFilters(p => ({ ...p, [k]: v }))

  useEffect(() => {
    const t = setInterval(() => setSlide(i => (i + 1) % HERO_SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])

  const params = new URLSearchParams({ listingType: mode === 'rent' ? 'rent' : 'sale' })
  if (filters.brand)    params.set('brand', filters.brand)
  if (filters.model)    params.set('q', filters.model)
  if (filters.minPrice) params.set('minPrice', filters.minPrice)
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#071016]">
      {/* Full-bleed background image */}
      <AnimatePresence mode="wait">
        <motion.div key={slide}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [.22,1,.36,1] }}
          className="absolute inset-0">
          <img src={s.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071016]/90 via-[#071016]/60 to-[#071016]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071016]/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="page-inner relative z-10 flex min-h-[90vh] flex-col justify-center py-20 lg:py-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div key={`ey-${slide}`} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em]"
              style={{ borderColor: `${s.accent}40`, color: s.accent, background: `${s.accent}15` }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent }} />
              {s.eyebrow}
            </span>
          </motion.div>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h1 key={`h-${slide}`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [.22,1,.36,1] }}
              className="mt-6 whitespace-pre-line font-black leading-[0.9] tracking-[-0.06em] text-white"
              style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>
              {s.title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p key={`d-${slide}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-6 max-w-lg text-[16px] leading-7 text-white/60">
              {s.description}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div key={`cta-${slide}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3">
            <a href={s.cta}
              className="inline-flex h-13 items-center gap-2 rounded-full px-7 text-[14px] font-black text-[#071016] transition hover:brightness-110"
              style={{ background: s.accent, height: 52 }}>
              {s.ctaLabel} <ArrowRight size={16} />
            </a>
            <a href="/calculator"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/20 bg-white/8 px-7 text-[14px] font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
              style={{ height: 52 }}>
              Finance calculator
            </a>
          </motion.div>

          {/* Slide dots */}
          <div className="mt-10 flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                className="rounded-full transition-all duration-300"
                style={{ height: 6, width: i === slide ? 32 : 8, background: i === slide ? s.accent : 'rgba(255,255,255,0.25)' }}
                aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        </div>

        {/* Search box — anchored to bottom of hero */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 w-full max-w-4xl overflow-hidden rounded-[24px] border border-white/10 bg-white/8 backdrop-blur-xl">

          {/* Buy / Rent tabs */}
          <div className="flex border-b border-white/10">
            {[['buy','Buy'], ['rent','Rent']].map(([m, label]) => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex items-center gap-2 px-6 py-3.5 text-[12px] font-black uppercase tracking-[.1em] transition border-b-2 ${
                  mode === m ? 'border-[#B5E92E] text-white' : 'border-transparent text-white/40 hover:text-white/70'
                }`}>
                {m === 'buy' ? <CarFront size={14} /> : <CalendarDays size={14} />} {label}
              </button>
            ))}
          </div>

          <div className="grid gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            {/* Brand */}
            <div className="relative bg-transparent px-5 py-3">
              <p className="text-[9px] font-black uppercase tracking-[.15em] text-white/35">Make</p>
              <div className="relative mt-1">
                <select value={filters.brand} onChange={e => setF('brand', e.target.value)}
                  className="w-full appearance-none bg-transparent text-[13px] font-semibold text-white outline-none">
                  <option value="" className="bg-[#0d1922]">Any brand</option>
                  {(meta?.brands || []).map(b => <option key={b} value={b} className="bg-[#0d1922]">{b}</option>)}
                </select>
                <ChevronDown size={12} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-white/30" />
              </div>
            </div>

            {/* Model */}
            <div className="bg-transparent px-5 py-3">
              <p className="text-[9px] font-black uppercase tracking-[.15em] text-white/35">Model</p>
              <input value={filters.model} onChange={e => setF('model', e.target.value)}
                placeholder="Any model"
                className="mt-1 w-full bg-transparent text-[13px] font-semibold text-white outline-none placeholder:text-white/30" />
            </div>

            {/* Min price */}
            <div className="bg-transparent px-5 py-3">
              <p className="text-[9px] font-black uppercase tracking-[.15em] text-white/35">Min price</p>
              <input type="number" value={filters.minPrice} onChange={e => setF('minPrice', e.target.value)}
                placeholder="0"
                className="mt-1 w-full bg-transparent text-[13px] font-semibold text-white outline-none placeholder:text-white/30" />
            </div>

            {/* Max price */}
            <div className="bg-transparent px-5 py-3">
              <p className="text-[9px] font-black uppercase tracking-[.15em] text-white/35">Max price</p>
              <input type="number" value={filters.maxPrice} onChange={e => setF('maxPrice', e.target.value)}
                placeholder="No limit"
                className="mt-1 w-full bg-transparent text-[13px] font-semibold text-white outline-none placeholder:text-white/30" />
            </div>

            {/* Search CTA */}
            <a href={`/cars?${params}`}
              className="flex items-center justify-center gap-2 bg-[#B5E92E] px-7 text-[13px] font-black text-[#071016] transition hover:brightness-110">
              <Search size={15} /> Search
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-[10px] font-bold uppercase tracking-[.2em] text-white/30">Scroll</span>
        <ChevronDown size={16} className="text-white/30" />
      </motion.div>
    </section>
  )
}

// ─── Brands marquee — full-bleed dark strip ───────────────────────────────
function BrandsStrip() {
  return (
    <div className="overflow-hidden bg-[#0b141b] py-5">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="flex w-max items-center gap-0">
        {[...BRANDS, ...BRANDS].map((b, i) => (
          <div key={i} className="flex shrink-0 items-center gap-3 border-r border-white/8 px-8 py-1">
            <span className="text-lg">{b.logo}</span>
            <span className="text-[11px] font-black uppercase tracking-[.18em] text-white/40">{b.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Stats — vivid lime on near-black ────────────────────────────────────
function StatsSection() {
  return (
    <section className="bg-[#B5E92E] py-16">
      <div className="page-inner">
        <div className="grid gap-0 divide-y divide-[#a0cf27] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:divide-y-0">
          {STATS.map(({ value, label, icon: Icon }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center justify-center py-10 text-center">
              <Icon size={22} className="text-[#3a5a00]/60 mb-3" />
              <p className="text-[52px] font-black leading-none tracking-[-0.06em] text-[#071016]">{value}</p>
              <p className="mt-2 text-[11px] font-black uppercase tracking-[.2em] text-[#3a5a00]">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Featured cars — dark background, contrasting cards ──────────────────
function FeaturedSection({ cars }) {
  const [start, setStart] = useState(0)
  const step = 4
  const total = cars.length
  const visible = cars.slice(start, start + step)
  const next = () => setStart(p => (p + step >= total ? 0 : p + step))
  const prev = () => setStart(p => Math.max(0, p - step))

  return (
    <section className="bg-[#071016] py-20">
      <div className="page-inner">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-[#B5E92E]/15 px-3 py-1 text-[10px] font-black uppercase tracking-[.2em] text-[#B5E92E]">
              Featured inventory
            </span>
            <h2 className="mt-4 font-black leading-[0.92] tracking-[-0.05em] text-white"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Premium cars<br />worth a closer look
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button onClick={prev} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10" aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10" aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Grid */}
        {total > 0 ? (
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {visible.map((car, i) => <HomeCarCard key={getItemKey(car, i)} car={car} index={i} />)}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-[320px] rounded-[22px]" style={{ background: 'rgba(255,255,255,.06)' }} />
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <a href="/cars" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/6 px-8 text-[13px] font-bold text-white transition hover:bg-white/12">
            View all inventory <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Categories — full-bleed image mosaic on white ────────────────────────
function CategoriesSection({ cats }) {
  const fallback = [
    { slug: 'suv',     title: 'SUV',     count: 340, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80' },
    { slug: 'sedan',   title: 'Sedan',   count: 210, image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80' },
    { slug: 'electric',title: 'Electric',count: 95,  image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80' },
    { slug: 'sports',  title: 'Sports',  count: 78,  image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80' },
    { slug: 'luxury',  title: 'Luxury',  count: 130, image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80' },
  ]
  const list = cats?.length ? cats : fallback

  return (
    <section className="bg-white py-20">
      <div className="page-inner">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#94a3b8]">Shop by style</p>
            <h2 className="mt-3 font-black leading-none tracking-[-0.05em] text-[#0f172a]"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Find your<br />perfect category
            </h2>
          </div>
          <a href="/cars" className="shrink-0 text-[12px] font-black text-[#0f172a] underline underline-offset-4 transition hover:text-[#B5E92E]">
            Browse all →
          </a>
        </div>

        {/* Mosaic layout: first card is double-tall */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]" style={{ gridAutoRows: '240px' }}>
          {list.slice(0, 5).map((cat, i) => (
            <motion.a key={cat.slug} href={`/cars?body=${cat.slug}`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-[22px] ${i === 0 ? 'lg:row-span-2' : ''}`}
              style={{ gridRow: i === 0 ? 'span 2' : undefined }}
            >
              <img src={cat.image} alt={cat.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-106" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071016]/85 via-[#071016]/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[11px] font-black uppercase tracking-[.15em] text-white/60">{cat.count}+ cars</p>
                <p className={`font-black text-white ${i === 0 ? 'text-[28px]' : 'text-[18px]'}`}>{cat.title}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-black text-white backdrop-blur-sm transition group-hover:bg-[#B5E92E] group-hover:text-[#071016]">
                  Browse <ArrowRight size={10} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Services — dark cards on off-white, each with unique accent ──────────
function ServicesSection() {
  const rowRef = useRef(null)
  const scroll = (d) => rowRef.current?.scrollBy({ left: d, behavior: 'smooth' })

  return (
    <section className="bg-[#F5F6F3] py-20">
      <div className="page-inner">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#94a3b8]">Full ownership circle</p>
            <h2 className="mt-3 font-black leading-none tracking-[-0.05em] text-[#0f172a]"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              Every service<br />in one place
            </h2>
          </div>
          <div className="flex shrink-0 gap-2">
            <button onClick={() => scroll(-340)} className="grid h-10 w-10 place-items-center rounded-full border border-[#dfe5db] bg-white text-[#0f172a] transition hover:border-[#B5E92E]" aria-label="Left"><ChevronLeft size={17} /></button>
            <button onClick={() => scroll(340)}  className="grid h-10 w-10 place-items-center rounded-full border border-[#dfe5db] bg-white text-[#0f172a] transition hover:border-[#B5E92E]" aria-label="Right"><ChevronRight size={17} /></button>
          </div>
        </div>

        <div ref={rowRef} className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SERVICES_LIST.map(({ title, desc, href, icon: Icon, bg, fg }) => (
            <a key={href} href={href}
              className="group flex min-w-[220px] max-w-[260px] flex-col rounded-[22px] p-6 transition-all hover:-translate-y-1.5"
              style={{ background: bg }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${fg}20` }}>
                <Icon size={22} style={{ color: fg }} />
              </div>
              <h3 className="mt-6 text-[17px] font-black text-white">{title}</h3>
              <p className="mt-2 text-[12px] leading-5 text-white/45">{desc}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-black transition" style={{ color: fg }}>
                Learn more <ArrowRight size={12} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How it works — clean white section, big numbered steps ──────────────
function HowItWorks() {
  return (
    <section className="bg-white py-24">
      <div className="page-inner">
        {/* Split layout: heading left, steps right */}
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#94a3b8]">Simple process</p>
            <h2 className="mt-4 font-black leading-[0.92] tracking-[-0.055em] text-[#0f172a]"
              style={{ fontSize: 'clamp(36px, 4.5vw, 58px)' }}>
              Fast,<br />simple<br />and secure.
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-[#64748b]">
              From search to keys in three clear steps. No paperwork surprises.
            </p>
            <a href="/cars" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#0f172a] px-7 text-[13px] font-black text-white transition hover:bg-[#B5E92E] hover:text-[#071016]">
              Start browsing <ArrowRight size={15} />
            </a>
          </div>

          <div className="space-y-5">
            {PROCESS.map(({ n, title, text, icon: Icon }, i) => (
              <motion.div key={n}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: [.22,1,.36,1] }}
                className="flex gap-6 rounded-[22px] border border-[#f0f2ef] p-6 transition hover:border-[#B5E92E]/40 hover:shadow-lg">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#071016]">
                  <Icon size={22} className="text-[#B5E92E]" />
                </div>
                <div>
                  <p className="text-[10px] font-black tracking-[.2em] text-[#B5E92E]">STEP {n}</p>
                  <h3 className="mt-1 text-[20px] font-black text-[#0f172a]">{title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#64748b]">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Sell CTA — bold full-bleed with image ────────────────────────────────
function SellCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0f172a] py-24">
      {/* bg image */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1800&q=80" alt=""
          className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent" />
      </div>

      {/* Lime accent blob */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-10">
        <div className="absolute right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#B5E92E] blur-[80px]" />
      </div>

      <div className="page-inner relative z-10">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#B5E92E]/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em] text-[#B5E92E]">
            <Sparkles size={10} /> Sell smarter
          </span>

          <h2 className="mt-6 font-black leading-[0.9] tracking-[-0.055em] text-white"
            style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}>
            Ready to sell<br />at the right<br />price?
          </h2>

          <p className="mt-6 max-w-md text-[16px] leading-7 text-white/55">
            Get a free valuation, create a polished listing, and reach buyers who are already looking for exactly what you have.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/trade-in"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-[#B5E92E] px-7 text-[14px] font-black text-[#071016] transition hover:brightness-110"
              style={{ height: 52 }}>
              Get free valuation <ArrowRight size={16} />
            </a>
            <a href="/list-your-car"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/20 bg-white/8 px-7 text-[14px] font-bold text-white transition hover:bg-white/15"
              style={{ height: 52 }}>
              List my car
            </a>
          </div>

          {/* Trust pills */}
          <div className="mt-10 flex flex-wrap gap-3">
            {['Free valuation', 'No hidden fees', 'Reach 18K+ buyers', 'List in 5 minutes'].map(t => (
              <span key={t} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/60">
                <CheckCircle2 size={11} className="text-[#B5E92E]" /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials — light cream, distinctive card style ──────────────────
const QUOTES = [
  { q: '"The filters made it easy to narrow 200+ cars to the three that actually fit my budget."', name: 'Maya H.', role: 'Buyer · Dubai', avatar: 'M' },
  { q: '"Booked an SUV, airport delivery and insurance in one flow. Pricing was completely clear."', name: 'Omar R.', role: 'Renter · Abu Dhabi', avatar: 'O' },
  { q: '"DriveX gave my listing better structure and helped me price it right. Sold in a week."', name: 'Daniel K.', role: 'Seller · Dubai', avatar: 'D' },
]

function TestimonialsSection() {
  return (
    <section className="bg-[#fafbf8] py-24">
      <div className="page-inner">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#94a3b8]">Driver stories</p>
          <h2 className="mt-4 font-black leading-none tracking-[-0.05em] text-[#0f172a]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
            Built around real<br />automotive decisions.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {QUOTES.map(({ q, name, role, avatar }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`flex flex-col rounded-[22px] p-7 ${i === 1 ? 'bg-[#0f172a] text-white' : 'border border-[#e5e9e2] bg-white'}`}>
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={12} className={i === 1 ? 'fill-[#B5E92E] text-[#B5E92E]' : 'fill-amber-400 text-amber-400'} />
                ))}
              </div>

              <p className={`mt-5 flex-1 text-[15px] leading-7 ${i === 1 ? 'text-white/80' : 'text-[#334155]'}`}>{q}</p>

              <div className={`mt-8 flex items-center gap-3 border-t pt-5 ${i === 1 ? 'border-white/10' : 'border-[#f0f2ef]'}`}>
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-[14px] font-black ${i === 1 ? 'bg-[#B5E92E] text-[#071016]' : 'bg-[#f0f2ef] text-[#0f172a]'}`}>
                  {avatar}
                </div>
                <div>
                  <p className={`text-[13px] font-black ${i === 1 ? 'text-white' : 'text-[#0f172a]'}`}>{name}</p>
                  <p className={`text-[11px] ${i === 1 ? 'text-white/40' : 'text-[#94a3b8]'}`}>{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ — dark background, clean accordion ───────────────────────────────
const FAQS = [
  ['How are vehicles verified?', 'Listings include identity, dealer, inspection and ownership checks. The badge on each vehicle tells you exactly which checks were completed.'],
  ['Can I finance a vehicle through DriveX?', 'The calculator provides a real-time estimate and finance-ready enquiry flow. Final rates come from the selected lender or dealer.'],
  ['Can I cancel a rental?', 'Cancellation terms are shown before checkout and may vary by partner, vehicle and booking window.'],
  ['Is a test drive available before buying?', 'Yes. Use the Test Drive booking form to schedule with your preferred dealer at a time that suits you.'],
]

function FAQSection() {
  const [open, setOpen] = useState(null)
  return (
    <section className="bg-[#071016] py-24">
      <div className="page-inner grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:items-start">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#B5E92E]">FAQ</p>
          <h2 className="mt-4 font-black leading-[0.92] tracking-[-0.05em] text-white"
            style={{ fontSize: 'clamp(30px, 3.5vw, 46px)' }}>
            Answers before<br />you need to ask.
          </h2>
          <p className="mt-5 text-[14px] leading-7 text-white/40">
            Still have questions? Our team is available 7 days a week.
          </p>
          <a href="/contact"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 text-[12px] font-black text-white transition hover:bg-white/15">
            <Headphones size={14} /> Contact support
          </a>
        </div>

        <div className="space-y-2">
          {FAQS.map(([q, a], i) => (
            <motion.div key={q}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="overflow-hidden rounded-2xl border border-white/8 bg-white/4">
              <button className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[13px] font-black text-white"
                onClick={() => setOpen(open === i ? null : i)}>
                {q}
                <span className={`shrink-0 text-[#B5E92E] transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden">
                    <p className="px-5 pb-5 text-[13px] leading-6 text-white/45">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── News / Journal ───────────────────────────────────────────────────────
const POSTS = [
  { tag: 'EV ownership',  title: 'What UAE drivers should know before switching to electric', read: '6 min', href: '/journal/uae-ev-ownership-guide',    img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80' },
  { tag: 'Market guide',  title: 'How to compare a used luxury SUV beyond the headline price', read: '8 min', href: '/journal/compare-used-luxury-suvs', img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80' },
  { tag: 'Car care',      title: 'Five preventive maintenance checks before a long summer drive', read: '5 min', href: '/journal/summer-checks',          img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80' },
]

function JournalSection() {
  return (
    <section className="bg-white py-20">
      <div className="page-inner">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#94a3b8]">DriveX journal</p>
            <h2 className="mt-3 font-black leading-none tracking-[-0.05em] text-[#0f172a]"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              Practical intelligence<br />for car people.
            </h2>
          </div>
          <a href="/journal" className="shrink-0 text-[12px] font-black text-[#0f172a] underline underline-offset-4 hover:text-[#B5E92E]">
            All articles →
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {POSTS.map(({ tag, title, read, href, img }, i) => (
            <motion.a key={href} href={href}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group block overflow-hidden rounded-[22px] border border-[#e5e9e2] bg-white transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img src={img} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute left-4 top-4 rounded-full bg-[#0f172a] px-3 py-1 text-[9px] font-black uppercase tracking-[.12em] text-white">{tag}</span>
              </div>
              <div className="p-5">
                <h3 className="text-[15px] font-black leading-snug tracking-tight text-[#0f172a] transition group-hover:text-[#7d9f24]">{title}</h3>
                <p className="mt-3 text-[11px] text-[#94a3b8]">{read} read</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Root home component ──────────────────────────────────────────────────
export default function Home() {
  const [cars, setCars] = useState([])
  const [cats, setCats] = useState([])
  const [meta, setMeta] = useState({ brands: [] })

  useEffect(() => {
    Promise.all([
      carService.getCars({ limit: 8, sort: 'rating' }),
      api.getCategories(),
      carService.getMeta(),
    ]).then(([c, k, m]) => {
      setCars(c.items || [])
      setCats(k || [])
      setMeta(m || { brands: [] })
    }).catch(() => {})
  }, [])

  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. Hero — dark, full-bleed, cinematic */}
      <Hero meta={meta} />

      {/* 2. Brands — dark ticker strip (zero padding, acts as visual divider) */}
      <BrandsStrip />

      {/* 3. Stats — full lime blast, high contrast numbers */}
      <StatsSection />

      {/* 4. Featured cars — dark cards, contrasting dark section */}
      <FeaturedSection cars={cars} />

      {/* 5. Categories — white with image mosaic, light & open */}
      <CategoriesSection cats={cats} />

      {/* 6. Services — off-white with vivid colored cards */}
      <ServicesSection />

      {/* 7. How it works — clean white, sticky-heading layout */}
      <HowItWorks />

      {/* 8. Sell CTA — dark with overlaid image, high-impact */}
      <SellCTA />

      {/* 9. Testimonials — warm cream, center-dark middle card */}
      <TestimonialsSection />

      {/* 10. Journal — white, image-led article cards */}
      <JournalSection />

      {/* 11. FAQ — dark accordion, contrasting to journal */}
      <FAQSection />
    </div>
  )
}
