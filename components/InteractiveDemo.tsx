// components/InteractiveDemo.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Code, Github, Activity, Zap, Play, Pause, Maximize2, X, ChevronDown, ChevronUp, RefreshCw, Share2, Copy, CheckCircle, AlertTriangle } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface GitHubStats {
  stars: number
  forks: number
  watchers: number
  issues: number
  lastCommit: string
  contributors: number
}

interface PerformanceMetric {
  name: string
  value: string
  improvement: number
  data: Array<{ time: string; value: number }>
}

interface DemoProject {
  id: string
  title: string
  demoUrl: string
  githubUrl: string
  codeSnippets: Array<{
    language: string
    title: string
    code: string
  }>
  performanceMetrics: PerformanceMetric[]
  description: string
}

interface InteractiveDemoProps {
  project: DemoProject
}

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-white/10 rounded-lg w-3/4"></div>
    <div className="h-4 bg-white/10 rounded w-1/2"></div>
    <div className="space-y-3">
      <div className="h-4 bg-white/10 rounded"></div>
      <div className="h-4 bg-white/10 rounded w-5/6"></div>
    </div>
  </div>
)

export default function InteractiveDemo({ project }: InteractiveDemoProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState<'demo' | 'code' | 'metrics'>('demo')
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSnippet, setSelectedSnippet] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null)
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const [shareSuccess, setShareSuccess] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Fetch GitHub stats with retry functionality
  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setLoading(true)
        setError(null)
        const repoPath = project.githubUrl.replace('https://github.com/', '')
        
        const [repoResponse, commitsResponse, contributorsResponse] = await Promise.all([
          fetch(`https://api.github.com/repos/${repoPath}`),
          fetch(`https://api.github.com/repos/${repoPath}/commits?per_page=1`),
          fetch(`https://api.github.com/repos/${repoPath}/contributors`)
        ])

        if (!repoResponse.ok) throw new Error('Failed to fetch repository data')

        const repoData = await repoResponse.json()
        const lastCommit = commitsResponse.ok ? 
          (await commitsResponse.json())[0]?.commit?.author?.date : null
        const contributors = contributorsResponse.ok ?
          (await contributorsResponse.json()).length : 0

        setGithubStats({
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          watchers: repoData.watchers_count,
          issues: repoData.open_issues_count,
          lastCommit: lastCommit ? new Date(lastCommit).toLocaleDateString() : 'Unknown',
          contributors
        })
      } catch (err) {
        setError('Unable to fetch GitHub statistics')
        console.error('GitHub API Error:', err)
      } finally {
        setLoading(false)
      }
    }

    if (project.githubUrl) {
      fetchGitHubStats()
    }
  }, [project.githubUrl, retryCount])

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const element = containerRef.current as HTMLElement | null
      if (element && element.requestFullscreen) {
        element.requestFullscreen()
        setIsFullscreen(true)
      }
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Enhanced iframe control with messaging
  const handleIframeControl = (action: 'play' | 'pause' | 'reload') => {
    if (iframeRef.current) {
      switch (action) {
        case 'play':
          // Send play message to iframe
          iframeRef.current.contentWindow?.postMessage({ action: 'play' }, '*')
          setIsPlaying(true)
          break
        case 'pause':
          // Send pause message to iframe
          iframeRef.current.contentWindow?.postMessage({ action: 'pause' }, '*')
          setIsPlaying(false)
          break
        case 'reload':
          iframeRef.current.src = iframeRef.current.src
          setIsPlaying(false)
          break
      }
    }
  }

  // Error retry functionality
  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: project.title,
      text: project.description,
      url: window.location.href
    }

    try {
      if (navigator.share && window.location.protocol === 'https:') {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 2000)
      }
    } catch (err) {
      console.error('Error sharing:', err)
    }
  }

  // Copy to clipboard functionality
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(type)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const renderDemo = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] glass rounded-xl overflow-hidden"
    >
      {/* Demo Controls - responsive positioning */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex gap-1 sm:gap-2">
        <motion.button
          onClick={() => handleIframeControl(isPlaying ? 'pause' : 'play')}
          className="p-1.5 sm:p-2 glass rounded-lg hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? 'Pause demo' : 'Play demo'}
        >
          {isPlaying ? <Pause size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Play size={16} className="sm:w-[18px] sm:h-[18px]" />}
        </motion.button>
        <motion.button
          onClick={() => handleIframeControl('reload')}
          className="p-1.5 sm:p-2 glass rounded-lg hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.05, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Reload demo"
        >
          <RefreshCw size={16} className="sm:w-[18px] sm:h-[18px]" />
        </motion.button>
        <motion.button
          onClick={handleShare}
          className="p-1.5 sm:p-2 glass rounded-lg hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Share demo"
        >
          {shareSuccess ? <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px] text-green-400" /> : <Share2 size={16} className="sm:w-[18px] sm:h-[18px]" />}
        </motion.button>
        <motion.button
          onClick={toggleFullscreen}
          className="p-1.5 sm:p-2 glass rounded-lg hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? <X size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Maximize2 size={16} className="sm:w-[18px] sm:h-[18px]" />}
        </motion.button>
      </div>

      {/* Demo iframe */}
      <iframe
        ref={iframeRef}
        src={project.demoUrl}
        className="w-full h-full border-0"
        title={project.title}
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
        allow="fullscreen"
      />

      {/* Loading overlay with skeleton */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center space-y-4 p-4 sm:p-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"
            />
            <LoadingSkeleton />
          </div>
        </div>
      )}
    </motion.div>
  )

  const renderCode = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Snippet selector - responsive scrolling */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {project.codeSnippets.map((snippet, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedSnippet(index)}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg whitespace-nowrap transition-all text-sm sm:text-base ${
              selectedSnippet === index 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                : 'glass hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {snippet.title}
          </motion.button>
        ))}
      </div>

      {/* Code display */}
      <div className="relative glass rounded-xl overflow-hidden">
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
          <motion.button
            onClick={() => copyToClipboard(project.codeSnippets[selectedSnippet].code, 'code')}
            className="p-1.5 sm:p-2 glass rounded-lg hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Copy code"
          >
            {copySuccess === 'code' ? <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px] text-green-400" /> : <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />}
          </motion.button>
        </div>
        
        <SyntaxHighlighter
          language={project.codeSnippets[selectedSnippet].language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            paddingTop: '2.5rem',
            background: 'transparent',
            fontSize: '0.75rem'
          }}
          showLineNumbers
          wrapLongLines
        >
          {project.codeSnippets[selectedSnippet].code}
        </SyntaxHighlighter>
      </div>

      {/* GitHub Stats */}
      {githubStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-4 sm:p-6"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <Github size={20} className="sm:w-6 sm:h-6 text-purple-400" />
            <h3 className="responsive-text-lg font-semibold">Repository Statistics</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: 'Stars', value: githubStats.stars, icon: '⭐' },
              { label: 'Forks', value: githubStats.forks, icon: '🔱' },
              { label: 'Contributors', value: githubStats.contributors, icon: '👥' },
              { label: 'Open Issues', value: githubStats.issues, icon: '🐛' },
              { label: 'Watchers', value: githubStats.watchers, icon: '👁️' },
              { label: 'Last Commit', value: githubStats.lastCommit, icon: '📅' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="text-center p-2 sm:p-3 bg-white/5 rounded-lg"
              >
                <div className="text-lg sm:text-2xl mb-1">{stat.icon}</div>
                <div className="responsive-text-lg font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )

  const renderMetrics = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 sm:space-y-6"
    >
      {project.performanceMetrics.map((metric, index) => (
        <motion.div
          key={metric.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-xl p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Activity size={20} className="sm:w-6 sm:h-6 text-purple-400" />
              <div>
                <h3 className="responsive-text-lg font-semibold">{metric.name}</h3>
                <p className="responsive-text-2xl font-bold gradient-text">{metric.value}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`text-sm font-medium ${
                metric.improvement > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.improvement > 0 ? '+' : ''}{metric.improvement}%
              </div>
              <motion.button
                onClick={() => setExpandedMetric(
                  expandedMetric === metric.name ? null : metric.name
                )}
                className="p-1.5 sm:p-2 glass rounded-lg hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={expandedMetric === metric.name ? 'Collapse metric' : 'Expand metric'}
              >
                {expandedMetric === metric.name ? <ChevronUp size={16} className="sm:w-[18px] sm:h-[18px]" /> : <ChevronDown size={16} className="sm:w-[18px] sm:h-[18px]" />}
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {expandedMetric === metric.name && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="h-48 sm:h-64 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={metric.data}>
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis 
                        dataKey="time" 
                        stroke="#666" 
                        fontSize={12}
                        hide={window.innerWidth < 640}
                      />
                      <YAxis stroke="#666" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1a1a', 
                          border: '1px solid #333',
                          fontSize: '12px'
                        }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill={`url(#gradient-${index})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  )

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="responsive-text-3xl font-bold gradient-text mb-4">{project.title}</h2>
        <p className="text-gray-300 responsive-text-base">{project.description}</p>
      </div>

      {/* Tab Navigation - responsive layout */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-8">
        {[
          { id: 'demo', label: 'Live Demo', icon: Play },
          { id: 'code', label: 'Code & Stats', icon: Code },
          { id: 'metrics', label: 'Performance', icon: Activity }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center justify-center gap-2 px-4 py-3 sm:px-6 rounded-lg transition-all text-sm sm:text-base ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'glass hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <tab.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'demo' && renderDemo()}
        {activeTab === 'code' && renderCode()}
        {activeTab === 'metrics' && renderMetrics()}
      </AnimatePresence>

      {/* Error Handling with retry */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 glass rounded-lg border border-red-500/30"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <AlertTriangle size={20} className="text-red-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-400 mb-2">{error}</p>
              <motion.button
                onClick={handleRetry}
                className="px-4 py-2 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 transition-all text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Retry
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// TODO: Add responsive classes for mobile/tablet
// TODO: Add loading skeleton states
// TODO: Add error retry functionality
// TODO: Add share functionality