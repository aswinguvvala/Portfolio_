export const skills = {
    languages: [
      { name: 'Python', level: 95, category: 'Advanced' },
      { name: 'SQL', level: 90, category: 'Advanced' },
      { name: 'R', level: 75, category: 'Intermediate' },
      { name: 'JavaScript', level: 70, category: 'Intermediate' },
    ],
    frameworks: [
      { name: 'TensorFlow', level: 85 },
      { name: 'PyTorch', level: 85 },
      { name: 'Scikit-learn', level: 90 },
      { name: 'Keras', level: 80 },
      { name: 'FastAPI', level: 85 },
    ],
    tools: [
      'AWS SageMaker',
      'Docker',
      'Git',
      'Tableau',
      'Vector Databases',
      'OpenAI API',
      'Hugging Face',
      'FAISS',
    ],
  }
  
  export const experience = [
    {
      title: 'Data Scientist',
      company: 'DUTA',
      period: 'May 2023 - Present',
      description: 'Leading AI/ML initiatives including chatbot development, NLP systems, and recommendation engines.',
      achievements: [
        'Architected FastAPI-based intelligent chatbot with 85% query satisfaction',
        'Developed FAISS vector database with sub-millisecond query response',
        'Led team to deploy news summarization system achieving 0.75 ROUGE score',
        'Implemented collaborative filtering recommendation system',
      ],
    },
    {
      title: 'Data Scientist',
      company: 'Cauvery Software Solutions',
      period: 'April 2019 - November 2020',
      description: 'Developed ML models for customer analytics and business intelligence.',
      achievements: [
        'Built sentiment analysis models with 82% accuracy',
        'Increased website engagement by 14% with recommendation systems',
        'Developed predictive churn models with 78% accuracy',
        'Reduced inventory costs by 12% through sales forecasting',
      ],
    },
  ]
  
  export const projects = [
    {
      title: 'GPT-2 Paper Reproduction',
      description: 'Implemented a GPT-2 clone based on nanoGPT architecture with causal self-attention mechanisms.',
      tags: ['PyTorch', 'Transformers', 'NLP', 'Deep Learning'],
      github: 'https://github.com/aswinguvvala',
      demo: null,
      highlights: [
        'Built streamlined transformer model',
        'Integrated byte-pair encoding tokenization',
        'Achieved stable training convergence',
      ],
    },
    {
      title: 'LifeCheck - AI Health Assistant',
      description: 'AI-driven health prediction system with interactive UI for symptom analysis and health insights.',
      tags: ['Python', 'Scikit-learn', 'Streamlit', 'SQLite'],
      github: 'https://github.com/aswinguvvala',
      demo: 'https://lifecheck.demo',
      highlights: [
        'Developed health prediction system',
        'Built interactive Streamlit UI',
        'Implemented Random Forest models',
        'Created personalized health insights',
      ],
    },
    {
      title: 'News Summarization System',
      description: 'End-to-end news summarization using T5 transformer models, deployed on AWS SageMaker.',
      tags: ['T5', 'AWS SageMaker', 'NLP', 'Python'],
      github: 'https://github.com/aswinguvvala',
      demo: null,
      highlights: [
        'Trained on 10M rows of news data',
        'Achieved 0.75 ROUGE score',
        '59% improvement in accuracy',
      ],
    },
  ]