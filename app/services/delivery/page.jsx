'use client'

import { ServiceDetailPage } from '@/components/platform/service-detail-page'
import { useLang } from '@/context/LangContext'

const COPY = {
  en: {
    eyebrow: 'Vehicle delivery',
    title: 'Move the car without adding friction.',
    description: 'Coordinate vehicle pickup, protected transport and destination handover for purchases, rentals, service visits and private transfers.',
    price: 'From AED 199',
    packages: [
      ['Local handover', 'Point-to-point vehicle handover within the supported city.', 'From AED 199'],
      ['Protected transport', 'Transport coordination for vehicles that should not be driven.', 'From AED 399'],
      ['Dealer collection', 'Collection from a dealer or seller with destination handover.', 'From AED 249'],
      ['Multi-vehicle logistics', 'Coordinated transport for fleets, events or dealer inventory.', 'Custom quote'],
    ],
    benefits: [
      ['Pickup and destination', 'Capture both sides of the handover in one structured request.'],
      ['Vehicle context', 'Record vehicle type and special handling requirements before assignment.'],
      ['Status-ready tracking', 'The request ID can map to collected, in-transit and delivered states.'],
      ['Connected journeys', 'Use delivery as an add-on to buying, renting, inspection or service.'],
    ],
    process: [
      ['Set the route', 'Share pickup, destination, timing and vehicle details.'],
      ['Confirm transport type', 'A logistics partner confirms suitable handling and quote.'],
      ['Track handover', 'Connect pickup confirmation and destination handover to the request record.'],
    ],
    faq: [
      ['Can delivery be added to a car purchase?', 'Yes. Delivery is designed to connect with a listing, transaction or standalone request.'],
      ['Can you transport a non-running vehicle?', 'Potentially. Note the condition so a suitable recovery/transport provider can be assigned.'],
      ['Can I choose an exact delivery window?', 'Preferred date/time are captured in the request. Final slot depends on partner availability and route.'],
      ['Is insurance included?', 'Final transport liability and insurance terms should be shown by the selected provider before confirmation.'],
    ],
  },
  ar: {
    eyebrow: 'توصيل السيارات',
    title: 'انقل سيارتك بسهولة ومن غير تعقيد.',
    description: 'نسّق استلام السيارة والنقل الآمن والتسليم للشراء أو الإيجار أو الصيانة أو النقل الخاص من خلال طلب واحد.',
    price: 'ابتداءً من 199 درهم',
    packages: [
      ['تسليم داخل المدينة', 'استلام وتسليم من نقطة إلى نقطة داخل المدن المدعومة.', 'ابتداءً من 199 درهم'],
      ['نقل محمي', 'تنسيق نقل آمن للسيارات التي لا يُفضّل قيادتها على الطريق.', 'ابتداءً من 399 درهم'],
      ['استلام من الوكيل', 'استلام من الوكيل أو البائع ثم التسليم في وجهتك.', 'ابتداءً من 249 درهم'],
      ['نقل عدة سيارات', 'تنسيق نقل للأساطيل أو الفعاليات أو مخزون الوكلاء.', 'عرض سعر مخصص'],
    ],
    benefits: [
      ['استلام ووجهة واضحة', 'سجّل طرفي عملية التسليم في طلب منظم واحد.'],
      ['تفاصيل السيارة', 'أضف نوع السيارة ومتطلبات التعامل الخاصة قبل إسناد الطلب.'],
      ['تتبع حالة الطلب', 'يمكن تتبع الطلب من الاستلام إلى النقل ثم التسليم.'],
      ['مرتبط بخدماتك', 'أضف التوصيل إلى الشراء أو الإيجار أو الفحص أو الصيانة.'],
    ],
    process: [
      ['حدد المسار', 'أرسل مكان الاستلام والوجهة والموعد وبيانات السيارة.'],
      ['تأكيد نوع النقل', 'يؤكد شريك الخدمات اللوجستية طريقة النقل المناسبة والسعر.'],
      ['تابع التسليم', 'تتبع تأكيد الاستلام والتسليم النهائي ضمن نفس الطلب.'],
    ],
    faq: [
      ['هل يمكن إضافة التوصيل لشراء سيارة؟', 'نعم. يمكن ربط التوصيل بإعلان أو معاملة أو طلب مستقل.'],
      ['هل يمكن نقل سيارة لا تعمل؟', 'يمكن ذلك حسب الحالة. اذكر وضع السيارة حتى يتم اختيار ناقلة أو خدمة سحب مناسبة.'],
      ['هل أستطيع اختيار وقت تسليم محدد؟', 'يمكنك تحديد التاريخ والوقت المفضل، ويعتمد الموعد النهائي على توفر الشريك والمسار.'],
      ['هل التأمين مشمول؟', 'يتم توضيح مسؤولية النقل وشروط التأمين النهائية من مقدم الخدمة قبل التأكيد.'],
    ],
  },
}

export default function VehicleDeliveryPage() {
  const { lang } = useLang()
  const c = COPY[lang] || COPY.en
  return <ServiceDetailPage slug="delivery" {...c} heroImage="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=2200&q=86" startingPrice={c.price} />
}
