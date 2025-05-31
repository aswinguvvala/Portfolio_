'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Brain, Database, Code, Zap, Users, Target, Globe, Cpu, ChevronRight } from 'lucide-react'
import GlassCard from './ui/GlassCard'

// Enhanced skill categories with more detailed data
const skillCategories = [
  {
    category: "AI & Machine Learning",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Deep Learning", level: 95, connections: ["Python", "TensorFlow", "Computer Vision"] },
      { name: "Neural Networks", level: 92, connections: ["PyTorch", "Python", "Deep Learning"] },
      { name: "Computer Vision", level: 88, connections: ["OpenCV", "Deep Learning", "Python"] },
      { name: "NLP", level: 85, connections: ["Transformers", "Python", "Deep Learning"] },
      { name: "Reinforcement Learning", level: 80, connections: ["Python", "Neural Networks"] },
      { name: "MLOps", level: 87, connections: ["Docker", "Kubernetes", "AWS"] }
    ]
  },
  {
    category: "Programming & Frameworks",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "Python", level: 96, connections: ["TensorFlow", "PyTorch", "Flask", "Django"] },
      { name: "TensorFlow", level: 90, connections: ["Python", "Deep Learning", "Keras"] },
      { name: "PyTorch", level: 88, connections: ["Python", "Neural Networks", "Deep Learning"] },
      { name: "JavaScript", level: 85, connections: ["React", "Node.js", "TypeScript"] },
      { name: "React", level: 82, connections: ["JavaScript", "TypeScript", "Next.js"] },
      { name: "TypeScript", level: 80, connections: ["JavaScript", "React", "Node.js"] }
    ]
  },
  {
    category: "Data & Analytics",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Data Science", level: 93, connections: ["Python", "Pandas", "NumPy"] },
      { name: "Big Data", level: 85, connections: ["Spark", "Hadoop", "Python"] },
      { name: "SQL", level: 88, connections: ["PostgreSQL", "MySQL", "Data Science"] },
      { name: "Data Visualization", level: 86, connections: ["D3.js", "Python", "Plotly"] },
      { name: "Statistical Analysis", level: 84, connections: ["R", "Python", "Data Science"] },
      { name: "ETL Pipelines", level: 82, connections: ["Apache Airflow", "Python", "SQL"] }
    ]
  },
  {
    category: "Cloud & DevOps",
    icon: Globe,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "AWS", level: 88, connections: ["Docker", "Kubernetes", "EC2"] },
      { name: "Docker", level: 85, connections: ["Kubernetes", "AWS", "CI/CD"] },
      { name: "Kubernetes", level: 80, connections: ["Docker", "AWS", "Microservices"] },
      { name: "CI/CD", level: 83, connections: ["GitHub Actions", "Docker", "AWS"] },
      { name: "Microservices", level: 78, connections: ["Docker", "Kubernetes", "API Design"] },
      { name: "Monitoring", level: 81, connections: ["Prometheus", "Grafana", "AWS"] }
    ]
  }
]

