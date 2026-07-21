/**
 * Structured product and marketing content for the Frontier Metals template.
 *
 * Everything here is fictional mock data sized to look believable while staying
 * obviously replaceable. Pages read from these arrays instead of hardcoding
 * layouts, so a SaaS customer swaps catalog content without touching JSX.
 *
 * Company identity (name, contact, hours, stats) lives in `src/config.ts`.
 *
 * PLACEHOLDER NOTE: any warranty, testing, or certification field is a
 * configurable placeholder. Do not present these as real claims.
 */

import type { PanelProfileId } from '@/components/panel-viewer/profiles'

// ============================================================================
// Shared types
// ============================================================================

export interface Spec {
  label: string
  value: string
}

export interface CatalogImage {
  /** Descriptive placeholder path. Replace with real photography. */
  src: string
  alt: string
}

// ============================================================================
// Panel profiles
// ============================================================================

export interface PanelProfile {
  slug: string
  name: string
  category: 'Roofing' | 'Wall' | 'Roofing & Wall' | 'Interior'
  shortDescription: string
  description: string
  bestFor: string
  applications: string[]
  substrates: string[]
  gauges: string[]
  finishes: string[]
  specs: Spec[]
  image: CatalogImage
  featured: boolean
  /** Present only for profiles with an interactive 3D model. */
  viewerProfile?: PanelProfileId
  relatedProducts: string[]
  /** Configurable placeholder, not a real certification claim. */
  fastenerNote: string
}

export const PANEL_PROFILES: PanelProfile[] = [
  {
    slug: 'pro-rib',
    name: 'Pro-Rib Panel',
    category: 'Roofing & Wall',
    shortDescription:
      'Exposed-fastener structural rib panel for commercial, agricultural, and pre-engineered buildings.',
    description:
      'A durable exposed-fastener panel designed for commercial, agricultural, and pre-engineered metal building applications.',
    bestFor:
      'Best for roof, wall, and liner applications where an exposed-fastener structural rib is the durable, economical choice. It installs quickly over open framing or solid decking and suits agricultural, commercial, and utility builds alike.',
    applications: ['Roof', 'Wall', 'Liner'],
    substrates: ['Open framing', 'Solid decking'],
    gauges: ['24 ga.', '26 ga.', '29 ga.'],
    finishes: ['Factory-applied color', 'Galvalume'],
    specs: [
      { label: 'Coverage', value: '36"' },
      { label: 'Rib Height', value: '1-1/4"' },
      { label: 'Rib Spacing', value: '12" centers' },
      { label: 'Available Gauges', value: '24, 26 & 29 ga.' },
    ],
    image: {
      src: '/image-7.jpg',
      alt: 'Pro-Rib structural rib metal roofing panel with 1-1/4 inch ribs on 12 inch centers',
    },
    featured: true,
    viewerProfile: 'fm-r36',
    relatedProducts: [
      'long-life-panel-screws',
      'stitch-screws',
      'foam-closure-strips',
    ],
    fastenerNote:
      'Exposed fastener system. Fastener pattern varies by substrate and span.',
  },
  {
    slug: 'standing-seam',
    name: 'Standing Seam Panel',
    category: 'Roofing',
    shortDescription:
      'Concealed-fastener standing seam roofing for commercial and architectural projects.',
    description:
      'A concealed-fastener standing seam roof panel for commercial, architectural, and residential projects where a clean roof plane and hidden fasteners are preferred.',
    bestFor:
      'Best for concealed-fastener roofing on commercial and architectural projects that call for a clean, uninterrupted roof plane with the fasteners hidden from view and weather.',
    applications: ['Roof'],
    substrates: ['Solid decking', 'Open framing with clips'],
    gauges: ['24 ga.', '26 ga.'],
    finishes: ['Factory-applied color', 'Galvalume'],
    specs: [
      { label: 'Coverage', value: '16"' },
      { label: 'Seam Height', value: '1-3/4"' },
      { label: 'Attachment', value: 'Concealed clip' },
      { label: 'Available Gauges', value: '24 & 26 ga.' },
    ],
    image: {
      src: '/image-10.jpg',
      alt: 'Standing seam metal roof panel with concealed fasteners and raised seams',
    },
    featured: true,
    viewerProfile: 'fm-a36',
    relatedProducts: [
      'long-life-panel-screws',
      'butyl-sealant-tape',
      'foam-closure-strips',
    ],
    fastenerNote:
      'Concealed clip attachment. No exposed fasteners in the roof plane.',
  },
  {
    slug: 'insulated-wall',
    name: 'Insulated Wall Panel',
    category: 'Wall',
    shortDescription:
      'Insulated sandwich wall panel combining structure, insulation, and finish in one component.',
    description:
      'An insulated wall panel that combines an exterior face, insulating core, and interior face in a single component for temperature-sensitive and conditioned buildings.',
    bestFor:
      'Best for conditioned and temperature-sensitive buildings, where an insulated panel helps manage energy use and condensation while closing in the structure in a single pass.',
    applications: ['Wall'],
    substrates: ['Structural framing'],
    gauges: ['26 ga. faces'],
    finishes: ['Factory-applied color'],
    specs: [
      { label: 'Coverage', value: '40"' },
      { label: 'Panel Thickness', value: '2" – 4"' },
      { label: 'Attachment', value: 'Concealed' },
      { label: 'Core', value: 'Insulating foam' },
    ],
    image: {
      src: '/image-9.jpg',
      alt: 'Insulated metal wall panel showing the insulating core between steel faces',
    },
    featured: true,
    viewerProfile: 'fm-u36',
    relatedProducts: [
      'silicone-sealant',
      'butyl-sealant-tape',
      'stitch-screws',
    ],
    fastenerNote:
      'Concealed fastener system. Panel thickness selected per project.',
  },
]

