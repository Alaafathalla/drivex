'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, Headphones, Quote, ShieldCheck, Sparkles } from 'lucide-react'

export function SectionHeading({ eyebrow, title, description, actionHref, actionLabel = 'Explore' }) {
  return <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div className="max-w-2xl"><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#7d9f24]">{eyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-[-.045em] text-[#0f172a] sm:text-4xl">{title}</h2>{description && <p className="mt-3 text-sm leading-7 text-[#64748b]">{description}</p>}</div>{actionHref && <a href={actionHref} className="inline-flex items-center gap-2 text-sm font-black text-[#0f172a]">{actionLabel}<ArrowRight size={15} /></a>}</div>
}

export function TrustBand() {
  const items = [[ShieldCheck, 'Inspected vehicles', 'Condition reports from trusted inspection partners.'], [BadgeCheck, 'Verified partners', 'Dealer and service-provider quality checks.'], [Sparkles, 'Transparent pricing', 'Clear totals before you book or enquire.'], [Headphones, '24/7 support', 'Human support for urgent ownership and rental needs.']]
  return <section className="page-inner py-14"><div className="grid overflow-hidden rounded-[26px] border border-[#e2e6de] bg-white shadow-[0_18px_40px_rgba(15,23,42,.04)] md:grid-cols-2 xl:grid-cols-4">{items.map(([Icon, title, text], i) => <motion.div key={title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .05 }} className="border-b border-[#e2e6de] p-6 last:border-0 md:border-r xl:border-b-0"><Icon size={20} className="text-[#8fb91f]" /><h3 className="mt-5 text-base font-black text-[#0f172a]">{title}</h3><p className="mt-2 text-xs leading-6 text-[#64748b]">{text}</p></motion.div>)}</div></section>
}

export function TestimonialsSection() {
  const quotes = [
    ['“The filters made it easy to narrow 200+ cars down to the three that actually fit my budget.”', 'Maya H.', 'Buyer · Dubai'],
    ['“I booked an SUV, airport delivery and insurance in one flow. The pricing was completely clear.”', 'Omar R.', 'Renter · Abu Dhabi'],
    ['“DriveX gave my listing a better structure and helped me understand how to price it competitively.”', 'Daniel K.', 'Seller · Dubai'],
  ]
  return <section className="bg-[#F8FAFC] py-16 text-slate-900 sm:py-20"><div className="page-inner"><SectionHeading eyebrow="Driver stories" title="Built around real automotive decisions." description="A platform is only useful when it removes friction at the exact moment a customer needs to act." /><div className="grid gap-4 lg:grid-cols-3">{quotes.map(([quote, name, meta], i) => <motion.article key={name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }} className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_16px_32px_rgba(15,23,42,.04)]"><Quote size={20} className="text-[#8FB91F]" /><p className="mt-6 text-base font-semibold leading-7 text-slate-700">{quote}</p><div className="mt-8 border-t border-[#E5E7EB] pt-4"><p className="text-sm font-black text-slate-900">{name}</p><p className="mt-1 text-xs text-slate-400">{meta}</p></div></motion.article>)}</div></div></section>
}

export function FaqSection({ items }) {
  const list = items || [
    ['How are vehicles verified?', 'Listings can include identity, dealer, inspection and ownership checks. The exact verification badge displayed on a vehicle tells you which checks were completed.'],
    ['Can I finance a vehicle through DriveX?', 'The calculator provides an estimate and finance-ready enquiry flow. Final rates and approval come from the selected lender or dealer partner.'],
    ['Can I cancel a rental?', 'Rental cancellation terms are shown before checkout and may vary by partner, vehicle and booking window.'],
    ['Do you support vehicle services after purchase?', 'Yes. Inspection, maintenance, detailing and roadside services are part of the same platform experience.'],
  ]
  return <section className="page-inner py-16 sm:py-20"><SectionHeading eyebrow="FAQ" title="Answers before you need to ask." /><div className="mx-auto max-w-4xl divide-y divide-[#e2e6de] rounded-[26px] border border-[#e2e6de] bg-white px-6 shadow-[0_16px_40px_rgba(15,23,42,.04)]">{list.map(([q, a]) => <details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-black text-[#0f172a]"><span>{q}</span><span className="text-xl text-[#8fb91f] transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-2 pt-3 text-sm leading-7 text-[#64748b]">{a}</p></details>)}</div></section>
}

export function NewsSection() {
  const posts = [
    ['EV ownership', 'What UAE drivers should know before switching to electric', '6 min read', '/journal/uae-ev-ownership-guide'],
    ['Market guide', 'How to compare a used luxury SUV beyond the headline price', '8 min read', '/journal/compare-used-luxury-suvs'],
    ['Car care', 'Five preventive maintenance checks before a long summer drive', '5 min read', '/journal/summer-preventive-maintenance-checks'],
  ]
  return <section className="page-inner py-16"><SectionHeading eyebrow="DriveX journal" title="Practical intelligence for car people." actionHref="/journal" actionLabel="View insights" /><div className="grid gap-4 md:grid-cols-3">{posts.map(([tag, title, meta, href], i) => <a key={title} href={href} className="group rounded-[24px] border border-[#e2e6de] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,.08)]"><div className="flex aspect-[1.8] items-end overflow-hidden rounded-2xl bg-gradient-to-br from-[#dff3ab] via-[#f6fce7] to-[#f7fafc] p-4"><span className="rounded-full bg-[#0F172A] px-3 py-1 text-[9px] font-black uppercase tracking-[.12em] text-white">{tag}</span></div><h3 className="mt-5 text-lg font-black tracking-[-.03em] text-[#0f172a] transition group-hover:text-[#789a1d]">{title}</h3><p className="mt-3 text-xs text-[#94a3b8]">{meta}</p></a>)}</div></section>
}
