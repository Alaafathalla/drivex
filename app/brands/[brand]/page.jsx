import { cookies } from 'next/headers'
import { VehicleCollection } from '@/components/platform/vehicle-collection'
import { t as translate } from '@/lib/i18n'

const BRAND_MAP = {
  bmw: 'BMW',
  'mercedes-benz': 'Mercedes-Benz',
  audi: 'Audi',
  porsche: 'Porsche',
  tesla: 'Tesla',
  'range-rover': 'Range Rover',
  'land-rover': 'Land Rover',
  toyota: 'Toyota',
  lexus: 'Lexus',
  nissan: 'Nissan',
}

export default async function BrandPage({ params }) {
  const { brand } = await params
  const cookieStore = await cookies()
  const lang = cookieStore.get('drivex_lang')?.value === 'ar' ? 'ar' : 'en'
  const decoded = decodeURIComponent(brand)
  const label = BRAND_MAP[decoded.toLowerCase()] || decoded
  const title = lang === 'ar' ? `سيارات ${label}` : `${label} inventory`
  const description = lang === 'ar'
    ? `تصفح سيارات ${label} المتاحة للبيع والإيجار مع أدوات التمويل والمقارنة والخدمات في تجربة واحدة.`
    : `Browse available ${label} vehicles across sale and rental listings with finance, comparison and service tools connected.`

  return (
    <VehicleCollection
      eyebrow={translate('collection_brand_eyebrow', lang)}
      title={title}
      description={description}
      filters={{ brand: label }}
    />
  )
}
