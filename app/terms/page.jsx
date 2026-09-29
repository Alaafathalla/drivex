import { LegalPage } from '@/components/platform/legal-page'

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Platform terms"
      arEyebrow="شروط المنصة"
      title="The rules for using DriveX."
      arTitle="قواعد وشروط استخدام درايف إكس."
      sections={[
        ['Marketplace role', 'DriveX provides discovery, comparison, booking and workflow tools. Final vehicle, finance and service contracts may be entered into with third-party providers.'],
        ['Listings', 'Sellers are responsible for accurate vehicle information, lawful ownership/authority and disclosure of material information required by the applicable market.'],
        ['Rentals and services', 'Availability, deposits, cancellation rules, driver requirements and final service scope are confirmed by the relevant provider before completion.'],
        ['Finance estimates', 'Calculator outputs are indicative and are not credit approval, a regulated lending offer or a guarantee of rate or payment.'],
        ['Acceptable use', 'Users must not misuse platform data, submit fraudulent requests, interfere with service operation or use the platform for unlawful activity.'],
      ]}
      arSections={[
        ['دور المنصة', 'توفر درايف إكس أدوات لاكتشاف السيارات والمقارنة والحجز وإدارة الطلبات. وقد يتم إبرام العقود النهائية للسيارات أو التمويل أو الخدمات مباشرةً مع مزودي خدمات من أطراف ثالثة.'],
        ['الإعلانات', 'يتحمل البائع مسؤولية دقة معلومات السيارة وصحة الملكية أو التفويض والإفصاح عن المعلومات الجوهرية المطلوبة وفق السوق المعمول به.'],
        ['التأجير والخدمات', 'يتم تأكيد التوفر والتأمينات وسياسات الإلغاء ومتطلبات السائق ونطاق الخدمة النهائي بواسطة مقدم الخدمة المختص قبل إتمام الطلب.'],
        ['تقديرات التمويل', 'نتائج الحاسبة تقديرية ولا تُعد موافقة ائتمانية أو عرض تمويل منظم أو ضماناً لسعر الفائدة أو قيمة القسط.'],
        ['الاستخدام المقبول', 'يُحظر إساءة استخدام بيانات المنصة أو تقديم طلبات احتيالية أو تعطيل تشغيل الخدمة أو استخدام المنصة في أي نشاط غير قانوني.'],
      ]}
    />
  )
}
