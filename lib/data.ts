// Portfolio data and types
export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  imageUrl: string
  category: 'machine-learning' | 'web-development' | 'data-science'
  featured: boolean
  duration: string
  teamSize: number
  status: 'completed' | 'in-progress' | 'planned'
}

export interface Experience {
  company: string
  position: string
  duration: string
  location: string
  description: string[]
  technologies: string[]
  logo?: string
}

export interface Skill {
  name: string
  level: number // 1-5
  category: 'languages' | 'frameworks' | 'tools' | 'databases' | 'cloud'
}

// Sample projects data
export const projects: Project[] = [
  {
    id: 'gpt2-reproduction',
    title: 'GPT-2 Architecture Reproduction',
    description: 'Full reproduction of GPT-2 transformer architecture from scratch using PyTorch',
    longDescription: 'Built a complete GPT-2 implementation from the ground up to understand transformer architectures. Includes custom attention mechanisms, positional encoding, and training pipeline with distributed training support.',
    technologies: ['Python', 'PyTorch', 'Transformers', 'CUDA', 'Weights & Biases'],
    githubUrl: 'https://github.com/aswin-kumar-guvvala/gpt2-reproduction',
    imageUrl: '/projects/gpt2.jpg',
    category: 'machine-learning',
    featured: true,
    duration: '6 months',
    teamSize: 1,
    status: 'completed'
  },
  {
    id: 'lifecheck-ai',
    title: 'LifeCheck AI Health Prediction',
    description: 'AI-powered health prediction system using Random Forest algorithms',
    longDescription: 'Developed a comprehensive health prediction platform that analyzes symptoms and provides personalized health insights. Features interactive Streamlit interface and SQLite database integration.',
    technologies: ['Python', 'Scikit-learn', 'Streamlit', 'SQLite', 'Pandas', 'Matplotlib'],
    githubUrl: 'https://github.com/aswin-kumar-guvvala/lifecheck-ai',
    liveUrl: 'https://lifecheck-ai.herokuapp.com',
    imageUrl: '/projects/lifecheck.jpg',
    category: 'machine-learning',
    featured: true,
    duration: '8 months',
    teamSize: 3,
    status: 'completed'
  },
  {
    id: 'portfolio-website',
    title: 'AI/ML Portfolio Website',
    description: 'Modern portfolio website showcasing AI/ML projects with interactive demos',
    longDescription: 'Built with Next.js 13+ and TypeScript, featuring glassmorphism design, interactive project demonstrations, and responsive layouts. Includes case study components and performance visualizations.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React'],
    githubUrl: 'https://github.com/aswin-kumar-guvvala/portfolio',
    liveUrl: 'https://aswin-portfolio.vercel.app',
    imageUrl: '/projects/portfolio.jpg',
    category: 'web-development',
    featured: false,
    duration: '2 months',
    teamSize: 1,
    status: 'completed'
  }
]

// Experience data
export const experiences: Experience[] = [
  {
    company: 'DUTA (Delhi University Teachers Association)',
    position: 'Data Scientist',
    duration: '2023 - Present',
    location: 'Delhi, India',
    description: [
      'Developing machine learning models for educational data analysis',
      'Building predictive analytics dashboards for academic performance tracking',
      'Implementing natural language processing solutions for document analysis',
      'Collaborating with academic researchers on data-driven insights'
    ],
    technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas', 'SQL', 'Power BI']
  },
  {
    company: 'Freelance AI/ML Projects',
    position: 'Machine Learning Engineer',
    duration: '2022 - 2023',
    location: 'Remote',
    description: [
      'Developed custom ML solutions for various clients',
      'Built end-to-end machine learning pipelines',
      'Created data visualization dashboards and reports',
      'Provided AI consulting and technical guidance'
    ],
    technologies: ['Python', 'PyTorch', 'Streamlit', 'AWS', 'Docker', 'Git']
  }
]

// Skills data
export const skills: Skill[] = [
  // Languages
  { name: 'Python', level: 5, category: 'languages' },
  { name: 'JavaScript', level: 4, category: 'languages' },
  { name: 'TypeScript', level: 4, category: 'languages' },
  { name: 'SQL', level: 4, category: 'languages' },
  { name: 'R', level: 3, category: 'languages' },
  
  // Frameworks & Libraries
  { name: 'PyTorch', level: 5, category: 'frameworks' },
  { name: 'TensorFlow', level: 4, category: 'frameworks' },
  { name: 'Scikit-learn', level: 5, category: 'frameworks' },
  { name: 'Next.js', level: 4, category: 'frameworks' },
  { name: 'React', level: 4, category: 'frameworks' },
  { name: 'Streamlit', level: 5, category: 'frameworks' },
  
  // Tools
  { name: 'Git', level: 4, category: 'tools' },
  { name: 'Docker', level: 3, category: 'tools' },
  { name: 'Jupyter', level: 5, category: 'tools' },
  { name: 'VS Code', level: 5, category: 'tools' },
  
  // Databases
  { name: 'PostgreSQL', level: 4, category: 'databases' },
  { name: 'SQLite', level: 4, category: 'databases' },
  { name: 'MongoDB', level: 3, category: 'databases' },
  
  // Cloud
  { name: 'AWS', level: 3, category: 'cloud' },
  { name: 'Heroku', level: 4, category: 'cloud' },
  { name: 'Vercel', level: 4, category: 'cloud' }
]

// Education data
export const education = [
  {
    degree: 'Master of Science in Data Science',
    institution: 'University of Delhi',
    duration: '2021 - 2023',
    description: 'Specialized in Machine Learning, Deep Learning, and Statistical Analysis'
  },
  {
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'Delhi Technological University',
    duration: '2017 - 2021',
    description: 'Foundation in Computer Science, Algorithms, and Software Development'
  }
]

// Certifications
export const certifications = [
  {
    name: 'Machine Learning Specialization',
    issuer: 'Stanford University (Coursera)',
    date: '2022',
    credentialUrl: 'https://coursera.org/verify/specialization/certificate'
  },
  {
    name: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI (Coursera)',
    date: '2022',
    credentialUrl: 'https://coursera.org/verify/specialization/certificate'
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2023',
    credentialUrl: 'https://aws.amazon.com/verification'
  }
]

// Personal information
export const personalInfo = {
  name: 'Aswin Kumar Guvvala',
  title: 'Data Scientist & ML Engineer',
  email: 'aswin.guvvala@example.com',
  phone: '+91 98765 43210',
  location: 'Delhi, India',
  github: 'https://github.com/aswin-kumar-guvvala',
  linkedin: 'https://linkedin.com/in/aswin-kumar-guvvala',
  website: 'https://aswin-portfolio.vercel.app',
  bio: 'Passionate Data Scientist with expertise in Machine Learning, Deep Learning, and AI solutions. Currently working at DUTA, developing innovative ML models for educational analytics. Strong background in Python, PyTorch, and building end-to-end ML pipelines.'
}

export default {
  projects,
  experiences,
  skills,
  education,
  certifications,
  personalInfo
} 