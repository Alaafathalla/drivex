'use client'

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, Loader2,
  Search, SlidersHorizontal, X,
} from 'lucide-react'
import { CarCard } from '@/features/cars/components/CarCard'
import { CarFilters } from '@/features/cars/components/CarFilters'
import { carService } from '@/services/carService'

const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest first' },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating',     label: 'Top rated' },
  { value: 'oldest',     label: 'Oldest first' },
]

const EMPTY = { brand: '', bodyType: '', fuelType: '', transmission: '', city: '', seats: '', minYear: '', maxYear: '', minPrice: '', maxPrice: '', available: undefined }

function CarsContent() {
  const sp     = useSearchParams()
  const router = useRouter()

  const [tab,     setTab]     = useState(sp.get('type') || 'all')
  const [sort,    setSort]    = useState('newest')
  const [q,       setQ]       = useState(sp.get('q') || '')
  const [filters, setFilters] = useState({ ...EMPTY })
  const [page,    setPage]    = useState(1)
  const [drawer,  setDrawer]  = useState(false)

  const [data,    setData]    = useState({ items: [], total: 0, pages: 1 })
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const abortRef = useRef(null)

  const load = useCallback(async () => {
    if (abortRef.current) abortRef.current = false
    const token = {}; abortRef.current = token
    setLoading(true); setError(null)
    try {
      const res = await carService.getCars({
        ...filters,
        listingType: tab === 'all' ? undefined : tab,
        q: q || undefined, sort, page, limit: 9,
      })
      if (token !== abortRef.current) return
      setData(res)
    } catch (e) {
      setError(e.message || 'Failed to load cars.')
    } finally {
      setLoading(false)
    }
  }, [filters, tab, q, sort, page])

  useEffect(() => { setPage(1) }, [filters, tab, q, sort])
  useEffect(() => { load() }, [load])

  const activeFiltersCount = Object.entries(filters).filter(([, v]) => v !== '' && v !== undefined).length

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* ── Hero / toolbar ─────────────────────── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-12">

          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>
            <p className="text-[11px] font-bold uppercase tracking-widest text-green-600">Marketplace</p>
            <h1 className="mt-1 text-[clamp(26px,3.5vw,42px)] font-black text-gray-900">
              {tab === 'rent' ? 'Cars for Rent' : tab === 'sale' ? 'Cars for Sale' : 'All Cars'}
            </h1>
          </motion.div>

          {/* Tabs */}
          <div className="mt-5 flex items-center gap-1 rounded-2xl border border-gray-200 bg-gray-50 p-1 w-fit">
            {[['all','All'],['rent','For Rent'],['sale','For Sale']].map(([val,label]) => (
              <button key={val} onClick={() => setTab(val)}
                className={`rounded-xl px-4 py-2 text-[13px] font-bold transition ${
                  tab === val ? 'bg-white shadow text-green-700 border border-gray-200' : 'text-gray-500 hover:text-gray-800'
                }`}>
                {label}
              </button>
            ))}
          </div>

          {/* Search + Sort row */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex h-11 flex-1 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 shadow-sm min-w-[220px] max-w-md">
              <Search size={16} className="shrink-0 text-gray-400" />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && load()}
                placeholder="Search brand, model, city…"
                className="flex-1 text-[13px] outline-none placeholder:text-gray-400 bg-transparent"
              />
              {q && <button onClick={() => setQ('')}><X size={14} className="text-gray-400 hover:text-gray-700" /></button>}
            </div>

            <select value={sort} onChange={e => setSort(e.target.value)}
              className="h-11 rounded-2xl border border-gray-200 bg-white px-4 text-[13px] text-gray-700 shadow-sm outline-none focus:border-green-400">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            <button onClick={() => setDrawer(true)}
              className="flex h-11 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-[13px] font-semibold text-gray-700 shadow-sm transition hover:border-green-400 lg:hidden">
              <SlidersHorizontal size={15} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-green-600 px-1.5 text-[10px] font-black text-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <p className="ml-auto text-[13px] text-gray-400">
              {loading ? 'Loading…' : <><span className="font-bold text-gray-900">{data.total}</span> cars found</>}
            </p>
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────── */}
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex gap-7">

          {/* Sidebar — desktop */}
          <aside className="hidden w-[260px] shrink-0 lg:block">
            <div className="sticky top-[84px] rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <CarFilters
                filters={{ ...filters, listingType: tab }}
                onChange={f => setFilters({ ...EMPTY, ...f, listingType: undefined })}
                onReset={() => setFilters({ ...EMPTY })}
              />
            </div>
          </aside>

          {/* Grid */}
          <div className="min-w-0 flex-1">
            {error ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-[18px] font-bold text-red-500">Something went wrong</p>
                <p className="mt-2 text-gray-400">{error}</p>
                <button onClick={load} className="mt-5 rounded-full bg-green-600 px-6 py-2.5 text-[13px] font-bold text-white hover:bg-green-500 transition">
                  Try again
                </button>
              </div>
            ) : loading ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="skeleton h-[340px] rounded-2xl" />
                ))}
              </div>
            ) : data.items.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-5xl">🚗</div>
                <p className="mt-4 text-[18px] font-bold text-gray-800">No cars found</p>
                <p className="mt-1 text-gray-400">Try adjusting your filters or search</p>
                <button onClick={() => { setFilters({ ...EMPTY }); setQ('') }}
                  className="mt-5 rounded-full bg-green-600 px-6 py-2.5 text-[13px] font-bold text-white hover:bg-green-500 transition">
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <>
                <AnimatePresence mode="popLayout">
                  <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {data.items.map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                {data.pages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-green-400 hover:text-green-600 disabled:opacity-40">
                      <ChevronLeft size={17} />
                    </button>
                    {Array.from({ length: data.pages }, (_, i) => i + 1).map(n => (
                      <button key={n} onClick={() => setPage(n)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-bold transition ${
                          n === page ? 'bg-green-600 text-white' : 'border border-gray-200 text-gray-600 hover:border-green-400'
                        }`}>
                        {n}
                      </button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(data.pages, p + 1))} disabled={page === data.pages}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-green-400 hover:text-green-600 disabled:opacity-40">
                      <ChevronRight size={17} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setDrawer(false)} />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 left-0 z-50 w-[300px] overflow-y-auto bg-white shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-4">
                <p className="font-bold text-gray-900">Filters</p>
                <button onClick={() => setDrawer(false)}><X size={20} className="text-gray-400" /></button>
              </div>
              <div className="p-5">
                <CarFilters
                  filters={{ ...filters, listingType: tab }}
                  onChange={f => setFilters({ ...EMPTY, ...f, listingType: undefined })}
                  onReset={() => setFilters({ ...EMPTY })}
                />
                <button onClick={() => setDrawer(false)}
                  className="mt-5 w-full rounded-2xl bg-green-600 py-3 text-[13px] font-bold text-white hover:bg-green-500 transition">
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function CarsPage() {
  return <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Loader2 className="animate-spin text-green-500" size={32} /></div>}><CarsContent /></Suspense>
}
