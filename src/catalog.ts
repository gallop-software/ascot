/**
 * Structured product and marketing content for the ForgeSpan Metals template.
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
  /** Descriptive placeholder path — replace with real photography. */
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
  /** Configurable placeholder — not a real certification claim. */
  fastenerNote: string
}

export const PANEL_PROFILES: PanelProfile[] = [
  {
    slug: 'fs-r36',
    name: 'FS-R36 Structural Rib Panel',
    category: 'Roofing & Wall',
    shortDescription:
      'Exposed-fastener structural rib panel for commercial, agricultural, and pre-engineered buildings.',
    description:
      'A durable exposed-fastener panel designed for commercial, agricultural, and pre-engineered metal building applications.',
    bestFor: 'Best for roof, wall, and liner applications',
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
      src: '/images/panels/structural-rib-panel.jpg',
      alt: 'FS-R36 structural rib metal roofing panel with 1-1/4 inch ribs on 12 inch centers',
    },
    featured: true,
    viewerProfile: 'fs-r36',
    relatedProducts: ['long-life-panel-screws', 'ridge-cap', 'foam-closure-strips'],
    fastenerNote: 'Exposed fastener system. Fastener pattern varies by substrate and span.',
  },
  {
    slug: 'fs-a36',
    name: 'FS-A36 Agricultural Panel',
    category: 'Roofing & Wall',
    shortDescription:
      'Versatile agricultural profile for barns, equipment sheds, workshops, and utility buildings.',
    description:
      'A versatile panel profile for barns, equipment sheds, residential roofing, workshops, and utility buildings.',
    bestFor: 'Best for roof, wall, barn, and utility structures',
    applications: ['Roof', 'Wall', 'Barn', 'Utility structures'],
    substrates: ['Wood framing', 'Light-gauge steel'],
    gauges: ['26 ga.', '29 ga.'],
    finishes: ['Factory-applied color', 'Galvalume'],
    specs: [
      { label: 'Coverage', value: '36"' },
      { label: 'Rib Height', value: '3/4"' },
      { label: 'Rib Spacing', value: '9" centers' },
      { label: 'Available Gauges', value: '26 & 29 ga.' },
    ],
    image: {
      src: '/images/panels/agricultural-panel.jpg',
      alt: 'FS-A36 agricultural metal panel with 3/4 inch ribs on 9 inch centers',
    },
    featured: true,
    viewerProfile: 'fs-a36',
    relatedProducts: ['long-life-panel-screws', 'ridge-ventilation', 'butyl-sealant-tape'],
    fastenerNote: 'Exposed fastener system suited to wood or light-gauge steel framing.',
  },
  {
    slug: 'fs-u36',
    name: 'FS-U36 Utility Panel',
    category: 'Roofing & Wall',
    shortDescription:
      'Closely spaced rib profile for utility buildings, walls, soffits, and fencing.',
    description:
      'A clean, closely spaced rib profile for utility buildings, walls, soffits, fencing, and light commercial projects.',
    bestFor: 'Best for wall, roof, liner, and fencing applications',
    applications: ['Wall', 'Roof', 'Liner', 'Fencing'],
    substrates: ['Wood framing', 'Steel framing'],
    gauges: ['26 ga.', '29 ga.'],
    finishes: ['Factory-applied color', 'Galvalume'],
    specs: [
      { label: 'Coverage', value: '36"' },
      { label: 'Rib Height', value: '3/4"' },
      { label: 'Rib Spacing', value: '6" centers' },
      { label: 'Available Gauges', value: '26 & 29 ga.' },
    ],
    image: {
      src: '/images/panels/utility-panel.jpg',
      alt: 'FS-U36 utility metal panel with closely spaced ribs on 6 inch centers',
    },
    featured: true,
    viewerProfile: 'fs-u36',
    relatedProducts: ['stitch-screws', 'base-trim', 'corner-trim'],
    fastenerNote: 'Exposed fastener system. Close rib spacing supports fencing and soffit use.',
  },
  {
    slug: 'fs-s16',
    name: 'FS-S16 Standing Seam Panel',
    category: 'Roofing',
    shortDescription:
      'Concealed-fastener standing seam roofing for commercial and architectural projects.',
    description:
      'A concealed-fastener standing seam roof panel for commercial, architectural, and residential projects where a clean roof plane and hidden fasteners are preferred.',
    bestFor: 'Best for concealed-fastener roofing',
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
      src: '/images/panels/standing-seam-panel.jpg',
      alt: 'FS-S16 standing seam metal roof panel with concealed fasteners and raised seams',
    },
    featured: false,
    relatedProducts: ['snap-lock-roof-clips', 'butyl-sealant-tape', 'pipe-flashing'],
    fastenerNote: 'Concealed clip attachment. No exposed fasteners in the roof plane.',
  },
  {
    slug: 'fs-i40',
    name: 'FS-I40 Insulated Wall Panel',
    category: 'Wall',
    shortDescription:
      'Insulated sandwich wall panel combining structure, insulation, and finish in one component.',
    description:
      'An insulated wall panel that combines an exterior face, insulating core, and interior face in a single component for temperature-sensitive and conditioned buildings.',
    bestFor: 'Best for conditioned and temperature-sensitive buildings',
    applications: ['Wall'],
    substrates: ['Structural framing'],
    gauges: ['26 ga. faces'],
    finishes: ['Factory-applied color'],
    specs: [
      { label: 'Coverage', value: '40"' },
      { label: 'Panel Thickness', value: '2" – 4"' },
      { label: 'Attachment', value: 'Concealed fastener' },
      { label: 'Core', value: 'Insulating foam core' },
    ],
    image: {
      src: '/images/panels/insulated-wall-panel.jpg',
      alt: 'FS-I40 insulated metal wall panel showing the insulating core between steel faces',
    },
    featured: false,
    relatedProducts: ['silicone-sealant', 'corner-trim', 'base-trim'],
    fastenerNote: 'Concealed fastener system. Panel thickness selected per project.',
  },
  {
    slug: 'fs-l29',
    name: 'FS-L29 Interior Liner Panel',
    category: 'Interior',
    shortDescription:
      'Light-gauge interior liner panel for a clean, washable interior finish.',
    description:
      'A light-gauge interior liner panel that provides a clean, durable, and easily cleaned interior surface for shops, barns, and commercial buildings.',
    bestFor: 'Best for interior wall and ceiling liner',
    applications: ['Interior wall', 'Ceiling liner'],
    substrates: ['Steel framing', 'Wood framing'],
    gauges: ['29 ga.'],
    finishes: ['Factory-applied color'],
    specs: [
      { label: 'Coverage', value: '36"' },
      { label: 'Rib Height', value: '3/8"' },
      { label: 'Rib Spacing', value: '6" centers' },
      { label: 'Available Gauges', value: '29 ga.' },
    ],
    image: {
      src: '/images/panels/interior-liner-panel.jpg',
      alt: 'FS-L29 interior liner panel installed as a clean white shop wall finish',
    },
    featured: false,
    relatedProducts: ['stitch-screws', 'j-channel', 'corner-trim'],
    fastenerNote: 'Exposed fastener system sized for light-gauge interior applications.',
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
    href: '/products/roofing-panels',
    image: {
      src: '/images/categories/metal-roofing-panels.jpg',
      alt: 'Stacked metal roofing panels in multiple colors on a manufacturing floor',
    },
  },
  {
    slug: 'wall-panels',
    title: 'Wall and Liner Panels',
    description:
      'Strong exterior and interior panel systems for commercial, agricultural, and industrial buildings.',
    href: '/products/wall-panels',
    image: {
      src: '/images/categories/wall-and-liner-panels.jpg',
      alt: 'Metal wall panels being installed on a commercial steel building',
    },
  },
  {
    slug: 'structural-components',
    title: 'Structural Components',
    description:
      'Frames, purlins, girts, base angles, eave struts, and other building-system components.',
    href: '/products/structural-components',
    image: {
      src: '/images/categories/structural-steel-components.jpg',
      alt: 'Structural steel frame of a metal building against an open sky',
    },
  },
  {
    slug: 'trim-and-flashing',
    title: 'Trim and Flashing',
    description:
      'Standard and custom-formed trim manufactured for accurate fit and dependable weather protection.',
    href: '/products/trim-and-flashing',
    image: {
      src: '/images/categories/trim-and-flashing.jpg',
      alt: 'Formed metal trim and flashing pieces bundled for delivery',
    },
  },
  {
    slug: 'fasteners-and-accessories',
    title: 'Fasteners and Accessories',
    description:
      'Screws, closures, sealants, ventilation products, pipe flashings, and installation tools.',
    href: '/products/fasteners-and-accessories',
    image: {
      src: '/images/categories/fasteners-and-accessories.jpg',
      alt: 'Metal roofing screws, closures, and sealant products arranged on a bench',
    },
  },
  {
    slug: 'building-packages',
    title: 'Complete Building Packages',
    description:
      'Coordinated steel packages for shops, barns, warehouses, garages, and commercial facilities.',
    href: '/building-systems',
    image: {
      src: '/images/categories/complete-building-packages.jpg',
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
  image: CatalogImage
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
      src: '/images/structural/primary-rigid-frames.jpg',
      alt: 'Primary rigid steel frames erected on a building site',
    },
    featured: true,
    relatedProducts: ['endwall-frames', 'roof-purlins', 'bracing-systems'],
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
      src: '/images/structural/endwall-frames.jpg',
      alt: 'Steel endwall framing on a metal building under construction',
    },
    featured: false,
    relatedProducts: ['primary-rigid-frames', 'wall-girts', 'framed-openings'],
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
      src: '/images/structural/roof-purlins.jpg',
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
      src: '/images/structural/wall-girts.jpg',
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
      src: '/images/structural/eave-struts.jpg',
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
      src: '/images/structural/base-angles.jpg',
      alt: 'Galvanized base angle fastened along a concrete slab edge',
    },
    featured: false,
    relatedProducts: ['base-trim', 'wall-girts', 'foam-closure-strips'],
  },
  {
    slug: 'framed-openings',
    name: 'Framed Openings',
    category: 'structural-components',
    shortDescription:
      'Pre-detailed framing for overhead doors, walk doors, windows, and louvers.',
    applications: ['Doors', 'Windows', 'Louvers'],
    specs: [
      { label: 'Type', value: 'Overhead, walk, window' },
      { label: 'Finish', value: 'Galvanized' },
    ],
    image: {
      src: '/images/structural/framed-openings.jpg',
      alt: 'Framed overhead door opening in a steel building wall',
    },
    featured: true,
    relatedProducts: ['door-trim', 'endwall-frames', 'wall-girts'],
  },
  {
    slug: 'canopy-framing',
    name: 'Canopy Framing',
    category: 'structural-components',
    shortDescription:
      'Framing for entry canopies, loading canopies, and covered work areas.',
    applications: ['Canopies', 'Loading areas'],
    specs: [
      { label: 'Type', value: 'Cantilever or column-supported' },
      { label: 'Finish', value: 'Shop-primed' },
    ],
    image: {
      src: '/images/structural/canopy-framing.jpg',
      alt: 'Steel canopy framing extending over a loading dock',
    },
    featured: false,
    relatedProducts: ['primary-rigid-frames', 'rake-trim', 'eave-trim'],
  },
  {
    slug: 'bracing-systems',
    name: 'Bracing Systems',
    category: 'structural-components',
    shortDescription:
      'Cable, rod, and portal bracing that resists lateral loads across the structure.',
    applications: ['Lateral bracing'],
    specs: [
      { label: 'Type', value: 'Cable, rod, or portal' },
      { label: 'Finish', value: 'Galvanized' },
    ],
    image: {
      src: '/images/structural/bracing-systems.jpg',
      alt: 'Diagonal cable bracing inside a steel building frame',
    },
    featured: false,
    relatedProducts: ['primary-rigid-frames', 'roof-purlins', 'wall-girts'],
  },
]

