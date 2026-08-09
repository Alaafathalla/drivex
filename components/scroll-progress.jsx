'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed inset-x-0 top-0 z-[100] h-[3px] bg-gradient-to-r from-green-500 via-emerald-400 to-green-600"
    />
  )
}
