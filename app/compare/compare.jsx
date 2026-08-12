'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { api, CARS } from '@/lib/api'

export default function ComparePage() {
  const { t } = useLang()
  const [selected, setSelected] = useState([CARS[0], CARS[1]])
  const [picker, setPicker] = useState(false)
  const [allCars, setAllCars] = useState([])

  useEffect(() => {
    api.getCars().then(setAllCars)
  }, [])

  const remove = (id) => setSelected(s => s.filter(c => c.id !== id))
  const add = (car) => {
    if (selected.length < 4 && !selected.find(c => c.id === car.id)) {
      setSelected(s => [...s, car])
    }
    setPicker(false)
  }

  const specRows = [
    [t('compare_price'),   c => `$${c.price?.toLocaleString()}`],
    [t('compare_year'),    c => c.year],
    [t('compare_engine'),  c => c.engine],
    [t('compare_power'),   c => c.power],
    [t('compare_mileage'), c => `${c.mileage?.toLocaleString()} km`],
    [t('compare_drive'),   c => c.drive],
    [t('detail_fuel'),     c => c.fuel],
    [t('detail_trans'),    c => c.transmission],
    [t('detail_color'),    c => c.color],
    [t('detail_seats'),    c => c.seats],
  ]

  return (
    <main className="min-h-screen w-full bg-[#f5f7f8] text-gray-900">
      <section className="relative w-full overflow-hidden bg-[#07111d] text-white">
        <div className="page-inner py-16 sm:py-20 lg:py-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[10px] font-black uppercase tracking-[0.24em] text-green-400"
          >
            {t('compare_eyebrow')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-3 text-[clamp(30px,4.5vw,58px)] font-black leading-[0.92] tracking-[-0.05em]"
          >
            {t('compare_title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-4 max-w-2xl text-[15px] leading-7 text-white/70"
          >
            {t('compare_desc')}
          </motion.p>
        </div>
      </section>

      <section className="page-inner py-8 sm:py-10 lg:py-12">
        <div className="overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div className="overflow-x-auto">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="grid min-w-[780px] gap-0"
              style={{ gridTemplateColumns: `220px repeat(${selected.length + (selected.length < 4 ? 1 : 0)}, minmax(220px, 1fr))` }}
            >
              <div className="border-b border-gray-200 bg-gray-50 p-5">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
                  {t('compare_spec')}
                </p>
              </div>

              {selected.map((car) => (
                <div key={car.id} className="relative border-b border-l border-gray-200 bg-white p-4">
                  <button
                    onClick={() => remove(car.id)}
                    className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-500"
                    aria-label={`Remove ${car.name}`}
                  >
                    <X size={14} />
                  </button>

                  <div className="overflow-hidden rounded-[16px] bg-gray-100">
                    <img src={car.image} alt={car.name} className="aspect-[16/10] w-full object-cover" />
                  </div>

                  <div className="mt-4">
                    <p className="text-[15px] font-black leading-tight text-gray-900">{car.name}</p>
                    <p className="mt-1 text-[13px] text-gray-500">{car.year}</p>
                    <p className="mt-3 text-[18px] font-black text-green-600">${car.price?.toLocaleString()}</p>
                  </div>
                </div>
              ))}

              {selected.length < 4 && (
                <div className="border-b border-l border-gray-200 bg-white p-4">
                  <button
                    onClick={() => setPicker(true)}
                    className="flex h-full min-h-[220px] w-full flex-col items-center justify-center gap-2 rounded-[18px] border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 transition hover:border-green-400 hover:bg-green-50 hover:text-green-700"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-full border border-gray-300 bg-white">
                      <Plus size={20} />
                    </div>
                    <span className="text-[13px] font-bold">{t('compare_add')}</span>
                  </button>
                </div>
              )}
            </motion.div>

            <div
              className="grid min-w-[780px]"
              style={{ gridTemplateColumns: `220px repeat(${selected.length + (selected.length < 4 ? 1 : 0)}, minmax(220px, 1fr))` }}
            >
              {specRows.flatMap(([label, fn]) => [
                <div key={`l-${label}`} className="border-b border-gray-200 bg-gray-50 px-4 py-4">
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-gray-500">{label}</p>
                </div>,
                ...selected.map((car) => (
                  <motion.div
                    key={`${car.id}-${label}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-l border-gray-200 bg-white px-4 py-4 text-[13px] font-semibold text-gray-700"
                  >
                    {fn(car)}
                  </motion.div>
                )),
                ...(selected.length < 4 ? [<div key={`empty-${label}`} className="border-b border-l border-gray-200 bg-gray-50/60" />] : []),
              ])}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {picker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
            onClick={() => setPicker(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-200 p-5">
                <h3 className="text-[16px] font-black text-gray-900">{t('compare_add')}</h3>
                <button onClick={() => setPicker(false)} className="text-gray-400 transition hover:text-gray-700">
                  <X size={18} />
                </button>
              </div>
              <div className="grid max-h-[60vh] gap-3 overflow-y-auto p-4">
                {allCars.filter((c) => !selected.find((s) => s.id === c.id)).map((car) => (
                  <button
                    key={car.id}
                    onClick={() => add(car)}
                    className="flex items-center gap-4 rounded-[14px] border border-gray-200 p-3 text-left transition hover:border-green-400 hover:bg-green-50"
                  >
                    <img src={car.image} alt={car.name} className="h-16 w-24 shrink-0 rounded-[10px] object-cover" />
                    <div>
                      <p className="text-[14px] font-black text-gray-900">{car.name}</p>
                      <p className="mt-1 text-[12px] text-gray-500">{car.year} · ${car.price?.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
