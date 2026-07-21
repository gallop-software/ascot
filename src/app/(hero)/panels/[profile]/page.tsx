import { clsx } from 'clsx'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import phoneIcon from '@iconify/icons-lucide/phone'
import { PageWrapper } from '@/components/page-wrapper'
import { Container } from '@/components/container'
import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ArrowLink } from '@/components/arrow-link'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { Image } from '@/components/image'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { SpecificationList } from '@/components/specification-list'
import { PanelProfileCard } from '@/components/panel-profile-card'
import { PanelStudio } from '@/components/panel-viewer/studio'
import { PANEL_PROFILES, getProduct, type PanelProfile } from '@/catalog'
import { company, cta } from '@/config'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { baseURL, businessId } from '@/app/metadata'

interface PageProps {
  params: Promise<{ profile: string }>
}

// Pre-render every catalog profile at build time; reject unknown slugs.
export const dynamicParams = false

export function generateStaticParams() {
  return PANEL_PROFILES.map((panel) => ({ profile: panel.slug }))
}

function getPanel(slug: string): PanelProfile | undefined {
  return PANEL_PROFILES.find((panel) => panel.slug === slug)
}

/** Product + BreadcrumbList for a panel, rendered as JSON-LD by PageWrapper. */
function buildStructuredData(panel: PanelProfile): object[] {
  const url = `${baseURL}/panels/${panel.slug}`

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: panel.name,
      description: panel.description,
      category: 'Metal Roofing and Wall Panels',
      url,
      image: `${baseURL}${panel.image.src}`,
      brand: { '@type': 'Brand', name: company.name },
      // Only measured geometry from the catalog, never the compliance
      // placeholders above.
      additionalProperty: panel.specs.map((spec) => ({
        '@type': 'PropertyValue',
        name: spec.label,
        value: spec.value,
      })),
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'USD',
        seller: { '@id': businessId },
      },
    },
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
          name: 'Panel Profiles',
          item: `${baseURL}/panels`,
        },
        { '@type': 'ListItem', position: 4, name: panel.name, item: url },
      ],
    },
  ]
}

export async function generateMetadata({ params }: PageProps) {
  const { profile } = await params
  const panel = getPanel(profile)
  if (!panel) return {}

  const metadata: PageMetadata = {
    title: `${panel.name}: Specs and Applications | ${company.name}`,
    description: panel.shortDescription,
    slug: `panels/${profile}`,
    keywords: [
      panel.name,
      `${panel.category.toLowerCase()} panel`,
      ...panel.applications.map(
        (application) => `${application.toLowerCase()} panel`
      ),
    ],
    focusKeyword: panel.name,
    publishDate: '2026-07-15T00:00:00Z',
    modifiedDate: '2026-07-15T00:00:00Z',
    alternates: { canonical: `/panels/${profile}` },
    openGraph: {
      image: { url: panel.image.src, alt: panel.image.alt },
    },
  }
  return generatePageMetadata(metadata)
}

