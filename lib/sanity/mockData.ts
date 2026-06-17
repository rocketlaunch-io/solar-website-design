export interface Category {
  title: string;
  description?: string;
}

export interface Author {
  name: string;
  image?: string;
  bio?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  mainImageLocal: string; // fallback local path
  mainImage?: any; // Sanity image structure
  author: Author;
  categories: Category[];
  body: any[]; // Portable text
}

export const mockCategories: Category[] = [
  { title: "SEO", description: "Search engine optimization strategies for solar installers." },
  { title: "Conversion", description: "Conversion rate optimization for solar lead generation." },
  { title: "Sales", description: "Modern solar sales processes, pitching, and financing strategies." },
  { title: "Performance", description: "Speed, Core Web Vitals, and web architecture for solar brands." }
];

export const mockAuthors: { [key: string]: Author } = {
  david: {
    name: "David Vance",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Head of SEO at Spark. Helping solar dealers scale local organic traffic with programmatic systems."
  },
  sarah: {
    name: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80",
    bio: "VP of Product Design. Specializes in building high-conversion user experiences for clean-tech websites."
  },
  marcus: {
    name: "Marcus Brody",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Solar Growth Advisor. Ex-residential installer turned sales strategist for top-tier dealers."
  },
  alex: {
    name: "Alex Mercer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Principal Performance Engineer. Obsessed with sub-second page loads and modern edge delivery."
  }
};

