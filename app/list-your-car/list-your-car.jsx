'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { Stepper } from '@/features/cars/components/Stepper'
import { carService } from '@/services/carService'
import { useToast } from '@/context/ToastContext'
import { useRouter } from 'next/navigation'

// ── Step sub-pages imported inline (defined below)
import { StepType }        from './steps/StepType'
import { StepCarInfo }     from './steps/StepCarInfo'
import { StepPhotos }      from './steps/StepPhotos'
import { StepPricing }     from './steps/StepPricing'
import { StepLocation }    from './steps/StepLocation'
import { StepFeatures }    from './steps/StepFeatures'
import { StepOwner }       from './steps/StepOwner'
import { StepReview }      from './steps/StepReview'

const STEP_LABELS = ['Type', 'Car Info', 'Photos', 'Pricing', 'Location', 'Features', 'Owner', 'Review']

const INITIAL = {
  listingType: 'rent',
  brand: '', model: '', year: '', bodyType: '', transmission: '', fuelType: '',
  mileage: '', engine: '', color: '', seats: '', doors: '', vin: '',
  images: [],
  price: '', weeklyPrice: '', monthlyPrice: '', salePrice: '', negotiable: false,
  deposit: '', minRentalDays: '1',
  country: 'UAE', city: '', area: '', address: '',
  description: '', features: [],
  ownerName: '', ownerEmail: '', ownerPhone: '', preferredContact: 'phone',
}

export default function ListYourCarPage() {
  const toast  = useToast()
  const router = useRouter()
  const [step,      setStep]      = useState(1)
  const [data,      setData]      = useState({ ...INITIAL })
  const [submitting,setSubmitting] = useState(false)
  const [done,      setDone]      = useState(false)
  const [createdId, setCreatedId] = useState(null)
  const dir = useRef(1) // 1 forward, -1 back

  const update = (patch) => setData(d => ({ ...d, ...patch }))

  const go = (n) => {
    dir.current = n > step ? 1 : -1
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const next = () => go(Math.min(8, step + 1))
  const back = () => go(Math.max(1, step - 1))

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const listing = await carService.createListing({
        listingType: data.listingType,
        brand: data.brand, model: data.model, year: Number(data.year),
        bodyType: data.bodyType, transmission: data.transmission, fuelType: data.fuelType,
        mileage: Number(data.mileage) || 0, engine: data.engine, color: data.color,
        seats: Number(data.seats) || 5, doors: Number(data.doors) || 4, vin: data.vin,
        images: data.images,
        price: data.listingType === 'rent' ? Number(data.price) : Number(data.salePrice),
        weeklyPrice: data.weeklyPrice ? Number(data.weeklyPrice) : null,
        monthlyPrice: data.monthlyPrice ? Number(data.monthlyPrice) : null,
        salePrice: data.salePrice ? Number(data.salePrice) : null,
        negotiable: data.negotiable,
        deposit: data.deposit ? Number(data.deposit) : null,
        minRentalDays: Number(data.minRentalDays) || 1,
        country: data.country, city: data.city, area: data.area,
        location: `${data.area ? data.area + ', ' : ''}${data.city}`,
        address: data.address, description: data.description,
        features: data.features,
        owner: { name: data.ownerName, email: data.ownerEmail, phone: data.ownerPhone, preferredContact: data.preferredContact },
      })
      setCreatedId(listing.id)
      setDone(true)
      toast({ message: 'Listing submitted for review!', type: 'success' })
    } catch (e) {
      toast({ message: e.message || 'Submission failed. Please try again.', type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  if (done) return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .5, ease: [.22,1,.36,1] }}
        className="w-full max-w-md text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: .15 }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 size={52} className="text-green-600" />
        </motion.div>
        <h1 className="text-[28px] font-black text-gray-900">Listing Submitted!</h1>
        <p className="mt-3 text-[15px] leading-7 text-gray-500">
          Your car listing has been submitted successfully and is pending approval. We'll notify you once it's live.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <a href="/my-listings"
            className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-green-600 text-[14px] font-bold text-white hover:bg-green-500 transition">
            View My Listings <ArrowRight size={16} />
          </a>
          <a href="/cars"
            className="flex h-11 items-center justify-center rounded-2xl border border-gray-200 text-[13px] font-semibold text-gray-700 hover:border-green-400 transition">
            Browse Marketplace
          </a>
        </div>
      </motion.div>
    </div>
  )

  const STEPS = [null, StepType, StepCarInfo, StepPhotos, StepPricing, StepLocation, StepFeatures, StepOwner, StepReview]
  const CurrentStep = STEPS[step]

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[820px] px-4 py-6 sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-green-600">List Your Car</p>
          <h1 className="mt-1 text-[24px] font-black text-gray-900">
            {step === 8 ? 'Review & Submit' : STEP_LABELS[step - 1]}
          </h1>
          <div className="mt-5">
            <Stepper steps={STEP_LABELS} current={step} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[820px] px-4 py-8 sm:px-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: dir.current * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir.current * -32 }}
            transition={{ duration: .28, ease: [.22,1,.36,1] }}
          >
            <CurrentStep data={data} update={update} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className={`mt-7 flex items-center ${step > 1 ? 'justify-between' : 'justify-end'}`}>
          {step > 1 && (
            <button onClick={back}
              className="flex items-center gap-2 rounded-2xl border border-gray-200 px-6 py-3 text-[13px] font-semibold text-gray-700 transition hover:border-green-400">
              <ArrowLeft size={15} /> Back
            </button>
          )}
          {step < 8 ? (
            <button onClick={next}
              className="flex items-center gap-2 rounded-2xl bg-green-600 px-7 py-3 text-[13px] font-bold text-white shadow-sm shadow-green-200 transition hover:bg-green-500">
              Continue <ArrowRight size={15} />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting}
              className="flex items-center gap-2 rounded-2xl bg-green-600 px-8 py-3 text-[14px] font-bold text-white shadow-sm shadow-green-200 transition hover:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed">
              {submitting ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : <>Submit Listing <CheckCircle2 size={16} /></>}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
