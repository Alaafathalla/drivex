'use client'

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Grid2X2, List, Loader2, Search, SlidersHorizontal, X } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { CarCard } from '@/features/cars/components/CarCard'
import { CarFilters } from '@/features/cars/components/CarFilters'
import { carService } from '@/services/carService'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useCurrency } from '@/context/CurrencyContext'
import { useLang } from '@/context/LangContext'
import { FaqSection, TrustBand } from '@/components/platform/rich-sections'

const EMPTY = { brand:'',bodyType:'',fuelType:'',transmission:'',city:'',seats:'',minYear:'',maxYear:'',minPrice:'',maxPrice:'',minMileage:'',maxMileage:'',available:undefined }

function CarListRow({ car, index }) {
  const { format } = useCurrency()
  const { t } = useLang()
  return (
    <motion.a
      href={`/cars/${car.id}`}
      initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay: index * 0.035 }}
      className="grid gap-4 rounded-[22px] border border-[#e2e6de] bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-lg sm:grid-cols-[230px_1fr_auto] sm:items-center"
    >
      <img src={car.images?.[0]} alt={`${car.brand} ${car.model}`} className="aspect-[1.65] w-full rounded-2xl object-cover" />
      <div className="min-w-0 px-1">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#eef4df] px-2 py-1 text-[9px] font-black uppercase text-[#657f1b]">
            {car.listingType === 'rent' ? t('cars_for_rent') : car.condition || t('cars_for_sale')}
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-[9px] font-black uppercase text-slate-500">{car.bodyType}</span>
        </div>
        <h3 className="mt-3 text-xl font-black tracking-[-.03em] text-[#0f172a]">{car.brand} {car.model}</h3>
        <p className="mt-2 text-xs text-[#64748b]">{car.year} · {car.city} · {car.transmission} · {car.fuelType} · {Number(car.mileage||0).toLocaleString()} {t('km_unit')}</p>
        <p className="mt-3 line-clamp-1 text-xs leading-6 text-[#94a3b8]">{car.description}</p>
      </div>
      <div className="min-w-[150px] p-2 text-left sm:text-right">
        <p className="text-[10px] uppercase tracking-[.1em] text-[#94a3b8]">
          {car.listingType === 'rent' ? t('cars_from_day') : t('cars_price')}
        </p>
        <p className="mt-1 text-xl font-black text-[#0f172a]">{format(car.price)}</p>
        <span className="mt-4 inline-flex rounded-full bg-[#0e1418] px-4 py-2 text-[10px] font-black text-white">{t('cars_view_details')}</span>
      </div>
    </motion.a>
  )
}

