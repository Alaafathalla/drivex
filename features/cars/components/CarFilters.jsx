'use client'

import { ChevronDown, Gauge, Paintbrush, RotateCcw, Zap } from 'lucide-react'
import { useLang } from '@/context/LangContext'

const DEFAULT_META = {
  brands:    ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Range Rover', 'Tesla', 'Toyota', 'Lexus', 'Nissan', 'Ferrari', 'Lamborghini'],
  bodyTypes: ['Sedan', 'SUV', 'Sports', 'Coupe', 'Hatchback', 'Convertible', 'Pickup'],
  fuelTypes: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
  cities:    ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'],
  colors:    ['Black', 'White', 'Silver', 'Grey', 'Red', 'Blue', 'Green', 'Yellow'],
  conditions:['New', 'Used'],
}

const TRANS = ['Automatic', 'Manual']
const SEATS = ['2', '4', '5', '6', '7', '8']
const YEARS = Array.from({ length: 16 }, (_, i) => String(new Date().getFullYear() - i))

// Color swatches for visual filter
const COLOR_MAP = {
  Black:  '#1a1a1a', White:  '#f8f8f8', Silver: '#c0c0c0',
  Grey:   '#808080', Red:    '#dc2626', Blue:   '#1d4ed8',
  Green:  '#16a34a', Yellow: '#eab308', Orange: '#ea580c', Brown: '#92400e',
}

function Sel({ label, options, value, onChange, anyLabel = 'Any', getLabel }) {
  return (
    <div className="border-b border-[#f0f2ef] py-3">
      <p className="mb-2 text-[10px] font-black uppercase tracking-[.14em] text-[#64748b]">{label}</p>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full appearance-none rounded-xl border border-[#dfe5db] bg-white px-3 pr-8 text-[12px] font-semibold text-[#0f172a] outline-none transition focus:border-[#B5E92E] focus:ring-2 focus:ring-[#B5E92E]/15"
        >
          <option value="">{anyLabel}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {getLabel ? getLabel(o) : o}
            </option>
          ))}
        </select>
        <ChevronDown size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
      </div>
    </div>
  )
}

function RangePair({ label, icon: Icon, minVal, maxVal, onMin, onMax, minPh = 'Min', maxPh = 'Max', step = 1 }) {
  return (
    <div className="border-b border-[#f0f2ef] py-3">
      <div className="mb-2 flex items-center gap-1.5">
        {Icon && <Icon size={11} className="text-[#64748b]" />}
        <p className="text-[10px] font-black uppercase tracking-[.14em] text-[#64748b]">{label}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input type="number" min="0" step={step} placeholder={minPh} value={minVal || ''}
          onChange={(e) => onMin(e.target.value)}
          className="h-10 rounded-xl border border-[#dfe5db] bg-white px-3 text-[12px] outline-none focus:border-[#B5E92E] focus:ring-2 focus:ring-[#B5E92E]/15" />
        <input type="number" min="0" step={step} placeholder={maxPh} value={maxVal || ''}
          onChange={(e) => onMax(e.target.value)}
          className="h-10 rounded-xl border border-[#dfe5db] bg-white px-3 text-[12px] outline-none focus:border-[#B5E92E] focus:ring-2 focus:ring-[#B5E92E]/15" />
      </div>
    </div>
  )
}

function ColorFilter({ label, colors, value, onChange, clearLabel = 'Clear' }) {
  return (
    <div className="border-b border-[#f0f2ef] py-3">
      <div className="mb-2 flex items-center gap-1.5">
        <Paintbrush size={11} className="text-[#64748b]" />
        <p className="text-[10px] font-black uppercase tracking-[.14em] text-[#64748b]">{label}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => {
          const bg = COLOR_MAP[color] || '#999'
          const selected = value === color
          return (
            <button
              key={color}
              type="button"
              title={color}
              onClick={() => onChange(selected ? '' : color)}
              className={`relative h-7 w-7 rounded-full border-2 transition ${selected ? 'border-[#B5E92E] scale-110 shadow-md' : 'border-transparent hover:border-[#dfe5db]'}`}
              style={{ backgroundColor: bg }}
              aria-label={color}
              aria-pressed={selected}
            >
              {selected && (
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black" style={{ color: ['White', 'Silver', 'Yellow'].includes(color) ? '#333' : '#fff' }}>✓</span>
              )}
            </button>
          )
        })}
      </div>
      {value && (
        <button type="button" onClick={() => onChange('')} className="mt-2 text-[10px] font-bold text-[#94a3b8] hover:text-[#0f172a]">
          {clearLabel}: {value}
        </button>
      )}
    </div>
  )
}

