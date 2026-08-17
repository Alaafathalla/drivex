'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Car, CheckCircle2, ChevronRight, Clock, MapPin, User } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { carService } from '@/services/carService'
import { useToast } from '@/context/ToastContext'

const STEPS = ['Choose Vehicle', 'Pick Date & Time', 'Your Details', 'Confirm']

const DEALERS = [
  { id: 'dubai-marina',   name: 'DriveX Dubai Marina',     address: 'Marina Walk, Dubai Marina',     hours: '9am–8pm' },
  { id: 'downtown',       name: 'DriveX Downtown Dubai',   address: 'Sheikh Mohammed Blvd, Downtown', hours: '9am–9pm' },
  { id: 'abu-dhabi',      name: 'DriveX Abu Dhabi',        address: 'Corniche Road, Abu Dhabi',      hours: '9am–7pm' },
  { id: 'sharjah',        name: 'DriveX Sharjah',          address: 'Al Nahda, Sharjah',             hours: '10am–7pm' },
]

const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00']

const POPULAR_CARS = [
  { id: 5,  brand: 'BMW',           model: '5 Series',     image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=400&q=80' },
  { id: 7,  brand: 'Range Rover',   model: 'Sport',        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&q=80' },
  { id: 15, brand: 'Porsche',       model: '911 Carrera',  image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80' },
  { id: 19, brand: 'BMW',           model: 'iX',           image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80' },
  { id: 20, brand: 'Mercedes-Benz', model: 'S-Class',      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&q=80' },
  { id: 16, brand: 'Tesla',         model: 'Model S Plaid',image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&q=80' },
]

function inp(err) {
  return `w-full rounded-2xl border px-4 py-3 text-[14px] outline-none transition focus:ring-2 focus:ring-[#B5E92E]/20 ${err ? 'border-red-400 focus:border-red-400' : 'border-[#dfe5db] focus:border-[#B5E92E]'}`
}

export default function TestDrivePage() {
  const toast = useToast()
  const [step, setStep]   = useState(0)
  const [done, setDone]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [ref, setRef]     = useState('')

  const [form, setForm] = useState({
    car:     null,
    dealer:  '',
    date:    '',
    time:    '',
    name:    '',
    email:   '',
    phone:   '',
    notes:   '',
  })
  const [errors, setErrors] = useState({})
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  // Tomorrow as min date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const validate = () => {
    const e = {}
    if (step === 0 && !form.car)      e.car = 'Please select a vehicle.'
    if (step === 1) {
      if (!form.dealer)  e.dealer = 'Select a dealership.'
      if (!form.date)    e.date   = 'Pick a date.'
      if (!form.time)    e.time   = 'Pick a time slot.'
    }
    if (step === 2) {
      if (!form.name.trim())  e.name  = 'Your name is required.'
      if (!form.email.trim()) e.email = 'Email is required.'
      if (!form.phone.trim()) e.phone = 'Phone is required.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validate()) return
    if (step < STEPS.length - 1) setStep(s => s + 1)
  }

  const submit = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1200))
      const id = `TD-${Math.floor(Math.random() * 90000) + 10000}`
      setRef(id)
      setDone(true)
      toast({ message: 'Test drive booked!', type: 'success' })
    } catch {
      toast({ message: 'Something went wrong. Please try again.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <main className="min-h-screen bg-[#F5F6F3]">
        <div className="flex min-h-[80vh] items-center justify-center p-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-[28px] border border-[#dfe5db] bg-white p-10 text-center shadow-lg">
            <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-[#B5E92E]">
              <CheckCircle2 size={36} className="text-[#071016]" />
            </div>
            <h1 className="text-[28px] font-black text-[#0f172a]">Test drive confirmed!</h1>
            <p className="mt-3 text-[14px] text-[#64748b]">Reference <span className="font-black text-[#0f172a]">{ref}</span></p>
            <div className="mt-6 rounded-2xl bg-[#f6f8f3] p-5 text-left text-[13px] space-y-2">
              <p><span className="font-black text-[#0f172a]">Vehicle:</span> <span className="text-[#64748b]">{form.car?.brand} {form.car?.model}</span></p>
              <p><span className="font-black text-[#0f172a]">Location:</span> <span className="text-[#64748b]">{DEALERS.find(d => d.id === form.dealer)?.name}</span></p>
              <p><span className="font-black text-[#0f172a]">Date & time:</span> <span className="text-[#64748b]">{form.date} at {form.time}</span></p>
            </div>
            <p className="mt-4 text-[12px] text-[#94a3b8]">Confirmation sent to {form.email}</p>
            <a href="/cars"
              className="mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-[#0f172a] text-[13px] font-black text-white transition hover:bg-[#B5E92E] hover:text-[#071016]">
              Continue browsing <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F6F3]">
      <PageHero
        eyebrow="Test Drive"
        title="Experience the car before you decide."
        description="Select a vehicle, choose your nearest showroom and pick a time that works for you."
        image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2200&q=86"
      />

      <section className="page-inner py-12">
        {/* Step indicator */}
        <div className="mb-10 flex items-center justify-center gap-0">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`grid h-9 w-9 place-items-center rounded-full text-[12px] font-black transition ${
                  i < step ? 'bg-[#B5E92E] text-[#071016]' : i === step ? 'bg-[#0f172a] text-white' : 'bg-[#e5e9e2] text-[#94a3b8]'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`mt-1.5 hidden text-[10px] font-black sm:block ${i === step ? 'text-[#0f172a]' : 'text-[#94a3b8]'}`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`mx-2 h-0.5 w-12 sm:w-20 ${i < step ? 'bg-[#B5E92E]' : 'bg-[#e5e9e2]'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            {/* Step 0: Choose Vehicle */}
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <div className="rounded-[24px] border border-[#dfe5db] bg-white p-6 shadow-sm">
                  <h2 className="flex items-center gap-2 text-[18px] font-black text-[#0f172a]">
                    <Car size={18} className="text-[#B5E92E]" /> Select a vehicle for your test drive
                  </h2>
                  <p className="mt-1 text-[12px] text-[#94a3b8]">Pick any car from our showroom fleet</p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {POPULAR_CARS.map(car => (
                      <motion.button key={car.id} whileTap={{ scale: 0.98 }}
                        onClick={() => { set('car', car); setErrors({}) }}
                        className={`relative flex items-center gap-4 overflow-hidden rounded-2xl border-2 p-3 text-left transition ${
                          form.car?.id === car.id ? 'border-[#B5E92E] bg-[#f6fce4]' : 'border-[#f0f2ef] hover:border-[#dfe5db]'
                        }`}>
                        <img src={car.image} alt={`${car.brand} ${car.model}`}
                          className="h-16 w-24 shrink-0 rounded-xl object-cover" />
                        <div>
                          <p className="text-[13px] font-black text-[#0f172a]">{car.brand}</p>
                          <p className="text-[12px] text-[#64748b]">{car.model}</p>
                        </div>
                        {form.car?.id === car.id && (
                          <CheckCircle2 size={16} className="absolute right-3 top-3 text-[#B5E92E]" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                  {errors.car && <p className="mt-2 text-[11px] text-red-500">{errors.car}</p>}
                </div>
              </motion.div>
            )}

            {/* Step 1: Date & Location */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <div className="space-y-5">
                  {/* Dealer */}
                  <div className="rounded-[24px] border border-[#dfe5db] bg-white p-6 shadow-sm">
                    <h2 className="flex items-center gap-2 text-[17px] font-black text-[#0f172a]">
                      <MapPin size={17} className="text-[#B5E92E]" /> Choose a dealership
                    </h2>
                    <div className="mt-4 space-y-2">
                      {DEALERS.map(d => (
                        <button key={d.id} onClick={() => { set('dealer', d.id); setErrors(p => ({ ...p, dealer: '' })) }}
                          className={`flex w-full items-start gap-4 rounded-2xl border-2 p-4 text-left transition ${
                            form.dealer === d.id ? 'border-[#B5E92E] bg-[#f6fce4]' : 'border-[#f0f2ef] hover:border-[#dfe5db]'
                          }`}>
                          <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2" style={{ borderColor: form.dealer === d.id ? '#B5E92E' : '#dfe5db' }}>
                            {form.dealer === d.id && <div className="h-3 w-3 rounded-full bg-[#B5E92E]" />}
                          </div>
                          <div>
                            <p className="text-[13px] font-black text-[#0f172a]">{d.name}</p>
                            <p className="mt-0.5 text-[11px] text-[#64748b]">{d.address}</p>
                            <p className="mt-0.5 text-[10px] text-[#94a3b8]">{d.hours}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    {errors.dealer && <p className="mt-2 text-[11px] text-red-500">{errors.dealer}</p>}
                  </div>

                  {/* Date & Time */}
                  <div className="rounded-[24px] border border-[#dfe5db] bg-white p-6 shadow-sm">
                    <h2 className="flex items-center gap-2 text-[17px] font-black text-[#0f172a]">
                      <CalendarDays size={17} className="text-[#B5E92E]" /> Select date & time
                    </h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-[.12em] text-[#64748b] mb-2">Date</label>
                        <input type="date" min={minDate} value={form.date}
                          onChange={e => { set('date', e.target.value); setErrors(p => ({ ...p, date: '' })) }}
                          className={inp(errors.date)} />
                        {errors.date && <p className="mt-1 text-[11px] text-red-500">{errors.date}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-[.12em] text-[#64748b] mb-2">Time slot</label>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map(t => (
                            <button key={t} onClick={() => { set('time', t); setErrors(p => ({ ...p, time: '' })) }}
                              className={`rounded-xl py-2 text-[11px] font-black transition ${
                                form.time === t ? 'bg-[#0f172a] text-white' : 'border border-[#dfe5db] text-[#64748b] hover:border-[#B5E92E]'
                              }`}>
                              {t}
                            </button>
                          ))}
                        </div>
                        {errors.time && <p className="mt-1 text-[11px] text-red-500">{errors.time}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Your details */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <div className="rounded-[24px] border border-[#dfe5db] bg-white p-6 shadow-sm">
                  <h2 className="flex items-center gap-2 text-[17px] font-black text-[#0f172a]">
                    <User size={17} className="text-[#B5E92E]" /> Your details
                  </h2>
                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-[.12em] text-[#64748b] mb-2">Full name</label>
                      <input value={form.name} onChange={e => { set('name', e.target.value); setErrors(p => ({ ...p, name: '' })) }}
                        placeholder="Your full name" className={inp(errors.name)} />
                      {errors.name && <p className="mt-1 text-[11px] text-red-500">{errors.name}</p>}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-[.12em] text-[#64748b] mb-2">Email</label>
                        <input type="email" value={form.email} onChange={e => { set('email', e.target.value); setErrors(p => ({ ...p, email: '' })) }}
                          placeholder="you@example.com" className={inp(errors.email)} />
                        {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-[.12em] text-[#64748b] mb-2">Phone</label>
                        <input type="tel" value={form.phone} onChange={e => { set('phone', e.target.value); setErrors(p => ({ ...p, phone: '' })) }}
                          placeholder="+971 50 000 0000" className={inp(errors.phone)} />
                        {errors.phone && <p className="mt-1 text-[11px] text-red-500">{errors.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-[.12em] text-[#64748b] mb-2">Notes (optional)</label>
                      <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                        rows={3} placeholder="Any special requests or questions?"
                        className={`${inp(false)} resize-none`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <div className="rounded-[24px] border border-[#dfe5db] bg-white p-6 shadow-sm">
                  <h2 className="text-[17px] font-black text-[#0f172a] mb-5">Review your booking</h2>
                  <div className="space-y-3 text-[13px]">
                    {[
                      ['Vehicle',  `${form.car?.brand} ${form.car?.model}`],
                      ['Showroom', DEALERS.find(d => d.id === form.dealer)?.name || '—'],
                      ['Date',     form.date],
                      ['Time',     form.time],
                      ['Name',     form.name],
                      ['Email',    form.email],
                      ['Phone',    form.phone],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between rounded-xl bg-[#f6f8f3] px-4 py-3">
                        <span className="text-[#64748b]">{k}</span>
                        <span className="font-black text-[#0f172a]">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-2 rounded-2xl bg-[#f0fce4] px-4 py-3">
                    <CheckCircle2 size={14} className="text-[#B5E92E]" />
                    <p className="text-[12px] text-[#3a5a00]">Free booking · No deposit required · Cancel anytime</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="mt-6 flex justify-between gap-3">
            {step > 0
              ? <button onClick={() => setStep(s => s - 1)}
                  className="h-12 rounded-full border border-[#dfe5db] bg-white px-6 text-[13px] font-black text-[#64748b] transition hover:border-[#0f172a]">
                  ← Back
                </button>
              : <div />
            }
            {step < STEPS.length - 1
              ? <button onClick={next}
                  className="flex h-12 items-center gap-2 rounded-full bg-[#0f172a] px-7 text-[13px] font-black text-white transition hover:bg-[#B5E92E] hover:text-[#071016]">
                  Continue <ChevronRight size={15} />
                </button>
              : <button onClick={submit} disabled={loading}
                  className="flex h-12 items-center gap-2 rounded-full bg-[#B5E92E] px-7 text-[13px] font-black text-[#071016] transition hover:brightness-105 disabled:opacity-60">
                  {loading ? 'Booking…' : 'Confirm booking'} {!loading && <CheckCircle2 size={15} />}
                </button>
            }
          </div>
        </div>
      </section>
    </main>
  )
}
