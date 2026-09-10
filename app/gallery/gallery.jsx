'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Image as ImageIcon } from 'lucide-react'
import { useLang } from '@/context/LangContext'

export default function GalleryPage() {
  const { t, isRTL } = useLang()

  const gallery = [
    { titleKey: 'gallery_item_sig_ext',    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80' },
    { titleKey: 'gallery_item_int_details', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80' },
    { titleKey: 'gallery_item_perf',       image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80' },
    { titleKey: 'gallery_item_luxury',     image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80' },
  ]

  return (
    <main className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="w-full px-4 py-20 sm:px-6 lg:px-8 lg:py-24 xl:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-accent">{t('gallery_page_eyebrow')}</p>
              <h1 className="mt-2 text-4xl font-black tracking-[-.04em]">{t('gallery_page_title')}</h1>
            </div>
            <a href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline">
              {t('gallery_page_explore')} <ArrowRight size={15} />
            </a>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {gallery.map((item, index) => (
              <motion.article
                key={item.titleKey}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="overflow-hidden rounded-[10px] border border-border bg-card"
              >
                <div className="aspect-[1.2] overflow-hidden">
                  <img
                    src={item.image}
                    alt={t(item.titleKey)}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <h2 className="text-xl font-black">{t(item.titleKey)}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{t('gallery_item_curated')}</p>
                  </div>
                  <div className="rounded-full border border-border p-2.5">
                    <ImageIcon size={16} className="text-accent" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
