'use client'

import React, { useState, useEffect } from 'react'

interface SparkLeadWizardProps {
  theme?: 'light' | 'dark'
  onSuccess?: (formData: Record<string, string>) => void
  onClose?: () => void
}

const businessTypes = [
  { id: 'dealer', label: 'Solar Dealer (Sales Only)', icon: 'sell' },
  { id: 'installer', label: 'EPC / Installer (Sales + Install)', icon: 'build' },
  { id: 'brand', label: 'Solar Brand / Manufacturer', icon: 'factory' },
  { id: 'broker', label: 'Energy Broker / Agency', icon: 'account_tree' },
]

const leadVolumes = [
  { id: '0-50', label: 'Under 50 leads/month', icon: 'trending_flat' },
  { id: '51-200', label: '50 - 200 leads/month', icon: 'trending_up' },
  { id: '201-500', label: '201 - 500 leads/month', icon: 'show_chart' },
  { id: '500+', label: 'Over 500 leads/month', icon: 'insights' },
]

const websitePlatforms = [
  { id: 'wordpress', label: 'WordPress (or similar CMS)', icon: 'code_off' },
  { id: 'webflow', label: 'Webflow / Wix / Squarespace', icon: 'web' },
  { id: 'custom', label: 'Custom React / HTML Site', icon: 'code' },
  { id: 'none', label: 'No Website / Under Construction', icon: 'domain_disabled' },
]

