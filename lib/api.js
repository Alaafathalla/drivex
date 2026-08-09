// DriveX Mock API — simulates real API calls with realistic data and latency

export const CARS = [
  {
    id: 1, slug: 'bmw-5-series-2023', name: 'BMW 5 Series', make: 'BMW', model: '5 Series',
    year: 2023, price: 54900, type: 'sale', condition: 'Used', body: 'Sedan',
    transmission: 'Automatic', fuel: 'Petrol', mileage: 15000, color: 'Black',
    location: 'Dubai', seats: 5, engine: '2.0L Turbo', power: '258 hp', drive: 'AWD',
    badge: 'FOR SALE', featured: true,
    image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=900&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=90',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=90',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=90',
    ],
    dealer: 'Elite Motors Dubai', dealerSlug: 'elite-motors', views: 2340,
    features: ['Heated Seats', 'Panoramic Roof', 'Navigation', 'Lane Assist', 'Parking Sensors'],
    description: 'A meticulously maintained BMW 5 Series with full service history, one owner and low mileage. Every kilometre has been driven with care and the car presents in exceptional condition inside and out.',
  },
  {
    id: 2, slug: 'mercedes-c-class-2023', name: 'Mercedes-Benz C-Class', make: 'Mercedes-Benz', model: 'C-Class',
    year: 2023, price: 42900, type: 'sale', condition: 'Used', body: 'Sedan',
    transmission: 'Automatic', fuel: 'Petrol', mileage: 10000, color: 'Silver',
    location: 'Abu Dhabi', seats: 5, engine: '1.5L Turbo', power: '204 hp', drive: 'RWD',
    badge: 'FOR SALE', featured: true,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=90',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=90',
    ],
    dealer: 'Prestige Cars', dealerSlug: 'prestige-cars', views: 1890,
    features: ['Leather Interior', 'Wireless Charging', 'Ambient Lighting', 'Head-Up Display'],
    description: 'Stunning C-Class in pristine condition. Spec includes premium leather, ambient lighting and MBUX infotainment system.',
  },
  {
    id: 3, slug: 'audi-a6-2022', name: 'Audi A6', make: 'Audi', model: 'A6',
    year: 2022, price: 47500, type: 'sale', condition: 'Used', body: 'Sedan',
    transmission: 'Automatic', fuel: 'Diesel', mileage: 28000, color: 'White',
    location: 'Dubai', seats: 5, engine: '3.0L V6', power: '340 hp', drive: 'Quattro AWD',
    badge: 'FOR SALE', featured: false,
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=900&q=90',
    gallery: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=90'],
    dealer: 'Greenline Auto', dealerSlug: 'greenline-auto', views: 1230,
    features: ['Matrix LED', 'Bang & Olufsen Audio', 'Virtual Cockpit', '360 Camera'],
    description: 'Powerful Audi A6 with the full quattro system. Great for long distance driving with exceptional comfort.',
  },
  {
    id: 4, slug: 'tesla-model-3-2023', name: 'Tesla Model 3', make: 'Tesla', model: 'Model 3',
    year: 2023, price: 39900, type: 'sale', condition: 'Used', body: 'Sedan',
    transmission: 'Automatic', fuel: 'Electric', mileage: 8000, color: 'Red',
    location: 'Dubai', seats: 5, engine: 'Dual Motor', power: '358 hp', drive: 'AWD',
    badge: 'FOR SALE', featured: true,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=90',
    gallery: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=90'],
    dealer: 'Urban Motors', dealerSlug: 'urban-motors', views: 3100,
    features: ['Autopilot', 'Full Self Driving', 'Supercharger Access', 'Glass Roof'],
    description: 'Tesla Model 3 Long Range with Autopilot. Near-new condition with all software updates. 0-100 in 4.4 seconds.',
  },
  {
    id: 5, slug: 'porsche-cayenne-s-2022', name: 'Porsche Cayenne S', make: 'Porsche', model: 'Cayenne S',
    year: 2022, price: 89000, type: 'sale', condition: 'Used', body: 'SUV',
    transmission: 'Automatic', fuel: 'Petrol', mileage: 22000, color: 'Blue',
    location: 'Dubai', seats: 5, engine: '2.9L Biturbo V6', power: '440 hp', drive: 'AWD',
    badge: 'FOR SALE', featured: false,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=90',
    gallery: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=90'],
    dealer: 'Elite Motors Dubai', dealerSlug: 'elite-motors', views: 2800,
    features: ['Sport Chrono', 'PASM', 'Bose Surround', 'Air Suspension'],
    description: 'Exceptional Cayenne S with full Porsche service history. Sport Chrono package adds even more driving excitement.',
  },
  {
    id: 6, slug: 'range-rover-sport-2023', name: 'Range Rover Sport', make: 'Land Rover', model: 'Range Rover Sport',
    year: 2023, price: 95000, type: 'sale', condition: 'New', body: 'SUV',
    transmission: 'Automatic', fuel: 'Petrol', mileage: 5000, color: 'Green',
    location: 'Abu Dhabi', seats: 5, engine: '3.0L Inline-6', power: '395 hp', drive: 'AWD',
    badge: 'FOR SALE', featured: true,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=90',
    gallery: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=90'],
    dealer: 'Prestige Cars', dealerSlug: 'prestige-cars', views: 4100,
    features: ['Meridian Sound', 'Terrain Response 2', 'Electric Panoramic Roof', 'Massage Seats'],
    description: 'Nearly new Range Rover Sport with the powerful Ingenium inline-6. Full specification with almost every available option.',
  },
  {
    id: 7, slug: 'mercedes-glc-300-2024', name: 'Mercedes-Benz GLC 300', make: 'Mercedes-Benz', model: 'GLC 300',
    year: 2024, price: 55000, type: 'sale', condition: 'New', body: 'SUV',
    transmission: 'Automatic', fuel: 'Petrol', mileage: 1200, color: 'White',
    location: 'Dubai', seats: 5, engine: '2.0L Turbo', power: '258 hp', drive: 'AWD',
    badge: 'FOR SALE', featured: false,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=90',
    gallery: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=90'],
    dealer: 'Elite Motors Dubai', dealerSlug: 'elite-motors', views: 1560,
    features: ['MBUX Hyperscreen', 'Burmester Audio', 'Distronic', 'Electric Tailgate'],
    description: 'Brand new GLC 300 with premium AMG line specification. Zero compromise on comfort or performance.',
  },
  {
    id: 8, slug: 'bmw-7-series-2023', name: 'BMW 7 Series', make: 'BMW', model: '7 Series',
    year: 2023, price: 120000, type: 'sale', condition: 'Used', body: 'Sedan',
    transmission: 'Automatic', fuel: 'Petrol', mileage: 18000, color: 'Black',
    location: 'Dubai', seats: 5, engine: '3.0L Turbo', power: '375 hp', drive: 'xDrive',
    badge: 'FOR SALE', featured: false,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=90',
    gallery: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=90'],
    dealer: 'Prestige Cars', dealerSlug: 'prestige-cars', views: 2200,
    features: ['Theater Screen', 'Executive Lounge Seating', 'Active Steering', 'Crystalline Glass Controls'],
    description: 'The pinnacle of BMW luxury. Flagship 7 Series with every luxury enhancement available.',
  },
]

