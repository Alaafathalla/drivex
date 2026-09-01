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
import { HtmlLangSync } from '@/components/html-lang-sync'
import { Inter, Noto_Sans_Arabic } from 'next/font/google'
import './globals.css'

/* ── Latin font ──────────────────────────────── */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-latin',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

/* ── Arabic font ─────────────────────────────── */
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

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
    <html lang="en" dir="ltr" className={`${inter.variable} ${notoSansArabic.variable}`}>
      <body className="font-latin antialiased flex flex-col min-h-screen w-full bg-white text-gray-900">
        <ThemeProvider>
          <LangProvider>
            {/* Syncs <html lang/dir> and body font class on the client */}
            <HtmlLangSync />
            <CurrencyProvider>
              <CompareProvider>
                <FavoritesProvider>
                  <ToastProvider>
                    <SiteHeader />
                    <main className="flex-1 w-full pt-[72px]">
                      {children}
                    </main>
                    <SiteFooter />
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
