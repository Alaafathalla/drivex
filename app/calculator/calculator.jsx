'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calculator, CheckCircle2, Landmark, Percent, ShieldCheck, WalletCards } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { clientApi } from '@/lib/client-api'
import { useCurrency } from '@/context/CurrencyContext'
import { useLang } from '@/context/LangContext'
import { FaqSection, TrustBand } from '@/components/platform/rich-sections'

function Field({ label, value, onChange, min=0, max, step=1, suffix }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-[.1em] text-[#475569]">{label}</span>
        <span className="text-xs font-bold text-[#94a3b8]">{suffix}</span>
      </div>
      <input type="number" min={min} max={max} step={step} value={value} onChange={e => onChange(e.target.value)}
        className="h-12 w-full rounded-2xl border border-[#dfe5db] bg-white px-4 text-sm font-black text-[#0f172a] outline-none transition focus:border-[#B5E92E] focus:ring-4 focus:ring-[#B5E92E]/10" />
    </label>
  )
}

export default function CalculatorPage() {
  const { format } = useCurrency()
  const { t } = useLang()
  const [form, setForm] = useState({ price:180000, downPayment:36000, annualRate:4.49, termMonths:60 })
  const [quote,   setQuote]   = useState(null)
  const [loading, setLoading] = useState(false)
  const update = (key, value) => setForm(f => ({ ...f, [key]: value }))

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    const timer = setTimeout(() =>
      clientApi.post('/api/finance/quote', form)
        .then(data => !cancelled && setQuote(data))
        .catch(() => !cancelled && setQuote(null))
        .finally(() => !cancelled && setLoading(false))
    , 180)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [form])

  const downPct = useMemo(() => Math.min(100, Math.round(Number(form.downPayment||0) / Math.max(1, Number(form.price||1)) * 100)), [form])

  return (
    <main className="bg-[#F5F6F3]">
      <PageHero
        eyebrow={t('calc_eyebrow')}
        title={t('calc_title')}
        description={t('calc_desc')}
        image="https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=2200&q=86"
      />

      <section className="page-inner -mt-10 relative z-10 pb-16">
        <div className="grid overflow-hidden rounded-[30px] border border-[#dfe5db] bg-white shadow-[0_30px_80px_rgba(15,23,42,.12)] lg:grid-cols-[1.1fr_.9fr]">
          {/* Left — inputs */}
          <div className="p-6 sm:p-9">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#B5E92E]/20 text-[#637f16]"><Calculator size={20} /></span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#7d9f24]">{t('calc_loan_inputs')}</p>
                <h2 className="text-xl font-black text-[#0f172a]">{t('calc_build_estimate')}</h2>
              </div>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label={t('calc_vehicle_price')} value={form.price}       onChange={v => update('price', v)}       step={1000} suffix="AED" />
              <Field label={t('calc_down_payment')}  value={form.downPayment} onChange={v => update('downPayment', v)} step={1000} suffix={`${downPct}%`} />
              <Field label={t('calc_interest_rate')} value={form.annualRate}  onChange={v => update('annualRate', v)}  step={0.01} suffix="APR %" />
              <Field label={t('calc_loan_term')}     value={form.termMonths}  onChange={v => update('termMonths', v)}  min={12} max={84} step={12} suffix={t('calc_months')} />
            </div>
            <div className="mt-6 rounded-2xl bg-[#f6f8f3] p-4">
              <input type="range" min="12" max="84" step="12" value={form.termMonths}
                onChange={e => update('termMonths', e.target.value)} className="range-accent w-full" />
              <div className="mt-2 flex justify-between text-[10px] font-bold text-[#94a3b8]">
                {[12,24,36,48,60,72,84].map(n => <span key={n}>{n}</span>)}
              </div>
            </div>
          </div>

          {/* Right — result */}
          <div className="relative bg-[#0b141b] p-6 text-white sm:p-9">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#B5E92E]/10 blur-3xl" />
            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#B5E92E]">{t('calc_est_payment')}</p>
              <motion.p key={quote?.monthlyPayment} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                className="mt-4 text-5xl font-black tracking-[-.06em]">
                {loading ? '—' : quote ? format(quote.monthlyPayment) : '—'}
              </motion.p>
              <p className="mt-2 text-xs text-white/40">{t('calc_indicative')}</p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  [t('calc_financed'),      quote?.principal],
                  [t('calc_total_interest'),quote?.totalInterest],
                  [t('calc_total_paid'),    quote?.totalPayment],
                  [t('calc_term'),          quote?.termMonths ? `${quote.termMonths} ${t('calc_months')}` : null],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-[.12em] text-white/40">{label}</p>
                    <p className="mt-2 text-sm font-black">{typeof value === 'number' ? format(value) : value || '—'}</p>
                  </div>
                ))}
              </div>
              <a href={`/cars?maxPrice=${form.price}`}
                className="mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-[#B5E92E] text-sm font-black text-[#071016]">
                {t('calc_browse_budget')} <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="page-inner pb-16">
        <div className="mb-9">
          <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#7d9f24]">{t('calc_plan_smarter')}</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-.045em] text-[#0f172a]">{t('calc_four_numbers')}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            [WalletCards, t('calc_tip_down'),   t('calc_tip_down_text')],
            [Percent,     t('calc_tip_rate'),   t('calc_tip_rate_text')],
            [Landmark,    t('calc_tip_term'),   t('calc_tip_term_text')],
            [ShieldCheck, t('calc_tip_buffer'), t('calc_tip_buffer_text')],
          ].map(([Icon, title, text], i) => (
            <motion.div key={title} initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i * .05 }}
              className="rounded-[24px] border border-[#dfe5db] bg-white p-6">
              <Icon size={20} className="text-[#7d9f24]" />
              <h3 className="mt-6 font-black text-[#0f172a]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#64748b]">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <TrustBand />
      <FaqSection items={[
        [t('faq_q1'), t('faq_a1')],
        [t('faq_q2'), t('faq_a2')],
        [t('faq_q3'), t('faq_a3')],
        [t('faq_q4'), t('faq_a4')],
      ]} />
    </main>
  )
}