export const RENTALS = [
  {
    id: 1, slug: 'range-rover-sport-rental', name: 'Range Rover Sport', make: 'Land Rover',
    year: 2023, pricePerDay: 120, pricePerMonth: 2800, type: 'rent',
    transmission: 'Automatic', fuel: 'Petrol', seats: 5, category: 'SUV',
    available: true, deposit: 1000, minDays: 1,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=90',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=90',
    ],
    features: ['GPS Navigation', 'Unlimited Mileage', 'Roadside Assistance', 'Child Seat Available'],
    description: 'Drive the iconic Range Rover Sport through the city or off-road. Effortless power meets unmatched luxury.',
    badge: 'FOR RENT',
  },
  {
    id: 2, slug: 'mercedes-c-class-rental', name: 'Mercedes-Benz C-Class', make: 'Mercedes-Benz',
    year: 2023, pricePerDay: 85, pricePerMonth: 1900, type: 'rent',
    transmission: 'Automatic', fuel: 'Petrol', seats: 5, category: 'Luxury',
    available: true, deposit: 800, minDays: 1,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=90',
    gallery: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=90'],
    features: ['MBUX Infotainment', 'Wireless Charging', 'Heated Seats', 'Parking Sensors'],
    description: 'The perfect balance of performance and comfort. Business travel or weekend escape — the C-Class delivers.',
    badge: 'FOR RENT',
  },
  {
    id: 3, slug: 'tesla-model-y-rental', name: 'Tesla Model Y', make: 'Tesla',
    year: 2023, pricePerDay: 95, pricePerMonth: 2100, type: 'rent',
    transmission: 'Automatic', fuel: 'Electric', seats: 5, category: 'Electric',
    available: true, deposit: 900, minDays: 1,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=90',
    gallery: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=90'],
    features: ['Autopilot', 'Full Electric', 'Glass Roof', 'OTA Updates'],
    description: 'Zero emissions, maximum fun. The Tesla Model Y is the smartest rental in our fleet.',
    badge: 'FOR RENT',
  },
  {
    id: 4, slug: 'bmw-5-series-rental', name: 'BMW 5 Series', make: 'BMW',
    year: 2023, pricePerDay: 100, pricePerMonth: 2400, type: 'rent',
    transmission: 'Automatic', fuel: 'Petrol', seats: 5, category: 'Luxury',
    available: true, deposit: 1000, minDays: 1,
    image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=900&q=90',
    gallery: ['https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=90'],
    features: ['Harman Kardon Audio', 'Driving Assistant Pro', 'Live Cockpit', '360 View Camera'],
    description: 'Sporty, sophisticated and supremely capable. The 5 Series is the driver\'s choice in our fleet.',
    badge: 'FOR RENT',
  },
  {
    id: 5, slug: 'porsche-cayenne-rental', name: 'Porsche Cayenne', make: 'Porsche',
    year: 2022, pricePerDay: 150, pricePerMonth: 3500, type: 'rent',
    transmission: 'Automatic', fuel: 'Petrol', seats: 5, category: 'Sports',
    available: false, deposit: 1500, minDays: 2,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=90',
    gallery: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=90'],
    features: ['Sport Chrono', 'PDCC', 'Bose Surround', 'Night Vision Assist'],
    description: 'Rent a Porsche. Enough said. The Cayenne combines supercar thrills with everyday usability.',
    badge: 'FOR RENT',
  },
  {
    id: 6, slug: 'audi-q7-rental', name: 'Audi Q7', make: 'Audi',
    year: 2023, pricePerDay: 110, pricePerMonth: 2600, type: 'rent',
    transmission: 'Automatic', fuel: 'Diesel', seats: 7, category: 'SUV',
    available: true, deposit: 1100, minDays: 1,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=90',
    gallery: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=90'],
    features: ['7 Seats', 'Virtual Cockpit', 'Bang & Olufsen', 'Adaptive Air Suspension'],
    description: 'The Q7 seats the whole family in luxury. Fuel-efficient diesel engine for long journey comfort.',
    badge: 'FOR RENT',
  },
]

