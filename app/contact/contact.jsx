'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { useToast } from '@/context/ToastContext'

export default function ContactPage() {
  const { t } = useLang()
  const toast = useToast()
  const [sent, setSent] = useState(false)

  const fields = [
    { key: 'contact_name',  type: 'text' },
    { key: 'contact_email', type: 'email' },
    { key: 'contact_phone', type: 'tel' },
    { key: 'contact_topic', type: 'text' },
  ]

  return (
    <main className="min-h-screen bg-[#f5f7f6] text-gray-900">
      <section className="w-full bg-[#070908] text-white">
        <div className="page-inner grid gap-12 py-20 sm:py-24 lg:grid-cols-[.85fr_1.15fr] lg:py-28">
          {/* Left info */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.55 }}>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-accent">{t('contact_eyebrow')}</p>
            <h1 className="mt-5 text-[clamp(40px,6vw,80px)] font-black leading-[.9] tracking-[-.055em] whitespace-pre-line">
              {t('contact_title')}
            </h1>
            <p className="mt-6 max-w-md leading-7 text-white/55">{t('contact_desc')}</p>
            <div className="mt-10 grid gap-4 text-sm text-white/65">
              <p className="flex items-center gap-3"><Mail className="text-accent" size={17} /> hello@drivex.ae</p>
              <p className="flex items-center gap-3"><Phone className="text-accent" size={17} /> +971 4 000 0000</p>
              <p className="flex items-center gap-3"><MapPin className="text-accent" size={17} /> Dubai, UAE</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.55, delay:0.1 }}>
            {sent ? (
              <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                className="flex flex-col items-center justify-center gap-4 rounded-[8px] bg-accent/10 border border-accent/30 p-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-black">
                  <ArrowRight size={28} />
                </div>
                <p className="text-2xl font-black">Message sent!</p>
                <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setSent(true); toast({ message: 'Thanks for reaching out. We’ll contact you shortly.', type: 'success' }) }}
                className="rounded-[8px] bg-white p-7 text-foreground sm:p-9"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {fields.map(({ key, type }) => (
                    <label key={key} className="text-xs font-black uppercase tracking-[.1em] text-muted-foreground">
                      {t(key)}
                      <input
                        type={type}
                        placeholder={t(key)}
                        dir="auto"
                        className="mt-2 h-12 w-full rounded-[4px] border border-border bg-background px-4 text-sm normal-case tracking-normal outline-none focus:border-accent"
                      />
                    </label>
                  ))}
                </div>
                <label className="mt-5 block text-xs font-black uppercase tracking-[.1em] text-muted-foreground">
                  {t('contact_message')}
                  <textarea
                    placeholder={t('contact_how')}
                    dir="auto"
                    className="mt-2 min-h-[140px] w-full resize-none rounded-[4px] border border-border bg-background p-4 text-sm normal-case tracking-normal outline-none focus:border-accent"
                  />
                </label>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-[5px] bg-accent px-7 py-4 text-sm font-black text-black transition hover:bg-[#50f14d]"
                >
                  {t('contact_send')} <ArrowRight size={16} />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section></main>
  )
}
