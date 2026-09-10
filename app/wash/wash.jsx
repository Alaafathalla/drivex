'use client'

import { ServiceDetailPage } from '@/components/platform/service-detail-page'
import { useLang } from '@/context/LangContext'

export default function WashPage() {
  const { t } = useLang()

  return (
    <ServiceDetailPage
      slug="wash"
      eyebrow={t('svc_wash_eyebrow')}
      title={t('svc_wash_title')}
      description={t('svc_wash_desc')}
      heroImage="https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&w=2200&q=86"
      startingPrice={t('svc_wash_price')}
      packages={[
        [t('svc_wash_pkg1'), t('svc_wash_pkg1_desc'), t('svc_wash_pkg1_price')],
        [t('svc_wash_pkg2'), t('svc_wash_pkg2_desc'), t('svc_wash_pkg2_price')],
        [t('svc_wash_pkg3'), t('svc_wash_pkg3_desc'), t('svc_wash_pkg3_price')],
        [t('svc_wash_pkg4'), t('svc_wash_pkg4_desc'), t('svc_wash_pkg4_price')],
      ]}
      benefits={[
        [t('svc_wash_ben1'), t('svc_wash_ben1_desc')],
        [t('svc_wash_ben2'), t('svc_wash_ben2_desc')],
        [t('svc_wash_ben3'), t('svc_wash_ben3_desc')],
        [t('svc_wash_ben4'), t('svc_wash_ben4_desc')],
      ]}
      process={[
        [t('svc_wash_proc1'), t('svc_wash_proc1_desc')],
        [t('svc_wash_proc2'), t('svc_wash_proc2_desc')],
        [t('svc_wash_proc3'), t('svc_wash_proc3_desc')],
      ]}
      faq={[
        [t('svc_wash_faq1_q'), t('svc_wash_faq1_a')],
        [t('svc_wash_faq2_q'), t('svc_wash_faq2_a')],
        [t('svc_wash_faq3_q'), t('svc_wash_faq3_a')],
        [t('svc_wash_faq4_q'), t('svc_wash_faq4_a')],
      ]}
    />
  )
}
