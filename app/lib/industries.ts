/**
 * The six trade pages. Every example points at app/lib/records.ts, so a
 * number can only appear here if it has a source there.
 * "read" lines are our reasoning about why a record matters to the trade;
 * they are worded as reasons, never as statistics.
 */
export interface Industry {
  slug: string;
  label: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  who: string;
  triggers: { t: string; w: string }[];
  records: string[];
  stats: string[];
  read: string;
  opener: string;
  openerNote?: string;
  faqs: { q: string; a: string }[];
}

export const INDUSTRY_PAGES: Industry[] = [
  {
    slug: "elevator-service",
    label: "Elevator service",
    title: "Market Intelligence for Elevator Service Companies | Simpl",
    description: "Buildings whose elevators failed state inspection, failed again, or let a certificate lapse, with the owner on record and the state's own file. From Simpl.",
    h1: "The elevators that keep failing, and the buildings that own them.",
    lead: "Simpl, the market intelligence partner for elevator service and modernization companies. We find the buildings that need you, before your competitors know they exist.",
    who: "Elevator service, repair and modernization companies.",
    triggers: [
      { t: "Failed state inspection", w: "The newest inspection failed. Repairs come before a passing reinspection." },
      { t: "Failed, reinspected, failed again", w: "The problem isn't getting fixed. The strongest reason an owner listens to a new company." },
      { t: "Complaint inspection", w: "Someone reported the elevator to the state. The owner already knows there's a problem." },
      { t: "Certificate lapsed or expiring", w: "Every unit needs a passing inspection to stay certified. Dated, so you can call before the deadline." },
      { t: "Overdue inspection notices", w: "States like Texas mail owners a formal notice. It's on file with a date." },
    ],
    records: ["dallas"],
    stats: ["mdFailedTwice", "mdComplaint", "mdNewestFailed", "mdExpired", "mdExpiring", "dallasLapsed"],
    read: "A building that fails twice has a problem its current service company isn't fixing. That makes it the easiest switch you'll ever pitch.",
    opener: "\"The state's file shows all four of your elevators lapsed their annual inspection on November 12, and a notice went out a week later. Who's scheduling the inspection?\"",
    faqs: [
      { q: "Which states do you cover for elevators?", a: "Any state whose elevator records are public or can be requested. Maryland and Texas are shown here with real counts. Coverage differs by state, so we tell you on the call exactly what your territory's records support." },
      { q: "Do you know who services each elevator now?", a: "Only where a public record says so. We never guess an incumbent. When a state doesn't publish it, the list says so plainly." },
    ],
  },
  {
    slug: "fire-alarm-sprinkler",
    label: "Fire alarm & sprinkler",
    title: "Market Intelligence for Fire Alarm & Sprinkler Contractors | Simpl",
    description: "Buildings cited for fire alarm, sprinkler and extinguisher problems, from city notices and federal inspections, each with the record and the date. From Simpl.",
    h1: "The buildings an inspector already wrote up for what you fix.",
    lead: "Simpl, the market intelligence partner for fire alarm, sprinkler and life safety contractors. We find the buildings that need you, before your competitors know they exist.",
    who: "Fire alarm, sprinkler, extinguisher and life safety contractors.",
    triggers: [
      { t: "City notices of violation", w: "A housing or building inspector cites the alarm, the sprinklers or the extinguishers, with the exact item quoted." },
      { t: "Orders of abatement", w: "The case went to a hearing and the city ordered the work done on a clock." },
      { t: "Federal life safety citations", w: "CMS inspectors cite nursing homes by tag: K353 sprinklers, K345 fire alarm testing. Dated, with the citation text." },
      { t: "Reinspection still outstanding", w: "Other items got fixed, the fire item didn't. The log shows it." },
    ],
    records: ["sanfrancisco"],
    stats: ["sfAlarm", "cmsSprinkler", "cmsAlarm"],
    read: "A citation names the exact work, the date it was found, and usually a deadline. Your first call can be about their problem, not your company.",
    opener: "\"The city's notice says your fire alarm panel needs a licensed company to service and certify it, and an abatement order was posted on the 17th. Can we take that off your plate?\"",
    faqs: [
      { q: "Are the federal citations only for nursing homes?", a: "Yes. The CMS file covers nursing homes, which is why we pair it with city and county records for every other building type." },
      { q: "What if the problem was already fixed?", a: "The records show correction dates and case status where the agency publishes them, and we show those too. A closed case doesn't go on your list as an open reason." },
    ],
  },
  {
    slug: "low-voltage-fiber-telecom",
    label: "Low voltage, fiber & telecom",
    title: "Market Intelligence for Low Voltage, Fiber & Telecom | Simpl",
    description: "New commercial space, tenant finishes and buildings mid-renovation, from public permits and inspection records, each with the record. From Simpl.",
    h1: "Every new space gets wired by somebody. Be the first call.",
    lead: "Simpl, the market intelligence partner for low voltage, structured cabling, fiber and telecom companies. We find the buildings that need you, before your competitors know they exist.",
    who: "Low voltage, structured cabling, access control, fiber and business telecom providers.",
    triggers: [
      { t: "New building permits", w: "A building that doesn't exist yet buys every system at once." },
      { t: "Tenant finish permits", w: "New tenants mean new cabling, new access control, new service." },
      { t: "Renovations and recertifications", w: "Buildings re-certifying or repairing after an inspection are touching their systems anyway, which is when owners pick a new provider." },
      { t: "Elevator registries", w: "Every registered elevator is a building with elevator phone lines to keep working. The state lists them with the owner." },
    ],
    records: ["denver"],
    stats: ["denverPermits", "denverValue", "mdExpiring"],
    read: "A permit is dated and public weeks before the space opens. That's the window to get in front of the general contractor and the tenant.",
    opener: "\"Saw the tenant finish permit at 1800 Larimer issued on the 10th. Who's handling the low voltage on that space?\"",
    faqs: [
      { q: "Can you filter permits to jobs big enough to matter?", a: "Yes, where the city publishes a job value or floor area. Denver's permit file has both, and we show the figure the city publishes." },
      { q: "Do you show the contractor on the permit?", a: "Where the city publishes it, yes. It tells you who to call first on a new build." },
    ],
  },
  {
    slug: "roofing-facade",
    label: "Roofing & facade",
    title: "Market Intelligence for Roofing & Facade Contractors | Simpl",
    description: "Facades filed unsafe, fire escape orders and civil citations, from city inspection programs, each with the record and the deadline. From Simpl.",
    h1: "Unsafe facades are on file. The deadline is too.",
    lead: "Simpl, the market intelligence partner for roofing, facade, masonry and exterior restoration contractors. We find the buildings that need you, before your competitors know they exist.",
    who: "Roofing, facade, masonry, waterproofing and fire escape contractors.",
    triggers: [
      { t: "Facade inspection filings marked unsafe", w: "Cities with facade programs publish every filing and its status. New York gives 90 days to correct." },
      { t: "Fire escape and facade orders", w: "Cincinnati issues orders, final notices and civil citations, each on a public page." },
      { t: "Civil citations", w: "The city has already escalated. In Cincinnati, every open order marked unsafe calls for an engineer or architect's report on the repair." },
      { t: "Repeat unsafe filings", w: "Unsafe cycle after cycle means the repair still hasn't happened." },
    ],
    records: ["nyc", "cincinnati"],
    stats: ["nycFacades", "cincyOrders", "cincyCitations"],
    read: "A facade marked unsafe has a legal clock on it. The owner needs a contractor, and the record tells you exactly what was found and when.",
    opener: "\"Your facade has been filed unsafe since 2022, most recently in December. Do you have a contractor lined up for the repair?\"",
    faqs: [
      { q: "Which cities have facade programs?", a: "New York and Cincinnati are shown here. Other cities run their own programs; we tell you on the call what your territory publishes." },
      { q: "Is \"unsafe\" the city's word or yours?", a: "The city's. We quote the status exactly as filed and link the filing." },
    ],
  },
  {
    slug: "generators",
    label: "Generators",
    title: "Market Intelligence for Generator Dealers & Service | Simpl",
    description: "Facilities cited by federal inspectors for emergency generators not capable or not tested, each with the citation and date. From Simpl.",
    h1: "The generators an inspector says won't carry the load.",
    lead: "Simpl, the market intelligence partner for generator dealers, emergency power and load bank testing companies. We find the buildings that need you, before your competitors know they exist.",
    who: "Standby generator dealers, emergency power service and load bank testing companies.",
    triggers: [
      { t: "Federal emergency power citations (K918)", w: "CMS inspectors cite nursing homes whose generators aren't capable or weren't tested to NFPA 110. Each citation is dated, with the inspector's text." },
      { t: "Correction status", w: "The file shows whether the citation was corrected, so you know if the work is still open." },
      { t: "New healthcare construction", w: "Permits for new facilities that will need standby power." },
    ],
    records: [],
    stats: ["cmsGenerators", "cmsGenerators7"],
    read: "\"Your generator was cited on this date under NFPA 110\" is an opener nobody ignores. It's specific, it's dated, and it's the owner's problem to solve.",
    opener: "\"The federal inspection on file cites your emergency generator under NFPA 110. Has it been load-tested since?\"",
    openerNote: "A template. On the call it carries the facility's real citation date.",
    faqs: [
      { q: "Do you have a named example?", a: "Not on this page. We show facility names on the call, inside your territory, with each citation open. Counts here come straight from the federal file." },
      { q: "Does this cover hospitals?", a: "The federal life safety file covers nursing homes. Hospitals are inspected too, but their reports aren't in a comparable public bulk file, so we pair this with permits and local records." },
    ],
  },
  {
    slug: "commercial-construction",
    label: "Concrete & commercial construction",
    title: "Market Intelligence for Concrete & Commercial Construction | Simpl",
    description: "Buildings past recertification and seismic retrofit deadlines, from county and city records, each with the case and the date. From Simpl.",
    h1: "The buildings that owe a structural repair, and the date it was due.",
    lead: "Simpl, the market intelligence partner for concrete restoration, structural repair and commercial construction companies. We find the buildings that need you, before your competitors know they exist.",
    who: "Concrete restoration, structural repair, seismic retrofit and commercial general contractors.",
    triggers: [
      { t: "Recertification past deadline", w: "Miami-Dade requires older buildings to recertify. Cases referred to enforcement are public, with the year due." },
      { t: "Seismic retrofit deadlines", w: "Los Angeles publishes every soft-story building's order and deadline, and which ones have no signed-off permit." },
      { t: "Permits submitted, never issued", w: "The owner started the process and stalled. They may need a new contractor to finish it." },
      { t: "New commercial permits", w: "Dated and valued, so you see the job before the bid list fills up." },
    ],
    records: ["miami", "losangeles"],
    stats: ["miami", "laSoftStory"],
    read: "A recertification or retrofit deadline is a legal obligation with a date on it. The owner has to hire someone; the record tells you who's late.",
    opener: "\"The county shows your tower's 2025 recertification still in progress and referred to enforcement. Who's doing the structural work?\"",
    faqs: [
      { q: "Is the Miami-Dade number all of Miami-Dade?", a: "No. It covers unincorporated Miami-Dade, the county building department's own jurisdiction. Each city (Miami, Miami Beach, Hialeah and others) runs its own program, and we never add those in silently." },
      { q: "How do you know a retrofit wasn't finished?", a: "For Los Angeles we count only buildings past the final deadline with no certificate, no finaled permit and no signed-off permit in the city's own files." },
    ],
  },
];

export function getIndustry(slug: string) {
  return INDUSTRY_PAGES.find((i) => i.slug === slug);
}
