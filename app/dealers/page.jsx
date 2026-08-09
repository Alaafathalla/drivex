'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CarFront, MapPin, Search, ShieldCheck, Star } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-section'
import { api } from '@/lib/api'

export default function DealersPage() {
  const [dealers, setDealers] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => { api.getDealers().then(setDealers) }, [])

  const filtered = dealers.filter((d) =>
    !q || d.name.toLowerCase().includes(q.toLowerCase()) || d.city.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8 pt-[72px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1562141961-b5d65aba8f5e?auto=format&fit=crop&w=2200&q=85"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070908] via-[#070908]/85 to-[#070908]/60" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070908]" />
        </div>
        <div className="relative mx-auto max-w-[1450px] px-5 py-14 sm:px-8 lg:px-10">
          <FadeIn direction="left">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.1em] text-[#2ee52b]">
              <span className="h-[2px] w-8 bg-[#2ee52b]" /> Verified Network
            </p>
            <h1 className="mt-4 text-[clamp(38px,5vw,68px)] font-black leading-[.92] tracking-tight">
              Trusted dealers.<br />Exceptional cars.
            </h1>
            <p className="mt-4 max-w-md text-[14px] text-white/55">
              Every dealer on DriveX is verified, rated and held to our quality standards.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <div className="mt-8 flex max-w-md items-center gap-3 rounded-[6px] border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <Search size={16} className="text-[#2ee52b]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search dealers or city…"
                className="flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-white/35"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats bar */}
      <FadeIn direction="up">
        <div className="border-b border-white/8 bg-[#0a0c0b]">
          <div className="mx-auto grid max-w-[1450px] grid-cols-3 divide-x divide-white/8 px-5 lg:px-10">
            {[['50+', 'Verified Dealers'], ['4.8', 'Avg Rating'], ['10K+', 'Cars Listed']].map(([v, l]) => (
              <div key={l} className="px-6 py-5 text-center">
                <p className="text-[22px] font-black text-[#2ee52b]">{v}</p>
                <p className="text-[11px] text-white/45">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Dealer grid */}
      <section className="mx-auto max-w-[1450px] px-5 py-12 sm:px-8 lg:px-10">
        <FadeIn direction="right">
          <p className="mb-8 text-[13px] text-white/50">
            Showing <span className="font-bold text-white">{filtered.length}</span> dealers
          </p>
        </FadeIn>
        <StaggerContainer className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {filtered.map((dealer) => (
            <StaggerItem key={dealer.id}>
              <motion.a
                href={`/dealers/${dealer.slug}`}
                whileHover={{ y: -5 }}
                className="group block overflow-hidden rounded-[8px] border border-white/10 bg-[#0b0d0c] transition hover:border-[#2ee52b]/50"
              >
                {/* Cover */}
                <div className="relative h-28 overflow-hidden">
                  <img src={dealer.cover} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d0c] via-transparent" />
                </div>
                {/* Logo placeholder */}
                <div className="relative -mt-6 ml-5">
                  <div className="h-12 w-12 rounded-full border-2 border-[#0b0d0c] bg-[#2ee52b]/10 flex items-center justify-center">
                    <CarFront size={20} className="text-[#2ee52b]" />
                  </div>
                </div>
                <div className="p-5 pt-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-black">{dealer.name}</h3>
                      <p className="mt-1 flex items-center gap-1 text-[12px] text-white/50">
                        <MapPin size={11} /> {dealer.city}
                      </p>
                    </div>
                    {dealer.verified && <ShieldCheck size={17} className="mt-0.5 shrink-0 text-[#2ee52b]" />}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                    <div className="flex items-center gap-1">
                      <Star size={13} className="fill-[#2ee52b] text-[#2ee52b]" />
                      <span className="text-[13px] font-bold">{dealer.rating}</span>
                    </div>
                    <span className="text-[12px] text-white/50">{dealer.totalCars} cars</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {dealer.specialties.map((s) => (
                      <span key={s} className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-white/50">{s}</span>
                    ))}
                  </div>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <SiteFooter />
    </main>
  )
}
