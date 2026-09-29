'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, Calendar, Car, CheckCircle2, Fuel, Gauge, Heart, Loader2,
  MapPin, Search, Settings2, Share2, ShieldCheck, Users, X,
} from 'lucide-react'
import { carService } from '@/services/carService'
import { useCurrency } from '@/context/CurrencyContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { useLang } from '@/context/LangContext'
import { localizeVehicleFeature, localizeVehicleValue } from '@/lib/vehicle-i18n'

export function CarQuickView({ car, open, onClose }) {
  const { t, lang, isRTL } = useLang()
  const { format } = useCurrency()
  const { toggle, isFav } = useFavorites()
  const toast = useToast()
  const [details, setDetails] = useState(car || null)
  const [loading, setLoading] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (!open || !car) return
    setDetails(car)
    setActiveImage(0)

    let alive = true
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)

    if (car.id) {
      setLoading(true)
      carService.getCarById(car.id)
        .then((full) => { if (alive && full) setDetails(full) })
        .catch(() => {})
        .finally(() => { if (alive) setLoading(false) })
    }

    return () => {
      alive = false
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, car, onClose])

  const current = details || car
  const images = useMemo(() => {
    if (!current) return []
    if (current.images?.length) return current.images
    if (current.image) return [current.image]
    return []
  }, [current])

  if (!car || !current) return null

  const id = current.id || car.id
  const fav = isFav(String(id))
  const isRent = current.listingType === 'rent'
  const href = `/cars/${id}`

  const specs = [
    [Calendar, t('spec_year'), current.year],
    [Gauge, t('spec_mileage'), current.mileage != null ? `${Number(current.mileage).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')} ${t('km_unit')}` : null],
    [Settings2, t('spec_trans'), localizeVehicleValue(current.transmission, lang)],
    [Fuel, t('spec_fuel'), localizeVehicleValue(current.fuelType, lang)],
    [Car, t('spec_body'), localizeVehicleValue(current.bodyType, lang)],
    [Users, t('spec_seats'), current.seats ? `${current.seats} ${t('card_seats')}` : null],
  ].filter(([, , value]) => value !== null && value !== undefined && value !== '')

  const share = async () => {
    const url = `${window.location.origin}${href}`
    const shareData = {
      title: `${current.brand || ''} ${current.model || ''}`.trim(),
      text: t('quick_view_share_text'),
      url,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(url)
        toast({ message: t('detail_link_copied'), type: 'success' })
      }
    } catch (error) {
      if (error?.name !== 'AbortError') toast({ message: t('quick_view_share_error'), type: 'error' })
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[220] overflow-y-auto bg-[#071016]/80 p-3 backdrop-blur-md sm:p-6"
          onMouseDown={(event) => event.target === event.currentTarget && onClose?.()}
        >
          <div className="flex min-h-full items-center justify-center">
            <motion.section
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-[0_32px_100px_rgba(0,0,0,.35)]"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <button
                onClick={onClose}
                className={`absolute top-4 z-30 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-slate-600 shadow-lg transition hover:bg-slate-100 ${isRTL ? 'left-4' : 'right-4'}`}
                aria-label={t('btn_close')}
              >
                <X size={17} />
              </button>

              <div className="grid lg:grid-cols-[1.08fr_.92fr]">
                <div className="relative min-h-[340px] bg-[#0d1419] lg:min-h-[610px]">
                  {images.length ? (
                    <img
                      src={images[Math.min(activeImage, images.length - 1)]}
                      alt={`${current.brand || ''} ${current.model || ''}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

                  <div className={`absolute top-4 flex items-center gap-2 ${isRTL ? 'right-4' : 'left-4'}`}>
                    <span className="rounded-full bg-[#B5E92E] px-3 py-1.5 text-[10px] font-black uppercase text-[#071016] shadow">
                      {isRent ? t('card_for_rent') : localizeVehicleValue(current.condition || 'Used', lang)}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur">
                      <ShieldCheck size={11} /> {t('quick_view_verified')}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    {images.length > 1 && (
                      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
                        {images.slice(0, 7).map((src, index) => (
                          <button
                            key={`${src}-${index}`}
                            onClick={() => setActiveImage(index)}
                            className={`h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${activeImage === index ? 'border-[#B5E92E]' : 'border-white/35 opacity-75 hover:opacity-100'}`}
                            aria-label={`${t('gallery_go_to_image')} ${index + 1}`}
                          >
                            <img src={src} alt="" className="h-full w-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-white/70">
                      <MapPin size={13} /> {current.city || current.location || t('quick_view_location_unknown')}
                    </p>
                    <h2 className="mt-2 text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">
                      {current.brand} {current.model}
                    </h2>
                  </div>
                </div>

                <div className="flex min-h-[560px] flex-col p-5 sm:p-7 lg:p-8">
                  <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#7d9f24]">{t('quick_view_eyebrow')}</p>
                      <p className="mt-2 text-3xl font-black tracking-[-.04em] text-[#0f172a]">
                        {format(current.price || current.pricePerDay || 0)}
                        {isRent && <span className="ms-1 text-sm font-semibold text-slate-400">{t('card_per_day')}</span>}
                      </p>
                    </div>
                    {loading && <Loader2 size={18} className="mt-1 animate-spin text-[#7d9f24]" />}
                  </div>

                  <div className="grid grid-cols-2 gap-2 py-5 sm:grid-cols-3">
                    {specs.map(([Icon, label, value]) => (
                      <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
                        <Icon size={14} className="text-[#7d9f24]" />
                        <p className="mt-3 text-[9px] font-black uppercase tracking-[.1em] text-slate-400">{label}</p>
                        <p className="mt-1 truncate text-xs font-black text-slate-800">{value}</p>
                      </div>
                    ))}
                  </div>

                  {current.description && (
                    <div className="border-t border-slate-100 py-5">
                      <p className="text-[10px] font-black uppercase tracking-[.14em] text-slate-400">{t('quick_view_about')}</p>
                      <p className="mt-2 line-clamp-4 text-sm leading-7 text-slate-600">{current.description}</p>
                    </div>
                  )}

                  {current.features?.length > 0 && (
                    <div className="border-t border-slate-100 py-5">
                      <p className="text-[10px] font-black uppercase tracking-[.14em] text-slate-400">{t('detail_tab_features')}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {current.features.slice(0, 8).map((feature) => (
                          <span key={feature} className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f7e8] px-2.5 py-1.5 text-[10px] font-bold text-[#657f1b]">
                            <CheckCircle2 size={10} /> {localizeVehicleFeature(feature, lang)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto border-t border-slate-100 pt-5">
                    <div className="mb-3 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          toggle(String(id))
                          toast({ message: fav ? t('card_removed_wishlist') : t('card_added_wishlist'), type: fav ? 'info' : 'fav' })
                        }}
                        className={`flex h-11 items-center justify-center gap-2 rounded-2xl border text-xs font-black transition ${fav ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-slate-200 text-slate-700 hover:border-rose-200 hover:text-rose-600'}`}
                      >
                        <Heart size={14} className={fav ? 'fill-current' : ''} /> {fav ? t('quick_view_saved') : t('quick_view_save')}
                      </button>
                      <button
                        onClick={share}
                        className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 text-xs font-black text-slate-700 transition hover:border-[#B5E92E]"
                      >
                        <Share2 size={14} /> {t('quick_view_share')}
                      </button>
                    </div>
                    <a
                      href={href}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0f172a] text-sm font-black text-white transition hover:bg-[#B5E92E] hover:text-[#071016]"
                    >
                      <Search size={15} /> {t('quick_view_full_details')} <ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
