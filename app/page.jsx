'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, BadgeCheck, CalendarDays, CarFront, ChevronDown,
  Headphones, Heart, Search, ShieldCheck, SlidersHorizontal, Tag,
} from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { api } from '@/lib/api'

/* ── Animated counter ── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (!started) return
    const dur = 1400, start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target])
  return (
    <motion.span onViewportEnter={() => setStarted(true)} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </motion.span>
  )
}

/* ── Car card ── */
function CarCard({ car, index, t }) {
  const [fav, setFav] = useState(false)
  const isRent = car.type === 'rent'
  const price = isRent ? `$${car.pricePerDay} ${t('card_day')}` : `$${car.price?.toLocaleString()}`
  const href  = isRent ? `/rentals/${car.slug}` : `/cars/${car.slug}`
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
        <span className="absolute start-3 top-3 z-10 rounded-[3px] bg-[#2ee52b] px-2 py-[3px] text-[9px] font-black text-black">
          {isRent ? t('card_for_rent') : t('card_for_sale')}
        </span>
        <button
          onClick={() => setFav(v => !v)}
          className="absolute end-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/30 backdrop-blur-sm transition hover:bg-black/50 cursor-pointer"
        >
          <motion.span animate={{ scale: fav ? [1, 1.35, 1] : 1 }} transition={{ duration: 0.25 }}>
            <Heart size={16} className={fav ? 'fill-[#2ee52b] text-[#2ee52b]' : 'text-white'} />
          </motion.span>
        </button>
        <img src={car.image} alt={car.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <h3 className="truncate text-[14px] font-semibold">{car.name}</h3>
        <p className="mt-1 text-[10px] text-white/45">
          {car.year} · {isRent ? `${car.seats} ${t('card_seats')}` : `${car.mileage?.toLocaleString()} ${t('card_km')}`}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-[15px] font-bold text-[#2ee52b]">{price}</p>
          <a href={href} className="text-[11px] font-semibold text-white/50 transition hover:text-[#2ee52b] cursor-pointer">
            {t('card_view')}
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
      className="group overflow-hidden rounded-[8px] border border-white/10 bg-[#0b0d0c] cursor-pointer"
    >
      <div className="h-[145px] overflow-hidden">
        <img src={category.image} alt={category.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
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

export default function HomePage() {
  const { t, lang } = useLang()
  const [mode, setMode] = useState('buy')
  const [featuredCars, setFeaturedCars] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    Promise.all([api.getFeaturedCars(), api.getCategories()]).then(([cars, cats]) => {
      setFeaturedCars(cars)
      setCategories(cats)
    })
  }, [])

  const benefits = [
    { icon: BadgeCheck, titleKey: 'benefit_selection_title', textKey: 'benefit_selection_text' },
    { icon: Tag,        titleKey: 'benefit_deals_title',     textKey: 'benefit_deals_text' },
    { icon: ShieldCheck,titleKey: 'benefit_secure_title',    textKey: 'benefit_secure_text' },
    { icon: Headphones, titleKey: 'benefit_support_title',   textKey: 'benefit_support_text' },
  ]

  const stats = [
    { labelKey: 'stat_cars',      value: 10000, suffix: '+' },
    { labelKey: 'stat_customers', value: 5000,  suffix: '+' },
    { labelKey: 'stat_dealers',   value: 50,    suffix: '+' },
    { labelKey: 'stat_cities',    value: 12,    suffix: '' },
  ]

  const searchHref = mode === 'buy' ? '/cars' : '/rentals'

  return (
    <main className="min-h-screen bg-[#070908] text-white">
{/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_87%_36%,rgba(20,255,46,.18),transparent_28%),linear-gradient(90deg,#050706_0%,#070908_52%,#071009_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070908] to-transparent" />

        <div className="relative mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-10">
          <div className="grid min-h-[540px] items-center gap-8 py-12 lg:grid-cols-[.82fr_1.18fr] lg:py-5">

            {/* Text side */}
            <div className="relative z-10 max-w-[500px] lg:py-10">
              <motion.div
                initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.06em] text-[#2ee52b]"
              >
                <span>{t('hero_eyebrow')}</span>
                <span className="h-[2px] w-12 bg-[#2ee52b]" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(48px,6vw,76px)] font-black leading-[.95] tracking-[-.055em]"
              >
                {t('hero_h1_1')}<br />{t('hero_h1_2')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-5 max-w-[360px] text-[18px] leading-7 text-white/60"
              >
                {t('hero_sub')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <a href="/cars" className="inline-flex h-12 items-center gap-3 rounded-[5px] bg-[#2ee52b] px-7 text-[13px] font-bold text-black transition hover:bg-[#50f14d] cursor-pointer">
                  {t('hero_buy_btn')} <ArrowRight size={16} />
                </a>
                <a href="/rentals" className="inline-flex h-12 items-center gap-3 rounded-[5px] border border-white/20 bg-black/20 px-7 text-[13px] font-bold text-white transition hover:border-[#2ee52b] hover:text-[#2ee52b] cursor-pointer">
                  {t('hero_rent_btn')} <ArrowRight size={16} />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-9 grid max-w-[420px] grid-cols-3 gap-4 text-[9px] text-white/55"
              >
                {[
                  [BadgeCheck, 'hero_badge1', 'hero_badge1_sub'],
                  [ShieldCheck,'hero_badge2', 'hero_badge2_sub'],
                  [Headphones, 'hero_badge3', 'hero_badge3_sub'],
                ].map(([Icon, titleKey, subKey]) => (
                  <div key={titleKey} className="flex gap-2">
                    <Icon className="mt-0.5 shrink-0 text-[#2ee52b]" size={18} />
                    <span><b className="block text-white">{t(titleKey)}</b>{t(subKey)}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: lang === 'ar' ? -60 : 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-[360px] self-end lg:min-h-[510px]"
            >
              <div className="absolute inset-y-8 end-0 w-2/3 rounded-full bg-[#0d7f11]/20 blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1800&q=95"
                alt="Premium sports car"
                className="absolute bottom-0 end-[-8%] h-[94%] w-[112%] object-cover object-center mix-blend-screen [mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)]"
              />
            </motion.div>
          </div>

          {/* ── Search bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 -mt-1 rounded-[8px] border border-white/12 bg-[#0a0c0b]/95 shadow-[0_18px_60px_rgba(0,0,0,.35)]"
          >
            <div className="flex border-b border-white/10">
              {[['buy', CarFront, 'search_buy'], ['rent', CalendarDays, 'search_rent']].map(([m, Icon, labelKey]) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex h-14 items-center gap-3 border-b-2 px-7 text-[13px] font-semibold transition cursor-pointer ${
                    mode === m ? 'border-[#2ee52b] text-white' : 'border-transparent text-white/55 hover:text-white'
                  }`}
                >
                  <Icon size={17} className={mode === m ? 'text-[#2ee52b]' : ''} />
                  {t(labelKey)}
                </button>
              ))}
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_.95fr]">
              {['search_all_makes','search_all_models','search_min_price','search_max_price','search_year'].map((key) => (
                <button key={key} className="flex h-12 items-center justify-between rounded-[5px] border border-white/12 bg-white/[.035] px-4 text-[12px] text-white/45 transition hover:border-white/25 hover:bg-white/[.06] cursor-pointer">
                  <span>{t(key)}</span>
                  <ChevronDown size={14} />
                </button>
              ))}
              <button className="flex h-10 items-center gap-2 text-[12px] font-semibold text-white/80 hover:text-[#2ee52b] sm:col-span-1 cursor-pointer">
                <SlidersHorizontal size={15} />{t('search_more')}
              </button>
              <a href={searchHref} className="flex h-12 items-center justify-center gap-3 rounded-[4px] bg-[#2ee52b] text-[12px] font-bold text-black transition hover:bg-[#50f14d] sm:col-start-2 lg:col-start-5 cursor-pointer">
                {t('search_btn')} <Search size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="mx-auto max-w-[1450px] px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, titleKey, textKey }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="flex min-h-[112px] items-center gap-5 rounded-[7px] border border-white/10 bg-[#0a0c0b] px-7 transition hover:border-[#2ee52b]/40"
            >
              <Icon size={30} strokeWidth={1.7} className="shrink-0 text-[#2ee52b]" />
              <div>
                <h3 className="text-[13px] font-semibold">{t(titleKey)}</h3>
                <p className="mt-1 max-w-[150px] text-[11px] leading-5 text-white/50">{t(textKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="mx-auto max-w-[1450px] px-5 py-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center justify-between"
        >
          <h2 className="text-[22px] font-bold">{t('section_categories')}</h2>
          <a href="/cars" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#2ee52b] cursor-pointer">
            {t('section_view_all')} <ArrowRight size={15} />
          </a>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.length
            ? categories.map((cat, i) => <CategoryCard key={cat.title} category={cat} index={i} />)
            : Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-[210px] animate-pulse rounded-[8px] bg-white/5" />)
          }
        </div>
      </section>

      {/* ── FEATURED CARS ── */}
      <section className="mx-auto max-w-[1450px] px-5 py-10 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center justify-between"
        >
          <h2 className="text-[22px] font-bold">{t('section_featured')}</h2>
          <a href="/cars" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#2ee52b] cursor-pointer">
            {t('section_view_all')} <ArrowRight size={15} />
          </a>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {featuredCars.length
            ? featuredCars.map((car, i) => <CarCard key={car.id} car={car} index={i} t={t} />)
            : Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-[280px] animate-pulse rounded-[8px] bg-white/5" />)
          }
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="mx-auto max-w-[1450px] px-5 py-8 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-[8px] bg-white/8 lg:grid-cols-4"
        >
          {stats.map(({ labelKey, value, suffix }) => (
            <div key={labelKey} className="flex flex-col items-center justify-center gap-1 bg-[#0a0c0b] py-10">
              <p className="text-[36px] font-black text-[#2ee52b]">
                <Counter target={value} suffix={suffix} />
              </p>
              <p className="text-[11px] text-white/50">{t(labelKey)}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="mx-auto max-w-[1450px] px-5 pb-14 pt-4 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[8px] border border-[#2ee52b]/25 bg-[linear-gradient(100deg,#07130a_0%,#0b2810_48%,#063a0a_100%)] px-7 py-10 lg:px-10 lg:py-14"
        >
          <div className="absolute inset-y-0 end-0 hidden w-[42%] lg:block">
            <img
              src="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=90"
              alt="Sports car"
              className="h-full w-full object-cover opacity-55 [mask-image:linear-gradient(to_left,black_68%,transparent)]"
            />
          </div>
          <div className="relative z-10">
            <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.05em] text-[#2ee52b]">
              {t('cta_eyebrow')} <span className="h-[2px] w-12 bg-[#2ee52b]" />
            </p>
            <h2 className="mt-5 max-w-[420px] text-[30px] font-bold leading-tight">{t('cta_title')}</h2>
            <p className="mt-3 max-w-[430px] text-[12px] leading-6 text-white/55">{t('cta_text')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/cars" className="inline-flex h-11 items-center gap-3 rounded-[4px] bg-[#2ee52b] px-6 text-[12px] font-bold text-black transition hover:bg-[#50f14d] cursor-pointer">
                {t('cta_explore')} <ArrowRight size={15} />
              </a>
              <a href="/sell" className="inline-flex h-11 items-center gap-3 rounded-[4px] border border-white/20 px-6 text-[12px] font-bold text-white transition hover:border-[#2ee52b] hover:text-[#2ee52b] cursor-pointer">
                {t('cta_sell')}
              </a>
            </div>
          </div>
        </motion.div>
      </section></main>
  )
}
