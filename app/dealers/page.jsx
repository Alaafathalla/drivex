'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CarFront, MapPin, ShieldCheck, Star } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { api } from '@/lib/api'

export default function DealersPage() {
  const { t } = useLang()
  const [dealers, setDealers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getDealers().then(data => { setDealers(data); setLoading(false) })
  }, [])

  return (
    <main className="min-h-screen bg-background">
{/* Hero */}
      <section className="w-full relative overflow-hidden bg-[#070908] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(46,229,43,.12),transparent_50%)]" />
        <div className="relative mx-auto max-w-[1600px] px-4 py-16 sm:px-8 lg:px-10">
          <motion.p initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.4 }}
            className="text-[10px] font-black uppercase tracking-[.2em] text-accent">{t('dealers_eyebrow')}</motion.p>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }}
            className="mt-3 text-[clamp(30px,4.5vw,58px)] font-black leading-[.92] tracking-[-.05em]">{t('dealers_title')}</motion.h1>
          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
            className="mt-4 max-w-xl text-[15px] leading-7 text-white/55">{t('dealers_desc')}</motion.p>
        </div>
      </section>

      <section className="w-full mx-auto max-w-[1600px] px-4 py-14 sm:px-8 lg:px-10">
        <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:0.4 }}
          className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-accent">{t('dealers_network')}</p>
            <h2 className="mt-2 text-3xl font-black">{t('dealers_featured')}</h2>
          </div>
          <p className="text-sm text-muted-foreground">{t('dealers_partners')}</p>
        </motion.div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({length:4}).map((_,i) => <div key={i} className="h-56 animate-pulse rounded-[7px] bg-white/5" />)}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {dealers.map((dealer, i) => (
              <motion.a
                key={dealer.id}
                href={`/dealers/${dealer.slug}`}
                initial={{ opacity:0, y:28 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.4, delay: i * 0.07 }}
                whileHover={{ y:-4 }}
                className="group cursor-pointer rounded-[7px] border border-border bg-card p-6 transition hover:border-accent/60"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <CarFront size={24} />
                  </div>
                  <ShieldCheck className="text-accent" size={18} />
                </div>
                <h3 className="mt-6 text-xl font-black">{dealer.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={13} /> {dealer.city}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-5 text-sm">
                  <span className="flex items-center gap-1 font-bold">
                    <Star size={14} className="fill-accent text-accent" /> {dealer.rating}
                  </span>
                  <span className="text-muted-foreground">{dealer.totalCars} {t('dealers_cars')}</span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </section></main>
  )
}
