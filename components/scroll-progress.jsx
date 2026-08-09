'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed inset-x-0 top-0 z-[100] h-[3px] bg-gradient-to-r from-[#2ee52b] via-[#a8ff78] to-[#2ee52b]"
    />
  )
}
