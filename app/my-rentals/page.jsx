'use client'

import { motion } from 'framer-motion'
import { CalendarDays, MapPin } from 'lucide-react'
import { useLang } from '@/context/LangContext'

const MY_RENTALS = [
  { name: 'Range Rover Sport', status: 'myrentals_upcoming',  dates: '18–22 Aug 2026', location: 'Dubai Marina', price: '2,800', img: '1606664515524-ed2f786a0bd6' },
  { name: 'Mercedes C-Class',  status: 'myrentals_completed', dates: '12–15 Jul 2026', location: 'Dubai Mall',   price: '1,440', img: '1618843479313-40f8afb4b4d8' },
]

const STATUS_COLORS = {
  myrentals_upcoming:  'bg-accent/15 text-accent',
  myrentals_completed: 'bg-white/10 text-white/50',
}

export default function MyRentalsPage() {
  const { t } = useLang()

  return (
    <main className="min-h-screen bg-background">
<section className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-8 lg:px-10">

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }}>
          <p className="text-xs font-black uppercase tracking-[.18em] text-accent">Account</p>
          <h1 className="mt-2 text-4xl font-black">{t('myrentals_title')}</h1>
        </motion.div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {MY_RENTALS.map(({ name, status, dates, location, price, img }, i) => (
            <motion.article key={name}
              initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.4, delay: i * 0.1 }}
              whileHover={{ y:-3 }}
              className="overflow-hidden rounded-[7px] border border-border bg-card">
              <div className="aspect-[2] overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${img}?auto=format&fit=crop&w=900&q=80`}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className={`inline-block rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[.1em] ${STATUS_COLORS[status]}`}>
                  {t(status)}
                </span>
                <h2 className="mt-3 text-xl font-black">{name}</h2>
                <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays size={14} /> {dates}
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={14} /> {location}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <p className="text-lg font-black text-accent">${price}</p>
                  {status === 'myrentals_upcoming' && (
                    <button className="cursor-pointer rounded-[5px] border border-border px-4 py-2 text-xs font-bold transition hover:border-red-400 hover:text-red-400">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section></main>
  )
}
