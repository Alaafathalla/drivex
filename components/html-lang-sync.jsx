'use client'

import { useEffect } from 'react'
import { useLang } from '@/context/LangContext'

/**
 * Syncs <html lang> and <html dir> on the client after hydration,
 * and switches the body font class between Latin and Arabic.
 */
export function HtmlLangSync() {
  const { lang, isRTL } = useLang()

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir  = isRTL ? 'rtl' : 'ltr'

    // swap font class on <body>
    if (isRTL) {
      document.body.classList.add('font-arabic')
      document.body.classList.remove('font-latin')
    } else {
      document.body.classList.add('font-latin')
      document.body.classList.remove('font-arabic')
    }
  }, [lang, isRTL])

  return null
}
