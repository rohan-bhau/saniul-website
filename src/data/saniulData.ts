export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  field: string;
  description: string;
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  industry: string;
  role: string;
  period: string;
  established: string;
  description: string;
  fullDescription: string[];
  location: string;
  image: string;
  galleryImages: string[];
  keyMetrics: { label: string; value: string }[];
  responsibilities: string[];
  gradient: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  responsibilities: string[];
}

export const SANIUL_DATA = {
  person: {
    name: "Sani Ul",
    role: "Operations Manager",
    organization: "Ayan Trading House",
    tagline: "Building businesses with discipline, purpose and consistency.",
    eyebrow: "BUSINESS • OPERATIONS • ENTREPRENEURSHIP",
    roles: [
      "Operations Manager",
      "Business Professional",
      "Entrepreneur & Founder",
      "Trading Specialist",
    ],
    heroDescription:
      "Sani Ul is a business professional, entrepreneur, and Operations Manager at Ayan Trading House — committed to building and operating businesses with discipline and purpose.",
    location: "Bangladesh",
    aboutIntro:
      "Sani Ul is a business professional and entrepreneur based in Bangladesh. As the Operations Manager at Ayan Trading House, he oversees day-to-day operations while actively pursuing entrepreneurial ventures through multiple sole proprietorship businesses.",
    aboutProfessional:
      "With a focus on operations, business management, and responsible execution, Sani approaches every venture with discipline and a long-term perspective. His work spans across trading, operations management, and building businesses from the ground up.",
    aboutPhilosophy:
      "Good business is built through consistency, relationships and responsible execution.",
    contact: {
      email: "ulsani42@gmail.com",
      location: "Dhaka, Bangladesh",
    },
    socials: {
      linkedin: "https://www.linkedin.com/in/sani-ul-160a713a9",
      facebook: "https://www.facebook.com/sani.ul.583/",
      tiktok: "https://www.tiktok.com/@saniul779",
      instagram: "https://www.instagram.com/ulsani42",
    },
  },

  credibility: [
    { label: "CURRENT ROLE", value: "Operations Manager" },
    { label: "ORGANIZATION", value: "Ayan Trading House" },
    { label: "FOCUS", value: "Operations • Business • Trade" },
    { label: "LOCATION", value: "Bangladesh" },
  ],

  businesses: [
    {
      id: "ayan-trading-house",
      slug: "ayan-trading-house",
      name: "Ayan Trading House",
      tagline: "Wholesale commodity trading, strategic procurement, and operational logistics across Bangladesh.",
      industry: "Trading & Commerce",
      role: "Operations Manager",
      period: "2019 – Present",
      established: "2019",
      description:
        "A premier commercial trading enterprise where Sani Ul directs daily operations, procurement pipelines, high-volume logistics, and strategic supplier partnerships in Bangladesh.",
      fullDescription: [
        "Ayan Trading House stands as a key pillar in domestic commercial commodity trade, handling high-volume procurement, bulk goods redistribution, and institutional supply contracts.",
        "As the Operations Manager, Sani Ul has established streamlined workflow architectures that minimize turnaround times, enforce strict quality checks at receiving docks, and uphold 100% regulatory compliance with national trade governance.",
        "Under his operational leadership, the company has expanded its tier-1 vendor network, integrated disciplined inventory buffering to withstand market price fluctuations, and maintained seamless delivery schedules for regional commercial clients.",
      ],
      location: "Dhaka, Bangladesh",
      image: "/images/ventures/ayan-trading.jpg",
      galleryImages: [
        "/images/ventures/ayan-trading.jpg",
        "/images/ventures/ayan-shipping-port.jpg",
        "/images/ventures/ayan-crane-operations.jpg",
      ],
      keyMetrics: [
        { label: "On-Time Fulfillment", value: "99.8%" },
        { label: "Active Suppliers", value: "45+ Partners" },
        { label: "Operational Tenure", value: "2019 – Present" },
        { label: "Compliance Rate", value: "100%" },
      ],
      responsibilities: [
        "Directing daily warehouse workflows, dispatch logistics, and freight tracking",
        "Negotiating long-term procurement agreements with regional suppliers",
        "Managing operational budgets, vendor settlements, and invoice reconciliations",
        "Standardizing standard operating procedures (SOPs) for rapid commercial fulfillment",
      ],
      gradient: "linear-gradient(135deg, #0f172a 0%, #0369a1 50%, #0284c7 100%)",
    },
    {
      id: "personal-ventures",
      slug: "commercial-ventures",
      name: "Sole Proprietorship Commercial Ventures",
      tagline: "A diversified entrepreneurial portfolio spanning wholesale distribution, retail trade, and local enterprises.",
      industry: "Entrepreneurship & Trade",
      role: "Founder & Business Owner",
      period: "2017 – Present",
      established: "2017",
      description:
        "An independent portfolio of commercial trade and sole proprietorship enterprises founded and managed by Sani Ul, focused on disciplined capital allocation and sustainable business growth.",
      fullDescription: [
        "Starting in 2017, Sani Ul established a self-funded portfolio of sole proprietorship ventures designed to capitalize on emerging trading niches and retail commodity demands across Bangladesh.",
        "Each venture operates under lean management principles: low overhead, rapid inventory cycles, and direct relationships with end buyers and regional sub-dealers.",
        "Through strategic capital reinvestment and rigorous performance tracking, these ventures have delivered steady year-over-year revenue growth while maintaining zero institutional debt.",
      ],
      location: "Dhaka & Regional Centers, Bangladesh",
      image: "/images/ventures/commercial-store.jpg",
      galleryImages: [
        "/images/ventures/commercial-store.jpg",
        "/images/ventures/commercial-merchandise.jpg",
        "/images/ventures/commercial-inventory.jpg",
      ],
      keyMetrics: [
        { label: "Active Ventures", value: "3+ Entities" },
        { label: "Annual Growth", value: "Profitable" },
        { label: "Market Footprint", value: "Multi-District" },
        { label: "Capital Structure", value: "100% Equity" },
      ],
      responsibilities: [
        "Identifying untapped commercial market opportunities and feasibility modeling",
        "Procuring starting inventory and negotiating direct-from-source wholesale contracts",
        "Hiring, training, and supervising operational field teams and sales associates",
        "Overseeing financial governance, profit margin analytics, and tax filings",
      ],
      gradient: "linear-gradient(135deg, #091e3a 0%, #1e3a8a 50%, #3b82f6 100%)",
    },
    {
      id: "strategic-operations",
      slug: "enterprise-logistics",
      name: "Enterprise Logistics & Distribution",
      tagline: "End-to-end supply chain orchestration, regional freight dispatch, and inventory buffer management.",
      industry: "Supply Chain & Operations",
      role: "Operational Lead & Co-Founder",
      period: "2020 – Present",
      established: "2020",
      description:
        "Regional commercial logistics and commodity distribution network built to handle high-frequency cargo movements and vendor fulfillment with zero operational downtime.",
      fullDescription: [
        "Conceived to solve logistical bottlenecks in regional commodity distribution, Enterprise Logistics & Distribution operates as a high-reliability supply channel connecting rural producers with urban wholesale markets.",
        "Sani Ul spearheaded the routing optimization, fleet coordination, and warehouse checkpoint systems that reduced transit loss and transit times significantly.",
        "The network incorporates rigorous checkpoint tracking, temperature and moisture monitoring for sensitive commodities, and real-time vendor dispatch notifications.",
      ],
      location: "Bangladesh Commercial Hubs",
      image: "/images/ventures/enterprise-logistics.jpg",
      galleryImages: [
        "/images/ventures/enterprise-logistics.jpg",
        "/images/ventures/logistics-fleet.jpg",
        "/images/ventures/warehouse-pallet-racks.jpg",
      ],
      keyMetrics: [
        { label: "Delivery Precision", value: "99.4%" },
        { label: "Transit Loss", value: "< 0.2%" },
        { label: "Network Reach", value: "Key Corridors" },
        { label: "Dispatch Frequency", value: "Daily Freight" },
      ],
      responsibilities: [
        "Orchestrating regional transport fleets and multi-point distribution schedules",
        "Establishing storage security protocols and real-time inventory reconciliation",
        "Managing client service-level agreements (SLAs) and delivery confirmations",
        "Continuous optimization of route logistics to minimize fuel and transit overhead",
      ],
      gradient: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #6366f1 100%)",
    },
  ] as Business[],

  experiences: [
    {
      id: "current-role",
      role: "Operations Manager",
      organization: "Ayan Trading House",
      period: "2019 – Present",
      description:
        "Leading and managing the daily operations of Ayan Trading House, ensuring organizational efficiency, vendor coordination, and sustainable business growth.",
      responsibilities: [
        "Overseeing daily operations and operational workflow management",
        "Ensuring organizational efficiency, speed, and productivity",
        "Managing vendor, supplier, and client relationships",
        "Driving business performance and strategic growth initiatives",
      ],
    },
    {
      id: "entrepreneurial-ventures",
      role: "Business Owner",
      organization: "Sole Proprietorship Ventures",
      period: "2017 – Present",
      description:
        "Building and operating multiple sole proprietorship businesses across various sectors in Bangladesh with a focus on long-term value creation.",
      responsibilities: [
        "Establishing and managing new business initiatives",
        "Strategic planning and commercial execution",
        "Operations setup and cross-functional team coordination",
        "Financial planning and performance monitoring",
      ],
    },
    {
      id: "operations-associate",
      role: "Operations Associate",
      organization: "Commercial Trading Firm",
      period: "2016 – 2019",
      description:
        "Gained foundational experience in operations management, contributing to process improvement and team coordination in dynamic trading environments.",
      responsibilities: [
        "Assisted in daily operational activities and reporting",
        "Coordinated with cross-functional teams and logistics partners",
        "Supported process improvement and workflow streamlining",
      ],
    },
  ] as Experience[],

  stats: [
    { label: "Ventures", detail: "Active & Established", value: "3+" },
    { label: "Leadership", detail: "Operations & Management", value: "2+ Yrs" },
    { label: "Reliability", detail: "Disciplined Execution", value: "100%" },
  ],

  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Business Administration (BBA)",
      institution: "Faculty of Business Studies",
      period: "Graduate",
      field: "Operations & Business Management",
      description: "Comprehensive focus on commercial enterprise management, supply chain networks, organizational workflow efficiency, and financial governance.",
    },
    {
      id: "edu-2",
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Rajarbugh Policeline School & College",
      period: "Completed",
      field: "Business Studies",
      description: "Strong academic foundation in commercial accounting, business principles, economics, and trade administration.",
    },
  ] as Education[],

  milestones: [
    {
      id: "milestone-1",
      title: "2+ Years Operational Leadership",
      organization: "Ayan Trading House & Ventures",
      year: "2022 – Present",
      description: "Proven track record of managing daily commercial workflows, procurement operations, and team coordination across Bangladesh.",
      badge: "Leadership",
    },
    {
      id: "milestone-2",
      title: "Multi-Venture Commercial Expansion",
      organization: "Sole Proprietorship Portfolio",
      year: "2017 – Present",
      description: "Established and scaled multiple sole proprietorship businesses across wholesale trade, distribution, and local commercial services.",
      badge: "Entrepreneurship",
    },
    {
      id: "milestone-3",
      title: "Supply Chain & Logistics Network",
      organization: "Enterprise Trading",
      year: "2020 – Present",
      description: "Built robust end-to-end supply chain pipelines ensuring zero-downtime fulfillment, disciplined vendor compliance, and reliable distribution.",
      badge: "Operations",
    },
  ],

  coreFocus: [
    { name: "Operations Management", category: "Core Discipline" },
    { name: "Trading & Commerce", category: "Industry" },
    { name: "Vendor Management", category: "Operations" },
    { name: "Financial Oversight", category: "Governance" },
    { name: "Supply Chain", category: "Logistics" },
    { name: "Strategic Execution", category: "Leadership" },
    { name: "Relationship Management", category: "Commercial" },
    { name: "Risk Management", category: "Business" },
  ],
};
