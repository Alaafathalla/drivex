import { notFound } from 'next/navigation'
import { ServiceDetailPage } from '@/components/platform/service-detail-page'

const SERVICES = {
  inspection: {
    slug: 'inspection',
    eyebrow: 'Independent vehicle inspection',
    title: 'Know the car before you commit.',
    description: 'Book an independent pre-purchase or pre-sale inspection with a structured condition report, evidence and decision-ready scoring.',
    heroImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2200&q=86',
    startingPrice: 'AED 199',
    packages: [
      ['Essential check', 'Core mechanical, electrical and visible-condition inspection.', 'AED 199'],
      ['Pre-purchase', 'Deeper inspection with road test and purchase-risk summary.', 'AED 349'],
      ['Premium diagnostic', 'Extended diagnostics, paint/body checks and detailed evidence.', 'AED 499'],
      ['Fleet inspection', 'Repeatable inspection workflow for dealers and business fleets.', 'Custom quote'],
    ],
    benefits: [
      ['Independent findings', 'Separate the inspection decision from the seller or listing owner.'],
      ['Photo evidence', 'Structure inspection evidence so key findings are easy to review remotely.'],
      ['Condition score', 'Summarize complex technical checks into a decision-friendly vehicle score.'],
      ['Compare before buying', 'Use findings alongside price and specification comparison before committing.'],
    ],
    process: [
      ['Share the vehicle', 'Provide the vehicle, location, date and seller/dealer context.'],
      ['Inspector completes checks', 'Mechanical, electrical, body, interior and road-test checks are recorded.'],
      ['Review the report', 'Use the condition summary to negotiate, compare or walk away with more confidence.'],
    ],
    faq: [
      ['What is included in a pre-purchase inspection?', 'The workflow can cover exterior, paint, engine, transmission, suspension, brakes, electronics, interior and road-test findings.'],
      ['Do I need to own the car?', 'No. Inspections are designed for buyers, sellers, renters and fleet users.'],
      ['Can the seller receive the report too?', 'The production API can support role-based report sharing once the inspection record is connected to users.'],
      ['Does a good score guarantee the car?', 'No. An inspection reduces uncertainty but it cannot eliminate future mechanical risk or replace manufacturer history checks.'],
    ],
  },
  maintenance: {
    slug: 'maintenance',
    eyebrow: 'Maintenance & service',
    title: 'Keep your car at its best.',
    description: 'Schedule preventive maintenance, mechanical care and workshop support with clear scope, trusted partners and connected service records.',
    heroImage: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=2200&q=86',
    startingPrice: 'From AED 179',
    packages: [
      ['Oil & filters', 'Engine oil, filter replacement and essential fluid checks.', 'From AED 179'],
      ['Brakes', 'Pad, disc and braking-system inspection with quote before work.', 'From AED 249'],
      ['Battery care', 'Battery health test, replacement support and charging-system check.', 'From AED 299'],
      ['AC service', 'Cooling performance inspection, refrigerant and cabin-air checks.', 'From AED 199'],
    ],
    benefits: [
      ['Vehicle-aware service', 'Add your car details so the request reaches the right service partner.'],
      ['Quote transparency', 'Confirm the scope and final quote before any billable work begins.'],
      ['Preventive reminders', 'The API model is ready to connect service intervals and dashboard reminders.'],
      ['Service history', 'Keep completed maintenance ready to attach to the vehicle record.'],
    ],
    process: [
      ['Tell us about the car', 'Share vehicle details, location and the maintenance need.'],
      ['Confirm scope and slot', 'A suitable partner confirms availability, inclusions and pricing.'],
      ['Track completion', 'Connect the completed job, invoice and next service interval to the dashboard.'],
    ],
    faq: [
      ['Can I request routine and repair work?', 'Yes. The booking form supports scheduled maintenance as well as notes for a specific issue.'],
      ['Is the displayed price final?', 'Package values are starting prices. A final quote can be confirmed after the vehicle and scope are known.'],
      ['Can maintenance history be stored with my vehicle?', 'Yes. The service request structure is designed to connect to a vehicle profile and dashboard history.'],
      ['Can I choose the service location?', 'Yes. Location is part of the booking request and can later map to workshop, mobile-service or pickup options.'],
    ],
  },
  wash: {
    slug: 'wash',
    eyebrow: 'Car wash & detailing',
    title: 'Bring back showroom-level presence.',
    description: 'Professional wash, detailing and paint-safe care with mobile and studio service options.',
    heroImage: 'https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?auto=format&fit=crop&w=2200&q=86',
    startingPrice: 'From AED 89',
    packages: [
      ['Express wash', 'Exterior wash and tire dressing for a fresh daily finish.', 'From AED 89'],
      ['Interior refresh', 'Vacuum, wipe-down and sanitization for a cleaner cabin.', 'From AED 129'],
      ['Full detailing', 'Complete inside-out detailing with premium finishing products.', 'From AED 399'],
      ['Ceramic prep', 'Paint prep and finishing detail ahead of coating application.', 'Custom quote'],
    ],
    benefits: [
      ['Paint-safe products', 'Gentle methods that protect surfaces and preserve gloss.'],
      ['Convenient options', 'Choose mobile service or studio appointments.'],
      ['Premium finish', 'Restore depth, shine and presentation value.'],
      ['Repeat plans', 'Set up recurring care for busy owners or fleets.'],
    ],
    process: [['Book your slot', 'Choose service level, time and location.'], ['Vehicle is serviced', 'Our partner handles wash or detailing with the agreed scope.'], ['Review the finish', 'Approve the final result and book the next visit if needed.']],
  },
  tuning: {
    slug: 'tuning',
    eyebrow: 'Performance tuning',
    title: 'Sharper response, responsibly upgraded.',
    description: 'Diagnostics-led tuning consultation for performance, efficiency and drivability improvements.',
    heroImage: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=2200&q=86',
    startingPrice: 'Consultation from AED 299',
    packages: [['Diagnostics review', 'Baseline system scan and performance review.', 'AED 299'], ['Stage planning', 'Upgrade path with suitability and risk discussion.', 'AED 499'], ['Dyno package', 'Performance validation and tuning refinement.', 'Custom quote'], ['Fleet efficiency', 'Efficiency-focused optimization for commercial fleets.', 'Custom quote']],
    benefits: [['Data-led decisions', 'Tune only after understanding the vehicle baseline.'], ['Responsible upgrades', 'Balance performance goals with reliability considerations.'], ['Transparent planning', 'Understand what changes are recommended and why.'], ['Expert partner network', 'Get routed to suitable specialists for execution.']],
    process: [['Assess the car', 'Review current condition and objectives.'], ['Confirm the plan', 'Approve the best-fit tuning route.'], ['Validate results', 'Track outputs and expected improvement.']],
  },
  delivery: {
    slug: 'delivery',
    eyebrow: 'Vehicle delivery',
    title: 'Move cars with confidence.',
    description: 'Protected pickup, transfer and vehicle handover support for buyers, sellers and rental operations.',
    heroImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2200&q=86',
    startingPrice: 'From AED 149',
    packages: [['City transfer', 'Short-haul protected vehicle transfer.', 'From AED 149'], ['Intercity delivery', 'Between-city delivery with status updates.', 'From AED 399'], ['Premium enclosed', 'Additional protection for high-value cars.', 'Custom quote'], ['Fleet movement', 'Batch movement for dealers and fleet owners.', 'Custom quote']],
    benefits: [['Protected handling', 'Partner vehicles and process built around safe movement.'], ['Flexible scheduling', 'Choose pickup windows that suit both parties.'], ['Status updates', 'Track progress through a structured workflow.'], ['Suitable for sales and rentals', 'Ideal for both transaction and operational needs.']],
    process: [['Share the route', 'Pickup, drop-off and vehicle information are captured.'], ['Confirm logistics', 'Partner confirms slot and handling requirements.'], ['Track completion', 'Receive confirmation once handover is complete.']],
  },
  roadside: {
    slug: 'roadside',
    eyebrow: 'Roadside assistance',
    title: 'Help that gets to you fast.',
    description: 'Request battery support, tire help, towing coordination and urgent roadside response through a simple booking flow.',
    heroImage: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=2200&q=86',
    startingPrice: 'From AED 129',
    packages: [['Battery boost', 'Jump-start and quick diagnostics.', 'From AED 129'], ['Tire support', 'Wheel change or tire assistance.', 'From AED 149'], ['Towing coordination', 'Tow support routed to the right partner.', 'From AED 249'], ['Emergency package', 'Priority coordination for urgent situations.', 'Custom quote']],
    benefits: [['Rapid request flow', 'Capture location and issue details quickly.'], ['Clear assistance types', 'Select the exact type of support needed.'], ['Trusted support partners', 'Suitable roadside network for practical response.'], ['Status visibility', 'Track request progress and confirmation.']],
    process: [['Choose support type', 'Identify the issue and location.'], ['Partner dispatches', 'A suitable support team is assigned.'], ['Get moving again', 'The issue is resolved or the vehicle is safely transported.']],
  },
  airport: {
    slug: 'airport',
    eyebrow: 'Airport transfer',
    title: 'Professional arrivals, without friction.',
    description: 'Book polished chauffeur pickup and airport transfer vehicles for business, leisure and VIP travel.',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=86',
    startingPrice: 'From AED 199',
    packages: [['Business class', 'Professional sedan transfer.', 'From AED 199'], ['SUV transfer', 'Luggage-friendly premium SUV pickup.', 'From AED 299'], ['VIP service', 'Higher-touch chauffeur experience.', 'Custom quote'], ['Group transfer', 'Coordinated transport for teams or families.', 'Custom quote']],
    benefits: [['Reliable pickup', 'Booking data supports predictable scheduling.'], ['Premium presentation', 'Aligned with executive and VIP travel expectations.'], ['Flexible vehicle options', 'Choose by passenger and luggage needs.'], ['Clear service flow', 'From booking to handover, the process stays simple.']],
    process: [['Share flight and arrival details', 'Tell us when and where to meet you.'], ['Confirm vehicle and driver', 'Your transfer details are assigned and confirmed.'], ['Arrive smoothly', 'Meet your driver and continue your journey.']],
  },
  wedding: {
    slug: 'wedding',
    eyebrow: 'Wedding cars',
    title: 'Make the day arrive in style.',
    description: 'Premium event transport with elegant vehicle options, timing support and polished presentation.',
    heroImage: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=2200&q=86',
    startingPrice: 'Packages from AED 599',
    packages: [['Classic sedan', 'Elegant premium sedan with chauffeur.', 'From AED 599'], ['Luxury SUV', 'Spacious high-end SUV for event transport.', 'From AED 799'], ['Signature arrival', 'Flagship luxury model with premium presentation.', 'Custom quote'], ['Multi-car convoy', 'Coordinated transport for wedding parties.', 'Custom quote']],
    benefits: [['Event-ready presentation', 'Vehicles and service style suit occasion-driven use.'], ['Timing confidence', 'Structured scheduling for ceremony and photography windows.'], ['Premium options', 'Choose vehicles that fit the wedding aesthetic.'], ['Flexible coordination', 'Support for convoy and multi-stop movements.']],
    process: [['Choose your style', 'Select vehicles, schedule and event flow.'], ['Confirm logistics', 'The team confirms route and timing.'], ['Arrive memorably', 'Your transport experience is delivered on the day.']],
  },
}

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }))
}

export default async function SingleServicePage({ params }) {
  const { slug } = await params
  const service = SERVICES[slug]
  if (!service) return notFound()
  return <ServiceDetailPage {...service} />
}
