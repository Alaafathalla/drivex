'use client'

import { ChevronDown, Gauge, RotateCcw } from 'lucide-react'

const DEFAULT_META = {
  brands: ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Range Rover', 'Tesla', 'Toyota', 'Lexus', 'Nissan'],
  bodyTypes: ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Convertible', 'Pickup'],
  fuelTypes: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
  cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'],
}
const TRANS = ['Automatic', 'Manual']
const SEATS = ['2', '4', '5', '6', '7']
const YEARS = Array.from({ length: 16 }, (_, i) => String(new Date().getFullYear() - i))

function Sel({ label, options, value, onChange }) {
  return (
    <div className="border-b border-gray-100 py-3">
      <p className="mb-2 text-[11px] font-black uppercase tracking-[.12em] text-gray-500">{label}</p>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 pr-9 text-[13px] font-semibold text-gray-700 outline-none transition focus:border-[#B5E92E] focus:ring-2 focus:ring-[#B5E92E]/15"
        >
          <option value="">Any</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  )
}

function RangeInputs({ label, minValue, maxValue, onMinChange, onMaxChange, minPlaceholder = 'Min', maxPlaceholder = 'Max', step = 1 }) {
  return (
    <div className="border-b border-gray-100 py-3">
      <p className="mb-2 text-[11px] font-black uppercase tracking-[.12em] text-gray-500">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          min="0"
          step={step}
          placeholder={minPlaceholder}
          value={minValue || ''}
          onChange={(event) => onMinChange(event.target.value)}
          className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-[13px] outline-none focus:border-[#B5E92E] focus:ring-2 focus:ring-[#B5E92E]/15"
        />
        <input
          type="number"
          min="0"
          step={step}
          placeholder={maxPlaceholder}
          value={maxValue || ''}
          onChange={(event) => onMaxChange(event.target.value)}
          className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-[13px] outline-none focus:border-[#B5E92E] focus:ring-2 focus:ring-[#B5E92E]/15"
        />
      </div>
    </div>
  )
}

export function CarFilters({ filters, onChange, onReset, meta = DEFAULT_META }) {
  const set = (key, value) => onChange({ ...filters, [key]: value })
  const active = Object.entries(filters).filter(
    ([key, value]) => value !== '' && value !== undefined && key !== 'q' && key !== 'listingType'
  ).length

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <div>
          <p className="font-black text-gray-900">Filters</p>
          <p className="mt-0.5 text-[10px] font-medium text-gray-400">API-driven inventory facets</p>
        </div>
        {active > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-black text-red-500 transition hover:bg-red-100"
          >
            <RotateCcw size={11} /> Reset ({active})
          </button>
        )}
      </div>

      <Sel label="Make / Brand" options={meta.brands || DEFAULT_META.brands} value={filters.brand || ''} onChange={(value) => set('brand', value)} />
      <Sel label="Body Type" options={meta.bodyTypes || DEFAULT_META.bodyTypes} value={filters.bodyType || ''} onChange={(value) => set('bodyType', value)} />
      <Sel label="Fuel Type" options={meta.fuelTypes || DEFAULT_META.fuelTypes} value={filters.fuelType || ''} onChange={(value) => set('fuelType', value)} />
      <Sel label="Transmission" options={TRANS} value={filters.transmission || ''} onChange={(value) => set('transmission', value)} />
      <Sel label="Location" options={meta.cities || DEFAULT_META.cities} value={filters.city || ''} onChange={(value) => set('city', value)} />
      <Sel label="Min Seats" options={SEATS} value={filters.seats || ''} onChange={(value) => set('seats', value)} />
      <Sel label="Year From" options={YEARS} value={filters.minYear || ''} onChange={(value) => set('minYear', value)} />
      <Sel label="Year To" options={YEARS} value={filters.maxYear || ''} onChange={(value) => set('maxYear', value)} />

      <RangeInputs
        label="Price Range"
        minValue={filters.minPrice}
        maxValue={filters.maxPrice}
        onMinChange={(value) => set('minPrice', value)}
        onMaxChange={(value) => set('maxPrice', value)}
        minPlaceholder="Min price"
        maxPlaceholder="Max price"
        step={100}
      />

      <div className="border-b border-gray-100 py-3">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[.12em] text-gray-500">
          <Gauge size={13} /> Mileage (km)
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            min="0"
            step="1000"
            placeholder="Min km"
            value={filters.minMileage || ''}
            onChange={(event) => set('minMileage', event.target.value)}
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-[13px] outline-none focus:border-[#B5E92E] focus:ring-2 focus:ring-[#B5E92E]/15"
          />
          <input
            type="number"
            min="0"
            step="1000"
            placeholder="Max km"
            value={filters.maxMileage || ''}
            onChange={(event) => set('maxMileage', event.target.value)}
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-[13px] outline-none focus:border-[#B5E92E] focus:ring-2 focus:ring-[#B5E92E]/15"
          />
        </div>
      </div>

      {filters.listingType === 'rent' && (
        <div className="py-4">
          <label className="flex items-center gap-2 text-[13px] font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={filters.available === true}
              onChange={(event) => set('available', event.target.checked ? true : undefined)}
              className="size-4 rounded accent-[#B5E92E]"
            />
            Available now only
          </label>
        </div>
      )}
    </div>
  )
}
