'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Copy, Eye, Loader2, MoreHorizontal, Pencil, Plus, Trash2, X } from 'lucide-react'
import { ConfirmModal } from '@/features/cars/components/ConfirmModal'
import { carService } from '@/services/carService'
import { useToast } from '@/context/ToastContext'

const STATUS_CFG = {
  pending:   { label: 'Pending Approval', bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-400'  },
  active:    { label: 'Active',           bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500'  },
  rejected:  { label: 'Rejected',         bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500'    },
  sold:      { label: 'Sold',             bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500'   },
  rented:    { label: 'Rented',           bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  inactive:  { label: 'Inactive',         bg: 'bg-gray-100',   text: 'text-gray-600',   dot: 'bg-gray-400'   },
}

const TABS = ['all', 'active', 'pending', 'inactive', 'rejected']

function ListingRow({ listing, onDelete, onStatusChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const cfg = STATUS_CFG[listing.status] || STATUS_CFG.pending
  const isRent = listing.listingType === 'rent'

  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 40 }}
      transition={{ duration: .3 }}
      className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:flex-row"
    >
      {/* Thumbnail */}
      <div className="relative h-36 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-auto sm:w-40">
        {listing.images?.[0]
          ? <img src={listing.images[0]} alt="Car" className="h-full w-full object-cover" />
          : <div className="flex h-full items-center justify-center text-3xl">🚗</div>
        }
        <span className={`absolute left-2 top-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black ${cfg.bg} ${cfg.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />{cfg.label}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <p className="font-bold text-gray-900">{listing.brand} {listing.model} · {listing.year}</p>
          <p className="mt-0.5 text-[12px] text-gray-400 capitalize">{isRent ? 'For Rent' : 'For Sale'} · {listing.city}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px]">
            <span className="font-black text-green-600">
              {isRent ? `$${listing.price}/day` : `$${listing.salePrice?.toLocaleString()}`}
            </span>
            <span className="text-gray-400">{listing.views ?? 0} views</span>
            <span className="text-gray-400">Listed {listing.createdAt}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="relative mt-3 flex items-center gap-2 sm:mt-0">
          <a href={`/cars/${listing.id}`}
            className="flex h-9 items-center gap-1.5 rounded-xl border border-gray-200 px-3 text-[11px] font-semibold text-gray-700 transition hover:border-green-400 hover:text-green-700">
            <Eye size={13} /> Preview
          </a>
          <a href={`/list-your-car?edit=${listing.id}`}
            className="flex h-9 items-center gap-1.5 rounded-xl border border-gray-200 px-3 text-[11px] font-semibold text-gray-700 transition hover:border-green-400 hover:text-green-700">
            <Pencil size={13} /> Edit
          </a>

          {/* More menu */}
          <div className="relative">
            <button onClick={() => setMenuOpen(v => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-gray-300">
              <MoreHorizontal size={16} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div initial={{ opacity: 0, scale: .94, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: .94 }} transition={{ duration: .15 }}
                  className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                  {listing.status !== 'inactive' && (
                    <button onClick={() => { onStatusChange(listing.id, 'inactive'); setMenuOpen(false) }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-[12px] text-gray-700 hover:bg-gray-50 transition">
                      <X size={14} className="text-gray-400" /> Mark as Inactive
                    </button>
                  )}
                  {listing.listingType === 'sale' && listing.status !== 'sold' && (
                    <button onClick={() => { onStatusChange(listing.id, 'sold'); setMenuOpen(false) }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-[12px] text-gray-700 hover:bg-gray-50 transition">
                      <ArrowRight size={14} className="text-gray-400" /> Mark as Sold
                    </button>
                  )}
                  <button onClick={() => { /* duplicate */ setMenuOpen(false) }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-[12px] text-gray-700 hover:bg-gray-50 transition">
                    <Copy size={14} className="text-gray-400" /> Duplicate Listing
                  </button>
                  <div className="border-t border-gray-100" />
                  <button onClick={() => { onDelete(listing.id); setMenuOpen(false) }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-[12px] text-red-600 hover:bg-red-50 transition">
                    <Trash2 size={14} /> Delete Listing
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function MyListingsPage() {
  const toast = useToast()
  const [listings,  setListings]  = useState([])
  const [loading,   setLoading]   = useState(true)
  const [tab,       setTab]       = useState('all')
  const [toDelete,  setToDelete]  = useState(null)
  const [deleting,  setDeleting]  = useState(false)

  useEffect(() => {
    carService.getMyListings()
      .then(setListings)
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async () => {
    if (!toDelete) return
    setDeleting(true)
    try {
      await carService.deleteListing(toDelete)
      setListings(l => l.filter(x => x.id !== toDelete))
      toast({ message: 'Listing deleted successfully.', type: 'success' })
    } catch (e) {
      toast({ message: e.message || 'Delete failed.', type: 'error' })
    } finally { setDeleting(false); setToDelete(null) }
  }

  const handleStatusChange = async (id, status) => {
    try {
      await carService.updateListing(id, { status })
      setListings(l => l.map(x => x.id === id ? { ...x, status } : x))
      toast({ message: `Status updated to "${STATUS_CFG[status]?.label}".`, type: 'success' })
    } catch (e) {
      toast({ message: e.message, type: 'error' })
    }
  }

  const counts = TABS.reduce((acc, t) => {
    acc[t] = t === 'all' ? listings.length : listings.filter(l => l.status === t).length
    return acc
  }, {})

  const visible = tab === 'all' ? listings : listings.filter(l => l.status === tab)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[960px] px-4 py-8 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-green-600">Account</p>
              <h1 className="mt-1 text-[28px] font-black text-gray-900">My Listings</h1>
              <p className="mt-1 text-[14px] text-gray-400">{listings.length} total listing{listings.length !== 1 ? 's' : ''}</p>
            </div>
            <a href="/list-your-car"
              className="flex items-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-[13px] font-bold text-white shadow-sm shadow-green-200 transition hover:bg-green-500">
              <Plus size={16} /> Add Listing
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[68px] z-20 border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[960px] overflow-x-auto px-4 sm:px-6">
          <div className="flex gap-1 py-3">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-bold capitalize transition ${
                  tab === t ? 'bg-green-600 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}>
                {t === 'all' ? 'All' : STATUS_CFG[t]?.label}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${tab === t ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {counts[t]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[960px] px-4 py-7 sm:px-6">
        {loading ? (
          <div className="flex justify-center py-24"><Loader2 size={32} className="animate-spin text-green-500" /></div>
        ) : visible.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-[18px] font-bold text-gray-800">
              {tab === 'all' ? 'No listings yet' : `No ${STATUS_CFG[tab]?.label.toLowerCase()} listings`}
            </p>
            <p className="mt-1 text-[14px] text-gray-400">Ready to list your first car?</p>
            <a href="/list-your-car"
              className="mt-5 flex items-center gap-2 rounded-full bg-green-600 px-6 py-2.5 text-[13px] font-bold text-white hover:bg-green-500 transition">
              <Plus size={15} /> List your car
            </a>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="space-y-4">
              {visible.map(l => (
                <ListingRow key={l.id} listing={l}
                  onDelete={id => setToDelete(id)}
                  onStatusChange={handleStatusChange} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      <ConfirmModal
        open={!!toDelete}
        title="Delete Listing"
        message="This listing will be permanently removed. Any active inquiries will be lost. This cannot be undone."
        confirmLabel="Delete Listing"
        danger
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  )
}
