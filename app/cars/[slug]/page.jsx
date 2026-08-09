'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Gauge, Heart, MapPin, Share2, ShieldCheck, Check } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { useLang } from '@/context/LangContext'
import { api } from '@/lib/api'

export default function CarDetailsPage({ params }) {
  const { t } = useLang()
  const [car, setCar] = useState(null)
  const [similar, setSimilar] = useState([])
  const [activeImg, setActiveImg] = useState(0)
  const [fav, setFav] = useState(false)
  const [tab, setTab] = useState('overview')

  useEffect(() => {
    params.then?.(p => p).catch(() => params).then?.(undefined)
    const slug = typeof params === 'object' && params.then ? null : params.slug
    if (!slug) return
    api.getCarBySlug(slug).then(data => { if (data) { setCar(data); setActiveImg(0) } })
    api.getSimilarCars(slug, 4).then(setSimilar)
  }, [params])

  if (!car) return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">{t('loading')}</p>
        </div>
      </div>
    </main>
  )

  const specs = [
    [t('detail_year'),   car.year],
    [t('detail_mileage'), `${car.mileage?.toLocaleString()} km`],
    [t('detail_engine'), car.engine],
    [t('detail_trans'),  car.transmission],
    [t('detail_fuel'),   car.fuel],
    [t('detail_drive'),  car.drive],
    [t('detail_color'),  car.color],
    [t('detail_seats'),  car.seats],
  ]

  const tabs = ['overview', 'specs', 'features']

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      {/* Gallery + title */}
      <section className="bg-[#070908] pt-[72px] text-white">
        <div className="mx-auto max-w-[1450px] px-5 py-8 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }}
            className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-accent">{t('detail_verified')}</p>
              <h1 className="mt-2 text-[clamp(28px,4vw,52px)] font-black leading-tight tracking-[-.045em]">{car.name}</h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/45">
                <MapPin size={14} /> {car.location} · {car.year} · {car.mileage?.toLocaleString()} km
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setFav(v => !v)}
                className="cursor-pointer grid h-11 w-11 place-items-center border border-white/15 transition hover:border-accent">
                <Heart size={17} className={fav ? 'fill-accent text-accent' : ''} />
              </button>
              <button className="cursor-pointer grid h-11 w-11 place-items-center border border-white/15 transition hover:border-accent">
                <Share2 size={17} />
              </button>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }}
            className="grid gap-2 lg:grid-cols-[1.4fr_.6fr]">
            <div className="relative aspect-[1.55] overflow-hidden rounded-[6px] bg-[#111]">
              <motion.img
                key={activeImg}
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                transition={{ duration:0.35 }}
                src={car.gallery?.[activeImg] || car.image}
                alt={car.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-2">
              {(car.gallery || [car.image]).slice(0, 3).map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`cursor-pointer overflow-hidden rounded-[6px] border-2 transition ${
                    activeImg === i ? 'border-accent' : 'border-transparent'
                  }`}>
                  <img src={img} alt="" className="aspect-[1.6] w-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto grid max-w-[1450px] gap-8 px-5 py-12 lg:grid-cols-[1.25fr_.75fr] lg:px-10">
        <div>
          {/* Tabs */}
          <div className="flex gap-1 border-b border-border">
            {tabs.map(tab_ => (
              <button key={tab_} onClick={() => setTab(tab_)}
                className={`cursor-pointer border-b-2 px-5 py-3 text-[12px] font-black uppercase tracking-[.08em] transition ${
                  tab === tab_ ? 'border-accent text-accent' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}>
                {t(`detail_${tab_}`)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.25 }}>
              {tab === 'overview' && (
                <div className="pt-7">
                  <h2 className="text-2xl font-black tracking-[-.04em]">{t('detail_performance')}</h2>
                  <div className="mt-6 grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
                    {[[car.engine, t('detail_engine')],[car.power, t('detail_power')],[car.drive, t('detail_drive')],[car.transmission, t('detail_trans')]].map(([val,label]) => (
                      <div key={label} className="bg-background p-5">
                        <p className="text-lg font-black">{val}</p>
                        <p className="mt-2 text-[9px] uppercase tracking-[.13em] text-muted-foreground">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 border-t border-border pt-6">
                    <h3 className="text-lg font-black">{t('detail_highlights')}</h3>
                    <p className="mt-3 leading-7 text-muted-foreground">{car.description}</p>
                  </div>
                </div>
              )}
              {tab === 'specs' && (
                <div className="pt-7">
                  <div className="grid gap-px bg-border sm:grid-cols-2">
                    {specs.map(([label, val]) => (
                      <div key={label} className="flex items-center justify-between bg-background px-5 py-4">
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="text-sm font-bold">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tab === 'features' && (
                <div className="pt-7">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(car.features || []).map(f => (
                      <div key={f} className="flex items-center gap-3 rounded-[5px] border border-border px-4 py-3">
                        <Check size={15} className="shrink-0 text-accent" />
                        <span className="text-sm font-semibold">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Similar cars */}
          {similar.length > 0 && (
            <div className="mt-14">
              <h3 className="mb-5 text-xl font-black">{t('detail_similar')}</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {similar.map((s, i) => (
                  <motion.a key={s.id} href={`/cars/${s.slug}`}
                    initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                    transition={{ delay: i*0.06 }}
                    className="group flex gap-4 overflow-hidden rounded-[6px] border border-border bg-card p-3 transition hover:border-accent/50">
                    <img src={s.image} alt={s.name} className="h-20 w-28 shrink-0 rounded-[4px] object-cover transition group-hover:scale-105" />
                    <div className="min-w-0">
                      <h4 className="truncate font-black">{s.name}</h4>
                      <p className="mt-1 text-xs text-muted-foreground">{s.year} · {s.mileage?.toLocaleString()} km</p>
                      <p className="mt-2 font-black text-accent">${s.price?.toLocaleString()}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <motion.aside initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.5, delay:0.2 }}
          className="h-fit rounded-[7px] border border-border bg-card p-7 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[.14em] text-muted-foreground">{t('detail_asking')}</p>
            <ShieldCheck className="text-accent" size={19} />
          </div>
          <p className="mt-3 text-4xl font-black">${car.price?.toLocaleString()}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t('detail_finance')} $4,590 {t('detail_month')}</p>
          <button className="mt-7 w-full cursor-pointer rounded-[5px] bg-accent py-4 text-sm font-black text-black transition hover:bg-[#50f14d]">
            {t('detail_test_drive')}
          </button>
          <button className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[5px] border border-border py-4 text-sm font-black transition hover:border-accent">
            {t('detail_contact')} <ArrowRight size={15} />
          </button>
          <div className="mt-7 border-t border-border pt-6 grid gap-3">
            <p className="flex items-center gap-2 text-sm font-bold">
              <Gauge size={16} className="text-accent" /> {t('detail_inspection')}
            </p>
            <p className="flex items-center gap-2 text-sm font-bold">
              <ShieldCheck size={16} className="text-accent" /> {t('dealers_verified')}
            </p>
            {car.dealer && (
              <div className="mt-2 border-t border-border pt-4">
                <p className="text-[10px] uppercase tracking-[.1em] text-muted-foreground">{t('detail_dealer')}</p>
                <a href={`/dealers/${car.dealerSlug}`} className="mt-2 block font-black text-accent hover:underline">
                  {car.dealer}
                </a>
              </div>
            )}
          </div>
        </motion.aside>
      </section>

      <SiteFooter />
    </main>
  )
}
