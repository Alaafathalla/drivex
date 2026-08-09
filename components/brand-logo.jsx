export function BrandLogo({ className = '', compact = false }) {
  return (
    <span className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="brand-mark relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-[14px] bg-accent text-accent-foreground shadow-[0_10px_30px_color-mix(in_srgb,var(--accent)_25%,transparent)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
        <svg
          viewBox="0 0 40 40"
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
        >
          <path
            d="M9.5 11.5h6.2l4.6 8.2 4.65-8.2h5.55L20.25 29 9.5 11.5Z"
            fill="currentColor"
          />
          <path
            d="M11 29h18"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity=".55"
          />
        </svg>
      </span>

      {!compact && (
        <span className="leading-none">
          <span className="block text-[20px] font-black tracking-[-.055em] text-current">
            motory
          </span>
          <span className="mt-1 block text-[8px] font-black uppercase tracking-[.22em] text-current opacity-45">
            automotive ecosystem
          </span>
        </span>
      )}
    </span>
  )
}
