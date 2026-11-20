/**
 * Every public-record fact on the site, with its source.
 *
 * RULE: nothing on the site states a number or a record that is not in this
 * file, and nothing goes in this file without the source it came from.
 * Sources (Simpl.master repo, pulled Nov 18 to 20, 2026):
 *   - docs/brand/social/SCRIPT_COMMERCIAL.md (C1 to C15)
 *   - docs/brand/social/reels/01..11 (per-city source tables)
 *   - docs/brand/social/GTA6_TREND.md, Spot 1 (M1 to M4)
 *   - docs/sales/pitches/MD_ELEVATOR_DATA_PITCH.md (Maryland state records)
 *   - docs/funnel/ACCOUNT_ENGINE_TARGETS_RESEARCH.md + account_engine_samples/SUMMARY.md (CMS)
 * Counts move daily. Re-pull before any paid use; update the "pulled" dates.
 * No owner names, no client data, no dollar figures we could not verify.
 */

export interface Source {
  name: string;
  url: string;
}

export interface Line {
  text: string;
  hl?: boolean;
}

export interface PublicRecord {
  id: string;
  date: string;
  place: string;
  address: string;
  why: string;
  docHeader: string;
  lines: Line[];
  rendered: string;
  open: Source;
  more?: Source[];
  pulled: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  where: string;
  definition: string;
  source: Source;
  pulled: string;
}

/* ------------------------------------------------------------------ */
/* Named records                                                       */
/* ------------------------------------------------------------------ */

