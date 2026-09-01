'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, Headphones, Quote, ShieldCheck, Sparkles } from 'lucide-react'
import { useLang } from '@/context/LangContext'

export function SectionHeading({ eyebrow, title, description, actionHref, actionLabel = 'Explore' }) {
  return (
    <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#7d9f24]">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-.045em] text-[#0f172a] sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-sm leading-7 text-[#64748b]">{description}</p>}
      </div>
      {actionHref && (
        <a href={actionHref} className="inline-flex items-center gap-2 text-sm font-black text-[#0f172a]">
          {actionLabel} <ArrowRight size={15} />
        </a>
      )}
    </div>
  )
}

export function TrustBand() {
  const { t } = useLang()
  const items = [
    [ShieldCheck,  t('trust_inspected'),  t('trust_inspected_text')],
    [BadgeCheck,   t('trust_verified'),   t('trust_verified_text')],
    [Sparkles,     t('trust_transparent'),t('trust_transparent_text')],
    [Headphones,   t('trust_support'),    t('trust_support_text')],
  ]
  return (
    <section className="page-inner py-14">
      <div className="grid overflow-hidden rounded-[26px] border border-[#e2e6de] bg-white shadow-[0_18px_40px_rgba(15,23,42,.04)] md:grid-cols-2 xl:grid-cols-4">
        {items.map(([Icon, title, text], i) => (
          <motion.div key={title} initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i * .05 }}
            className="border-b border-[#e2e6de] p-6 last:border-0 md:border-r xl:border-b-0">
            <Icon size={20} className="text-[#8fb91f]" />
            <h3 className="mt-5 text-base font-black text-[#0f172a]">{title}</h3>
            <p className="mt-2 text-xs leading-6 text-[#64748b]">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  const { t } = useLang()
  const quotes = [
    [t('testimonial1_q'), t('testimonial1_name'), t('testimonial1_role')],
    [t('testimonial2_q'), t('testimonial2_name'), t('testimonial2_role')],
    [t('testimonial3_q'), t('testimonial3_name'), t('testimonial3_role')],
  ]
  return (
    <section className="bg-[#F8FAFC] py-16 text-slate-900 sm:py-20">
      <div className="page-inner">
        <SectionHeading
          eyebrow={t('testimonials_eyebrow')}
          title={t('testimonials_title')}
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {quotes.map(([quote, name, meta], i) => (
            <motion.article key={name} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i * .06 }}
              className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_16px_32px_rgba(15,23,42,.04)]">
              <Quote size={20} className="text-[#8FB91F]" />
              <p className="mt-6 text-base font-semibold leading-7 text-slate-700">{quote}</p>
              <div className="mt-8 border-t border-[#E5E7EB] pt-4">
                <p className="text-sm font-black text-slate-900">{name}</p>
                <p className="mt-1 text-xs text-slate-400">{meta}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FaqSection({ items }) {
  const { t } = useLang()
  const list = items || [
    [t('faq_q1'), t('faq_a1')],
    [t('faq_q2'), t('faq_a2')],
    [t('faq_q3'), t('faq_a3')],
    [t('faq_q4'), t('faq_a4')],
  ]
  return (
    <section className="page-inner py-16 sm:py-20">
      <SectionHeading eyebrow={t('faq_eyebrow')} title={t('faq_title')} />
      <div className="mx-auto max-w-4xl divide-y divide-[#e2e6de] rounded-[26px] border border-[#e2e6de] bg-white px-6 shadow-[0_16px_40px_rgba(15,23,42,.04)]">
        {list.map(([q, a]) => (
          <details key={q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-black text-[#0f172a]">
              <span>{q}</span>
              <span className="text-xl text-[#8fb91f] transition group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-3xl pb-2 pt-3 text-sm leading-7 text-[#64748b]">{a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function NewsSection() {
  const { t } = useLang()
  const posts = [
    { tag: t('journal_eyebrow'), title: 'What UAE drivers should know before switching to electric', read: `6 ${t('journal_read')}`, href: '/journal/uae-ev-ownership-guide',    img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80' },
    { tag: t('journal_eyebrow'), title: 'How to compare a used luxury SUV beyond the headline price', read: `8 ${t('journal_read')}`, href: '/journal/compare-used-luxury-suvs', img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80' },
    { tag: t('journal_eyebrow'), title: 'Five preventive maintenance checks before a long summer drive', read: `5 ${t('journal_read')}`, href: '/journal/summer-checks',          img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80' },
  ]
  return (
    <section className="page-inner py-16">
      <SectionHeading eyebrow={t('journal_eyebrow')} title={t('journal_title')} actionHref="/journal" actionLabel={t('journal_view_all')} />
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map(({ tag, title, read, href, img }, i) => (
          <a key={title} href={href}
            className="group rounded-[24px] border border-[#e2e6de] bg-white p-0 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,.08)] overflow-hidden">
            <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <img src={img} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-4 top-4 rounded-full bg-[#0F172A] px-3 py-1 text-[9px] font-black uppercase tracking-[.12em] text-white">{tag}</span>
            </div>
            <div className="p-5">
              <h3 className="text-[15px] font-black leading-snug tracking-tight text-[#0f172a] transition group-hover:text-[#789a1d]">{title}</h3>
              <p className="mt-3 text-xs text-[#94a3b8]">{read}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
