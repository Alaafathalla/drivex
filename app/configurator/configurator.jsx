'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronRight, Paintbrush, Settings2, Sofa } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

// ── Configuration data ────────────────────────────────────────────────────
const MODELS = [
  {
    id: 'bmw-5',
    brand: 'BMW', model: '5 Series', year: 2024,
    basePrice: 54900,
    images: {
      Black:  'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1400&q=90',
      White:  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90',
      Silver: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=90',
      Blue:   'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=90',
    },
  },
  {
    id: 'merc-glc',
    brand: 'Mercedes-Benz', model: 'GLC 300', year: 2024,
    basePrice: 55000,
    images: {
      Black:  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=90',
      White:  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=90',
      Silver: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1400&q=90',
      Blue:   'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90',
    },
  },
  {
    id: 'porsche-911',
    brand: 'Porsche', model: '911 Carrera', year: 2024,
    basePrice: 185000,
    images: {
      Red:    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1400&q=90',
      Black:  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90',
      Silver: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=90',
      White:  'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1400&q=90',
    },
  },
]

const COLORS = [
  { name: 'Black',  hex: '#1a1a1a', price: 0 },
  { name: 'White',  hex: '#f8f8f8', price: 0 },
  { name: 'Silver', hex: '#c0c0c0', price: 0 },
  { name: 'Blue',   hex: '#1d4ed8', price: 2500 },
  { name: 'Red',    hex: '#dc2626', price: 2500 },
  { name: 'Green',  hex: '#16a34a', price: 3000 },
]

const RIMS = [
  { id: 'sport',    name: 'Sport 19"',     desc: 'Lightweight alloy',      price: 0,    icon: '◎' },
  { id: 'amg',      name: 'AMG 20"',       desc: 'Cross-spoke design',     price: 3500, icon: '◉' },
  { id: 'carbon',   name: 'Carbon 21"',    desc: 'Carbon-fiber composite', price: 7500, icon: '⬡' },
  { id: 'classic',  name: 'Classic 18"',   desc: '5-spoke polished',       price: 1500, icon: '◌' },
]

const INTERIORS = [
  { id: 'black-leather',  name: 'Black Leather',    color: '#1a1a1a', accent: '#2d2d2d', price: 0 },
  { id: 'beige-leather',  name: 'Nappa Beige',      color: '#c8b896', accent: '#b0a07e', price: 4500 },
  { id: 'red-leather',    name: 'Merino Red',        color: '#7f1d1d', accent: '#991b1b', price: 5500 },
  { id: 'grey-alcantara', name: 'Grey Alcantara',   color: '#6b7280', accent: '#4b5563', price: 6000 },
]