export const DEALERS = [
  {
    id: 1, slug: 'elite-motors', name: 'Elite Motors Dubai', city: 'Dubai',
    rating: 4.9, totalCars: 86, since: 2018, verified: true,
    phone: '+971 4 000 1111', email: 'sales@elitemotors.ae',
    address: 'Sheikh Zayed Road, Dubai',
    description: 'Dubai\'s premier luxury car dealership with over 80 premium vehicles in stock at all times. Specialising in European luxury and performance cars.',
    logo: null, cover: 'https://images.unsplash.com/photo-1562141961-b5d65aba8f5e?auto=format&fit=crop&w=1600&q=85',
    specialties: ['BMW', 'Mercedes-Benz', 'Porsche'],
    inventory: [1, 7, 8],
  },
  {
    id: 2, slug: 'greenline-auto', name: 'Greenline Auto', city: 'Abu Dhabi',
    rating: 4.8, totalCars: 64, since: 2015, verified: true,
    phone: '+971 2 000 2222', email: 'info@greenlineauto.ae',
    address: 'Corniche Road, Abu Dhabi',
    description: 'Abu Dhabi\'s trusted destination for quality pre-owned vehicles with certified inspections on every car.',
    logo: null, cover: 'https://images.unsplash.com/photo-1562141961-b5d65aba8f5e?auto=format&fit=crop&w=1600&q=85',
    specialties: ['Audi', 'Volkswagen', 'Toyota'],
    inventory: [3],
  },
  {
    id: 3, slug: 'prestige-cars', name: 'Prestige Cars', city: 'Dubai',
    rating: 4.9, totalCars: 112, since: 2012, verified: true,
    phone: '+971 4 000 3333', email: 'hello@prestigecars.ae',
    address: 'Al Quoz, Dubai',
    description: 'Over a decade of excellence. Prestige Cars is the UAE\'s most awarded luxury car dealer with the widest selection of premium inventory.',
    logo: null, cover: 'https://images.unsplash.com/photo-1562141961-b5d65aba8f5e?auto=format&fit=crop&w=1600&q=85',
    specialties: ['Range Rover', 'Mercedes-Benz', 'Porsche'],
    inventory: [2, 5, 6, 8],
  },
  {
    id: 4, slug: 'urban-motors', name: 'Urban Motors', city: 'Sharjah',
    rating: 4.7, totalCars: 48, since: 2019, verified: true,
    phone: '+971 6 000 4444', email: 'sales@urbanmotors.ae',
    address: 'Industrial Area, Sharjah',
    description: 'Modern dealership focused on electric vehicles and future-ready technology. Authorised Tesla partner.',
    logo: null, cover: 'https://images.unsplash.com/photo-1562141961-b5d65aba8f5e?auto=format&fit=crop&w=1600&q=85',
    specialties: ['Tesla', 'BMW', 'Audi'],
    inventory: [4],
  },
]

