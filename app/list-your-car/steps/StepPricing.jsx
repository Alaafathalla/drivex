import { useLang } from '@/context/LangContext'

const cl = 'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-800 outline-none transition focus:border-[#B5E92E] focus:ring-2 focus:ring-[#B5E92E]/10'

function PriceField({ label, value, onChange, placeholder, hint }) {
  return (
    <label className="block">
      <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-gray-400">AED</span>
        <input type="number" min="0" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className={`${cl} pl-14`} />
      </div>
      {hint && <p className="mt-1 text-[11px] text-gray-400">{hint}</p>}
    </label>
  )
}

export function StepPricing({ data, update }) {
  const { t } = useLang()
  const isRent = data.listingType === 'rent'

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-[17px] font-bold text-gray-900">
        {isRent ? t('lyc_rent_pricing') : t('lyc_sale_pricing')}
      </h2>

      {isRent ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <PriceField label={`${t('lyc_daily_price')} *`}  value={data.price}        onChange={v => update({ price: v })}        placeholder="120"  hint={t('lyc_daily_hint')} />
          <PriceField label={t('lyc_weekly_price')}        value={data.weeklyPrice}  onChange={v => update({ weeklyPrice: v })}  placeholder="700"  hint={t('lyc_weekly_hint')} />
          <PriceField label={t('lyc_monthly_price')}       value={data.monthlyPrice} onChange={v => update({ monthlyPrice: v })} placeholder="2400" hint={t('lyc_monthly_hint')} />
          <PriceField label={t('lyc_deposit')}             value={data.deposit}      onChange={v => update({ deposit: v })}      placeholder="500"  hint={t('lyc_deposit_hint')} />
          <label className="block sm:col-span-2">
            <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{t('lyc_min_days')}</p>
            <select value={data.minRentalDays} onChange={e => update({ minRentalDays: e.target.value })} className={cl}>
              {['1','2','3','5','7','14','30'].map(d => (
                <option key={d} value={d}>{d} {d === '1' ? t('td_date') : t('rent_days')}</option>
              ))}
            </select>
          </label>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <PriceField label={`${t('lyc_sale_price')} *`} value={data.salePrice} onChange={v => update({ salePrice: v })} placeholder="55000" hint={t('lyc_sale_hint')} />
          <div className="flex flex-col justify-end">
            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <input type="checkbox" checked={data.negotiable} onChange={e => update({ negotiable: e.target.checked })}
                className="h-5 w-5 rounded accent-green-600" />
              <div>
                <p className="font-semibold text-gray-800">{t('lyc_negotiable')}</p>
                <p className="text-[12px] text-gray-400">{t('lyc_negotiable_sub')}</p>
              </div>
            </label>
          </div>
        </div>
      )}

      {isRent && data.price && (
        <div className="mt-5 rounded-2xl border border-[#d9f99d] bg-[#f0fdf4] p-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-green-700">{t('lyc_est_earnings')}</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[[t('lyc_weekly'),7],[t('lyc_monthly'),30],[t('lyc_yearly'),365]].map(([label, d]) => (
              <div key={label} className="rounded-xl border border-[#dcfce7] bg-white py-3">
                <p className="text-[18px] font-black text-green-600">AED {Math.round(Number(data.price) * d * 0.75).toLocaleString()}</p>
                <p className="text-[10px] text-gray-400">{label} (75%)</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
