'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/context/LangContext'

export function LanguageToggle({ className = '' }) {
  const { lang, toggle } = useLang()
  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      className={`relative flex h-8 w-[60px] items-center overflow-hidden rounded-full border border-gray-200 bg-gray-100 text-[11px] font-black transition hover:border-green-300 ${className}`}
    >
      <motion.span
        animate={{ x: lang === 'en' ? 2 : 32 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="absolute h-[26px] w-[26px] rounded-full bg-green-600"
      />
      <span className={`relative z-10 w-[30px] text-center transition-colors ${lang === 'en' ? 'text-white' : 'text-gray-500'}`}>EN</span>
      <span className={`relative z-10 w-[30px] text-center transition-colors ${lang === 'ar' ? 'text-white' : 'text-gray-500'}`}>AR</span>
    </motion.button>
  )
}
