'use client'

import { motion } from 'framer-motion'
import { RefreshCw } from 'lucide-react'

export default function ErrorPage({ error, reset }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050706] px-5 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[.03]"
        style={{ backgroundImage: 'linear-gradient(#ff4040 1px,transparent 1px),linear-gradient(90deg,#ff4040 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-red-500 blur-[130px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        <motion.p
          animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[80px] leading-none"
        >
          ⚠️
        </motion.p>
        <h1 className="mt-4 text-[clamp(28px,5vw,48px)] font-black tracking-tight">
          Something broke
        </h1>
        <p className="mt-3 max-w-sm mx-auto text-[14px] leading-7 text-white/50">
          {error?.message || 'An unexpected error occurred. Our team has been notified.'}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <motion.button
            onClick={reset}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-[6px] bg-[#2ee52b] px-6 py-3 text-[13px] font-bold text-black transition hover:bg-[#50f14d]"
          >
            <RefreshCw size={15} /> Try again
          </motion.button>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-[6px] border border-white/15 px-6 py-3 text-[13px] font-bold text-white transition hover:border-white/30"
          >
            Go home
          </a>
        </div>
      </motion.div>
    </main>
  )
}