export const CATEGORIES = [
  { title: 'Luxury Cars', count: 120, slug: 'luxury', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=90' },
  { title: 'SUVs', count: 200, slug: 'suv', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=90' },
  { title: 'Sedans', count: 150, slug: 'sedans', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=90' },
  { title: 'Sports Cars', count: 80, slug: 'sports', image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=90' },
  { title: 'Electric Cars', count: 60, slug: 'electric', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=90' },
]

// Simulate async API delay
const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms))

export const api = {
  async getCars(filters = {}) {
    await delay()
    let result = [...CARS]
    if (filters.type) result = result.filter((c) => c.type === filters.type)
    if (filters.make) result = result.filter((c) => c.make.toLowerCase() === filters.make.toLowerCase())
    if (filters.body) result = result.filter((c) => c.body.toLowerCase() === filters.body.toLowerCase())
    if (filters.fuel) result = result.filter((c) => c.fuel.toLowerCase() === filters.fuel.toLowerCase())
    if (filters.transmission) result = result.filter((c) => c.transmission.toLowerCase() === filters.transmission.toLowerCase())
    if (filters.condition) result = result.filter((c) => c.condition.toLowerCase() === filters.condition.toLowerCase())
    if (filters.minPrice) result = result.filter((c) => c.price >= Number(filters.minPrice))
    if (filters.maxPrice) result = result.filter((c) => c.price <= Number(filters.maxPrice))
    if (filters.minYear) result = result.filter((c) => c.year >= Number(filters.minYear))
    if (filters.maxYear) result = result.filter((c) => c.year <= Number(filters.maxYear))
    if (filters.q) {
      const q = filters.q.toLowerCase()
      result = result.filter((c) => c.name.toLowerCase().includes(q) || c.make.toLowerCase().includes(q))
    }
    if (filters.sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (filters.sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (filters.sort === 'newest') result.sort((a, b) => b.year - a.year)
    if (filters.featured) result = result.filter((c) => c.featured)
    return result
  },

  async getCarBySlug(slug) {
    await delay(200)
    return CARS.find((c) => c.slug === slug) || null
  },

  async getRentals(filters = {}) {
    await delay()
    let result = [...RENTALS]
    if (filters.category && filters.category !== 'All') {
      result = result.filter((r) => r.category.toLowerCase() === filters.category.toLowerCase())
    }
    if (filters.fuel) result = result.filter((r) => r.fuel.toLowerCase() === filters.fuel.toLowerCase())
    if (filters.maxPrice) result = result.filter((r) => r.pricePerDay <= Number(filters.maxPrice))
    if (filters.q) {
      const q = filters.q.toLowerCase()
      result = result.filter((r) => r.name.toLowerCase().includes(q))
    }
    return result
  },

  async getRentalBySlug(slug) {
    await delay(200)
    return RENTALS.find((r) => r.slug === slug) || null
  },

  async getDealers() {
    await delay()
    return DEALERS
  },

  async getDealerBySlug(slug) {
    await delay(200)
    return DEALERS.find((d) => d.slug === slug) || null
  },

  async getCategories() {
    await delay(150)
    return CATEGORIES
  },

  async getFeaturedCars() {
    await delay()
    return [...CARS.filter((c) => c.featured), ...RENTALS.slice(0, 2)]
  },

  async getSimilarCars(slug, limit = 4) {
    await delay(200)
    return CARS.filter((c) => c.slug !== slug).slice(0, limit)
  },
}

export const MAKES = ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Land Rover', 'Tesla', 'Toyota', 'Lexus']
export const BODY_TYPES = ['Sedan', 'SUV', 'Coupe', 'Convertible', 'Hatchback', 'Pickup']
export const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'Hybrid']
export const TRANSMISSIONS = ['Automatic', 'Manual']
export const CONDITIONS = ['New', 'Used', 'Certified Pre-Owned']
export const LOCATIONS = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman']
export const PRICE_RANGES = [
  { label: 'Under $30K', min: 0, max: 30000 },
  { label: '$30K – $60K', min: 30000, max: 60000 },
  { label: '$60K – $100K', min: 60000, max: 100000 },
  { label: 'Over $100K', min: 100000, max: Infinity },
]
