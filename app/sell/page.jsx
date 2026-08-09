'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Upload } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FadeIn } from '@/components/motion-section'
import { BODY_TYPES, FUEL_TYPES, LOCATIONS, MAKES, TRANSMISSIONS } from '@/lib/api'

const STEPS = [
  { id: 1, label: 'Vehicle', desc: 'Make, model and year' },
  { id: 2, label: 'Details', desc: 'Specs and condition' },
  { id: 3, label: 'Features', desc: 'Equipment list' },
  { id: 4, label: 'Photos', desc: 'Upload images' },
  { id: 5, label: 'Price', desc: 'Asking price' },
  { id: 6, label: 'Contact', desc: 'Your details' },
  { id: 7, label: 'Review', desc: 'Final check' },
]

const FEATURES_LIST = [
  'Leather Interior', 'Sunroof / Panoramic', 'Navigation System', 'Heated Seats',
  'Apple CarPlay', 'Android Auto', 'Rear Camera', '360 Camera', 'Blind Spot Monitor',
  'Lane Assist', 'Adaptive Cruise', 'Parking Sensors', 'Wireless Charging', 'Ventilated Seats',
  'Heads-Up Display', 'Premium Sound', 'Keyless Entry', 'Electric Seats', 'Memory Seats', 'Ambient Lighting',
]

