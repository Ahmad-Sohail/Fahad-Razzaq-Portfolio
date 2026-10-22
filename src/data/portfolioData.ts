import { ExperienceItem, SkillItem, EducationItem, CertificationItem, CareerHub } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Fahad Razzaq',
  title: 'Administration Specialist | Operations, Supply Chain & Procurement',
  tagline: '14+ years driving administrative excellence across Pakistan, Saudi Arabia & the UAE.',
  phone: '+92 3224564375',
  email: 'Fahadrazzaq23@gmail.com',
  linkedin: 'https://linkedin.com/in/fahad-razzaq-b11996198',
  linkedinDisplay: 'linkedin.com/in/fahad-razzaq-b11996198',
  location: 'Lahore, Pakistan',
  availability: 'Open to senior administration and operations roles across the Gulf and Pakistan.',
  summaryParagraph1: 'A seasoned and results-driven Administration Specialist with over 14 years of comprehensive experience orchestrating large-scale corporate and project site operations. Proven track record directing multimillion-dollar facility setups, complex supply chains, and procurement frameworks for high-profile enterprises in Pakistan, the Kingdom of Saudi Arabia (including NEOM City), and the United Arab Emirates.',
  summaryParagraph2: 'Demonstrates deep capability in managing multi-ethnic workforces of 300+ personnel, enforcing strict safety protocols (OSHA & IOSA certified), spearheading digital inventory transformations, and instituting fiscal rigor across multi-site operations. Dedicated to aligning administrative workflows with overarching corporate goals to maximize operational efficiency, regulatory compliance, and cost savings.',
  stats: [
    { label: 'Years Experience', value: '14+' },
    { label: 'Countries Managed', value: '3' },
    { label: 'Workforce Supervised', value: '300+' },
    { label: 'Major Project Sites', value: '4' },
  ],
};

