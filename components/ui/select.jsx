'use client'

import { Select as SelectPrimitive } from '@base-ui/react/select'
import { Check, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useLang } from '@/context/LangContext'

/**
 * Drop-in replacement for a native <select>, styled to match the rest of
 * the DriveX UI and built on the same headless primitive (@base-ui/react)
 * already used by <Button>. Supports RTL automatically via LangContext.
 *
 * Usage (simple — mirrors the old native select API):
 *   <Select
 *     value={value}
 *     onValueChange={onChange}
 *     placeholder={t('select_placeholder')}
 *     options={[{ value: 'a', label: 'A' }, 'B', 'C']}
 *     className={cl}
 *   />
 *
 * Usage (composable, for custom triggers/content):
 *   <Select.Root value={v} onValueChange={setV}>
 *     <Select.Trigger className={cl}><Select.Value placeholder="…" /></Select.Trigger>
 *     <Select.Content>
 *       <Select.Item value="a">A</Select.Item>
 *     </Select.Content>
 *   </Select.Root>
 */

function Root(props) {
  return <SelectPrimitive.Root {...props} />
}

function Trigger({ className, children, size = 'default', ...props }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "group/select flex w-full items-center justify-between gap-2 whitespace-nowrap outline-none transition-colors focus-visible:border-[#B5E92E] focus-visible:ring-2 focus-visible:ring-[#B5E92E]/15 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:min-w-0 [&>span]:truncate",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="shrink-0 text-slate-400 transition-transform duration-200 group-data-[popup-open]/select:rotate-180">
        <ChevronDown size={15} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function Value(props) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function Content({ className, children, sideOffset = 6, align = 'start', ...props }) {
  const { isRTL } = useLang()
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        sideOffset={sideOffset}
        align={align}
        className="z-[95] outline-none"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          dir={isRTL ? 'rtl' : 'ltr'}
          className={cn(
            'relative max-h-[min(24rem,var(--available-height))] min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-y-auto overflow-x-hidden rounded-2xl border border-slate-200 bg-white p-1.5 text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,.16)] transition-[transform,opacity] data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
            className,
          )}
          {...props}
        >
          {children}
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function Item({ className, children, ...props }) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-slate-700 outline-none transition-colors data-[highlighted]:bg-[#B5E92E]/15 data-[highlighted]:text-slate-950 data-[selected]:text-[#0F172A]",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="min-w-0 truncate">{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="shrink-0 text-[#7f9f1b]">
        <Check size={14} strokeWidth={3} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

const TRIGGER_STYLE_DEFAULT =
  'h-11 rounded-2xl border border-[#dfe5db] bg-white px-4 text-[13px] font-bold text-slate-800'

/**
 * Simple, all-in-one Select — pass `options` and it renders trigger + content.
 * `options` items may be a plain string/number, or `{ value, label }`.
 */
function Select({
  value,
  onValueChange,
  options = [],
  placeholder,
  className,
  contentClassName,
  disabled,
  size = 'default',
  ...rootProps
}) {
  const normalized = options.map((opt) =>
    opt !== null && typeof opt === 'object' ? opt : { value: String(opt), label: String(opt) },
  )

  return (
    <Root value={value} onValueChange={onValueChange} disabled={disabled} {...rootProps}>
      <Trigger className={cn(TRIGGER_STYLE_DEFAULT, className)} size={size}>
        <Value placeholder={placeholder} />
      </Trigger>
      <Content className={contentClassName}>
        {normalized.map((opt) => (
          <Item key={opt.value} value={opt.value}>
            {opt.label}
          </Item>
        ))}
      </Content>
    </Root>
  )
}

Select.Root = Root
Select.Trigger = Trigger
Select.Value = Value
Select.Content = Content
Select.Item = Item

export { Select }
