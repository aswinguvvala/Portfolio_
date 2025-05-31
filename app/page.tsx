'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Brain, User, Code, Briefcase, Mail, Github, Linkedin, ChevronRight, Zap, Database, Globe } from 'lucide-react'
import Link from 'next/link'
import LoadingScreen from '@/components/ui/LoadingScreen'
import AnimatedText from '@/components/ui/AnimatedText'

const navigationCards = [
  {
    title: "About Me",
    description: "Discover my journey in AI & Machine Learning",
    icon: User,
    href: "/about",
    color: "from-purple-600 to-pink-600",
    delay: 0.1
  },
  {
    title: "Skills Matrix",
    description: "Explore my neural network of technical expertise",
    icon: Brain,
    href: "/skills", 
    color: "from-blue-600 to-cyan-600",
    delay: 0.2
  },
  {
    title: "Experience",
    description: "Professional evolution in AI engineering",
    icon: Briefcase,
    href: "/experience",
    color: "from-green-600 to-emerald-600", 
    delay: 0.3
  },
  {
    title: "Projects",
    description: "AI-powered solutions & innovations",
    icon: Code,
    href: "/projects",
    color: "from-orange-600 to-red-600",
    delay: 0.4
  },
  {
    title: "Contact",
    description: "Let's collaborate on the future",
    icon: Mail,
    href: "/contact",
    color: "from-indigo-600 to-purple-600",
    delay: 0.5
  }
]

const techIcons = [
  { icon: Brain, position: { x: -15, y: -10 }, color: "text-purple-400" },
  { icon: Code, position: { x: 15, y: -5 }, color: "text-blue-400" },
  { icon: Database, position: { x: -10, y: 10 }, color: "text-green-400" },
  { icon: Globe, position: { x: 10, y: 12 }, color: "text-pink-400" },
  { icon: Zap, position: { x: -20, y: 0 }, color: "text-yellow-400" },
]

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      <LoadingScreen isLoading={isLoading} onComplete={handleLoadingComplete} />
      
      <main className="min-h-screen neural-bg relative overflow-hidden">
        {/* Enhanced Gradient Background */}
        <div className="absolute inset-0 animate-neural-pulse" />
        
        {/* Floating Tech Icons */}
        {techIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.color}/30 hover:${item.color.replace('/30', '')} transition-all duration-500 hidden md:block`}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: 0,
              x: [0, 20, -20, 0],
              y: [0, -20, 20, 0],
            }}
            whileHover={{ 
              scale: 1.3, 
              rotate: 360,
              transition: { duration: 0.5 }
            }}
            transition={{ 
              delay: index * 0.2 + 2,
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `calc(50% + ${item.position.x}vw)`,
              top: `calc(50% + ${item.position.y}vh)`,
            }}
          >
            <item.icon size={36} className="md:w-12 md:h-12" />
          </motion.div>
        ))}

        {/* Mouse Follower */}
        <motion.div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
        />

        <div className="container mx-auto container-padding section-padding relative z-10 max-w-7xl">
          <div className="text-center mb-16">
            {/* Main Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1, ease: "easeOut" }}
              className="mb-12"
            >
              <motion.h1 
                className="responsive-text-6xl font-display font-black mb-4 tracking-tight gradient-text"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <AnimatedText text="ASWIN GUVVALA" />
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="responsive-text-2xl font-semibold gradient-text mb-6"
              >
                Neural Network Engineer
              </motion.div>
              
              <motion.p 
                className="responsive-text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                Architecting intelligent systems that bridge the gap between 
                <span className="font-semibold text-blue-400"> human intuition </span>
                and 
                <span className="font-semibold text-purple-400"> machine precision</span>
              </motion.p>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, type: "spring", stiffness: 200 }}
                className="flex justify-center space-x-6 mb-12"
              >
                {[
                  { icon: Github, href: "https://github.com/aswinguvvala", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com/in/aswinguvvala", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:aswinabd17@gmail.com", label: "Email" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : "_blank"}
                    rel={social.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                    className="p-3 rounded-full glass border border-white/20 hover:scale-110 transition-all duration-300 neural-glow"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={24} className="text-gray-300 hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick Navigation Prompt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="responsive-text-2xl font-semibold text-white mb-4">
                Explore My Neural Network
              </h2>
              <p className="text-gray-400 responsive-text-base">
                Click on any section below to dive deeper into my journey
              </p>
            </motion.div>
          </div>

          {/* Navigation Cards Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            {navigationCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 2.5 + card.delay,
                  duration: 0.6,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className={index === 4 ? "md:col-span-2 lg:col-span-1 lg:col-start-3 xl:col-span-1 xl:col-start-auto" : ""}
              >
                <Link href={card.href}>
                  <div className="enhanced-card h-full group cursor-pointer border border-white/10">
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${card.color} shadow-lg`}>
                        <card.icon size={24} className="text-white" />
                      </div>
                      <ChevronRight 
                        size={20} 
                        className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" 
                      />
                    </div>

                    {/* Card Content */}
                    <div>
                      <h3 className="responsive-text-lg font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                        {card.title}
                      </h3>
                      <p className="text-gray-400 responsive-text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {card.description}
                      </p>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${card.color} opacity-5`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="text-center mt-16"
          >
            <div className="glass rounded-2xl p-8 border border-white/10">
              <h3 className="responsive-text-2xl font-bold text-white mb-4">
                Ready to Innovate Together?
              </h3>
              <p className="text-gray-300 mb-6 responsive-text-base max-w-2xl mx-auto">
                Let's create the next generation of AI solutions that transform industries and improve lives.
              </p>
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 responsive-text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-2xl neural-glow"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🚀 Let's Connect
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
