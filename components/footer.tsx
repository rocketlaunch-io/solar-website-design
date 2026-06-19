import Link from 'next/link'
import { SparkLogo } from './spark-logo'

const footerColumns = [
  {
    heading: 'Product',
    links: [
      { name: 'Platform', href: '/platform' },
      { name: 'Spark AI', href: '/ai' },
      { name: 'Solutions', href: '/solutions' },
      { name: 'Comparison', href: '/comparison' },
    ],
  },
  {
    heading: 'Features',
    links: [
      { name: 'Solar Savings Calculator', href: '/platform/solar-savings-calculator' },
      { name: 'Lead Gen Engine', href: '/platform/lead-engine' },
      { name: 'AI-First SEO', href: '/platform/ai-seo' },
      { name: 'CRM Bridge', href: '/platform/crm-bridge' },
    ],
  },
  {
    heading: 'Pricing',
    links: [
      { name: 'Foundation', href: '/pricing' },
      { name: 'Velocity', href: '/pricing' },
      { name: 'Enterprise', href: '/pricing' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { name: 'Contact', href: '/contact' },
      { name: 'Security', href: '/privacy' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-edge-navy-deep text-white w-full">
      <div className="px-4 md:px-12 py-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex mb-3">
              <SparkLogo monochrome textClassName="text-white" />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              The Engine of Your Solar Growth. A high-performance ecosystem built on React and Edge Cloud infrastructure.
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-heading text-sm font-semibold text-white mb-4">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-secondary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-white/10">
          <div className="text-center md:text-left">
            <p className="text-sm text-white/50">
              © 2026 Spark Solar Inc. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-white/40">
              1209 N. Orange Street, Wilmington, DE 19801
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span className="w-2 h-2 rounded-full bg-energy-emerald animate-pulse" />
            99.9% Uptime — Edge Network Active
          </div>
        </div>
      </div>
    </footer>
  )
}
