'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Camera, ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react'
import { useLang } from '@/context/LangContext'

const ZOOM_SCALE = 2.6
const LENS_SIZE = 168

export function CarGallery({ images = [] }) {
  const { t, isRTL } = useLang()
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [zoomEnabled, setZoomEnabled] = useState(false)
  const [zoomPoint, setZoomPoint] = useState({ x: 50, y: 50, visible: false })
  const [dragStart, setDragStart] = useState(null)
  const mainRef = useRef(null)

  const imgs = images.length
    ? images
    : ['https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=90']

  const prev = () => setActive((i) => (i - 1 + imgs.length) % imgs.length)
  const next = () => setActive((i) => (i + 1) % imgs.length)

  useEffect(() => {
    if (!lightbox) return
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setLightbox(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, imgs.length])

  useEffect(() => {
    setZoomPoint({ x: 50, y: 50, visible: false })
  }, [active])

  const handleDragStart = (e) => {
    if (zoomEnabled) return
    setDragStart(e.touches?.[0]?.clientX ?? e.clientX)
  }

  const handleDragEnd = (e) => {
    if (zoomEnabled || dragStart === null) return
    const end = e.changedTouches?.[0]?.clientX ?? e.clientX
    const diff = dragStart - end
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
    setDragStart(null)
  }

  const updateLens = (e) => {
    if (!zoomEnabled || !mainRef.current) return
    const rect = mainRef.current.getBoundingClientRect()
    const point = e.touches?.[0] || e
    const x = Math.max(0, Math.min(100, ((point.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((point.clientY - rect.top) / rect.height) * 100))
    setZoomPoint({ x, y, visible: true })
  }

  const toggleZoom = (e) => {
    e?.stopPropagation?.()
    setZoomEnabled((value) => !value)
    setZoomPoint((point) => ({ ...point, visible: false }))
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl">
        <div
          ref={mainRef}
          className={`group relative overflow-hidden bg-gray-100 ${zoomEnabled ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'}`}
          style={{ aspectRatio: '16/9' }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseMove={updateLens}
          onMouseEnter={updateLens}
          onMouseLeave={() => {
            setDragStart(null)
            setZoomPoint((point) => ({ ...point, visible: false }))
          }}
          onTouchStart={(e) => {
            handleDragStart(e)
            updateLens(e)
          }}
          onTouchMove={updateLens}
          onTouchEnd={(e) => {
            handleDragEnd(e)
            setZoomPoint((point) => ({ ...point, visible: false }))
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={active}
              src={imgs[active]}
              alt={`${t('gallery_image')} ${active + 1}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="h-full w-full select-none object-cover"
              draggable={false}
            />
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Magnifying lens — replaces the old simulated 360° control. */}
          <AnimatePresence>
            {zoomEnabled && zoomPoint.visible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="pointer-events-none absolute z-30 hidden overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_18px_55px_rgba(0,0,0,.38)] sm:block"
                style={{
                  width: LENS_SIZE,
                  height: LENS_SIZE,
                  left: `${zoomPoint.x}%`,
                  top: `${zoomPoint.y}%`,
                  transform: 'translate(-50%, -50%)',
                  backgroundImage: `url(${imgs[active]})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: `${ZOOM_SCALE * 100}% ${ZOOM_SCALE * 100}%`,
                  backgroundPosition: `${zoomPoint.x}% ${zoomPoint.y}%`,
                }}
              >
                <div className="absolute inset-0 rounded-full ring-1 ring-black/10" />
              </motion.div>
            )}
          </AnimatePresence>

          {imgs.length > 1 && (
            <>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 shadow-lg backdrop-blur-sm transition hover:bg-white"
                aria-label={t('gallery_prev')}
              >
                <ChevronLeft size={18} className={`text-[#0f172a] ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 shadow-lg backdrop-blur-sm transition hover:bg-white"
                aria-label={t('gallery_next')}
              >
                <ChevronRight size={18} className={`text-[#0f172a] ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
            </>
          )}

          <div className={`absolute top-3 z-40 flex flex-col gap-2 ${isRTL ? 'left-3' : 'right-3'}`}>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={(e) => { e.stopPropagation(); setLightbox(true) }}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow backdrop-blur-sm transition hover:bg-white"
              aria-label={t('gallery_fullscreen')}
              title={t('gallery_fullscreen')}
            >
              <Maximize2 size={14} className="text-[#0f172a]" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={toggleZoom}
              className={`grid h-9 w-9 place-items-center rounded-full shadow backdrop-blur-sm transition ${zoomEnabled ? 'bg-[#0f172a] text-white' : 'bg-[#B5E92E] text-[#071016] hover:brightness-105'}`}
              aria-label={zoomEnabled ? t('gallery_zoom_off') : t('gallery_zoom_btn')}
              title={zoomEnabled ? t('gallery_zoom_off') : t('gallery_zoom_btn')}
            >
              {zoomEnabled ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
            </motion.button>
          </div>

          <div className={`absolute bottom-3 z-20 flex items-center gap-2 ${isRTL ? 'right-3' : 'left-3'}`}>
            <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
              <Camera size={10} /> {active + 1}/{imgs.length}
            </span>
            {zoomEnabled && (
              <span className="hidden rounded-full bg-[#B5E92E] px-3 py-1 text-[10px] font-black text-[#071016] sm:inline-flex">
                {t('gallery_zoom_hint')}
              </span>
            )}
          </div>

          {imgs.length > 1 && (
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {imgs.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActive(i) }}
                  className={`rounded-full transition-all duration-300 ${i === active ? 'w-5 bg-[#B5E92E]' : 'w-1.5 bg-white/60 hover:bg-white'}`}
                  style={{ height: 6 }}
                  aria-label={`${t('gallery_go_to_image')} ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

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
                aria-label={`${t('gallery_go_to_image')} ${i + 1}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </motion.button>
            ))}
          </div>
        )}
      </div>

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
                  alt={t('media_car_fullscreen')}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
                  draggable={false}
                />
              </AnimatePresence>
              <p className="mt-3 text-center text-xs text-white/50">
                {active + 1} / {imgs.length} — {t('gallery_drag_hint')}
              </p>
            </motion.div>

            <button
              onClick={() => setLightbox(false)}
              className={`absolute top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 ${isRTL ? 'left-5' : 'right-5'}`}
              aria-label={t('btn_close')}
            >
              <X size={20} />
            </button>
            {imgs.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prev() }}
                  className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label={t('gallery_prev')}>
                  <ChevronLeft size={24} className={isRTL ? 'rotate-180' : ''} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); next() }}
                  className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label={t('gallery_next')}>
                  <ChevronRight size={24} className={isRTL ? 'rotate-180' : ''} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
