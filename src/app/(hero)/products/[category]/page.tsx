import { notFound } from 'next/navigation'
import { PageWrapper } from '@/components/page-wrapper'
import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SectionHeading } from '@/components/section-heading'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { Image } from '@/components/image'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { SpecificationList } from '@/components/specification-list'
import { PanelProfileCard } from '@/components/panel-profile-card'
import { CTASection } from '@/components/cta-section'
import {
  ALL_PRODUCTS,
  PANEL_PROFILES,
  PRODUCT_CATEGORIES,
  type PanelProfile,
  type Product,
  type ProductCategorySlug,
} from '@/catalog'
import { company, cta } from '@/config'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { baseURL } from '@/app/metadata'

interface PageProps {
  params: Promise<{ category: string }>
}

// Pre-render the five catalog categories at build time; reject anything else.
// "building-packages" is deliberately absent — it lives at /building-systems.
export const dynamicParams = false

const CATEGORY_SLUGS: ProductCategorySlug[] = [
  'roofing-panels',
  'wall-panels',
  'structural-components',
  'trim-and-flashing',
  'fasteners-and-accessories',
]

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }))
}

function isCategorySlug(value: string): value is ProductCategorySlug {
  return (CATEGORY_SLUGS as string[]).includes(value)
}

/**
 * Panel profiles are their own catalog entity, not `Product` records, so the
 * two panel categories surface them alongside the (currently empty) product
 * list rather than leaving the page bare. Roofing covers anything that can go
 * on a roof plane; walls cover exterior wall, liner, and interior profiles.
 */
function panelsForCategory(category: ProductCategorySlug): PanelProfile[] {
  if (category === 'roofing-panels') {
    return PANEL_PROFILES.filter((panel) => panel.category.includes('Roofing'))
  }
  if (category === 'wall-panels') {
    return PANEL_PROFILES.filter(
      (panel) => panel.category.includes('Wall') || panel.category === 'Interior'
    )
  }
  return []
}

interface ProductGroup {
  /** Anchor id — the site navigation deep-links to several of these. */
  id: string
  heading: string
  intro: string
  slugs: string[]
}

/**
 * Sub-groupings within a category. Keyed by anchor id because the navigation
 * links straight to #closures, #accessories, and #tools.
 */
const PRODUCT_GROUPS: Partial<Record<ProductCategorySlug, ProductGroup[]>> = {
  'fasteners-and-accessories': [
    {
      id: 'fasteners',
      heading: 'Fasteners',
      intro:
        'Exposed and concealed attachment for panel-to-structure and panel-to-panel connections.',
      slugs: ['long-life-panel-screws', 'stitch-screws', 'snap-lock-roof-clips'],
    },
    {
      id: 'closures',
      heading: 'Closures and Sealants',
      intro:
        'Profile-matched closures and sealants that close the gaps a panel rib leaves at eaves, ridges, laps, and bases.',
      slugs: ['foam-closure-strips', 'butyl-sealant-tape', 'silicone-sealant'],
    },
    {
      id: 'accessories',
      heading: 'Accessories',
      intro:
        'Ventilation, penetration flashing, snow management, and finish repair for a completed roof.',
      slugs: ['ridge-ventilation', 'pipe-flashing', 'snow-retention', 'touch-up-paint'],
    },
    {
      id: 'tools',
      heading: 'Tools',
      intro: 'Hand tools and drivers sized for panel and trim installation.',
      slugs: ['installation-tools'],
    },
  ],
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params
  if (!isCategorySlug(category)) return {}

  const record = PRODUCT_CATEGORIES.find((entry) => entry.slug === category)
  if (!record) return {}

  const metadata: PageMetadata = {
    title: `${record.title} | ${company.name}`,
    description: record.description,
    slug: `products/${category}`,
    focusKeyword: record.title,
    publishDate: '2026-07-15T00:00:00Z',
    modifiedDate: '2026-07-15T00:00:00Z',
    alternates: { canonical: `/products/${category}` },
    openGraph: {
      image: { url: record.image.src, alt: record.image.alt },
    },
  }
  return generatePageMetadata(metadata)
}

/** Catalog card for a single product, anchored by slug for deep links. */
function ProductCard({ product }: { product: Product }) {
  return (
    <article
      id={product.slug}
      className="flex flex-col rounded-none border border-accent3-dark bg-body-light scroll-mt-28"
    >
      <div className="overflow-hidden border-b border-accent3-dark">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          size="medium"
          rounded="rounded-none"
          aspect="aspect-[3/2]"
          className="w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Heading
          as="h3"
          fontSize="text-lg"
          fontWeight="font-bold"
          letterSpacing="tracking-tight"
          lineHeight="leading-tight"
          color="text-contrast"
          margin="mb-2"
        >
          {product.name}
        </Heading>

        <Paragraph
          fontSize="text-base"
          color="text-contrast-light"
          margin="mb-4"
        >
          {product.shortDescription}
        </Paragraph>

        <Span
          fontFamily="font-heading2"
          fontSize="text-xs"
          fontWeight="font-semibold"
          color="text-accent-dark"
          margin="mb-4"
          className="uppercase tracking-[0.16em]"
        >
          {product.applications.join(' · ')}
        </Span>

        <SpecificationList
          specs={product.specs}
          variant="list"
          className="mt-auto"
        />
      </div>
    </article>
  )
}

