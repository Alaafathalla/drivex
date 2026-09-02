'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, CarFront, Fuel, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { RENTAL_CATEGORIES } from '@/lib/rental-catalog'
import { clientApi } from '@/lib/client-api'
import { FaqSection, SectionHeading, TrustBand } from '@/components/platform/rich-sections'
import { useLang } from '@/context/LangContext'

export default function CategoriesView() {
  const { t } = useLang()
  const [meta, setMeta] = useState({ brands: [] })
  useEffect(() => { clientApi.get('/api/meta').then(setMeta).catch(() => {}) }, [])

  const BODY_STYLES = [
    { slug:'suv',      name:'SUV',      copy: t('cats_suv_copy'),      image:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=88' },
    { slug:'sedan',    name:'Sedan',    copy: t('cats_sedan_copy'),    image:'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=88' },
    { slug:'sports',   name:'Sports',   copy: t('cats_sports_copy'),   image:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=88' },
    { slug:'electric', name:'Electric', copy: t('cats_electric_copy'), image:'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=88' },
    { slug:'luxury',   name:'Luxury',   copy: t('cats_luxury_copy'),   image:'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=88' },
    { slug:'7-seater', name:'7 Seater', copy: t('cats_7seater_copy'),  image:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=88' },
  ]
  return <main className="min-h-screen bg-[#F5F6F3] text-[#0F172A]">
    <section className="relative overflow-hidden bg-[#071016] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(181,233,46,.22),transparent_38%)]"/>
      <div className="page-inner relative py-20 sm:py-24 lg:py-28">
        <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#B5E92E]">{t('cats_page_eyebrow')}</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-[-.055em] sm:text-6xl lg:text-7xl">{t('cats_page_title')}</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/60">{t('cats_page_desc')}</p>
        <div className="mt-9 flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-[.1em] text-white/60">
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"><ShieldCheck size={14} className="text-[#B5E92E]"/>{t('cats_verified')}</span>
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"><BadgeCheck size={14} className="text-[#B5E92E]"/>{t('cats_sale_rent')}</span>
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"><Sparkles size={14} className="text-[#B5E92E]"/>{t('cats_smart')}</span>
        </div>
      </div>
    </section>

    <section className="page-inner py-16 sm:py-20">
      <SectionHeading eyebrow={t('cats_body_eyebrow')} title={t('cats_body_title')} description={t('cats_body_desc')}/>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {BODY_STYLES.map((item, index) => (
          <motion.a key={item.slug} href={`/categories/${item.slug}`}
            initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.045}}
            whileHover={{y:-5}} className="group overflow-hidden rounded-[26px] border border-[#e2e6de] bg-white shadow-[0_18px_45px_rgba(15,23,42,.05)]">
            <div className="relative aspect-[1.55] overflow-hidden">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#071016]/80 via-transparent to-transparent"/>
              <h3 className="absolute bottom-5 left-5 text-3xl font-black tracking-[-.04em] text-white">{item.name}</h3>
            </div>
            <div className="flex items-center justify-between gap-4 p-5">
              <p className="text-sm leading-6 text-[#64748b]">{item.copy}</p>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#0e1418] text-white transition group-hover:bg-[#B5E92E] group-hover:text-[#071016]"><ArrowRight size={16}/></span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>

    <section className="bg-white py-16">
      <div className="page-inner">
        <SectionHeading eyebrow={t('cats_brands_eyebrow')} title={t('cats_brands_title')} description={t('cats_brands_desc')}/>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {(meta.brands.length ? meta.brands : ['BMW','Mercedes-Benz','Audi','Porsche','Tesla','Range Rover']).map((brand, index) => (
            <motion.a key={brand} href={`/brands/${encodeURIComponent(brand.toLowerCase().replaceAll(' ','-'))}`}
              initial={{opacity:0,scale:.96}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:index*.03}}
              className="group flex min-h-28 flex-col justify-between rounded-[22px] border border-[#e2e6de] bg-[#fafbf9] p-5 transition hover:border-[#B5E92E]">
              <CarFront size={20} className="text-[#7d9f24]"/>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-black text-[#0f172a]">{brand}</span>
                <ArrowRight size={14} className="text-[#c2c9bd] transition group-hover:translate-x-1 group-hover:text-[#7d9f24]"/>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>

    <section className="page-inner py-16">
      <SectionHeading eyebrow={t('cats_rental_eyebrow')} title={t('cats_rental_title')} description={t('cats_rental_desc')}/>
      <div className="grid gap-4 md:grid-cols-3">
        {RENTAL_CATEGORIES.slice(0,6).map((category, index) => (
          <a key={category.slug} href={`/rentals?category=${encodeURIComponent(category.name)}`}
            className="group rounded-[24px] border border-[#e2e6de] bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-[#B5E92E]/18 text-[#6b861c]">
                {category.slug==='electric' ? <Zap size={17}/> : category.slug==='sedan' ? <Fuel size={17}/> : <CarFront size={17}/>}
              </span>
              <ArrowRight size={15} className="text-[#c2c9bd] transition group-hover:translate-x-1"/>
            </div>
            <h3 className="mt-8 text-xl font-black text-[#0f172a]">{category.name}</h3>
            <p className="mt-2 text-sm leading-6 text-[#64748b]">{category.description}</p>
          </a>
        ))}
      </div>
    </section>

    <TrustBand/><FaqSection/>
  </main>
}
