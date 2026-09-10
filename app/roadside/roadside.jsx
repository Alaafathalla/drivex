'use client'

import { ServiceDetailPage } from '@/components/platform/service-detail-page'
import { useLang } from '@/context/LangContext'

export default function RoadsidePage() {
  const { t } = useLang()

  return (
    <ServiceDetailPage
      slug="roadside"
      eyebrow={t('svc_road_eyebrow')}
      title={t('svc_road_title')}
      description={t('svc_road_desc')}
      heroImage="https://images.unsplash.com/photo-1597404294360-feeeda04612e?auto=format&fit=crop&w=2200&q=86"
      startingPrice={t('svc_road_price')}
      packages={[
        [t('svc_road_pkg1'), t('svc_road_pkg1_desc'), t('svc_road_pkg1_price')],
        [t('svc_road_pkg2'), t('svc_road_pkg2_desc'), t('svc_road_pkg2_price')],
        [t('svc_road_pkg3'), t('svc_road_pkg3_desc'), t('svc_road_pkg3_price')],
        [t('svc_road_pkg4'), t('svc_road_pkg4_desc'), t('svc_road_pkg4_price')],
      ]}
      benefits={[
        [t('svc_road_ben1'), t('svc_road_ben1_desc')],
        [t('svc_road_ben2'), t('svc_road_ben2_desc')],
        [t('svc_road_ben3'), t('svc_road_ben3_desc')],
        [t('svc_road_ben4'), t('svc_road_ben4_desc')],
      ]}
      process={[
        [t('svc_road_proc1'), t('svc_road_proc1_desc')],
        [t('svc_road_proc2'), t('svc_road_proc2_desc')],
        [t('svc_road_proc3'), t('svc_road_proc3_desc')],
      ]}
      faq={[
        [t('svc_road_faq1_q'), t('svc_road_faq1_a')],
        [t('svc_road_faq2_q'), t('svc_road_faq2_a')],
        [t('svc_road_faq3_q'), t('svc_road_faq3_a')],
        [t('svc_road_faq4_q'), t('svc_road_faq4_a')],
      ]}
    />
  )
}
