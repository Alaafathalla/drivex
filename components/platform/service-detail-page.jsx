'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  CalendarHeart,
  CarFront,
  Check,
  CheckCircle2,
  ChevronRight,
  Plane,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'

import { clientApi } from '@/lib/client-api'
import { SERVICE_CATALOG } from '@/lib/rental-catalog'
import { SERVICE_DETAILS, formatServicePrice } from '@/lib/service-details'
import { TestimonialsSection } from '@/components/platform/rich-sections'
import { useLang } from '@/context/LangContext'

const ICONS = {
  wash: Sparkles,
  wedding: CalendarHeart,
  airport: Plane,
  maintenance: Wrench,
  inspection: ShieldCheck,
  tuning: Wrench,
  delivery: CarFront,
  roadside: CarFront,
}

const INPUT =
  'h-11 w-full rounded-xl border border-[#dfe5db] bg-white px-3.5 text-sm text-[#0f172a] outline-none transition placeholder:text-[#9aa5b1] focus:border-[#B5E92E] focus:ring-4 focus:ring-[#B5E92E]/15'

function Field({ label, className = '', children }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-bold text-[#475569]">{label}</span>
      {children}
    </label>
  )
}

function BookingCard({ slug, serviceName, pkgName, priceLabel }) {
  const { t, isRTL } = useLang()
  const [form, setForm] = useState({ date: '', time: '10:00', location: '', name: '', phone: '', vehicle: '', notes: '' })
  const [status, setStatus] = useState('idle')
  const [requestId, setRequestId] = useState('')
  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const submit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    try {
      const result = await clientApi.post('/api/services/book', { service: slug, package: pkgName, ...form })
      setRequestId(result?.id || '')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#dfe5db] bg-white shadow-[0_24px_60px_rgba(15,23,42,.08)]">
      <div className="bg-[#071016] p-6 text-white">
        <h2 className="text-xl font-black">{t('svcd_request_title')}</h2>
        <div className="mt-4 flex items-end justify-between gap-4 border-t border-white/10 pt-4">
          <div className="min-w-0">
            <p className="text-xs text-white/50">{t('svcd_selected_package')}</p>
            <p className="mt-1 truncate text-sm font-bold">{pkgName || serviceName}</p>
          </div>
          <p className="shrink-0 text-base font-black text-[#B5E92E]">{priceLabel}</p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="p-6">
          <div className="flex items-start gap-3 rounded-2xl bg-[#edf7d3] p-4 text-sm font-bold leading-7 text-[#536a14]">
            <CheckCircle2 size={18} className="mt-1 shrink-0" />
            <p>
              {t('svc_req_success')} <span className="font-black" dir="ltr">{requestId}</span>. {t('svc_req_slot_notice')}
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t('svc_pref_date')}>
              <input required type="date" dir="ltr" value={form.date} onChange={(e) => update('date', e.target.value)} className={INPUT} />
            </Field>
            <Field label={t('svc_pref_time')}>
              <input type="time" dir="ltr" value={form.time} onChange={(e) => update('time', e.target.value)} className={INPUT} />
            </Field>
            <Field label={t('svc_location')} className="sm:col-span-2">
              <input required value={form.location} onChange={(e) => update('location', e.target.value)} placeholder={t('svc_location_ph')} className={INPUT} />
            </Field>
            <Field label={t('svc_name')}>
              <input required value={form.name} onChange={(e) => update('name', e.target.value)} className={INPUT} />
            </Field>
            <Field label={t('svc_phone')}>
              <input required type="tel" dir="ltr" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={`${INPUT} ${isRTL ? 'text-end' : ''}`} />
            </Field>
            <Field label={t('svc_vehicle')} className="sm:col-span-2">
              <input value={form.vehicle} onChange={(e) => update('vehicle', e.target.value)} placeholder={t('svc_vehicle_ph')} className={INPUT} />
            </Field>
            <Field label={t('svc_notes')} className="sm:col-span-2">
              <textarea rows={3} value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder={t('svc_notes_ph')} className="w-full rounded-xl border border-[#dfe5db] bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-[#9aa5b1] focus:border-[#B5E92E] focus:ring-4 focus:ring-[#B5E92E]/15" />
            </Field>
          </div>

          {status === 'error' && <p className="mt-4 text-xs font-bold text-red-500">{t('svc_req_error')}</p>}

          <button
            disabled={status === 'loading'}
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#B5E92E] text-sm font-black text-[#071016] transition hover:bg-[#c6f24a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#B5E92E]/40 disabled:opacity-60"
          >
            {status === 'loading' ? t('svc_req_sending') : t('svc_request_btn')}
            <ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} />
          </button>
          <p className="mt-3 text-center text-xs leading-6 text-[#64748b]">{t('svcd_request_hint')}</p>
        </form>
      )}
    </div>
  )
}

