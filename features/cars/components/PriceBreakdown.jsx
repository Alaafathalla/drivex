'use client'

import { useLang } from '@/context/LangContext'

export function PriceBreakdown({ breakdown }) {
  const { t } = useLang()
  const { days, dailyRate, base, insurance, service, extras = 0, tax, discount, total } = breakdown
  const daysText = days === 1 ? t('breakdown_day_suffix') : t('breakdown_days_suffix')
  const rows = [
    { label: `$${dailyRate} ${t('breakdown_per_day')} ${days} ${daysText}`, value: base },
    { label: t('breakdown_insurance'), value: insurance },
    { label: t('breakdown_service'), value: service },
    ...(extras ? [{ label: t('breakdown_extras'), value: extras }] : []),
    ...(discount ? [{ label: t('breakdown_discount'), value: -discount, green: true }] : []),
    { label: t('breakdown_tax'), value: tax },
  ]
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-4 py-4">
        <p className="font-bold text-gray-900">{t('breakdown_title')}</p>
      </div>
      <div className="space-y-3 px-4 py-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-[13px]">
            <span className="text-gray-500">{row.label}</span>
            <span className={`font-semibold ${row.green ? 'text-[#16a34a]' : 'text-gray-900'}`}>
              {row.value < 0 ? '-' : ''}${Math.abs(row.value)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-[#f0fdf4] px-4 py-4">
        <p className="font-bold text-gray-900">{t('breakdown_total')}</p>
        <p className="text-[22px] font-black text-[#16a34a]">${total}</p>
      </div>
    </div>
  )
}

