import { notFound } from 'next/navigation'
import Link from 'next/link'
import fileTextIcon from '@iconify/icons-lucide/file-text'
import phoneIcon from '@iconify/icons-lucide/phone'
import { PageWrapper } from '@/components/page-wrapper'
import { Container } from '@/components/container'
import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SectionHeading } from '@/components/section-heading'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { List, Li } from '@/components/list'
import { Image } from '@/components/image'
import { Icon } from '@/components/icon'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { SpecificationList } from '@/components/specification-list'
import { PanelProfileCard } from '@/components/panel-profile-card'
import { CTASection } from '@/components/cta-section'
import { PanelStudio } from '@/components/panel-viewer/studio'
import { PANEL_PROFILES, getProduct, type PanelProfile, type Spec } from '@/catalog'
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

/**
 * Testing, certification, and warranty terms are template placeholders — a
 * customer fills these in from their own documentation. They are rendered as
 * visibly unset fields rather than plausible-looking values, and they are
 * deliberately kept out of the Product schema so nothing unverified is
 * published as a machine-readable claim.
 */
const PLACEHOLDER_VALUE = 'Not configured — add your project documentation'

const COMPLIANCE_PLACEHOLDERS: Spec[] = [
  { label: 'Testing Data', value: PLACEHOLDER_VALUE },
  { label: 'Certifications', value: PLACEHOLDER_VALUE },
  { label: 'Code Approvals', value: PLACEHOLDER_VALUE },
  { label: 'Finish Warranty', value: PLACEHOLDER_VALUE },
  { label: 'Panel Warranty', value: PLACEHOLDER_VALUE },
]

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
      // Only measured geometry from the catalog — never the compliance
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
    title: `${panel.name} — Specs and Applications | ${company.name}`,
    description: panel.shortDescription,
    slug: `panels/${profile}`,
    keywords: [
      panel.name,
      `${panel.category.toLowerCase()} panel`,
      ...panel.applications.map((application) => `${application.toLowerCase()} panel`),
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

/** Bulleted attribute list — applications, substrates, gauges, finishes. */
function AttributeList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <Heading
        as="h3"
        fontFamily="font-heading2"
        fontSize="text-sm"
        fontWeight="font-semibold"
        color="text-accent-dark"
        margin="mb-3"
        className="uppercase tracking-[0.16em]"
      >
        {title}
      </Heading>
      <List
        variant="unstyled"
        margin="mb-0"
        gap="gap-y-2"
      >
        {items.map((item) => (
          <Li
            key={item}
            className="border-b border-accent3-dark pb-2"
          >
            <Span
              fontSize="text-base"
              color="text-contrast"
            >
              {item}
            </Span>
          </Li>
        ))}
      </List>
    </div>
  )
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
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-body2 via-body2/92 to-body2/60" />

        <Container className="relative pt-40 pb-20 md:pt-40 md:pb-28 lg:pt-64 lg:pb-36">
          <Breadcrumbs
            className="mb-8"
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Panel Profiles', href: '/panels' },
              { label: panel.name },
            ]}
          />

          <div className="max-w-3xl border-l-2 border-accent pl-6 sm:pl-8">
            <Span
              fontFamily="font-heading2"
              fontSize="text-sm"
              fontWeight="font-semibold"
              color="text-accent"
              margin="mb-4"
              className="uppercase tracking-[0.2em]"
            >
              {panel.category}
            </Span>

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

      {/* Visual — interactive model where one exists, photography otherwise */}
      <Section className="bg-body py-16 md:py-20">
        {panel.viewerProfile ? (
          <PanelStudio
            profile={panel.viewerProfile}
            specs={panel.specs}
          />
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
                {`${panel.name} — ${panel.bestFor.toLowerCase()}.`}
              </Span>
            </figcaption>
          </figure>
        )}
      </Section>

      {/* Specifications and attributes */}
      <Section
        id="specifications"
        className="bg-accent3 py-20 md:py-28"
      >
        <SectionHeading
          eyebrow="Specifications"
          heading="Profile Geometry and Material Options"
          intro={panel.bestFor}
          className="mb-10 max-w-3xl md:mb-12"
        />

        <SpecificationList
          specs={panel.specs}
          variant="table"
          className="mb-12 border border-accent3-dark bg-body-light"
        />

        <Grid
          cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          gap="gap-8 lg:gap-10"
          className="mb-12"
        >
          <AttributeList
            title="Applications"
            items={panel.applications}
          />
          <AttributeList
            title="Recommended Substrates"
            items={panel.substrates}
          />
          <AttributeList
            title="Available Gauges"
            items={panel.gauges}
          />
          <AttributeList
            title="Available Finishes"
            items={panel.finishes}
          />
        </Grid>

        <div className="border-l-2 border-accent bg-body-light p-6">
          <Heading
            as="h3"
            fontFamily="font-heading2"
            fontSize="text-sm"
            fontWeight="font-semibold"
            color="text-accent-dark"
            margin="mb-2"
            className="uppercase tracking-[0.16em]"
          >
            Fasteners
          </Heading>
          <Paragraph
            fontSize="text-base"
            color="text-contrast"
            margin="mb-0"
            className="max-w-3xl"
          >
            {panel.fastenerNote}
          </Paragraph>
        </div>
      </Section>

      {/* Compliance placeholders + documents */}
      <Section
        id="documentation"
        className="bg-body py-20 md:py-28"
      >
        <Grid
          cols="grid-cols-1 lg:grid-cols-2"
          gap="gap-12 lg:gap-16"
        >
          <div>
            <SectionHeading
              eyebrow="Template Placeholders"
              heading="Testing, Certification, and Warranty"
              intro="These fields ship unset. ForgeSpan Metals is a fictional demonstration company, so no testing results, certifications, code approvals, or warranty terms are claimed here. Replace each value with your own documentation before publishing."
              className="mb-8 max-w-xl"
            />
            <SpecificationList
              specs={COMPLIANCE_PLACEHOLDERS}
              variant="list"
            />
          </div>

          <div>
            <SectionHeading
              eyebrow="Downloads"
              heading="Spec Sheet and Installation Guide"
              intro="Both links below are placeholders pointing at a sample file. Point them at your real documents when you configure the template."
              className="mb-8 max-w-xl"
            />

            <List
              variant="unstyled"
              margin="mb-8"
              gap="gap-y-3"
            >
              <Li>
                <Link
                  href="/placeholder.pdf"
                  className="flex items-center gap-x-3 border border-accent3-dark bg-body-light p-4 no-underline! transition-colors duration-200 hover:border-accent4"
                >
                  <Icon
                    icon={fileTextIcon}
                    className="h-5 w-5 flex-none text-accent-dark"
                  />
                  <Span
                    fontSize="text-base"
                    fontWeight="font-semibold"
                    color="text-contrast"
                  >
                    {`${panel.name} Spec Sheet (PDF) — placeholder link`}
                  </Span>
                </Link>
              </Li>
              <Li>
                <Link
                  href="/placeholder.pdf"
                  className="flex items-center gap-x-3 border border-accent3-dark bg-body-light p-4 no-underline! transition-colors duration-200 hover:border-accent4"
                >
                  <Icon
                    icon={fileTextIcon}
                    className="h-5 w-5 flex-none text-accent-dark"
                  />
                  <Span
                    fontSize="text-base"
                    fontWeight="font-semibold"
                    color="text-contrast"
                  >
                    {`${panel.name} Installation Guide (PDF) — placeholder link`}
                  </Span>
                </Link>
              </Li>
            </List>

            <Buttons margin="mt-0 mb-0">
              <Button
                href={cta.quote.href}
                size="medium"
                className="max-sm:w-full"
              >
                {`Request a Quote on ${panel.name}`}
              </Button>
            </Buttons>
          </div>
        </Grid>
      </Section>

      {/* Related accessories */}
      {relatedProducts.length > 0 && (
        <Section
          id="accessories"
          className="bg-accent3 py-20 md:py-28"
        >
          <SectionHeading
            eyebrow="Goes With This Panel"
            heading="Related Accessories and Trim"
            intro="The fasteners, closures, and trim most often ordered alongside this profile."
            className="mb-10 max-w-3xl md:mb-12"
          />

          <Grid
            cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            gap="gap-6 lg:gap-8"
          >
            {relatedProducts.map((product) => (
              <article
                key={product.slug}
                className="group relative flex flex-col rounded-none border border-accent3-dark bg-body-light transition-colors duration-200 hover:border-accent4"
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
                    lineHeight="leading-tight"
                    color="text-contrast"
                    margin="mb-2"
                  >
                    <Link
                      href={`/products/${product.category}#${product.slug}`}
                      className="no-underline! before:absolute before:inset-0 focus:outline-none"
                    >
                      {product.name}
                    </Link>
                  </Heading>
                  <Paragraph
                    fontSize="text-base"
                    color="text-contrast-light"
                    margin="mb-0"
                  >
                    {product.shortDescription}
                  </Paragraph>
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
          className="bg-body py-20 md:py-28"
        >
          <SectionHeading
            eyebrow="Compare"
            heading={`Other ${panel.category} Profiles`}
            className="mb-10 max-w-3xl md:mb-12"
          />

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

      <CTASection
        heading={`Ready to Price ${panel.name}?`}
        body="Send the dimensions, the substrate, and the color you are considering. We will confirm what the profile needs and put a material list together."
        primaryCta={cta.quote}
        secondaryCta={cta.call}
        image={{ src: panel.image.src, alt: '' }}
      />
    </PageWrapper>
  )
}
