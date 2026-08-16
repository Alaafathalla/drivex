'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Gauge,
  HandCoins,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
  Users,
  HeartHandshake,
  MapPin,
  Headphones,
  Tag,
  Zap,
} from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { useCurrency } from '@/context/CurrencyContext'
import { useLang } from '@/context/LangContext'
import { api } from '@/lib/api'
import { carService } from '@/services/carService'
import { CarDrivingAnimation } from '@/components/platform/car-driving-animation'
import { FaqSection, NewsSection, TestimonialsSection, TrustBand } from '@/components/platform/rich-sections'

const HERO_SLIDES = [
  {
    eyebrow: 'Premium marketplace',
    title: 'Find, compare and reserve your next car with confidence.',
    description: 'A cleaner car-shopping experience with verified inventory, transparent pricing and a professional design that feels premium from the first click.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=90',
    badge: '10,000+ verified listings',
    cta: '/cars',
    secondary: '/rentals',
  },
  {
    eyebrow: 'Luxury rentals',
    title: 'Rent inspiring vehicles for business, travel and special moments.',
    description: 'From executive sedans to standout SUVs, browse polished rentals with clear rates, trusted partners and a fast booking path.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=90',
    badge: 'Airport, wedding and concierge-ready',
    cta: '/rentals',
    secondary: '/services/airport',
  },
  {
    eyebrow: 'Ownership services',
    title: 'One platform for inspection, maintenance, roadside and more.',
    description: 'DriveX is more than a listings site. It brings automotive services into the same premium experience.',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1800&q=90',
    badge: 'Book services in minutes',
    cta: '/services',
    secondary: '/services/maintenance',
  },
]

const BENEFITS = [
  { icon: ShieldCheck, title: 'Verified listings', text: 'Every car is reviewed and presented with a cleaner trust layer.' },
  { icon: Tag, title: 'Transparent pricing', text: 'Pricing, finance estimates and booking logic are easy to understand.' },
  { icon: Zap, title: 'Fast booking flow', text: 'Find, compare and reserve in a more modern conversion path.' },
  { icon: Headphones, title: 'Human support', text: 'Professional support for buying, renting and service requests.' },
]

const STATS = [
  { value: '10K+', label: 'cars listed' },
  { value: '5K+', label: 'happy drivers' },
  { value: '50+', label: 'dealer partners' },
  { value: '12', label: 'cities covered' },
]

const SERVICES = [
  { title: 'Inspection', desc: 'Decision-ready reports before you buy.', href: '/services/inspection', icon: ShieldCheck },
  { title: 'Maintenance', desc: 'Preventive care and workshop support.', href: '/services/maintenance', icon: Wrench },
  { title: 'Roadside', desc: 'Fast help when your journey pauses.', href: '/services/roadside', icon: HeartHandshake },
  { title: 'Airport transfer', desc: 'Business-class mobility on schedule.', href: '/services/airport', icon: Users },
]

const BRANDS = ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Tesla', 'Toyota', 'Lexus', 'Range Rover']

const processSteps = [
  { step: '01', title: 'Search smarter', text: 'Use clean filters for body style, price, range, brand and city.' },
  { step: '02', title: 'Compare confidently', text: 'Review specs, visuals and trusted details without clutter.' },
  { step: '03', title: 'Book or enquire', text: 'Move directly into contact, booking or service-request flows.' },
]

const getItemKey = (item, index) => item?.id ?? `${item?.title ?? 'item'}-${index}`

