import { clientApi } from '@/lib/client-api'

export const carService = {
  getCars(filters = {}) {
    return clientApi.get('/api/vehicles', filters)
  },
  getCarById(id) {
    return clientApi.get(`/api/vehicles/${id}`)
  },
  getRelatedCars(id, limit = 4) {
    return clientApi.get('/api/vehicles', { relatedTo: id, limit })
  },
  createListing(payload) {
    return clientApi.post('/api/vehicles', payload)
  },
  updateListing(id, payload) {
    return clientApi.patch(`/api/vehicles/${id}`, payload)
  },
  deleteListing(id) {
    return clientApi.delete(`/api/vehicles/${id}`)
  },
  getMyListings() {
    return clientApi.get('/api/vehicles', { mine: 1, limit: 100 })
  },
  getMeta() {
    return clientApi.get('/api/meta')
  },
  search(query) {
    return clientApi.get('/api/search', { q: query })
  },
}