export default async function Page({ params }: PageProps) {
  const { category } = await params
  if (!isCategorySlug(category)) notFound()

  const record = PRODUCT_CATEGORIES.find((entry) => entry.slug === category)
  if (!record) notFound()

  const products = ALL_PRODUCTS.filter((product) => product.category === category)
  const panels = panelsForCategory(category)
  const groups = PRODUCT_GROUPS[category]

  // Anything not named in a group still gets rendered, so adding a product to
  // the catalog can never silently drop it off the page.
  const grouped = groups
    ? groups.map((group) => ({
        group,
        items: products.filter((product) => group.slugs.includes(product.slug)),
      }))
    : []
  const ungrouped = groups
    ? products.filter(
        (product) => !groups.some((group) => group.slugs.includes(product.slug))
      )
    : products

  const structuredData: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseURL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: `${baseURL}/products`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: record.title,
          item: `${baseURL}/products/${category}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: record.title,
      description: record.description,
      itemListElement: [
        ...panels.map((panel, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: panel.name,
            description: panel.shortDescription,
            url: `${baseURL}/panels/${panel.slug}`,
            image: `${baseURL}${panel.image.src}`,
            brand: { '@type': 'Brand', name: company.name },
          },
        })),
        ...products.map((product, index) => ({
          '@type': 'ListItem',
          position: panels.length + index + 1,
          item: {
            '@type': 'Product',
            name: product.name,
            description: product.shortDescription,
            url: `${baseURL}/products/${category}#${product.slug}`,
            image: `${baseURL}${product.image.src}`,
            brand: { '@type': 'Brand', name: company.name },
          },
        })),
      ],
    },
  ]

  return (
    <PageWrapper metadata={{ structuredData }}>
      {/* Header */}
      <Section className="bg-accent2 pt-40 pb-16 md:pt-52 md:pb-20 lg:pt-64">
        <Breadcrumbs
          dark
          className="mb-8"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: record.title },
          ]}
        />

        <SectionHeading
          as="h1"
          dark
          eyebrow="Product Line"
          heading={record.title}
          intro={record.description}
          className="max-w-3xl"
        />
      </Section>

      {/* Panel profiles, for the two panel categories */}
      {panels.length > 0 && (
        <Section
          id="profiles"
          className="bg-body py-20 md:py-28"
        >
          <SectionHeading
            eyebrow="Profiles"
            heading="Available Panel Profiles"
            intro="Every profile is roll-formed to the length on your order and available across the standard color line."
            className="mb-12 max-w-3xl md:mb-16"
          />

          <Grid
            cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            gap="gap-6 lg:gap-8"
            className="mb-12"
          >
            {panels.map((panel) => (
              <PanelProfileCard
                key={panel.slug}
                panel={panel}
                href={`/panels/${panel.slug}`}
              />
            ))}
          </Grid>

          <Buttons margin="mt-0 mb-0">
            <Button
              href="/colorchart"
              variant="outline"
              size="medium"
              className="max-sm:w-full"
            >
              View the Full Color Chart
            </Button>
          </Buttons>
        </Section>
      )}

      {/* Grouped products — fasteners, closures, accessories, tools */}
      {grouped.map(
        ({ group, items }, index) =>
          items.length > 0 && (
            <Section
              key={group.id}
              id={group.id}
              className={
                index % 2 === 0
                  ? 'bg-accent3 py-20 md:py-28'
                  : 'bg-body py-20 md:py-28'
              }
            >
              <SectionHeading
                eyebrow={record.title}
                heading={group.heading}
                intro={group.intro}
                className="mb-12 max-w-3xl md:mb-16"
              />

              <Grid
                cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                gap="gap-6 lg:gap-8"
              >
                {items.map((product) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                  />
                ))}
              </Grid>
            </Section>
          )
      )}

      {/* Ungrouped products — the whole list for categories without groups */}
      {ungrouped.length > 0 && (
        <Section
          id="products"
          className="bg-accent3 py-20 md:py-28"
        >
          <SectionHeading
            eyebrow={panels.length > 0 ? 'Also Available' : 'Full Line'}
            heading={`${record.title} We Manufacture`}
            intro="Each item is produced to the approved order and bundled with the rest of your package."
            className="mb-12 max-w-3xl md:mb-16"
          />

          <Grid
            cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            gap="gap-6 lg:gap-8"
          >
            {ungrouped.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
              />
            ))}
          </Grid>
        </Section>
      )}

      <CTASection
        heading={`Need ${record.title} for a Project?`}
        body="Send the drawings or the measurements. We will confirm quantities, flag the conditions that are easy to miss, and get a material list back to you."
        primaryCta={cta.quote}
        secondaryCta={cta.call}
        image={{ src: record.image.src, alt: '' }}
      />
    </PageWrapper>
  )
}
