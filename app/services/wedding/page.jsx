'use client'

import { useState } from 'react'
import { CalendarDays, CheckCircle2, Clock3, MapPin, Sparkles } from 'lucide-react'
import { getDefaultRentalDates } from '@/lib/rental-catalog'

export default function WeddingServicePage() {
  const defaults = getDefaultRentalDates()
  const [form, setForm] = useState({ date: defaults.start, time: '15:00', venue: '', package: 'Signature' })
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  return (
    <main className="min-h-screen bg-[#F5F6F3]">
      <section className="page-inner py-12 sm:py-16">
        <div className="overflow-hidden rounded-[30px] bg-[#0B1319] text-white">
          <div className="grid lg:grid-cols-[1fr_.9fr]">
            <div className="p-8 sm:p-10 lg:p-14"><p className="text-xs font-black uppercase tracking-[.2em] text-[#B5E92E]">Wedding car service</p><h1 className="mt-4 max-w-xl text-5xl font-black tracking-[-.055em]">Arrive with the moment planned perfectly.</h1><p className="mt-5 max-w-xl text-sm leading-7 text-white/60">Luxury vehicle preparation, timed delivery, optional chauffeur and event-ready presentation coordinated around your ceremony schedule.</p><div className="mt-8 grid gap-3 text-sm text-white/75 sm:grid-cols-2">{['Luxury rental selection','Professional chauffeur','Ribbon & presentation setup','Venue-timed delivery'].map((item) => <p key={item} className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#B5E92E]" />{item}</p>)}</div></div>
            <div className="min-h-80 bg-[url('https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=88')] bg-cover bg-center" />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_.7fr]">
          <div className="rounded-[26px] border border-[#E2E6DE] bg-white p-6 sm:p-8"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-[#F0F6DF]"><Sparkles size={17} className="text-[#65783C]" /></div><div><p className="text-xs font-black uppercase tracking-[.12em] text-[#7C8B55]">Event details</p><h2 className="text-xl font-black text-[#0F172A]">Build your wedding transport request</h2></div></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="rounded-2xl border border-[#E6E9E2] p-4"><span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.12em] text-[#94A3B8]"><CalendarDays size={13}/> Wedding date</span><input type="date" value={form.date} onChange={(e)=>set('date',e.target.value)} className="mt-2 w-full outline-none" /></label><label className="rounded-2xl border border-[#E6E9E2] p-4"><span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.12em] text-[#94A3B8]"><Clock3 size={13}/> Required time</span><input type="time" value={form.time} onChange={(e)=>set('time',e.target.value)} className="mt-2 w-full outline-none" /></label><label className="rounded-2xl border border-[#E6E9E2] p-4 sm:col-span-2"><span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.12em] text-[#94A3B8]"><MapPin size={13}/> Venue / pickup location</span><input value={form.venue} onChange={(e)=>set('venue',e.target.value)} placeholder="Enter venue or hotel" className="mt-2 w-full outline-none" /></label><label className="rounded-2xl border border-[#E6E9E2] p-4 sm:col-span-2"><span className="text-[10px] font-black uppercase tracking-[.12em] text-[#94A3B8]">Package</span><select value={form.package} onChange={(e)=>set('package',e.target.value)} className="mt-2 w-full bg-transparent outline-none"><option>Signature</option><option>Chauffeur</option><option>Premium Ceremony</option></select></label></div></div>
          <aside className="rounded-[26px] border border-[#E2E6DE] bg-white p-6 sm:p-8"><p className="text-xs font-black uppercase tracking-[.14em] text-[#7C8B55]">Starting package</p><p className="mt-2 text-4xl font-black text-[#0F172A]">AED 799</p><p className="mt-3 text-sm leading-6 text-[#64748B]">Final pricing depends on vehicle class, chauffeur hours, decoration requirements and event location.</p><a href={`/rentals?start=${form.date}&end=${form.date}`} className="mt-6 flex h-12 items-center justify-center rounded-full bg-[#0E1418] text-xs font-black uppercase tracking-[.08em] text-white transition hover:bg-[#B5E92E] hover:text-[#0E1418]">Choose wedding car</a></aside>
        </div>
      </section>
    </main>
  )
}
