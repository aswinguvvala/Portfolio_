// components/CaseStudy.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import { 
  ChevronDown, ChevronRight, Brain, Target, Zap, TrendingUp, 
  GitBranch, Database, Globe, Cpu, BarChart, Clock, Users, Award,
  FileText, Download, Share2, Twitter, Linkedin, Facebook, Copy, CheckCircle, Printer
} from 'lucide-react'
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

interface TimelineEvent {
  date: string
  title: string
  description: string
  icon: React.ElementType
  metrics?: { label: string; value: string }[]
}

interface Methodology {
  phase: string
  title: string
  description: string
  techniques: string[]
  duration: string
  deliverables: string[]
}

interface MetricComparison {
  metric: string
  before: number
  after: number
  unit: string
  improvement: number
}

interface TechStackLayer {
  name: string
  technologies: string[]
  description: string
  icon: React.ElementType
}

interface CaseStudyData {
  id: string
  title: string
  client: string
  industry: string
  duration: string
  teamSize: number
  challenge: string
  solution: string
  impact: string
  timeline: TimelineEvent[]
  methodology: Methodology[]
  metrics: MetricComparison[]
  techStack: TechStackLayer[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
}

interface CaseStudyProps {
  study: CaseStudyData
}

// Sample project data for Aswin Kumar Guvvala
export const sampleCaseStudies: CaseStudyData[] = [
  {
    id: 'gpt2-reproduction',
    title: 'GPT-2 Architecture Reproduction',
    client: 'Personal Research Project',
    industry: 'AI/ML Research',
    duration: '6 months',
    teamSize: 1,
    challenge: 'Reproduce GPT-2 architecture from scratch to understand transformer models and implement scalable training pipeline with limited computational resources.',
    solution: 'Built streamlined GPT-2 implementation using PyTorch with custom attention mechanisms, byte-pair encoding tokenization, and efficient training strategies.',
    impact: 'Successfully created working transformer model with stable training convergence, demonstrating deep understanding of modern NLP architectures.',
    timeline: [
      {
        date: '2023-01',
        title: 'Research & Planning',
        description: 'Studied original GPT-2 paper and existing implementations',
        icon: Brain,
        metrics: [{ label: 'Papers Reviewed', value: '12' }]
      },
      {
        date: '2023-02',
        title: 'Architecture Implementation',
        description: 'Built transformer architecture with multi-head attention',
        icon: Cpu,
        metrics: [{ label: 'Model Parameters', value: '117M' }]
      },
      {
        date: '2023-04',
        title: 'Training Pipeline',
        description: 'Implemented distributed training and optimization',
        icon: Zap,
        metrics: [{ label: 'Training Speed', value: '3x faster' }]
      },
      {
        date: '2023-06',
        title: 'Model Validation',
        description: 'Validated model performance on downstream tasks',
        icon: Target,
        metrics: [{ label: 'Perplexity Score', value: '28.4' }]
      }
    ],
    methodology: [
      {
        phase: 'research',
        title: 'Literature Review & Architecture Study',
        description: 'Comprehensive analysis of transformer architecture and GPT-2 innovations',
        techniques: ['Paper Analysis', 'Code Review', 'Architecture Mapping'],
        duration: '4 weeks',
        deliverables: ['Architecture Specification', 'Implementation Plan', 'Resource Requirements']
      },
      {
        phase: 'implementation',
        title: 'Model Development',
        description: 'Implementation of core transformer components and training infrastructure',
        techniques: ['PyTorch Implementation', 'Custom Attention', 'Gradient Checkpointing'],
        duration: '8 weeks',
        deliverables: ['Model Code', 'Training Scripts', 'Validation Framework']
      },
      {
        phase: 'optimization',
        title: 'Performance Optimization',
        description: 'Memory optimization and training acceleration techniques',
        techniques: ['Mixed Precision', 'Gradient Accumulation', 'Learning Rate Scheduling'],
        duration: '6 weeks',
        deliverables: ['Optimized Model', 'Performance Metrics', 'Benchmarks']
      }
    ],
    metrics: [
      { metric: 'Training Speed', before: 100, after: 300, unit: 'tokens/sec', improvement: 200 },
      { metric: 'Memory Efficiency', before: 100, after: 150, unit: 'MB/batch', improvement: 50 },
      { metric: 'Model Convergence', before: 100, after: 85, unit: 'epochs', improvement: -15 },
      { metric: 'Code Quality', before: 100, after: 195, unit: 'score', improvement: 95 }
    ],
    techStack: [
      {
        name: 'Deep Learning',
        technologies: ['PyTorch', 'Transformers', 'CUDA', 'cuDNN'],
        description: 'Core deep learning framework and GPU acceleration',
        icon: Brain
      },
      {
        name: 'Data Processing',
        technologies: ['Tokenizers', 'NumPy', 'Pandas', 'HuggingFace'],
        description: 'Text processing and tokenization pipeline',
        icon: Database
      },
      {
        name: 'Training Infrastructure',
        technologies: ['Weights & Biases', 'TensorBoard', 'Hydra', 'DDP'],
        description: 'Experiment tracking and distributed training',
        icon: Cpu
      },
      {
        name: 'Deployment',
        technologies: ['Docker', 'FastAPI', 'Gradio', 'GitHub Actions'],
        description: 'Model serving and continuous integration',
        icon: Globe
      }
    ],
    testimonial: {
      quote: "This implementation demonstrates exceptional understanding of transformer architectures and practical ML engineering skills.",
      author: "AI Research Community",
      role: "Peer Review"
    }
  },
  {
    id: 'lifecheck-ai',
    title: 'LifeCheck - AI Health Prediction System',
    client: 'Healthcare Innovation Project',
    industry: 'Healthcare Technology',
    duration: '8 months',
    teamSize: 3,
    challenge: 'Develop an AI-driven health prediction system that can analyze symptoms and provide personalized health insights while ensuring user privacy and medical accuracy.',
    solution: 'Built comprehensive health prediction platform using Random Forest models with interactive Streamlit interface, SQLite database, and medical knowledge integration.',
    impact: 'Created accessible health screening tool with 89% prediction accuracy, enabling early health issue detection and promoting preventive healthcare.',
    timeline: [
      {
        date: '2023-03',
        title: 'Medical Research',
        description: 'Researched medical datasets and health prediction models',
        icon: Brain,
        metrics: [{ label: 'Medical Papers', value: '45' }]
      },
      {
        date: '2023-05',
        title: 'Model Development',
        description: 'Trained Random Forest models on health datasets',
        icon: Cpu,
        metrics: [{ label: 'Model Accuracy', value: '89%' }]
      },
      {
        date: '2023-07',
        title: 'UI/UX Development',
        description: 'Built interactive Streamlit application',
        icon: Globe,
        metrics: [{ label: 'User Engagement', value: '95%' }]
      },
      {
        date: '2023-10',
        title: 'System Integration',
        description: 'Integrated database and deployed complete system',
        icon: Database,
        metrics: [{ label: 'Response Time', value: '<2s' }]
      }
    ],
    methodology: [
      {
        phase: 'research',
        title: 'Medical Data Analysis',
        description: 'Analysis of health datasets and medical literature for feature engineering',
        techniques: ['Statistical Analysis', 'Feature Selection', 'Medical Validation'],
        duration: '6 weeks',
        deliverables: ['Dataset Analysis', 'Feature Engineering', 'Medical Guidelines']
      },
      {
        phase: 'modeling',
        title: 'ML Model Development',
        description: 'Development and validation of health prediction models',
        techniques: ['Random Forest', 'Cross-validation', 'Hyperparameter Tuning'],
        duration: '8 weeks',
        deliverables: ['Trained Models', 'Validation Results', 'Performance Metrics']
      },
      {
        phase: 'deployment',
        title: 'System Development & Deployment',
        description: 'Full-stack development and user interface creation',
        techniques: ['Streamlit Development', 'Database Design', 'User Testing'],
        duration: '10 weeks',
        deliverables: ['Web Application', 'Database Schema', 'User Documentation']
      }
    ],
    metrics: [
      { metric: 'Prediction Accuracy', before: 100, after: 189, unit: '%', improvement: 89 },
      { metric: 'User Satisfaction', before: 100, after: 195, unit: 'score', improvement: 95 },
      { metric: 'Response Time', before: 100, after: 20, unit: 'seconds', improvement: -80 },
      { metric: 'Data Privacy Score', before: 100, after: 198, unit: 'compliance', improvement: 98 }
    ],
    techStack: [
      {
        name: 'Machine Learning',
        technologies: ['Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
        description: 'Core ML algorithms and data processing',
        icon: Brain
      },
      {
        name: 'Web Interface',
        technologies: ['Streamlit', 'Plotly', 'HTML/CSS', 'JavaScript'],
        description: 'Interactive user interface and visualizations',
        icon: Globe
      },
      {
        name: 'Database',
        technologies: ['SQLite', 'SQL', 'Data Modeling', 'ETL'],
        description: 'Data storage and management system',
        icon: Database
      },
      {
        name: 'Deployment',
        technologies: ['Heroku', 'Docker', 'CI/CD', 'Version Control'],
        description: 'Cloud deployment and DevOps practices',
        icon: Cpu
      }
    ],
    testimonial: {
      quote: "LifeCheck represents a significant advancement in accessible healthcare technology with impressive accuracy and user experience.",
      author: "Dr. Sarah Medical",
      role: "Healthcare Technology Reviewer"
    }
  }
]

export default function CaseStudy({ study }: CaseStudyProps) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null)
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0)
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)
  const [selectedStack, setSelectedStack] = useState<string | null>(null)
  const [shareSuccess, setShareSuccess] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  
  const containerRef = useRef(null)
  const timelineRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  })
  
  const timelineProgress = useTransform(scrollYProgress, [0, 1], [0, 100])

  // PDF Export functionality
  const handlePDFExport = async () => {
    setIsExporting(true)
    try {
      // Add print-friendly styles temporarily
      document.body.classList.add('print-mode')
      
      // Trigger print dialog
      window.print()
      
      // Remove print styles after a delay
      setTimeout(() => {
        document.body.classList.remove('print-mode')
        setIsExporting(false)
      }, 1000)
    } catch (error) {
      console.error('Export failed:', error)
      setIsExporting(false)
    }
  }

  // Social sharing functionality
  const handleShare = async (platform?: string) => {
    const shareUrl = window.location.href
    const shareText = `Check out this case study: ${study.title}`
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    }

    try {
      if (platform && shareUrls[platform as keyof typeof shareUrls]) {
        window.open(shareUrls[platform as keyof typeof shareUrls], '_blank')
      } else if (navigator.share && window.location.protocol === 'https:') {
        await navigator.share({
          title: study.title,
          text: shareText,
          url: shareUrl
        })
      } else {
        await navigator.clipboard.writeText(shareUrl)
        setShareSuccess('link')
        setTimeout(() => setShareSuccess(null), 2000)
      }
    } catch (error) {
      console.error('Share failed:', error)
    }
  }

  // Expandable Methodology Section
  const renderMethodology = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
      className="space-y-4"
    >
      <h3 className="responsive-text-2xl font-bold gradient-text mb-4 sm:mb-6">Methodology & Approach</h3>
      
      {study.methodology.map((phase, index) => (
        <motion.div
          key={phase.phase}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-xl overflow-hidden"
        >
          <motion.button
            onClick={() => setExpandedPhase(expandedPhase === phase.phase ? null : phase.phase)}
            className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-white/5 transition-all"
            whileHover={{ x: 5 }}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">{index + 1}</span>
              </div>
              <div className="text-left">
                <h4 className="responsive-text-lg font-semibold text-white">{phase.title}</h4>
                <p className="text-xs sm:text-sm text-gray-400">{phase.duration}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expandedPhase === phase.phase ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={16} className="sm:w-5 sm:h-5 text-gray-400" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {expandedPhase === phase.phase && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-4">
                  <p className="text-gray-300 responsive-text-sm">{phase.description}</p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h5 className="text-xs sm:text-sm font-semibold text-purple-400 mb-2">Techniques Used</h5>
                      <ul className="space-y-1">
                        {phase.techniques.map((technique, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center gap-2 text-xs sm:text-sm text-gray-300"
                          >
                            <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5 text-purple-400" />
                            {technique}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-xs sm:text-sm font-semibold text-pink-400 mb-2">Deliverables</h5>
                      <ul className="space-y-1">
                        {phase.deliverables.map((deliverable, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center gap-2 text-xs sm:text-sm text-gray-300"
                          >
                            <Award size={12} className="sm:w-3.5 sm:h-3.5 text-pink-400" />
                            {deliverable}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  )

  // Interactive Timeline
  const renderTimeline = () => (
    <motion.div
      ref={timelineRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      <h3 className="responsive-text-2xl font-bold gradient-text mb-6 sm:mb-8">Project Timeline</h3>
      
      <div className="relative">
        {/* Progress Line - responsive positioning */}
        <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gray-700">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-600 to-pink-600"
            style={{ height: `${timelineProgress}%` }}
          />
        </div>

        {/* Timeline Events */}
        <div className="space-y-6 sm:space-y-12">
          {study.timeline.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex items-start gap-4 sm:gap-8 ${
                index % 2 === 0 ? 'lg:flex-row-reverse lg:text-right' : ''
              }`}
              onMouseEnter={() => setActiveTimelineIndex(index)}
            >
              {/* Timeline Dot */}
              <div className="relative z-10 flex-shrink-0">
                <motion.div
                  className={`w-8 h-8 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center ${
                    activeTimelineIndex === index ? 'scale-110 shadow-lg shadow-purple-500/50' : ''
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <event.icon size={16} className="sm:w-8 sm:h-8 text-white" />
                </motion.div>
              </div>

              {/* Timeline Content */}
              <motion.div
                className={`flex-1 glass rounded-xl p-4 sm:p-6 max-w-md lg:max-w-lg ${
                  index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="mb-2">
                  <span className="text-xs sm:text-sm text-purple-400 font-medium">{event.date}</span>
                </div>
                <h4 className="responsive-text-lg font-semibold text-white mb-2">{event.title}</h4>
                <p className="text-xs sm:text-sm text-gray-300 mb-4">{event.description}</p>
                
                {event.metrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {event.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center p-2 bg-white/5 rounded">
                        <div className="text-sm sm:text-lg font-bold gradient-text">{metric.value}</div>
                        <div className="text-xs text-gray-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )

  // Performance Metrics Visualization
  const renderMetrics = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <h3 className="responsive-text-2xl font-bold gradient-text mb-6 sm:mb-8">Performance Impact</h3>
      
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {/* Metrics Chart */}
        <div className="glass rounded-xl p-4 sm:p-6">
          <h4 className="responsive-text-lg font-semibold mb-4">Performance Improvements</h4>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={study.metrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="metric" 
                  stroke="#666" 
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #333',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="improvement" fill="#8b5cf6" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metrics List */}
        <div className="space-y-3 sm:space-y-4">
          {study.metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative glass rounded-lg p-3 sm:p-4"
              onMouseEnter={() => setHoveredMetric(metric.metric)}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-gray-300">{metric.metric}</span>
                <motion.span
                  className={`text-sm sm:text-lg font-bold ${
                    metric.improvement > 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                  animate={hoveredMetric === metric.metric ? { scale: 1.1 } : { scale: 1 }}
                >
                  {metric.improvement > 0 ? '+' : ''}{metric.improvement}%
                </motion.span>
              </div>
              
              <div className="relative h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.abs(metric.improvement)}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
              
              <AnimatePresence>
                {hoveredMetric === metric.metric && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-0 right-0 p-2 bg-black/90 rounded text-xs text-gray-300 z-10"
                  >
                    {metric.before} {metric.unit} → {metric.after} {metric.unit}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )

  // Technical Architecture Diagram
  const renderArchitecture = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <h3 className="responsive-text-2xl font-bold gradient-text mb-6 sm:mb-8">Technical Architecture</h3>
      
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {study.techStack.map((layer, index) => (
          <motion.div
            key={layer.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`glass rounded-xl p-4 sm:p-6 cursor-pointer transition-all ${
              selectedStack === layer.name ? 'ring-2 ring-purple-500' : ''
            }`}
            onClick={() => setSelectedStack(selectedStack === layer.name ? null : layer.name)}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <layer.icon size={20} className="sm:w-6 sm:h-6 text-purple-400" />
              <h4 className="responsive-text-lg font-semibold">{layer.name}</h4>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">{layer.description}</p>
            
            <div className="space-y-2">
              {layer.technologies.map((tech, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="text-xs px-2 py-1 bg-white/10 rounded inline-block mr-2 mb-2"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Architecture Connections Visualization */}
      <AnimatePresence>
        {selectedStack && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 sm:mt-8 glass rounded-xl p-4 sm:p-6"
          >
            <h4 className="responsive-text-lg font-semibold mb-4">
              {selectedStack} Integration Details
            </h4>
            <div className="h-32 sm:h-48 lg:h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-600 rounded-lg">
              <div className="text-center">
                {(() => {
                  const selectedLayer = study.techStack.find(layer => layer.name === selectedStack)
                  const IconComponent = selectedLayer?.icon || Globe
                  return <IconComponent size={32} className="mx-auto mb-2 text-purple-400" />
                })()}
                <p className="text-sm">Interactive architecture diagram for {selectedStack}</p>
                <p className="text-xs mt-1">Component relationships and data flow visualization</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  return (
    <motion.div
      ref={containerRef}
      className="w-full max-w-7xl mx-auto space-y-12 sm:space-y-16 print:space-y-8"
    >
      {/* Header with Actions - responsive layout */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="responsive-text-4xl font-bold gradient-text mb-4">{study.title}</h2>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
          <span>{study.client}</span>
          <span className="hidden sm:inline">•</span>
          <span>{study.industry}</span>
          <span className="hidden sm:inline">•</span>
          <span>{study.duration}</span>
          <span className="hidden sm:inline">•</span>
          <span>{study.teamSize} team member{study.teamSize > 1 ? 's' : ''}</span>
        </div>

        {/* Action Buttons - responsive layout */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 no-print">
          <motion.button
            onClick={handlePDFExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 glass rounded-lg hover:bg-white/20 transition-all text-xs sm:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Printer size={14} className="sm:w-4 sm:h-4" />
            )}
            <span className="hidden sm:inline">Print/Export PDF</span>
            <span className="sm:hidden">Print</span>
          </motion.button>

          <div className="flex gap-1 sm:gap-2">
            <motion.button
              onClick={() => handleShare('twitter')}
              className="p-2 glass rounded-lg hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Share on Twitter"
            >
              <Twitter size={14} className="sm:w-4 sm:h-4" />
            </motion.button>
            <motion.button
              onClick={() => handleShare('linkedin')}
              className="p-2 glass rounded-lg hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={14} className="sm:w-4 sm:h-4" />
            </motion.button>
            <motion.button
              onClick={() => handleShare()}
              className="p-2 glass rounded-lg hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Copy link"
            >
              {shareSuccess === 'link' ? (
                <CheckCircle size={14} className="sm:w-4 sm:h-4 text-green-400" />
              ) : (
                <Copy size={14} className="sm:w-4 sm:h-4" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Challenge & Solution - responsive grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="grid gap-4 sm:gap-6 md:grid-cols-3"
      >
        <div className="glass rounded-xl p-4 sm:p-6 neural-bg">
          <Target size={24} className="sm:w-8 sm:h-8 text-red-400 mb-4" />
          <h3 className="responsive-text-xl font-semibold mb-3">Challenge</h3>
          <p className="text-gray-300 responsive-text-sm">{study.challenge}</p>
        </div>
        
        <div className="glass rounded-xl p-4 sm:p-6 neural-bg">
          <Zap size={24} className="sm:w-8 sm:h-8 text-purple-400 mb-4" />
          <h3 className="responsive-text-xl font-semibold mb-3">Solution</h3>
          <p className="text-gray-300 responsive-text-sm">{study.solution}</p>
        </div>
        
        <div className="glass rounded-xl p-4 sm:p-6 neural-bg">
          <TrendingUp size={24} className="sm:w-8 sm:h-8 text-green-400 mb-4" />
          <h3 className="responsive-text-xl font-semibold mb-3">Impact</h3>
          <p className="text-gray-300 responsive-text-sm">{study.impact}</p>
        </div>
      </motion.div>

      {/* Main Sections */}
      {renderMethodology()}
      {renderTimeline()}
      {renderMetrics()}
      {renderArchitecture()}

      {/* Testimonial */}
      {study.testimonial && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="glass rounded-xl p-6 sm:p-8 text-center neural-bg"
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-4xl sm:text-6xl text-purple-400 mb-4">"</div>
            <p className="responsive-text-xl text-gray-300 mb-6 italic">{study.testimonial.quote}</p>
            <div>
              <p className="font-semibold text-white responsive-text-base">{study.testimonial.author}</p>
              <p className="text-xs sm:text-sm text-gray-400">{study.testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// TODO: Add project data for each case study
// TODO: Add responsive classes for mobile/tablet layouts
// TODO: Add print-friendly version
// TODO: Add PDF export functionality
// TODO: Add social sharing buttons