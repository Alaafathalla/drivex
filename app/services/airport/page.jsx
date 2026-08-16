import { ServiceDetailPage } from '@/components/platform/service-detail-page'

export default function AirportServicePage() {
  return <ServiceDetailPage
    slug="airport"
    eyebrow="Airport transfer"
    title="From terminal to destination, without the friction."
    description="Book premium airport pickup, drop-off or rental handover with flight-aware timing and clear transfer requirements."
    heroImage="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2200&q=86"
    startingPrice="From AED 149"
    packages={[
      ['Airport pickup', 'Meet-and-greet pickup with destination transfer.', 'From AED 149'],
      ['Airport drop-off', 'Pre-booked transfer with scheduled collection.', 'From AED 149'],
      ['Chauffeur premium', 'Premium vehicle with professional driver and wait allowance.', 'From AED 299'],
      ['Rental handover', 'Coordinate a rental vehicle handover at the selected terminal.', 'Vehicle dependent'],
    ]}
    benefits={[
      ['Flight-aware timing', 'The production API can attach flight details to adjust arrival handling.'],
      ['Clear pickup point', 'Capture terminal and location notes before the transfer.'],
      ['Rental integration', 'Airport service can connect directly to a DriveX rental booking.'],
      ['Premium support', 'Use one request record for driver, timing and transfer requirements.'],
    ]}
    process={[
      ['Add travel details', 'Choose date, time, airport/location and passenger context.'],
      ['Confirm the transfer', 'Receive a structured request and provider confirmation.'],
      ['Meet and move', 'Connect final driver and vehicle details to the dashboard when a live backend is attached.'],
    ]}
    faq={[
      ['Can I receive a rental car at the airport?', 'Yes. The platform supports rental handover as part of the airport journey.'],
      ['Can I add flight details?', 'The booking request can be extended with flight number and terminal fields when the production provider API is connected.'],
      ['Is waiting time included?', 'Final waiting-time rules should come from the selected transfer provider and be shown in the confirmed quote.'],
      ['Can I book for another passenger?', 'The customer and passenger schema can be separated in the production integration if the traveler is different from the account holder.'],
    ]}
  />
}
