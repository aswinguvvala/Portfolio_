'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { User, Brain, Target, Code, Database, Zap, ArrowLeft, Award, BookOpen, Heart } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const achievements = [
    {
      icon: Brain,
      title: "AI/ML Expert",
      description: "5+ years developing cutting-edge AI solutions",
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: Award,
      title: "Technical Leader",
      description: "Led multiple successful AI implementations",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: BookOpen,
      title: "Continuous Learner",
      description: "Always exploring latest ML research & trends",
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: Heart,
      title: "Problem Solver",
      description: "Passionate about using AI for social impact",
      color: "from-orange-600 to-red-600"
    }
  ]

  const timeline = [
    {
      year: "2024",
      title: "Senior AI/ML Engineer",
      company: "Current Role",
      description: "Leading neural network architecture design and implementing large-scale ML systems."
    },
    {
      year: "2022",
      title: "ML Engineer",
      company: "Previous Experience", 
      description: "Developed computer vision models and deployed production ML pipelines."
    },
    {
      year: "2020",
      title: "AI Research Intern",
      company: "Research Lab",
      description: "Conducted research on deep learning algorithms and published findings."
    },
    {
      year: "2019",
      title: "Started ML Journey",
      company: "Self-Learning",
      description: "Began intensive study of machine learning and neural networks."
    }
  ]

  return (
    <main className="min-h-screen neural-bg relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 animate-neural-pulse" />
      
      <div className="container mx-auto container-padding section-padding relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Back Navigation */}
          <div className="flex items-center justify-start mb-8">
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
          </div>

          <motion.div
            className="inline-flex items-center gap-4 mb-8"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
              <User size={36} className="text-white" />
            </div>
            <h1 className="responsive-text-5xl font-display font-black gradient-text">
              About Me
            </h1>
          </motion.div>
          
          <p className="responsive-text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover my journey in artificial intelligence and machine learning, from curiosity to expertise
          </p>
        </motion.div>

        {/* Hero Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-20"
        >
          <div className="glass rounded-2xl p-8 md:p-12 border border-white/10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="responsive-text-3xl font-bold text-white mb-6">
                  Bridging Human Intelligence with Machine Learning
                </h2>
                <div className="space-y-4 text-gray-300 responsive-text-base leading-relaxed">
                  <p>
                    I'm <span className="text-blue-400 font-semibold">Aswin Kumar Guvvala</span>, a passionate AI/ML engineer 
                    dedicated to creating intelligent systems that solve real-world problems. My journey began with a fascination 
                    for how machines could learn and adapt, much like the human brain.
                  </p>
                  <p>
                    Over the past 5+ years, I've specialized in <span className="text-purple-400 font-semibold">neural networks</span>, 
                    <span className="text-green-400 font-semibold"> computer vision</span>, and 
                    <span className="text-pink-400 font-semibold"> deep learning</span>, working on projects that range from 
                    healthcare AI to autonomous systems.
                  </p>
                  <p>
                    My approach combines rigorous technical expertise with creative problem-solving, always keeping the human 
                    impact at the center of technological innovation.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <motion.div
                  className="w-full aspect-square rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 animate-pulse" />
                  <Brain size={120} className="text-purple-400 z-10" />
                  
                  {/* Floating elements */}
                  {[Code, Database, Zap, Target].map((Icon, index) => (
                    <motion.div
                      key={index}
                      className="absolute"
                      animate={{
                        x: [0, 20, -20, 0],
                        y: [0, -20, 20, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: index * 2,
                        ease: "easeInOut"
                      }}
                      style={{
                        top: `${20 + index * 20}%`,
                        left: `${10 + index * 25}%`,
                      }}
                    >
                      <Icon size={24} className="text-blue-400/60" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="responsive-text-3xl font-bold text-white text-center mb-12">
            Core Competencies & Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="enhanced-card text-center group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <achievement.icon size={28} className="text-white" />
                </div>
                <h3 className="responsive-text-lg font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                  {achievement.title}
                </h3>
                <p className="text-gray-400 responsive-text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="responsive-text-3xl font-bold text-white text-center mb-12">
            Professional Journey
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 transform md:-translate-x-1/2" />
              
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform md:-translate-x-1/2 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="enhanced-card">
                      <div className="text-2xl font-bold gradient-text mb-2">{item.year}</div>
                      <h3 className="responsive-text-xl font-bold text-white mb-1">{item.title}</h3>
                      <div className="text-blue-400 font-medium mb-3">{item.company}</div>
                      <p className="text-gray-300 responsive-text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center"
        >
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h3 className="responsive-text-2xl font-bold text-white mb-4">
              Let's Build the Future Together
            </h3>
            <p className="text-gray-300 mb-6 responsive-text-base max-w-2xl mx-auto">
              I'm always excited to work on challenging AI projects that can make a positive impact. 
              Let's connect and explore how we can create something amazing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 responsive-text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-2xl neural-glow"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🤝 Let's Connect
                </motion.button>
              </Link>
              <Link href="/projects">
                <motion.button
                  className="px-8 py-4 responsive-text-base font-semibold glass border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🚀 View My Work
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 