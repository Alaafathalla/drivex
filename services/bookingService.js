import { clientApi } from '@/lib/client-api'

export const bookingService = {
  getBookings() {
    return clientApi.get('/api/bookings')
  },
  getBookingById(id) {
    return clientApi.get(`/api/bookings/${id}`)
  },
  createBooking(payload) {
    return clientApi.post('/api/bookings', payload)
  },
  cancelBooking(id) {
    return clientApi.patch(`/api/bookings/${id}`, { action: 'cancel' })
  },
}