export const HIGHLIGHT_PILLARS = [
  {
    title: 'Executive Leadership',
    description: 'Directed administrative teams, site operations, and diverse workforces up to 300+ across mega construction and commercial facilities.',
    kpi: '300+ Workforce',
  },
  {
    title: 'Strategic Planning & Procurement',
    description: 'Formulated cost-optimized vendor negotiation frameworks, contract administration, and end-to-end supply chain logistics.',
    kpi: 'Multi-Site Optimization',
  },
  {
    title: 'Cross-Cultural Governance',
    description: 'Seamless cross-border adaptability across GCC and South Asian legal, labor, and municipal regulatory environments.',
    kpi: 'Pakistan · KSA · UAE',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-unique-properties',
    role: 'Admin Manager',
    company: 'Unique Properties',
    project: 'CASA REINA Project',
    location: 'Lahore, Pakistan',
    country: 'Pakistan',
    period: '01/06/2024 – Present',
    startDate: '2024-06-01',
    endDate: 'Present',
    isCurrent: true,
    highlightSummary: 'Spearheading comprehensive administrative and facility operations for the flagship CASA REINA residential development in Lahore.',
    bullets: [
      'Supervise security protocols, facility maintenance, housekeeping standards, dedicated driver fleet, and auxiliary site support staff.',
      'Exercise real-time CCTV camera oversight and physical perimeter surveillance to maintain zero-incident security standards.',
      'Conduct rigorous cost monitoring and budget audits across daily operational expenditures and utility outlays.',
      'Direct cross-vendor coordination and service-level agreement (SLA) fulfillment for uninterrupted project site services.',
      'Administer rigorous biometric and manual attendance validation for all technical contractors and administrative personnel.',
      'Facilitate monthly vendor and contractor review assemblies to resolve performance bottlenecks and optimize contract costs.',
    ],
    metrics: [
      { label: 'Facility Scope', value: 'Flagship Complex' },
      { label: 'Oversight', value: '24/7 Security & Ops' },
    ],
  },
  {
    id: 'exp-ammico',
    role: 'Site Admin Manager',
    company: "AMMICO INT'L CONTRACTION COMPANY",
    project: 'NEOM Mega City Infrastructure',
    location: 'Sharma (NEOM City), Saudi Arabia',
    country: 'Saudi Arabia',
    period: '15/05/2023 – 25/05/2024',
    startDate: '2023-05-15',
    endDate: '2024-05-25',
    isCurrent: false,
    highlightSummary: 'Managed multi-site remote operations across 4 high-demand sites within the NEOM development zone in northwestern Saudi Arabia.',
    bullets: [
      'Orchestrated multi-site administration across 4 major project sites in the high-stakes NEOM City mega-infrastructure corridor.',
      'Directly supervised 300+ multinational laborers, specialized equipment operators, and site administrative personnel.',
      'Maintained stringent petty cash disbursements, reconciliation ledgers, and emergency procurement contingency funds.',
      'Spearheaded camp management, residential hygiene, catering quality audits, and proactive worker welfare programs.',
      'Led procurement cycles, regional supplier negotiations, and materials distribution across remote desert work zones.',
      'Maintained seamless daily liaison and official compliance reporting between AMMICO Head Office and the NEOM Authority Office.',
      'Coordinated complex transport logistics and daily convoy routing for personnel and critical construction supplies.',
    ],
    metrics: [
      { label: 'Workforce', value: '300+ Personnel' },
      { label: 'Sites Managed', value: '4 Major Sites' },
      { label: 'Region', value: 'NEOM City, KSA' },
    ],
  },
  {
    id: 'exp-alqadesia',
    role: 'Admin Manager',
    company: 'AL-QADESIA TRADING COMPANY',
    project: 'Commercial & Import-Export Operations',
    location: 'Dubai, UAE',
    country: 'UAE',
    period: '01/11/2021 – 31/12/2022',
    startDate: '2021-11-01',
    endDate: '2022-12-31',
    isCurrent: false,
    highlightSummary: 'Streamlined commercial trading administration, corporate governance, and executive HR support in Dubai’s fast-paced international hub.',
    bullets: [
      'Revamped office operational workflows, reducing document turnaround times and administrative overhead.',
      'Architected structured digital and hard-copy filing systems, improving document retrieval accuracy across corporate audits.',
      'Served as the principal corporate point of contact for international clients, governmental delegations, and banking liaisons.',
      'Managed executive flight bookings, VIP itinerary scheduling, visa processing, and hospitality logistics.',
      'Delivered critical HR administrative support including onboarding documentation, leave tracking, and payroll validation.',
    ],
    metrics: [
      { label: 'Hub', value: 'Dubai, UAE' },
      { label: 'Focus', value: 'Trade & Governance' },
    ],
  },
  {
    id: 'exp-afzal',
    role: 'Admin Manager',
    company: 'AFZAL GROUP OF ELECTRONICS',
    project: 'Multi-Outlet Retail & Warehousing Expansion',
    location: 'Lahore, Pakistan',
    country: 'Pakistan',
    period: '04/04/2015 – 30/09/2021',
    startDate: '2015-04-04',
    endDate: '2021-09-30',
    isCurrent: false,
    highlightSummary: 'Led administration and logistics throughout a 6-year rapid expansion phase encompassing new retail outlets and centralized warehousing.',
    bullets: [
      'Led the central administrative department overseeing multiple regional retail outlets and centralized storage hubs.',
      'Supervised complete turnkey setup, layout fit-outs, and utility activations for new retail branches and warehouses.',
      'Identified dependable suppliers, vetted material quotes, and achieved significant budget optimization across store fit-outs.',
      'Supervised construction contractors and civil maintenance crews to guarantee timely project handovers.',
      'Prepared periodic administrative status, inventory audit, and asset management briefs for the Board of Directors.',
      'Managed end-to-end employee hiring, document verification, induction orientation, and departmental disciplinary protocols.',
      'Ensured 100% statutory compliance with Pakistani labor laws, EOBI (Employees’ Old-Age Benefits Institution), and PESSI social security regulations.',
    ],
    metrics: [
      { label: 'Tenure', value: '6.5 Years' },
      { label: 'Statutory Compliance', value: 'EOBI & PESSI' },
    ],
  },
];

