import { LegalPage } from '@/components/platform/legal-page'

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      arEyebrow="الخصوصية"
      title="How DriveX handles platform data."
      arTitle="كيف تتعامل درايف إكس مع بيانات المنصة."
      sections={[
        ['Information you provide', 'Account, listing, booking, service and contact information is used to operate the platform experience and the transaction or request you initiate.'],
        ['Vehicle and transaction data', 'Vehicle specifications, favorites, comparisons, booking records and service requests may be stored so the platform can provide continuity across journeys.'],
        ['Service providers', 'A production deployment may share the minimum necessary request information with dealers, rental companies, payment providers, lenders or service partners involved in the selected journey.'],
        ['Your choices', 'Production authentication should expose account controls for profile data, communication preferences and applicable data-access or deletion requests.'],
        ['Security and retention', 'Backend integrations should apply least-privilege access, encrypted transport, appropriate retention rules and audit logging for sensitive actions.'],
      ]}
      arSections={[
        ['المعلومات التي تقدمها', 'تُستخدم بيانات الحساب والإعلانات والحجوزات والخدمات والتواصل لتشغيل تجربة المنصة وتنفيذ المعاملة أو الطلب الذي تبدأه.'],
        ['بيانات السيارات والمعاملات', 'قد يتم حفظ مواصفات السيارات والمفضلة والمقارنات وسجلات الحجز وطلبات الخدمات لضمان استمرارية تجربتك عبر المنصة.'],
        ['مزودو الخدمات', 'قد تشارك النسخة الإنتاجية الحد الأدنى من بيانات الطلب مع الوكلاء وشركات التأجير ومزودي الدفع والتمويل أو شركاء الخدمة المرتبطين بالرحلة التي اخترتها.'],
        ['اختياراتك', 'يجب أن تتيح المصادقة في النسخة الإنتاجية التحكم في بيانات الملف الشخصي وتفضيلات التواصل وطلبات الوصول إلى البيانات أو حذفها حيثما ينطبق ذلك.'],
        ['الأمان والاحتفاظ', 'يجب أن تستخدم تكاملات الخادم صلاحيات محدودة ونقلاً مشفراً وسياسات احتفاظ مناسبة وسجلات تدقيق للإجراءات الحساسة.'],
      ]}
    />
  )
}
