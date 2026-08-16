'use client'

import {
  ArrowRight,
  BadgeCheck,
  Mail,
  MapPin,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import { useLang } from '@/context/LangContext'

const COLUMNS = [
  { title: 'Marketplace', links: [['Buy cars', '/cars'], ['Rent a car', '/rentals'], ['Compare', '/compare'], ['Sell your car', '/list-your-car'], ['Dealers', '/dealers']] },
  { title: 'Ownership', links: [['Services', '/services'], ['Inspection', '/services/inspection'], ['Maintenance', '/services/maintenance'], ['Valuation', '/valuation'], ['Roadside', '/services/roadside']] },
  { title: 'Company', links: [['About DriveX', '/about'], ['Contact', '/contact'], ['Dashboard', '/dashboard'], ['My bookings', '/my-bookings'], ['Saved cars', '/favorites']] },
  { title: 'Resources', links: [['Finance calculator', '/calculator'], ['Browse categories', '/categories'], ['Rent by location', '/rent-by-location'], ['Car care', '/services/wash'], ['Partner with us', '/contact']] },
]

export function SiteFooter() {
  const { isRTL } = useLang()
  return (
    <footer className="relative overflow-hidden border-t border-[#E5E7EB] bg-[#FCFCFA] text-slate-900">
      <div className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-[#B5E92E]/10 blur-3xl" />
      <div className="page-inner relative py-14 sm:py-18">
        <div className="grid gap-8 rounded-[32px] border border-[#E5E7EB] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,.06)] sm:p-8 lg:grid-cols-[1fr_.75fr] lg:p-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#7F9F1B]">DriveX intelligence</p>
            <h2 className="mt-4 max-w-xl text-3xl font-black tracking-[-.045em] sm:text-4xl">The smarter automotive decision starts in your inbox.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">Weekly market insights, featured arrivals, ownership guides and curated deals. No noise.</p>
          </div>
          <form onSubmit={(event) => event.preventDefault()} className="flex flex-col justify-end gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <label className="flex h-12 flex-1 items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-4"><Mail size={15} className="text-slate-400" /><input type="email" required placeholder="Email address" className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" /></label>
            <button className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F172A] px-6 text-xs font-black text-white">Join newsletter <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} /></button>
          </form>
        </div>

        <div className="grid gap-10 py-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <a href="/" className="text-2xl font-black italic tracking-[-.055em]">Drive<span className="text-[#8FB91F]">X</span></a>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500">One connected automotive platform for buying, renting, selling, servicing and financing vehicles with verified partners.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="flex items-center gap-2 rounded-full border border-[#E5E7EB] px-3 py-2 text-[10px] font-bold text-slate-600"><ShieldCheck size={13} className="text-[#8FB91F]" />Verified marketplace</span>
              <span className="flex items-center gap-2 rounded-full border border-[#E5E7EB] px-3 py-2 text-[10px] font-bold text-slate-600"><BadgeCheck size={13} className="text-[#8FB91F]" />Trusted partners</span>
            </div>
            <div className="mt-7 flex gap-2">{[['IG', 'Instagram'], ['YT', 'YouTube'], ['in', 'LinkedIn']].map(([label, name]) => <a key={name} href="#" aria-label={name} className="grid size-10 place-items-center rounded-full border border-[#E5E7EB] text-[10px] font-black text-slate-500 transition hover:border-[#B5E92E] hover:text-[#7F9F1B]">{label}</a>)}</div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((column) => <div key={column.title}><p className="text-[11px] font-black uppercase tracking-[.16em] text-slate-900">{column.title}</p><div className="mt-4 space-y-3">{column.links.map(([label, href]) => <a key={href + label} href={href} className="block text-sm text-slate-500 transition hover:text-[#7F9F1B]">{label}</a>)}</div></div>)}
          </div>
        </div>

        <div className="grid gap-5 border-t border-[#E5E7EB] py-7 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-slate-400"><span>© {new Date().getFullYear()} DriveX Mobility Technologies.</span><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/cookies">Cookies</a><a href="/accessibility">Accessibility</a></div>
          <div className="flex flex-wrap items-center gap-2"><span className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] px-3 py-2 text-[10px] font-bold text-slate-500"><Smartphone size={14} />Mobile apps · iOS / Android</span><span className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] px-3 py-2 text-[10px] font-bold text-slate-500"><MapPin size={14} />UAE · KSA</span></div>
        </div>
        <p className="border-t border-[#EEF1F5] pt-5 text-[10px] leading-5 text-slate-400">Vehicle availability, pricing and finance estimates are indicative until confirmed by the relevant dealer, lender, rental partner or service provider. DriveX does not provide regulated financial advice.</p>
      </div>
    </footer>
  )
}