export const SKILLS: SkillItem[] = [
  {
    id: 'leadership',
    name: 'Leadership',
    category: 'Strategic',
    description: 'Directing diverse teams up to 300+ personnel across multicultural environments with clarity, accountability, and mentorship.',
    keywords: ['Team Mentorship', 'Conflict Resolution', 'Staff Delegation'],
  },
  {
    id: 'critical-thinking',
    name: 'Critical Thinking',
    category: 'Strategic',
    description: 'Analyzing operational bottlenecks, mitigating emergency site risks, and structuring rational solutions in high-pressure scenarios.',
    keywords: ['Risk Assessment', 'Root Cause Analysis', 'Decision Making'],
  },
  {
    id: 'business-dev',
    name: 'Business Development & Strategy',
    category: 'Strategic',
    description: 'Aligning operational capabilities with long-term company growth, expanding retail footprints, and scaling facility infrastructure.',
    keywords: ['Resource Allocation', 'Strategic Scaling', 'Expansion Planning'],
  },
  {
    id: 'project-mgmt',
    name: 'Project Management',
    category: 'Operational',
    description: 'Overseeing site fit-outs, construction supervision, contractor milestone tracking, and cross-departmental coordination.',
    keywords: ['Milestone Tracking', 'Contractor Oversight', 'Site Delivery'],
  },
  {
    id: 'time-mgmt',
    name: 'Time Management',
    category: 'Operational',
    description: 'Prioritizing competing administrative demands, meeting tight project deadlines, and optimizing daily workflow throughput.',
    keywords: ['Workflow Scheduling', 'Turnaround Optimization', 'Multi-tasking'],
  },
  {
    id: 'customer-services',
    name: 'Customer Services',
    category: 'Operational',
    description: 'Serving as executive point of contact for corporate tenants, international clients, government representatives, and vendors.',
    keywords: ['Client Relations', 'Stakeholder Liaison', 'Service Excellence'],
  },
  {
    id: 'fleet-mgmt',
    name: 'Fleet Management',
    category: 'Logistics',
    description: 'Coordinating vehicle pools, driver schedules, fuel consumption audits, preventive maintenance, and remote site convoy dispatch.',
    keywords: ['Logistics Dispatch', 'Fuel Efficiency', 'Vehicle Maintenance'],
  },
  {
    id: 'procurement-mgmt',
    name: 'Procurement Management',
    category: 'Logistics',
    description: 'Evaluating vendor tenders, negotiating supply pricing, drafting contracts, and securing delivery reliability for remote sites.',
    keywords: ['Vendor Negotiation', 'Supply Chain', 'Purchase Orders'],
  },
  {
    id: 'budget-mgmt',
    name: 'Budget Management',
    category: 'Compliance',
    description: 'Auditing petty cash ledgers, tracking OPEX/CAPEX variance, curbing operational waste, and delivering monthly financial reconciliations.',
    keywords: ['Cost Containment', 'Petty Cash Auditing', 'Expense Variance'],
  },
  {
    id: 'admin-operations',
    name: 'Administrative Operations',
    category: 'Compliance',
    description: 'Mastery over office documentation, digital record keeping, EOBI/PESSI statutory compliance, OSHA safety, and camp welfare.',
    keywords: ['Statutory Compliance', 'Facility SOPs', 'Auditing Protocols'],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Bachelor of Commerce (B.Com)',
    institution: 'Punjab University, Lahore',
    period: '2008 – 2010',
    description: 'Comprehensive business commerce curriculum focusing on business administration, financial accounting, commercial law, and organizational economics.',
  },
  {
    degree: 'Mechanical Diploma',
    institution: 'Eastern Institute of Technical Skills',
    period: '2012 – 2015',
    description: 'Technical engineering foundation covering mechanical systems, equipment maintenance standards, workshop safety, and operational schematics.',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'IOSA (Industrial Occupational Safety Certification)',
    issuer: 'Authorized Safety Board',
    date: 'April 2024',
    description: 'Certified occupational safety standards covering heavy equipment work zones, hazard isolation, emergency procedures, and workforce health safeguards.',
  },
  {
    title: 'OSHA (Occupational Safety and Health Administration)',
    issuer: 'OSHA Safety Standards Council',
    date: 'May – June 2024',
    description: 'International standards for construction and industrial site safety, PPE compliance, risk mitigation, and worker welfare in high-risk environments.',
  },
];

export const LANGUAGES = [
  { language: 'Urdu', level: 'Native / Mother Tongue', fluency: '100%' },
  { language: 'English', level: 'Professional Working Proficiency', fluency: '90%' },
  { language: 'Arabic', level: 'Working Familiarity (Gulf Region Experience)', fluency: '70%' },
];

export const CAREER_HUBS: CareerHub[] = [
  {
    id: 'hub-pakistan',
    name: 'Pakistan',
    country: 'Pakistan',
    city: 'Lahore',
    lat: 31.5204,
    lng: 74.3587,
    role: 'Admin Manager',
    company: 'Unique Properties & Afzal Group',
    period: '2015–2021, 2024–Present',
    highlight: 'CASA REINA Project site administration; 6-year multi-outlet retail & warehouse setups; EOBI & PESSI statutory compliance.',
  },
  {
    id: 'hub-saudi',
    name: 'Saudi Arabia',
    country: 'Saudi Arabia',
    city: 'Sharma (NEOM City)',
    lat: 28.0339,
    lng: 35.2500,
    role: 'Site Admin Manager',
    company: "AMMICO INT'L CONTRACTION CO.",
    period: '2023–2024',
    highlight: 'Managed 300+ workforce across 4 major remote construction sites in NEOM City; camp welfare, logistics, and NEOM Office liaison.',
  },
  {
    id: 'hub-uae',
    name: 'United Arab Emirates',
    country: 'United Arab Emirates',
    city: 'Dubai',
    lat: 25.2048,
    lng: 55.2708,
    role: 'Admin Manager',
    company: 'AL-QADESIA TRADING COMPANY',
    period: '2021–2022',
    highlight: 'International commercial trade administration, digital filing restructuring, executive VIP travel, and HR governance.',
  },
];
