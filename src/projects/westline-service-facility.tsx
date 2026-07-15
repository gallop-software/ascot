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

export const TITLE = 'Westline Service Facility'
const IMAGE = '/images/projects/westline-service-facility.jpg'
const IMAGE_ALT =
  'Industrial fleet service facility with metal wall panels and large equipment bay doors'

const FACTS: { label: string; value: string }[] = [
  { label: 'Category', value: 'Industrial' },
  { label: 'Location', value: 'Abilene, Texas' },
  { label: 'Building Size', value: '22,750 sq ft' },
]

const PRODUCTS = [
  'Structural framing',
  'Roof and wall panels',
  'Interior liner panels',
  'Custom formed trim',
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
        A fleet service facility in Abilene, built for a maintenance operation
        that works on heavy equipment year-round. Buildings like this get used
        hard — traffic in and out all day, equipment moving through the bays,
        walls that get bumped. The specification reflected that from the start.
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
        FS-R36 in 24 gauge on roof and walls. On a working facility this is
        where the heavier gauge earns itself back — not in any single dramatic
        way, but in a decade of doors slamming, equipment brushing past, and
        nobody being precious about the building.
      </Paragraph>

      <Paragraph>
        Inside, FS-L29 liner panels run through the service bays. The
        maintenance crew wanted a surface they could hose down rather than
        something that absorbs a decade of grease and diesel. Liner also
        brightens the bays considerably, which matters when someone is under a
        machine with a flashlight.
      </Paragraph>

      <Gallery columns={2}>
        <GalleryItem
          src="/images/projects/westline-service-facility-bays.jpg"
          alt="Service bays at the Westline facility finished with interior liner panels"
          size="medium"
        />
        <GalleryItem
          src="/images/projects/westline-service-facility-framing.jpg"
          alt="Structural steel framing erected at the Westline service facility"
          size="medium"
        />
      </Gallery>

      <Paragraph>
        The equipment bay openings are wider than standard, and where the
        framing met the existing yard wall there was no catalog trim that fit.
        Those pieces were formed to submitted dimensions on our press brake — a
        small part of the order that would have cost the crew a full day of
        improvising had it not been there.
      </Paragraph>

      <TestimonialCard
        testimonial={{
          quote:
            'The custom flashing where we tied into the old yard wall fit first time. That is not something I take for granted on a retrofit condition.',
          name: 'Daniel Mercer',
          company: 'Mercer Building Systems',
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
  title: 'Westline Service Facility | Industrial Project | ForgeSpan Metals',
  description:
    'A 22,750 sq ft fleet service facility in Abilene, Texas, supplied with structural framing, roof and wall panels, interior liner panels, and custom formed trim.',
  slug: 'projects/westline-service-facility',
  date: '2026-03-14',
  categories: ['Industrial'],
  featuredImage: '/images/projects/westline-service-facility.jpg',
  publishDate: '2026-03-14T00:00:00Z',
  modifiedDate: '2026-03-14T00:00:00Z',
  alternates: { canonical: '/projects/westline-service-facility' },
  openGraph: {
    type: 'article',
    image: {
      url: '/images/projects/westline-service-facility.jpg',
      alt: 'Industrial fleet service facility with metal wall panels and large equipment bay doors',
    },
  },
}
