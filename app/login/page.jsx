'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SiteHeader } from '@/components/site-header'
import { useLang } from '@/context/LangContext'

export default function LoginPage() {
  const { t } = useLang()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <main className="min-h-screen bg-[#050706]">
      <SiteHeader />
      <section className="mx-auto grid min-h-screen max-w-[1300px] items-center gap-16 px-5 pt-20 lg:grid-cols-2 lg:px-10">

        {/* Left */}
        <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6 }}
          className="hidden lg:block">
          <p className="text-[10px] font-black uppercase tracking-[.2em] text-accent">{t('login_welcome')}</p>
          <h1 className="mt-5 text-[clamp(44px,5.5vw,72px)] font-black leading-[.92] tracking-[-.055em] text-white whitespace-pre-line">
            {t('login_headline')}
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground leading-7">{t('login_sub')}</p>

          {/* Decorative car */}
          <div className="mt-14 overflow-hidden rounded-[8px]">
            <img
              src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=90"
              alt="Premium car"
              className="aspect-[1.6] w-full object-cover opacity-60"
            />
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.55, delay:0.1 }}
          onSubmit={e => e.preventDefault()}
          className="mx-auto w-full max-w-md rounded-[8px] border border-border bg-card p-7 sm:p-9"
        >
          <h2 className="text-2xl font-black">{t('login_title')}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t('login_access')}</p>

          <div className="mt-7 grid gap-5">
            <label className="block text-xs font-bold uppercase tracking-[.08em] text-muted-foreground">
              {t('login_email')}
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                dir="auto"
                className="mt-2 h-12 w-full rounded-[5px] border border-border bg-background px-4 text-sm normal-case tracking-normal outline-none transition focus:border-accent"
              />
            </label>
            <label className="block text-xs font-bold uppercase tracking-[.08em] text-muted-foreground">
              {t('login_password')}
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-2 h-12 w-full rounded-[5px] border border-border bg-background px-4 text-sm normal-case tracking-normal outline-none transition focus:border-accent"
              />
            </label>
          </div>

          <div className="mt-2 flex justify-end">
            <a href="#" className="text-xs font-bold text-accent hover:underline cursor-pointer">{t('login_forgot')}</a>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-6 h-12 w-full cursor-pointer rounded-[5px] bg-accent font-black text-black transition hover:bg-[#50f14d]"
          >
            {t('login_btn')}
          </motion.button>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            {t('login_no_account')}{' '}
            <a href="/register" className="cursor-pointer font-bold text-accent hover:underline">{t('login_create')}</a>
          </p>
        </motion.form>
      </section>
    </main>
  )
}
