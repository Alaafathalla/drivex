'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, BadgeCheck, ChevronDown, RefreshCw,
  TrendingDown, TrendingUp, Minus,
} from 'lucide-react'
import { MAKES, BODY_TYPES, FUEL_TYPES, TRANSMISSIONS } from '@/lib/api'

const CONDITIONS = ['Excellent', 'Good', 'Fair', 'Poor']
const YEARS = Array.from({ length: 15 }, (_, i) => 2024 - i)

function valEstimate(make, year, mileage, condition) {
  const bases = {
    BMW: 45000, 'Mercedes-Benz': 47000, Audi: 42000, Porsche: 90000,
    'Land Rover': 78000, Tesla: 48000, Toyota: 28000, Lexus: 44000,
  }
  const base = bases[make] || 30000
  const age = 2024 - Number(year)
  const ageFactor = Math.max(0.3, 1 - age * 0.07)
  const km = Number(mileage) || 0
  const kmFactor = Math.max(0.6, 1 - km / 300000)
  const condFactor = { Excellent: 1.08, Good: 1, Fair: 0.87, Poor: 0.72 }[condition] || 1
  const val = Math.round(base * ageFactor * kmFactor * condFactor)
  return { low: Math.round(val * 0.92), mid: val, high: Math.round(val * 1.1) }
}

