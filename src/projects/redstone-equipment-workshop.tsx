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

export const TITLE = 'Redstone Equipment Workshop'
const IMAGE = '/images/projects/redstone-equipment-workshop.jpg'
const IMAGE_ALT =
  'Steel equipment workshop with overhead doors and a wainscot color band in Redstone, Texas'

const FACTS: { label: string; value: string }[] = [
  { label: 'Category', value: 'Agricultural' },
  { label: 'Location', value: 'Redstone, Texas' },
  { label: 'Building Size', value: '12,000 sq ft' },
]

const PRODUCTS = [
  'FS-R36 roofing panels',
  'FS-U36 wall panels',
  'Custom trim package',
  'Structural framing components',
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
        A working equipment shop on the edge of Redstone, built to get four
        pieces of machinery under cover and give the crew somewhere to service
        them without driving forty minutes into town. The owner had the slab
        poured and a clear idea of the door sizes; the rest came together over a
        couple of conversations at our counter.
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
        FS-R36 went on the roof at 26 gauge — the purlin spacing on the frame
        made that the sensible call, and the owner wanted a roof he could walk
        on during installation without thinking about it. Walls are FS-U36,
        whose closer rib spacing keeps a long elevation looking tidy from the
        county road it faces.
      </Paragraph>

      <Paragraph>
        The trim package took the most work. Two of the overhead door openings
        sit close enough to a corner that standard jamb trim would have left a
        gap, so we formed those pieces to the dimensions on the framing drawings
        rather than asking the crew to improvise on site. The wainscot band was
        a late addition and cost very little once the trim was already being
        run.
      </Paragraph>

      <Gallery columns={2}>
        <GalleryItem
          src="/images/projects/redstone-equipment-workshop-interior.jpg"
          alt="Interior of the Redstone equipment workshop showing exposed framing and open service bays"
          size="medium"
        />
        <GalleryItem
          src="/images/projects/redstone-equipment-workshop-doors.jpg"
          alt="Overhead door openings and custom formed jamb trim on the Redstone equipment workshop"
          size="medium"
        />
      </Gallery>

      <Paragraph>
        Materials went out bundled by elevation and labeled, which on a
        four-person crew with no lift on site is the difference between a good
        week and a frustrating one. The building has been in daily use since it
        closed in.
      </Paragraph>

      <TestimonialCard
        testimonial={{
          quote:
            'They caught two door trim conditions I had not thought about and formed the pieces before the order shipped. Nothing stopped on site waiting for parts.',
          name: 'Curtis Vance',
          company: 'Vance Land & Equipment',
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
    'Redstone Equipment Workshop | Agricultural Project | ForgeSpan Metals',
  description:
    'A 12,000 sq ft agricultural equipment workshop in Redstone, Texas, supplied with FS-R36 roofing, FS-U36 wall panels, a custom trim package, and structural framing components.',
  slug: 'projects/redstone-equipment-workshop',
  date: '2026-06-18',
  categories: ['Agricultural'],
  featuredImage: '/images/projects/redstone-equipment-workshop.jpg',
  publishDate: '2026-06-18T00:00:00Z',
  modifiedDate: '2026-06-18T00:00:00Z',
  alternates: { canonical: '/projects/redstone-equipment-workshop' },
  openGraph: {
    type: 'article',
    image: {
      url: '/images/projects/redstone-equipment-workshop.jpg',
      alt: 'Steel equipment workshop with overhead doors and a wainscot color band in Redstone, Texas',
    },
  },
}
