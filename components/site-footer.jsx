'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '@/context/LangContext'

export function SiteFooter() {
  const { t } = useLang()

  const footerLinks = {
    footer_marketplace: [
      { key: 'footer_buy',      href: '/cars' },
      { key: 'footer_rent',     href: '/rentals' },
      { key: 'footer_sell',     href: '/sell' },
      { key: 'footer_compare',  href: '/compare' },
    ],
    footer_company: [
      { key: 'footer_about',    href: '/about' },
      { key: 'footer_contact',  href: '/contact' },
      { key: 'footer_dealers',  href: '/dealers' },
      { key: 'footer_careers',  href: '#' },
    ],
    footer_account: [
      { key: 'footer_signin',   href: '/login' },
      { key: 'footer_register', href: '/register' },
      { key: 'footer_dashboard',href: '/dashboard' },
      { key: 'footer_favorites',href: '/favorites' },
    ],
  }

  return (
    <footer className="border-t border-white/8 bg-[#050706] text-white">
      <div className="mx-auto max-w-[1450px] px-5 pt-12 pb-8 sm:px-8 lg:px-10">
        <div className="grid gap-10 border-b border-white/8 pb-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href="/" className="inline-flex text-[26px] font-black italic tracking-[-.05em]">
              Drive<span className="text-[#2ee52b]">X</span>
            </a>
            <p className="mt-4 max-w-xs text-[13px] leading-6 text-white/45">
              {t('footer_tagline')}
            </p>
            <div className="mt-6 flex gap-3">
              {['X', 'IG', 'YT'].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-[11px] font-bold text-white/40 transition hover:border-[#2ee52b]/50 hover:text-[#2ee52b]"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([sectionKey, links], colIdx) => (
            <motion.div
              key={sectionKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (colIdx + 1) * 0.07 }}
            >
              <p className="text-[11px] font-black uppercase tracking-[.1em] text-white/60">
                {t(sectionKey)}
              </p>
              <div className="mt-4 grid gap-3">
                {links.map(({ key, href }) => (
                  <a key={key} href={href} className="text-[13px] text-white/45 transition hover:text-[#2ee52b]">
                    {t(key)}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 pt-6 text-[11px] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>{t('footer_rights')}</p>
          <div className="flex gap-5">
            <a href="#" className="transition hover:text-white/60">{t('footer_privacy')}</a>
            <a href="#" className="transition hover:text-white/60">{t('footer_terms')}</a>
            <a href="/contact" className="inline-flex items-center gap-1 text-white/45 transition hover:text-[#2ee52b]">
              {t('footer_talk')} <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
