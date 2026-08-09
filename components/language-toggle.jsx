'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/context/LangContext'

/**
 * Language toggle button — switches between EN and AR.
 * Shows the *opposite* language label (what you'll switch TO).
 */
export function LanguageToggle({ className = '' }) {
  const { lang, toggle } = useLang()

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      className={`relative flex h-9 w-[64px] items-center overflow-hidden rounded-full border border-white/15 bg-white/[.06] text-[11px] font-black transition hover:border-[#2ee52b]/60 hover:bg-white/[.1] ${className}`}
    >
      {/* sliding pill */}
      <motion.span
        animate={{ x: lang === 'en' ? 2 : 34 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="absolute h-[28px] w-[28px] rounded-full bg-[#2ee52b]"
      />
      {/* EN label */}
      <span className={`relative z-10 w-[32px] text-center transition-colors ${lang === 'en' ? 'text-black' : 'text-white/50'}`}>
        EN
      </span>
      {/* AR label */}
      <span className={`relative z-10 w-[32px] text-center transition-colors ${lang === 'ar' ? 'text-black' : 'text-white/50'}`}>
        AR
      </span>
    </motion.button>
  )
}
