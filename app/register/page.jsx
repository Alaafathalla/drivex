'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Eye, EyeOff, Loader2 } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'

const ACCOUNT_TYPES = [
  { id: 'customer', label: 'Customer', desc: 'Buy, rent and manage your vehicles' },
  { id: 'dealer', label: 'Dealer', desc: 'List and sell vehicles professionally' },
]

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', type: 'customer' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setDone(true)
  }

  if (done) return (
    <main className="min-h-screen bg-[#050706] text-white">
      <SiteHeader />
      <div className="flex min-h-screen items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#2ee52b]/15">
            <Check size={36} className="text-[#2ee52b]" />
          </div>
          <h1 className="mt-6 text-[28px] font-black">Welcome to DriveX!</h1>
          <p className="mt-3 text-[14px] text-white/55">Your account has been created. Start exploring premium cars.</p>
          <a href="/" className="mt-7 inline-flex items-center gap-2 rounded-[5px] bg-[#2ee52b] px-7 py-3.5 text-[13px] font-bold text-black">
            Go to homepage <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </main>
  )

  return (
    <main className="min-h-screen bg-[#050706] text-white">
      <SiteHeader />
      <div className="flex min-h-screen items-center justify-center px-5 pt-[72px] pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-lg"
        >
          <a href="/" className="mb-8 inline-flex text-[28px] font-black italic tracking-[-.05em]">
            Drive<span className="text-[#2ee52b]">X</span>
          </a>
          <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#2ee52b]">Join DriveX</p>
          <h1 className="mt-2 text-[30px] font-black">Create your account</h1>

          <form onSubmit={handleSubmit} className="mt-7">
            {/* Account type */}
            <div className="mb-6 grid grid-cols-2 gap-3">
              {ACCOUNT_TYPES.map(({ id, label, desc }) => (
                <motion.button
                  key={id}
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => set('type', id)}
                  className={`rounded-[6px] border p-4 text-left transition ${
                    form.type === id
                      ? 'border-[#2ee52b] bg-[#2ee52b]/10'
                      : 'border-white/12 bg-[#0b0d0c] hover:border-white/25'
                  }`}
                >
                  <p className={`text-[13px] font-bold ${form.type === id ? 'text-[#2ee52b]' : 'text-white'}`}>{label}</p>
                  <p className="mt-0.5 text-[11px] text-white/45">{desc}</p>
                </motion.button>
              ))}
            </div>

            {/* Fields */}
            <div className="space-y-4">
              {[
                { key: 'name', label: 'Full Name', placeholder: 'Your full name' },
                { key: 'email', label: 'Email Address', placeholder: 'you@email.com', type: 'email' },
                { key: 'phone', label: 'Phone Number', placeholder: '+971 50 000 0000' },
              ].map(({ key, label, placeholder, type = 'text' }) => (
                <label key={key} className="block text-[11px] font-bold uppercase tracking-[.09em] text-white/50">
                  {label}
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                    placeholder={placeholder}
                    className="mt-2 h-12 w-full rounded-[5px] border border-white/12 bg-[#0f1210] px-4 text-[13px] text-white outline-none normal-case tracking-normal focus:border-[#2ee52b] transition"
                  />
                </label>
              ))}
              <label className="block text-[11px] font-bold uppercase tracking-[.09em] text-white/50">
                Password
                <div className="relative mt-2">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => set('password', e.target.value)}
                    placeholder="Min. 8 characters"
                    className="h-12 w-full rounded-[5px] border border-white/12 bg-[#0f1210] px-4 pr-12 text-[13px] text-white outline-none normal-case tracking-normal focus:border-[#2ee52b] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                  >
                    {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </label>
            </div>

            <p className="mt-5 text-[11px] text-white/35">
              By creating an account you agree to our{' '}
              <a href="#" className="text-[#2ee52b] hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="text-[#2ee52b] hover:underline">Privacy Policy</a>.
            </p>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-[5px] bg-[#2ee52b] text-[13px] font-bold text-black transition hover:bg-[#50f14d] disabled:opacity-60"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <><span>Create Account</span> <ArrowRight size={15} /></>}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-[13px] text-white/50">
            Already have an account?{' '}
            <a href="/login" className="font-bold text-[#2ee52b] hover:underline">Sign in</a>
          </p>
        </motion.div>
      </div>
    </main>
  )
}
