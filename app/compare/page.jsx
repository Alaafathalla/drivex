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
    <main className="min-h-screen bg-background">
{/* Hero */}
      <section className="relative overflow-hidden bg-[#070908] text-white">
        <div className="relative mx-auto max-w-[1450px] px-5 py-14 sm:px-8 lg:px-10">
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
            className="text-[10px] font-black uppercase tracking-[.2em] text-accent">{t('compare_eyebrow')}</motion.p>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }}
            className="mt-3 text-[clamp(30px,4.5vw,58px)] font-black leading-[.92] tracking-[-.05em]">{t('compare_title')}</motion.h1>
          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
            className="mt-4 max-w-xl text-[15px] leading-7 text-white/55">{t('compare_desc')}</motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-[1450px] overflow-x-auto px-5 py-14 sm:px-8 lg:px-10">
        {/* Header row with car images + remove */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
          className="grid min-w-[640px] gap-px bg-border"
          style={{ gridTemplateColumns: `200px repeat(${selected.length + (selected.length < 4 ? 1 : 0)}, 1fr)` }}>

          <div className="bg-background p-5">
            <p className="text-xs font-black uppercase tracking-[.14em] text-muted-foreground">{t('compare_spec')}</p>
          </div>

          {selected.map((car) => (
            <div key={car.id} className="relative bg-background p-4">
              <button onClick={() => remove(car.id)}
                className="absolute end-3 top-3 cursor-pointer grid h-7 w-7 place-items-center rounded-full bg-border text-muted-foreground transition hover:bg-red-500/20 hover:text-red-400">
                <X size={13} />
              </button>
              <div className="aspect-[1.6] overflow-hidden rounded-[5px] bg-[#111]">
                <img src={car.image} alt={car.name} className="h-full w-full object-cover" />
              </div>
              <p className="mt-3 font-black text-sm leading-tight">{car.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{car.year}</p>
              <p className="mt-2 font-black text-accent">${car.price?.toLocaleString()}</p>
            </div>
          ))}

          {selected.length < 4 && (
            <div className="bg-background p-4">
              <button onClick={() => setPicker(true)}
                className="flex h-full min-h-[120px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[5px] border-2 border-dashed border-border text-muted-foreground transition hover:border-accent hover:text-accent">
                <Plus size={22} />
                <span className="text-xs font-bold">{t('compare_add')}</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Spec rows */}
        <div className="min-w-[640px]"
          style={{ display:'grid', gridTemplateColumns: `200px repeat(${selected.length + (selected.length < 4 ? 1 : 0)}, 1fr)` }}>
          {specRows.flatMap(([label, fn]) => [
            <div key={`l-${label}`} className="border-t border-border bg-background px-5 py-4">
              <p className="text-xs font-bold text-muted-foreground">{label}</p>
            </div>,
            ...selected.map(car => (
              <motion.div key={`${car.id}-${label}`}
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.3 }}
                className="border-t border-s border-border bg-background px-5 py-4 text-sm font-semibold">
                {fn(car)}
              </motion.div>
            )),
            ...(selected.length < 4 ? [<div key={`empty-${label}`} className="border-t border-s border-border bg-background/50" />] : []),
          ])}
        </div>
      </section>

      {/* Car picker modal */}
      <AnimatePresence>
        {picker && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-5"
            onClick={() => setPicker(false)}>
            <motion.div initial={{ scale:0.95, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.95, opacity:0 }}
              transition={{ duration:0.25 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-[8px] border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border p-5">
                <h3 className="font-black">{t('compare_add')}</h3>
                <button onClick={() => setPicker(false)} className="cursor-pointer text-muted-foreground hover:text-foreground"><X size={18} /></button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto p-4 grid gap-3">
                {allCars.filter(c => !selected.find(s => s.id === c.id)).map(car => (
                  <button key={car.id} onClick={() => add(car)}
                    className="flex cursor-pointer items-center gap-4 rounded-[5px] border border-border p-3 text-start transition hover:border-accent">
                    <img src={car.image} alt={car.name} className="h-14 w-20 shrink-0 rounded-[3px] object-cover" />
                    <div>
                      <p className="font-black text-sm">{car.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{car.year} · ${car.price?.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence></main>
  )
}
