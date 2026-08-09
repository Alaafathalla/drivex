import { Check } from 'lucide-react'

export function Stepper({ steps, current }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const idx = i + 1
        const done = idx < current
        const active = idx === current
        return (
          <div key={step} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-[13px] font-black transition-all duration-300 ${
                done   ? 'border-green-500 bg-green-500 text-white' :
                active ? 'border-green-500 bg-white text-green-600 shadow-[0_0_0_4px_#dcfce7]' :
                         'border-gray-200 bg-white text-gray-400'
              }`}>
                {done ? <Check size={15} /> : idx}
              </div>
              <p className={`mt-1.5 hidden text-center text-[10px] font-semibold sm:block ${
                active ? 'text-green-600' : done ? 'text-gray-500' : 'text-gray-300'
              }`}>
                {step}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div className={`mx-1 h-0.5 flex-1 transition-all duration-500 ${done ? 'bg-green-400' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
