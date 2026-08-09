'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, GitCompare, Plus, X } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FadeIn } from '@/components/motion-section'
import { CARS } from '@/lib/api'

const SPEC_ROWS = [
  ['Price', (c) => `$${c.price?.toLocaleString()}`],
  ['Year', (c) => c.year],
  ['Mileage', (c) => `${c.mileage?.toLocaleString()} km`],
  ['Engine', (c) => c.engine],
  ['Power', (c) => c.power],
  ['Drive', (c) => c.drive],
  ['Transmission', (c) => c.transmission],
  ['Fuel', (c) => c.fuel],
  ['Body', (c) => c.body],
  ['Color', (c) => c.color],
  ['Seats', (c) => c.seats],
  ['Location', (c) => c.location],
]

const MAX = 4

export default function ComparePage() {
  const [selected, setSelected] = useState([CARS[0], CARS[1]])
  const [picker, setPicker] = useState(null) // index of slot being picked

  const addCar = (car) => {
    if (picker !== null) {
      const next = [...selected]
      next[picker] = car
      setSelected(next)
      setPicker(null)
    } else if (selected.length < MAX) {
      setSelected([...selected, car])
    }
  }

  const removeCar = (i) => setSelected(selected.filter((_, idx) => idx !== i))

  const available = CARS.filter((c) => !selected.find((s) => s?.id === c.id))

  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-white/8 pt-[72px]">
        <div className="mx-auto max-w-[1450px] px-5 py-12 sm:px-8 lg:px-10">
          <FadeIn direction="left">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.1em] text-[#2ee52b]">
              <GitCompare size={14} /> Compare vehicles
            </p>
            <h1 className="mt-2 text-[clamp(32px,5vw,56px)] font-black tracking-tight">Side-by-side comparison</h1>
            <p className="mt-2 text-[14px] text-white/50">Compare up to 4 vehicles on every spec that matters.</p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-[1450px] overflow-x-auto px-5 py-10 sm:px-8 lg:px-10">
        {/* Car slots */}
        <FadeIn direction="up">
          <div className={`grid min-w-[680px] gap-3 mb-8`} style={{ gridTemplateColumns: `200px repeat(${Math.max(selected.length, 2)}, 1fr)` }}>
            <div className="flex items-end pb-2">
              <p className="text-[12px] font-bold text-white/40">Comparing {selected.length} cars</p>
            </div>
            {selected.map((car, i) => (
              <motion.div
                key={car?.id ?? `slot-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative overflow-hidden rounded-[7px] border border-white/10 bg-[#0b0d0c]"
              >
                <button
                  onClick={() => removeCar(i)}
                  className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-black/40 text-white/60 backdrop-blur-sm transition hover:text-red-400"
                >
                  <X size={13} />
                </button>
                <div className="aspect-[1.4] overflow-hidden">
                  <img src={car.image} alt={car.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-[12px] font-bold leading-tight">{car.name}</p>
                  <p className="mt-0.5 text-[11px] font-black text-[#2ee52b]">${car.price?.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
            {selected.length < MAX && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setPicker('new')}
                className="flex min-h-[160px] flex-col items-center justify-center gap-2 rounded-[7px] border border-dashed border-white/15 text-[12px] text-white/35 transition hover:border-[#2ee52b]/50 hover:text-[#2ee52b]"
              >
                <Plus size={20} />
                Add car
              </motion.button>
            )}
          </div>
        </FadeIn>

        {/* Spec table */}
        <FadeIn direction="up" delay={0.1}>
          <div className={`min-w-[680px] overflow-hidden rounded-[7px] border border-white/10`}>
            {SPEC_ROWS.map(([label, getter], rowIdx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: rowIdx * 0.03 }}
                className={`grid items-center divide-x divide-white/8 ${rowIdx % 2 === 0 ? 'bg-[#0b0d0c]' : 'bg-[#0d0f0e]'}`}
                style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}
              >
                <div className="px-4 py-3.5">
                  <p className="text-[12px] font-semibold text-white/50">{label}</p>
                </div>
                {selected.map((car) => {
                  const val = getter(car)
                  // Highlight best price (lowest)
                  const allVals = selected.map((c) => getter(c))
                  const numVal = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.]/g, '')) : val
                  const allNums = allVals.map((v) => typeof v === 'string' ? parseFloat(v.replace(/[^0-9.]/g, '')) : v)
                  const isBest = label === 'Price'
                    ? numVal === Math.min(...allNums)
                    : label === 'Power' || label === 'Mileage'
                    ? numVal === (label === 'Power' ? Math.max(...allNums) : Math.min(...allNums))
                    : false

                  return (
                    <div key={car.id} className={`px-4 py-3.5 text-[13px] font-semibold ${isBest ? 'text-[#2ee52b]' : ''}`}>
                      {isBest && <Check size={11} className="inline mr-1 text-[#2ee52b]" />}
                      {val}
                    </div>
                  )
                })}
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* View details links */}
        <div className={`mt-4 grid min-w-[680px] gap-3`} style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>
          <div />
          {selected.map((car) => (
            <a
              key={car.id}
              href={`/cars/${car.slug}`}
              className="flex items-center justify-center gap-1 rounded-[5px] border border-white/12 py-2.5 text-[12px] font-semibold transition hover:border-[#2ee52b] hover:text-[#2ee52b]"
            >
              View details <ArrowRight size={13} />
            </a>
          ))}
        </div>
      </div>

      {/* Car picker modal */}
      <AnimatePresence>
        {picker !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setPicker(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-4 top-1/2 z-50 max-w-2xl -translate-y-1/2 overflow-hidden rounded-[10px] border border-white/15 bg-[#0b0d0c] shadow-2xl sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <h3 className="font-bold">Select a car to add</h3>
                <button onClick={() => setPicker(null)}><X size={18} /></button>
              </div>
              <div className="max-h-[400px] overflow-y-auto p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {available.map((car) => (
                    <button
                      key={car.id}
                      onClick={() => addCar(car)}
                      className="flex items-center gap-3 rounded-[6px] border border-white/10 bg-[#0f1210] p-3 text-left transition hover:border-[#2ee52b]/50"
                    >
                      <img src={car.image} alt={car.name} className="h-14 w-20 shrink-0 rounded object-cover" />
                      <div>
                        <p className="text-[13px] font-semibold">{car.name}</p>
                        <p className="mt-0.5 text-[11px] text-[#2ee52b]">${car.price?.toLocaleString()}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SiteFooter />
    </main>
  )
}
