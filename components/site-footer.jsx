import { ArrowUpRight } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#090c10] text-white">
      <div className="pointer-events-none absolute -right-20 top-10 text-[260px] font-black leading-none tracking-[-.1em] text-white/[.025]">M</div>
      <div className="mx-auto max-w-[1540px] px-5 py-16 lg:px-8 xl:px-12">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.45fr_.55fr_.55fr_.55fr]">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#d7ff3f]">The complete car life platform</p>
            <h2 className="mt-5 max-w-xl text-[clamp(38px,4.5vw,70px)] font-black leading-[.95] tracking-[-.065em]">Drive more.<br/>Think less.</h2>
            <a href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d7ff3f] px-5 py-3 text-xs font-black text-[#090c10]">Start a conversation <ArrowUpRight size={15}/></a>
          </div>
          <div><p className="text-[10px] font-black uppercase tracking-[.18em] text-white/35">Marketplace</p><div className="mt-5 grid gap-3 text-sm text-white/65"><a href="/cars">Cars for sale</a><a href="/rentals">Rent a car</a><a href="/sell">Sell your car</a><a href="/compare">Compare</a></div></div>
          <div><p className="text-[10px] font-black uppercase tracking-[.18em] text-white/35">Car care</p><div className="mt-5 grid gap-3 text-sm text-white/65"><a href="/services">All services</a><a href="/wash">Wash & detailing</a><a href="/maintenance">Maintenance</a><a href="/roadside">Roadside help</a></div></div>
          <div><p className="text-[10px] font-black uppercase tracking-[.18em] text-white/35">Company</p><div className="mt-5 grid gap-3 text-sm text-white/65"><a href="/about">About</a><a href="/contact">Contact</a><a href="/inspection">Inspection</a><a href="/valuation">Valuation</a></div></div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-7 text-[11px] text-white/35 sm:flex-row"><p>© 2026 Motory Automotive Platform</p><div className="flex gap-5"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></div></div>
      </div>
    </footer>
  )
}
