export const RENTAL_CATEGORIES = [
  { name: 'Luxury', slug: 'luxury', description: 'Premium sedans and executive cars for business and special occasions.', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=88' },
  { name: 'SUV', slug: 'suv', description: 'Spacious premium SUVs built for families, road trips and everyday comfort.', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=88' },
  { name: 'Sports', slug: 'sports', description: 'Performance-focused cars for memorable drives and premium experiences.', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=88' },
  { name: 'Electric', slug: 'electric', description: 'Modern electric vehicles with effortless performance and zero tailpipe emissions.', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=88' },
  { name: 'Sedan', slug: 'sedan', description: 'Comfortable daily rentals with balanced performance, efficiency and practicality.', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=88' },
  { name: '7 Seater', slug: '7-seater', description: 'Flexible rentals for larger families, guests and group travel.', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=88' },
]

export const RENTAL_LOCATIONS = [
  { city: 'Dubai Marina', area: 'Dubai', cars: 42, description: 'Marina pickup with doorstep delivery available.', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=88' },
  { city: 'Downtown Dubai', area: 'Dubai', cars: 58, description: 'Fast access to Downtown, DIFC and Business Bay.', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=88' },
  { city: 'Dubai Airport', area: 'Dubai', cars: 35, description: 'Airport handover for arrivals and departures.', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=88' },
  { city: 'Palm Jumeirah', area: 'Dubai', cars: 29, description: 'Premium delivery for hotels, villas and residences.', image: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1200&q=88' },
  { city: 'Abu Dhabi Corniche', area: 'Abu Dhabi', cars: 31, description: 'Flexible pickup across central Abu Dhabi.', image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1200&q=88' },
  { city: 'Sharjah', area: 'Sharjah', cars: 18, description: 'Convenient city pickup and delivery options.', image: 'https://images.unsplash.com/photo-1577086664693-894d8405334a?auto=format&fit=crop&w=1200&q=88' },
]

export const RENTAL_ADDONS = [
  { id: 'wash', name: 'Premium car wash', description: 'Fresh exterior and interior preparation before handover.', price: 35 },
  { id: 'airport', name: 'Airport delivery', description: 'Meet-and-greet vehicle handover at the terminal.', price: 65 },
  { id: 'chauffeur', name: 'Professional chauffeur', description: 'Experienced driver for events, business or city travel.', price: 180 },
  { id: 'wedding', name: 'Wedding preparation', description: 'Ceremony-ready detailing, ribbon setup and timed delivery.', price: 220 },
  { id: 'child-seat', name: 'Child seat', description: 'Clean, inspected child seat fitted before pickup.', price: 20 },
  { id: 'extra-driver', name: 'Additional driver', description: 'Add a second approved driver to the rental agreement.', price: 30 },
]

export const SERVICE_CATALOG = [
  { slug: 'wash', title: 'Premium wash & detailing', description: 'Exterior wash, interior refresh and premium detailing packages.', price: 'From AED 49', category: 'Car care', image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=88' },
  { slug: 'wedding', title: 'Wedding car service', description: 'Luxury car, chauffeur, decoration coordination and timed venue delivery.', price: 'From AED 799', category: 'Occasions', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=88' },
  { slug: 'airport', title: 'Airport transfer', description: 'Premium airport pickup and drop-off with optional chauffeur service.', price: 'From AED 149', category: 'Travel', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=88' },
  { slug: 'maintenance', title: 'Maintenance & service', description: 'Scheduled maintenance, oil service, tires and battery support.', price: 'From AED 179', category: 'Car care', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=88' },
  { slug: 'inspection', title: 'Vehicle inspection', description: 'Independent checks before purchase, sale or long-term rental.', price: 'AED 199', category: 'Inspection', image: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=1200&q=88' },
  { slug: 'tuning', title: 'Performance & tuning', description: 'Diagnostics, ECU calibration, suspension and performance upgrade consultation.', price: 'From AED 399', category: 'Performance', image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1200&q=88' },
  { slug: 'delivery', title: 'Vehicle delivery', description: 'Door-to-door vehicle collection, handover and protected transport coordination.', price: 'From AED 199', category: 'Logistics', image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=88' },
  { slug: 'roadside', title: 'Roadside assistance', description: 'On-demand support for battery, tire and roadside incidents.', price: 'From AED 99', category: 'Support', image: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?auto=format&fit=crop&w=1200&q=88' },
]

export function formatDateInput(date) {
  const d = new Date(date)
  const offset = d.getTimezoneOffset()
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10)
}

export function getDefaultRentalDates() {
  const start = new Date()
  start.setDate(start.getDate() + 1)
  const end = new Date(start)
  end.setDate(end.getDate() + 3)
  return { start: formatDateInput(start), end: formatDateInput(end) }
}
