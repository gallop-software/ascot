/**
 * Central company configuration — the single source of truth for company
 * identity across the template.
 *
 * SaaS customers replace a site's identity by editing THIS file plus the color
 * tokens in `src/styles/tailwind.css`. Navigation, footer, SEO metadata, and
 * page blocks all read from here rather than hardcoding business details.
 *
 * Structured content (panel catalog, projects, testimonials, resources) lives
 * in `src/catalog.ts`.
 */

export interface CompanyAddress {
  street: string
  city: string
  region: string
  postalCode: string
  country: string
}

export interface BusinessHours {
  days: string
  time: string
  /** 24h times for schema.org OpeningHoursSpecification. Omit when closed. */
  schema?: { dayOfWeek: string[]; opens: string; closes: string }
}

export interface CompanyStat {
  value: string
  label: string
}

export const company = {
  name: 'ForgeSpan Metals',
  shortName: 'ForgeSpan',
  tagline: 'Built for the Work Ahead.',
  founded: 1998,
  description:
    'ForgeSpan Metals manufactures dependable metal roofing, wall panels, trim, structural building components, and custom steel packages for agricultural, commercial, industrial, and residential projects.',
  /** Shorter variant used in the footer and compact surfaces. */
  footerDescription:
    'ForgeSpan Metals manufactures metal roofing, wall panels, structural components, trim, accessories, and steel building packages for contractors and property owners across the region.',
} as const

export const address: CompanyAddress = {
  street: '4820 Industrial Parkway',
  city: 'Redstone',
  region: 'TX',
  postalCode: '79541',
  country: 'US',
}

/** Single-line address, e.g. for the utility bar. */
export const addressLine = `${address.street}, ${address.city}, ${address.region} ${address.postalCode}`

/** Two-line address, e.g. for the footer. */
export const addressMultiline = `${address.street},\n${address.city}, ${address.region} ${address.postalCode}`

export const mapHref = `https://maps.google.com/?q=${encodeURIComponent(
  `${address.street}, ${address.city}, ${address.region} ${address.postalCode}`
)}`

export const contact = {
  phone: '(123) 456-7890',
  /** E.164 for tel: links and schema.org. */
  phoneHref: 'tel:+11234567890',
  phoneSchema: '+1-123-456-7890',
  email: 'sales@forgespan.com',
  emailHref: 'mailto:sales@forgespan.com',
  addressLine,
  addressMultiline,
  mapHref,
} as const

export const hours: BusinessHours[] = [
  {
    days: 'Monday – Saturday',
    time: '8:00 AM – 5:00 PM',
    schema: {
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '08:00',
      closes: '17:00',
    },
  },
  { days: 'Sunday', time: 'Closed' },
]

/** Compact hours string for the utility bar. */
export const hoursSummary = 'Mon–Sat 8–5'

export const serviceArea = {
  summary:
    'West Texas, the Texas Panhandle, eastern New Mexico, western Oklahoma, and surrounding regional markets.',
  /** Granular list for check-style display (see the About story block). */
  areas: [
    'West Texas',
    'Texas Panhandle',
    'Eastern New Mexico',
    'Western Oklahoma',
    'Surrounding regional markets',
  ],
  /** Drives schema.org areaServed. */
  regions: [
    { type: 'State' as const, name: 'Texas' },
    { type: 'State' as const, name: 'New Mexico' },
    { type: 'State' as const, name: 'Oklahoma' },
  ],
  cities: ['Redstone', 'San Angelo', 'Abilene', 'Levelland', 'Lubbock'],
  deliveryRadiusMiles: 150,
}

/**
 * Marketing statistics. Believable but fictional — replace per customer.
 */
export const stats: CompanyStat[] = [
  { value: '25+', label: 'Years Manufacturing Steel' },
  { value: '2,500+', label: 'Building Packages Supplied' },
  { value: '96%', label: 'On-Time Order Completion' },
]

/** Longer stat list used on the About page. */
export const extendedStats: CompanyStat[] = [
  ...stats,
  { value: '48-Hour', label: 'Typical Production Turnaround' },
  { value: '150-Mile', label: 'Regional Delivery Area' },
]

/**
 * Social profiles. Empty by default — a template should not imply
 * relationships that do not exist. Add real URLs per customer.
 */
export const socialLinks: { name: string; href: string }[] = []

/** Shared calls to action so labels stay consistent site-wide. */
export const cta = {
  quote: { label: 'Request a Quote', href: '/#quote' },
  products: { label: 'Explore Our Products', href: '/products' },
  buildings: { label: 'Explore Buildings', href: '/buildings' },
  contractor: { label: 'Open a Contractor Account', href: '/#quote' },
  sales: { label: 'Talk With Sales', href: contact.phoneHref },
  call: { label: `Call ${contact.phone}`, href: contact.phoneHref },
} as const

/** SEO defaults consumed by src/app/metadata.tsx. */
export const seo = {
  siteName: company.name,
  titleSuffix: company.name,
  defaultTitle: `Metal Roofing, Steel Panels & Buildings | ${company.name}`,
  defaultDescription:
    'ForgeSpan Metals manufactures metal roofing, wall panels, trim, structural components, and complete steel building packages for agricultural, commercial, industrial, and residential projects.',
  category: 'Building Materials',
} as const

/** Company values shown on the About page. */
export const values: { title: string; body: string }[] = [
  {
    title: 'Accuracy',
    body: 'Orders are reviewed carefully and manufactured according to approved dimensions and specifications.',
  },
  {
    title: 'Dependability',
    body: 'We communicate clearly, maintain realistic production schedules, and work to have materials ready when promised.',
  },
  {
    title: 'Practical Expertise',
    body: 'Our team understands how panels, trim, structural components, fasteners, and accessories work together in the field.',
  },
  {
    title: 'Long-Term Relationships',
    body: 'We aim to become a dependable supply partner rather than simply complete a single transaction.',
  },
]

/** Company milestones shown on the About page timeline. */
export const timeline: { year: string; body: string }[] = [
  { year: '1998', body: 'ForgeSpan begins manufacturing roofing panels and trim' },
  { year: '2005', body: 'Wall-panel and agricultural product lines added' },
  { year: '2012', body: 'Structural building-component division established' },
  { year: '2018', body: 'Regional delivery fleet expanded' },
  { year: '2022', body: 'New automated roll-forming and trim equipment installed' },
  { year: '2025', body: 'Building-package and contractor support programs expanded' },
]
