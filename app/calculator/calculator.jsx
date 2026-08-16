'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calculator, CheckCircle2, Landmark, Percent, ShieldCheck, WalletCards } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { clientApi } from '@/lib/client-api'
import { useCurrency } from '@/context/CurrencyContext'
import { FaqSection, NewsSection, SectionHeading, TrustBand } from '@/components/platform/rich-sections'

function Field({ label, value, onChange, min=0, max, step=1, suffix }) {
  return <label className="block"><div className="mb-2 flex items-center justify-between"><span className="text-xs font-black uppercase tracking-[.1em] text-[#475569]">{label}</span><span className="text-xs font-bold text-[#94a3b8]">{suffix}</span></div><input type="number" min={min} max={max} step={step} value={value} onChange={e=>onChange(e.target.value)} className="h-12 w-full rounded-2xl border border-[#dfe5db] bg-white px-4 text-sm font-black text-[#0f172a] outline-none transition focus:border-[#B5E92E] focus:ring-4 focus:ring-[#B5E92E]/10"/></label>
}

export default function CalculatorPage(){
  const { format } = useCurrency()
  const [form,setForm]=useState({price:180000,downPayment:36000,annualRate:4.49,termMonths:60})
  const [quote,setQuote]=useState(null)
  const [loading,setLoading]=useState(false)
  const update=(key,value)=>setForm(f=>({...f,[key]:value}))
  useEffect(()=>{
    let cancelled=false
    setLoading(true)
    const timer=setTimeout(()=>clientApi.post('/api/finance/quote',form).then(data=>!cancelled&&setQuote(data)).catch(()=>!cancelled&&setQuote(null)).finally(()=>!cancelled&&setLoading(false)),180)
    return()=>{cancelled=true;clearTimeout(timer)}
  },[form])
  const downPct=useMemo(()=>Math.min(100,Math.round(Number(form.downPayment||0)/Math.max(1,Number(form.price||1))*100)),[form])
  return <main className="bg-[#F5F6F3]">
    <PageHero eyebrow="Finance intelligence" title="Know the monthly number before you fall in love with the car." description="Model price, down payment, rate and term in real time. Then carry the exact numbers into your vehicle search." image="https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=2200&q=86"/>

    <section className="page-inner -mt-10 relative z-10 pb-16">
      <div className="grid overflow-hidden rounded-[30px] border border-[#dfe5db] bg-white shadow-[0_30px_80px_rgba(15,23,42,.12)] lg:grid-cols-[1.1fr_.9fr]">
        <div className="p-6 sm:p-9">
          <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-[#B5E92E]/20 text-[#637f16]"><Calculator size={20}/></span><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#7d9f24]">Loan inputs</p><h2 className="text-xl font-black text-[#0f172a]">Build your estimate</h2></div></div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2"><Field label="Vehicle price" value={form.price} onChange={v=>update('price',v)} step={1000} suffix="AED"/><Field label="Down payment" value={form.downPayment} onChange={v=>update('downPayment',v)} step={1000} suffix={`${downPct}%`}/><Field label="Interest rate" value={form.annualRate} onChange={v=>update('annualRate',v)} step={0.01} suffix="APR %"/><Field label="Loan term" value={form.termMonths} onChange={v=>update('termMonths',v)} min={12} max={84} step={12} suffix="months"/></div>
          <div className="mt-6 rounded-2xl bg-[#f6f8f3] p-4"><input type="range" min="12" max="84" step="12" value={form.termMonths} onChange={e=>update('termMonths',e.target.value)} className="range-accent w-full"/><div className="mt-2 flex justify-between text-[10px] font-bold text-[#94a3b8]">{[12,24,36,48,60,72,84].map(n=><span key={n}>{n}</span>)}</div></div>
        </div>
        <div className="relative bg-[#0b141b] p-6 text-white sm:p-9"><div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#B5E92E]/10 blur-3xl"/><div className="relative"><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#B5E92E]">Estimated monthly payment</p><motion.p key={quote?.monthlyPayment} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="mt-4 text-5xl font-black tracking-[-.06em]">{loading?'—':quote?format(quote.monthlyPayment):'—'}</motion.p><p className="mt-2 text-xs text-white/40">Indicative only · final lender terms may differ</p><div className="mt-8 grid grid-cols-2 gap-3">{[['Amount financed',quote?.principal],['Total interest',quote?.totalInterest],['Total paid',quote?.totalPayment],['Term',quote?.termMonths?`${quote.termMonths} mo`:null]].map(([label,value])=><div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-[10px] uppercase tracking-[.12em] text-white/40">{label}</p><p className="mt-2 text-sm font-black">{typeof value==='number'?format(value):value||'—'}</p></div>)}</div><a href={`/cars?maxPrice=${form.price}`} className="mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-[#B5E92E] text-sm font-black text-[#071016]">Browse cars in this budget <ArrowRight size={15}/></a></div></div>
      </div>
    </section>

    <section className="page-inner pb-16"><SectionHeading eyebrow="Plan smarter" title="Four numbers that change the deal." description="A useful finance estimate is more than a monthly payment. Understand the trade-offs before you speak to a lender."/><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[[WalletCards,'Down payment','A larger upfront amount reduces the financed principal and monthly payment.'],[Percent,'Interest rate','Even a small APR difference compounds over longer finance terms.'],[Landmark,'Term length','Longer terms lower monthly cost but generally increase total interest.'],[ShieldCheck,'Ownership buffer','Keep cash aside for insurance, registration, service and unexpected repairs.']].map(([Icon,title,text],i)=><motion.div key={title} initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.05}} className="rounded-[24px] border border-[#dfe5db] bg-white p-6"><Icon size={20} className="text-[#7d9f24]"/><h3 className="mt-6 font-black text-[#0f172a]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#64748b]">{text}</p></motion.div>)}</div></section>

    <TrustBand/>
    <FaqSection items={[["Is this calculator a finance offer?","No. It is an estimate for planning. A lender or dealer partner must confirm eligibility, APR, fees and final monthly payment."],["What should I include in my budget?","Consider insurance, registration, maintenance, fuel or charging, parking and any lender fees alongside the monthly repayment."],["Can I compare different terms?","Yes. Adjust rate, deposit and term instantly to see how the total cost changes."],["Can I use the result to search inventory?","Yes. The budget CTA carries the vehicle price into DriveX inventory as a maximum-price filter."]]}/>
    <NewsSection/>
  </main>
}
