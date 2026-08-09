'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Heart, Trash2 } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-section'
import { CARS, RENTALS } from '@/lib/api'

const ALL = [...CARS, ...RENTALS.map((r) => ({ ...r, type: 'rent', price: r.pricePerDay, slug: r.slug }))]

export default function FavoritesPage() {
  const [favSlugs, setFavSlugs] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('drivex_favorites')
      if (stored) setFavSlugs(JSON.parse(stored))
    } catch {}
    setMounted(true)
  }, [])

  const remove = (slug) => {
    const next = favSlugs.filter((s) => s !== slug)
    setFavSlugs(next)
    try { localStorage.setItem('drivex_favorites', JSON.stringify(next)) } catch {}
  }

  const favorites = ALL.filter((c) => favSlugs.includes(c.slug))

  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-white/8 pt-[72px]">
        <div className="mx-auto max-w-[1450px] px-5 py-12 sm:px-8 lg:px-10">
          <FadeIn direction="left">
            <p className="text-[11px] font-bold uppercase tracking-[.1em] text-[#2ee52b]">Your account</p>
            <h1 className="mt-2 text-[clamp(32px,5vw,56px)] font-black tracking-tight">Saved Cars</h1>
            <p className="mt-2 text-[14px] text-white/50">
              {favorites.length} saved {favorites.length === 1 ? 'car' : 'cars'}
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-[1450px] px-5 py-10 sm:px-8 lg:px-10">
        {!mounted ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-[280px] rounded-[7px]" />
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-[#0b0d0c]">
              <Heart size={32} className="text-white/20" />
            </div>
            <h2 className="mt-6 text-[22px] font-bold">No saved cars yet</h2>
            <p className="mt-2 max-w-xs text-[14px] text-white/50">
              Tap the heart icon on any car listing to save it here for later.
            </p>
            <a
              href="/cars"
              className="mt-6 inline-flex items-center gap-2 rounded-[5px] bg-[#2ee52b] px-6 py-3 text-[13px] font-bold text-black"
            >
              Browse Cars <ArrowRight size={15} />
            </a>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favorites.map((car) => {
                const isRent = car.type === 'rent'
                const href = isRent ? `/rentals/${car.slug}` : `/cars/${car.slug}`
                const priceLabel = isRent ? `$${car.pricePerDay} / day` : `$${car.price?.toLocaleString()}`

                return (
                  <motion.article
                    key={car.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    whileHover={{ y: -4 }}
                    className="group overflow-hidden rounded-[7px] border border-white/10 bg-[#0b0d0c] transition hover:border-[#2ee52b]/40"
                  >
                    <div className="relative aspect-[1.45] overflow-hidden">
                      <span className="absolute left-3 top-3 z-10 rounded-[3px] bg-[#2ee52b] px-2 py-[3px] text-[9px] font-black text-black">
                        {isRent ? 'FOR RENT' : 'FOR SALE'}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => remove(car.slug)}
                        className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/40 text-red-400 backdrop-blur-sm transition hover:bg-red-500/20"
                      >
                        <Trash2 size={14} />
                      </motion.button>
                      <img src={car.image} alt={car.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold">{car.name}</h3>
                      <p className="mt-1 text-[11px] text-white/45">{car.year} · {isRent ? `${car.seats} seats` : `${car.mileage?.toLocaleString()} km`}</p>
                      <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3">
                        <p className="text-[15px] font-black text-[#2ee52b]">{priceLabel}</p>
                        <a href={href} className="flex items-center gap-1 text-[11px] font-semibold text-white/50 transition hover:text-[#2ee52b]">
                          View <ArrowRight size={12} />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </AnimatePresence>
        )}
      </div>

      <SiteFooter />
    </main>
  )
}
