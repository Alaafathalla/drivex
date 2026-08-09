'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { t as translate } from '@/lib/i18n'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLangState] = useState('en')
  const [mounted, setMounted] = useState(false)

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('drivex_lang')
      if (stored === 'ar' || stored === 'en') setLangState(stored)
    } catch {}
    setMounted(true)
  }, [])

  // Sync <html> lang + dir attributes whenever lang changes
  useEffect(() => {
    if (!mounted) return
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try { localStorage.setItem('drivex_lang', lang) } catch {}
  }, [lang, mounted])

  const setLang = useCallback((l) => {
    if (l === 'en' || l === 'ar') setLangState(l)
  }, [])

  const toggle = useCallback(() => {
    setLangState((prev) => (prev === 'en' ? 'ar' : 'en'))
  }, [])

  // Shorthand translation helper bound to current lang
  const t = useCallback((key) => translate(key, lang), [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t, isRTL: lang === 'ar' }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}
