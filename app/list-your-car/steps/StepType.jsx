import { motion } from 'framer-motion'
import { Car, KeyRound } from 'lucide-react'

export function StepType({ data, update }) {
  const types = [
    { id: 'rent', icon: KeyRound, title: 'Rent My Car', desc: 'List your car for daily, weekly or monthly rentals and earn passive income.' },
    { id: 'sale', icon: Car,      title: 'Sell My Car', desc: 'Reach thousands of verified buyers and get the best price for your car.' },
  ]
  return (
    <div>
      <h2 className="text-[18px] font-bold text-gray-900 mb-2">What would you like to do?</h2>
      <p className="text-[14px] text-gray-500 mb-7">Choose how you want to list your vehicle.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {types.map(({ id, icon: Icon, title, desc }) => (
          <motion.button key={id} onClick={() => update({ listingType: id })}
            whileTap={{ scale: .97 }}
            className={`flex flex-col items-start gap-4 rounded-2xl border-2 p-6 text-left transition ${
              data.listingType === id
                ? 'border-[#B5E92E] bg-[#f5fde7] shadow-sm shadow-[#B5E92E]/20'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}>
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${data.listingType === id ? 'bg-[#e8f9b0]' : 'bg-gray-100'}`}>
              <Icon size={22} className={data.listingType === id ? 'text-[#4a7000]' : 'text-gray-500'} />
            </div>
            <div>
              <p className={`text-[16px] font-black ${data.listingType === id ? 'text-[#3a5500]' : 'text-gray-900'}`}>{title}</p>
              <p className="mt-1 text-[13px] leading-6 text-gray-500">{desc}</p>
            </div>
            {data.listingType === id && (
              <div className="mt-1 h-2 w-2 rounded-full bg-[#B5E92E]" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
