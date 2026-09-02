'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { Stepper } from '@/features/cars/components/Stepper'
import { carService } from '@/services/carService'
import { useToast } from '@/context/ToastContext'
import { useLang } from '@/context/LangContext'
import { useRouter } from 'next/navigation'

import { StepType }     from './steps/StepType'
import { StepCarInfo }  from './steps/StepCarInfo'
import { StepPhotos }   from './steps/StepPhotos'
import { StepPricing }  from './steps/StepPricing'
import { StepLocation } from './steps/StepLocation'
import { StepFeatures } from './steps/StepFeatures'
import { StepOwner }    from './steps/StepOwner'
import { StepReview }   from './steps/StepReview'

const INITIAL = {
  listingType:'rent', brand:'', model:'', year:'', bodyType:'', transmission:'', fuelType:'',
  mileage:'', engine:'', color:'', seats:'', doors:'', vin:'', images:[],
  price:'', weeklyPrice:'', monthlyPrice:'', salePrice:'', negotiable:false,
  deposit:'', minRentalDays:'1',
  country:'UAE', city:'', area:'', address:'', latitude:null, longitude:null,
  description:'', features:[],
  ownerName:'', ownerEmail:'', ownerPhone:'', preferredContact:'phone',
}

export default function ListYourCarPage() {
  const toast        = useToast()
  const router       = useRouter()
  const { t, isRTL } = useLang()

  const [step,       setStep]       = useState(1)
  const [data,       setData]       = useState({ ...INITIAL })
  const [draftReady, setDraftReady] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done,       setDone]       = useState(false)
  const [createdId,  setCreatedId]  = useState(null)
  const dir = useRef(1)

  const STEP_LABELS = [
    t('lyc_step_type'), t('lyc_step_info'), t('lyc_step_photos'), t('lyc_step_pricing'),
    t('lyc_step_location'), t('lyc_step_features'), t('lyc_step_owner'), t('lyc_step_review'),
  ]

  useEffect(() => {
    try {
      const raw = localStorage.getItem('drivex_listing_draft')
      if (raw) setData({ ...INITIAL, ...JSON.parse(raw) })
    } catch {}
    setDraftReady(true)
  }, [])

  useEffect(() => {
    if (!draftReady) return
    try { localStorage.setItem('drivex_listing_draft', JSON.stringify(data)) } catch {}
  }, [data, draftReady])

  const update = (patch) => setData(d => ({ ...d, ...patch }))

  const validateStep = (n) => {
    const missing = []
    if (n === 2) {
      if (!data.brand)        missing.push(t('lyc_brand').toLowerCase())
      if (!data.model)        missing.push(t('lyc_model').toLowerCase())
      if (!data.year)         missing.push(t('lyc_year').toLowerCase())
      if (!data.bodyType)     missing.push(t('lyc_body_type').toLowerCase())
      if (!data.transmission) missing.push(t('lyc_transmission').toLowerCase())
      if (!data.fuelType)     missing.push(t('lyc_fuel_type').toLowerCase())
    }
    if (n === 3 && !data.images.length) missing.push(t('lyc_step_photos').toLowerCase())
    if (n === 4 && data.listingType === 'rent'  && !data.price)     missing.push(t('lyc_daily_price').toLowerCase())
    if (n === 4 && data.listingType === 'sale'  && !data.salePrice) missing.push(t('lyc_sale_price').toLowerCase())
    if (n === 5 && !data.city) missing.push(t('filter_location').toLowerCase())
    if (n === 7) {
      if (!data.ownerName)  missing.push(t('sell_eyebrow').toLowerCase())
      if (!data.ownerEmail) missing.push(t('td_email').toLowerCase())
      if (!data.ownerPhone) missing.push(t('td_phone').toLowerCase())
    }
    if (missing.length) {
      toast({ message: `${t('lyc_complete_hint')} ${missing.join(', ')}.`, type: 'error' })
      return false
    }
    return true
  }

  const go = (n) => { dir.current = n > step ? 1 : -1; setStep(n); window.scrollTo({ top:0, behavior:'smooth' }) }
  const next = () => { if (validateStep(step)) go(Math.min(8, step + 1)) }
  const back = () => go(Math.max(1, step - 1))

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const listing = await carService.createListing({
        listingType: data.listingType, brand: data.brand, model: data.model, year: Number(data.year),
        bodyType: data.bodyType, transmission: data.transmission, fuelType: data.fuelType,
        mileage: Number(data.mileage)||0, engine: data.engine, color: data.color,
        seats: Number(data.seats)||5, doors: Number(data.doors)||4, vin: data.vin,
        images: data.images,
        price: data.listingType === 'rent' ? Number(data.price) : Number(data.salePrice),
        weeklyPrice: data.weeklyPrice ? Number(data.weeklyPrice) : null,
        monthlyPrice: data.monthlyPrice ? Number(data.monthlyPrice) : null,
        salePrice: data.salePrice ? Number(data.salePrice) : null,
        negotiable: data.negotiable, deposit: data.deposit ? Number(data.deposit) : null,
        minRentalDays: Number(data.minRentalDays)||1,
        country: data.country, city: data.city, area: data.area,
        location: `${data.area ? data.area+', ' : ''}${data.city}`,
        address: data.address, latitude: data.latitude, longitude: data.longitude,
        description: data.description, features: data.features,
        owner: { name: data.ownerName, email: data.ownerEmail, phone: data.ownerPhone, preferredContact: data.preferredContact },
      })
      setCreatedId(listing.id)
      try { localStorage.removeItem('drivex_listing_draft') } catch {}
      setDone(true)
      toast({ message: t('lyc_done_title'), type: 'success' })
    } catch (e) {
      toast({ message: e.message || 'Submission failed. Please try again.', type: 'error' })
    } finally { setSubmitting(false) }
  }

  if (done) return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <motion.div initial={{ opacity:0, scale:.94 }} animate={{ opacity:1, scale:1 }}
        transition={{ duration:.5, ease:[.22,1,.36,1] }} className="w-full max-w-md text-center">
        <motion.div initial={{ scale:0 }} animate={{ scale:1 }}
          transition={{ type:'spring', stiffness:260, damping:20, delay:.15 }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 size={52} className="text-green-600" />
        </motion.div>
        <h1 className="text-[28px] font-black text-gray-900">{t('lyc_done_title')}</h1>
        <p className="mt-3 text-[15px] leading-7 text-gray-500">{t('lyc_done_desc')}</p>
        <div className="mt-8 flex flex-col gap-3">
          <a href="/my-listings"
            className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-green-600 text-[14px] font-bold text-white transition hover:bg-green-500">
            {t('lyc_view_listings')} <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
          </a>
          <a href="/cars"
            className="flex h-11 items-center justify-center rounded-2xl border border-gray-200 text-[13px] font-semibold text-gray-700 transition hover:border-[#B5E92E]">
            {t('lyc_browse')}
          </a>
        </div>
      </motion.div>
    </div>
  )

  const STEPS = [null, StepType, StepCarInfo, StepPhotos, StepPricing, StepLocation, StepFeatures, StepOwner, StepReview]
  const CurrentStep = STEPS[step]

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[820px] px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-green-600">{t('lyc_title')}</p>
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[10px] font-bold text-gray-400">{t('lyc_draft_saved')}</span>
          </div>
          <h1 className="mt-1 text-[24px] font-black text-gray-900">
            {step === 8 ? t('lyc_review_submit') : STEP_LABELS[step - 1]}
          </h1>
          <div className="mt-5">
            <Stepper steps={STEP_LABELS} current={step} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[820px] px-4 py-8 sm:px-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step}
            initial={{ opacity:0, x: dir.current * 32 }}
            animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x: dir.current * -32 }}
            transition={{ duration:.28, ease:[.22,1,.36,1] }}>
            <CurrentStep data={data} update={update} />
          </motion.div>
        </AnimatePresence>

        <div className={`mt-7 flex items-center ${step > 1 ? 'justify-between' : 'justify-end'}`}>
          {step > 1 && (
            <button onClick={back}
              className="flex items-center gap-2 rounded-2xl border border-gray-200 px-6 py-3 text-[13px] font-semibold text-gray-700 transition hover:border-[#B5E92E]">
              <ArrowLeft size={15} className={isRTL ? 'rotate-180' : ''} /> {t('lyc_back')}
            </button>
          )}
          {step < 8 ? (
            <button onClick={next}
              className="flex items-center gap-2 rounded-2xl bg-green-600 px-7 py-3 text-[13px] font-bold text-white shadow-sm shadow-green-200 transition hover:bg-green-500">
              {t('lyc_continue')} <ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting}
              className="flex items-center gap-2 rounded-2xl bg-green-600 px-8 py-3 text-[14px] font-bold text-white shadow-sm shadow-green-200 transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? <><Loader2 size={16} className="animate-spin" /> {t('lyc_submitting')}</> : <>{t('lyc_submit')} <CheckCircle2 size={16} /></>}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
