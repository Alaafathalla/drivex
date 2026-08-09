'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Upload } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { useLang } from '@/context/LangContext'

const STEP_COUNT = 5

export default function SellPage() {
  const { t } = useLang()
  const [step, setStep] = useState(1)

  const stepLabels = t('sell_steps')
  const fields = [
    [['sell_make','sell_model','sell_year','sell_mileage','sell_trim','sell_location'], t('sell_tell_us')],
    [['sell_condition','sell_description'], t('sell_tell_us')],
    [[], t('sell_photos')],
    [['sell_price'], t('sell_tell_us')],
    [[], t('sell_tell_us')],
  ]

  const [stepData] = fields[step - 1]
  const stepTitle = fields[step - 1][1]

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#070908] pt-[72px] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(46,229,43,.1),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1450px] px-5 py-14 sm:px-8 lg:px-10">
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
            className="text-[10px] font-black uppercase tracking-[.2em] text-accent">{t('sell_eyebrow')}</motion.p>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }}
            className="mt-3 text-[clamp(32px,5vw,64px)] font-black leading-[.92] tracking-[-.05em]">{t('sell_title')}</motion.h1>
          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
            className="mt-4 max-w-xl text-[15px] leading-7 text-white/55">{t('sell_desc')}</motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8 lg:px-10">
        {/* Step progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {Array.from({ length: STEP_COUNT }).map((_, i) => {
              const n = i + 1
              const done = step > n
              const active = step === n
              return (
                <div key={n} className="flex flex-1 items-center">
                  <motion.div
                    animate={{ scale: active ? 1.1 : 1 }}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-black transition ${
                      done   ? 'border-accent bg-accent text-black' :
                      active ? 'border-accent text-accent' :
                               'border-border text-muted-foreground'
                    }`}
                  >
                    {done ? <Check size={14} /> : n}
                  </motion.div>
                  <p className={`ms-2 hidden text-xs font-bold sm:block ${active ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {stepLabels[i]}
                  </p>
                  {n < STEP_COUNT && (
                    <div className="mx-3 flex-1 h-[2px] rounded-full bg-border">
                      <motion.div
                        animate={{ width: step > n ? '100%' : '0%' }}
                        transition={{ duration: 0.4 }}
                        className="h-full rounded-full bg-accent"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[8px] border border-border bg-card p-7 sm:p-10"
          >
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-accent">
              {t('sell_step')} {step} {t('sell_of')} {STEP_COUNT}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-[-.04em]">
              {step === 3 ? t('sell_photos') : step === 5 ? 'Review & Submit' : t('sell_tell_us')}
            </h2>

            {step === 3 ? (
              // Photo upload step
              <div className="mt-8">
                <motion.div
                  whileHover={{ borderColor: 'rgba(46,229,43,0.6)' }}
                  className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-[7px] border-2 border-dashed border-border py-16 transition"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                    <Upload size={24} className="text-accent" />
                  </div>
                  <div className="text-center">
                    <p className="font-black">{t('sell_photos')}</p>
                    <p className="mt-1 text-sm text-muted-foreground">PNG, JPG up to 10MB each</p>
                  </div>
                </motion.div>
              </div>
            ) : step === 5 ? (
              // Review step
              <div className="mt-8 space-y-4">
                {['Vehicle', 'Condition', 'Photos', 'Pricing'].map((s, i) => (
                  <div key={s} className="flex items-center justify-between rounded-[5px] border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10">
                        <Check size={14} className="text-accent" />
                      </div>
                      <span className="font-bold">{stepLabels[i]}</span>
                    </div>
                    <button onClick={() => setStep(i+1)} className="cursor-pointer text-xs font-bold text-accent hover:underline">
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              // Regular fields
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {(step === 1
                  ? ['sell_make','sell_model','sell_year','sell_mileage','sell_trim','sell_location']
                  : step === 2
                  ? ['sell_condition']
                  : ['sell_price']
                ).map((fieldKey) => (
                  <label key={fieldKey} className="text-xs font-black uppercase tracking-[.1em] text-muted-foreground">
                    {t(fieldKey)}
                    {fieldKey === 'sell_description' || fieldKey === 'sell_condition' ? (
                      <textarea
                        placeholder={t(fieldKey)}
                        className="mt-2 min-h-[100px] w-full resize-none rounded-[5px] border border-border bg-background p-4 text-sm normal-case tracking-normal outline-none focus:border-accent sm:col-span-2"
                      />
                    ) : (
                      <input
                        placeholder={t(fieldKey)}
                        className="mt-2 h-12 w-full rounded-[5px] border border-border bg-background px-4 text-sm normal-case tracking-normal outline-none focus:border-accent"
                      />
                    )}
                  </label>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="mt-5 sm:col-span-2">
                <label className="text-xs font-black uppercase tracking-[.1em] text-muted-foreground">
                  {t('sell_description')}
                  <textarea
                    placeholder={t('sell_description')}
                    className="mt-2 min-h-[120px] w-full resize-none rounded-[5px] border border-border bg-background p-4 text-sm normal-case tracking-normal outline-none focus:border-accent"
                  />
                </label>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(s => Math.max(1, s - 1))}
                disabled={step === 1}
                className="cursor-pointer rounded-[5px] border border-border px-6 py-3 text-xs font-black transition hover:border-accent disabled:opacity-30"
              >
                {t('sell_back')}
              </button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep(s => Math.min(STEP_COUNT, s + 1))}
                className="cursor-pointer inline-flex items-center gap-2 rounded-[5px] bg-accent px-7 py-3 text-xs font-black text-black transition hover:bg-[#50f14d]"
              >
                {step === STEP_COUNT ? t('sell_submit') : t('sell_continue')}
                <ArrowRight size={15} />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <SiteFooter />
    </main>
  )
}
