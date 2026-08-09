'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import {
  ArrowRight, BadgeCheck, CalendarDays, CarFront, ChevronDown,
  Headphones, Heart, MapPin, Search, ShieldCheck, SlidersHorizontal, Tag, UserRound,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from '@/components/motion-section'
import { api } from '@/lib/api'

/* ── Animated counter ── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useMotionValue(0)

  useEffect(() => {
    if (!started) return
    const dur = 1400
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target])

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      className="tabular-nums"
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  )
}

/* ── Car card ── */
function CarCard({ car, index }) {
  const [fav, setFav] = useState(false)
  const isRent = car.type === 'rent'
  const price = isRent ? `$${car.pricePerDay} / day` : `$${car.price?.toLocaleString()}`
  const badge = isRent ? 'FOR RENT' : 'FOR SALE'
  const slug = car.slug
  const href = isRent ? `/rentals/${slug}` : `/cars/${slug}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-[8px] border border-white/10 bg-[#0b0d0c] transition-colors hover:border-[#2ee52b]/40"
    >
      <div className="relative h-[190px] overflow-hidden bg-[#131615]">
        <span className="absolute left-3 top-3 z-10 rounded-[3px] bg-[#2ee52b] px-2 py-[3px] text-[9px] font-black text-black">
          {badge}
        </span>
        <button
          onClick={() => setFav((v) => !v)}
          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
          aria-label="Toggle favorite"
        >
          <motion.span animate={{ scale: fav ? [1, 1.35, 1] : 1 }} transition={{ duration: 0.25 }}>
            <Heart size={16} className={fav ? 'fill-[#2ee52b] text-[#2ee52b]' : ''} />
          </motion.span>
        </button>
        <img
          src={car.image}
          alt={car.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="truncate text-[14px] font-semibold">{car.name}</h3>
        <p className="mt-1 text-[10px] text-white/45">{car.year} · {isRent ? `${car.seats} seats` : `${car.mileage?.toLocaleString()} km`}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-[15px] font-bold text-[#2ee52b]">{price}</p>
          <a href={href} className="text-[11px] font-semibold text-white/50 transition hover:text-[#2ee52b]">
            View →
          </a>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Category card ── */
function CategoryCard({ category, index }) {
  return (
    <motion.a
      href="/cars"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group overflow-hidden rounded-[8px] border border-white/10 bg-[#0b0d0c]"
    >
      <div className="h-[145px] overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-end justify-between p-4">
        <div>
          <h3 className="text-[13px] font-semibold">{category.title}</h3>
          <p className="mt-1 text-[11px] text-white/45">{category.count}+ Cars</p>
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-[4px] bg-[#159219] text-white transition group-hover:bg-[#2ee52b] group-hover:text-black">
          <ArrowRight size={15} />
        </span>
      </div>
    </motion.a>
  )
}

const benefits = [
  { icon: BadgeCheck, title: 'Wide Selection', text: 'Thousands of cars to choose from', dir: 'up' },
  { icon: Tag, title: 'Best Deals', text: 'Competitive prices every day', dir: 'up' },
  { icon: ShieldCheck, title: 'Secure Payments', text: 'Safe and secure transactions', dir: 'up' },
  { icon: Headphones, title: '24/7 Support', text: "We're here to help anytime", dir: 'up' },
]

const stats = [
  { label: 'Cars Available', value: 10000, suffix: '+' },
  { label: 'Happy Customers', value: 5000, suffix: '+' },
  { label: 'Trusted Dealers', value: 50, suffix: '+' },
  { label: 'Cities', value: 12, suffix: '' },
]

export default function HomePage() {
  const [mode, setMode] = useState('buy')
  const [featuredCars, setFeaturedCars] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.getFeaturedCars(), api.getCategories()]).then(([cars, cats]) => {
      setFeaturedCars(cars)
      setCategories(cats)
      setLoading(false)
    })
  }, [])

  const searchHref = mode === 'buy' ? '/cars' : '/rentals'

  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-white/8 pt-[72px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_87%_36%,rgba(20,255,46,.18),transparent_28%),linear-gradient(90deg,#050706_0%,#070908_52%,#071009_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070908] to-transparent" />

        <div className="relative mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-10">
          <div className="grid min-h-[540px] items-center gap-8 py-12 lg:grid-cols-[.82fr_1.18fr] lg:py-5">
            {/* Left text */}
            <div className="relative z-10 max-w-[500px] lg:py-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.06em] text-[#2ee52b]"
              >
                <span>Premium Cars</span>
                <span className="h-[2px] w-12 bg-[#2ee52b]" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(48px,6vw,76px)] font-black leading-[.95] tracking-[-.055em]"
              >
                Find Your<br />Perfect Car
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-5 max-w-[360px] text-[18px] leading-7 text-white/60"
              >
                Buy or rent premium cars at the best prices
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <a
                  href="/cars"
                  className="inline-flex h-12 items-center gap-3 rounded-[5px] bg-[#2ee52b] px-7 text-[13px] font-bold text-black transition hover:bg-[#50f14d]"
                >
                  Buy a Car <ArrowRight size={16} />
                </a>
                <a
                  href="/rentals"
                  className="inline-flex h-12 items-center gap-3 rounded-[5px] border border-white/20 bg-black/20 px-7 text-[13px] font-bold text-white transition hover:border-[#2ee52b] hover:text-[#2ee52b]"
                >
                  Rent a Car <ArrowRight size={16} />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-9 grid max-w-[420px] grid-cols-3 gap-4 text-[9px] text-white/55"
              >
                <div className="flex gap-2"><BadgeCheck className="mt-0.5 shrink-0 text-[#2ee52b]" size={18} /><span><b className="block text-white">Best Prices</b>Guaranteed</span></div>
                <div className="flex gap-2"><ShieldCheck className="mt-0.5 shrink-0 text-[#2ee52b]" size={18} /><span><b className="block text-white">Trusted Dealers</b>Verified</span></div>
                <div className="flex gap-2"><Headphones className="mt-0.5 shrink-0 text-[#2ee52b]" size={18} /><span><b className="block text-white">24/7 Support</b>Available</span></div>
              </motion.div>
            </div>

            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-[360px] self-end lg:min-h-[510px]"
            >
              <div className="absolute inset-y-8 right-0 w-2/3 rounded-full bg-[#0d7f11]/20 blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1800&q=95"
                alt="Premium black sports car"
                className="absolute bottom-0 right-[-8%] h-[94%] w-[112%] object-cover object-center mix-blend-screen [mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#070908_0%,transparent_35%)]" />
            </motion.div>
          </div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 -mt-1 rounded-[8px] border border-white/12 bg-[#0a0c0b]/95 shadow-[0_18px_60px_rgba(0,0,0,.35)]"
          >
            <div className="flex border-b border-white/10">
              {['buy', 'rent'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex h-14 items-center gap-3 border-b-2 px-7 text-[13px] font-semibold transition ${
                    mode === m ? 'border-[#2ee52b] text-white' : 'border-transparent text-white/55 hover:text-white'
                  }`}
                >
                  {m === 'buy' ? <CarFront size={18} className={mode === 'buy' ? 'text-[#2ee52b]' : ''} /> : <CalendarDays size={17} className={mode === 'rent' ? 'text-[#2ee52b]' : ''} />}
                  {m === 'buy' ? 'Buy Cars' : 'Rent Cars'}
                </button>
              ))}
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_.95fr]">
              {['All Makes', 'All Models', 'Min Price', 'Max Price', 'Year'].map((label) => (
                <button
                  key={label}
                  className="flex h-12 items-center justify-between rounded-[5px] border border-white/12 bg-white/[.035] px-4 text-[12px] text-white/45 transition hover:border-white/25 hover:bg-white/[.06]"
                >
                  <span>{label}</span>
                  <ChevronDown size={14} />
                </button>
              ))}
              <button className="flex h-10 items-center gap-2 text-[12px] font-semibold text-white/80 hover:text-[#2ee52b] sm:col-span-1">
                <SlidersHorizontal size={15} />More Filters
              </button>
              <a
                href={searchHref}
                className="flex h-12 items-center justify-center gap-3 rounded-[4px] bg-[#2ee52b] text-[12px] font-bold text-black transition hover:bg-[#50f14d] sm:col-start-2 lg:col-start-5"
              >
                <span>Search Cars</span>
                <Search size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="mx-auto max-w-[1450px] px-5 py-10 sm:px-8 lg:px-10">
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }, i) => (
            <StaggerItem key={title}>
              <motion.div
                whileHover={{ y: -3, borderColor: 'rgba(46,229,43,0.4)' }}
                className="flex min-h-[112px] items-center gap-5 rounded-[7px] border border-white/10 bg-[#0a0c0b] px-7 transition"
              >
                <Icon size={30} strokeWidth={1.7} className="shrink-0 text-[#2ee52b]" />
                <div>
                  <h3 className="text-[13px] font-semibold">{title}</h3>
                  <p className="mt-1 max-w-[150px] text-[11px] leading-5 text-white/50">{text}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="mx-auto max-w-[1450px] px-5 py-5 sm:px-8 lg:px-10">
        <FadeIn direction="left">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[22px] font-bold">Browse by Category</h2>
            <a href="/cars" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#2ee52b]">
              View All <ArrowRight size={15} />
            </a>
          </div>
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat, i) => <CategoryCard key={cat.title} category={cat} index={i} />)}
          {!categories.length && Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-[210px] rounded-[8px]" />
          ))}
        </div>
      </section>

      {/* ── FEATURED CARS ── */}
      <section className="mx-auto max-w-[1450px] px-5 py-10 sm:px-8 lg:px-10">
        <FadeIn direction="right">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[22px] font-bold">Featured Cars</h2>
            <a href="/cars" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#2ee52b]">
              View All <ArrowRight size={15} />
            </a>
          </div>
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {featuredCars.map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
          {!featuredCars.length && Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-[280px] rounded-[8px]" />
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="mx-auto max-w-[1450px] px-5 py-8 sm:px-8 lg:px-10">
        <ScaleIn>
          <div className="grid grid-cols-2 gap-px bg-white/8 rounded-[8px] overflow-hidden lg:grid-cols-4">
            {stats.map(({ label, value, suffix }) => (
              <div key={label} className="flex flex-col items-center justify-center gap-1 bg-[#0a0c0b] py-10">
                <p className="text-[36px] font-black text-[#2ee52b]">
                  <Counter target={value} suffix={suffix} />
                </p>
                <p className="text-[11px] text-white/50">{label}</p>
              </div>
            ))}
          </div>
        </ScaleIn>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="mx-auto max-w-[1450px] px-5 pb-14 pt-4 sm:px-8 lg:px-10">
        <FadeIn direction="up">
          <div className="relative overflow-hidden rounded-[8px] border border-[#2ee52b]/25 bg-[linear-gradient(100deg,#07130a_0%,#0b2810_48%,#063a0a_100%)] px-7 py-10 lg:px-10 lg:py-14">
            <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
              <img
                src="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=90"
                alt="Sports car"
                className="h-full w-full object-cover opacity-55 [mask-image:linear-gradient(to_left,black_68%,transparent)]"
              />
            </div>
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.05em] text-[#2ee52b]">
                  Experience the difference <span className="h-[2px] w-12 bg-[#2ee52b]" />
                </p>
                <h2 className="mt-5 max-w-[420px] text-[30px] font-bold leading-tight">
                  Premium Cars, Premium Experience
                </h2>
                <p className="mt-3 max-w-[430px] text-[12px] leading-6 text-white/55">
                  Whether you want to buy your dream car or rent the perfect ride, we make it simple and secure.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="/cars"
                    className="inline-flex h-11 items-center gap-3 rounded-[4px] bg-[#2ee52b] px-6 text-[12px] font-bold text-black transition hover:bg-[#50f14d]"
                  >
                    Explore Cars <ArrowRight size={15} />
                  </a>
                  <a
                    href="/sell"
                    className="inline-flex h-11 items-center gap-3 rounded-[4px] border border-white/20 px-6 text-[12px] font-bold text-white transition hover:border-[#2ee52b] hover:text-[#2ee52b]"
                  >
                    Sell Your Car
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <SiteFooter />
    </main>
  )
}
