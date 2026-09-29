'use client'

import { DriveXSpinner } from '@/components/spinner'
import { useLang } from '@/context/LangContext'

export default function GlobalLoading() {
  const { t } = useLang()
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5 bg-[#050706]">
      <DriveXSpinner size={52} />
      <p className="animate-pulse text-[12px] font-bold uppercase tracking-[.18em] text-white/30">
        {t('loading')}
      </p>
    </div>
  )
}
