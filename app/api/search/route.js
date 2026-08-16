import { ok } from '@/lib/api-response'
import { DB } from '@/lib/marketplace-api'

export async function GET(request) {
  const q = new URL(request.url).searchParams.get('q')?.trim().toLowerCase() || ''
  if (q.length < 2) return ok([])
  const results = DB.cars
    .filter((car) => `${car.brand} ${car.model} ${car.city} ${car.bodyType}`.toLowerCase().includes(q))
    .slice(0, 6)
    .map((car) => ({ id: car.id, label: `${car.brand} ${car.model}`, meta: `${car.year} · ${car.city}`, image: car.images?.[0], listingType: car.listingType }))
  return ok(results)
}
