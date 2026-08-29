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
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-5">
      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[.03]"
        style={{ backgroundImage: 'linear-gradient(#0f172a 1px,transparent 1px),linear-gradient(90deg,#0f172a 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Glow blob */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-[#B5E92E] blur-[140px]"
      />

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
          className="text-[clamp(100px,20vw,200px)] font-black leading-none tracking-[-.07em] text-[#0f172a]/[.06] select-none"
        >
          404
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="-mt-8 sm:-mt-14"
        >
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#B5E92E]">Page not found</p>
          <h1 className="mt-3 text-[clamp(28px,5vw,52px)] font-black leading-tight tracking-tight text-[#0f172a]">
            Took a wrong turn?
          </h1>
          <p className="mt-3 max-w-md mx-auto text-[15px] leading-7 text-[#64748b]">
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
              <rect x="12" y="18" width="96" height="24" rx="6" fill="#f0fdf4" stroke="#B5E92E" strokeWidth="1.5"/>
              <path d="M28 18 L42 6 H78 L92 18" stroke="#B5E92E" strokeWidth="1.5" fill="#e8fdb0"/>
              <circle cx="34" cy="44" r="8" fill="#e8ecf0" stroke="#B5E92E" strokeWidth="1.5"/>
              <circle cx="86" cy="44" r="8" fill="#e8ecf0" stroke="#B5E92E" strokeWidth="1.5"/>
              <circle cx="34" cy="44" r="3" fill="#B5E92E"/>
              <circle cx="86" cy="44" r="3" fill="#B5E92E"/>
              <rect x="50" y="10" width="20" height="8" rx="2" fill="#B5E92E" opacity=".3"/>
              <rect x="96" y="22" width="16" height="6" rx="3" fill="#B5E92E" opacity=".7"/>
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
            className="inline-flex items-center gap-2 rounded-full bg-[#B5E92E] px-6 py-3 text-[13px] font-bold text-[#071016] transition hover:brightness-105"
          >
            <Home size={15} /> Go home
          </a>
          <a
            href="/cars"
            className="inline-flex items-center gap-2 rounded-full border border-[#e5e9e2] bg-white px-6 py-3 text-[13px] font-bold text-[#0f172a] shadow-sm transition hover:border-[#B5E92E]"
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
            <a key={l.href} href={l.href} className="text-[12px] font-semibold text-[#94a3b8] transition hover:text-[#B5E92E]">
              {l.label}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </main>
  )
}
