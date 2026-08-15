'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CarFront, ShieldCheck, Sparkles } from 'lucide-react'
import { RENTAL_CATEGORIES } from '@/lib/rental-catalog'

export default function CategoriesView() {
  return (
    <main className="min-h-screen bg-[#F5F6F3] text-[#0F172A]">
      <section className="relative overflow-hidden bg-[#091219] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(181,233,46,.18),transparent_42%)]" />
        <div className="page-inner relative py-20 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#B5E92E]">Browse the fleet</p>
            <h1 className="mt-5 text-5xl font-black tracking-[-.055em] sm:text-6xl">Choose a car for the way you drive.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">Explore rentals by vehicle category, compare daily pricing and continue with your exact pickup location and rental dates.</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 text-xs font-bold text-white/70">
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"><ShieldCheck size={15} className="text-[#B5E92E]" /> Verified fleet</span>
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"><Sparkles size={15} className="text-[#B5E92E]" /> Premium options</span>
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"><CarFront size={15} className="text-[#B5E92E]" /> Flexible rental periods</span>
          </div>
        </div>
      </section>

      <section className="page-inner py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[.16em] text-[#7C8B55]">All categories</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-.04em]">Find your perfect class</h2>
          </div>
          <a href="/rentals" className="hidden items-center gap-2 text-sm font-black sm:flex">View all rentals <ArrowRight size={16} /></a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {RENTAL_CATEGORIES.map((category, index) => (
            <motion.a
              key={category.slug}
              href={`/rentals?category=${encodeURIComponent(category.name)}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .42, delay: index * .05 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[26px] border border-[#E2E6DE] bg-white shadow-[0_18px_50px_rgba(15,23,42,.06)]"
            >
              <div className="relative aspect-[1.55] overflow-hidden">
                <img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071016]/75 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-[#B5E92E] px-3 py-1 text-[10px] font-black uppercase tracking-[.12em] text-[#0B1220]">Rent</span>
                <h3 className="absolute bottom-4 left-5 text-3xl font-black tracking-[-.04em] text-white">{category.name}</h3>
              </div>
              <div className="flex items-end justify-between gap-5 p-5">
                <p className="max-w-[80%] text-sm leading-6 text-[#64748B]">{category.description}</p>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0E1418] text-white transition group-hover:bg-[#B5E92E] group-hover:text-[#0E1418]"><ArrowRight size={17} /></span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </main>
  )
}
