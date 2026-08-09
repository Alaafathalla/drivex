'use client'

import { useState } from 'react'
import { Heart, Menu, UserRound, X } from 'lucide-react'

const nav = [
  { label: 'Home', href: '/' },
  { label: 'Buy Cars', href: '/cars' },
  { label: 'Rent Cars', href: '/rentals' },
  { label: 'Sell My Car', href: '/sell' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#050706]/90 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1450px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="/" className="group flex items-center gap-2" aria-label="DriveX home">
          <span className="relative flex items-center text-[26px] font-black italic tracking-[-.05em] text-white">
            Drive<span className="text-[#2ee52b]">X</span>
            <span className="absolute -top-[8px] left-0 h-[12px] w-[86px] rounded-[70%_90%_0_0] border-t-2 border-[#2ee52b] opacity-90" />
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[13px] font-semibold transition-colors ${index === 0 ? 'text-[#2ee52b]' : 'text-white/85 hover:text-[#2ee52b]'}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href="/garage" className="grid h-10 w-10 place-items-center rounded-full text-white/90 transition hover:bg-white/8 hover:text-[#2ee52b]" aria-label="Favorites">
            <Heart size={20} strokeWidth={1.8} />
          </a>
          <a href="/dashboard" className="grid h-10 w-10 place-items-center rounded-full text-white/90 transition hover:bg-white/8 hover:text-[#2ee52b]" aria-label="Account">
            <UserRound size={19} strokeWidth={1.8} />
          </a>
          <a href="/dashboard" className="hidden h-10 items-center rounded-[7px] border border-[#23a823] px-5 text-[12px] font-semibold text-white transition hover:border-[#2ee52b] hover:bg-[#2ee52b] hover:text-black sm:flex">
            Sign In
          </a>
          <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-full lg:hidden" aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/8 bg-[#070908] px-5 py-3 lg:hidden">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="block border-b border-white/8 py-4 text-sm font-semibold text-white/85 last:border-b-0 hover:text-[#2ee52b]">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
