'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'

import { clientApi } from '@/lib/client-api'
import { FaqSection, NewsSection, SectionHeading, TestimonialsSection, TrustBand } from '@/components/platform/rich-sections'
import { useLang } from '@/context/LangContext'

const FEATURE_ICONS = [ShieldCheck, Sparkles, Clock3, Wrench]

function ServiceRequestForm({ slug, startingPrice }) {
  const { t, isRTL } = useLang()
  const [form, setForm] = useState({ date: '', time: '10:00', location: '', name: '', phone: '', vehicle: '', notes: '' })
  const [status, setStatus] = useState('idle')
  const [requestId, setRequestId] = useState('')
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const submit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    try {
      const result = await clientApi.post('/api/services/book', { service: slug, ...form })
      setRequestId(result.id)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="grid overflow-hidden rounded-[30px] border border-[#dfe5db] bg-white shadow-[0_26px_70px_rgba(15,23,42,.08)] lg:grid-cols-[.72fr_1.28fr]">
      <aside className="relative overflow-hidden border-r border-[#E5E7EB] bg-[#F8FAFC] p-7 text-slate-900 sm:p-9">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(181,233,46,.18),transparent_38%)]" />
        <div className="relative flex h-full min-h-[310px] flex-col">
          <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#B5E92E]">{t('svc_live_request')}</p>
          <h3 className="mt-4 text-3xl font-black tracking-[-.045em]">{t('svc_book_slot_title')}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-500">{t('svc_book_slot_desc')}</p>
          <div className="mt-auto pt-8">
            <p className="text-xs uppercase tracking-[.14em] text-slate-400">{t('svc_starting_price')}</p>
            <p className="mt-2 text-2xl font-black text-[#B5E92E]">{startingPrice}</p>
            <div className="mt-6 space-y-3 text-xs font-semibold text-slate-600">
              {[t('svc_verified_partners'), t('svc_transparent_quote'), t('svc_dashboard_tracking')].map((item) => (
                <p key={item} className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#B5E92E]" />{item}</p>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <form onSubmit={submit} className="p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-xs font-black text-[#475569]">{t('svc_pref_date')}</span>
            <input required type="date" value={form.date} onChange={(event) => update('date', event.target.value)} className="h-12 w-full rounded-2xl border border-[#dfe5db] px-4 text-sm outline-none focus:border-[#B5E92E]" />
          </label>
          <label>
            <span className="mb-2 block text-xs font-black text-[#475569]">{t('svc_pref_time')}</span>
            <input type="time" value={form.time} onChange={(event) => update('time', event.target.value)} className="h-12 w-full rounded-2xl border border-[#dfe5db] px-4 text-sm outline-none focus:border-[#B5E92E]" />
          </label>
          <label className="sm:col-span-2">
            <span className="mb-2 block text-xs font-black text-[#475569]">{t('svc_location')}</span>
            <input required value={form.location} onChange={(event) => update('location', event.target.value)} placeholder={t('svc_location_ph')} className="h-12 w-full rounded-2xl border border-[#dfe5db] px-4 text-sm outline-none focus:border-[#B5E92E]" />
          </label>
          <label>
            <span className="mb-2 block text-xs font-black text-[#475569]">{t('svc_name')}</span>
            <input required value={form.name} onChange={(event) => update('name', event.target.value)} className="h-12 w-full rounded-2xl border border-[#dfe5db] px-4 text-sm outline-none focus:border-[#B5E92E]" />
          </label>
          <label>
            <span className="mb-2 block text-xs font-black text-[#475569]">{t('svc_phone')}</span>
            <input required value={form.phone} onChange={(event) => update('phone', event.target.value)} className="h-12 w-full rounded-2xl border border-[#dfe5db] px-4 text-sm outline-none focus:border-[#B5E92E]" />
          </label>
          <label className="sm:col-span-2">
            <span className="mb-2 block text-xs font-black text-[#475569]">{t('svc_vehicle')}</span>
            <input value={form.vehicle} onChange={(event) => update('vehicle', event.target.value)} placeholder={t('svc_vehicle_ph')} className="h-12 w-full rounded-2xl border border-[#dfe5db] px-4 text-sm outline-none focus:border-[#B5E92E]" />
          </label>
          <label className="sm:col-span-2">
            <span className="mb-2 block text-xs font-black text-[#475569]">{t('svc_notes')}</span>
            <textarea rows={3} value={form.notes} onChange={(event) => update('notes', event.target.value)} placeholder={t('svc_notes_ph')} className="w-full rounded-2xl border border-[#dfe5db] px-4 py-3 text-sm outline-none focus:border-[#B5E92E]" />
          </label>
        </div>
        {status === 'success' && (
          <div className="mt-5 rounded-2xl bg-[#edf7d3] p-4 text-sm font-bold text-[#536a14]">
            {t('svc_req_success')} <span className="font-black">{requestId}</span>. {t('svc_req_slot_notice')}
          </div>
        )}
        {status === 'error' && (
          <p className="mt-4 text-xs font-bold text-red-500">{t('svc_req_error')}</p>
        )}
        <button disabled={status === 'loading'} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0e1418] text-sm font-black text-white transition hover:bg-[#B5E92E] hover:text-[#071016] disabled:opacity-60">
          {status === 'loading' ? t('svc_req_sending') : t('svc_request_btn')}
          <ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} />
        </button>
      </form>
    </div>
  )
}

