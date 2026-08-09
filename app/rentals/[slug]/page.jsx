'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, BadgeCheck, CalendarDays, CheckCircle2,
  Fuel, Gauge, Loader2, MapPin, Settings2, ShieldCheck, Users,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FadeIn } from '@/components/motion-section'
import { api } from '@/lib/api'

export default function RentalDetailsPage({ params }) {
  const [slug, setSlug] = useState(null)
  const [rental, setRental] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [booked, setBooked] = useState(false)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    params.then ? params.then((p) => setSlug(p.slug)) : setSlug(params.slug)
  }, [params])

  useEffect(() => {
    if (!slug) return
    api.getRentalBySlug(slug).then((r) => {
      setRental(r)
      setLoading(false)
    })
  }, [slug])

  const days = pickupDate && returnDate
    ? Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / 86400000))
    : 0

  const total = rental ? days * rental.pricePerDay : 0

  if (loading) return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-[#2ee52b]" size={32} />
      </div>
    </main>
  )

  if (!rental) return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-[24px] font-bold">Rental not found</p>
          <a href="/rentals" className="mt-4 inline-flex items-center gap-2 text-[#2ee52b]">
            <ArrowLeft size={16} /> Back to rentals
          </a>
        </div>
      </div>
    </main>
  )

  const images = rental.gallery?.length ? rental.gallery : [rental.image]

  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-b border-white/8 pt-[72px]"
      >
        <div className="mx-auto flex max-w-[1450px] items-center gap-2 px-5 py-4 text-[12px] text-white/40 lg:px-10">
          <a href="/rentals" className="hover:text-white">Rent Cars</a>
          <span>/</span>
          <span className="text-white">{rental.name}</span>
        </div>
      </motion.div>

      <div className="mx-auto max-w-[1450px] px-5 py-10 lg:px-10">
        {/* Title */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <FadeIn direction="left">
            <span className="inline-block rounded-[3px] bg-[#2ee52b] px-2 py-[3px] text-[9px] font-black text-black mb-2">
              FOR RENT
            </span>
            <h1 className="text-[clamp(30px,4vw,52px)] font-black tracking-tight">{rental.name}</h1>
            <p className="mt-2 text-[14px] text-white/50">{rental.make} · {rental.year} · {rental.category}</p>
          </FadeIn>
          <FadeIn direction="right">
            <div className="text-right">
              <p className="text-[36px] font-black text-[#2ee52b]">${rental.pricePerDay}</p>
              <p className="text-[12px] text-white/40">per day</p>
            </div>
          </FadeIn>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Gallery */}
          <div>
            <FadeIn direction="left">
              <div className="relative overflow-hidden rounded-[8px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={images[activeImg]}
                    alt={rental.name}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-[1.7] w-full object-cover"
                  />
                </AnimatePresence>
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg((i) => (i - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/40 backdrop-blur-sm"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      onClick={() => setActiveImg((i) => (i + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/40 backdrop-blur-sm"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </>
                )}
              </div>
            </FadeIn>

            {/* Specs */}
            <FadeIn direction="up" delay={0.1}>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  [Settings2, 'Transmission', rental.transmission],
                  [Users, 'Seats', `${rental.seats} seats`],
                  [Fuel, 'Fuel', rental.fuel],
                  [Gauge, 'Mileage', 'Unlimited'],
                ].map(([Icon, label, value]) => (
                  <div key={label} className="rounded-[6px] border border-white/10 bg-[#0b0d0c] p-4">
                    <Icon size={18} className="text-[#2ee52b]" />
                    <p className="mt-2 text-[10px] text-white/40">{label}</p>
                    <p className="mt-0.5 text-[13px] font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Description */}
            <FadeIn direction="up" delay={0.15}>
              <div className="mt-6 rounded-[7px] border border-white/10 bg-[#0b0d0c] p-5">
                <h3 className="font-bold">About this car</h3>
                <p className="mt-3 text-[14px] leading-7 text-white/60">{rental.description}</p>
              </div>
            </FadeIn>

            {/* Included features */}
            <FadeIn direction="up" delay={0.2}>
              <div className="mt-6">
                <h3 className="mb-4 font-bold">What's included</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {rental.features?.map((f) => (
                    <div key={f} className="flex items-center gap-3 rounded-[5px] border border-white/8 bg-[#0b0d0c] px-4 py-3">
                      <CheckCircle2 size={15} className="shrink-0 text-[#2ee52b]" />
                      <span className="text-[13px]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Rental conditions */}
            <FadeIn direction="up" delay={0.25}>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ['Deposit', `$${rental.deposit}`],
                  ['Min. Days', rental.minDays],
                  ['Availability', rental.available ? 'Available' : 'Unavailable'],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-[6px] border border-white/8 bg-[#0b0d0c] p-4 text-center">
                    <p className="text-[10px] text-white/40">{k}</p>
                    <p className={`mt-1 text-[15px] font-black ${v === 'Available' ? 'text-[#2ee52b]' : v === 'Unavailable' ? 'text-red-400' : ''}`}>{v}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Booking card */}
          <FadeIn direction="right">
            <aside className="sticky top-24 rounded-[8px] border border-white/12 bg-[#0b0d0c] p-6">
              <p className="text-[10px] uppercase tracking-[.12em] text-white/40">Rental pricing</p>
              <div className="mt-2 flex items-end gap-2">
                <p className="text-[36px] font-black text-[#2ee52b]">${rental.pricePerDay}</p>
                <p className="mb-2 text-[13px] text-white/40">/ day</p>
              </div>
              <p className="text-[12px] text-white/40">or ${rental.pricePerMonth}/month</p>

              {!booked ? (
                <div className="mt-6 space-y-4">
                  <label className="block text-[11px] font-semibold uppercase tracking-[.08em] text-white/50">
                    Pickup Date
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-2 flex h-12 w-full items-center rounded-[5px] border border-white/12 bg-[#111512] px-4 text-[13px] text-white outline-none normal-case focus:border-[#2ee52b]"
                    />
                  </label>
                  <label className="block text-[11px] font-semibold uppercase tracking-[.08em] text-white/50">
                    Return Date
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={pickupDate || new Date().toISOString().split('T')[0]}
                      className="mt-2 flex h-12 w-full items-center rounded-[5px] border border-white/12 bg-[#111512] px-4 text-[13px] text-white outline-none normal-case focus:border-[#2ee52b]"
                    />
                  </label>
                  <label className="block text-[11px] font-semibold uppercase tracking-[.08em] text-white/50">
                    Pickup Location
                    <select className="mt-2 h-12 w-full rounded-[5px] border border-white/12 bg-[#111512] px-4 text-[13px] text-white outline-none normal-case focus:border-[#2ee52b]">
                      <option>Dubai Marina</option>
                      <option>Dubai Airport</option>
                      <option>Downtown Dubai</option>
                      <option>Abu Dhabi</option>
                    </select>
                  </label>

                  {days > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="rounded-[5px] border border-[#2ee52b]/30 bg-[#2ee52b]/8 p-4"
                    >
                      <div className="flex justify-between text-[13px]">
                        <span className="text-white/60">${rental.pricePerDay} × {days} days</span>
                        <span className="font-bold text-[#2ee52b]">${total}</span>
                      </div>
                      <div className="flex justify-between text-[13px] mt-2 pt-2 border-t border-white/10">
                        <span className="text-white/60">Deposit</span>
                        <span>${rental.deposit}</span>
                      </div>
                    </motion.div>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => rental.available && setBooked(true)}
                    className={`h-12 w-full rounded-[5px] text-[13px] font-bold transition ${
                      rental.available
                        ? 'bg-[#2ee52b] text-black hover:bg-[#50f14d]'
                        : 'cursor-not-allowed bg-white/10 text-white/30'
                    }`}
                  >
                    {rental.available ? 'Book Now' : 'Unavailable'}
                  </motion.button>
                  <p className="text-center text-[11px] text-white/35">
                    Free cancellation up to 24h before pickup
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 rounded-[7px] border border-[#2ee52b]/30 bg-[#2ee52b]/10 p-6 text-center"
                >
                  <CheckCircle2 size={32} className="mx-auto text-[#2ee52b]" />
                  <p className="mt-3 font-bold text-[#2ee52b]">Booking Confirmed!</p>
                  <p className="mt-1 text-[12px] text-white/50">We'll contact you with details</p>
                  <button
                    onClick={() => setBooked(false)}
                    className="mt-4 text-[11px] text-white/40 hover:text-white underline"
                  >
                    Make another booking
                  </button>
                </motion.div>
              )}
            </aside>
          </FadeIn>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
