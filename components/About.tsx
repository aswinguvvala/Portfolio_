'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import GlassCard from './ui/GlassCard'

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <GlassCard>
              <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
              <p className="text-muted-foreground mb-4">
                I&apos;m a passionate Data Scientist and AI/ML Engineer with expertise in building 
                intelligent systems that solve real-world problems. With a Master&apos;s in Data Science 
                from DePaul University, I specialize in deep learning, NLP, and generative AI.
              </p>
              <p className="text-muted-foreground">
                Currently, I&apos;m architecting cutting-edge AI solutions at DUTA, where I lead 
                development of intelligent chatbots, recommendation systems, and NLP applications 
                that deliver measurable business impact.
              </p>
            </GlassCard>

            <GlassCard>
              <h3 className="text-2xl font-semibold mb-4">What I Do</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-muted-foreground">
                    Design and implement end-to-end ML pipelines using TensorFlow and PyTorch
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-muted-foreground">
                    Build intelligent conversational AI systems with OpenAI GPT-4 integration
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-muted-foreground">
                    Develop scalable NLP solutions for text generation and analysis
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-muted-foreground">
                    Create data-driven insights through advanced analytics and visualization
                  </span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </section>
  )
}