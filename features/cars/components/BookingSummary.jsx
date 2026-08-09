import { CalendarDays, MapPin } from 'lucide-react'

export function BookingSummary({ car, booking, compact = false }) {
  if (!car || !booking) return null
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white overflow-hidden ${compact ? '' : 'shadow-sm'}`}>
      {/* Car info */}
      <div className="flex gap-3 p-4 border-b border-gray-100">
        <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
          {car.images?.[0] && <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover" />}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-gray-900 truncate">{car.brand} {car.model}</p>
          <p className="text-[12px] text-gray-400">{car.year} · {car.transmission}</p>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-400">
            <MapPin size={10} />{car.city}
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="p-4 space-y-2.5">
        <div className="flex items-start gap-2.5">
          <CalendarDays size={15} className="mt-0.5 shrink-0 text-green-500" />
          <div>
            <p className="text-[11px] text-gray-400">Pickup</p>
            <p className="text-[13px] font-semibold text-gray-900">{booking.pickupDate} {booking.pickupTime && `· ${booking.pickupTime}`}</p>
            <p className="text-[11px] text-gray-500">{booking.pickupLocation}</p>
          </div>
        </div>
        <div className="h-px bg-gray-100" />
        <div className="flex items-start gap-2.5">
          <CalendarDays size={15} className="mt-0.5 shrink-0 text-rose-400" />
          <div>
            <p className="text-[11px] text-gray-400">Return</p>
            <p className="text-[13px] font-semibold text-gray-900">{booking.returnDate} {booking.returnTime && `· ${booking.returnTime}`}</p>
            <p className="text-[11px] text-gray-500">{booking.dropoffLocation}</p>
          </div>
        </div>
      </div>

      {/* Total */}
      {booking.total && (
        <div className="flex items-center justify-between border-t border-gray-100 bg-green-50 px-4 py-3">
          <p className="text-[12px] text-gray-500">Total ({booking.days} days)</p>
          <p className="text-[18px] font-black text-green-600">${booking.total}</p>
        </div>
      )}
    </div>
  )
}
