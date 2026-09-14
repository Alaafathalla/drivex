'use client'

import { CalendarClock, Gauge, Plus, ShieldCheck, Wrench } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { useLang } from '@/context/LangContext'

export default function GaragePage() {
  const { t, isRTL } = useLang()

  const stats = [
    [Gauge,        '18,200 km', t('garage_mileage_label')],
    [CalendarClock, '42 ' + (isRTL ? 'يوم' : 'days'), t('garage_next_svc_label')],
    [Wrench,       t('garage_health_good'), t('garage_health_label')],
  ]

  return (
    <main dir={isRTL ? 'rtl' : 'ltr'}>
      <PageHero
        eyebrow={t('garage_page_eyebrow')}
        title={t('garage_page_title')}
        description={t('garage_page_desc')}
      />
      <section className="page-inner py-16 sm:py-20 lg:py-24">
        <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
          {/* Primary vehicle card */}
          <div className="border border-border bg-[#0b1017] p-7 text-white rounded-[12px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[.16em] text-white/35">{t('garage_primary_label')}</p>
                <h2 className="mt-2 text-3xl font-black">{t('garage_vehicle_name')}</h2>
                <p className="mt-2 text-sm text-white/45">{t('garage_vehicle_meta')}</p>
              </div>
              <ShieldCheck className="text-accent" />
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {stats.map(([Icon, val, label]) => (
                <div key={label} className="border border-white/10 p-5">
                  <Icon className="text-accent" size={18} />
                  <p className="mt-7 text-xl font-black">{val}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[.13em] text-white/35">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Add vehicle button */}
          <button className="grid min-h-[260px] place-items-center border border-dashed border-border bg-card text-center rounded-[12px] hover:border-accent/50 transition">
            <span>
              <Plus className="mx-auto text-accent" />
              <b className="mt-3 block">{t('garage_add_btn')}</b>
              <span className="mt-1 block text-xs text-muted-foreground">{t('garage_add_sub')}</span>
            </span>
          </button>
        </div>
      </section>
    </main>
  )
}
