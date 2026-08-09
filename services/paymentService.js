import { marketplaceApi } from '@/lib/marketplace-api'

export const paymentService = {
  pay: (data) => marketplaceApi.processPayment(data),
}
