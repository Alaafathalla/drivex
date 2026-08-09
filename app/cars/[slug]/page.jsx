'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, BadgeCheck, CalendarDays, Fuel, Gauge,
  Heart, Loader2, MapPin, Settings2, Share2, ShieldCheck, Users,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-section'
import { api } from '@/lib/api'

function SkeletonBlock({ className }) {
  return <div className={`skeleton rounded-[6px] ${className}`} />
}

export default function CarDetailsPage({ params }) {
  const [slug, setSlug] = useState(null)
  const [car, setCar] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [activeImg, setActiveImg] = useState(0)
  const [fav, setFav] = useState(false)
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    params.then ? params.then((p) => setSlug(p.slug)) : setSlug(params.slug)
  }, [params])

  useEffect(() => {
    if (!slug) return
    Promise.all([api.getCarBySlug(slug), api.getSimilarCars(slug, 4)]).then(([c, s]) => {
      setCar(c)
      setSimilar(s)
      setLoading(false)
    })
  }, [slug])

  const tabs = ['overview', 'specs', 'features', 'dealer']

  if (loading) return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />
      <div className="mx-auto max-w-[1450px] px-5 pt-28 pb-20 lg:px-10">
        <SkeletonBlock className="h-10 w-64 mb-4" />
        <SkeletonBlock className="h-[420px] w-full" />
      </div>
    </main>
  )

  if (!car) return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-[24px] font-bold">Car not found</p>
          <a href="/cars" className="mt-4 inline-flex items-center gap-2 text-[#2ee52b]">
            <ArrowLeft size={16} /> Back to cars
          </a>
        </div>
      </div>
    </main>
  )

  const images = car.gallery?.length ? car.gallery : [car.image]

  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-white/8 pt-[72px]"
      >
        <div className="mx-auto flex max-w-[1450px] items-center gap-2 px-5 py-4 text-[12px] text-white/40 sm:px-8 lg:px-10">
          <a href="/" className="hover:text-white">Home</a>
          <span>/</span>
          <a href="/cars" className="hover:text-white">Buy Cars</a>
          <span>/</span>
          <span className="text-white">{car.name}</span>
        </div>
      </motion.div>

      <div className="mx-auto max-w-[1450px] px-5 py-10 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <FadeIn direction="left">
            <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#2ee52b]">Verified Vehicle</p>
            <h1 className="mt-2 text-[clamp(28px,4vw,48px)] font-black leading-tight tracking-tight">{car.name}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-3 text-[13px] text-white/50">
              <span className="flex items-center gap-1"><MapPin size={13} /> {car.location}</span>
              <span>· {car.year}</span>
              <span>· {car.mileage?.toLocaleString()} km</span>
            </p>
          </FadeIn>
          <FadeIn direction="right">
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setFav((v) => !v)}
                whileTap={{ scale: 0.88 }}
                className={`grid h-11 w-11 place-items-center rounded-full border transition ${fav ? 'border-[#2ee52b] bg-[#2ee52b]/10 text-[#2ee52b]' : 'border-white/15 text-white/60 hover:border-white/30'}`}
              >
                <Heart size={18} className={fav ? 'fill-[#2ee52b]' : ''} />
              </motion.button>
              <button className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/60 transition hover:border-white/30">
                <Share2 size={18} />
              </button>
            </div>
          </FadeIn>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Left: gallery + tabs */}
          <div>
            {/* Gallery */}
            <FadeIn direction="left">
              <div className="relative overflow-hidden rounded-[8px] bg-[#0b0d0c]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={images[activeImg]}
                    alt={car.name}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="aspect-[1.65] w-full object-cover"
                  />
                </AnimatePresence>
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg((i) => (i - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/70"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      onClick={() => setActiveImg((i) => (i + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/70"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="mt-3 flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`relative h-16 w-24 overflow-hidden rounded-[5px] border-2 transition ${activeImg === i ? 'border-[#2ee52b]' : 'border-transparent opacity-60 hover:opacity-90'}`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </FadeIn>

            {/* Tabs */}
            <FadeIn direction="up" delay={0.1}>
              <div className="mt-8">
                <div className="flex gap-1 border-b border-white/10">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative px-5 py-3 text-[12px] font-semibold capitalize transition ${activeTab === tab ? 'text-[#2ee52b]' : 'text-white/50 hover:text-white'}`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.span
                          layoutId="tab-underline"
                          className="absolute bottom-0 left-0 h-[2px] w-full bg-[#2ee52b]"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="py-6"
                  >
                    {activeTab === 'overview' && (
                      <div>
                        <h3 className="text-[16px] font-bold">About this car</h3>
                        <p className="mt-3 leading-7 text-[14px] text-white/60">{car.description}</p>
                        <div className="mt-6 grid grid-cols-2 gap-px bg-white/8 overflow-hidden rounded-[6px] sm:grid-cols-4">
                          {[
                            ['Year', car.year],
                            ['Mileage', `${car.mileage?.toLocaleString()} km`],
                            ['Engine', car.engine],
                            ['Power', car.power],
                            ['Drive', car.drive],
                            ['Fuel', car.fuel],
                            ['Transmission', car.transmission],
                            ['Body', car.body],
                          ].map(([k, v]) => (
                            <div key={k} className="bg-[#0b0d0c] p-4">
                              <p className="text-[10px] text-white/40 uppercase tracking-[.1em]">{k}</p>
                              <p className="mt-1 font-semibold text-[14px]">{v}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {activeTab === 'specs' && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          ['Make', car.make], ['Model', car.model], ['Year', car.year], ['Engine', car.engine],
                          ['Power', car.power], ['Drive', car.drive], ['Transmission', car.transmission],
                          ['Fuel', car.fuel], ['Mileage', `${car.mileage?.toLocaleString()} km`], ['Color', car.color],
                          ['Seats', car.seats], ['Body', car.body],
                        ].map(([k, v]) => (
                          <div key={k} className="flex items-center justify-between border-b border-white/8 py-3">
                            <span className="text-[13px] text-white/50">{k}</span>
                            <span className="text-[13px] font-semibold">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeTab === 'features' && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {car.features?.map((f) => (
                          <div key={f} className="flex items-center gap-3 rounded-[5px] border border-white/8 bg-[#0b0d0c] px-4 py-3">
                            <BadgeCheck size={16} className="shrink-0 text-[#2ee52b]" />
                            <span className="text-[13px]">{f}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeTab === 'dealer' && (
                      <div className="rounded-[7px] border border-white/10 bg-[#0b0d0c] p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.1em] text-[#2ee52b]">
                              <ShieldCheck size={14} /> Verified Dealer
                            </p>
                            <h3 className="mt-2 text-[18px] font-black">{car.dealer}</h3>
                          </div>
                          <a
                            href={`/dealers/${car.dealerSlug}`}
                            className="text-[12px] font-semibold text-[#2ee52b] hover:underline"
                          >
                            View showroom →
                          </a>
                        </div>
                        <div className="mt-5 flex gap-3">
                          <button className="flex h-10 items-center gap-2 rounded-[5px] border border-white/15 px-4 text-[12px] font-semibold transition hover:border-white/30">
                            Message
                          </button>
                          <button className="flex h-10 items-center gap-2 rounded-[5px] bg-[#2ee52b] px-4 text-[12px] font-bold text-black transition hover:bg-[#50f14d]">
                            Call Dealer
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </FadeIn>
          </div>

          {/* Right: price card */}
          <FadeIn direction="right">
            <aside className="sticky top-24 rounded-[8px] border border-white/12 bg-[#0b0d0c] p-6">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[.12em] text-white/40">Asking price</p>
                <ShieldCheck className="text-[#2ee52b]" size={18} />
              </div>
              <p className="mt-2 text-[38px] font-black text-[#2ee52b]">${car.price?.toLocaleString()}</p>
              <p className="mt-1 text-[12px] text-white/40">Finance from ${Math.round(car.price / 12).toLocaleString()} / month</p>

              <div className="mt-6 flex flex-col gap-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setBooked(true)}
                  className="h-12 w-full rounded-[5px] bg-[#2ee52b] text-[13px] font-bold text-black transition hover:bg-[#50f14d]"
                >
                  {booked ? '✓ Test Drive Requested' : 'Book a Test Drive'}
                </motion.button>
                <button className="flex h-12 w-full items-center justify-center gap-2 rounded-[5px] border border-white/15 text-[13px] font-bold transition hover:border-white/30">
                  Contact Seller <ArrowRight size={15} />
                </button>
              </div>

              <div className="mt-6 grid gap-3 border-t border-white/8 pt-5">
                <div className="flex items-center gap-3 text-[13px]">
                  <Gauge size={16} className="text-[#2ee52b]" />
                  <span>Inspection available</span>
                </div>
                <div className="flex items-center gap-3 text-[13px]">
                  <ShieldCheck size={16} className="text-[#2ee52b]" />
                  <span>Verified dealer</span>
                </div>
                <div className="flex items-center gap-3 text-[13px]">
                  <CalendarDays size={16} className="text-[#2ee52b]" />
                  <span>Member since {car.dealerSlug ? '2018' : '2020'}</span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/8 pt-5 text-center">
                <div>
                  <p className="text-[20px] font-black">{car.views?.toLocaleString()}</p>
                  <p className="text-[10px] text-white/40">Views</p>
                </div>
                <div>
                  <p className="text-[20px] font-black">12</p>
                  <p className="text-[10px] text-white/40">Saved</p>
                </div>
              </div>
            </aside>
          </FadeIn>
        </div>

        {/* Similar cars */}
        {similar.length > 0 && (
          <div className="mt-16">
            <FadeIn direction="up">
              <h2 className="mb-6 text-[22px] font-bold">Similar Cars</h2>
            </FadeIn>
            <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((c) => (
                <StaggerItem key={c.id}>
                  <motion.a
                    href={`/cars/${c.slug}`}
                    whileHover={{ y: -4 }}
                    className="group block overflow-hidden rounded-[7px] border border-white/10 bg-[#0b0d0c] transition hover:border-[#2ee52b]/40"
                  >
                    <div className="aspect-[1.45] overflow-hidden">
                      <img src={c.image} alt={c.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold">{c.name}</p>
                      <p className="mt-1 text-[12px] text-[#2ee52b] font-bold">${c.price?.toLocaleString()}</p>
                    </div>
                  </motion.a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}
      </div>

      <SiteFooter />
    </main>
  )
}
