'use client'

import { Calendar, Fuel, Gauge, Palette, Settings2, Users, Car, Zap } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { localizeVehicleValue } from '@/lib/vehicle-i18n'

export function CarSpecifications({ car }) {
  const { t, lang } = useLang()

  const specs = [
    { icon: Calendar,  label: t('spec_year'),    value: car.year },
    { icon: Gauge,     label: t('spec_mileage'), value: car.mileage != null ? `${Number(car.mileage).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')} ${t('km_unit')}` : null },
    { icon: Settings2, label: t('spec_trans'),   value: localizeVehicleValue(car.transmission, lang) },
    { icon: Fuel,      label: t('spec_fuel'),    value: localizeVehicleValue(car.fuelType, lang) },
    { icon: Car,       label: t('spec_body'),    value: localizeVehicleValue(car.bodyType, lang) },
    { icon: Zap,       label: t('spec_engine'),  value: car.engine },
    { icon: Palette,   label: t('spec_color'),   value: localizeVehicleValue(car.color, lang) },
    { icon: Users,     label: t('spec_seats'),   value: car.seats },
    { icon: Car,       label: t('spec_doors'),   value: car.doors },
    { icon: Settings2, label: t('spec_drive'),   value: localizeVehicleValue(car.drive, lang) || '—' },
  ].filter((spec) => spec.value !== null && spec.value !== undefined && spec.value !== '')

  return (
    <div className="grid gap-px overflow-hidden rounded-2xl bg-gray-100 sm:grid-cols-2">
      {specs.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-3 bg-white px-4 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf4]">
            <Icon size={16} className="text-[#16a34a]" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{label}</p>
            <p className="mt-0.5 font-bold text-gray-900">{value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
