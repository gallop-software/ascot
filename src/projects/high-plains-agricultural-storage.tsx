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

export const TITLE = 'High Plains Agricultural Storage'
const IMAGE = '/images/projects/high-plains-agricultural-storage.jpg'
const IMAGE_ALT =
  'Open-sided metal agricultural storage building holding hay bales and farm equipment'

const FACTS: { label: string; value: string }[] = [
  { label: 'Category', value: 'Agricultural' },
  { label: 'Location', value: 'Levelland, Texas' },
  { label: 'Building Size', value: '18,400 sq ft' },
]

const PRODUCTS = [
  'FS-A36 roofing and wall panels',
  'Ventilation package',
  'Framed openings',
  'Fasteners and sealants',
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
        Hay and implement storage outside Levelland, replacing an older
        structure that had been patched one winter too many. The operation
        needed the building standing before cutting started, which set the whole
        schedule and shaped most of the decisions on it.
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
        FS-A36 throughout, roof and walls, cut to length off the rafter
        dimensions so there were no horizontal laps on the roof runs. On a
        building that stores hay, a lap is a place for water to find its way in
        eventually, and removing them entirely was worth more than the small
        premium on custom lengths.
      </Paragraph>

      <Paragraph>
        Ventilation drove the rest. Stored hay gives off heat and moisture, and
        a sealed metal box over it is a poor idea. Ridge ventilation runs the
        length of the building, and the south elevation was left open for
        implement access — which conveniently doubles as intake. That
        combination was settled during planning rather than retrofitted, which
        is the only sensible time to settle it.
      </Paragraph>

      <Gallery columns={2}>
        <GalleryItem
          src="/images/projects/high-plains-agricultural-storage-ridge.jpg"
          alt="Ridge ventilation running the length of the High Plains agricultural storage building"
          size="medium"
        />
        <GalleryItem
          src="/images/projects/high-plains-agricultural-storage-open-bay.jpg"
          alt="Open-sided implement bay on the High Plains agricultural storage building"
          size="medium"
        />
      </Gallery>

      <Paragraph>
        Framed openings on the enclosed elevations were detailed to the
        equipment the operation actually runs, not to a catalog size. The
        fastener and sealant package shipped complete with the panels — on a
        rural site an hour from the nearest supplier, a missing box of closures
        costs a day.
      </Paragraph>

      <TestimonialCard
        testimonial={{
          quote:
            'Panels showed up cut to length, so there was no fighting laps on the roof. We were closed in before first cutting, which is all I asked for.',
          name: 'Wade Bennett',
          company: 'Bennett Ag Construction',
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
    'High Plains Agricultural Storage | Agricultural Project | ForgeSpan Metals',
  description:
    'An 18,400 sq ft hay and implement storage building in Levelland, Texas, supplied with FS-A36 roofing and wall panels, a ventilation package, framed openings, fasteners, and sealants.',
  slug: 'projects/high-plains-agricultural-storage',
  date: '2026-04-09',
  categories: ['Agricultural'],
  featuredImage: '/images/projects/high-plains-agricultural-storage.jpg',
  publishDate: '2026-04-09T00:00:00Z',
  modifiedDate: '2026-04-09T00:00:00Z',
  alternates: { canonical: '/projects/high-plains-agricultural-storage' },
  openGraph: {
    type: 'article',
    image: {
      url: '/images/projects/high-plains-agricultural-storage.jpg',
      alt: 'Open-sided metal agricultural storage building holding hay bales and farm equipment',
    },
  },
}
