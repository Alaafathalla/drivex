'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Car, CheckCircle2, ChevronDown, Info, TrendingDown, TrendingUp } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { useToast } from '@/context/ToastContext'
import { useCurrency } from '@/context/CurrencyContext'
import { useLang } from '@/context/LangContext'

const BRANDS = ['BMW','Mercedes-Benz','Audi','Porsche','Range Rover','Tesla','Toyota','Lexus','Nissan','Chevrolet','Ferrari','Lamborghini','Other']
const YEARS  = Array.from({ length: 20 }, (_, i) => String(new Date().getFullYear() - i))

/* ── Sub-components receive translated label from parent ── */
function Sel({ label, options, value, onChange, error }) {
  const { t } = useLang()
  return (
    <div>
      <label className="mb-2 block text-[11px] font-black uppercase tracking-[.12em] text-[#64748b]">{label}</label>
      <div className="relative">
        <select value={value} onChange={e => onChange(e.target.value)}
          className={`h-12 w-full appearance-none rounded-2xl border px-4 pr-9 text-[13px] font-semibold text-[#0f172a] outline-none transition focus:ring-2 focus:ring-[#B5E92E]/20 ${error ? 'border-red-400' : 'border-[#dfe5db] focus:border-[#B5E92E]'}`}>
          <option value="">{t('select_placeholder')}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
      </div>
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  )
}

function Inp({ label, value, onChange, type = 'text', placeholder, error }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-black uppercase tracking-[.12em] text-[#64748b]">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} dir="auto"
        className={`h-12 w-full rounded-2xl border px-4 text-[13px] font-semibold text-[#0f172a] outline-none transition focus:ring-2 focus:ring-[#B5E92E]/20 ${error ? 'border-red-400' : 'border-[#dfe5db] focus:border-[#B5E92E]'}`} />
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  )
}