export const mockPosts: Post[] = [
  {
    _id: "post-1",
    title: "The Ultimate Local SEO Playbook for Residential Solar Dealers",
    slug: { current: "local-seo-playbook-solar-dealers" },
    excerpt: "Learn how residential solar dealers can capture high-intent local search traffic, dominate regional map packs, and construct programmatic landing pages that convert zip codes into active pipelines.",
    publishedAt: "2026-06-12T10:00:00.000Z",
    readingTime: "6 min read",
    mainImageLocal: "/images/blog/seo-playbook.png",
    author: mockAuthors.david,
    categories: [mockCategories[0]],
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Organic search is one of the most cost-effective acquisition channels for residential solar dealers. Unlike paid search, where lead costs (CPL) escalate every year, local SEO yields a compounding return. When a homeowner searches for " },
          { _type: "span", text: "best solar installers near me", marks: ["strong"] },
          { _type: "span", text: " or " },
          { _type: "span", text: "solar panel cost in [city]", marks: ["strong"] },
          { _type: "span", text: ", they are showing immediate intent. If you aren't visible, you are handing those high-value leads directly to your competitors." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "1. Dominate the Local Map Pack (Google Business Profile)" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "For local solar installers, the 3-Pack on Google Maps is prime digital real estate. Over 40% of localized clicks go to the map pack. Here is how to audit and optimize your Google Business Profile (GBP):" }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• Business Name Accuracy:", marks: ["strong"] },
          { _type: "span", text: " Do not stuff keywords. Keep it identical to your legal/brand name. Keyword stuffing is the #1 reason profiles get suspended." }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• Primary Category Selection:", marks: ["strong"] },
          { _type: "span", text: " Select 'Solar Energy Installer' or 'Solar Energy Equipment Supplier'. This dictates what queries Google associates with your profile." }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• Review Velocity and Recency:", marks: ["strong"] },
          { _type: "span", text: " Build a post-install process where crews request reviews before leaving the site. Send SMS review reminders. Consistently receiving 5-star reviews keeps your ranking high." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "2. Build Programmatic Geo-Targeted Service Pages" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Homeowners want local experts. If you serve a 50-mile radius containing 30 small cities or suburbs, creating a single generic home page will not rank you for local intent. You need dedicated service landing pages for each key market area." }
        ]
      },
      {
        _type: "block",
        style: "blockquote",
        children: [
          { _type: "span", text: "A programmatic page is not a duplicate copy-paste template. Google recognizes thin content. Each page must contain genuine local facts: average solar savings in that city, local utility rebate policies, and active project installations in that zip code." }
        ]
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "The Anatomy of a High-Ranking Solar Location Page" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Every local landing page must contain the following components:" }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "1. Localized Hero Section: " },
          { _type: "span", text: "'Top-Rated Solar Installer in [City Name], [State]'", marks: ["strong"] }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "2. Utility Specifics: " },
          { _type: "span", text: "Breakdown of net metering policies and interconnection steps for the local utility (e.g. PG&E, Duke Energy, Oncor).", marks: ["em"] }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "3. Interactive Quote Wizard: " },
          { _type: "span", text: "An embedded form that filters based on the specific city's average utility rates." }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "4. Real Reviews: " },
          { _type: "span", text: "Schema-marked testimonials from customers within that specific city or neighboring zip codes." }
        ]
      }
    ]
  },
  {
    _id: "post-2",
    title: "How to Optimize Your Solar Quote Wizard for 3x Conversion",
    slug: { current: "optimize-solar-quote-wizard-conversion" },
    excerpt: "Friction is the silent killer of solar leads. Discover the behavioral science and layout shifts required to transform standard form fields into interactive, value-first solar calculators.",
    publishedAt: "2026-06-08T09:15:00.000Z",
    readingTime: "8 min read",
    mainImageLocal: "/images/blog/quote-wizard.png",
    author: mockAuthors.sarah,
    categories: [mockCategories[1]],
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Most residential solar websites suffer from a massive conversion bottleneck: the lead capture form. Traditional forms ask for name, email, phone, and electric bill amount upfront. To a modern shopper, this screams " },
          { _type: "span", text: "'I am about to get spammed by aggressive sales reps.'", marks: ["em"] },
          { _type: "span", text: " This friction results in drop-off rates as high as 85%." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "1. The Psychology of Value-First Qualification" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "To lift conversion rates, you must flip the value proposition. Instead of asking for data before giving information, structure your quote wizard as an educational tool. Provide immediate, interactive feedback that rewards the user for completing steps. This builds trust and leverages the psychological principle of reciprocity." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "2. The Golden Rules of Wizard Layout" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Here are the top UX design practices to optimize your solar quote funnel:" }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• Start with Micro-Commitments:", marks: ["strong"] },
          { _type: "span", text: " The first question should be extremely easy and non-intrusive. E.g. 'What is your average monthly power bill?' or 'Do you own your home?' These require simple taps and carry no threat of unsolicited calls." }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• Visual Progress Indicators:", marks: ["strong"] },
          { _type: "span", text: " Show a progress bar. Homeowners are far more likely to complete a task if they know exactly how close they are to the finish line." }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• Autocomplete Addresses:", marks: ["strong"] },
          { _type: "span", text: " Implement Google Places API. As soon as the user starts typing their address, autofill the fields. This reduces typing effort and secures accurate address data for solar roof modeling." }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• Postpone Personal Contact Info:", marks: ["strong"] },
          { _type: "span", text: " Do not ask for phone or email until the very last step. Once a user has spent 60 seconds inputting their bill, roof details, and savings calculations, they are highly invested. They will complete the contact field to get their customized final report." }
        ]
      },
      {
        _type: "block",
        style: "blockquote",
        children: [
          { _type: "span", text: "A top-performing wizard does not just collect info. It actively educates. As they increase their bill slider, show real-time estimates of their 25-year cumulative savings. This visual impact turns a mundane form into a compelling sales demo." }
        ]
      }
    ]
  },
  {
    _id: "post-3",
    title: "Winning the Residential Solar Pitch in a High-Interest Rate Environment",
    slug: { current: "win-residential-solar-pitch-high-interest-rates" },
    excerpt: "With rising interest rates, solar sales require a shift from simple 'zero-down' slogans to high-trust, educational financial calculators and transparent savings pages.",
    publishedAt: "2026-06-01T08:30:00.000Z",
    readingTime: "5 min read",
    mainImageLocal: "/images/blog/pitch-guide.png",
    author: mockAuthors.marcus,
    categories: [mockCategories[2]],
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "The residential solar market has shifted. In the era of cheap capital, solar salespeople could easily pitch " },
          { _type: "span", text: "'zero-down financing and immediate bill savings.'", marks: ["em"] },
          { _type: "span", text: " Today, with interest rates on solar loans hovering between 8% and 12%, that simplistic pitch no longer works. Homeowners are highly sensitive to debt. To close deals, installers must adopt a consultative, financial-analyst mindset." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "1. Pitch Cash Flow, Not Just System Cost" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Homeowners look at their monthly bottom line. A high-interest loan might make the monthly solar payment higher than the initial utility savings in year one. However, utility rates are rising at 4% to 8% annually across the US. Your pitch must focus on the long-term hedge." }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• The Rate Lock Story:", marks: ["strong"] },
          { _type: "span", text: " Position solar as a fixed-rate utility plan. While grid power escalates unpredictably, a solar loan remains flat. By year three or four, the savings crossover occurs, leading to massive long-term cash flow benefits." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "2. Leverage the Power of Educational Content" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Modern buyers do research. If your sales reps are the only source of information, customers will be skeptical. Use your website as a trust validator. Host educational articles explaining:" }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• Solar Loan vs. PPA vs. Lease: ", marks: ["strong"] },
          { _type: "span", text: "Provide transparent pros and cons of each model. A homeowner who understands the tax benefits of ownership (like the 30% ITC) is far more likely to proceed with a loan or cash purchase." }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• The Cost of Delay: ", marks: ["strong"] },
          { _type: "span", text: "Create an interactive graph showing how waiting two years for interest rates to fall is actually more expensive than installing now, due to lost utility savings and potential ITC reductions." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "3. Elevate Digital Transparency" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Providing detailed online ROI calculators allows users to pre-qualify themselves. When your sales rep contacts the homeowner, they aren't pitching cold. They are validating the numbers the user already reviewed on your website. This cuts sales cycles in half and drastically reduces cancellation rates." }
        ]
      }
    ]
  },
  {
    _id: "post-4",
    title: "Why Speed is Your Best Sales Rep: The Direct Link Between LCP and Solar Leads",
    slug: { current: "speed-is-best-sales-rep-lcp-solar-leads" },
    excerpt: "Every millisecond counts when bidding for solar traffic. We break down the correlation between Largest Contentful Paint (LCP) and lead conversion rates for solar installers.",
    publishedAt: "2026-05-24T11:00:00.000Z",
    readingTime: "4 min read",
    mainImageLocal: "/images/blog/speed-leads.png",
    author: mockAuthors.alex,
    categories: [mockCategories[3]],
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "In digital marketing, speed is not just a technical metric. Speed is money. If a homeowner clicks your ad on Facebook or Google Search and the site takes longer than three seconds to load, they are gone. You paid for that click, and now you've lost the lead. For solar installers running high-budget ad campaigns, this leakage is incredibly costly." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "1. Core Web Vitals and Page Speed Defined" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Google evaluates sites based on Core Web Vitals. The most critical metric for user experience is " },
          { _type: "span", text: "Largest Contentful Paint (LCP)", marks: ["strong"] },
          { _type: "span", text: ", which measures how long it takes for the main content (usually your hero banner or lead form) to become visible on the screen. Google recommends an LCP under 2.5 seconds." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "2. The Mathematical Impact on Acquisition Costs" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Industry data shows a direct correlation between LCP and conversion rates. A site that loads in 1.5 seconds converts at roughly 3x the rate of a site that loads in 4.5 seconds." }
        ]
      },
      {
        _type: "block",
        style: "blockquote",
        children: [
          { _type: "span", text: "Let's run the math: If your ad campaign gets 1,000 clicks at a $15 Cost-Per-Click, you spend $15,000. On a slow site (4.5s load, 1.5% conversion), you get 15 leads. Your Cost-Per-Lead (CPL) is $1,000. On a fast site (1.5s load, 4.5% conversion), you get 45 leads. Your CPL drops to $333. You literally tripled your revenue potential for the same ad spend." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "3. How Spark Achieves Sub-Second Page Speeds" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "To deliver elite page performance, we design on modern serverless edge architecture. We bypass heavy, bloated CMS platforms in favor of static next-gen rendering. Key speed optimization techniques include:" }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• Edge Caching: ", marks: ["strong"] },
          { _type: "span", text: "Distributing the website to globally positioned CDN edge servers, ensuring the content is physically close to the user." }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• Next-Gen Image Compression: ", marks: ["strong"] },
          { _type: "span", text: "Using WebP or AVIF formats to reduce image weight by 70% without sacrificing crisp rendering." }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "• Eliminating Unused JavaScript: ", marks: ["strong"] },
          { _type: "span", text: "Ensuring only the interactive components needed for lead qualifying are sent to the client browser, minimizing load times." }
        ]
      }
    ]
  },
  {
    _id: "post-5",
    title: "The Death of the Contact Form: Why Multi-Step Quote Wizards are Non-Negotiable in 2026",
    slug: { current: "death-of-contact-form-multi-step-wizards" },
    excerpt: "Traditional contact forms leak leads like a sieve. We explore how Spark's psychology-backed Multi-Step Lead Engine and interactive Google Solar mapping calculator drive up to 340% conversion lifts.",
    publishedAt: "2026-05-18T14:30:00.000Z",
    readingTime: "7 min read",
    mainImageLocal: "/images/blog/death-form.png",
    author: mockAuthors.sarah,
    categories: [mockCategories[1]],
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Look at your solar website's current contact page. If you are still asking homeowners to fill out a static form with fields for name, email, phone, address, and utility bill, you are operating on a decade-old playbook. Homeowners in 2026 demand an interactive, value-first digital experience. A standard form is a roadblock; a multi-step quote wizard is an open highway." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "1. The High Cost of Form Friction" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Friction is the psychological drag a user feels when completing an online task. In solar marketing, friction translates directly to wasted ad spend. When a customer is hit with a wall of empty boxes requesting sensitive contact details, their defensive mechanisms activate. They know a phone call from a pushy canvasser is coming. They close the tab." }
        ]
      },
      {
        _type: "block",
        style: "blockquote",
        children: [
          { _type: "span", text: "Spark solves this with its signature " },
          { _type: "span", text: "Lead Gen Engine", marks: ["strong"] },
          { _type: "span", text: ". By breaking the qualification path into bite-sized, gamified questions (one screen at a time), we reduce the cognitive load. Homeowners answer simple questions first, building momentum before being asked for contact details. The result? A massive " },
          { _type: "span", text: "340% increase in lead completion", marks: ["strong"] },
          { _type: "span", text: " compared to traditional static layouts." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "2. The Magic of Rooftop Satellite Scanning" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Modern shoppers expect personalized data. Spark's " },
          { _type: "span", text: "Solar Savings Calculator", marks: ["strong"] },
          { _type: "span", text: " integrates directly with the Google Solar API. When a user enters their address, the wizard automatically retrieves satellite imagery of their actual roof, models the tilt angle, estimates shading from nearby trees, and calculates annual sun exposure." }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Instead of receiving a generic thank-you page, the homeowner is presented with a 3D visualization of solar panels layered onto their home. They can adjust sliders to simulate different offset percentages and instantly compare financial returns across " },
          { _type: "span", text: "Cash, Loan, and PPA financing options", marks: ["em"] },
          { _type: "span", text: ". Providing this level of value upfront pre-qualifies the lead, turning a casual browser into an educated buyer who is eager to speak with your project consultants." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "3. Direct CRM Integration" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Collecting high-intent lead data is only half the battle. Spark's " },
          { _type: "span", text: "CRM Bridge", marks: ["strong"] },
          { _type: "span", text: " securely transmits enriched lead profiles directly into your HubSpot, Salesforce, or custom CRM in under 200 milliseconds. No manual data transfer, no delayed replies. By the time the homeowner finishes looking at their savings report, their profile is already in your pipeline, ready for immediate follow-up." }
        ]
      }
    ]
  },
  {
    _id: "post-6",
    title: "AI Search Optimization (GEO): Preparing Your Solar Brand for ChatGPT, Gemini, and SearchGPT",
    slug: { current: "ai-search-optimization-geo-solar-brands" },
    excerpt: "The era of the 10 blue links is ending. Homeowners are now asking AI agents for local solar advice. Discover how Spark's AI-First SEO Engine and semantic schemas put your brand at the center of the AI knowledge graph.",
    publishedAt: "2026-05-10T10:00:00.000Z",
    readingTime: "6 min read",
    mainImageLocal: "/images/blog/ai-search.png",
    author: mockAuthors.david,
    categories: [mockCategories[0]],
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Search engines are undergoing their biggest revolution in twenty years. Homeowners are increasingly bypassing traditional search boxes. Instead of googling, they are asking conversational AI models like ChatGPT, Google Gemini, and Claude for recommendations: " },
          { _type: "span", text: "'Who is the most reliable solar installer in Phoenix with net metering expertise?'", marks: ["em"] },
          { _type: "span", text: " To survive, solar dealers must transition from traditional SEO to Generative Engine Optimization (GEO)." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "1. How AI Agents Read Your Website" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "AI agents do not browse websites like humans do. They use large language models (LLMs) and web crawlers to scan for facts, structure, and authority. If your site is built on a bloated WordPress site cluttered with page builders and messy plugins, the AI scanner will struggle to parse your data, and it will recommend a competitor instead." }
        ]
      },
      {
        _type: "block",
        style: "blockquote",
        children: [
          { _type: "span", text: "Spark's " },
          { _type: "span", text: "AI-First SEO Engine", marks: ["strong"] },
          { _type: "span", text: " utilizes clean, semantic HTML5 structure combined with advanced JSON-LD schema markup. We feed AI knowledge graphs structured, machine-readable facts about your business, licensing, service areas, and customer feedback. By acting as the 'Source of Truth' for AI search models, Spark ensures your brand is recommended as the top local authority." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "2. The Importance of Edge Delivery for AI Indexers" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Speed is critical for crawlers. Search engine bots have strict time budgets. Spark's " },
          { _type: "span", text: "Edge Architecture", marks: ["strong"] },
          { _type: "span", text: " deploys compiled React 19 pages across a global network of 300+ CDN edge nodes. With a Time-to-First-Byte (TTFB) of under 12ms and a 100/100 Core Web Vitals score, crawlers can index your pages instantly, ensuring your newest reviews and pricing updates are immediately available to conversational search systems." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "3. Hyper-Local Programmatic scale" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "When a homeowner asks an AI for solar info in a specific neighborhood, general claims won't work. Spark's " },
          { _type: "span", text: "Local SEO Engine", marks: ["strong"] },
          { _type: "span", text: " allows you to instantly generate geo-targeted landing pages for every city and zip code you service. Each page automatically pulls local utility tariffs, state tax incentives, and regional weather patterns. When ChatGPT searches for localized statistics, it finds your custom zip code pages and cites your brand as the expert source." }
        ]
      }
    ]
  },
  {
    _id: "post-7",
    title: "Speed-to-Lead: The Math Behind CRM Integrations and Automated Voice Qualification",
    slug: { current: "speed-to-lead-crm-voice-qualification" },
    excerpt: "A lead that waits 5 minutes cools off by 10x. Learn how Spark's sub-200ms CRM Bridge and 24/7 AI Voice Agents instantly capture and qualify residential solar prospects before they look elsewhere.",
    publishedAt: "2026-05-02T09:00:00.000Z",
    readingTime: "6 min read",
    mainImageLocal: "/images/blog/speed-lead-math.png",
    author: mockAuthors.marcus,
    categories: [mockCategories[2]],
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "In high-velocity solar sales, time is your most brutal competitor. Lead response speed is the single greatest predictor of appointment conversion. If you contact a homeowner within one minute of form completion, your chances of qualifying them increase by over 390%. Wait just five minutes, and that probability drops by 10x. If you wait an hour, you might as well throw the lead in the trash." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "1. The Speed-to-Lead Decay Curve" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Why do leads decay so fast? Homeowners shopping for solar panels are often clicking multiple ads. When they submit a form, they are highly focused on the topic. Within five minutes, they have moved on to a different email, a phone notification, or a family task. Furthermore, they may have submitted forms on three different installer sites. The first installer who picks up the phone wins the relationship—and closes the deal 70% of the time." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "2. Bypassing Latency with Spark CRM Bridge" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Many solar companies rely on email notifications or basic integrations that sync lead data once an hour. That delay is fatal. Spark's " },
          { _type: "span", text: "CRM Bridge", marks: ["strong"] },
          { _type: "span", text: " is engineered with a sub-200ms event-driven gateway. The instant a homeowner presses submit on your quote wizard, their enriched data (including satellite-mapped roof savings) is injected directly into your CRM. An automated webhook triggers an immediate confirmation SMS and email containing a direct calendar link to schedule a consultation, keeping the momentum alive." }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "3. 24/7 Lead Calling with Spark Voice Agents" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "But what happens to leads submitted at 10:00 PM on a Sunday? Your sales reps are asleep, but Spark's " },
          { _type: "span", text: "Voice Agents", marks: ["strong"] },
          { _type: "span", text: " are active. Spark AI features hyper-realistic, low-latency voice models that can instantly initiate an outbound qualification call (with 0s wait time) when a lead lands." }
        ]
      },
      {
        _type: "block",
        style: "blockquote",
        children: [
          { _type: "span", text: "The AI agent reads the database, speaks to the homeowner in a warm, conversational human voice, answers common questions about the ITC tax credit, verifies their roof shade patterns, and books them directly onto your elite rep's calendar for Monday morning. You secure the booking while your competitors are still asleep, maximizing lead capture ROI." }
        ]
      }
    ]
  }
];

