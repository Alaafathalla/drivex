'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MoreHorizontal, Plus } from 'lucide-react'
import { useLang } from '@/context/LangContext'

const MY_CARS = [
  { title: '2023 BMW M4 Competition', status: 'mycars_active',   price: '429,000', views: 512,  img: '1555215695-3004980ad54e' },
  { title: '2022 Audi A6',            status: 'mycars_pending',  price: '219,000', views: 124,  img: '1492144534655-ae79c964c9d7' },
]

const STATUS_COLORS = {
  mycars_active:  'bg-accent/15 text-accent',
  mycars_pending: 'bg-yellow-500/15 text-yellow-400',
  mycars_sold:    'bg-white/10 text-white/50',
}

export default function MyCarsPage() {
  const { t } = useLang()

  return (
    <main className="min-h-screen bg-background">
<section className="w-full mx-auto max-w-[1600px] px-4 pb-20 sm:px-8 lg:px-10">

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }}
          className="flex items-end justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-accent">Account</p>
            <h1 className="mt-2 text-4xl font-black">{t('mycars_title')}</h1>
          </div>
          <a href="/sell"
            className="cursor-pointer flex items-center gap-2 rounded-[5px] bg-accent px-4 py-3 text-sm font-black text-black transition hover:bg-[#50f14d]">
            <Plus size={16} /> {t('mycars_add')}
          </a>
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45, delay:0.1 }}
          className="mt-8 overflow-hidden rounded-[7px] border border-border bg-card">
          <AnimatePresence>
            {MY_CARS.map(({ title, status, price, views, img }, i) => (
              <motion.div key={title}
                initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-5 border-b border-border p-5 last:border-0 sm:flex-row sm:items-center">
                <div className="h-28 w-full overflow-hidden rounded-[5px] sm:w-44 shrink-0">
                  <img
                    className="h-full w-full object-cover"
                    src={`https://images.unsplash.com/photo-${img}?auto=format&fit=crop&w=700&q=80`}
                    alt={title}
                  />
                </div>
                <div className="flex-1">
                  <span className={`inline-block rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[.1em] ${STATUS_COLORS[status]}`}>
                    {t(status)}
                  </span>
                  <h2 className="mt-2 font-black">{title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    ${price} · {views} {t('mycars_views')}
                  </p>
                </div>
                <button className="cursor-pointer grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-accent hover:text-accent">
                  <MoreHorizontal size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section></main>
  )
}
