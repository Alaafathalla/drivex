'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Heart, Loader2, Trash2 } from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'
import { carService } from '@/services/carService'
import { CarCard } from '@/features/cars/components/CarCard'
import { FaqSection } from '@/components/platform/rich-sections'

export default function FavoritesPage(){
  const { slugs, toggle, count, mounted }=useFavorites()
  const [items,setItems]=useState([])
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    if(!mounted)return
    let active=true
    setLoading(true)
    Promise.all(slugs.map(id=>carService.getCarById(id).catch(()=>null))).then(rows=>active&&setItems(rows.filter(Boolean))).finally(()=>active&&setLoading(false))
    return()=>{active=false}
  },[mounted,JSON.stringify(slugs)])
  return <main className="min-h-screen bg-[#F5F6F3]">
    <section className="bg-[#071016] text-white"><div className="page-inner py-16"><div className="flex items-end justify-between gap-5"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#B5E92E]">Your shortlist</p><h1 className="mt-3 text-5xl font-black tracking-[-.055em]">Saved cars.</h1><p className="mt-3 text-sm text-white/45">Keep your strongest options together before you compare or enquire.</p></div><div className="hidden size-16 place-items-center rounded-full border border-white/10 bg-white/5 sm:grid"><Heart size={26} className="text-[#B5E92E]"/></div></div></div></section>
    <section className="page-inner py-14">{!mounted||loading?<div className="grid min-h-64 place-items-center"><Loader2 className="animate-spin text-[#7d9f24]"/></div>:items.length===0?<motion.div initial={{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} className="rounded-[28px] border border-dashed border-[#ccd5c6] bg-white py-20 text-center"><div className="mx-auto grid size-20 place-items-center rounded-full bg-[#f4f7ee]"><Heart size={30} className="text-[#9aa891]"/></div><h2 className="mt-6 text-2xl font-black text-[#0f172a]">No saved cars yet.</h2><p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#64748b]">Tap the heart on a marketplace vehicle to build a shortlist that stays available in your browser.</p><a href="/cars" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#B5E92E] px-6 py-3 text-xs font-black text-[#071016]">Browse cars <ArrowRight size={14}/></a></motion.div>:<><div className="mb-6 flex items-center justify-between"><p className="text-sm text-[#64748b]"><b className="text-[#0f172a]">{items.length}</b> saved {items.length===1?'car':'cars'}</p><button onClick={()=>items.forEach(car=>toggle(String(car.id)))} className="flex items-center gap-2 text-xs font-black text-red-500"><Trash2 size={13}/>Clear all</button></div><AnimatePresence mode="popLayout"><motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map((car,i)=><CarCard key={car.id} car={car} index={i}/>)}</motion.div></AnimatePresence><div className="mt-10 flex flex-col gap-4 rounded-[26px] bg-[#0b141b] p-6 text-white sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#B5E92E]">Shortlist ready</p><h3 className="mt-2 text-xl font-black">Compare your saved options side by side.</h3></div><a href="/compare" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#B5E92E] px-5 text-xs font-black text-[#071016]">Open comparison <ArrowRight size={14}/></a></div></>}</section>
    <FaqSection items={[["Where are saved cars stored?","The current demo stores vehicle IDs in localStorage. Replace the favorites context with authenticated user API persistence when your backend is connected."],["Why can a saved car disappear?","If a vehicle is deleted or no longer returned by the inventory endpoint, the saved ID no longer resolves to a listing."],["Can saved cars be compared?","Yes. Open the comparison workspace and add up to four vehicles."],["Can I save rental cars too?","Yes. Sale and rental listings share the same vehicle identifier contract in the new marketplace API."]]}/>
  </main>
}
