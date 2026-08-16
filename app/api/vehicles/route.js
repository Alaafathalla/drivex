import { created, fromError, ok } from '@/lib/api-response'
import { marketplaceApi } from '@/lib/marketplace-api'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const params = Object.fromEntries(searchParams.entries())

    if (params.relatedTo) {
      return ok(await marketplaceApi.getRelatedCars(params.relatedTo, Number(params.limit || 4)))
    }
    if (params.mine === '1') {
      return ok(await marketplaceApi.getMyListings())
    }
    if (params.available === 'true') params.available = true
    if (params.available === 'false') params.available = false

    return ok(await marketplaceApi.getCars(params))
  } catch (error) {
    return fromError(error)
  }
}

export async function POST(request) {
  try {
    const payload = await request.json()
    return created(await marketplaceApi.createListing(payload))
  } catch (error) {
    return fromError(error)
  }
}
