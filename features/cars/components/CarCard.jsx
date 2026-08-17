'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Fuel, GitCompare, Heart, MapPin, Settings2, Star, Users, Zap, TrendingUp, Tag } from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { useCurrency } from '@/context/CurrencyContext'
import { useCompare } from '@/context/CompareContext'

// Derive dynamic status badges from car data
function getBadges(car) {
  const badges = []
  if (car.fuelType === 'Electric') badges.push({ label: 'Electric', icon: Zap, bg: 'bg-[#1d4ed8]', text: 'text-white' })
  if (car.views && car.views > 300) badges.push({ label: 'Popular', icon: TrendingUp, bg: 'bg-[#7c3aed]', text: 'text-white' })
  if (car.negotiable || (car.salePrice && car.salePrice < car.price)) badges.push({ label: 'Deal', icon: Tag, bg: 'bg-[#dc2626]', text: 'text-white' })
  return badges
}

export function CarCard({ car, index = 0 }) {
  const { toggle, isFav } = useFavorites()
  const toast = useToast()
  const { format } = useCurrency()
  const { toggle: compareToggle, isCompared, isFull } = useCompare()
  const fav = isFav(String(car.id))
  const compared = isCompared(car.id)
  const isRent = car.listingType === 'rent'
  const href = `/cars/${car.id}`
  const badges = getBadges(car)

  const handleHeart = (e) => {
    e.preventDefault()
    toggle(String(car.id))
    toast({ message: fav ? 'Removed from wishlist' : `${car.brand} ${car.model} added to wishlist`, type: fav ? 'info' : 'fav' })
  }

  const handleCompare = (e) => {
    e.preventDefault()
    if (!compared && isFull) {
      toast({ message: 'Comparison is full (max 4 vehicles)', type: 'error' })
      return
    }
    compareToggle(car)
    toast({ message: compared ? `${car.brand} ${car.model} removed from comparison` : `${car.brand} ${car.model} added to comparison`, type: compared ? 'info' : 'success' })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.38, delay: Math.min(index * 0.05, 0.3), ease: [.22,1,.36,1] }}
      whileHover={{ y: -5, transition: { duration: .2 } }}
      className="group relative overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      {/* Image area */}
      <a href={href} className="relative block overflow-hidden bg-gray-100" style={{ aspectRatio: '16/10' }}>
        {car.images?.[0]
          ? <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-107" />
          : <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
        }
        {/* Gradient overlay — deepens on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

        {/* Quick-spec hover overlay */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="flex flex-wrap gap-1.5">
            {[
              car.engine && `⚙ ${car.engine}`,
              car.mileage && `${Number(car.mileage).toLocaleString()} km`,
              car.seats && `${car.seats} seats`,
              car.doors && `${car.doors} doors`,
            ].filter(Boolean).map((spec) => (
              <span key={spec} className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                {spec}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Listing type badge */}
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide shadow-sm ${
          isRent ? 'bg-[#1d4ed8] text-white' : car.condition === 'New' ? 'bg-[#B5E92E] text-[#071016]' : 'bg-[#f59e0b] text-white'
        }`}>
          {isRent ? 'Rent' : car.condition === 'New' ? 'New' : 'Used'}
        </span>

        {/* Dynamic status badges */}
        <div className="absolute left-3 top-10 flex flex-col gap-1 mt-1">
          {badges.map(({ label, icon: Icon, bg, text }) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${bg} ${text} shadow-sm`}
            >
              <Icon size={8} />
              {label}
            </motion.span>
          ))}
        </div>

        {/* Availability dot for rentals */}
        {isRent && (
          <span className={`absolute right-[52px] top-3.5 h-2.5 w-2.5 rounded-full border-2 border-white shadow ${car.available ? 'bg-[#22c55e]' : 'bg-[#ef4444]'}`} />
        )}

        {/* Heart button */}
        <motion.button
          onClick={handleHeart}
          whileTap={{ scale: 0.75 }}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:bg-white"
          aria-label="Toggle wishlist"
        >
          <motion.span animate={fav ? { scale: [1, 1.6, 1] } : {}}>
            <Heart size={14} className={fav ? 'fill-rose-500 text-rose-500' : 'text-gray-400'} />
          </motion.span>
        </motion.button>

        {/* Compare toggle — shown on hover */}
        <motion.button
          onClick={handleCompare}
          whileTap={{ scale: 0.85 }}
          className={`absolute bottom-3 right-3 flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[10px] font-black shadow-md backdrop-blur-sm transition
            ${compared
              ? 'bg-[#B5E92E] text-[#071016]'
              : 'bg-white/90 text-slate-600 opacity-0 group-hover:opacity-100'
            }`}
          aria-label="Toggle compare"
        >
          <GitCompare size={11} />
          {compared ? 'Added' : 'Compare'}
        </motion.button>
      </a>

      {/* Card body */}
      <div className="p-4">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-black text-[#0f172a]">{car.brand} {car.model}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#64748b]">
              <MapPin size={9} />{car.city} · {car.year}
            </p>
          </div>
          {car.rating && (
            <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5">
              <Star size={9} className="fill-amber-400 text-amber-400" />
              <span className="text-[11px] font-bold text-amber-700">{car.rating}</span>
            </div>
          )}
        </div>

        {/* Specs chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {[
            [Settings2, car.transmission],
            [Fuel, car.fuelType],
            [Users, car.seats ? `${car.seats} seats` : null],
          ].filter(([, v]) => Boolean(v)).map(([Icon, label]) => (
            <span key={label} className="flex items-center gap-1 rounded-md border border-[#f0f0f0] bg-[#f8fafc] px-2 py-0.5 text-[10px] text-[#64748b]">
              <Icon size={9} />{label}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-4 flex items-end justify-between border-t border-[#f0f2ef] pt-3">
          <div>
            <p className="text-[10px] text-[#94a3b8]">{isRent ? 'from / day' : 'asking price'}</p>
            <p className="text-[18px] font-black text-[#0f172a]">
              {format(car.price)}
              {isRent && <span className="text-[11px] font-normal text-[#94a3b8]">/day</span>}
            </p>
          </div>
          <a
            href={href}
            className={`rounded-xl px-3.5 py-2 text-[11px] font-black transition ${
              car.available !== false
                ? 'bg-[#0e1418] text-white hover:bg-[#B5E92E] hover:text-[#071016]'
                : 'bg-gray-100 text-gray-400 pointer-events-none'
            }`}
          >
            {isRent ? (car.available ? 'Rent Now' : 'Unavailable') : 'View Details'}
          </a>
        </div>
      </div>

      {/* Compare highlight border */}
      <AnimatePresence>
        {compared && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-[#B5E92E]"
          />
        )}
      </AnimatePresence>
    </motion.article>
  )
}
