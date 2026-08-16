# DriveX v2 Architecture & API Readiness

## Starting-project assessment

The uploaded project already contained a strong visual foundation and a large number of automotive routes, but several core integration gaps prevented it from being a production-ready platform:

- `package.json` was missing from the uploaded source.
- Pages referenced `/services/carService`, `/services/bookingService`, and `/services/paymentService`, but those modules did not exist.
- Marketplace data was split across page-local/static sources instead of a consistent HTTP contract.
- Brand/category deep links, finance calculator, full compare workspace, service booking API, dashboard API, search suggestions, currency state, and theme state were incomplete or absent.
- The existing header/footer did not provide the requested enterprise navigation, mega-menu, quick search, theme/currency controls, and prominent listing CTA.
- Several service detail pages were visually thin and did not submit structured API-ready service requests.

The v2 refactor keeps the existing UI direction and routes, while adding a clean HTTP boundary between client components and the mock server data layer.

## Core structure

```text
app/
├─ api/
│  ├─ vehicles/route.js
│  ├─ vehicles/[id]/route.js
│  ├─ bookings/route.js
│  ├─ bookings/[id]/route.js
│  ├─ dashboard/route.js
│  ├─ finance/quote/route.js
│  ├─ meta/route.js
│  ├─ payments/route.js
│  ├─ search/route.js
│  └─ services/book/route.js
├─ brands/[brand]/page.jsx
├─ calculator/
│  ├─ page.jsx
│  └─ calculator.jsx
├─ cars/
│  ├─ page.jsx
│  ├─ cars.jsx
│  └─ [id]/page.jsx
├─ categories/
│  ├─ page.jsx
│  ├─ categories.jsx
│  └─ [category]/page.jsx
├─ compare/
├─ dashboard/
├─ journal/[slug]/
├─ list-your-car/
├─ rentals/
├─ services/
│  ├─ airport/
│  ├─ delivery/
│  └─ wedding/
├─ tuning/
├─ privacy/
├─ terms/
├─ cookies/
├─ accessibility/
└─ ...existing account, dealer, profile, checkout and content routes

components/
├─ platform/
│  ├─ car-driving-animation.jsx
│  ├─ rental-date-range-picker.jsx
│  ├─ rich-sections.jsx
│  ├─ service-detail-page.jsx
│  └─ vehicle-collection.jsx
├─ currency-switcher.jsx
├─ theme-toggle.jsx
├─ site-header.jsx
└─ site-footer.jsx

context/
├─ CurrencyContext.jsx
├─ FavoritesContext.jsx
├─ LangContext.jsx
├─ ThemeContext.jsx
└─ ToastContext.jsx

features/cars/components/
├─ CarCard.jsx
└─ CarFilters.jsx

hooks/
└─ useDebouncedValue.js

lib/
├─ api-response.js
├─ client-api.js
├─ marketplace-api.js
├─ rental-catalog.js
└─ ...existing helpers

services/
├─ carService.js
├─ bookingService.js
└─ paymentService.js
```

## HTTP API contracts

### `GET /api/vehicles`

Supported query parameters:

- `listingType`: `sale | rent`
- `q`
- `brand`
- `bodyType`
- `fuelType`
- `transmission`
- `city`
- `minPrice`, `maxPrice`
- `minYear`, `maxYear`
- `minMileage`, `maxMileage`
- `seats`
- `available`
- `sort`: `newest | oldest | price-asc | price-desc | rating`
- `page`, `limit`
- `relatedTo=<vehicleId>`
- `mine=1`

Response:

```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "limit": 9,
  "pages": 1
}
```

### `POST /api/vehicles`

Creates a listing from the multi-step sell wizard. The same contract can be forwarded to a production listing service without changing page-level code.

### `GET | PATCH | DELETE /api/vehicles/:id`

Vehicle detail/update/delete endpoint.

### `GET /api/search?q=`

Returns lightweight vehicle autosuggestions for global search and inventory search.

### `GET /api/meta`

Returns dynamic filter/catalog data:

