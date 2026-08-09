'use client'

import { motion } from 'framer-motion'
import {
  ArrowUpRight, CalendarDays, Car, CircleDollarSign, Gauge,
  Heart, Plus, ShieldCheck, Wrench,
} from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-section'

const stats = [
  { icon: Heart, label: 'Saved Cars', value: '12' },
  { icon: CalendarDays, label: 'Upcoming Bookings', value: '03' },
  { icon: CircleDollarSign, label: 'Total Spent', value: '$4,280' },
  { icon: Gauge, label: 'Vehicle Health', value: 'Good' },
]

const activity = [
  { icon: Wrench, title: 'Annual service · Porsche Cayenne', sub: 'Thu, 14 August · 10:00 AM' },
  { icon: Car, title: 'Rental pickup · Range Rover Sport', sub: 'Sat, 16 August · Dubai Mall' },
  { icon: ShieldCheck, title: 'Inspection complete · BMW 5 Series', sub: 'Mon, 11 August · Certified' },
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#070908] text-white">
<div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-8 lg:px-10">
        {/* Header */}
        <FadeIn direction="left">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#2ee52b]">Your dashboard</p>
              <h1 className="mt-2 text-[clamp(28px,4vw,44px)] font-black tracking-tight">Good morning, Alex.</h1>
            </div>
            <div className="flex gap-3">
              <a href="/sell" className="flex items-center gap-2 rounded-[5px] bg-[#2ee52b] px-4 py-2.5 text-[12px] font-bold text-black transition hover:bg-[#50f14d]">
                <Plus size={14} /> List a Car
              </a>
              <a href="/profile" className="flex items-center gap-2 rounded-[5px] border border-white/15 px-4 py-2.5 text-[12px] font-semibold transition hover:border-white/30">
                My Profile <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Stats */}
        <StaggerContainer className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, label, value }, i) => (
            <StaggerItem key={label}>
              <motion.div
                whileHover={{ y: -3, borderColor: 'rgba(46,229,43,0.35)' }}
                className="rounded-[7px] border border-white/10 bg-[#0b0d0c] p-6 transition"
              >
                <Icon className="text-[#2ee52b]" size={20} />
                <p className="mt-6 text-[10px] uppercase tracking-[.1em] text-white/40">{label}</p>
                <p className="mt-1 text-[26px] font-black">{value}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Main content */}
        <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
          {/* Activity feed */}
          <FadeIn direction="left">
            <div className="rounded-[8px] border border-white/10 bg-[#0b0d0c] p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-black">Upcoming Activity</h2>
                <a href="#" className="text-[11px] font-semibold text-[#2ee52b] hover:underline">View all</a>
              </div>
              <div className="space-y-1">
                {activity.map(({ icon: Icon, title, sub }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 rounded-[5px] p-3 transition hover:bg-white/[.03]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5">
                      <Icon size={17} className="text-[#2ee52b]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-[13px] font-semibold">{title}</p>
                      <p className="text-[11px] text-white/45">{sub}</p>
                    </div>
                    <ArrowUpRight size={15} className="shrink-0 text-white/30" />
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Primary vehicle */}
          <FadeIn direction="right">
            <div className="overflow-hidden rounded-[8px] border border-white/10">
              <div className="relative h-36">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
                  alt="Cayenne"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d0c] via-[#0b0d0c]/40" />
              </div>
              <div className="bg-[#0b0d0c] p-5">
                <p className="text-[10px] uppercase tracking-[.12em] text-white/35">My primary vehicle</p>
                <h2 className="mt-1 text-[20px] font-black">Porsche Cayenne S</h2>
                <p className="mt-1 text-[13px] text-white/45">18,200 km · Next service in 42 days</p>

                {/* Health bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-white/40">Vehicle health</span>
                    <span className="text-[#2ee52b] font-bold">Good (82%)</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-[#2ee52b]"
                      initial={{ width: 0 }}
                      whileInView={{ width: '82%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>

                <a href="/my-cars" className="mt-5 flex items-center gap-2 text-[12px] font-semibold text-[#2ee52b] hover:underline">
                  View vehicle profile <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Quick actions */}
        <FadeIn direction="up" delay={0.1}>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['Buy a Car', '/cars'],
              ['Rent a Car', '/rentals'],
              ['Sell My Car', '/sell'],
              ['My Listings', '/my-cars'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="flex items-center justify-between rounded-[6px] border border-white/10 bg-[#0b0d0c] px-4 py-3.5 text-[12px] font-semibold transition hover:border-[#2ee52b]/40 hover:text-[#2ee52b]"
              >
                {label} <ArrowUpRight size={13} className="text-white/30" />
              </a>
            ))}
          </div>
        </FadeIn>
      </div></main>
  )
}
