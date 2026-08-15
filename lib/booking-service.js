export function calcRental({ dailyRate = 0, days = 1, addons = 0 }) {
  const base = dailyRate * days
  const insurance = Math.round(days * 10)
  const service = 20
  const extras = Number(addons) || 0
  const tax = Math.round(
    (base + insurance + service + extras) * 0.08
  )

  const total = base + insurance + service + extras + tax

  return {
    base,
    days,
    dailyRate,
    insurance,
    service,
    extras,
    tax,
    discount: 0,
    total,
  }
}