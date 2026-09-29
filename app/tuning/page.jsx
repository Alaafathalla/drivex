'use client'

import { ServiceDetailPage } from '@/components/platform/service-detail-page'
import { useLang } from '@/context/LangContext'

const COPY = {
  en: {
    eyebrow: 'Performance & tuning',
    title: 'Upgrade the response, not the uncertainty.',
    description: 'Book diagnostics, calibration and performance-upgrade consultation with a clear baseline, scope and partner workflow.',
    price: 'From AED 399',
    packages: [
      ['Performance diagnostic', 'Baseline scan, health checks and upgrade-readiness review.', 'From AED 399'],
      ['ECU consultation', 'Calibration consultation based on supported vehicle and goal.', 'From AED 699'],
      ['Handling setup', 'Suspension, alignment and handling-focused consultation.', 'From AED 599'],
      ['Full build plan', 'Structured upgrade roadmap covering performance, cooling and supporting hardware.', 'Custom quote'],
    ],
    benefits: [
      ['Baseline first', 'Assess vehicle health before recommending any performance change.'],
      ['Goal-based scope', 'Capture daily-driving, track or response goals before quoting work.'],
      ['Transparent compatibility', 'Keep supported hardware, calibration and warranty implications explicit.'],
      ['Recorded upgrades', 'Connect approved modifications to the vehicle service history.'],
    ],
    process: [
      ['Define the goal', 'Share vehicle, current setup and the outcome you want.'],
      ['Diagnose and quote', 'A suitable performance partner reviews compatibility and scope.'],
      ['Approve and record', 'Confirm the work and keep the completed upgrade details connected to the car.'],
    ],
    faq: [
      ['Do you tune every vehicle?', 'No. Compatibility depends on the vehicle, engine, current software/hardware and provider capability.'],
      ['Will tuning affect warranty?', 'It can. Warranty and regulatory implications should be confirmed before any modification is approved.'],
      ['Can I request suspension upgrades only?', 'Yes. Use the notes field to describe handling, ride-height or alignment goals.'],
      ['Are performance results guaranteed?', 'No. Outcomes depend on vehicle condition, hardware, environment and the exact approved calibration.'],
    ],
  },
  ar: {
    eyebrow: 'الأداء والتعديل',
    title: 'طوّر استجابة سيارتك بثقة ووضوح.',
    description: 'احجز فحصاً وتشخيصاً وضبطاً واستشارة لتطوير الأداء مع خط أساس واضح ونطاق عمل محدد وشريك متخصص.',
    price: 'ابتداءً من 399 درهم',
    packages: [
      ['فحص الأداء', 'فحص مبدئي وحالة السيارة وتقييم جاهزيتها لأي تطوير.', 'ابتداءً من 399 درهم'],
      ['استشارة برمجة ECU', 'استشارة ضبط وبرمجة حسب السيارة المدعومة والهدف المطلوب.', 'ابتداءً من 699 درهم'],
      ['إعداد التحكم والثبات', 'استشارة للتعليق والزوايا وتحسين الثبات والتحكم.', 'ابتداءً من 599 درهم'],
      ['خطة تطوير متكاملة', 'خارطة تطوير تشمل الأداء والتبريد والمكونات الداعمة.', 'عرض سعر مخصص'],
    ],
    benefits: [
      ['الفحص أولاً', 'نتأكد من حالة السيارة قبل اقتراح أي تعديل في الأداء.'],
      ['تطوير حسب هدفك', 'نحدد هل الهدف قيادة يومية أو حلبة أو استجابة أفضل قبل التسعير.'],
      ['توافق واضح', 'توضيح المكونات المدعومة والبرمجة وتأثيرها المحتمل على الضمان.'],
      ['سجل للتعديلات', 'ربط التعديلات المعتمدة بسجل صيانة السيارة.'],
    ],
    process: [
      ['حدد هدفك', 'أرسل بيانات السيارة ووضعها الحالي والنتيجة التي تريد الوصول إليها.'],
      ['التشخيص وعرض السعر', 'يراجع شريك الأداء المناسب التوافق ونطاق العمل.'],
      ['الموافقة والتوثيق', 'أكد التنفيذ واحتفظ بتفاصيل التعديل ضمن سجل السيارة.'],
    ],
    faq: [
      ['هل يتم تعديل كل السيارات؟', 'لا. يعتمد الأمر على السيارة والمحرك والبرمجيات والمكونات الحالية وقدرات مزود الخدمة.'],
      ['هل التعديل يؤثر على الضمان؟', 'قد يحدث ذلك، لذلك يجب تأكيد آثار الضمان واللوائح قبل اعتماد أي تعديل.'],
      ['هل يمكن طلب تعديل التعليق فقط؟', 'نعم. اكتب هدفك بخصوص الثبات أو الارتفاع أو الزوايا في الملاحظات.'],
      ['هل نتائج الأداء مضمونة؟', 'لا. تعتمد النتائج على حالة السيارة والمكونات والبيئة والبرمجة المعتمدة.'],
    ],
  },
}

export default function TuningPage() {
  const { lang } = useLang()
  const c = COPY[lang] || COPY.en
  return <ServiceDetailPage slug="tuning" {...c} heroImage="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=2200&q=86" startingPrice={c.price} />
}
