'use client'

import { ServiceDetailPage } from '@/components/platform/service-detail-page'
import { useLang } from '@/context/LangContext'

const COPY = {
  en: {
    eyebrow: 'Wedding car service',
    title: 'Arrive with the moment planned perfectly.',
    description: 'Coordinate a luxury vehicle, chauffeur, presentation and venue-timed arrival through one structured event transport request.',
    price: 'From AED 799',
    packages: [
      ['Signature', 'Luxury vehicle preparation and timed venue delivery.', 'From AED 799'],
      ['Chauffeur', 'Signature package plus professional chauffeur service.', 'From AED 1,199'],
      ['Premium ceremony', 'Extended chauffeur time, presentation setup and coordination.', 'From AED 1,799'],
      ['Multi-car arrival', 'Coordinated transport for the couple and wedding party.', 'Custom quote'],
    ],
    benefits: [
      ['Event-timed delivery', 'Coordinate vehicle preparation and handover around the ceremony schedule.'],
      ['Luxury selection', 'Connect the request with eligible premium and special-occasion inventory.'],
      ['Presentation details', 'Capture ribbon, decoration and access notes before confirmation.'],
      ['Single coordination record', 'Keep vehicle, driver, venue and timing requirements attached to one request.'],
    ],
    process: [
      ['Share the event plan', 'Add the wedding date, location, preferred vehicle and timing.'],
      ['Confirm package and car', 'A coordinator can confirm availability, inclusions and final pricing.'],
      ['Coordinate the arrival', 'Connect driver, vehicle and event timing to the final confirmed request.'],
    ],
    faq: [
      ['Can I request a specific vehicle?', 'Yes. Add the preferred model in the vehicle field or connect the request directly from eligible rental inventory.'],
      ['Is decoration included?', 'Package scope can include presentation coordination. Final decoration requirements should be confirmed in the quote.'],
      ['Can I book multiple cars?', 'Yes. Multi-car requests are supported as a custom quote and can be modeled as linked service items in production.'],
      ['Can the chauffeur wait during the event?', 'Chauffeur duration can be included in the confirmed package and final provider quote.'],
    ],
  },
  ar: {
    eyebrow: 'سيارات الزفاف',
    title: 'وصول يليق باللحظة ومخطط له بدقة.',
    description: 'نسّق سيارة فاخرة وسائقاً وتجهيزاً وموعد وصول متوافقاً مع الحفل من خلال طلب واحد منظم.',
    price: 'ابتداءً من 799 درهم',
    packages: [
      ['سيجنتشر', 'تجهيز سيارة فاخرة وتسليمها في موعد الحفل.', 'ابتداءً من 799 درهم'],
      ['مع سائق', 'باقة سيجنتشر مع سائق محترف.', 'ابتداءً من 1,199 درهم'],
      ['حفل بريميوم', 'وقت سائق أطول وتجهيزات وتنسيق للحضور.', 'ابتداءً من 1,799 درهم'],
      ['وصول بعدة سيارات', 'تنسيق سيارات للعروسين وفريق الحفل.', 'عرض سعر مخصص'],
    ],
    benefits: [
      ['تسليم حسب توقيت الحفل', 'ننسق تجهيز وتسليم السيارة وفق جدول المناسبة.'],
      ['اختيارات فاخرة', 'اربط الطلب بسيارات مميزة ومناسبة للمناسبات الخاصة.'],
      ['تفاصيل التجهيز', 'حدد الشريط والزينة وتعليمات الدخول قبل التأكيد.'],
      ['تنسيق موحد', 'اجمع السيارة والسائق والمكان والتوقيت في طلب واحد.'],
    ],
    process: [
      ['شارك خطة المناسبة', 'أضف التاريخ والموقع والسيارة المفضلة والموعد.'],
      ['أكد الباقة والسيارة', 'يؤكد المنسق التوفر والمزايا والسعر النهائي.'],
      ['نسّق الوصول', 'يتم ربط السائق والسيارة وتوقيت الحفل بالطلب المؤكد.'],
    ],
    faq: [
      ['هل يمكن طلب سيارة محددة؟', 'نعم. أضف الموديل المفضل أو اربط الطلب مباشرةً بسيارة مؤهلة من قسم التأجير.'],
      ['هل الزينة مشمولة؟', 'يمكن أن تشمل الباقة تنسيق التجهيز، ويتم تأكيد متطلبات الزينة النهائية في عرض السعر.'],
      ['هل يمكن حجز أكثر من سيارة؟', 'نعم. يتم دعم الطلبات متعددة السيارات بعرض سعر مخصص.'],
      ['هل يمكن للسائق الانتظار أثناء الحفل؟', 'يمكن تضمين مدة الانتظار ضمن الباقة النهائية وعرض مقدم الخدمة.'],
    ],
  },
}

export default function WeddingServicePage() {
  const { lang } = useLang()
  const c = COPY[lang] || COPY.en
  return <ServiceDetailPage slug="wedding" {...c} heroImage="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=2200&q=88" startingPrice={c.price} />
}
