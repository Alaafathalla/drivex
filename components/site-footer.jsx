'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const footerLinks = {
  Marketplace: [
    { label: 'Buy Cars', href: '/cars' },
    { label: 'Rent Cars', href: '/rentals' },
    { label: 'Sell My Car', href: '/sell' },
    { label: 'Compare Cars', href: '/compare' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Dealers', href: '/dealers' },
    { label: 'Careers', href: '#' },
  ],
  Account: [
    { label: 'Sign In', href: '/login' },
    { label: 'Register', href: '/register' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Favorites', href: '/favorites' },
  ],
}

export function SiteFooter() {
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
              A premium marketplace for buying and renting cars with verified listings, trusted dealers and secure transactions.
            </p>
            <div className="mt-6 flex gap-3">
              {['X', 'IG', 'GH'].map((label) => (
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

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links], colIdx) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (colIdx + 1) * 0.07 }}
            >
              <p className="text-[11px] font-black uppercase tracking-[.1em] text-white/60">{section}</p>
              <div className="mt-4 grid gap-3">
                {links.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-[13px] text-white/45 transition hover:text-[#2ee52b]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 pt-6 text-[11px] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 DriveX. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/60 transition">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition">Terms of Service</a>
            <a href="/contact" className="inline-flex items-center gap-1 text-white/45 transition hover:text-[#2ee52b]">
              Talk to us <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
