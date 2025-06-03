'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, Bot, User, FileText, Brain, Sparkles, Download, 
  ChevronDown, Loader2, AlertCircle, CheckCircle, X,
  Upload, Search, MessageSquare, Zap, Copy, Share2,
  Mic, MicOff, Volume2, VolumeX, RefreshCw, Settings
} from 'lucide-react'

// Types
interface Document {
  id: string
  name: string
  content: string
  type: 'resume' | 'project' | 'certificate' | 'other'
  metadata?: Record<string, any>
}

interface DocumentChunk {
  id: string
  documentId: string
  content: string
  embedding?: number[]
  metadata: {
    section?: string
    page?: number
    relevance?: number
  }
}

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  sources?: DocumentChunk[]
  confidence?: number
  followUpSuggestions?: string[]
}

interface ChatState {
  messages: Message[]
  isLoading: boolean
  error: string | null
  context: DocumentChunk[]
}

// Mock data - Aswin's resume content
const ASWIN_RESUME_CONTENT = `
Aswin Kumar Guvvala
+1 (312) 561 0866 | aswinabd17@gmail.com | www.linkedin.com/in/aswinguvvala | https://github.com/aswinguvvala

SKILLS
• Programming Languages: Python (advanced), SQL (advanced), R
• Data Processing & Analysis: Pandas, NumPy, Scikit-learn, Statistical Modeling, A/B Testing, Hypothesis Testing
• Machine Learning: Classification, Regression, Clustering, Recommender System, Time-Series Forecasting, Ensemble Methods
• Deep Learning: TensorFlow, PyTorch, Keras, Neural Network Architectures, Computer Vision (OpenCV)
• Natural Language Processing (NLP): Transformer Models, BERT, NLTK, spaCy, Hugging Face Transformers, Text Generation, Sentiment Analysis, Text Classification
• Generative AI: OpenAI GPT-4 API Integration, Large Language Models (LLaMA, Flan-T5), Prompt Engineering, Fine-tuning, RAG Systems, AI Agents
• Data Visualization and Cloud: Matplotlib, Plotly, Seaborn, Tableau, AWS SageMaker, Vector Databases(Pinecone)

EXPERIENCE
Data Scientist (DUTA) - May 2023 – Present
• Architected and implemented a FastAPI-based intelligent chatbot using OpenAI integration and advanced vector database retrieval, achieving 85% query satisfaction.
• Developed a FAISS vector database system with optimized similarity search algorithms, enabling efficient document storage and retrieval with sub-millisecond query response times for over 10,000 documents.
• Engineered a sophisticated document embedding pipeline, incorporating sentence transformers and keyword boosting techniques to improve search relevance by 65% compared to traditional keyword matching.
• Led a cross-functional team to develop and deploy on AWS SageMaker an end-to-end news summarization system, training a T5 small model (60M parameters) on 10 million rows of news data to achieve an initial ROUGE score of 0.47.
• Collaborated with data scientists and engineers to upgrade the summarization model to a 7 billion parameter version, boosting the ROUGE score to 0.75 and delivering a 59% overall improvement in summarization accuracy.
• Worked with product and engineering teams to implement a collaborative filtering recommendation system using TruncatedSVD and cosine similarity, alongside developing a content-based recommendation model.
• Created interactive data visualizations and executive dashboards using Plotly and Tableau to communicate complex NLP model performance metrics to non-technical stakeholders

Data Scientist (Cauvery Software Solutions) - April 2019 – November 2020
• Developed customer sentiment analysis models using NLTK and bag-of-words approaches, achieving 82% accuracy in classifying feedback for retail clients.
• Built recommendation systems using collaborative filtering techniques with Python and NumPy, increasing client website engagement by 14%.
• Created predictive churn models using Random Forest and Logistic Regression, identifying at-risk customers with 78% accuracy.
• Implemented K-means clustering for customer segmentation, identifying 5 distinct customer profiles that informed targeted marketing campaigns.
• Conducted A/B testing for e-commerce websites, improving conversion rates by 17% through data-driven UI/UX improvements.
• Developed sales forecasting models using ARIMA and regression techniques, reducing inventory costs by 12%.
• Created business intelligence dashboards using Tableau and Matplotlib to communicate key insights to stakeholders.

PERSONAL PROJECTS
GPT-2 paper Reproduction
• Implemented a GPT-2 clone based on nanoGPT architecture, building a streamlined transformer model with causal self-attention mechanisms in PyTorch.
• Integrated byte-pair encoding tokenization and optimized attention patterns to enable efficient text generation on limited computational resources.
• Achieved stable training convergence by implementing proper weight initialization and learning rate scheduling techniques across diverse text corpora.

LifeCheck - AI Health Assistant
• Developed an AI-driven health prediction system using Python & Scikit-learn on diverse medical datasets.
• Built an interactive Streamlit UI for symptom analysis, "what-if" scenarios & uncertainty-aware predictions.
• Engineered data pipelines for complex healthcare data & trained Random Forest models for diagnosis.
• Implemented user authentication & interaction logging via SQLite for personalized health insights.

EDUCATION
DePaul University, Chicago, Illinois - Jan 2021 – Mar 2023
Master of Science in Data Science

CVR College of Engineering, Telangana, India - Aug 2015 – Jun 2019
Bachelor of Engineering in Information Technology
`

