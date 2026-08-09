import { DriveXSpinner } from '@/components/spinner'

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5 bg-[#050706]">
      <DriveXSpinner size={52} />
      <p className="text-[12px] font-bold uppercase tracking-[.18em] text-white/30 animate-pulse">
        Loading…
      </p>
    </div>
  )
}
