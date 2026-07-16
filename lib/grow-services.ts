export interface GrowService {
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

export const growServicesData: GrowService[] = [
  {
    slug: "content-design",
    icon: "draw",
    title: "Content Design",
    tagline: "High-Conversion Output",
    shortDescription: "Scale production without adding headcount or burning out your team.",
    fullDescription:
      "Spark Grow scales your content production without adding a single new hire. We build high-conversion content strategies engineered to attract high-intent prospects who are actively researching solar—turning your brand into a magnet for ready-to-buy homeowners.",
    benefit:
      "You get a relentless stream of on-brand, conversion-focused content that fills the top of your funnel. No more scrambling for ideas or paying per-asset agency fees—just consistent output that compounds.",
    detailedBenefits: [
      "High-conversion content strategy",
      "Attracts high-intent solar prospects",
      "Unlimited revisions within your hour pool",
      "On-brand voice across every asset",
      "Top-of-funnel demand generation",
    ],
    roiMetric: {
      value: "10x",
      label: "Asset Output Increase",
    },
    process: [
      { step: "01", title: "Briefing & Strategy", description: "Define campaign objectives, design requirements, and target audience segments." },
      { step: "02", title: "Creative Layout", description: "Design high-converting asset layouts, applying solar brand guidelines." },
      { step: "03", title: "Review & Tweak", description: "Iterate and review drafts instantly using the interactive dashboard." },
      { step: "04", title: "Deployment Sync", description: "Publish and sync final assets across social networks and ad accounts." },
    ],
    specs: [
      { label: "Deliverables", value: "Graphics, ad banners, landing page copy" },
      { label: "Format Support", value: "Web, print-ready, high-res digital" },
      { label: "Feedback Cycles", value: "Collaborative interactive review" },
      { label: "Turnaround Time", value: "Average 48 hours per task" },
    ],
    faqs: [
      { question: "How does the asset briefing work?", answer: "You submit brief requirements via our client portal, and our creative team handles the layout and copy." },
      { question: "Are source design files included?", answer: "Yes, fully layered source files are delivered upon project completion." },
    ],
  },
  {
    slug: "paid-digital-advertising",
    icon: "ads_click",
    title: "Paid & Digital Advertising",
    tagline: "AI-Optimized Spend",
    shortDescription: "Lift conversion 37% and cut wasted ad spend by 42% in real time.",
    fullDescription:
      "We manage your paid media with real-time AI adjustments that improve conversion rates by 37% and reduce wasted spend by 42%. Our team targets property owners who are ready to invest in solar—not tire-kickers—so every dollar works harder.",
    benefit:
      "Stop lighting budget on fire with broad, untargeted campaigns. Spark Grow continuously optimizes targeting and creative so your cost-per-lead drops while lead quality climbs.",
    detailedBenefits: [
      "+37% conversion rate uplift",
      "-42% reduction in wasted spend",
      "Real-time AI bid & budget adjustments",
      "Property-owner intent targeting",
      "Continuous creative optimization",
    ],
    roiMetric: {
      value: "-42%",
      label: "Wasted Ad Spend Reduction",
    },
    process: [
      { step: "01", title: "Target Auditing", description: "Identify high-converting property owners and filter target regions." },
      { step: "02", title: "Funnel Setup", description: "Link lead-generation wizards, tracking cookies, and ad accounts." },
      { step: "03", title: "AI Tuning", description: "Configure automated bidding constraints and budget multipliers." },
      { step: "04", title: "Creative Scaling", description: "Deploy fresh ad copy and banners to prevent performance fatigue." },
    ],
    specs: [
      { label: "Supported Channels", value: "Google Search, Meta, Instagram, YouTube" },
      { label: "Optimization Type", value: "AI automated bid management" },
      { label: "Tracking Type", value: "First-party conversion tracking cookies" },
      { label: "Campaign Sync", value: "Real-time performance adjustments" },
    ],
    faqs: [
      { question: "How do you filter out non-homeowners?", answer: "We leverage property record databases and geofenced mapping grids to target actual homeowners." },
      { question: "What is the minimum ad spend budget?", answer: "We work with budgets of all sizes, but recommend a starting budget of $2,000/mo to gather significant data." },
    ],
  },
  {
    slug: "multi-platform-advertising",
    icon: "campaign",
    title: "Multi-Platform Advertising",
    tagline: "Omni-Channel Reach",
    shortDescription: "Precision execution across search and social to capture leads everywhere.",
    fullDescription:
      "High-intent homeowners don't live on one platform. Spark Grow executes with precision across search engines and social media, capturing solar leads wherever they spend their attention—Google, Meta, YouTube, and beyond.",
    benefit:
      "You stay top-of-mind across every channel a homeowner touches on their path to purchase, creating the omnipresent brand feel of a national player in your local market.",
    detailedBenefits: [
      "Coordinated search + social execution",
      "Cross-platform retargeting",
      "Unified messaging across channels",
      "Capture high-intent leads everywhere",
      "Local market omnipresence",
    ],
    roiMetric: {
      value: "37%",
      label: "Omni-Channel Lead Capture",
    },
    process: [
      { step: "01", title: "Audience Sync", description: "Collect and map target visitor lists across search and social." },
      { step: "02", title: "Messaging Match", description: "Coordinate ad copies so messages match as visitors switch platforms." },
      { step: "03", title: "Retargeting Setup", description: "Launch retargeting flows on social for search visitors." },
      { step: "04", title: "Unified Report", description: "Analyze performance metrics in a consolidated marketing dashboard." },
    ],
    specs: [
      { label: "Platform Coverage", value: "Google, Facebook, YouTube, LinkedIn" },
      { label: "Retargeting Type", value: "Cross-platform matching pixels" },
      { label: "Content Styles", value: "Search text, video clips, stories, reels" },
      { label: "Data Uptime", value: "Daily budget synchronization" },
    ],
    faqs: [
      { question: "Why run multi-platform retargeting?", answer: "It keeps your brand top-of-mind. Prospects who see ads across multiple channels convert 3x more often." },
      { question: "Do you create channel-specific content?", answer: "Yes, we format creative specifically for vertical reels, search text, and banners." },
    ],
  },
  {
    slug: "digital-creative",
    icon: "brush",
    title: "Digital Creative",
    tagline: "Campaign Fuel",
    shortDescription: "We handle the heavy lifting of digital ads and strategic creative.",
    fullDescription:
      "Spark Grow handles the heavy lifting of digital ad creation, creative design, and strategic content production that fuels your campaigns. Your media buyers always have fresh, tested creative ready to deploy—never waiting on a freelancer.",
    benefit:
      "Creative is the #1 lever in modern advertising. With an in-house creative engine, you ship more variations, test faster, and find your winners before competitors finish their first draft.",
    detailedBenefits: [
      "Endless ad creative variations",
      "Rapid creative testing cycles",
      "Strategic content aligned to campaigns",
      "Scroll-stopping ad design",
      "Always-ready creative pipeline",
    ],
    roiMetric: {
      value: "24h",
      label: "Average Creative Delivery",
    },
    process: [
      { step: "01", title: "Hook Ideation", description: "Identify high-converting copy angles and visual hooks." },
      { step: "02", title: "Asset Sourcing", description: "Compile licensed solar graphics, renders, and project layouts." },
      { step: "03", title: "Layout Composition", description: "Build animated motion graphics and styled ad banners." },
      { step: "04", title: "Ad Account Upload", description: "Inject creative files directly to your ad manager folders." },
    ],
    specs: [
      { label: "Deliverable Types", value: "Reels, static graphics, copy scripts" },
      { label: "Asset Resolutions", value: "4K, HD, mobile vertical formats" },
      { label: "Software Support", value: "Figma, Adobe Creative Suite, Blender" },
      { label: "Revision System", value: "Unlimited drafts within team hours" },
    ],
    faqs: [
      { question: "How often do you refresh creative?", answer: "We suggest refreshing creative weekly to combat ad fatigue and maintain a low cost-per-lead." },
      { question: "Can we submit our own install photos?", answer: "Yes! High-quality photos of your local installs are the best assets to build trust." },
    ],
  },
  {
    slug: "email-automation",
    icon: "mark_email_read",
    title: "Email Automation",
    tagline: "Lifecycle Nurture",
    shortDescription: "Behavior-based segmentation that nurtures leads from inquiry to install.",
    fullDescription:
      "Most leads aren't ready to buy on day one. Spark Grow builds behavior-based segmentation and lifecycle email campaigns that nurture every lead from first inquiry all the way to signed install—automatically.",
    benefit:
      "You stop losing slow-burn leads to forgotten follow-up. Automated, personalized sequences keep your brand in front of homeowners until they're ready, recovering revenue you're currently leaving on the table.",
    detailedBenefits: [
      "Behavior-based segmentation",
      "Full lifecycle nurture flows",
      "Automated follow-up sequences",
      "Inquiry-to-install journeys",
      "Re-engagement of cold leads",
    ],
    roiMetric: {
      value: "22%",
      label: "Average Open Rate Increase",
    },
    process: [
      { step: "01", title: "Lead Segmentation", description: "Categorize leads by stage: raw lead, site audit, proposal, closed." },
      { step: "02", title: "Journey Construction", description: "Design trigger-based email flows for automated customer nurturing." },
      { step: "03", title: "Copy Composition", description: "Draft educational newsletters, case studies, and follow-ups." },
      { step: "04", title: "Analytics Feedback", description: "Review click-through statistics to optimize email timings." },
    ],
    specs: [
      { label: "Automation Platforms", value: "HubSpot, ActiveCampaign, Mailchimp, CRM tools" },
      { label: "Trigger Types", value: "Behavioral events, pipeline stage changes" },
      { label: "Email Layouts", value: "Responsive HTML and plain-text formats" },
      { label: "Spam Guard", value: "SPF, DKIM, DMARC validation checked" },
    ],
    faqs: [
      { question: "How many emails are in a typical nurture flow?", answer: "We design a 5 to 7 step sequence over 30 days to build trust without spamming." },
      { question: "Will automated emails end up in spam?", answer: "We strictly follow sender guidelines and configure correct server records to keep deliverability high." },
    ],
  },
  {
    slug: "cro",
    icon: "conversion_path",
    title: "Conversion Rate Optimization",
    tagline: "Funnel Efficiency",
    shortDescription: "Find and fix funnel friction with A/B testing and heatmaps.",
    fullDescription:
      "Spark Grow identifies friction points in your funnel using rigorous A/B testing and heatmap analysis, then systematically removes them to improve funnel efficiency. Small percentage gains compound into massive revenue increases.",
    benefit:
      "You squeeze more leads and sales out of the traffic you already have. CRO is the cheapest growth lever in existence—why pay for more clicks when you can convert the ones you've got?",
    detailedBenefits: [
      "A/B & multivariate testing",
      "Heatmap & session analysis",
      "Friction-point identification",
      "Landing page optimization",
      "Higher ROI on existing traffic",
    ],
    roiMetric: {
      value: "+28%",
      label: "Landing Page Conversion Lift",
    },
    process: [
      { step: "01", title: "Behavior Auditing", description: "Deploy heatmaps and watch recordings to find UX bottlenecks." },
      { step: "02", title: "Hypothesis Build", description: "Plan layout variations, CTA placements, and headlines." },
      { step: "03", title: "A/B Testing", description: "Route traffic evenly between current and updated pages." },
      { step: "04", title: "Design Deploy", description: "Promote winning pages to 100% of traffic once verified." },
    ],
    specs: [
      { label: "Testing Methods", value: "A/B, multivariate, redirect tests" },
      { label: "Audit Tools", value: "Microsoft Clarity, Hotjar, Google Optimize" },
      { label: "Page builders", value: "Next.js dynamic routes, Custom HTML" },
      { label: "Evaluation Period", value: "Minimum 1,000 visitors per test" },
    ],
    faqs: [
      { question: "How does A/B testing impact site speed?", answer: "We use server-side variations and lightweight scripts so test pages load instantly." },
      { question: "What is a typical conversion rate for solar landers?", answer: "Standard pages convert at 2-3%. Our optimized pages target a 7-10% completion rate." },
    ],
  },
  {
    slug: "analytics-reporting",
    icon: "monitoring",
    title: "Analytics & Reporting",
    tagline: "Actionable Intelligence",
    shortDescription: "Predict lifetime value with monthly solar-specific insights.",
    fullDescription:
      "Spark Grow predicts customer lifetime value and delivers actionable, solar-specific insights every month. You see exactly what's working, what's not, and where to invest next—no vanity metrics, just decisions.",
    benefit:
      "You finally get clarity on your marketing. Instead of drowning in dashboards, you receive a clear monthly readout of performance and the specific moves to make next.",
    detailedBenefits: [
      "Predictive lifetime value modeling",
      "Monthly solar-specific insights",
      "Actionable recommendations",
      "Full-funnel performance tracking",
      "Clear, jargon-free reporting",
    ],
    roiMetric: {
      value: "100%",
      label: "Lead-To-PTO Tracking",
    },
    process: [
      { step: "01", title: "Tag Deployment", description: "Set up first-party tracking tags across all page funnels." },
      { step: "02", title: "Pipeline Syncing", description: "Connect website data to offline CRM sales metrics." },
      { step: "03", title: "Event Correlation", description: "Trace signed installs back to their original ad campaigns." },
      { step: "04", title: "Executive Report", description: "Produce a monthly marketing dashboard highlighting ROI." },
    ],
    specs: [
      { label: "Reporting Frequency", value: "Real-time dashboard + monthly overview" },
      { label: "Attribution Type", value: "Linear, first/last touch, custom data maps" },
      { label: "Dashboard Integrations", value: "Looker Studio, PowerBI, custom portal" },
      { label: "Accuracy Rate", value: "99% verified event correlation" },
    ],
    faqs: [
      { question: "Can we track lead sources from phone calls?", answer: "Yes, we integrate dynamic number insertion (DNI) to attribute call leads." },
      { question: "How do you secure homeowner data?", answer: "All stored analytics tokens are hashed and comply with local privacy policies." },
    ],
  },
  {
    slug: "creative-services",
    icon: "palette",
    title: "Creative Services",
    tagline: "Print & Digital Assets",
    shortDescription: "Solar-specific design for ads, flyers, door hangers, and direct mail.",
    fullDescription:
      "Spark Grow delivers solar-specific design solutions spanning social media ads, social designs, printed sales flyers, door hangers, and direct mail assets. Whether your team knocks doors or runs digital, we arm them with conversion-grade collateral.",
    benefit:
      "Your field and digital teams operate with polished, on-brand materials that build instant trust. No more cobbled-together flyers or off-brand designs undermining your premium positioning.",
    detailedBenefits: [
      "Social media ad & post design",
      "Printed sales flyers",
      "Door hangers for canvassing",
      "Direct mail assets",
      "Consistent solar-centric branding",
    ],
    roiMetric: {
      value: "+25%",
      label: "Field Close Rate Increase",
    },
    process: [
      { step: "01", title: "Collateral Blueprint", description: "Identify material needs for digital ads or canvassing door-hangers." },
      { step: "02", title: "Visual Layout", description: "Create high-end print layouts and vector asset graphics." },
      { step: "03", title: "Asset Review", description: "Fine-tune margins, color profiles, and local branding copy." },
      { step: "04", title: "Print Coordination", description: "Deliver print-ready source files with bleed margins." },
    ],
    specs: [
      { label: "Supported Assets", value: "Flyers, door-hangers, mailers, social posts" },
      { label: "File Formats", value: "Vector PDF, High-Res PNG, source PSD/AI" },
      { label: "Color Profiles", value: "CMYK (print), RGB (screen)" },
      { label: "Scale Support", value: "Unlimited assets within team hours" },
    ],
    faqs: [
      { question: "Can we print materials through our local vendor?", answer: "Yes, we deliver layouts conforming exactly to your print vendor's specs." },
      { question: "Do you write copy for direct mail?", answer: "Yes, we write localized, direct-response solar copy for all mailers." },
    ],
  },
  {
    slug: "social-media",
    icon: "thumb_up",
    title: "Social Media",
    tagline: "Trust & Authority",
    shortDescription: "Build trust with a strategic presence and real installation showcases.",
    fullDescription:
      "Spark Grow builds trust through a strategic social presence—showcasing real installations, engaging your community, and publishing content that positions you as the obvious local choice. Social proof becomes your silent closer.",
    benefit:
      "Homeowners vet you on social before they ever call. A strong, active presence full of real installs and happy customers turns skeptics into booked appointments.",
    detailedBenefits: [
      "Strategic content calendar",
      "Installation showcase posts",
      "Community engagement",
      "Social proof & trust building",
      "Consistent brand presence",
    ],
    roiMetric: {
      value: "15k+",
      label: "Organic Audience Impressions",
    },
    process: [
      { step: "01", title: "Social Blueprint", description: "Establish content buckets, posting calendars, and styling guides." },
      { step: "02", title: "Asset Gathering", description: "Compile photos of system installs, crew stories, and reviews." },
      { step: "03", title: "Post Design & Copy", description: "Write descriptions, edit reels, and design post slides." },
      { step: "04", title: "Auto-Scheduling", description: "Queue posts to publish automatically during peak hours." },
    ],
    specs: [
      { label: "Platforms Supported", value: "Instagram, Facebook, LinkedIn, YouTube" },
      { label: "Post Types", value: "Reels, stories, image carousels, text posts" },
      { label: "Review Window", value: "1-week approval buffer" },
      { label: "Asset Resolution", value: "1080x1080 (grid), 1080x1920 (reels)" },
    ],
    faqs: [
      { question: "Do we need to record our own videos?", answer: "We edit raw footage provided by your field crew into polished, short reels." },
      { question: "Do you handle replying to comments?", answer: "Yes, we manage comments and route direct messages to your sales pipeline." },
    ],
  },
  {
    slug: "advanced-ai",
    icon: "smart_toy",
    title: "Advanced AI Features",
    tagline: "Spark AI Engine",
    shortDescription: "We use Spark AI to automate and optimize the entire creative process.",
    fullDescription:
      "Spark Grow leverages the Spark AI engine to automate and optimize our entire creative process—from ideation to production to optimization. This ensures peak performance and efficiency, letting us produce more, faster, for the same budget.",
    benefit:
      "AI-augmented production means your dollar stretches further than any traditional agency can match. You get enterprise-scale output without enterprise-scale cost.",
    detailedBenefits: [
      "AI-augmented creative production",
      "Automated campaign optimization",
      "Faster ideation-to-launch cycles",
      "Maximum output per dollar",
      "Continuous performance tuning",
    ],
    roiMetric: {
      value: "4.2x",
      label: "Asset Generation Efficiency",
    },
    process: [
      { step: "01", title: "Model Configuration", description: "Train LLM engines on your brand guidelines and pitch data." },
      { step: "02", title: "Workflow Building", description: "Build automation scripts to link CRM events to AI actions." },
      { step: "03", title: "Copy & Graphic Ideation", description: "Generate ad copies and layout drafts programmatically." },
      { step: "04", title: "Optimization Loop", description: "Evaluate ad CTRs and auto-promote winning variables." },
    ],
    specs: [
      { label: "Core Technology", value: "Private multi-model AI orchestration" },
      { label: "AI Applications", value: "Content generation, auto-replies, intent checks" },
      { label: "Integrations", value: "HubSpot, Salesforce, custom APIs" },
      { label: "SLA Response", value: "Under 10 seconds execution" },
    ],
    faqs: [
      { question: "Does AI-generated content sound robotic?", answer: "No, we use fine-tuned parameters that match your specific brand voice." },
      { question: "Is our CRM data secure with the AI?", answer: "Yes, we use secure, private API endpoints that do not train public models." },
    ],
  },
  {
    slug: "video-production",
    icon: "movie",
    title: "Video Production",
    tagline: "Cinematic Conversion",
    shortDescription: "High-production explainers, motion graphics, and testimonials.",
    fullDescription:
      "Spark Grow captivates homeowners with high-production video explainers, motion graphics, and professional testimonials engineered for social conversion. Video is the highest-performing format—and we make it at studio quality.",
    benefit:
      "Video builds emotional trust faster than any other medium. Professional explainers and authentic testimonials shorten your sales cycle and dramatically lift ad performance.",
    detailedBenefits: [
      "High-production video explainers",
      "Motion graphics & animation",
      "Professional customer testimonials",
      "4K drone & install footage",
      "Conversion-optimized for social",
    ],
    roiMetric: {
      value: "+54%",
      label: "Click-Through Rate Lift",
    },
    process: [
      { step: "01", title: "Script & Storyboard", description: "Draft ad scripts and visual guidelines for customer stories." },
      { step: "02", title: "Media Editing", description: "Trim raw customer recordings and import install drone shots." },
      { step: "03", title: "Motion Graphics", description: "Add animated text, solar benefit charts, and captions." },
      { step: "04", title: "Audio Mastering", description: "Clean audio, add background tracks, and sync voiceover." },
    ],
    specs: [
      { label: "Deliverables", value: "Short ads, customer testimonials, explainers" },
      { label: "Supported Formats", value: "Mobile vertical (9:16), wide landscape (16:9)" },
      { label: "Audio Quality", value: "Studio mastered, balanced dialog levels" },
      { label: "Turnaround Time", value: "72 hours per edited video asset" },
    ],
    faqs: [
      { question: "Do you send camera crews to our location?", answer: "No, we edit raw assets provided by your team or coordinate remote recording sessions." },
      { question: "Do you provide voiceovers?", answer: "Yes, we provide professional voice actors or hyper-realistic AI voice tracks." },
    ],
  },
  {
    slug: "sales-enablement",
    icon: "co_present",
    title: "Sales Enablement",
    tagline: "Close-Rate Tools",
    shortDescription: "High-converting decks and interactive tools that close deals in-home.",
    fullDescription:
      "Spark Grow equips your reps with high-converting sales decks, digital presentations, and interactive tools that help them close deals faster in the home. We turn your pitch into a polished, persuasive experience.",
    benefit:
      "Your closers walk in with a $100M-brand presentation in their hands. Professional, interactive sales tools build credibility on the spot and lift close rates across your entire team.",
    detailedBenefits: [
      "High-converting sales decks",
      "Interactive digital presentations",
      "In-home closing tools",
      "Branded proposal templates",
      "Faster, more confident closes",
    ],
    roiMetric: {
      value: "+18%",
      label: "Rep In-Home Close Rate Lift",
    },
    process: [
      { step: "01", title: "Pitch Assessment", description: "Auditing your current in-home deck to identify leaks." },
      { step: "02", title: "Design Customization", description: "Create customized slides showing regional utility stats." },
      { step: "03", title: "Interactive Deck Build", description: "Develop responsive, tablet-friendly pitch assets." },
      { step: "04", title: "Proposal Templating", description: "Design branded layout templates for proposal bids." },
    ],
    specs: [
      { label: "Deliverable Types", value: "Interactive pitch decks, proposal templates, sheets" },
      { label: "Software Support", value: "Google Slides, Canva, Adobe PDF" },
      { label: "Accessibility", value: "Optimized for mobile & tablet screens" },
      { label: "Asset Syncing", value: "Synchronized with active solar rates" },
    ],
    faqs: [
      { question: "Can our sales reps edit the decks?", answer: "Yes, we deliver Google Slides or Canva templates that are easy to adjust." },
      { question: "Do these decks work offline?", answer: "Yes, we deliver PDF versions that can be stored on iPads and work offline." },
    ],
  },
]
