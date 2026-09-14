export const RENTAL_CATEGORIES = [
  { name: 'Luxury', slug: 'luxury', labelKey: 'rental_cat_luxury', description: 'Premium sedans and executive cars for business and special occasions.', descriptionKey: 'rental_cat_luxury_desc', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=88' },
  { name: 'SUV', slug: 'suv', labelKey: 'rental_cat_suv', description: 'Spacious premium SUVs built for families, road trips and everyday comfort.', descriptionKey: 'rental_cat_suv_desc', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=88' },
  { name: 'Sports', slug: 'sports', labelKey: 'rental_cat_sports', description: 'Performance-focused cars for memorable drives and premium experiences.', descriptionKey: 'rental_cat_sports_desc', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=88' },
  { name: 'Electric', slug: 'electric', labelKey: 'rental_cat_electric', description: 'Modern electric vehicles with effortless performance and zero tailpipe emissions.', descriptionKey: 'rental_cat_electric_desc', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=88' },
  { name: 'Sedan', slug: 'sedan', labelKey: 'rental_cat_sedan', description: 'Comfortable daily rentals with balanced performance, efficiency and practicality.', descriptionKey: 'rental_cat_sedan_desc', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=88' },
  { name: '7 Seater', slug: '7-seater', labelKey: 'rental_cat_7_seater', description: 'Flexible rentals for larger families, guests and group travel.', descriptionKey: 'rental_cat_7_seater_desc', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=88' },
]

export const RENTAL_LOCATIONS = [
  { city: 'Dubai Marina', area: 'Dubai', cars: 42, description: 'Marina pickup with doorstep delivery available.', descriptionKey: 'rental_loc_dubai_marina_desc', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=88' },
  { city: 'Downtown Dubai', area: 'Dubai', cars: 58, description: 'Fast access to Downtown, DIFC and Business Bay.', descriptionKey: 'rental_loc_downtown_desc', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=88' },
  { city: 'Dubai Airport', area: 'Dubai', cars: 35, description: 'Airport handover for arrivals and departures.', descriptionKey: 'rental_loc_dubai_airport_desc', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=88' },
  { city: 'Palm Jumeirah', area: 'Dubai', cars: 29, description: 'Premium delivery for hotels, villas and residences.', descriptionKey: 'rental_loc_palm_jumeirah_desc', image: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1200&q=88' },
  { city: 'Abu Dhabi Corniche', area: 'Abu Dhabi', cars: 31, description: 'Flexible pickup across central Abu Dhabi.', descriptionKey: 'rental_loc_abu_dhabi_corniche_desc', image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1200&q=88' },
  { city: 'Sharjah', area: 'Sharjah', cars: 18, description: 'Convenient city pickup and delivery options.', descriptionKey: 'rental_loc_sharjah_desc', image: 'https://images.unsplash.com/photo-1577086664693-894d8405334a?auto=format&fit=crop&w=1200&q=88' },
]

export const RENTAL_ADDONS = [
  { id: 'wash', name: 'Premium car wash', nameKey: 'rental_addon_wash', description: 'Fresh exterior and interior preparation before handover.', descriptionKey: 'rental_addon_wash_desc', price: 35 },
  { id: 'airport', name: 'Airport delivery', nameKey: 'rental_addon_airport', description: 'Meet-and-greet vehicle handover at the terminal.', descriptionKey: 'rental_addon_airport_desc', price: 65 },
  { id: 'chauffeur', name: 'Professional chauffeur', nameKey: 'rental_addon_chauffeur', description: 'Experienced driver for events, business or city travel.', descriptionKey: 'rental_addon_chauffeur_desc', price: 180 },
  { id: 'wedding', name: 'Wedding preparation', nameKey: 'rental_addon_wedding', description: 'Ceremony-ready detailing, ribbon setup and timed delivery.', descriptionKey: 'rental_addon_wedding_desc', price: 220 },
  { id: 'child-seat', name: 'Child seat', nameKey: 'rental_addon_child_seat', description: 'Clean, inspected child seat fitted before pickup.', descriptionKey: 'rental_addon_child_seat_desc', price: 20 },
  { id: 'extra-driver', name: 'Additional driver', nameKey: 'rental_addon_extra_driver', description: 'Add a second approved driver to the rental agreement.', descriptionKey: 'rental_addon_extra_driver_desc', price: 30 },
]

export const SERVICE_CATALOG = [
  { slug: 'wash', title: 'Premium wash & detailing', titleKey: 'service_catalog_wash_title', description: 'Exterior wash, interior refresh and premium detailing packages.', descriptionKey: 'service_catalog_wash_desc', price: 'From AED 49', category: 'Car care', categoryKey: 'service_catalog_category_car_care', image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=88' },
  { slug: 'wedding', title: 'Wedding car service', titleKey: 'service_catalog_wedding_title', description: 'Luxury car, chauffeur, decoration coordination and timed venue delivery.', descriptionKey: 'service_catalog_wedding_desc', price: 'From AED 799', category: 'Occasions', categoryKey: 'service_catalog_category_occasions', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=88' },
  { slug: 'airport', title: 'Airport transfer', titleKey: 'service_catalog_airport_title', description: 'Premium airport pickup and drop-off with optional chauffeur service.', descriptionKey: 'service_catalog_airport_desc', price: 'From AED 149', category: 'Travel', categoryKey: 'service_catalog_category_travel', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=88' },
  { slug: 'maintenance', title: 'Maintenance & service', titleKey: 'service_catalog_maintenance_title', description: 'Scheduled maintenance, oil service, tires and battery support.', descriptionKey: 'service_catalog_maintenance_desc', price: 'From AED 179', category: 'Car care', categoryKey: 'service_catalog_category_car_care', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=88' },
  { slug: 'inspection', title: 'Vehicle inspection', titleKey: 'service_catalog_inspection_title', description: 'Independent checks before purchase, sale or long-term rental.', descriptionKey: 'service_catalog_inspection_desc', price: 'AED 199', category: 'Inspection', categoryKey: 'service_catalog_category_inspection', image: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=1200&q=88' },
  { slug: 'tuning', title: 'Performance & tuning', titleKey: 'service_catalog_tuning_title', description: 'Diagnostics, ECU calibration, suspension and performance upgrade consultation.', descriptionKey: 'service_catalog_tuning_desc', price: 'From AED 399', category: 'Performance', categoryKey: 'service_catalog_category_performance', image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1200&q=88' },
  { slug: 'delivery', title: 'Vehicle delivery', titleKey: 'service_catalog_delivery_title', description: 'Door-to-door vehicle collection, handover and protected transport coordination.', descriptionKey: 'service_catalog_delivery_desc', price: 'From AED 199', category: 'Logistics', categoryKey: 'service_catalog_category_logistics', image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=88' },
  { slug: 'roadside', title: 'Roadside assistance', titleKey: 'service_catalog_roadside_title', description: 'On-demand support for battery, tire and roadside incidents.', descriptionKey: 'service_catalog_roadside_desc', price: 'From AED 99', category: 'Support', categoryKey: 'service_catalog_category_support', image: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?auto=format&fit=crop&w=1200&q=88' },
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
