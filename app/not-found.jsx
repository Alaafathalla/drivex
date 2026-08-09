'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Home, Search } from 'lucide-react'

const LINKS = [
  { label: 'Buy Cars',   href: '/cars' },
  { label: 'Rent Cars',  href: '/rentals' },
  { label: 'Dealers',    href: '/dealers' },
  { label: 'About Us',   href: '/about' },
]

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050706] px-5 text-white">
      {/* Animated background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[.04]"
        style={{ backgroundImage: 'linear-gradient(#2ee52b 1px,transparent 1px),linear-gradient(90deg,#2ee52b 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Glow blob */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-[#2ee52b] blur-[140px]"
      />

      {/* 404 number */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center"
      >
        <motion.p
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[clamp(100px,20vw,200px)] font-black leading-none tracking-[-.07em] text-white/[.07] select-none"
        >
          404
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="-mt-8 sm:-mt-14"
        >
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#2ee52b]">Page not found</p>
          <h1 className="mt-3 text-[clamp(28px,5vw,52px)] font-black leading-tight tracking-tight">
            Took a wrong turn?
          </h1>
          <p className="mt-3 max-w-md mx-auto text-[15px] leading-7 text-white/50">
            The page you're looking for doesn't exist or has been moved. Let's get you back on the road.
          </p>
        </motion.div>

        {/* Animated car */}
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="my-8 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="120" height="52" viewBox="0 0 120 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="12" y="18" width="96" height="24" rx="6" fill="#0d1a0d" stroke="#2ee52b" strokeWidth="1.5"/>
              <path d="M28 18 L42 6 H78 L92 18" stroke="#2ee52b" strokeWidth="1.5" fill="#0b1a0b"/>
              <circle cx="34" cy="44" r="8" fill="#1a1a1a" stroke="#2ee52b" strokeWidth="1.5"/>
              <circle cx="86" cy="44" r="8" fill="#1a1a1a" stroke="#2ee52b" strokeWidth="1.5"/>
              <circle cx="34" cy="44" r="3" fill="#2ee52b"/>
              <circle cx="86" cy="44" r="3" fill="#2ee52b"/>
              <rect x="50" y="10" width="20" height="8" rx="2" fill="#2ee52b" opacity=".2"/>
              <rect x="96" y="22" width="16" height="6" rx="3" fill="#2ee52b" opacity=".6"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-[6px] bg-[#2ee52b] px-6 py-3 text-[13px] font-bold text-black transition hover:bg-[#50f14d]"
          >
            <Home size={15} /> Go home
          </a>
          <a
            href="/cars"
            className="inline-flex items-center gap-2 rounded-[6px] border border-white/15 px-6 py-3 text-[13px] font-bold text-white transition hover:border-[#2ee52b] hover:text-[#2ee52b]"
          >
            <Search size={15} /> Browse cars
          </a>
        </motion.div>

        {/* Quick nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-[12px] font-semibold text-white/35 transition hover:text-[#2ee52b]">
              {l.label}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </main>
  )
}
