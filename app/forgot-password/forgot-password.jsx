'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { useToast } from '@/context/ToastContext'
import { useLang } from '@/context/LangContext'

export default function ForgotPasswordPage() {
  const toast = useToast()
  const { t, isRTL } = useLang()
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      toast({ message: t('forgot_error_toast'), type: 'error' })
      return
    }
    toast({ message: t('forgot_success_toast'), type: 'success' })
  }

  return (
    <main className="min-h-screen bg-[#050706] text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="w-full min-h-screen px-4 py-16 sm:px-6 lg:px-8 lg:py-24 xl:px-12">
        <div className="mx-auto flex min-h-[70vh] max-w-[760px] items-center justify-center">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="w-full rounded-[10px] border border-white/10 bg-[#0d1218] p-8 shadow-2xl sm:p-10"
          >
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-accent">{t('forgot_page_eyebrow')}</p>
            <h1 className="mt-3 text-3xl font-black tracking-[-.03em]">{t('forgot_page_title')}</h1>
            <p className="mt-3 text-sm leading-7 text-white/60">{t('forgot_page_desc')}</p>

            <label className="mt-8 block text-xs font-bold uppercase tracking-[.12em] text-white/60">
              {t('forgot_email_label')}
              <div className="mt-2 flex items-center gap-3 rounded-[6px] border border-white/10 bg-black/20 px-4 py-3">
                <Mail size={16} className="text-accent shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('forgot_email_ph')}
                  className="w-full bg-transparent text-sm text-white outline-none normal-case tracking-normal"
                  dir="ltr"
                />
              </div>
            </label>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="mt-7 inline-flex items-center gap-2 rounded-[6px] bg-accent px-6 py-3 text-sm font-black text-black transition hover:bg-[#50f14d]"
            >
              {t('forgot_send_btn')} <ArrowRight size={15} />
            </motion.button>

            <a href="/login" className="mt-6 block text-sm font-semibold text-accent hover:underline">
              {t('forgot_back_login')}
            </a>
          </motion.form>
        </div>
      </section>
    </main>
  )
}
