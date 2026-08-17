'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { GitCompare, X } from 'lucide-react'
import { useCompare } from '@/context/CompareContext'

export function CompareBar() {
  const { items, remove, clear, count } = useCompare()

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-[#B5E92E]/30 bg-[#0b141b] px-5 py-3.5 shadow-[0_20px_60px_rgba(0,0,0,.5)] backdrop-blur-xl">
            {/* Thumbnails */}
            <div className="flex items-center gap-2">
              {items.map((car) => (
                <motion.div
                  key={car.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="relative"
                >
                  <img
                    src={car.images?.[0]}
                    alt={`${car.brand} ${car.model}`}
                    className="h-12 w-16 rounded-lg object-cover ring-1 ring-[#B5E92E]/40"
                  />
                  <button
                    onClick={() => remove(car.id)}
                    className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full bg-[#B5E92E] text-[#071016] shadow"
                    aria-label={`Remove ${car.brand} ${car.model} from comparison`}
                  >
                    <X size={9} />
                  </button>
                </motion.div>
              ))}

              {/* Empty slots */}
              {Array.from({ length: 4 - count }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 w-16 rounded-lg border border-dashed border-white/15 bg-white/5 text-center text-[9px] font-bold leading-[48px] text-white/30"
                >
                  +
                </div>
              ))}
            </div>

            <div className="mx-1 h-10 w-px bg-white/10" />

            <div>
              <p className="text-[10px] font-black uppercase tracking-[.15em] text-[#B5E92E]">{count}/4 selected</p>
              <p className="text-[11px] text-white/50">Ready to compare</p>
            </div>

            <a
              href="/compare"
              className="flex h-10 items-center gap-2 rounded-xl bg-[#B5E92E] px-4 text-[12px] font-black text-[#071016] transition hover:brightness-105"
            >
              <GitCompare size={14} />
              Compare now
            </a>

            <button
              onClick={clear}
              className="grid size-9 place-items-center rounded-xl bg-white/5 text-white/40 transition hover:bg-white/10 hover:text-white"
              aria-label="Clear comparison"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
