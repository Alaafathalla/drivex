'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle, ArrowRight, CheckCircle2,
  CreditCard, Lock, ShieldCheck,
} from 'lucide-react'
import { BookingSummary } from '@/features/cars/components/BookingSummary'
import { PriceBreakdown } from '@/features/cars/components/PriceBreakdown'
import { paymentService } from '@/services/paymentService'
import { carService } from '@/services/carService'
import { useToast } from '@/context/ToastContext'

const METHODS = [
  { id: 'card',       label: 'Credit / Debit Card',  icon: '💳' },
  { id: 'apple_pay',  label: 'Apple Pay',            icon: '🍎' },
  { id: 'google_pay', label: 'Google Pay',           icon: '🔵' },
  { id: 'cash',       label: 'Cash on Pickup',       icon: '💵' },
]

function formatCard(v) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(v) {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

export default function CheckoutPage() {
  const router = useRouter()
  const toast  = useToast()

  const [booking, setBooking] = useState(null)
  const [car,     setCar]     = useState(null)
  const [method,  setMethod]  = useState('card')
  const [card, setCard]       = useState({ holder: '', number: '', expiry: '', cvv: '' })
  const [errors, setErrors]   = useState({})
  const [status, setStatus]   = useState('idle') // idle | loading | error | done
  const [errMsg, setErrMsg]   = useState('')

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('drivex_booking_pending')
      if (!raw) { router.replace('/cars'); return }
      const b = JSON.parse(raw)
      setBooking(b)
      if (b.car) setCar(b.car)
      else if (b.carId) carService.getCarById(b.carId).then(setCar).catch(() => {})
    } catch { router.replace('/cars') }
  }, [router])

  const setC = (k, v) => setCard(p => ({ ...p, [k]: v }))

  const validateCard = () => {
    const e = {}
    if (!card.holder.trim())                    e.holder = 'Name required'
    if (card.number.replace(/\s/g, '').length < 16) e.number = 'Enter a valid 16-digit card number'
    if (card.expiry.length < 5)                 e.expiry = 'Enter expiry MM/YY'
    if (card.cvv.length < 3)                    e.cvv = 'Enter 3-digit CVV'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePay = async () => {
    if (method === 'card' && !validateCard()) return
    setStatus('loading')
    setErrMsg('')
    try {
      const result = await paymentService.pay({
        bookingId: booking.id,
        amount: booking.total,
        method,
        cardDetails: method === 'card' ? card : null,
      })
      sessionStorage.setItem('drivex_payment_result', JSON.stringify({ ...result, booking, car }))
      sessionStorage.removeItem('drivex_booking_pending')
      sessionStorage.removeItem('drivex_booking_draft')
      router.push(`/rental/success/${booking.id}`)
    } catch (e) {
      setStatus('error')
      setErrMsg(e.message || 'Payment failed. Please try again.')
      toast({ message: e.message || 'Payment declined', type: 'error' })
    }
  }

  if (!booking) return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
    </div>
  )

  const inp = (err) =>
    `w-full rounded-2xl border px-4 py-3 text-[14px] outline-none transition focus:ring-2 focus:ring-green-100 ${err ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-green-400'}`

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-12">
          <a href="/rental/review" className="text-[13px] font-semibold text-gray-500 hover:text-green-600 transition mb-3 block">← Back to review</a>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-green-600">Step 3 of 3</p>
              <h1 className="mt-1 text-[26px] font-black text-gray-900">Payment</h1>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2">
              <Lock size={14} className="text-green-600" />
              <span className="text-[12px] font-bold text-green-700">Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid gap-7 lg:grid-cols-[1fr_360px]">

          {/* Left */}
          <div className="space-y-5">

            {/* Payment methods */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-bold text-gray-900">Payment Method</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {METHODS.map(m => (
                  <button key={m.id} onClick={() => { setMethod(m.id); setStatus('idle'); setErrMsg('') }}
                    className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition ${
                      method === m.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <span className="text-[22px]">{m.icon}</span>
                    <span className={`text-[13px] font-bold ${method === m.id ? 'text-green-700' : 'text-gray-700'}`}>
                      {m.label}
                    </span>
                    {method === m.id && (
                      <CheckCircle2 size={16} className="ml-auto shrink-0 text-green-500" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Card form */}
            <AnimatePresence>
              {method === 'card' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: .25 }}
                  className="overflow-hidden">
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
                    <h2 className="flex items-center gap-2 font-bold text-gray-900">
                      <CreditCard size={17} className="text-green-500" /> Card Details
                    </h2>

                    <div>
                      <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">Cardholder Name</p>
                      <input value={card.holder} onChange={e => setC('holder', e.target.value)}
                        placeholder="Full name on card" className={inp(errors.holder)} />
                      {errors.holder && <p className="mt-1 text-[11px] text-red-500">{errors.holder}</p>}
                    </div>

                    <div>
                      <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">Card Number</p>
                      <div className="relative">
                        <input value={card.number}
                          onChange={e => setC('number', formatCard(e.target.value))}
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          className={`${inp(errors.number)} pr-12 font-mono tracking-wider`} />
                        <CreditCard size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      </div>
                      {errors.number && <p className="mt-1 text-[11px] text-red-500">{errors.number}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">Expiry</p>
                        <input value={card.expiry}
                          onChange={e => setC('expiry', formatExpiry(e.target.value))}
                          placeholder="MM/YY" maxLength={5}
                          className={inp(errors.expiry)} />
                        {errors.expiry && <p className="mt-1 text-[11px] text-red-500">{errors.expiry}</p>}
                      </div>
                      <div>
                        <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">CVV</p>
                        <input type="password" value={card.cvv}
                          onChange={e => setC('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="•••" className={inp(errors.cvv)} />
                        {errors.cvv && <p className="mt-1 text-[11px] text-red-500">{errors.cvv}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2.5">
                      <Lock size={13} className="text-gray-400" />
                      <p className="text-[11px] text-gray-400">Your card details are encrypted and never stored.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Digital wallet notice */}
            <AnimatePresence>
              {(method === 'apple_pay' || method === 'google_pay') && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-[13px] text-blue-800">
                  <p className="font-bold">You will be redirected to {method === 'apple_pay' ? 'Apple Pay' : 'Google Pay'} to complete the payment securely.</p>
                </motion.div>
              )}
              {method === 'cash' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-[13px] text-amber-800">
                  <p className="font-bold">Cash payment</p>
                  <p className="mt-1">Pay the full amount of <strong>${booking.total}</strong> at pickup. Please bring exact change if possible.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error banner */}
            <AnimatePresence>
              {status === 'error' && errMsg && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
                  <div>
                    <p className="font-bold text-red-700">Payment failed</p>
                    <p className="mt-0.5 text-[13px] text-red-600">{errMsg}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pay button */}
            <motion.button
              onClick={handlePay}
              disabled={status === 'loading'}
              whileTap={{ scale: .98 }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 text-[15px] font-bold text-white shadow-sm shadow-green-200 transition hover:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <><div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> Processing payment…</>
              ) : (
                <><Lock size={16} /> Pay ${booking.total} now</>
              )}
            </motion.button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400">
              <ShieldCheck size={14} className="text-green-500" />
              <span>256-bit SSL encryption</span>
              <span>·</span>
              <span>PCI DSS compliant</span>
            </div>
          </div>

          {/* Right summary */}
          <div className="h-fit space-y-4 lg:sticky lg:top-[84px]">
            {car && <BookingSummary car={car} booking={booking} />}
            <PriceBreakdown breakdown={booking} />
          </div>
        </div>
      </div>
    </div>
  )
}
