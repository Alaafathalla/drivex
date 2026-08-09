const CITIES = ['Dubai','Abu Dhabi','Sharjah','Ajman','Ras Al Khaimah','Fujairah','Umm Al Quwain']

const cl = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-800 outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-100"

export function StepLocation({ data, update }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-[17px] font-bold text-gray-900">Location</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">Country</p>
          <input value={data.country} onChange={e => update({ country: e.target.value })} className={cl} />
        </label>
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">City *</p>
          <select value={data.city} onChange={e => update({ city: e.target.value })} className={cl}>
            <option value="">Select city</option>
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">Area / District</p>
          <input value={data.area} onChange={e => update({ area: e.target.value })}
            placeholder="e.g. Dubai Marina, Downtown…" className={cl} />
        </label>
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">Full Address</p>
          <input value={data.address} onChange={e => update({ address: e.target.value })}
            placeholder="Street address (optional)" className={cl} />
        </label>
      </div>

      {/* Map placeholder */}
      <div className="mt-5 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-10">
        <p className="text-[13px] font-semibold text-gray-500">📍 Interactive map coming soon</p>
        <p className="text-[12px] text-gray-400">For now, enter your address above</p>
      </div>
    </div>
  )
}
