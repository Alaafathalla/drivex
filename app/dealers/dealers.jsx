'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CarFront, MapPin, ShieldCheck, Star } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
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
      <PageHero
        eyebrow={t('dealers_eyebrow')}
        title={t('dealers_title')}
        description={t('dealers_desc')}
        image="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=2200&q=86"
      >
        <div className="mt-8 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[.18em] text-white/65">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Verified sellers</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Trusted network</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Premium service</span>
        </div>
      </PageHero>

      <section className="w-full px-4 py-14 sm:px-6 lg:px-8 xl:px-12">
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
