'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, Loader2 } from 'lucide-react'

export function ConfirmModal({ open, title, message, confirmLabel = 'Confirm', danger = false, loading = false, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <motion.div initial={{ scale: .94, opacity: 0, y: 12 }} animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: .94, opacity: 0 }} transition={{ duration: .22, ease: [.22,1,.36,1] }}
            className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="p-6">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${danger ? 'bg-red-50' : 'bg-amber-50'}`}>
                <AlertTriangle size={22} className={danger ? 'text-red-500' : 'text-amber-500'} />
              </div>
              <h3 className="text-[17px] font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-gray-500">{message}</p>
            </div>
            <div className="flex gap-3 border-t border-gray-100 px-6 py-4">
              <button onClick={onCancel} disabled={loading}
                className="flex-1 rounded-xl border border-gray-200 py-2.5 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50">
                Cancel
              </button>
              <button onClick={onConfirm} disabled={loading}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-bold text-white transition disabled:opacity-60 ${
                  danger ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-500'
                }`}>
                {loading ? <><Loader2 size={15} className="animate-spin" /> Working…</> : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
