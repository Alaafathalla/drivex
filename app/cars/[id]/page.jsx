'use client'

import { use, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Loader2, MapPin, Phone, Share2, ShieldCheck, Star } from 'lucide-react'
import { CarGallery } from '@/features/cars/components/CarGallery'
import { CarSpecifications } from '@/features/cars/components/CarSpecifications'
import { CarFeatures } from '@/features/cars/components/CarFeatures'
import { CarCard } from '@/features/cars/components/CarCard'
import { carService } from '@/services/carService'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { useCurrency } from '@/context/CurrencyContext'
import { useLang } from '@/context/LangContext'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(n => (
        <svg key={n} className={`h-4 w-4 ${n <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-[12px] font-bold text-gray-700">{rating}</span>
    </div>
  )
}

export default function CarDetailPage({ params }) {
  const { id } = use(params)
  const [car,     setCar]     = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [tab,     setTab]     = useState('overview')

  const { toggle, isFav } = useFavorites()
  const toast = useToast()
  const { format } = useCurrency()
  const { t, isRTL } = useLang()
  const fav = isFav(String(id))

  useEffect(() => {
    setLoading(true)
    Promise.all([carService.getCarById(id), carService.getRelatedCars(id)])
      .then(([c, r]) => { setCar(c); setRelated(r) })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="animate-spin text-green-500" size={36} />
    </div>
  )
  if (error || !car) return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <p className="text-[18px] font-bold text-red-500">{error || t('detail_not_found')}</p>
      <a href="/cars" className="rounded-full bg-green-600 px-6 py-2.5 text-[13px] font-bold text-white">{t('detail_back')}</a>
    </div>
  )

  const isRent = car.listingType === 'rent'

  const TABS = [
    { key: 'overview',  label: t('detail_tab_overview') },
    { key: 'specs',     label: t('detail_tab_specs') },
    { key: 'features',  label: t('detail_tab_features') },
  ]

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white">
        <div className="w-full px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[12px] text-gray-400">
            <a href="/" className="hover:text-green-600 transition">{t('detail_home')}</a>
            <span>/</span>
            <a href="/cars" className="hover:text-green-600 transition">{t('detail_cars')}</a>
            <span>/</span>
            <span className="text-gray-700 font-medium">{car.brand} {car.model}</span>
          </nav>
        </div>
      </div>

      <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* ── Left column ── */}
          <div className="min-w-0">
            <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.4 }}
              className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                    isRent ? 'bg-blue-100 text-blue-700' : car.condition === 'New' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {isRent ? t('detail_for_rent') : `${car.condition} · ${t('detail_for_sale')}`}
                  </span>
                  {car.available && isRent && (
                    <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      {t('detail_available')}
                    </span>
                  )}
                </div>
                <h1 className="mt-2 text-[clamp(24px,3.5vw,38px)] font-black text-gray-900 leading-tight">
                  {car.brand} {car.model}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-[13px] text-gray-500">
                  {car.rating && <StarRating rating={car.rating} />}
                  <span className="text-gray-300">·</span>
                  <span className="flex items-center gap-1"><MapPin size={13} />{car.city}, {car.country}</span>
                  <span className="text-gray-300">·</span>
                  <span>{car.year}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <motion.button whileTap={{ scale:.88 }}
                  onClick={() => { toggle(String(id)); toast({ message: fav ? t('detail_wishlist_remove') : `${car.brand} ${car.model} ${t('detail_wishlist_add')}`, type: fav ? 'info' : 'fav' }) }}
                  className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-rose-300">
                  <Heart size={18} className={fav ? 'fill-rose-500 text-rose-500' : 'text-gray-400'} />
                </motion.button>
                <button onClick={() => { navigator.share?.({ url: window.location.href }).catch(() => {}); toast({ message: t('detail_link_copied'), type: 'success' }) }}
                  className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-green-300">
                  <Share2 size={18} className="text-gray-400" />
                </button>
              </div>
            </motion.div>

            {/* Gallery */}
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.45, delay:.08 }}>
              <CarGallery images={car.images} />
            </motion.div>

            {/* Tabs */}
            <div className="mt-7">
              <div className="flex gap-1 rounded-2xl border border-gray-200 bg-gray-50 p-1 w-fit">
                {TABS.map(({ key, label }) => (
                  <button key={key} onClick={() => setTab(key)}
                    className={`rounded-xl px-4 py-2 text-[13px] font-bold transition ${tab === key ? 'bg-white text-green-700 shadow border border-gray-200' : 'text-gray-500 hover:text-gray-800'}`}>
                    {label}
                  </button>
                ))}
              </div>

              <motion.div key={tab} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:.25 }} className="mt-5">
                {tab === 'overview' && (
                  <div>
                    <p className="text-[15px] leading-8 text-gray-600">{car.description}</p>
                    {car.owner && (
                      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{t('detail_listed_by')}</p>
                          <p className="mt-1 font-bold text-gray-900">{car.owner.name}</p>
                          <p className="text-[12px] text-gray-500">{car.owner.email}</p>
                        </div>
                        <div className="flex gap-2">
                          <a href={`tel:${car.owner.phone}`}
                            className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2.5 text-[13px] font-bold text-white hover:bg-green-500 transition">
                            <Phone size={14} /> {t('detail_call')}
                          </a>
                          <button className="rounded-full border border-gray-200 px-4 py-2.5 text-[13px] font-semibold text-gray-700 hover:border-green-400 transition">
                            {t('detail_message')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {tab === 'specs'    && <CarSpecifications car={car} />}
                {tab === 'features' && <CarFeatures features={car.features} />}
              </motion.div>
            </div>

            {/* Related cars */}
            {related.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-5 text-[20px] font-black text-gray-900">{t('detail_related')}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
                </div>
              </div>
            )}
          </div>

          {/* ── Right sidebar ── */}
          <motion.aside initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:.45, delay:.12 }}
            className="h-fit lg:sticky lg:top-[84px]">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              {/* Price */}
              <div className="border-b border-gray-100 p-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  {isRent ? t('detail_rental_price') : t('detail_sale_price')}
                </p>
                <div className="mt-1 flex items-end gap-2">
                  <p className="text-[36px] font-black text-green-600">{format(car.price)}</p>
                  {isRent && <p className="mb-1.5 text-[14px] text-gray-400">{t('detail_per_day')}</p>}
                </div>
                {isRent && car.weeklyPrice && (
                  <p className="text-[12px] text-gray-400">
                    {format(car.weeklyPrice)}{t('detail_per_week')} · {format(car.monthlyPrice)}{t('detail_per_month')}
                  </p>
                )}
                {!isRent && car.financing?.available && (
                  <p className="mt-1 text-[12px] text-gray-400">
                    {t('detail_finance_from')} {format(car.financing.monthlyFrom)}{t('detail_per_mo')}
                  </p>
                )}
              </div>

              {/* Key info */}
              <div className="grid grid-cols-2 gap-px bg-gray-100 p-px">
                {(isRent ? [
                  [t('detail_deposit'),      format(car.deposit)],
                  [t('detail_min_days'),     car.minRentalDays],
                  [t('detail_pickup'),       car.location],
                  [t('detail_availability'), car.available ? t('detail_avail_now') : t('detail_avail_booked')],
                ] : [
                  [t('detail_cond_label'),   car.condition],
                  [t('detail_mileage'),      `${car.mileage?.toLocaleString()} ${t('km_unit')}`],
                  [t('detail_location'),     car.city],
                  [t('detail_financing'),    car.financing?.available ? t('detail_fin_avail') : '—'],
                ]).map(([k, v]) => (
                  <div key={k} className="bg-white px-4 py-3">
                    <p className="text-[10px] text-gray-400">{k}</p>
                    <p className="mt-0.5 text-[13px] font-bold text-gray-900 truncate">{v}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-5 flex flex-col gap-3">
                {isRent ? (
                  <a href={`/cars/${car.id}/rent`}
                    className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-green-600 text-[14px] font-bold text-white transition hover:bg-green-500 shadow-sm shadow-green-200">
                    {t('detail_book_now')} <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
                  </a>
                ) : (
                  <>
                    <a href={`mailto:${car.owner?.email}`}
                      className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-green-600 text-[14px] font-bold text-white transition hover:bg-green-500">
                      {t('detail_contact_seller')} <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
                    </a>
                    {car.financing?.available && (
                      <a href="/calculator"
                        className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 text-[13px] font-semibold text-gray-700 hover:border-green-400 transition">
                        {t('detail_apply_finance')}
                      </a>
                    )}
                  </>
                )}
                <div className="flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-2.5">
                  <ShieldCheck size={15} className="shrink-0 text-green-600" />
                  <p className="text-[12px] text-green-700 font-medium">{t('detail_verified')}</p>
                </div>
              </div>
            </div>

            {/* Seller card */}
            {!isRent && car.owner && (
              <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">{t('detail_seller')}</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-[16px] font-black text-green-700">
                    {car.owner.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{car.owner.name}</p>
                    <p className="text-[12px] text-gray-400">{car.owner.preferredContact === 'phone' ? car.owner.phone : car.owner.email}</p>
                  </div>
                </div>
                <a href={`tel:${car.owner.phone}`}
                  className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 text-[13px] font-bold text-green-700 hover:bg-green-100 transition">
                  <Phone size={14} /> {car.owner.phone}
                </a>
              </div>
            )}
          </motion.aside>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 z-30 border-t border-gray-100 bg-white px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,.07)] lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
          <div>
            <p className="text-[11px] text-gray-400">{isRent ? t('detail_from') : t('detail_price')}</p>
            <p className="text-[20px] font-black text-green-600">
              {format(car.price)}{isRent && <span className="text-[12px] text-gray-400 font-normal">{t('detail_per_day')}</span>}
            </p>
          </div>
          <a href={isRent ? `/cars/${car.id}/rent` : `mailto:${car.owner?.email}`}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-green-600 text-[14px] font-bold text-white">
            {isRent ? t('detail_book_now') : t('detail_contact_seller')} <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
          </a>
        </div>
      </div>
    </div>
  )
}
