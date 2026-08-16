'use client'

import { motion } from 'framer-motion'

export function CarDrivingAnimation({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white px-5 py-8 shadow-[0_22px_50px_rgba(15,23,42,.06)] ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(181,233,46,.18),transparent_30%),radial-gradient(circle_at_90%_0%,rgba(59,130,246,.08),transparent_28%)]" />
      <div className="relative">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#7F9F1B]">Scroll to drive</p>
            <h3 className="mt-2 text-2xl font-black tracking-[-.04em] text-[#0F172A]">Your automotive journey, now in motion.</h3>
          </div>
          <p className="hidden max-w-sm text-right text-xs leading-6 text-slate-500 sm:block">Browse → compare → reserve → own → maintain.</p>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-[#E8EBEF] bg-[linear-gradient(180deg,#f8fbff_0%,#eef2f7_100%)] px-4 py-8 sm:px-8">
          <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent_0%,rgba(148,163,184,.06)_100%)]" />
          <div className="absolute inset-x-0 bottom-8 h-[88px] rounded-[20px] bg-[#121C27]" />
          <motion.div
            animate={{ backgroundPositionX: ['0px', '-240px'] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
            className="absolute inset-x-10 bottom-[50px] h-1.5 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.72)_0_48px,transparent_48px_96px)]"
            style={{ backgroundSize: '240px 100%' }}
          />

          <motion.div
            animate={{ x: ['-5%', '76%', '76%', '-5%'], y: [0, -4, 0, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', times: [0, 0.45, 0.55, 1] }}
            className="relative z-10 mt-6 w-fit"
          >
            <motion.div
              animate={{ opacity: [0.14, 0.34, 0.14], scaleX: [0.8, 1.05, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-10 bottom-4 h-3 w-12 rounded-full bg-[#B5E92E]/30 blur-md"
            />
            <div className="relative h-[66px] w-[134px]">
              <div className="absolute bottom-[14px] left-[13px] h-[34px] w-[108px] rounded-[18px_24px_14px_14px] bg-[#B5E92E] shadow-[0_12px_26px_rgba(181,233,46,.30)]" />
              <div className="absolute left-[35px] top-[7px] h-[25px] w-[56px] rounded-[16px_16px_6px_6px] bg-[#DDF59B]" />
              <div className="absolute left-[40px] top-[11px] h-[12px] w-[22px] rounded-[10px_6px_3px_4px] bg-[#1E293B]/85" />
              <div className="absolute left-[66px] top-[11px] h-[12px] w-[20px] rounded-[6px_10px_4px_3px] bg-[#1E293B]/85" />
              <div className="absolute bottom-[4px] left-[24px] h-[30px] w-[30px] rounded-full border-[7px] border-[#1F2937] bg-white" />
              <div className="absolute bottom-[4px] right-[22px] h-[30px] w-[30px] rounded-full border-[7px] border-[#1F2937] bg-white" />
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }} className="absolute bottom-[10px] left-[30px] h-[18px] w-[18px] rounded-full border border-[#CBD5E1] bg-[#1F2937]" />
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }} className="absolute bottom-[10px] right-[28px] h-[18px] w-[18px] rounded-full border border-[#CBD5E1] bg-[#1F2937]" />
              <div className="absolute left-[8px] top-[28px] h-[7px] w-[9px] rounded-r-full bg-white/85" />
              <div className="absolute right-[9px] top-[29px] h-[6px] w-[8px] rounded-l-full bg-[#FCA5A5]" />
            </div>
          </motion.div>

          <div className="relative z-10 mt-24 grid gap-3 sm:grid-cols-3">
            {[
              ['10K+', 'cars listed'],
              ['50+', 'dealer partners'],
              ['24/7', 'support available'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 backdrop-blur">
                <p className="text-lg font-black text-[#0F172A]">{value}</p>
                <p className="text-xs uppercase tracking-[.18em] text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
