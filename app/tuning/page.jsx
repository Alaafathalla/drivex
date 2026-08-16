import { ServiceDetailPage } from '@/components/platform/service-detail-page'

export default function TuningPage() {
  return <ServiceDetailPage
    slug="tuning"
    eyebrow="Performance & tuning"
    title="Upgrade the response, not the uncertainty."
    description="Book diagnostics, calibration and performance-upgrade consultation with a clear baseline, scope and partner workflow."
    heroImage="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=2200&q=86"
    startingPrice="From AED 399"
    packages={[
      ['Performance diagnostic', 'Baseline scan, health checks and upgrade-readiness review.', 'From AED 399'],
      ['ECU consultation', 'Calibration consultation based on supported vehicle and goal.', 'From AED 699'],
      ['Handling setup', 'Suspension, alignment and handling-focused consultation.', 'From AED 599'],
      ['Full build plan', 'Structured upgrade roadmap covering performance, cooling and supporting hardware.', 'Custom quote'],
    ]}
    benefits={[
      ['Baseline first', 'Assess vehicle health before recommending any performance change.'],
      ['Goal-based scope', 'Capture daily-driving, track or response goals before quoting work.'],
      ['Transparent compatibility', 'Keep supported hardware, calibration and warranty implications explicit.'],
      ['Recorded upgrades', 'Connect approved modifications to the vehicle service history.'],
    ]}
    process={[
      ['Define the goal', 'Share vehicle, current setup and the outcome you want.'],
      ['Diagnose and quote', 'A suitable performance partner reviews compatibility and scope.'],
      ['Approve and record', 'Confirm the work and keep the completed upgrade details connected to the car.'],
    ]}
    faq={[
      ['Do you tune every vehicle?', 'No. Compatibility depends on the vehicle, engine, current software/hardware and provider capability.'],
      ['Will tuning affect warranty?', 'It can. Warranty and regulatory implications should be confirmed before any modification is approved.'],
      ['Can I request suspension upgrades only?', 'Yes. Use the notes field to describe handling, ride-height or alignment goals.'],
      ['Are performance results guaranteed?', 'No. Outcomes depend on vehicle condition, hardware, environment and the exact approved calibration.'],
    ]}
  />
}
