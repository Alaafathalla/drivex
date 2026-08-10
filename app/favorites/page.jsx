'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Heart, Trash2 } from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'
import { useLang } from '@/context/LangContext'
import { CARS, RENTALS } from '@/lib/api'

const getItemKey = (item, index) => {
  const prefix = item?.type || 'item'
  const id = item?.slug || item?.id || index
  return `${prefix}-${id}`
}

const ALL = [
  ...CARS,
  ...RENTALS.map((r) => ({ ...r, type: 'rent', price: r.pricePerDay })),
]

export default function FavoritesPage() {
  const { slugs, toggle, isFav, count, mounted } = useFavorites()
  const { t } = useLang()

  const savedItems = ALL.filter((c) => slugs.includes(c.slug))

  return (
    <main className="min-h-screen bg-[#070908] text-white">
{/* Hero */}
      <section className="w-full border-b border-white/8">
        <div className="w-full px-4 py-12 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.1em] text-[#2ee52b]">Your account</p>
              <h1 className="mt-2 text-[clamp(32px,5vw,56px)] font-black tracking-tight">
                {t('favorites_title')}
              </h1>
              <p className="mt-2 text-[14px] text-white/50">
                <motion.span
                  key={count}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block"
                >
                  {count}
                </motion.span>{' '}
                saved {count === 1 ? 'car' : 'cars'}
              </p>
            </div>
            <AnimatePresence>
              {count > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="hidden sm:flex h-16 w-16 items-center justify-center rounded-full bg-[#2ee52b]/10"
                >
                  <Heart size={28} className="fill-[#2ee52b] text-[#2ee52b]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <div className="w-full px-4 py-12 sm:px-6 lg:px-8 xl:px-12">
        {!mounted ? (
          /* skeleton */
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-[280px] rounded-[7px]" />
            ))}
          </div>
        ) : savedItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-[#0b0d0c]"
            >
              <Heart size={38} className="text-white/20" />
            </motion.div>
            <h2 className="mt-7 text-[22px] font-bold">{t('favorites_empty')}</h2>
            <p className="mt-2 max-w-xs text-[14px] text-white/45">
              Tap the heart icon on any car to save it here.
            </p>
            <a
              href="/cars"
              className="mt-7 inline-flex items-center gap-2 rounded-[5px] bg-[#2ee52b] px-7 py-3.5 text-[13px] font-bold text-black transition hover:bg-[#50f14d]"
            >
              {t('favorites_browse')} <ArrowRight size={15} />
            </a>
          </motion.div>
        ) : (
          <>
            {/* Quick clear */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 flex items-center justify-between"
            >
              <p className="text-[13px] text-white/50">
                {savedItems.length} {savedItems.length === 1 ? 'item' : 'items'} saved
              </p>
              <button
                onClick={() => savedItems.forEach((c) => toggle(c.slug))}
                className="text-[11px] font-semibold text-white/35 transition hover:text-red-400"
              >
                Clear all
              </button>
            </motion.div>

            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {savedItems.map((car, i) => {
                  const isRent = car.type === 'rent'
                  const href = isRent ? `/rentals/${car.slug}` : `/cars/${car.slug}`
                  const price = isRent ? `$${car.pricePerDay}/day` : `$${car.price?.toLocaleString()}`

                  return (
                    <motion.article
                      key={getItemKey(car, i)}
                      layout
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.22 } }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="group overflow-hidden rounded-[8px] border border-white/10 bg-[#0b0d0c] transition hover:border-[#2ee52b]/40"
                    >
                      <div className="relative aspect-[1.45] overflow-hidden">
                        <span className="absolute left-3 top-3 z-10 rounded-[3px] bg-[#2ee52b] px-2 py-[3px] text-[9px] font-black text-black">
                          {isRent ? 'FOR RENT' : 'FOR SALE'}
                        </span>

                        {/* Animated remove button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.85 }}
                          onClick={() => toggle(car.slug)}
                          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-red-500/60"
                          aria-label="Remove from favorites"
                        >
                          <Trash2 size={13} />
                        </motion.button>

                        <img
                          src={car.image}
                          alt={car.name}
                          className="h-full w-full object-cover transition duration-600 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold">{car.name}</h3>
                        <p className="mt-1 text-[11px] text-white/45">
                          {car.year} · {isRent ? `${car.seats} seats` : `${car.mileage?.toLocaleString()} km`}
                        </p>
                        <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3">
                          <p className="text-[15px] font-black text-[#2ee52b]">{price}</p>
                          <a
                            href={href}
                            className="flex items-center gap-1 rounded-[4px] border border-white/12 px-3 py-1.5 text-[10px] font-bold text-white/60 transition hover:border-[#2ee52b] hover:text-[#2ee52b]"
                          >
                            View <ArrowRight size={11} />
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12 flex items-center justify-between rounded-[7px] border border-white/10 bg-[#0b0d0c] px-6 py-5"
            >
              <p className="text-[14px] font-semibold">
                Compare your saved cars side by side
              </p>
              <a
                href="/compare"
                className="flex items-center gap-2 rounded-[5px] bg-[#2ee52b] px-4 py-2.5 text-[12px] font-bold text-black transition hover:bg-[#50f14d]"
              >
                Compare <ArrowRight size={14} />
              </a>
            </motion.div>
          </>
        )}
      </div></main>
  )
}