// Simulated vector database
class VectorDatabase {
  private chunks: DocumentChunk[] = []
  
  async addDocument(doc: Document): Promise<void> {
    // Simulate chunking
    const chunks = this.chunkDocument(doc)
    
    // Simulate embedding generation
    for (const chunk of chunks) {
      chunk.embedding = this.generateMockEmbedding()
      this.chunks.push(chunk)
    }
  }
  
  private chunkDocument(doc: Document): DocumentChunk[] {
    const chunkSize = 500
    const overlap = 100
    const chunks: DocumentChunk[] = []
    
    for (let i = 0; i < doc.content.length; i += chunkSize - overlap) {
      const content = doc.content.slice(i, i + chunkSize)
      chunks.push({
        id: `${doc.id}-chunk-${i}`,
        documentId: doc.id,
        content,
        metadata: { 
          section: this.detectSection(content),
          page: Math.floor(i / 3000) + 1
        }
      })
    }
    
    return chunks
  }
  
  private detectSection(content: string): string {
    if (content.toLowerCase().includes('skills')) return 'Skills'
    if (content.toLowerCase().includes('experience')) return 'Experience'
    if (content.toLowerCase().includes('education')) return 'Education'
    if (content.toLowerCase().includes('project')) return 'Projects'
    return 'General'
  }
  
  private generateMockEmbedding(): number[] {
    return Array.from({ length: 384 }, () => Math.random())
  }
  
  async search(query: string, topK: number = 5): Promise<DocumentChunk[]> {
    // Simulate embedding generation for query
    const queryEmbedding = this.generateMockEmbedding()
    
    // Calculate cosine similarity (simplified)
    const results = this.chunks.map(chunk => ({
      chunk,
      score: this.cosineSimilarity(queryEmbedding, chunk.embedding || [])
    }))
    
    // Sort by relevance and return top K
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map(r => ({
        ...r.chunk,
        metadata: { ...r.chunk.metadata, relevance: r.score }
      }))
  }
  
  private cosineSimilarity(a: number[], b: number[]): number {
    // Simplified cosine similarity
    return 0.5 + Math.random() * 0.5
  }
}