export const FEATURED_PANELS = PANEL_PROFILES.filter((p) => p.featured)

// ============================================================================
// Product categories (homepage "What We Manufacture")
// ============================================================================

export interface ProductCategory {
  slug: string
  title: string
  description: string
  href: string
  image: CatalogImage
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: 'roofing-panels',
    title: 'Metal Roofing Panels',
    description:
      'Cut-to-length roofing panels available in multiple profiles, gauges, finishes, and colors.',
    href: '/panels',
    image: {
      src: '/image-6.jpg',
      alt: 'Stacked metal roofing panels in multiple colors on a manufacturing floor',
    },
  },
  {
    slug: 'wall-panels',
    title: 'Wall and Liner Panels',
    description:
      'Strong exterior and interior panel systems for commercial, agricultural, and industrial buildings.',
    href: '/panels',
    image: {
      src: '/image-10.jpg',
      alt: 'Metal wall panels being installed on a commercial steel building',
    },
  },
  {
    slug: 'structural-components',
    title: 'Structural Components',
    description:
      'Frames, purlins, girts, base angles, eave struts, and other building-system components.',
    href: '/products',
    image: {
      src: '/image-12.jpg',
      alt: 'Structural steel frame of a metal building against an open sky',
    },
  },
  {
    slug: 'trim-and-flashing',
    title: 'Trims',
    description:
      'Standard and custom-formed trim manufactured for accurate fit and dependable weather protection.',
    href: '/trims',
    image: {
      src: '/image-16.jpg',
      alt: 'Formed metal trim pieces bundled for delivery',
    },
  },
  {
    slug: 'fasteners-and-accessories',
    title: 'Fasteners and Accessories',
    description:
      'Screws, closures, sealants, ventilation products, pipe flashings, and installation tools.',
    href: '/products',
    image: {
      src: '/image-17.jpg',
      alt: 'Metal roofing screws, closures, and sealant products arranged on a bench',
    },
  },
  {
    slug: 'building-packages',
    title: 'Complete Building Packages',
    description:
      'Coordinated steel packages for shops, barns, warehouses, garages, and commercial facilities.',
    href: '/buildings',
    image: {
      src: '/building-1.jpg',
      alt: 'Completed commercial metal building with matching roof and wall panels',
    },
  },
]

// ============================================================================
// Product catalog
// ============================================================================

export type ProductCategorySlug =
  | 'roofing-panels'
  | 'wall-panels'
  | 'structural-components'
  | 'trim-and-flashing'
  | 'fasteners-and-accessories'

export interface Product {
  slug: string
  name: string
  category: ProductCategorySlug
  shortDescription: string
  applications: string[]
  specs: Spec[]
  /** Omitted for trims, which render as 3D cross-sections instead of photos. */
  image?: CatalogImage
  featured: boolean
  relatedProducts: string[]
}

