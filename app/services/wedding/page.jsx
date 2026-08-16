import { ServiceDetailPage } from '@/components/platform/service-detail-page'

export default function WeddingServicePage() {
  return <ServiceDetailPage
    slug="wedding"
    eyebrow="Wedding car service"
    title="Arrive with the moment planned perfectly."
    description="Coordinate a luxury vehicle, chauffeur, presentation and venue-timed arrival through one structured event transport request."
    heroImage="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=2200&q=88"
    startingPrice="From AED 799"
    packages={[
      ['Signature', 'Luxury vehicle preparation and timed venue delivery.', 'From AED 799'],
      ['Chauffeur', 'Signature package plus professional chauffeur service.', 'From AED 1,199'],
      ['Premium ceremony', 'Extended chauffeur time, presentation setup and coordination.', 'From AED 1,799'],
      ['Multi-car arrival', 'Coordinated transport for the couple and wedding party.', 'Custom quote'],
    ]}
    benefits={[
      ['Event-timed delivery', 'Coordinate vehicle preparation and handover around the ceremony schedule.'],
      ['Luxury selection', 'Connect the request with eligible premium and special-occasion inventory.'],
      ['Presentation details', 'Capture ribbon, decoration and access notes before confirmation.'],
      ['Single coordination record', 'Keep vehicle, driver, venue and timing requirements attached to one request.'],
    ]}
    process={[
      ['Share the event plan', 'Add the wedding date, location, preferred vehicle and timing.'],
      ['Confirm package and car', 'A coordinator can confirm availability, inclusions and final pricing.'],
      ['Coordinate the arrival', 'Connect driver, vehicle and event timing to the final confirmed request.'],
    ]}
    faq={[
      ['Can I request a specific vehicle?', 'Yes. Add the preferred model in the vehicle field or connect the request directly from eligible rental inventory.'],
      ['Is decoration included?', 'Package scope can include presentation coordination. Final decoration requirements should be confirmed in the quote.'],
      ['Can I book multiple cars?', 'Yes. Multi-car requests are supported as a custom quote and can be modeled as linked service items in production.'],
      ['Can the chauffeur wait during the event?', 'Chauffeur duration can be included in the confirmed package and final provider quote.'],
    ]}
  />
}
