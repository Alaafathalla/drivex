import { Analytics } from '@vercel/analytics/next'
import { LangProvider } from '@/context/LangContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { ToastProvider } from '@/context/ToastContext'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
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
      <body className="antialiased bg-white text-gray-900">
        <LangProvider>
          <FavoritesProvider>
            <ToastProvider>
              <SiteHeader />
              <main className="min-h-screen pt-[68px]">
                {children}
              </main>
              <SiteFooter />
            </ToastProvider>
          </FavoritesProvider>
        </LangProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
