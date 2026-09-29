import { notFound } from 'next/navigation'
import { ServiceDetailPage } from '@/components/platform/service-detail-page'
import { SERVICE_SLUGS } from '@/lib/service-details'

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export default async function SingleServicePage({ params }) {
  const { slug } = await params
  if (!SERVICE_SLUGS.includes(slug)) return notFound()
  return <ServiceDetailPage slug={slug} />
}
