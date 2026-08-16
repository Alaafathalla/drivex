import { created, fromError, ok } from '@/lib/api-response'
import { marketplaceApi } from '@/lib/marketplace-api'

export async function GET() {
  try { return ok(await marketplaceApi.getBookings()) }
  catch (error) { return fromError(error) }
}

export async function POST(request) {
  try { return created(await marketplaceApi.createBooking(await request.json())) }
  catch (error) { return fromError(error) }
}
