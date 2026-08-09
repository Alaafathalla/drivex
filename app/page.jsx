'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CarFront,
  ChevronDown,
  Headphones,
  Heart,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Tag,
  UserRound,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const categories = [
  { title: 'Luxury Cars', count: '120+ Cars', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=90' },
  { title: 'SUVs', count: '200+ Cars', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=90' },
  { title: 'Sedans', count: '150+ Cars', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=90' },
  { title: 'Sports Cars', count: '80+ Cars', image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=90' },
  { title: 'Electric Cars', count: '60+ Cars', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=90' },
]

const featuredCars = [
  { name: 'BMW 5 Series', type: 'FOR SALE', year: '2023', km: '15,000 km', price: '$54,900', image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=900&q=90' },
  { name: 'Range Rover Sport', type: 'FOR RENT', year: '2022', km: '30,000 km', price: '$120 / day', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=90' },
  { name: 'Mercedes-Benz C-Class', type: 'FOR SALE', year: '2023', km: '10,000 km', price: '$42,900', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=90' },
  { name: 'Audi A6', type: 'FOR RENT', year: '2022', km: '25,000 km', price: '$85 / day', image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=900&q=90' },
  { name: 'Tesla Model 3', type: 'FOR SALE', year: '2023', km: '8,000 km', price: '$39,900', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=90' },
]

const benefits = [
  { icon: BadgeCheck, title: 'Wide Selection', text: 'Thousands of cars to choose from' },
  { icon: Tag, title: 'Best Deals', text: 'Competitive prices every day' },
  { icon: ShieldCheck, title: 'Secure Payments', text: 'Safe and secure transactions' },
  { icon: Headphones, title: '24/7 Support', text: "We're here to help anytime" },
]

export default function Page() {
  const [mode, setMode] = useState('buy')
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (name) => setFavorites((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])

  const searchHref = useMemo(() => mode === 'buy' ? '/cars' : '/rentals', [mode])

  return (
    <main className="min-h-screen bg-[#070908] text-white">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-white/8 pt-[74px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_87%_36%,rgba(20,255,46,.18),transparent_28%),linear-gradient(90deg,#050706_0%,#070908_52%,#071009_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070908] to-transparent" />

        <div className="relative mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-10">
          <div className="grid min-h-[550px] items-center gap-8 py-12 lg:grid-cols-[.82fr_1.18fr] lg:py-5">
            <div className="relative z-10 max-w-[500px] lg:py-10">
              <div className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.06em] text-[#2ee52b]"><span>Premium Cars</span><span className="h-[2px] w-12 bg-[#2ee52b]" /></div>
              <h1 className="text-[clamp(48px,6vw,76px)] font-black leading-[.95] tracking-[-.055em]">Find Your<br/>Perfect Car</h1>
              <p className="mt-5 max-w-[360px] text-[18px] leading-7 text-white/60">Buy or rent premium cars at the best prices</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/cars" className="inline-flex h-12 items-center gap-8 rounded-[5px] bg-[#2ee52b] px-7 text-[13px] font-bold text-black transition hover:bg-[#50f14d]">Buy a Car <ArrowRight size={16}/></a>
                <a href="/rentals" className="inline-flex h-12 items-center gap-8 rounded-[5px] border border-white/20 bg-black/20 px-7 text-[13px] font-bold text-white transition hover:border-[#2ee52b] hover:text-[#2ee52b]">Rent a Car <ArrowRight size={16}/></a>
              </div>

              <div className="mt-9 grid max-w-[420px] grid-cols-3 gap-4 text-[9px] text-white/55">
                <div className="flex gap-2"><BadgeCheck className="mt-0.5 text-[#2ee52b]" size={18}/><span><b className="block text-white">Best Prices</b>Guaranteed</span></div>
                <div className="flex gap-2"><ShieldCheck className="mt-0.5 text-[#2ee52b]" size={18}/><span><b className="block text-white">Trusted Dealers</b>Verified</span></div>
                <div className="flex gap-2"><Headphones className="mt-0.5 text-[#2ee52b]" size={18}/><span><b className="block text-white">24/7 Support</b>Available</span></div>
              </div>
            </div>

            <div className="relative min-h-[360px] self-end lg:min-h-[510px]">
              <div className="absolute inset-y-8 right-0 w-2/3 rounded-full bg-[#0d7f11]/20 blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1800&q=95"
                alt="Premium black sports car"
                className="absolute bottom-0 right-[-8%] h-[94%] w-[112%] object-cover object-center mix-blend-screen [mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#070908_0%,transparent_35%)]" />
            </div>
          </div>

          <div className="relative z-20 -mt-1 rounded-[8px] border border-white/12 bg-[#0a0c0b]/95 shadow-[0_18px_60px_rgba(0,0,0,.35)]">
            <div className="flex border-b border-white/10">
              <button onClick={() => setMode('buy')} className={`flex h-14 items-center gap-3 border-b-2 px-7 text-[13px] font-semibold transition ${mode === 'buy' ? 'border-[#2ee52b] text-white' : 'border-transparent text-white/55 hover:text-white'}`}><CarFront size={18} className={mode === 'buy' ? 'text-[#2ee52b]' : ''}/>Buy Cars</button>
              <button onClick={() => setMode('rent')} className={`flex h-14 items-center gap-3 border-b-2 px-7 text-[13px] font-semibold transition ${mode === 'rent' ? 'border-[#2ee52b] text-white' : 'border-transparent text-white/55 hover:text-white'}`}><CalendarDays size={17} className={mode === 'rent' ? 'text-[#2ee52b]' : ''}/>Rent Cars</button>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_.95fr]">
              {['All Makes', 'All Models', 'Min Price', 'Max Price', 'Year'].map((label) => (
                <button key={label} className="flex h-12 items-center justify-between rounded-[5px] border border-white/12 bg-white/[.035] px-4 text-[12px] text-white/45 hover:border-white/25"><span>{label}</span><ChevronDown size={14}/></button>
              ))}
              <button className="flex h-10 items-center gap-2 text-[12px] font-semibold text-white/80 hover:text-[#2ee52b] sm:col-span-1"><SlidersHorizontal size={15}/>More Filters</button>
              <a href={searchHref} className="flex h-12 items-center justify-center gap-3 rounded-[4px] bg-[#2ee52b] text-[12px] font-bold text-black transition hover:bg-[#50f14d] sm:col-start-2 lg:col-start-5"><span>Search Cars</span><Search size={16}/></a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1450px] px-5 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex min-h-[112px] items-center gap-5 rounded-[7px] border border-white/10 bg-[#0a0c0b] px-7 transition hover:border-[#2ee52b]/45">
              <Icon size={30} strokeWidth={1.7} className="text-[#2ee52b]" />
              <div><h3 className="text-[13px] font-semibold">{title}</h3><p className="mt-1 max-w-[150px] text-[11px] leading-5 text-white/50">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1450px] px-5 py-5 sm:px-8 lg:px-10">
        <div className="mb-5 flex items-center justify-between"><h2 className="text-[22px] font-bold">Browse by Category</h2><a href="/cars" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#2ee52b]">View All <ArrowRight size={15}/></a></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <a key={category.title} href="/cars" className="group overflow-hidden rounded-[7px] border border-white/10 bg-[#0b0d0c] transition hover:-translate-y-1 hover:border-[#2ee52b]/45">
              <div className="h-[145px] overflow-hidden bg-[#111] p-2"><img src={category.image} alt={category.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
              <div className="flex items-end justify-between p-4"><div><h3 className="text-[13px] font-semibold">{category.title}</h3><p className="mt-1 text-[11px] text-white/45">{category.count}</p></div><span className="grid h-8 w-8 place-items-center rounded-[4px] bg-[#159219] text-white transition group-hover:bg-[#2ee52b] group-hover:text-black"><ArrowRight size={15}/></span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1450px] px-5 py-10 sm:px-8 lg:px-10">
        <div className="mb-5 flex items-center justify-between"><h2 className="text-[22px] font-bold">Featured Cars</h2><a href="/cars" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#2ee52b]">View All <ArrowRight size={15}/></a></div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {featuredCars.map((car) => {
            const isFavorite = favorites.includes(car.name)
            return (
              <article key={car.name} className="group relative overflow-hidden rounded-[7px] border border-white/10 bg-[#0b0d0c] transition hover:-translate-y-1 hover:border-[#2ee52b]/40">
                <div className="relative h-[180px] overflow-hidden bg-[#131615]">
                  <span className="absolute left-3 top-3 z-10 rounded-[3px] bg-[#42d94a] px-2 py-1 text-[9px] font-bold text-white">{car.type}</span>
                  <button onClick={() => toggleFavorite(car.name)} className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/25 text-white backdrop-blur-sm"><Heart size={18} className={isFavorite ? 'fill-[#2ee52b] text-[#2ee52b]' : ''}/></button>
                  <img src={car.image} alt={car.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="truncate text-[14px] font-semibold">{car.name}</h3>
                  <p className="mt-1 text-[10px] text-white/45">{car.year} · {car.km}</p>
                  <div className="mt-3 flex items-center justify-between"><p className="text-[15px] font-bold text-[#2ee52b]">{car.price}</p><Heart size={17} className="text-white/70"/></div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1450px] px-5 pb-14 pt-3 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-[8px] border border-[#2ee52b]/25 bg-[linear-gradient(100deg,#07130a_0%,#0b2810_48%,#063a0a_100%)] px-7 py-10 lg:px-8 lg:py-12">
          <div className="absolute inset-y-0 right-0 hidden w-[44%] lg:block"><img src="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=90" alt="Premium green sports car" className="h-full w-full object-cover opacity-60 [mask-image:linear-gradient(to_left,black_68%,transparent)]"/></div>
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_.9fr_1fr] lg:items-center">
            <div><p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.05em] text-[#2ee52b]">Experience the difference <span className="h-[2px] w-12 bg-[#2ee52b]"/></p><h2 className="mt-5 max-w-[420px] text-[30px] font-bold leading-tight">Premium Cars, Premium Experience</h2><p className="mt-3 max-w-[430px] text-[12px] leading-6 text-white/55">Whether you want to buy your dream car or rent the perfect ride, we make it simple and secure.</p><a href="/cars" className="mt-6 inline-flex h-11 items-center gap-8 rounded-[4px] bg-[#2ee52b] px-6 text-[12px] font-bold text-black">Explore Cars <ArrowRight size={15}/></a></div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-7 text-[11px]"><div className="flex gap-3"><CarFront className="text-[#2ee52b]" size={22}/><span><b className="block text-[18px] text-[#2ee52b]">10,000+</b>Cars Available</span></div><div className="flex gap-3"><Headphones className="text-[#2ee52b]" size={22}/><span><b className="block text-[18px] text-[#2ee52b]">24/7</b>Support</span></div><div className="flex gap-3"><UserRound className="text-[#2ee52b]" size={22}/><span><b className="block text-[18px] text-[#2ee52b]">5,000+</b>Happy Customers</span></div><div className="flex gap-3"><ShieldCheck className="text-[#2ee52b]" size={22}/><span><b className="block text-[18px] text-[#2ee52b]">50+</b>Trusted Dealers</span></div></div>
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
