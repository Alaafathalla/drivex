import { ServiceDetailPage } from '@/components/platform/service-detail-page'

export default function VehicleDeliveryPage() {
  return <ServiceDetailPage
    slug="delivery"
    eyebrow="Vehicle delivery"
    title="Move the car without adding friction."
    description="Coordinate vehicle pickup, protected transport and destination handover for purchases, rentals, service visits and private transfers."
    heroImage="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=2200&q=86"
    startingPrice="From AED 199"
    packages={[
      ['Local handover', 'Point-to-point vehicle handover within the supported city.', 'From AED 199'],
      ['Protected transport', 'Transport coordination for vehicles that should not be driven.', 'From AED 399'],
      ['Dealer collection', 'Collection from a dealer or seller with destination handover.', 'From AED 249'],
      ['Multi-vehicle logistics', 'Coordinated transport for fleets, events or dealer inventory.', 'Custom quote'],
    ]}
    benefits={[
      ['Pickup and destination', 'Capture both sides of the handover in one structured request.'],
      ['Vehicle context', 'Record vehicle type and special handling requirements before assignment.'],
      ['Status-ready tracking', 'The request ID can map to collected, in-transit and delivered states.'],
      ['Connected journeys', 'Use delivery as an add-on to buying, renting, inspection or service.'],
    ]}
    process={[
      ['Set the route', 'Share pickup, destination, timing and vehicle details.'],
      ['Confirm transport type', 'A logistics partner confirms suitable handling and quote.'],
      ['Track handover', 'Connect pickup confirmation and destination handover to the request record.'],
    ]}
    faq={[
      ['Can delivery be added to a car purchase?', 'Yes. Delivery is designed to connect with a listing, transaction or standalone request.'],
      ['Can you transport a non-running vehicle?', 'Potentially. Note the condition so a suitable recovery/transport provider can be assigned.'],
      ['Can I choose an exact delivery window?', 'Preferred date/time are captured in the request. Final slot depends on partner availability and route.'],
      ['Is insurance included?', 'Final transport liability and insurance terms should be shown by the selected provider before confirmation.'],
    ]}
  />
}
