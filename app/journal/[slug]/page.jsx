import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock3 } from 'lucide-react'
import { getJournalPost, JOURNAL_POSTS } from '@/lib/journal-content'
import { t as translate } from '@/lib/i18n'
import { NewsSection, TrustBand } from '@/components/platform/rich-sections'

export function generateStaticParams() {
  return JOURNAL_POSTS.map((post) => ({ slug: post.slug }))
}

export default async function JournalArticlePage({ params }) {
  const { slug } = await params
  const post = getJournalPost(slug)
  if (!post) notFound()

  const cookieStore = await cookies()
  const lang = cookieStore.get('drivex_lang')?.value === 'ar' ? 'ar' : 'en'
  const localize = (key, fallback) => (key ? translate(key, lang) : fallback)

  const formattedDate = new Date(`${post.date}T12:00:00`).toLocaleDateString(lang === 'ar' ? 'ar-AE' : 'en-AE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="bg-[#F5F6F3]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071016] text-white">
        <img src={post.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071016] via-[#071016]/92 to-[#071016]/55" />
        <div className="page-inner relative py-16 sm:py-24">
          <a
            href="/journal"
            className="inline-flex items-center gap-2 text-xs font-black text-white/55 transition hover:text-white"
          >
            <ArrowLeft size={14} /> Journal
          </a>
          <p className="mt-10 text-[10px] font-black uppercase tracking-[.2em] text-[#B5E92E]">{localize(post.categoryKey, post.category)}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-.05em] sm:text-6xl">
            {localize(post.titleKey, post.title)}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">{localize(post.excerptKey, post.excerpt)}</p>
          <div className="mt-7 flex flex-wrap gap-4 text-xs text-white/40">
            <span className="flex items-center gap-2"><CalendarDays size={14} />{formattedDate}</span>
            <span className="flex items-center gap-2"><Clock3 size={14} />{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article content */}
      <article className="page-inner py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          {post.sections.map(([headingKey, bodyKey], index) => (
            <section
              key={headingKey}
              className="rounded-[24px] border border-[#e2e6de] bg-white p-6 sm:p-8"
            >
              <span className="text-[10px] font-black text-[#7d9f24]">0{index + 1}</span>
              <h2 className="mt-4 text-2xl font-black tracking-[-.035em] text-[#0f172a]">{localize(headingKey, headingKey)}</h2>
              <p className="mt-4 text-[15px] leading-8 text-[#64748b]">{localize(bodyKey, bodyKey)}</p>
            </section>
          ))}
        </div>
      </article>

      <TrustBand />
      <NewsSection />
    </main>
  )
}