export function SparkLeadWizard({
  theme = 'light',
  onSuccess,
  onClose,
}: SparkLeadWizardProps) {
  const [step, setStep] = useState(1)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [loadingProgress, setLoadingProgress] = useState(0)

  const [formData, setFormData] = useState({
    businessType: '',
    leadVolume: '',
    currentPlatform: '',
    companyName: '',
    websiteUrl: '',
    zipCode: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  // Simulated B2B CRM syncing progress
  useEffect(() => {
    if (step === 6) {
      setLoadingProgress(0)
      const messages = [
        'Analyzing current website performance...',
        'Compiling local solar search competition data...',
        'Connecting to Spark CRM Bridge...',
        'Configuring custom React edge template...',
        'Generating solar dealer conversion strategy audit...',
      ]
      
      let msgIdx = 0
      setLoadingMessage(messages[0])

      const interval = setInterval(() => {
        msgIdx++
        if (msgIdx < messages.length) {
          setLoadingMessage(messages[msgIdx])
        }
      }, 700)

      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            clearInterval(interval)
            setTimeout(() => setStep(7), 300) // Go to success screen
            return 100
          }
          return prev + 5
        })
      }, 150)

      return () => {
        clearInterval(interval)
        clearInterval(progressInterval)
      }
    }
  }, [step])

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(6) // Go to B2B syncing step
    if (onSuccess) {
      onSuccess(formData)
    }
  }

  const isLight = theme === 'light'

  // Class definitions matching Spark Design Aesthetics
  const containerClasses = 'w-full flex flex-col justify-between h-full'
  const headingClasses = isLight 
    ? 'text-2xl font-heading font-bold text-foreground tracking-tight' 
    : 'text-2xl font-heading font-bold text-white tracking-tight'
  
  const subtextClasses = 'text-sm text-muted-foreground leading-relaxed'
  const labelClasses = 'text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground'
  
  const inputClasses = isLight
    ? 'w-full px-4 py-3 rounded-xl border border-outline-variant bg-white text-foreground focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 font-semibold transition-all text-sm'
    : 'w-full px-4 py-3 rounded-xl border border-white/10 bg-white/10 text-white placeholder-white/30 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 font-semibold transition-all text-sm'

  const optionButtonClasses = (selected: boolean) => {
    return cn(
      'w-full text-left px-5 py-4 rounded-xl border-2 text-sm font-semibold transition-all flex items-center justify-between cursor-pointer group',
      selected
        ? 'bg-secondary/15 border-secondary text-primary shadow-sm scale-[1.01]'
        : isLight
          ? 'bg-white text-foreground border-outline-variant/60 hover:border-secondary/50 hover:bg-surface-container-low'
          : 'bg-white/5 text-white border-white/10 hover:border-secondary/50 hover:bg-white/10'
    )
  }

  const primaryButtonClasses = 'w-full bg-secondary text-secondary-foreground hover:bg-solar-amber-bright font-bold py-4 rounded-xl transition-all text-sm shadow-md shadow-secondary/20 disabled:opacity-40 disabled:cursor-not-allowed mt-4 cursor-pointer flex items-center justify-center gap-2'
  const backButtonClasses = 'text-xs text-muted-foreground hover:text-foreground hover:underline mt-4 self-center font-semibold cursor-pointer'

  const stepLabels = [
    'Business Type',
    'Scale',
    'Platform',
    'Company',
    'Contact',
  ]

  return (
    <div className={containerClasses}>
      {/* Progress Header */}
      {step < 6 && (
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex justify-between text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground">
            <span>Step {step} of 5: {stepLabels[step - 1]}</span>
            <span>{Math.round(((step - 1) / 5) * 100)}% Complete</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden bg-outline-variant/40">
            <div
              className="h-full transition-all duration-500 rounded-full bg-gradient-to-r from-secondary to-solar-amber-bright"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step 1: Business Type */}
      {step === 1 && (
        <div className="flex flex-col gap-4 flex-grow justify-center">
          <div>
            <h2 className={headingClasses}>What type of solar business do you run?</h2>
            <p className={subtextClasses + ' mt-1'}>
              Select the category that best describes your organization.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2.5 mt-2">
            {businessTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setFormData({ ...formData, businessType: type.label })
                  handleNext()
                }}
                className={optionButtonClasses(formData.businessType === type.label)}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg text-secondary group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {type.icon}
                  </span>
                  <span>{type.label}</span>
                </div>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  formData.businessType === type.label
                    ? 'border-secondary bg-secondary text-secondary-foreground'
                    : 'border-outline-variant'
                }`}>
                  {formData.businessType === type.label && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Lead Volume */}
      {step === 2 && (
        <div className="flex flex-col gap-4 flex-grow justify-center">
          <div>
            <h2 className={headingClasses}>What is your average monthly lead volume?</h2>
            <p className={subtextClasses + ' mt-1'}>
              This helps us recommend the correct infrastructure scale for your CRM bridge.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2.5 mt-2">
            {leadVolumes.map((vol) => (
              <button
                key={vol.id}
                onClick={() => {
                  setFormData({ ...formData, leadVolume: vol.label })
                  handleNext()
                }}
                className={optionButtonClasses(formData.leadVolume === vol.label)}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg text-secondary group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {vol.icon}
                  </span>
                  <span>{vol.label}</span>
                </div>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  formData.leadVolume === vol.label
                    ? 'border-secondary bg-secondary text-secondary-foreground'
                    : 'border-outline-variant'
                }`}>
                  {formData.leadVolume === vol.label && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </span>
              </button>
            ))}
          </div>
          <button onClick={handleBack} className={backButtonClasses}>
            &larr; Go Back
          </button>
        </div>
      )}

      {/* Step 3: Current Platform */}
      {step === 3 && (
        <div className="flex flex-col gap-4 flex-grow justify-center">
          <div>
            <h2 className={headingClasses}>What is your current website platform?</h2>
            <p className={subtextClasses + ' mt-1'}>
              We provide seamless migrations from all standard systems.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2.5 mt-2">
            {websitePlatforms.map((plat) => (
              <button
                key={plat.id}
                onClick={() => {
                  setFormData({ ...formData, currentPlatform: plat.label })
                  handleNext()
                }}
                className={optionButtonClasses(formData.currentPlatform === plat.label)}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg text-secondary group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {plat.icon}
                  </span>
                  <span>{plat.label}</span>
                </div>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  formData.currentPlatform === plat.label
                    ? 'border-secondary bg-secondary text-secondary-foreground'
                    : 'border-outline-variant'
                }`}>
                  {formData.currentPlatform === plat.label && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </span>
              </button>
            ))}
          </div>
          <button onClick={handleBack} className={backButtonClasses}>
            &larr; Go Back
          </button>
        </div>
      )}

      {/* Step 4: Company Details */}
      {step === 4 && (
        <div className="flex flex-col gap-4 flex-grow justify-center">
          <div>
            <h2 className={headingClasses}>Tell us about your organization</h2>
            <p className={subtextClasses + ' mt-1'}>
              Provide your details so we can scan local SEO competitors.
            </p>
          </div>

          <div className="flex flex-col gap-3.5 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className={labelClasses}>Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Apex Solar Solutions"
                className={inputClasses}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClasses}>Current Website URL (Optional)</label>
              <input
                type="text"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="e.g. www.apexsolar.com"
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClasses}>Operational Headquarters Zip Code</label>
              <input
                type="text"
                maxLength={5}
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value.replace(/\D/g, '') })}
                placeholder="e.g. 84101"
                className={inputClasses}
                required
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!formData.companyName.trim() || formData.zipCode.length < 5}
            className={primaryButtonClasses}
          >
            <span>Continue</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>

          <button onClick={handleBack} className={backButtonClasses}>
            &larr; Go Back
          </button>
        </div>
      )}

      {/* Step 5: Contact Details */}
      {step === 5 && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow justify-center">
          <div>
            <h2 className={headingClasses}>Who should we send the proposal to?</h2>
            <p className={subtextClasses + ' mt-1'}>
              Enter your details to receive your customized solar site architecture preview.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3.5 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className={labelClasses}>First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="John"
                className={inputClasses}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClasses}>Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Doe"
                className={inputClasses}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClasses}>Business Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@apexsolar.com"
              className={inputClasses}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClasses}>Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(555) 555-5555"
              className={inputClasses}
              required
            />
          </div>

          <p className="text-[10px] leading-relaxed text-muted-foreground mt-2">
            By submitting, you authorize Spark Website to reach out regarding high-performance solar software. We respect your privacy and will never share your business details.
          </p>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-outline-variant/30">
            <button
              type="button"
              onClick={handleBack}
              className="text-xs text-muted-foreground hover:text-foreground hover:underline font-semibold cursor-pointer"
            >
              &larr; Back
            </button>
            <button type="submit" className="bg-secondary text-secondary-foreground hover:bg-solar-amber-bright font-bold px-8 py-3.5 rounded-xl transition-all text-sm shadow-md cursor-pointer flex items-center gap-1.5">
              Submit Request
              <span className="material-symbols-outlined text-base">bolt</span>
            </button>
          </div>
        </form>
      )}

      {/* Step 6: Syncing / Loading State */}
      {step === 6 && (
        <div className="flex flex-col gap-6 text-center justify-center flex-grow py-8">
          <div className="relative w-24 h-24 flex items-center justify-center mx-auto">
            {/* Outer pulsing ring */}
            <div className="absolute inset-0 rounded-full border-4 border-secondary/25 animate-pulse" style={{ animationDuration: '1.5s' }} />
            {/* Inner spinning ring */}
            <div className="absolute inset-2 rounded-full border-4 border-t-secondary border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '1s' }} />
            {/* Logo Center */}
            <span className="material-symbols-outlined text-secondary text-3xl animate-pulse" style={{ fontVariationSettings: "'FILL' 1'" }}>bolt</span>
          </div>
          <div className="flex flex-col gap-2.5">
            <h3 className={headingClasses}>Analyzing & Customizing</h3>
            <div className="w-full bg-outline-variant/40 h-2 rounded-full max-w-[280px] mx-auto overflow-hidden">
              <div className="bg-secondary h-full transition-all duration-150 rounded-full" style={{ width: `${loadingProgress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-2 h-8 animate-pulse">
              {loadingMessage}
            </p>
          </div>
        </div>
      )}

      {/* Step 7: B2B Thank You Screen */}
      {step === 7 && (
        <div className="flex flex-col gap-5 text-center py-4 justify-between h-full">
          <div className="flex flex-col gap-5 text-center">
            <div className="w-14 h-14 rounded-full bg-energy-emerald/15 flex items-center justify-center mx-auto text-energy-emerald">
              <span className="material-symbols-outlined text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className={headingClasses}>Audit Request Submitted!</h2>
              <p className={subtextClasses}>
                Thanks {formData.firstName}. We have initiated a website performance and local competitor SEO scan for <strong>{formData.companyName}</strong>. 
              </p>
            </div>

            <div className="p-4 rounded-xl border border-outline-variant/60 bg-surface-container-low text-left text-xs flex flex-col gap-2.5 mt-2">
              <span className="font-heading font-bold uppercase tracking-wider text-[10px] text-primary">
                Customized Projections:
              </span>
              <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                <span>Recommended Tier:</span>
                <span className="font-bold text-secondary">Velocity (React 19 + CRM)</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                <span>Speed Optimization:</span>
                <span className="font-bold text-energy-emerald">Lighthouse Score 99/100</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                <span>Conversion Increase:</span>
                <span className="font-bold text-energy-emerald">+35% to +50% (Est.)</span>
              </div>
              <div className="flex justify-between">
                <span>Competitor Scan:</span>
                <span className="font-semibold">Headquarters Zip {formData.zipCode}</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground text-center">
              Our solar growth architect will email the audit link and call to schedule a live CRM screen-share.
            </p>
          </div>

          <div className="mt-4">
            {onClose ? (
              <button
                onClick={onClose}
                className={primaryButtonClasses}
              >
                Done & Continue Browsing
              </button>
            ) : (
              <a
                href="/"
                className={primaryButtonClasses}
              >
                Return Home
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}
