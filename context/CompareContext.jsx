'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const CompareContext = createContext(null)
const MAX = 4
const STORAGE_KEY = 'drivex_compare'

export function CompareProvider({ children }) {
  const [items, setItems] = useState([])   // array of full car objects
  const [mounted, setMounted] = useState(false)

  // Hydrate from sessionStorage after mount
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {}
  }, [items, mounted])

  const ids = items.map((c) => c.id)

  const add = useCallback((car) => {
    setItems((prev) => {
      if (prev.length >= MAX || prev.some((c) => c.id === car.id)) return prev
      return [...prev, car]
    })
  }, [])

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const toggle = useCallback((car) => {
    setItems((prev) => {
      if (prev.some((c) => c.id === car.id)) return prev.filter((c) => c.id !== car.id)
      if (prev.length >= MAX) return prev
      return [...prev, car]
    })
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const isCompared = useCallback((id) => ids.includes(id), [ids])

  return (
    <CompareContext.Provider value={{ items, ids, add, remove, toggle, clear, isCompared, count: items.length, isFull: items.length >= MAX }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used inside <CompareProvider>')
  return ctx
}
