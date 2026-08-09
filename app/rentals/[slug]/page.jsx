'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Check, Fuel, Gauge, Settings2, Users } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { api } from '@/lib/api'

export default function RentalDetailsPage({ params }) {
  const { t } = useLang()
  const [car, setCar] = useState(null)
  const [activeImg, setActiveImg] = useState(0)
  const [pickup, setPickup] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    const slug = typeof params === 'object' && !params.then ? params.slug : null
    if (!slug) return
    api.getRentalBySlug(slug).then(data => { if (data) setCar(data) })
  }, [params])

  if (!car) return (
    <main className="min-h-screen bg-background">
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    </main>
  )

  const specsRow = [
    [Settings2, car.transmission],
    [Users,     `${car.seats} ${t('rent_seats')}`],
    [Fuel,      car.fuel],
    [Gauge,     'Unlimited km'],
  ]

  const days = (() => {
    if (!pickup || !returnDate) return 1
    const d = Math.max(1, Math.round((new Date(returnDate) - new Date(pickup)) / 86400000))
    return d
  })()

  return (
    <main className="min-h-screen bg-background">

      <section className="mx-auto max-w-[1450px] px-5 pb-20 pt-28 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_.8fr]">
          {/* Left */}
          <motion.div initial={{ opacity:0, x:-24 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.5 }}>
            {/* Main image */}
            <div className="relative aspect-[1.65] overflow-hidden rounded-[7px] bg-[#111]">
              <motion.img
                key={activeImg}
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                transition={{ duration:0.3 }}
                src={car.gallery?.[activeImg] || car.image}
                alt={car.name}
                className="h-full w-full object-cover"
              />
              <span className={`absolute start-4 top-4 rounded-[3px] px-3 py-1 text-[9px] font-black ${
                car.available ? 'bg-[#2ee52b] text-black' : 'bg-red-500 text-white'
              }`}>
                {car.available ? t('rent_available') : t('rent_unavailable')}
              </span>
            </div>
            {/* Thumbnails */}
            {car.gallery?.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {car.gallery.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`cursor-pointer h-16 w-24 shrink-0 overflow-hidden rounded-[4px] border-2 transition ${
                      activeImg === i ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}>
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Info */}
            <div className="mt-8">
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-accent">{t('rent_eyebrow')}</p>
              <h1 className="mt-2 text-3xl font-black tracking-[-.04em]">{car.name}</h1>
              <p className="mt-3 leading-7 text-muted-foreground">{car.description}</p>
            </div>

            {/* Spec pills */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {specsRow.map(([Icon, label]) => (
                <div key={label} className="flex flex-col gap-2 rounded-[6px] border border-border bg-card p-4">
                  <Icon size={18} className="text-accent" />
                  <p className="text-sm font-bold">{label}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            {car.features?.length > 0 && (
              <div className="mt-8 border-t border-border pt-6">
                <h3 className="mb-4 font-black">{t('detail_features')}</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {car.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm">
                      <Check size={15} className="shrink-0 text-accent" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Booking sidebar */}
          <motion.aside initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.5, delay:0.15 }}
            className="h-fit rounded-[7px] border border-border bg-card p-7 lg:sticky lg:top-24">
            <p className="text-sm text-muted-foreground">{t('buy_from')}</p>
            <p className="mt-1 text-4xl font-black text-accent">
              ${car.pricePerDay} <span className="text-sm font-normal text-muted-foreground">{t('rent_per_day')}</span>
            </p>

            <div className="mt-6 grid gap-4">
              <label className="block text-xs font-black uppercase tracking-[.1em] text-muted-foreground">
                {t('rent_from_date')}
                <div className="mt-2 flex h-12 items-center gap-3 rounded-[5px] border border-border bg-background px-4">
                  <CalendarDays size={15} className="shrink-0 text-accent" />
                  <input type="date" value={pickup} onChange={e => setPickup(e.target.value)}
                    className="flex-1 bg-transparent text-sm font-medium normal-case tracking-normal outline-none" />
                </div>
              </label>
              <label className="block text-xs font-black uppercase tracking-[.1em] text-muted-foreground">
                {t('rent_until_date')}
                <div className="mt-2 flex h-12 items-center gap-3 rounded-[5px] border border-border bg-background px-4">
                  <CalendarDays size={15} className="shrink-0 text-accent" />
                  <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)}
                    className="flex-1 bg-transparent text-sm font-medium normal-case tracking-normal outline-none" />
                </div>
              </label>
              <label className="block text-xs font-black uppercase tracking-[.1em] text-muted-foreground">
                {t('rent_pickup')}
                <input type="text" value={location} onChange={e => setLocation(e.target.value)}
                  placeholder="Dubai Marina"
                  className="mt-2 h-12 w-full rounded-[5px] border border-border bg-background px-4 text-sm normal-case tracking-normal outline-none focus:border-accent" />
              </label>
            </div>

            {days > 1 && (
              <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} className="mt-4 rounded-[5px] bg-accent/10 px-4 py-3 text-sm">
                <span className="font-black text-accent">{days} {t('rent_days')}</span>
                <span className="mx-2 text-muted-foreground">·</span>
                <span className="font-black">${(car.pricePerDay * days).toLocaleString()} {t('rent_per_day').replace('/','')}</span>
              </motion.div>
            )}

            <button disabled={!car.available}
              className="mt-6 h-12 w-full cursor-pointer rounded-[5px] bg-accent font-black text-black transition hover:bg-[#50f14d] disabled:cursor-not-allowed disabled:opacity-50">
              {t('rent_book_now')}
            </button>
            <p className="mt-4 text-center text-xs text-muted-foreground">{t('rent_free_cancel')}</p>

            <div className="mt-6 grid gap-2 border-t border-border pt-5 text-xs text-muted-foreground">
              <div className="flex justify-between"><span>{t('rent_deposit')}</span><span className="font-bold text-foreground">${car.deposit}</span></div>
              <div className="flex justify-between"><span>{t('rent_min_days')}</span><span className="font-bold text-foreground">{car.minDays} {t('rent_days')}</span></div>
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  )
}
