'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text3D, Environment, OrbitControls } from '@react-three/drei'
import { Github, ExternalLink, Play, Zap, Brain, Database, Globe, Eye, Star, GitBranch, Users } from 'lucide-react'
import GlassCard from './ui/GlassCard'
import Button from './ui/Button'

// Enhanced project data with more details
export const projects = [
  {
    id: 1,
    title: "Neural Style Transfer Engine",
    description: "Real-time artistic style transfer using advanced convolutional neural networks with custom optimization algorithms.",
    fullDescription: "Built a comprehensive neural style transfer system that combines content and style images in real-time. Implemented custom loss functions, optimized for GPU acceleration, and created an intuitive web interface for artists and developers.",
    technologies: ["PyTorch", "Computer Vision", "CUDA", "Flask", "React"],
    category: "AI/ML",
    difficulty: "Advanced",
    timeline: "3 months",
    team: "Solo Project",
    github: "https://github.com/aswinguvvala/neural-style-transfer",
    demo: "https://neural-style-demo.vercel.app",
    image: "/project-neural.jpg",
    color: "from-purple-600 to-pink-600",
    metrics: {
      stars: 145,
      forks: 32,
      performance: "95%",
      accuracy: "92%"
    },
    highlights: [
      "Real-time processing with 60fps",
      "Custom GPU optimization",
      "Artist collaboration features",
      "Production-ready API"
    ],
    techStack: {
      frontend: ["React", "TypeScript", "Three.js"],
      backend: ["Python", "Flask", "PyTorch"],
      infrastructure: ["AWS", "Docker", "NGINX"]
    }
  },
  {
    id: 2,
    title: "Quantum ML Optimizer",
    description: "Hybrid quantum-classical machine learning framework for solving complex optimization problems.",
    fullDescription: "Developed a groundbreaking optimization framework that leverages quantum computing principles to enhance classical ML algorithms. Achieved 40% faster convergence on complex optimization landscapes.",
    technologies: ["Quantum Computing", "Python", "Qiskit", "TensorFlow"],
    category: "Research",
    difficulty: "Expert",
    timeline: "6 months",
    team: "Research Team (4)",
    github: "https://github.com/aswinguvvala/quantum-ml",
    demo: "https://quantum-ml-demo.herokuapp.com",
    image: "/project-quantum.jpg",
    color: "from-blue-600 to-cyan-600",
    metrics: {
      stars: 89,
      forks: 18,
      performance: "40% faster",
      citations: "12+"
    },
    highlights: [
      "Quantum advantage demonstrated",
      "Published research paper",
      "Industry collaboration",
      "Open-source community"
    ],
    techStack: {
      frontend: ["Jupyter", "Plotly", "Streamlit"],
      backend: ["Python", "Qiskit", "NumPy"],
      infrastructure: ["IBM Quantum", "AWS", "Git LFS"]
    }
  },
  {
    id: 3,
    title: "Predictive Healthcare Analytics",
    description: "AI-powered healthcare prediction system using federated learning for patient privacy protection.",
    fullDescription: "Created a privacy-preserving healthcare analytics platform that predicts patient outcomes while maintaining data sovereignty. Implemented federated learning across multiple healthcare institutions.",
    technologies: ["Federated Learning", "Healthcare AI", "Privacy Tech", "React"],
    category: "Healthcare",
    difficulty: "Advanced",
    timeline: "8 months",
    team: "Cross-functional (6)",
    github: "https://github.com/aswinguvvala/healthcare-ai",
    demo: "https://healthcare-ai-demo.netlify.app",
    image: "/project-healthcare.jpg",
    color: "from-green-600 to-emerald-600",
    metrics: {
      stars: 203,
      forks: 67,
      accuracy: "94.2%",
      institutions: "5+"
    },
    highlights: [
      "HIPAA compliant design",
      "Multi-institution deployment",
      "94.2% prediction accuracy",
      "Real-world impact"
    ],
    techStack: {
      frontend: ["React", "D3.js", "Material-UI"],
      backend: ["Python", "TensorFlow", "FastAPI"],
      infrastructure: ["Kubernetes", "PostgreSQL", "Redis"]
    }
  },
  {
    id: 4,
    title: "Real-time Fraud Detection",
    description: "Edge-computing fraud detection system processing millions of transactions with sub-millisecond latency.",
    fullDescription: "Built an ultra-low latency fraud detection system deployed at the edge for real-time transaction monitoring. Handles 1M+ transactions per second with 99.9% uptime.",
    technologies: ["Edge Computing", "Real-time ML", "Kafka", "Kubernetes"],
    category: "FinTech",
    difficulty: "Expert",
    timeline: "10 months",
    team: "Backend Team (5)",
    github: "https://github.com/aswinguvvala/fraud-detection",
    demo: "https://fraud-detection-demo.app",
    image: "/project-fraud.jpg",
    color: "from-orange-600 to-red-600",
    metrics: {
      stars: 156,
      forks: 43,
      latency: "<1ms",
      throughput: "1M+ TPS"
    },
    highlights: [
      "Sub-millisecond response time",
      "99.9% uptime achieved",
      "Edge deployment ready",
      "Production scale"
    ],
    techStack: {
      frontend: ["Vue.js", "WebGL", "Chart.js"],
      backend: ["Go", "Apache Kafka", "Redis"],
      infrastructure: ["Edge Computing", "Docker", "Prometheus"]
    }
  },
  {
    id: 5,
    title: "Climate Change Predictor",
    description: "Large-scale climate modeling using transformer architectures and satellite imagery analysis.",
    fullDescription: "Developed a comprehensive climate prediction model that analyzes satellite imagery and weather data to forecast climate patterns. Contributes to global climate research initiatives.",
    technologies: ["Climate Science", "Transformers", "Satellite Data", "GIS"],
    category: "Climate Tech",
    difficulty: "Advanced",
    timeline: "12 months",
    team: "Research Consortium (8)",
    github: "https://github.com/aswinguvvala/climate-ai",
    demo: "https://climate-predictor.org",
    image: "/project-climate.jpg",
    color: "from-teal-600 to-blue-600",
    metrics: {
      stars: 178,
      forks: 52,
      accuracy: "89.3%",
      impact: "Global"
    },
    highlights: [
      "Global climate impact",
      "Satellite data integration",
      "Research collaboration",
      "Open science initiative"
    ],
    techStack: {
      frontend: ["React", "Mapbox", "Three.js"],
      backend: ["Python", "PyTorch", "GeoTiff"],
      infrastructure: ["HPC", "Dask", "NetCDF"]
    }
  },
  {
    id: 6,
    title: "Autonomous Drone Swarm",
    description: "Coordinated autonomous drone navigation using multi-agent reinforcement learning and computer vision.",
    fullDescription: "Created an intelligent drone swarm system capable of autonomous coordination, obstacle avoidance, and task distribution using advanced RL algorithms and real-time computer vision.",
    technologies: ["Robotics", "Computer Vision", "Multi-Agent RL", "ROS"],
    category: "Robotics",
    difficulty: "Expert",
    timeline: "14 months",
    team: "Robotics Lab (6)",
    github: "https://github.com/aswinguvvala/drone-swarm",
    demo: "https://drone-swarm-simulation.io",
    image: "/project-drones.jpg",
    color: "from-indigo-600 to-purple-600",
    metrics: {
      stars: 234,
      forks: 78,
      efficiency: "96%",
      coordination: "Real-time"
    },
    highlights: [
      "Multi-agent coordination",
      "Real-time obstacle avoidance",
      "Swarm intelligence",
      "Hardware deployment"
    ],
    techStack: {
      frontend: ["Unity", "C#", "WebGL"],
      backend: ["Python", "ROS", "OpenCV"],
      infrastructure: ["NVIDIA Jetson", "Gazebo", "Docker"]
    }
  }
]