export const RECORDS: Record<string, PublicRecord> = {
  cincinnati: {
    id: "cincinnati",
    date: "Jul 1, 2026",
    place: "Cincinnati, OH",
    address: "128 W COURT ST",
    why: "Fire escape marked unsafe. No progress on reinspection. Civil citation issued.",
    docHeader: "APD BF23000409",
    lines: [
      { text: "Condition: FIRE ESCAPE- UNSAFE  In Violation", hl: true },
      { text: "7/1/2026 Final Notice - Inspection: \"No progress visible on inspection. Recommend Civil 1.\"" },
      { text: "Status: Civil Citation Issued - Level 1", hl: true },
    ],
    rendered: "Rendered from the city's public record, APD BF23000409",
    open: { name: "City of Cincinnati / CAGIS Property Activity", url: "https://cagismaps.hamilton-co.org/PropertyActivity/CagisReport?APD=BF23000409" },
    pulled: "Nov 18, 2026",
  },
  miami: {
    id: "miami",
    date: "Recert year 2025",
    place: "Unincorporated Miami-Dade, FL",
    address: "1300 NE MIAMI GARDENS DR, BLDG 1300-EAST",
    why: "A 1975 condo tower, due for its safety recertification in 2025. Still not recertified.",
    docHeader: "Case F2025006159",
    lines: [
      { text: "Recertification Year 2025" },
      { text: "Enforcement Status: Yes", hl: true },
      { text: "Case Status: In Progress", hl: true },
      { text: "Year built: 1975 (Property Appraiser)" },
    ],
    rendered: "Rendered from Miami-Dade County's public record",
    open: { name: "Miami-Dade RER, Building Recertification", url: "https://www.miamidade.gov/Apps/RER/EPSPortal/PlanReview/BRApplication/Details/F2025006159" },
    more: [{ name: "Miami-Dade Property Appraiser", url: "https://www.miamidade.gov/Apps/PA/propertysearch/#/?folio=3022050511900" }],
    pulled: "Nov 20, 2026",
  },
  sanfrancisco: {
    id: "sanfrancisco",
    date: "Nov 17, 2026",
    place: "San Francisco, CA",
    address: "1449 POWELL ST",
    why: "Fire alarm service still outstanding after two reinspections. Order of abatement posted.",
    docHeader: "Complaint 202658590",
    lines: [
      { text: "NOV item #3, service fire alarm (909 sfhc): \"central fire alarm system is blinking yellow warning light. have licensed fire alarm company service / certify fire alarm system - required each year.\"", hl: true },
      { text: "10/06/26 Reinspection 2: outstanding items #3, 6" },
      { text: "11/12/26 Director's hearing: \"15 DAY OA issued.\"" },
      { text: "11/17/26 Order of abatement posted", hl: true },
    ],
    rendered: "Rendered from San Francisco DBI's public complaint record",
    open: { name: "San Francisco DBI, Complaint Data Sheet", url: "https://dbiweb02.sfgov.org/dbipts/default.aspx?page=AddressComplaint&ComplaintNo=202658590" },
    pulled: "Nov 19, 2026",
  },
  nyc: {
    id: "nyc",
    date: "Dec 30, 2025",
    place: "Manhattan, NY",
    address: "50 EAST 42 STREET, BIN 1035336",
    why: "Facade filed UNSAFE three times since 2022. The city rule gives 90 days to correct.",
    docHeader: "Facade filings, cycle 9",
    lines: [
      { text: "2022-02-18 Initial: UNSAFE" },
      { text: "2023-12-05 Subsequent: UNSAFE" },
      { text: "2025-12-30 Subsequent: UNSAFE", hl: true },
      { text: "1 RCNY 103-04: \"All unsafe conditions must be corrected within ninety (90) days from the submission of the critical examination report.\"" },
    ],
    rendered: "Rendered from NYC Open Data, DOB facade filings",
    open: { name: "NYC Open Data, DOB facade filings", url: "https://data.cityofnewyork.us/resource/xubg-57si.json?bin=1035336" },
    more: [{ name: "NYC DOB rule 1 RCNY 103-04 (PDF)", url: "https://www.nyc.gov/assets/buildings/rules/1_RCNY_103-04.pdf" }],
    pulled: "Nov 19, 2026",
  },
  dallas: {
    id: "dallas",
    date: "Nov 19, 2025",
    place: "Dallas, TX",
    address: "400 N ST PAUL ST, BUILDING 800",
    why: "Four passenger elevators, installed 1958, past their annual inspection. The state sent an overdue notice.",
    docHeader: "TDLR building 800",
    lines: [
      { text: "NOTICE OF OVERDUE ANNUAL INSPECTION", hl: true },
      { text: "Units: 4, passenger, year installed 1958" },
      { text: "Expiration: 11/12/2025, all four units" },
      { text: "\"Failure to have an annual inspection may subject the building owner to administrative penalties of up to $5,000 per day for each violation\"" },
    ],
    rendered: "Rendered from the Texas Department of Licensing and Regulation record",
    open: { name: "TDLR elevator record, building 800", url: "https://www.tdlr.texas.gov/Elevator_SearchApp/Elevator/Details/800" },
    pulled: "Nov 19, 2026",
  },
  denver: {
    id: "denver",
    date: "Nov 10, 2026",
    place: "Denver, CO",
    address: "1800 LARIMER ST",
    why: "Tenant finish permit issued for a 21,679 sq ft renovation. New space gets new systems.",
    docHeader: "2026-COMMCON-0002048",
    lines: [
      { text: "Commercial Construction Permit" },
      { text: "Scope of Work: Existing Building Renovation - Tenant Finish", hl: true },
      { text: "Record Status: Issued" },
      { text: "Total gross floor area: 21,679 sq ft" },
    ],
    rendered: "Rendered from Denver's public permit record",
    open: { name: "Denver ePermits record", url: "https://aca-prod.accela.com/DENVER/Cap/CapDetail.aspx?Module=Development&TabName=Development&capID1=26CAP&capID2=00000&capID3=04CNR&agencyCode=DENVER" },
    more: [{ name: "Denver Open Data, commercial construction permits", url: "https://opendata-geospatialdenver.hub.arcgis.com/datasets/4e2cf20443e14710bbb4311126a4362c" }],
    pulled: "Nov 19, 2026",
  },
  losangeles: {
    id: "losangeles",
    date: "Oct 25, 2026",
    place: "Los Angeles, CA",
    address: "3920 W INGRAHAM ST",
    why: "Soft-story retrofit deadline passed. The retrofit permit was submitted in 2022 and never issued.",
    docHeader: "Soft-story compliance",
    lines: [
      { text: "Order to comply: 2016-11-17" },
      { text: "Permit 22016-10000-17173 submitted 2022-06-07, not issued" },
      { text: "Final deadline (with extension): 2026-10-25", hl: true },
      { text: "\"SOFT-STORY RETROFIT AS PER LABC CH 93. NEW SHEAR WALL; STRONG WALL, MOMENT FRAMES.\"" },
    ],
    rendered: "Rendered from Los Angeles open data",
    open: { name: "LA Open Data, soft-story compliance", url: "https://data.lacity.org/d/dqq4-799r" },
    more: [{ name: "LA Open Data, permits submitted", url: "https://data.lacity.org/resource/gwh9-jnip.json" }],
    pulled: "Nov 19, 2026",
  },
};

/* ------------------------------------------------------------------ */
/* Counts                                                              */
/* ------------------------------------------------------------------ */

