'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { useLang } from '@/context/LangContext'

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (!started) return
    const dur = 1400, start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target])
  return <motion.span onViewportEnter={() => setStarted(true)} className="tabular-nums">{count.toLocaleString()}{suffix}</motion.span>
}

export default function AboutPage() {
  const { t } = useLang()

  const stats = [
    { value: 10000, suffix: '+', label: t('stat_cars') },
    { value: 350,   suffix: '+', label: 'Partners' },
    { value: 12,    suffix: '',  label: t('stat_cities') },
    { value: 24,    suffix: '/7',label: t('benefit_support_title') },
  ]

  return (
    <main className="min-h-screen bg-[#f5f7f6] text-gray-900">
      <PageHero
        eyebrow={t('about_eyebrow')}
        title={t('about_title')}
        description={t('about_desc')}
        image="https://images.unsplash.com/photo-1562141961-b5d65aba8f5e?auto=format&fit=crop&w=2000&q=85"
      >
        <div className="mt-8 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[.18em] text-white/65">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Trusted platform</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Local expertise</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Real support</span>
        </div>
      </PageHero>

      <section className="page-inner py-20 sm:py-24 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
            <p className="text-[11px] font-black uppercase tracking-[.22em] text-[#2ee52b]">Why we exist</p>
            <h2 className="mt-4 max-w-xl text-4xl font-black leading-[1.05] tracking-[-.05em] text-[#111827] sm:text-5xl">
              {t('about_h2')}
            </h2>
          </motion.div>

          <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.08 }} className="rounded-[28px] border border-[#dfe7e0] bg-[#0b1017] p-7 text-white shadow-[0_30px_80px_rgba(9,12,16,0.12)]">
            <p className="text-[11px] font-black uppercase tracking-[.22em] text-[#d7ff3f]">Our mission</p>
            <p className="mt-4 leading-8 text-white/70">{t('about_body')}</p>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-[#dfe7e0] bg-[#dfe7e0] lg:grid-cols-4">
          {stats.map(({ value, suffix, label }, i) => (
            <motion.div key={label}
              initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.4, delay: i * 0.08 }}
              className="flex flex-col items-center justify-center gap-2 bg-white py-12">
              <p className="text-[42px] font-black tracking-[-.06em] text-[#111827]">
                <Counter target={value} suffix={suffix} />
              </p>
              <p className="text-[10px] uppercase tracking-[.18em] text-[#667085]">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="w-full bg-[#0b1017] text-white">
        <div className="page-inner py-20 sm:py-24 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=90"
                alt="Premium dealership experience"
                className="h-full min-h-[360px] w-full object-cover"
              />
            </motion.div>

            <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
              <p className="text-[11px] font-black uppercase tracking-[.22em] text-[#d7ff3f]">How we work</p>
              <h3 className="mt-4 text-3xl font-black tracking-[-.05em] sm:text-4xl">A smarter buying experience, built around trust.</h3>

              <div className="mt-8 space-y-5">
                {[
                  ['Curated inventory', 'Every listing is reviewed for quality, condition, and transparency before it reaches the market.'],
                  ['Clear guidance', 'From price comparison to financing and delivery, we simplify every step of the decision.'],
                  ['Long-term support', 'Our team stays with you beyond the purchase through service, care, and after-sales help.'],
                ].map(([title, desc], index) => (
                  <div key={title} className="flex gap-4 rounded-[18px] border border-white/10 bg-white/5 p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d7ff3f] text-[11px] font-black text-[#0b1017]">
                      0{index + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-black">{title}</h4>
                      <p className="mt-2 text-sm leading-7 text-white/65">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="page-inner py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black uppercase tracking-[.22em] text-[#2ee52b]">What sets us apart</p>
          <h3 className="mt-4 text-3xl font-black tracking-[-.05em] text-[#111827] sm:text-5xl">Built for drivers who expect more.</h3>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ['Transparent pricing', 'No hidden costs, no confusion. Every figure is clear, fair, and easy to compare.'],
            ['Premium support', 'We combine technology with real people who understand how car ownership works in the real world.'],
            ['A seamless journey', 'From discovery to purchase to aftercare, every interaction is designed to feel effortless.'],
          ].map(([title, desc]) => (
            <motion.div key={title} initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4 }} className="rounded-[24px] border border-[#dfe7e0] bg-white p-7 shadow-[0_12px_40px_rgba(17,24,39,0.04)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d7ff3f]/20 text-lg font-black text-[#111827]">•</div>
              <h4 className="mt-6 text-xl font-black tracking-[-.03em] text-[#111827]">{title}</h4>
              <p className="mt-3 text-sm leading-7 text-[#475467]">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="page-inner pb-20 sm:pb-24 lg:pb-28">
        <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4 }} className="rounded-[32px] bg-[#0b1017] px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.22em] text-[#d7ff3f]">Let’s move forward</p>
            <h3 className="mt-3 text-3xl font-black tracking-[-.05em] sm:text-4xl">Ready to find your next car with confidence?</h3>
          </div>

          <a href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d7ff3f] px-6 py-3 text-sm font-black text-[#090c10] transition hover:bg-[#c7f134] lg:mt-0">
            {t('about_partner')} <ArrowRight size={15} />
          </a>
        </motion.div>
      </section>
    </main>
  )
}