function SectionTitle({ title, description }) {
  return (
    <div className="mb-7 max-w-2xl">
      <h2 className="text-2xl font-black text-[#0f172a] sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 text-sm leading-7 text-[#64748b]">{description}</p>}
    </div>
  )
}

export function ServiceDetailPage({ slug }) {
  const { t, lang, isRTL } = useLang()
  const data = SERVICE_DETAILS[slug]
  const catalog = SERVICE_CATALOG.find((s) => s.slug === slug)
  const [pkgIndex, setPkgIndex] = useState(0)
  const [bookVisible, setBookVisible] = useState(false)
  const bookRef = useRef(null)

  useEffect(() => {
    setPkgIndex(0)
  }, [slug])

  useEffect(() => {
    const node = bookRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setBookVisible(entry.isIntersecting), { threshold: 0.15 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [slug])

  if (!data || !catalog) return null

  const c = data[lang] || data.en
  const Icon = ICONS[slug] || Sparkles
  const serviceName = t(catalog.titleKey || catalog.title)
  const startingPrice = formatServicePrice(data.from, lang)
  const pkgName = c.packages[pkgIndex]?.[0]
  const pkgPrice = formatServicePrice(data.prices[pkgIndex], lang)

  const others = (() => {
    const i = SERVICE_CATALOG.findIndex((s) => s.slug === slug)
    return Array.from({ length: 4 }, (_, k) => SERVICE_CATALOG[(i + 1 + k) % SERVICE_CATALOG.length])
  })()

  const trust = [t('svc_verified_partners'), t('svc_transparent_quote'), t('svc_dashboard_tracking')]

  return (
    <main className="min-h-screen bg-[#F5F6F3] pb-24 lg:pb-0" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071016] text-white">
        <img src={data.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071016] via-[#071016]/85 to-[#071016]/25 rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071016]/70 via-transparent to-transparent" />

        <div className="page-inner relative py-14 sm:py-20 lg:py-24">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/60">
            <Link href="/" className="hover:text-white">{t('nav_home')}</Link>
            <ChevronRight size={13} className="rtl:rotate-180" />
            <Link href="/services" className="hover:text-white">{t('nav_services')}</Link>
            <ChevronRight size={13} className="rtl:rotate-180" />
            <span className="text-white">{serviceName}</span>
          </nav>

          <div className="mt-10 max-w-3xl">
            <span className="grid size-12 place-items-center rounded-full bg-[#B5E92E] text-[#071016]">
              <Icon size={22} />
            </span>
            <h1 className="mt-6 text-[clamp(34px,4.8vw,64px)] font-black leading-[1.08] text-balance">{c.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">{c.description}</p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <a
                href="#book"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#B5E92E] px-7 text-sm font-black text-[#071016] transition hover:bg-[#c6f24a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#B5E92E]/40"
              >
                {t('svc_request_btn')}
                <ArrowRight size={15} className="rtl:rotate-180" />
              </a>
              <div>
                <p className="text-xs text-white/50">{t('svcd_starting_from')}</p>
                <p className="mt-0.5 text-xl font-black">{startingPrice}</p>
              </div>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-white/65">
              {trust.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <BadgeCheck size={15} className="text-[#B5E92E]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Content + booking */}
      <div className="page-inner grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14 lg:py-20">
        <div className="min-w-0 space-y-16">
          {/* Packages */}
          <section>
            <SectionTitle title={t('svcd_choose_package')} description={t('svcd_choose_package_desc')} />
            <div role="radiogroup" aria-label={t('svcd_choose_package')} className="space-y-3">
              {c.packages.map(([name, text], index) => {
                const active = index === pkgIndex
                return (
                  <button
                    key={name}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setPkgIndex(index)}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-start transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#B5E92E]/30 sm:p-5 ${
                      active ? 'border-[#B5E92E] bg-[#f4fbdc]' : 'border-[#e2e6de] bg-white hover:border-[#c9d3bd]'
                    }`}
                  >
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full border-2 transition ${
                        active ? 'border-[#7d9f24] bg-[#B5E92E]' : 'border-[#c3cabb] bg-white'
                      }`}
                    >
                      {active && <Check size={13} strokeWidth={3.5} className="text-[#071016]" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-black text-[#0f172a]">{name}</span>
                      <span className="mt-1 block text-sm leading-6 text-[#64748b]">{text}</span>
                    </span>
                    <span className="shrink-0 text-sm font-black text-[#5f7d12]">{formatServicePrice(data.prices[index], lang)}</span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* What you get */}
          <section>
            <SectionTitle title={t('svcd_included')} />
            <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {c.benefits.map(([name, text]) => (
                <div key={name} className="flex gap-4 border-t border-[#dfe5db] pt-5">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[#B5E92E]/25 text-[#5f7d12]">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="text-base font-black text-[#0f172a]">{name}</h3>
                    <p className="mt-1.5 text-sm leading-7 text-[#64748b]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section>
            <SectionTitle title={t('svc_process_title')} />
            <ol>
              {c.process.map(([name, text], index) => (
                <li key={name} className="relative ps-14 pb-9 last:pb-0">
                  {index < c.process.length - 1 && <span aria-hidden className="absolute start-[17px] top-10 bottom-1 w-px bg-[#cfd7c4]" />}
                  <span className="absolute start-0 top-0 grid size-9 place-items-center rounded-full bg-[#071016] text-sm font-black text-[#B5E92E]">
                    {index + 1}
                  </span>
                  <h3 className="pt-1 text-base font-black text-[#0f172a]">{name}</h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-7 text-[#64748b]">{text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section>
            <SectionTitle title={t('svcd_faq')} />
            <div className="divide-y divide-[#dfe5db] border-y border-[#dfe5db]">
              {c.faq.map(([q, a]) => (
                <details key={q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-black text-[#0f172a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#B5E92E]/30 [&::-webkit-details-marker]:hidden">
                    <span>{q}</span>
                    <span aria-hidden className="text-xl leading-none text-[#7d9f24] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-2xl pt-3 text-sm leading-7 text-[#64748b]">{a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside id="book" ref={bookRef} className="scroll-mt-32 lg:sticky lg:top-36 lg:self-start">
          <BookingCard slug={slug} serviceName={serviceName} pkgName={pkgName} priceLabel={pkgPrice} />
        </aside>
      </div>

      {/* More services */}
      <section className="bg-white py-16">
        <div className="page-inner">
          <div className="mb-8 flex items-end justify-between gap-5">
            <SectionTitle title={t('svcd_more_services')} description={t('svcd_more_services_desc')} />
            <Link href="/services" className="mb-7 inline-flex shrink-0 items-center gap-2 text-sm font-black text-[#0f172a] hover:text-[#5f7d12]">
              {t('svcd_all_services')}
              <ArrowRight size={15} className="rtl:rotate-180" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {others.map((s) => {
              const OtherIcon = ICONS[s.slug] || Sparkles
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group overflow-hidden rounded-[22px] border border-[#e2e6de] bg-[#fafbf9] transition hover:border-[#B5E92E] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#B5E92E]/30"
                >
                  <div className="relative aspect-[1.6] overflow-hidden">
                    <img src={s.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <span className="absolute bottom-3 start-3 grid size-9 place-items-center rounded-full bg-[#B5E92E] text-[#071016]">
                      <OtherIcon size={16} />
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-black text-[#0f172a] sm:text-base">{t(s.titleKey || s.title)}</h3>
                    <p className="mt-1.5 text-xs font-bold text-[#5f7d12]">{formatServicePrice(SERVICE_DETAILS[s.slug]?.from, lang)}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Mobile request bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-[#e2e6de] bg-white/95 p-3 backdrop-blur transition-transform duration-300 lg:hidden ${
          bookVisible ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="min-w-0 ps-2">
          <p className="text-[11px] text-[#64748b]">{t('svcd_starting_from')}</p>
          <p className="truncate text-sm font-black text-[#0f172a]">{startingPrice}</p>
        </div>
        <a href="#book" className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-[#B5E92E] px-6 text-sm font-black text-[#071016]">
          {t('svc_request_btn')}
          <ArrowRight size={14} className="rtl:rotate-180" />
        </a>
      </div>
    </main>
  )
}
