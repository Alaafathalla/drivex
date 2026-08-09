'use client'
import { ChevronDown } from 'lucide-react'

const BRANDS = ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Range Rover', 'Tesla', 'Toyota', 'Lexus', 'Nissan']
const BODIES = ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Convertible', 'Pickup']
const FUELS = ['Petrol', 'Diesel', 'Electric', 'Hybrid']
const TRANS = ['Automatic', 'Manual']
const CITIES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman']
const SEATS = ['2', '4', '5', '6', '7']
const YEARS = Array.from({ length: 10 }, (_, i) => String(2024 - i))

function Sel({ label, options, value, onChange }) {
  return (
    <div className="border-b border-gray-100 py-3">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <div className="relative">
        <select value={value} onChange={e => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 py-2 text-[13px] text-gray-700 outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-100">
          <option value="">Any</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  )
}

export function CarFilters({ filters, onChange, onReset }) {
  const set = (k, v) => onChange({ ...filters, [k]: v })
  const active = Object.entries(filters).filter(([k, v]) => v && k !== 'q' && k !== 'listingType').length

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <p className="font-bold text-gray-900">Filters</p>
        {active > 0 && (
          <button onClick={onReset}
            className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-500 hover:bg-red-100 transition">
            Reset ({active})
          </button>
        )}
      </div>
      <Sel label="Brand"        options={BRANDS} value={filters.brand || ''}        onChange={v => set('brand', v)} />
      <Sel label="Body Type"    options={BODIES} value={filters.bodyType || ''}     onChange={v => set('bodyType', v)} />
      <Sel label="Fuel Type"    options={FUELS}  value={filters.fuelType || ''}     onChange={v => set('fuelType', v)} />
      <Sel label="Transmission" options={TRANS}  value={filters.transmission || ''} onChange={v => set('transmission', v)} />
      <Sel label="Location"     options={CITIES} value={filters.city || ''}         onChange={v => set('city', v)} />
      <Sel label="Min Seats"    options={SEATS}  value={filters.seats || ''}        onChange={v => set('seats', v)} />
      <Sel label="Year From"    options={YEARS}  value={filters.minYear || ''}      onChange={v => set('minYear', v)} />
      <Sel label="Year To"      options={YEARS}  value={filters.maxYear || ''}      onChange={v => set('maxYear', v)} />

      {/* Price range */}
      <div className="border-b border-gray-100 py-3">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">Price Range</p>
        <div className="grid grid-cols-2 gap-2">
          <input type="number" placeholder="Min" value={filters.minPrice || ''}
            onChange={e => set('minPrice', e.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-2 text-[13px] outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100" />
          <input type="number" placeholder="Max" value={filters.maxPrice || ''}
            onChange={e => set('maxPrice', e.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-2 text-[13px] outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100" />
        </div>
      </div>

      {/* Availability (rental) */}
      {filters.listingType === 'rent' && (
        <div className="py-3">
          <label className="flex items-center gap-2 text-[13px] text-gray-700">
            <input type="checkbox" checked={filters.available === true}
              onChange={e => set('available', e.target.checked ? true : undefined)}
              className="h-4 w-4 accent-green-600 rounded" />
            Available now only
          </label>
        </div>
      )}
    </div>
  )
}
