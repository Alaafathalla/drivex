'use client'

import { CheckCircle2 } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { localizeVehicleFeature } from '@/lib/vehicle-i18n'

export function CarFeatures({ features = [] }) {
  const { lang } = useLang()
  if (!features.length) return null

  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <div key={feature} className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5">
          <CheckCircle2 size={15} className="shrink-0 text-[#22c55e]" />
          <span className="text-[13px] font-medium text-gray-700">{localizeVehicleFeature(feature, lang)}</span>
        </div>
      ))}
    </div>
  )
}
