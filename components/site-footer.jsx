'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '@/context/LangContext'

const COLS = {
  footer_marketplace: [
    ['footer_buy',      '/cars'],
    ['footer_rent',       '/rentals'],
    ['footer_categories', '/categories'],
    ['footer_locations',  '/rent-by-location'],
    ['footer_services',   '/services'],
  ],
  footer_company: [
    ['footer_about',    '/about'],
    ['footer_contact',  '/contact'],
    ['footer_dealers',  '/dealers'],
    ['footer_careers',  '#'],
  ],
  footer_account: [
    ['footer_signin',   '/login'],
    ['footer_register', '/register'],
    ['footer_dashboard','/dashboard'],
    ['footer_favorites','/favorites'],
  ],
}

export function SiteFooter() {
  const { t } = useLang()
  return (
    <footer className="w-full border-t border-gray-100 bg-white">
      <div className="w-full px-4 pt-16 pb-10 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24 xl:px-12">

        {/* Grid */}
        <div className="grid gap-10 border-b border-gray-100 pb-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <a href="/" className="flex items-center gap-1.5 text-[22px] font-black italic tracking-tight text-gray-900 select-none">
              Drive<span className="text-green-600">X</span>
            </a>
            <p className="mt-3 max-w-xs text-[13px] leading-6 text-gray-500">
              {t('footer_tagline')}
            </p>
            <div className="mt-5 flex gap-2">
              {['𝕏', 'IG', 'YT'].map(s => (
                <a key={s} href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 text-[11px] font-bold text-gray-500 transition hover:border-green-300 hover:text-green-600">
                  {s}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(COLS).map(([sectionKey, links], ci) => (
            <motion.div
              key={sectionKey}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (ci + 1) * 0.07 }}
            >
              <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">{t(sectionKey)}</p>
              <div className="mt-4 flex flex-col gap-2.5">
                {links.map(([key, href]) => (
                  <a key={key} href={href}
                    className="text-[13px] text-gray-600 transition hover:text-green-600">
                    {t(key)}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-2 pt-6 text-[12px] text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>{t('footer_rights')}</p>
          <div className="flex gap-5">
            <a href="#" className="transition hover:text-gray-700">{t('footer_privacy')}</a>
            <a href="#" className="transition hover:text-gray-700">{t('footer_terms')}</a>
            <a href="/contact" className="flex items-center gap-1 text-green-600 transition hover:text-green-700">
              {t('footer_talk')} <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
