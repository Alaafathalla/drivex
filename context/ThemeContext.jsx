'use client'

import { createContext, useContext } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const value = {
    theme: 'light',
    setTheme: () => {},
    toggle: () => {},
    mounted: true,
  }

  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = 'light'
    document.documentElement.classList.remove('dark')
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used inside ThemeProvider')
  return value
}
