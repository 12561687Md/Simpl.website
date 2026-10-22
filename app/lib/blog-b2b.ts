import type { BlogPost } from "./blog";

/**
 * B2B posts for the Account Engine positioning (2026-10 revamp).
 *
 * Same rules as the local posts in blog.ts: answer-first, no invented
 * statistics, no invented client results, every external link authoritative.
 * Covers are coded brand graphics in /public/blog/b2b/ until real photos land.
 */

const IMG = (slug: string) => `/blog/b2b/${slug}.svg`;
const CREDIT = "Simpl";
const UPDATED = "2026-10-22";

export const B2B_POSTS: BlogPost[] = [
  {
    slug: "sales-trigger-events-b2b",
    title: "Sales trigger events: the B2B guide to calling at the right moment",
    metaTitle: "Sales Trigger Events: A B2B Guide With Examples",
    description:
      "What sales trigger events are, the public records that reveal them, and examples by industry, so your team calls accounts the week they get a reason to buy.",
    question: "What are sales trigger events in B2B?",
    category: "Buying Signals",
    readMinutes: 8,
    updated: UPDATED,
    image: IMG("sales-trigger-events-b2b"),
    imageAlt: "Simpl graphic: sales trigger events",
    imageCredit: CREDIT,
    audience: "b2b",
    featured: true,
    keyTakeaways: [
      "A sales trigger event is a change at an account that makes your product newly relevant: a citation, a permit, a new owner, a bid, a new location.",
      "The strongest triggers are recorded somewhere official with a date, which means they can be found, verified and acted on before competitors notice.",
      "A trigger is only useful with the record attached and the right person to call, which is why the call should open with the reason, not the product.",
    ],
    intro:
      "Most B2B outreach fails for one reason: it arrives on a random Tuesday with no reason attached. A sales trigger event fixes the timing. It's the moment an account gets a reason to care, and in industries that sell to buildings, facilities and regulated businesses, most of those moments are written down in public.",
    sections: [
      {
        heading: "What counts as a sales trigger event?",
        paragraphs: [
          "A sales trigger event is any change at an account that makes your product or service newly relevant. The classic examples in B2B are a change in leadership, a new location, funding, a merger, or a new regulation. For companies that sell high-ticket products and services to buildings and facilities, the most useful triggers are more concrete: an inspector cites a system, a permit is filed, a property sells, a license is issued, a request for bids is posted.",
          "What makes a trigger valuable is that it changes the conversation. 'Just checking in' asks for the buyer's time. 'Your state survey cited the resident call system on August 12, and the re-inspection is coming' gives them something. The idea sits at the heart of [account-based marketing](https://en.wikipedia.org/wiki/Account-based_marketing): focus on the accounts that matter, at the moment they matter.",
        ],
      },
      {
        heading: "The public records that reveal triggers",
        paragraphs: [
          "The best triggers have three properties: they're recorded by an official body, they carry a date, and they can be linked to. That rules out guesses like 'they're probably growing' and rules in records like these:",
          "Inspection and survey results, such as federal nursing home inspections published on [CMS Care Compare](https://www.medicare.gov/care-compare/) and state licensing surveys for assisted living. Building permits from city and county portals, which show construction and renovation by type and value. Deed and change-of-ownership filings. New licenses and registrations, including new healthcare organizations in the [NPI registry](https://npiregistry.cms.hhs.gov/). And public bids: federal opportunities on [SAM.gov](https://sam.gov/), state and local procurement portals, and school and library network requests through [USAC's E-Rate program](https://www.usac.org/e-rate/).",
        ],
      },
      {
        heading: "Trigger examples by industry",
        paragraphs: [
          "Low voltage and security integrators: a tenant improvement permit before the low-voltage package is awarded, an E-Rate Form 470 from a school district, a building sale that will bring a new access control standard. See [lead generation for low voltage contractors](/blog/lead-generation-for-low-voltage-contractors).",
          "Senior living technology: a citation on call response or wandering, a change of ownership, a newly licensed community. See [how to sell to senior living communities](/blog/how-to-sell-to-senior-living-communities). Building systems such as fire protection, HVAC and elevators: permits by trade, buildings past their systems' service life, published inspection results. Healthcare technology: new organizations in the NPI registry, survey deficiencies and acquisitions.",
        ],
      },
      {
        heading: "How to turn triggers into a weekly call list",
        paragraphs: [
          "Pick three to five triggers that actually precede your sales. Ask your best rep what was true about the last ten accounts you closed in the month before they bought. Then watch those records for every account in your territory, score each account on how recent and how strong its triggers are, and attach the person who decides.",
          "Doing that by hand works for a handful of accounts. Doing it for a whole market every night is what the [Simpl Account Engine](/services/account-engine) is built for: it reads the records, ranks the accounts and links every reason to its source, so your team opens one list each morning and calls the accounts with the strongest reason first.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is an example of a trigger event in sales?",
        a: "A property sale is a common one: a commercial building changes hands, and the new owner reviews every vendor and system in the first months. A state inspection citation, a building permit, a new license and a posted request for bids are others.",
      },
      {
        q: "How quickly should you act on a trigger event?",
        a: "As soon as you can verify it. The value of a trigger decays as competitors notice it and the buyer makes decisions, so the teams that win usually call in the same week the record appears.",
      },
      {
        q: "Are public records allowed to be used for sales prospecting?",
        a: "Yes. Inspection results, permits, deeds, licenses and procurement notices are published so the public can see them. Use facility-level and business records, follow email and calling rules, and never use private personal data.",
      },
    ],
    sources: [
      { label: "Account-based marketing (Wikipedia)", href: "https://en.wikipedia.org/wiki/Account-based_marketing" },
      { label: "CMS Care Compare", href: "https://www.medicare.gov/care-compare/" },
      { label: "NPPES NPI Registry", href: "https://npiregistry.cms.hhs.gov/" },
      { label: "SAM.gov contract opportunities", href: "https://sam.gov/" },
      { label: "USAC E-Rate program", href: "https://www.usac.org/e-rate/" },
    ],
  },
  {
    slug: "how-to-sell-to-senior-living-communities",
    title: "How to sell to senior living communities (and reach the operator who signs)",
    metaTitle: "How to Sell to Senior Living Communities",
    description:
      "A practical guide to selling technology and services into assisted living and nursing communities: the inspection records to watch, the operator behind each community, and who to call.",
    question: "How do you sell to senior living communities?",
    category: "B2B Industries",
    readMinutes: 8,
    updated: UPDATED,
    image: IMG("how-to-sell-to-senior-living-communities"),
    imageAlt: "Simpl graphic: selling to senior living communities",
    imageCredit: CREDIT,
    audience: "b2b",
    keyTakeaways: [
      "Senior living communities buy when something forces a decision: an inspection citation, a change of ownership, an opening or a capital budget.",
      "Skilled nursing inspections are federal and public on CMS Care Compare; assisted living is licensed and inspected by each state.",
      "The executive director feels the problem, but the operator's regional and finance leaders usually sign, so map every community to its operator.",
    ],
    intro:
      "Selling into senior living is a relationship business with a twist: the industry is heavily inspected, and inspection results are public. That means the best reason to call a community is often already written down, with a date and a deadline. Here's how to find it and who to bring it to.",
    sections: [
      {
        heading: "Know what's regulated, and by whom",
        paragraphs: [
          "Skilled nursing facilities that take Medicare or Medicaid are inspected under federal rules, and the results are published on [CMS Care Compare](https://www.medicare.gov/care-compare/) and as downloadable datasets on [data.cms.gov](https://data.cms.gov/). Standard surveys happen on a regular cycle, and complaint investigations happen in between.",
          "Assisted living and memory care are licensed by each state, so the rules, the inspection schedule and the way reports are published vary by state. Some states post full reports online; others publish summaries or require a request. If you sell across several states, expect several formats.",
        ],
      },
      {
        heading: "The signals that mean a community needs you",
        paragraphs: [
          "Citations tied to what you sell are the strongest signal. For technology vendors that often means resident call systems and response times, wandering and door alarms, emergency power, and documentation. A citation comes with a plan of correction and usually a follow-up visit, which gives the community a deadline and you a reason.",
          "Changes of ownership are the next strongest. New operators standardize technology across the communities they acquire, and they make those decisions early. New licenses and new construction are a third: a community that hasn't opened yet buys every system at once. The [Account Engine for senior living technology](/industries/senior-living-technology) tracks all three for your territory.",
        ],
      },
      {
        heading: "Sell to the operator, not just the building",
        paragraphs: [
          "Most communities belong to an operator that runs several, sometimes dozens. The executive director owns the inspection result and feels the pain, but capital decisions and technology standards usually sit with the regional director of operations and the operator's finance team. Map every community to its operator so one conversation can cover a portfolio.",
          "Licensing records and ownership filings show who operates what. Rolling communities up to operators also changes your math: a citation at one building is a reason to talk about the standard across all of them.",
        ],
      },
      {
        heading: "What a good first call sounds like",
        paragraphs: [
          "Lead with their reason and their deadline, then your fix: 'Your survey in August cited call light response on the second floor, and the follow-up visit is coming. Here's how two other communities closed that finding.' Bring the report. Never claim a result you can't show.",
          "Then follow up on a schedule. Senior living leaders are stretched thin, and most replies come after several touches. See [how many times to follow up in B2B](/blog/b2b-sales-follow-up-cadence).",
        ],
      },
    ],
    faqs: [
      {
        q: "Who makes buying decisions at a senior living community?",
        a: "Usually several people: the executive director or administrator, the maintenance or facilities director, and, at the operator level, the regional director of operations and finance. Capital purchases are typically approved above the building.",
      },
      {
        q: "Where can I find assisted living inspection reports?",
        a: "From each state's licensing agency, since assisted living is regulated at the state level. Formats and availability vary by state. Skilled nursing inspection results are federal and published on CMS Care Compare.",
      },
      {
        q: "What's the best time to sell technology to a senior living operator?",
        a: "Right after a citation that your product addresses, right after a change of ownership, before a new community opens, and ahead of the operator's capital budget cycle.",
      },
    ],
    sources: [
      { label: "CMS Care Compare", href: "https://www.medicare.gov/care-compare/" },
      { label: "CMS provider data (data.cms.gov)", href: "https://data.cms.gov/" },
      { label: "Assisted living (Wikipedia)", href: "https://en.wikipedia.org/wiki/Assisted_living" },
    ],
  },
  {
    slug: "building-permits-for-sales-leads",
    title: "How to use building permits for sales leads",
    metaTitle: "How to Use Building Permits for Sales Leads",
    description:
      "Building permits announce construction and renovation weeks before the work is bid. Here's where commercial permit data lives, which permits matter, and how to turn them into calls.",
    question: "How do you use building permits to find sales leads?",
    category: "Buying Signals",
    readMinutes: 7,
    updated: UPDATED,
    image: IMG("building-permits-for-sales-leads"),
    imageAlt: "Simpl graphic: building permits as sales leads",
    imageCredit: CREDIT,
    audience: "b2b",
    keyTakeaways: [
      "A commercial permit is a public, dated announcement that money is about to be spent on a building, often before every trade is awarded.",
      "Commercial permit data lives with cities and counties; the Census Building Permits Survey covers new residential construction, not commercial projects.",
      "Filter by permit type and value, find the owner and the general contractor, and call before the package you sell is awarded.",
    ],
    intro:
      "Every commercial renovation, build-out and new building starts with a permit, and permits are public. For anyone who sells systems or services to buildings (low voltage, security, fire protection, HVAC, elevators, roofing, cleaning, maintenance), a permit is one of the clearest early signals there is.",
    sections: [
      {
        heading: "Where commercial permit data actually lives",
        paragraphs: [
          "Permits are issued by local building departments, so the data lives with each city and county. Many publish searchable portals or open-data feeds; others only offer lookups by address. Coverage, fields and update speed vary a lot from one jurisdiction to the next.",
          "One common mix-up: the [Census Bureau's Building Permits Survey](https://www.census.gov/construction/bps/) is a great source for trends, but it covers new privately owned residential construction. For commercial projects, you need the local records.",
        ],
      },
      {
        heading: "Which permits matter for your sale",
        paragraphs: [
          "Filter by type and value. Tenant improvements and renovations above a value threshold often include new cabling, access control, fire alarm changes and mechanical work. New construction means every system is up for grabs. Trade-specific permits (mechanical, fire, roofing, electrical) tell you a specific system is changing.",
          "Look at the description field too. 'Interior alteration, 2nd floor medical office' and 'Replace rooftop units' are very different opportunities. A permit's filing date tells you how much time is left before the work is bid or done.",
        ],
      },
      {
        heading: "Who to call on a permit",
        paragraphs: [
          "Two people matter: the owner, who sets the standard and pays, and the general contractor, who awards the trade packages. Permits usually name the applicant and the contractor; property records name the owner. For service contracts, the property or facilities manager is often the right first call.",
          "Open with the project, not your pitch: 'I saw the permit for the second-floor build-out on Elm Street. Has the low-voltage scope been awarded yet?' That question is easy to answer and tells you within a minute whether there's an opportunity.",
        ],
      },
      {
        heading: "Doing it for a whole territory",
        paragraphs: [
          "Checking one city's portal by hand is manageable. Watching every jurisdiction in a multi-county territory every week, filtering by type and value, and matching each permit to an owner is not. That's what the [Account Engine](/services/account-engine) does: it reads the permit records for your territory nightly, combines them with sales, inspections and licenses, and ranks the buildings worth a call.",
          "Building systems contractors can see how this applies to their trade on the [building systems page](/industries/building-systems), and integrators on the [low voltage and security page](/industries/low-voltage-security).",
        ],
      },
    ],
    faqs: [
      {
        q: "Are building permits public record?",
        a: "Generally yes. Building permits are issued by local governments and are typically available to the public, though how they're published (online portals, open data, or request only) varies by jurisdiction.",
      },
      {
        q: "How far ahead of construction do permits show up?",
        a: "Permits are filed before work begins, and the gap varies by project and jurisdiction. On larger commercial projects, some trades are often still being awarded after the permit is filed, which is the window to call.",
      },
      {
        q: "Is the Census Building Permits Survey useful for commercial leads?",
        a: "Not directly. It tracks new privately owned residential construction and is best for market trends. Commercial project leads come from city and county permit records.",
      },
    ],
    sources: [
      { label: "U.S. Census Bureau: Building Permits Survey", href: "https://www.census.gov/construction/bps/" },
      { label: "Building permit (Wikipedia)", href: "https://en.wikipedia.org/wiki/Building_permit" },
    ],
  },
  {
    slug: "zoominfo-alternatives-for-b2b-service-companies",
    title: "ZoomInfo alternatives for B2B service companies: names vs. reasons to call",
    metaTitle: "ZoomInfo Alternatives for B2B Service Companies",
    description:
      "Contact databases like ZoomInfo and Apollo sell names. B2B service companies that sell to buildings and facilities often need something different: a reason to call, with proof.",
    question: "What is a good ZoomInfo alternative for B2B service companies?",
    category: "B2B Sales Playbooks",
    readMinutes: 7,
    updated: UPDATED,
    image: IMG("zoominfo-alternatives-for-b2b-service-companies"),
    imageAlt: "Simpl graphic: ZoomInfo alternatives",
    imageCredit: CREDIT,
    audience: "b2b",
    keyTakeaways: [
      "Contact databases are built to answer 'who works there?'. Service companies selling to facilities usually need 'who needs us this month, and why?'.",
      "The right alternative depends on the job: contact data, intent data, or public-record triggers. Many teams keep one contact tool and add triggers on top.",
      "For buildings, facilities and regulated businesses, public records (inspections, permits, ownership, bids) are often a stronger buying signal than web intent.",
    ],
    intro:
      "ZoomInfo, Apollo and LinkedIn Sales Navigator are the default answer when a B2B team needs prospects. They're good at what they do. But if you sell high-ticket products or services to buildings, facilities or regulated businesses, the hard part usually isn't finding a name. It's knowing which account to call this week and what to say.",
    sections: [
      {
        heading: "What contact databases are good at",
        paragraphs: [
          "Contact and company databases give you firmographics (size, industry, location), names and titles, and contact details, with filters to build lists. Some add 'intent' data, inferred from content an organization's people read online. [LinkedIn Sales Navigator](https://business.linkedin.com/sales-solutions/sales-navigator) adds the social graph and job-change alerts.",
          "If your problem is 'we don't know who works at our target accounts', these tools solve it. Keep them if they do.",
        ],
      },
      {
        heading: "Where they fall short for service companies",
        paragraphs: [
          "A senior living operator, a school district or an office building owner rarely signals intent by reading articles. They signal it in the record: a citation, a bid posting, a permit, a sale. A list of 2,000 facilities directors doesn't tell you which twelve have a reason to talk this month.",
          "Contact data also goes stale fast in facilities roles, and a database built for software sales often has thin coverage of the administrators, maintenance directors and property managers who matter in these markets.",
        ],
      },
      {
        heading: "The three kinds of alternatives",
        paragraphs: [
          "Other contact databases: cheaper or different coverage, same job. Intent data providers: useful when your buyers research online, weaker for facilities. Public-record trigger tools: built around what happened at an account, from inspections, permits, deeds, licenses and bids, which is where buildings and regulated businesses leave their signals. See [sales trigger events](/blog/sales-trigger-events-b2b).",
          "The [Simpl Account Engine](/services/account-engine) is in the third group, built as your own portal rather than a shared database: it scores every account in your market from the public record nightly, attaches the record and the decision maker, and can feed the contact tool or CRM you already use.",
        ],
      },
      {
        heading: "How to choose",
        paragraphs: [
          "Look at the last ten deals you won and ask what happened at each account in the month before. If the answer is 'they hired a new VP' or 'they raised money', a contact database with alerts may be enough. If it's 'they got cited', 'they bought the building' or 'they put it out to bid', you need public-record triggers.",
          "Then compare cost to one deal. If one new account is worth $50,000 or more, the right signal source pays for itself quickly; the wrong one costs you a year of reps calling the wrong accounts. You can see what triggers exist in your market by asking for your [top 25 accounts](/top-25).",
        ],
      },
    ],
    faqs: [
      {
        q: "Is there a free alternative to ZoomInfo?",
        a: "Several tools offer free tiers with limited contacts, and many public records (inspections, permits, licenses, bids) are free to search directly. The cost is the time it takes to watch them across a whole territory.",
      },
      {
        q: "Can I use a trigger tool and ZoomInfo together?",
        a: "Yes, and many teams do: the trigger tool decides which accounts to call and why, and the contact database helps reach the people there.",
      },
      {
        q: "What data is best for selling to facilities?",
        a: "Records that change when a facility needs something: inspection results, building permits, ownership changes, new licenses and public bids, combined with confirmed decision makers by role.",
      },
    ],
    sources: [
      { label: "LinkedIn Sales Navigator", href: "https://business.linkedin.com/sales-solutions/sales-navigator" },
      { label: "Account-based marketing (Wikipedia)", href: "https://en.wikipedia.org/wiki/Account-based_marketing" },
      { label: "SAM.gov contract opportunities", href: "https://sam.gov/" },
    ],
  },
  {
    slug: "how-to-find-the-decision-maker",
    title: "How to find the decision maker at a company (by seat, not by title)",
    metaTitle: "How to Find the Decision Maker at a Company",
    description:
      "B2B deals have more than one decision maker. Here's how to map the seats that matter for your sale (owner, finance, facilities, operations) and confirm the people in them from public sources.",
    question: "How do you find the decision maker at a company?",
    category: "B2B Sales Playbooks",
    readMinutes: 7,
    updated: UPDATED,
    image: IMG("how-to-find-the-decision-maker"),
    imageAlt: "Simpl graphic: finding the decision maker",
    imageCredit: CREDIT,
    audience: "b2b",
    keyTakeaways: [
      "There's rarely one decision maker. Map the seats that matter for your sale: who signs, who pays, who uses it, who can block it.",
      "Public sources (licensing records, state business registrations, company sites, professional profiles) can confirm most of those people.",
      "Keep only people you can confirm. A wrong name on a first call costs more credibility than no name.",
    ],
    intro:
      "'Who's the decision maker?' is the wrong question for most B2B deals. A $50,000 system for a building is usually approved by one person, paid for by another, used by a third and quietly vetoed by a fourth. Find the seats first, then the people.",
    sections: [
      {
        heading: "Map the seats for your sale",
        paragraphs: [
          "Write down the seats that touch your typical deal. For facilities and building systems that's usually the owner or asset manager (sets standards, approves capital), finance (pays), the facilities or maintenance lead (uses it, feels the pain) and operations (owns the outcome). In healthcare add the clinical lead; in schools, the IT director and procurement.",
          "Then mark which seat starts the conversation and which one ends it. Many deals start with the person who feels the problem and close with the person who controls the budget.",
        ],
      },
      {
        heading: "Where to find the people in each seat",
        paragraphs: [
          "Licensing records often name the administrator or licensee of a facility. State business registries list officers and registered agents; [OpenCorporates](https://opencorporates.com/) aggregates many of them. Healthcare organizations list an authorized official in the [NPI registry](https://npiregistry.cms.hhs.gov/). Permits name applicants and contractors. Company websites, press releases and professional profiles fill in the rest.",
          "For multi-site operators, look one level up: the regional or corporate team usually decides on standards for every location.",
        ],
      },
      {
        heading: "Confirm before you call",
        paragraphs: [
          "People change jobs, and facilities roles turn over often. Confirm each person from at least one current source before you use their name, and drop anyone you can't confirm. A switchboard call asking 'who handles your access control decisions now?' is a perfectly good way to confirm.",
          "The [Account Engine](/services/account-engine) does this research on demand for any account: it looks for the person in each seat from public sources and keeps only the people it can confirm, so a rep never opens with a name that left last year.",
        ],
      },
      {
        heading: "Open with the reason, not the title",
        paragraphs: [
          "Once you have the right seat, lead with their reason: the citation, the permit, the sale, the bid. 'You're the person who owns life safety at the Elm Street building, and the fire marshal's report is due back next month' gets a different response than 'Are you the decision maker for security?'.",
          "If you reach the wrong seat, ask who else would need to be involved. That one question builds the map for you. See [sales trigger events](/blog/sales-trigger-events-b2b) for the reasons that make these calls land.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I find out who makes purchasing decisions at a company?",
        a: "List the roles your deal touches (owner, finance, users, operations, procurement), then confirm the people in those seats from licensing records, business registries, the company's site and professional profiles. Asking the first contact who else is involved fills the gaps.",
      },
      {
        q: "Is it better to start high or low in an organization?",
        a: "Start with the seat that feels the problem your trigger points to, and bring the budget owner in early. For multi-site operators, a regional or corporate leader often sets the standard for every location.",
      },
      {
        q: "How do I find a facility manager's name?",
        a: "Try the company's website and press releases, professional profiles, permits and licensing records, then confirm with a short call to the main line asking who handles facilities now.",
      },
    ],
    sources: [
      { label: "OpenCorporates", href: "https://opencorporates.com/" },
      { label: "NPPES NPI Registry", href: "https://npiregistry.cms.hhs.gov/" },
      { label: "Buying center (Wikipedia)", href: "https://en.wikipedia.org/wiki/Buying_center" },
    ],
  },
  {
    slug: "lead-generation-for-low-voltage-contractors",
    title: "Lead generation for low voltage contractors: where the projects show up first",
    metaTitle: "Lead Generation for Low Voltage Contractors",
    description:
      "Low voltage, security and cabling projects are announced in permits, E-Rate bids, property sales and inspections before they're bid. Here's how to find them first.",
    question: "How do low voltage contractors get more leads?",
    category: "B2B Industries",
    readMinutes: 8,
    updated: UPDATED,
    image: IMG("lead-generation-for-low-voltage-contractors"),
    imageAlt: "Simpl graphic: lead generation for low voltage contractors",
    imageCredit: CREDIT,
    audience: "b2b",
    keyTakeaways: [
      "The best low-voltage leads come from four public sources: commercial permits, E-Rate Form 470 postings, property sales and inspection citations.",
      "E-Rate applicants must post a Form 470 and wait at least 28 days before choosing a vendor, which is a public, dated invitation to bid.",
      "Service agreements and upgrades follow ownership changes and citations, and are often steadier revenue than new installs.",
    ],
    intro:
      "Most low voltage contractors live on referrals, GC relationships and bid boards. All three work, and all three put you in line with everyone else. The projects worth the most usually show up in public records first, before the package is bid and before your competitors call.",
    sections: [
      {
        heading: "Commercial permits: the build-out signal",
        paragraphs: [
          "Tenant improvements, renovations and new construction all start with a permit. Filter local permit records for commercial work above a value threshold and for descriptions that imply your scope (medical office, data room, school renovation, new multifamily). Then call the owner or the GC before the low-voltage package is awarded.",
          "More on working permits: [how to use building permits for sales leads](/blog/building-permits-for-sales-leads).",
        ],
      },
      {
        heading: "E-Rate: schools and libraries asking for bids",
        paragraphs: [
          "Through the federal E-Rate program, schools and libraries get discounts on internet access and on internal connections like cabling, switches and Wi-Fi. To start, an applicant posts an FCC Form 470 describing what it needs, and must wait at least 28 days before choosing a provider. [USAC](https://www.usac.org/e-rate/) administers the program and the postings are public.",
          "That makes a Form 470 one of the clearest leads in the industry: a named buyer, a described scope and a deadline. If you serve K-12 or libraries and you're not watching them, you're leaving bids on the table.",
        ],
      },
      {
        heading: "Property sales and inspection citations: the service signal",
        paragraphs: [
          "When a commercial building sells, the new owner often standardizes access control and video across its portfolio and re-bids service. Deed records show the sale; property records show the owner. In senior living and healthcare, inspectors cite call systems, door alarms and emergency communication, and every citation comes with a plan of correction.",
          "Both lead to service agreements and upgrades, not just installs. If you sell into those markets, see [how to sell to senior living communities](/blog/how-to-sell-to-senior-living-communities).",
        ],
      },
      {
        heading: "Putting it together",
        paragraphs: [
          "Watch those four sources for your territory, score each building on how fresh and how strong its signal is, attach the owner, the GC or the facilities lead, and call the top of the list every week. Federal opportunities on [SAM.gov](https://sam.gov/) and state procurement portals add public-sector work.",
          "That's exactly what the [Account Engine for low voltage, security and telecom](/industries/low-voltage-security) does, every night, with the record linked on every reason. You can see what it finds in your own territory with a free [top 25 accounts](/top-25) sample.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do low voltage contractors find commercial projects?",
        a: "By watching commercial building permits, E-Rate Form 470 postings, property sales, inspection citations and public bids in their territory, and calling the owner or GC before the low-voltage package is awarded.",
      },
      {
        q: "What is an E-Rate Form 470?",
        a: "It's the form a school or library posts to request bids for E-Rate eligible services such as internet access, cabling and Wi-Fi. Applicants must wait at least 28 days after posting before selecting a provider.",
      },
      {
        q: "Should low voltage contractors run Google Ads?",
        a: "Ads can work for small commercial and service calls, but large projects are rarely found by searching. Public-record signals and relationships with owners and GCs usually produce the bigger contracts.",
      },
    ],
    sources: [
      { label: "USAC: E-Rate program", href: "https://www.usac.org/e-rate/" },
      { label: "FCC: E-Rate overview", href: "https://www.fcc.gov/general/e-rate-schools-libraries-usf-program" },
      { label: "SAM.gov contract opportunities", href: "https://sam.gov/" },
    ],
  },
  {
    slug: "b2b-sales-follow-up-cadence",
    title: "How many times should you follow up in B2B sales?",
    metaTitle: "How Many Times to Follow Up in B2B Sales",
    description:
      "A practical B2B follow-up cadence across email and phone: how many touches, how far apart, what to say each time, and when to stop, within the rules.",
    question: "How many times should you follow up with a B2B prospect?",
    category: "B2B Sales Playbooks",
    readMinutes: 7,
    updated: UPDATED,
    image: IMG("b2b-sales-follow-up-cadence"),
    imageAlt: "Simpl graphic: B2B follow-up cadence",
    imageCredit: CREDIT,
    audience: "b2b",
    keyTakeaways: [
      "Most teams stop too early. Plan several spaced touches across email and phone, and stop the moment the prospect replies or opts out.",
      "Speed matters on inbound: a widely cited Harvard Business Review study found firms that responded within an hour were far more likely to qualify a lead.",
      "Every touch should add something (the deadline, the record, a relevant fix), and every email must follow CAN-SPAM, including a working opt-out.",
    ],
    intro:
      "Ask ten sales leaders how many follow-ups is right and you'll get ten numbers. The honest answer: more than most teams do, spaced out, across more than one channel, each one useful on its own, and never after someone asks you to stop.",
    sections: [
      {
        heading: "A cadence that works for high-ticket B2B",
        paragraphs: [
          "A good starting point for a cold account with a real reason to call: day 1 email with the reason and the record; day 3 call; day 7 a useful follow-up email; day 10 call; then a touch every week or two for the next several weeks, alternating channels. Pause the sequence the moment they reply, and stop it the moment they opt out.",
          "Tune it to your sale. A $200,000 system with a nine-month cycle can carry a longer, slower sequence than a $5,000 service contract. Measure where replies actually come from and move touches toward what works.",
        ],
      },
      {
        heading: "What to say on touch four (and five, and six)",
        paragraphs: [
          "'Just following up' is the reason people stop reading. Each touch should carry something new: the re-inspection date, a change at the account, a short note on how another building closed the same finding, a one-line question that's easy to answer. When you start from a [trigger event](/blog/sales-trigger-events-b2b), there's always something specific to say.",
          "Keep emails short and specific to the account. If it could be sent to anyone, it will be ignored by everyone.",
        ],
      },
      {
        heading: "Speed on inbound, patience on outbound",
        paragraphs: [
          "Inbound leads are the opposite of cold accounts: respond fast. A frequently cited [Harvard Business Review study](https://hbr.org/2011/03/the-short-life-of-online-sales-leads) found that firms that tried to contact a lead within an hour were nearly seven times as likely to qualify it as firms that waited longer. Outbound accounts reward persistence over weeks; inbound leads reward minutes.",
          "That's one reason a 24/7 line matters for service companies: see [what an AI receptionist should do for a B2B company](/blog/ai-receptionist-for-b2b-service-companies).",
        ],
      },
      {
        heading: "Stay inside the rules",
        paragraphs: [
          "Commercial email in the US falls under CAN-SPAM, including B2B email: honest headers and subject lines, a physical postal address, and a clear way to opt out that you honor promptly. The [FTC's compliance guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) is short and worth reading. Calls and texts to mobile phones carry their own rules under the TCPA.",
          "The [CRM and follow-up](/services/crm-follow-up) Simpl builds runs this cadence for every account the engine finds, with opt-outs honored automatically.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many follow-up emails is too many?",
        a: "There's no fixed number, but stop as soon as the prospect replies or asks you to stop, and make sure every message adds something new. A sequence of several spaced touches over a few weeks is common for high-ticket B2B.",
      },
      {
        q: "How long should you wait between follow-ups?",
        a: "Two to four days early in a sequence, then a week or two later on. Longer sales cycles can stretch the gaps; inbound leads should be contacted within the hour.",
      },
      {
        q: "Does CAN-SPAM apply to B2B emails?",
        a: "Yes. The FTC's guidance is that CAN-SPAM covers all commercial email, including business-to-business messages.",
      },
    ],
    sources: [
      { label: "Harvard Business Review: The Short Life of Online Sales Leads", href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads" },
      { label: "FTC: CAN-SPAM Act compliance guide", href: "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business" },
      { label: "FCC: Telephone Consumer Protection Act", href: "https://www.fcc.gov/general/telephone-consumer-protection-act-1991" },
    ],
  },
  {
    slug: "ai-receptionist-for-b2b-service-companies",
    title: "AI receptionist for B2B service companies: what it should and shouldn't do",
    metaTitle: "AI Receptionist for B2B Service Companies",
    description:
      "What a 24/7 AI receptionist and support line should handle for a B2B service company, what it should always hand to a person, and how to roll one out safely.",
    question: "Should a B2B service company use an AI receptionist?",
    category: "B2B Sales Playbooks",
    readMinutes: 7,
    updated: UPDATED,
    image: IMG("ai-receptionist-for-b2b-service-companies"),
    imageAlt: "Simpl graphic: AI receptionist for B2B service companies",
    imageCredit: CREDIT,
    audience: "b2b",
    keyTakeaways: [
      "A good AI receptionist answers every call and ticket, identifies the customer and site, solves routine questions from your own guides, and escalates anything urgent to a person.",
      "It should never guess, never promise prices or times your team hasn't set, and never hold an emergency. Callers should always be able to reach a human.",
      "Outbound calls are different: the FCC treats AI-generated voices as 'artificial' under the TCPA, so use AI voices for answering, not for cold calling.",
    ],
    intro:
      "For B2B service companies (integrators, building systems, facility services, healthcare technology), the phone is still how customers report problems and how a lot of new work arrives. The trouble is coverage: nights, weekends and the morning rush. A well-built AI receptionist closes that gap. A badly built one makes it worse.",
    sections: [
      {
        heading: "What it should handle",
        paragraphs: [
          "Answer on the first ring, any hour. Identify the caller, their company and the site. Check your own guides, manuals and that site's service history, not the open internet. Resolve what's routine and approved: status updates, hours, simple troubleshooting steps your team has signed off on. Open a ticket with a clean summary either way.",
          "For new business, capture the details and book the next step, because response speed matters: a well-known [Harvard Business Review study](https://hbr.org/2011/03/the-short-life-of-online-sales-leads) found that responding within an hour sharply raised the odds of qualifying a lead.",
        ],
      },
      {
        heading: "What it should always hand to a person",
        paragraphs: [
          "Anything on your urgent list (a system down at a hospital, a fire panel in trouble, a door that won't lock) goes straight to whoever is on call, with the summary already written. So does anything it can't answer from your guides, any price or schedule promise, and any caller who asks for a human.",
          "The test is simple: would you be comfortable reading the transcript to the customer's boss? If not, it should have escalated.",
        ],
      },
      {
        heading: "Answering is not cold calling",
        paragraphs: [
          "AI voices belong on inbound and support. Outbound is a different legal picture: in 2024 the FCC [ruled that AI-generated voices in robocalls count as 'artificial'](https://www.fcc.gov/document/fcc-makes-ai-generated-voices-robocalls-illegal) under the [TCPA](https://www.fcc.gov/general/telephone-consumer-protection-act-1991), which brings consent requirements with them. Use a person, and a real reason, for outbound calls.",
          "If outbound is the goal, start with who to call and why: see [sales trigger events](/blog/sales-trigger-events-b2b).",
        ],
      },
      {
        heading: "How to roll one out safely",
        paragraphs: [
          "Start with overflow and after-hours only. Load your real guides and on-call rules, define the urgent list in writing, and review transcripts weekly for the first month. Expand coverage as the handoffs prove themselves.",
          "Simpl builds the [AI receptionist and 24/7 support line](/services/ai-receptionist) this way, from your own guides and rules, as part of Account Engine Pro or on its own.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can an AI receptionist replace a dispatcher?",
        a: "It's better as coverage than replacement: it handles nights, weekends and overflow, and hands your dispatchers and techs a written summary for anything that needs a person.",
      },
      {
        q: "Is it legal to use an AI voice to answer business calls?",
        a: "Answering inbound calls with an AI voice is common. Outbound calls are different: the FCC has ruled that AI-generated voices in robocalls are 'artificial' under the TCPA, which brings consent requirements.",
      },
      {
        q: "What should an AI receptionist never do?",
        a: "Guess at answers it can't find in your guides, promise prices or times your team hasn't set, sit on an urgent issue, or refuse a caller who asks for a person.",
      },
    ],
    sources: [
      { label: "FCC: AI-generated voices in robocalls", href: "https://www.fcc.gov/document/fcc-makes-ai-generated-voices-robocalls-illegal" },
      { label: "FCC: Telephone Consumer Protection Act", href: "https://www.fcc.gov/general/telephone-consumer-protection-act-1991" },
      { label: "Harvard Business Review: The Short Life of Online Sales Leads", href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads" },
    ],
  },
];