export const TRIM_PRODUCTS: Product[] = [
  {
    slug: 'ridge-cap',
    name: 'Ridge Cap',
    category: 'trim-and-flashing',
    shortDescription: 'Closes and weatherproofs the ridge where two roof planes meet.',
    applications: ['Roof ridge'],
    specs: [{ label: 'Form', value: 'Formed to panel profile' }],
    image: {
      src: '/images/trim/ridge-cap.jpg',
      alt: 'Metal ridge cap trim installed along a roof ridge line',
    },
    featured: true,
    relatedProducts: ['foam-closure-strips', 'ridge-ventilation', 'butyl-sealant-tape'],
  },
  {
    slug: 'rake-trim',
    name: 'Rake Trim',
    category: 'trim-and-flashing',
    shortDescription: 'Finishes and weatherproofs the sloped gable edge of a roof.',
    applications: ['Gable edge'],
    specs: [{ label: 'Form', value: 'Standard and custom' }],
    image: {
      src: '/images/trim/rake-trim.jpg',
      alt: 'Metal rake trim finishing the gable edge of a metal roof',
    },
    featured: false,
    relatedProducts: ['ridge-cap', 'corner-trim', 'long-life-panel-screws'],
  },
  {
    slug: 'eave-trim',
    name: 'Eave Trim',
    category: 'trim-and-flashing',
    shortDescription: 'Directs water off the roof edge at the eave and finishes the panel run.',
    applications: ['Roof eave'],
    specs: [{ label: 'Form', value: 'Standard and custom' }],
    image: {
      src: '/images/trim/eave-trim.jpg',
      alt: 'Metal eave trim installed at the lower edge of a metal roof',
    },
    featured: false,
    relatedProducts: ['drip-edge', 'eave-struts', 'foam-closure-strips'],
  },
  {
    slug: 'valley-trim',
    name: 'Valley Trim',
    category: 'trim-and-flashing',
    shortDescription: 'Channels water where two roof planes intersect at an inside angle.',
    applications: ['Roof valley'],
    specs: [{ label: 'Form', value: 'Formed valley pan' }],
    image: {
      src: '/images/trim/valley-trim.jpg',
      alt: 'Metal valley trim channel between two intersecting roof planes',
    },
    featured: false,
    relatedProducts: ['butyl-sealant-tape', 'ridge-cap', 'long-life-panel-screws'],
  },
  {
    slug: 'corner-trim',
    name: 'Corner Trim',
    category: 'trim-and-flashing',
    shortDescription: 'Finishes outside and inside wall corners with a clean, weather-tight edge.',
    applications: ['Wall corners'],
    specs: [{ label: 'Form', value: 'Outside and inside' }],
    image: {
      src: '/images/trim/corner-trim.jpg',
      alt: 'Metal corner trim finishing the outside corner of a steel building',
    },
    featured: false,
    relatedProducts: ['base-trim', 'j-channel', 'stitch-screws'],
  },
  {
    slug: 'j-channel',
    name: 'J-Channel',
    category: 'trim-and-flashing',
    shortDescription: 'Receives and finishes panel ends at openings and terminations.',
    applications: ['Openings', 'Panel terminations'],
    specs: [{ label: 'Form', value: 'J profile' }],
    image: {
      src: '/images/trim/j-channel.jpg',
      alt: 'Metal J-channel trim receiving panel ends around a wall opening',
    },
    featured: false,
    relatedProducts: ['door-trim', 'corner-trim', 'custom-flashing'],
  },
  {
    slug: 'drip-edge',
    name: 'Drip Edge',
    category: 'trim-and-flashing',
    shortDescription: 'Carries runoff clear of the underlying structure at roof edges.',
    applications: ['Roof edge'],
    specs: [{ label: 'Form', value: 'Formed edge' }],
    image: {
      src: '/images/trim/drip-edge.jpg',
      alt: 'Metal drip edge trim along the edge of a metal roof',
    },
    featured: false,
    relatedProducts: ['eave-trim', 'rake-trim', 'butyl-sealant-tape'],
  },
  {
    slug: 'base-trim',
    name: 'Base Trim',
    category: 'trim-and-flashing',
    shortDescription: 'Finishes the bottom of wall panels and closes the wall-to-slab joint.',
    applications: ['Wall base'],
    specs: [{ label: 'Form', value: 'Formed base' }],
    image: {
      src: '/images/trim/base-trim.jpg',
      alt: 'Metal base trim closing the joint between wall panels and a concrete slab',
    },
    featured: false,
    relatedProducts: ['base-angles', 'foam-closure-strips', 'corner-trim'],
  },
  {
    slug: 'door-trim',
    name: 'Door Trim',
    category: 'trim-and-flashing',
    shortDescription: 'Frames and weatherproofs walk-door and overhead-door openings.',
    applications: ['Door openings'],
    specs: [{ label: 'Form', value: 'Jamb and header' }],
    image: {
      src: '/images/trim/door-trim.jpg',
      alt: 'Metal door trim framing an overhead door opening',
    },
    featured: false,
    relatedProducts: ['framed-openings', 'j-channel', 'silicone-sealant'],
  },
  {
    slug: 'custom-flashing',
    name: 'Custom Flashing',
    category: 'trim-and-flashing',
    shortDescription:
      'Made-to-measure flashing formed for conditions standard trim does not cover.',
    applications: ['Non-standard conditions', 'Retrofit'],
    specs: [{ label: 'Form', value: 'Formed to submitted dimensions' }],
    image: {
      src: '/images/trim/custom-flashing.jpg',
      alt: 'Custom formed metal flashing pieces on a press brake',
    },
    featured: true,
    relatedProducts: ['j-channel', 'valley-trim', 'silicone-sealant'],
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
      src: '/images/accessories/long-life-panel-screws.jpg',
      alt: 'Coated metal roofing screws with bonded sealing washers',
    },
    featured: true,
    relatedProducts: ['stitch-screws', 'touch-up-paint', 'installation-tools'],
  },
  {
    slug: 'stitch-screws',
    name: 'Stitch Screws',
    category: 'fasteners-and-accessories',
    shortDescription: 'Short fasteners that join adjacent panel sidelaps and trim overlaps.',
    applications: ['Panel sidelaps', 'Trim laps'],
    specs: [{ label: 'Use', value: 'Panel-to-panel' }],
    image: {
      src: '/images/accessories/stitch-screws.jpg',
      alt: 'Stitch screws used to fasten metal panel sidelaps together',
    },
    featured: false,
    relatedProducts: ['long-life-panel-screws', 'installation-tools', 'corner-trim'],
  },
  {
    slug: 'butyl-sealant-tape',
    name: 'Butyl Sealant Tape',
    category: 'fasteners-and-accessories',
    shortDescription: 'Non-hardening tape sealant for panel laps, ridges, and trim joints.',
    applications: ['Panel laps', 'Trim joints'],
    specs: [{ label: 'Type', value: 'Non-hardening butyl' }],
    image: {
      src: '/images/accessories/butyl-sealant-tape.jpg',
      alt: 'Roll of butyl sealant tape used at metal panel laps',
    },
    featured: true,
    relatedProducts: ['silicone-sealant', 'foam-closure-strips', 'ridge-cap'],
  },
  {
    slug: 'silicone-sealant',
    name: 'Silicone Sealant',
    category: 'fasteners-and-accessories',
    shortDescription: 'Gun-grade sealant for penetrations, terminations, and trim details.',
    applications: ['Penetrations', 'Trim details'],
    specs: [{ label: 'Type', value: 'Gun-grade silicone' }],
    image: {
      src: '/images/accessories/silicone-sealant.jpg',
      alt: 'Tubes of silicone sealant for metal building trim details',
    },
    featured: false,
    relatedProducts: ['butyl-sealant-tape', 'pipe-flashing', 'touch-up-paint'],
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
      src: '/images/accessories/foam-closure-strips.jpg',
      alt: 'Foam closure strips shaped to match metal panel ribs',
    },
    featured: true,
    relatedProducts: ['ridge-cap', 'base-trim', 'butyl-sealant-tape'],
  },
  {
    slug: 'ridge-ventilation',
    name: 'Ridge Ventilation',
    category: 'fasteners-and-accessories',
    shortDescription: 'Ridge vent products that exhaust warm, moist air from the roof cavity.',
    applications: ['Roof ventilation'],
    specs: [{ label: 'Location', value: 'Roof ridge' }],
    image: {
      src: '/images/accessories/ridge-ventilation.jpg',
      alt: 'Ridge ventilation product installed along a metal roof ridge',
    },
    featured: false,
    relatedProducts: ['ridge-cap', 'foam-closure-strips', 'fs-a36'],
  },
  {
    slug: 'pipe-flashing',
    name: 'Pipe Flashing',
    category: 'fasteners-and-accessories',
    shortDescription: 'Flexible boots that seal pipe and vent penetrations through panels.',
    applications: ['Roof penetrations'],
    specs: [{ label: 'Type', value: 'Flexible boot' }],
    image: {
      src: '/images/accessories/pipe-flashing.jpg',
      alt: 'Flexible pipe flashing boot sealing a vent pipe on a metal roof',
    },
    featured: false,
    relatedProducts: ['silicone-sealant', 'butyl-sealant-tape', 'custom-flashing'],
  },
  {
    slug: 'snow-retention',
    name: 'Snow Retention',
    category: 'fasteners-and-accessories',
    shortDescription: 'Rail and clamp systems that hold snow on the roof plane until it melts.',
    applications: ['Snow management'],
    specs: [{ label: 'Type', value: 'Rail and clamp' }],
    image: {
      src: '/images/accessories/snow-retention.jpg',
      alt: 'Snow retention rail mounted across a standing seam metal roof',
    },
    featured: false,
    relatedProducts: ['fs-s16', 'snap-lock-roof-clips', 'silicone-sealant'],
  },
  {
    slug: 'touch-up-paint',
    name: 'Touch-Up Paint',
    category: 'fasteners-and-accessories',
    shortDescription: 'Color-matched paint for field cuts, scratches, and minor finish repairs.',
    applications: ['Field touch-up'],
    specs: [{ label: 'Match', value: 'Matched to panel color' }],
    image: {
      src: '/images/accessories/touch-up-paint.jpg',
      alt: 'Bottles of color-matched touch-up paint for metal panels',
    },
    featured: false,
    relatedProducts: ['long-life-panel-screws', 'installation-tools', 'silicone-sealant'],
  },
  {
    slug: 'installation-tools',
    name: 'Installation Tools',
    category: 'fasteners-and-accessories',
    shortDescription: 'Drivers, sockets, shears, and hand tools used to install panels and trim.',
    applications: ['Installation'],
    specs: [{ label: 'Includes', value: 'Drivers, sockets, shears' }],
    image: {
      src: '/images/accessories/installation-tools.jpg',
      alt: 'Hand tools and drivers used for metal panel installation',
    },
    featured: false,
    relatedProducts: ['long-life-panel-screws', 'stitch-screws', 'touch-up-paint'],
  },
  {
    slug: 'snap-lock-roof-clips',
    name: 'Snap-Lock Roof Clips',
    category: 'fasteners-and-accessories',
    shortDescription: 'Concealed clips that secure standing seam panels while allowing movement.',
    applications: ['Standing seam attachment'],
    specs: [{ label: 'Type', value: 'Concealed clip' }],
    image: {
      src: '/images/accessories/snap-lock-roof-clips.jpg',
      alt: 'Concealed snap-lock clips for standing seam roof panel attachment',
    },
    featured: false,
    relatedProducts: ['fs-s16', 'snow-retention', 'butyl-sealant-tape'],
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
 * Screen rendering is approximate — see the disclaimer on the color chart.
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
  { name: 'Colonial Blue', hex: '#3E5765' },
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
    structuralSystems: ['Rigid frame', 'Post frame compatible', 'Light-gauge framing'],
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
      src: '/images/buildings/agricultural-barn.jpg',
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
    structuralSystems: ['Clear-span rigid frame', 'Modular frame', 'Canopy framing'],
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
          'Typical production turnaround is 48 hours for standard panel and trim items. Complete building packages depend on scope — we confirm dates on your order rather than promising a fixed schedule up front.',
      },
    ],
    image: {
      src: '/images/buildings/commercial-facility.jpg',
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
    structuralSystems: ['Clear-span rigid frame', 'Modular frame', 'Crane-ready framing'],
    components: [
      'FS-R36 roof and wall panels',
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
          'FS-R36 is available in 24 gauge in addition to 26 and 29, which is common where added durability is wanted.',
      },
    ],
    image: {
      src: '/images/buildings/industrial-facility.jpg',
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
    structuralSystems: ['Rigid frame', 'Post frame compatible', 'Light-gauge framing'],
    components: [
      'FS-R36 or FS-A36 panels',
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
      src: '/images/buildings/shop-and-garage.jpg',
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
    structuralSystems: ['Clear-span rigid frame', 'Modular frame', 'Canopy framing'],
    components: [
      'Standing seam or FS-R36 roofing',
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
          'FS-I40 insulated wall panels combine structure, insulation, and finish in one component, which suits conditioned or temperature-sensitive storage.',
      },
      {
        question: 'How are large orders bundled?',
        answer:
          'Materials are bundled and labeled for efficient handling, which matters on larger footprints where crews stage by elevation.',
      },
    ],
    image: {
      src: '/images/buildings/warehouse.jpg',
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
      'Economical enclosures for equipment, inventory, and material storage — simple structures built from the same components as our larger packages.',
    applications: [
      'Equipment storage',
      'Material and inventory storage',
      'Utility enclosures',
      'Mini-storage',
    ],
    structuralSystems: ['Rigid frame', 'Light-gauge framing', 'Post frame compatible'],
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
      src: '/images/buildings/storage-building.jpg',
      alt: 'Simple metal storage building with roll-up doors',
    },
  },
]

