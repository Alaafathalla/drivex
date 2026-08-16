import { ok } from '@/lib/api-response'
import { DB } from '@/lib/marketplace-api'
import { RENTAL_CATEGORIES, RENTAL_LOCATIONS, SERVICE_CATALOG } from '@/lib/rental-catalog'

export async function GET() {
  const brands = [...new Set(DB.cars.map((car) => car.brand))].sort()
  const bodyTypes = [...new Set(DB.cars.map((car) => car.bodyType).filter(Boolean))].sort()
  const fuelTypes = [...new Set(DB.cars.map((car) => car.fuelType).filter(Boolean))].sort()
  const cities = [...new Set(DB.cars.map((car) => car.city).filter(Boolean))].sort()
  return ok({ brands, bodyTypes, fuelTypes, cities, rentalCategories: RENTAL_CATEGORIES, rentalLocations: RENTAL_LOCATIONS, services: SERVICE_CATALOG })
}
