import { ok } from '@/lib/api-response'
import { DB } from '@/lib/marketplace-api'

export async function GET() {
  const activeBookings = DB.bookings.filter((booking) => !['cancelled', 'completed'].includes(booking.status))
  const activeListings = DB.userListings.filter((listing) => ['active', 'pending'].includes(listing.status))
  const saved = DB.cars.slice(0, 4)
  return ok({
    profile: { name: 'Alex Morgan', plan: 'DriveX Plus', completion: 82 },
    stats: {
      savedCars: saved.length,
      activeBookings: activeBookings.length,
      activeListings: activeListings.length,
      totalSpent: DB.bookings.reduce((sum, booking) => sum + Number(booking.total || 0), 0),
    },
    saved,
    bookings: activeBookings.slice(0, 4),
    listings: activeListings.slice(0, 4),
    alerts: [
      { id: 1, title: 'Inspection reminder', text: 'Your saved BMW X5 has a verified inspection report available.', tone: 'lime' },
      { id: 2, title: 'Price movement', text: 'A vehicle in your wishlist dropped by AED 2,300.', tone: 'blue' },
    ],
  })
}
