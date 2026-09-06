'use client'

import { Calendar, Fuel, Gauge, Palette, Settings2, Users, Car, Zap } from 'lucide-react'
import { useLang } from '@/context/LangContext'

export function CarSpecifications({ car }) {
  const { t } = useLang()

  const translateValue = (val) => {
    if (!val) return val
    const map = {
      'Automatic': t('opt_auto'),
      'Manual': t('opt_manual'),
      'Petrol': t('opt_petrol'),
      'Diesel': t('opt_diesel'),
      'Electric': t('opt_electric'),
      'Hybrid': t('opt_hybrid'),
      'Sedan': t('opt_sedan'),
      'SUV': t('opt_suv'),
      'Sports': t('opt_sports'),
      'Coupe': t('opt_coupe'),
      'Hatchback': t('opt_hatchback'),
      'Convertible': t('opt_convertible'),
      'Pickup': t('opt_pickup'),
    }
    return map[val] || val
  }

  const specs = [
    { icon: Calendar,   label: t('spec_year'),        value: car.year },
    { icon: Gauge,      label: t('spec_mileage'),     value: car.mileage ? `${car.mileage.toLocaleString()} ${t('filter_mileage').includes('km') ? 'km' : ''}` : null },
    { icon: Settings2,  label: t('spec_trans'),       value: translateValue(car.transmission) },
    { icon: Fuel,       label: t('spec_fuel'),        value: translateValue(car.fuelType) },
    { icon: Car,        label: t('spec_body'),        value: translateValue(car.bodyType) },
    { icon: Zap,        label: t('spec_engine'),      value: car.engine },
    { icon: Palette,    label: t('spec_color'),       value: car.color },
    { icon: Users,      label: t('spec_seats'),       value: car.seats },
    { icon: Car,        label: t('spec_doors'),       value: car.doors },
    { icon: Settings2,  label: t('spec_drive'),       value: car.drive || '—' },
  ].filter(s => s.value)

  return (
    <div className="grid gap-px bg-gray-100 overflow-hidden rounded-2xl sm:grid-cols-2">
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

