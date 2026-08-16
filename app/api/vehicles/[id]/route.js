import { fromError, ok } from '@/lib/api-response'
import { marketplaceApi } from '@/lib/marketplace-api'

export async function GET(_request, context) {
  try {
    const { id } = await context.params
    return ok(await marketplaceApi.getCarById(id))
  } catch (error) {
    return fromError(error)
  }
}

export async function PATCH(request, context) {
  try {
    const { id } = await context.params
    const payload = await request.json()
    return ok(await marketplaceApi.updateListing(id, payload))
  } catch (error) {
    return fromError(error)
  }
}

export async function DELETE(_request, context) {
  try {
    const { id } = await context.params
    return ok(await marketplaceApi.deleteListing(id))
  } catch (error) {
    return fromError(error)
  }
}