const MD_SOURCE: Source = {
  name: "Maryland Dept. of Labor, Elevator Safety: 2026 inspection records (Public Information Act), joined to the Active Elevator Units list",
  url: "https://labor.maryland.gov/labor/safety/elevcounties.shtml",
};
const CMS_SOURCE: Source = {
  name: "CMS Provider Data Catalog, nursing home Fire Safety Deficiencies (ifjz-ge4w)",
  url: "https://data.cms.gov/provider-data/dataset/ifjz-ge4w",
};

export const STATS: Record<string, Stat> = {
  chicago: { id: "chicago", value: "2,037,392", label: "building violation records", where: "Chicago", definition: "All rows in the Building Violations dataset, all years, all types", source: { name: "City of Chicago Data Portal", url: "https://data.cityofchicago.org/d/22u3-xenr" }, pulled: "Nov 2026" },
  sanfrancisco: { id: "sanfrancisco", value: "519,677", label: "notices of violation", where: "San Francisco", definition: "All rows in the DBI Notices of Violation dataset, all years", source: { name: "DataSF", url: "https://data.sfgov.org/d/nbtm-fbw5" }, pulled: "Nov 2026" },
  columbus: { id: "columbus", value: "322,445", label: "code enforcement cases", where: "Columbus", definition: "All rows in the Code Enforcement Cases layer, all types, all years", source: { name: "City of Columbus GIS", url: "https://maps2.columbus.gov/arcgis/rest/services/Schemas/BuildingZoning/MapServer/23" }, pulled: "Nov 2026" },
  cincinnati: { id: "cincinnati", value: "83,796", label: "inspection and certificate records", where: "Cincinnati", definition: "All rows in the Inspections & Certificates dataset, all agencies, all years", source: { name: "Cincinnati Open Data", url: "https://data.cincinnati-oh.gov/d/ivda-umw7" }, pulled: "Nov 18, 2026" },

  mdFailedTwice: { id: "mdFailedTwice", value: "668", label: "Maryland buildings where an elevator failed its state inspection, was reinspected, and failed again", where: "Maryland", definition: "Building count, 2026 inspections Jan 2 to Nov 18, joined to the active unit list of Nov 17", source: MD_SOURCE, pulled: "Nov 19, 2026" },
  mdComplaint: { id: "mdComplaint", value: "164", label: "buildings that drew a complaint inspection (someone reported the elevator to the state)", where: "Maryland", definition: "Building count, 2026 inspections Jan 2 to Nov 18", source: MD_SOURCE, pulled: "Nov 19, 2026" },
  mdNewestFailed: { id: "mdNewestFailed", value: "1,525", label: "buildings whose newest elevator inspection failed", where: "Maryland", definition: "Building count, 2026 inspections Jan 2 to Nov 18", source: MD_SOURCE, pulled: "Nov 19, 2026" },
  mdExpired: { id: "mdExpired", value: "1,449", label: "buildings with an elevator certificate that expired in the last 12 months", where: "Maryland", definition: "Building count as of Nov 19, 2026", source: MD_SOURCE, pulled: "Nov 19, 2026" },
  mdExpiring: { id: "mdExpiring", value: "2,310", label: "buildings with an elevator certificate expiring in the next 90 days", where: "Maryland", definition: "Building count as of Nov 19, 2026", source: MD_SOURCE, pulled: "Nov 19, 2026" },

  miami: { id: "miami", value: "3,454", label: "buildings past their recertification deadline, referred to enforcement", where: "Unincorporated Miami-Dade", definition: "Cases with Enforcement Status = Yes and Case Status = In Progress, stale old cycles dropped, collapsed to distinct address + building", source: { name: "Miami-Dade RER, Building Recertification Portal", url: "https://www.miamidade.gov/Apps/RER/carbr/Home/Recert" }, pulled: "Nov 20, 2026" },
  cincyOrders: { id: "cincyOrders", value: "714", label: "addresses with an open city order on a fire escape or facade", where: "Cincinnati", definition: "Distinct addresses among open facade and fire escape cases at order stage (Orders Issued, Final Notice, Civil Citation Level 1 or 2), live status", source: { name: "Cincinnati Open Data + CAGIS Property Activity", url: "https://data.cincinnati-oh.gov/d/ivda-umw7" }, pulled: "Nov 18, 2026" },
  cincyCitations: { id: "cincyCitations", value: "177", label: "of those already got a civil citation", where: "Cincinnati", definition: "Distinct addresses with live status Civil Citation Issued, Level 1 or 2", source: { name: "CAGIS Property Activity", url: "https://cagismaps.hamilton-co.org/PropertyActivity/CagisReport?APD=BF23000409" }, pulled: "Nov 18, 2026" },
  nycFacades: { id: "nycFacades", value: "1,527", label: "buildings whose latest facade filings are all marked UNSAFE", where: "New York City", definition: "Distinct buildings (BINs) whose filings in their latest cycle (9 or 10) all carry current status UNSAFE", source: { name: "NYC Open Data, DOB facade filings", url: "https://data.cityofnewyork.us/d/xubg-57si" }, pulled: "Nov 19, 2026" },
  sfAlarm: { id: "sfAlarm", value: "115", label: "multi-unit addresses with an open city case citing fire alarms or extinguishers", where: "San Francisco", definition: "Distinct R-2 addresses with an active DBI complaint filed 2024 or later whose notice cites extinguishers or the alarm system, not marked corrected or closed", source: { name: "DataSF + DBI complaint pages", url: "https://data.sfgov.org/d/nbtm-fbw5" }, pulled: "Nov 19, 2026" },
  dallasLapsed: { id: "dallasLapsed", value: "454", label: "Dallas buildings with an elevator whose inspection lapsed 60 days to two years ago", where: "Dallas", definition: "Distinct buildings with at least one unit whose expiration falls between 2024-11-19 and 2026-09-19", source: { name: "TDLR elevator file", url: "https://www.tdlr.texas.gov/elevator_searchapp/elevator" }, pulled: "Nov 19, 2026" },
  denverPermits: { id: "denverPermits", value: "295", label: "new building and tenant finish permits issued in 60 days", where: "Denver", definition: "Commercial construction permits, class New Building (17) or Alteration/Tenant Finish (278), issued 2026-09-21 to 2026-11-17", source: { name: "Denver Open Data", url: "https://opendata-geospatialdenver.hub.arcgis.com/datasets/4e2cf20443e14710bbb4311126a4362c" }, pulled: "Nov 19, 2026" },
  denverValue: { id: "denverValue", value: "$127M", label: "in declared job value on those permits", where: "Denver", definition: "Sum of VALUATION on the 295 permits: $127,028,016, rounded down", source: { name: "Denver Open Data", url: "https://opendata-geospatialdenver.hub.arcgis.com/datasets/4e2cf20443e14710bbb4311126a4362c" }, pulled: "Nov 19, 2026" },
  laSoftStory: { id: "laSoftStory", value: "190", label: "soft-story buildings past their final retrofit deadline with no sign-off", where: "Los Angeles", definition: "Addresses past the step 3 deadline (with extensions) before 2026-11-19, no CofC or finaled permit, no signed-off permit", source: { name: "LA Open Data", url: "https://data.lacity.org/d/dqq4-799r" }, pulled: "Nov 19, 2026" },
  cmsGenerators: { id: "cmsGenerators", value: "11,246", label: "federal citations for emergency generators not capable or not tested (tag K918, NFPA 110)", where: "US nursing homes", definition: "National count of tag K918, survey dates 2016-07-28 to 2026-08-20, queried 2026-10-14", source: CMS_SOURCE, pulled: "Oct 14, 2026" },
  cmsGenerators7: { id: "cmsGenerators7", value: "518", label: "facilities cited for emergency power since Oct 16, 2024 in MD, VA, DC, PA, DE, WV and NC", where: "Seven states", definition: "Facilities with a generator / emergency power citation, citations since 2024-10-16 (616 citations)", source: CMS_SOURCE, pulled: "Oct 16, 2026" },
  cmsSprinkler: { id: "cmsSprinkler", value: "16,433", label: "federal citations for sprinkler systems not inspected, tested or maintained (tag K353)", where: "US nursing homes", definition: "National count of tag K353, survey dates 2016-07-28 to 2026-08-20, queried 2026-10-14", source: CMS_SOURCE, pulled: "Oct 14, 2026" },
  cmsAlarm: { id: "cmsAlarm", value: "9,069", label: "federal citations on fire alarm testing and maintenance (tag K345)", where: "US nursing homes", definition: "National count of tag K345, survey dates 2016-07-28 to 2026-08-20, queried 2026-10-14", source: CMS_SOURCE, pulled: "Oct 14, 2026" },
};

/** Hero ledger: the newest named records, newest first. */
export const LEDGER = ["sanfrancisco", "denver", "losangeles", "cincinnati", "nyc", "dallas"].map((k) => RECORDS[k]);