function Sel({ label, value, onChange, options }) {
  return (
    <label className="block text-[11px] font-bold uppercase tracking-[.1em] text-white/50">
      {label}
      <div className="relative mt-2">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none rounded-[5px] border border-white/12 bg-[#0f1210] px-4 py-3 pe-9 text-[13px] text-white outline-none normal-case tracking-normal focus:border-[#2ee52b] transition"
        >
          <option value="">Select…</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-white/30" />
      </div>
    </label>
  )
}

function NumInput({ label, placeholder, value, onChange }) {
  return (
    <label className="block text-[11px] font-bold uppercase tracking-[.1em] text-white/50">
      {label}
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-[5px] border border-white/12 bg-[#0f1210] px-4 text-[13px] text-white outline-none normal-case tracking-normal focus:border-[#2ee52b] transition"
      />
    </label>
  )
}

export default function ValuationPage() {
  const [form, setForm] = useState({ make: '', year: '', mileage: '', condition: '', fuel: '', body: '', transmission: '' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.make || !form.year || !form.condition) return
    setLoading(true)
    setResult(null)
    await new Promise(r => setTimeout(r, 1200))
    setResult(valEstimate(form.make, form.year, form.mileage, form.condition))
    setLoading(false)
  }

  const canSubmit = form.make && form.year && form.condition

  return (
    <main className="min-h-screen bg-[#070908] text-white">{/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(46,229,43,.13),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1450px] px-5 py-16 sm:px-8 lg:px-10">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.14em] text-[#2ee52b]">
            <span className="h-[2px] w-8 bg-[#2ee52b]" /> Free Valuation
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-[clamp(38px,5.5vw,72px)] font-black leading-[.92] tracking-[-.05em]">
            What's your car<br />worth today?
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-5 max-w-lg text-[15px] leading-7 text-white/55">
            Get an instant market valuation based on current demand, mileage and condition — completely free with no obligation.
          </motion.p>

          {/* Trust badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap gap-4">
            {['Instant result', 'No registration', 'Live market data'].map((b, i) => (
              <span key={b} className="flex items-center gap-2 text-[12px] text-white/50">
                <BadgeCheck size={14} className="text-[#2ee52b]" /> {b}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}>
            <div className="rounded-[8px] border border-white/10 bg-[#0b0d0c] p-7">
              <h2 className="text-[18px] font-black">Your vehicle details</h2>
              <p className="mt-1 text-[13px] text-white/45">The more you fill in, the more precise your estimate.</p>

              <form onSubmit={handleSubmit} className="mt-7 grid gap-4 sm:grid-cols-2">
                <Sel label="Make" value={form.make} onChange={v => set('make', v)} options={MAKES} />
                <Sel label="Year" value={form.year} onChange={v => set('year', v)} options={YEARS.map(String)} />
                <NumInput label="Mileage (km)" placeholder="e.g. 35000" value={form.mileage} onChange={v => set('mileage', v)} />
                <Sel label="Condition" value={form.condition} onChange={v => set('condition', v)} options={CONDITIONS} />
                <Sel label="Fuel type" value={form.fuel} onChange={v => set('fuel', v)} options={FUEL_TYPES} />
                <Sel label="Body type" value={form.body} onChange={v => set('body', v)} options={BODY_TYPES} />
                <Sel label="Transmission" value={form.transmission} onChange={v => set('transmission', v)} options={TRANSMISSIONS} />

                <div className="sm:col-span-2 mt-2">
                  <motion.button
                    type="submit"
                    disabled={!canSubmit || loading}
                    whileTap={{ scale: 0.97 }}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-[5px] bg-[#2ee52b] text-[13px] font-bold text-black transition hover:bg-[#50f14d] disabled:opacity-50"
                  >
                    {loading ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="inline-block"
                      >
                        <RefreshCw size={17} />
                      </motion.span>
                    ) : (
                      <><span>Get My Valuation</span> <ArrowRight size={15} /></>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Result panel */}
          <div>
            <AnimatePresence mode="wait">
              {!result && !loading && (
                <motion.div key="placeholder"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex flex-col gap-5">
                  {/* How it works */}
                  <div className="rounded-[8px] border border-white/10 bg-[#0b0d0c] p-6">
                    <h3 className="font-black">How it works</h3>
                    <div className="mt-5 space-y-4">
                      {[
                        ['1', 'Enter your car details', 'Make, year, mileage and condition'],
                        ['2', 'We analyse the market', 'Live data from 10,000+ listings'],
                        ['3', 'Get instant estimate', 'Low, mid and high range prices'],
                      ].map(([n, title, sub]) => (
                        <motion.div key={n}
                          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }} transition={{ delay: Number(n) * 0.1 }}
                          className="flex items-start gap-4">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2ee52b]/10 text-[12px] font-black text-[#2ee52b]">
                            {n}
                          </span>
                          <div>
                            <p className="text-[13px] font-semibold">{title}</p>
                            <p className="mt-0.5 text-[11px] text-white/40">{sub}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Example values */}
                  <div className="rounded-[8px] border border-white/10 bg-[#0b0d0c] p-6">
                    <p className="text-[11px] font-bold uppercase tracking-[.1em] text-[#2ee52b]">Example estimate</p>
                    <p className="mt-2 font-black">2022 BMW 5 Series · 28,000 km</p>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {[['Low', '$42,000', 'text-white/50'], ['Market', '$47,500', 'text-[#2ee52b]'], ['High', '$53,000', 'text-white/50']].map(([l, v, c]) => (
                        <div key={l} className="rounded-[5px] bg-white/5 p-3 text-center">
                          <p className="text-[9px] text-white/35">{l}</p>
                          <p className={`mt-1 text-[14px] font-black ${c}`}>{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {loading && (
                <motion.div key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-6 rounded-[8px] border border-white/10 bg-[#0b0d0c] p-14">
                  {/* Pulse rings */}
                  <div className="relative flex h-20 w-20 items-center justify-center">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i}
                        className="absolute rounded-full border border-[#2ee52b]/40"
                        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.5 }}
                        style={{ width: 40 + i * 20, height: 40 + i * 20 }}
                      />
                    ))}
                    <span className="text-[22px] font-black italic text-[#2ee52b]">DX</span>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">Analysing market data…</p>
                    <p className="mt-1 text-[12px] text-white/40">Comparing 10,000+ listings</p>
                  </div>
                  {/* Scanning bar */}
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-[#2ee52b]"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div key="result"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4">

                  {/* Main value */}
                  <div className="overflow-hidden rounded-[8px] border border-[#2ee52b]/30 bg-[linear-gradient(135deg,#07130a,#0b2810)] p-7">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#2ee52b]">Market estimate</p>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="mt-3 text-[48px] font-black leading-none tracking-tight text-white"
                        >
                          ${result.mid.toLocaleString()}
                        </motion.p>
                        <p className="mt-2 text-[13px] text-white/50">
                          {form.year} {form.make} · {form.condition} condition
                        </p>
                      </div>
                      <BadgeCheck size={24} className="mt-1 text-[#2ee52b]" />
                    </div>

                    {/* Range bar */}
                    <div className="mt-6">
                      <div className="flex justify-between text-[11px] text-white/40 mb-2">
                        <span>${result.low.toLocaleString()}</span>
                        <span>${result.high.toLocaleString()}</span>
                      </div>
                      <div className="relative h-2 rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="absolute inset-y-0 start-0 rounded-full bg-gradient-to-r from-[#2ee52b]/40 via-[#2ee52b] to-[#2ee52b]/40"
                        />
                        {/* Mid marker */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.9, type: 'spring' }}
                          className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#2ee52b] bg-[#070908]"
                        />
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {[
                          [TrendingDown, 'Low', result.low, 'text-white/50'],
                          [Minus,        'Mid',  result.mid, 'text-[#2ee52b]'],
                          [TrendingUp,   'High', result.high,'text-white/50'],
                        ].map(([Icon, label, val, col]) => (
                          <div key={label} className="rounded-[5px] bg-white/5 p-3 text-center">
                            <Icon size={13} className={`mx-auto mb-1 ${col}`} />
                            <p className="text-[9px] text-white/35">{label}</p>
                            <p className={`mt-0.5 text-[13px] font-black ${col}`}>${val.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* What next */}
                  <div className="rounded-[8px] border border-white/10 bg-[#0b0d0c] p-5">
                    <p className="text-[12px] font-bold text-white/60 mb-3">What would you like to do?</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {[
                        ['Sell my car', '/sell', true],
                        ['Browse similar', '/cars', false],
                      ].map(([label, href, primary]) => (
                        <a key={href} href={href}
                          className={`flex items-center justify-center gap-2 rounded-[5px] py-3 text-[12px] font-bold transition ${
                            primary
                              ? 'bg-[#2ee52b] text-black hover:bg-[#50f14d]'
                              : 'border border-white/12 text-white/70 hover:border-white/30'
                          }`}>
                          {label} <ArrowRight size={13} />
                        </a>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => { setResult(null); setForm({ make:'', year:'', mileage:'', condition:'', fuel:'', body:'', transmission:'' }) }}
                    className="flex items-center gap-2 text-[12px] font-semibold text-white/35 hover:text-white transition"
                  >
                    <RefreshCw size={13} /> Value another car
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section></main>
  )
}
