const cl = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-800 outline-none transition focus:border-[#B5E92E] focus:ring-2 focus:ring-green-100"

function PriceField({ label, prefix = 'AED', value, onChange, placeholder, hint }) {
  return (
    <label className="block">
      <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-gray-400">{prefix}</span>
        <input type="number" min="0" value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${cl} pl-14`} />
      </div>
      {hint && <p className="mt-1 text-[11px] text-gray-400">{hint}</p>}
    </label>
  )
}

export function StepPricing({ data, update }) {
  const isRent = data.listingType === 'rent'
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-[17px] font-bold text-gray-900">
        {isRent ? 'Rental Pricing' : 'Sale Pricing'}
      </h2>

      {isRent ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <PriceField label="Daily Price *" value={data.price} onChange={v => update({ price: v })} placeholder="e.g. 120" hint="Amount charged per day" />
          <PriceField label="Weekly Price" value={data.weeklyPrice} onChange={v => update({ weeklyPrice: v })} placeholder="e.g. 700" hint="Optional discount for 7+ days" />
          <PriceField label="Monthly Price" value={data.monthlyPrice} onChange={v => update({ monthlyPrice: v })} placeholder="e.g. 2400" hint="Optional discount for 30+ days" />
          <PriceField label="Security Deposit" value={data.deposit} onChange={v => update({ deposit: v })} placeholder="e.g. 500" hint="Refundable deposit held at pickup" />
          <label className="block sm:col-span-2">
            <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">Minimum Rental Days</p>
            <select value={data.minRentalDays} onChange={e => update({ minRentalDays: e.target.value })} className={cl}>
              {['1','2','3','5','7','14','30'].map(d => <option key={d} value={d}>{d} day{d !== '1' ? 's' : ''}</option>)}
            </select>
          </label>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <PriceField label="Sale Price *" value={data.salePrice} onChange={v => update({ salePrice: v })} placeholder="e.g. 55000" hint="Your asking price in AED" />
          <div className="flex flex-col justify-end">
            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <input type="checkbox" checked={data.negotiable} onChange={e => update({ negotiable: e.target.checked })}
                className="h-5 w-5 accent-green-600 rounded" />
              <div>
                <p className="font-semibold text-gray-800">Price is negotiable</p>
                <p className="text-[12px] text-gray-400">Buyers can make offers</p>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Earnings estimate for rent */}
      {isRent && data.price && (
        <div className="mt-5 rounded-2xl border border-[#d9f99d] bg-[#f0fdf4] p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#15803d] mb-2">Estimated Earnings</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[['Weekly', 7], ['Monthly', 30], ['Yearly', 365]].map(([label, d]) => (
              <div key={label} className="rounded-xl bg-white border border-[#dcfce7] py-3">
                <p className="text-[18px] font-black text-[#16a34a]">AED {Math.round(Number(data.price) * d * 0.75).toLocaleString()}</p>
                <p className="text-[10px] text-gray-400">{label} (75% occupancy)</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
