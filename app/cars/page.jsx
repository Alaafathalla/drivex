'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, Filter, Heart, LayoutGrid, List,
  Loader2, MapPin, Search, ShieldCheck, SlidersHorizontal, X,
} from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { useLang } from '@/context/LangContext'
import { api, MAKES, BODY_TYPES, FUEL_TYPES, TRANSMISSIONS, CONDITIONS } from '@/lib/api'

/* ── Car card ───────────────────────────── */
function CarCard({ car, view }) {
  const { toggle, isFav } = useFavorites()
  const toast = useToast()
  const fav = isFav(car.slug)

  const heart = e => {
    e.preventDefault()
    toggle(car.slug)
    toast({ message: fav ? 'Removed from wishlist' : `${car.name} added to wishlist`, type: fav ? 'info' : 'fav' })
  }

  if (view === 'list') {
    return (
      <motion.article
        layout initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
        className="group flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
      >
        <a href={`/cars/${car.slug}`} className="relative w-52 shrink-0 overflow-hidden">
          <img src={car.image} alt={car.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-black text-white ${car.condition === 'New' ? 'bg-green-600' : 'bg-amber-500'}`}>
            {car.condition}
          </span>
        </a>
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-black text-gray-900">{car.name}</h2>
                <p className="mt-1 flex items-center gap-1 text-[12px] text-gray-400">
                  <MapPin size={11} /> {car.location} · {car.year} · {car.mileage?.toLocaleString()} km
                </p>
              </div>
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-green-500" />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[car.transmission, car.fuel, car.body].map(tag => (
                <span key={tag} className="rounded-md border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] text-gray-500">{tag}</span>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
            <p className="text-[20px] font-black text-green-600">${car.price?.toLocaleString()}</p>
            <div className="flex gap-2">
              <button onClick={heart} className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 transition hover:border-rose-300 hover:bg-rose-50">
                <Heart size={15} className={fav ? 'fill-rose-500 text-rose-500' : 'text-gray-400'} />
              </button>
              <a href={`/cars/${car.slug}`} className="h-9 rounded-xl bg-green-600 px-4 text-[12px] font-bold text-white flex items-center transition hover:bg-green-500">
                View
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.32 }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
    >
      <a href={`/cars/${car.slug}`} className="relative block overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img src={car.image} alt={car.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[9px] font-black text-white ${car.condition === 'New' ? 'bg-green-600' : 'bg-amber-500'}`}>
          {car.condition}
        </span>
        <button onClick={heart}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition hover:bg-white">
          <motion.span animate={fav ? { scale: [1, 1.4, 1] } : {}}>
            <Heart size={14} className={fav ? 'fill-rose-500 text-rose-500' : 'text-gray-500'} />
          </motion.span>
        </button>
      </a>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="font-black text-gray-900 leading-snug">{car.name}</h2>
            <p className="mt-0.5 text-[11px] text-gray-400">{car.year} · {car.mileage?.toLocaleString()} km · {car.location}</p>
          </div>
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-green-500" />
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {[car.transmission, car.fuel].map(tag => (
            <span key={tag} className="rounded-md border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] text-gray-500">{tag}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
          <p className="font-black text-green-600 text-[18px]">${car.price?.toLocaleString()}</p>
          <a href={`/cars/${car.slug}`} className="text-[11px] font-semibold text-green-600 hover:underline">View →</a>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Filter select ──────────────────────── */
function Sel({ label, options, value, onChange }) {
  return (
    <div className="border-b border-gray-100 py-4">
      <p className="text-[12px] font-bold text-gray-700">{label}</p>
      <div className="relative mt-2">
        <select value={value} onChange={e => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[12px] text-gray-700 outline-none focus:border-green-400 transition">
          <option value="">Any</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  )
}

/* ── Sidebar ────────────────────────────── */
function Sidebar({ filters, setFilter, onReset }) {
  const filterGroups = [
    { label: 'Make',         key: 'make',         opts: MAKES },
    { label: 'Body Type',    key: 'body',         opts: BODY_TYPES },
    { label: 'Fuel Type',    key: 'fuel',         opts: FUEL_TYPES },
    { label: 'Transmission', key: 'transmission', opts: TRANSMISSIONS },
    { label: 'Condition',    key: 'condition',    opts: CONDITIONS },
  ]
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="font-bold text-gray-900">Filters</p>
        <button onClick={onReset} className="text-[11px] font-semibold text-green-600 hover:underline">Reset</button>
      </div>
      {filterGroups.map(({ label, key, opts }) => (
        <Sel key={key} label={label} options={opts} value={filters[key]} onChange={v => setFilter(key, v)} />
      ))}
      <div className="border-b border-gray-100 py-4">
        <p className="text-[12px] font-bold text-gray-700">Price Range</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <input type="number" placeholder="Min $" value={filters.minPrice}
            onChange={e => setFilter('minPrice', e.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-2.5 text-[12px] outline-none focus:border-green-400" />
          <input type="number" placeholder="Max $" value={filters.maxPrice}
            onChange={e => setFilter('maxPrice', e.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-2.5 text-[12px] outline-none focus:border-green-400" />
        </div>
      </div>
    </div>
  )
}

/* ── Main component ─────────────────────── */
function CarsContent() {
  const sp = useSearchParams()
  const { t } = useLang()
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('grid')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [sort, setSort] = useState('newest')
  const [filters, setFilters] = useState({
    make: '', body: '', fuel: '', transmission: '', condition: '',
    minPrice: '', maxPrice: '', q: sp.get('q') || '',
  })

  const sf = (k, v) => setFilters(f => ({ ...f, [k]: v }))
  const reset = () => setFilters({ make: '', body: '', fuel: '', transmission: '', condition: '', minPrice: '', maxPrice: '', q: '' })
  const activeCount = Object.entries(filters).filter(([k, v]) => v && k !== 'q').length

  useEffect(() => {
    setLoading(true)
    api.getCars({ ...filters, sort, type: 'sale' }).then(data => { setCars(data); setLoading(false) })
  }, [filters, sort])

  return (
    <div className="bg-white">
      {/* Page hero */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-[1480px] px-4 py-10 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="text-[11px] font-bold uppercase tracking-widest text-green-600">Marketplace</p>
            <h1 className="mt-1 text-[clamp(28px,4vw,48px)] font-black text-gray-900">Buy Cars</h1>
            <p className="mt-2 text-[14px] text-gray-500">{cars.length} verified vehicles ready for you</p>
          </motion.div>
          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-5 flex max-w-2xl items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
            <Search size={16} className="shrink-0 text-green-500" />
            <input value={filters.q} onChange={e => sf('q', e.target.value)} dir="auto"
              placeholder="Search make, model or keyword…"
              className="flex-1 text-[13px] text-gray-800 outline-none placeholder:text-gray-400" />
            {filters.q && <button onClick={() => sf('q', '')}><X size={14} className="text-gray-400" /></button>}
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-[1480px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex gap-7">
          {/* Sidebar — desktop */}
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="hidden w-[248px] shrink-0 lg:block">
            <div className="sticky top-[88px]">
              <Sidebar filters={filters} setFilter={sf} onReset={reset} />
            </div>
          </motion.aside>

          {/* Grid */}
          <div className="min-w-0 flex-1">
            {/* Toolbar */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button onClick={() => setDrawerOpen(true)}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-[12px] font-semibold text-gray-700 transition hover:border-green-300 hover:text-green-700 lg:hidden">
                  <SlidersHorizontal size={14} /> Filters
                  {activeCount > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[9px] font-black text-white">{activeCount}</span>
                  )}
                </button>
                <p className="text-[13px] text-gray-500">
                  <span className="font-bold text-gray-900">{cars.length}</span> results
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select value={sort} onChange={e => setSort(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-700 outline-none focus:border-green-400">
                  <option value="newest">Newest first</option>
                  <option value="price-asc">Price: Low–High</option>
                  <option value="price-desc">Price: High–Low</option>
                </select>
                <button onClick={() => setView('grid')}
                  className={`grid h-9 w-9 place-items-center rounded-xl border transition ${view === 'grid' ? 'border-green-400 bg-green-50 text-green-700' : 'border-gray-200 text-gray-400'}`}>
                  <LayoutGrid size={15} />
                </button>
                <button onClick={() => setView('list')}
                  className={`grid h-9 w-9 place-items-center rounded-xl border transition ${view === 'list' ? 'border-green-400 bg-green-50 text-green-700' : 'border-gray-200 text-gray-400'}`}>
                  <List size={15} />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-28">
                <Loader2 size={32} className="animate-spin text-green-500" />
              </div>
            ) : cars.length === 0 ? (
              <div className="py-28 text-center">
                <p className="text-[18px] font-bold text-gray-800">No cars found</p>
                <p className="mt-2 text-gray-400">Try adjusting your filters</p>
                <button onClick={reset} className="mt-5 rounded-full bg-green-600 px-6 py-2.5 text-[13px] font-bold text-white hover:bg-green-500">
                  Clear filters
                </button>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div layout className={view === 'grid'
                  ? 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3'
                  : 'flex flex-col gap-4'}>
                  {cars.map(car => <CarCard key={car.id} car={car} view={view} />)}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)} />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 w-[290px] overflow-y-auto bg-white p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-bold text-gray-900">Filters</p>
                <button onClick={() => setDrawerOpen(false)}><X size={19} className="text-gray-500" /></button>
              </div>
              <Sidebar filters={filters} setFilter={sf} onReset={reset} />
              <button onClick={() => setDrawerOpen(false)}
                className="mt-4 w-full rounded-xl bg-green-600 py-3 text-[13px] font-bold text-white hover:bg-green-500">
                Apply
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function CarsPage() {
  return <Suspense><CarsContent /></Suspense>
}
