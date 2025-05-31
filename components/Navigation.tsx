'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, User, Code, Briefcase, Mail, Sun, Moon, Menu, X, Mic, MicOff, Zap, Brain, Database, Globe } from 'lucide-react'
import { useGesture } from '@use-gesture/react'

interface NavItem {
  icon: any
  label: string
  href: string
  color: string
  bgColor: string
  description: string
}

const navItems: NavItem[] = [
  { 
    icon: Home, 
    label: 'Home', 
    href: '/', 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-500/20',
    description: 'Welcome to the neural interface'
  },
  { 
    icon: User, 
    label: 'About', 
    href: '/about', 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-500/20',
    description: 'Discover my journey in AI'
  },
  { 
    icon: Brain, 
    label: 'Skills', 
    href: '/skills', 
    color: 'text-pink-400', 
    bgColor: 'bg-pink-500/20',
    description: 'Neural skills matrix'
  },
  { 
    icon: Briefcase, 
    label: 'Experience', 
    href: '/experience', 
    color: 'text-green-400', 
    bgColor: 'bg-green-500/20',
    description: 'Professional evolution'
  },
  { 
    icon: Code, 
    label: 'Projects', 
    href: '/projects', 
    color: 'text-orange-400', 
    bgColor: 'bg-orange-500/20',
    description: 'Innovation showcase'
  },
  { 
    icon: Mail, 
    label: 'Contact', 
    href: '/contact', 
    color: 'text-cyan-400', 
    bgColor: 'bg-cyan-500/20',
    description: 'Start collaboration'
  }
]

// Voice recognition hook
const useVoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = 'en-US'
      
      recognitionInstance.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase()
        
        // Voice navigation commands
        const navCommand = navItems.find(item => 
          command.includes(item.label.toLowerCase()) ||
          command.includes('go to ' + item.label.toLowerCase()) ||
          command.includes('navigate to ' + item.label.toLowerCase())
        )
        
        if (navCommand) {
          document.querySelector(navCommand.href)?.scrollIntoView({ behavior: 'smooth' })
        }
      }
      
      recognitionInstance.onend = () => {
        setIsListening(false)
      }
      
      setRecognition(recognitionInstance)
    }
  }, [])

  const startListening = () => {
    if (recognition) {
      setIsListening(true)
      recognition.start()
    }
  }

  const stopListening = () => {
    if (recognition) {
      setIsListening(false)
      recognition.stop()
    }
  }

  return { isListening, startListening, stopListening }
}

