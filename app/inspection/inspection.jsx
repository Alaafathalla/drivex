'use client'

import { ServiceDetailPage } from '@/components/platform/service-detail-page'
import { useLang } from '@/context/LangContext'

export default function InspectionPage() {
  const { t } = useLang()

  return (
    <ServiceDetailPage
      slug="inspection"
      eyebrow={t('svc_insp_eyebrow')}
      title={t('svc_insp_title')}
      description={t('svc_insp_desc')}
      heroImage="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2200&q=86"
      startingPrice={t('svc_insp_price')}
      packages={[
        [t('svc_insp_pkg1'), t('svc_insp_pkg1_desc'), t('svc_insp_pkg1_price')],
        [t('svc_insp_pkg2'), t('svc_insp_pkg2_desc'), t('svc_insp_pkg2_price')],
        [t('svc_insp_pkg3'), t('svc_insp_pkg3_desc'), t('svc_insp_pkg3_price')],
        [t('svc_insp_pkg4'), t('svc_insp_pkg4_desc'), t('svc_insp_pkg4_price')],
      ]}
      benefits={[
        [t('svc_insp_ben1'), t('svc_insp_ben1_desc')],
        [t('svc_insp_ben2'), t('svc_insp_ben2_desc')],
        [t('svc_insp_ben3'), t('svc_insp_ben3_desc')],
        [t('svc_insp_ben4'), t('svc_insp_ben4_desc')],
      ]}
      process={[
        [t('svc_insp_proc1'), t('svc_insp_proc1_desc')],
        [t('svc_insp_proc2'), t('svc_insp_proc2_desc')],
        [t('svc_insp_proc3'), t('svc_insp_proc3_desc')],
      ]}
      faq={[
        [t('svc_insp_faq1_q'), t('svc_insp_faq1_a')],
        [t('svc_insp_faq2_q'), t('svc_insp_faq2_a')],
        [t('svc_insp_faq3_q'), t('svc_insp_faq3_a')],
        [t('svc_insp_faq4_q'), t('svc_insp_faq4_a')],
      ]}
    />
  )
}
