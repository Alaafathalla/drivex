import { Analytics } from '@vercel/analytics/next'
import { LangProvider } from '@/context/LangContext'
import './globals.css'

export const metadata = {
  title: 'DriveX — Buy & Rent Premium Cars',
  description: 'Buy, rent and sell premium cars with verified dealers and secure transactions.',
  generator: 'Next.js',
}

export const viewport = {
  colorScheme: 'dark',
  themeColor: '#070908',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  // lang/dir are set client-side by LangProvider after hydration
  return (
    <html lang="en" dir="ltr">
      <body className="antialiased">
        <LangProvider>
          {children}
        </LangProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
