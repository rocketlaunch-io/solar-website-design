'use client'

import Link from 'next/link'
import { useState, useRef, useCallback, useEffect } from 'react'
import { SparkLogo } from './spark-logo'

function HoverDropdown({
  label,
  href,
  align = 'center',
  panelClassName,
  children,
}: {
  label: string
  href?: string
  align?: 'center' | 'left'
  panelClassName: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setOpen(true)
  }, [])

  const handleLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 180)
  }, [])

  const triggerClass =
    'text-foreground/80 font-medium hover:text-foreground transition-colors duration-300 flex items-center gap-1'

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {href ? (
        <Link href={href} onFocus={handleEnter} className={triggerClass}>
          {label}
          <span
            className={`material-symbols-outlined text-sm transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        </Link>
      ) : (
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          onFocus={handleEnter}
          className={triggerClass}
        >
          {label}
          <span
            className={`material-symbols-outlined text-sm transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        </button>
      )}

      {/* Wrapper uses top-full + pt to keep the hover bridge gap-free */}
      <div
        className={`absolute top-full ${
          align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'
        } pt-2 z-50 transition-all duration-150 ${
          open
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-1 invisible pointer-events-none'
        }`}
      >
        <div
          className={`bg-surface-container-lowest border border-outline-variant/40 rounded-xl shadow-xl p-2 ${panelClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export const platformFeatures = [
  { name: 'Spark AI', href: '/platform/spark-ai', icon: 'psychology', desc: 'Core intelligence layer' },
  { name: 'Edge Architecture', href: '/platform/edge-architecture', icon: 'bolt', desc: 'React 19 + global edge' },
  { name: 'Solar Calculator', href: '/platform/solar-calculator', icon: 'calculate', desc: 'Interactive savings widget' },
  { name: 'Lead Gen Engine', href: '/platform/lead-engine', icon: 'dynamic_form', desc: 'Multi-step quote wizard' },
  { name: 'AI-First SEO', href: '/platform/ai-seo', icon: 'travel_explore', desc: 'Win the AI search era' },
  { name: 'Local SEO Engine', href: '/platform/local-seo', icon: 'location_city', desc: 'Programmatic geo pages' },
  { name: 'CRM Bridge', href: '/platform/crm-bridge', icon: 'sync_alt', desc: 'Instant lead injection' },
  { name: 'Voice Agents', href: '/platform/voice-agents', icon: 'support_agent', desc: '24/7 AI sales force' },
  { name: 'Spark CRM', href: '/platform/spark-crm', icon: 'contacts', desc: 'Lead ingestion & scoring' },
  { name: 'Performance Analytics', href: '/platform/analytics', icon: 'monitoring', desc: 'Full-funnel attribution' },
  { name: 'Bespoke Design', href: '/platform/bespoke-design', icon: 'palette', desc: 'Conversion-first UI' },
  { name: 'Spark API', href: '/platform/developer-api', icon: 'code', desc: 'Universal adapter' },
]

export const growServices = [
  { name: 'Content Design', href: '/grow/content-design', icon: 'draw', desc: 'High-conversion output' },
  { name: 'Paid & Digital Ads', href: '/grow/paid-digital-advertising', icon: 'ads_click', desc: 'AI-optimized spend' },
  { name: 'Multi-Platform Ads', href: '/grow/multi-platform-advertising', icon: 'campaign', desc: 'Omni-channel reach' },
  { name: 'Digital Creative', href: '/grow/digital-creative', icon: 'brush', desc: 'Campaign fuel' },
  { name: 'Email Automation', href: '/grow/email-automation', icon: 'mark_email_read', desc: 'Lifecycle nurture' },
  { name: 'CRO', href: '/grow/cro', icon: 'conversion_path', desc: 'Funnel efficiency' },
  { name: 'Analytics & Reporting', href: '/grow/analytics-reporting', icon: 'monitoring', desc: 'Actionable insights' },
  { name: 'Creative Services', href: '/grow/creative-services', icon: 'palette', desc: 'Print & digital assets' },
  { name: 'Social Media', href: '/grow/social-media', icon: 'thumb_up', desc: 'Trust & authority' },
  { name: 'Advanced AI', href: '/grow/advanced-ai', icon: 'smart_toy', desc: 'Spark AI engine' },
  { name: 'Video Production', href: '/grow/video-production', icon: 'movie', desc: 'Cinematic conversion' },
  { name: 'Sales Enablement', href: '/grow/sales-enablement', icon: 'co_present', desc: 'Close-rate tools' },
]

const solutionTypes = [
  { name: 'Solar Dealers', href: '/solutions/dealer', desc: 'High-velocity sales' },
  { name: 'Solar Installers', href: '/solutions/installer', desc: 'Operational clarity' },
  { name: 'Solar Brands', href: '/solutions/solar-brands', desc: 'Market authority' },
  { name: 'Solar Companies', href: '/solutions/solar-companies', desc: 'Unified growth' },
]

const resources = [
  { name: 'Spark AI', href: '/ai', desc: 'The brain behind growth' },
  { name: 'Comparison', href: '/comparison', desc: 'Spark vs. WordPress & DIY' },
  { name: 'Solutions Overview', href: '/solutions', desc: 'All solar solutions' },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [platformOpen, setPlatformOpen] = useState(false)
  const [growOpen, setGrowOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('(888) 555-0199')

  useEffect(() => {
    const exchange = Math.floor(200 + Math.random() * 800)
    const line = Math.floor(1000 + Math.random() * 9000)
    setPhoneNumber(`(888) ${exchange}-${line}`)
  }, [])

  return (
    <header className="bg-surface/80 backdrop-blur-md fixed top-0 w-full z-50 transition-all duration-300 border-b border-outline-variant/40">
      <div className="flex justify-between items-center px-4 md:px-12 py-3.5 max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link href="/" className="inline-flex">
          <SparkLogo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {/* Platform Dropdown */}
          <HoverDropdown label="Platform" href="/platform" align="center" panelClassName="w-[560px]">
            <div className="px-3 py-2 mb-1">
              <Link
                href="/platform"
                className="text-sm font-semibold text-secondary hover:underline flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
                Platform Overview
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {platformFeatures.map((feature) => (
                <Link
                  key={feature.name}
                  href={feature.href}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground/80 hover:bg-surface-container-high transition-colors group"
                >
                  <span className="material-symbols-outlined text-lg text-secondary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>{feature.icon}</span>
                  <span>
                    <span className="block font-medium text-foreground group-hover:text-primary">{feature.name}</span>
                    <span className="block text-xs text-muted-foreground">{feature.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </HoverDropdown>

          {/* Spark Grow Dropdown */}
          <HoverDropdown label="Spark Grow" href="/grow" align="center" panelClassName="w-[560px]">
            <div className="px-3 py-2 mb-1">
              <Link
                href="/grow"
                className="text-sm font-semibold text-secondary hover:underline flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>diversity_3</span>
                Spark Grow Overview
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {growServices.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground/80 hover:bg-surface-container-high transition-colors group"
                >
                  <span className="material-symbols-outlined text-lg text-secondary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>{service.icon}</span>
                  <span>
                    <span className="block font-medium text-foreground group-hover:text-primary">{service.name}</span>
                    <span className="block text-xs text-muted-foreground">{service.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </HoverDropdown>

          {/* Solutions Dropdown */}
          <HoverDropdown label="Solutions" href="/solutions" align="left" panelClassName="w-64">
            {solutionTypes.map((type) => (
              <Link
                key={type.name}
                href={type.href}
                className="block px-3 py-2.5 rounded-lg text-sm text-foreground/80 hover:bg-surface-container-high transition-colors"
              >
                <span className="block font-medium text-foreground">{type.name}</span>
                <span className="block text-xs text-muted-foreground">{type.desc}</span>
              </Link>
            ))}
          </HoverDropdown>

          <Link href="/pricing" className="text-foreground/80 font-medium hover:text-foreground transition-colors duration-300">
            Pricing
          </Link>

          {/* Resources Dropdown */}
          <HoverDropdown label="Resources" href="/resources" align="left" panelClassName="w-64">
            {resources.map((type) => (
              <Link
                key={type.name}
                href={type.href}
                className="block px-3 py-2.5 rounded-lg text-sm text-foreground/80 hover:bg-surface-container-high transition-colors"
              >
                <span className="block font-medium text-foreground">{type.name}</span>
                <span className="block text-xs text-muted-foreground">{type.desc}</span>
              </Link>
            ))}
          </HoverDropdown>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-5">
          <a href={`tel:${phoneNumber.replace(/\D/g, '')}`} className="flex items-center gap-1.5 text-foreground/80 font-medium hover:text-foreground transition-colors mr-2">
            <span className="material-symbols-outlined text-base">phone</span>
            <span>{phoneNumber}</span>
          </a>
          <Link href="/login" className="text-foreground/80 font-medium hover:text-foreground transition-colors">
            Login
          </Link>
          <Link
            href="/contact"
            className="bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-solar-amber-bright transition-colors duration-300 shadow-sm shadow-secondary/30 inline-flex items-center gap-1.5"
          >
            Get Started
            <span className="material-symbols-outlined text-base">bolt</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-t border-outline-variant/40 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col px-4 py-4 gap-2">
            {/* Mobile Platform Submenu */}
            <div className="py-2">
              <button
                onClick={() => setPlatformOpen(!platformOpen)}
                className="text-foreground font-medium flex items-center gap-1 w-full"
              >
                Platform
                <span className={`material-symbols-outlined text-sm transition-transform ${platformOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              {platformOpen && (
                <div className="pl-4 mt-2 flex flex-col gap-1 border-l border-outline-variant/40">
                  <Link
                    href="/platform"
                    className="text-sm text-secondary font-medium py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Platform Overview
                  </Link>
                  {platformFeatures.map((feature) => (
                    <Link
                      key={feature.name}
                      href={feature.href}
                      className="text-sm text-foreground/70 py-1.5 hover:text-primary transition-colors flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="material-symbols-outlined text-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>{feature.icon}</span>
                      {feature.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Spark Grow Submenu */}
            <div className="py-2">
              <button
                onClick={() => setGrowOpen(!growOpen)}
                className="text-foreground font-medium flex items-center gap-1 w-full"
              >
                Spark Grow
                <span className={`material-symbols-outlined text-sm transition-transform ${growOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              {growOpen && (
                <div className="pl-4 mt-2 flex flex-col gap-1 border-l border-outline-variant/40">
                  <Link
                    href="/grow"
                    className="text-sm text-secondary font-medium py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Spark Grow Overview
                  </Link>
                  {growServices.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="text-sm text-foreground/70 py-1.5 hover:text-primary transition-colors flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="material-symbols-outlined text-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>{service.icon}</span>
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Solutions Submenu */}
            <div className="py-2">
              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="text-foreground font-medium flex items-center gap-1 w-full"
              >
                Solutions
                <span className={`material-symbols-outlined text-sm transition-transform ${solutionsOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              {solutionsOpen && (
                <div className="pl-4 mt-2 flex flex-col gap-1 border-l border-outline-variant/40">
                  {solutionTypes.map((type) => (
                    <Link
                      key={type.name}
                      href={type.href}
                      className="text-sm text-foreground/70 py-1.5 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {type.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/pricing" className="text-foreground font-medium py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </Link>

            {/* Mobile Resources Submenu */}
            <div className="py-2">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="text-foreground font-medium flex items-center gap-1 w-full"
              >
                Resources
                <span className={`material-symbols-outlined text-sm transition-transform ${resourcesOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              {resourcesOpen && (
                <div className="pl-4 mt-2 flex flex-col gap-1 border-l border-outline-variant/40">
                  {resources.map((type) => (
                    <Link
                      key={type.name}
                      href={type.href}
                      className="text-sm text-foreground/70 py-1.5 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {type.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-outline-variant/40">
              <a href={`tel:${phoneNumber.replace(/\D/g, '')}`} className="flex items-center gap-1.5 text-foreground/80 font-medium py-2 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-base">phone</span>
                <span>{phoneNumber}</span>
              </a>
              <Link href="/login" className="text-foreground/80 font-medium py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link
                href="/contact"
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg text-sm font-semibold text-center mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
