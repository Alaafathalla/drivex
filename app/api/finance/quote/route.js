import { fail, ok } from '@/lib/api-response'

function calculate(payload = {}) {
  const vehiclePrice = Number(payload.price ?? payload.vehiclePrice)
  const down = Number(payload.downPayment ?? 0)
  const rate = Number(payload.annualRate ?? payload.interestRate ?? 0)
  const months = Number(payload.termMonths)

  if (![vehiclePrice, down, rate, months].every(Number.isFinite) || vehiclePrice <= 0 || down < 0 || down > vehiclePrice || rate < 0 || months <= 0) {
    return null
  }

  const principal = Math.max(0, vehiclePrice - down)
  const monthlyRate = rate / 100 / 12
  const monthly = monthlyRate === 0
    ? principal / months
    : principal * (monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1)
  const financedRepayments = monthly * months
  const totalPayment = financedRepayments + down

  return {
    vehiclePrice: Math.round(vehiclePrice),
    downPayment: Math.round(down),
    principal: Math.round(principal),
    monthlyPayment: Math.round(monthly),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(financedRepayments - principal),
    termMonths: months,
    annualRate: rate,
  }
}

export async function POST(request) {
  const result = calculate(await request.json())
  return result ? ok(result) : fail('Invalid finance inputs', 422)
}
