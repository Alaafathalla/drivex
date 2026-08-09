import { CheckCircle2 } from 'lucide-react'

export function CarFeatures({ features = [] }) {
  if (!features.length) return null
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {features.map(f => (
        <div key={f} className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5">
          <CheckCircle2 size={15} className="shrink-0 text-green-500" />
          <span className="text-[13px] font-medium text-gray-700">{f}</span>
        </div>
      ))}
    </div>
  )
}
