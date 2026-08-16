import { created, fromError } from '@/lib/api-response'
import { marketplaceApi } from '@/lib/marketplace-api'

export async function POST(request) {
  try { return created(await marketplaceApi.processPayment(await request.json())) }
  catch (error) { return fromError(error) }
}
