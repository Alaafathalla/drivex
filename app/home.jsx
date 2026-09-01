'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import {
  ArrowRight, CalendarDays, CarFront, CheckCircle2, ChevronDown,
  ChevronLeft, ChevronRight, Gauge, GitCompare, Headphones,
  HeartHandshake, MapPin, Package, Search, ShieldCheck, ShoppingBag,
  Sparkles, Star, Tag, Wrench, Users, Zap,
} from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { useCurrency } from '@/context/CurrencyContext'
import { useLang } from '@/context/LangContext'
import { api } from '@/lib/api'
import { carService } from '@/services/carService'

// ─── Data constants ────────────────────────────────────────────────────────
const BRANDS = [
  { name: 'BMW', logo: '🔵' }, { name: 'Mercedes-Benz', logo: '⭐' },
  { name: 'Audi', logo: '◎' }, { name: 'Porsche', logo: '🏎' },
  { name: 'Tesla', logo: '⚡' }, { name: 'Toyota', logo: '🔴' },
  { name: 'Lexus', logo: '◈' }, { name: 'Range Rover', logo: '🟩' },
  { name: 'Ferrari', logo: '🐎' }, { name: 'Lamborghini', logo: '🐂' },
]

const getItemKey = (item, i) => item?.id ?? `item-${i}`

// ─── Service card data (static — translated inline via t()) ───────────────
const SERVICES_META = [
  { titleKey: 'svc_inspection',  descKey: 'svc_inspection_desc',  href: '/services/inspection', icon: ShieldCheck,   bg: 'from-[#e8f5e9] to-[#c8e6c9]', fg: '#2e7d32' },
  { titleKey: 'svc_maintenance', descKey: 'svc_maintenance_desc', href: '/services/maintenance', icon: Wrench,        bg: 'from-[#ede7f6] to-[#d1c4e9]', fg: '#4527a0' },
  { titleKey: 'svc_roadside',    descKey: 'svc_roadside_desc',    href: '/services/roadside',   icon: HeartHandshake, bg: 'from-[#fff3e0] to-[#ffe0b2]', fg: '#e65100' },
  { titleKey: 'svc_airport',     descKey: 'svc_airport_desc',     href: '/services/airport',    icon: Users,          bg: 'from-[#e3f2fd] to-[#bbdefb]', fg: '#1565c0' },
  { titleKey: 'svc_testdrive',   descKey: 'svc_testdrive_desc',   href: '/test-drive',          icon: CarFront,       bg: 'from-[#f3e5f5] to-[#e1bee7]', fg: '#6a1b9a' },
  { titleKey: 'svc_tradein',     descKey: 'svc_tradein_desc',     href: '/trade-in',            icon: Tag,            bg: 'from-[#fce4ec] to-[#f8bbd0]', fg: '#880e4f' },
  { titleKey: 'svc_accessories', descKey: 'svc_accessories_desc', href: '/accessories',         icon: ShoppingBag,    bg: 'from-[#fffde7] to-[#fff9c4]', fg: '#f57f17' },
]

// ─── Animated counter ──────────────────────────────────────────────────────
function AnimatedNumber({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const num = parseInt(value.replace(/\D/g, ''), 10)
    const suffix = value.replace(/[\d]/g, '')
    let start = 0
    const steps = 40
    const increment = num / steps
    let frame = 0
    const timer = setInterval(() => {
      frame++
      start = Math.min(Math.round(increment * frame), num)
      setDisplay(`${start}${suffix}`)
      if (frame >= steps) clearInterval(timer)
    }, 28)
    return () => clearInterval(timer)
  }, [inView, value])

  return <span ref={ref}>{inView ? display : value}</span>
}

