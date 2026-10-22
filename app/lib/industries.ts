/**
 * Industry pages (the vertical spokes). One template renders them all:
 * app/industries/[slug]/page.tsx. Every signal names the public source it
 * comes from, and the example accounts are illustrative only.
 */

export interface IndustrySignal {
  h: string;
  b: string;
  src: string;
  href?: string;
}

export interface Industry {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  keyword: string;
  eyebrow: string;
  /** H1 = keyword phrase, then the accent phrase. sub = the brand line. */
  h1: string;
  h1Dim: string;
  sub: string;
  lead: string;
  buyers: string[];
  signalsQ: string;
  signalsA: string;
  signals: IndustrySignal[];
  seats: { seat: string; why: string }[];
  rows: { score: number; title: string; why: string; meta: string[] }[];
  faqs: { q: string; a: string }[];
  blog: { slug: string; label: string };
}

export const INDUSTRY_DATA: Industry[] = [
  {
    slug: "low-voltage-security",
    name: "Low voltage, security & telecom",
    metaTitle: "Low Voltage Leads for Security Integrators | Simpl",
    metaDescription:
      "Low voltage leads from permits, E-Rate bids, new owners and inspection citations, ranked weekly with the record and the decision maker attached.",
    keyword: "low voltage leads",
    eyebrow: "Low voltage, security & telecom",
    h1: "Low voltage leads for security and cabling integrators,",
    h1Dim: "before the bid goes out.",
    sub: "Find the buildings that need your systems this month.",
    lead:
      "Integrators win when they're in the room early. The Account Engine watches permits, school bids, new owners and inspection citations across your territory and tells your team which buildings to call this week.",
    buyers: ["Structured cabling and networks", "Access control and video", "Nurse call and resident safety", "Fire alarm and life safety", "Wi-Fi, DAS and telecom", "AV and intercom"],
    signalsQ: "What signals mean a building needs low-voltage work?",
    signalsA:
      "Construction and renovation permits, a public request for bids, a change of owner, or an inspector writing up a system. Each one is recorded somewhere official, usually weeks before a competitor hears about it.",
    signals: [
      { h: "Commercial permits", b: "New construction, renovations and tenant improvements by type and value, so you reach the owner or GC before the low-voltage package is bid.", src: "City and county permit records" },
      { h: "E-Rate Form 470 postings", b: "Schools and libraries post a Form 470 to open competitive bidding for networks and internal connections. That's a buyer asking for bids, in writing.", src: "USAC E-Rate", href: "https://www.usac.org/e-rate/" },
      { h: "New owners", b: "A recorded sale or change of ownership. New owners re-bid vendors and standardize access control and cameras across their portfolio.", src: "Deed and licensing records" },
      { h: "Inspection citations", b: "In senior living and healthcare, inspectors cite call systems, door alarms and emergency communication. A citation comes with a deadline.", src: "State inspection reports, CMS" },
      { h: "Public bids", b: "City, county, state and federal solicitations for security, cabling and telecom work.", src: "SAM.gov and state portals", href: "https://sam.gov/" },
      { h: "New locations", b: "Newly licensed facilities and new business locations need everything installed at once.", src: "Licensing agencies" },
    ],
    seats: [
      { seat: "Owner or asset manager", why: "Signs on capital projects and portfolio standards" },
      { seat: "Facilities director", why: "Owns the systems and the pain when they fail" },
      { seat: "IT director", why: "Decides on networks, Wi-Fi and anything on the LAN" },
      { seat: "General contractor", why: "Awards the low-voltage package on new builds" },
    ],
    rows: [
      { score: 92, title: "School district, 9 campuses", why: "Posted a Form 470 for network cabling and wireless for next funding year.", meta: ["USAC E-Rate", "IT Director", "Bid window open"] },
      { score: 87, title: "Medical office building, 64,000 sq ft", why: "Tenant improvement permit filed for two floors. Low-voltage not yet awarded.", meta: ["County permit", "GC + Owner", "This week"] },
      { score: 80, title: "Assisted living community", why: "Inspection cited door alarm and call system response.", meta: ["State inspection", "Administrator", "Deadline set"] },
    ],
    faqs: [
      {
        q: "How do low voltage contractors find new projects?",
        a: "The reliable way is to watch the records that announce projects before they're bid: commercial building permits, public solicitations, E-Rate Form 470 postings for schools and libraries, and ownership changes. The Account Engine reads those for your territory every night and ranks the accounts worth a call.",
      },
      {
        q: "Can it focus on just access control, or just cabling?",
        a: "Yes. We define your reasons to call around what you sell and who you sell it to, so a cabling contractor and an access control integrator in the same city see different top accounts.",
      },
      {
        q: "Do you cover service and maintenance contracts, not just installs?",
        a: "Yes. Ownership changes, inspection citations and system age are strong signals for service agreements and upgrades, which are often the steadier revenue.",
      },
    ],
    blog: { slug: "lead-generation-for-low-voltage-contractors", label: "Lead generation for low voltage contractors: where the projects show up first" },
  },
  {
    slug: "senior-living-technology",
    name: "Senior living technology",
    metaTitle: "Senior Living Sales Leads From Inspection Records | Simpl",
    metaDescription:
      "Senior living sales leads from licensing surveys, CMS inspections, new owners and new licenses, rolled up to the operator that buys, with proof.",
    keyword: "senior living sales",
    eyebrow: "Senior living technology",
    h1: "Senior living sales leads,",
    h1Dim: "rolled up to the operator who signs.",
    sub: "Know which communities need you this month.",
    lead:
      "Senior living leaves one of the richest public paper trails in any industry: licensing surveys, federal inspections, ownership changes and new licenses. The Account Engine turns it into a weekly call list, rolled up from each community to the operator that actually buys.",
    buyers: ["Nurse call and resident safety", "Wander management and access", "Networks and Wi-Fi", "EHR and care software", "Fall detection and sensors", "Emergency power and life safety"],
    signalsQ: "How do you know which senior living communities are ready to buy?",
    signalsA:
      "Watch what inspectors write and what changes hands. A citation on resident call response, a new operator taking over, or a newly licensed community are each a specific, dated reason to call.",
    signals: [
      { h: "State licensing inspections", b: "Assisted living surveys and complaint investigations, including citations on call systems, wandering, emergency power and staffing.", src: "State licensing agencies" },
      { h: "Federal nursing home inspections", b: "Health inspection deficiencies for skilled nursing facilities, with dates and scope.", src: "CMS Care Compare", href: "https://www.medicare.gov/care-compare/" },
      { h: "Change of ownership", b: "New operators standardize technology across the communities they take over, often in the first year.", src: "Licensing and CMS ownership data", href: "https://data.cms.gov/" },
      { h: "New licenses and openings", b: "New communities buy every system at once, and the decision is made before opening day.", src: "State licensing agencies" },
      { h: "Operator roll-up", b: "Every community mapped to the operator that runs it, so one conversation can cover a portfolio.", src: "Licensing records" },
      { h: "Budget cycles", b: "When operators set capital budgets, so you're in the plan rather than asking after it's spent.", src: "Your sales history + public filings" },
    ],
    seats: [
      { seat: "Executive director", why: "Owns the inspection result and the fix" },
      { seat: "Regional director of operations", why: "Standardizes across communities" },
      { seat: "Maintenance or facilities director", why: "Lives with the system every day" },
      { seat: "Operator CFO or VP finance", why: "Approves capital across the portfolio" },
    ],
    rows: [
      { score: 94, title: "Assisted living community, 112 beds", why: "Cited for resident call system response. Re-inspection due within 60 days.", meta: ["State inspection", "Executive Director", "Call today"] },
      { score: 89, title: "Regional operator, 14 communities", why: "Acquired 3 communities this quarter. New owner standardizing systems.", meta: ["Change of ownership", "Regional Ops + CFO", "This week"] },
      { score: 83, title: "Memory care community, opening soon", why: "New license issued. Technology package not yet chosen.", meta: ["New license", "Operator", "This month"] },
    ],
    faqs: [
      {
        q: "How do you sell to senior living communities?",
        a: "Lead with their reason, not your product. Communities buy when an inspection, an ownership change or an opening forces a decision, and they buy through the operator. Know the citation or the change, call the executive director and the regional operations lead, and bring the fix.",
      },
      {
        q: "Where do you find assisted living inspection reports?",
        a: "Assisted living is licensed by each state, so inspection reports live with each state's licensing agency, in different formats. Skilled nursing inspections are federal and published on CMS Care Compare. The Account Engine collects both for your territory and links every citation to its report.",
      },
      {
        q: "Can it show which operator owns each community?",
        a: "Yes. Every community is rolled up to its operator, so your team can see a portfolio's open citations and changes in one place and sell at the level that signs.",
      },
    ],
    blog: { slug: "how-to-sell-to-senior-living-communities", label: "How to sell to senior living communities" },
  },
  {
    slug: "building-systems",
    name: "Building systems",
    metaTitle: "Commercial Construction Leads for Building Systems | Simpl",
    metaDescription:
      "Commercial construction leads for fire protection, HVAC, elevator and roofing contractors: permits, building age, new owners and inspections.",
    keyword: "commercial construction leads",
    eyebrow: "Fire protection, HVAC, elevators & roofing",
    h1: "Commercial construction leads for fire, HVAC and elevator contractors,",
    h1Dim: "ranked every week.",
    sub: "The buildings due for your work, with the permit behind each one.",
    lead:
      "Building systems age on a schedule, change hands, and get inspected. The Account Engine reads the permits, property records and inspection data for your territory and puts the buildings with a reason this month at the top of the list.",
    buyers: ["Fire alarm and sprinkler", "Commercial HVAC and controls", "Elevator service and modernization", "Commercial roofing", "Generators and emergency power", "Building automation"],
    signalsQ: "Which records show a building needs systems work?",
    signalsA:
      "Permits filed by trade, the year a building or its systems went in, a recent sale, and inspection results where your jurisdiction publishes them. Together they tell you who is due, and who just got a new decision maker.",
    signals: [
      { h: "Permits by trade", b: "Mechanical, fire, roofing and electrical permits, by value. A big renovation permit is a systems decision on a deadline.", src: "City and county permit records" },
      { h: "Building and system age", b: "Year built and major renovations from property records. Equipment past its service life is a modernization conversation.", src: "Assessor records" },
      { h: "Property sales", b: "New owners commission condition assessments and re-bid service contracts.", src: "Deed records" },
      { h: "Inspection results", b: "Fire, elevator and life safety inspection results where the city or state publishes them. Codes like NFPA 72 and NFPA 25 set the testing schedule.", src: "Local and state inspection data", href: "https://www.nfpa.org/" },
      { h: "Certificates of occupancy", b: "Newly completed buildings need service agreements from day one.", src: "Local building departments" },
      { h: "Public bids", b: "Government and school solicitations for maintenance, modernization and replacement.", src: "SAM.gov and state portals", href: "https://sam.gov/" },
    ],
    seats: [
      { seat: "Property or facilities manager", why: "Runs the service contracts" },
      { seat: "Owner or asset manager", why: "Approves capital replacement" },
      { seat: "Chief engineer", why: "Knows what's failing before anyone else" },
      { seat: "General contractor", why: "Awards trade packages on new builds" },
    ],
    rows: [
      { score: 91, title: "Office tower, 1987 construction", why: "Sold last month. Original elevator controls and fire panel still in service.", meta: ["Deed + assessor", "Asset manager", "This week"] },
      { score: 85, title: "Hospital outpatient wing", why: "Renovation permit filed with mechanical scope. Contractor not yet named.", meta: ["Mechanical permit", "Facilities director", "This week"] },
      { score: 78, title: "County courthouse", why: "Solicitation posted for fire alarm system replacement.", meta: ["Public bid", "Procurement", "Bid due"] },
    ],
    faqs: [
      {
        q: "How do fire protection contractors find new customers?",
        a: "By knowing which buildings are due before the owner calls around: new permits with fire scope, buildings whose systems are past service life, recent sales, published inspection results and public bids. The Account Engine reads those records for your territory and ranks the buildings each week.",
      },
      {
        q: "Are building inspection results public?",
        a: "It depends on the jurisdiction. Many cities and states publish some fire, elevator or building inspection data; others don't. We map what's available in your territory on the first call and build around the sources that exist.",
      },
      {
        q: "Does it help with service agreements, not just replacements?",
        a: "Yes. New owners, newly completed buildings and buildings changing property managers are all strong signals for inspection, testing and maintenance contracts.",
      },
    ],
    blog: { slug: "building-permits-for-sales-leads", label: "How to use building permits for sales leads" },
  },
  {
    slug: "facility-services",
    name: "Facility services",
    metaTitle: "Commercial Cleaning Leads and Facility Service Leads | Simpl",
    metaDescription:
      "Commercial cleaning and facility service leads: buildings with a new owner, a new opening or an open bid this month, with the record and who decides.",
    keyword: "commercial cleaning leads",
    eyebrow: "Facility services",
    h1: "Commercial cleaning leads",
    h1Dim: "the week a building changes hands.",
    sub: "Win the contract while the decision is still open.",
    lead:
      "Facility contracts move when something changes: a sale, a new tenant, a new building, a contract up for bid. The Account Engine watches for those changes across your territory and tells your team who to call while the decision is still open.",
    buyers: ["Commercial cleaning", "Building maintenance", "Security services", "Pest and environmental", "Grounds and snow", "Integrated facility management"],
    signalsQ: "When do facility service contracts change hands?",
    signalsA:
      "When the building does: a new owner, a new property manager, a newly finished building, or a public contract coming up for bid. Those are the weeks a buyer actually listens.",
    signals: [
      { h: "Property sales", b: "New owners review every vendor in their first months, and often bring in their own property manager.", src: "Deed records" },
      { h: "New buildings", b: "Certificates of occupancy and completed projects need cleaning, maintenance and security from day one.", src: "Local building departments" },
      { h: "Public contracts", b: "Janitorial, maintenance and security solicitations from cities, counties, schools and federal agencies.", src: "SAM.gov and state portals", href: "https://sam.gov/" },
      { h: "Health and sanitation inspections", b: "Restaurant, healthcare and childcare inspection results that point to cleaning and pest problems.", src: "Local health departments" },
      { h: "New locations", b: "Multi-site operators opening new locations, licensed and recorded before they open.", src: "Licensing and business filings" },
      { h: "Portfolio roll-up", b: "Every building mapped to the owner or manager that controls it, so you sell a portfolio, not a door.", src: "Property records" },
    ],
    seats: [
      { seat: "Property manager", why: "Hires and fires vendors" },
      { seat: "Facility or operations director", why: "Owns the standard of the building" },
      { seat: "Procurement", why: "Runs the bid on public and enterprise contracts" },
      { seat: "Owner or asset manager", why: "Sets the budget after a purchase" },
    ],
    rows: [
      { score: 90, title: "Class A office park, 3 buildings", why: "Sold to a new owner. Property management changing next quarter.", meta: ["Deed record", "Asset manager", "Call today"] },
      { score: 84, title: "City school district", why: "Custodial services contract posted for bid.", meta: ["Public bid", "Procurement", "Bid due"] },
      { score: 77, title: "New medical office building", why: "Certificate of occupancy issued. Tenants moving in this month.", meta: ["Building dept.", "Property manager", "This week"] },
    ],
    faqs: [
      {
        q: "How do facility services companies get new contracts?",
        a: "Most contracts change hands when a building does: a sale, a new manager, a new building or a public bid. Watching those records for your territory, and calling in the first weeks after the change, beats cold calling buildings that are happy with their vendor.",
      },
      {
        q: "Can it find government cleaning and maintenance contracts?",
        a: "Yes. Federal solicitations are on SAM.gov, and most states, counties and school districts post their own. We pull the ones that match your services and territory into the same list as your private accounts.",
      },
      {
        q: "Does it work for a single metro area?",
        a: "Yes. A single metro is a great fit: the engine can watch every commercial building in it, so you know about each change the week it's recorded.",
      },
    ],
    blog: { slug: "how-to-find-the-decision-maker", label: "How to find the decision maker at a company" },
  },
  {
    slug: "healthcare-technology",
    name: "Healthcare technology",
    metaTitle: "Medical Equipment Sales Leads From Public Records | Simpl",
    metaDescription:
      "Medical equipment and healthcare IT sales leads from new NPIs, CMS inspection deficiencies, ownership changes and expansions, each with its record.",
    keyword: "medical equipment sales leads",
    eyebrow: "Healthcare technology",
    h1: "Medical equipment and healthcare IT sales leads,",
    h1Dim: "from the public record.",
    sub: "Reach the facilities that just got a reason to change.",
    lead:
      "Healthcare is one of the most documented industries in the country. New providers, inspection deficiencies, ownership changes and expansions are all public. The Account Engine turns them into a weekly list of facilities worth a call, with the decision makers by role.",
    buyers: ["Medical equipment", "EHR and practice software", "Healthcare IT and security", "Patient communication", "Pharmacy and lab systems", "Facility technology"],
    signalsQ: "Which public records signal a healthcare facility is ready to buy?",
    signalsA:
      "New provider enrollments, inspection deficiencies, ownership changes and expansion filings. Each one changes a facility's needs or its decision makers, and each one is recorded with a date.",
    signals: [
      { h: "New providers and practices", b: "New organizations and providers registered in the national NPI registry, with their enumeration dates and locations.", src: "NPPES NPI registry", href: "https://npiregistry.cms.hhs.gov/" },
      { h: "Inspection deficiencies", b: "Federal and state survey findings that point to equipment, records or safety gaps.", src: "CMS Care Compare, state agencies", href: "https://www.medicare.gov/care-compare/" },
      { h: "Ownership changes", b: "Acquisitions by health systems and private equity bring system standardization and new vendors.", src: "CMS ownership data", href: "https://data.cms.gov/" },
      { h: "Expansions", b: "Certificate of need filings in states that require them, plus construction permits for new wings and clinics.", src: "State health planning agencies" },
      { h: "Public bids", b: "Solicitations from public hospitals, the VA and other agencies.", src: "SAM.gov and state portals", href: "https://sam.gov/" },
      { h: "Licensing changes", b: "New facility licenses, relocations and bed-count changes.", src: "State licensing agencies" },
    ],
    seats: [
      { seat: "Administrator or practice manager", why: "Runs the facility day to day" },
      { seat: "CFO", why: "Approves the capital and the contract" },
      { seat: "CIO or IT director", why: "Owns systems, security and integration" },
      { seat: "Director of nursing", why: "Lives with clinical technology every shift" },
    ],
    rows: [
      { score: 91, title: "Multi-specialty clinic, 4 locations", why: "Acquired by a regional health system. Systems consolidation expected.", meta: ["Ownership data", "CIO + CFO", "This week"] },
      { score: 86, title: "Skilled nursing facility, 120 beds", why: "Survey deficiency tied to medication records. Plan of correction due.", meta: ["CMS inspection", "Administrator", "Call today"] },
      { score: 79, title: "New urgent care group", why: "Three new organizational NPIs registered in your territory this month.", meta: ["NPI registry", "Practice manager", "This month"] },
    ],
    faqs: [
      {
        q: "How do healthcare IT companies find new customers?",
        a: "By tracking the events that force technology decisions: new practices and providers, ownership changes, inspection deficiencies and expansions. Most are public through CMS, the NPI registry and state agencies. The Account Engine reads them for your territory and ranks the facilities to call.",
      },
      {
        q: "Is it allowed to use CMS data for sales?",
        a: "Yes. CMS publishes provider, inspection and ownership data as public datasets for anyone to use. The engine uses facility-level public records, never patient information.",
      },
      {
        q: "Can it target one kind of facility, like only skilled nursing?",
        a: "Yes. Your markets are defined on the first call: skilled nursing, assisted living, clinics, hospitals or any mix, with the signals that matter to each.",
      },
    ],
    blog: { slug: "sales-trigger-events-b2b", label: "Sales trigger events: the B2B guide" },
  },
];

export function getIndustry(slug: string) {
  return INDUSTRY_DATA.find((i) => i.slug === slug);
}