// Interactive skill node component
const SkillNode = ({ skill, isActive, onClick, connections }: {
  skill: { name: string; level: number; connections: string[] }
  isActive: boolean
  onClick: () => void
  connections: boolean
}) => {
  return (
    <motion.div
      className={`relative cursor-pointer group ${isActive ? 'z-20' : 'z-10'}`}
      whileHover={{ scale: 1.1, z: 30 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: Math.random() * 0.5
      }}
    >
      {/* Skill Circle */}
      <div className={`
        w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-sm
        ${isActive 
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl shadow-purple-500/50' 
          : 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-500 hover:to-purple-500'
        }
        border-2 ${isActive ? 'border-white' : 'border-gray-300/30'}
        transition-all duration-300
      `}>
        {skill.level}%
      </div>
      
      {/* Skill Name */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-300'} transition-colors`}>
          {skill.name}
        </span>
      </div>
      
      {/* Connection Lines */}
      {isActive && connections && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {skill.connections.map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-0.5 bg-gradient-to-r from-purple-400 to-pink-400 origin-center"
              style={{
                height: `${Math.random() * 100 + 50}px`,
                transform: `rotate(${index * (360 / skill.connections.length)}deg)`,
                top: '50%',
                left: '50%',
                transformOrigin: '0 0'
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            />
          ))}
        </motion.div>
      )}
      
      {/* Hover tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
        <div className="bg-black/90 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap backdrop-blur-sm">
          <div className="font-semibold">{skill.name}</div>
          <div className="text-gray-300">Proficiency: {skill.level}%</div>
          <div className="text-gray-400 text-xs mt-1">
            Connected to: {skill.connections.slice(0, 2).join(', ')}
            {skill.connections.length > 2 && '...'}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Neural network visualization background
const NeuralNetworkBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Create nodes
    const nodes: { x: number; y: number; vx: number; vy: number }[] = []
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      })
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      
      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx
        node.y += node.vy
        
        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1
        
        // Draw connections
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
            )
            
            if (distance < 100) {
              ctx.strokeStyle = `rgba(139, 92, 246, ${(100 - distance) / 400})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(otherNode.x, otherNode.y)
              ctx.stroke()
            }
          }
        })
        
        // Draw node
        ctx.fillStyle = 'rgba(139, 92, 246, 0.6)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-20"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<number>(0)

  return (
    <section id="skills" className="section-padding relative overflow-hidden neural-bg" ref={ref}>
      {/* Neural network background */}
      <NeuralNetworkBg />
      
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 animate-neural-pulse" />
      
      <div className="container mx-auto container-padding relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
              <Brain size={32} className="text-white" />
            </div>
            <h2 className="responsive-text-5xl font-display font-black gradient-text">
              Neural Skills Matrix
            </h2>
          </motion.div>
          <p className="responsive-text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            An interconnected ecosystem of technical expertise, where each skill amplifies the others
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {skillCategories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedCategory(index)}
              className={`
                flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300
                ${selectedCategory === index 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-gray-600/30'
                }
              `}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon size={20} />
              <span className="font-medium">{category.category}</span>
              {selectedCategory === index && <ChevronRight size={16} />}
            </motion.button>
          ))}
        </motion.div>

        {/* Interactive Skills Network */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="relative"
        >
          <GlassCard className="p-8 min-h-[600px] relative overflow-hidden">
            {/* Selected Category Display */}
            <div className="mb-8">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-6"
              >
                                 <div className={`p-4 rounded-full bg-gradient-to-r ${skillCategories[selectedCategory].color}`}>
                   {(() => {
                     const IconComponent = skillCategories[selectedCategory].icon
                     return <IconComponent size={28} className="text-white" />
                   })()} 
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">{skillCategories[selectedCategory].category}</h3>
                  <p className="text-gray-400">
                    {skillCategories[selectedCategory].skills.length} interconnected skills
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Skills Network Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 place-items-center min-h-[400px] relative">
              {skillCategories[selectedCategory].skills.map((skill, index) => (
                <SkillNode
                  key={skill.name}
                  skill={skill}
                  isActive={activeSkill === skill.name}
                  onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
                  connections={activeSkill === skill.name}
                />
              ))}
            </div>

            {/* Skill Details Panel */}
            {activeSkill && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-white">{activeSkill}</h4>
                  <button
                    onClick={() => setActiveSkill(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Proficiency Level</div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${skillCategories[selectedCategory].skills.find(s => s.name === activeSkill)?.level || 0}%` 
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-white font-semibold">
                        {skillCategories[selectedCategory].skills.find(s => s.name === activeSkill)?.level}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Connected Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {skillCategories[selectedCategory].skills
                        .find(s => s.name === activeSkill)?.connections
                        .slice(0, 4)
                        .map((connection) => (
                          <span
                            key={connection}
                            className="px-2 py-1 bg-purple-600/30 text-purple-200 rounded-full text-xs border border-purple-500/30"
                          >
                            {connection}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Brain, label: "AI/ML Projects", value: "25+", color: "from-purple-500 to-pink-500" },
            { icon: Code, label: "Languages", value: "8+", color: "from-blue-500 to-cyan-500" },
            { icon: Database, label: "Data Models", value: "50+", color: "from-green-500 to-emerald-500" },
            { icon: Zap, label: "Years Experience", value: "5+", color: "from-orange-500 to-red-500" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GlassCard className="p-6 hover:bg-white/10 transition-all duration-300">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}