'use client'

import { useCurrency } from '@/context/CurrencyContext'
import { useLang } from '@/context/LangContext'
import { Select } from '@/components/ui/select'

export function CurrencySwitcher({ compact = false }) {
  const { currency, setCurrency, currencies } = useCurrency()
  const { t } = useLang()

  return (
    <label className="relative">
      <span className="sr-only">{t('currency_label')}</span>
      <Select
        value={currency}
        onValueChange={setCurrency}
        options={currencies}
        className={`h-9 rounded-full border-slate-200 bg-white text-xs font-black text-slate-700 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-white ${compact ? 'w-[70px] px-2.5' : 'w-[84px] px-3'}`}
        contentClassName="min-w-[84px]"
      />
    </label>
  )
}
