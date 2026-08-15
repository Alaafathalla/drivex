'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Navigation, Truck } from 'lucide-react'
import { RENTAL_LOCATIONS } from '@/lib/rental-catalog'

export default function RentByLocationPage() {
  return (
    <main className="min-h-screen bg-[#F5F6F3]">
      <section className="page-inner py-16 sm:py-20 lg:py-24">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_.7fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#7C8B55]">Rent by location</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-[-.055em] text-[#0F172A] sm:text-6xl">Your car, where you need it.</h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#64748B]">Choose the nearest pickup point or request vehicle delivery. Rental availability can then be refined by your exact start and end dates.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {RENTAL_LOCATIONS.map((location, index) => (
            <motion.a
              key={location.city}
              href={`/rentals?location=${encodeURIComponent(location.city)}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .4, delay: index * .05 }}
              className="group overflow-hidden rounded-[26px] border border-[#E2E6DE] bg-white shadow-[0_18px_45px_rgba(15,23,42,.055)]"
            >
              <div className="relative aspect-[1.65] overflow-hidden">
                <img src={location.image} alt={location.city} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071016]/80 via-[#071016]/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.12em] text-white/70"><MapPin size={13} className="text-[#B5E92E]" /> {location.area}</p>
                  <h2 className="mt-1 text-2xl font-black tracking-[-.03em]">{location.city}</h2>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-6 text-[#64748B]">{location.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-[#EEF0EC] pt-4">
                  <span className="text-xs font-black text-[#0F172A]">{location.cars}+ cars nearby</span>
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 grid gap-4 rounded-[28px] bg-[#0B1319] p-6 text-white sm:grid-cols-2 sm:p-8">
          <div className="flex gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#B5E92E] text-[#0B1319]"><Navigation size={18} /></div><div><h3 className="font-black">Flexible pickup</h3><p className="mt-1 text-sm leading-6 text-white/55">Choose a listed hub or provide your preferred delivery area during booking.</p></div></div>
          <div className="flex gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#B5E92E] text-[#0B1319]"><Truck size={18} /></div><div><h3 className="font-black">Doorstep delivery</h3><p className="mt-1 text-sm leading-6 text-white/55">Premium delivery can be added to eligible rentals and special-event bookings.</p></div></div>
        </div>
      </section>
    </main>
  )
}
