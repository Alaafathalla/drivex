'use client'

import { ArrowRight, CalendarHeart, CarFront, Plane, ShieldCheck, Sparkles, Wrench } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SERVICE_CATALOG } from '@/lib/rental-catalog'

const ICONS = {
  wash: Sparkles,
  wedding: CalendarHeart,
  airport: Plane,
  maintenance: Wrench,
  inspection: ShieldCheck,
  roadside: CarFront,
}

export default function ServicesPageView() {
  return (
    <main className="bg-[#F5F6F3]">
      <PageHero eyebrow="Beyond the rental" title="Everything your drive may need." description="Book car care, wedding transport, airport transfer and support services through one premium automotive platform." image="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=2200&q=86" />

      <section className="page-inner py-16 sm:py-20">
        <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div><p className="text-xs font-black uppercase tracking-[.18em] text-[#7C8B55]">Service marketplace</p><h2 className="mt-2 text-4xl font-black tracking-[-.045em] text-[#0F172A]">Professional services, connected to your booking.</h2></div>
          <p className="text-sm leading-7 text-[#64748B]">Use services as standalone bookings or add eligible options directly to a rental before checkout.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SERVICE_CATALOG.map((service, index) => {
            const Icon = ICONS[service.slug] || Sparkles
            const href = service.slug === 'wedding' || service.slug === 'airport' ? `/services/${service.slug}` : `/${service.slug}`
            return (
              <a key={service.slug} href={href} className={`group overflow-hidden rounded-[26px] border border-[#E2E6DE] bg-white shadow-[0_18px_45px_rgba(15,23,42,.05)] ${index === 0 ? 'md:col-span-2 xl:col-span-1' : ''}`}>
                <div className="relative aspect-[1.75] overflow-hidden"><img src={service.image} alt={service.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#071016]/70 via-transparent to-transparent" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-[.12em] text-[#0F172A]">{service.category}</span><div className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-full bg-[#B5E92E] text-[#0E1418]"><Icon size={18} /></div></div>
                <div className="p-5"><div className="flex items-start justify-between gap-5"><div><h3 className="text-xl font-black tracking-[-.025em] text-[#0F172A]">{service.title}</h3><p className="mt-2 text-sm leading-6 text-[#64748B]">{service.description}</p></div><ArrowRight className="mt-1 shrink-0 transition-transform group-hover:translate-x-1" size={18} /></div><p className="mt-5 text-xs font-black uppercase tracking-[.1em] text-[#7C8B55]">{service.price}</p></div>
              </a>
            )
          })}
        </div>
      </section>
    </main>
  )
}
