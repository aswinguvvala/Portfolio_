import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navigation from '@/components/Navigation'
import ResumeRAGChatbot from '@/components/ResumeRAGChatbot'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk'
})

const jetBrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://aswinguvvala.com'),
  title: {
    default: 'Aswin Kumar Guvvala - AI/ML Engineer',
    template: '%s | Aswin Kumar Guvvala'
  },
  description: 'Senior AI/ML Engineer specializing in Neural Networks, Computer Vision, and Deep Learning. Creating intelligent systems that bridge human intuition with machine precision.',
  keywords: [
    'AI Engineer',
    'Machine Learning',
    'Neural Networks', 
    'Computer Vision',
    'Deep Learning',
    'Python',
    'TensorFlow',
    'PyTorch',
    'Data Science',
    'AI Portfolio',
    'Aswin Kumar Guvvala'
  ],
  authors: [{ name: 'Aswin Kumar Guvvala' }],
  creator: 'Aswin Kumar Guvvala',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aswinguvvala.com',
    siteName: 'Aswin Kumar Guvvala - AI Portfolio',
    title: 'Aswin Kumar Guvvala - AI/ML Engineer',
    description: 'Senior AI/ML Engineer specializing in Neural Networks and Deep Learning',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aswin Kumar Guvvala - AI/ML Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aswin Kumar Guvvala - AI/ML Engineer',
    description: 'Senior AI/ML Engineer specializing in Neural Networks and Deep Learning',
    images: ['/og-image.jpg'],
    creator: '@aswinguvvala',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} scroll-smooth`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} scroll-container hide-scrollbar`}>
        <div className="min-h-screen overflow-x-hidden">
          <Providers>
            <Navigation />
            <main className="relative z-0">
              {children}
            </main>
            <ResumeRAGChatbot />
          </Providers>
        </div>
      </body>
    </html>
  )
}