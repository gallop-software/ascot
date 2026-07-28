import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Image } from '@/components/image'
import { ProjectCaseStudy } from '@/components/project-case-study'
import type { PageMetadata } from '@/utils/page-helpers'

export const TITLE = 'Commercial Building'
const IMAGE = '/image-5.jpg'
const IMAGE_ALT =
  'Commercial metal building in Redstone, Texas clad with Frontier Metals roof and wall panels'

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
        Office up front, open work area behind, and a street-facing elevation
        the owner had to be happy looking at every morning. The architect
        specified a standing seam roof and a two-tone wall with a horizontal
        accent band running the length of the building.
      </Paragraph>

      <Paragraph>
        Accent bands are unforgiving — the eye catches a quarter inch of drift
        across a hundred feet. We ran the field panels and the band from the
        same coil batch, formed the custom entry-canopy trim to the architect&apos;s
        detail, and takeoff-checked every quantity against the plan set before
        anything hit the roll former.
      </Paragraph>

      <Paragraph>
        The band lines up corner to corner and the roof and wall colors read as
        one system. Five years in, the owner&apos;s exterior maintenance has been a
        pressure washer.
      </Paragraph>
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
  title: 'Commercial Building Project | Redstone, TX | Frontier Metals',
  description:
    'A two-tone commercial metal building in Redstone, Texas with a standing seam roof, a full-length accent band run from one coil batch, and custom entry-canopy trim.',
  slug: 'projects/commercial-building',
  date: '2026-05-06',
  categories: ['Commercial'],
  featuredImage: '/image-5.jpg',
  publishDate: '2026-05-06T00:00:00Z',
  modifiedDate: '2026-05-06T00:00:00Z',
  alternates: { canonical: '/projects/commercial-building' },
  openGraph: {
    type: 'article',
    image: {
      url: '/image-5.jpg',
      alt: 'Commercial metal building in Redstone, Texas clad with Frontier Metals roof and wall panels',
    },
  },
}