export function CarFilters({ filters, onChange, onReset, meta = DEFAULT_META }) {
  const { t } = useLang()
  const set = (key, value) => onChange({ ...filters, [key]: value })

  const active = Object.entries(filters).filter(
    ([key, value]) => value !== '' && value !== undefined && !['q', 'listingType'].includes(key)
  ).length

  const brands    = meta?.brands    ?? DEFAULT_META.brands
  const bodyTypes = meta?.bodyTypes ?? DEFAULT_META.bodyTypes
  const fuelTypes = meta?.fuelTypes ?? DEFAULT_META.fuelTypes
  const cities    = meta?.cities    ?? DEFAULT_META.cities
  const colors    = meta?.colors    ?? DEFAULT_META.colors
  const conditions = meta?.conditions ?? DEFAULT_META.conditions

  const getOptionLabel = (val) => {
    const map = {
      'Automatic': t('opt_auto'),
      'Manual': t('opt_manual'),
      'Petrol': t('opt_petrol'),
      'Diesel': t('opt_diesel'),
      'Electric': t('opt_electric'),
      'Hybrid': t('opt_hybrid'),
      'New': t('opt_new'),
      'Used': t('opt_used'),
      'Sedan': t('opt_sedan'),
      'SUV': t('opt_suv'),
      'Sports': t('opt_sports'),
      'Coupe': t('opt_coupe'),
      'Hatchback': t('opt_hatchback'),
      'Convertible': t('opt_convertible'),
      'Pickup': t('opt_pickup'),
      'Dubai': t('opt_dubai'),
      'Abu Dhabi': t('opt_abu_dhabi'),
      'Sharjah': t('opt_sharjah'),
      'Ajman': t('opt_ajman'),
    }
    return map[val] || val
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div>
          <p className="font-black text-[#0f172a]">{t('filter_title')}</p>
          {active > 0 && <p className="mt-0.5 text-[10px] font-bold text-[#7d9f24]">{active} {t('filter_active')}</p>}
        </div>
        {active > 0 && (
          <button type="button" onClick={onReset}
            className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-black text-red-500 transition hover:bg-red-100">
            <RotateCcw size={10} /> {t('filter_reset')}
          </button>
        )}
      </div>

      <Sel label={t('filter_brand')}       options={brands}     value={filters.brand || ''}        onChange={(v) => set('brand', v)} anyLabel={t('filter_any')} />
      <Sel label={t('filter_condition')}   options={conditions} value={filters.condition || ''}    onChange={(v) => set('condition', v)} anyLabel={t('filter_any')} getLabel={getOptionLabel} />
      <Sel label={t('filter_body_type')}   options={bodyTypes}  value={filters.bodyType || ''}     onChange={(v) => set('bodyType', v)} anyLabel={t('filter_any')} getLabel={getOptionLabel} />
      <Sel label={t('filter_fuel_type')}   options={fuelTypes}  value={filters.fuelType || ''}     onChange={(v) => set('fuelType', v)} anyLabel={t('filter_any')} getLabel={getOptionLabel} />
      <Sel label={t('filter_transmission')} options={TRANS}     value={filters.transmission || ''} onChange={(v) => set('transmission', v)} anyLabel={t('filter_any')} getLabel={getOptionLabel} />
      <Sel label={t('filter_location')}   options={cities}     value={filters.city || ''}         onChange={(v) => set('city', v)} anyLabel={t('filter_any')} getLabel={getOptionLabel} />
      <Sel label={t('filter_seats')}      options={SEATS}      value={filters.seats || ''}        onChange={(v) => set('seats', v)} anyLabel={t('filter_any')} />
      <Sel label={t('filter_year_from')}  options={YEARS}      value={filters.minYear || ''}      onChange={(v) => set('minYear', v)} anyLabel={t('filter_any')} />
      <Sel label={t('filter_year_to')}    options={YEARS}      value={filters.maxYear || ''}      onChange={(v) => set('maxYear', v)} anyLabel={t('filter_any')} />

      <RangePair label={t('filter_price_range')}
        minVal={filters.minPrice} maxVal={filters.maxPrice}
        onMin={(v) => set('minPrice', v)} onMax={(v) => set('maxPrice', v)}
        minPh={t('filter_min_price_ph')} maxPh={t('filter_max_price_ph')} step={500} />

      <RangePair label={t('filter_mileage')} icon={Gauge}
        minVal={filters.minMileage} maxVal={filters.maxMileage}
        onMin={(v) => set('minMileage', v)} onMax={(v) => set('maxMileage', v)}
        minPh={t('filter_min_km_ph')} maxPh={t('filter_max_km_ph')} step={5000} />

      <RangePair label={t('filter_horsepower')} icon={Zap}
        minVal={filters.minHp} maxVal={filters.maxHp}
        onMin={(v) => set('minHp', v)} onMax={(v) => set('maxHp', v)}
        minPh={t('filter_min_hp_ph')} maxPh={t('filter_max_hp_ph')} step={50} />

      <ColorFilter label={t('filter_color')}
        colors={colors}
        value={filters.color || ''}
        onChange={(v) => set('color', v)}
        clearLabel={t('filter_clear')} />

      {filters.listingType === 'rent' && (
        <div className="py-4">
          <label className="flex cursor-pointer items-center gap-2 text-[12px] font-semibold text-[#0f172a]">
            <input
              type="checkbox"
              checked={filters.available === true}
              onChange={(e) => set('available', e.target.checked ? true : undefined)}
              className="size-4 rounded accent-[#B5E92E]"
            />
            {t('filter_available_now')}
          </label>
        </div>
      )}
    </div>
  )
}

