export function PriceBreakdown({ breakdown }) {
  const { days, dailyRate, base, insurance, service, extras = 0, tax, discount, total } = breakdown
  const rows = [
    { label: `$${dailyRate}/day × ${days} day${days !== 1 ? 's' : ''}`, value: base },
    { label: 'Insurance', value: insurance },
    { label: 'Service fee', value: service },
    ...(extras ? [{ label: 'Selected services', value: extras }] : []),
    ...(discount ? [{ label: 'Discount', value: -discount, green: true }] : []),
    { label: 'Tax (8%)', value: tax },
  ]
  return <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white"><div className="border-b border-gray-100 px-4 py-4"><p className="font-bold text-gray-900">Price Breakdown</p></div><div className="space-y-3 px-4 py-4">{rows.map((row) => <div key={row.label} className="flex items-center justify-between text-[13px]"><span className="text-gray-500">{row.label}</span><span className={`font-semibold ${row.green ? 'text-green-600' : 'text-gray-900'}`}>{row.value < 0 ? '-' : ''}${Math.abs(row.value)}</span></div>)}</div><div className="flex items-center justify-between border-t border-gray-200 bg-green-50 px-4 py-4"><p className="font-bold text-gray-900">Total</p><p className="text-[22px] font-black text-green-600">${total}</p></div></div>
}