export const STRUCTURAL_COMPONENTS: Product[] = [
  {
    slug: 'primary-rigid-frames',
    name: 'Primary Rigid Frames',
    category: 'structural-components',
    shortDescription:
      'Main structural frames that carry roof and wall loads across clear-span building widths.',
    applications: ['Pre-engineered buildings', 'Commercial', 'Industrial'],
    specs: [
      { label: 'Type', value: 'Clear span or modular' },
      { label: 'Finish', value: 'Shop-primed' },
    ],
    image: {
      src: '/image-18.jpg',
      alt: 'Primary rigid steel frames erected on a building site',
    },
    featured: true,
    relatedProducts: ['endwall-frames', 'roof-purlins', 'eave-struts'],
  },
  {
    slug: 'endwall-frames',
    name: 'Endwall Frames',
    category: 'structural-components',
    shortDescription:
      'Framing assemblies that close and support the end elevations of a metal building.',
    applications: ['Pre-engineered buildings', 'Expansion-ready endwalls'],
    specs: [
      { label: 'Type', value: 'Bearing or expandable' },
      { label: 'Finish', value: 'Shop-primed' },
    ],
    image: {
      src: '/image-19.jpg',
      alt: 'Steel endwall framing on a metal building under construction',
    },
    featured: false,
    relatedProducts: ['primary-rigid-frames', 'wall-girts', 'base-angles'],
  },
  {
    slug: 'roof-purlins',
    name: 'Roof Purlins',
    category: 'structural-components',
    shortDescription:
      'Secondary roof members that span between frames and support roof panels.',
    applications: ['Roof framing'],
    specs: [
      { label: 'Profile', value: 'Z and C sections' },
      { label: 'Finish', value: 'Galvanized' },
    ],
    image: {
      src: '/image-20.jpg',
      alt: 'Z-section steel roof purlins spanning between building frames',
    },
    featured: true,
    relatedProducts: ['wall-girts', 'eave-struts', 'primary-rigid-frames'],
  },
  {
    slug: 'wall-girts',
    name: 'Wall Girts',
    category: 'structural-components',
    shortDescription:
      'Horizontal wall members that support wall panels and transfer wind loads to the frame.',
    applications: ['Wall framing'],
    specs: [
      { label: 'Profile', value: 'Z and C sections' },
      { label: 'Finish', value: 'Galvanized' },
    ],
    image: {
      src: '/image-21.jpg',
      alt: 'Steel wall girts installed horizontally across a building frame',
    },
    featured: false,
    relatedProducts: ['roof-purlins', 'base-angles', 'endwall-frames'],
  },
  {
    slug: 'eave-struts',
    name: 'Eave Struts',
    category: 'structural-components',
    shortDescription:
      'Members at the roof-to-wall transition that support panels at the eave line.',
    applications: ['Eave framing'],
    specs: [
      { label: 'Profile', value: 'C section' },
      { label: 'Finish', value: 'Galvanized' },
    ],
    image: {
      src: '/image-22.jpg',
      alt: 'Steel eave strut at the roof and wall transition of a metal building',
    },
    featured: false,
    relatedProducts: ['roof-purlins', 'eave-trim', 'wall-girts'],
  },
  {
    slug: 'base-angles',
    name: 'Base Angles',
    category: 'structural-components',
    shortDescription:
      'Anchoring angle at the wall base that receives and secures the bottom of wall panels.',
    applications: ['Wall base'],
    specs: [
      { label: 'Profile', value: 'Angle' },
      { label: 'Finish', value: 'Galvanized' },
    ],
    image: {
      src: '/image-23.jpg',
      alt: 'Galvanized base angle fastened along a concrete slab edge',
    },
    featured: false,
    relatedProducts: ['base-trim', 'wall-girts', 'foam-closure-strips'],
  },
]

