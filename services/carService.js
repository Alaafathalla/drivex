import { marketplaceApi } from '@/lib/marketplace-api'

export const carService = {
  getCars: (filters)     => marketplaceApi.getCars(filters),
  getCarById: (id)       => marketplaceApi.getCarById(id),
  getRelatedCars: (id)   => marketplaceApi.getRelatedCars(id),
  createListing: (data)  => marketplaceApi.createListing(data),
  updateListing: (id, d) => marketplaceApi.updateListing(id, d),
  deleteListing: (id)    => marketplaceApi.deleteListing(id),
  getMyListings: ()      => marketplaceApi.getMyListings(),
  getBrands: ()          => marketplaceApi.getBrands(),
  getLocations: ()       => marketplaceApi.getLocations(),
}
