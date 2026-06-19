'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { SparkLogo } from '@/components/spark-logo'
import { AlertCircle, ArrowLeft, Mail } from 'lucide-react'

function CancelPageContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'Business'

  return (
    <div className="w-full max-w-md mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center text-center space-y-6">
      <div className="h-16 w-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
        <AlertCircle className="h-8 w-8 text-accent" />
      </div>

      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-extrabold text-foreground tracking-tight">
          Checkout Canceled
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Your transaction for the <strong className="text-foreground">{plan} Plan</strong> was not completed, and no charges have been made.
        </p>
      </div>

      <div className="w-full bg-card border border-border/80 rounded-2xl p-5 text-sm text-muted-foreground leading-relaxed text-left space-y-3">
        <p>
          Need custom pricing or a tailored SLA agreement? Our growth engineers can build a custom architecture that integrates with your CRM, VOIP provider, and API pipelines.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 text-accent font-bold hover:underline"
        >
          <Mail className="h-4 w-4 shrink-0" />
          Talk to a Growth Engineer
        </Link>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full">
        <Link
          href="/pricing"
          className="flex-1 bg-secondary hover:bg-solar-amber-bright text-secondary-foreground py-3.5 px-4 rounded-xl text-xs font-extrabold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Pricing
        </Link>
        <Link
          href="/"
          className="flex-1 border border-border text-foreground hover:bg-surface-container py-3.5 px-4 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center justify-center cursor-pointer uppercase tracking-wider"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default function CancelPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="border-b border-border/80 bg-card/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-4 flex items-center justify-between">
          <Link href="/">
            <SparkLogo />
          </Link>
          <div className="text-xs font-bold text-muted-foreground uppercase border border-border rounded-full py-1 px-3.5 bg-muted/20">
            Transaction Suspended
          </div>
        </div>
      </div>

      <main className="flex-grow flex items-center justify-center">
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
          </div>
        }>
          <CancelPageContent />
        </Suspense>
      </main>

      <div className="border-t border-border/60 bg-card py-6 text-center text-xs text-muted-foreground">
        © 2026 Spark growth platform. All rights reserved.
      </div>
    </div>
  )
}
