'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trash2 } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { useLang } from '@/context/LangContext'
import { CARS, RENTALS } from '@/lib/api'

const KEY = 'drivex_favorites'

export default function FavoritesPage() {
  const { t } = useLang()
  const [slugs, setSlugs] = useState([])

  useEffect(() => {
    try { setSlugs(JSON.parse(localStorage.getItem(KEY) || '[]')) } catch {}
  }, [])

  const remove = (slug) => {
    setSlugs(s => {
      const next = s.filter(x => x !== slug)
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  const allItems = [...CARS, ...RENTALS]
  const savedItems = allItems.filter(c => slugs.includes(c.slug))

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto max-w-[1200px] px-5 pb-20 pt-28 sm:px-8 lg:px-10">
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }}
          className="flex items-center justify-between border-b border-border pb-7">
          <div>
            <h1 className="text-3xl font-black">{t('favorites_title')}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{savedItems.length} {t('buy_vehicles')}</p>
          </div>
          <Heart size={28} className={savedItems.length > 0 ? 'fill-accent text-accent' : 'text-muted-foreground'} />
        </motion.div>

        <AnimatePresence>
          {savedItems.length === 0 ? (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="flex flex-col items-center justify-center gap-5 py-24 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                <Heart size={32} className="text-accent" />
              </div>
              <p className="text-xl font-black">{t('favorites_empty')}</p>
              <a href="/cars"
                className="cursor-pointer rounded-[5px] bg-accent px-6 py-3 text-sm font-black text-black transition hover:bg-[#50f14d]">
                {t('favorites_browse')}
              </a>
            </motion.div>
          ) : (
            <motion.div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {savedItems.map((car, i) => {
                const isRent = car.type === 'rent'
                const href = isRent ? `/rentals/${car.slug}` : `/cars/${car.slug}`
                return (
                  <motion.div key={car.slug}
                    initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:0.95 }}
                    transition={{ duration:0.35, delay: i*0.06 }}
                    layout
                    className="group overflow-hidden rounded-[7px] border border-border bg-card">
                    <a href={href} className="relative block aspect-[1.35] overflow-hidden">
                      <img src={car.image} alt={car.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute start-3 top-3 rounded-[3px] bg-[#2ee52b] px-2 py-1 text-[9px] font-black text-black">
                        {isRent ? t('card_for_rent') : t('card_for_sale')}
                      </span>
                    </a>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-black">{car.name}</h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {car.year} · {isRent ? `${car.seats} ${t('rent_seats')}` : `${car.mileage?.toLocaleString()} ${t('card_km')}`}
                          </p>
                        </div>
                        <button onClick={() => remove(car.slug)}
                          className="cursor-pointer mt-0.5 text-muted-foreground transition hover:text-red-400">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                        <p className="font-black text-accent">
                          {isRent ? `$${car.pricePerDay} ${t('rent_per_day')}` : `$${car.price?.toLocaleString()}`}
                        </p>
                        <a href={href} className="cursor-pointer text-xs font-bold text-accent hover:underline">
                          {t('buy_view_details')}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <SiteFooter />
    </main>
  )
}
