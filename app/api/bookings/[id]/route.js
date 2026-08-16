import { fail, fromError, ok } from '@/lib/api-response'
import { marketplaceApi } from '@/lib/marketplace-api'

export async function GET(_request, context) {
  try {
    const { id } = await context.params
    return ok(await marketplaceApi.getBookingById(id))
  } catch (error) { return fromError(error) }
}

export async function PATCH(request, context) {
  try {
    const { id } = await context.params
    const payload = await request.json()
    if (payload.action !== 'cancel') return fail('Unsupported booking action', 422)
    return ok(await marketplaceApi.cancelBooking(id))
  } catch (error) { return fromError(error) }
}