export default async function Page({ params }: PageProps) {
  const { profile } = await params
  const panel = getPanel(profile)
  if (!panel) notFound()

  const relatedProducts = panel.relatedProducts
    .map((slug) => getProduct(slug))
    .filter((product) => product !== undefined)

  const relatedPanels = PANEL_PROFILES.filter(
    (other) => other.slug !== panel.slug && other.category === panel.category
  ).slice(0, 3)

  return (
    <PageWrapper metadata={{ structuredData: buildStructuredData(panel) }}>
      {/* Header */}
      <section className="relative overflow-hidden bg-body2">
        <Image
          src={panel.image.src}
          alt={panel.image.alt}
          size="full"
          rounded="rounded-none"
          lazy={false}
          className={clsx(
            'absolute inset-0 h-full w-full object-cover',
            panel.slug === 'standing-seam' && '-scale-x-100'
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-body2/95 via-body2/80 to-body2/45" />

        <Container className="relative pt-40 pb-20 md:pt-40 md:pb-28 lg:pt-68 lg:pb-36">
          <Breadcrumbs
            className="mb-8"
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Panel Profiles', href: '/panels' },
              { label: panel.name },
            ]}
          />

          <div className="max-w-3xl">
            <Heading
              as="h2"
              margin="mb-4"
            >
              {panel.category}
            </Heading>

            <Heading
              as="h1"
              color="text-contrast"
              margin="mb-6"
              className="text-balance"
            >
              {panel.name}
            </Heading>

            <Paragraph
              variant="large"
              color="text-contrast-light"
              margin="mb-8"
              className="text-pretty"
            >
              {panel.description}
            </Paragraph>

            <Buttons margin="mt-0 mb-0">
              <Button
                href={cta.quote.href}
                size="medium"
                className="max-sm:w-full"
              >
                {cta.quote.label}
              </Button>
              <Button
                href={cta.call.href}
                variant="outline"
                size="medium"
                native
                icon={phoneIcon}
                iconPlacement="before"
                className="max-sm:w-full"
              >
                {cta.call.label}
              </Button>
            </Buttons>
          </div>
        </Container>
      </section>

      {/* Visual: interactive model where one exists, photography otherwise */}
      <Section className="bg-body py-16 md:py-20">
        {panel.viewerProfile ? (
          <PanelStudio profile={panel.viewerProfile} />
        ) : (
          <figure className="m-0">
            <Image
              src={panel.image.src}
              alt={panel.image.alt}
              size="large"
              rounded="rounded-none"
              aspect="aspect-[16/9]"
              lazy={false}
              className="w-full border border-accent3-dark object-cover"
            />
            <figcaption className="mt-3">
              <Span
                fontSize="text-sm"
                color="text-contrast-light"
              >
                {`${panel.name}: ${panel.bestFor.toLowerCase()}.`}
              </Span>
            </figcaption>
          </figure>
        )}
      </Section>

      {/* Specifications and attributes */}
      <Section
        id="specifications"
        className="bg-body2 py-20 md:py-28"
      >
        <div className="mb-10 max-w-3xl md:mb-12">
          <Heading as="h2">Specifications</Heading>
          <Heading as="h3">Profile Geometry and Material Options</Heading>
          <Paragraph
            color="text-contrast-light"
            margin="mb-0"
          >
            {panel.bestFor}
          </Paragraph>
        </div>

        <SpecificationList
          specs={panel.specs}
          variant="table"
        />
      </Section>

      {/* Related accessories */}
      {relatedProducts.length > 0 && (
        <Section
          id="accessories"
          className="bg-body py-20 md:py-28"
        >
          <div className="mb-10 max-w-3xl md:mb-12">
            <Heading as="h2">Goes With This Panel</Heading>
            <Heading as="h3">Related Accessories and Trim</Heading>
            <Paragraph
              color="text-contrast-light"
              margin="mb-0"
            >
              The fasteners, closures, and trim most often ordered alongside
              this profile.
            </Paragraph>
          </div>

          <Grid
            cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            gap="gap-6 lg:gap-8"
          >
            {relatedProducts.map((product) => (
              <article
                key={product.slug}
                className="group relative flex flex-col rounded-none border border-accent3-dark bg-body-light transition-shadow duration-200 hover:shadow-lg has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-dark"
              >
                {product.image && (
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
                )}
                <div className="flex flex-1 flex-col p-6">
                  <Heading
                    as="h4"
                    margin="mb-2"
                  >
                    <Link
                      href={`${
                        product.category === 'trim-and-flashing'
                          ? '/trims'
                          : '/products'
                      }#${product.slug}`}
                      className="no-underline! before:absolute before:inset-0 focus:outline-none"
                    >
                      {product.name}
                    </Link>
                  </Heading>
                  <Paragraph
                    fontSize="text-base"
                    color="text-contrast-light"
                    margin="mb-5"
                    className="flex-1"
                  >
                    {product.shortDescription}
                  </Paragraph>

                  <ArrowLink>{`View ${product.name}`}</ArrowLink>
                </div>
              </article>
            ))}
          </Grid>
        </Section>
      )}

      {/* Related panels */}
      {relatedPanels.length > 0 && (
        <Section
          id="related-panels"
          className="bg-body2 py-20 md:py-28"
        >
          <div className="mb-10 max-w-3xl md:mb-12">
            <Heading as="h2">Compare</Heading>
            <Heading
              as="h3"
              margin="mb-0"
            >{`Other ${panel.category} Profiles`}</Heading>
          </div>

          <Grid
            cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            gap="gap-6 lg:gap-8"
          >
            {relatedPanels.map((other) => (
              <PanelProfileCard
                key={other.slug}
                panel={other}
                href={`/panels/${other.slug}`}
              />
            ))}
          </Grid>
        </Section>
      )}

      <Section
        imageSrc="/panels-1.jpg"
        imageAlt=""
        overlayColor="bg-accent2/88"
        className="py-20 lg:py-28"
      >
        <Heading
          as="h3"
          color="text-overlay-text"
          margin="mb-4"
        >
          {`Ready to Price ${panel.name}?`}
        </Heading>
        <Paragraph
          variant="large"
          color="text-accent3"
          margin="mb-8"
          className="max-w-2xl text-pretty"
        >
          Send the dimensions, the substrate, and the color you are considering.
          We will confirm what the profile needs and put a material list
          together.
        </Paragraph>
        <Buttons margin="mt-0 mb-0">
          <Button
            href={cta.quote.href}
            size="medium"
            dark
          >
            {cta.quote.label}
          </Button>
          <Button
            href={cta.call.href}
            variant="outline"
            size="medium"
            dark
          >
            {cta.call.label}
          </Button>
        </Buttons>
      </Section>
    </PageWrapper>
  )
}