function HeroVisual({ slide, currentIndex }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 26 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -26 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[34px] border border-white/70 bg-white p-3 shadow-[0_30px_80px_rgba(15,23,42,.12)]"
      >
        <div className="overflow-hidden rounded-[28px]">
          <img src={slide.image} alt={slide.title} className="h-[520px] w-full object-cover" />
        </div>
        <div className="absolute inset-0 rounded-[34px] bg-gradient-to-t from-[#0f172a]/24 via-transparent to-transparent" />
        <div className="absolute left-7 top-7 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-[11px] font-black uppercase tracking-[.16em] text-slate-700 backdrop-blur">{slide.badge}</div>
        <div className="absolute bottom-7 left-7 right-7 grid gap-3 md:grid-cols-3">
          {[
            ['Trusted inventory', 'Professionally presented vehicles'],
            ['Flexible booking', 'Sales, rentals and services'],
            ['Premium design', 'More inspiring automotive browsing'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[22px] border border-white/45 bg-white/78 p-4 backdrop-blur">
              <p className="text-sm font-black text-slate-900">{title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function BrandsMarquee() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white p-4 shadow-[0_16px_38px_rgba(15,23,42,.04)]">
      <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} className="flex w-max gap-3">
        {[...BRANDS, ...BRANDS].map((brand, index) => (
          <div key={`${brand}-${index}`} className="rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-5 py-3 text-[12px] font-black uppercase tracking-[.16em] text-slate-600">
            {brand}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function CounterPills() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((item) => (
        <div key={item.label} className="rounded-[24px] border border-[#E5E7EB] bg-white px-5 py-5 shadow-[0_16px_34px_rgba(15,23,42,.04)]">
          <p className="text-[32px] font-black tracking-[-.04em] text-[#0F172A]">{item.value}</p>
          <p className="text-[11px] uppercase tracking-[.2em] text-slate-400">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

function CarCard({ car, index }) {
  const { toggle, isFav } = useFavorites()
  const toast = useToast()
  const { format } = useCurrency()
  const favoriteId = String(car.id)
  const fav = isFav(favoriteId)
  const isRent = car.listingType === 'rent'
  const href = `/cars/${car.id}`
  const name = `${car.brand || ''} ${car.model || ''}`.trim()
  const price = isRent ? `${format(car.price)}/day` : format(car.salePrice ?? car.price)
  const image = car.images?.[0] || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85'

  const handleHeart = (e) => {
    e.preventDefault()
    toggle(favoriteId)
    toast({ message: fav ? 'Removed from wishlist' : `${name} added to wishlist`, type: fav ? 'info' : 'fav' })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10px' }}
      transition={{ duration: 0.42, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[28px] border border-[#E7E9E5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
    >
      <a href={href} className="relative block overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/55 via-transparent to-transparent" />

        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${isRent ? 'bg-[#B5E92E] text-[#0E1418]' : car.condition === 'New' ? 'bg-[#0E1418] text-white' : 'bg-[#F4C65A] text-[#0E1418]'}`}>
          {isRent ? 'Rent' : car.condition || 'For sale'}
        </span>

        <button onClick={handleHeart} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/92 shadow-sm backdrop-blur-sm transition hover:bg-white" aria-label="Toggle wishlist">
          <Star size={16} className={fav ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#475569]'} />
        </button>
      </a>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[16px] font-black text-[#0F172A]">{name}</h3>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-[#64748B]"><MapPin size={10} /> {car.city || car.location} · {car.year}</p>
          </div>
          <p className="shrink-0 text-[18px] font-black text-[#0E1418]">{price}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {[car.transmission, car.fuelType, `${Number(car.mileage || 0).toLocaleString()} km`].filter(Boolean).map((tag) => (
            <span key={tag} className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1 text-[10px] font-semibold text-[#475569]">{tag}</span>
          ))}
        </div>

        <a href={href} className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#0E1418] text-[12px] font-bold text-white transition hover:bg-[#B5E92E] hover:text-[#0E1418]">
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
      className="group relative overflow-hidden rounded-[26px] border border-[#E7E9E5] bg-white shadow-[0_12px_25px_rgba(15,23,42,0.04)]"
      style={{ aspectRatio: '4/3' }}
    >
      <img src={cat.image} alt={cat.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/75 via-[#0B1220]/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-[16px] font-black text-white">{cat.title}</p>
        <p className="mt-1 text-[11px] text-white/75">{cat.count}+ cars</p>
      </div>
    </motion.a>
  )
}

function FeaturedSlider({ cars }) {
  const [start, setStart] = useState(0)
  const step = 4
  const pages = Math.max(1, Math.ceil(cars.length / step))
  const visible = cars.slice(start, start + step)

  const next = () => setStart((value) => (value + step >= cars.length ? 0 : value + step))
  const prev = () => setStart((value) => (value - step < 0 ? Math.max(0, (pages - 1) * step) : value - step))

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0E1418]/55">Featured inventory</p>
          <h2 className="mt-2 text-[clamp(24px,3vw,36px)] font-black tracking-[-0.04em] text-[#0F172A]">Premium cars worth a closer look</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prev} className="grid h-11 w-11 place-items-center rounded-full border border-[#E5E7EB] bg-white text-slate-700 shadow-sm transition hover:bg-[#F8FAFC]" aria-label="Previous"><ChevronLeft size={18} /></button>
          <button onClick={next} className="grid h-11 w-11 place-items-center rounded-full border border-[#E5E7EB] bg-white text-slate-700 shadow-sm transition hover:bg-[#F8FAFC]" aria-label="Next"><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {visible.map((car, i) => <CarCard key={getItemKey(car, i)} car={car} index={i} />)}
      </div>
    </div>
  )
}

export default function Home() {
  const { t } = useLang()
  const [mode, setMode] = useState('buy')
  const [cars, setCars] = useState([])
  const [cats, setCats] = useState([])
  const [meta, setMeta] = useState({ brands: [] })
  const [heroFilters, setHeroFilters] = useState({ brand: '', model: '', minPrice: '', maxPrice: '', minYear: '' })
  const [currentSlide, setCurrentSlide] = useState(0)
  const servicesRowRef = useRef(null)

  useEffect(() => {
    Promise.all([carService.getCars({ limit: 8, sort: 'rating' }), api.getCategories(), carService.getMeta()]).then(([c, k, m]) => {
      setCars(c.items || [])
      setCats(k)
      setMeta(m || { brands: [] })
    })
  }, [])

  useEffect(() => {
    const id = setInterval(() => setCurrentSlide((value) => (value + 1) % HERO_SLIDES.length), 5000)
    return () => clearInterval(id)
  }, [])

  const slide = HERO_SLIDES[currentSlide]

  const setHeroFilter = (key, value) => setHeroFilters((current) => ({ ...current, [key]: value }))
  const heroSearchParams = new URLSearchParams({ listingType: mode === 'rent' ? 'rent' : 'sale' })
  if (heroFilters.brand) heroSearchParams.set('brand', heroFilters.brand)
  if (heroFilters.model) heroSearchParams.set('q', heroFilters.model)
  if (heroFilters.minPrice) heroSearchParams.set('minPrice', heroFilters.minPrice)
  if (heroFilters.maxPrice) heroSearchParams.set('maxPrice', heroFilters.maxPrice)
  if (heroFilters.minYear) heroSearchParams.set('minYear', heroFilters.minYear)
  const heroSearchHref = `/cars?${heroSearchParams.toString()}`

  const scrollServices = (offset) => servicesRowRef.current?.scrollBy({ left: offset, behavior: 'smooth' })

  return (
    <div className="bg-[#F7F8F5] text-[#0F172A]">
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f5f7f2_0%,#f7f8f5_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(181,233,46,0.25),transparent_32%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_24%)]" />
        <div className="page-inner relative py-8 sm:py-10 lg:py-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="z-10 py-6 lg:py-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#DCE7BC] bg-white/85 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7D9F24] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#B5E92E] shadow-[0_0_20px_rgba(181,233,46,0.8)]" />
                {slide.eyebrow}
              </span>

              <AnimatePresence mode="wait">
                <motion.div key={currentSlide} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
                  <h1 className="mt-6 text-[clamp(42px,6vw,78px)] font-black leading-[0.92] tracking-[-0.06em] text-[#0F172A]">{slide.title}</h1>
                  <p className="mt-5 max-w-xl text-[17px] leading-7 text-slate-600">{slide.description}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={slide.cta} className="inline-flex h-12 items-center gap-2 rounded-full bg-[#0F172A] px-7 text-[14px] font-bold text-white transition hover:brightness-110">Browse Cars <ArrowRight size={16} /></a>
                <a href={slide.secondary} className="inline-flex h-12 items-center gap-2 rounded-full border border-[#D9E0EA] bg-white px-7 text-[14px] font-bold text-slate-700 transition hover:bg-[#F8FAFC]">Explore Services</a>
              </div>

              <div className="mt-8 flex flex-wrap gap-5 text-[12px] text-slate-600">
                {['Professional light theme', 'Vehicle detail pages', 'Single service pages'].map((item) => (
                  <span key={item} className="flex items-center gap-2"><span className="font-black text-[#7F9F1B]">✓</span>{item}</span>
                ))}
              </div>

              <div className="mt-8 flex gap-2">
                {HERO_SLIDES.map((_, index) => (
                  <button key={index} type="button" onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition ${index === currentSlide ? 'w-10 bg-[#B5E92E]' : 'w-2.5 bg-[#D5DCE5]'}`} aria-label={`Go to slide ${index + 1}`} />
                ))}
              </div>
            </motion.div>

            <HeroVisual slide={slide} currentIndex={currentSlide} />
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 mt-8 overflow-hidden rounded-[30px] border border-[#E7E9E5] bg-white shadow-[0_28px_60px_rgba(15,23,42,0.08)]">
            <div className="flex border-b border-[#EEF0EC]">
              {[
                ['buy', CarFront, 'Buy Cars'],
                ['rent', CalendarDays, 'Rent Cars'],
              ].map(([m, Icon, label]) => (
                <button key={m} onClick={() => setMode(m)} className={`flex items-center gap-2 border-b-2 px-6 py-4 text-[13px] font-bold transition ${mode === m ? 'border-[#B5E92E] text-[#0E1418]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'}`}>
                  <Icon size={16} className={mode === m ? 'text-[#B5E92E]' : 'text-[#64748B]'} />
                  {label}
                </button>
              ))}
            </div>

            <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[1.05fr_1.05fr_.8fr_.8fr_.7fr_auto]">
              <label className="relative">
                <span className="sr-only">Make</span>
                <select value={heroFilters.brand} onChange={(e) => setHeroFilter('brand', e.target.value)} className="h-12 w-full appearance-none rounded-2xl border border-[#E7E9E5] bg-[#F8FAFC] px-4 pr-9 text-[12px] font-semibold text-[#475569] outline-none transition focus:border-[#B5E92E]">
                  <option value="">All Makes</option>
                  {(meta.brands || []).map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
              </label>

              <input value={heroFilters.model} onChange={(e) => setHeroFilter('model', e.target.value)} placeholder="Model" className="h-12 rounded-2xl border border-[#E7E9E5] bg-[#F8FAFC] px-4 text-[12px] font-semibold text-[#475569] outline-none transition placeholder:text-[#94A3B8] focus:border-[#B5E92E]" />
              <input type="number" min="0" value={heroFilters.minPrice} onChange={(e) => setHeroFilter('minPrice', e.target.value)} placeholder="Min Price" className="h-12 rounded-2xl border border-[#E7E9E5] bg-[#F8FAFC] px-4 text-[12px] font-semibold text-[#475569] outline-none transition placeholder:text-[#94A3B8] focus:border-[#B5E92E]" />
              <input type="number" min="0" value={heroFilters.maxPrice} onChange={(e) => setHeroFilter('maxPrice', e.target.value)} placeholder="Max Price" className="h-12 rounded-2xl border border-[#E7E9E5] bg-[#F8FAFC] px-4 text-[12px] font-semibold text-[#475569] outline-none transition placeholder:text-[#94A3B8] focus:border-[#B5E92E]" />
              <input type="number" min="1990" max={new Date().getFullYear() + 1} value={heroFilters.minYear} onChange={(e) => setHeroFilter('minYear', e.target.value)} placeholder="Year" className="h-12 rounded-2xl border border-[#E7E9E5] bg-[#F8FAFC] px-4 text-[12px] font-semibold text-[#475569] outline-none transition placeholder:text-[#94A3B8] focus:border-[#B5E92E]" />
              <a href={heroSearchHref} className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#B5E92E] px-5 text-[13px] font-black text-[#0B1220] transition hover:brightness-110 sm:col-span-2 lg:col-span-1"><Search size={15} /> Search</a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page-inner py-10 sm:py-14"><BrandsMarquee /></section>

      <section className="page-inner py-8 sm:py-10"><CounterPills /></section>

      <section className="w-full py-10 sm:py-14">
        <div className="page-inner">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(({ icon: Icon, title, text }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }} className="flex items-center gap-4 rounded-[24px] border border-[#E7E9E5] bg-white p-5 shadow-[0_12px_25px_rgba(15,23,42,0.04)]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F6FBEA]"><Icon size={20} className="text-[#0E1418]" /></div>
                <div><p className="text-[13px] font-black text-[#0F172A]">{title}</p><p className="mt-1 text-[11px] leading-5 text-[#64748B]">{text}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-8 sm:py-10 lg:py-14">
        <div className="page-inner">
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0E1418]/55">Single services</p>
              <h2 className="mt-2 text-[clamp(24px,3vw,36px)] font-black tracking-[-0.04em] text-[#0F172A]">Professional service detail pages</h2>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => scrollServices(-340)} className="grid h-11 w-11 place-items-center rounded-full border border-[#E5E7EB] bg-white text-slate-700 shadow-sm transition hover:bg-[#F8FAFC]" aria-label="Scroll left"><ChevronLeft size={18} /></button>
              <button onClick={() => scrollServices(340)} className="grid h-11 w-11 place-items-center rounded-full border border-[#E5E7EB] bg-white text-slate-700 shadow-sm transition hover:bg-[#F8FAFC]" aria-label="Scroll right"><ChevronRight size={18} /></button>
            </div>
          </div>

          <div ref={servicesRowRef} className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SERVICES.map(({ icon: Icon, title, desc, href }) => (
              <a key={href} href={href} className="min-w-[280px] max-w-[320px] flex-1 rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,.04)] transition hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(15,23,42,.08)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F6FBEA]"><Icon size={24} className="text-[#0F172A]" /></div>
                <h3 className="mt-6 text-xl font-black tracking-[-.03em] text-[#0F172A]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#0F172A]">View page <ArrowRight size={15} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-8 sm:py-10 lg:py-14">
        <div className="page-inner">
          <div className="mb-7 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0E1418]/55">Shop by style</p>
              <h2 className="mt-2 text-[clamp(24px,3vw,36px)] font-black tracking-[-0.04em] text-[#0F172A]">Popular categories</h2>
            </div>
            <a href="/cars" className="flex items-center gap-1 text-[12px] font-bold text-[#0E1418] hover:text-[#0E1418]/80">View all <ArrowRight size={14} /></a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {cats.length ? cats.map((c, i) => <CatCard key={c.slug} cat={c} index={i} />) : Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton rounded-[24px]" style={{ aspectRatio: '4/3' }} />)}
          </div>
        </div>
      </section>

      <section className="w-full py-10 sm:py-14 lg:py-16">
        <div className="page-inner">
          {cars.length ? <FeaturedSlider cars={cars.slice(0, 8)} /> : <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-[320px] rounded-[24px]" />)}</div>}
        </div>
      </section>

      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="page-inner">
          <div className="mb-8 flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0E1418]/55">How it works</p>
              <h2 className="mt-2 text-[clamp(24px,3vw,36px)] font-black tracking-[-0.04em] text-[#0F172A]">Fast, simple, and secure</h2>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {processSteps.map(({ step, title, text }, i) => (
              <motion.div key={step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.08 }} className="rounded-[28px] border border-[#E7E9E5] bg-[#F8FAFC] p-6 shadow-[0_12px_25px_rgba(15,23,42,0.04)]">
                <div className="flex items-center justify-between"><span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F6FBEA] text-[12px] font-black text-[#0E1418]">{step}</span><Sparkles size={18} className="text-[#B5E92E]" /></div>
                <h3 className="mt-5 text-[22px] font-black text-[#0F172A]">{title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#64748B]">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 sm:py-20 lg:py-24">
        <div className="page-inner">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="relative overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white px-6 py-10 shadow-[0_24px_60px_rgba(15,23,42,.08)] sm:px-8 lg:px-12 lg:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(181,233,46,0.18),transparent_28%)]" />
            <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block"><img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=90" alt="Premium car" className="h-full w-full object-cover opacity-30" /></div>

            <div className="relative z-10 max-w-xl">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#7D9F24]">Sell smarter</p>
              <h2 className="mt-3 text-[clamp(30px,4vw,52px)] font-black leading-[0.95] tracking-[-0.05em] text-[#0B1220]">Ready to sell at the right price?</h2>
              <p className="mt-4 text-[15px] leading-7 text-slate-600">Get a free valuation, enjoy a faster listing flow, and reach buyers who are already looking for cars like yours.</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/valuation" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#0F172A] px-7 text-[13px] font-black text-white transition hover:brightness-110">Get free valuation <ArrowRight size={15} /></a>
                <a href="/sell" className="inline-flex h-12 items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-7 text-[13px] font-black text-slate-700 transition hover:bg-[#F8FAFC]">List my car</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page-inner pb-16 sm:pb-20"><CarDrivingAnimation /></section>

      <TrustBand />
      <TestimonialsSection />
      <NewsSection />
      <FaqSection />
    </div>
  )
}
