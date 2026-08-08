'use client'

import { useState } from 'react'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BatteryCharging, Car, Check,
  ChevronDown, CircleParking, Droplets, Gauge, Heart, MapPin, Search,
  ShieldCheck, Sparkles, Star, Wrench
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const cars = [
  { slug:'porsche-cayenne-s', name:'Porsche Cayenne S', year:'2024', price:'AED 365,000', image:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90', meta:'18,200 KM · AWD · Automatic', tone:'bg-[#d8d5cc]' },
  { slug:'mercedes-glc-300', name:'Mercedes GLC 300', year:'2024', price:'AED 279,000', image:'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=90', meta:'12,400 KM · 4MATIC · Automatic', tone:'bg-[#dce3e6]' },
  { slug:'bmw-7-series', name:'BMW 7 Series', year:'2025', price:'AED 429,000', image:'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=90', meta:'8,900 KM · RWD · Automatic', tone:'bg-[#dad7d0]' },
]

const services = [
  { n:'01', title:'Buy & Sell', desc:'Verified inventory, fair valuation and a cleaner transaction journey.', href:'/cars', icon:Car },
  { n:'02', title:'Rent', desc:'Daily, weekly and monthly cars delivered where you need them.', href:'/rentals', icon:CircleParking },
  { n:'03', title:'Maintain', desc:'Book trusted workshops with transparent scopes and pricing.', href:'/maintenance', icon:Wrench },
  { n:'04', title:'Care', desc:'Wash, detailing and protection designed around your schedule.', href:'/wash', icon:Droplets },
  { n:'05', title:'Assist', desc:'24/7 roadside support, towing and emergency help.', href:'/roadside', icon:BatteryCharging },
  { n:'06', title:'Inspect', desc:'Independent checks and digital reports before you commit.', href:'/inspection', icon:ShieldCheck },
]

const brands = ['PORSCHE','MERCEDES-BENZ','BMW','RANGE ROVER','AUDI','TESLA','TOYOTA']

export default function Page() {
  const [activeTab, setActiveTab] = useState('Buy')
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (i) => setFavorites((f) => f.includes(i) ? f.filter((x) => x !== i) : [...f, i])

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f4ef] text-[#11151a]">
      <SiteHeader dark />

      <section className="grain relative min-h-[880px] overflow-hidden bg-[#090c10] text-white">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=95" alt="Luxury vehicle" className="h-full w-full object-cover object-[68%_center] opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#090c10_0%,rgba(9,12,16,.94)_37%,rgba(9,12,16,.35)_68%,rgba(9,12,16,.14)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#090c10_0%,transparent_30%)]" />
        </div>

        <div className="absolute right-5 top-36 hidden items-center gap-3 xl:flex"><span className="h-2 w-2 rounded-full bg-[#d7ff3f]"/><span className="text-[9px] font-black uppercase tracking-[.2em] text-white/45">Live inventory / 10,248 vehicles</span></div>
        <div className="absolute bottom-32 right-8 hidden text-[10px] font-black tracking-[.18em] text-white/25 xl:block vertical-label">AUTOMOTIVE ECOSYSTEM / 2026</div>

        <div className="relative mx-auto flex min-h-[880px] max-w-[1540px] flex-col justify-between px-5 pb-8 pt-24 lg:px-8 lg:pb-10 xl:px-12">
          <div className="grid flex-1 items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
            <div className="max-w-[820px] animate-[fadeUp_.8s_ease-out_both]">
              <div className="mb-8 flex items-center gap-4"><span className="h-px w-12 bg-[#d7ff3f]"/><span className="text-[10px] font-black uppercase tracking-[.24em] text-[#d7ff3f]">A new standard for car ownership</span></div>
              <h1 className="text-[clamp(64px,8.8vw,142px)] font-black leading-[.78] tracking-[-.085em]">
                DRIVE<br/><span className="display-outline">EVERYTHING.</span>
              </h1>
              <div className="mt-9 grid max-w-2xl gap-6 border-l border-white/15 pl-5 sm:grid-cols-[1fr_auto] sm:items-end">
                <p className="max-w-xl text-[15px] leading-7 text-white/58 sm:text-[17px]">One premium platform to buy, rent, care for, maintain and manage every part of your car life.</p>
                <a href="/cars" className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#d7ff3f] px-5 text-xs font-black text-[#090c10]">Explore cars <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/></a>
              </div>
            </div>

            <div className="lg:self-end lg:pb-14">
              <div className="rounded-[26px] border border-white/12 bg-[#0f141a]/72 p-2 shadow-[0_35px_100px_rgba(0,0,0,.42)] backdrop-blur-2xl">
                <div className="flex gap-1 px-1 pt-1">{['Buy','Rent','Services'].map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-full px-4 py-2.5 text-[10px] font-black uppercase tracking-[.14em] transition ${activeTab===tab?'bg-white text-[#0a0d10]':'text-white/42 hover:text-white'}`}>{tab}</button>)}</div>
                <div className="mt-2 grid gap-2 md:grid-cols-2 xl:grid-cols-[1.3fr_1fr_1fr_auto]">
                  {[
                    [activeTab==='Buy'?'Make & model':activeTab==='Rent'?'Pick-up':'Service','All options'],
                    [activeTab==='Rent'?'Dates':'Budget',activeTab==='Rent'?'12 Aug — 16 Aug':'Any range'],
                    ['Location','Dubai, UAE']
                  ].map(([label,value],i) => <button key={label} className={`min-h-[78px] rounded-[18px] bg-white/[.06] px-4 text-left ${i===2?'hidden xl:block':''}`}><span className="block text-[9px] font-bold uppercase tracking-[.16em] text-white/30">{label}</span><span className="mt-2 flex items-center justify-between text-sm font-bold text-white">{value}<ChevronDown size={14} className="opacity-40"/></span></button>)}
                  <a href={activeTab==='Buy'?'/cars':activeTab==='Rent'?'/rentals':'/services'} className="flex min-h-[78px] items-center justify-center gap-2 rounded-[18px] bg-[#d7ff3f] px-6 text-xs font-black text-[#090c10]"><Search size={16}/> Search</a>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-5 text-white/40">
                <div className="flex items-center gap-2"><MapPin size={14} className="text-[#d7ff3f]"/><span className="text-[10px] font-bold uppercase tracking-[.13em]">Dubai · Abu Dhabi · UAE</span></div>
                <div className="hidden items-center gap-2 sm:flex"><Star size={13} className="fill-[#d7ff3f] text-[#d7ff3f]"/><span className="text-[10px] font-bold">4.9 / 5 experience rating</span></div>
              </div>
            </div>
          </div>

          <div className="grid border-y border-white/10 lg:grid-cols-4">
            {[['10K+','verified vehicles'],['350+','trusted partners'],['24/7','roadside coverage'],['01','connected ecosystem']].map(([a,b],i) => <div key={b} className={`flex items-end justify-between px-0 py-5 lg:px-6 ${i>0?'lg:border-l lg:border-white/10':''}`}><div><p className="text-2xl font-black tracking-[-.04em]">{a}</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[.14em] text-white/30">{b}</p></div><ArrowDownRight size={17} className="text-white/20"/></div>)}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-black/8 bg-[#d7ff3f] py-3">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] whitespace-nowrap">{[...brands,...brands].map((brand,i)=><span key={`${brand}-${i}`} className="mx-9 text-[11px] font-black tracking-[.18em] text-[#11151a]/70">{brand}</span>)}</div>
      </section>

      <section className="mx-auto max-w-[1540px] px-5 py-28 lg:px-8 xl:px-12">
        <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#829d12]">One ecosystem / six journeys</p>
            <h2 className="mt-5 text-[clamp(44px,5vw,78px)] font-black leading-[.94] tracking-[-.07em]">The car is only the beginning.</h2>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-[#6f7478]">Motory connects the moments before purchase, during ownership and long after the keys are in your hand.</p>
          </div>

          <div className="border-t border-black/12">
            {services.map((s) => { const Icon=s.icon; return <a key={s.title} href={s.href} className="group grid gap-4 border-b border-black/12 py-6 sm:grid-cols-[70px_56px_1fr_auto] sm:items-center sm:py-7"><span className="text-[10px] font-black tracking-[.16em] text-black/35">{s.n}</span><span className="grid h-11 w-11 place-items-center rounded-full border border-black/12 bg-white/40"><Icon size={19} strokeWidth={1.6}/></span><div><h3 className="text-[28px] font-black tracking-[-.045em] sm:text-[34px]">{s.title}</h3><p className="mt-1 max-w-xl text-sm leading-6 text-[#74797c]">{s.desc}</p></div><span className="grid h-11 w-11 place-items-center rounded-full bg-[#11151a] text-white transition-transform group-hover:rotate-45"><ArrowUpRight size={17}/></span></a> })}
          </div>
        </div>
      </section>

      <section className="bg-[#11151a] py-28 text-white">
        <div className="mx-auto max-w-[1540px] px-5 lg:px-8 xl:px-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div><p className="text-[10px] font-black uppercase tracking-[.22em] text-[#d7ff3f]">Curated inventory</p><h2 className="mt-5 text-[clamp(44px,5vw,78px)] font-black leading-[.94] tracking-[-.07em]">Cars worth<br/>stopping for.</h2></div>
            <a href="/cars" className="group inline-flex items-center gap-3 text-xs font-black uppercase tracking-[.12em] text-white/65">View full inventory <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition group-hover:bg-[#d7ff3f] group-hover:text-black"><ArrowUpRight size={15}/></span></a>
          </div>

          <div className="mt-14 grid gap-5 xl:grid-cols-3">
            {cars.map((car,i)=><article key={car.slug} className="group relative overflow-hidden rounded-[26px] bg-[#171c22]">
              <a href={`/cars/${car.slug}`} className={`relative block aspect-[1.18] overflow-hidden ${car.tone}`}><img src={car.image} alt={car.name} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055]"/><div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"/><span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.14em] backdrop-blur">Verified</span><button onClick={(e)=>{e.preventDefault(); toggleFavorite(i)}} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-black"><Heart size={16} className={favorites.includes(i)?'fill-black':''}/></button><span className="absolute bottom-4 right-4 rounded-full bg-[#d7ff3f] px-3 py-1.5 text-[9px] font-black text-black">{car.year}</span></a>
              <div className="p-6"><div className="flex items-start justify-between gap-5"><div><h3 className="text-[22px] font-black tracking-[-.04em]">{car.name}</h3><p className="mt-2 text-[11px] uppercase tracking-[.08em] text-white/35">{car.meta}</p></div><ArrowUpRight size={18} className="text-white/30 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#d7ff3f]"/></div><div className="mt-6 flex items-end justify-between border-t border-white/10 pt-5"><p className="text-[10px] uppercase tracking-[.12em] text-white/30">Drive away from</p><p className="text-xl font-black">{car.price}</p></div></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1540px] px-5 py-28 lg:px-8 xl:px-12">
        <div className="grid overflow-hidden rounded-[32px] bg-[#e7e7e1] lg:grid-cols-[1.08fr_.92fr]">
          <div className="relative min-h-[560px] overflow-hidden"><img src="https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1500&q=92" alt="Luxury car" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"/><div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#d7ff3f]">Sell smarter</p><h3 className="mt-2 text-3xl font-black tracking-[-.05em]">Know your car’s real value.</h3></div><a href="/valuation" className="grid h-12 w-12 place-items-center rounded-full bg-white text-black"><ArrowUpRight size={18}/></a></div></div>
          <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-14"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#829d12]">Ownership intelligence</p><h2 className="mt-5 text-[clamp(40px,4vw,64px)] font-black leading-[.95] tracking-[-.065em]">Your garage.<br/>Actually useful.</h2><p className="mt-6 max-w-md text-[15px] leading-7 text-[#6f7478]">A live vehicle profile for mileage, maintenance, insurance, inspections, documents and future care.</p></div><div className="mt-12 rounded-[22px] bg-[#11151a] p-6 text-white"><div className="flex items-center justify-between"><div><p className="text-[9px] uppercase tracking-[.16em] text-white/30">Primary vehicle</p><h3 className="mt-2 text-2xl font-black">Porsche Cayenne S</h3></div><Gauge className="text-[#d7ff3f]"/></div><div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">{[['18,200','KM'],['42','Days'],['Good','Health']].map(([a,b])=><div key={b}><p className="text-lg font-black">{a}</p><p className="mt-1 text-[8px] uppercase tracking-[.12em] text-white/30">{b}</p></div>)}</div></div><a href="/garage" className="mt-6 inline-flex items-center gap-2 text-xs font-black">Open My Garage <ArrowRight size={15}/></a></div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#d7ff3f] py-24 text-[#11151a]">
        <div className="pointer-events-none absolute -right-10 -top-24 text-[300px] font-black leading-none tracking-[-.12em] text-black/[.05]">24</div>
        <div className="relative mx-auto grid max-w-[1540px] gap-10 px-5 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8 xl:px-12"><div><p className="text-[10px] font-black uppercase tracking-[.2em]">Roadside / Always on</p><h2 className="mt-5 max-w-4xl text-[clamp(50px,7vw,108px)] font-black leading-[.82] tracking-[-.085em]">HELP SHOULD<br/>MOVE FAST.</h2><p className="mt-7 max-w-xl text-[15px] leading-7 text-black/60">Towing, battery, flat tire, fuel delivery and lockout support — available around the clock.</p></div><a href="/roadside" className="group inline-flex items-center gap-4 rounded-full bg-[#11151a] px-6 py-4 text-xs font-black text-white">Request help <ArrowUpRight size={16} className="transition group-hover:-translate-y-1 group-hover:translate-x-1"/></a></div>
      </section>

      <SiteFooter />
    </main>
  )
}