export const TRIM_PRODUCTS: Product[] = [
  {
    slug: 'ridge-cap',
    name: 'Ridge Cap',
    category: 'trim-and-flashing',
    shortDescription:
      'Closes and weatherproofs the ridge where two roof planes meet.',
    applications: ['Roof ridge'],
    specs: [{ label: 'Form', value: 'Formed to panel profile' }],
    featured: true,
    relatedProducts: [
      'foam-closure-strips',
      'ridge-ventilation',
      'butyl-sealant-tape',
    ],
  },
  {
    slug: 'rake-trim',
    name: 'Rake Trim',
    category: 'trim-and-flashing',
    shortDescription:
      'Finishes and weatherproofs the sloped gable edge of a roof.',
    applications: ['Gable edge'],
    specs: [{ label: 'Form', value: 'Standard and custom' }],
    featured: false,
    relatedProducts: ['ridge-cap', 'corner-trim', 'long-life-panel-screws'],
  },
  {
    slug: 'eave-trim',
    name: 'Eave Trim',
    category: 'trim-and-flashing',
    shortDescription:
      'Directs water off the roof edge at the eave and finishes the panel run.',
    applications: ['Roof eave'],
    specs: [{ label: 'Form', value: 'Standard and custom' }],
    featured: false,
    relatedProducts: ['eave-trim', 'eave-struts', 'foam-closure-strips'],
  },
  {
    slug: 'valley-trim',
    name: 'Valley Trim',
    category: 'trim-and-flashing',
    shortDescription:
      'Channels water where two roof planes intersect at an inside angle.',
    applications: ['Roof valley'],
    specs: [{ label: 'Form', value: 'Formed valley pan' }],
    featured: false,
    relatedProducts: [
      'butyl-sealant-tape',
      'ridge-cap',
      'long-life-panel-screws',
    ],
  },
  {
    slug: 'corner-trim',
    name: 'Corner Trim',
    category: 'trim-and-flashing',
    shortDescription:
      'Finishes outside and inside wall corners with a clean, weather-tight edge.',
    applications: ['Wall corners'],
    specs: [{ label: 'Form', value: 'Outside and inside' }],
    featured: false,
    relatedProducts: ['base-trim', 'corner-trim', 'stitch-screws'],
  },
  {
    slug: 'base-trim',
    name: 'Base Trim',
    category: 'trim-and-flashing',
    shortDescription:
      'Finishes the bottom of wall panels and closes the wall-to-slab joint.',
    applications: ['Wall base'],
    specs: [{ label: 'Form', value: 'Formed base' }],
    featured: false,
    relatedProducts: ['base-angles', 'foam-closure-strips', 'corner-trim'],
  },
]

export const ACCESSORY_PRODUCTS: Product[] = [
  {
    slug: 'long-life-panel-screws',
    name: 'Long-Life Panel Screws',
    category: 'fasteners-and-accessories',
    shortDescription:
      'Coated exposed fasteners with sealing washers for panel-to-structure attachment.',
    applications: ['Panel attachment'],
    specs: [{ label: 'Washer', value: 'Bonded sealing washer' }],
    image: {
      src: '/image-24.jpg',
      alt: 'Coated metal roofing screws with bonded sealing washers',
    },
    featured: true,
    relatedProducts: [
      'stitch-screws',
      'foam-closure-strips',
      'butyl-sealant-tape',
    ],
  },
  {
    slug: 'stitch-screws',
    name: 'Stitch Screws',
    category: 'fasteners-and-accessories',
    shortDescription:
      'Short fasteners that join adjacent panel sidelaps and trim overlaps.',
    applications: ['Panel sidelaps', 'Trim laps'],
    specs: [{ label: 'Use', value: 'Panel-to-panel' }],
    image: {
      src: '/image-25.jpg',
      alt: 'Stitch screws used to fasten metal panel sidelaps together',
    },
    featured: false,
    relatedProducts: ['long-life-panel-screws', 'stitch-screws', 'corner-trim'],
  },
  {
    slug: 'butyl-sealant-tape',
    name: 'Butyl Sealant Tape',
    category: 'fasteners-and-accessories',
    shortDescription:
      'Non-hardening tape sealant for panel laps, ridges, and trim joints.',
    applications: ['Panel laps', 'Trim joints'],
    specs: [{ label: 'Type', value: 'Non-hardening butyl' }],
    image: {
      src: '/image-26.jpg',
      alt: 'Roll of butyl sealant tape used at metal panel laps',
    },
    featured: true,
    relatedProducts: ['silicone-sealant', 'foam-closure-strips', 'ridge-cap'],
  },
  {
    slug: 'silicone-sealant',
    name: 'Silicone Sealant',
    category: 'fasteners-and-accessories',
    shortDescription:
      'Gun-grade sealant for penetrations, terminations, and trim details.',
    applications: ['Penetrations', 'Trim details'],
    specs: [{ label: 'Type', value: 'Gun-grade silicone' }],
    image: {
      src: '/image-27.jpg',
      alt: 'Tubes of silicone sealant for metal building trim details',
    },
    featured: false,
    relatedProducts: [
      'butyl-sealant-tape',
      'ridge-ventilation',
      'foam-closure-strips',
    ],
  },
  {
    slug: 'foam-closure-strips',
    name: 'Foam Closure Strips',
    category: 'fasteners-and-accessories',
    shortDescription:
      'Profile-matched closures that seal panel ribs at eaves, ridges, and bases.',
    applications: ['Eave', 'Ridge', 'Base'],
    specs: [{ label: 'Fit', value: 'Matched to panel profile' }],
    image: {
      src: '/image-28.jpg',
      alt: 'Foam closure strips shaped to match metal panel ribs',
    },
    featured: true,
    relatedProducts: ['ridge-cap', 'base-trim', 'butyl-sealant-tape'],
  },
  {
    slug: 'ridge-ventilation',
    name: 'Ridge Ventilation',
    category: 'fasteners-and-accessories',
    shortDescription:
      'Ridge vent products that exhaust warm, moist air from the roof cavity.',
    applications: ['Roof ventilation'],
    specs: [{ label: 'Location', value: 'Roof ridge' }],
    image: {
      src: '/image-29.jpg',
      alt: 'Ridge ventilation product installed along a metal roof ridge',
    },
    featured: false,
    relatedProducts: ['ridge-cap', 'foam-closure-strips', 'butyl-sealant-tape'],
  },
]

