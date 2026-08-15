import { CalendarDays, MapPin } from 'lucide-react'

export function BookingSummary({ car, booking, compact = false }) {
  if (!car || !booking) return null
  const image = car.images?.[0] || car.image
  const title = car.name || [car.brand, car.model].filter(Boolean).join(' ')
  return (
    <div className={`overflow-hidden rounded-2xl border border-gray-200 bg-white ${compact ? '' : 'shadow-sm'}`}>
      <div className="flex gap-3 border-b border-gray-100 p-4">
        <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">{image && <img src={image} alt={title} className="h-full w-full object-cover" />}</div>
        <div className="min-w-0"><p className="truncate font-bold text-gray-900">{title}</p><p className="text-[12px] text-gray-400">{car.year} · {car.transmission}</p><div className="mt-1 flex items-center gap-1 text-[11px] text-gray-400"><MapPin size={10} />{car.city || booking.pickupLocation}</div></div>
      </div>
      <div className="space-y-2.5 p-4">
        <div className="flex items-start gap-2.5"><CalendarDays size={15} className="mt-0.5 shrink-0 text-green-500" /><div><p className="text-[11px] text-gray-400">Pickup</p><p className="text-[13px] font-semibold text-gray-900">{booking.pickupDate} {booking.pickupTime && `· ${booking.pickupTime}`}</p><p className="text-[11px] text-gray-500">{booking.pickupLocation}</p></div></div>
        <div className="h-px bg-gray-100" />
        <div className="flex items-start gap-2.5"><CalendarDays size={15} className="mt-0.5 shrink-0 text-rose-400" /><div><p className="text-[11px] text-gray-400">Return</p><p className="text-[13px] font-semibold text-gray-900">{booking.returnDate} {booking.returnTime && `· ${booking.returnTime}`}</p><p className="text-[11px] text-gray-500">{booking.dropoffLocation}</p></div></div>
      </div>
      {booking.total && <div className="flex items-center justify-between border-t border-gray-100 bg-green-50 px-4 py-3"><p className="text-[12px] text-gray-500">Total ({booking.days} days)</p><p className="text-[18px] font-black text-green-600">${booking.total}</p></div>}
    </div>
  )
}
