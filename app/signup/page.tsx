'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { SparkLogo } from '@/components/spark-logo'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    // Simulate signup request
    setTimeout(() => {
      setIsLoading(false)
      if (!email.includes('@')) {
        setError('Please enter a valid business email.')
      } else {
        alert('Account created successfully (Mock Auth)!')
      }
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Left Pane - Image & Branding (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 relative bg-edge-navy-deep overflow-hidden flex-col justify-between p-12 lg:p-16">
        {/* Background Image */}
        <Image
          src="/images/modern-solar-home.png"
          alt="Modern luxury home with integrated rooftop solar panels"
          fill
          priority
          className="object-cover opacity-70 mix-blend-luminosity scale-105 transition-transform duration-10000 hover:scale-100"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-edge-navy-deep via-edge-navy-deep/80 to-transparent z-10" />

        {/* Top Logo */}
        <div className="relative z-20">
          <Link href="/" className="inline-block">
            <SparkLogo />
          </Link>
        </div>

        {/* Bottom Testimonial */}
        <div className="relative z-20 max-w-lg mt-auto">
          <div className="glass-panel-dark rounded-2xl p-6 border border-white/10 backdrop-blur-md">
            <div className="flex gap-1 text-solar-amber mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <p className="text-white/95 text-base font-medium leading-relaxed italic">
              "Deploying on Spark was the easiest infrastructure choice we made. We went live in hours and saw page speed improvements instantly."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-energy-emerald/20 flex items-center justify-center font-bold text-energy-emerald text-sm border border-energy-emerald/40">
                MK
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Marcus Vance</p>
                <p className="text-xs text-white/60">CTO, SolarLogix EPC</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Form Card */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 md:px-12 lg:px-20 bg-gradient-to-b from-surface via-surface-container-low to-surface-container">
        {/* Mobile Header Logo */}
        <div className="md:hidden mb-8 self-start">
          <Link href="/">
            <SparkLogo />
          </Link>
        </div>

        <div className="w-full max-w-md">
          <div className="text-left mb-6">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
              Create Your Free Account
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Launch your growth engine and connect with the Spark platform today.
            </p>
          </div>

          {/* Social Auth Grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              onClick={() => alert('SSO with Google initiated (Mock)')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-outline-variant/50 bg-background text-sm font-medium hover:bg-surface-container transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>
            <button
              onClick={() => alert('SSO with GitHub initiated (Mock)')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-outline-variant/50 bg-background text-sm font-medium hover:bg-surface-container transition-colors"
            >
              <svg className="h-4 w-4 fill-foreground" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-outline-variant/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gradient-to-b from-surface to-surface-container-low px-3 text-muted-foreground font-medium">Or sign up with email</span>
            </div>
          </div>

          {/* Alert Message */}
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20 font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Carter"
                className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/60 bg-background text-sm text-foreground focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none"
              />
            </div>

            <div>
              <label htmlFor="companyName" className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1">
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Apex Solar Solutions"
                className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/60 bg-background text-sm text-foreground focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1">
                Work Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/60 bg-background text-sm text-foreground focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/60 bg-background text-sm text-foreground focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none"
              />
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2.5 text-xs text-muted-foreground select-none cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="rounded border-outline-variant/60 text-secondary focus:ring-secondary h-4 w-4 mt-0.5"
                />
                <span className="leading-normal">
                  I agree to Spark&apos;s{' '}
                  <Link href="/terms" className="text-secondary font-semibold hover:underline">Terms of Service</Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-secondary font-semibold hover:underline">Privacy Policy</Link>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-secondary text-secondary-foreground py-3 px-4 rounded-lg text-sm font-semibold hover:bg-solar-amber-bright transition-colors shadow-md shadow-secondary/20 flex items-center justify-center gap-2 mt-3"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-secondary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/signin" className="text-secondary font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
