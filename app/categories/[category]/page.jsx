import { cookies } from 'next/headers'
import { VehicleCollection } from '@/components/platform/vehicle-collection'
import { t as translate } from '@/lib/i18n'

const MAP = {
  suv: { en: 'SUVs', ar: 'سيارات SUV', bodyType: 'SUV' },
  sedan: { en: 'Sedans', ar: 'سيارات سيدان', bodyType: 'Sedan' },
  electric: { en: 'Electric vehicles', ar: 'السيارات الكهربائية', fuelType: 'Electric' },
  sports: { en: 'Sports cars', ar: 'السيارات الرياضية', bodyType: 'Coupe' },
  luxury: { en: 'Luxury cars', ar: 'السيارات الفاخرة', minPrice: 50000 },
  '7-seater': { en: '7-seat vehicles', ar: 'سيارات 7 مقاعد', seats: 7 },
}

export default async function CategoryPage({ params }) {
  const { category } = await params
  const cookieStore = await cookies()
  const lang = cookieStore.get('drivex_lang')?.value === 'ar' ? 'ar' : 'en'
  const fallback = decodeURIComponent(category).replaceAll('-', ' ')
  const item = MAP[category] || { en: fallback, ar: fallback }
  const { en, ar, ...filters } = item
  const label = lang === 'ar' ? ar : en
  const description = lang === 'ar'
    ? `استكشف ${label} من الإعلانات الموثقة للبيع والإيجار، وقارن المواصفات والأسعار وخيارات الملكية بسهولة.`
    : `Explore ${label.toLowerCase()} across verified sale and rental listings, then compare specs, pricing and ownership options.`

  return (
    <VehicleCollection
      eyebrow={translate('collection_category_eyebrow', lang)}
      title={label}
      description={description}
      filters={filters}
    />
  )
}
