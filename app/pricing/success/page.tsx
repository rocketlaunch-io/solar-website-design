'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState, Suspense } from 'react'
import { SparkLogo } from '@/components/spark-logo'
import { ShieldCheck, Calendar, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'Business'
  const method = searchParams.get('method') || 'card'
  const sessionId = searchParams.get('session_id') || 'subscription pending'

  const [logs, setLogs] = useState<string[]>([])
  const [logIndex, setLogIndex] = useState(0)

  const nextBillingDate = new Date()
  nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)
  const formattedDate = nextBillingDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const logLines = [
    `Preparing your Spark Solar ${plan} workspace.`,
    method === 'ach'
      ? 'Bank account authorization received.'
      : 'Payment authorization received.',
    'Subscription details confirmed.',
    `Subscription reference: ${sessionId}`,
    'First monthly platform subscription activated.',
    `Next monthly renewal scheduled for ${formattedDate}.`,
    'Creating your onboarding workspace.',
    'Preparing CRM and lead-routing setup.',
    'Preparing analytics and reporting configuration.',
    'Preparing launch resources.',
    'Spark onboarding workspace is ready.',
  ].filter(Boolean)

  useEffect(() => {
    if (logIndex < logLines.length) {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, logLines[logIndex]])
        setLogIndex((prev) => prev + 1)
      }, 450)
      return () => clearTimeout(timer)
    }
  }, [logIndex, logLines.length])

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center relative z-10 text-center space-y-8">
      {/* Success Badge */}
      <div className="relative">
        <div className="h-20 w-20 rounded-full bg-energy-emerald/10 border border-energy-emerald/30 flex items-center justify-center text-energy-emerald">
          <CheckCircle className="h-10 w-10 text-energy-emerald" />
        </div>
        <div className="absolute -top-1 -right-1 h-5 w-5 bg-solar-amber rounded-full flex items-center justify-center text-[10px] text-primary-foreground font-bold border-2 border-background">
          ⚡
        </div>
      </div>

      <div className="space-y-3 max-w-xl">
        <div className="text-xs font-bold uppercase tracking-widest text-energy-emerald">
          Deployment Successful
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-none">
          Ecosystem Activated
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Welcome to the elite class of solar growth. We have processed your setup and first monthly subscription payment, and are provisioning your performance-first edge workspace.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-edge-navy-deep border border-outline-variant/20 rounded-2xl p-5 shadow-2xl text-left relative overflow-hidden font-mono text-xs text-white/95">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4 text-white/60">
          <CheckCircle className="h-4.5 w-4.5 text-solar-amber" />
          <span className="font-semibold tracking-wide uppercase text-[10px]">Account Setup Progress</span>
        </div>

        <div className="space-y-2.5 min-h-[250px] overflow-y-auto max-h-[280px]">
          {logs.map((log, idx) => {
            const isComplete = idx === logs.length - 1 && log.includes('ready')
            const colorClass = isComplete ? 'text-energy-emerald font-semibold' : 'text-white/70'
            return (
              <div key={idx} className="flex gap-2">
                <span className="text-white/30 font-semibold shrink-0">{(idx + 1).toString().padStart(2, '0')}</span>
                <span className={colorClass}>{log}</span>
              </div>
            )
          })}
          {logIndex < logLines.length && (
            <div className="flex items-center gap-2 text-white/40">
              <span className="text-white/30 shrink-0">{(logs.length + 1).toString().padStart(2, '0')}</span>
              <Loader2 className="h-3 w-3 animate-spin text-accent" />
              <span>Configuring platform...</span>
            </div>
          )}
        </div>
      </div>

      {/* Subscription Info Card */}
      <div className="w-full max-w-2xl bg-card border border-border/80 rounded-3xl p-6 md:p-8 shadow-sm text-left grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden">
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-foreground">Workspace Details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between md:block">
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Plan Name</div>
              <div className="text-sm font-bold text-foreground mt-0.5">{plan}</div>
            </div>
            <div className="flex justify-between md:block">
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Payment Status</div>
              <div className="text-xs font-semibold text-energy-emerald flex items-center gap-1 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-energy-emerald animate-pulse" />
                Active ({method.toUpperCase()})
              </div>
            </div>
            <div className="flex justify-between md:block">
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Subscription Reference</div>
              <div className="text-xs text-foreground font-mono mt-0.5 truncate max-w-[200px]" title={sessionId}>
                {sessionId}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 border-t border-border md:border-t-0 md:border-l md:pl-6 pt-6 md:pt-0 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-bold text-foreground">Billing Calendar</h3>
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <Calendar className="h-4.5 w-4.5 text-accent shrink-0" />
              <span>Next Renewal: <strong className="text-foreground">{formattedDate}</strong></span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-4.5 w-4.5 text-energy-emerald shrink-0" />
              <span>Your first month is active and the next renewal is scheduled above.</span>
            </div>
          </div>

          <div className="pt-4 md:pt-0">
            <Link
              href="/signin"
              className="w-full bg-secondary hover:bg-solar-amber-bright text-secondary-foreground py-3.5 px-4 rounded-xl text-xs font-extrabold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              Sign In to Workspace
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="border-b border-border/80 bg-card/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-4 flex items-center justify-between">
          <Link href="/">
            <SparkLogo />
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-energy-emerald uppercase border border-energy-emerald/20 rounded-full py-1 px-3.5 bg-energy-emerald/5">
            <span className="inline-block h-2 w-2 rounded-full bg-energy-emerald animate-pulse" />
            Payment Verified
          </div>
        </div>
      </div>

      <main className="flex-grow flex items-center justify-center">
        <Suspense fallback={
          <div className="min-h-[60vh] w-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        }>
          <SuccessPageContent />
        </Suspense>
      </main>

      <div className="border-t border-border/60 bg-card py-6 text-center text-xs text-muted-foreground">
        © 2026 Spark growth platform. Deployment status: Operational.
      </div>
    </div>
  )
}