function FieldInput({ label, placeholder, type = 'text', value, onChange }) {
  return (
    <label className="block text-[11px] font-bold uppercase tracking-[.09em] text-white/50">
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-[5px] border border-white/12 bg-[#0f1210] px-4 text-[13px] text-white outline-none normal-case tracking-normal focus:border-[#2ee52b] transition"
      />
    </label>
  )
}

function FieldSelect({ label, options, value, onChange }) {
  return (
    <label className="block text-[11px] font-bold uppercase tracking-[.09em] text-white/50">
      {label}
      <select
        value={value}
        onChange={onChange}
        className="mt-2 h-12 w-full rounded-[5px] border border-white/12 bg-[#0f1210] px-4 text-[13px] text-white outline-none normal-case focus:border-[#2ee52b] transition"
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  )
}

export default function SellPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    make: '', model: '', year: '', mileage: '', vin: '',
    condition: '', body: '', fuel: '', transmission: '', color: '', doors: '', seats: '',
    features: [],
    price: '', negotiable: false,
    name: '', email: '', phone: '', location: '', description: '',
  })

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))
  const toggleFeature = (f) => setForm((prev) => ({
    ...prev,
    features: prev.features.includes(f) ? prev.features.filter((x) => x !== f) : [...prev.features, f],
  }))

  const next = () => setStep((s) => Math.min(STEPS.length, s + 1))
  const back = () => setStep((s) => Math.max(1, s - 1))
  const submit = () => setSubmitted(true)

  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8 pt-[72px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(46,229,43,.1),transparent_50%)]" />
        <div className="relative mx-auto max-w-[1450px] px-5 py-12 sm:px-8 lg:px-10">
          <FadeIn direction="left">
            <p className="text-[11px] font-bold uppercase tracking-[.1em] text-[#2ee52b]">Sell with DriveX</p>
            <h1 className="mt-2 text-[clamp(36px,5vw,64px)] font-black tracking-tight">
              A better market<br />for your car.
            </h1>
            <p className="mt-3 max-w-md text-[14px] text-white/55">
              Get a smart valuation, reach verified buyers and sell faster with our guided listing process.
            </p>
          </FadeIn>
        </div>
      </section>

      {submitted ? (
        <div className="flex min-h-[50vh] items-center justify-center px-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-md rounded-[10px] border border-[#2ee52b]/30 bg-[#0b0d0c] p-10 text-center"
          >
            <CheckCircle2 size={48} className="mx-auto text-[#2ee52b]" />
            <h2 className="mt-5 text-[24px] font-black">Listing Submitted!</h2>
            <p className="mt-3 text-[14px] text-white/55">
              Your {form.year} {form.make} {form.model} is under review. We'll notify you within 24 hours.
            </p>
            <a href="/my-cars" className="mt-6 inline-flex items-center gap-2 rounded-[5px] bg-[#2ee52b] px-6 py-3 text-[13px] font-bold text-black">
              View My Listings <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      ) : (
        <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            {/* Step sidebar */}
            <FadeIn direction="left">
              <aside className="hidden lg:block">
                <div className="sticky top-24 rounded-[8px] border border-white/10 bg-[#0b0d0c] p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#2ee52b]">Progress</p>
                  <div className="mt-6 space-y-1">
                    {STEPS.map((s) => (
                      <div key={s.id} className="flex items-center gap-3 py-2">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-black transition ${
                          step > s.id
                            ? 'border-[#2ee52b] bg-[#2ee52b] text-black'
                            : step === s.id
                            ? 'border-[#2ee52b] text-[#2ee52b]'
                            : 'border-white/15 text-white/30'
                        }`}>
                          {step > s.id ? <Check size={13} /> : s.id}
                        </div>
                        <div>
                          <p className={`text-[12px] font-semibold ${step === s.id ? 'text-white' : step > s.id ? 'text-white/60' : 'text-white/30'}`}>
                            {s.label}
                          </p>
                          <p className={`text-[10px] ${step === s.id ? 'text-[#2ee52b]' : 'text-white/25'}`}>{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </FadeIn>

            {/* Form area */}
            <div>
              {/* Mobile progress bar */}
              <div className="mb-6 lg:hidden">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[12px] font-bold">Step {step} of {STEPS.length}: {STEPS[step - 1].label}</p>
                  <p className="text-[11px] text-white/40">{Math.round((step / STEPS.length) * 100)}%</p>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-[#2ee52b]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              <div className="rounded-[8px] border border-white/10 bg-[#0b0d0c] p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {step === 1 && (
                      <div>
                        <h2 className="text-[22px] font-black">Tell us about your vehicle</h2>
                        <p className="mt-1 text-[13px] text-white/50">Start with the basics</p>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                          <FieldSelect label="Make" options={MAKES} value={form.make} onChange={(e) => set('make', e.target.value)} />
                          <FieldInput label="Model" placeholder="e.g. 5 Series" value={form.model} onChange={(e) => set('model', e.target.value)} />
                          <FieldInput label="Year" type="number" placeholder="e.g. 2022" value={form.year} onChange={(e) => set('year', e.target.value)} />
                          <FieldInput label="Mileage (km)" type="number" placeholder="e.g. 15000" value={form.mileage} onChange={(e) => set('mileage', e.target.value)} />
                          <FieldInput label="VIN (optional)" placeholder="Vehicle ID number" value={form.vin} onChange={(e) => set('vin', e.target.value)} />
                          <FieldSelect label="Location" options={LOCATIONS} value={form.location} onChange={(e) => set('location', e.target.value)} />
                        </div>
                      </div>
                    )}
                    {step === 2 && (
                      <div>
                        <h2 className="text-[22px] font-black">Vehicle specifications</h2>
                        <p className="mt-1 text-[13px] text-white/50">More detail = more trust from buyers</p>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                          <FieldSelect label="Condition" options={['New', 'Used', 'Certified Pre-Owned']} value={form.condition} onChange={(e) => set('condition', e.target.value)} />
                          <FieldSelect label="Body Type" options={BODY_TYPES} value={form.body} onChange={(e) => set('body', e.target.value)} />
                          <FieldSelect label="Fuel Type" options={FUEL_TYPES} value={form.fuel} onChange={(e) => set('fuel', e.target.value)} />
                          <FieldSelect label="Transmission" options={TRANSMISSIONS} value={form.transmission} onChange={(e) => set('transmission', e.target.value)} />
                          <FieldInput label="Exterior Color" placeholder="e.g. Black" value={form.color} onChange={(e) => set('color', e.target.value)} />
                          <FieldInput label="Number of Doors" type="number" placeholder="4" value={form.doors} onChange={(e) => set('doors', e.target.value)} />
                          <FieldInput label="Seats" type="number" placeholder="5" value={form.seats} onChange={(e) => set('seats', e.target.value)} />
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div>
                        <h2 className="text-[22px] font-black">Features & Equipment</h2>
                        <p className="mt-1 text-[13px] text-white/50">Select all that apply</p>
                        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {FEATURES_LIST.map((f) => (
                            <motion.button
                              key={f}
                              type="button"
                              whileTap={{ scale: 0.96 }}
                              onClick={() => toggleFeature(f)}
                              className={`flex items-center gap-2 rounded-[5px] border px-3 py-2.5 text-left text-[12px] font-medium transition ${
                                form.features.includes(f)
                                  ? 'border-[#2ee52b] bg-[#2ee52b]/10 text-[#2ee52b]'
                                  : 'border-white/10 text-white/60 hover:border-white/25'
                              }`}
                            >
                              {form.features.includes(f) && <Check size={12} className="shrink-0" />}
                              {f}
                            </motion.button>
                          ))}
                        </div>
                        <p className="mt-4 text-[12px] text-white/40">{form.features.length} features selected</p>
                      </div>
                    )}
                    {step === 4 && (
                      <div>
                        <h2 className="text-[22px] font-black">Upload Photos</h2>
                        <p className="mt-1 text-[13px] text-white/50">High-quality photos get 3× more inquiries</p>
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {['Front', 'Rear', 'Driver Side', 'Passenger Side', 'Interior', 'Dashboard'].map((label) => (
                            <div
                              key={label}
                              className="flex aspect-[1.3] flex-col items-center justify-center gap-2 rounded-[6px] border border-dashed border-white/15 bg-white/[.03] text-center transition hover:border-[#2ee52b]/50 hover:bg-[#2ee52b]/5"
                            >
                              <Upload size={20} className="text-white/30" />
                              <p className="text-[10px] text-white/35">{label}</p>
                            </div>
                          ))}
                        </div>
                        <p className="mt-3 text-[11px] text-white/30">JPEG, PNG — up to 10MB each. Min 3 photos required.</p>
                      </div>
                    )}
                    {step === 5 && (
                      <div>
                        <h2 className="text-[22px] font-black">Set your price</h2>
                        <p className="mt-1 text-[13px] text-white/50">We'll suggest a market price based on your specs</p>
                        <div className="mt-8 rounded-[7px] border border-[#2ee52b]/20 bg-[#2ee52b]/5 p-5 mb-6">
                          <p className="text-[11px] text-[#2ee52b] font-bold uppercase tracking-[.08em]">Market estimate</p>
                          <p className="mt-1 text-[28px] font-black text-[#2ee52b]">$42,000 – $48,000</p>
                          <p className="text-[11px] text-white/40">Based on similar {form.make} {form.model} listings</p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <FieldInput label="Asking Price ($)" type="number" placeholder="e.g. 45000" value={form.price} onChange={(e) => set('price', e.target.value)} />
                        </div>
                        <label className="mt-4 flex items-center gap-3 text-[13px]">
                          <input
                            type="checkbox"
                            checked={form.negotiable}
                            onChange={(e) => set('negotiable', e.target.checked)}
                            className="h-4 w-4 accent-[#2ee52b]"
                          />
                          Price is negotiable
                        </label>
                      </div>
                    )}
                    {step === 6 && (
                      <div>
                        <h2 className="text-[22px] font-black">Your contact details</h2>
                        <p className="mt-1 text-[13px] text-white/50">How buyers will reach you</p>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                          <FieldInput label="Full Name" placeholder="Your name" value={form.name} onChange={(e) => set('name', e.target.value)} />
                          <FieldInput label="Email" type="email" placeholder="you@email.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                          <FieldInput label="Phone" placeholder="+971 50 000 0000" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                        </div>
                        <label className="mt-4 block text-[11px] font-bold uppercase tracking-[.09em] text-white/50">
                          Description (optional)
                          <textarea
                            value={form.description}
                            onChange={(e) => set('description', e.target.value)}
                            placeholder="Tell buyers what makes this car special…"
                            rows={4}
                            className="mt-2 w-full rounded-[5px] border border-white/12 bg-[#0f1210] px-4 py-3 text-[13px] text-white outline-none normal-case tracking-normal focus:border-[#2ee52b] transition resize-none"
                          />
                        </label>
                      </div>
                    )}
                    {step === 7 && (
                      <div>
                        <h2 className="text-[22px] font-black">Review your listing</h2>
                        <p className="mt-1 text-[13px] text-white/50">Double-check before publishing</p>
                        <div className="mt-6 grid gap-3 rounded-[7px] border border-white/10 bg-[#0f1210] p-5">
                          {[
                            ['Vehicle', `${form.year} ${form.make} ${form.model}`],
                            ['Mileage', form.mileage ? `${Number(form.mileage).toLocaleString()} km` : '—'],
                            ['Condition', form.condition || '—'],
                            ['Fuel', form.fuel || '—'],
                            ['Transmission', form.transmission || '—'],
                            ['Price', form.price ? `$${Number(form.price).toLocaleString()}${form.negotiable ? ' (negotiable)' : ''}` : '—'],
                            ['Features', `${form.features.length} selected`],
                            ['Contact', form.email || '—'],
                          ].map(([k, v]) => (
                            <div key={k} className="flex justify-between border-b border-white/8 pb-2 last:border-0 last:pb-0 text-[13px]">
                              <span className="text-white/50">{k}</span>
                              <span className="font-semibold">{v}</span>
                            </div>
                          ))}
                        </div>
                        <p className="mt-4 text-[12px] text-white/40">
                          By submitting you agree to our listing guidelines. Your ad will be reviewed within 24 hours.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <button
                    onClick={back}
                    className={`flex items-center gap-2 rounded-[5px] border border-white/15 px-5 py-2.5 text-[12px] font-semibold transition hover:border-white/30 ${step === 1 ? 'pointer-events-none opacity-0' : ''}`}
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  {step < STEPS.length ? (
                    <button
                      onClick={next}
                      className="flex items-center gap-2 rounded-[5px] bg-[#2ee52b] px-6 py-2.5 text-[12px] font-bold text-black transition hover:bg-[#50f14d]"
                    >
                      Continue <ArrowRight size={14} />
                    </button>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={submit}
                      className="flex items-center gap-2 rounded-[5px] bg-[#2ee52b] px-7 py-2.5 text-[13px] font-bold text-black transition hover:bg-[#50f14d]"
                    >
                      Publish Listing <CheckCircle2 size={15} />
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  )
}
