'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useLang } from '@/context/LangContext'

const ALL_FEATURES = [
  'Air Conditioning', 'Bluetooth', 'GPS / Navigation', 'Sunroof / Panoramic',
  'Rear Camera', 'Front Camera', '360 Camera', 'Parking Sensors',
  'Cruise Control', 'Adaptive Cruise Control', 'Lane Assist', 'Blind Spot Monitor',
  'Leather Seats', 'Heated Seats', 'Ventilated Seats', 'Massage Seats',
  'Wireless Charging', 'Apple CarPlay', 'Android Auto', 'USB Ports',
  'ABS', 'Airbags', 'Stability Control', 'Hill Assist',
  'Keyless Entry', 'Push Start', 'Electric Tailgate', 'Ambient Lighting',
  'Premium Sound', 'Head-Up Display', 'Digital Cockpit', 'Night Vision',
]

const FEATURE_AR = {
  'Air Conditioning': 'تكييف هواء',
  'Bluetooth': 'بلوتوث',
  'GPS / Navigation': 'نظام ملاحة GPS',
  'Sunroof / Panoramic': 'فتحة سقف / بانوراما',
  'Rear Camera': 'كاميرا خلفية',
  'Front Camera': 'كاميرا أمامية',
  '360 Camera': 'كاميرا ٣٦٠ درجة',
  'Parking Sensors': 'حساسات ركن',
  'Cruise Control': 'مثبت سرعة',
  'Adaptive Cruise Control': 'مثبت سرعة تفاعلي',
  'Lane Assist': 'تحديد مسار',
  'Blind Spot Monitor': 'مراقبة النقطة العمياء',
  'Leather Seats': 'مقاعد جلدية',
  'Heated Seats': 'تدفئة مقاعد',
  'Ventilated Seats': 'تبريد مقاعد',
  'Massage Seats': 'مساج بالمقاعد',
  'Wireless Charging': 'شاحن لاسلكي',
  'Apple CarPlay': 'أبل كاربلاي',
  'Android Auto': 'أندرويد أوتو',
  'USB Ports': 'منافذ USB',
  'ABS': 'فرامل مانعة للانغلاق ABS',
  'Airbags': 'وسائد هوائية',
  'Stability Control': 'نظام الثبات الإلكتروني',
  'Hill Assist': 'مساعد صعود المرتفعات',
  'Keyless Entry': 'دخول ذكي بدون مفتاح',
  'Push Start': 'تشغيل بصمة',
  'Electric Tailgate': 'صندوق خلفي كهربائي',
  'Ambient Lighting': 'إضاءة محيطية',
  'Premium Sound': 'نظام صوتي فاخر',
  'Head-Up Display': 'شاشة عرض على الزجاج HUD',
  'Digital Cockpit': 'لوحة عدادات رقمية',
  'Night Vision': 'رؤية ليلية',
}

const cl = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-800 outline-none transition focus:border-[#B5E92E] focus:ring-2 focus:ring-green-100 resize-none"

export function StepFeatures({ data, update }) {
  const { t, lang } = useLang()
  const toggle = (f) => {
    const has = data.features.includes(f)
    update({ features: has ? data.features.filter(x => x !== f) : [...data.features, f] })
  }

  return (
    <div className="space-y-5">
      {/* Features checklist */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[17px] font-bold text-gray-900">{t('lyc_features_header')}</h2>
          <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-bold text-[#15803d]">
            {data.features.length} {t('lyc_features_selected')}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {ALL_FEATURES.map(f => {
            const on = data.features.includes(f)
            const label = lang === 'ar' && FEATURE_AR[f] ? FEATURE_AR[f] : f
            return (
              <motion.button key={f} onClick={() => toggle(f)} whileTap={{ scale: .96 }}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left rtl:text-right text-[12px] font-medium transition ${
                  on ? 'border-[#B5E92E] bg-[#f0fdf4] text-green-800' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}>
                <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded ${on ? 'bg-[#16a34a]' : 'border border-gray-300'}`}>
                  {on && <Check size={10} className="text-white" />}
                </div>
                <span>{label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Description */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-[17px] font-bold text-gray-900">{t('lyc_desc_header')}</h2>
        <textarea rows={5} value={data.description}
          onChange={e => update({ description: e.target.value })}
          placeholder={t('lyc_desc_ph')}
          className={cl} dir="auto" />
        <p className="mt-1 text-[11px] text-gray-400">{data.description.length} {t('lyc_chars_label')}</p>
      </div>
    </div>
  )
}