// Mock OpenAI API functions
const mockOpenAI = {
  async generateResponse(
    query: string, 
    context: DocumentChunk[], 
    chatHistory: Message[]
  ): Promise<{
    content: string
    confidence: number
    followUpSuggestions: string[]
  }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate contextual response based on query
    const responses: Record<string, any> = {
      'skills': {
        content: "Based on Aswin's resume, he has extensive expertise in Machine Learning and Data Science. His key technical skills include:\n\n**Programming:** Python (advanced), SQL (advanced), R\n\n**Machine Learning:** Classification, Regression, Clustering, Recommender Systems, Time-Series Forecasting\n\n**Deep Learning:** TensorFlow, PyTorch, Keras, Neural Networks, Computer Vision\n\n**NLP & GenAI:** Transformer Models, BERT, GPT-4 API Integration, RAG Systems, Prompt Engineering\n\n**Cloud & Tools:** AWS SageMaker, Vector Databases (Pinecone), Docker, Git\n\nHe has applied these skills in production environments at DUTA, achieving metrics like 85% query satisfaction for AI chatbots and 65% improvement in search relevance.",
        confidence: 0.95,
        followUpSuggestions: [
          "Tell me about Aswin's experience with Large Language Models",
          "What specific NLP projects has Aswin worked on?",
          "How has Aswin used vector databases in his work?"
        ]
      },
      'experience': {
        content: "Aswin is currently working as a Data Scientist at DUTA (since May 2023), where he has:\n\n• **Built an intelligent chatbot** using FastAPI and OpenAI integration with 85% query satisfaction\n• **Developed a FAISS vector database system** with sub-millisecond query response times for 10,000+ documents\n• **Led a news summarization project** using T5 models, achieving a ROUGE score improvement from 0.47 to 0.75\n• **Implemented recommendation systems** using collaborative filtering\n\nPreviously, he worked at Cauvery Software Solutions (2019-2020) where he developed sentiment analysis models, built recommendation systems, and created predictive models for customer churn.\n\nTotal experience: 4+ years in Data Science and ML Engineering.",
        confidence: 0.98,
        followUpSuggestions: [
          "What were the key achievements in Aswin's role at DUTA?",
          "Tell me about the chatbot project Aswin architected",
          "How did Aswin improve the news summarization model?"
        ]
      },
      'projects': {
        content: "Aswin has worked on several impressive personal projects:\n\n**1. GPT-2 Reproduction**\n• Built a GPT-2 clone from scratch using PyTorch\n• Implemented causal self-attention mechanisms and byte-pair encoding\n• Achieved stable training convergence with optimized attention patterns\n• Demonstrates deep understanding of transformer architectures\n\n**2. LifeCheck - AI Health Assistant**\n• Developed an AI-driven health prediction system\n• Built with Python, Scikit-learn, and Streamlit\n• Implemented Random Forest models for diagnosis\n• Created interactive UI for symptom analysis\n• Included user authentication and personalized insights\n\nThese projects showcase his ability to implement complex ML architectures and create end-to-end AI applications.",
        confidence: 0.92,
        followUpSuggestions: [
          "What technical challenges did Aswin solve in the GPT-2 project?",
          "Tell me more about the LifeCheck health prediction accuracy",
          "Has Aswin published any of his project work?"
        ]
      },
      'education': {
        content: "Aswin has a strong educational background:\n\n**Master of Science in Data Science**\n• DePaul University, Chicago, Illinois\n• Completed: March 2023\n• Focused on advanced ML, deep learning, and statistical analysis\n\n**Bachelor of Engineering in Information Technology**\n• CVR College of Engineering, Telangana, India\n• Completed: June 2019\n• Foundation in computer science and software engineering\n\nHis education provides a solid theoretical foundation that complements his practical experience in ML and AI.",
        confidence: 0.96,
        followUpSuggestions: [
          "What specific courses or research did Aswin focus on during his Master's?",
          "How has Aswin's education influenced his approach to ML projects?",
          "Did Aswin work on any research projects during his studies?"
        ]
      }
    }
    
    // Determine response based on query keywords
    const queryLower = query.toLowerCase()
    let response = responses['skills'] // default
    
    if (queryLower.includes('experience') || queryLower.includes('work')) {
      response = responses['experience']
    } else if (queryLower.includes('project')) {
      response = responses['projects']
    } else if (queryLower.includes('education') || queryLower.includes('degree')) {
      response = responses['education']
    } else if (queryLower.includes('skill') || queryLower.includes('technology')) {
      response = responses['skills']
    }
    
    // Generic response for other queries
    if (!Object.keys(responses).some(key => queryLower.includes(key))) {
      response = {
        content: `I can help you learn about Aswin's qualifications. Based on his resume, he is a Data Scientist with 4+ years of experience specializing in Machine Learning, NLP, and AI systems. He currently works at DUTA where he builds intelligent chatbots and vector database systems. Would you like to know more about his specific skills, experience, or projects?`,
        confidence: 0.85,
        followUpSuggestions: [
          "What are Aswin's main technical skills?",
          "Tell me about Aswin's current role at DUTA",
          "What kind of ML projects has Aswin worked on?"
        ]
      }
    }
    
    return response
  }
}

