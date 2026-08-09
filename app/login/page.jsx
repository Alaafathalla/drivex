'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields'); return }
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    window.location.href = '/dashboard'
  }

  return (
    <main className="min-h-screen bg-[#050706] text-white">
      <SiteHeader />
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left visual */}
        <div className="relative hidden overflow-hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1800&q=90"
            alt="Car"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050706] via-[#050706]/50 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-16 left-12 max-w-xs"
          >
            <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#2ee52b]">Welcome back</p>
            <h2 className="mt-3 text-[36px] font-black leading-tight">Your next drive<br />starts here.</h2>
            <p className="mt-3 text-[14px] text-white/55">Manage favorites, listings, rentals and conversations.</p>
          </motion.div>
        </div>

        {/* Right form */}
        <div className="flex items-center justify-center px-5 pt-[72px]">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            <a href="/" className="mb-10 inline-flex text-[28px] font-black italic tracking-[-.05em]">
              Drive<span className="text-[#2ee52b]">X</span>
            </a>
            <h1 className="text-[30px] font-black">Sign in</h1>
            <p className="mt-2 text-[14px] text-white/50">Access your DriveX account</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <label className="block text-[11px] font-bold uppercase tracking-[.09em] text-white/50">
                Email Address
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="you@email.com"
                  className="mt-2 h-12 w-full rounded-[5px] border border-white/12 bg-[#0f1210] px-4 text-[13px] text-white outline-none normal-case tracking-normal focus:border-[#2ee52b] transition"
                />
              </label>
              <label className="block text-[11px] font-bold uppercase tracking-[.09em] text-white/50">
                Password
                <div className="relative mt-2">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => set('password', e.target.value)}
                    placeholder="••••••••"
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

              <div className="flex items-center justify-between text-[12px]">
                <label className="flex items-center gap-2 text-white/50">
                  <input type="checkbox" className="h-3.5 w-3.5 accent-[#2ee52b]" />
                  Remember me
                </label>
                <a href="#" className="text-[#2ee52b] hover:underline">Forgot password?</a>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-[5px] border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-[12px] text-red-400"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-[5px] bg-[#2ee52b] text-[13px] font-bold text-black transition hover:bg-[#50f14d] disabled:opacity-60"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <><span>Sign In</span> <ArrowRight size={15} /></>}
              </motion.button>
            </form>

            <div className="my-7 flex items-center gap-3">
              <div className="flex-1 border-t border-white/10" />
              <span className="text-[11px] text-white/30">or continue with</span>
              <div className="flex-1 border-t border-white/10" />
            </div>

            <div className="flex gap-3">
              {['Google', 'Apple'].map((p) => (
                <button
                  key={p}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-[5px] border border-white/12 text-[12px] font-semibold transition hover:border-white/25 hover:bg-white/5"
                >
                  {p}
                </button>
              ))}
            </div>

            <p className="mt-7 text-center text-[13px] text-white/50">
              New to DriveX?{' '}
              <a href="/register" className="font-bold text-[#2ee52b] hover:underline">Create account</a>
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