export function getBuildingSystem(slug: string): BuildingSystem | undefined {
  return BUILDING_SYSTEMS.find((b) => b.slug === slug)
}

/** Building types listed on the homepage building-systems section. */
export const BUILDING_TYPES = [
  'Agricultural Buildings',
  'Equipment Shops',
  'Commercial Facilities',
  'Warehouses',
  'Garages',
  'Storage Buildings',
]

export const BUILDING_BENEFITS = [
  'Project-specific material packages',
  'Engineered structural options',
  'Coordinated panel and trim systems',
  'Clear material takeoffs',
  'Regional delivery',
  'Contractor support',
]

// ============================================================================
// Industries
// ============================================================================

export interface Industry {
  slug: string
  name: string
  shortDescription: string
  body: string
  needs: string[]
  image: CatalogImage
  /** BuildingSystem slugs this industry most often orders, in display order. */
  relatedSystems: string[]
}

export const INDUSTRIES: Industry[] = [
  {
    slug: 'agriculture',
    name: 'Agricultural Operations',
    shortDescription:
      'Equipment storage, hay barns, and shop space for farms and ranches.',
    body: 'Farms and ranches need buildings that go up efficiently and keep working through weather, dust, and constant equipment traffic. We supply panels, trim, and structural components for equipment barns, hay storage, livestock shelters, and shops.',
    needs: [
      'Panels cut to exact length',
      'Complete closure and fastener packages',
      'Ventilation for stored crops and livestock',
      'Regional delivery to rural sites',
    ],
    image: {
      src: '/images/industries/agriculture.jpg',
      alt: 'Metal agricultural building on a working farm at sunrise',
    },
    relatedSystems: [
      'agricultural-buildings',
      'shops-and-garages',
      'storage-buildings',
    ],
  },
  {
    slug: 'commercial-construction',
    name: 'Commercial Contractors',
    shortDescription:
      'Coordinated packages and takeoffs that keep commercial schedules intact.',
    body: 'Commercial contractors work against a schedule. We supply coordinated panel, trim, and component packages with clear takeoffs and organized bundles so crews are not waiting on materials or chasing missing pieces.',
    needs: [
      'Clear material takeoffs',
      'Coordinated trim packages',
      'Delivery scheduling',
      'Responsive order changes',
    ],
    image: {
      src: '/images/industries/commercial-construction.jpg',
      alt: 'Commercial metal building under construction with steel framing exposed',
    },
    relatedSystems: [
      'commercial-buildings',
      'warehouses',
      'storage-buildings',
    ],
  },
  {
    slug: 'industrial-facilities',
    name: 'Industrial Facilities',
    shortDescription:
      'Durable envelopes and components for facilities in constant use.',
    body: 'Industrial facilities put their buildings to work. We supply heavier-gauge panels, interior liner systems, structural components, and custom trim for manufacturing, processing, and service facilities.',
    needs: [
      'Heavier-gauge panel options',
      'Interior liner panels',
      'Large framed openings',
      'Custom flashing for non-standard conditions',
    ],
    image: {
      src: '/images/industries/industrial-facilities.jpg',
      alt: 'Interior of an industrial steel facility with liner panels and overhead framing',
    },
    relatedSystems: [
      'industrial-buildings',
      'warehouses',
      'shops-and-garages',
    ],
  },
  {
    slug: 'roofing-contractors',
    name: 'Roofing Professionals',
    shortDescription:
      'Cut-to-length panels, matched trim, and dependable turnaround for roofing crews.',
    body: 'Roofing contractors need accurate lengths and a complete trim and closure package on the first delivery. We cut panels to length, coordinate trim conditions, and flag missing details before the order goes into production.',
    needs: [
      'Custom-length panel production',
      'Matched trim and closures',
      'Fast standard turnaround',
      'Contractor and volume pricing',
    ],
    image: {
      src: '/images/industries/roofing-contractors.jpg',
      alt: 'Roofing contractors installing metal roofing panels on a steep roof',
    },
    relatedSystems: [
      'commercial-buildings',
      'agricultural-buildings',
      'shops-and-garages',
    ],
  },
  {
    slug: 'residential-construction',
    name: 'Residential Builders',
    shortDescription:
      'Metal roofing and shop buildings for homebuilders and developers.',
    body: 'Homebuilders and developers use metal roofing for its lifespan and finish. We supply standing seam and exposed-fastener roofing, matched trim, and shop or garage packages for residential projects.',
    needs: [
      'Standing seam roofing',
      'Color and finish selection',
      'Detached shop and garage packages',
      'Trim matched to the roof line',
    ],
    image: {
      src: '/images/industries/residential-construction.jpg',
      alt: 'Standing seam metal roof on a newly built residence',
    },
    relatedSystems: [
      'shops-and-garages',
      'storage-buildings',
      'agricultural-buildings',
    ],
  },
  {
    slug: 'municipal-and-utility',
    name: 'Municipal and Utility Projects',
    shortDescription:
      'Maintenance buildings, storage, and utility enclosures for public agencies.',
    body: 'Municipal and utility organizations need durable, low-maintenance structures and documentation that survives a procurement process. We supply components for maintenance buildings, equipment storage, and utility enclosures.',
    needs: [
      'Clear documentation and takeoffs',
      'Durable low-maintenance materials',
      'Equipment and fleet storage',
      'Regional delivery',
    ],
    image: {
      src: '/images/industries/municipal-utility.jpg',
      alt: 'Municipal maintenance building with metal siding and equipment bays',
    },
    relatedSystems: [
      'storage-buildings',
      'industrial-buildings',
      'shops-and-garages',
    ],
  },
]

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug)
}

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

