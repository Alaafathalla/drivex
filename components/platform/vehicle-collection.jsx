'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'
import { CarCard } from '@/features/cars/components/CarCard'
import { carService } from '@/services/carService'
import { FaqSection, SectionHeading, TrustBand } from '@/components/platform/rich-sections'

export function VehicleCollection({ title, eyebrow, description, filters, heroImage }) {
  const [data,setData]=useState({items:[],total:0})
  const [loading,setLoading]=useState(true)
  useEffect(()=>{ let active=true; setLoading(true); carService.getCars({...filters,limit:12}).then(v=>active&&setData(v)).finally(()=>active&&setLoading(false)); return()=>{active=false}},[JSON.stringify(filters)])
  return <main className="bg-[#F5F6F3]">
    <section className="relative overflow-hidden bg-[#071016] text-white"><img src={heroImage||'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2200&q=86'} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35"/><div className="absolute inset-0 bg-gradient-to-r from-[#071016] via-[#071016]/88 to-[#071016]/35"/><div className="page-inner relative py-20 sm:py-24"><p className="text-[10px] font-black uppercase tracking-[.22em] text-[#B5E92E]">{eyebrow}</p><h1 className="mt-4 max-w-3xl text-5xl font-black tracking-[-.055em] sm:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/60">{description}</p><div className="mt-8 flex gap-3"><a href="/cars" className="rounded-full bg-[#B5E92E] px-5 py-3 text-xs font-black text-[#071016]">Browse all inventory</a><a href="/compare" className="rounded-full border border-white/15 px-5 py-3 text-xs font-black">Compare vehicles</a></div></div></section>
    <section className="page-inner py-16"><SectionHeading eyebrow="Live inventory" title={loading?'Loading collection…':`${data.total} vehicles available`} description="Inventory is loaded through the same vehicle API used by search, comparison and dashboard experiences."/>{loading?<div className="grid min-h-64 place-items-center"><Loader2 className="animate-spin text-[#7d9f24]"/></div>:data.items.length?<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{data.items.map((car,i)=><CarCard key={car.id} car={car} index={i}/>)}</div>:<div className="rounded-[26px] border border-dashed border-[#ccd5c6] bg-white py-16 text-center"><p className="font-black text-[#0f172a]">No matching cars right now.</p><a href="/cars" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#7d9f24]">Explore all cars <ArrowRight size={14}/></a></div>}</section>
    <TrustBand/><FaqSection/>
  </main>
}
