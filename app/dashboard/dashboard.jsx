'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BellRing, CalendarDays, CarFront, Heart, Loader2, Settings2, Sparkles, WalletCards } from 'lucide-react'
import { clientApi } from '@/lib/client-api'
import { useCurrency } from '@/context/CurrencyContext'
import { useLang } from '@/context/LangContext'
import { CarCard } from '@/features/cars/components/CarCard'
import { FaqSection, NewsSection, TrustBand } from '@/components/platform/rich-sections'

export default function DashboardPage() {
  const { format } = useCurrency()
  const { t, isRTL } = useLang()
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    clientApi.get('/api/dashboard').then(setData).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="grid min-h-[70vh] place-items-center bg-[#F5F6F3]">
      <Loader2 className="animate-spin text-[#7d9f24]" size={32} />
    </div>
  )

  if (!data) return (
    <div className="grid min-h-[60vh] place-items-center">
      <p className="text-[#64748b]">{t('dash_unavailable')}</p>
    </div>
  )

  const stats = [
    [t('dash_saved_cars'),      data.stats.savedCars,      Heart],
    [t('dash_active_bookings'), data.stats.activeBookings, CalendarDays],
    [t('dash_active_listings'), data.stats.activeListings, CarFront],
    [t('dash_total_spent'),     format(data.stats.totalSpent), WalletCards],
  ]

  return (
    <main className="bg-[#F5F6F3] pb-16">

      {/* ── Hero banner ── */}
      <section className="bg-[#071016] text-white">
        <div className="page-inner py-14 sm:py-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#B5E92E]">{t('dash_eyebrow')}</p>
              <h1 className="mt-3 text-4xl font-black tracking-[-.05em] sm:text-5xl">
                {t('dash_welcome')} {data.profile?.name?.split(' ')[0] || '—'}.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">{t('dash_desc')}</p>
            </div>
            <div className="flex gap-2">
              <a href="/profile"
                className="flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-xs font-black text-white transition hover:bg-white/8">
                <Settings2 size={14} />{t('dash_profile')}
              </a>
              <a href="/cars"
                className="flex h-11 items-center gap-2 rounded-full bg-[#B5E92E] px-5 text-xs font-black text-[#071016] transition hover:brightness-105">
                {t('dash_browse')} <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat cards ── */}
      <section className="page-inner relative z-10 -mt-5">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(([label, value, Icon], i) => (
            <motion.div key={label} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.05 }}
              className="rounded-[22px] border border-[#dfe5db] bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,.06)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#64748b]">{label}</span>
                <span className="grid size-9 place-items-center rounded-xl bg-[#B5E92E]/18 text-[#6c891a]"><Icon size={16} /></span>
              </div>
              <p className="mt-5 text-3xl font-black tracking-[-.04em] text-[#0f172a]">{value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Bookings + Alerts ── */}
      <section className="page-inner py-12">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">

          {/* Bookings */}
          <div className="rounded-[26px] border border-[#dfe5db] bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#7d9f24]">{t('dash_next_actions')}</p>
                <h2 className="mt-2 text-2xl font-black tracking-[-.04em] text-[#0f172a]">{t('dash_upcoming')}</h2>
              </div>
              <a href="/my-bookings" className="text-xs font-black text-[#7d9f24]">{t('dash_view_all')}</a>
            </div>
            <div className="mt-5 space-y-3">
              {data.bookings?.length
                ? data.bookings.map(booking => (
                    <div key={booking.id} className="flex items-center gap-4 rounded-2xl bg-[#f7f9f5] p-4">
                      <span className="grid size-10 place-items-center rounded-xl bg-white text-[#7d9f24]">
                        <CalendarDays size={17} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black text-[#0f172a]">
                          {t('booking_payment').split(' ')[0]} {booking.id}
                        </p>
                        <p className="mt-1 text-xs text-[#64748b]">
                          {booking.pickupDate || booking.startDate || t('myrentals_upcoming')} · {booking.pickupLocation || 'DriveX'}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#B5E92E]/20 px-3 py-1 text-[10px] font-black text-[#657f1b]">
                        {booking.status}
                      </span>
                    </div>
                  ))
                : <p className="py-8 text-center text-sm text-[#94a3b8]">{t('dash_no_bookings')}</p>
              }
            </div>
          </div>

          {/* Alerts */}
          <div className="rounded-[26px] bg-[#0b141b] p-6 text-white">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-[#B5E92E] text-[#071016]">
                <Sparkles size={17} />
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#B5E92E]">{t('dash_drivex_intel')}</p>
                <h2 className="text-xl font-black">{t('dash_alerts')}</h2>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {data.alerts?.map(alert => (
                <div key={alert.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2">
                    <BellRing size={14} className="text-[#B5E92E]" />
                    <p className="text-sm font-black">{alert.title || alert.message}</p>
                  </div>
                  {alert.text && <p className="mt-2 text-xs leading-6 text-white/50">{alert.text}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Saved cars ── */}
      {data.saved?.length > 0 && (
        <section className="page-inner py-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#7d9f24]">{t('dash_saved_section')}</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-.04em] text-[#0f172a]">{t('dash_watching')}</h2>
            </div>
            <a href="/favorites" className="text-xs font-black text-[#7d9f24]">{t('dash_open_wishlist')}</a>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {data.saved.slice(0, 4).map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
          </div>
        </section>
      )}

      {/* ── Listings ── */}
      <section className="page-inner py-14">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#7d9f24]">{t('dash_listing_perf')}</p>
            <h2 className="mt-2 text-2xl font-black tracking-[-.04em] text-[#0f172a]">{t('dash_your_vehicles')}</h2>
          </div>
          <a href="/my-listings" className="text-xs font-black text-[#7d9f24]">{t('dash_manage_listings')}</a>
        </div>
        <div className="overflow-hidden rounded-[24px] border border-[#dfe5db] bg-white">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-[#edf0ea] bg-[#fafbf9] px-5 py-3 text-[10px] font-black uppercase tracking-[.12em] text-[#64748b]">
            <span>{t('dash_vehicle_col')}</span>
            <span>{t('dash_status_col')}</span>
            <span>{t('dash_views_col')}</span>
          </div>
          {data.listings?.length
            ? data.listings.map(listing => (
                <div key={listing.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-[#edf0ea] px-5 py-4 last:border-0">
                  <div>
                    <p className="text-sm font-black text-[#0f172a]">{listing.brand} {listing.model}</p>
                    <p className="mt-1 text-xs text-[#94a3b8]">{listing.year} · {listing.city}</p>
                  </div>
                  <span className="rounded-full bg-[#eef4df] px-3 py-1 text-[10px] font-black text-[#657f1b]">
                    {listing.status}
                  </span>
                  <span className="min-w-12 text-right text-sm font-black text-[#0f172a]">{listing.views || 0}</span>
                </div>
              ))
            : <p className="p-8 text-center text-sm text-[#94a3b8]">{t('dash_no_listings')}</p>
          }
        </div>
      </section>

      <TrustBand />
      <FaqSection items={[
        [t('faq_q1'), t('faq_a1')],
        [t('faq_q2'), t('faq_a2')],
        [t('faq_q3'), t('faq_a3')],
        [t('faq_q4'), t('faq_a4')],
      ]} />
      <NewsSection />
    </main>
  )
}
