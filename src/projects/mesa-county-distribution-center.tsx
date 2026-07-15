import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Image } from '@/components/image'
import { Gallery } from '@/components/gallery'
import { GalleryItem } from '@/components/gallery-item'
import { List, Li } from '@/components/list'
import { Span } from '@/components/span'
import { TestimonialCard } from '@/components/testimonial-card'
import { ProjectCaseStudy } from '@/components/project-case-study'
import type { PageMetadata } from '@/utils/page-helpers'

export const TITLE = 'Mesa County Distribution Center'
const IMAGE = '/images/projects/mesa-county-distribution-center.jpg'
const IMAGE_ALT =
  'Steel distribution warehouse with a loading dock canopy and insulated metal wall panels'

const FACTS: { label: string; value: string }[] = [
  { label: 'Category', value: 'Commercial' },
  { label: 'Location', value: 'San Angelo, Texas' },
  { label: 'Building Size', value: '38,500 sq ft' },
]

const PRODUCTS = [
  'Pre-engineered building package',
  'Insulated wall panels',
  'Standing-seam roofing',
  'Loading-canopy components',
]

function Details() {
  return (
    <>
      <Image
        src={IMAGE}
        size="large"
        wrap={true}
        alt={IMAGE_ALT}
      />

      <Paragraph>
        The largest package we supplied last spring: a clear-span distribution
        facility on the north side of San Angelo, replacing three separate
        leased units the operator had outgrown. The brief was straightforward —
        get everything under one roof, keep the dock working through a West
        Texas summer, and hold the schedule.
      </Paragraph>

      <List
        variant="unstyled"
        gap="gap-y-2"
      >
        {FACTS.map((fact) => (
          <Li key={fact.label}>
            <Span
              fontWeight="font-semibold"
              color="text-contrast"
            >
              {fact.label}:{' '}
            </Span>
            <Span color="text-contrast-light">{fact.value}</Span>
          </Li>
        ))}
      </List>

      <Heading
        as="h2"
        styleAs="h4"
        color="text-contrast"
        className="normal-case!"
      >
        Products Supplied
      </Heading>

      <List gap="gap-y-2">
        {PRODUCTS.map((product) => (
          <Li key={product}>
            <Span color="text-contrast-light">{product}</Span>
          </Li>
        ))}
      </List>

      <Paragraph>
        FS-I40 insulated wall panels carry the envelope. On a conditioned
        building this size, a panel that arrives as structure, insulation, and
        finished face in one piece removes an entire trade from the wall
        elevation and two weeks of sequencing from the schedule.
      </Paragraph>

      <Paragraph>
        The roof is FS-S16 standing seam in 24 gauge. On a low-slope roof of
        this footprint there is no argument for putting fasteners through the
        roof plane — the clips let the panel move with the temperature swing,
        and there is nothing exposed up there for anyone to come back and
        service.
      </Paragraph>

      <Gallery columns={2}>
        <GalleryItem
          src="/images/projects/mesa-county-distribution-center-dock.jpg"
          alt="Loading dock canopy and overhead door openings along the Mesa County distribution center"
          size="medium"
        />
        <GalleryItem
          src="/images/projects/mesa-county-distribution-center-roof.jpg"
          alt="Standing seam roof plane across the Mesa County distribution center"
          size="medium"
        />
      </Gallery>

      <Paragraph>
        The dock elevation runs long, and the canopy framing was detailed around
        the door spacing the operator's own equipment needed rather than a
        standard bay. Material shipped in staged loads keyed to the erector's
        sequence, so the site was never storing more steel than it had room for.
      </Paragraph>

      <TestimonialCard
        testimonial={{
          quote:
            'Staged deliveries matched our erection sequence, which on a footprint this size is not a small thing. We were never digging through bundles for the next elevation.',
          name: 'Alicia Ramirez',
          company: 'Ramirez Commercial Roofing',
        }}
        className="mt-8"
      />
    </>
  )
}

export default function Content() {
  return (
    <ProjectCaseStudy title={TITLE}>
      <Details />
    </ProjectCaseStudy>
  )
}

export function BlogContent() {
  return (
    <>
      <Heading
        as="h2"
        styleAs="h3"
        color="text-contrast"
        className="normal-case!"
      >
        {TITLE}
      </Heading>
      <Details />
    </>
  )
}

export const metadata: PageMetadata = {
  title:
    'Mesa County Distribution Center | Commercial Project | ForgeSpan Metals',
  description:
    'A 38,500 sq ft clear-span distribution facility in San Angelo, Texas, supplied with a pre-engineered building package, insulated wall panels, standing-seam roofing, and loading-canopy components.',
  slug: 'projects/mesa-county-distribution-center',
  date: '2026-05-22',
  categories: ['Commercial'],
  featuredImage: '/images/projects/mesa-county-distribution-center.jpg',
  publishDate: '2026-05-22T00:00:00Z',
  modifiedDate: '2026-05-22T00:00:00Z',
  alternates: { canonical: '/projects/mesa-county-distribution-center' },
  openGraph: {
    type: 'article',
    image: {
      url: '/images/projects/mesa-county-distribution-center.jpg',
      alt: 'Steel distribution warehouse with a loading dock canopy and insulated metal wall panels',
    },
  },
}