/** Contractor-focused section benefits. */
export const CONTRACTOR_BENEFITS = [
  'Contractor and volume pricing',
  'Detailed order confirmations',
  'Clearly labeled material bundles',
  'Custom-length panel production',
  'Coordinated trim packages',
  'Delivery scheduling',
  'Product and installation guidance',
]

// ============================================================================
// Projects
// ============================================================================

export interface ProjectSummary {
  /** Must match the filename in `src/projects/<slug>.tsx`. */
  slug: string
  title: string
  /** Must match `metadata.categories` in the project file. */
  category: string
  location: string
  size: string
  summary: string
  products: string[]
  image: CatalogImage
}

/**
 * Card data for project listings.
 *
 * The full case-study prose lives in `src/projects/<slug>.tsx` (that file is the
 * page). This array is the summary shown on cards, so listings do not have to
 * import every case-study component just to render a teaser.
 *
 * `slug` and `category` MUST stay in sync with the matching project file —
 * `/projects/category/<slug>` archives are built from the project file's own
 * `metadata.categories`.
 */
export const PROJECTS: ProjectSummary[] = [
  {
    slug: 'redstone-equipment-workshop',
    title: 'Redstone Equipment Workshop',
    category: 'Agricultural',
    location: 'Redstone, Texas',
    size: '12,000 sq ft',
    summary:
      'An equipment workshop combining machinery storage with year-round working space, built from a coordinated panel, trim, and framing package.',
    products: [
      'FS-R36 roofing panels',
      'FS-U36 wall panels',
      'Custom trim package',
      'Structural framing components',
    ],
    image: {
      src: '/images/projects/redstone-equipment-workshop.jpg',
      alt: 'Metal equipment workshop with roll-up doors on an agricultural property in Redstone, Texas',
    },
  },
  {
    slug: 'mesa-county-distribution-center',
    title: 'Mesa County Distribution Center',
    category: 'Commercial',
    location: 'San Angelo, Texas',
    size: '38,500 sq ft',
    summary:
      'A distribution facility with wide clear spans, an insulated envelope, and loading canopies coordinated with the building package.',
    products: [
      'Pre-engineered building package',
      'Insulated wall panels',
      'Standing-seam roofing',
      'Loading-canopy components',
    ],
    image: {
      src: '/images/projects/mesa-county-distribution-center.jpg',
      alt: 'Commercial distribution center with standing seam roofing and loading dock canopies in San Angelo, Texas',
    },
  },
  {
    slug: 'high-plains-agricultural-storage',
    title: 'High Plains Agricultural Storage',
    category: 'Agricultural',
    location: 'Levelland, Texas',
    size: '18,400 sq ft',
    summary:
      'A commodity and equipment storage building with a ventilation package and framed openings sized for working machinery.',
    products: [
      'FS-A36 roofing and wall panels',
      'Ventilation package',
      'Framed openings',
      'Fasteners and sealants',
    ],
    image: {
      src: '/images/projects/high-plains-agricultural-storage.jpg',
      alt: 'Agricultural storage building with ventilated ridge and large equipment openings near Levelland, Texas',
    },
  },
  {
    slug: 'westline-service-facility',
    title: 'Westline Service Facility',
    category: 'Industrial',
    location: 'Abilene, Texas',
    size: '22,750 sq ft',
    summary:
      'A service facility finished with interior liner panels and custom-formed trim, built to take constant equipment traffic.',
    products: [
      'Structural framing',
      'Roof and wall panels',
      'Interior liner panels',
      'Custom formed trim',
    ],
    image: {
      src: '/images/projects/westline-service-facility.jpg',
      alt: 'Industrial service facility with liner-panel interior and large bay doors in Abilene, Texas',
    },
  },
]

