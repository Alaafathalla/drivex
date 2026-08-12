'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { useToast } from '@/context/ToastContext'

export default function RegisterPage() {
  const { t } = useLang()
  const toast = useToast()
  const [role, setRole] = useState('customer')

  const fields = [
    { key: 'register_name', type: 'text' },
    { key: 'register_email', type: 'email' },
    { key: 'register_phone', type: 'tel' },
    { key: 'register_password', type: 'password' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    toast({ message: `Account ready for ${role === 'dealer' ? 'dealer' : 'customer'} onboarding.`, type: 'success' })
  }

  return (
    <main className="min-h-screen bg-[#050706]">
      <section className="w-full min-h-screen px-4 py-8 sm:px-6 lg:px-8 lg:py-12 xl:px-12">
        <div className="mx-auto flex min-h-screen max-w-[1300px] items-center justify-center py-20">
          <motion.form initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} onSubmit={handleSubmit} className="w-full max-w-xl rounded-[8px] border border-border bg-card p-7 sm:p-9">
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-accent">{t('register_join')}</p>
            <h1 className="mt-3 text-3xl font-black">{t('register_title')}</h1>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {fields.map(({ key, type }) => (
                <label key={key} className="text-xs font-bold uppercase tracking-[.08em] text-muted-foreground">
                  {t(key)}
                  <input type={type} dir="auto" className="mt-2 h-12 w-full rounded-[5px] border border-border bg-background px-4 text-sm normal-case tracking-normal outline-none transition focus:border-accent" />
                </label>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[['customer', 'register_customer'], ['dealer', 'register_dealer']].map(([val, labelKey]) => (
                <motion.button key={val} type="button" whileTap={{ scale: 0.97 }} onClick={() => setRole(val)} className={`cursor-pointer rounded-[5px] border py-3 text-sm font-bold transition ${role === val ? 'border-accent bg-accent/10 text-accent' : 'border-border text-muted-foreground hover:border-accent/50'}`}>
                  {t(labelKey)}
                </motion.button>
              ))}
            </div>

            <motion.button whileTap={{ scale: 0.97 }} type="submit" className="mt-7 h-12 w-full cursor-pointer rounded-[5px] bg-accent font-black text-black transition hover:bg-[#50f14d]">
              {t('register_btn')}
            </motion.button>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              {t('register_have')}{' '}
              <a href="/login" className="cursor-pointer font-bold text-accent hover:underline">{t('register_signin')}</a>
            </p>
          </motion.form>
        </div>
      </section>
    </main>
  )
}
