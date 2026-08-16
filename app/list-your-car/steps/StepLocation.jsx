import { useState } from 'react'
import { LocateFixed, MapPin } from 'lucide-react'

const CITIES = ['Dubai','Abu Dhabi','Sharjah','Ajman','Ras Al Khaimah','Fujairah','Umm Al Quwain']

const cl = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-800 outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-100"

export function StepLocation({ data, update }) {
  const [locating, setLocating] = useState(false)
  const [locationError, setLocationError] = useState('')

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Location access is not supported by this browser.')
      return
    }
    setLocating(true)
    setLocationError('')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        update({ latitude: Number(coords.latitude.toFixed(6)), longitude: Number(coords.longitude.toFixed(6)) })
        setLocating(false)
      },
      () => {
        setLocationError('Location permission was not granted. You can still enter the address manually.')
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  const placeLabel = [data.address, data.area, data.city, data.country].filter(Boolean).join(', ') || 'Add a city or use your current location'

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[17px] font-bold text-gray-900">Location</h2>
        <button type="button" onClick={useCurrentLocation} disabled={locating} className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-[11px] font-black text-green-700 transition hover:bg-green-100 disabled:opacity-60">
          <LocateFixed size={14}/>{locating ? 'Locating…' : 'Use current location'}
        </button>
      </div>
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

      <div className="relative mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-[linear-gradient(135deg,#eef4ea_25%,#f7faf5_25%,#f7faf5_50%,#eef4ea_50%,#eef4ea_75%,#f7faf5_75%)] bg-[length:28px_28px] p-5">
        <div className="absolute inset-0 bg-white/55"/>
        <div className="relative flex items-start gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-200"><MapPin size={19}/></div>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[.14em] text-green-700">Listing location preview</p>
            <p className="mt-1 text-sm font-bold text-gray-900">{placeLabel}</p>
            {data.latitude && data.longitude ? <p className="mt-2 text-xs text-gray-500">Coordinates: {data.latitude}, {data.longitude}</p> : <p className="mt-2 text-xs text-gray-500">Use device location to attach precise coordinates to the API payload.</p>}
            {locationError ? <p className="mt-2 text-xs font-semibold text-amber-600">{locationError}</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