// Circular navigation component
const CircularNav = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const { isListening, startListening, stopListening } = useVoiceRecognition()

  const router = useRouter()
  
  const handleNavClick = (href: string) => {
    router.push(href)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Circular Menu */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="relative w-80 h-80">
              {/* Center Hub */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center backdrop-blur-xl border border-white/20"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Brain size={28} className="text-white" />
              </motion.div>

              {/* Navigation Items */}
              {navItems.map((item, index) => {
                const angle = (index * 360) / navItems.length
                const radius = 120
                const x = Math.cos((angle * Math.PI) / 180) * radius
                const y = Math.sin((angle * Math.PI) / 180) * radius

                return (
                  <motion.div
                    key={item.label}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
                    whileHover={{ scale: 1.2, z: 20 }}
                    onHoverStart={() => setHoveredItem(index)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <motion.button
                      onClick={() => handleNavClick(item.href)}
                      className={`
                        w-16 h-16 rounded-full flex items-center justify-center
                        backdrop-blur-xl border border-white/20 transition-all duration-300
                        ${item.bgColor} ${hoveredItem === index ? 'shadow-2xl' : 'shadow-lg'}
                      `}
                      whileTap={{ scale: 0.9 }}
                    >
                      <item.icon size={24} className={item.color} />
                    </motion.button>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {hoveredItem === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.8 }}
                          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                        >
                          <div className="bg-black/90 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm border border-white/20">
                            <div className="font-semibold">{item.label}</div>
                            <div className="text-xs text-gray-300">{item.description}</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Connection Line */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-0.5 bg-gradient-to-r from-purple-400/50 to-transparent origin-center"
                      style={{
                        height: radius - 32,
                        transform: `translate(-50%, -50%) rotate(${angle + 180}deg)`,
                      }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: hoveredItem === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                )
              })}

              {/* Voice Control Button */}
              <motion.button
                className={`
                  absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-4
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${isListening ? 'bg-red-500/20 border-red-400' : 'bg-white/10 border-white/20'}
                  backdrop-blur-xl border transition-all duration-300
                `}
                onClick={isListening ? stopListening : startListening}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isListening ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <MicOff size={20} className="text-red-400" />
                  </motion.div>
                ) : (
                  <Mic size={20} className="text-gray-300" />
                )}
              </motion.button>

              {/* Voice Status */}
              <AnimatePresence>
                {isListening && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-16"
                  >
                    <div className="bg-black/90 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm border border-red-400/50">
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-2 h-2 bg-red-400 rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        Listening for voice commands...
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Say "Go to [section]" or section name
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Progressive Dock Navigation
const DockNav = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const { scrollY } = useScroll()
  const dockY = useTransform(scrollY, [0, 100], [0, -10])
  const pathname = usePathname()
  const router = useRouter()

  const getActiveSection = () => {
    if (pathname === '/') return ''
    return pathname.substring(1)
  }

  const handleNavClick = (href: string) => {
    router.push(href)
  }

  return (
    <motion.div
      style={{ y: dockY }}
      className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-30"
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 glass rounded-full border border-white/10"
      >
        {navItems.map((item, index) => {
          const isActive = getActiveSection() === item.href.substring(1) || (pathname === '/' && item.href === '/')
          
          return (
            <motion.button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className={`
                relative p-2 sm:p-3 rounded-full transition-all duration-300
                ${isActive ? item.bgColor : 'hover:bg-white/10'}
              `}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
              onHoverStart={() => setHoveredItem(index)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <item.icon 
                size={18} 
                className={`sm:w-5 sm:h-5 ${isActive ? item.color : 'text-gray-400'} transition-colors duration-300`} 
              />
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}

              {/* Hover tooltip */}
              <AnimatePresence>
                {hoveredItem === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  >
                    <div className="bg-black/90 text-white px-2 py-1 rounded text-xs backdrop-blur-sm border border-white/20">
                      {item.label}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

// Main Navigation Component
export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showCircularNav, setShowCircularNav] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.9])
  const headerY = useTransform(scrollY, [0, 100], [0, -5])

  useEffect(() => setMounted(true), [])

  // Gesture controls
  const gestureRef = useRef<HTMLDivElement>(null)
  
  useGesture(
    {
      onDrag: ({ direction: [dx, dy], velocity: [vx, vy] }) => {
        // Swipe up to open circular nav
        if (dy < -0.5 && vy < -0.5) {
          setShowCircularNav(true)
        }
        // Swipe down to close
        if (dy > 0.5 && vy > 0.5 && showCircularNav) {
          setShowCircularNav(false)
        }
      },
      onPinch: ({ offset: [scale] }) => {
        // Pinch to zoom opens/closes circular nav
        if (scale > 1.2) {
          setShowCircularNav(true)
        } else if (scale < 0.8) {
          setShowCircularNav(false)
        }
      }
    },
    {
      target: gestureRef,
      drag: { threshold: 50 },
      pinch: { threshold: 0.1 }
    }
  )

  if (!mounted) return null

  return (
    <>
      {/* Gesture Detection Area */}
      <div
        ref={gestureRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ touchAction: 'none' }}
      />

      {/* Main Header */}
      <motion.header
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-0 left-0 right-0 z-40 container-padding py-3 md:py-4"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center justify-between glass rounded-full px-4 sm:px-6 py-3 border border-white/10"
          >
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Brain size={20} className="text-white" />
              </motion.div>
              <span className="text-xl font-bold text-white">Neural.AI</span>
            </motion.div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === 'dark' ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-blue-400" />
                )}
              </motion.button>

              {/* Circular Nav Toggle */}
              <motion.button
                onClick={() => setShowCircularNav(!showCircularNav)}
                className={`
                  p-2 rounded-full transition-all duration-300
                  ${showCircularNav ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: showCircularNav ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {showCircularNav ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </motion.button>

              {/* Neural Status Indicator */}
              <motion.div
                className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-400/30"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-xs text-green-300">Neural Active</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Circular Navigation */}
      <CircularNav 
        isOpen={showCircularNav} 
        onClose={() => setShowCircularNav(false)} 
      />

      {/* Dock Navigation */}
      <DockNav />

      {/* Gesture Hints */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="fixed bottom-20 right-6 z-30"
      >
        <motion.div
          className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-white/20"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-xs text-gray-300">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={12} className="text-purple-400" />
              <span>Swipe up for neural nav</span>
            </div>
            <div className="flex items-center gap-2">
              <Mic size={12} className="text-cyan-400" />
              <span>Voice commands enabled</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}