export const JOURNAL_POSTS = [
  {
    slug: 'uae-ev-ownership-guide',
    category: 'EV ownership',
    title: 'What UAE drivers should know before switching to electric',
    excerpt: 'Charging access, daily range, battery health and total ownership cost matter more than headline range alone.',
    readTime: '6 min read',
    date: '2026-08-09',
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1600&q=86',
    sections: [
      ['Start with your charging routine', 'Home or workplace charging changes the ownership experience more than almost any brochure specification. Map where the car will spend the night, how often you drive long distances and which public charging networks are practical for your routes.'],
      ['Compare usable range, not only the headline number', 'Climate, motorway speed, passenger load and driving style all affect real-world range. Build a buffer into your daily needs instead of planning around the maximum published figure.'],
      ['Treat battery condition as part of the vehicle value', 'For a used EV, battery health, charging history and remaining warranty should sit beside mileage and service history in the purchase decision.'],
      ['Price the full ownership picture', 'Insurance, charging, tires, depreciation, registration and warranty coverage belong in the same calculation as the purchase or finance payment.'],
    ],
  },
  {
    slug: 'compare-used-luxury-suvs',
    category: 'Market guide',
    title: 'How to compare a used luxury SUV beyond the headline price',
    excerpt: 'Specification, inspection condition, service history and future running cost can move the real value dramatically.',
    readTime: '8 min read',
    date: '2026-08-05',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=86',
    sections: [
      ['Normalize the specification', 'Two visually similar vehicles may have materially different safety, suspension, audio, seating and driver-assistance packages. Compare the actual equipment list before comparing price.'],
      ['Use condition as a pricing input', 'Paintwork, tires, brakes, suspension, interior wear and warning codes can turn a cheap purchase into an expensive first year. A structured inspection makes those trade-offs visible.'],
      ['Look at ownership evidence', 'Consistent servicing, documented repairs and transparent ownership history are often worth paying for in premium vehicles with complex systems.'],
      ['Model the next three years', 'Estimate finance, insurance, scheduled service, tires and likely wear items. The better deal is the vehicle with the stronger total-cost position, not necessarily the lower sticker price.'],
    ],
  },
  {
    slug: 'summer-preventive-maintenance-checks',
    category: 'Car care',
    title: 'Five preventive maintenance checks before a long summer drive',
    excerpt: 'Cooling, tires, battery health, fluids and air conditioning deserve attention before heat and distance expose weak points.',
    readTime: '5 min read',
    date: '2026-08-01',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=86',
    sections: [
      ['Cooling system', 'Check coolant level, visible leaks, hose condition and any recent temperature warnings. Heat places sustained load on marginal cooling components.'],
      ['Tires and pressures', 'Inspect tread, sidewalls and pressure when the tires are cold. Long high-speed journeys amplify the impact of under-inflation and existing damage.'],
      ['Battery and charging', 'High temperatures accelerate battery wear. A quick health test can identify a weak battery before it becomes a roadside problem.'],
      ['Fluids and braking', 'Confirm engine oil, brake fluid and washer fluid are at the correct levels and investigate any new brake noise or vibration.'],
      ['Cabin cooling', 'A weak AC system is more than an inconvenience in extreme heat. Verify cooling performance before the journey and replace an overdue cabin filter.'],
    ],
  },
]

export function getJournalPost(slug) {
  return JOURNAL_POSTS.find((post) => post.slug === slug) || null
}
