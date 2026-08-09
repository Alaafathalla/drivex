'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CalendarDays, MapPin, X } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-section'

const TABS = ['All', 'Upcoming', 'Active', 'Completed', 'Cancelled']

const bookings = [
  {
    id: 1,
    car: 'Range Rover Sport',
    status: 'Upcoming',
    dates: '18–22 Aug 2026',
    location: 'Dubai Marina',
    total: '$480',
    days: 4,
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=700&q=80',
    confirmation: 'DX-220818',
  },
  {
    id: 2,
    car: 'Mercedes C-Class',
    status: 'Completed',
    dates: '12–15 Jul 2026',
    location: 'Dubai Airport',
    total: '$255',
    days: 3,
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=700&q=80',
    confirmation: 'DX-197812',
  },
  {
    id: 3,
    car: 'Tesla Model Y',
    status: 'Completed',
    dates: '01–05 Jun 2026',
    location: 'Downtown Dubai',
    total: '$380',
    days: 4,
    img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=700&q=80',
    confirmation: 'DX-186304',
  },
]

const statusStyles = {
  Upcoming: 'text-[#2ee52b] border-[#2ee52b]/30 bg-[#2ee52b]/10',
  Active: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  Completed: 'text-white/40 border-white/15 bg-white/5',
  Cancelled: 'text-red-400 border-red-400/30 bg-red-400/10',
}

export default function MyRentalsPage() {
  const [tab, setTab] = useState('All')
  const [cancelled, setCancelled] = useState([])

  const cancel = (id) => setCancelled((c) => [...c, id])

  const visible = bookings
    .filter((b) => !cancelled.includes(b.id) || tab === 'Cancelled')
    .map((b) => cancelled.includes(b.id) ? { ...b, status: 'Cancelled' } : b)
    .filter((b) => tab === 'All' || b.status === tab)

  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />

      <section className="border-b border-white/8 pt-[72px]">
        <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8">
          <FadeIn direction="left">
            <p className="text-[11px] font-bold uppercase tracking-[.1em] text-[#2ee52b]">Account</p>
            <h1 className="mt-2 text-[clamp(28px,4vw,44px)] font-black tracking-tight">My Rentals</h1>
            <p className="mt-1 text-[13px] text-white/50">{bookings.length} bookings total</p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8">
        {/* Tabs */}
        <FadeIn direction="up">
          <div className="mb-8 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <motion.button
                key={t}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTab(t)}
                className={`rounded-full border px-5 py-2 text-[12px] font-semibold transition ${
                  tab === t
                    ? 'border-[#2ee52b] bg-[#2ee52b]/10 text-[#2ee52b]'
                    : 'border-white/12 text-white/55 hover:border-white/25'
                }`}
              >
                {t}
              </motion.button>
            ))}
          </div>
        </FadeIn>

        <AnimatePresence mode="popLayout">
          {visible.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center"
            >
              <p className="text-[18px] font-bold">No {tab.toLowerCase()} rentals</p>
              <a href="/rentals" className="mt-4 inline-flex items-center gap-2 text-[#2ee52b] hover:underline">
                Browse rental cars <ArrowRight size={15} />
              </a>
            </motion.div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {visible.map((booking) => (
                <motion.article
                  key={booking.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -3 }}
                  className="overflow-hidden rounded-[8px] border border-white/10 bg-[#0b0d0c] transition hover:border-[#2ee52b]/30"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={booking.img} alt={booking.car} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d0c] via-transparent" />
                    <span className={`absolute right-3 top-3 rounded-full border px-3 py-1 text-[10px] font-black ${statusStyles[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-[17px] font-black">{booking.car}</h2>
                      <p className="text-[16px] font-black text-[#2ee52b]">{booking.total}</p>
                    </div>
                    <p className="mt-0.5 text-[11px] text-white/40">Confirmation: {booking.confirmation}</p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-[12px] text-white/55">
                        <CalendarDays size={13} className="text-[#2ee52b]" />
                        {booking.dates} · {booking.days} days
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-white/55">
                        <MapPin size={13} className="text-[#2ee52b]" />
                        {booking.location}
                      </div>
                    </div>

                    <div className="mt-5 flex gap-2 border-t border-white/8 pt-4">
                      {booking.status === 'Upcoming' && (
                        <button
                          onClick={() => cancel(booking.id)}
                          className="flex items-center gap-1.5 rounded-[4px] border border-red-500/30 px-4 py-2 text-[11px] font-semibold text-red-400 transition hover:bg-red-500/10"
                        >
                          <X size={12} /> Cancel
                        </button>
                      )}
                      {booking.status === 'Completed' && (
                        <a href="/rentals" className="flex items-center gap-1.5 rounded-[4px] border border-white/15 px-4 py-2 text-[11px] font-semibold transition hover:border-white/30">
                          Book Again <ArrowRight size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      <SiteFooter />
    </main>
  )
}
