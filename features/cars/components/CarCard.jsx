'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Fuel, GitCompare, Heart, MapPin, Search, Settings2, Star, Users, Zap, TrendingUp, Tag } from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { useCurrency } from '@/context/CurrencyContext'
import { useCompare } from '@/context/CompareContext'
import { useLang } from '@/context/LangContext'
import { localizeVehicleValue } from '@/lib/vehicle-i18n'
import { CarQuickView } from './CarQuickView'

function getBadges(car, t) {
  const badges = []
  if (car.fuelType === 'Electric') badges.push({ label: t('card_electric'), icon: Zap, bg: 'bg-[#1d4ed8]', text: 'text-white' })
  if (car.views && car.views > 300) badges.push({ label: t('card_popular'), icon: TrendingUp, bg: 'bg-[#7c3aed]', text: 'text-white' })
  if (car.negotiable || (car.salePrice && car.salePrice < car.price)) badges.push({ label: t('card_deal'), icon: Tag, bg: 'bg-[#dc2626]', text: 'text-white' })
  return badges
}

export function CarCard({ car, index = 0 }) {
  const [quickOpen, setQuickOpen] = useState(false)
  const { toggle, isFav } = useFavorites()
  const toast = useToast()
  const { format } = useCurrency()
  const { toggle: compareToggle, isCompared, isFull } = useCompare()
  const { t, lang, isRTL } = useLang()
  const fav = isFav(String(car.id))
  const compared = isCompared(car.id)
  const isRent = car.listingType === 'rent'
  const href = `/cars/${car.id}`
  const badges = getBadges(car, t)

  const handleHeart = () => {
    toggle(String(car.id))
    toast({
      message: fav
        ? t('card_removed_wishlist')
        : `${car.brand} ${car.model} ${t('card_added_wishlist')}`,
      type: fav ? 'info' : 'fav',
    })
  }

  const handleCompare = () => {
    if (!compared && isFull) {
      toast({ message: t('card_compare_full'), type: 'error' })
      return
    }
    compareToggle(car)
    toast({
      message: compared
        ? `${car.brand} ${car.model} ${t('card_removed_compare')}`
        : `${car.brand} ${car.model} ${t('card_added_compare')}`,
      type: compared ? 'info' : 'success',
    })
  }

  const conditionLabel = isRent
    ? t('card_for_rent')
    : localizeVehicleValue(car.condition || 'Used', lang)

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.38, delay: Math.min(index * 0.05, 0.3), ease: [.22,1,.36,1] }}
        whileHover={{ y: -5, transition: { duration: .2 } }}
        className="group relative overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm transition-shadow hover:shadow-xl"
      >
        <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: '16/10' }}>
          <a href={href} className="absolute inset-0 z-0" aria-label={`${t('cars_view_details')} ${car.brand} ${car.model}`}>
            {car.images?.[0]
              ? <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              : <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
            }
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
          </a>

          <div className="pointer-events-none absolute inset-0 z-[1] flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex flex-wrap gap-1.5">
              {[
                car.engine && `⚙ ${car.engine}`,
                car.mileage != null && `${Number(car.mileage).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')} ${t('card_km')}`,
                car.seats && `${car.seats} ${t('card_seats')}`,
                car.doors && `${car.doors} ${t('card_doors')}`,
              ].filter(Boolean).map((spec) => (
                <span key={spec} className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <span className={`absolute top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide shadow-sm ${isRTL ? 'right-3' : 'left-3'} ${
            isRent ? 'bg-[#1d4ed8] text-white' : car.condition === 'New' ? 'bg-[#B5E92E] text-[#071016]' : 'bg-[#f59e0b] text-white'
          }`}>
            {conditionLabel}
          </span>

          <div className={`absolute top-10 z-10 mt-1 flex flex-col gap-1 ${isRTL ? 'right-3' : 'left-3'}`}>
            {badges.map(({ label, icon: Icon, bg, text }) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, x: isRTL ? 8 : -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${bg} ${text} shadow-sm`}
              >
                <Icon size={8} />
                {label}
              </motion.span>
            ))}
          </div>

          {isRent && (
            <span className={`absolute top-3.5 z-10 h-2.5 w-2.5 rounded-full border-2 border-white shadow ${isRTL ? 'left-[52px]' : 'right-[52px]'} ${car.available ? 'bg-[#22c55e]' : 'bg-[#ef4444]'}`} />
          )}

          <motion.button
            onClick={handleHeart}
            whileTap={{ scale: 0.75 }}
            className={`absolute top-3 z-20 grid h-8 w-8 place-items-center rounded-full bg-white/92 shadow-md backdrop-blur-sm transition hover:bg-white ${isRTL ? 'left-3' : 'right-3'}`}
            aria-label={fav ? t('card_removed_wishlist') : t('card_added_wishlist')}
          >
            <motion.span animate={fav ? { scale: [1, 1.6, 1] } : {}}>
              <Heart size={14} className={fav ? 'fill-rose-500 text-rose-500' : 'text-gray-400'} />
            </motion.span>
          </motion.button>

          {/* Professional quick view: magnifying-glass action opens complete details without leaving the list. */}
          <motion.button
            onClick={() => setQuickOpen(true)}
            whileTap={{ scale: 0.86 }}
            className={`absolute bottom-3 z-20 flex h-8 items-center gap-1.5 rounded-full bg-white/95 px-2.5 text-[10px] font-black text-slate-700 shadow-md backdrop-blur-sm transition hover:bg-[#B5E92E] hover:text-[#071016] ${isRTL ? 'right-3' : 'left-3'}`}
            aria-label={t('quick_view_open')}
            title={t('quick_view_open')}
          >
            <Search size={12} />
            <span className="hidden sm:inline">{t('quick_view')}</span>
          </motion.button>

          <motion.button
            onClick={handleCompare}
            whileTap={{ scale: 0.85 }}
            className={`absolute bottom-3 z-20 flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[10px] font-black shadow-md backdrop-blur-sm transition ${isRTL ? 'left-3' : 'right-3'} ${
              compared
                ? 'bg-[#B5E92E] text-[#071016]'
                : 'bg-white/90 text-slate-600 opacity-0 group-hover:opacity-100 focus:opacity-100'
            }`}
            aria-label={t('nav_compare')}
          >
            <GitCompare size={11} />
            {compared ? t('compare_selected') : t('nav_compare')}
          </motion.button>
        </div>

        <div className="p-4">
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

          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              [Settings2, localizeVehicleValue(car.transmission, lang)],
              [Fuel, localizeVehicleValue(car.fuelType, lang)],
              [Users, car.seats ? `${car.seats} ${t('card_seats')}` : null],
            ].filter(([, v]) => Boolean(v)).map(([Icon, label]) => (
              <span key={label} className="flex items-center gap-1 rounded-md border border-[#f0f0f0] bg-[#f8fafc] px-2 py-0.5 text-[10px] text-[#64748b]">
                <Icon size={9} />{label}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-end justify-between border-t border-[#f0f2ef] pt-3">
            <div>
              <p className="text-[10px] text-[#94a3b8]">{isRent ? t('search_rent') : t('search_buy')}</p>
              <p className="text-[18px] font-black text-[#0f172a]">
                {format(car.price)}
                {isRent && <span className="text-[11px] font-normal text-[#94a3b8]">{t('card_per_day')}</span>}
              </p>
            </div>
            <a
              href={href}
              className={`rounded-xl px-3.5 py-2 text-[11px] font-black transition ${
                car.available !== false
                  ? 'bg-[#0e1418] text-white hover:bg-[#B5E92E] hover:text-[#071016]'
                  : 'pointer-events-none bg-gray-100 text-gray-400'
              }`}
            >
              {isRent ? (car.available ? t('rent_view_book') : t('rent_unavailable')) : t('card_view')}
            </a>
          </div>
        </div>

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

      <CarQuickView car={car} open={quickOpen} onClose={() => setQuickOpen(false)} />
    </>
  )
}