function CarsContent() {
  const sp = useSearchParams()
  const { t, isRTL } = useLang()

  const SORT_OPTIONS = [
    ['newest',     t('cars_sort_newest')],
    ['price-asc',  t('cars_sort_price_asc')],
    ['price-desc', t('cars_sort_price_desc')],
    ['rating',     t('cars_sort_rating')],
    ['oldest',     t('cars_sort_oldest')],
  ]

  const [tab,   setTab]   = useState(sp.get('listingType') || sp.get('type') || 'all')
  const [sort,  setSort]  = useState(sp.get('sort') || 'newest')
  const [q,     setQ]     = useState(sp.get('q') || '')
  const [filters, setFilters] = useState(() => ({
    ...EMPTY,
    brand:        sp.get('brand')        || '',
    bodyType:     sp.get('bodyType')     || sp.get('body') || '',
    fuelType:     sp.get('fuelType')     || '',
    transmission: sp.get('transmission') || '',
    city:         sp.get('city')         || '',
    seats:        sp.get('seats')        || '',
    minYear:      sp.get('minYear')      || '',
    maxYear:      sp.get('maxYear')      || '',
    minPrice:     sp.get('minPrice')     || '',
    maxPrice:     sp.get('maxPrice')     || '',
    minMileage:   sp.get('minMileage')   || '',
    maxMileage:   sp.get('maxMileage')   || '',
    available:    sp.get('available') === 'true' ? true : sp.get('available') === 'false' ? false : undefined,
  }))
  const [page,        setPage]        = useState(1)
  const [drawer,      setDrawer]      = useState(false)
  const [view,        setView]        = useState('grid')
  const [data,        setData]        = useState({ items:[], total:0, pages:1 })
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [meta,        setMeta]        = useState(null)
  const debounced  = useDebouncedValue(q, 220)
  const tokenRef   = useRef(null)

  const load = useCallback(async () => {
    const token = {}
    tokenRef.current = token
    setLoading(true); setError(null)
    try {
      const res = await carService.getCars({ ...filters, listingType: tab === 'all' ? undefined : tab, q: q || undefined, sort, page, limit: 9 })
      if (token === tokenRef.current) setData(res)
    } catch (e) {
      if (token === tokenRef.current) setError(e.message || 'Failed to load cars.')
    } finally {
      if (token === tokenRef.current) setLoading(false)
    }
  }, [filters, tab, q, sort, page])

  useEffect(() => { setPage(1) }, [filters, tab, q, sort])
  useEffect(() => { let a = true; carService.getMeta().then(v => a && setMeta(v)).catch(() => {}); return () => { a = false } }, [])
  useEffect(() => { load() }, [load])
  useEffect(() => {
    let a = true
    if (debounced.trim().length < 2) { setSuggestions([]); return }
    carService.search(debounced).then(items => a && setSuggestions(items)).catch(() => a && setSuggestions([]))
    return () => { a = false }
  }, [debounced])

  const activeCount = Object.entries(filters).filter(([, v]) => v !== '' && v !== undefined).length

  const heroTitle = tab === 'rent' ? t('cars_title_rent') : tab === 'sale' ? t('cars_title_sale') : t('cars_title_all')

  return (
    <main className="min-h-screen bg-[#F5F6F3]">
      <PageHero
        eyebrow={t('cars_eyebrow')}
        title={heroTitle}
        description={t('cars_desc')}
        image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2200&q=86"
      >
        <div className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur">
          {[['all', t('cars_tab_all')], ['sale', t('cars_tab_sale')], ['rent', t('cars_tab_rent')]].map(([value, label]) => (
            <button key={value} onClick={() => setTab(value)}
              className={`rounded-full px-4 py-2 text-xs font-black transition ${tab === value ? 'bg-[#B5E92E] text-[#071016]' : 'text-white/60 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>
      </PageHero>

      {/* Sticky toolbar */}
      <section className="sticky top-[72px] z-30 border-b border-[#e2e6de] bg-[#F5F6F3]/92 backdrop-blur-xl">
        <div className="page-inner flex flex-wrap items-center gap-3 py-4">
          {/* Search */}
          <div className="relative min-w-[240px] flex-1 max-w-xl">
            <div className="flex h-11 items-center gap-2 rounded-2xl border border-[#dfe5db] bg-white px-4 shadow-sm">
              <Search size={15} className="text-[#94a3b8]" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder={t('cars_search_ph')}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none" dir="auto" />
              {q && <button onClick={() => setQ('')}><X size={14} /></button>}
            </div>
            {q.length >= 2 && suggestions.length > 0 && (
              <div className="absolute inset-x-0 top-[50px] overflow-hidden rounded-2xl border border-[#dfe5db] bg-white p-2 shadow-xl">
                {suggestions.map(item => (
                  <a key={item.id} href={`/cars/${item.id}`} className="flex items-center gap-3 rounded-xl p-2 hover:bg-[#f6f8f3]">
                    <img src={item.image} alt="" className="h-10 w-16 rounded-lg object-cover" />
                    <div><p className="text-xs font-black text-[#0f172a]">{item.label}</p><p className="text-[10px] text-[#94a3b8]">{item.meta}</p></div>
                  </a>
                ))}
              </div>
            )}
          </div>
          {/* Sort */}
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="h-11 rounded-2xl border border-[#dfe5db] bg-white px-4 text-xs font-bold outline-none">
            {SORT_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          {/* View toggle */}
          <div className="flex h-11 rounded-2xl border border-[#dfe5db] bg-white p-1">
            <button onClick={() => setView('grid')} className={`grid w-9 place-items-center rounded-xl ${view === 'grid' ? 'bg-[#0e1418] text-white' : 'text-[#94a3b8]'}`}><Grid2X2 size={15} /></button>
            <button onClick={() => setView('list')} className={`grid w-9 place-items-center rounded-xl ${view === 'list' ? 'bg-[#0e1418] text-white' : 'text-[#94a3b8]'}`}><List size={15} /></button>
          </div>
          {/* Mobile filter btn */}
          <button onClick={() => setDrawer(true)}
            className="flex h-11 items-center gap-2 rounded-2xl border border-[#dfe5db] bg-white px-4 text-xs font-black lg:hidden">
            <SlidersHorizontal size={14} />
            {t('cars_filters_btn')}
            {activeCount > 0 && <span className="grid size-5 place-items-center rounded-full bg-[#B5E92E] text-[9px] text-[#071016]">{activeCount}</span>}
          </button>
          <p className="ml-auto hidden text-xs text-[#64748b] md:block">
            {loading ? t('cars_searching') : <><b className="text-[#0f172a]">{data.total}</b> {t('cars_found')}</>}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="page-inner py-8">
        <div className="flex gap-7">
          {/* Desktop sidebar */}
          <aside className="hidden w-[270px] shrink-0 lg:block">
            <div className="sticky top-[146px] rounded-[22px] border border-[#dfe5db] bg-white p-5 shadow-sm">
              <CarFilters meta={meta || undefined} filters={{ ...filters, listingType: tab }}
                onChange={f => setFilters({ ...EMPTY, ...f, listingType: undefined })}
                onReset={() => setFilters({ ...EMPTY })} />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {error ? (
              <div className="rounded-[24px] border border-red-100 bg-white py-20 text-center">
                <p className="font-black text-red-500">{error}</p>
                <button onClick={load} className="mt-4 rounded-full bg-[#0e1418] px-5 py-2 text-xs font-black text-white">{t('cars_try_again')}</button>
              </div>
            ) : loading ? (
              <div className={view === 'grid' ? 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-4'}>
                {Array.from({ length: 9 }).map((_, i) => <div key={i} className="skeleton h-[330px] rounded-[22px]" />)}
              </div>
            ) : data.items.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-[#cfd7c9] bg-white py-20 text-center">
                <div className="text-4xl">🚗</div>
                <p className="mt-4 font-black text-[#0f172a]">{t('cars_no_results')}</p>
                <button onClick={() => { setFilters({ ...EMPTY }); setQ('') }}
                  className="mt-4 rounded-full bg-[#B5E92E] px-5 py-2.5 text-xs font-black text-[#071016]">
                  {t('cars_clear_filters')}
                </button>
              </div>
            ) : (
              <>
                {view === 'grid' ? (
                  <AnimatePresence mode="popLayout">
                    <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {data.items.map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="space-y-4">
                    {data.items.map((car, i) => <CarListRow key={car.id} car={car} index={i} />)}
                  </div>
                )}
                {data.pages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                      className="grid size-10 place-items-center rounded-full border border-[#dfe5db] bg-white disabled:opacity-30">
                      <ChevronLeft size={16} className={isRTL ? 'rotate-180' : ''} />
                    </button>
                    {Array.from({ length: data.pages }, (_, i) => i + 1).map(n => (
                      <button key={n} onClick={() => setPage(n)}
                        className={`grid size-10 place-items-center rounded-full text-xs font-black ${n === page ? 'bg-[#0e1418] text-white' : 'border border-[#dfe5db] bg-white text-[#64748b]'}`}>
                        {n}
                      </button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(data.pages, p + 1))} disabled={page === data.pages}
                      className="grid size-10 place-items-center rounded-full border border-[#dfe5db] bg-white disabled:opacity-30">
                      <ChevronRight size={16} className={isRTL ? 'rotate-180' : ''} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <TrustBand />
      <FaqSection items={[
        [t('faq_q1'), t('faq_a1')],
        [t('faq_q2'), t('faq_a2')],
        [t('faq_q3'), t('faq_a3')],
        [t('faq_q4'), t('faq_a4')],
      ]} />

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.button initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setDrawer(false)} className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm" />
            <motion.aside
              initial={{ x: isRTL ? '100%' : '-100%' }} animate={{ x: 0 }} exit={{ x: isRTL ? '100%' : '-100%' }}
              transition={{ type:'spring', stiffness:300, damping:32 }}
              className={`fixed inset-y-0 z-[60] w-[min(340px,90vw)] overflow-y-auto bg-white p-5 ${isRTL ? 'right-0' : 'left-0'}`}>
              <div className="mb-5 flex items-center justify-between">
                <p className="font-black">{t('filter_title')}</p>
                <button onClick={() => setDrawer(false)}><X size={18} /></button>
              </div>
              <CarFilters meta={meta || undefined} filters={{ ...filters, listingType: tab }}
                onChange={f => setFilters({ ...EMPTY, ...f, listingType: undefined })}
                onReset={() => setFilters({ ...EMPTY })} />
              <button onClick={() => setDrawer(false)}
                className="mt-5 h-11 w-full rounded-full bg-[#0e1418] text-xs font-black text-white">
                {t('cars_show_results')}
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center"><Loader2 className="animate-spin text-[#7d9f24]" /></div>}>
      <CarsContent />
    </Suspense>
  )
}