export default function ResumeRAGChatbot() {
  // State management
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Aswin's AI assistant. I can help you learn about his experience, skills, and projects. What would you like to know?",
      timestamp: new Date(),
      followUpSuggestions: [
        "What are Aswin's main technical skills?",
        "Tell me about Aswin's work experience",
        "What ML projects has Aswin worked on?"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const vectorDB = useRef(new VectorDatabase())
  
  // Initialize vector database with resume
  useEffect(() => {
    const initializeDB = async () => {
      const resumeDoc: Document = {
        id: 'resume-1',
        name: 'AswinKumarGuvvala_Resume',
        content: ASWIN_RESUME_CONTENT,
        type: 'resume'
      }
      await vectorDB.current.addDocument(resumeDoc)
    }
    initializeDB()
  }, [])
  
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    
    try {
      // Retrieve relevant context
      const relevantChunks = await vectorDB.current.search(inputValue, 5)
      
      // Generate response
      const response = await mockOpenAI.generateResponse(
        inputValue,
        relevantChunks,
        messages
      )
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        sources: relevantChunks,
        confidence: response.confidence,
        followUpSuggestions: response.followUpSuggestions
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error generating response:', error)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }
  
  // Handle voice input
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition is not supported in your browser')
      return
    }
    
    const recognition = new (window as any).webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    
    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInputValue(transcript)
    }
    
    recognition.start()
  }
  
  // Handle text-to-speech
  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    
    window.speechSynthesis.speak(utterance)
  }
  
  // Export conversation
  const exportConversation = () => {
    const conversationText = messages
      .map(m => `${m.role.toUpperCase()}: ${m.content}`)
      .join('\n\n')
    
    const blob = new Blob([conversationText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `aswin-chat-${new Date().toISOString()}.txt`
    a.click()
  }
  
  // Copy message
  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }
  
  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-shadow duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        <MessageSquare size={24} className="text-white" />
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-[400px] h-[600px] max-w-[90vw] max-h-[80vh] bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-700/50 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <Bot size={20} className="text-white" />
                    </div>
                    <motion.div
                      className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Aswin's AI Assistant</h3>
                    <p className="text-xs text-gray-400">Powered by RAG</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Settings size={18} className="text-gray-400" />
                  </motion.button>
                  <motion.button
                    onClick={exportConversation}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download size={18} className="text-gray-400" />
                  </motion.button>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={18} className="text-gray-400" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`p-3 rounded-xl ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'bg-gray-800/50 text-gray-100 border border-gray-700/50'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      
                      {/* Confidence Indicator */}
                      {message.confidence && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Zap size={12} className="text-yellow-400" />
                            <span className="text-xs text-gray-400">
                              {Math.round(message.confidence * 100)}% confident
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Message Actions */}
                    <div className="flex items-center gap-2 mt-1 px-1">
                      <motion.button
                        onClick={() => copyMessage(message.content)}
                        className="p-1 rounded hover:bg-white/10 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Copy size={12} className="text-gray-400" />
                      </motion.button>
                      {message.role === 'assistant' && (
                        <motion.button
                          onClick={() => handleSpeak(message.content)}
                          className="p-1 rounded hover:bg-white/10 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isSpeaking ? (
                            <VolumeX size={12} className="text-gray-400" />
                          ) : (
                            <Volume2 size={12} className="text-gray-400" />
                          )}
                        </motion.button>
                      )}
                    </div>
                    
                    {/* Follow-up Suggestions */}
                    {message.followUpSuggestions && (
                      <div className="mt-3 space-y-1">
                        {message.followUpSuggestions.map((suggestion, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => setInputValue(suggestion)}
                            className="block w-full text-left text-xs p-2 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            <ChevronDown size={12} className="inline mr-1 -rotate-90" />
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* Loading */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-gray-400"
                >
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Searching Aswin's knowledge base...</span>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700/50">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about Aswin's experience..."
                  className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <motion.button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/10 text-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </motion.button>
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} className="text-white" />
                </motion.button>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                <FileText size={12} />
                <span>Analyzing: Resume, Projects, Skills</span>
                <span className="ml-auto flex items-center gap-1">
                  <Brain size={12} className="text-green-400" />
                  RAG Active
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 