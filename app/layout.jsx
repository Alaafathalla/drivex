import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata = {
  title: 'motory. — Premium automotive ecosystem',
  description: 'Buy, rent, maintain, inspect, value and manage your car through one premium automotive platform.',
  generator: 'Next.js',
}

export const viewport = {
  colorScheme: 'light',
  themeColor: '#0b1017',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return <html lang="en"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