export const ALL_PRODUCTS: Product[] = [
  ...STRUCTURAL_COMPONENTS,
  ...TRIM_PRODUCTS,
  ...ACCESSORY_PRODUCTS,
]

export function getProduct(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug)
}

// ============================================================================
// Panel colors
// ============================================================================

export interface PanelColor {
  name: string
  hex: string
}

/**
 * The 16 shown here are a preview of the 30-color standard line.
 * Screen rendering is approximate. See the disclaimer on the color chart.
 */
export const PANEL_COLORS: PanelColor[] = [
  { name: 'Polar White', hex: '#EDEDE8' },
  { name: 'Bright White', hex: '#F7F7F5' },
  { name: 'Sandstone', hex: '#C8B99B' },
  { name: 'Desert Tan', hex: '#A99172' },
  { name: 'Burnished Slate', hex: '#4A4641' },
  { name: 'Ash Gray', hex: '#9A9C98' },
  { name: 'Pewter Gray', hex: '#6F7476' },
  { name: 'Charcoal', hex: '#414447' },
  { name: 'Matte Black', hex: '#222222' },
  { name: 'Barn Red', hex: '#883B32' },
  { name: 'Rustic Red', hex: '#6F332D' },
  { name: 'Copper Brown', hex: '#755243' },
  { name: 'Forest Green', hex: '#304A3B' },
  { name: 'Evergreen', hex: '#263F34' },
  { name: 'Patina Green', hex: '#5F7A63' },
  { name: 'Colonial Blue', hex: '#3E5765' },
  { name: 'Slate Blue', hex: '#45586A' },
  { name: 'Hawaiian Blue', hex: '#4E7A8C' },
  { name: 'Ivory', hex: '#EDE6D5' },
  { name: 'Almond', hex: '#DCC9A6' },
  { name: 'Clay', hex: '#B4A184' },
  { name: 'Buckskin', hex: '#9C8560' },
  { name: 'Mocha Tan', hex: '#7B6A54' },
  { name: 'Cocoa Brown', hex: '#4D3F37' },
  { name: 'Brite Red', hex: '#9E2B25' },
  { name: 'Silver Metallic', hex: '#A7ACAF' },
  { name: 'Galvalume', hex: '#B9BEC0' },
]

export const COLOR_DISCLAIMER =
  'Colors shown are representations only and may vary by screen, finish, and lighting. Review physical samples before ordering.'

// ============================================================================
// Building systems
// ============================================================================

export interface BuildingSystem {
  slug: string
  name: string
  shortDescription: string
  heroHeadline: string
  heroBody: string
  applications: string[]
  structuralSystems: string[]
  components: string[]
  designOptions: string[]
  faqs: { question: string; answer: string }[]
  image: CatalogImage
}

