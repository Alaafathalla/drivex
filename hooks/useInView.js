'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * useInView — returns { ref, inView }
 * Once the element enters the viewport it stays "in view" (one-shot by default).
 */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (!options.repeat) observer.disconnect()
        } else if (options.repeat) {
          setInView(false)
        }
      },
      { threshold: options.threshold ?? 0.12, rootMargin: options.rootMargin ?? '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.repeat, options.threshold, options.rootMargin])

  return { ref, inView }
}
