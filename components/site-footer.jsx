import { ArrowUpRight } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#050706] text-white">
      <div className="mx-auto max-w-[1450px] px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-10 border-b border-white/8 pb-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <a href="/" className="inline-flex text-[25px] font-black italic tracking-[-.05em]">Drive<span className="text-[#2ee52b]">X</span></a>
            <p className="mt-4 max-w-sm text-[13px] leading-6 text-white/50">A premium marketplace for buying and renting cars with verified listings, trusted dealers and secure transactions.</p>
          </div>
          <div><p className="text-[12px] font-bold">Marketplace</p><div className="mt-4 grid gap-3 text-[12px] text-white/50"><a href="/cars">Buy Cars</a><a href="/rentals">Rent Cars</a><a href="/sell">Sell My Car</a></div></div>
          <div><p className="text-[12px] font-bold">Company</p><div className="mt-4 grid gap-3 text-[12px] text-white/50"><a href="/about">About Us</a><a href="/contact">Contact</a><a href="/dealers">Dealers</a></div></div>
          <div><p className="text-[12px] font-bold">Support</p><div className="mt-4 grid gap-3 text-[12px] text-white/50"><a href="/inspection">Inspection</a><a href="/valuation">Valuation</a><a href="/roadside">Roadside Help</a></div></div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 DriveX. All rights reserved.</p><a href="/contact" className="inline-flex items-center gap-1 text-white/55 hover:text-[#2ee52b]">Talk to us <ArrowUpRight size={12}/></a></div>
      </div>
    </footer>
  )
}