export default function TradeInPage() {
  const toast          = useToast()
  const { format }     = useCurrency()
  const { t, isRTL }   = useLang()

  /* Condition list built from translations so labels swap on lang toggle */
  const CONDITIONS = [
    { key: 'Excellent', label: t('ti_cond_excellent'), desc: t('ti_cond_excellent_desc') },
    { key: 'Good',      label: t('ti_cond_good'),      desc: t('ti_cond_good_desc')      },
    { key: 'Fair',      label: t('ti_cond_fair'),      desc: t('ti_cond_fair_desc')      },
    { key: 'Poor',      label: t('ti_cond_poor'),      desc: t('ti_cond_poor_desc')      },
  ]

  const [form, setForm] = useState({ brand:'', model:'', year:'', mileage:'', condition:'', color:'', name:'', email:'', phone:'' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState(null)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const req = t('ti_req')

  const validate = () => {
    const e = {}
    if (!form.brand)        e.brand     = req
    if (!form.model.trim()) e.model     = req
    if (!form.year)         e.year      = req
    if (!form.mileage)      e.mileage   = req
    if (!form.condition)    e.condition = req
    if (!form.name.trim())  e.name      = req
    if (!form.email.trim()) e.email     = req
    if (!form.phone.trim()) e.phone     = req
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      await new Promise(r => setTimeout(r, 1400))
      const agePrices = { BMW:50000,'Mercedes-Benz':52000,Audi:44000,Porsche:90000,'Range Rover':70000,Tesla:70000,Toyota:25000,Lexus:45000,Nissan:22000,Chevrolet:28000,Ferrari:160000,Lamborghini:180000,Other:30000 }
      const base          = agePrices[form.brand] || 30000
      const ageFactor     = Math.max(0.4, 1 - (new Date().getFullYear() - Number(form.year)) * 0.06)
      const mileageFactor = Math.max(0.5, 1 - (Number(form.mileage) / 200000) * 0.35)
      const condMult      = { Excellent:1, Good:0.88, Fair:0.72, Poor:0.55 }
      const condFactor    = condMult[form.condition] || 0.8
      const value         = Math.round(base * ageFactor * mileageFactor * condFactor / 500) * 500
      setResult({ estimatedTradeInValue: value, min: Math.round(value * 0.92), max: Math.round(value * 1.08) })
      toast({ message: t('ti_result_title'), type: 'success' })
    } catch {
      toast({ message: 'Valuation failed. Please try again.', type: 'error' })
    } finally { setLoading(false) }
  }

  return (
    <main className="min-h-screen bg-[#F5F6F3]">
      <PageHero eyebrow={t('ti_eyebrow')} title={t('ti_title')} description={t('ti_desc')}
        image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=2200&q=86" />

      <section className="page-inner py-12">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-start">

          {/* ── Form ── */}
          <div className="space-y-5">
            {/* Vehicle details */}
            <div className="rounded-[24px] border border-[#dfe5db] bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-[17px] font-black text-[#0f172a]">
                <Car size={17} className="text-[#B5E92E]" /> {t('ti_vehicle_details')}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Sel  label={t('ti_brand')}   options={BRANDS} value={form.brand}   onChange={v => set('brand', v)}   error={errors.brand} />
                <Inp  label={t('ti_model')}   value={form.model}   onChange={v => set('model', v)}   placeholder={t('ti_model_ph')}   error={errors.model} />
                <Sel  label={t('ti_year')}    options={YEARS}  value={form.year}    onChange={v => set('year', v)}    error={errors.year} />
                <Inp  label={t('ti_mileage')} type="number" value={form.mileage} onChange={v => set('mileage', v)} placeholder={t('ti_mileage_ph')} error={errors.mileage} />
                <div className="sm:col-span-2">
                  <Inp label={t('ti_colour')} value={form.color} onChange={v => set('color', v)} placeholder={t('ti_colour_ph')} />
                </div>
              </div>
            </div>

            {/* Condition */}
            <div className="rounded-[24px] border border-[#dfe5db] bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-[15px] font-black text-[#0f172a]">{t('ti_condition')}</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {CONDITIONS.map(c => (
                  <button key={c.key} onClick={() => { set('condition', c.key); setErrors(p => ({ ...p, condition:'' })) }}
                    className={`rounded-2xl border-2 p-4 text-left transition ${
                      form.condition === c.key ? 'border-[#B5E92E] bg-[#f6fce4]' : 'border-[#f0f2ef] hover:border-[#dfe5db]'
                    }`}>
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] font-black text-[#0f172a]">{c.label}</p>
                      {form.condition === c.key && <CheckCircle2 size={14} className="text-[#B5E92E]" />}
                    </div>
                    <p className="mt-1 text-[11px] text-[#64748b]">{c.desc}</p>
                  </button>
                ))}
              </div>
              {errors.condition && <p className="mt-2 text-[11px] text-red-500">{errors.condition}</p>}
            </div>

            {/* Contact */}
            <div className="rounded-[24px] border border-[#dfe5db] bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-[15px] font-black text-[#0f172a]">{t('ti_contact')}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Inp label={t('ti_full_name')} value={form.name}  onChange={v => set('name', v)}  placeholder={t('ti_full_name')} error={errors.name} />
                <Inp label={t('ti_email')} type="email" value={form.email} onChange={v => set('email', v)} placeholder="you@example.com" error={errors.email} />
                <div className="sm:col-span-2">
                  <Inp label={t('ti_phone')} type="tel" value={form.phone} onChange={v => set('phone', v)} placeholder="+971 50 000 0000" error={errors.phone} />
                </div>
              </div>
            </div>

            <button onClick={submit} disabled={loading}
              style={{ height: 52 }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0f172a] text-[14px] font-black text-white transition hover:bg-[#B5E92E] hover:text-[#071016] disabled:opacity-60">
              {loading ? t('ti_calculating') : t('ti_get_valuation')}
              {!loading && <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />}
            </button>
          </div>

          {/* ── Result panel ── */}
          <div className="lg:sticky lg:top-[100px]">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div key="result" initial={{ opacity:0, scale:0.95, y:16 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0 }}
                  className="overflow-hidden rounded-[24px] border border-[#dfe5db] bg-white shadow-lg">
                  <div className="bg-[#0f172a] p-6 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#B5E92E]">{t('ti_result_title')}</p>
                    <motion.p key={result.estimatedTradeInValue} initial={{ scale:0.7 }} animate={{ scale:1 }}
                      className="mt-3 text-[48px] font-black leading-none tracking-[-0.06em] text-white">
                      {format(result.estimatedTradeInValue)}
                    </motion.p>
                    <p className="mt-2 text-[11px] text-white/40">{t('ti_indicative')}</p>
                  </div>

                  <div className="grid grid-cols-2 divide-x divide-[#f0f2ef] border-b border-[#f0f2ef]">
                    <div className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <TrendingDown size={14} className="text-rose-400" />
                        <p className="text-[10px] font-black uppercase text-[#94a3b8]">{t('ti_conservative')}</p>
                      </div>
                      <p className="mt-1 text-[18px] font-black text-[#0f172a]">{format(result.min)}</p>
                    </div>
                    <div className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <TrendingUp size={14} className="text-[#B5E92E]" />
                        <p className="text-[10px] font-black uppercase text-[#94a3b8]">{t('ti_optimistic')}</p>
                      </div>
                      <p className="mt-1 text-[18px] font-black text-[#0f172a]">{format(result.max)}</p>
                    </div>
                  </div>

                  <div className="space-y-2 p-5 text-[12px]">
                    {[
                      [t('td_vehicle'),   `${form.brand} ${form.model} (${form.year})`],
                      [t('ti_mileage'),   `${Number(form.mileage).toLocaleString()} ${t('ti_mileage_km')}`],
                      [t('ti_condition'), CONDITIONS.find(c => c.key === form.condition)?.label || form.condition],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between rounded-xl bg-[#f6f8f3] px-3 py-2">
                        <span className="text-[#64748b]">{k}</span>
                        <span className="font-black text-[#0f172a]">{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2 border-t border-[#f0f2ef] px-5 pb-4 pt-3">
                    <Info size={12} className="mt-0.5 shrink-0 text-[#94a3b8]" />
                    <p className="text-[10px] leading-5 text-[#94a3b8]">{t('ti_disclaimer')}</p>
                  </div>

                  <div className="space-y-2 px-5 pb-5">
                    <a href="/list-your-car"
                      className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#B5E92E] text-[13px] font-black text-[#071016] transition hover:brightness-105">
                      {t('ti_list_now')} <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
                    </a>
                    <a href="/contact"
                      className="flex h-10 items-center justify-center gap-2 rounded-2xl border border-[#dfe5db] text-[12px] font-black text-[#64748b] transition hover:border-[#0f172a]">
                      {t('ti_talk_advisor')}
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="placeholder" initial={{ opacity:0 }} animate={{ opacity:1 }}
                  className="overflow-hidden rounded-[24px] border border-[#dfe5db] bg-white p-8 text-center shadow-sm">
                  <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#f6f8f3]">
                    <Car size={26} className="text-[#94a3b8]" />
                  </div>
                  <h3 className="text-[16px] font-black text-[#0f172a]">{t('ti_placeholder_title')}</h3>
                  <p className="mt-2 text-[12px] text-[#94a3b8]">{t('ti_placeholder_desc')}</p>
                  <div className="mt-8 space-y-3 text-left">
                    {[
                      [t('ti_free'),    t('ti_free_sub')],
                      [t('ti_instant'), t('ti_instant_sub')],
                      [t('ti_market'),  t('ti_market_sub')],
                    ].map(([title, sub]) => (
                      <div key={title} className="flex items-center gap-3">
                        <CheckCircle2 size={15} className="shrink-0 text-[#B5E92E]" />
                        <div>
                          <p className="text-[12px] font-black text-[#0f172a]">{title}</p>
                          <p className="text-[11px] text-[#94a3b8]">{sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  )
}
