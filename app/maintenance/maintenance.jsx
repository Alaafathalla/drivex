import { ServiceDetailPage } from '@/components/platform/service-detail-page'

export default function MaintenancePage() {
  return <ServiceDetailPage
    slug="maintenance"
    eyebrow="Maintenance & service"
    title="Keep your car at its best."
    description="Schedule preventive maintenance, mechanical care and workshop support with clear scope, trusted partners and connected service records."
    heroImage="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=2200&q=86"
    startingPrice="From AED 179"
    packages={[
      ['Oil & filters', 'Engine oil, filter replacement and essential fluid checks.', 'From AED 179'],
      ['Brakes', 'Pad, disc and braking-system inspection with quote before work.', 'From AED 249'],
      ['Battery care', 'Battery health test, replacement support and charging-system check.', 'From AED 299'],
      ['AC service', 'Cooling performance inspection, refrigerant and cabin-air checks.', 'From AED 199'],
    ]}
    benefits={[
      ['Vehicle-aware service', 'Add your car details so the request reaches the right service partner.'],
      ['Quote transparency', 'Confirm the scope and final quote before any billable work begins.'],
      ['Preventive reminders', 'The API model is ready to connect service intervals and dashboard reminders.'],
      ['Service history', 'Keep completed maintenance ready to attach to the vehicle record.'],
    ]}
    process={[
      ['Tell us about the car', 'Share vehicle details, location and the maintenance need.'],
      ['Confirm scope and slot', 'A suitable partner confirms availability, inclusions and pricing.'],
      ['Track completion', 'Connect the completed job, invoice and next service interval to the dashboard.'],
    ]}
    faq={[
      ['Can I request routine and repair work?', 'Yes. The booking form supports scheduled maintenance as well as notes for a specific issue.'],
      ['Is the displayed price final?', 'Package values are starting prices. A final quote can be confirmed after the vehicle and scope are known.'],
      ['Can maintenance history be stored with my vehicle?', 'Yes. The service request structure is designed to connect to a vehicle profile and dashboard history.'],
      ['Can I choose the service location?', 'Yes. Location is part of the booking request and can later map to workshop, mobile-service or pickup options.'],
    ]}
  />
}
