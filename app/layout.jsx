import { Analytics } from '@vercel/analytics/next'
import { LangProvider } from '@/context/LangContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { ToastProvider } from '@/context/ToastContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { CompareProvider } from '@/context/CompareContext'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CompareBar } from '@/components/compare-bar'
import './globals.css'

export const metadata = {
  title: 'DriveX — Buy & Rent Premium Cars',
  description: 'Buy, rent and sell premium cars with verified dealers and secure transactions.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      {/*
        body uses flex-col so header / main / footer stack normally.
        No max-width here — every section controls its own inner column.
      */}
      <body className="antialiased flex flex-col min-h-screen w-full bg-white text-gray-900">
        <ThemeProvider>
          <LangProvider>
          <CurrencyProvider>
          <CompareProvider>
          <FavoritesProvider>
            <ToastProvider>
              {/* Fixed header — full-width */}
              <SiteHeader />

              {/* Page content — fills remaining height, offset below the fixed header */}
              <main className="flex-1 w-full pt-[72px]">
                {children}
              </main>

              {/* Footer — full-width */}
              <SiteFooter />
              {/* Global compare floating bar */}
              <CompareBar />
            </ToastProvider>
          </FavoritesProvider>
          </CompareProvider>
          </CurrencyProvider>
        </LangProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
