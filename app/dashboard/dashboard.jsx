'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BellRing, CalendarDays, CarFront, Heart, Loader2, Settings2, Sparkles, WalletCards } from 'lucide-react'
import { clientApi } from '@/lib/client-api'
import { useCurrency } from '@/context/CurrencyContext'
import { CarCard } from '@/features/cars/components/CarCard'
import { FaqSection, NewsSection, SectionHeading, TrustBand } from '@/components/platform/rich-sections'

export default function DashboardPage(){
  const {format}=useCurrency()
  const [data,setData]=useState(null)
  const [loading,setLoading]=useState(true)
  useEffect(()=>{clientApi.get('/api/dashboard').then(setData).finally(()=>setLoading(false))},[])
  if(loading)return <div className="grid min-h-[70vh] place-items-center bg-[#F5F6F3]"><Loader2 className="animate-spin text-[#7d9f24]" size={32}/></div>
  if(!data)return <div className="grid min-h-[60vh] place-items-center">Dashboard unavailable.</div>
  const stats=[['Saved cars',data.stats.savedCars,Heart],['Active bookings',data.stats.activeBookings,CalendarDays],['Active listings',data.stats.activeListings,CarFront],['Total spent',format(data.stats.totalSpent),WalletCards]]
  return <main className="bg-[#F5F6F3] pb-16">
    <section className="bg-[#071016] text-white"><div className="page-inner py-14 sm:py-16"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-[#B5E92E]">Member dashboard</p><h1 className="mt-3 text-4xl font-black tracking-[-.05em] sm:text-5xl">Welcome back, {data.profile.name.split(' ')[0]}.</h1><p className="mt-3 max-w-xl text-sm leading-7 text-white/50">Your saved vehicles, rental bookings, live listings and ownership activity in one place.</p></div><div className="flex gap-2"><a href="/profile" className="flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-xs font-black"><Settings2 size={14}/>Profile</a><a href="/cars" className="flex h-11 items-center gap-2 rounded-full bg-[#B5E92E] px-5 text-xs font-black text-[#071016]">Browse cars <ArrowRight size={14}/></a></div></div></div></section>

    <section className="page-inner -mt-5 relative z-10"><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{stats.map(([label,value,Icon],i)=><motion.div key={label} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*.05}} className="rounded-[22px] border border-[#dfe5db] bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,.06)]"><div className="flex items-center justify-between"><span className="text-xs font-bold text-[#64748b]">{label}</span><span className="grid size-9 place-items-center rounded-xl bg-[#B5E92E]/18 text-[#6c891a]"><Icon size={16}/></span></div><p className="mt-5 text-3xl font-black tracking-[-.04em] text-[#0f172a]">{value}</p></motion.div>)}</div></section>

    <section className="page-inner py-12"><div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
      <div className="rounded-[26px] border border-[#dfe5db] bg-white p-6"><div className="flex items-center justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#7d9f24]">Next actions</p><h2 className="mt-2 text-2xl font-black tracking-[-.04em] text-[#0f172a]">Upcoming activity</h2></div><a href="/my-bookings" className="text-xs font-black text-[#7d9f24]">View all</a></div><div className="mt-5 space-y-3">{data.bookings.length?data.bookings.map((booking)=><div key={booking.id} className="flex items-center gap-4 rounded-2xl bg-[#f7f9f5] p-4"><span className="grid size-10 place-items-center rounded-xl bg-white text-[#7d9f24]"><CalendarDays size={17}/></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-black text-[#0f172a]">Booking {booking.id}</p><p className="mt-1 text-xs text-[#64748b]">{booking.pickupDate||booking.startDate||'Upcoming'} · {booking.pickupLocation||'DriveX pickup'}</p></div><span className="rounded-full bg-[#B5E92E]/20 px-3 py-1 text-[10px] font-black text-[#657f1b]">{booking.status}</span></div>):<p className="py-8 text-center text-sm text-[#94a3b8]">No active bookings.</p>}</div></div>
      <div className="rounded-[26px] bg-[#0b141b] p-6 text-white"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#B5E92E] text-[#071016]"><Sparkles size={17}/></span><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#B5E92E]">DriveX intelligence</p><h2 className="text-xl font-black">Alerts worth your attention</h2></div></div><div className="mt-6 space-y-3">{data.alerts.map(alert=><div key={alert.id} className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="flex items-center gap-2"><BellRing size={14} className="text-[#B5E92E]"/><p className="text-sm font-black">{alert.title}</p></div><p className="mt-2 text-xs leading-6 text-white/50">{alert.text}</p></div>)}</div></div>
    </div></section>

    <section className="page-inner py-4"><SectionHeading eyebrow="Saved shortlist" title="Cars you are watching." actionHref="/favorites" actionLabel="Open wishlist"/><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{data.saved.slice(0,4).map((car,i)=><CarCard key={car.id} car={car} index={i}/>)}</div></section>

    <section className="page-inner py-14"><SectionHeading eyebrow="Listing performance" title="Your vehicles on DriveX." actionHref="/my-listings" actionLabel="Manage listings"/><div className="overflow-hidden rounded-[24px] border border-[#dfe5db] bg-white"><div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-[#edf0ea] bg-[#fafbf9] px-5 py-3 text-[10px] font-black uppercase tracking-[.12em] text-[#64748b]"><span>Vehicle</span><span>Status</span><span>Views</span></div>{data.listings.length?data.listings.map(listing=><div key={listing.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-[#edf0ea] px-5 py-4 last:border-0"><div><p className="text-sm font-black text-[#0f172a]">{listing.brand} {listing.model}</p><p className="mt-1 text-xs text-[#94a3b8]">{listing.year} · {listing.city}</p></div><span className="rounded-full bg-[#eef4df] px-3 py-1 text-[10px] font-black text-[#657f1b]">{listing.status}</span><span className="min-w-12 text-right text-sm font-black text-[#0f172a]">{listing.views||0}</span></div>):<p className="p-8 text-center text-sm text-[#94a3b8]">No active listings yet.</p>}</div></section>

    <TrustBand/><FaqSection items={[["Where do saved cars come from?","The dashboard reads the same vehicle source used by marketplace search and favorites. Connect it to your authenticated backend user when available."],["Can I manage rental bookings here?","Yes. Active bookings can link into the existing booking management and cancellation flows."],["How are listing views calculated?","The mock dataset includes view counters. Replace them with analytics from your production listings endpoint."],["Can alerts be personalized?","Yes. The dashboard response is structured for inspection reminders, price changes, booking notices and ownership recommendations."]]}/>
    <NewsSection/>
  </main>
}