// 3D Floating Project Card Component
const FloatingProjectCard = ({ project, index, isActive, onClick }: {
  project: typeof projects[0]
  index: number
  isActive: boolean
  onClick: () => void
}) => {
  const meshRef = useRef<any>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + index) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 + index) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh
        ref={meshRef}
        position={[
          (index % 3 - 1) * 4,
          Math.floor(index / 3) * 3 - 3,
          0
        ]}
        onClick={onClick}
      >
        <boxGeometry args={[2.5, 1.5, 0.1]} />
        <meshStandardMaterial
          color={isActive ? "#8b5cf6" : "#374151"}
          emissive={isActive ? "#6366f1" : "#1f2937"}
          emissiveIntensity={isActive ? 0.5 : 0.1}
        />
      </mesh>
      <Text3D
        font="/fonts/inter-bold.json"
        size={0.1}
        height={0.02}
        position={[
          (index % 3 - 1) * 4 - 1,
          Math.floor(index / 3) * 3 - 2.5,
          0.1
        ]}
      >
        {project.title}
        <meshStandardMaterial color="#ffffff" />
      </Text3D>
    </Float>
  )
}

// 3D Scene for Projects  
const ProjectsScene = ({ projects, activeProject, onProjectClick }: {
  projects: any[]
  activeProject: number | null
  onProjectClick: (index: number) => void
}) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="night" />
      
      {projects.map((project, index) => (
        <FloatingProjectCard
          key={project.id}
          project={project}
          index={index}
          isActive={activeProject === index}
          onClick={() => onProjectClick(index)}
        />
      ))}
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  )
}

