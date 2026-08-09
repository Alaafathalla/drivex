'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, Globe, Headphones, ShieldCheck, Zap } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from '@/components/motion-section'

function AnimatedStat({ value, suffix, label, delay = 0 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) return
    const target = typeof value === 'number' ? value : parseFloat(value)
    const dur = 1600
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(typeof value === 'number' ? Math.round(ease * target) : (ease * target).toFixed(1))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, value])

  return (
    <motion.div
      onViewportEnter={() => setStarted(true)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <p className="text-[48px] font-black text-[#2ee52b]">{count}{suffix}</p>
      <p className="mt-2 text-[13px] text-white/50">{label}</p>
    </motion.div>
  )
}

const values = [
  { icon: ShieldCheck, title: 'Trust first', text: 'Every listing is verified. Every dealer is screened. No exceptions.' },
  { icon: Zap, title: 'Speed & clarity', text: 'Find, compare and transact faster than anywhere else.' },
  { icon: Globe, title: 'Total coverage', text: 'Buy, rent, sell, inspect, insure — one platform for all of it.' },
  { icon: Headphones, title: 'Always there', text: '24/7 support from real people who love cars as much as you do.' },
]

const team = [
  { name: 'Sara Khalid', role: 'CEO & Co-Founder', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
  { name: 'Omar Hassan', role: 'CTO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Leila Nour', role: 'Head of Product', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' },
  { name: 'James Park', role: 'Head of Dealer Relations', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8 pt-[72px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(46,229,43,.12),transparent_50%)]" />
        <div className="relative mx-auto max-w-[1450px] px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.12em] text-[#2ee52b]"
              >
                <span className="h-[2px] w-8 bg-[#2ee52b]" /> About DriveX
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="mt-5 text-[clamp(38px,5.5vw,72px)] font-black leading-[.92] tracking-tight"
              >
                The operating system<br />for car ownership.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-6 max-w-lg text-[15px] leading-7 text-white/60"
              >
                DriveX brings fragmented automotive services into one premium platform — connecting customers with verified inventory, rental partners and trusted service providers.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a href="/cars" className="inline-flex items-center gap-2 rounded-[5px] bg-[#2ee52b] px-6 py-3 text-[13px] font-bold text-black transition hover:bg-[#50f14d]">
                  Explore Cars <ArrowRight size={15} />
                </a>
                <a href="/contact" className="inline-flex items-center gap-2 rounded-[5px] border border-white/20 px-6 py-3 text-[13px] font-bold text-white transition hover:border-[#2ee52b] hover:text-[#2ee52b]">
                  Partner with us
                </a>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=90"
                alt="Car"
                className="w-full rounded-[8px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#070908]/30 rounded-[8px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-white/8 bg-[#0a0c0b]">
        <div className="mx-auto grid max-w-[1450px] grid-cols-2 gap-px bg-white/8 px-0 lg:grid-cols-4">
          {[
            [10000, '+', 'Cars Available'],
            [350, '+', 'Dealer Partners'],
            [12, '', 'Cities Covered'],
            [4.9, '', 'Avg Rating'],
          ].map(([v, s, l], i) => (
            <div key={l} className="bg-[#0a0c0b] px-8 py-10">
              <AnimatedStat value={v} suffix={s} label={l} delay={i * 0.1} />
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-[1450px] px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn direction="left">
            <h2 className="text-[clamp(28px,4vw,48px)] font-black tracking-tight">
              Cars are complex.<br />The experience shouldn't be.
            </h2>
          </FadeIn>
          <FadeIn direction="right">
            <p className="text-[15px] leading-8 text-white/60">
              We started DriveX because buying, renting or selling a car felt unnecessarily hard. Between fragmented listings, opaque pricing, unverified sellers and slow transactions — the experience was broken.
            </p>
            <p className="mt-5 text-[15px] leading-8 text-white/60">
              We built a single, honest platform where every car is verified, every price is transparent and every step from discovery to delivery is seamless.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-white/8 bg-[#0a0c0b] py-16">
        <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-10">
          <FadeIn direction="up">
            <h2 className="mb-10 text-[24px] font-black">What we stand for</h2>
          </FadeIn>
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title}>
                <motion.div
                  whileHover={{ y: -4, borderColor: 'rgba(46,229,43,0.4)' }}
                  className="rounded-[7px] border border-white/10 bg-[#0b0d0c] p-6 transition"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-[#2ee52b]/10">
                    <Icon size={22} className="text-[#2ee52b]" />
                  </div>
                  <h3 className="mt-5 text-[15px] font-bold">{title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-white/50">{text}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-[1450px] px-5 py-20 sm:px-8 lg:px-10">
        <FadeIn direction="up">
          <h2 className="mb-10 text-[24px] font-black">Meet the team</h2>
        </FadeIn>
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map(({ name, role, img }) => (
            <StaggerItem key={name}>
              <motion.div
                whileHover={{ y: -4 }}
                className="overflow-hidden rounded-[8px] border border-white/10 bg-[#0b0d0c]"
              >
                <div className="aspect-[1] overflow-hidden">
                  <img src={img} alt={name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="font-bold">{name}</p>
                  <p className="mt-1 text-[12px] text-[#2ee52b]">{role}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <SiteFooter />
    </main>
  )
}
