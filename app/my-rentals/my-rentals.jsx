'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Clock3, MapPin, Sparkles } from 'lucide-react'

const MY_RENTALS = [
  {
    id: 'DX-24018', name: 'Range Rover Sport', status: 'active',
    startAt: '2026-08-14T10:00:00+04:00', endAt: '2026-08-18T18:00:00+04:00',
    location: 'Dubai Marina', returnLocation: 'Dubai Marina', price: 620,
    services: ['Premium car wash'], img: '1606664515524-ed2f786a0bd6'
  },
  {
    id: 'DX-24022', name: 'Tesla Model Y', status: 'upcoming',
    startAt: '2026-08-25T09:00:00+04:00', endAt: '2026-08-28T17:00:00+04:00',
    location: 'Dubai Airport', returnLocation: 'Downtown Dubai', price: 344,
    services: ['Airport delivery'], img: '1560958089-b8a1929cea89'
  },
  {
    id: 'DX-23881', name: 'Mercedes-Benz C-Class', status: 'completed',
    startAt: '2026-07-12T10:00:00+04:00', endAt: '2026-07-15T10:00:00+04:00',
    location: 'Downtown Dubai', returnLocation: 'Downtown Dubai', price: 310,
    services: [], img: '1618843479313-40f8afb4b4d8'
  },
]

const statusStyle = {
  active: 'bg-[#EAF6C7] text-[#526828]',
  upcoming: 'bg-[#EEF2F6] text-[#526170]',
  completed: 'bg-[#F1F2F0] text-[#8A9186]',
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value))
}

function splitRemaining(ms) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const days = Math.floor(total / 86400)
  const hours = Math.floor((total % 86400) / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  return { days, hours, minutes, seconds }
}

function Countdown({ startAt, endAt }) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer) }, [])
  const end = new Date(endAt).getTime()
  const start = new Date(startAt).getTime()
  const remaining = end - now
  const parts = splitRemaining(remaining)
  const progress = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100))

  if (remaining <= 0) return <div className="rounded-2xl bg-[#F3F5F1] p-4 text-sm font-black text-[#64748B]">Rental period ended</div>

  return (
    <div className="rounded-2xl bg-[#0B1319] p-4 text-white">
      <div className="flex items-center justify-between gap-4"><p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.14em] text-white/55"><Clock3 size={13} className="text-[#B5E92E]" /> Time remaining</p><p className="text-[10px] font-bold text-white/40">Return countdown</p></div>
      <div className="mt-4 grid grid-cols-4 gap-2">{Object.entries(parts).map(([label, value]) => <div key={label} className="rounded-xl bg-white/[.07] px-2 py-3 text-center"><p className="text-xl font-black tabular-nums">{String(value).padStart(2, '0')}</p><p className="mt-1 text-[8px] font-black uppercase tracking-[.12em] text-white/35">{label}</p></div>)}</div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: .5 }} className="h-full rounded-full bg-[#B5E92E]" /></div>
      <p className="mt-2 text-[10px] text-white/40">{Math.round(progress)}% of rental period elapsed</p>
    </div>
  )
}

export default function MyRentalsPage() {
  const sorted = useMemo(() => {
    const rank = { active: 0, upcoming: 1, completed: 2 }
    return [...MY_RENTALS].sort((a, b) => rank[a.status] - rank[b.status])
  }, [])

  return (
    <main className="min-h-screen bg-[#F5F6F3]">
      <section className="page-inner py-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.18em] text-[#7C8B55]">Rental dashboard</p><h1 className="mt-2 text-4xl font-black tracking-[-.045em] text-[#0F172A]">My rentals</h1><p className="mt-2 text-sm text-[#64748B]">Track active rentals, return times, locations and added services.</p></div><a href="/rentals" className="rounded-full bg-[#0E1418] px-5 py-3 text-xs font-black text-white">Book another car</a></div>

        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          {sorted.map((rental, index) => (
            <motion.article key={rental.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4, delay: index * .06 }} className={`overflow-hidden rounded-[26px] border border-[#E2E6DE] bg-white shadow-[0_18px_50px_rgba(15,23,42,.05)] ${rental.status === 'active' ? 'lg:col-span-2' : ''}`}>
              <div className={`grid ${rental.status === 'active' ? 'lg:grid-cols-[.75fr_1.25fr]' : ''}`}>
                <div className="relative min-h-52 overflow-hidden"><img src={`https://images.unsplash.com/photo-${rental.img}?auto=format&fit=crop&w=1000&q=84`} alt={rental.name} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" /><span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[.12em] ${statusStyle[rental.status]}`}>{rental.status}</span><div className="absolute bottom-4 left-4 text-white"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-white/55">Booking {rental.id}</p><h2 className="mt-1 text-2xl font-black tracking-[-.03em]">{rental.name}</h2></div></div>
                <div className="p-5 sm:p-6">
                  {rental.status === 'active' && <Countdown startAt={rental.startAt} endAt={rental.endAt} />}
                  <div className={`grid gap-4 ${rental.status === 'active' ? 'mt-5 sm:grid-cols-2' : ''}`}>
                    <div className="rounded-2xl border border-[#EEF0EC] bg-[#FAFBF9] p-4"><p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.12em] text-[#94A3B8]"><CalendarDays size={13} /> Rental dates</p><p className="mt-2 text-xs font-black text-[#0F172A]">{formatDate(rental.startAt)}</p><p className="mt-1 text-xs text-[#64748B]">to {formatDate(rental.endAt)}</p></div>
                    <div className="rounded-2xl border border-[#EEF0EC] bg-[#FAFBF9] p-4"><p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.12em] text-[#94A3B8]"><MapPin size={13} /> Pickup & return</p><p className="mt-2 text-xs font-black text-[#0F172A]">{rental.location}</p><p className="mt-1 text-xs text-[#64748B]">Return: {rental.returnLocation}</p></div>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-[#EEF0EC] pt-4"><div><p className="text-[10px] font-black uppercase tracking-[.1em] text-[#94A3B8]">Booking total</p><p className="mt-1 text-xl font-black text-[#0F172A]">${rental.price}</p></div>{rental.services.length > 0 && <div className="text-right"><p className="flex items-center justify-end gap-1 text-[10px] font-black uppercase tracking-[.1em] text-[#7C8B55]"><Sparkles size={11} /> Services</p><p className="mt-1 text-xs font-bold text-[#64748B]">{rental.services.join(', ')}</p></div>}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  )
}
