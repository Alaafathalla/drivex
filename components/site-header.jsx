'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, GitCompare, Heart, Menu, Search, UserRound, X } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { useFavorites } from '@/context/FavoritesContext'
import { LanguageToggle } from '@/components/language-toggle'
import { ScrollProgress } from '@/components/scroll-progress'

const NAV = [
  { key: 'nav_home',    href: '/' },
  { key: 'nav_buy',     href: '/cars' },
  { key: 'nav_rent',    href: '/rentals' },
  { key: 'nav_sell',    href: '/sell' },
  { key: 'nav_dealers', href: '/dealers' },
  { key: 'nav_about',   href: '/about' },
  { key: 'nav_contact', href: '/contact' },
]

export function SiteHeader() {
  const { t, isRTL } = useLang()
  const { count } = useFavorites()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [q, setQ] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false); setSearchOpen(false) }, [pathname])
  useEffect(() => { if (searchOpen) setTimeout(() => ref.current?.focus(), 60) }, [searchOpen])
  useEffect(() => {
    const fn = e => {
      if (e.key === 'Escape') { setOpen(false); setSearchOpen(false) }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true) }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  const active = href => href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <ScrollProgress />

      <motion.header
        initial={{ y: -68, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [.22, 1, .36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 h-[68px] w-full border-b transition-all duration-300 ${
          scrolled
            ? 'border-gray-200 bg-white/95 shadow-sm backdrop-blur-md'
            : 'border-gray-100 bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="flex h-full w-full items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12">

          {/* Logo */}
          <a href="/" className="flex shrink-0 items-center gap-1.5 select-none" aria-label="DriveX">
            <span className="flex items-center text-[22px] font-black italic tracking-tight text-gray-900">
              Drive<span className="text-green-600">X</span>
            </span>
            <span className="hidden rounded-full bg-green-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-green-700 sm:inline">
              Beta
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map(item => (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                  active(item.href)
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {t(item.key)}
                {active(item.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-green-50"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            >
              <Search size={17} />
            </button>

            {/* Favorites badge */}
            <a href="/favorites" className="relative grid h-9 w-9 place-items-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900">
              <Heart size={17} className={count > 0 ? 'fill-rose-500 text-rose-500' : ''} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                    className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-[3px] text-[9px] font-black text-white"
                  >
                    {count > 9 ? '9+' : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </a>

            {/* Compare */}
            <a href="/compare" className="grid h-9 w-9 place-items-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900">
              <GitCompare size={17} />
            </a>

            {/* Account */}
            <a href="/profile" className="grid h-9 w-9 place-items-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900">
              <UserRound size={17} />
            </a>

            {/* Language toggle */}
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>

            {/* CTA */}
            <a
              href="/login"
              className="ml-1 hidden h-9 items-center rounded-full border border-green-200 bg-green-50 px-5 text-[12px] font-bold text-green-700 transition hover:bg-green-600 hover:text-white sm:flex"
            >
              {t('nav_signin')}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(v => !v)}
              className="grid h-9 w-9 place-items-center rounded-full text-gray-500 transition hover:bg-gray-100 lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'm'}
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [.22, 1, .36, 1] }}
              className="overflow-hidden border-t border-gray-100 bg-white lg:hidden"
            >
              <nav className="px-4 py-3">
                {NAV.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ x: isRTL ? 16 : -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    className={`flex items-center justify-between border-b border-gray-50 py-3.5 text-[14px] font-semibold last:border-0 ${
                      active(item.href) ? 'text-green-700' : 'text-gray-700'
                    }`}
                  >
                    {t(item.key)}
                    <ArrowRight size={14} className={`text-gray-300 ${isRTL ? 'rotate-180' : ''}`} />
                  </motion.a>
                ))}
                <div className="flex items-center gap-3 pt-3 pb-1">
                  <LanguageToggle />
                  <a href="/login" className="flex h-10 flex-1 items-center justify-center rounded-full bg-green-600 text-[13px] font-bold text-white">
                    {t('nav_signin')}
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
            onClick={e => { if (e.target === e.currentTarget) setSearchOpen(false) }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0, scale: .98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.2, ease: [.22, 1, .36, 1] }}
              className="mx-auto mt-16 w-full max-w-[1600px] px-4"
            >
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                <div className="flex items-center gap-3 px-4 py-4">
                  <Search size={18} className="shrink-0 text-green-600" />
                  <input
                    ref={ref}
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && q.trim())
                        window.location.href = `/cars?q=${encodeURIComponent(q.trim())}`
                    }}
                    placeholder={t('nav_search_ph')}
                    className="flex-1 text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
                    dir="auto"
                  />
                  <kbd className="hidden rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[10px] text-gray-400 sm:block">ESC</kbd>
                  <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-700">
                    <X size={17} />
                  </button>
                </div>
                <div className="border-t border-gray-100 px-4 py-3">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Popular</p>
                  <div className="flex flex-wrap gap-2">
                    {['BMW', 'Mercedes', 'Audi', 'Tesla', 'Range Rover', 'SUV', 'Electric'].map(kw => (
                      <a key={kw} href={`/cars?q=${kw}`}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[12px] font-medium text-gray-600 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700">
                        {kw}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-2 text-center text-[11px] text-white/60">Press Enter to search · Ctrl+K to open</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
