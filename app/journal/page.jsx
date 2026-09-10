'use client'

import { ArrowRight, Clock3 } from 'lucide-react'
import { JOURNAL_POSTS } from '@/lib/journal-content'
import { PageHero } from '@/components/page-hero'
import { FaqSection, TrustBand } from '@/components/platform/rich-sections'
import { useLang } from '@/context/LangContext'

export default function JournalPage() {
  const { t, isRTL } = useLang()

  const FAQ_ITEMS = [
    [t('journal_faq_q1'), t('journal_faq_a1')],
    [t('journal_faq_q2'), t('journal_faq_a2')],
    [t('journal_faq_q3'), t('journal_faq_a3')],
    [t('journal_faq_q4'), t('journal_faq_a4')],
  ]

  return (
    <main className="bg-[#F5F6F3]" dir={isRTL ? 'rtl' : 'ltr'}>
      <PageHero
        eyebrow={t('journal_page_eyebrow')}
        title={t('journal_page_title')}
        description={t('journal_page_desc')}
        image="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=2200&q=86"
      />

      <section className="page-inner py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {JOURNAL_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-[26px] border border-[#e2e6de] bg-white shadow-[0_18px_50px_rgba(15,23,42,.05)] transition hover:shadow-[0_28px_60px_rgba(15,23,42,.09)]"
            >
              <a href={`/journal/${post.slug}`} className="block overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="aspect-[1.65] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </a>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#eef4df] px-3 py-1 text-[9px] font-black uppercase tracking-[.12em] text-[#657f1b]">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-[#94a3b8]">
                    <Clock3 size={12} /> {post.readTime}
                  </span>
                </div>
                <h2 className="mt-5 text-xl font-black tracking-[-.035em] text-[#0f172a]">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#64748b]">{post.excerpt}</p>
                <a
                  href={`/journal/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-black text-[#7d9f24] transition hover:text-[#4a6000]"
                >
                  {t('journal_read_guide')} <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <TrustBand />
      <FaqSection items={FAQ_ITEMS} />
    </main>
  )
}
