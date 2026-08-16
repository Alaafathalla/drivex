'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, GitCompare, Plus, Search, Trash2, X } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { carService } from '@/services/carService'
import { useCurrency } from '@/context/CurrencyContext'
import { FaqSection, NewsSection, TestimonialsSection, TrustBand } from '@/components/platform/rich-sections'

const SPECS = [
  ['Price', car => car.price, 'money'],
  ['Year', car => car.year],
  ['Body style', car => car.bodyType],
  ['Engine', car => car.engine],
  ['Fuel', car => car.fuelType],
  ['Transmission', car => car.transmission],
  ['Mileage', car => car.mileage ? `${Number(car.mileage).toLocaleString()} km` : '—'],
  ['Seats', car => car.seats],
  ['Doors', car => car.doors],
  ['Location', car => car.city],
  ['Rating', car => car.rating ? `${car.rating}/5` : '—'],
  ['Availability', car => car.available === false ? 'Unavailable' : 'Available'],
]

function VehiclePicker({ open, onClose, onPick, selectedIds }) {
  const [q,setQ]=useState('')
  const [data,setData]=useState([])
  useEffect(()=>{let active=true;carService.getCars({q,limit:30,sort:'newest'}).then(res=>active&&setData(res.items)).catch(()=>active&&setData([]));return()=>{active=false}},[q])
  if(!open)return null
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[80] bg-[#071016]/60 p-4 backdrop-blur-lg" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <motion.div initial={{y:20,opacity:0,scale:.98}} animate={{y:0,opacity:1,scale:1}} className="mx-auto mt-[6vh] max-h-[82vh] max-w-4xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
      <div className="flex items-center gap-3 border-b border-slate-100 p-5"><Search size={18} className="text-[#7d9f24]"/><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search make, model or city…" className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"/><button onClick={onClose}><X size={18}/></button></div>
      <div className="grid max-h-[66vh] gap-2 overflow-y-auto p-4 sm:grid-cols-2">{data.map(car=>{const disabled=selectedIds.includes(car.id);return <button key={car.id} disabled={disabled} onClick={()=>{onPick(car);onClose()}} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3 text-left transition hover:border-[#B5E92E] hover:bg-[#f8faF5] disabled:opacity-45"><img src={car.images?.[0]} alt="" className="h-16 w-24 rounded-xl object-cover"/><div className="min-w-0 flex-1"><p className="truncate text-sm font-black text-slate-950">{car.brand} {car.model}</p><p className="mt-1 text-xs text-slate-400">{car.year} · {car.bodyType} · {car.city}</p></div>{disabled&&<Check size={16} className="text-[#7d9f24]"/>}</button>})}</div>
    </motion.div>
  </motion.div>
}

export default function ComparePage(){
  const {format}=useCurrency()
  const [selected,setSelected]=useState([])
  const [picker,setPicker]=useState(false)
  useEffect(()=>{carService.getCars({limit:20,sort:'rating'}).then(res=>setSelected(res.items.slice(0,2))).catch(()=>{})},[])
  const selectedIds=useMemo(()=>selected.map(c=>c.id),[selected])
  const add=(car)=>setSelected(list=>list.length<4?[...list,car]:list)
  const remove=(id)=>setSelected(list=>list.filter(car=>car.id!==id))
  return <main className="bg-[#F5F6F3]">
    <PageHero eyebrow="Vehicle comparison" title="Put the shortlist under pressure." description="Compare up to four vehicles side by side. Pricing, ownership facts and key specifications stay aligned while you scroll." image="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2200&q=86"/>
    <section className="page-inner py-14">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#7d9f24]">Comparison workspace</p><h2 className="mt-2 text-3xl font-black tracking-[-.04em] text-[#0f172a]">{selected.length}/4 vehicles selected</h2></div><button disabled={selected.length>=4} onClick={()=>setPicker(true)} className="flex h-11 items-center gap-2 rounded-full bg-[#0e1418] px-5 text-xs font-black text-white disabled:opacity-40"><Plus size={15}/>Add vehicle</button></div>
      <div className="overflow-x-auto rounded-[28px] border border-[#dfe5db] bg-white shadow-[0_18px_50px_rgba(15,23,42,.06)]">
        <div className="min-w-[760px]" style={{gridTemplateColumns:`180px repeat(${Math.max(selected.length,1)},minmax(220px,1fr))`}}>
          <div className="sticky top-[72px] z-20 grid border-b border-[#e5e9e2] bg-white/95 backdrop-blur-xl" style={{gridTemplateColumns:`180px repeat(${Math.max(selected.length,1)},minmax(220px,1fr))`}}>
            <div className="flex items-end p-5"><GitCompare className="text-[#7d9f24]"/></div>
            {selected.map(car=><div key={car.id} className="relative border-l border-[#eef1eb] p-4"><button onClick={()=>remove(car.id)} className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/90 text-slate-400 shadow hover:text-red-500"><Trash2 size={14}/></button><img src={car.images?.[0]} alt={`${car.brand} ${car.model}`} className="aspect-[1.7] w-full rounded-2xl object-cover"/><p className="mt-3 text-base font-black text-[#0f172a]">{car.brand} {car.model}</p><p className="mt-1 text-xs text-[#64748b]">{car.year} · {car.city}</p><a href={`/cars/${car.id}`} className="mt-3 inline-flex text-xs font-black text-[#7d9f24]">View vehicle →</a></div>)}
          </div>
          {selected.length?SPECS.map(([label,getValue,type],rowIndex)=><div key={label} className={`grid ${rowIndex%2?'bg-[#fafbf9]':'bg-white'}`} style={{gridTemplateColumns:`180px repeat(${selected.length},minmax(220px,1fr))`}}><div className="p-4 text-xs font-black uppercase tracking-[.08em] text-[#64748b]">{label}</div>{selected.map(car=>{const value=getValue(car);return <div key={car.id} className="border-l border-[#eef1eb] p-4 text-sm font-semibold text-[#0f172a]">{type==='money'?format(value):String(value??'—')}</div>})}</div>):<div className="p-12 text-center text-sm text-slate-400">Add vehicles to begin comparing.</div>}
          {selected.length>0&&<div className="grid border-t border-[#e5e9e2] bg-[#0b141b] text-white" style={{gridTemplateColumns:`180px repeat(${selected.length},minmax(220px,1fr))`}}><div className="p-5 text-xs font-black uppercase tracking-[.12em] text-[#B5E92E]">Next step</div>{selected.map(car=><div key={car.id} className="border-l border-white/10 p-4"><a href={car.listingType==='rent'?`/cars/${car.id}/rent`:`/cars/${car.id}`} className="flex h-10 items-center justify-center rounded-full bg-[#B5E92E] text-xs font-black text-[#071016]">{car.listingType==='rent'?'Book rental':'View listing'}</a></div>)}</div>}
        </div>
      </div>
    </section>
    <TrustBand/><TestimonialsSection/><FaqSection items={[["How many vehicles can I compare?","Up to four vehicles can be compared at the same time."],["Are prices live?","The comparison uses the same vehicle API as marketplace inventory, so displayed prices reflect the current mock API state."],["Can I compare sale and rental cars together?","Yes. The matrix can mix both listing types, although pricing represents the listing's primary price basis."],["Can comparison be shared?","The architecture is ready for query-string persistence; connect selected IDs to your backend or URL state when you want shareable comparisons."]]}/>
    <NewsSection/><AnimatePresence><VehiclePicker open={picker} onClose={()=>setPicker(false)} onPick={add} selectedIds={selectedIds}/></AnimatePresence>
  </main>
}
