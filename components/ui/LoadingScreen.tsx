'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Brain, Zap, Code, Database } from 'lucide-react'

interface LoadingScreenProps {
  isLoading: boolean
  onComplete: () => void
}

const LoadingScreen = ({ isLoading, onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)

  const phases = [
    { label: "Initializing Neural Networks", icon: Brain, color: "text-purple-400" },
    { label: "Loading AI Models", icon: Code, color: "text-blue-400" },
    { label: "Connecting Synapses", icon: Zap, color: "text-green-400" },
    { label: "Optimizing Experience", icon: Database, color: "text-pink-400" }
  ]

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer)
            setTimeout(onComplete, 500)
            return 100
          }
          return prev + 2
        })
      }, 50)

      return () => clearInterval(timer)
    }
  }, [isLoading, onComplete])

  useEffect(() => {
    setCurrentPhase(Math.floor(progress / 25))
  }, [progress])

  const currentPhaseData = phases[Math.min(currentPhase, phases.length - 1)]

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/40 backdrop-blur-xl"
        >
          {/* Neural Network Background */}
          <div className="absolute inset-0 neural-bg opacity-20" />
          
          {/* Animated Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              initial={{
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
                y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
                opacity: 0
              }}
              animate={{
                x: [
                  typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
                  typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
                  typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200
                ],
                y: [
                  typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
                  typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
                  typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800
                ],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}

          <div className="text-center z-10 max-w-md mx-auto px-6">
            {/* Main Logo/Brain */}
            <motion.div
              className="mb-8"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
                <Brain size={48} className="text-white" />
              </div>
              
              {/* Orbital Rings */}
              <div className="relative -mt-24">
                <motion.div
                  className="w-32 h-32 border-2 border-purple-400/30 rounded-full mx-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="w-40 h-40 border border-blue-400/20 rounded-full mx-auto absolute inset-0 -m-4"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>

            {/* Loading Text */}
            <motion.h1 
              className="text-4xl font-bold gradient-text mb-2"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity 
              }}
            >
              Neural.AI
            </motion.h1>

            <motion.p 
              className="text-gray-300 mb-8 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Initializing AI Portfolio Experience
            </motion.p>

            {/* Current Phase */}
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity 
                }}
              >
                <currentPhaseData.icon size={24} className={currentPhaseData.color} />
              </motion.div>
              <span className="text-white font-medium">
                {currentPhaseData.label}
              </span>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-800/50 rounded-full h-2 mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            {/* Progress Percentage */}
            <motion.div 
              className="text-2xl font-bold text-white mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {progress}%
            </motion.div>

            {/* Phase Indicators */}
            <div className="flex justify-center gap-2">
              {phases.map((phase, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index <= currentPhase 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : 'bg-gray-600'
                  }`}
                  animate={index === currentPhase ? { 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  } : {}}
                  transition={{ 
                    duration: 1, 
                    repeat: index === currentPhase ? Infinity : 0 
                  }}
                />
              ))}
            </div>

            {/* Fun Facts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-sm text-gray-400"
            >
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🧠 Neural networks are processing your experience...
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen 