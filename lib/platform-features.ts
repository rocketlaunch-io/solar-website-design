export interface PlatformFeature {
  slug: string
  icon: string
  title: string
  tagline: string
  shortDescription: string
  fullDescription: string
  benefit: string
  detailedBenefits: string[]
}

export const platformFeaturesData: PlatformFeature[] = [
  {
    slug: "spark-ai",
    icon: "psychology",
    title: "Spark AI",
    tagline: "Core Intelligence",
    shortDescription: "The central intelligence layer that scores leads and optimizes growth.",
    fullDescription:
      "Spark AI isn't just a feature—it's the core. It scans leads, generates content, and optimizes ad spend in real-time while you focus on closing. Our LLM-native engine analyzes hundreds of data points, from public property records to behavioral cues, to score every lead instantly.",
    benefit:
      "Your closers only talk to homeowners who are ready to sign. Spark AI filters tire-kickers from buyers, predicts long-term value, and routes hot leads to your elite reps automatically.",
    detailedBenefits: [
      "Real-time property data enrichment",
      "Behavioral intent scoring (98% accuracy)",
      "Predictive LTV before first contact",
      "Auto-routing to elite closers",
      "Fraud and bot filtering built-in",
    ],
  },
  {
    slug: "edge-architecture",
    icon: "bolt",
    title: "Edge Architecture",
    tagline: "High-Performance Core",
    shortDescription: "React 19 deployed to 300+ global edge nodes for sub-second loads.",
    fullDescription:
      "Most solar websites are slow, vulnerable WordPress templates. Spark is a custom-built React 19 application deployed to the Edge. Your site is replicated across 300+ global edge nodes, with content served from the server closest to the homeowner.",
    benefit:
      "Fast loading means homeowners don't bounce, and Google rewards you with higher rankings. Zero bloat means zero lost leads—and a decisive advantage in speed, security, and SEO.",
    detailedBenefits: [
      "100/100 Core Web Vitals score",
      "0.8s LCP / 12ms TTFB",
      "Global edge replication (300+ nodes)",
      "No plugins, no bloat, pure compiled JS",
      "SSL & enterprise-grade security suite",
    ],
  },
  {
    slug: "solar-calculator",
    icon: "calculate",
    title: "Solar Calculator",
    tagline: "Interactive Widget",
    shortDescription: "Dynamic savings projections that hook users instantly.",
    fullDescription:
      "The centerpiece of the lead capture experience. Instead of a boring \"Contact Us\" form, users enter their utility bill info to see an immediate estimated savings projection. The calculator provides real, math-based estimates that create instant gratification.",
    benefit:
      "Users get a real estimate that hooks them instantly, increasing conversion rates by 40% over static forms. It also segments leads by roof type, bill amount, and motivation before you even call them.",
    detailedBenefits: [
      "Dynamic, math-based savings quotes",
      "Lead segmentation by roof, bill, and goal",
      "+40% conversion vs. static forms",
      "Roof-type and motivation capture",
      "Instant CRM sync of qualified data",
    ],
  },
  {
    slug: "lead-engine",
    icon: "dynamic_form",
    title: "Lead Gen Engine",
    tagline: "Conversion Machine",
    shortDescription: "Psychology-backed multi-step quote wizard.",
    fullDescription:
      "Generic contact forms kill conversion rates. Spark's lead engine uses a psychology-backed Multi-Step Quote Wizard to engage users with value first. Long static forms look like work; Spark Form breaks data collection into bite-sized, gamified micro-steps.",
    benefit:
      "By showing one question at a time, we eliminate form fatigue and increase completion rates by up to 300%. Data is validated and pushed to your CRM via webhook in under 200ms with zero manual entry.",
    detailedBenefits: [
      "Cognitive load reduction (one question at a time)",
      "Real-time conditional logic",
      "Micro-commitments before sensitive asks",
      "Contextual verification of addresses & IDs",
      "+340% completion vs. static forms",
    ],
  },
  {
    slug: "ai-seo",
    icon: "travel_explore",
    title: "AI-First SEO",
    tagline: "Next-Gen Search",
    shortDescription: "Become the \"Source of Truth\" for AI search agents.",
    fullDescription:
      "The \"10 blue links\" are disappearing. Homeowners are asking AI agents like ChatGPT and Google Gemini for solar advice. Spark Website uses advanced Schema architecture and structured JSON-LD data to become the source of truth for these AI models in your local market.",
    benefit:
      "When an AI searches for \"best solar installer near me,\" it reads your Spark site first. You win the AI search era before your competitors even know it started.",
    detailedBenefits: [
      "Semantic HTML optimized for NLP",
      "Structured JSON-LD feeding AI Knowledge Graphs",
      "Local Authority clusters in core navigation",
      "Schema-validated content architecture",
      "High-confidence \"Trusted Source\" positioning",
    ],
  },
  {
    slug: "local-seo",
    icon: "location_city",
    title: "Local SEO Engine",
    tagline: "Programmatic Scale",
    shortDescription: "Spin up hundreds of geo-targeted landing pages instantly.",
    fullDescription:
      "Don't just rank for \"Solar Installer.\" Rank for \"Solar Installer [City Name]\" in every suburb you service. Spark's Programmatic SEO Engine spins up hundreds of high-quality, geo-targeted landing pages instantly—giving you hyper-local dominance without writing a single word.",
    benefit:
      "Our engine injects local utility rates, weather data, and city-specific incentives into every page. As incentives change, update one master template and watch it propagate across 500+ local pages instantly.",
    detailedBenefits: [
      "Mass page generation for every city & zip",
      "Dynamic local content injection",
      "Local utility rate & incentive data",
      "Zero-maintenance template propagation",
      "Hyper-local search dominance",
    ],
  },
  {
    slug: "crm-bridge",
    icon: "sync_alt",
    title: "CRM Bridge",
    tagline: "Integration Layer",
    shortDescription: "Instant lead injection into Salesforce, HubSpot, and more.",
    fullDescription:
      "Spark Website integrates with your CRM and marketing stack for instant lead capture. Lead data skips the inbox and goes straight into your pipeline (Salesforce, HubSpot, etc.) with zero manual entry. With custom automations, you stop losing leads to slow response times.",
    benefit:
      "Triggers an immediate SMS or email \"Thank You\" with a calendar booking link. You respond first, every time—and 70% of sales go to the vendor who responds first.",
    detailedBenefits: [
      "Instant lead injection to your pipeline",
      "Native Salesforce & HubSpot integration",
      "Auto-responder SMS/email system",
      "Integrated calendar booking",
      "Sub-200ms webhook handoff",
    ],
  },
  {
    slug: "voice-agents",
    icon: "support_agent",
    title: "Voice Agents",
    tagline: "24/7 Sales Force",
    shortDescription: "Hyper-realistic AI agents that handle calls while you sleep.",
    fullDescription:
      "Your sales team needs sleep. Spark AI doesn't. Our hyper-realistic voice agents handle inbound calls, qualify homeowners, and book appointments directly onto your rep's calendars—day or night, with human-like latency.",
    benefit:
      "Instant speed-to-lead with zero wait time and infinite scalability. Handle 100 calls at once with perfect script adherence, never missing an opportunity again.",
    detailedBenefits: [
      "Instant speed-to-lead (0s wait time)",
      "Infinite scalability (100 simultaneous calls)",
      "Perfect script adherence",
      "Inbound qualification & objection handling",
      "Direct calendar booking to reps",
    ],
  },
  {
    slug: "spark-crm",
    icon: "contacts",
    title: "Spark CRM",
    tagline: "Zero Latency",
    shortDescription: "Instant lead ingestion and AI qualification workflows.",
    fullDescription:
      "Spark CRM provides instant lead ingestion and AI qualification workflows that filter tire-kickers from buyers. The website and your project management live in the same ecosystem, eliminating the data silos that leak leads and slow down your team.",
    benefit:
      "Native integrations sync leads and project data instantly. Your canvassers and reps manage leads directly from the field with a mobile-first hub.",
    detailedBenefits: [
      "Instant lead ingestion",
      "AI qualification workflows",
      "Mobile-first CRM hub for field reps",
      "Unified website + project data",
      "Bi-directional sync across modules",
    ],
  },
  {
    slug: "analytics",
    icon: "monitoring",
    title: "Performance Analytics",
    tagline: "Full-Funnel Attribution",
    shortDescription: "See which pages and ads generate your best installs.",
    fullDescription:
      "Precisely trace every lead back to the exact ad, keyword, or referral source with AI-powered multi-touch attribution. See exactly which pages and ads are generating your highest-quality installs, from first click to final PTO.",
    benefit:
      "Stop guessing where your best customers come from. Full-funnel visibility lets you double down on what works and cut what doesn't, maximizing ROI on every marketing dollar.",
    detailedBenefits: [
      "Neural multi-touch attribution",
      "First-click to PTO funnel tracking",
      "Ad & keyword source tracing",
      "Lead quality scoring by channel",
      "Regional & multi-location dashboards",
    ],
  },
  {
    slug: "bespoke-design",
    icon: "palette",
    title: "Bespoke Design",
    tagline: "Conversion-First UI",
    shortDescription: "Agency-grade design hard-coded for conversion.",
    fullDescription:
      "Sticky mobile headers, contrast-engineered buttons, and psychology-backed trust signals are hard-coded into every Spark template. Your site comes pre-loaded with high-converting sales copy written by solar experts—no lorem ipsum placeholders.",
    benefit:
      "You get the presence of a $100M brand without the agency price tag. Premium, immersive UI/UX positions your brand as the industry leader and attracts high-ticket clients.",
    detailedBenefits: [
      "Conversion-engineered layouts",
      "Turnkey expert solar copywriting",
      "Licensed premium imagery included",
      "Sticky mobile headers & trust signals",
      "Premium brand aesthetic out of the box",
    ],
  },
  {
    slug: "developer-api",
    icon: "code",
    title: "Spark API",
    tagline: "Universal Adapter",
    shortDescription: "Connect your lead engine to any tool in your stack.",
    fullDescription:
      "Spark API connects your lead engine to Salesforce, HubSpot, or any other tool in your stack. For multi-state organizations with complex integration needs (Salesforce, Netsuite), we offer bespoke system packages and custom API development.",
    benefit:
      "Your entire growth stack speaks the same language. Custom integrations and dedicated SLAs ensure Spark fits seamlessly into your existing operations at enterprise scale.",
    detailedBenefits: [
      "Universal CRM & tool connectivity",
      "Custom API development",
      "1,000+ available integrations",
      "Webhook & event-driven architecture",
      "Enterprise SLAs & dedicated support",
    ],
  },
]
