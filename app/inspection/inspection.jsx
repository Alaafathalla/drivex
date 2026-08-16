import { ServiceDetailPage } from '@/components/platform/service-detail-page'

export default function InspectionPage() {
  return <ServiceDetailPage
    slug="inspection"
    eyebrow="Independent vehicle inspection"
    title="Know the car before you commit."
    description="Book an independent pre-purchase or pre-sale inspection with a structured condition report, evidence and decision-ready scoring."
    heroImage="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2200&q=86"
    startingPrice="AED 199"
    packages={[
      ['Essential check', 'Core mechanical, electrical and visible-condition inspection.', 'AED 199'],
      ['Pre-purchase', 'Deeper inspection with road test and purchase-risk summary.', 'AED 349'],
      ['Premium diagnostic', 'Extended diagnostics, paint/body checks and detailed evidence.', 'AED 499'],
      ['Fleet inspection', 'Repeatable inspection workflow for dealers and business fleets.', 'Custom quote'],
    ]}
    benefits={[
      ['Independent findings', 'Separate the inspection decision from the seller or listing owner.'],
      ['Photo evidence', 'Structure inspection evidence so key findings are easy to review remotely.'],
      ['Condition score', 'Summarize complex technical checks into a decision-friendly vehicle score.'],
      ['Compare before buying', 'Use findings alongside price and specification comparison before committing.'],
    ]}
    process={[
      ['Share the vehicle', 'Provide the vehicle, location, date and seller/dealer context.'],
      ['Inspector completes checks', 'Mechanical, electrical, body, interior and road-test checks are recorded.'],
      ['Review the report', 'Use the condition summary to negotiate, compare or walk away with more confidence.'],
    ]}
    faq={[
      ['What is included in a pre-purchase inspection?', 'The workflow can cover exterior, paint, engine, transmission, suspension, brakes, electronics, interior and road-test findings.'],
      ['Do I need to own the car?', 'No. Inspections are designed for buyers, sellers, renters and fleet users.'],
      ['Can the seller receive the report too?', 'The production API can support role-based report sharing once the inspection record is connected to users.'],
      ['Does a good score guarantee the car?', 'No. An inspection reduces uncertainty but it cannot eliminate future mechanical risk or replace manufacturer history checks.'],
    ]}
  />
}
