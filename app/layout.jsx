import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata = {
  title: 'DriveX — Buy & Rent Premium Cars',
  description: 'Buy, rent and sell premium cars with trusted dealers and secure transactions.',
  generator: 'Next.js',
}

export const viewport = {
  colorScheme: 'dark',
  themeColor: '#070908',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return <html lang="en"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
