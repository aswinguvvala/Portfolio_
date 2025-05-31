'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Github, ExternalLink, Star, GitBranch, Users, Calendar, Code, Brain, Database, Globe, Zap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { projects } from '@/components/Projects'

const categories = ['All', 'AI/ML', 'Research', 'Healthcare', 'FinTech', 'Climate Tech', 'Robotics']

export default function ProjectsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const ProjectCard = ({ project, index }: { project: any, index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="enhanced-card group hover:scale-105 transition-all duration-300"
    >
      {/* Project Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color}`} />
          <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300 border border-white/20">
            {project.category}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30">
            {project.difficulty}
          </span>
        </div>
      </div>

      {/* Project Title & Description */}
      <div className="mb-6">
        <h3 className="responsive-text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-gray-300 leading-relaxed responsive-text-sm mb-4">
          {project.fullDescription}
        </p>
      </div>

             {/* Key Metrics */}
       <div className="grid grid-cols-2 gap-4 mb-6">
         {Object.entries(project.metrics).map(([key, value]) => (
           <div key={key} className="text-center p-3 glass rounded-lg">
             <div className={`responsive-text-lg font-bold gradient-text`}>
               {String(value)}
             </div>
             <div className="text-xs text-gray-400 capitalize">{key}</div>
           </div>
         ))}
       </div>

      {/* Technologies */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">Technologies Used</h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech: string) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full glass text-gray-300 border border-gray-600/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-blue-400" />
          <span className="text-gray-300">{project.team}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-green-400" />
          <span className="text-gray-300">{project.timeline}</span>
        </div>
      </div>

      {/* Highlights */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">Key Highlights</h4>
        <div className="space-y-2">
          {project.highlights.slice(0, 3).map((highlight: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2">
              <Star size={12} className="text-yellow-400 mt-1 flex-shrink-0" />
              <span className="text-xs text-gray-400">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-auto pt-4 border-t border-gray-700/30">
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 glass rounded-lg hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <Github size={16} className="text-gray-300" />
          <span className="text-sm font-medium text-gray-300">Source Code</span>
        </motion.a>
        
        <motion.a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r ${project.color} rounded-lg hover:opacity-90 transition-all duration-300`}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <ExternalLink size={16} className="text-white" />
          <span className="text-sm font-medium text-white">Live Demo</span>
        </motion.a>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.color} opacity-5`} />
        <div className="absolute inset-0 rounded-2xl border border-white/20" />
      </div>
    </motion.div>
  )

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
            <div className="p-4 rounded-full bg-gradient-to-r from-orange-600 to-red-600">
              <Code size={36} className="text-white" />
            </div>
            <h1 className="responsive-text-5xl font-display font-black gradient-text">
              Neural Projects
            </h1>
          </motion.div>
          
          <p className="responsive-text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Explore my portfolio of AI-powered solutions that push the boundaries of machine learning and create real-world impact
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-3 rounded-full transition-all duration-300 font-medium
                ${selectedCategory === category 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' 
                  : 'glass text-gray-300 hover:bg-white/20 border border-gray-600/30'
                }
              `}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20"
        >
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h3 className="responsive-text-2xl font-bold text-white mb-8 text-center">
              Project Impact & Statistics
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Code, label: "Total Projects", value: `${projects.length}+`, color: "text-blue-400" },
                { icon: Star, label: "GitHub Stars", value: "800+", color: "text-yellow-400" },
                { icon: GitBranch, label: "Open Source", value: "100%", color: "text-green-400" },
                { icon: Users, label: "Global Reach", value: "15+ Countries", color: "text-purple-400" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon size={24} className={stat.color} />
                  </div>
                  <div className="responsive-text-xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 responsive-text-sm">{stat.label}</div>
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
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h3 className="responsive-text-2xl font-bold text-white mb-4">
              Interested in Collaboration?
            </h3>
            <p className="text-gray-300 mb-6 responsive-text-base max-w-2xl mx-auto">
              These projects represent my journey in AI/ML. Let's discuss how we can build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 responsive-text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-2xl neural-glow"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🚀 Start a Project
                </motion.button>
              </Link>
              <motion.a
                href="https://github.com/aswinguvvala"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 responsive-text-base font-semibold glass border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="inline-block w-5 h-5 mr-2" />
                View All Repositories
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 