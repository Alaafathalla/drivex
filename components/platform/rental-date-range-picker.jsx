'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react'

function iso(date) {
  const d = new Date(date)
  d.setHours(12, 0, 0, 0)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function monthGrid(monthDate) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const first = new Date(year, month, 1)
  const startOffset = first.getDay()
  const days = new Date(year, month + 1, 0).getDate()
  const previousDays = new Date(year, month, 0).getDate()
  return Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - startOffset + 1
    if (dayNumber < 1) return { date: new Date(year, month - 1, previousDays + dayNumber), current: false }
    if (dayNumber > days) return { date: new Date(year, month + 1, dayNumber - days), current: false }
    return { date: new Date(year, month, dayNumber), current: true }
  })
}

function pretty(value) {
  if (!value) return 'Select date'
  return new Intl.DateTimeFormat('en-AE', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`))
}

export function RentalDateRangePicker({ start, end, onChange, minDate }) {
  const initial = new Date(`${start || minDate || iso(new Date())}T12:00:00`)
  const [open, setOpen] = useState(false)
  const [monthDate, setMonthDate] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1))
  const [phase, setPhase] = useState('start')
  const cells = useMemo(() => monthGrid(monthDate), [monthDate])
  const min = minDate ? new Date(`${minDate}T00:00:00`) : new Date(new Date().setHours(0, 0, 0, 0))
  const startDate = start ? new Date(`${start}T12:00:00`) : null
  const endDate = end ? new Date(`${end}T12:00:00`) : null

  const choose = (date) => {
    const value = iso(date)
    if (phase === 'start' || !start || date <= startDate) {
      onChange?.({ start: value, end: '' })
      setPhase('end')
      return
    }
    onChange?.({ start, end: value })
    setPhase('start')
    setOpen(false)
  }

  const move = (delta) => setMonthDate((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1))

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((value) => !value)} className="flex h-full min-h-[58px] w-full items-center gap-3 rounded-[15px] bg-white/[.08] px-4 py-3 text-left text-white transition hover:bg-white/[.11]">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/8 text-[#B5E92E]"><CalendarDays size={16} /></span>
        <span className="min-w-0 flex-1"><span className="block text-[9px] font-black uppercase tracking-[.15em] text-white/45">Rental dates</span><span className="mt-1 block truncate text-sm font-bold">{pretty(start)} <span className="px-1 text-white/30">→</span> {pretty(end)}</span></span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6 }} className="absolute left-0 top-[calc(100%+10px)] z-40 w-[min(380px,calc(100vw-40px))] rounded-[24px] border border-slate-200 bg-white p-4 text-[#0f172a] shadow-[0_30px_80px_rgba(15,23,42,.24)]">
            <div className="flex items-center justify-between"><div><p className="text-[9px] font-black uppercase tracking-[.16em] text-[#7d9f24]">Choose {phase === 'start' ? 'pickup' : 'return'}</p><p className="mt-1 text-sm font-black">{monthDate.toLocaleDateString('en-AE', { month: 'long', year: 'numeric' })}</p></div><button type="button" onClick={() => setOpen(false)} className="grid size-8 place-items-center rounded-full bg-slate-100"><X size={14} /></button></div>
            <div className="mt-4 flex items-center justify-between"><button type="button" onClick={() => move(-1)} className="grid size-8 place-items-center rounded-full border border-slate-200"><ChevronLeft size={14} /></button><p className="text-[10px] font-bold text-slate-400">Select pickup, then return date</p><button type="button" onClick={() => move(1)} className="grid size-8 place-items-center rounded-full border border-slate-200"><ChevronRight size={14} /></button></div>
            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[9px] font-black uppercase text-slate-400">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((day) => <span key={day} className="py-2">{day}</span>)}</div>
            <div className="grid grid-cols-7 gap-1">
              {cells.map(({ date, current }) => {
                const value = iso(date)
                const disabled = date < min
                const selectedStart = value === start
                const selectedEnd = value === end
                const inRange = startDate && endDate && date > startDate && date < endDate
                return <button key={value} type="button" disabled={disabled} onClick={() => choose(date)} className={`relative grid aspect-square place-items-center rounded-xl text-xs font-bold transition ${disabled ? 'cursor-not-allowed text-slate-200' : selectedStart || selectedEnd ? 'bg-[#0e1418] text-white' : inRange ? 'bg-[#edf7d3] text-[#536a14]' : current ? 'text-slate-700 hover:bg-[#B5E92E]/20' : 'text-slate-300 hover:bg-slate-50'}`}>{date.getDate()}{selectedStart && <span className="absolute bottom-1 size-1 rounded-full bg-[#B5E92E]" />}</button>
              })}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-3 text-xs"><div><p className="text-[9px] font-black uppercase text-slate-400">Pickup</p><p className="mt-1 font-black">{pretty(start)}</p></div><div><p className="text-[9px] font-black uppercase text-slate-400">Return</p><p className="mt-1 font-black">{pretty(end)}</p></div></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
