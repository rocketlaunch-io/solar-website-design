export interface GrowService {
  slug: string
  icon: string
  title: string
  tagline: string
  shortDescription: string
  fullDescription: string
  benefit: string
  detailedBenefits: string[]
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
  },
]
