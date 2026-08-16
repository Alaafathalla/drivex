'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const CurrencyContext = createContext(null)
const KEY = 'drivex_currency'
const CURRENCIES = {
  AED: { symbol: 'AED', rate: 1, locale: 'en-AE' },
  USD: { symbol: '$', rate: 0.272294, locale: 'en-US' },
  SAR: { symbol: 'SAR', rate: 1.0211, locale: 'en-SA' },
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('AED')
  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY)
      if (CURRENCIES[stored]) setCurrency(stored)
    } catch {}
  }, [])
  useEffect(() => {
    try { localStorage.setItem(KEY, currency) } catch {}
  }, [currency])

  const format = useCallback((amount, options = {}) => {
    const config = CURRENCIES[currency]
    const value = Number(amount || 0) * config.rate
    return new Intl.NumberFormat(config.locale, {
      style: 'currency', currency,
      maximumFractionDigits: options.decimals ?? 0,
    }).format(value)
  }, [currency])

  const value = useMemo(() => ({ currency, setCurrency, format, currencies: Object.keys(CURRENCIES) }), [currency, format])
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const value = useContext(CurrencyContext)
  if (!value) throw new Error('useCurrency must be used inside CurrencyProvider')
  return value
}
