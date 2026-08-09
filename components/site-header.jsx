'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, GitCompare, Heart, Menu, Search, UserRound, X } from 'lucide-react'

const nav = [
  { label: 'Home', href: '/' },
  { label: 'Buy Cars', href: '/cars' },
  { label: 'Rent Cars', href: '/rentals' },
  { label: 'Sell My Car', href: '/sell' },
  { label: 'Dealers', href: '/dealers' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const searchRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 80)
  }, [searchOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setSearchOpen(false); setOpen(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (href) => href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-white/10 bg-[#050706]/95 shadow-[0_4px_30px_rgba(0,0,0,.4)] backdrop-blur-xl'
            : 'border-white/6 bg-[#050706]/80 backdrop-blur-lg'
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1450px] items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Logo */}
          <a href="/" className="group flex items-center gap-2" aria-label="DriveX home">
            <span className="relative flex items-center text-[26px] font-black italic tracking-[-.05em] text-white">
              Drive<span className="text-[#2ee52b]">X</span>
              <span className="absolute -top-[8px] left-0 h-[12px] w-[86px] rounded-[70%_90%_0_0] border-t-2 border-[#2ee52b] opacity-90 transition-opacity group-hover:opacity-100" />
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative text-[13px] font-semibold transition-colors ${
                  isActive(item.href) ? 'text-[#2ee52b]' : 'text-white/75 hover:text-white'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-[3px] left-0 h-[2px] w-full rounded-full bg-[#2ee52b]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full text-white/75 transition hover:bg-white/8 hover:text-[#2ee52b]"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.8} />
            </button>

            <a
              href="/favorites"
              className="grid h-10 w-10 place-items-center rounded-full text-white/75 transition hover:bg-white/8 hover:text-[#2ee52b]"
              aria-label="Favorites"
            >
              <Heart size={18} strokeWidth={1.8} />
            </a>

            <a
              href="/compare"
              className="grid h-10 w-10 place-items-center rounded-full text-white/75 transition hover:bg-white/8 hover:text-[#2ee52b]"
              aria-label="Compare"
            >
              <GitCompare size={18} strokeWidth={1.8} />
            </a>

            <a
              href="/profile"
              className="grid h-10 w-10 place-items-center rounded-full text-white/75 transition hover:bg-white/8 hover:text-[#2ee52b]"
              aria-label="Account"
            >
              <UserRound size={18} strokeWidth={1.8} />
            </a>

            <a
              href="/login"
              className="ml-1 hidden h-9 items-center rounded-[6px] border border-[#23a823] px-5 text-[12px] font-semibold text-white transition hover:border-[#2ee52b] hover:bg-[#2ee52b] hover:text-black sm:flex"
            >
              Sign In
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-white/75 transition hover:bg-white/8 lg:hidden"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'close' : 'menu'}
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

        {/* Mobile menu */}
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
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    className={`flex items-center justify-between border-b border-white/8 py-4 text-sm font-semibold last:border-b-0 ${
                      isActive(item.href) ? 'text-[#2ee52b]' : 'text-white/80 hover:text-[#2ee52b]'
                    }`}
                  >
                    {item.label}
                    <ArrowRight size={14} className="text-white/30" />
                  </motion.a>
                ))}
                <div className="py-4">
                  <a href="/login" className="flex h-11 items-center justify-center rounded-[6px] bg-[#2ee52b] text-[13px] font-bold text-black">
                    Sign In
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] search-backdrop bg-black/70"
            onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false) }}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-20 max-w-2xl px-5"
            >
              <div className="flex items-center gap-3 rounded-[8px] border border-white/20 bg-[#0b0d0c] px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,.5)]">
                <Search size={20} className="shrink-0 text-[#2ee52b]" />
                <input
                  ref={searchRef}
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQ.trim()) {
                      window.location.href = `/cars?q=${encodeURIComponent(searchQ.trim())}`
                    }
                  }}
                  placeholder="Search make, model, year…"
                  className="flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/35"
                />
                <button onClick={() => setSearchOpen(false)} className="text-white/40 hover:text-white">
                  <X size={18} />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 px-1">
                {['BMW', 'Mercedes', 'Audi', 'Tesla', 'SUV', 'Electric'].map((q) => (
                  <a
                    key={q}
                    href={`/cars?q=${q}`}
                    className="rounded-full border border-white/12 px-4 py-1.5 text-[12px] text-white/55 transition hover:border-[#2ee52b]/60 hover:text-[#2ee52b]"
                  >
                    {q}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