// ============================================================================
// Testimonials
// ============================================================================

export interface Testimonial {
  quote: string
  name: string
  company: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'ForgeSpan had every panel, trim piece, and fastener organized by building elevation. That saved our crew hours during installation.',
    name: 'Daniel Mercer',
    company: 'Mercer Building Systems',
  },
  {
    quote:
      'Their team reviewed our measurements, identified two missing trim conditions, and helped us correct the order before production.',
    name: 'Alicia Ramirez',
    company: 'Ramirez Commercial Roofing',
  },
  {
    quote:
      'We use ForgeSpan because we can call someone who understands the project instead of simply taking an order.',
    name: 'Wade Bennett',
    company: 'Bennett Ag Construction',
  },
]

// ============================================================================
// Resources
// ============================================================================

export interface Resource {
  slug: string
  category: string
  title: string
  excerpt: string
  /** ISO date — rendered with Luxon per Canon rule 027. */
  date: string
  href: string
}

export const RESOURCES: Resource[] = [
  {
    slug: 'metal-panel-selection-guide',
    category: 'Guide',
    title: 'Metal Panel Selection Guide',
    excerpt:
      'How profile, gauge, substrate, and application work together when choosing between exposed-fastener and concealed-fastener panels.',
    date: '2026-05-18',
    href: '/resources/metal-panel-selection-guide',
  },
  {
    slug: 'understanding-panel-gauges',
    category: 'Specifications',
    title: 'Understanding Panel Gauges',
    excerpt:
      'What 24, 26, and 29 gauge actually mean, and how gauge choice affects durability, span, and cost on a project.',
    date: '2026-04-30',
    href: '/resources/understanding-panel-gauges',
  },
  {
    slug: 'how-to-measure-for-metal-roofing',
    category: 'Guide',
    title: 'How to Measure for Metal Roofing',
    excerpt:
      'A practical walkthrough for measuring a roof so panel lengths, trim conditions, and closures are ordered correctly the first time.',
    date: '2026-04-12',
    href: '/resources/how-to-measure-for-metal-roofing',
  },
  {
    slug: 'exposed-fastener-vs-standing-seam',
    category: 'Comparison',
    title: 'Exposed Fastener vs. Standing Seam',
    excerpt:
      'A direct comparison of the two roofing approaches — cost, appearance, maintenance, and where each one fits.',
    date: '2026-03-24',
    href: '/resources/exposed-fastener-vs-standing-seam',
  },
  {
    slug: 'metal-building-planning-checklist',
    category: 'Checklist',
    title: 'Metal Building Planning Checklist',
    excerpt:
      'The dimensions, openings, and site details worth settling before requesting a building package quote.',
    date: '2026-03-05',
    href: '/resources/metal-building-planning-checklist',
  },
  {
    slug: 'roofing-color-and-finish-guide',
    category: 'Finishes',
    title: 'Roofing Color and Finish Guide',
    excerpt:
      'How factory-applied finishes hold up, how color affects appearance over time, and why physical samples matter.',
    date: '2026-02-16',
    href: '/resources/roofing-color-and-finish-guide',
  },
]
