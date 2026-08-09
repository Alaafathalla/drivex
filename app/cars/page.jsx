'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Heart, Search, ShieldCheck, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { useLang } from '@/context/LangContext'
import { api, MAKES, BODY_TYPES, FUEL_TYPES, TRANSMISSIONS, CONDITIONS } from '@/lib/api'

function CarCard({ car, index, t }) {
  const [fav, setFav] = useState(false)
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.38, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-[7px] border border-border bg-card transition hover:border-[#2ee52b]/50"
    >
      <a href={`/cars/${car.slug}`} className="relative block aspect-[1.28] overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={car.image}
          alt={car.name}
        />
        <span className="absolute start-4 top-4 rounded-[3px] bg-[#2ee52b] px-2.5 py-1 text-[9px] font-black text-black uppercase tracking-[.1em]">
          {t('buy_verified')}
        </span>
        <button
          onClick={(e) => { e.preventDefault(); setFav(v => !v) }}
          className="absolute end-4 top-4 grid h-9 w-9 place-items-center bg-black/60 backdrop-blur-sm transition hover:bg-black/80 cursor-pointer"
        >
          <Heart size={16} className={fav ? 'fill-[#2ee52b] text-[#2ee52b]' : 'text-white'} />
        </button>
      </a>
      <div className="p-5">
        <div className="flex justify-between gap-3">
          <div>
            <h2 className="font-black tracking-[-.02em]">{car.name}</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              {car.year} · {car.transmission} · {car.mileage?.toLocaleString()} {t('card_km')}
            </p>
          </div>
          <ShieldCheck className="shrink-0 text-accent" size={18} />
        </div>
        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-[9px] uppercase tracking-[.13em] text-muted-foreground">{t('buy_from')}</p>
            <b className="text-lg">${car.price?.toLocaleString()}</b>
          </div>
          <a className="cursor-pointer text-xs font-black text-accent hover:underline" href={`/cars/${car.slug}`}>
            {t('buy_view_details')}
          </a>
        </div>
      </div>
    </motion.article>
  )
}

const SORT_OPTIONS = [
  { key: 'buy_newest',    value: 'newest' },
  { key: 'buy_price_asc', value: 'price-asc' },
  { key: 'buy_price_desc',value: 'price-desc' },
]

export default function CarsPage() {
  const { t } = useLang()
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ condition: '', make: '', body: '', fuel: '', transmission: '', sort: 'newest' })
  const [drawerOpen, setDrawerOpen] = useState(false)

  const setFilter = (key, val) => setFilters(f => ({ ...f, [key]: val }))

  useEffect(() => {
    setLoading(true)
    api.getCars(filters).then(data => { setCars(data); setLoading(false) })
  }, [filters])

  const filterGroups = [
    { key: 'filter_condition', fKey: 'condition', options: CONDITIONS },
    { key: 'filter_make',      fKey: 'make',      options: MAKES },
    { key: 'filter_body',      fKey: 'body',      options: BODY_TYPES },
    { key: 'filter_trans',     fKey: 'transmission', options: TRANSMISSIONS },
    { key: 'filter_fuel',      fKey: 'fuel',      options: FUEL_TYPES },
  ]

  const Sidebar = () => (
    <div className="sticky top-24 rounded-[7px] border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-black">{t('buy_refine')}</h2>
        <button onClick={() => setFilters(f => ({ ...f, condition:'', make:'', body:'', fuel:'', transmission:'' }))}
          className="cursor-pointer text-xs font-bold text-accent hover:underline">
          {t('buy_reset')}
        </button>
      </div>
      {filterGroups.map(({ key, fKey, options }) => (
        <div key={fKey} className="border-b border-border py-4">
          <p className="text-sm font-bold">{t(key)}</p>
          <div className="mt-3 relative">
            <select
              value={filters[fKey]}
              onChange={e => setFilter(fKey, e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-[5px] border border-border bg-background px-3 py-2.5 text-xs text-muted-foreground focus:border-accent focus:outline-none"
            >
              <option value="">{t('filter_any')}</option>
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#070908] pt-[72px] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(46,229,43,.12),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1450px] px-5 py-14 sm:px-8 lg:px-10">
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
            className="text-[10px] font-black uppercase tracking-[.2em] text-accent">
            {t('buy_eyebrow')}
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }}
            className="mt-3 text-[clamp(32px,5vw,64px)] font-black leading-[.92] tracking-[-.05em]">
            {t('buy_title')}
          </motion.h1>
          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
            className="mt-4 max-w-xl text-[15px] leading-7 text-white/55">
            {t('buy_desc')}
          </motion.p>
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45, delay:0.3 }}
            className="mt-7 flex max-w-lg items-center gap-3 rounded-[6px] border border-white/15 bg-white/5 p-2">
            <div className="flex flex-1 items-center gap-3 px-3">
              <Search size={16} className="shrink-0 text-accent" />
              <input
                placeholder={t('nav_search_ph')}
                onChange={e => setFilter('q', e.target.value)}
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                dir="auto"
              />
            </div>
            <button className="cursor-pointer rounded-[4px] bg-accent px-5 py-3 text-xs font-black text-black transition hover:bg-[#50f14d]">
              {t('search_label')}
            </button>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-5 py-12 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[270px_1fr]">

          {/* Sidebar desktop */}
          <aside className="hidden lg:block"><Sidebar /></aside>

          {/* Grid */}
          <div>
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold">{cars.length} {t('buy_vehicles')}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t('buy_updated')}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setDrawerOpen(true)}
                  className="flex cursor-pointer items-center gap-2 rounded-[5px] border border-border px-4 py-2.5 text-xs font-bold transition hover:border-accent lg:hidden">
                  <Filter size={14} /> {t('buy_refine')}
                </button>
                <div className="relative">
                  <select
                    value={filters.sort}
                    onChange={e => setFilter('sort', e.target.value)}
                    className="cursor-pointer appearance-none rounded-[5px] border border-border bg-background pe-8 ps-4 py-2.5 text-xs font-bold focus:border-accent focus:outline-none"
                  >
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{t(o.key)}</option>)}
                  </select>
                  <ChevronDown size={12} className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({length:6}).map((_,i) => <div key={i} className="h-[340px] animate-pulse rounded-[7px] bg-white/5" />)}
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {cars.map((car, i) => <CarCard key={car.id} car={car} index={i} t={t} />)}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}>
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type:'spring', stiffness:300, damping:30 }}
              onClick={e => e.stopPropagation()}
              className="absolute inset-y-0 start-0 w-[300px] overflow-y-auto bg-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-black">{t('buy_refine')}</h2>
                <button onClick={() => setDrawerOpen(false)} className="cursor-pointer text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>
              <Sidebar />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </main>
  )
}
