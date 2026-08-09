import { Car, CheckCircle2, MapPin, Phone, Tag } from 'lucide-react'

function Row({ label, value }) {
  if (!value) return null
  return (
    <div className="flex items-center justify-between border-b border-gray-50 py-2.5 last:border-0">
      <p className="text-[12px] text-gray-400">{label}</p>
      <p className="max-w-[55%] truncate text-right text-[13px] font-semibold text-gray-900">{value}</p>
    </div>
  )
}

function Section({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
        <Icon size={16} className="text-green-500" />
        <p className="text-[13px] font-bold text-gray-900">{title}</p>
      </div>
      <div className="px-4 py-2">{children}</div>
    </div>
  )
}

export function StepReview({ data }) {
  const isRent = data.listingType === 'rent'
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-4">
        <p className="font-bold text-green-800">Almost done! Review your listing before submitting.</p>
        <p className="mt-0.5 text-[12px] text-green-700">Your listing will be reviewed by our team and published within 24 hours.</p>
      </div>

      {/* Photos preview */}
      {data.images.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-[13px] font-bold text-gray-900">Photos ({data.images.length})</p>
          </div>
          <div className="grid grid-cols-4 gap-2 p-3">
            {data.images.slice(0, 4).map((src, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl bg-gray-100" style={{ aspectRatio: '4/3' }}>
                <img src={src} alt="" className="h-full w-full object-cover" />
                {i === 0 && <span className="absolute left-1 top-1 rounded-md bg-green-600 px-1.5 py-0.5 text-[8px] font-black text-white">MAIN</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <Section icon={Car} title="Vehicle">
        <Row label="Listing type" value={isRent ? 'For Rent' : 'For Sale'} />
        <Row label="Brand & Model" value={`${data.brand} ${data.model}`} />
        <Row label="Year" value={data.year} />
        <Row label="Body type" value={data.bodyType} />
        <Row label="Transmission" value={data.transmission} />
        <Row label="Fuel type" value={data.fuelType} />
        <Row label="Mileage" value={data.mileage ? `${Number(data.mileage).toLocaleString()} km` : null} />
        <Row label="Engine" value={data.engine} />
        <Row label="Color" value={data.color} />
        <Row label="Seats" value={data.seats} />
      </Section>

      <Section icon={Tag} title="Pricing">
        {isRent ? (
          <>
            <Row label="Daily price" value={data.price ? `$${data.price}/day` : null} />
            <Row label="Weekly price" value={data.weeklyPrice ? `$${data.weeklyPrice}/week` : null} />
            <Row label="Monthly price" value={data.monthlyPrice ? `$${data.monthlyPrice}/month` : null} />
            <Row label="Security deposit" value={data.deposit ? `$${data.deposit}` : null} />
            <Row label="Minimum rental" value={`${data.minRentalDays} day${data.minRentalDays !== '1' ? 's' : ''}`} />
          </>
        ) : (
          <>
            <Row label="Sale price" value={data.salePrice ? `$${Number(data.salePrice).toLocaleString()}` : null} />
            <Row label="Negotiable" value={data.negotiable ? 'Yes' : 'No'} />
          </>
        )}
      </Section>

      <Section icon={MapPin} title="Location">
        <Row label="City" value={data.city} />
        <Row label="Area" value={data.area} />
        <Row label="Address" value={data.address} />
      </Section>

      <Section icon={CheckCircle2} title="Features">
        {data.features.length === 0
          ? <p className="py-2 text-[13px] text-gray-400">No features selected</p>
          : (
            <div className="flex flex-wrap gap-1.5 py-3">
              {data.features.map(f => (
                <span key={f} className="rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[11px] font-medium text-green-700">{f}</span>
              ))}
            </div>
          )
        }
        {data.description && (
          <div className="border-t border-gray-50 py-3">
            <p className="text-[11px] text-gray-400 mb-1">Description</p>
            <p className="text-[13px] leading-6 text-gray-700 line-clamp-3">{data.description}</p>
          </div>
        )}
      </Section>

      <Section icon={Phone} title="Owner">
        <Row label="Name" value={data.ownerName} />
        <Row label="Email" value={data.ownerEmail} />
        <Row label="Phone" value={data.ownerPhone} />
        <Row label="Preferred contact" value={data.preferredContact} />
      </Section>
    </div>
  )
}
