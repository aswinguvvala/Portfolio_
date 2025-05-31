'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Contact from '@/components/Contact'

export default function ContactPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <main className="min-h-screen neural-bg relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 animate-neural-pulse" />
      
      {/* Back Navigation */}
      <div className="container mx-auto container-padding relative z-10 max-w-7xl pt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-start mb-8"
        >
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 glass rounded-full hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={16} className="text-gray-300" />
              <span className="text-gray-300 font-medium">Back to Home</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Contact Component */}
      <Contact />
    </main>
  )
} 