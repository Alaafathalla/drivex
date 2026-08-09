'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, GitCompare, Heart, Menu, Search, UserRound, X } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { useFavorites } from '@/context/FavoritesContext'
import { LanguageToggle } from '@/components/language-toggle'
import { ScrollProgress } from '@/components/scroll-progress'

export function SiteHeader() {
  const { t, isRTL } = useLang()
  const { count, lastAdded } = useFavorites()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const searchRef = useRef(null)

  const nav = [
    { key: 'nav_home',    href: '/' },
    { key: 'nav_buy',     href: '/cars' },
    { key: 'nav_rent',    href: '/rentals' },
    { key: 'nav_sell',    href: '/sell' },
    { key: 'nav_dealers', href: '/dealers' },
    { key: 'nav_about',   href: '/about' },
    { key: 'nav_contact', href: '/contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setSearchOpen(false) }, [pathname])

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 80)
  }, [searchOpen])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setSearchOpen(false); setOpen(false) }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (href) => href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <ScrollProgress />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-white/10 bg-[#050706]/95 shadow-[0_4px_30px_rgba(0,0,0,.45)] backdrop-blur-xl'
            : 'border-white/6 bg-[#050706]/75 backdrop-blur-lg'
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1450px] items-center justify-between px-5 sm:px-8 lg:px-10">

          {/* Logo */}
          <a href="/" className="group flex shrink-0 items-center gap-2" aria-label="DriveX home">
            <span className="relative flex items-center text-[26px] font-black italic tracking-[-.05em] text-white">
              Drive<span className="text-[#2ee52b]">X</span>
              <motion.span
                layoutId="logo-line"
                className="absolute -top-[8px] left-0 h-[12px] w-[86px] rounded-[70%_90%_0_0] border-t-2 border-[#2ee52b] opacity-80 transition-opacity group-hover:opacity-100"
              />
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative text-[13px] font-semibold transition-colors ${
                  isActive(item.href) ? 'text-[#2ee52b]' : 'text-white/70 hover:text-white'
                }`}
              >
                {t(item.key)}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-[3px] left-0 h-[2px] w-full rounded-full bg-[#2ee52b]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full text-white/70 transition hover:bg-white/8 hover:text-[#2ee52b]"
              aria-label="Search (Ctrl+K)"
            >
              <Search size={18} strokeWidth={1.8} />
            </button>

            {/* Favorites with live count badge */}
            <a
              href="/favorites"
              className="relative grid h-10 w-10 place-items-center rounded-full text-white/70 transition hover:bg-white/8 hover:text-[#2ee52b]"
              aria-label="Favorites"
            >
              <Heart size={18} strokeWidth={1.8} className={count > 0 ? 'fill-[#2ee52b] text-[#2ee52b]' : ''} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                    className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#2ee52b] px-[3px] text-[9px] font-black text-black"
                  >
                    {count > 99 ? '99+' : count}
                  </motion.span>
                )}
              </AnimatePresence>
              {/* Ripple on new item added */}
              <AnimatePresence>
                {lastAdded && (
                  <motion.span
                    key="ripple"
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55 }}
                    className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#2ee52b]"
                  />
                )}
              </AnimatePresence>
            </a>

            {/* Compare */}
            <a href="/compare" className="grid h-10 w-10 place-items-center rounded-full text-white/70 transition hover:bg-white/8 hover:text-[#2ee52b]" aria-label="Compare">
              <GitCompare size={18} strokeWidth={1.8} />
            </a>

            {/* Account */}
            <a href="/profile" className="grid h-10 w-10 place-items-center rounded-full text-white/70 transition hover:bg-white/8 hover:text-[#2ee52b]" aria-label="Account">
              <UserRound size={18} strokeWidth={1.8} />
            </a>

            {/* Language toggle */}
            <div className="hidden sm:block ms-1">
              <LanguageToggle />
            </div>

            {/* Sign in */}
            <a
              href="/login"
              className="ml-1 hidden h-9 items-center rounded-[6px] border border-[#23a823] px-5 text-[12px] font-semibold text-white transition hover:border-[#2ee52b] hover:bg-[#2ee52b] hover:text-black sm:flex"
            >
              {t('nav_signin')}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-white/70 transition hover:bg-white/8 lg:hidden"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'm'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {open ? <X size={22} /> : <Menu size={22} />}
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
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-white/8 bg-[#070908] lg:hidden"
            >
              <div className="px-5 py-2">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ x: isRTL ? 20 : -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    className={`flex items-center justify-between border-b border-white/8 py-4 text-sm font-semibold last:border-0 ${
                      isActive(item.href) ? 'text-[#2ee52b]' : 'text-white/80'
                    }`}
                  >
                    {t(item.key)}
                    <ArrowRight size={14} className={`text-white/25 ${isRTL ? 'rotate-180' : ''}`} />
                  </motion.a>
                ))}
                <div className="flex items-center justify-between gap-3 py-4">
                  <LanguageToggle />
                  <a href="/login" className="flex h-11 flex-1 items-center justify-center rounded-[6px] bg-[#2ee52b] text-[13px] font-bold text-black">
                    {t('nav_signin')}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-md"
            onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false) }}
          >
            <motion.div
              initial={{ y: -24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-20 max-w-2xl px-4"
            >
              <div className="overflow-hidden rounded-[10px] border border-white/15 bg-[#0b0d0c] shadow-[0_24px_70px_rgba(0,0,0,.6)]">
                <div className="flex items-center gap-3 px-5 py-4">
                  <Search size={19} className="shrink-0 text-[#2ee52b]" />
                  <input
                    ref={searchRef}
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQ.trim()) {
                        window.location.href = `/cars?q=${encodeURIComponent(searchQ.trim())}`
                      }
                    }}
                    placeholder={t('nav_search_ph')}
                    className="flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/30"
                    dir="auto"
                  />
                  <kbd className="hidden rounded border border-white/15 px-2 py-0.5 text-[10px] text-white/30 sm:block">ESC</kbd>
                  <button onClick={() => setSearchOpen(false)} className="text-white/35 hover:text-white">
                    <X size={18} />
                  </button>
                </div>
                <div className="border-t border-white/8 px-5 py-3">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[.12em] text-white/30">Popular searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['BMW', 'Mercedes', 'Audi', 'Tesla', 'Range Rover', 'SUV', 'Electric'].map((q) => (
                      <a
                        key={q}
                        href={`/cars?q=${q}`}
                        className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/50 transition hover:border-[#2ee52b]/50 hover:text-[#2ee52b]"
                      >
                        {q}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] text-white/20">Press Enter to search · Ctrl+K to open</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
