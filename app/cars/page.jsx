'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown, Filter, GitCompare, Heart, LayoutGrid, List,
  Loader2, MapPin, Search, ShieldCheck, SlidersHorizontal, X,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-section'
import { api, BODY_TYPES, CONDITIONS, FUEL_TYPES, MAKES, TRANSMISSIONS } from '@/lib/api'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function FilterSelect({ label, options, value, onChange }) {
  return (
    <div className="border-b border-white/8 py-4">
      <p className="text-[12px] font-bold text-white">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full rounded-[4px] border border-white/10 bg-[#0f1210] px-3 py-2.5 text-[12px] text-white/70 outline-none focus:border-[#2ee52b]"
      >
        <option value="">Any</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}

function CarCard({ car, view }) {
  const [fav, setFav] = useState(false)
  const [compare, setCompare] = useState(false)

  if (view === 'list') {
    return (
      <motion.article
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.35 }}
        className="group flex gap-0 overflow-hidden rounded-[7px] border border-white/10 bg-[#0b0d0c] transition hover:border-[#2ee52b]/40"
      >
        <div className="relative w-[220px] shrink-0 overflow-hidden">
          <img src={car.image} alt={car.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute left-3 top-3 rounded-[3px] bg-[#2ee52b] px-2 py-[3px] text-[9px] font-black text-black">
            {car.condition}
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-bold">{car.name}</h2>
                <p className="mt-1 flex items-center gap-2 text-[12px] text-white/50">
                  <MapPin size={12} /> {car.location} · {car.year} · {car.mileage?.toLocaleString()} km
                </p>
              </div>
              <ShieldCheck className="shrink-0 text-[#2ee52b]" size={18} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[car.transmission, car.fuel, car.body].map((t) => (
                <span key={t} className="rounded-[3px] border border-white/10 px-2 py-1 text-[10px] text-white/55">{t}</span>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
            <p className="text-[18px] font-black text-[#2ee52b]">${car.price?.toLocaleString()}</p>
            <a href={`/cars/${car.slug}`} className="rounded-[4px] bg-[#2ee52b] px-4 py-2 text-[11px] font-bold text-black transition hover:bg-[#50f14d]">
              View Details
            </a>
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-[7px] border border-white/10 bg-[#0b0d0c] transition hover:border-[#2ee52b]/40"
    >
      <div className="relative aspect-[1.35] overflow-hidden">
        <span className="absolute left-3 top-3 z-10 rounded-[3px] bg-[#2ee52b] px-2 py-[3px] text-[9px] font-black text-black">
          {car.condition}
        </span>
        <div className="absolute right-3 top-3 z-10 flex gap-1.5">
          <button
            onClick={() => setFav((v) => !v)}
            className="grid h-8 w-8 place-items-center rounded-full bg-black/30 backdrop-blur-sm transition hover:bg-black/60"
          >
            <Heart size={14} className={fav ? 'fill-[#2ee52b] text-[#2ee52b]' : 'text-white'} />
          </button>
          <button
            onClick={() => setCompare((v) => !v)}
            className={`grid h-8 w-8 place-items-center rounded-full backdrop-blur-sm transition ${compare ? 'bg-[#2ee52b] text-black' : 'bg-black/30 text-white hover:bg-black/60'}`}
          >
            <GitCompare size={14} />
          </button>
        </div>
        <img src={car.image} alt={car.name} className="h-full w-full object-cover transition duration-600 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="font-bold leading-tight">{car.name}</h2>
            <p className="mt-1 text-[11px] text-white/50">{car.year} · {car.mileage?.toLocaleString()} km · {car.location}</p>
          </div>
          <ShieldCheck className="mt-0.5 shrink-0 text-[#2ee52b]" size={16} />
        </div>
        <div className="mt-3 flex gap-2">
          {[car.transmission, car.fuel].map((t) => (
            <span key={t} className="rounded-[3px] border border-white/10 px-2 py-0.5 text-[9px] text-white/50">{t}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3">
          <p className="text-[16px] font-black text-[#2ee52b]">${car.price?.toLocaleString()}</p>
          <a href={`/cars/${car.slug}`} className="text-[11px] font-semibold text-white/50 transition hover:text-[#2ee52b]">
            View →
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function CarsContent() {
  const searchParams = useSearchParams()
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('grid')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [sort, setSort] = useState('newest')
  const [filters, setFilters] = useState({
    make: '', body: '', fuel: '', transmission: '', condition: '',
    minPrice: '', maxPrice: '', q: searchParams.get('q') || '',
  })

  const setFilter = (key, val) => setFilters((f) => ({ ...f, [key]: val }))

  useEffect(() => {
    setLoading(true)
    api.getCars({ ...filters, sort, type: 'sale' }).then((data) => {
      setCars(data)
      setLoading(false)
    })
  }, [filters, sort])

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />

      {/* Page hero */}
      <section className="relative overflow-hidden border-b border-white/8 pt-[72px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(46,229,43,.1),transparent_50%)]" />
        <div className="relative mx-auto max-w-[1450px] px-5 py-12 sm:px-8 lg:px-10">
          <FadeIn direction="left">
            <p className="text-[11px] font-bold uppercase tracking-[.1em] text-[#2ee52b]">Marketplace</p>
            <h1 className="mt-2 text-[clamp(36px,5vw,64px)] font-black leading-[.95] tracking-[-.05em]">
              Buy Cars
            </h1>
            <p className="mt-3 max-w-lg text-[14px] text-white/55">
              {cars.length} verified vehicles ready for you
            </p>
          </FadeIn>
          {/* Search bar */}
          <FadeIn direction="up" delay={0.1}>
            <div className="mt-6 flex max-w-2xl items-center gap-3 rounded-[6px] border border-white/15 bg-white/5 px-4 py-3">
              <Search size={17} className="shrink-0 text-[#2ee52b]" />
              <input
                value={filters.q}
                onChange={(e) => setFilter('q', e.target.value)}
                placeholder="Search make, model or keyword…"
                className="flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-white/35"
              />
              {filters.q && (
                <button onClick={() => setFilter('q', '')} className="text-white/40 hover:text-white">
                  <X size={15} />
                </button>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-[1450px] px-5 py-10 sm:px-8 lg:px-10">
        <div className="flex gap-8">
          {/* Sidebar filters — desktop */}
          <FadeIn direction="left" className="hidden w-[240px] shrink-0 lg:block">
            <aside className="sticky top-24">
              <div className="rounded-[7px] border border-white/10 bg-[#0b0d0c] p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-[13px] font-bold">Filters</h2>
                  <button
                    onClick={() => setFilters({ make: '', body: '', fuel: '', transmission: '', condition: '', minPrice: '', maxPrice: '', q: '' })}
                    className="text-[11px] font-semibold text-[#2ee52b] hover:underline"
                  >
                    Reset all
                  </button>
                </div>
                <FilterSelect label="Make" options={MAKES} value={filters.make} onChange={(v) => setFilter('make', v)} />
                <FilterSelect label="Body Type" options={BODY_TYPES} value={filters.body} onChange={(v) => setFilter('body', v)} />
                <FilterSelect label="Fuel Type" options={FUEL_TYPES} value={filters.fuel} onChange={(v) => setFilter('fuel', v)} />
                <FilterSelect label="Transmission" options={TRANSMISSIONS} value={filters.transmission} onChange={(v) => setFilter('transmission', v)} />
                <FilterSelect label="Condition" options={CONDITIONS} value={filters.condition} onChange={(v) => setFilter('condition', v)} />
                <div className="border-b border-white/8 py-4">
                  <p className="text-[12px] font-bold text-white">Price Range</p>
                  <div className="mt-3 flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilter('minPrice', e.target.value)}
                      className="w-full rounded-[4px] border border-white/10 bg-[#0f1210] px-3 py-2 text-[12px] text-white outline-none focus:border-[#2ee52b]"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilter('maxPrice', e.target.value)}
                      className="w-full rounded-[4px] border border-white/10 bg-[#0f1210] px-3 py-2 text-[12px] text-white outline-none focus:border-[#2ee52b]"
                    />
                  </div>
                </div>
              </div>
            </aside>
          </FadeIn>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="flex items-center gap-2 rounded-[5px] border border-white/12 px-4 py-2.5 text-[12px] font-semibold transition hover:border-white/25 lg:hidden"
                >
                  <SlidersHorizontal size={14} />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#2ee52b] text-[9px] font-black text-black">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <p className="text-[13px] text-white/60">
                  <span className="font-bold text-white">{cars.length}</span> vehicles found
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-[5px] border border-white/12 bg-transparent px-3 py-2.5 text-[12px] text-white outline-none"
                >
                  <option value="newest">Newest first</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <button
                  onClick={() => setView('grid')}
                  className={`grid h-9 w-9 place-items-center rounded-[4px] border ${view === 'grid' ? 'border-[#2ee52b] bg-[#2ee52b]/10 text-[#2ee52b]' : 'border-white/12 text-white/50'}`}
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`grid h-9 w-9 place-items-center rounded-[4px] border ${view === 'list' ? 'border-[#2ee52b] bg-[#2ee52b]/10 text-[#2ee52b]' : 'border-white/12 text-white/50'}`}
                >
                  <List size={15} />
                </button>
              </div>
            </div>

            {/* Car grid/list */}
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="animate-spin text-[#2ee52b]" size={32} />
              </div>
            ) : cars.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-[18px] font-bold">No cars found</p>
                <p className="mt-2 text-white/50">Try adjusting your filters</p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  className={view === 'grid'
                    ? 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3'
                    : 'flex flex-col gap-4'}
                >
                  {cars.map((car) => (
                    <CarCard key={car.id} car={car} view={view} />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-[300px] overflow-y-auto bg-[#0b0d0c] p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="font-bold">Filters</h2>
                <button onClick={() => setDrawerOpen(false)}><X size={20} /></button>
              </div>
              <FilterSelect label="Make" options={MAKES} value={filters.make} onChange={(v) => setFilter('make', v)} />
              <FilterSelect label="Body Type" options={BODY_TYPES} value={filters.body} onChange={(v) => setFilter('body', v)} />
              <FilterSelect label="Fuel Type" options={FUEL_TYPES} value={filters.fuel} onChange={(v) => setFilter('fuel', v)} />
              <FilterSelect label="Transmission" options={TRANSMISSIONS} value={filters.transmission} onChange={(v) => setFilter('transmission', v)} />
              <FilterSelect label="Condition" options={CONDITIONS} value={filters.condition} onChange={(v) => setFilter('condition', v)} />
              <div className="mt-4">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-full rounded-[5px] bg-[#2ee52b] py-3 text-[13px] font-bold text-black"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SiteFooter />
    </main>
  )
}

export default function CarsPage() {
  return (
    <Suspense>
      <CarsContent />
    </Suspense>
  )
}