// ─── HomeCarCard ───────────────────────────────────────────────────────────
function HomeCarCard({ car, index }) {
  const { toggle, isFav } = useFavorites()
  const toast   = useToast()
  const { format } = useCurrency()
  const fav     = isFav(String(car.id))
  const isRent  = car.listingType === 'rent'
  const image   = car.images?.[0] || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80'

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.07, 0.28), ease: [.22,1,.36,1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative flex flex-col overflow-hidden rounded-[24px] bg-white border border-[#f0f2ee] shadow-[0_4px_24px_rgba(0,0,0,.06)] transition-shadow hover:shadow-[0_16px_48px_rgba(0,0,0,.12)]"
    >
      {/* Image */}
      <a href={`/cars/${car.id}`} className="relative block overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img src={image} alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase shadow-sm ${
            isRent ? 'bg-[#38bdf8] text-white' : car.condition === 'New' ? 'bg-[#B5E92E] text-[#071016]' : 'bg-white/90 text-[#334155]'
          }`}>{isRent ? 'Rent' : car.condition}</span>
          {car.fuelType === 'Electric' && (
            <span className="flex items-center gap-1 rounded-full bg-[#B5E92E] px-2 py-1 text-[9px] font-black text-[#071016] shadow-sm"><Zap size={8} />EV</span>
          )}
        </div>
        <motion.button whileTap={{ scale: 0.72 }}
          onClick={e => { e.preventDefault(); toggle(String(car.id)); toast({ message: fav ? 'Removed' : `${car.brand} ${car.model} saved`, type: fav ? 'info' : 'fav' }) }}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition hover:bg-white"
          aria-label="Wishlist">
          <Star size={14} className={fav ? 'fill-[#B5E92E] text-[#B5E92E]' : 'text-[#94a3b8]'} />
        </motion.button>
      </a>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="truncate text-[14px] font-black text-[#0f172a]">{car.brand} {car.model}</h3>
        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#94a3b8]"><MapPin size={9} />{car.city} · {car.year}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {[car.transmission, car.fuelType].filter(Boolean).map(t => (
            <span key={t} className="rounded-md bg-[#f5f6f3] px-2 py-0.5 text-[10px] text-[#64748b]">{t}</span>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="text-[10px] text-[#94a3b8]">{isRent ? 'per day' : 'asking price'}</p>
            <p className="text-[17px] font-black text-[#0f172a]">{format(car.price)}{isRent && <span className="text-[11px] font-normal text-[#94a3b8]">/day</span>}</p>
          </div>
          <a href={`/cars/${car.id}`}
            className="rounded-xl bg-[#0f172a] px-3.5 py-2 text-[11px] font-black text-white transition hover:bg-[#B5E92E] hover:text-[#071016]">
            {isRent ? 'Book' : 'View'}
          </a>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Floating particle background (purely decorative) ────────────────────
function Particles({ count = 18, color = '#B5E92E' }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 5,
      delay: Math.random() * 4,
      dur: 4 + Math.random() * 4,
    })))
  }, [count])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map(p => (
        <motion.div key={p.id}
          animate={{ y: [0, -24, 0], opacity: [0, 0.55, 0] }}
          transition={{ delay: p.delay, duration: p.dur, repeat: Infinity, ease: 'easeInOut' }}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: color, borderRadius: '50%', position: 'absolute' }}
        />
      ))}
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────
function Hero({ meta }) {
  const { t, lang } = useLang()
  const [slide, setSlide] = useState(0)
  const [mode, setMode]   = useState('buy')
  const [filters, setFilters] = useState({ brand: '', model: '', minPrice: '', maxPrice: '' })

  const HERO_SLIDES = [
    { eyebrow: t('home_hero_slide1_eyebrow'), title: t('home_hero_slide1_title'), description: t('home_hero_slide1_desc'), image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=90', cta: '/cars', ctaLabel: t('home_hero_slide1_cta'), accent: '#B5E92E' },
    { eyebrow: t('home_hero_slide2_eyebrow'), title: t('home_hero_slide2_title'), description: t('home_hero_slide2_desc'), image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=90', cta: '/cars?listingType=rent', ctaLabel: t('home_hero_slide2_cta'), accent: '#38bdf8' },
    { eyebrow: t('home_hero_slide3_eyebrow'), title: t('home_hero_slide3_title'), description: t('home_hero_slide3_desc'), image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1800&q=90', cta: '/services', ctaLabel: t('home_hero_slide3_cta'), accent: '#fb923c' },
  ]

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
      {/* Animated bg image */}
      <AnimatePresence mode="wait">
        <motion.div key={slide}
          initial={{ opacity: 0, scale: 1.07 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [.22,1,.36,1] }}
          className="absolute inset-0">
          <img src={s.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071016]/92 via-[#071016]/60 to-[#071016]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071016]/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full"
          style={{ background: `radial-gradient(circle, ${s.accent}40 0%, transparent 70%)` }} />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute -left-16 bottom-0 h-[400px] w-[400px] rounded-full"
          style={{ background: `radial-gradient(circle, ${s.accent}30 0%, transparent 70%)` }} />
      </div>

      {/* Content */}
      <div className="page-inner relative z-10 flex min-h-[90vh] flex-col justify-center py-20 lg:py-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div key={`ey-${slide}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em]"
              style={{ borderColor: `${s.accent}50`, color: s.accent, background: `${s.accent}18` }}>
              <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent }} />
              {s.eyebrow}
            </span>
          </motion.div>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h1 key={`h-${slide}`}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [.22,1,.36,1] }}
              className="mt-6 whitespace-pre-line font-black leading-[0.88] tracking-[-0.06em] text-white"
              style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>
              {s.title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p key={`d-${slide}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="mt-6 max-w-lg text-[16px] leading-7 text-white/60">
              {s.description}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div key={`cta-${slide}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3">
            <motion.a href={s.cta} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-flex h-[52px] items-center gap-2 rounded-full px-7 text-[14px] font-black text-[#071016] transition"
              style={{ background: s.accent }}>
              {s.ctaLabel} <ArrowRight size={16} />
            </motion.a>
            <motion.a href="/calculator" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex h-[52px] items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 text-[14px] font-bold text-white backdrop-blur-sm transition hover:bg-white/18">
              {t('home_hero_finance')}
            </motion.a>
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

        {/* Search box */}
        <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.35 }}
          className="mt-12 w-full max-w-4xl overflow-hidden rounded-[24px] border border-white/12 bg-white/10 shadow-[0_20px_60px_rgba(0,0,0,.25)] backdrop-blur-xl">
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {[['buy', t('search_buy')], ['rent', t('search_rent')]].map(([m, label]) => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex items-center gap-2 px-6 py-3.5 text-[12px] font-black uppercase tracking-[.1em] transition border-b-2 ${
                  mode === m ? 'border-[#B5E92E] text-white' : 'border-transparent text-white/40 hover:text-white/70'
                }`}>
                {m === 'buy' ? <CarFront size={14} /> : <CalendarDays size={14} />} {label}
              </button>
            ))}
          </div>
          <div className="grid gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <div className="bg-transparent px-5 py-3">
              <p className="text-[9px] font-black uppercase tracking-[.15em] text-white/35">{t('home_hero_make')}</p>
              <div className="relative mt-1">
                <select value={filters.brand} onChange={e => setF('brand', e.target.value)}
                  className="w-full appearance-none bg-transparent text-[13px] font-semibold text-white outline-none">
                  <option value="" className="bg-[#0d1922]">{t('home_hero_any_brand')}</option>
                  {(meta?.brands || []).map(b => <option key={b} value={b} className="bg-[#0d1922]">{b}</option>)}
                </select>
                <ChevronDown size={12} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-white/30" />
              </div>
            </div>
            <div className="bg-transparent px-5 py-3">
              <p className="text-[9px] font-black uppercase tracking-[.15em] text-white/35">{t('home_hero_model')}</p>
              <input value={filters.model} onChange={e => setF('model', e.target.value)}
                placeholder={t('home_hero_any_model')}
                className="mt-1 w-full bg-transparent text-[13px] font-semibold text-white outline-none placeholder:text-white/30" />
            </div>
            <div className="bg-transparent px-5 py-3">
              <p className="text-[9px] font-black uppercase tracking-[.15em] text-white/35">{t('home_hero_min_price')}</p>
              <input type="number" value={filters.minPrice} onChange={e => setF('minPrice', e.target.value)}
                placeholder="0"
                className="mt-1 w-full bg-transparent text-[13px] font-semibold text-white outline-none placeholder:text-white/30" />
            </div>
            <div className="bg-transparent px-5 py-3">
              <p className="text-[9px] font-black uppercase tracking-[.15em] text-white/35">{t('home_hero_max_price')}</p>
              <input type="number" value={filters.maxPrice} onChange={e => setF('maxPrice', e.target.value)}
                placeholder={t('home_hero_no_limit')}
                className="mt-1 w-full bg-transparent text-[13px] font-semibold text-white outline-none placeholder:text-white/30" />
            </div>
            <a href={`/cars?${params}`}
              className="flex items-center justify-center gap-2 bg-[#B5E92E] px-7 text-[13px] font-black text-[#071016] transition hover:brightness-110">
              <Search size={15} /> {t('home_hero_search')}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-[10px] font-bold uppercase tracking-[.2em] text-white/30">{t('home_hero_scroll')}</span>
        <ChevronDown size={16} className="text-white/30" />
      </motion.div>
    </section>
  )
}

// ─── Brands ticker ────────────────────────────────────────────────────────
function BrandsStrip() {
  return (
    <div className="relative overflow-hidden border-y border-[#e8ecf0] bg-white py-5">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex w-max items-center gap-0">
        {[...BRANDS, ...BRANDS].map((b, i) => (
          <div key={i} className="flex shrink-0 items-center gap-3 border-r border-[#e8ecf0] px-8 py-1">
            <span className="text-lg">{b.logo}</span>
            <span className="text-[11px] font-black uppercase tracking-[.18em] text-[#94a3b8]">{b.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────
function StatsSection() {
  const { t } = useLang()
  const STATS = [
    { value: '18K+', labelKey: 'stat_listings', icon: CheckCircle2 },
    { value: '5K+',  labelKey: 'stat_drivers',  icon: Star },
    { value: '50+',  labelKey: 'stat_dealers',  icon: ShieldCheck },
    { value: '12',   labelKey: 'stat_cities',   icon: MapPin },
  ]
  return (
    <section className="relative overflow-hidden bg-[#0f172a] py-20">
      <Particles count={22} color="#B5E92E" />
      {/* Decorative blob */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B5E92E]/10 blur-[80px]" />
      </div>
      <div className="page-inner relative z-10">
        <div className="grid gap-px overflow-hidden rounded-[28px] border border-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ value, labelKey, icon: Icon }, i) => (
            <motion.div key={labelKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.09 }}
              whileHover={{ background: 'rgba(181,233,46,0.08)', transition: { duration: 0.2 } }}
              className="flex flex-col items-center justify-center py-12 text-center bg-white/[0.03]">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#B5E92E]/15">
                <Icon size={20} className="text-[#B5E92E]" />
              </motion.div>
              <p className="text-[52px] font-black leading-none tracking-[-0.06em] text-white">
                <AnimatedNumber value={value} />
              </p>
              <p className="mt-2 text-[11px] font-black uppercase tracking-[.2em] text-white/35">{t(labelKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Featured cars ────────────────────────────────────────────────────────
function FeaturedSection({ cars }) {
  const { t } = useLang()
  const [start, setStart] = useState(0)
  const step = 4
  const total = cars.length
  const visible = cars.slice(start, start + step)
  const next = () => setStart(p => (p + step >= total ? 0 : p + step))
  const prev = () => setStart(p => Math.max(0, p - step))

  return (
    <section className="bg-[#f8fafc] py-24">
      <div className="page-inner">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block rounded-full bg-[#B5E92E]/15 px-3 py-1 text-[10px] font-black uppercase tracking-[.2em] text-[#6b8f00]">
              {t('home_featured_eyebrow')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 }}
              className="mt-4 font-black leading-[0.92] tracking-[-0.05em] text-[#0f172a]"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              {t('home_featured_title').split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
            </motion.h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
              onClick={prev} className="grid h-11 w-11 place-items-center rounded-full border border-[#e5e9e2] bg-white text-[#0f172a] shadow-sm transition hover:border-[#B5E92E] hover:bg-[#B5E92E]" aria-label="Previous">
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
              onClick={next} className="grid h-11 w-11 place-items-center rounded-full border border-[#e5e9e2] bg-white text-[#0f172a] shadow-sm transition hover:border-[#B5E92E] hover:bg-[#B5E92E]" aria-label="Next">
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>

        {total > 0 ? (
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {visible.map((car, i) => <HomeCarCard key={getItemKey(car, i)} car={car} index={i} />)}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-[320px] rounded-[22px]" />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center">
          <a href="/cars" className="inline-flex h-12 items-center gap-2 rounded-full border border-[#e5e9e2] bg-white px-8 text-[13px] font-bold text-[#0f172a] shadow-sm transition hover:border-[#B5E92E] hover:bg-[#B5E92E] hover:text-[#071016]">
            {t('home_featured_view_all')} <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Categories ───────────────────────────────────────────────────────────
function CategoriesSection({ cats }) {
  const { t } = useLang()
  const fallback = [
    { slug: 'suv',      title: 'SUV',     count: 340, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80' },
    { slug: 'sedan',    title: 'Sedan',   count: 210, image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80' },
    { slug: 'electric', title: 'Electric',count: 95,  image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80' },
    { slug: 'sports',   title: 'Sports',  count: 78,  image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80' },
    { slug: 'luxury',   title: 'Luxury',  count: 130, image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80' },
  ]
  const list = cats?.length ? cats : fallback

  return (
    <section className="bg-white py-24">
      <div className="page-inner">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[10px] font-black uppercase tracking-[.2em] text-[#94a3b8]">Shop by style</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }}
              className="mt-3 font-black leading-none tracking-[-0.05em] text-[#0f172a]"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Find your<br />perfect category
            </motion.h2>
          </div>
          <a href="/cars" className="shrink-0 text-[12px] font-black text-[#0f172a] underline underline-offset-4 transition hover:text-[#B5E92E]">Browse all →</a>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]" style={{ gridAutoRows: '240px' }}>
          {list.slice(0, 5).map((cat, i) => (
            <motion.a key={cat.slug} href={`/cars?body=${cat.slug}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ scale: 1.015, transition: { duration: 0.25 } }}
              className={`group relative overflow-hidden rounded-[22px] ${i === 0 ? 'lg:row-span-2' : ''}`}
              style={{ gridRow: i === 0 ? 'span 2' : undefined }}
            >
              <img src={cat.image} alt={cat.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-107" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071016]/85 via-[#071016]/20 to-transparent" />
              {/* Animated overlay on hover */}
              <motion.div className="absolute inset-0 bg-[#B5E92E]/0 transition-colors duration-300 group-hover:bg-[#B5E92E]/08" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[11px] font-black uppercase tracking-[.15em] text-white/60">{cat.count}+ cars</p>
                <p className={`font-black text-white ${i === 0 ? 'text-[28px]' : 'text-[18px]'}`}>{cat.title}</p>
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-black text-white backdrop-blur-sm transition group-hover:bg-[#B5E92E] group-hover:text-[#071016]">
                  Browse <ArrowRight size={10} />
                </motion.span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────
function ServicesSection() {
  const rowRef = useRef(null)
  const { t } = useLang()
  const scroll = (d) => rowRef.current?.scrollBy({ left: d, behavior: 'smooth' })
  // alias so inline code that references SERVICES_LIST still works
  const SERVICES_LIST = SERVICES_META

  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="page-inner">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[10px] font-black uppercase tracking-[.2em] text-[#94a3b8]">Full ownership circle</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }}
              className="mt-3 font-black leading-none tracking-[-0.05em] text-[#0f172a]"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              Every service<br />in one place
            </motion.h2>
          </div>
          <div className="flex shrink-0 gap-2">
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
              onClick={() => scroll(-340)} className="grid h-10 w-10 place-items-center rounded-full border border-[#e5e9e2] bg-white text-[#0f172a] shadow-sm transition hover:border-[#B5E92E]" aria-label="Left">
              <ChevronLeft size={17} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
              onClick={() => scroll(340)} className="grid h-10 w-10 place-items-center rounded-full border border-[#e5e9e2] bg-white text-[#0f172a] shadow-sm transition hover:border-[#B5E92E]" aria-label="Right">
              <ChevronRight size={17} />
            </motion.button>
          </div>
        </div>

        <div ref={rowRef} className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SERVICES_LIST.map(({ title, desc, href, icon: Icon, bg, fg, dot }, i) => (
            <motion.a key={href} href={href}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className={`group flex min-w-[230px] max-w-[270px] flex-col rounded-[24px] bg-gradient-to-br ${bg} p-6 shadow-[0_4px_24px_rgba(0,0,0,.06)] transition hover:shadow-[0_16px_40px_rgba(0,0,0,.12)]`}>
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1, transition: { duration: 0.22 } }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Icon size={22} style={{ color: fg }} />
              </motion.div>
              <h3 className="mt-6 text-[17px] font-black" style={{ color: fg }}>{title}</h3>
              <p className="mt-2 text-[12px] leading-5 text-[#64748b]">{desc}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-black" style={{ color: fg }}>
                Learn more
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}>
                  <ArrowRight size={12} />
                </motion.span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How it works ─────────────────────────────────────────────────────────
function HowItWorks() {
  const { t } = useLang()

  const PROCESS = [
    { n: '01', title: t('hiw_step1_title'), text: t('hiw_step1_text'), icon: Search },
    { n: '02', title: t('hiw_step2_title'), text: t('hiw_step2_text'), icon: GitCompare },
    { n: '03', title: t('hiw_step3_title'), text: t('hiw_step3_text'), icon: Zap },
  ]

  return (
    <section className="bg-[#f8fafc] py-24">
      <div className="page-inner">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:items-start">
          {/* Sticky heading */}
          <div className="lg:sticky lg:top-32">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[10px] font-black uppercase tracking-[.2em] text-[#94a3b8]">Simple process</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }}
              className="mt-4 font-black leading-[0.92] tracking-[-0.055em] text-[#0f172a]"
              style={{ fontSize: 'clamp(36px, 4.5vw, 58px)' }}>
              Fast,<br />simple<br />and secure.
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
              className="mt-5 text-[15px] leading-7 text-[#64748b]">
              From search to keys in three clear steps. No paperwork surprises.
            </motion.p>
            <motion.a href="/cars"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.18 }}
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#0f172a] px-7 text-[13px] font-black text-white transition hover:bg-[#B5E92E] hover:text-[#071016]">
              Start browsing <ArrowRight size={15} />
            </motion.a>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {PROCESS.map(({ n, title, text, icon: Icon }, i) => (
              <motion.div key={n}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.48, delay: i * 0.1, ease: [.22,1,.36,1] }}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="flex gap-6 rounded-[22px] border border-[#e8ecf0] bg-white p-6 shadow-sm transition hover:border-[#B5E92E]/50 hover:shadow-md">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1, transition: { duration: 0.22 } }}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#B5E92E]">
                  <Icon size={22} className="text-[#071016]" />
                </motion.div>
                <div>
                  <p className="text-[10px] font-black tracking-[.2em] text-[#94a3b8]">STEP {n}</p>
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

// ─── Sell CTA ─────────────────────────────────────────────────────────────
function SellCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0f172a] py-24">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1800&q=80" alt=""
          className="h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent" />
      </div>

      {/* Animated lime orb */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="pointer-events-none absolute right-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#B5E92E] blur-[90px]" />

      <Particles count={14} color="#B5E92E" />

      <div className="page-inner relative z-10">
        <div className="max-w-2xl">
          <motion.span initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-[#B5E92E]/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em] text-[#B5E92E]">
            <Sparkles size={10} /> Sell smarter
          </motion.span>

          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
            className="mt-6 font-black leading-[0.9] tracking-[-0.055em] text-white"
            style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}>
            Ready to sell<br />at the right<br />price?
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="mt-6 max-w-md text-[16px] leading-7 text-white/55">
            Get a free valuation, create a polished listing, and reach buyers who are already looking for exactly what you have.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3">
            <motion.a href="/trade-in" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#B5E92E] px-7 text-[14px] font-black text-[#071016] transition hover:brightness-110">
              Get free valuation <ArrowRight size={16} />
            </motion.a>
            <motion.a href="/list-your-car" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex h-[52px] items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 text-[14px] font-bold text-white transition hover:bg-white/18">
              List my car
            </motion.a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.28 }}
            className="mt-10 flex flex-wrap gap-3">
            {['Free valuation', 'No hidden fees', 'Reach 18K+ buyers', 'List in 5 minutes'].map(t => (
              <span key={t} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/60">
                <CheckCircle2 size={11} className="text-[#B5E92E]" /> {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="bg-white py-24">
      <div className="page-inner">
        <div className="mb-14 text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[.2em] text-[#94a3b8]">Driver stories</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }}
            className="mt-4 font-black leading-none tracking-[-0.05em] text-[#0f172a]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
            Built around real<br />automotive decisions.
          </motion.h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {QUOTES.map(({ q, name, role, avatar, color }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.22 } }}
              className="flex flex-col rounded-[24px] border border-[#e8ecf0] bg-white p-7 shadow-sm transition hover:shadow-lg">
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <motion.div key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.05 }}>
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                  </motion.div>
                ))}
              </div>

              <p className="mt-5 flex-1 text-[15px] leading-7 text-[#334155]">{q}</p>

              <div className="mt-8 flex items-center gap-3 border-t border-[#f0f2ef] pt-5">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[14px] font-black text-white"
                  style={{ background: color }}>
                  {avatar}
                </div>
                <div>
                  <p className="text-[13px] font-black text-[#0f172a]">{name}</p>
                  <p className="text-[11px] text-[#94a3b8]">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState(null)
  return (
    <section className="bg-[#f8fafc] py-24">
      <div className="page-inner grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:items-start">
        <div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[.2em] text-[#B5E92E]">FAQ</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }}
            className="mt-4 font-black leading-[0.92] tracking-[-0.05em] text-[#0f172a]"
            style={{ fontSize: 'clamp(30px, 3.5vw, 46px)' }}>
            Answers before<br />you need to ask.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
            className="mt-5 text-[14px] leading-7 text-[#64748b]">
            Still have questions? Our team is available 7 days a week.
          </motion.p>
          <motion.a href="/contact"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.18 }}
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[#0f172a] px-5 text-[12px] font-black text-white transition hover:bg-[#B5E92E] hover:text-[#071016]">
            <Headphones size={14} /> Contact support
          </motion.a>
        </div>

        <div className="space-y-3">
          {FAQS.map(([q, a], i) => (
            <motion.div key={q}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`overflow-hidden rounded-2xl border transition-all ${open === i ? 'border-[#B5E92E]/50 bg-white shadow-md' : 'border-[#e8ecf0] bg-white'}`}>
              <button className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[13px] font-black text-[#0f172a]"
                onClick={() => setOpen(open === i ? null : i)}>
                {q}
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.22 }}
                  className="shrink-0 text-[20px] font-light text-[#B5E92E]">+</motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24 }}
                    className="overflow-hidden">
                    <p className="px-5 pb-5 text-[13px] leading-6 text-[#64748b]">{a}</p>
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

