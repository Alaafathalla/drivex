import { Calendar, Fuel, Gauge, Palette, Settings2, Users, Car, Zap } from 'lucide-react'

export function CarSpecifications({ car }) {
  const specs = [
    { icon: Calendar,   label: 'Year',         value: car.year },
    { icon: Gauge,      label: 'Mileage',       value: `${car.mileage?.toLocaleString()} km` },
    { icon: Settings2,  label: 'Transmission',  value: car.transmission },
    { icon: Fuel,       label: 'Fuel Type',     value: car.fuelType },
    { icon: Car,        label: 'Body Type',     value: car.bodyType },
    { icon: Zap,        label: 'Engine',        value: car.engine },
    { icon: Palette,    label: 'Color',         value: car.color },
    { icon: Users,      label: 'Seats',         value: car.seats },
    { icon: Car,        label: 'Doors',         value: car.doors },
    { icon: Settings2,  label: 'Drive',         value: car.drive || '—' },
  ].filter(s => s.value)

  return (
    <div className="grid gap-px bg-gray-100 overflow-hidden rounded-2xl sm:grid-cols-2">
      {specs.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-3 bg-white px-4 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50">
            <Icon size={16} className="text-green-600" />
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
