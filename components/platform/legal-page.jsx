export function LegalPage({ eyebrow, title, updated = '15 August 2026', sections }) {
  return <main className="bg-[#F5F6F3]">
    <section className="bg-[#071016] text-white"><div className="page-inner py-16 sm:py-20"><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#B5E92E]">{eyebrow}</p><h1 className="mt-4 max-w-3xl text-5xl font-black tracking-[-.05em]">{title}</h1><p className="mt-4 text-sm text-white/45">Last updated: {updated}</p></div></section>
    <section className="page-inner py-14"><div className="mx-auto max-w-4xl space-y-4">{sections.map(([heading, body], index) => <article key={heading} className="rounded-[22px] border border-[#e2e6de] bg-white p-6 sm:p-8"><span className="text-[10px] font-black text-[#7d9f24]">0{index + 1}</span><h2 className="mt-3 text-xl font-black text-[#0f172a]">{heading}</h2><p className="mt-3 text-sm leading-7 text-[#64748b]">{body}</p></article>)}</div></section>
  </main>
}
