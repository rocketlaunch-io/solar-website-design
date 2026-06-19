export interface PlatformFeature {
  slug: string
  icon: string
  title: string
  tagline: string
  shortDescription: string
  fullDescription: string
  benefit: string
  detailedBenefits: string[]
  roiMetric: {
    value: string
    label: string
  }
  process: {
    step: string
    title: string
    description: string
  }[]
  specs: {
    label: string
    value: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
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
    roiMetric: {
      value: "98.4%",
      label: "Lead Qualification Accuracy",
    },
    process: [
      { step: "01", title: "Ingestion & Tracking", description: "Captures lead details and scroll/intent actions on the page." },
      { step: "02", title: "Data Enrichment", description: "Queries local database overlays, solar maps, and weather indices." },
      { step: "03", title: "LLM Classification", description: "Processes parameters via fine-tuned LLM to rate purchase likelihood." },
      { step: "04", title: "Action Handoff", description: "Routes hot leads to reps and triggers outbound notifications." },
    ],
    specs: [
      { label: "Core Model", value: "Fine-Tuned Solar LLM" },
      { label: "Evaluation Latency", value: "< 150ms" },
      { label: "Properties Enrichments", value: "45+ data points per lead" },
      { label: "API Integrations", value: "Salesforce, HubSpot, Custom Webhooks" },
    ],
    faqs: [
      { question: "How does Spark AI determine lead intent?", answer: "It cross-references user interaction speed, field validation times, and scroll behavior against historical patterns of high-converting buyers." },
      { question: "Can we adjust the qualification threshold?", answer: "Yes, you can define target threshold ranges in the CRM dashboard to filter or prioritize leads." },
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
    roiMetric: {
      value: "0.8s",
      label: "Average LCP Load Time",
    },
    process: [
      { step: "01", title: "Code Compilation", description: "Next.js pages compile down to lightweight, optimized Javascript bundles." },
      { step: "02", title: "Edge Deployment", description: "Code is deployed globally across 300+ edge caching servers." },
      { step: "03", title: "Smart Routing", description: "Directs user requests to the server closest to their physical location." },
      { step: "04", title: "Instant Hydration", description: "Loads and runs code instantly without visible layout shifts." },
    ],
    specs: [
      { label: "Framework", value: "React 19 & Next.js 16 (Turbopack)" },
      { label: "Edge Network", value: "Vercel Global Edge Network" },
      { label: "TTFB Latency", value: "12ms average" },
      { label: "Security Level", value: "Enterprise WAF + Automatic DDoS Mitigation" },
    ],
    faqs: [
      { question: "Why does site speed matter for solar leads?", answer: "Every 100ms increase in load speed correlates to a 7% reduction in form completions. Edge speeds maximize completions." },
      { question: "Is SSL included automatically?", answer: "Yes, enterprise-grade SSL certificates are provisioned and renewed automatically." },
    ],
  },
  {
    slug: "solar-savings-calculator",
    icon: "calculate",
    title: "Solar Savings Calculator",
    tagline: "AI Powered Roof Modeling",
    shortDescription: "Dynamic roof satellite mapping and electric bill savings simulation.",
    fullDescription:
      "We leverage Spark AI and Solar Satellite data (Google Solar API) to model your roof angle, shadow patterns, and system production capacity in seconds. Homeowners enter their address, see their actual roof via satellite, and interact with a live savings simulation.",
    benefit:
      "Instead of a static contact form, homeowners see their actual rooftop panel layouts and interactive utility savings. This interactive value increases lead conversion rates by up to 40%.",
    detailedBenefits: [
      "Google Solar API rooftop satellite scanning",
      "Dynamic solar panel layout simulation",
      "Real-time monthly utility bill offset calculations",
      "Cash vs. Loan vs. PPA financial ROI comparison",
      "Instant SMS & Email proposal delivery webhook",
      "Direct calendar appointment booking interface",
    ],
    roiMetric: {
      value: "+40%",
      label: "Average Lead Conversion Lift",
    },
    process: [
      { step: "01", title: "Address Verification", description: "Autocompletes location and matches roof against satellite maps." },
      { step: "02", title: "3D Solar Mapping", description: "Estimates roof pitch, surface area, and shadow index." },
      { step: "03", title: "Utility Computation", description: "Models current electric bills against local utility rate files." },
      { step: "04", title: "Interactive Review", description: "Allows users to adjust their bill and see instant savings forecasts." },
    ],
    specs: [
      { label: "Roof Data Engine", value: "Google Solar API integration" },
      { label: "Utility Provider Database", value: "3,000+ local utility datasets" },
      { label: "Rendering Layer", value: "Vector SVG rooftop visualization" },
      { label: "Sync Latency", value: "Real-time updates on slider edit" },
    ],
    faqs: [
      { question: "How accurate are the utility rate tables?", answer: "We sync monthly with national utility rate directories to maintain accurate estimations for cash and loans." },
      { question: "Can we link this to our appointment booking tool?", answer: "Yes, the calculator integrates natively with Cal.com and HubSpot schedules." },
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
    roiMetric: {
      value: "3.4x",
      label: "Lead Volume Increase",
    },
    process: [
      { step: "01", title: "Low-Friction Start", description: "Starts with simple, non-sensitive options like current bill range." },
      { step: "02", title: "Adaptive Logic", description: "Changes subsequent steps dynamically based on previous choices." },
      { step: "03", title: "Value Delivery", description: "Shows customized solar statistics before requesting contact details." },
      { step: "04", title: "OTP Verification", description: "Validates contact info to filter out fraudulent entries." },
    ],
    specs: [
      { label: "Wizard Type", value: "Stateful Progressive Multi-Step Form" },
      { label: "Transitions", value: "Framer Motion layout animations" },
      { label: "Input Checkers", value: "Real-time syntax & domain verification" },
      { label: "Submit Latency", value: "< 200ms API injection" },
    ],
    faqs: [
      { question: "Can we add custom steps?", answer: "Yes, the wizard is fully configurable and supports conditional logic for custom questions." },
      { question: "Are phone numbers verified?", answer: "Yes, we integrate with Twilio lookup APIs to verify that numbers are active." },
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
    roiMetric: {
      value: "#1",
      label: "AI Engine Search Rank",
    },
    process: [
      { step: "01", title: "Semantic Markup", description: "Organizes page hierarchy strictly according to semantic standards." },
      { step: "02", title: "Structured Data", description: "Generates rich JSON-LD schema graphs automatically." },
      { step: "03", title: "NLP Verification", description: "Aligns terminology with natural language query formats." },
      { step: "04", title: "Indexing Push", description: "Submits updates directly to Google and Bing Indexing Webhooks." },
    ],
    specs: [
      { label: "Schema Formats", value: "JSON-LD, LocalBusiness, FAQPage" },
      { label: "Indexing Type", value: "Real-Time Indexing API Webhooks" },
      { label: "Accessibility Status", value: "WCAG 2.1 AA Compliant" },
      { label: "Markup Checker", value: "Schema.org validated" },
    ],
    faqs: [
      { question: "What are AI search agents?", answer: "Engines like ChatGPT and Gemini that pull structured answers directly from crawled websites." },
      { question: "Does this replace traditional Google SEO?", answer: "No, it reinforces it by structuring your content for both search bots and AI crawlers." },
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
    roiMetric: {
      value: "500+",
      label: "Target City Landing Pages",
    },
    process: [
      { step: "01", title: "Template Definition", description: "Establishes a base layout with dynamic localization tokens." },
      { step: "02", title: "Sub-Market Rendering", description: "Injects local utility rates, weather, and city-specific copy." },
      { step: "03", title: "Programmatic Build", description: "Next.js builds statically cached pages for target cities." },
      { step: "04", title: "Template Rollout", description: "Propagates template or stylesheet modifications across all pages." },
    ],
    specs: [
      { label: "Generation Mode", value: "ISR (Incremental Static Regeneration)" },
      { label: "Data Source", value: "Local Weather, Utility & Incentive Datasets" },
      { label: "Internal Linking", value: "Automated geographical matrix footer" },
      { label: "Page Scaling", value: "Supports up to 5,000 cities" },
    ],
    faqs: [
      { question: "Does programmatic SEO hurt search rankings?", answer: "No, because every page features unique local statistics, utility data, and localized copy." },
      { question: "How long do local pages take to update?", answer: "Updates are rebuilt in the background and propagate in under 5 minutes." },
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
    roiMetric: {
      value: "< 200ms",
      label: "CRM Sync Latency",
    },
    process: [
      { step: "01", title: "Lead Ingestion", description: "Collects form submissions and savings calculations securely." },
      { step: "02", title: "Verification", description: "Normalizes phone numbers, emails, and address fields." },
      { step: "03", title: "Secure Handoff", description: "Injects payload into CRM using encrypted API calls." },
      { step: "04", title: "Responder Trigger", description: "Instructs CRM to initiate instant follow-up sequences." },
    ],
    specs: [
      { label: "API Integrations", value: "Salesforce, HubSpot, custom REST APIs" },
      { label: "Encryptions", value: "AES-256 webhook headers" },
      { label: "Queue Uptime", value: "99.99% with failover retries" },
      { label: "Retry Interval", value: "Exponential backoff up to 24 hours" },
    ],
    faqs: [
      { question: "What happens if our CRM experiences downtime?", answer: "Leads are saved in a local, encrypted database queue and re-dispatched when connection returns." },
      { question: "Can we map custom form fields?", answer: "Yes, you can map fields to any standard or custom CRM property." },
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
    roiMetric: {
      value: "0s",
      label: "Speed-To-Lead Latency",
    },
    process: [
      { step: "01", title: "Classification Trigger", description: "Filters incoming leads to identify high-priority contacts." },
      { step: "02", title: "Dial Activation", description: "Triggers outbound voice channel using API." },
      { step: "03", title: "Conversational Chat", description: "Engages user with conversational AI, handling objections." },
      { step: "04", title: "Calendar Booking", description: "Books reps' schedules and logs notes in CRM." },
    ],
    specs: [
      { label: "Voice API", value: "ElevenLabs Conversational API" },
      { label: "System Latency", value: "< 500ms conversation response" },
      { label: "Maximum Capacity", value: "100 concurrent streams" },
      { label: "Objection Scripts", value: "Custom scripts and guardrails" },
    ],
    faqs: [
      { question: "Do the voice agents sound human?", answer: "Yes, they use advanced vocal synthesis to replicate human tone, breathing, and pauses." },
      { question: "Is data passed into our CRM?", answer: "Yes, the full transcript and qualification flags are saved to the lead record." },
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
    roiMetric: {
      value: "4.8",
      label: "App Store User Rating",
    },
    process: [
      { step: "01", title: "Unified Entry", description: "Consolidates website, chat, and phone leads in one pipeline." },
      { step: "02", title: "Workflow Rules", description: "Routes leads dynamically using customizable triggers." },
      { step: "03", title: "Field Updates", description: "Enables door-knocking logs and photo uploads from the field." },
      { step: "04", title: "Schedule Mapping", description: "Coordinates rep availability and schedules automatically." },
    ],
    specs: [
      { label: "Client Native", value: "React Native iOS/Android apps" },
      { label: "Offline Syncing", value: "Automatic local storage synchronization" },
      { label: "Auth Protocols", value: "Role-Based Access Control + SSO" },
      { label: "Custom Dashboards", value: "Drag-and-drop widget builder" },
    ],
    faqs: [
      { question: "Can we migrate our current leads database?", answer: "Yes, Spark CRM offers CSV and API import tools for easy data migration." },
      { question: "Does it support offline field canvassing?", answer: "Yes, field reps can log knocks offline, and data will sync once online." },
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
    roiMetric: {
      value: "100%",
      label: "Attribution Funnel Mapping",
    },
    process: [
      { step: "01", title: "Ad Parameter Tracking", description: "Logs referrer URL parameters, ad ids, and keyword targets." },
      { step: "02", title: "Session Recording", description: "Tracks scroll depth, calculations, and inputs anonymously." },
      { step: "03", title: "Funnel Correlation", description: "Correlates website clicks to sales pipeline actions." },
      { step: "04", title: "ROI Visualization", description: "Displays conversion costs and ROI metrics on a dashboard." },
    ],
    specs: [
      { label: "Tracking Cookie", value: "GDPR first-party analytical cookie" },
      { label: "Attribution Setup", value: "Multi-touch, linear, first/last click" },
      { label: "Report Latency", value: "Real-time updates" },
      { label: "Multi-Site Dashboards", value: "Regional & territory segmentation" },
    ],
    faqs: [
      { question: "Is this tracking GDPR compliant?", answer: "Yes, it uses first-party anonymous tokens that respect local privacy preferences." },
      { question: "Does it track offline installs?", answer: "Yes, pipeline updates (like PTO) sync back to match website attribution." },
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
    roiMetric: {
      value: "+25%",
      label: "Brand Trust Factor Lift",
    },
    process: [
      { step: "01", title: "UX Wireframing", description: "Structures layouts to match standard lead conversion metrics." },
      { step: "02", title: "Solar-Centric Copy", description: "Drafts benefit-focused copy tailored to solar prospects." },
      { step: "03", title: "CSS variables", description: "Implements CSS variables to match your color palette." },
      { step: "04", title: "Animation Tuning", description: "Optimizes micro-animations for interactive elements." },
    ],
    specs: [
      { label: "Design System", value: "Tailwind CSS & CSS Custom Variables" },
      { label: "Typography", value: "Outfit (headings), Inter (body text)" },
      { label: "Image Assets", value: "High-definition licensed solar files" },
      { label: "Responsive Layout", value: "Mobile-first, breakpoints up to 2K" },
    ],
    faqs: [
      { question: "Can we apply our existing brand assets?", answer: "Yes, custom logos, palettes, and fonts can be mapped in the CSS setup." },
      { question: "Are layout designs mobile friendly?", answer: "Every component is designed mobile-first to ensure high conversion rates." },
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
    roiMetric: {
      value: "99.99%",
      label: "API SLA Uptime",
    },
    process: [
      { step: "01", title: "Auth Generation", description: "Creates secure API keys and manages permissions." },
      { step: "02", title: "Request Handling", description: "Processes API commands to update data or fetch records." },
      { step: "03", title: "Event Dispatch", description: "Broadcasts events to target endpoints via webhooks." },
      { step: "04", title: "Log Auditing", description: "Maintains records of API operations in the dashboard." },
    ],
    specs: [
      { label: "API Types", value: "RESTful JSON & GraphQL APIs" },
      { label: "Auth Protocols", value: "OAuth 2.0 & Secure API Tokens" },
      { label: "Rate Limitations", value: "Up to 10,000 requests per minute" },
      { label: "Integration SDKs", value: "Node.js, Python, Go" },
    ],
    faqs: [
      { question: "Is there a sandbox for testing?", answer: "Yes, we provide a mock sandbox environment to test APIs before production." },
      { question: "Does it support custom payload mapping?", answer: "Yes, our webhooks support custom JSON mapping to match any structure." },
    ],
  },
  {
    slug: "call-tracking",
    icon: "phone_in_talk",
    title: "Call Tracking",
    tagline: "Dynamic Attribution",
    shortDescription: "Correlate offline phone calls to online ad sources down to the exact keyword.",
    fullDescription:
      "Spark Call Tracking closes the loop on offline conversions. By dynamically inserting unique phone numbers (DNI) per visitor session, we attribute every inbound phone lead to the exact campaign, ad creative, and search keyword that triggered it.",
    benefit:
      "Stop guessing which marketing channels drive call-in leads. Link phone conversions directly to Google and Meta ad managers, allowing our AI to optimize your ad spend based on real phone revenue.",
    detailedBenefits: [
      "Dynamic Number Insertion (DNI) per visitor session",
      "Keyword-level Google & Meta ad attribution",
      "Automated AI call recording & transcription",
      "Call sentiment analysis & intent scoring",
      "Out-of-the-box CRM lead linking",
    ],
    roiMetric: {
      value: "+31%",
      label: "Attribution Accuracy Increase",
    },
    process: [
      { step: "01", title: "Pool Provisioning", description: "We assign a dynamic block of local phone numbers dedicated to your site visitors." },
      { step: "02", title: "Dynamic Replacement", description: "Our script automatically swaps your public phone number based on visitor source." },
      { step: "03", title: "Real-Time Routing", description: "Calls are instantly routed to your sales desk while capturing tracking cookies." },
      { step: "04", title: "AI Transcription", description: "Our engine records, transcribes, and analyzes customer intent, push-syncing to your CRM." },
    ],
    specs: [
      { label: "Attribution Type", value: "Dynamic Number Insertion (DNI)" },
      { label: "API Integrations", value: "Twilio, HubSpot, Salesforce, Google Ads" },
      { label: "AI Model", value: "Whisper v3 Transcription + GPT Intent Classify" },
      { label: "SLA Sync", value: "< 5 seconds after call completion" },
    ],
    faqs: [
      { question: "Will dynamic numbers confuse return customers?", answer: "No. Visitor sessions are cookie-locked. If a customer returns to your site, they see the same number they originally called. Additionally, calls to any number in your dynamic pool route to your main line forever." },
      { question: "Can you track Google Maps and offline flyers?", answer: "Yes. We provision static tracking numbers for Google Business Profile, direct mail, and print flyers, attributing call metrics to those specific off-site sources." },
      { question: "Does the system record and transcribe automatically?", answer: "Yes, all calls can be transcribed and analyzed for sentiment in real time, with full compliance call-disclosure voice prompts enabled by default." },
    ],
  },
]
