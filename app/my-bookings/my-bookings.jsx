'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Download, Loader2, MapPin, RotateCcw, XCircle } from 'lucide-react'
import { ConfirmModal } from '@/features/cars/components/ConfirmModal'
import { bookingService } from '@/services/bookingService'
import { useToast } from '@/context/ToastContext'
import { useLang } from '@/context/LangContext'

const STATUS_CONFIG = {
  pending:   { label: 'Pending',   bg: 'bg-amber-100', text: 'text-amber-700' },
  confirmed: { label: 'Confirmed', bg: 'bg-blue-100',  text: 'text-blue-700'  },
  active:    { label: 'Active',    bg: 'bg-[#ecfccb]', text: 'text-[#3a5a00]' },
  completed: { label: 'Completed', bg: 'bg-gray-100',  text: 'text-gray-600'  },
  cancelled: { label: 'Cancelled', bg: 'bg-red-100',   text: 'text-red-600'   },
}
const TABS = ['all', 'confirmed', 'active', 'completed', 'cancelled']

function BookingCard({ booking, onCancel }) {
  const { t } = useLang()
  const cfg = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending
  const canCancel = ['pending', 'confirmed'].includes(booking.status)

  return (
    <motion.div layout initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, x:40 }}
      transition={{ duration:.35 }}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

      <div className="flex items-start gap-4 border-b border-gray-50 p-5">
        <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
          {booking.car?.image
            ? <img src={booking.car.image} alt="Car" className="h-full w-full object-cover" />
            : <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
          }
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-bold text-gray-900">
                {booking.car?.brand} {booking.car?.model}{booking.car?.year ? ` · ${booking.car.year}` : ''}
              </p>
              <p className="mt-0.5 text-[12px] text-gray-400">{t('booking_payment')} #{booking.id}</p>
            </div>
            <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wide ${cfg.bg} ${cfg.text}`}>
              {cfg.label}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[12px]">
            <div className="flex items-center gap-1.5 text-gray-500">
              <CalendarDays size={12} className="shrink-0 text-green-500" />
              <span>{t('rent_pickup')}: <strong className="text-gray-800">{booking.pickupDate}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <CalendarDays size={12} className="shrink-0 text-rose-400" />
              <span>{t('rent_until_date')}: <strong className="text-gray-800">{booking.returnDate}</strong></span>
            </div>
            <div className="col-span-2 flex items-center gap-1.5 text-gray-500">
              <MapPin size={12} className="shrink-0 text-gray-400" />
              <span className="truncate">{booking.pickupLocation} &rarr; {booking.dropoffLocation}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[10px] text-gray-400">{t('compare_spec_price')}</p>
            <p className="text-[18px] font-black text-green-600">AED {booking.total}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400">{t('booking_payment')}</p>
            <p className="text-[12px] font-semibold capitalize text-gray-700">{booking.paymentStatus}</p>
          </div>
          {booking.transactionId && (
            <div className="hidden sm:block">
              <p className="text-[10px] text-gray-400">Txn</p>
              <p className="font-mono text-[12px] text-gray-600">{booking.transactionId}</p>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-[11px] font-semibold text-gray-600 transition hover:border-[#B5E92E] hover:text-green-700">
            <Download size={13} /> Invoice
          </button>
          {booking.status === 'completed' && (
            <a href="/cars"
              className="flex items-center gap-1.5 rounded-xl border border-[#d9f99d] bg-[#f0fdf4] px-3 py-2 text-[11px] font-bold text-green-700 transition hover:bg-[#ecfccb]">
              <RotateCcw size={13} /> {t('card_book')}
            </a>
          )}
          {canCancel && (
            <button onClick={() => onCancel(booking.id)}
              className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[11px] font-bold text-red-600 transition hover:bg-red-100">
              <XCircle size={13} /> {t('btn_cancel')}
            </button>
          )}
          <a href={`/rental/success/${booking.id}`}
            className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-[11px] font-bold text-white transition hover:bg-green-500">
            Details <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function MyBookingsPage() {
  const toast = useToast()
  const { t } = useLang()
  const [bookings,   setBookings]   = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)
  const [tab,        setTab]        = useState('all')
  const [toCancel,   setToCancel]   = useState(null)
  const [cancelling, setCancelling] = useState(false)

  useEffect(() => {
    bookingService.getBookings()
      .then(setBookings)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const handleCancel = async () => {
    if (!toCancel) return
    setCancelling(true)
    try {
      await bookingService.cancelBooking(toCancel)
      setBookings(b => b.map(x => x.id === toCancel ? { ...x, status: 'cancelled' } : x))
      toast({ message: 'Booking cancelled.', type: 'success' })
    } catch (e) {
      toast({ message: e.message || 'Failed to cancel.', type: 'error' })
    } finally {
      setCancelling(false)
      setToCancel(null)
    }
  }

  const visible = tab === 'all' ? bookings : bookings.filter(b => b.status === tab)

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="border-b border-gray-100 bg-white">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-12">
          <p className="text-[11px] font-bold uppercase tracking-widest text-green-600">{t('dash_eyebrow')}</p>
          <h1 className="mt-1 text-[28px] font-black text-gray-900">{t('myrentals_title')}</h1>
          <p className="mt-1 text-[14px] text-gray-500">{bookings.length} {t('myrentals_title').toLowerCase()}</p>
        </div>
      </div>

      <div className="sticky top-[72px] z-20 border-b border-gray-100 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex gap-1 overflow-x-auto py-3">
            {TABS.map(tb => (
              <button key={tb} onClick={() => setTab(tb)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-[12px] font-bold capitalize transition ${
                  tab === tb ? 'bg-green-600 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}>
                {tb === 'all'
                  ? `All (${bookings.length})`
                  : `${STATUS_CONFIG[tb]?.label} (${bookings.filter(b => b.status === tb).length})`
                }
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-7 sm:px-6 lg:px-8 xl:px-12">
        {loading ? (
          <div className="flex justify-center py-24"><Loader2 size={32} className="animate-spin text-green-500" /></div>
        ) : error ? (
          <div className="py-24 text-center">
            <p className="font-bold text-red-500">{error}</p>
            <button onClick={() => window.location.reload()}
              className="mt-4 rounded-full bg-green-600 px-6 py-2.5 text-[13px] font-bold text-white">{t('cars_try_again')}</button>
          </div>
        ) : visible.length === 0 ? (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
            className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 text-5xl">&#x1F4C5;</div>
            <p className="text-[18px] font-bold text-gray-800">
              {tab === 'all' ? t('dash_no_bookings') : `No ${STATUS_CONFIG[tab]?.label.toLowerCase()} bookings`}
            </p>
            <a href="/cars"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-2.5 text-[13px] font-bold text-white transition hover:bg-green-500">
              {t('fav_browse')} <ArrowRight size={15} />
            </a>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="space-y-4">
              {visible.map(b => (
                <BookingCard key={b.id} booking={b} onCancel={id => setToCancel(id)} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      <ConfirmModal
        open={!!toCancel}
        title={t('btn_cancel')}
        message="Are you sure you want to cancel this booking? Refund is subject to our cancellation policy."
        confirmLabel={t('btn_cancel')}
        danger
        loading={cancelling}
        onConfirm={handleCancel}
        onCancel={() => setToCancel(null)}
      />
    </div>
  )
}
