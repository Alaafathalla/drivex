import { created, fail } from '@/lib/api-response'
import { SERVICE_CATALOG } from '@/lib/rental-catalog'

export async function POST(request) {
  const payload = await request.json()
  const service = SERVICE_CATALOG.find((item) => item.slug === payload.service)
  if (!service) return fail('Unknown service', 404)
  if (!payload.date || !payload.location || !payload.name || !payload.phone) return fail('Date, location, name and phone are required', 422)
  return created({
    id: `SRV-${Date.now().toString().slice(-7)}`,
    status: 'requested',
    service: service.slug,
    serviceTitle: service.title,
    ...payload,
    createdAt: new Date().toISOString(),
  })
}
