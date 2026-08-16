import { clientApi } from '@/lib/client-api'

export const paymentService = {
  pay(payload) {
    return clientApi.post('/api/payments', payload)
  },
}
