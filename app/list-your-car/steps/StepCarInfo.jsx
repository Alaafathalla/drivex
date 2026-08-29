const BRANDS = ['BMW','Mercedes-Benz','Audi','Porsche','Range Rover','Tesla','Toyota','Lexus','Nissan','Honda','Ford','Hyundai']
const BODIES  = ['Sedan','SUV','Coupe','Hatchback','Convertible','Pickup','Van']
const FUELS   = ['Petrol','Diesel','Electric','Hybrid']
const TRANS   = ['Automatic','Manual']
const YEARS   = Array.from({ length: 15 }, (_, i) => String(2025 - i))

const cl = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-800 outline-none transition focus:border-[#B5E92E] focus:ring-2 focus:ring-green-100"

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
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className={cl}>
      <option value="">{placeholder || 'Select…'}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

export function StepCarInfo({ data, update }) {
  const s = (k) => (v) => update({ [k]: v })
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-[17px] font-bold text-gray-900">Vehicle Information</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Row label="Brand" required>
          <Sel value={data.brand} onChange={s('brand')} options={BRANDS} />
        </Row>
        <Row label="Model" required>
          <input value={data.model} onChange={e => update({ model: e.target.value })} placeholder="e.g. X5, C200…" className={cl} />
        </Row>
        <Row label="Year" required>
          <Sel value={data.year} onChange={s('year')} options={YEARS} />
        </Row>
        <Row label="Body Type" required>
          <Sel value={data.bodyType} onChange={s('bodyType')} options={BODIES} />
        </Row>
        <Row label="Transmission" required>
          <Sel value={data.transmission} onChange={s('transmission')} options={TRANS} />
        </Row>
        <Row label="Fuel Type" required>
          <Sel value={data.fuelType} onChange={s('fuelType')} options={FUELS} />
        </Row>
        <Row label="Mileage (km)">
          <input type="number" value={data.mileage} onChange={e => update({ mileage: e.target.value })} placeholder="e.g. 25000" className={cl} />
        </Row>
        <Row label="Engine">
          <input value={data.engine} onChange={e => update({ engine: e.target.value })} placeholder="e.g. 2.0L Turbo" className={cl} />
        </Row>
        <Row label="Color">
          <input value={data.color} onChange={e => update({ color: e.target.value })} placeholder="e.g. Black" className={cl} />
        </Row>
        <Row label="Number of Seats">
          <Sel value={data.seats} onChange={s('seats')} options={['2','4','5','6','7','8']} />
        </Row>
        <Row label="Number of Doors">
          <Sel value={data.doors} onChange={s('doors')} options={['2','3','4','5']} />
        </Row>
        <Row label="VIN (optional)">
          <input value={data.vin} onChange={e => update({ vin: e.target.value })} placeholder="Vehicle identification number" className={cl} />
        </Row>
      </div>
    </div>
  )
}
