'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Heart, Info, TriangleAlert, X } from 'lucide-react'
import { createContext, useCallback, useContext, useState } from 'react'

const ToastCtx = createContext(null)

const ICONS = {
  success: <CheckCircle2 size={17} className="text-green-600" />,
  fav:     <Heart        size={17} className="text-rose-500 fill-rose-500" />,
  info:    <Info         size={17} className="text-blue-500" />,
  error:   <TriangleAlert size={17} className="text-red-500" />,
}

const COLORS = {
  success: 'border-l-green-500 bg-white',
  fav:     'border-l-rose-400 bg-white',
  info:    'border-l-blue-400 bg-white',
  error:   'border-l-red-400 bg-white',
}

let _id = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) =>
    setToasts(t => t.filter(x => x.id !== id)), [])

  const toast = useCallback(({ message, type = 'success', duration = 3200 }) => {
    const id = ++_id
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => dismiss(id), duration)
    return id
  }, [dismiss])

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}

      {/* Portal-like fixed container */}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5" style={{ maxWidth: 340 }}>
        <AnimatePresence>
          {toasts.map(({ id, message, type }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit   ={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [.22,1,.36,1] }}
              className={`pointer-events-auto flex items-center gap-3 rounded-xl border border-l-4 px-4 py-3 shadow-lg ${COLORS[type]}`}
            >
              {ICONS[type]}
              <p className="flex-1 text-[13px] font-semibold text-gray-800">{message}</p>
              <button
                onClick={() => dismiss(id)}
                className="shrink-0 rounded-full p-0.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast must be inside <ToastProvider>')
  return ctx.toast
}
