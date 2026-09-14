'use client'

import { useCurrency } from '@/context/CurrencyContext'
import { useLang } from '@/context/LangContext'

export function CurrencySwitcher({ compact = false }) {
  const { currency, setCurrency, currencies } = useCurrency()
  const { t } = useLang()

  return (
    <label className="relative">
      <span className="sr-only">{t('currency_label')}</span>
      <select value={currency} onChange={(event) => setCurrency(event.target.value)} className={`h-9 appearance-none rounded-full border border-slate-200 bg-white text-xs font-black text-slate-700 outline-none transition hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-white ${compact ? 'w-[66px] px-2' : 'w-[76px] px-3'}`}>
        {currencies.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
  )
}
