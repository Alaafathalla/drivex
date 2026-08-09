'use client'

import { motion } from 'framer-motion'

/**
 * DriveX branded spinner.
 * size  — diameter in px (default 40)
 * label — optional text below
 */
export function DriveXSpinner({ size = 40, label = '' }) {
  const r = (size - 4) / 2
  const cx = size / 2
  const circumference = 2 * Math.PI * r

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Track */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
          <circle
            cx={cx} cy={cx} r={r}
            stroke="rgba(46,229,43,0.12)"
            strokeWidth="3"
            fill="none"
          />
        </svg>
        {/* Spinning arc */}
        <motion.svg
          width={size} height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx={cx} cy={cx} r={r}
            stroke="#2ee52b"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.72}
          />
        </motion.svg>
        {/* Center DX */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[9px] font-black italic text-[#2ee52b]" style={{ fontSize: Math.max(8, size * 0.22) }}>DX</span>
        </div>
      </div>
      {label && (
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/35">{label}</p>
      )}
    </div>
  )
}

/** Full-screen loading overlay */
export function FullPageSpinner({ label = 'Loading…' }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
      <DriveXSpinner size={52} label={label} />
    </div>
  )
}
