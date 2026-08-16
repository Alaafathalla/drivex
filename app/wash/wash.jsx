import { ServiceDetailPage } from '@/components/platform/service-detail-page'

export default function WashPage() {
  return <ServiceDetailPage
    slug="wash"
    eyebrow="Wash & detailing"
    title="Bring back the showroom feeling."
    description="Book premium car care from a quick refresh to full detailing, paint correction and protection—at a branch or your preferred location."
    heroImage="https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&w=2200&q=86"
    startingPrice="From AED 49"
    packages={[
      ['Express wash', 'Exterior wash, wheels, glass and quick dry.', 'AED 49 · ~25 min'],
      ['Premium wash', 'Exterior plus interior vacuum, surfaces and finishing.', 'AED 99 · ~45 min'],
      ['Full detailing', 'Deep interior/exterior treatment and restorative finishing.', 'AED 249 · 2–3 hrs'],
      ['Ceramic care', 'Preparation and protection package for longer-lasting finish.', 'From AED 699'],
    ]}
    benefits={[
      ['Clear package scope', 'Know what is included before the vehicle is handed over.'],
      ['Mobile or branch', 'The booking model supports destination care and physical locations.'],
      ['Vehicle-specific notes', 'Capture paint, trim, stain or access details before the appointment.'],
      ['Repeat bookings', 'Service history can support recurring detailing schedules in the dashboard.'],
    ]}
    process={[
      ['Choose a package', 'Pick the care level and tell us about the vehicle.'],
      ['Choose time and place', 'Request a branch slot or supported mobile-service location.'],
      ['Inspect and hand back', 'Complete the care service and keep the booking record connected to the car.'],
    ]}
    faq={[
      ['Can detailing be done at my location?', 'The booking schema supports location-based requests. Final mobile-service availability depends on partner coverage.'],
      ['How long does full detailing take?', 'The current package guidance is roughly two to three hours, depending on vehicle size and condition.'],
      ['Is ceramic coating included in detailing?', 'Ceramic care is presented as a separate protection package so scope and price remain clear.'],
      ['Can I add notes about stains or paint defects?', 'Yes. The API-ready booking form includes free-text vehicle and service notes.'],
    ]}
  />
}
