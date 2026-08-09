'use client'

import { motion } from 'framer-motion'
import { CalendarDays, CarFront, Heart, UserRound } from 'lucide-react'
import { useLang } from '@/context/LangContext'

export default function ProfilePage() {
  const { t } = useLang()

  const links = [
    { key: 'profile_my_cars',    href: '/my-cars',    Icon: CarFront },
    { key: 'profile_my_rentals', href: '/my-rentals', Icon: CalendarDays },
    { key: 'profile_favorites',  href: '/favorites',  Icon: Heart },
  ]

  const info = [
    ['Full name',  'Alex Morgan'],
    ['Email',      'alex@example.com'],
    ['Phone',      '+971 50 000 0000'],
    ['Location',   'Dubai, UAE'],
  ]

  return (
    <main className="min-h-screen bg-background">
<section className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-8 lg:px-10">

        {/* Avatar row */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }}
          className="flex items-center gap-5 border-b border-border pb-8">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-accent/10 text-accent">
            <UserRound size={34} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t('profile_member')}</p>
            <h1 className="text-3xl font-black">Alex Morgan</h1>
          </div>
        </motion.div>

        {/* Quick nav cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {links.map(({ key, href, Icon }, i) => (
            <motion.a key={key} href={href}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.4, delay: i * 0.08 }}
              whileHover={{ y:-4 }}
              className="cursor-pointer rounded-[7px] border border-border bg-card p-6 transition hover:border-accent/50">
              <Icon className="text-accent" size={22} />
              <h2 className="mt-5 text-lg font-black">{t(key)}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t('profile_view')} {t(key).toLowerCase()}.</p>
            </motion.a>
          ))}
        </div>

        {/* Account info */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:0.45 }}
          className="mt-8 rounded-[7px] border border-border bg-card p-7">
          <h2 className="text-xl font-black">{t('profile_account')}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {info.map(([label, val]) => (
              <div key={label} className="border-b border-border pb-4">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 font-bold">{val}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section></main>
  )
}
