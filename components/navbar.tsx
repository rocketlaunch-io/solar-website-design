'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { SparkLogo } from './spark-logo'

export const platformFeatures = [
  { name: 'Spark AI', href: '/platform/spark-ai', icon: 'psychology', desc: 'Core intelligence layer' },
  { name: 'Edge Architecture', href: '/platform/edge-architecture', icon: 'bolt', desc: 'React 19 + global edge' },
  { name: 'Solar Savings Calculator', href: '/platform/solar-savings-calculator', icon: 'calculate', desc: 'Interactive savings widget' },
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
  { name: 'Support', href: '/support', desc: 'Launch, billing & platform help' },
  { name: 'Comparison', href: '/comparison', desc: 'Spark vs. WordPress & DIY' },
  { name: 'Solutions Overview', href: '/solutions', desc: 'All solar solutions' },
]

interface MenuLink {
  name: string
  href: string
  icon?: string
  desc?: string
}

interface MegaMenu {
  label: string
  href: string
  links: MenuLink[]
  featured: {
    title: string
    desc: string
    href: string
    image?: string
  }
}

const MENU_DATA: Record<string, MegaMenu> = {
  'Platform': {
    label: 'Platform',
    href: '/platform',
    links: platformFeatures,
    featured: {
      title: 'Spark AI Platform',
      desc: 'The next-generation intelligence layer powering your automated solar growth engine.',
      href: '/platform',
      image: '/images/solar-hero.png',
    }
  },
  'Spark Grow': {
    label: 'Spark Grow',
    href: '/grow',
    links: growServices,
    featured: {
      title: 'Custom Grow Campaigns',
      desc: 'High-conversion digital advertising and lifecycle nurture campaigns built for solar volume.',
      href: '/grow',
      image: '/images/solar-residential.png',
    }
  },
  'Solutions': {
    label: 'Solutions',
    href: '/solutions',
    links: solutionTypes.map(s => ({ name: s.name, href: s.href, desc: s.desc })),
    featured: {
      title: 'Solar Company Solutions',
      desc: 'Scale your solar dealership, installer operations, or manufacturer brand.',
      href: '/solutions',
      image: '/images/solar-residential.png',
    }
  },
  'Resources': {
    label: 'Resources',
    href: '/resources',
    links: resources.map(r => ({ name: r.name, href: r.href, desc: r.desc })),
    featured: {
      title: 'Competitor Comparison',
      desc: 'See why Spark outpaces WordPress, custom builds, and traditional agencies.',
      href: '/resources',
      image: '/images/solar-hero.png',
    }
  }
}

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMobileAccordion, setActiveMobileAccordion] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('(888) 555-0199')

  useEffect(() => {
    const exchange = Math.floor(200 + Math.random() * 800)
    const line = Math.floor(1000 + Math.random() * 9000)
    setPhoneNumber(`(888) ${exchange}-${line}`)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-surface/95 backdrop-blur-md shadow-lg border-b border-outline-variant/30 py-2.5' 
          : 'bg-surface/80 backdrop-blur-md border-b border-outline-variant/40 py-4'
      }`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="flex justify-between items-center px-4 md:px-12 max-w-[1400px] mx-auto relative z-50">
        {/* Logo */}
        <Link href="/" className="inline-flex focus:outline-none" onClick={() => setMobileMenuOpen(false)}>
          <SparkLogo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {Object.keys(MENU_DATA).map((item) => (
            <div
              key={item}
              className="py-1"
              onMouseEnter={() => setActiveMenu(item)}
            >
              <Link
                href={MENU_DATA[item].href}
                onClick={() => setActiveMenu(null)}
                className={`flex items-center gap-1 font-medium text-sm transition-colors focus:outline-none cursor-pointer ${
                  activeMenu === item ? 'text-secondary' : 'text-foreground/80 hover:text-foreground'
                }`}
                aria-expanded={activeMenu === item}
              >
                {item}
                <span className={`material-symbols-outlined text-xs transition-transform duration-200 ${
                  activeMenu === item ? 'rotate-180' : ''
                }`}>
                  expand_more
                </span>
              </Link>
            </div>
          ))}

          {/* Pricing Link */}
          <Link 
            href="/pricing" 
            className="text-foreground/80 font-medium text-sm hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/support"
            className="text-foreground/80 font-medium text-sm hover:text-foreground transition-colors"
          >
            Support
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-5">
          <a 
            href={`tel:${phoneNumber.replace(/\D/g, '')}`} 
            className="flex items-center gap-1.5 text-foreground/80 font-medium text-sm hover:text-foreground transition-colors mr-2"
          >
            <span className="material-symbols-outlined text-base">phone</span>
            <span>{phoneNumber}</span>
          </a>
          <Link 
            href="/signin" 
            className="text-foreground/80 font-medium text-sm hover:text-foreground transition-colors"
          >
            Sign in
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
          className="lg:hidden text-foreground p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mega Menu Dropdowns Panel (Desktop) */}
      {activeMenu && (
        <div
          className="hidden lg:block absolute top-full left-0 w-full bg-surface-container-lowest border-b border-outline-variant/40 shadow-xl z-40 transition-all duration-300"
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="max-w-[1400px] mx-auto px-12 py-8 grid grid-cols-3 gap-8">
            {/* Columns grid for links */}
            <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-4">
              {MENU_DATA[activeMenu].links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveMenu(null)}
                  className="group flex flex-col gap-0.5 p-3 rounded-xl hover:bg-surface-container transition-all duration-200 border border-transparent hover:border-outline-variant/30"
                >
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    {link.icon && (
                      <span className="material-symbols-outlined text-lg text-secondary group-hover:scale-105 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {link.icon}
                      </span>
                    )}
                    {link.name}
                  </span>
                  {link.desc && (
                    <span className={`text-xs text-muted-foreground leading-relaxed pl-${link.icon ? '7' : '0'}`}>
                      {link.desc}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Featured Section Card */}
            {MENU_DATA[activeMenu].featured && (
              <Link
                href={MENU_DATA[activeMenu].featured.href}
                onClick={() => setActiveMenu(null)}
                className="bg-primary text-primary-foreground p-6 rounded-2xl flex flex-col justify-between shadow-md relative overflow-hidden group min-h-[220px] cursor-pointer"
              >
                {MENU_DATA[activeMenu].featured.image && (
                  <>
                    <div 
                      className="absolute inset-0 z-0 bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${MENU_DATA[activeMenu].featured.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-edge-navy-deep via-primary/80 to-transparent z-0 pointer-events-none" />
                  </>
                )}
                <div className="relative z-10">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                    Featured Highlight
                  </span>
                  <h4 className="text-base font-bold mt-1.5 line-clamp-2">
                    {MENU_DATA[activeMenu].featured.title}
                  </h4>
                  <p className="text-xs text-primary-foreground/75 mt-1.5 leading-relaxed line-clamp-3">
                    {MENU_DATA[activeMenu].featured.desc}
                  </p>
                </div>
                <div
                  className="relative z-10 inline-flex items-center gap-1 text-xs font-bold text-secondary group-hover:text-white mt-4 transition-colors"
                >
                  Explore &rarr;
                </div>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-surface border-t border-outline-variant/40 shadow-xl max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col px-6 py-6 gap-2">
            {Object.keys(MENU_DATA).map((category) => {
              const isAccordionOpen = activeMobileAccordion === category
              return (
                <div key={category} className="border-b border-outline-variant/30 pb-2">
                  <button
                    onClick={() => setActiveMobileAccordion(isAccordionOpen ? null : category)}
                    className="w-full flex justify-between items-center text-base font-bold py-3 text-left focus:outline-none"
                  >
                    <span>{category}</span>
                    <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${
                      isAccordionOpen ? 'rotate-180 text-secondary' : ''
                    }`}>
                      expand_more
                    </span>
                  </button>

                  {isAccordionOpen && (
                    <div className="mt-1 pl-4 flex flex-col gap-2 border-l border-outline-variant/30">
                      <Link
                        href={MENU_DATA[category].href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2.5 text-sm font-semibold text-primary hover:text-secondary transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-base text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                          overview
                        </span>
                        <span>{category} Overview</span>
                      </Link>
                      {MENU_DATA[category].links.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2.5 text-sm text-foreground/80 hover:text-secondary transition-colors flex items-center gap-2"
                        >
                          {link.icon && (
                            <span className="material-symbols-outlined text-base text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                              {link.icon}
                            </span>
                          )}
                          <span>{link.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            {/* Pricing direct mobile link */}
            <Link 
              href="/pricing" 
              className="text-base font-bold py-3 border-b border-outline-variant/30 hover:text-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>

            <Link
              href="/support"
              className="text-base font-bold py-3 border-b border-outline-variant/30 hover:text-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support
            </Link>

            {/* Mobile Actions */}
            <div className="flex flex-col gap-2 mt-4 pt-4">
              <a 
                href={`tel:${phoneNumber.replace(/\D/g, '')}`} 
                className="flex items-center gap-1.5 text-foreground/80 font-medium py-2 hover:text-secondary transition-colors"
              >
                <span className="material-symbols-outlined text-base">phone</span>
                <span>{phoneNumber}</span>
              </a>
              <Link 
                href="/signin" 
                className="text-foreground/80 font-medium py-2 hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in
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
