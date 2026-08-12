'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
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
      <section className="relative w-full overflow-hidden bg-[#070908] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,229,43,.1),transparent_60%)]" />
        <div className="page-inner relative py-20 sm:py-24 lg:py-28">
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
            className="text-[10px] font-black uppercase tracking-[.2em] text-accent">{t('about_eyebrow')}</motion.p>
          <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.1 }}
            className="mt-3 text-[clamp(36px,5.5vw,80px)] font-black leading-[.88] tracking-[-.06em] max-w-3xl">
            {t('about_title')}
          </motion.h1>
          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
            className="mt-5 max-w-xl text-[16px] leading-7 text-white/55">{t('about_desc')}</motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="page-inner py-20 sm:py-24 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-2">
          <motion.h2 initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            transition={{ duration:0.55 }}
            className="text-4xl font-black leading-[1.1] tracking-[-.05em] whitespace-pre-line">
            {t('about_h2')}
          </motion.h2>
          <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            transition={{ duration:0.55 }}>
            <p className="leading-8 text-muted-foreground">{t('about_body')}</p>
            <a href="/contact"
              className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-[5px] border border-border px-4 py-3 text-sm font-black transition hover:border-accent hover:text-accent">
              {t('about_partner')} <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-px bg-border overflow-hidden rounded-[8px] lg:grid-cols-4">
          {stats.map(({ value, suffix, label }, i) => (
            <motion.div key={label}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.4, delay: i * 0.08 }}
              className="flex flex-col items-center justify-center gap-2 bg-background py-12">
              <p className="text-[42px] font-black text-accent">
                <Counter target={value} suffix={suffix} />
              </p>
              <p className="text-xs uppercase tracking-[.14em] text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Image section */}
      <section className="w-full px-4 pb-20 sm:px-6 lg:px-8 xl:px-12">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:0.6 }}
          className="relative overflow-hidden rounded-[8px]">
          <img
            src="https://images.unsplash.com/photo-1562141961-b5d65aba8f5e?auto=format&fit=crop&w=2000&q=85"
            alt="Showroom"
            className="aspect-[2.2] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070908] via-transparent to-transparent" />
        </motion.div>
      </section></main>
  )
}