export default function ConfiguratorPage() {
  const [modelIdx, setModelIdx] = useState(0)
  const [colorIdx, setColorIdx] = useState(0)
  const [rimIdx,   setRimIdx]   = useState(0)
  const [intIdx,   setIntIdx]   = useState(0)
  const [tab,      setTab]      = useState('color')  // 'color' | 'rims' | 'interior'

  const model    = MODELS[modelIdx]
  const color    = COLORS[colorIdx]
  const rim      = RIMS[rimIdx]
  const interior = INTERIORS[intIdx]

  // Get the best image for the current color
  const currentImage = model.images[color.name] || Object.values(model.images)[0]
  const totalPrice = model.basePrice + color.price + rim.price + interior.price

  const fmt = (n) => new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(n)

  const TABS = [
    { id: 'color',    label: 'Exterior',  icon: Paintbrush },
    { id: 'rims',     label: 'Rims',      icon: Settings2 },
    { id: 'interior', label: 'Interior',  icon: Sofa },
  ]

  return (
    <main className="bg-[#F5F6F3]">
      <PageHero
        eyebrow="Car Configurator"
        title="Build your perfect spec."
        description="Choose your model, exterior colour, rim style and interior trim. See every change reflected instantly."
        image="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2200&q=86"
      />

      <section className="page-inner py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">

          {/* ── Left: visual preview ─────────────────── */}
          <div>
            {/* Model selector */}
            <div className="mb-5 flex flex-wrap gap-2">
              {MODELS.map((m, i) => (
                <motion.button
                  key={m.id}
                  onClick={() => { setModelIdx(i); setColorIdx(0) }}
                  whileTap={{ scale: 0.97 }}
                  className={`rounded-full border px-4 py-2 text-xs font-black transition ${
                    modelIdx === i
                      ? 'border-[#B5E92E] bg-[#B5E92E] text-[#071016]'
                      : 'border-[#dfe5db] bg-white text-[#0f172a] hover:border-[#B5E92E]'
                  }`}
                >
                  {m.brand} {m.model}
                </motion.button>
              ))}
            </div>

            {/* Car image */}
            <div className="relative overflow-hidden rounded-3xl border border-[#dfe5db] bg-white shadow-[0_20px_60px_rgba(15,23,42,.08)]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${modelIdx}-${color.name}`}
                  src={currentImage}
                  alt={`${model.brand} ${model.model} in ${color.name}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [.22,1,.36,1] }}
                  className="aspect-[16/9] w-full object-cover"
                />
              </AnimatePresence>

              {/* Live colour overlay label */}
              <motion.div
                key={color.name}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-3 py-1.5 backdrop-blur-sm"
              >
                <span className="h-3 w-3 rounded-full border border-white/20" style={{ background: color.hex }} />
                <span className="text-[11px] font-black text-white">{color.name}</span>
              </motion.div>

              {/* Interior preview swatch */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 backdrop-blur-sm">
                <span className="h-3 w-3 rounded-full" style={{ background: interior.color }} />
                <span className="h-3 w-3 rounded-full" style={{ background: interior.accent }} />
                <span className="text-[11px] font-bold text-white">{interior.name}</span>
              </div>
            </div>

            {/* Rim preview pills */}
            <div className="mt-4 flex gap-2">
              {RIMS.map((r, i) => (
                <motion.button
                  key={r.id}
                  onClick={() => setRimIdx(i)}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-1 flex-col items-center rounded-2xl border p-3 transition ${
                    rimIdx === i ? 'border-[#B5E92E] bg-white shadow-sm' : 'border-[#dfe5db] bg-white/60 hover:border-[#B5E92E]/50'
                  }`}
                >
                  <span className="text-xl" style={{ color: rimIdx === i ? '#B5E92E' : '#94a3b8' }}>{r.icon}</span>
                  <span className="mt-1 text-[10px] font-black text-[#0f172a]">{r.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* ── Right: options panel ──────────────────── */}
          <div className="space-y-5">
            {/* Model info */}
            <div className="rounded-2xl border border-[#dfe5db] bg-white p-5 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#7d9f24]">Selected model</p>
              <h2 className="mt-1 text-xl font-black text-[#0f172a]">{model.brand} {model.model} {model.year}</h2>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-[#94a3b8]">Base price</p>
                  <p className="text-lg font-black text-[#0f172a]">{fmt(model.basePrice)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#94a3b8]">Options added</p>
                  <p className="text-lg font-black text-[#B5E92E]">+{fmt(color.price + rim.price + interior.price)}</p>
                </div>
              </div>
            </div>

            {/* Tab selector */}
            <div className="flex rounded-2xl border border-[#dfe5db] bg-white p-1.5">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-black transition ${
                    tab === id ? 'bg-[#0e1418] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'
                  }`}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {tab === 'color' && (
                <motion.div key="color" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="rounded-2xl border border-[#dfe5db] bg-white p-5 shadow-sm">
                  <p className="mb-4 text-xs font-black uppercase tracking-[.14em] text-[#64748b]">Exterior colour</p>
                  <div className="grid grid-cols-3 gap-3">
                    {COLORS.map((c, i) => (
                      <motion.button
                        key={c.name}
                        whileTap={{ scale: 0.93 }}
                        onClick={() => setColorIdx(i)}
                        className={`relative flex flex-col items-center gap-2 rounded-2xl border p-3 transition ${
                          colorIdx === i ? 'border-[#B5E92E] shadow-sm' : 'border-[#f0f2ef] hover:border-[#dfe5db]'
                        }`}
                      >
                        <span
                          className="h-10 w-10 rounded-full border border-gray-200 shadow-sm"
                          style={{ background: c.hex }}
                        />
                        <span className="text-[10px] font-black text-[#0f172a]">{c.name}</span>
                        {c.price > 0
                          ? <span className="text-[9px] text-[#7d9f24]">+{fmt(c.price)}</span>
                          : <span className="text-[9px] text-[#94a3b8]">Included</span>
                        }
                        {colorIdx === i && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-[#B5E92E]">
                            <Check size={10} className="text-[#071016]" />
                          </motion.span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {tab === 'rims' && (
                <motion.div key="rims" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="rounded-2xl border border-[#dfe5db] bg-white p-5 shadow-sm">
                  <p className="mb-4 text-xs font-black uppercase tracking-[.14em] text-[#64748b]">Rim style</p>
                  <div className="space-y-2.5">
                    {RIMS.map((r, i) => (
                      <motion.button
                        key={r.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setRimIdx(i)}
                        className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                          rimIdx === i ? 'border-[#B5E92E] bg-[#fafdf4]' : 'border-[#f0f2ef] hover:border-[#dfe5db]'
                        }`}
                      >
                        <span className="text-3xl" style={{ color: rimIdx === i ? '#B5E92E' : '#94a3b8' }}>{r.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-black text-[#0f172a]">{r.name}</p>
                          <p className="text-xs text-[#64748b]">{r.desc}</p>
                        </div>
                        <div className="text-right">
                          {r.price > 0
                            ? <span className="text-sm font-black text-[#7d9f24]">+{fmt(r.price)}</span>
                            : <span className="rounded-full bg-[#eef4df] px-2 py-0.5 text-[10px] font-black text-[#7d9f24]">Standard</span>
                          }
                        </div>
                        {rimIdx === i && <Check size={16} className="shrink-0 text-[#B5E92E]" />}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {tab === 'interior' && (
                <motion.div key="interior" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="rounded-2xl border border-[#dfe5db] bg-white p-5 shadow-sm">
                  <p className="mb-4 text-xs font-black uppercase tracking-[.14em] text-[#64748b]">Interior trim</p>
                  <div className="space-y-2.5">
                    {INTERIORS.map((int, i) => (
                      <motion.button
                        key={int.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIntIdx(i)}
                        className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                          intIdx === i ? 'border-[#B5E92E] bg-[#fafdf4]' : 'border-[#f0f2ef] hover:border-[#dfe5db]'
                        }`}
                      >
                        <div className="flex h-10 w-16 shrink-0 overflow-hidden rounded-xl shadow-sm">
                          <div className="h-full w-1/2" style={{ background: int.color }} />
                          <div className="h-full w-1/2" style={{ background: int.accent }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black text-[#0f172a]">{int.name}</p>
                        </div>
                        <div className="text-right">
                          {int.price > 0
                            ? <span className="text-sm font-black text-[#7d9f24]">+{fmt(int.price)}</span>
                            : <span className="rounded-full bg-[#eef4df] px-2 py-0.5 text-[10px] font-black text-[#7d9f24]">Standard</span>
                          }
                        </div>
                        {intIdx === i && <Check size={16} className="shrink-0 text-[#B5E92E]" />}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Summary + CTA */}
            <div className="rounded-2xl border border-[#dfe5db] bg-[#0b141b] p-5 text-white shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#B5E92E]">Your configuration</p>
              <div className="mt-3 space-y-2 text-sm">
                {[
                  ['Model',    `${model.brand} ${model.model}`],
                  ['Colour',   color.name],
                  ['Rims',     rim.name],
                  ['Interior', interior.name],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between">
                    <span className="text-white/50">{k}</span>
                    <span className="font-bold">{v}</span>
                  </div>
                ))}
                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="font-black text-white/70">Total</span>
                  <motion.span key={totalPrice} initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                    className="text-xl font-black text-[#B5E92E]">{fmt(totalPrice)}</motion.span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <a href="/cars" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#B5E92E] px-4 py-3 text-xs font-black text-[#071016] transition hover:brightness-105">
                  Find this spec <ChevronRight size={14} />
                </a>
                <a href="/calculator" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-black text-white transition hover:bg-white/10">
                  Finance it
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
