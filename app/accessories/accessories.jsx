'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, CheckCircle2, ChevronLeft, ChevronRight,
  Gauge, Heart, Package, Search, ShieldCheck, ShoppingBag,
  ShoppingCart, Sparkles, Star, Tag, Truck, Zap,
} from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all',           label: 'All products' },
  { id: 'exterior',      label: 'Exterior' },
  { id: 'interior',      label: 'Interior' },
  { id: 'performance',   label: 'Performance' },
  { id: 'tech',          label: 'Tech & Audio' },
  { id: 'care',          label: 'Car Care' },
  { id: 'safety',        label: 'Safety' },
]

const PRODUCTS = [
  // Exterior
  { id: 1,  cat: 'exterior',    name: 'Carbon Fibre Front Splitter',    brand: 'AeroKit',     price: 1290,  rating: 4.8, reviews: 34,  badge: 'Popular', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80' },
  { id: 2,  cat: 'exterior',    name: 'Gloss Black Side Mirror Covers',  brand: 'DriveX Parts',price: 340,   rating: 4.6, reviews: 61,  badge: null,      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&q=80' },
  { id: 3,  cat: 'exterior',    name: 'Sport Rear Diffuser',             brand: 'AeroKit',     price: 980,   rating: 4.7, reviews: 22,  badge: 'New',     image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&q=80' },
  { id: 4,  cat: 'exterior',    name: 'Smoked LED Tail Light Set',       brand: 'LumiDrive',   price: 1650,  rating: 4.9, reviews: 18,  badge: 'New',     image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&q=80' },
  // Interior
  { id: 5,  cat: 'interior',    name: 'Alcantara Steering Wheel Cover',  brand: 'CabinPro',    price: 420,   rating: 4.7, reviews: 55,  badge: 'Popular', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80' },
  { id: 6,  cat: 'interior',    name: 'Carbon Dash Trim Kit',            brand: 'CabinPro',    price: 780,   rating: 4.5, reviews: 30,  badge: null,      image: 'https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=500&q=80' },
  { id: 7,  cat: 'interior',    name: 'Sport Racing Seat Pair',          brand: 'RaceLine',    price: 3200,  rating: 4.9, reviews: 12,  badge: 'Premium', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80' },
  { id: 8,  cat: 'interior',    name: 'All-Weather Floor Mat Set',       brand: 'DriveX Parts',price: 290,   rating: 4.8, reviews: 104, badge: 'Popular', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&q=80' },
  // Performance
  { id: 9,  cat: 'performance', name: 'Cold Air Intake Kit',             brand: 'TurboEdge',   price: 1150,  rating: 4.8, reviews: 27,  badge: 'Popular', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&q=80' },
  { id: 10, cat: 'performance', name: 'Sport Exhaust Tip Set',           brand: 'TurboEdge',   price: 680,   rating: 4.6, reviews: 41,  badge: null,      image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=500&q=80' },
  { id: 11, cat: 'performance', name: 'Big Brake Upgrade Kit',           brand: 'StopTech',    price: 4800,  rating: 4.9, reviews: 8,   badge: 'Premium', image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=500&q=80' },
  { id: 12, cat: 'performance', name: 'Lowering Spring Set',             brand: 'RaceLine',    price: 920,   rating: 4.7, reviews: 19,  badge: null,      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&q=80' },
  // Tech
  { id: 13, cat: 'tech',        name: 'Android 12 CarPlay Head Unit',    brand: 'NavTech',     price: 1890,  rating: 4.8, reviews: 67,  badge: 'Popular', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80' },
  { id: 14, cat: 'tech',        name: '360° Dash Camera System',         brand: 'VisionDrive',  price: 2100,  rating: 4.9, reviews: 38,  badge: 'New',     image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&q=80' },
  { id: 15, cat: 'tech',        name: 'Wireless Phone Charging Mount',   brand: 'NavTech',     price: 180,   rating: 4.6, reviews: 145, badge: null,      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&q=80' },
  { id: 16, cat: 'tech',        name: 'Tyre Pressure Monitor System',    brand: 'DriveX Parts',price: 350,   rating: 4.7, reviews: 52,  badge: null,      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80' },
  // Care
  { id: 17, cat: 'care',        name: 'Pro Ceramic Coating Kit',         brand: 'ShineGuard',  price: 780,   rating: 4.9, reviews: 88,  badge: 'Popular', image: 'https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?w=500&q=80' },
  { id: 18, cat: 'care',        name: 'Paint Correction Polish Set',     brand: 'ShineGuard',  price: 420,   rating: 4.7, reviews: 63,  badge: null,      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&q=80' },
  { id: 19, cat: 'care',        name: 'Microfibre Detailing Bundle',     brand: 'DriveX Parts',price: 95,    rating: 4.8, reviews: 212, badge: 'Popular', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80' },
  { id: 20, cat: 'care',        name: 'Interior UV Protectant Spray',    brand: 'CabinPro',    price: 65,    rating: 4.5, reviews: 97,  badge: null,      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&q=80' },
  // Safety
  { id: 21, cat: 'safety',      name: 'Multi-Function Jump Starter',     brand: 'SafeDrive',   price: 490,   rating: 4.9, reviews: 134, badge: 'Popular', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500&q=80' },
  { id: 22, cat: 'safety',      name: 'Emergency Roadside Kit',          brand: 'SafeDrive',   price: 185,   rating: 4.8, reviews: 89,  badge: null,      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&q=80' },
  { id: 23, cat: 'safety',      name: 'Blind Spot Mirror Set',           brand: 'VisionDrive', price: 55,    rating: 4.6, reviews: 181, badge: null,      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&q=80' },
  { id: 24, cat: 'safety',      name: 'Dashcam with Parking Mode',       brand: 'VisionDrive', price: 1200,  rating: 4.8, reviews: 45,  badge: 'New',     image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80' },
]

const FEATURED_BRANDS = [
  { name: 'AeroKit',      desc: 'Aerodynamic body kits & exterior upgrades' },
  { name: 'TurboEdge',    desc: 'Performance intakes, exhausts & tuning parts' },
  { name: 'CabinPro',     desc: 'Premium interior upgrades & trim kits' },
  { name: 'ShineGuard',   desc: 'Professional detailing & paint protection' },
  { name: 'NavTech',      desc: 'In-car tech, audio & navigation systems' },
  { name: 'SafeDrive',    desc: 'Safety equipment & emergency kits' },
]

const WHY_US = [
  { icon: ShieldCheck, title: 'Genuine parts only',    desc: 'Every product is sourced from verified suppliers with original quality assurance.' },
  { icon: Truck,       title: 'Fast UAE delivery',     desc: 'Same-day dispatch from Dubai. Most orders arrive within 1–3 business days.' },
  { icon: Tag,         title: 'Best price guarantee',  desc: 'Found it cheaper? We match the price and refund the difference within 7 days.' },
  { icon: Zap,         title: 'Expert fitment advice', desc: 'Not sure if a part fits your car? Our team will verify compatibility before you buy.' },
]

const BANNER_SLIDES = [
  { tag: 'New arrivals',   title: 'Ceramic Coating\nKits — Pro Grade',         sub: 'From AED 780',   cta: 'Shop now', accent: '#B5E92E', img: 'https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?w=1400&q=85' },
  { tag: 'Best sellers',   title: 'Performance\nUpgrade Packs',                 sub: 'Starting AED 920', cta: 'Explore', accent: '#38bdf8', img: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=1400&q=85' },
  { tag: 'Limited offer',  title: 'Tech & Audio\nBundle Deals',                 sub: 'Save up to 20%',   cta: 'See deals', accent: '#fb923c', img: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1400&q=85' },
]

// ─── Product card ──────────────────────────────────────────────────────────
function ProductCard({ product, index }) {
  const [saved, setSaved] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const BADGE_STYLES = {
    Popular: 'bg-[#B5E92E] text-[#071016]',
    New:     'bg-[#0f172a] text-white',
    Premium: 'bg-amber-400 text-[#071016]',
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.24), ease: [.22,1,.36,1] }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="group relative flex flex-col overflow-hidden rounded-[22px] border border-[#e8ecf0] bg-white shadow-[0_4px_20px_rgba(0,0,0,.05)] transition-shadow hover:shadow-[0_16px_40px_rgba(0,0,0,.1)]"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img src={product.image} alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-106" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {product.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-black ${BADGE_STYLES[product.badge]}`}>
            {product.badge}
          </span>
        )}

        <motion.button
          whileTap={{ scale: 0.72 }}
          onClick={() => setSaved(s => !s)}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-sm transition hover:bg-white"
          aria-label="Save">
          <Heart size={14} className={saved ? 'fill-rose-500 text-rose-500' : 'text-[#94a3b8]'} />
        </motion.button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-black uppercase tracking-[.15em] text-[#94a3b8]">{product.brand}</p>
        <h3 className="mt-1 text-[14px] font-black leading-snug text-[#0f172a]">{product.name}</h3>

        {/* Stars */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-[#e2e8f0]'} />
            ))}
          </div>
          <span className="text-[11px] text-[#94a3b8]">({product.reviews})</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="text-[10px] text-[#94a3b8]">Price</p>
            <p className="text-[18px] font-black text-[#0f172a]">AED {product.price.toLocaleString()}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[11px] font-black transition ${
              added ? 'bg-[#B5E92E] text-[#071016]' : 'bg-[#0f172a] text-white hover:bg-[#B5E92E] hover:text-[#071016]'
            }`}>
            {added ? <><CheckCircle2 size={13} /> Added</> : <><ShoppingCart size={13} /> Add</>}
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Hero banner slider ────────────────────────────────────────────────────
function HeroBanner() {
  const [slide, setSlide] = useState(0)
  const s = BANNER_SLIDES[slide]

  useEffect(() => {
    const t = setInterval(() => setSlide(i => (i + 1) % BANNER_SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#0f172a]" style={{ minHeight: '440px' }}>
      <AnimatePresence mode="wait">
        <motion.div key={slide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0">
          <img src={s.img} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/60 to-[#0f172a]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Floating orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="pointer-events-none absolute -right-24 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full blur-[80px]"
        style={{ background: `radial-gradient(circle, ${s.accent}50 0%, transparent 70%)` }}
      />

      <div className="page-inner relative z-10 flex min-h-[440px] flex-col justify-center py-20">
        <div className="max-w-xl">
          <motion.span key={`tag-${slide}`}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em]"
            style={{ borderColor: `${s.accent}50`, color: s.accent, background: `${s.accent}18` }}>
            <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent }} />
            {s.tag}
          </motion.span>

          <AnimatePresence mode="wait">
            <motion.h1 key={`h-${slide}`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [.22,1,.36,1] }}
              className="mt-5 whitespace-pre-line font-black leading-[0.9] tracking-[-0.05em] text-white"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
              {s.title}
            </motion.h1>
          </AnimatePresence>

          <motion.p key={`sub-${slide}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="mt-4 text-[16px] font-black" style={{ color: s.accent }}>
            {s.sub}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-7 flex gap-3">
            <motion.a href="#products" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-[13px] font-black text-[#071016]"
              style={{ background: s.accent }}>
              {s.cta} <ArrowRight size={15} />
            </motion.a>
            <motion.a href="#categories" whileHover={{ scale: 1.03 }}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 text-[13px] font-bold text-white backdrop-blur-sm hover:bg-white/18">
              Browse categories
            </motion.a>
          </motion.div>

          {/* Dots */}
          <div className="mt-8 flex gap-2">
            {BANNER_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                className="rounded-full transition-all duration-300"
                style={{ height: 6, width: i === slide ? 28 : 8, background: i === slide ? s.accent : 'rgba(255,255,255,0.25)' }}
                aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Category pills ────────────────────────────────────────────────────────
function CategoryBar({ active, setActive }) {
  const rowRef = useRef(null)
  return (
    <div ref={rowRef} className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {CATEGORIES.map(c => (
        <motion.button key={c.id} onClick={() => setActive(c.id)}
          whileTap={{ scale: 0.94 }}
          className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-black transition ${
            active === c.id
              ? 'bg-[#0f172a] text-white shadow-sm'
              : 'border border-[#e8ecf0] bg-white text-[#64748b] hover:border-[#B5E92E] hover:text-[#0f172a]'
          }`}>
          {c.label}
        </motion.button>
      ))}
    </div>
  )
}

// ─── Products grid ─────────────────────────────────────────────────────────
function ProductsGrid({ activeCategory, searchQ }) {
  const filtered = PRODUCTS.filter(p => {
    const catMatch = activeCategory === 'all' || p.cat === activeCategory
    const searchMatch = !searchQ || p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.brand.toLowerCase().includes(searchQ.toLowerCase())
    return catMatch && searchMatch
  })

  return (
    <>
      <p className="mb-6 text-[12px] text-[#94a3b8]">
        {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
      </p>
      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-[#e2e8f0] py-20 text-center">
          <Package size={36} className="text-[#cbd5e1]" />
          <p className="mt-4 font-black text-[#0f172a]">No products found</p>
          <p className="mt-2 text-[13px] text-[#94a3b8]">Try a different category or search term</p>
        </div>
      )}
    </>
  )
}

// ─── Why DriveX Accessories ────────────────────────────────────────────────
function WhySection() {
  return (
    <section className="bg-[#f8fafc] py-20">
      <div className="page-inner">
        <div className="mb-12 text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[.2em] text-[#94a3b8]">Why shop with us</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }}
            className="mt-3 font-black leading-none tracking-[-0.05em] text-[#0f172a]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
            Genuine parts.<br />Expert advice. Fast delivery.
          </motion.h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {WHY_US.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-[22px] border border-[#e8ecf0] bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B5E92E]/15">
                <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}>
                  <Icon size={22} className="text-[#4a7000]" />
                </motion.div>
              </div>
              <h3 className="mt-5 text-[16px] font-black text-[#0f172a]">{title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-[#64748b]">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Featured brands ───────────────────────────────────────────────────────
function BrandsSection() {
  return (
    <section className="bg-white py-20">
      <div className="page-inner">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[10px] font-black uppercase tracking-[.2em] text-[#94a3b8]">Curated brands</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }}
              className="mt-3 font-black leading-none tracking-[-0.05em] text-[#0f172a]"
              style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>
              Trusted by car enthusiasts
            </motion.h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_BRANDS.map(({ name, desc }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="flex items-center gap-4 rounded-[20px] border border-[#e8ecf0] bg-white p-5 shadow-sm transition hover:border-[#B5E92E] hover:shadow-md">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0f172a] text-[11px] font-black text-[#B5E92E]">
                {name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-black text-[#0f172a]">{name}</p>
                <p className="mt-1 text-[12px] leading-5 text-[#64748b]">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Install CTA ───────────────────────────────────────────────────────────
function InstallCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0f172a] py-24">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1800&q=80" alt=""
          className="h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent" />
      </div>
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="pointer-events-none absolute right-16 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#B5E92E] blur-[90px]"
      />
      <div className="page-inner relative z-10">
        <div className="max-w-2xl">
          <motion.span initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-[#B5E92E]/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em] text-[#B5E92E]">
            <Sparkles size={10} /> Professional fitment
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
            className="mt-6 font-black leading-[0.9] tracking-[-0.055em] text-white"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            Need it fitted?<br />We've got you.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
            className="mt-6 max-w-md text-[16px] leading-7 text-white/55">
            Add professional installation when you checkout. Our certified technicians come to you or you can drop in at any of our partner workshops.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3">
            <motion.a href="/services/maintenance" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#B5E92E] px-7 text-[14px] font-black text-[#071016] transition hover:brightness-110">
              Book fitment <ArrowRight size={16} />
            </motion.a>
            <motion.a href="/contact" whileHover={{ scale: 1.03 }}
              className="inline-flex h-[52px] items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 text-[14px] font-bold text-white transition hover:bg-white/18">
              Ask an expert
            </motion.a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.28 }}
            className="mt-10 flex flex-wrap gap-3">
            {['Certified technicians', 'Mobile fitment available', 'All parts guaranteed', 'Same-day booking'].map(t => (
              <span key={t} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/60">
                <CheckCircle2 size={11} className="text-[#B5E92E]" /> {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Root ──────────────────────────────────────────────────────────────────
export default function Accessories() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQ, setSearchQ] = useState('')

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <HeroBanner />

      {/* Why us strip */}
      <div className="border-y border-[#e8ecf0] bg-white py-4">
        <div className="page-inner">
          <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] font-bold text-[#64748b]">
            {[
              ['🚚', 'Free delivery over AED 300'],
              ['🔒', 'Secure checkout'],
              ['↩️', '30-day easy returns'],
              ['🏆', 'Genuine parts only'],
            ].map(([icon, text]) => (
              <span key={text} className="flex items-center gap-2">{icon} {text}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Products section */}
      <section id="products" className="bg-white py-20">
        <div className="page-inner">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="text-[10px] font-black uppercase tracking-[.2em] text-[#94a3b8]">Accessories store</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }}
                className="mt-3 font-black leading-none tracking-[-0.05em] text-[#0f172a]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
                Upgrade your ride
              </motion.h2>
            </div>
            {/* Search */}
            <div className="relative shrink-0">
              <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
              <input
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search products…"
                className="h-11 w-full rounded-full border border-[#e8ecf0] bg-[#f8fafc] pl-9 pr-4 text-[13px] text-[#0f172a] outline-none transition focus:border-[#B5E92E] focus:bg-white sm:w-64"
              />
            </div>
          </div>

          {/* Category bar */}
          <div id="categories" className="mb-8 scroll-mt-24">
            <CategoryBar active={activeCategory} setActive={setActiveCategory} />
          </div>

          {/* Grid */}
          <ProductsGrid activeCategory={activeCategory} searchQ={searchQ} />
        </div>
      </section>

      {/* Why DriveX */}
      <WhySection />

      {/* Brands */}
      <BrandsSection />

      {/* Fitment CTA */}
      <InstallCTA />
    </div>
  )
}
