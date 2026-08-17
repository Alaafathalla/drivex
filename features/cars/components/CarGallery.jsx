'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Camera, ChevronLeft, ChevronRight, Maximize2, RotateCcw, X } from 'lucide-react'

// Swiper is loaded client-side only to avoid SSR issues
export function CarGallery({ images = [] }) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [view360, setView360] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const mainRef = useRef(null)

  const imgs = images.length
    ? images
    : ['https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=90']

  const prev = () => setActive((i) => (i - 1 + imgs.length) % imgs.length)
  const next = () => setActive((i) => (i + 1) % imgs.length)

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     setLightbox(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, imgs.length])

  // Touch / drag swipe support
  const handleDragStart = (e) => setDragStart(e.touches?.[0]?.clientX ?? e.clientX)
  const handleDragEnd = (e) => {
    if (dragStart === null) return
    const end = e.changedTouches?.[0]?.clientX ?? e.clientX
    const diff = dragStart - end
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
    setDragStart(null)
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl">
        {/* Main image */}
        <div
          ref={mainRef}
          className="group relative cursor-grab overflow-hidden bg-gray-100 active:cursor-grabbing"
          style={{ aspectRatio: '16/9' }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={active}
              src={imgs[active]}
              alt={`Car image ${active + 1}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="h-full w-full select-none object-cover"
              draggable={false}
            />
          </AnimatePresence>

          {/* Overlay gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Nav arrows */}
          {imgs.length > 1 && (
            <>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/85 shadow-lg backdrop-blur-sm transition hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} className="text-[#0f172a]" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/85 shadow-lg backdrop-blur-sm transition hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight size={18} className="text-[#0f172a]" />
              </motion.button>
            </>
          )}

          {/* Top-right actions */}
          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setLightbox(true)}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/85 shadow backdrop-blur-sm transition hover:bg-white"
              aria-label="View fullscreen"
            >
              <Maximize2 size={14} className="text-[#0f172a]" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setView360(true)}
              className="grid h-9 w-9 place-items-center rounded-full bg-[#B5E92E] shadow backdrop-blur-sm transition hover:brightness-105"
              aria-label="360° view"
            >
              <RotateCcw size={13} className="text-[#071016]" />
            </motion.button>
          </div>

          {/* Counter + photo count */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
              <Camera size={10} /> {active + 1}/{imgs.length}
            </span>
          </div>

          {/* Dot indicators */}
          {imgs.length > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {imgs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${i === active ? 'w-5 bg-[#B5E92E]' : 'w-1.5 bg-white/60 hover:bg-white'}`}
                  style={{ height: 6 }}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {imgs.length > 1 && (
          <div className="mt-2.5 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {imgs.map((src, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative shrink-0 overflow-hidden rounded-xl border-2 transition ${active === i ? 'border-[#B5E92E] shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'}`}
                style={{ width: 80, aspectRatio: '16/10' }}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 p-4"
            onClick={() => setLightbox(false)}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] max-w-[94vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={active}
                  src={imgs[active]}
                  alt="Car fullscreen"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
                  draggable={false}
                />
              </AnimatePresence>

              {/* Caption */}
              <p className="mt-3 text-center text-xs text-white/50">
                {active + 1} / {imgs.length} — Drag or use arrows to navigate
              </p>
            </motion.div>

            {/* Controls */}
            <button onClick={() => setLightbox(false)}
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
              <X size={20} />
            </button>
            {imgs.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prev() }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); next() }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 360° View Modal */}
      <AnimatePresence>
        {view360 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-3xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white">360° Exterior View</h2>
                  <p className="mt-1 text-sm text-white/40">Drag to rotate. Scroll to zoom.</p>
                </div>
                <button
                  onClick={() => setView360(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Close 360° view"
                >
                  <X size={18} />
                </button>
              </div>

              {/* 360° Interactive strip using the available images */}
              <div className="relative overflow-hidden rounded-2xl bg-[#0d1922]" style={{ aspectRatio: '16/9' }}>
                <View360Strip images={imgs} />
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs text-white/70 backdrop-blur-sm">
                  <RotateCcw size={12} />
                  Drag left or right to rotate
                </div>
              </div>

              {/* Thumbnail row */}
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {imgs.map((src, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className="h-14 w-20 shrink-0 overflow-hidden rounded-xl opacity-70 transition hover:opacity-100">
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Interactive 360° strip — rotates through images on drag
function View360Strip({ images }) {
  const [frame, setFrame] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(null)
  const frameRef = useRef(0)
  const totalFrames = images.length

  const onStart = (e) => {
    setDragging(true)
    startX.current = e.touches?.[0]?.clientX ?? e.clientX
  }

  const onMove = (e) => {
    if (!dragging || startX.current === null) return
    const currentX = e.touches?.[0]?.clientX ?? e.clientX
    const diff = currentX - startX.current
    const framesPerPx = totalFrames / 400
    let newFrame = Math.round(frameRef.current - diff * framesPerPx)
    newFrame = ((newFrame % totalFrames) + totalFrames) % totalFrames
    setFrame(newFrame)
  }

  const onEnd = () => {
    setDragging(false)
    frameRef.current = frame
    startX.current = null
  }

  return (
    <div
      className="h-full w-full select-none"
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
      onMouseDown={onStart}
      onMouseMove={onMove}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={onStart}
      onTouchMove={onMove}
      onTouchEnd={onEnd}
      draggable={false}
    >
      <img
        src={images[frame % images.length]}
        alt="360° view"
        className="h-full w-full object-contain"
        draggable={false}
      />
    </div>
  )
}
