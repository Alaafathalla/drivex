'use client'

import { useState } from 'react'
import { LocateFixed, MapPin } from 'lucide-react'
import { useLang } from '@/context/LangContext'

const CITIES = ['Dubai','Abu Dhabi','Sharjah','Ajman','Ras Al Khaimah','Fujairah','Umm Al Quwain']

const CITY_AR = {
  'Dubai': 'دبي',
  'Abu Dhabi': 'أبوظبي',
  'Sharjah': 'الشارقة',
  'Ajman': 'عجمان',
  'Ras Al Khaimah': 'رأس الخيمة',
  'Fujairah': 'الفجيرة',
  'Umm Al Quwain': 'أم القيوين',
}

const cl = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-800 outline-none transition focus:border-[#B5E92E] focus:ring-2 focus:ring-green-100"

export function StepLocation({ data, update }) {
  const { t, lang } = useLang()
  const [locating, setLocating] = useState(false)
  const [locationError, setLocationError] = useState('')

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(t('lyc_gps_err_unsupported'))
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
        setLocationError(t('lyc_gps_err_denied'))
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  const placeLabel = [data.address, data.area, data.city, data.country].filter(Boolean).join(', ') || (lang === 'ar' ? 'أضف مدينة أو استخدم موقعك الحالي' : 'Add a city or use your current location')

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[17px] font-bold text-gray-900">{t('lyc_loc_header')}</h2>
        <button type="button" onClick={useCurrentLocation} disabled={locating} className="inline-flex items-center gap-2 rounded-full border border-[#d9f99d] bg-[#f0fdf4] px-4 py-2 text-[11px] font-black text-[#15803d] transition hover:bg-[#ecfccb] disabled:opacity-60">
          <LocateFixed size={14}/>{locating ? t('lyc_locating_gps') : t('lyc_use_current_loc')}
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{t('lyc_country_label')}</p>
          <input value={data.country} onChange={e => update({ country: e.target.value })} className={cl} dir="auto" />
        </label>
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{t('lyc_city_label')}</p>
          <select value={data.city} onChange={e => update({ city: e.target.value })} className={cl}>
            <option value="">{t('lyc_select_city_ph')}</option>
            {CITIES.map(c => <option key={c} value={c}>{lang === 'ar' && CITY_AR[c] ? CITY_AR[c] : c}</option>)}
          </select>
        </label>
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{t('lyc_area_label')}</p>
          <input value={data.area} onChange={e => update({ area: e.target.value })}
            placeholder={t('lyc_area_ph')} className={cl} dir="auto" />
        </label>
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{t('lyc_address_label')}</p>
          <input value={data.address} onChange={e => update({ address: e.target.value })}
            placeholder={t('lyc_address_ph')} className={cl} dir="auto" />
        </label>
      </div>

      <div className="relative mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-[linear-gradient(135deg,#eef4ea_25%,#f7faf5_25%,#f7faf5_50%,#eef4ea_50%,#eef4ea_75%,#f7faf5_75%)] bg-[length:28px_28px] p-5">
        <div className="absolute inset-0 bg-white/55"/>
        <div className="relative flex items-start gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-200"><MapPin size={19}/></div>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[.14em] text-[#15803d]">{lang === 'ar' ? 'معاينة موقع الإعلان' : 'Listing location preview'}</p>
            <p className="mt-1 text-sm font-bold text-gray-900">{placeLabel}</p>
            {data.latitude && data.longitude ? (
              <p className="mt-2 text-xs text-gray-500">{lang === 'ar' ? 'الإحداثيات' : 'Coordinates'}: {data.latitude}, {data.longitude}</p>
            ) : (
              <p className="mt-2 text-xs text-gray-500">{lang === 'ar' ? 'استخدم موقع الجهاز لإرفاق إحداثيات دقيقة للإعلان.' : 'Use device location to attach precise coordinates to the API payload.'}</p>
            )}
            {locationError ? <p className="mt-2 text-xs font-semibold text-amber-600">{locationError}</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

