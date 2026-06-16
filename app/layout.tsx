import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LeadCaptureWrapper } from '@/components/lead-capture-wrapper'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Spark Website | The Engine of Your Solar Growth',
  description:
    'Stop building websites. Start automating growth. Spark Website is a high-performance platform built on React and Edge Cloud infrastructure that delivers the presence of a $100M brand and the power of a growth engine for solar dealers, installers, and brands.',
  generator: 'v0.app',
  keywords: [
    'solar website design',
    'solar lead generation',
    'solar marketing platform',
    'solar CRM',
    'solar dealer website',
    'solar installer software',
    'AI solar SEO',
  ],
  openGraph: {
    title: 'Spark Website | The Engine of Your Solar Growth',
    description:
      'A high-performance growth ecosystem for solar dealers, installers, and brands. Built on React and Edge Cloud infrastructure.',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#112240',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geist.variable} ${geistMono.variable} bg-background`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased selection:bg-secondary selection:text-primary">
        <LeadCaptureWrapper>
          {children}
        </LeadCaptureWrapper>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
