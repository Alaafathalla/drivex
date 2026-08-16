import { ServiceDetailPage } from '@/components/platform/service-detail-page'

export default function RoadsidePage() {
  return <ServiceDetailPage
    slug="roadside"
    eyebrow="24/7 roadside assistance"
    title="Help is on the way."
    description="Request roadside support with location, vehicle context and incident details structured for fast provider dispatch and status tracking."
    heroImage="https://images.unsplash.com/photo-1597404294360-feeeda04612e?auto=format&fit=crop&w=2200&q=86"
    startingPrice="From AED 99"
    packages={[
      ['Tow truck', 'Recovery and transport when the vehicle cannot continue safely.', 'From AED 199'],
      ['Battery jump', 'On-site jump start and basic battery/charging assessment.', 'From AED 99'],
      ['Fuel delivery', 'Emergency fuel support to get the vehicle moving again.', 'From AED 119'],
      ['Lockout support', 'Assistance for supported vehicle lockout situations.', 'From AED 149'],
    ]}
    benefits={[
      ['Location-led dispatch', 'Use the request location to route support to the nearest eligible provider.'],
      ['Incident context', 'Capture the problem before dispatch so the right equipment can be assigned.'],
      ['Status-ready API', 'Service request IDs are ready for assigned, en-route and completed states.'],
      ['Connected support', 'Link roadside incidents to the vehicle and user dashboard history.'],
    ]}
    process={[
      ['Send location and issue', 'Share where the car is and describe what happened.'],
      ['Provider is assigned', 'A suitable roadside partner can be selected by location and capability.'],
      ['Track resolution', 'Use the request ID for future live status, arrival estimate and completion records.'],
    ]}
    faq={[
      ['Is roadside assistance available 24/7?', 'The experience is designed around 24/7 request intake. Real production coverage depends on the connected provider network.'],
      ['Can I request a tow and battery help?', 'Yes. The service catalog supports towing, battery, fuel and lockout-style assistance.'],
      ['Does the app use my live GPS?', 'The current mock flow accepts a location field. A production build can connect browser/device geolocation with explicit permission.'],
      ['Can I track the driver or tow truck?', 'The request ID and status model are ready for a future real-time provider location feed.'],
    ]}
  />
}
