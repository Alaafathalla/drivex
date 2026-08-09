'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CarFront, Heart, Loader2, MapPin, Phone, ShieldCheck, Star } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-section'
import { api, CARS } from '@/lib/api'

export default function DealerDetailsPage({ params }) {
  const [slug, setSlug] = useState(null)
  const [dealer, setDealer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    params.then ? params.then((p) => setSlug(p.slug)) : setSlug(params.slug)
  }, [params])

  useEffect(() => {
    if (!slug) return
    api.getDealerBySlug(slug).then((d) => {
      setDealer(d)
      setLoading(false)
    })
  }, [slug])

  if (loading) return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-[#2ee52b]" size={32} />
      </div>
    </main>
  )

  if (!dealer) return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[20px] font-bold">Dealer not found</p>
      </div>
    </main>
  )

  const inventory = CARS.filter((c) => dealer.inventory.includes(c.id))

  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />

      {/* Cover image */}
      <div className="relative pt-[72px]">
        <div className="h-[240px] w-full overflow-hidden">
          <img src={dealer.cover} alt="" className="h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070908] via-[#070908]/60 to-transparent" />
        </div>
      </div>

      <div className="mx-auto max-w-[1450px] px-5 pb-16 sm:px-8 lg:px-10">
        {/* Dealer header card */}
        <FadeIn direction="up" delay={0.1}>
          <div className="-mt-16 rounded-[8px] border border-white/10 bg-[#0b0d0c] p-6 md:p-8 relative z-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-5">
                <div className="h-16 w-16 shrink-0 rounded-full border-2 border-[#2ee52b]/30 bg-[#2ee52b]/10 flex items-center justify-center">
                  <CarFront size={28} className="text-[#2ee52b]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={15} className="text-[#2ee52b]" />
                    <span className="text-[10px] font-bold uppercase tracking-[.12em] text-[#2ee52b]">Verified Dealer</span>
                  </div>
                  <h1 className="mt-1 text-[28px] font-black">{dealer.name}</h1>
                  <p className="mt-1 flex items-center gap-2 text-[13px] text-white/50">
                    <MapPin size={13} /> {dealer.address}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex h-11 items-center gap-2 rounded-[5px] border border-white/15 px-5 text-[12px] font-semibold transition hover:border-white/30">
                  Message
                </button>
                <button className="flex h-11 items-center gap-2 rounded-[5px] bg-[#2ee52b] px-5 text-[12px] font-bold text-black transition hover:bg-[#50f14d]">
                  <Phone size={15} /> Call
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 border-t border-white/8 pt-5 text-sm">
              <div className="flex items-center gap-2">
                <Star size={14} className="fill-[#2ee52b] text-[#2ee52b]" />
                <span className="font-bold">{dealer.rating}</span>
                <span className="text-white/40">rating</span>
              </div>
              <div>
                <span className="font-bold">{dealer.totalCars}</span>
                <span className="ml-1 text-white/40">vehicles</span>
              </div>
              <div>
                <span className="text-white/40">Member since </span>
                <span className="font-bold">{dealer.since}</span>
              </div>
              <div>
                <span className="text-white/40">Email: </span>
                <span className="font-semibold text-[#2ee52b]">{dealer.email}</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Description */}
        <FadeIn direction="left" delay={0.1}>
          <div className="mt-8 rounded-[7px] border border-white/10 bg-[#0b0d0c] p-6">
            <h2 className="font-bold">About {dealer.name}</h2>
            <p className="mt-3 text-[14px] leading-7 text-white/60">{dealer.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {dealer.specialties.map((s) => (
                <span key={s} className="rounded-full border border-[#2ee52b]/30 px-3 py-1 text-[11px] font-semibold text-[#2ee52b]">{s}</span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Inventory */}
        <div className="mt-10">
          <FadeIn direction="right">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-[22px] font-black">Available Inventory</h2>
              <p className="text-[13px] text-white/40">{inventory.length} cars</p>
            </div>
          </FadeIn>

          {inventory.length > 0 ? (
            <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {inventory.map((car) => (
                <StaggerItem key={car.id}>
                  <motion.a
                    href={`/cars/${car.slug}`}
                    whileHover={{ y: -4 }}
                    className="group block overflow-hidden rounded-[7px] border border-white/10 bg-[#0b0d0c] transition hover:border-[#2ee52b]/40"
                  >
                    <div className="relative aspect-[1.45] overflow-hidden">
                      <span className="absolute left-3 top-3 z-10 rounded-[3px] bg-[#2ee52b] px-2 py-[3px] text-[9px] font-black text-black">
                        {car.condition}
                      </span>
                      <button className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/30 backdrop-blur-sm">
                        <Heart size={14} className="text-white" />
                      </button>
                      <img src={car.image} alt={car.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold">{car.name}</h3>
                      <p className="mt-1 text-[12px] text-white/50">{car.year} · {car.mileage?.toLocaleString()} km</p>
                      <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3">
                        <p className="text-[16px] font-black text-[#2ee52b]">${car.price?.toLocaleString()}</p>
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-white/50">
                          View <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </motion.a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="rounded-[7px] border border-white/10 bg-[#0b0d0c] py-12 text-center text-white/40">
              No cars currently listed
            </div>
          )}
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
