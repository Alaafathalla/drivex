'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitCompare, Heart } from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'
import { useCurrency } from '@/context/CurrencyContext'

/**
 * Shared animated car card used across Home, Buy Cars, Rentals pages.
 * index — stagger delay multiplier
 * type  — 'sale' | 'rent'
 */
export function CarCard({ car, index = 0, showCompare = false, className = '' }) {
  const { toggle, isFav } = useFavorites()
  const { format } = useCurrency()
  const isRent = car.type === 'rent'
  const fav = isFav(car.slug)
  const href = isRent ? `/rentals/${car.slug}` : `/cars/${car.slug}`
  const priceLabel = isRent
    ? `${format(car.pricePerDay)}/day`
    : format(car.price || 0)

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`group relative overflow-hidden rounded-[8px] border border-white/10 bg-[#0b0d0c] transition hover:border-[#2ee52b]/40 ${className}`}
    >
      {/* Image */}
      <a href={href} className="relative block overflow-hidden" style={{ aspectRatio: '1.4' }}>
        <img
          src={car.image}
          alt={car.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Badge */}
        <span className="absolute left-3 top-3 rounded-[3px] bg-[#2ee52b] px-2 py-[3px] text-[9px] font-black text-black uppercase tracking-[.08em]">
          {isRent ? 'FOR RENT' : car.condition || 'FOR SALE'}
        </span>

        {/* Action buttons */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          {/* Heart */}
          <motion.button
            onClick={(e) => { e.preventDefault(); toggle(car.slug) }}
            whileTap={{ scale: 0.8 }}
            className="relative grid h-8 w-8 place-items-center rounded-full bg-black/40 backdrop-blur-sm transition hover:bg-black/70"
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <motion.span
              animate={fav ? { scale: [1, 1.5, 1] } : { scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <Heart
                size={14}
                className={`transition-colors duration-200 ${fav ? 'fill-[#2ee52b] text-[#2ee52b]' : 'text-white'}`}
              />
            </motion.span>
            {/* Burst particles on add */}
            <AnimatePresence>
              {fav && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: Math.cos((i / 6) * Math.PI * 2) * 16,
                        y: Math.sin((i / 6) * Math.PI * 2) * 16,
                        opacity: [1, 1, 0],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.04 }}
                      className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-[#2ee52b]"
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Compare */}
          {showCompare && (
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={(e) => e.preventDefault()}
              className="grid h-8 w-8 place-items-center rounded-full bg-black/40 backdrop-blur-sm text-white transition hover:bg-[#2ee52b] hover:text-black"
              aria-label="Compare"
            >
              <GitCompare size={13} />
            </motion.button>
          )}
        </div>
      </a>

      {/* Info */}
      <div className="p-4">
        <h3 className="truncate font-bold leading-tight">{car.name}</h3>
        <p className="mt-1 text-[11px] text-white/45">
          {car.year} · {isRent ? `${car.seats} seats · ${car.fuel}` : `${(car.mileage || 0).toLocaleString()} km · ${car.fuel || ''}`}
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3">
          <div>
            <p className="text-[15px] font-black text-[#2ee52b]">{priceLabel}</p>
            {!isRent && car.price && (
              <p className="text-[9px] text-white/30 mt-0.5">
                ~{format(Math.round(car.price / 60))}/mo
              </p>
            )}
          </div>
          <a
            href={href}
            className="rounded-[4px] border border-white/15 px-3 py-1.5 text-[10px] font-bold text-white/60 transition hover:border-[#2ee52b] hover:text-[#2ee52b]"
          >
            View →
          </a>
        </div>
      </div>
    </motion.article>
  )
}
