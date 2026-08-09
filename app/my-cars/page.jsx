'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-section'

const initialListings = [
  {
    id: 1,
    title: '2023 BMW M4 Competition',
    price: 429000,
    status: 'Active',
    views: 248,
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=700&q=80',
    year: 2023, km: '18,200 km',
  },
  {
    id: 2,
    title: '2022 Audi A6',
    price: 219000,
    status: 'Pending',
    views: 67,
    img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=80',
    year: 2022, km: '28,000 km',
  },
]

const statusColor = {
  Active: 'text-[#2ee52b] bg-[#2ee52b]/10 border-[#2ee52b]/30',
  Pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  Sold: 'text-white/40 bg-white/5 border-white/15',
  Rejected: 'text-red-400 bg-red-400/10 border-red-400/30',
}

export default function MyCarsPage() {
  const [listings, setListings] = useState(initialListings)
  const [menuOpen, setMenuOpen] = useState(null)

  const remove = (id) => setListings((l) => l.filter((x) => x.id !== id))

  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />

      <section className="border-b border-white/8 pt-[72px]">
        <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8">
          <FadeIn direction="left">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.1em] text-[#2ee52b]">Account</p>
                <h1 className="mt-2 text-[clamp(28px,4vw,44px)] font-black tracking-tight">My Cars</h1>
                <p className="mt-1 text-[13px] text-white/50">{listings.length} active listings</p>
              </div>
              <a
                href="/sell"
                className="flex items-center gap-2 rounded-[5px] bg-[#2ee52b] px-5 py-2.5 text-[12px] font-bold text-black transition hover:bg-[#50f14d]"
              >
                <Plus size={15} /> Add Listing
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8">
        {listings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center"
          >
            <p className="text-[18px] font-bold">No listings yet</p>
            <p className="mt-2 text-white/50">Sell your first car and reach thousands of buyers</p>
            <a href="/sell" className="mt-5 inline-flex items-center gap-2 rounded-[5px] bg-[#2ee52b] px-6 py-3 text-[13px] font-bold text-black">
              <Plus size={15} /> List a car
            </a>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className="space-y-4">
              {listings.map((car, i) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 40, transition: { duration: 0.25 } }}
                  transition={{ delay: i * 0.06 }}
                  className="flex flex-col gap-4 overflow-hidden rounded-[7px] border border-white/10 bg-[#0b0d0c] sm:flex-row sm:items-center"
                >
                  <div className="relative h-44 w-full overflow-hidden sm:h-32 sm:w-48 shrink-0">
                    <img src={car.img} alt={car.title} className="h-full w-full object-cover" />
                    <span className={`absolute left-2 top-2 rounded-[3px] border px-2 py-0.5 text-[9px] font-black ${statusColor[car.status]}`}>
                      {car.status}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 px-4 pb-4 sm:flex-row sm:items-center sm:pb-0 sm:pr-4">
                    <div className="flex-1">
                      <h2 className="font-black">{car.title}</h2>
                      <p className="mt-1 text-[12px] text-white/50">{car.year} · {car.km}</p>
                      <div className="mt-2 flex items-center gap-3 text-[12px]">
                        <span className="font-black text-[#2ee52b]">${car.price.toLocaleString()}</span>
                        <span className="flex items-center gap-1 text-white/40">
                          <Eye size={12} /> {car.views} views
                        </span>
                      </div>
                    </div>

                    <div className="relative flex items-center gap-2">
                      <a href={`/cars/${car.id}`} className="flex items-center gap-1.5 rounded-[4px] border border-white/12 px-3 py-2 text-[11px] font-semibold transition hover:border-white/25">
                        <Eye size={13} /> Preview
                      </a>
                      <button className="flex items-center gap-1.5 rounded-[4px] border border-white/12 px-3 py-2 text-[11px] font-semibold transition hover:border-white/25">
                        <Pencil size={13} /> Edit
                      </button>
                      <button
                        onClick={() => setMenuOpen(menuOpen === car.id ? null : car.id)}
                        className="grid h-9 w-9 place-items-center rounded-[4px] border border-white/12 transition hover:border-white/25"
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      <AnimatePresence>
                        {menuOpen === car.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-0 top-full mt-1 z-10 w-36 overflow-hidden rounded-[6px] border border-white/12 bg-[#111512] shadow-xl"
                          >
                            <button
                              onClick={() => { remove(car.id); setMenuOpen(null) }}
                              className="flex w-full items-center gap-2 px-4 py-2.5 text-[12px] text-red-400 transition hover:bg-red-500/10"
                            >
                              <Trash2 size={13} /> Delete listing
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      <SiteFooter />
    </main>
  )
}