// Enhanced Project Card Component
const ProjectCard = ({ project, index, isActive, onClick }: {
  project: typeof projects[0]
  index: number
  isActive: boolean
  onClick: () => void
}) => {
  const cardRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]))
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]))

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = (cardRef.current as HTMLElement).getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative cursor-pointer group overflow-hidden rounded-2xl
        ${isActive ? 'col-span-full lg:col-span-2 row-span-2' : 'col-span-1 row-span-1'}
      `}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: isActive ? 1 : 1.05,
        z: 50,
        transition: { duration: 0.3 }
      }}
      layout
    >
      <div className={`
        relative h-full min-h-[300px] p-6 rounded-2xl backdrop-blur-xl border border-white/10
        bg-gradient-to-br from-white/5 to-white/[0.02]
        ${isActive ? 'bg-gradient-to-br from-white/10 to-white/[0.05]' : ''}
        transition-all duration-500
      `}>
        {/* Project Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color} animate-pulse`} />
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">
              {project.category}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300">
              {project.difficulty}
            </span>
          </div>
          <div className="flex gap-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} className="text-gray-300" />
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} className="text-gray-300" />
            </motion.a>
          </div>
        </div>

        {/* Project Title & Description */}
        <div className="mb-4">
          <h3 className={`
            font-bold text-white mb-2 leading-tight
            ${isActive ? 'text-2xl' : 'text-lg'}
          `}>
            {project.title}
          </h3>
          <p className={`
            text-gray-300 leading-relaxed
            ${isActive ? 'text-base' : 'text-sm line-clamp-3'}
          `}>
            {isActive ? project.fullDescription : project.description}
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className={`
                text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${project.color}
                ${isActive ? 'text-xl' : 'text-lg'}
              `}>
                {value}
              </div>
              <div className="text-xs text-gray-400 capitalize">{key}</div>
            </div>
          ))}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, isActive ? project.technologies.length : 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 text-gray-300 border border-gray-600/30"
            >
              {tech}
            </span>
          ))}
          {!isActive && project.technologies.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-full bg-purple-600/20 text-purple-300">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Expanded Content for Active Card */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Project Highlights */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Key Highlights</h4>
              <div className="grid md:grid-cols-2 gap-2">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Star size={14} className="text-yellow-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Technical Architecture</h4>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(project.techStack).map(([category, techs]) => (
                  <div key={category}>
                    <div className="text-sm font-medium text-gray-400 mb-2 capitalize">
                      {category}
                    </div>
                    <div className="space-y-1">
                      {(techs as string[]).map((tech) => (
                        <div key={tech} className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-700/30">
              <div className="text-center">
                <Users size={20} className="text-blue-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-white">{project.team}</div>
                <div className="text-xs text-gray-400">Team Size</div>
              </div>
              <div className="text-center">
                <Zap size={20} className="text-green-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-white">{project.timeline}</div>
                <div className="text-xs text-gray-400">Development Time</div>
              </div>
              <div className="text-center">
                <GitBranch size={20} className="text-purple-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-white">Open Source</div>
                <div className="text-xs text-gray-400">Contribution Model</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Hover Effects */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.color} opacity-5`} />
          <div className="absolute inset-0 rounded-2xl border border-white/20" />
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | '3d'>('grid')
  const [filter, setFilter] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))]
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="section-padding relative overflow-hidden neural-bg" ref={ref}>
      {/* Enhanced Background */}
      <div className="absolute inset-0 animate-neural-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
      
      <div className="container mx-auto container-padding relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-4 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
              <Brain size={36} className="text-white" />
            </div>
            <h2 className="responsive-text-5xl font-display font-black gradient-text">
              Neural Projects
            </h2>
          </motion.div>
          <p className="responsive-text-lg text-gray-300 max-w-5xl mx-auto leading-relaxed">
            Explore my portfolio of AI-powered solutions that push the boundaries of what's possible with machine learning
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-wrap justify-between items-center gap-4 mb-12"
        >
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`
                  px-4 py-2 rounded-full transition-all duration-300 capitalize
                  ${filter === category 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-gray-600/30'
                  }
                `}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white/10 rounded-full p-1">
            <motion.button
              onClick={() => setViewMode('grid')}
              className={`
                px-4 py-2 rounded-full transition-all duration-300
                ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-300'}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Grid View
            </motion.button>
            <motion.button
              onClick={() => setViewMode('3d')}
              className={`
                px-4 py-2 rounded-full transition-all duration-300
                ${viewMode === '3d' ? 'bg-purple-600 text-white' : 'text-gray-300'}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              3D View
            </motion.button>
          </div>
        </motion.div>

        {/* Projects Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {viewMode === '3d' ? (
            <div className="h-[800px] rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10">
              <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <Suspense fallback={null}>
                  <ProjectsScene 
                    projects={filteredProjects}
                    activeProject={activeProject}
                    onProjectClick={setActiveProject}
                  />
                </Suspense>
              </Canvas>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isActive={activeProject === index}
                  onClick={() => setActiveProject(activeProject === index ? null : index)}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              These projects represent just the beginning. Let's collaborate on your next breakthrough AI solution.
            </p>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                href="#contact" 
                variant="primary"
                className="px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                🚀 Start a Project
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}