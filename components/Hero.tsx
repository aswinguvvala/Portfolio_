'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Zap, Brain, Code2, Database, Cpu } from 'lucide-react'
import { useEffect, useState, useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Float, OrbitControls, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'
import AnimatedText from './ui/AnimatedText'
import Button from './ui/Button'

// 3D Floating Brain Component
function FloatingBrain({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <MeshDistortMaterial
          color="#6366f1"
          transparent
          opacity={0.8}
          distort={0.3}
          speed={1.5}
          emissive="#3730a3"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  )
}

// Interactive Neural Network Particles
function NeuralNetwork() {
  const points = useRef<THREE.Points>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        const distance = Math.sqrt(
          Math.pow(positions[i] - mousePos.x * 5, 2) + 
          Math.pow(positions[i + 1] - mousePos.y * 5, 2)
        )
        if (distance < 2) {
          positions[i + 2] = Math.sin(state.clock.elapsedTime * 3 + i) * 0.5
        } else {
          positions[i + 2] = Math.sin(state.clock.elapsedTime + i) * 0.1
        }
      }
      points.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const particleCount = 150
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#8b5cf6" size={0.05} sizeAttenuation transparent opacity={0.8} />
    </points>
  )
}

// 3D Scene Component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="night" />
      
      <FloatingBrain position={[-3, 1, 0]} />
      <FloatingBrain position={[3, -1, -1]} />
      <FloatingBrain position={[0, 2, -2]} />
      
      <NeuralNetwork />
      
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text
          position={[0, -3, 0]}
          fontSize={0.5}
          color="#8b5cf6"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          Neural Intelligence
        </Text>
      </Float>
    </>
  )
}

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      setMousePosition({ x: clientX, y: clientY })
      mouseX.set((clientX / innerWidth - 0.5) * 2)
      mouseY.set((clientY / innerHeight - 0.5) * 2)
    }
    
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [mouseX, mouseY])

  const techIcons = [
    { icon: Brain, delay: 0, position: { x: -15, y: -10 }, color: "text-purple-400" },
    { icon: Code2, delay: 0.3, position: { x: 15, y: -5 }, color: "text-blue-400" },
    { icon: Database, delay: 0.6, position: { x: -10, y: 10 }, color: "text-green-400" },
    { icon: Cpu, delay: 0.9, position: { x: 10, y: 12 }, color: "text-pink-400" },
    { icon: Zap, delay: 1.2, position: { x: -20, y: 0 }, color: "text-yellow-400" },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden neural-bg">
      {/* Enhanced Gradient Background with Animation */}
      <motion.div 
        className="absolute inset-0 animate-neural-pulse"
        style={{
          background: `
            radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120, 119, 198, 0.2), transparent),
            radial-gradient(ellipse 80% 80% at 80% 60%, rgba(139, 92, 246, 0.2), transparent),
            radial-gradient(ellipse 80% 80% at 20% 80%, rgba(59, 130, 246, 0.2), transparent)
          `
        }}
      />
      
      {/* 3D Scene Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Enhanced Mouse Follower with Multiple Layers */}
      <motion.div 
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />
      <motion.div 
        className="absolute w-64 h-64 bg-gradient-to-r from-pink-500/15 to-blue-500/15 rounded-full blur-2xl pointer-events-none"
        style={{
          x: useTransform(smoothMouseX, x => x * 0.5),
          y: useTransform(smoothMouseY, y => y * 0.5),
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
        }}
      />

      {/* Floating Tech Icons with Enhanced Animation */}
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
            delay: item.delay + 1,
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

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto container-padding section-padding relative z-10 w-full max-w-7xl"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          {/* Revolutionary Main Heading */}
          <motion.div
            initial={{ scale: 0, rotateX: -90, rotateY: 45 }}
            animate={{ scale: 1, rotateX: 0, rotateY: 0 }}
            transition={{ 
              delay: 0.3, 
              type: 'spring', 
              stiffness: 120, 
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="mb-8 md:mb-12"
          >
            <motion.div
              className="inline-block mb-4 md:mb-6"
              whileHover={{ scale: 1.02, rotateY: 5, rotateX: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.h1 
                className="responsive-text-6xl font-display font-black mb-2 md:mb-4 leading-none tracking-tight"
                style={{
                  background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #10b981)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <AnimatedText text="ASWIN" />
              </motion.h1>
              <motion.h1 
                className="responsive-text-6xl font-display font-black tracking-tight"
                style={{
                  background: "linear-gradient(225deg, #ec4899, #8b5cf6, #3b82f6, #10b981)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5
                }}
              >
                <AnimatedText text="GUVVALA" delay={0.3} />
              </motion.h1>
            </motion.div>
          </motion.div>

          {/* Enhanced Subtitle with Morphing Effect */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mb-8 md:mb-12 px-4"
          >
            <motion.div
              className="responsive-text-3xl font-bold gradient-text mb-4 md:mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Neural Network Engineer
            </motion.div>
            <motion.p 
              className="responsive-text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Architecting intelligent systems that bridge the gap between 
              <span className="font-semibold text-blue-400"> human intuition </span>
              and 
              <span className="font-semibold text-purple-400"> machine precision</span>
            </motion.p>
          </motion.div>

          {/* Revolutionary CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-12 md:mb-20 px-4"
          >
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 15px 30px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button 
                href="#contact" 
                variant="primary" 
                className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 responsive-text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl neural-glow"
              >
                🚀 Launch Collaboration
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                backgroundColor: "rgba(139, 92, 246, 0.1)",
                borderColor: "#8b5cf6"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button 
                href="#projects" 
                variant="secondary" 
                className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 responsive-text-base font-semibold border-2 border-purple-500/50 hover:border-purple-400 neural-glow"
              >
                ⚡ Explore Neural Networks
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Social Links with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, type: "spring", stiffness: 200 }}
            className="flex justify-center space-x-6 sm:space-x-8 lg:space-x-10 mb-12 md:mb-20 px-4"
          >
            {[
              { icon: Github, href: "https://github.com/aswinguvvala", label: "GitHub", color: "hover:text-gray-300", bg: "hover:bg-gray-800/50" },
              { icon: Linkedin, href: "https://linkedin.com/in/aswinguvvala", label: "LinkedIn", color: "hover:text-blue-400", bg: "hover:bg-blue-900/50" },
              { icon: Mail, href: "mailto:aswinabd17@gmail.com", label: "Email", color: "hover:text-green-400", bg: "hover:bg-green-900/50" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : "_blank"}
                rel={social.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                className={`relative text-gray-400 ${social.color} ${social.bg} transition-all duration-500 p-3 sm:p-4 rounded-full border border-gray-700/50 backdrop-blur-sm neural-glow`}
                whileHover={{ 
                  y: -5, 
                  rotate: [0, -10, 10, 0],
                  scale: 1.15,
                  boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                aria-label={social.label}
              >
                <social.icon size={24} className="sm:w-8 sm:h-8" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Revolutionary Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.a 
            href="#about" 
            className="group flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="border-2 border-gray-500 group-hover:border-purple-400 rounded-full p-3 backdrop-blur-sm bg-black/20 transition-colors duration-300"
            >
              <ChevronDown size={28} />
            </motion.div>
            <motion.span 
              className="text-sm mt-2 opacity-70 group-hover:opacity-100 transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 3 }}
            >
              Discover More
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}