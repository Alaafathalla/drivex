'use client'

import { ServiceDetailPage } from '@/components/platform/service-detail-page'
import { useLang } from '@/context/LangContext'

export default function MaintenancePage() {
  const { t } = useLang()

  return (
    <ServiceDetailPage
      slug="maintenance"
      eyebrow={t('svc_maint_eyebrow')}
      title={t('svc_maint_title')}
      description={t('svc_maint_desc')}
      heroImage="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=2200&q=86"
      startingPrice={t('svc_maint_price')}
      packages={[
        [t('svc_maint_pkg1'), t('svc_maint_pkg1_desc'), t('svc_maint_pkg1_price')],
        [t('svc_maint_pkg2'), t('svc_maint_pkg2_desc'), t('svc_maint_pkg2_price')],
        [t('svc_maint_pkg3'), t('svc_maint_pkg3_desc'), t('svc_maint_pkg3_price')],
        [t('svc_maint_pkg4'), t('svc_maint_pkg4_desc'), t('svc_maint_pkg4_price')],
      ]}
      benefits={[
        [t('svc_maint_ben1'), t('svc_maint_ben1_desc')],
        [t('svc_maint_ben2'), t('svc_maint_ben2_desc')],
        [t('svc_maint_ben3'), t('svc_maint_ben3_desc')],
        [t('svc_maint_ben4'), t('svc_maint_ben4_desc')],
      ]}
      process={[
        [t('svc_maint_proc1'), t('svc_maint_proc1_desc')],
        [t('svc_maint_proc2'), t('svc_maint_proc2_desc')],
        [t('svc_maint_proc3'), t('svc_maint_proc3_desc')],
      ]}
      faq={[
        [t('svc_maint_faq1_q'), t('svc_maint_faq1_a')],
        [t('svc_maint_faq2_q'), t('svc_maint_faq2_a')],
        [t('svc_maint_faq3_q'), t('svc_maint_faq3_a')],
        [t('svc_maint_faq4_q'), t('svc_maint_faq4_a')],
      ]}
    />
  )
}
