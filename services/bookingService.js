import { marketplaceApi } from '@/lib/marketplace-api'

export const bookingService = {
  getBookings:    ()     => marketplaceApi.getBookings(),
  getBookingById: (id)   => marketplaceApi.getBookingById(id),
  createBooking:  (data) => marketplaceApi.createBooking(data),
  cancelBooking:  (id)   => marketplaceApi.cancelBooking(id),
}

/**
 * Calculate rental pricing breakdown.
 */
export function calcRental({ dailyRate = 0, days = 1 }) {
  const base     = dailyRate * days
  const insurance = Math.round(days * 10)
  const service  = 20
  const tax      = Math.round((base + insurance + service) * 0.08)
  const total    = base + insurance + service + tax
  return { base, days, dailyRate, insurance, service, tax, discount: 0, total }
}
