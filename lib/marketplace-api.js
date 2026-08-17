// ─── DriveX Marketplace API ───────────────────────────────────────────────
// Realistic fake REST API layer. Replace with a real backend URL/ORM.
// All methods simulate network latency and return typed responses.

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms))
let nextId = 100

// ─── Data store (in-memory, survives hot-reload via module cache) ──────────
export const DB = {
  cars: [
    // ── Rentals ──────────────────────────────────────────────────────────
    {
      id: 1, listingType: 'rent', brand: 'BMW', model: 'X5', year: 2023,
      price: 120, priceType: 'day', weeklyPrice: 700, monthlyPrice: 2400,
      salePrice: null, negotiable: false,
      location: 'Dubai Marina', city: 'Dubai', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'SUV',
      mileage: 18000, seats: 5, doors: 4, engine: '3.0L Turbo', horsepower: 340, color: 'Black',
      condition: 'Used', rating: 4.8, reviews: 24, available: true,
      deposit: 500, minRentalDays: 1,
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=900&q=90',
        'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['Air Conditioning', 'Bluetooth', 'GPS', 'Parking Sensors', 'Rear Camera', 'Cruise Control', 'Leather Seats'],
      description: 'Premium BMW X5 in excellent condition. Perfect for business travel or family trips across the UAE. Full service history, all safety features active.',
      owner: { name: 'Ahmed Al Rashid', phone: '+971501234567', email: 'ahmed@drivex.ae', preferredContact: 'phone' },
      ownerId: 'user-1', status: 'active', views: 342, createdAt: '2024-01-15',
    },
    {
      id: 2, listingType: 'rent', brand: 'Mercedes-Benz', model: 'C200', year: 2024,
      price: 95, priceType: 'day', weeklyPrice: 560, monthlyPrice: 1900,
      salePrice: null, negotiable: false,
      location: 'Downtown Dubai', city: 'Dubai', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'Sedan',
      mileage: 5000, seats: 5, doors: 4, engine: '1.5L Turbo', horsepower: 204, color: 'Silver',
      condition: 'New', rating: 4.9, reviews: 18, available: true,
      deposit: 800, minRentalDays: 1,
      images: [
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['Air Conditioning', 'Bluetooth', 'GPS', 'Wireless Charging', 'Parking Sensors', 'Sunroof'],
      description: 'Brand new Mercedes C200 available for daily, weekly and monthly rentals. Immaculate interior, latest safety technology.',
      owner: { name: 'Sara Al Mazrouei', phone: '+971502345678', email: 'sara@drivex.ae', preferredContact: 'email' },
      ownerId: 'user-2', status: 'active', views: 512, createdAt: '2024-02-10',
    },
    {
      id: 3, listingType: 'rent', brand: 'Tesla', model: 'Model 3', year: 2023,
      price: 110, priceType: 'day', weeklyPrice: 650, monthlyPrice: 2200,
      salePrice: null, negotiable: false,
      location: 'Abu Dhabi', city: 'Abu Dhabi', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Electric', bodyType: 'Sedan',
      mileage: 8000, seats: 5, doors: 4, engine: 'Dual Motor Electric', horsepower: 450, color: 'White',
      condition: 'Used', rating: 4.7, reviews: 31, available: true,
      deposit: 600, minRentalDays: 2,
      images: [
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['Autopilot', 'GPS', 'Air Conditioning', 'Rear Camera', 'Bluetooth', 'USB Charging'],
      description: 'Zero-emission Tesla Model 3 Long Range. Includes Supercharger access. 0-100 in 4.4 seconds. Future-forward driving experience.',
      owner: { name: 'James Park', phone: '+971503456789', email: 'james@drivex.ae', preferredContact: 'phone' },
      ownerId: 'user-3', status: 'active', views: 287, createdAt: '2024-01-28',
    },
    {
      id: 4, listingType: 'rent', brand: 'Porsche', model: 'Cayenne', year: 2022,
      price: 180, priceType: 'day', weeklyPrice: 1050, monthlyPrice: 3500,
      salePrice: null, negotiable: false,
      location: 'Dubai Marina', city: 'Dubai', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'SUV',
      mileage: 22000, seats: 5, doors: 4, engine: '2.9L Biturbo V6', horsepower: 440, color: 'Blue',
      condition: 'Used', rating: 4.9, reviews: 12, available: false,
      deposit: 1200, minRentalDays: 2,
      images: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['Air Conditioning', 'GPS', 'Bluetooth', 'Parking Sensors', 'Rear Camera', 'Sport Chrono', 'Leather Seats', 'Sunroof'],
      description: 'Experience Porsche performance in a practical SUV. Sport Chrono package, Bose surround sound.',
      owner: { name: 'Leila Nour', phone: '+971504567890', email: 'leila@drivex.ae', preferredContact: 'email' },
      ownerId: 'user-1', status: 'active', views: 198, createdAt: '2024-03-01',
    },
    {
      id: 11, listingType: 'rent', brand: 'Lamborghini', model: 'Huracán', year: 2022,
      price: 850, priceType: 'day', weeklyPrice: 5000, monthlyPrice: 18000,
      salePrice: null, negotiable: false,
      location: 'Dubai Marina', city: 'Dubai', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'Sports',
      mileage: 7000, seats: 2, doors: 2, engine: '5.2L V10', horsepower: 631, color: 'Yellow',
      condition: 'Used', rating: 5.0, reviews: 8, available: true,
      deposit: 5000, minRentalDays: 1,
      images: [
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['Carbon Fibre Interior', 'Sport Exhaust', 'Launch Control', 'GPS', 'Rear Camera', 'Alcantara Steering'],
      description: 'Iconic Lamborghini Huracán Evo. 0–100 km/h in 2.9 seconds. The ultimate weekend supercar experience in Dubai.',
      owner: { name: 'Prestige Rentals', phone: '+97150888000', email: 'vip@prestigerent.ae', preferredContact: 'phone' },
      ownerId: 'user-vip', status: 'active', views: 1200, createdAt: '2024-02-05',
    },
    {
      id: 12, listingType: 'rent', brand: 'Rolls-Royce', model: 'Ghost', year: 2023,
      price: 1200, priceType: 'day', weeklyPrice: 7500, monthlyPrice: 28000,
      salePrice: null, negotiable: true,
      location: 'Downtown Dubai', city: 'Dubai', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'Sedan',
      mileage: 3000, seats: 5, doors: 4, engine: '6.75L Twin-Turbo V12', horsepower: 563, color: 'Silver',
      condition: 'New', rating: 5.0, reviews: 4, available: true,
      deposit: 8000, minRentalDays: 1,
      images: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['Starlight Headliner', 'Bespoke Audio', 'Massage Seats', 'Air Purification', 'GPS', 'Champagne Cooler', 'Leather'],
      description: 'The pinnacle of automotive luxury. Rolls-Royce Ghost with bespoke interior. Ideal for weddings, VIP transfers and special occasions.',
      owner: { name: 'Royal Fleet Dubai', phone: '+97150999111', email: 'fleet@royaldxb.ae', preferredContact: 'email' },
      ownerId: 'user-royal', status: 'active', views: 890, createdAt: '2024-03-10',
    },
    {
      id: 13, listingType: 'rent', brand: 'Toyota', model: 'Land Cruiser', year: 2023,
      price: 150, priceType: 'day', weeklyPrice: 900, monthlyPrice: 3000,
      salePrice: null, negotiable: false,
      location: 'Sharjah', city: 'Sharjah', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'SUV',
      mileage: 12000, seats: 7, doors: 4, engine: '4.0L V6', horsepower: 270, color: 'White',
      condition: 'Used', rating: 4.7, reviews: 44, available: true,
      deposit: 900, minRentalDays: 1,
      images: [
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['Air Conditioning', 'GPS', 'Bluetooth', 'Parking Sensors', 'Rear Camera', 'Cruise Control', 'Leather Seats'],
      description: '7-seater Toyota Land Cruiser, ideal for family trips or off-road adventures. Fully loaded spec.',
      owner: { name: 'Ahmed Al Rashid', phone: '+971501234567', email: 'ahmed@drivex.ae', preferredContact: 'phone' },
      ownerId: 'user-1', status: 'active', views: 621, createdAt: '2024-02-15',
    },
    {
      id: 14, listingType: 'rent', brand: 'Ferrari', model: 'Roma', year: 2023,
      price: 750, priceType: 'day', weeklyPrice: 4500, monthlyPrice: 16000,
      salePrice: null, negotiable: false,
      location: 'Dubai Marina', city: 'Dubai', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'Sports',
      mileage: 5500, seats: 4, doors: 2, engine: '3.9L Twin-Turbo V8', horsepower: 620, color: 'Red',
      condition: 'Used', rating: 4.9, reviews: 9, available: true,
      deposit: 4000, minRentalDays: 1,
      images: [
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['Carbon Ceramic Brakes', 'Manetino Drive Mode', 'JBL Sound', 'GPS', 'Rear Camera', 'Sport Exhaust', 'Apple CarPlay'],
      description: 'Ferrari Roma — la dolce vita on wheels. Effortless grand tourer with iconic Italian style and pulse-raising performance.',
      owner: { name: 'Prestige Rentals', phone: '+97150888000', email: 'vip@prestigerent.ae', preferredContact: 'phone' },
      ownerId: 'user-vip', status: 'active', views: 955, createdAt: '2024-01-22',
    },
    // ── For Sale ──────────────────────────────────────────────────────────
    {
      id: 5, listingType: 'sale', brand: 'BMW', model: '5 Series', year: 2023,
      price: 54900, priceType: 'total', weeklyPrice: null, monthlyPrice: null,
      salePrice: 54900, negotiable: true,
      location: 'Dubai', city: 'Dubai', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'Sedan',
      mileage: 15000, seats: 5, doors: 4, engine: '2.0L Turbo', horsepower: 252, color: 'Black',
      condition: 'Used', rating: 4.8, reviews: 8, available: true,
      deposit: null, minRentalDays: null,
      images: [
        'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=90',
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['Heated Seats', 'Panoramic Roof', 'GPS', 'Lane Assist', 'Parking Sensors', 'Bluetooth', 'Cruise Control'],
      description: 'Meticulously maintained BMW 5 Series with full service history. Single owner, low mileage. Exceptional condition inside and out.',
      owner: { name: 'Elite Motors Dubai', phone: '+97140001111', email: 'sales@elitemotors.ae', preferredContact: 'phone' },
      ownerId: 'user-dealer-1', status: 'active', views: 2340, createdAt: '2024-01-05',
      financing: { available: true, monthlyFrom: 1250, downPayment: 10000, term: 48 },
    },
    {
      id: 6, listingType: 'sale', brand: 'Mercedes-Benz', model: 'GLC 300', year: 2024,
      price: 55000, priceType: 'total', weeklyPrice: null, monthlyPrice: null,
      salePrice: 55000, negotiable: false,
      location: 'Abu Dhabi', city: 'Abu Dhabi', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'SUV',
      mileage: 1200, seats: 5, doors: 4, engine: '2.0L Turbo', horsepower: 258, color: 'White',
      condition: 'New', rating: 4.9, reviews: 3, available: true,
      deposit: null, minRentalDays: null,
      images: [
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['MBUX Infotainment', 'Panoramic Roof', 'GPS', 'Burmester Sound', 'Air Suspension', 'Bluetooth', 'Wireless Charging'],
      description: 'Brand new GLC 300 from authorised dealer with full factory warranty. Delivery mileage only.',
      owner: { name: 'Stars Automotive', phone: '+97125554321', email: 'info@starsauto.ae', preferredContact: 'email' },
      ownerId: 'user-dealer-4', status: 'active', views: 1870, createdAt: '2024-02-28',
      financing: { available: true, monthlyFrom: 1300, downPayment: 10000, term: 48 },
    },
    {
      id: 7, listingType: 'sale', brand: 'Range Rover', model: 'Sport', year: 2023,
      price: 95000, priceType: 'total', weeklyPrice: null, monthlyPrice: null,
      salePrice: 95000, negotiable: true,
      location: 'Dubai', city: 'Dubai', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'SUV',
      mileage: 5000, seats: 5, doors: 4, engine: '3.0L Inline-6', horsepower: 395, color: 'Green',
      condition: 'New', rating: 4.9, reviews: 6, available: true,
      deposit: null, minRentalDays: null,
      images: [
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['Meridian Sound', 'Terrain Response 2', 'Panoramic Roof', 'Massage Seats', 'Air Conditioning', 'GPS', 'Bluetooth'],
      description: 'Nearly new Range Rover Sport with full specification. Air suspension, panoramic glass roof and premium Meridian sound.',
      owner: { name: 'Prestige Cars', phone: '+97120002222', email: 'hello@prestigecars.ae', preferredContact: 'phone' },
      ownerId: 'user-dealer-2', status: 'active', views: 4100, createdAt: '2024-02-20',
      financing: { available: true, monthlyFrom: 2200, downPayment: 20000, term: 60 },
    },
    {
      id: 8, listingType: 'sale', brand: 'Audi', model: 'Q8', year: 2022,
      price: 72000, priceType: 'total', weeklyPrice: null, monthlyPrice: null,
      salePrice: 72000, negotiable: true,
      location: 'Sharjah', city: 'Sharjah', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'SUV',
      mileage: 31000, seats: 5, doors: 4, engine: '3.0L TFSI V6', horsepower: 340, color: 'Grey',
      condition: 'Used', rating: 4.6, reviews: 11, available: true,
      deposit: null, minRentalDays: null,
      images: [
        'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['Virtual Cockpit', 'Bang & Olufsen', '360 Camera', 'Matrix LED', 'Air Conditioning', 'Bluetooth', 'GPS'],
      description: 'Audi Q8 with Bang & Olufsen premium audio and all-glass panoramic roof. Quattro AWD system.',
      owner: { name: 'Greenline Auto', phone: '+97160003333', email: 'info@greenlineauto.ae', preferredContact: 'phone' },
      ownerId: 'user-dealer-3', status: 'active', views: 980, createdAt: '2024-01-30',
      financing: { available: true, monthlyFrom: 1700, downPayment: 14000, term: 48 },
    },
    {
      id: 10, listingType: 'sale', brand: 'Lexus', model: 'LX 600', year: 2023,
      price: 148000, priceType: 'total', weeklyPrice: null, monthlyPrice: null,
      salePrice: 148000, negotiable: false,
      location: 'Dubai', city: 'Dubai', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'SUV',
      mileage: 9000, seats: 7, doors: 4, engine: '3.5L Twin-Turbo V6', horsepower: 415, color: 'Black',
      condition: 'Used', rating: 5.0, reviews: 5, available: true,
      deposit: null, minRentalDays: null,
      images: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['Mark Levinson Audio', 'Panoramic Roof', 'GPS', 'Massage Seats', 'Air Conditioning', 'Bluetooth', 'Wireless Charging'],
      description: 'Flagship Lexus LX 600 Ultra Luxury. Mark Levinson 25-speaker audio, 4-seat captain configuration available.',
      owner: { name: 'Elite Motors Dubai', phone: '+97140001111', email: 'sales@elitemotors.ae', preferredContact: 'email' },
      ownerId: 'user-dealer-1', status: 'active', views: 1740, createdAt: '2024-03-05',
      financing: { available: true, monthlyFrom: 3400, downPayment: 30000, term: 60 },
    },
    {
      id: 15, listingType: 'sale', brand: 'Porsche', model: '911 Carrera', year: 2023,
      price: 185000, priceType: 'total', weeklyPrice: null, monthlyPrice: null,
      salePrice: 185000, negotiable: false,
      location: 'Dubai', city: 'Dubai', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'Sports',
      mileage: 3000, seats: 4, doors: 2, engine: '3.0L Twin-Turbo Flat-6', horsepower: 385, color: 'Red',
      condition: 'New', rating: 5.0, reviews: 3, available: true,
      deposit: null, minRentalDays: null,
      images: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['Sport Chrono Package', 'Bose Sound', 'PDCC', 'Carbon Ceramic Brakes', 'Rear Axle Steering', 'Sports Exhaust', 'LED Matrix'],
      description: 'New generation Porsche 911 Carrera. PDK transmission, Sport Chrono package and rear-axle steering make this the sharpest 911 yet.',
      owner: { name: 'Premier Auto UAE', phone: '+97104000777', email: 'enquiries@premierauto.ae', preferredContact: 'email' },
      ownerId: 'user-dealer-5', status: 'active', views: 3200, createdAt: '2024-03-01',
      financing: { available: true, monthlyFrom: 4200, downPayment: 37000, term: 60 },
    },
    {
      id: 16, listingType: 'sale', brand: 'Tesla', model: 'Model S Plaid', year: 2023,
      price: 121000, priceType: 'total', weeklyPrice: null, monthlyPrice: null,
      salePrice: 121000, negotiable: true,
      location: 'Abu Dhabi', city: 'Abu Dhabi', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Electric', bodyType: 'Sedan',
      mileage: 11000, seats: 5, doors: 4, engine: 'Tri Motor Electric', horsepower: 1020, color: 'White',
      condition: 'Used', rating: 4.8, reviews: 7, available: true,
      deposit: null, minRentalDays: null,
      images: [
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['Autopilot FSD', 'Yoke Steering', '21-Speaker Audio', 'Gaming Mode', 'Tri-Zone Climate', 'Full Self-Driving'],
      description: 'Tesla Model S Plaid — 1,020 hp, 0-100 in 2.1 seconds. The fastest production sedan on the planet, period.',
      owner: { name: 'EV Select UAE', phone: '+97154001234', email: 'hello@evselect.ae', preferredContact: 'email' },
      ownerId: 'user-ev', status: 'active', views: 2800, createdAt: '2024-02-18',
      financing: { available: true, monthlyFrom: 2800, downPayment: 24000, term: 60 },
    },
    {
      id: 17, listingType: 'sale', brand: 'Toyota', model: 'Camry', year: 2022,
      price: 28500, priceType: 'total', weeklyPrice: null, monthlyPrice: null,
      salePrice: 28500, negotiable: true,
      location: 'Abu Dhabi', city: 'Abu Dhabi', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'Sedan',
      mileage: 42000, seats: 5, doors: 4, engine: '2.5L VVT-i', horsepower: 203, color: 'Silver',
      condition: 'Used', rating: 4.4, reviews: 15, available: true,
      deposit: null, minRentalDays: null,
      images: [
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=90',
      ],
      features: ['Apple CarPlay', 'Android Auto', 'GPS', 'Rear Camera', 'Bluetooth', 'Cruise Control', 'Lane Assist'],
      description: 'Reliable Toyota Camry with full service history. Ideal family sedan with low running costs and excellent long-term dependability.',
      owner: { name: 'Tariq Hassan', phone: '+971506667788', email: 'tariq@drivex.ae', preferredContact: 'phone' },
      ownerId: 'user-5', status: 'active', views: 660, createdAt: '2023-12-10',
      financing: { available: false },
    },
    {
      id: 18, listingType: 'sale', brand: 'Audi', model: 'A6', year: 2023,
      price: 61000, priceType: 'total', weeklyPrice: null, monthlyPrice: null,
      salePrice: 61000, negotiable: true,
      location: 'Dubai', city: 'Dubai', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Hybrid', bodyType: 'Sedan',
      mileage: 7500, seats: 5, doors: 4, engine: '2.0L TFSI MHEV', horsepower: 265, color: 'Grey',
      condition: 'New', rating: 4.7, reviews: 5, available: true,
      deposit: null, minRentalDays: null,
      images: [
        'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['Mild Hybrid', 'Virtual Cockpit Plus', 'Matrix LED', 'Adaptive Cruise', 'Bang & Olufsen', 'GPS', 'Wireless Charging'],
      description: 'Latest-spec Audi A6 with mild-hybrid efficiency. Executive presence, tech-forward interior and a remarkably composed ride.',
      owner: { name: 'Greenline Auto', phone: '+97160003333', email: 'info@greenlineauto.ae', preferredContact: 'phone' },
      ownerId: 'user-dealer-3', status: 'active', views: 1140, createdAt: '2024-02-01',
      financing: { available: true, monthlyFrom: 1450, downPayment: 12000, term: 48 },
    },
    {
      id: 19, listingType: 'sale', brand: 'BMW', model: 'iX', year: 2023,
      price: 87000, priceType: 'total', weeklyPrice: null, monthlyPrice: null,
      salePrice: 87000, negotiable: false,
      location: 'Dubai', city: 'Dubai', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Electric', bodyType: 'SUV',
      mileage: 6000, seats: 5, doors: 4, engine: 'Dual Motor Electric', horsepower: 523, color: 'Blue',
      condition: 'New', rating: 4.8, reviews: 4, available: true,
      deposit: null, minRentalDays: null,
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['BMW Curved Display', 'Harman Kardon', 'Panoramic Roof', 'Wireless Charging', 'Driver Assist Pro', 'Ambient Lighting'],
      description: 'The BMW iX is a tech showcase — curved display, sustainable luxury interior, and over 600 km range. The future of SUV driving.',
      owner: { name: 'Elite Motors Dubai', phone: '+97140001111', email: 'sales@elitemotors.ae', preferredContact: 'email' },
      ownerId: 'user-dealer-1', status: 'active', views: 1980, createdAt: '2024-03-08',
      financing: { available: true, monthlyFrom: 2000, downPayment: 17000, term: 60 },
    },
    {
      id: 20, listingType: 'sale', brand: 'Mercedes-Benz', model: 'S-Class', year: 2022,
      price: 130000, priceType: 'total', weeklyPrice: null, monthlyPrice: null,
      salePrice: 130000, negotiable: true,
      location: 'Dubai', city: 'Dubai', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'Sedan',
      mileage: 14000, seats: 5, doors: 4, engine: '3.0L Inline-6 Turbo', horsepower: 429, color: 'Black',
      condition: 'Used', rating: 4.9, reviews: 9, available: true,
      deposit: null, minRentalDays: null,
      images: [
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['MBUX Hyperscreen', 'Burmester 4D', 'Air Suspension', 'Massage Seats', 'Rear Seat Entertainment', 'Ambient Lighting', 'Night Vision'],
      description: 'S-Class in long-wheelbase configuration with rear-seat entertainment. The benchmark executive sedan, expertly specified.',
      owner: { name: 'Stars Automotive', phone: '+97125554321', email: 'info@starsauto.ae', preferredContact: 'email' },
      ownerId: 'user-dealer-4', status: 'active', views: 3600, createdAt: '2024-01-12',
      financing: { available: true, monthlyFrom: 3000, downPayment: 26000, term: 60 },
    },
    {
      id: 21, listingType: 'sale', brand: 'Nissan', model: 'Patrol', year: 2022,
      price: 52000, priceType: 'total', weeklyPrice: null, monthlyPrice: null,
      salePrice: 52000, negotiable: true,
      location: 'Sharjah', city: 'Sharjah', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'SUV',
      mileage: 35000, seats: 7, doors: 4, engine: '4.0L V6', horsepower: 272, color: 'White',
      condition: 'Used', rating: 4.5, reviews: 19, available: true,
      deposit: null, minRentalDays: null,
      images: [
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=90',
      ],
      features: ['GPS', 'Leather Seats', 'Rear Camera', 'Bluetooth', 'Cruise Control', '7-Seater', 'Roof Rails'],
      description: 'Well-maintained Nissan Patrol with 7-seat configuration. Perfect for the UAE terrain and family use.',
      owner: { name: 'Farid Al Kaabi', phone: '+971507778899', email: 'farid@drivex.ae', preferredContact: 'phone' },
      ownerId: 'user-6', status: 'active', views: 445, createdAt: '2023-11-20',
    },
    {
      id: 22, listingType: 'rent', brand: 'Chevrolet', model: 'Tahoe', year: 2023,
      price: 200, priceType: 'day', weeklyPrice: 1200, monthlyPrice: 4200,
      salePrice: null, negotiable: false,
      location: 'Dubai', city: 'Dubai', country: 'UAE',
      transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'SUV',
      mileage: 8000, seats: 8, doors: 4, engine: '5.3L V8', horsepower: 355, color: 'Black',
      condition: 'New', rating: 4.6, reviews: 11, available: true,
      deposit: 1000, minRentalDays: 2,
      images: [
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=90',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=90',
      ],
      features: ['8-Seater', 'GPS', 'Apple CarPlay', 'Rear Camera', 'Sunroof', 'Heated Seats', 'Bluetooth'],
      description: 'Full-size Chevrolet Tahoe SUV, perfect for large groups, airport transfers, or desert trips. Powerful V8 and maximum comfort.',
      owner: { name: 'Desert Fleet', phone: '+97154002345', email: 'fleet@desertdxb.ae', preferredContact: 'phone' },
      ownerId: 'user-desert', status: 'active', views: 530, createdAt: '2024-02-25',
    },
  ],

  bookings: [
    {
      id: 'BK-001', carId: 1, userId: 'user-me',
      car: { brand: 'BMW', model: 'X5', year: 2023, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=90' },
      pickupDate: '2026-08-20', returnDate: '2026-08-25',
      pickupTime: '10:00', returnTime: '10:00',
      pickupLocation: 'Dubai Marina', dropoffLocation: 'Dubai Marina',
      driverName: 'Alex Morgan', driverLicense: 'DL-123456', driverAge: 28,
      days: 5, dailyRate: 120, insurance: 50, serviceFee: 25, tax: 29, discount: 0, total: 354,
      status: 'confirmed', paymentStatus: 'paid', paymentMethod: 'card',
      transactionId: 'TXN-445512', createdAt: '2026-08-10',
    },
    {
      id: 'BK-002', carId: 2, userId: 'user-me',
      car: { brand: 'Mercedes-Benz', model: 'C200', year: 2024, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=90' },
      pickupDate: '2026-07-10', returnDate: '2026-07-13',
      pickupTime: '09:00', returnTime: '09:00',
      pickupLocation: 'Downtown Dubai', dropoffLocation: 'Dubai Airport',
      driverName: 'Alex Morgan', driverLicense: 'DL-123456', driverAge: 28,
      days: 3, dailyRate: 95, insurance: 30, serviceFee: 20, tax: 21, discount: 0, total: 286,
      status: 'completed', paymentStatus: 'paid', paymentMethod: 'card',
      transactionId: 'TXN-332241', createdAt: '2026-07-01',
    },
  ],

  userListings: [
    {
      id: 201, listingType: 'rent', brand: 'Nissan', model: 'Patrol', year: 2021,
      price: 130, salePrice: null, city: 'Dubai', status: 'active',
      images: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=90'],
      views: 45, createdAt: '2026-06-01',
    },
    {
      id: 202, listingType: 'sale', brand: 'Toyota', model: 'Camry', year: 2020,
      price: null, salePrice: 28500, city: 'Abu Dhabi', status: 'pending',
      images: ['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=90'],
      views: 12, createdAt: '2026-07-15',
    },
  ],

  testDrives: [],
  tradeIns: [],
}

// ─── API Methods ──────────────────────────────────────────────────────────
export const marketplaceApi = {
  async getCars(filters = {}) {
    await delay(400)
    let r = [...DB.cars]
    if (filters.listingType && filters.listingType !== 'all') r = r.filter(c => c.listingType === filters.listingType)
    if (filters.brand)        r = r.filter(c => c.brand.toLowerCase().includes(filters.brand.toLowerCase()))
    if (filters.bodyType)     r = r.filter(c => c.bodyType === filters.bodyType)
    if (filters.fuelType)     r = r.filter(c => c.fuelType === filters.fuelType)
    if (filters.transmission) r = r.filter(c => c.transmission === filters.transmission)
    if (filters.city)         r = r.filter(c => c.city === filters.city)
    if (filters.condition)    r = r.filter(c => c.condition === filters.condition)
    if (filters.color)        r = r.filter(c => c.color?.toLowerCase() === filters.color.toLowerCase())
    if (filters.minHp)        r = r.filter(c => (c.horsepower || 0) >= Number(filters.minHp))
    if (filters.maxHp)        r = r.filter(c => (c.horsepower || 0) <= Number(filters.maxHp))
    if (filters.minPrice)     r = r.filter(c => c.price >= Number(filters.minPrice))
    if (filters.maxPrice)     r = r.filter(c => c.price <= Number(filters.maxPrice))
    if (filters.minYear)      r = r.filter(c => c.year >= Number(filters.minYear))
    if (filters.maxYear)      r = r.filter(c => c.year <= Number(filters.maxYear))
    if (filters.minMileage)   r = r.filter(c => Number(c.mileage || 0) >= Number(filters.minMileage))
    if (filters.maxMileage)   r = r.filter(c => Number(c.mileage || 0) <= Number(filters.maxMileage))
    if (filters.seats)        r = r.filter(c => c.seats >= Number(filters.seats))
    if (filters.available !== undefined) r = r.filter(c => c.available === filters.available)
    if (filters.q) {
      const q = filters.q.toLowerCase()
      r = r.filter(c => `${c.brand} ${c.model}`.toLowerCase().includes(q) || c.city?.toLowerCase().includes(q) || c.bodyType?.toLowerCase().includes(q))
    }
    const page  = Number(filters.page  || 1)
    const limit = Number(filters.limit || 9)
    const sort  = filters.sort || 'newest'
    if (sort === 'price-asc')  r.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') r.sort((a, b) => b.price - a.price)
    if (sort === 'newest')     r.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    if (sort === 'oldest')     r.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    if (sort === 'rating')     r.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    const total = r.length
    const items = r.slice((page - 1) * limit, page * limit)
    return { items, total, page, limit, pages: Math.ceil(total / limit) }
  },

  async getCarById(id) {
    await delay(250)
    const car = DB.cars.find(c => c.id === Number(id))
    if (!car) throw new Error('Car not found')
    return car
  },

  async getRelatedCars(id, limit = 4) {
    await delay(200)
    const car = DB.cars.find(c => c.id === Number(id))
    if (!car) return []
    return DB.cars.filter(c => c.id !== Number(id) && (c.brand === car.brand || c.bodyType === car.bodyType)).slice(0, limit)
  },

  async createListing(data) {
    await delay(600)
    const listing = { ...data, id: ++nextId, status: 'pending', views: 0, rating: null, reviews: 0, createdAt: new Date().toISOString().split('T')[0] }
    DB.cars.push(listing)
    DB.userListings.push({ id: listing.id, listingType: listing.listingType, brand: listing.brand, model: listing.model, year: listing.year, price: listing.price, salePrice: listing.salePrice, city: listing.city, status: 'pending', images: listing.images || [], views: 0, createdAt: listing.createdAt })
    return listing
  },

  async updateListing(id, data) {
    await delay(400)
    const idx = DB.cars.findIndex(c => c.id === Number(id))
    if (idx === -1) throw new Error('Listing not found')
    DB.cars[idx] = { ...DB.cars[idx], ...data }
    return DB.cars[idx]
  },

  async deleteListing(id) {
    await delay(300)
    DB.cars = DB.cars.filter(c => c.id !== Number(id))
    DB.userListings = DB.userListings.filter(c => c.id !== Number(id))
    return { success: true }
  },

  async getMyListings() {
    await delay(300)
    return [...DB.userListings]
  },

  async getBrands() {
    await delay(100)
    return [...new Set(DB.cars.map(c => c.brand))].sort()
  },

  async getLocations() {
    await delay(100)
    return [...new Set(DB.cars.map(c => c.city))].sort()
  },

  async getMeta() {
    await delay(150)
    return {
      brands:    [...new Set(DB.cars.map(c => c.brand))].sort(),
      bodyTypes: [...new Set(DB.cars.map(c => c.bodyType).filter(Boolean))].sort(),
      fuelTypes: [...new Set(DB.cars.map(c => c.fuelType).filter(Boolean))].sort(),
      cities:    [...new Set(DB.cars.map(c => c.city).filter(Boolean))].sort(),
      colors:    [...new Set(DB.cars.map(c => c.color).filter(Boolean))].sort(),
      conditions:['New', 'Used'],
    }
  },

  // Bookings
  async getBookings() {
    await delay(350)
    return [...DB.bookings]
  },

  async getBookingById(id) {
    await delay(200)
    const b = DB.bookings.find(b => b.id === id)
    if (!b) throw new Error('Booking not found')
    return b
  },

  async createBooking(data) {
    await delay(500)
    const id = `BK-${String(DB.bookings.length + 1).padStart(3, '0')}`
    const booking = { ...data, id, status: 'pending', paymentStatus: 'pending', createdAt: new Date().toISOString().split('T')[0] }
    DB.bookings.unshift(booking)
    return booking
  },

  async cancelBooking(id) {
    await delay(400)
    const b = DB.bookings.find(b => b.id === id)
    if (!b) throw new Error('Booking not found')
    b.status = 'cancelled'
    return b
  },

  // Test Drives
  async bookTestDrive(data) {
    await delay(600)
    const id = `TD-${String(DB.testDrives.length + 1).padStart(3, '0')}`
    const td = { ...data, id, status: 'confirmed', createdAt: new Date().toISOString().split('T')[0] }
    DB.testDrives.push(td)
    return td
  },

  // Trade-in / Valuation
  async getTradeInValuation(data) {
    await delay(800)
    // Simplified valuation formula
    const base = data.estimatedValue || 50000
    const ageFactor = Math.max(0.4, 1 - (new Date().getFullYear() - data.year) * 0.06)
    const mileageFactor = Math.max(0.5, 1 - (data.mileage / 200000) * 0.35)
    const conditionMultipliers = { Excellent: 1, Good: 0.88, Fair: 0.72, Poor: 0.55 }
    const condFactor = conditionMultipliers[data.condition] || 0.8
    const value = Math.round(base * ageFactor * mileageFactor * condFactor / 500) * 500
    const id = `TI-${String(DB.tradeIns.length + 1).padStart(3, '0')}`
    const entry = { ...data, id, estimatedTradeInValue: value, createdAt: new Date().toISOString().split('T')[0] }
    DB.tradeIns.push(entry)
    return { id, estimatedTradeInValue: value, min: Math.round(value * 0.92), max: Math.round(value * 1.08) }
  },

  // Payments
  async processPayment({ bookingId, amount, method, cardDetails }) {
    await delay(1400)
    if (Math.random() < 0.05) throw new Error('Payment declined. Please try a different method.')
    const txnId = `TXN-${Math.floor(Math.random() * 900000) + 100000}`
    const booking = DB.bookings.find(b => b.id === bookingId)
    if (booking) { booking.paymentStatus = 'paid'; booking.paymentMethod = method; booking.transactionId = txnId; booking.status = 'confirmed' }
    return { success: true, transactionId: txnId, bookingId, amount, method, status: 'paid', timestamp: new Date().toISOString() }
  },

  // Search
  async search(q) {
    await delay(120)
    const term = q.toLowerCase()
    return DB.cars
      .filter(c => `${c.brand} ${c.model}`.toLowerCase().includes(term) || c.city?.toLowerCase().includes(term) || c.bodyType?.toLowerCase().includes(term))
      .slice(0, 8)
      .map(c => ({ id: c.id, label: `${c.brand} ${c.model}`, meta: `${c.year} · ${c.city} · ${c.listingType === 'rent' ? `AED ${c.price}/day` : `AED ${c.price?.toLocaleString()}` }`, image: c.images?.[0] }))
  },

  // Dashboard
  async getDashboard() {
    await delay(350)
    return {
      stats: { totalListings: DB.userListings.length, activeRentals: DB.bookings.filter(b => b.status === 'confirmed').length, totalViews: DB.userListings.reduce((a, l) => a + (l.views || 0), 0), pendingBookings: DB.bookings.filter(b => b.status === 'pending').length },
      bookings: DB.bookings.slice(0, 5),
      listings: DB.userListings,
      alerts: [{ id: 1, type: 'info', message: 'Your listing "Nissan Patrol" has 3 new inquiries.' }, { id: 2, type: 'success', message: 'Booking BK-001 confirmed and payment received.' }],
    }
  },
}