// ─── Journal ──────────────────────────────────────────────────────────────
function JournalSection() {
  return (
    <section className="bg-white py-24">
      <div className="page-inner">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[10px] font-black uppercase tracking-[.2em] text-[#94a3b8]">DriveX journal</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }}
              className="mt-3 font-black leading-none tracking-[-0.05em] text-[#0f172a]"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              Practical intelligence<br />for car people.
            </motion.h2>
          </div>
          <a href="/journal" className="shrink-0 text-[12px] font-black text-[#0f172a] underline underline-offset-4 hover:text-[#B5E92E]">All articles →</a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {POSTS.map(({ tag, title, read, href, img }, i) => (
            <motion.a key={href} href={href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.22 } }}
              className="group block overflow-hidden rounded-[22px] border border-[#e8ecf0] bg-white shadow-sm transition hover:shadow-xl">
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img src={img} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-106" />
                <div className="absolute inset-0 bg-black/10" />
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

// ─── Root ─────────────────────────────────────────────────────────────────
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
      <Hero meta={meta} />
      <BrandsStrip />
      <StatsSection />
      <FeaturedSection cars={cars} />
      <CategoriesSection cats={cats} />
      <ServicesSection />
      <HowItWorks />
      <SellCTA />
      <TestimonialsSection />
      <JournalSection />
      <FAQSection />
    </div>
  )
}
