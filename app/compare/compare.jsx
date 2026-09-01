'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, GitCompare, Plus, Search, Trash2, X } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { carService } from '@/services/carService'
import { useCurrency } from '@/context/CurrencyContext'
import { useLang } from '@/context/LangContext'
import { FaqSection, TrustBand } from '@/components/platform/rich-sections'

function VehiclePicker({ open, onClose, onPick, selectedIds }) {
  const [q, setQ] = useState('')
  const [data, setData] = useState([])
  const { t } = useLang()
  useEffect(() => {
    let a = true
    carService.getCars({ q, limit: 30, sort: 'newest' }).then(res => a && setData(res.items)).catch(() => a && setData([]))
    return () => { a = false }
  }, [q])
  if (!open) return null
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="fixed inset-0 z-[80] bg-[#071016]/60 p-4 backdrop-blur-lg"
      onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ y:20, opacity:0, scale:.98 }} animate={{ y:0, opacity:1, scale:1 }}
        className="mx-auto mt-[6vh] max-h-[82vh] max-w-4xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5">
          <Search size={18} className="text-[#7d9f24]" />
          <input autoFocus value={q} onChange={e => setQ(e.target.value)}
            placeholder={t('compare_search_ph')} className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none" dir="auto" />
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <div className="grid max-h-[66vh] gap-2 overflow-y-auto p-4 sm:grid-cols-2">
          {data.map(car => {
            const disabled = selectedIds.includes(car.id)
            return (
              <button key={car.id} disabled={disabled} onClick={() => { onPick(car); onClose() }}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3 text-left transition hover:border-[#B5E92E] hover:bg-[#f8faf5] disabled:opacity-45">
                <img src={car.images?.[0]} alt="" className="h-16 w-24 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-slate-950">{car.brand} {car.model}</p>
                  <p className="mt-1 text-xs text-slate-400">{car.year} · {car.bodyType} · {car.city}</p>
                </div>
                {disabled && <Check size={16} className="text-[#7d9f24]" />}
              </button>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ComparePage() {
  const { format } = useCurrency()
  const { t, isRTL } = useLang()
  const [selected, setSelected] = useState([])
  const [picker,   setPicker]   = useState(false)

  const SPECS = [
    [t('compare_spec_price'),  car => car.price, 'money'],
    [t('compare_spec_year'),   car => car.year],
    [t('compare_spec_body'),   car => car.bodyType],
    [t('compare_spec_engine'), car => car.engine],
    [t('compare_spec_fuel'),   car => car.fuelType],
    [t('compare_spec_trans'),  car => car.transmission],
    [t('compare_spec_mileage'),car => car.mileage ? `${Number(car.mileage).toLocaleString()} ${t('km_unit')}` : '—'],
    [t('compare_spec_seats'),  car => car.seats],
    [t('compare_spec_doors'),  car => car.doors],
    [t('compare_spec_location'),car => car.city],
    [t('compare_spec_rating'), car => car.rating ? `${car.rating}/5` : '—'],
    [t('compare_spec_avail'),  car => car.available === false ? t('compare_unavailable') : t('compare_available')],
  ]

  useEffect(() => {
    carService.getCars({ limit: 20, sort: 'rating' }).then(res => setSelected(res.items.slice(0, 2))).catch(() => {})
  }, [])

  const selectedIds = useMemo(() => selected.map(c => c.id), [selected])
  const add    = (car) => setSelected(list => list.length < 4 ? [...list, car] : list)
  const remove = (id)  => setSelected(list => list.filter(car => car.id !== id))

  return (
    <main className="bg-[#F5F6F3]">
      <PageHero
        eyebrow={t('compare_eyebrow')}
        title={t('compare_title')}
        description={t('compare_desc')}
        image="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2200&q=86"
      />
      <section className="page-inner py-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#7d9f24]">{t('compare_workspace')}</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-.04em] text-[#0f172a]">{selected.length}/4 {t('compare_selected')}</h2>
          </div>
          <button disabled={selected.length >= 4} onClick={() => setPicker(true)}
            className="flex h-11 items-center gap-2 rounded-full bg-[#0e1418] px-5 text-xs font-black text-white disabled:opacity-40">
            <Plus size={15} />{t('compare_add_vehicle')}
          </button>
        </div>

        <div className="overflow-x-auto rounded-[28px] border border-[#dfe5db] bg-white shadow-[0_18px_50px_rgba(15,23,42,.06)]">
          <div className="min-w-[760px]">
            {/* Header row */}
            <div className="sticky top-[72px] z-20 grid border-b border-[#e5e9e2] bg-white/95 backdrop-blur-xl"
              style={{ gridTemplateColumns: `180px repeat(${Math.max(selected.length, 1)}, minmax(220px,1fr))` }}>
              <div className="flex items-end p-5"><GitCompare className="text-[#7d9f24]" /></div>
              {selected.map(car => (
                <div key={car.id} className="relative border-l border-[#eef1eb] p-4">
                  <button onClick={() => remove(car.id)}
                    className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/90 text-slate-400 shadow hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                  <img src={car.images?.[0]} alt={`${car.brand} ${car.model}`} className="aspect-[1.7] w-full rounded-2xl object-cover" />
                  <p className="mt-3 text-base font-black text-[#0f172a]">{car.brand} {car.model}</p>
                  <p className="mt-1 text-xs text-[#64748b]">{car.year} · {car.city}</p>
                  <a href={`/cars/${car.id}`} className="mt-3 inline-flex text-xs font-black text-[#7d9f24]">{t('compare_view_vehicle')}</a>
                </div>
              ))}
            </div>

            {/* Spec rows */}
            {selected.length
              ? SPECS.map(([label, getValue, type], rowIndex) => (
                  <div key={label} className={`grid ${rowIndex % 2 ? 'bg-[#fafbf9]' : 'bg-white'}`}
                    style={{ gridTemplateColumns: `180px repeat(${selected.length}, minmax(220px,1fr))` }}>
                    <div className="p-4 text-xs font-black uppercase tracking-[.08em] text-[#64748b]">{label}</div>
                    {selected.map(car => {
                      const value = getValue(car)
                      return (
                        <div key={car.id} className="border-l border-[#eef1eb] p-4 text-sm font-semibold text-[#0f172a]">
                          {type === 'money' ? format(value) : String(value ?? '—')}
                        </div>
                      )
                    })}
                  </div>
                ))
              : <div className="p-12 text-center text-sm text-slate-400">{t('compare_add_prompt')}</div>
            }

            {/* CTA row */}
            {selected.length > 0 && (
              <div className="grid border-t border-[#e5e9e2] bg-[#0b141b] text-white"
                style={{ gridTemplateColumns: `180px repeat(${selected.length}, minmax(220px,1fr))` }}>
                <div className="p-5 text-xs font-black uppercase tracking-[.12em] text-[#B5E92E]">{t('compare_next_step')}</div>
                {selected.map(car => (
                  <div key={car.id} className="border-l border-white/10 p-4">
                    <a href={car.listingType === 'rent' ? `/cars/${car.id}/rent` : `/cars/${car.id}`}
                      className="flex h-10 items-center justify-center rounded-full bg-[#B5E92E] text-xs font-black text-[#071016]">
                      {car.listingType === 'rent' ? t('compare_book_rental') : t('compare_view_listing')}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <TrustBand />
      <FaqSection items={[
        [t('faq_q1'), t('faq_a1')],
        [t('faq_q2'), t('faq_a2')],
        [t('faq_q3'), t('faq_a3')],
        [t('faq_q4'), t('faq_a4')],
      ]} />

      <AnimatePresence>
        <VehiclePicker open={picker} onClose={() => setPicker(false)} onPick={add} selectedIds={selectedIds} />
      </AnimatePresence>
    </main>
  )
}
