# DriveX v2 — Automotive Marketplace, Rental & Ownership Platform

DriveX is a Next.js automotive platform covering vehicle discovery, buying, selling, rentals, comparison, finance, maintenance/services and user ownership workflows.

## What is included

- Professional multi-section home experience
- API-driven buy/inventory with sticky advanced filters
- Multi-step sell/listing wizard with draft persistence and validation
- Rental discovery with interactive date-range calendar, locations and add-ons
- Dynamic body-style/category and brand routes
- Four-vehicle comparison workspace
- Services marketplace plus maintenance, inspection, detailing, tuning, delivery, roadside, airport and wedding booking flows
- Finance/loan calculator with quote API
- User dashboard for saved cars, listings, rentals and alerts
- Glassmorphism navbar with category/brand mega-menu, autosuggest search, currency, language and theme controls
- Enterprise footer with newsletter, social proof and platform links
- Framer Motion page/card/micro-interactions and scroll-driven car animation
- Next.js route-handler mock APIs ready to replace with a real backend

## Core routes

```text
/
/cars
/cars/[id]
/list-your-car
/sell
/rentals
/rentals/[slug]
/categories
/categories/[category]
/brands/[brand]
/compare
/services
/maintenance
/inspection
/wash
/roadside
/services/airport
/services/wedding
/services/delivery
/tuning
/journal
/journal/[slug]
/privacy
/terms
/cookies
/accessibility
/calculator
/dashboard
/favorites
/about
/contact
```

## API routes

```text
GET|POST     /api/vehicles
GET|PATCH|DELETE /api/vehicles/[id]
GET          /api/search
GET          /api/meta
GET|POST     /api/bookings
GET|PATCH    /api/bookings/[id]
POST         /api/payments
POST         /api/finance/quote
POST         /api/services/book
GET          /api/dashboard
```

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for exact schemas, structure and production migration notes.

## Run locally

The upgraded source includes the previously missing `package.json`.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm start
```

Use a fresh `npm install` on the deployment OS rather than copying `node_modules` between Windows/Linux/macOS, because Next.js installs native SWC binaries per platform.
