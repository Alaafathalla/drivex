'use client'

import { useLang } from '@/context/LangContext'

const cl = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-800 outline-none transition focus:border-[#B5E92E] focus:ring-2 focus:ring-green-100"

export function StepOwner({ data, update }) {
  const { t } = useLang()
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-[17px] font-bold text-gray-900">{t('lyc_owner_header')}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{t('lyc_owner_name_label')}</p>
          <input value={data.ownerName} onChange={e => update({ ownerName: e.target.value })}
            placeholder={t('lyc_owner_name_ph')} className={cl} dir="auto" />
        </label>
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{t('lyc_owner_email_label')}</p>
          <input type="email" value={data.ownerEmail} onChange={e => update({ ownerEmail: e.target.value })}
            placeholder={t('lyc_owner_email_ph')} className={cl} dir="auto" />
        </label>
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{t('lyc_owner_phone_label')}</p>
          <input type="tel" value={data.ownerPhone} onChange={e => update({ ownerPhone: e.target.value })}
            placeholder={t('lyc_owner_phone_ph')} className={cl} dir="ltr" />
        </label>
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">{t('lyc_owner_pref_contact')}</p>
          <select value={data.preferredContact} onChange={e => update({ preferredContact: e.target.value })} className={cl}>
            <option value="phone">{t('lyc_pref_call')}</option>
            <option value="whatsapp">{t('lyc_pref_wa')}</option>
            <option value="email">{t('lyc_pref_em')}</option>
          </select>
        </label>
      </div>
      <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-[12px] text-blue-800">
          <strong>{t('lyc_privacy_strong')} </strong>{t('lyc_privacy_text')}
        </p>
      </div>
    </div>
  )
}

