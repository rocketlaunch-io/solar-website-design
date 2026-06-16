export type SolutionContent = {
  slug: string
  eyebrow: string
  audience: string
  title: string
  subtitle: string
  heroDescription: string
  painPoints: { problem: string; solution: string }[]
  features: { icon: string; title: string; description: string }[]
  outcomes: { stat: string; label: string }[]
  testimonial: { quote: string; author: string; role: string }
  ctaTitle: string
  ctaDescription: string
}

export const solutions: Record<string, SolutionContent> = {
  dealer: {
    slug: "dealer",
    eyebrow: "For Solar Dealers",
    audience: "Solar Dealers",
    title: "A Website That Sells While You Sleep.",
    subtitle: "High-Velocity Sales",
    heroDescription:
      "Most solar dealer websites are glorified brochures. Spark turns yours into a 24/7 sales engine that qualifies leads, books appointments, and drops verified opportunities straight into your CRM.",
    painPoints: [
      {
        problem: "Generic contact forms that leak leads",
        solution: "A psychology-backed Multi-Step Quote Wizard that qualifies intent before asking for contact info.",
      },
      {
        problem: "Slow, template sites that rank poorly",
        solution: "A custom React application served from the Edge with 100/100 Core Web Vitals.",
      },
      {
        problem: "No visibility into where leads come from",
        solution: "Full attribution tracking that ties every lead back to its campaign and channel.",
      },
    ],
    features: [
      {
        icon: "bolt",
        title: "Multi-Step Quote Wizard",
        description: "Engage visitors with value-first questions that boost completion rates by 340% versus static forms.",
      },
      {
        icon: "sync",
        title: "Instant CRM Sync",
        description: "Verified leads pushed to your CRM in under 200ms with full conditional logic.",
      },
      {
        icon: "speed",
        title: "Edge Performance",
        description: "Sub-second load times that keep buyers engaged and improve your ad Quality Score.",
      },
    ],
    outcomes: [
      { stat: "+340%", label: "Form completion rate" },
      { stat: "0.8s", label: "Average load time" },
      { stat: "<200ms", label: "Lead-to-CRM time" },
    ],
    testimonial: {
      quote: "Our cost-per-acquisition dropped 38% in the first quarter. The quote wizard alone paid for the platform.",
      author: "Marcus Reed",
      role: "Owner, Apex Solar Group",
    },
    ctaTitle: "Turn your website into your best closer.",
    ctaDescription: "Launch a high-velocity sales site built to convert.",
  },
  installer: {
    slug: "installer",
    eyebrow: "For Solar Installers",
    audience: "Solar Installers",
    title: "A Customer Command Center, Not Just a Website.",
    subtitle: "Operational Clarity",
    heroDescription:
      "Spark gives installers a front-facing portal that mirrors your back-end progress. Customers see real-time project status, you field fewer status calls, and your admin overhead shrinks.",
    painPoints: [
      {
        problem: "Endless 'where's my install?' phone calls",
        solution: "A Customer Command Center that mirrors back-end progress in real time.",
      },
      {
        problem: "Manual paperwork and status updates",
        solution: "Automated milestone notifications that keep homeowners informed without lifting a finger.",
      },
      {
        problem: "Disjointed tools that don't talk to each other",
        solution: "A unified front-end that integrates with your existing project management stack.",
      },
    ],
    features: [
      {
        icon: "dashboard",
        title: "Customer Command Center",
        description: "A homeowner-facing dashboard that reflects every stage from contract to PTO.",
      },
      {
        icon: "notifications_active",
        title: "Automated Milestones",
        description: "Trigger updates at survey, permitting, install, and inspection automatically.",
      },
      {
        icon: "support_agent",
        title: "Reduced Admin Load",
        description: "Cut status-call volume so your team focuses on installs, not inbox triage.",
      },
    ],
    outcomes: [
      { stat: "-60%", label: "Status call volume" },
      { stat: "4.9/5", label: "Customer satisfaction" },
      { stat: "100/100", label: "Core Web Vitals" },
    ],
    testimonial: {
      quote: "The command center cut our inbound status calls in half. Our coordinators finally have breathing room.",
      author: "Dana Whitfield",
      role: "Operations Director, BrightPath Installations",
    },
    ctaTitle: "Give customers clarity. Give your team time back.",
    ctaDescription: "Launch an operations-grade installer platform.",
  },
  "solar-brands": {
    slug: "solar-brands",
    eyebrow: "For Solar Brands",
    audience: "Solar Brands",
    title: "Enterprise Presence. National Scale.",
    subtitle: "Market Authority",
    heroDescription:
      "For high-end aesthetic and authority, Spark delivers an enterprise-grade web presence engineered for national SEO, brand consistency, and the kind of polish a $100M brand demands.",
    painPoints: [
      {
        problem: "Inconsistent brand experience across regions",
        solution: "A centralized design system that enforces brand consistency at national scale.",
      },
      {
        problem: "Weak organic visibility in competitive markets",
        solution: "Enterprise SEO architecture engineered to dominate national and local search.",
      },
      {
        problem: "Sites that look cheap relative to the brand",
        solution: "A high-end, custom design that reflects the authority of a market leader.",
      },
    ],
    features: [
      {
        icon: "public",
        title: "National SEO Architecture",
        description: "Programmatic location pages and technical SEO built to scale across markets.",
      },
      {
        icon: "palette",
        title: "Enterprise Design System",
        description: "A consistent, premium brand experience across every page and region.",
      },
      {
        icon: "verified",
        title: "Authority Positioning",
        description: "Design and content engineered to make you the obvious market leader.",
      },
    ],
    outcomes: [
      { stat: "+142%", label: "Projected organic growth" },
      { stat: "300+", label: "Global edge nodes" },
      { stat: "$100M", label: "Brand-grade presence" },
    ],
    testimonial: {
      quote: "Spark gave us a digital presence that finally matches the scale of our brand. Organic traffic is up 140%.",
      author: "Priya Nair",
      role: "VP Marketing, Helios Energy",
    },
    ctaTitle: "Build the presence of a category leader.",
    ctaDescription: "Launch an enterprise-grade brand platform.",
  },
  "solar-companies": {
    slug: "solar-companies",
    eyebrow: "For Solar Companies",
    audience: "Solar Companies",
    title: "One Platform for the Entire Growth Engine.",
    subtitle: "Unified Growth",
    heroDescription:
      "Whether you sell, install, or both, Spark unifies marketing, lead generation, and customer operations into a single high-performance platform built on React and Edge infrastructure.",
    painPoints: [
      {
        problem: "Fragmented tools across sales and ops",
        solution: "A single platform that unifies lead capture, CRM sync, and customer portals.",
      },
      {
        problem: "Generic websites that don't convert",
        solution: "A custom, conversion-optimized application engineered for solar buyers.",
      },
      {
        problem: "No clear path to scale",
        solution: "Edge infrastructure and modular architecture that grows with your company.",
      },
    ],
    features: [
      {
        icon: "hub",
        title: "Unified Growth Stack",
        description: "Marketing, lead gen, and customer operations in one cohesive platform.",
      },
      {
        icon: "rocket_launch",
        title: "Conversion-First Design",
        description: "Every page engineered to turn solar intent into verified pipeline.",
      },
      {
        icon: "cloud",
        title: "Edge-Native Infrastructure",
        description: "React application deployed to the Edge for speed, stability, and scale.",
      },
    ],
    outcomes: [
      { stat: "+142%", label: "Projected growth" },
      { stat: "0.8s", label: "Load time" },
      { stat: "100/100", label: "Core Web Vitals" },
    ],
    testimonial: {
      quote: "We replaced four tools with Spark. Sales and operations finally run on the same platform.",
      author: "Carlos Mendez",
      role: "CEO, SunVantage Solar",
    },
    ctaTitle: "Run your entire growth engine on one platform.",
    ctaDescription: "Launch a unified solar growth platform.",
  },
}

export const solutionSlugs = Object.keys(solutions)
