'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, CarFront, Heart, Pencil, ShieldCheck, UserRound } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-section'

const quickLinks = [
  { label: 'My Cars', href: '/my-cars', icon: CarFront, count: 2, desc: 'Your active listings' },
  { label: 'My Rentals', href: '/my-rentals', icon: CalendarDays, count: 1, desc: 'Upcoming bookings' },
  { label: 'Saved Cars', href: '/favorites', icon: Heart, count: 8, desc: 'Wishlist' },
]

const fields = [
  ['Full Name', 'Alex Morgan'],
  ['Email', 'alex@example.com'],
  ['Phone', '+971 50 000 0000'],
  ['Location', 'Dubai, UAE'],
  ['Member since', 'January 2024'],
]

export default function ProfilePage() {
  const [editing, setEditing] = useState(false)

  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />
      <section className="border-b border-white/8 pt-[72px]">
        <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8">
          <FadeIn direction="up">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2ee52b]/10 text-[#2ee52b]">
                    <UserRound size={36} />
                  </div>
                  <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#2ee52b] text-black">
                    <Pencil size={12} />
                  </button>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#2ee52b]" />
                    <p className="text-[11px] font-bold uppercase tracking-[.1em] text-[#2ee52b]">Verified member</p>
                  </div>
                  <h1 className="mt-1 text-[28px] font-black">Alex Morgan</h1>
                  <p className="text-[13px] text-white/50">Member since January 2024</p>
                </div>
              </div>
              <a
                href="/dashboard"
                className="flex items-center gap-2 rounded-[5px] border border-white/15 px-5 py-2.5 text-[12px] font-semibold transition hover:border-white/30"
              >
                Dashboard <ArrowRight size={14} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8">
        {/* Quick links */}
        <FadeIn direction="left">
          <h2 className="mb-5 text-[16px] font-bold">Quick access</h2>
        </FadeIn>
        <StaggerContainer className="mb-10 grid gap-4 sm:grid-cols-3">
          {quickLinks.map(({ label, href, icon: Icon, count, desc }) => (
            <StaggerItem key={label}>
              <motion.a
                href={href}
                whileHover={{ y: -3 }}
                className="flex items-start gap-4 rounded-[7px] border border-white/10 bg-[#0b0d0c] p-5 transition hover:border-[#2ee52b]/40"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2ee52b]/10">
                  <Icon size={20} className="text-[#2ee52b]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{label}</h3>
                  <p className="mt-0.5 text-[12px] text-white/50">{desc}</p>
                </div>
                <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#2ee52b]/15 px-2 text-[10px] font-black text-[#2ee52b]">
                  {count}
                </span>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Account info */}
        <FadeIn direction="up">
          <div className="rounded-[8px] border border-white/10 bg-[#0b0d0c] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-black">Account Information</h2>
              <button
                onClick={() => setEditing((v) => !v)}
                className="flex items-center gap-2 rounded-[5px] border border-white/15 px-4 py-2 text-[12px] font-semibold transition hover:border-white/30"
              >
                <Pencil size={13} /> {editing ? 'Save' : 'Edit'}
              </button>
            </div>
            <div className="grid gap-0 divide-y divide-white/8 sm:grid-cols-2 sm:divide-y-0 sm:gap-px sm:bg-white/8">
              {fields.map(([label, value]) => (
                <div key={label} className="bg-[#0b0d0c] py-4 pr-4 sm:px-4">
                  <p className="text-[10px] text-white/40">{label}</p>
                  {editing && label !== 'Member since' ? (
                    <input
                      defaultValue={value}
                      className="mt-1 w-full bg-transparent text-[14px] font-semibold text-white outline-none border-b border-white/20 focus:border-[#2ee52b] pb-1 transition"
                    />
                  ) : (
                    <p className="mt-1 text-[14px] font-semibold">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Danger zone */}
        <FadeIn direction="up" delay={0.1}>
          <div className="mt-6 rounded-[7px] border border-red-500/15 bg-red-500/5 p-5">
            <p className="text-[13px] font-bold text-red-400">Danger Zone</p>
            <p className="mt-1 text-[12px] text-white/40">Permanently delete your account and all data.</p>
            <button className="mt-3 rounded-[4px] border border-red-500/30 px-4 py-1.5 text-[12px] font-semibold text-red-400 transition hover:bg-red-500/10">
              Delete Account
            </button>
          </div>
        </FadeIn>
      </div>

      <SiteFooter />
    </main>
  )
}
