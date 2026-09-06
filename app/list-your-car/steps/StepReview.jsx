'use client'

import { Car, CheckCircle2, MapPin, Phone, Tag } from 'lucide-react'
import { useLang } from '@/context/LangContext'

function Row({ label, value }) {
  if (!value) return null
  return (
    <div className="flex items-center justify-between border-b border-gray-50 py-2.5 last:border-0">
      <p className="text-[12px] text-gray-400">{label}</p>
      <p className="max-w-[55%] truncate text-right rtl:text-left text-[13px] font-semibold text-gray-900">{value}</p>
    </div>
  )
}

function Section({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
        <Icon size={16} className="text-[#22c55e]" />
        <p className="text-[13px] font-bold text-gray-900">{title}</p>
      </div>
      <div className="px-4 py-2">{children}</div>
    </div>
  )
}

export function StepReview({ data }) {
  const { t, lang } = useLang()
  const isRent = data.listingType === 'rent'
  const isAr = lang === 'ar'

  const contactLabelMap = {
    phone: t('lyc_pref_call'),
    whatsapp: t('lyc_pref_wa'),
    email: t('lyc_pref_em'),
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#d9f99d] bg-[#f0fdf4] px-4 py-4">
        <p className="font-bold text-green-800">{t('lyc_review_almost')}</p>
        <p className="mt-0.5 text-[12px] text-[#15803d]">{t('lyc_review_approval_note')}</p>
      </div>

      {/* Photos preview */}
      {data.images.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-[13px] font-bold text-gray-900">{t('lyc_review_photos_count')} ({data.images.length})</p>
          </div>
          <div className="grid grid-cols-4 gap-2 p-3">
            {data.images.slice(0, 4).map((src, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl bg-gray-100" style={{ aspectRatio: '4/3' }}>
                <img src={src} alt="" className="h-full w-full object-cover" />
                {i === 0 && <span className="absolute left-1 top-1 rtl:left-auto rtl:right-1 rounded-md bg-green-600 px-1.5 py-0.5 text-[8px] font-black text-white">{t('lyc_photos_main_badge')}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <Section icon={Car} title={t('lyc_review_sec_veh')}>
        <Row label={t('lyc_step1')} value={isRent ? t('card_badge_rent') : t('card_badge_sale')} />
        <Row label={`${t('search_make_label')} & ${t('search_model_label')}`} value={`${data.brand || ''} ${data.model || ''}`.trim()} />
        <Row label={t('spec_year')} value={data.year} />
        <Row label={t('spec_body')} value={data.bodyType} />
        <Row label={t('spec_trans')} value={data.transmission} />
        <Row label={t('spec_fuel')} value={data.fuelType} />
        <Row label={t('spec_mileage')} value={data.mileage ? `${Number(data.mileage).toLocaleString()} ${isAr ? 'كم' : 'km'}` : null} />
        <Row label={t('spec_engine')} value={data.engine} />
        <Row label={t('spec_color')} value={data.color} />
        <Row label={t('spec_seats')} value={data.seats} />
      </Section>

      <Section icon={Tag} title={t('lyc_review_sec_pricing')}>
        {isRent ? (
          <>
            <Row label={t('lyc_daily_price')} value={data.price ? `AED ${data.price} / ${isAr ? 'يوم' : 'day'}` : null} />
            <Row label={t('lyc_weekly_price')} value={data.weeklyPrice ? `AED ${data.weeklyPrice} / ${isAr ? 'أسبوع' : 'week'}` : null} />
            <Row label={t('lyc_monthly_price')} value={data.monthlyPrice ? `AED ${data.monthlyPrice} / ${isAr ? 'شهر' : 'month'}` : null} />
            <Row label={t('lyc_deposit')} value={data.deposit ? `AED ${data.deposit}` : null} />
            <Row label={t('lyc_min_days')} value={`${data.minRentalDays} ${isAr ? 'أيام' : 'days'}`} />
          </>
        ) : (
          <>
            <Row label={t('lyc_sale_price')} value={data.salePrice ? `AED ${Number(data.salePrice).toLocaleString()}` : null} />
            <Row label={t('lyc_negotiable')} value={data.negotiable ? (isAr ? 'نعم' : 'Yes') : (isAr ? 'لا' : 'No')} />
          </>
        )}
      </Section>

      <Section icon={MapPin} title={t('lyc_review_sec_loc')}>
        <Row label={t('lyc_city_label').replace('*', '').trim()} value={data.city} />
        <Row label={t('lyc_area_label')} value={data.area} />
        <Row label={t('lyc_address_label')} value={data.address} />
      </Section>

      <Section icon={CheckCircle2} title={t('lyc_features_header')}>
        {data.features.length === 0
          ? <p className="py-2 text-[13px] text-gray-400">{isAr ? 'لم يتم تحديد أي مميزات' : 'No features selected'}</p>
          : (
            <div className="flex flex-wrap gap-1.5 py-3">
              {data.features.map(f => (
                <span key={f} className="rounded-full border border-[#d9f99d] bg-[#f0fdf4] px-2.5 py-0.5 text-[11px] font-medium text-[#15803d]">{f}</span>
              ))}
            </div>
          )
        }
        {data.description && (
          <div className="border-t border-gray-50 py-3">
            <p className="text-[11px] text-gray-400 mb-1">{t('lyc_desc_header')}</p>
            <p className="text-[13px] leading-6 text-gray-700 line-clamp-3" dir="auto">{data.description}</p>
          </div>
        )}
      </Section>

      <Section icon={Phone} title={t('lyc_review_sec_owner')}>
        <Row label={t('lyc_owner_name_label').replace('*', '').trim()} value={data.ownerName} />
        <Row label={t('lyc_owner_email_label').replace('*', '').trim()} value={data.ownerEmail} />
        <Row label={t('lyc_owner_phone_label').replace('*', '').trim()} value={data.ownerPhone} />
        <Row label={t('lyc_owner_pref_contact')} value={contactLabelMap[data.preferredContact] || data.preferredContact} />
      </Section>
    </div>
  )
}

