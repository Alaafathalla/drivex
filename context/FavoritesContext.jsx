'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const KEY = 'drivex_favorites'
const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [slugs, setSlugs] = useState([])
  const [mounted, setMounted] = useState(false)
  // Track recently-added slug for burst animation
  const [lastAdded, setLastAdded] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setSlugs(JSON.parse(raw))
    } catch {}
    setMounted(true)
  }, [])

  const persist = (next) => {
    setSlugs(next)
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
  }

  const toggle = useCallback((slug) => {
    setSlugs((prev) => {
      const already = prev.includes(slug)
      const next = already ? prev.filter((s) => s !== slug) : [...prev, slug]
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      if (!already) {
        setLastAdded(slug)
        setTimeout(() => setLastAdded(null), 900)
      }
      return next
    })
  }, [])

  const isFav = useCallback((slug) => slugs.includes(slug), [slugs])
  const count = slugs.length

  return (
    <FavoritesContext.Provider value={{ slugs, toggle, isFav, count, lastAdded, mounted }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used inside <FavoritesProvider>')
  return ctx
}
