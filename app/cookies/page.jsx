import { LegalPage } from '@/components/platform/legal-page'

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookies"
      arEyebrow="ملفات تعريف الارتباط"
      title="Storage used by the DriveX experience."
      arTitle="التخزين المستخدم في تجربة درايف إكس."
      sections={[
        ['Essential storage', 'The current frontend uses browser storage for language, theme, currency, favorites and listing drafts so those preferences persist across visits.'],
        ['Analytics', 'Production analytics should be configured to respect applicable consent and retention requirements.'],
        ['Third-party services', 'Payment, maps, identity, media or support integrations may introduce their own storage only after those providers are connected.'],
        ['Controls', 'Users can clear browser storage through their browser and a production consent manager can expose category-level cookie choices.'],
      ]}
      arSections={[
        ['التخزين الأساسي', 'تستخدم الواجهة الحالية تخزين المتصفح لحفظ اللغة والمظهر والعملة والمفضلة ومسودات الإعلانات حتى تستمر تفضيلاتك بين الزيارات.'],
        ['التحليلات', 'يجب إعداد أدوات التحليلات في النسخة الإنتاجية بما يحترم متطلبات الموافقة والاحتفاظ بالبيانات المعمول بها.'],
        ['خدمات الأطراف الثالثة', 'قد تستخدم تكاملات الدفع والخرائط والهوية والوسائط أو الدعم وسائل تخزين خاصة بها بعد توصيل تلك الخدمات بالمنصة.'],
        ['التحكم', 'يمكن للمستخدم مسح بيانات التخزين من إعدادات المتصفح، كما يمكن لنظام الموافقة الإنتاجي توفير خيارات ملفات الارتباط حسب الفئة.'],
      ]}
    />
  )
}
