'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, ShieldCheck, Star, Mail } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { api, CARS } from '@/lib/api'

export default function DealerDetailsPage({ params }) {
  const { t } = useLang()
  const [dealer, setDealer] = useState(null)
  const [inventory, setInventory] = useState([])

  useEffect(() => {
    const slug = typeof params === 'object' && !params.then ? params.slug : null
    if (!slug) return
    api.getDealerBySlug(slug).then(d => {
      if (d) {
        setDealer(d)
        setInventory(CARS.filter(c => d.inventory?.includes(c.id)))
      }
    })
  }, [params])

  if (!dealer) return (
    <main className="min-h-screen bg-background">
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    </main>
  )

  return (
    <main className="min-h-screen bg-background">

      <section className="w-full mx-auto max-w-[1600px] px-4 pb-16 pt-28 sm:px-8 lg:px-10">
        {/* Dealer card */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
          className="rounded-[8px] border border-border bg-card p-7 md:p-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
            <div>
              <div className="flex items-center gap-2 text-accent">
                <ShieldCheck size={16} />
                <span className="text-xs font-black uppercase tracking-[.15em]">{t('dealers_verified')}</span>
              </div>
              <h1 className="mt-3 text-4xl font-black tracking-[-.04em]">{dealer.name}</h1>
              <p className="mt-2 flex items-center gap-2 text-muted-foreground">
                <MapPin size={15} /> {dealer.address}
              </p>
              <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{dealer.description}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
              <a href={`tel:${dealer.phone}`}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-[5px] bg-accent px-4 py-3 text-sm font-black text-black transition hover:bg-[#50f14d]">
                <Phone size={15} /> {t('dealers_call')}
              </a>
              <a href={`mailto:${dealer.email}`}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-[5px] border border-border px-4 py-3 text-sm font-black transition hover:border-accent">
                <Mail size={15} /> {t('dealers_message')}
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-8 border-t border-border pt-6 text-sm">
            <span className="flex items-center gap-2 font-bold">
              <Star className="fill-accent text-accent" size={15} /> {dealer.rating} {t('dealers_rating')}
            </span>
            <span className="font-bold">{dealer.totalCars} {t('dealers_cars')}</span>
            <span className="text-muted-foreground">{t('dealers_member')} {dealer.since}</span>
            {dealer.specialties?.map(s => (
              <span key={s} className="rounded-full border border-border px-3 py-1 text-xs font-bold text-accent">{s}</span>
            ))}
          </div>
        </motion.div>

        {/* Inventory */}
        {inventory.length > 0 && (
          <div className="mt-14">
            <motion.h2 initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
              transition={{ duration:0.4 }}
              className="mb-6 text-2xl font-black">{t('dealers_inventory')}</motion.h2>
            <div className="grid gap-5 md:grid-cols-3">
              {inventory.map((car, i) => (
                <motion.a key={car.id} href={`/cars/${car.slug}`}
                  initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                  transition={{ delay: i*0.07 }}
                  whileHover={{ y:-4 }}
                  className="group cursor-pointer overflow-hidden rounded-[7px] border border-border bg-card transition hover:border-accent/50">
                  <div className="aspect-[1.45] overflow-hidden">
                    <img src={car.image} alt={car.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-black">{car.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{car.year} · {car.mileage?.toLocaleString()} km</p>
                    <p className="mt-3 text-lg font-black text-accent">${car.price?.toLocaleString()}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
