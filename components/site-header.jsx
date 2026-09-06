'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  CarFront,
  ChevronDown,
  GitCompare,
  Heart,
  Menu,
  Search,
  Sparkles,
  UserRound,
  Wrench,
  X,
} from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { useFavorites } from '@/context/FavoritesContext'
import { LanguageToggle } from '@/components/language-toggle'
import { CurrencySwitcher } from '@/components/currency-switcher'
import { ScrollProgress } from '@/components/scroll-progress'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { carService } from '@/services/carService'

const NAV = [
  { key: 'nav_home', href: '/' },
  { key: 'nav_buy', href: '/cars', mega: 'market' },
  { key: 'nav_rent', href: '/rentals' },
  { key: 'nav_services', href: '/services', mega: 'services' },
  { key: 'nav_categories', href: '/categories', mega: 'categories' },
  { key: 'nav_contact', href: '/contact' },
]

const BRAND_LINKS = [
  ['BMW', '/brands/bmw'],
  ['Mercedes-Benz', '/brands/mercedes-benz'],
  ['Audi', '/brands/audi'],
  ['Porsche', '/brands/porsche'],
  ['Tesla', '/brands/tesla'],
  ['Toyota', '/brands/toyota'],
]

function MegaMenu({ type, onClose }) {
  const { t, isRTL } = useLang()

  const marketLinks = [
    [t('mega_new_used'), '/cars', t('mega_new_used_desc')],
    [t('mega_electric'), '/categories/electric', t('mega_electric_desc')],
    [t('mega_luxury'), '/categories/luxury', t('mega_luxury_desc')],
    [t('mega_compare'), '/compare', t('mega_compare_desc')],
    [t('mega_finance'), '/calculator', t('mega_finance_desc')],
    [t('mega_sell'), '/list-your-car', t('mega_sell_desc')],
  ]

  const serviceLinks = [
    [t('svc_inspection'), '/services/inspection', t('services_insp_desc')],
    [t('svc_maintenance'), '/services/maintenance', t('svc_maintenance_desc')],
    [t('svc_inspection'), '/services/wash', t('svc_inspection_desc')],
    [t('services_tuning'), '/services/tuning', t('services_tuning_desc')],
    [t('services_delivery'), '/services/delivery', t('services_deliv_desc')],
    [t('svc_roadside'), '/services/roadside', t('svc_roadside_desc')],
    [t('svc_airport'), '/services/airport', t('svc_airport_desc')],
    [t('services_wedding'), '/services/wedding', t('services_wedding_desc')],
    [t('svc_accessories'), '/accessories', t('svc_accessories_desc')],
  ]

  const categoryLinks = [
    { label: t('cat_suv'),       href: '/categories/suv',       img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=300&q=80', count: '340+' },
    { label: t('cat_sedan'),     href: '/categories/sedan',     img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=300&q=80', count: '210+' },
    { label: t('cat_electric'),  href: '/categories/electric',  img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=300&q=80', count: '95+' },
    { label: t('cat_sports'),    href: '/categories/sports',    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=80', count: '78+' },
    { label: t('cat_luxury'),    href: '/categories/luxury',    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=300&q=80', count: '130+' },
    { label: t('cat_7seater'),   href: '/categories/7-seater',  img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=300&q=80', count: '60+' },
  ]

  const items = type === 'market' ? marketLinks : type === 'services' ? serviceLinks : categoryLinks

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.18 }}
      className="absolute left-1/2 top-[62px] w-[min(860px,calc(100vw-48px))] -translate-x-1/2 overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white p-3 shadow-[0_28px_80px_rgba(15,23,42,.12)]"
    >
      {type === 'categories' ? (
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-[24px] bg-[#F8FAFC] p-3">
            <p className="px-3 pb-2 pt-2 text-[10px] font-black uppercase tracking-[.18em] text-slate-400">{t('mega_body_styles')}</p>
            <div className="grid grid-cols-3 gap-2">
              {categoryLinks.map(({ label, href, img, count }) => (
                <a key={href} href={href} onClick={onClose}
                  className="group relative overflow-hidden rounded-2xl border border-transparent transition hover:border-[#B5E92E]"
                  style={{ aspectRatio: '4/3' }}>
                  <img src={img} alt={label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/80 via-[#0b1220]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2.5">
                    <p className="text-[12px] font-black text-white leading-tight">{label}</p>
                    <p className="text-[10px] text-white/60">{count} {t('mega_cars_count_suffix')}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-[24px] bg-[#F8FAFC] p-3">
            <p className="px-3 pb-2 pt-2 text-[10px] font-black uppercase tracking-[.18em] text-slate-400">{t('mega_popular_brands')}</p>
            <div className="grid grid-cols-2 gap-1">
              {BRAND_LINKS.map(([title, href]) => (
                <a key={href} href={href} onClick={onClose} className="group flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-bold text-slate-800 transition hover:bg-white">
                  <span>{title}</span>
                  <ArrowRight size={12} className={`text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#7f9f1b] ${isRTL ? 'rotate-180' : ''}`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-2 md:grid-cols-2">
          {items.map(([title, href, description]) => (
            <a key={href} href={href} onClick={onClose} className="group rounded-[22px] border border-transparent bg-white p-4 transition hover:border-[#E5E7EB] hover:bg-[#F8FAFC]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-black text-slate-900">{title}</span>
                <ArrowRight size={14} className={`text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#7f9f1b] ${isRTL ? 'rotate-180' : ''}`} />
              </div>
              {description && <p className="mt-2 text-xs leading-5 text-slate-500">{description}</p>}
            </a>
          ))}
        </div>
      )}

      <div className="mt-3 flex flex-col items-start justify-between gap-4 rounded-[24px] border border-[#E5E7EB] bg-[#F8FAFC] px-5 py-4 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[.18em] text-[#7f9f1b]">{t('mega_concierge')}</p>
          <p className="mt-1 text-sm text-slate-500">{t('mega_concierge_desc')}</p>
        </div>
        <a href="/contact" className="rounded-full bg-[#0F172A] px-4 py-2 text-xs font-black text-white">{t('mega_get_help')}</a>
      </div>
    </motion.div>
  )
}

export function SiteHeader() {
  const { t, isRTL } = useLang()
  const { count } = useFavorites()
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mega, setMega] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [q, setQ] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [searching, setSearching] = useState(false)
  const debouncedQ = useDebouncedValue(q, 220)
  const inputRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setDrawerOpen(false)
    setSearchOpen(false)
    setMega(null)
  }, [pathname])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setDrawerOpen(false)
        setSearchOpen(false)
        setMega(null)
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 40)
  }, [searchOpen])

  useEffect(() => {
    let ignore = false
    if (debouncedQ.trim().length < 2) {
      setSuggestions([])
      return
    }
    setSearching(true)
    carService.search(debouncedQ)
      .then((items) => { if (!ignore) setSuggestions(items) })
      .catch(() => { if (!ignore) setSuggestions([]) })
      .finally(() => { if (!ignore) setSearching(false) })
    return () => { ignore = true }
  }, [debouncedQ])

  const active = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href))
  const searchHref = useMemo(() => `/cars?q=${encodeURIComponent(q.trim())}`, [q])

  return (
    <>
      <ScrollProgress />
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 h-[82px] transition ${scrolled ? 'bg-white/96 shadow-[0_10px_35px_rgba(15,23,42,.08)] backdrop-blur-2xl' : 'bg-white/88 backdrop-blur-xl'}`}
      >
        <div className="page-inner relative flex h-full items-center gap-4">
          <a href="/" className="flex shrink-0 items-center gap-3" aria-label="DriveX home">
            <span className="grid size-11 place-items-center rounded-2xl bg-[#0F172A] text-[#B5E92E] shadow-sm"><CarFront size={19} /></span>
            <div>
              <span className="block text-[22px] font-black italic tracking-[-.055em] text-[#0F172A]">Drive<span className="text-[#8FB91F]">X</span></span>
              <span className="block text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Premium automotive marketplace</span>
            </div>
          </a>

          <nav className="relative mx-auto hidden items-center rounded-full border border-[#E5E7EB] bg-white/90 p-1 xl:flex" onMouseLeave={() => setMega(null)}>
            {NAV.map((item) => (
              <div key={item.href} className="relative" onMouseEnter={() => item.mega && setMega(item.mega)}>
                <a
                  href={item.href}
                  className={`flex items-center gap-1 rounded-full px-4 py-2.5 text-[11px] font-black uppercase tracking-[.12em] transition ${active(item.href) ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-600 hover:bg-[#F8FAFC] hover:text-slate-950'}`}
                >
                  {t(item.key)} {item.mega && <ChevronDown size={12} />}
                </a>
              </div>
            ))}
            <AnimatePresence>{mega && <MegaMenu type={mega} onClose={() => setMega(null)} />}</AnimatePresence>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            <button onClick={() => setSearchOpen(true)} className="group hidden h-11 items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-4 text-xs font-bold text-slate-500 transition hover:border-slate-300 md:flex">
              <Search size={15} />
              <span className="hidden lg:inline">{t('nav_search_ph')}</span>
              <kbd className="ml-1 rounded-full border border-white bg-white px-2 py-0.5 text-[9px] text-slate-400">⌘K</kbd>
            </button>
            <button onClick={() => setSearchOpen(true)} className="grid size-10 place-items-center rounded-full border border-[#E5E7EB] text-slate-500 md:hidden"><Search size={17} /></button>

            <a href="/favorites" className="relative grid size-10 place-items-center rounded-full border border-[#E5E7EB] text-slate-500 transition hover:bg-[#F8FAFC]" aria-label={t('nav_favorites')}>
              <Heart size={17} />
              {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-[#B5E92E] px-1 text-[9px] font-black text-[#0E1418]">{count > 9 ? '9+' : count}</span>}
            </a>
            <a href="/compare" className="hidden size-10 place-items-center rounded-full border border-[#E5E7EB] text-slate-500 transition hover:bg-[#F8FAFC] sm:grid" aria-label={t('nav_compare')}><GitCompare size={17} /></a>
            <div className="hidden lg:block"><CurrencySwitcher compact /></div>
            <div className="hidden sm:block"><LanguageToggle /></div>
            <a href="/dashboard" className="hidden size-10 place-items-center rounded-full border border-[#E5E7EB] text-slate-500 transition hover:bg-[#F8FAFC] lg:grid" aria-label={t('nav_dashboard')}><UserRound size={17} /></a>
            <a href="/list-your-car" className="ml-1 hidden h-11 items-center gap-2 rounded-full bg-[#B5E92E] px-5 text-xs font-black text-[#0E1418] shadow-[0_10px_24px_rgba(181,233,46,.28)] transition hover:-translate-y-0.5 hover:brightness-105 md:flex"><Sparkles size={14} />{t('nav_list_car')}</a>
            <button onClick={() => setDrawerOpen((value) => !value)} className="grid size-10 place-items-center rounded-full border border-[#E5E7EB] text-slate-700 xl:hidden">{drawerOpen ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.button aria-label="Close navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerOpen(false)} className="fixed inset-0 z-40 bg-[#0f172a]/30 backdrop-blur-sm xl:hidden" />
            <motion.aside
              initial={{ x: isRTL ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '100%' : '-100%' }}
              transition={{ type: 'spring', stiffness: 290, damping: 31 }}
              className={`fixed top-0 z-[55] h-dvh w-[min(360px,90vw)] overflow-y-auto bg-white p-5 shadow-2xl ${isRTL ? 'right-0' : 'left-0'}`}
            >
              <div className="flex items-center justify-between"><span className="text-xl font-black italic text-slate-900">Drive<span className="text-[#8fb91f]">X</span></span><button onClick={() => setDrawerOpen(false)} className="grid size-9 place-items-center rounded-full bg-slate-100"><X size={18} /></button></div>
              <nav className="mt-7 space-y-1">
                {NAV.map((item, index) => (
                  <motion.a key={item.href} href={item.href} initial={{ opacity: 0, x: isRTL ? 16 : -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.035 }} className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-black ${active(item.href) ? 'bg-[#B5E92E] text-[#0E1418]' : 'text-slate-700 hover:bg-slate-50'}`}>
                    {t(item.key)}
                    <ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} />
                  </motion.a>
                ))}
              </nav>
              <div className="mt-6 grid grid-cols-2 gap-2">
                <a href="/compare" className="rounded-2xl border border-slate-200 p-4 text-xs font-black text-slate-800"><GitCompare size={18} className="mb-3" />{t('nav_compare')}</a>
                <a href="/services" className="rounded-2xl border border-slate-200 p-4 text-xs font-black text-slate-800"><Wrench size={18} className="mb-3" />{t('nav_services')}</a>
              </div>
              <div className="mt-5 flex items-center gap-2"><CurrencySwitcher /><LanguageToggle /></div>
              <a href="/list-your-car" className="mt-5 flex h-12 items-center justify-center rounded-2xl bg-[#B5E92E] text-sm font-black text-[#0E1418]">{t('nav_list_car')}</a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-[#0f172a]/20 p-4 pt-[92px] backdrop-blur-lg" onMouseDown={(event) => event.target === event.currentTarget && setSearchOpen(false)}>
            <motion.div initial={{ y: -16, opacity: 0, scale: 0.985 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -10, opacity: 0 }} className="mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white shadow-[0_35px_100px_rgba(15,23,42,.18)]">
              <form action="/cars" className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                <Search size={19} className="text-[#8fb91f]" />
                <input ref={inputRef} name="q" value={q} onChange={(event) => setQ(event.target.value)} placeholder={t('nav_search_ph')} autoComplete="off" className="min-w-0 flex-1 bg-transparent text-base font-semibold text-slate-950 outline-none placeholder:font-normal placeholder:text-slate-400" />
                {q && <button type="button" onClick={() => setQ('')} className="text-slate-400"><X size={16} /></button>}
                <button type="button" onClick={() => setSearchOpen(false)} className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-400">ESC</button>
              </form>
              <div className="p-3">
                <div className="flex items-center justify-between px-2 py-2"><p className="text-[10px] font-black uppercase tracking-[.18em] text-slate-400">{q.length >= 2 ? t('search_suggestions') : t('search_popular')}</p>{searching && <span className="text-[10px] text-slate-400">{t('search_searching')}</span>}</div>
                {q.length >= 2 ? (
                  <div className="space-y-1">
                    {suggestions.length ? suggestions.map((item) => (
                      <a key={item.id} href={`/cars/${item.id}`} className="flex items-center gap-3 rounded-2xl p-2.5 transition hover:bg-slate-50">
                        <img src={item.image} alt="" className="h-12 w-20 rounded-xl object-cover" />
                        <div className="min-w-0 flex-1"><p className="truncate text-sm font-black text-slate-950">{item.label}</p><p className="text-xs text-slate-400">{item.meta}</p></div>
                        <ArrowRight size={15} className={`text-slate-300 ${isRTL ? 'rotate-180' : ''}`} />
                      </a>
                    )) : !searching && <p className="px-3 py-8 text-center text-sm text-slate-400">{t('car_not_found')}</p>}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 px-2 pb-3">
                    {['BMW X5', 'Electric SUV', 'Mercedes', 'Dubai rentals'].map((item) => (
                      <button key={item} type="button" onClick={() => setQ(item)} className="rounded-full border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600">{item}</button>
                    ))}
                  </div>
                )}
                {q.trim() && <a href={searchHref} className="mt-2 flex items-center justify-between rounded-2xl bg-[#0F172A] px-4 py-3 text-sm font-black text-white"><span>{t('search_btn')}: “{q.trim()}”</span><ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} /></a>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
