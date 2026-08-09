'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

export function CarGallery({ images = [] }) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const imgs = images.length ? images : ['https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=90']

  const prev = () => setActive(i => (i - 1 + imgs.length) % imgs.length)
  const next = () => setActive(i => (i + 1) % imgs.length)

  return (
    <>
      <div className="overflow-hidden rounded-2xl">
        {/* Main image */}
        <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: '16/9' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={imgs[active]}
              alt="Car"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full object-cover"
            />
          </AnimatePresence>

          {/* Nav arrows */}
          {imgs.length > 1 && <>
            <button onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/80 shadow backdrop-blur-sm transition hover:bg-white">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/80 shadow backdrop-blur-sm transition hover:bg-white">
              <ChevronRight size={18} />
            </button>
          </>}

          {/* Fullscreen */}
          <button onClick={() => setLightbox(true)}
            className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-white/80 shadow backdrop-blur-sm transition hover:bg-white">
            <Maximize2 size={14} />
          </button>

          {/* Counter */}
          <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white">
            {active + 1} / {imgs.length}
          </span>
        </div>

        {/* Thumbnails */}
        {imgs.length > 1 && (
          <div className="mt-2 grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(imgs.length, 5)}, 1fr)` }}>
            {imgs.slice(0, 5).map((src, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`relative overflow-hidden rounded-xl border-2 transition ${active === i ? 'border-green-500' : 'border-transparent opacity-70 hover:opacity-100'}`}
                style={{ aspectRatio: '16/10' }}>
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90"
            onClick={() => setLightbox(false)}>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={imgs[active]} alt="Car fullscreen"
              className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain"
              onClick={e => e.stopPropagation()}
            />
            <button onClick={() => setLightbox(false)}
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X size={20} />
            </button>
            {imgs.length > 1 && <>
              <button onClick={e => { e.stopPropagation(); prev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                <ChevronLeft size={22} />
              </button>
              <button onClick={e => { e.stopPropagation(); next() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                <ChevronRight size={22} />
              </button>
            </>}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
