'use client'

import { useState } from 'react'
import { ChevronDown, Heart, Menu, Search, UserRound, X, ArrowUpRight } from 'lucide-react'

const nav = [
  { en: 'Buy', ar: 'شراء', href: '/cars' },
  { en: 'Rent', ar: 'تأجير', href: '/rentals' },
  { en: 'Services', ar: 'الخدمات', href: '/services', dropdown: true },
  { en: 'Sell', ar: 'بيع سيارتك', href: '/sell' },
  { en: 'Explore', ar: 'اكتشف', href: '/about' },
]

export function SiteHeader({ dark = false }) {
  const [open, setOpen] = useState(false)
  const [arabic, setArabic] = useState(false)

  return (
    <header dir={arabic ? 'rtl' : 'ltr'} className={`sticky top-0 z-50 border-b backdrop-blur-2xl ${dark ? 'border-white/10 bg-[#080b10]/82 text-white' : 'border-black/8 bg-[#f7f7f3]/88 text-[#11151a]'}`}>
      <div className="mx-auto flex h-[78px] max-w-[1540px] items-center justify-between px-5 lg:px-8 xl:px-12">
        <a href="/" className="group flex items-center gap-3">
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-[#d7ff3f] text-sm font-black text-[#0a0d10]">
            M
            <span className="absolute inset-0 translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0" />
            <span className="relative z-10">M</span>
          </span>
          <div className="leading-none">
            <span className="text-[20px] font-black tracking-[-.055em]">motory</span>
            <span className="ml-1 text-[#9cc000]">/01</span>
          </div>
        </a>

        <nav className={`hidden items-center gap-1 rounded-full border px-2 py-1.5 lg:flex ${dark ? 'border-white/10 bg-white/[.04]' : 'border-black/8 bg-white/70'}`}>
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={`group flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-bold transition ${dark ? 'text-white/65 hover:bg-white/8 hover:text-white' : 'text-black/55 hover:bg-black/[.04] hover:text-black'}`}>
              {arabic ? item.ar : item.en}
              {item.dropdown && <ChevronDown size={12} className="opacity-50" />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="/cars" className={`hidden h-10 w-10 items-center justify-center rounded-full border sm:flex ${dark ? 'border-white/12 bg-white/[.04]' : 'border-black/8 bg-white/70'}`} aria-label="Search"><Search size={16}/></a>
          <a href="/garage" className={`hidden h-10 w-10 items-center justify-center rounded-full border sm:flex ${dark ? 'border-white/12 bg-white/[.04]' : 'border-black/8 bg-white/70'}`} aria-label="Favorites"><Heart size={16}/></a>
          <button onClick={() => setArabic(!arabic)} className={`h-10 rounded-full border px-3 text-[10px] font-black tracking-[.14em] ${dark ? 'border-white/12 bg-white/[.04]' : 'border-black/8 bg-white/70'}`}>{arabic ? 'EN' : 'عربي'}</button>
          <a href="/dashboard" className={`hidden h-10 items-center gap-2 rounded-full border px-4 text-[11px] font-bold md:flex ${dark ? 'border-white/12 bg-white/[.04]' : 'border-black/8 bg-white/70'}`}><UserRound size={14}/> {arabic ? 'الحساب' : 'Account'}</a>
          <a href="/sell" className="hidden h-10 items-center gap-2 rounded-full bg-[#d7ff3f] px-5 text-[11px] font-black text-[#0a0d10] sm:flex">{arabic ? 'اعرض سيارتك' : 'List your car'} <ArrowUpRight size={14}/></a>
          <button onClick={() => setOpen(!open)} className="p-2 lg:hidden" aria-label="Toggle menu">{open ? <X size={22}/> : <Menu size={22}/>}</button>
        </div>
      </div>

      {open && (
        <div className={`border-t px-5 py-3 lg:hidden ${dark ? 'border-white/10 bg-[#080b10]' : 'border-black/8 bg-[#f7f7f3]'}`}>
          {nav.map((item) => <a key={item.href} href={item.href} className={`flex items-center justify-between border-b py-4 text-sm font-bold ${dark ? 'border-white/10' : 'border-black/8'}`}>{arabic ? item.ar : item.en}<ArrowUpRight size={15} className="opacity-45"/></a>)}
          <a href="/dashboard" className="block py-4 text-sm font-bold">{arabic ? 'الحساب' : 'Account'}</a>
        </div>
      )}
    </header>
  )
}
