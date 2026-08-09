'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const KEY = 'drivex_favorites'
const FavCtx = createContext(null)

/**
 * Manages saved car slugs in localStorage.
 * Toast firing is done at call-site so this stays context-agnostic.
 */
export function FavoritesProvider({ children }) {
  const [slugs, setSlugs]   = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setSlugs(JSON.parse(raw))
    } catch {}
    setMounted(true)
  }, [])

  const toggle = useCallback((slug) => {
    setSlugs(prev => {
      const added = !prev.includes(slug)
      const next  = added ? [...prev, slug] : prev.filter(s => s !== slug)
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const isFav  = useCallback((slug) => slugs.includes(slug), [slugs])
  const add    = useCallback((slug) => { if (!slugs.includes(slug)) toggle(slug) }, [slugs, toggle])
  const remove = useCallback((slug) => { if (slugs.includes(slug))  toggle(slug) }, [slugs, toggle])

  return (
    <FavCtx.Provider value={{ slugs, toggle, isFav, add, remove, count: slugs.length, mounted }}>
      {children}
    </FavCtx.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavCtx)
  if (!ctx) throw new Error('useFavorites must be inside <FavoritesProvider>')
  return ctx
}
