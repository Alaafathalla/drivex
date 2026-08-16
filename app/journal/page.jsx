import { ArrowRight, Clock3 } from 'lucide-react'
import { JOURNAL_POSTS } from '@/lib/journal-content'
import { PageHero } from '@/components/page-hero'
import { FaqSection, TrustBand } from '@/components/platform/rich-sections'

export default function JournalPage() {
  return <main className="bg-[#F5F6F3]">
    <PageHero eyebrow="DriveX journal" title="Practical intelligence for every part of car ownership." description="Decision-focused guides for buying, renting, financing, maintaining and getting more from your vehicle." image="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=2200&q=86" />
    <section className="page-inner py-16"><div className="grid gap-5 lg:grid-cols-3">{JOURNAL_POSTS.map((post) => <article key={post.slug} className="group overflow-hidden rounded-[26px] border border-[#e2e6de] bg-white shadow-[0_18px_50px_rgba(15,23,42,.05)]"><a href={`/journal/${post.slug}`} className="block overflow-hidden"><img src={post.image} alt={post.title} className="aspect-[1.65] w-full object-cover transition duration-700 group-hover:scale-105" /></a><div className="p-6"><div className="flex items-center justify-between gap-3"><span className="rounded-full bg-[#eef4df] px-3 py-1 text-[9px] font-black uppercase tracking-[.12em] text-[#657f1b]">{post.category}</span><span className="flex items-center gap-1 text-[10px] text-[#94a3b8]"><Clock3 size={12} />{post.readTime}</span></div><h2 className="mt-5 text-xl font-black tracking-[-.035em] text-[#0f172a]">{post.title}</h2><p className="mt-3 text-sm leading-6 text-[#64748b]">{post.excerpt}</p><a href={`/journal/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-xs font-black text-[#7d9f24]">Read guide <ArrowRight size={14} /></a></div></article>)}</div></section>
    <TrustBand />
    <FaqSection items={[["Is DriveX Journal financial or mechanical advice?","No. Journal content is general educational material. Finance decisions should be confirmed with a regulated lender and technical decisions with a qualified service professional."],["Do journal articles connect to marketplace tools?","Yes. Guides are designed to lead naturally into inventory filters, comparison, calculator and service workflows."],["Can a backend CMS replace these articles?","Yes. The current content module can be replaced by a CMS API while preserving the route and card components."],["Are publication dates structured?","Yes. Each article includes a slug, category, date, read time, excerpt, image and content sections."]]} />
  </main>
}