```json
{
  "brands": [],
  "bodyTypes": [],
  "fuelTypes": [],
  "cities": [],
  "rentalCategories": [],
  "rentalLocations": [],
  "services": []
}
```

### `GET | POST /api/bookings`

Lists or creates rental bookings.

### `GET | PATCH /api/bookings/:id`

Reads a booking or performs booking actions such as cancellation.

### `POST /api/payments`

Processes the mock checkout/payment request and returns a transaction ID/status.

### `POST /api/finance/quote`

Input:

```json
{
  "vehiclePrice": 125000,
  "downPayment": 25000,
  "interestRate": 3.49,
  "termMonths": 60
}
```

Response includes financed amount, monthly payment, total interest, and total paid.

### `POST /api/services/book`

Input:

```json
{
  "service": "inspection",
  "date": "2026-08-20",
  "time": "10:00",
  "location": "Dubai Marina",
  "name": "Alex Morgan",
  "phone": "+971500000000",
  "vehicle": "2023 BMW X5",
  "notes": "Pre-purchase inspection"
}
```

Response returns a structured service request ID and status.

### `GET /api/dashboard`

Returns one dashboard model containing profile, KPI/stat cards, saved vehicles, bookings, user listings, and alerts.

## Feature coverage

### Home

The existing rich home page was retained and expanded with:

- API-backed featured inventory
- interactive hero make/model/price/year search
- scroll-driven car animation
- trust/service guarantees
- testimonials
- FAQ
- automotive journal/news section

### Inventory

- API-driven inventory
- make/brand, body type, fuel, transmission, location, seats, year, mileage, price, and availability filters
- API-driven filter metadata
- autosuggestion search
- sticky filters
- grid/list views
- sorting
- pagination
- responsive mobile filter drawer

### Sell

- multi-step listing wizard retained
- per-step validation
- draft auto-save/restore
- progress flow
- structured create-listing API submission
- `/sell` routes directly to the full wizard

### Rent

- interactive date-range calendar
- location selection
- fleet filtering
- rental detail pricing estimator
- add-ons
- pickup/drop-off location controls
- booking draft/review flow
- currency-aware pricing

### Categories & brands

- API-filtered dynamic collection routes
- `/categories/[category]`
- `/brands/[brand]`
- category/body-style discovery grid
- live brand list from metadata endpoint

### Comparison

- up to four vehicles
- searchable vehicle picker
- sticky comparison matrix
- price/spec/feature matrix
- responsive horizontal comparison layout

### Services

- service catalog
- structured booking request
- individual rich service pages for maintenance, inspection, detailing, tuning, vehicle delivery, roadside, airport and wedding transport
- service packages, standards, process, trust, testimonials, FAQ and editorial content

### Financing

- interactive calculator
- quote API
- payment breakdown
- inventory jump based on budget

### Dashboard

- API-driven user summary
- favorites
- listings and status
- rental activity
- alerts
- profile context

### Navigation and theme

- sticky glassmorphism header
- category + brand mega-menu
- global search command/popover
- currency switcher
- language switcher
- dark/light theme
- wishlist counter
- compare shortcut
- dashboard shortcut
- high-visibility listing CTA
- animated mobile drawer
- enterprise multi-column footer

## Production backend migration

The UI calls `services/*Service.js`, and those services call `/api/*` through `lib/client-api.js`. To connect a real backend, either:

1. keep the Next route handlers as a BFF/proxy and replace `lib/marketplace-api.js` calls with upstream fetches, or
2. point service methods directly at the backend base URL.

This keeps page/component code independent from backend implementation details.

## Validation performed

- Parsed every JS/JSX source file with Babel parser.
- Verified all local `@/` and relative imports resolve.
- Source-level validation passes.
- A full Next production build cannot complete in the current Linux sandbox because the uploaded `node_modules` contains Windows-native Next/SWC binaries and the sandbox has no package-registry network access to download the Linux SWC package. Run `npm install` on the target machine and then `npm run build` for final native compilation.