export const BUILDING_SYSTEMS: BuildingSystem[] = [
  {
    slug: 'agricultural-buildings',
    name: 'Agricultural Buildings',
    shortDescription:
      'Equipment storage, hay barns, livestock shelters, and working farm structures.',
    heroHeadline: 'Steel Packages for Working Agricultural Operations',
    heroBody:
      'Equipment barns, hay storage, livestock shelters, and shop space built from panels, trim, and structural components matched to how the operation actually runs.',
    applications: [
      'Equipment and implement storage',
      'Hay and commodity storage',
      'Livestock shelters',
      'Working shops',
    ],
    structuralSystems: [
      'Rigid frame',
      'Post frame compatible',
      'Light-gauge framing',
    ],
    components: [
      'FS-A36 roof and wall panels',
      'Roof purlins and wall girts',
      'Framed openings for equipment doors',
      'Ridge ventilation',
      'Trim and closure package',
    ],
    designOptions: [
      'Open-sided or fully enclosed',
      'Sliding or overhead door openings',
      'Lean-to additions',
      'Interior liner panels',
    ],
    faqs: [
      {
        question: 'Can you supply materials for an open-sided equipment shed?',
        answer:
          'Yes. Open-sided structures are common in agricultural work. We coordinate the framing, panels, and trim for the enclosed elevations and leave the open sides detailed appropriately.',
      },
      {
        question: 'Do you supply panels cut to a specific length?',
        answer:
          'Panels are cut to the lengths on your approved order, which reduces field cutting and lap conditions.',
      },
      {
        question: 'Can panel and trim colors match existing buildings?',
        answer:
          'We can match to our standard color line. Because finishes weather over time, we recommend reviewing a physical sample against the existing building before ordering.',
      },
    ],
    image: {
      src: '/image-4.jpg',
      alt: 'Metal agricultural barn with equipment doors on a working farm',
    },
  },
  {
    slug: 'commercial-buildings',
    name: 'Commercial Buildings',
    shortDescription:
      'Retail, office, service, and mixed-use facilities with a finished exterior.',
    heroHeadline: 'Commercial Steel Buildings With a Finished Exterior',
    heroBody:
      'Retail, office, and service facilities that need clear span, a clean building envelope, and a coordinated material package delivered on schedule.',
    applications: [
      'Retail and showroom space',
      'Office and administrative buildings',
      'Service and repair facilities',
      'Mixed-use commercial',
    ],
    structuralSystems: [
      'Clear-span rigid frame',
      'Modular frame',
      'Canopy framing',
    ],
    components: [
      'Standing seam or exposed-fastener roofing',
      'Insulated or single-skin wall panels',
      'Framed openings for storefront and doors',
      'Canopy and entry framing',
      'Custom-formed trim',
    ],
    designOptions: [
      'Insulated wall panel systems',
      'Entry and loading canopies',
      'Parapet and facade conditions',
      'Interior liner panels',
    ],
    faqs: [
      {
        question: 'Can a metal building have a finished storefront appearance?',
        answer:
          'Yes. Standing seam roofing, insulated wall panels, canopies, and custom trim let a steel building carry a finished commercial exterior.',
      },
      {
        question: 'Do you coordinate framed openings for storefront systems?',
        answer:
          'We detail framed openings to the dimensions on your drawings so door and window systems fit as intended.',
      },
      {
        question: 'What lead time should we plan for?',
        answer:
          'Typical production turnaround is 48 hours for standard panel and trim items. Complete building packages depend on scope, so we confirm dates on your order rather than promising a fixed schedule up front.',
      },
    ],
    image: {
      src: '/image-5.jpg',
      alt: 'Commercial metal building with a finished exterior and entry canopy',
    },
  },
  {
    slug: 'industrial-buildings',
    name: 'Industrial Buildings',
    shortDescription:
      'Manufacturing, processing, and service facilities built for heavy daily use.',
    heroHeadline: 'Industrial Facilities Built for Heavy Daily Use',
    heroBody:
      'Manufacturing and service facilities that need durable envelopes, wide clear spans, and components that hold up to constant traffic and equipment.',
    applications: [
      'Manufacturing space',
      'Processing facilities',
      'Equipment and fleet service',
      'Utility and maintenance buildings',
    ],
    structuralSystems: [
      'Clear-span rigid frame',
      'Modular frame',
      'Crane-ready framing',
    ],
    components: [
      'FM-R36 roof and wall panels',
      'Interior liner panels',
      'Heavy framed openings',
      'Structural framing and bracing',
      'Custom-formed trim',
    ],
    designOptions: [
      'Wide clear spans',
      'Interior liner and wainscot',
      'Large equipment openings',
      'Ventilation packages',
    ],
    faqs: [
      {
        question: 'Can you supply materials for a crane-served building?',
        answer:
          'Crane-served buildings require project-specific engineering. We coordinate the panel, trim, and component package around the approved structural design for your project.',
      },
      {
        question: 'Do you offer interior liner panels?',
        answer:
          'Yes. FS-L29 interior liner panels give a clean, washable interior surface that holds up in working facilities.',
      },
      {
        question: 'Are heavier gauges available?',
        answer:
          'FM-R36 is available in 24 gauge in addition to 26 and 29, which is common where added durability is wanted.',
      },
    ],
    image: {
      src: '/building-2.jpg',
      alt: 'Industrial steel facility with wide clear span and large equipment doors',
    },
  },
  {
    slug: 'shops-and-garages',
    name: 'Shops and Garages',
    shortDescription:
      'Personal and working shops, vehicle storage, and hobby buildings.',
    heroHeadline: 'Shops and Garages That Match How You Work',
    heroBody:
      'Vehicle storage, working shops, and hobby buildings assembled from a coordinated package of panels, trim, framing, and accessories.',
    applications: [
      'Vehicle and equipment storage',
      'Working shops',
      'Hobby and project space',
      'Detached garages',
    ],
    structuralSystems: [
      'Rigid frame',
      'Post frame compatible',
      'Light-gauge framing',
    ],
    components: [
      'FM-R36 or FS-A36 panels',
      'Overhead and walk-door framed openings',
      'Interior liner panels',
      'Trim and closure package',
      'Fasteners and sealants',
    ],
    designOptions: [
      'Lean-to and porch additions',
      'Wainscot color banding',
      'Insulated wall systems',
      'Overhead door sizing',
    ],
    faqs: [
      {
        question: 'Can I add a lean-to later?',
        answer:
          'Lean-to additions are common. Tell us during planning and we can detail the structure so a future addition is straightforward.',
      },
      {
        question: 'Can I use two colors on the walls?',
        answer:
          'Yes. Wainscot banding using a second color is a common way to finish a shop exterior, and we coordinate the trim to match.',
      },
      {
        question: 'Do you supply materials for a slab I already have?',
        answer:
          'Yes. Send the slab dimensions and we will work the package around the existing footprint.',
      },
    ],
    image: {
      src: '/image-8.jpg',
      alt: 'Metal shop building with overhead doors and a wainscot color band',
    },
  },
  {
    slug: 'warehouses',
    name: 'Warehouses',
    shortDescription:
      'Distribution, storage, and logistics facilities with wide clear spans.',
    heroHeadline: 'Warehouse Packages Built Around Throughput',
    heroBody:
      'Distribution and storage facilities that need wide clear spans, dock access, and a durable envelope that keeps product protected.',
    applications: [
      'Distribution centers',
      'Storage and staging',
      'Logistics facilities',
      'Cold-line adjacent storage',
    ],
    structuralSystems: [
      'Clear-span rigid frame',
      'Modular frame',
      'Canopy framing',
    ],
    components: [
      'Standing seam or FM-R36 roofing',
      'Insulated wall panels',
      'Loading canopy framing',
      'Dock and overhead door openings',
      'Structural framing package',
    ],
    designOptions: [
      'Loading canopies',
      'Dock-height openings',
      'Insulated envelopes',
      'Skylight and ventilation packages',
    ],
    faqs: [
      {
        question: 'Do you supply loading canopy components?',
        answer:
          'Yes. Canopy framing and the associated trim and panels are coordinated with the rest of the package.',
      },
      {
        question: 'Can the envelope be insulated?',
        answer:
          'FM-I40 insulated wall panels combine structure, insulation, and finish in one component, which suits conditioned or temperature-sensitive storage.',
      },
      {
        question: 'How are large orders bundled?',
        answer:
          'Materials are bundled and labeled for efficient handling, which matters on larger footprints where crews stage by elevation.',
      },
    ],
    image: {
      src: '/image-11.jpg',
      alt: 'Steel warehouse building with loading dock canopy and overhead doors',
    },
  },
  {
    slug: 'storage-buildings',
    name: 'Storage Buildings',
    shortDescription:
      'Straightforward, economical enclosures for equipment and material storage.',
    heroHeadline: 'Straightforward Storage That Holds Up',
    heroBody:
      'Economical enclosures for equipment, inventory, and material storage, simple structures built from the same components as our larger packages.',
    applications: [
      'Equipment storage',
      'Material and inventory storage',
      'Utility enclosures',
      'Mini-storage',
    ],
    structuralSystems: [
      'Rigid frame',
      'Light-gauge framing',
      'Post frame compatible',
    ],
    components: [
      'FS-U36 or FS-A36 panels',
      'Roof purlins and wall girts',
      'Framed openings',
      'Trim and closure package',
      'Fasteners',
    ],
    designOptions: [
      'Open-sided or enclosed',
      'Partitioned bays',
      'Roll-up door openings',
      'Ventilation',
    ],
    faqs: [
      {
        question: 'What is the most economical panel for storage?',
        answer:
          'FS-U36 and FS-A36 in 29 gauge are common choices where the structure is straightforward and the priority is a dependable enclosure.',
      },
      {
        question: 'Can a storage building be partitioned into bays?',
        answer:
          'Yes. Interior partitions and separate openings are straightforward to detail during planning.',
      },
      {
        question: 'Is delivery available?',
        answer:
          'Regional delivery is available within roughly 150 miles. We confirm scheduling when the order is placed.',
      },
    ],
    image: {
      src: '/image-3.jpg',
      alt: 'Simple metal storage building with roll-up doors',
    },
  },
]

