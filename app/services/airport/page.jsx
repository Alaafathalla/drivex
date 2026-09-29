'use client'

import { ServiceDetailPage } from '@/components/platform/service-detail-page'
import { useLang } from '@/context/LangContext'

const COPY = {
  en: {
    eyebrow: 'Airport transfer',
    title: 'From terminal to destination, without the friction.',
    description: 'Book premium airport pickup, drop-off or rental handover with flight-aware timing and clear transfer requirements.',
    price: 'From AED 149',
    packages: [
      ['Airport pickup', 'Meet-and-greet pickup with destination transfer.', 'From AED 149'],
      ['Airport drop-off', 'Pre-booked transfer with scheduled collection.', 'From AED 149'],
      ['Chauffeur premium', 'Premium vehicle with professional driver and wait allowance.', 'From AED 299'],
      ['Rental handover', 'Coordinate a rental vehicle handover at the selected terminal.', 'Vehicle dependent'],
    ],
    benefits: [
      ['Flight-aware timing', 'The production API can attach flight details to adjust arrival handling.'],
      ['Clear pickup point', 'Capture terminal and location notes before the transfer.'],
      ['Rental integration', 'Airport service can connect directly to a DriveX rental booking.'],
      ['Premium support', 'Use one request record for driver, timing and transfer requirements.'],
    ],
    process: [
      ['Add travel details', 'Choose date, time, airport/location and passenger context.'],
      ['Confirm the transfer', 'Receive a structured request and provider confirmation.'],
      ['Meet and move', 'Connect final driver and vehicle details to the dashboard when a live backend is attached.'],
    ],
    faq: [
      ['Can I receive a rental car at the airport?', 'Yes. The platform supports rental handover as part of the airport journey.'],
      ['Can I add flight details?', 'The booking request can be extended with flight number and terminal fields when the production provider API is connected.'],
      ['Is waiting time included?', 'Final waiting-time rules should come from the selected transfer provider and be shown in the confirmed quote.'],
      ['Can I book for another passenger?', 'The customer and passenger schema can be separated in the production integration if the traveler is different from the account holder.'],
    ],
  },
  ar: {
    eyebrow: 'نقل المطار',
    title: 'من المطار إلى وجهتك بدون تعقيد.',
    description: 'احجز استقبالاً أو توصيلاً للمطار أو استلام سيارة إيجار مع توقيت مرتبط بالرحلة ومتطلبات نقل واضحة.',
    price: 'ابتداءً من 149 درهم',
    packages: [
      ['استقبال من المطار', 'استقبال عند الوصول ونقل إلى الوجهة.', 'ابتداءً من 149 درهم'],
      ['توصيل إلى المطار', 'نقل محجوز مسبقاً مع موعد استلام محدد.', 'ابتداءً من 149 درهم'],
      ['سائق بريميوم', 'سيارة مميزة مع سائق محترف ووقت انتظار.', 'ابتداءً من 299 درهم'],
      ['تسليم سيارة إيجار', 'تنسيق تسليم سيارة الإيجار في مبنى المطار المحدد.', 'حسب السيارة'],
    ],
    benefits: [
      ['توقيت مرتبط بالرحلة', 'يمكن ربط بيانات الرحلة لضبط توقيت الاستقبال عند وصولك.'],
      ['نقطة استلام واضحة', 'حدد مبنى المطار وتعليمات الموقع قبل الرحلة.'],
      ['تكامل مع التأجير', 'يمكن ربط خدمة المطار مباشرةً بحجز إيجار من درايف إكس.'],
      ['دعم مميز', 'طلب واحد يجمع بيانات السائق والتوقيت ومتطلبات النقل.'],
    ],
    process: [
      ['أضف تفاصيل الرحلة', 'اختر التاريخ والوقت والمطار أو الموقع وبيانات الركاب.'],
      ['أكد النقل', 'استلم طلباً منظماً وتأكيداً من مقدم الخدمة.'],
      ['الاستقبال والانطلاق', 'تُربط بيانات السائق والسيارة النهائية بلوحة التحكم عند تفعيل النظام الحي.'],
    ],
    faq: [
      ['هل يمكن استلام سيارة إيجار في المطار؟', 'نعم. تدعم المنصة تسليم سيارات الإيجار ضمن خدمة المطار.'],
      ['هل يمكن إضافة رقم الرحلة؟', 'يمكن توسيع الطلب برقم الرحلة ومبنى المطار عند توصيل API الخاص بمقدم الخدمة.'],
      ['هل وقت الانتظار مشمول؟', 'تظهر قواعد الانتظار النهائية وفق مقدم الخدمة المختار داخل عرض السعر المؤكد.'],
      ['هل يمكن الحجز لشخص آخر؟', 'يمكن فصل بيانات صاحب الحساب عن المسافر في التكامل الإنتاجي عند الحاجة.'],
    ],
  },
}

export default function AirportServicePage() {
  const { lang } = useLang()
  const c = COPY[lang] || COPY.en
  return <ServiceDetailPage slug="airport" {...c} heroImage="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2200&q=86" startingPrice={c.price} />
}