export function ServiceDetailPage({
  slug,
  eyebrow,
  title,
  description,
  heroImage,
  startingPrice,
  packages = [],
  benefits = [],
  process = [],
  faq = [],
}) {
  const { t, isRTL } = useLang()

  const featureItems = useMemo(() => (benefits.length ? benefits : [
    [t('about_curated'), t('about_curated_text')],
    [t('svc_transparent_quote'), t('trust_transparent_text')],
    [t('about_seamless'), t('about_seamless_text')],
    [t('svc_dashboard_tracking'), t('trust_support_text')],
  ]), [benefits, t])

  return (
    <main className="min-h-screen bg-[#F5F6F3]">
      <section className="relative overflow-hidden border-b border-[#E5E7EB] bg-[#F8FAFC] text-slate-900">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/94 to-[#F8FAFC]/60" />
        <div className="page-inner relative py-20 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#B5E92E]">{eyebrow}</p>
            <h1 className="mt-4 text-5xl font-black leading-[.95] tracking-[-.055em] sm:text-6xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">{description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#book" className="rounded-full bg-[#0F172A] px-5 py-3 text-xs font-black text-white">
                {t('svc_request_btn')}
              </a>
              <span className="rounded-full border border-[#E5E7EB] bg-white px-5 py-3 text-xs font-black text-slate-600">
                {startingPrice}
              </span>
            </div>
          </div>
        </div>
      </section>

      {packages.length > 0 && (
        <section className="page-inner py-16 sm:py-20">
          <SectionHeading eyebrow={t('svc_packages_title')} title={t('cats_rental_title')} description={t('cats_rental_desc')} />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((item, index) => (
              <motion.article key={item[0]} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className="rounded-[24px] border border-[#e2e6de] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,.04)]">
                <p className="text-[10px] font-black uppercase tracking-[.14em] text-[#94a3b8]">0{index + 1}</p>
                <h2 className="mt-6 text-xl font-black tracking-[-.03em] text-[#0f172a]">{item[0]}</h2>
                <p className="mt-3 min-h-12 text-sm leading-6 text-[#64748b]">{item[1]}</p>
                <p className="mt-6 border-t border-[#e2e6de] pt-4 text-sm font-black text-[#7d9f24]">{item[2]}</p>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      <section className="bg-white py-16 sm:py-20">
        <div className="page-inner">
          <SectionHeading eyebrow={t('svc_benefits_title')} title={t('about_why_exist')} />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featureItems.map(([name, text], index) => {
              const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length]
              return (
                <div key={name} className="rounded-[24px] border border-[#e2e6de] bg-[#fafbf9] p-6">
                  <Icon size={20} className="text-[#7d9f24]" />
                  <h3 className="mt-7 text-lg font-black text-[#0f172a]">{name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#64748b]">{text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="book" className="page-inner scroll-mt-28 py-16 sm:py-20">
        <SectionHeading eyebrow={t('nav_services')} title={t('svc_book_slot_title')} description={t('svc_book_slot_desc')} />
        <ServiceRequestForm slug={slug} startingPrice={startingPrice} />
      </section>

      {process.length > 0 && (
        <section className="bg-white py-16 text-slate-900 sm:py-20">
          <div className="page-inner">
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#7F9F1B]">{t('svc_process_title')}</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-.045em] text-[#0F172A]">{t('about_h2')}</h2>
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {process.map((item, index) => (
                <div key={item[0]} className="rounded-[24px] border border-[#E5E7EB] bg-[#F8FAFC] p-6">
                  <span className="text-xs font-black text-[#7F9F1B]">0{index + 1}</span>
                  <h3 className="mt-8 text-lg font-black text-[#0F172A]">{item[0]}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{item[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <TrustBand />
      <TestimonialsSection />
      {faq.length > 0 ? <FaqSection items={faq} /> : <FaqSection />}
      <NewsSection />
    </main>
  )
}
