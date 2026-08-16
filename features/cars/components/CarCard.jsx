'use client'
import { motion } from 'framer-motion'
import { Fuel, Heart, MapPin, Settings2, Star, Users } from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { useCurrency } from '@/context/CurrencyContext'

export function CarCard({ car, index = 0 }) {
  const { toggle, isFav } = useFavorites()
  const toast = useToast()
  const { format } = useCurrency()
  const fav = isFav(String(car.id))
  const isRent = car.listingType === 'rent'
  const href = `/cars/${car.id}`

  const handleHeart = (e) => {
    e.preventDefault()
    toggle(String(car.id))
    toast({ message: fav ? 'Removed from wishlist' : `${car.brand} ${car.model} added to wishlist`, type: fav ? 'info' : 'fav' })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.38, delay: index * 0.05, ease: [.22,1,.36,1] }}
      whileHover={{ y: -4, transition: { duration: .2 } }}
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-lg"
    >
      {/* Image */}
      <a href={href} className="relative block overflow-hidden bg-gray-100" style={{ aspectRatio: '16/10' }}>
        {car.images?.[0]
          ? <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          : <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
        }
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Listing type badge */}
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide shadow-sm ${
          isRent ? 'bg-blue-600 text-white' : car.condition === 'New' ? 'bg-green-600 text-white' : 'bg-amber-500 text-white'
        }`}>
          {isRent ? 'For Rent' : car.condition === 'New' ? 'New' : 'Used'}
        </span>

        {/* Availability dot for rentals */}
        {isRent && (
          <span className={`absolute right-12 top-3.5 h-2 w-2 rounded-full ${car.available ? 'bg-green-400' : 'bg-red-400'}`} />
        )}

        {/* Heart */}
        <motion.button
          onClick={handleHeart}
          whileTap={{ scale: 0.8 }}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition hover:bg-white"
          aria-label="Toggle wishlist"
        >
          <motion.span animate={fav ? { scale: [1, 1.5, 1] } : {}}>
            <Heart size={15} className={fav ? 'fill-rose-500 text-rose-500' : 'text-gray-400'} />
          </motion.span>
        </motion.button>
      </a>

      {/* Info */}
      <div className="p-4">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-bold text-gray-900">{car.brand} {car.model}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-400">
              <MapPin size={10} />{car.city} · {car.year}
            </p>
          </div>
          {car.rating && (
            <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5">
              <Star size={10} className="fill-amber-400 text-amber-400" />
              <span className="text-[11px] font-bold text-amber-700">{car.rating}</span>
            </div>
          )}
        </div>

        {/* Specs row */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {[
            [Settings2, car.transmission],
            [Fuel, car.fuelType],
            [Users, `${car.seats} seats`],
          ].map(([Icon, label]) => (
            <span key={label} className="flex items-center gap-1 rounded-md border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] text-gray-500">
              <Icon size={9} />{label}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-4 flex items-end justify-between border-t border-gray-50 pt-3">
          <div>
            <p className="text-[11px] text-gray-400">{isRent ? 'from' : 'price'}</p>
            <p className="text-[18px] font-black text-green-600">
              {format(car.price)}
              {isRent && <span className="text-[11px] font-normal text-gray-400">/day</span>}
            </p>
          </div>
          <a href={href}
            className={`rounded-xl px-4 py-2 text-[12px] font-bold transition ${
              car.available !== false
                ? 'bg-green-600 text-white hover:bg-green-500'
                : 'bg-gray-100 text-gray-400 pointer-events-none'
            }`}>
            {isRent ? (car.available ? 'Rent Now' : 'Unavailable') : 'View Details'}
          </a>
        </div>
      </div>
    </motion.article>
  )
}
