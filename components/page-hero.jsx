import { ArrowDownRight } from 'lucide-react'

export function PageHero({ eyebrow, title, description, children, image }) {
  return (
    <section className="grain relative w-full overflow-hidden bg-[#090c10] text-white">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover object-center opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#090c10_0%,rgba(9,12,16,.94)_42%,rgba(9,12,16,.28)_78%,rgba(9,12,16,.2)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090c10] via-transparent to-transparent" />
        </div>
      )}
      <div className="page-inner relative min-h-[540px] py-20 sm:py-24 lg:py-28">
        <div className="flex h-full min-h-[380px] flex-col justify-between">
          <div className="max-w-[980px]">
            <div className="flex items-center gap-4"><span className="h-px w-11 bg-[#d7ff3f]"/><p className="text-[10px] font-black uppercase tracking-[.23em] text-[#d7ff3f]">{eyebrow}</p></div>
            <h1 className="mt-7 text-[clamp(54px,7.4vw,116px)] font-black leading-[.85] tracking-[-.078em] text-balance">{title}</h1>
            <div className="mt-8 max-w-2xl border-l border-white/15 pl-5"><p className="text-[15px] leading-7 text-white/58 sm:text-[17px]">{description}</p></div>
            {children && <div className="mt-9">{children}</div>}
          </div>
          <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-5"><span className="text-[9px] font-black uppercase tracking-[.18em] text-white/25">Motory / automotive platform</span><ArrowDownRight size={18} className="text-white/25"/></div>
        </div>
      </div>
    </section>
  )
}
