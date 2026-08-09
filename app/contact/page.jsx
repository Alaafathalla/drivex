'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-section'

const TOPICS = ['General Inquiry', 'Buy a Car', 'Rent a Car', 'Sell a Car', 'Dealer Partnership', 'Support', 'Other']

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'hello@drivex.ae', href: 'mailto:hello@drivex.ae' },
  { icon: Phone, label: 'Phone', value: '+971 4 000 0000', href: 'tel:+97140000000' },
  { icon: MapPin, label: 'Address', value: 'Sheikh Zayed Road, Dubai', href: '#' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri, 9AM–7PM GST', href: null },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
  }

  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8 pt-[72px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(46,229,43,.1),transparent_50%)]" />
        <div className="relative mx-auto max-w-[1450px] px-5 py-16 sm:px-8 lg:px-10">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.12em] text-[#2ee52b]"
          >
            <span className="h-[2px] w-8 bg-[#2ee52b]" /> Get in touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-[clamp(38px,6vw,80px)] font-black leading-[.92] tracking-tight"
          >
            Let's get<br />you moving.
          </motion.h1>
        </div>
      </section>

      <div className="mx-auto max-w-[1450px] px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Contact info */}
          <div>
            <FadeIn direction="left">
              <p className="text-[14px] leading-7 text-white/60 max-w-sm">
                Sales, support, dealer partnerships or service onboarding — tell us where we can help and we'll be in touch.
              </p>
            </FadeIn>

            <StaggerContainer className="mt-10 grid gap-4" stagger={0.1}>
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <StaggerItem key={label} direction="left">
                  <div className="flex items-center gap-4 rounded-[7px] border border-white/10 bg-[#0b0d0c] px-5 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2ee52b]/10">
                      <Icon size={18} className="text-[#2ee52b]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40">{label}</p>
                      {href && href !== '#' ? (
                        <a href={href} className="text-[14px] font-semibold transition hover:text-[#2ee52b]">{value}</a>
                      ) : (
                        <p className="text-[14px] font-semibold">{value}</p>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn direction="up" delay={0.3}>
              <div className="mt-8 rounded-[7px] border border-[#2ee52b]/20 bg-[#2ee52b]/5 p-5">
                <p className="text-[12px] font-bold text-[#2ee52b]">Dealer or partner inquiry?</p>
                <p className="mt-1 text-[13px] text-white/55">
                  Reach our partnerships team directly at <a href="mailto:partners@drivex.ae" className="text-[#2ee52b] hover:underline">partners@drivex.ae</a>
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Form */}
          <FadeIn direction="right">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center rounded-[10px] border border-[#2ee52b]/30 bg-[#0b0d0c] py-16 text-center"
                >
                  <CheckCircle2 size={52} className="text-[#2ee52b]" />
                  <h2 className="mt-5 text-[24px] font-black">Message sent!</h2>
                  <p className="mt-3 max-w-xs text-[14px] text-white/55">
                    We'll get back to you at <span className="text-white">{form.email}</span> within one business day.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', topic: '', message: '' }) }}
                    className="mt-6 text-[12px] text-white/40 hover:text-white underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="rounded-[10px] border border-white/10 bg-[#0b0d0c] p-6 sm:p-8"
                >
                  <h2 className="text-[18px] font-black">Send us a message</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                      { key: 'name', label: 'Full Name', placeholder: 'Your name' },
                      { key: 'email', label: 'Email', placeholder: 'you@email.com', type: 'email' },
                      { key: 'phone', label: 'Phone', placeholder: '+971 50 000 0000' },
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
                      Topic
                      <select
                        value={form.topic}
                        onChange={(e) => set('topic', e.target.value)}
                        className="mt-2 h-12 w-full rounded-[5px] border border-white/12 bg-[#0f1210] px-4 text-[13px] text-white outline-none normal-case focus:border-[#2ee52b] transition"
                      >
                        <option value="">Select topic…</option>
                        {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </label>
                  </div>
                  <label className="mt-4 block text-[11px] font-bold uppercase tracking-[.09em] text-white/50">
                    Message
                    <textarea
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder="How can we help?"
                      rows={4}
                      className="mt-2 w-full rounded-[5px] border border-white/12 bg-[#0f1210] px-4 py-3 text-[13px] text-white outline-none normal-case tracking-normal focus:border-[#2ee52b] transition resize-none"
                    />
                  </label>
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileTap={{ scale: 0.97 }}
                    className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-[5px] bg-[#2ee52b] text-[13px] font-bold text-black transition hover:bg-[#50f14d] disabled:opacity-70"
                  >
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending…
                      </span>
                    ) : (
                      <><span>Send Message</span> <ArrowRight size={15} /></>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