export function getBuildingSystem(slug: string): BuildingSystem | undefined {
  return BUILDING_SYSTEMS.find((b) => b.slug === slug)
}

/** Building types listed on the homepage buildings section. */
export const BUILDING_TYPES = [
  'Agricultural Buildings',
  'Equipment Shops',
  'Commercial Facilities',
  'Warehouses',
  'Garages',
  'Storage Buildings',
]
// ============================================================================
// Homepage supporting content
// ============================================================================

/** Hero trust points. */
export const TRUST_POINTS = [
  'Panels cut to exact length',
  'Regional delivery available',
  'Contractor and wholesale pricing',
  'Technical project support',
]

export interface ProcessStep {
  step: number
  title: string
  body: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Plan the Project',
    body: 'Tell us what you are building, provide measurements, or submit construction drawings.',
  },
  {
    step: 2,
    title: 'Select the System',
    body: 'Choose panel profiles, gauges, colors, trim, structural components, and accessories.',
  },
  {
    step: 3,
    title: 'Manufacture the Order',
    body: 'Components are formed, cut, checked, labeled, and prepared according to the approved order.',
  },
  {
    step: 4,
    title: 'Pickup or Delivery',
    body: 'Materials are bundled for efficient handling and prepared for pickup or regional jobsite delivery.',
  },
]

