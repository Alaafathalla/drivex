import { LegalPage } from '@/components/platform/legal-page'

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      arEyebrow="إمكانية الوصول"
      title="An automotive platform designed for more people."
      arTitle="منصة سيارات مصممة لخدمة الجميع بسهولة."
      sections={[
        ['Keyboard access', 'Primary navigation, dialogs, buttons and form controls should remain operable by keyboard, with visible focus states.'],
        ['Structure and contrast', 'The interface uses semantic headings, explicit labels and high-contrast primary actions; production QA should verify both light and dark themes.'],
        ['Motion preferences', 'Animation is used for feedback and orientation rather than essential information. A production accessibility pass should honor reduced-motion preferences across all custom animations.'],
        ['Feedback', 'Accessibility issues should be reportable through the contact route so barriers can be reproduced and prioritized.'],
      ]}
      arSections={[
        ['استخدام لوحة المفاتيح', 'يجب أن تظل القوائم الرئيسية والنوافذ والأزرار وعناصر النماذج قابلة للاستخدام بلوحة المفاتيح مع إظهار حالة التركيز بوضوح.'],
        ['البنية والتباين', 'تستخدم الواجهة عناوين دلالية وتسميات واضحة وإجراءات رئيسية عالية التباين، ويجب التحقق من ذلك في الوضعين الفاتح والداكن قبل النشر.'],
        ['تفضيلات الحركة', 'تُستخدم الحركة للتغذية الراجعة والتوجيه وليست لنقل معلومات أساسية. ويجب احترام تفضيل تقليل الحركة في جميع الرسوم المخصصة.'],
        ['الملاحظات', 'يمكن الإبلاغ عن مشكلات إمكانية الوصول من خلال صفحة التواصل حتى يمكن إعادة المشكلة وتحديد أولويتها.'],
      ]}
    />
  )
}
