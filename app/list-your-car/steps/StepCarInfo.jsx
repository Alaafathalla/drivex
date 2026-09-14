import { useLang } from '@/context/LangContext'

const BRANDS = [
  { value: 'BMW', label: 'BMW', labelAr: 'بي أم دبليو' },
  { value: 'Mercedes-Benz', label: 'Mercedes-Benz', labelAr: 'مرسيدس بنز' },
  { value: 'Audi', label: 'Audi', labelAr: 'أودي' },
  { value: 'Porsche', label: 'Porsche', labelAr: 'بورشه' },
  { value: 'Range Rover', label: 'Range Rover', labelAr: 'رينج روفر' },
  { value: 'Tesla', label: 'Tesla', labelAr: 'تسلا' },
  { value: 'Toyota', label: 'Toyota', labelAr: 'تويوتا' },
  { value: 'Lexus', label: 'Lexus', labelAr: 'لكزس' },
  { value: 'Nissan', label: 'Nissan', labelAr: 'نيسان' },
  { value: 'Honda', label: 'Honda', labelAr: 'هوندا' },
  { value: 'Ford', label: 'Ford', labelAr: 'فورد' },
  { value: 'Hyundai', label: 'Hyundai', labelAr: 'هيونداي' },
]
const BODIES = [
  { value: 'Sedan', label: 'Sedan', labelAr: 'سيدان' },
  { value: 'SUV', label: 'SUV', labelAr: 'دفع رباعي' },
  { value: 'Coupe', label: 'Coupe', labelAr: 'كوبيه' },
  { value: 'Hatchback', label: 'Hatchback', labelAr: 'هاتشباك' },
  { value: 'Convertible', label: 'Convertible', labelAr: 'كابريوليه' },
  { value: 'Pickup', label: 'Pickup', labelAr: 'بيك آب' },
  { value: 'Van', label: 'Van', labelAr: 'فان' },
]
const FUELS = [
  { value: 'Petrol', label: 'Petrol', labelAr: 'بنزين' },
  { value: 'Diesel', label: 'Diesel', labelAr: 'ديزل' },
  { value: 'Electric', label: 'Electric', labelAr: 'كهربائي' },
  { value: 'Hybrid', label: 'Hybrid', labelAr: 'هجين' },
]
const TRANS = [
  { value: 'Automatic', label: 'Automatic', labelAr: 'أوتوماتيك' },
  { value: 'Manual', label: 'Manual', labelAr: 'يدوي' },
]
const YEARS = Array.from({ length: 15 }, (_, i) => String(2025 - i))

const cl = 'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-800 outline-none transition focus:border-[#B5E92E] focus:ring-2 focus:ring-[#B5E92E]/10'

function Row({ label, required, children }) {
  return (
    <label className="block">
      <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">
        {label}{required && <span className="ml-1 text-red-400">*</span>}
      </p>
      {children}
    </label>
  )
}

function Sel({ value, onChange, options, placeholder }) {
  const { t, lang } = useLang()
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className={cl}>
      <option value="">{placeholder || t('select_placeholder')}</option>
      {options.map((option) => {
        const item = typeof option === 'string' ? { value: option, label: option, labelAr: option } : option
        const label = lang === 'ar' ? (item.labelAr || item.label) : item.label
        return <option key={item.value} value={item.value}>{label}</option>
      })}
    </select>
  )
}

export function StepCarInfo({ data, update }) {
  const { t } = useLang()
  const s = (k) => (v) => update({ [k]: v })

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-[17px] font-bold text-gray-900">{t('lyc_veh_info')}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Row label={t('lyc_brand')} required><Sel value={data.brand} onChange={s('brand')} options={BRANDS} /></Row>
        <Row label={t('lyc_model')} required>
          <input value={data.model} onChange={e => update({ model: e.target.value })} placeholder={t('lyc_model_ph')} className={cl} dir="auto" />
        </Row>
        <Row label={t('lyc_year')} required><Sel value={data.year} onChange={s('year')} options={YEARS} /></Row>
        <Row label={t('lyc_body_type')} required><Sel value={data.bodyType} onChange={s('bodyType')} options={BODIES} /></Row>
        <Row label={t('lyc_transmission')} required><Sel value={data.transmission} onChange={s('transmission')} options={TRANS} /></Row>
        <Row label={t('lyc_fuel_type')} required><Sel value={data.fuelType} onChange={s('fuelType')} options={FUELS} /></Row>
        <Row label={t('lyc_mileage')}>
          <input type="number" value={data.mileage} onChange={e => update({ mileage: e.target.value })} placeholder={t('lyc_mileage_ph')} className={cl} />
        </Row>
        <Row label={t('lyc_engine')}>
          <input value={data.engine} onChange={e => update({ engine: e.target.value })} placeholder={t('lyc_engine_ph')} className={cl} dir="auto" />
        </Row>
        <Row label={t('lyc_color')}>
          <input value={data.color} onChange={e => update({ color: e.target.value })} placeholder={t('lyc_color_ph')} className={cl} dir="auto" />
        </Row>
        <Row label={t('lyc_seats')}>
          <Sel value={data.seats} onChange={s('seats')} options={['2','4','5','6','7','8']} />
        </Row>
        <Row label={t('lyc_doors')}>
          <Sel value={data.doors} onChange={s('doors')} options={['2','3','4','5']} />
        </Row>
        <Row label={t('lyc_vin')}>
          <input value={data.vin} onChange={e => update({ vin: e.target.value })} placeholder={t('lyc_vin_ph')} className={cl} />
        </Row>
      </div>
    </div>
  )
}
