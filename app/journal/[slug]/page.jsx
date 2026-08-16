import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock3 } from 'lucide-react'
import { getJournalPost, JOURNAL_POSTS } from '@/lib/journal-content'
import { NewsSection, TrustBand } from '@/components/platform/rich-sections'

export function generateStaticParams() {
  return JOURNAL_POSTS.map((post) => ({ slug: post.slug }))
}

export default async function JournalArticlePage({ params }) {
  const { slug } = await params
  const post = getJournalPost(slug)
  if (!post) notFound()
  return <main className="bg-[#F5F6F3]">
    <section className="relative overflow-hidden bg-[#071016] text-white"><img src={post.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" /><div className="absolute inset-0 bg-gradient-to-r from-[#071016] via-[#071016]/92 to-[#071016]/55" /><div className="page-inner relative py-16 sm:py-24"><a href="/journal" className="inline-flex items-center gap-2 text-xs font-black text-white/55 hover:text-white"><ArrowLeft size={14} />Journal</a><p className="mt-10 text-[10px] font-black uppercase tracking-[.2em] text-[#B5E92E]">{post.category}</p><h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-.05em] sm:text-6xl">{post.title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/60">{post.excerpt}</p><div className="mt-7 flex gap-4 text-xs text-white/40"><span className="flex items-center gap-2"><CalendarDays size={14} />{new Date(`${post.date}T12:00:00`).toLocaleDateString('en-AE',{day:'2-digit',month:'long',year:'numeric'})}</span><span className="flex items-center gap-2"><Clock3 size={14} />{post.readTime}</span></div></div></section>
    <article className="page-inner py-16"><div className="mx-auto max-w-3xl space-y-10">{post.sections.map(([heading, body], index) => <section key={heading} className="rounded-[24px] border border-[#e2e6de] bg-white p-6 sm:p-8"><span className="text-[10px] font-black text-[#7d9f24]">0{index + 1}</span><h2 className="mt-4 text-2xl font-black tracking-[-.035em] text-[#0f172a]">{heading}</h2><p className="mt-4 text-[15px] leading-8 text-[#64748b]">{body}</p></section>)}</div></article>
    <TrustBand />
    <NewsSection />
  </main>
}
