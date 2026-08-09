import { Analytics } from '@vercel/analytics/next'
import { LangProvider } from '@/context/LangContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

export const metadata = {
  title: 'DriveX — Buy & Rent Premium Cars',
  description: 'Buy, rent and sell premium cars with verified dealers and secure transactions.',
  generator: 'Next.js',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.svg',
  },
}

export const viewport = {
  colorScheme: 'dark',
  themeColor: '#070908',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className="antialiased">
        <LangProvider>
          <FavoritesProvider>
            {/* Header lives here once for every page */}
            <SiteHeader />

            {/* All page content. pt-[72px] offsets the fixed header height globally. */}
            <div className="min-h-screen bg-[#070908] pt-[72px] text-white">
              {children}
            </div>

            {/* Footer lives here once for every page */}
            <SiteFooter />
          </FavoritesProvider>
        </LangProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