// ============================================================================
// Testimonials
// ============================================================================

export interface Testimonial {
  quote: string
  name: string
  company: string
  /**
   * Star rating out of 5, shown on the card. Fictional demo data like the rest
   * of this file. Never emit these as schema.org review markup unless they come
   * from verified, on-site reviews.
   */
  rating?: number
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Frontier had every panel, trim piece, and fastener organized by building elevation. That saved our crew hours during installation.',
    name: 'Daniel Mercer',
    company: 'Mercer Building Systems',
    rating: 5,
  },
  {
    quote:
      'Their team reviewed our measurements, identified two missing trim conditions, and helped us correct the order before production.',
    name: 'Alicia Ramirez',
    company: 'Ramirez Commercial Roofing',
    rating: 5,
  },
  {
    quote:
      'We use Frontier because we can call someone who understands the project instead of simply taking an order.',
    name: 'Wade Bennett',
    company: 'Bennett Ag Construction',
    rating: 5,
  },
  {
    quote:
      'We ordered a full package for a 60x120 shop and everything showed up labeled by elevation. The crew was closing in walls the same afternoon it landed.',
    name: 'Curtis Vance',
    company: 'Vance Contracting',
    rating: 5,
  },
  {
    quote:
      'Their trim shop matched a profile off a twenty-year-old building from a photo and a few measurements. Nobody else we called would even quote it.',
    name: 'Renee Alvarado',
    company: 'Alvarado Roofing and Sheet Metal',
    rating: 5,
  },
  {
    quote:
      'Straight answers on lead times, and when a delivery date moved they called us before we had to ask. That is most of what we need from a supplier.',
    name: 'Terry Boone',
    company: 'Boone Farm and Ranch Supply',
    rating: 5,
  },
]
