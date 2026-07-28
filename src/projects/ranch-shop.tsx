import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Image } from '@/components/image'
import { ProjectCaseStudy } from '@/components/project-case-study'
import type { PageMetadata } from '@/utils/page-helpers'

export const TITLE = 'Ranch Shop'
const IMAGE = '/image-4.jpg'
const IMAGE_ALT =
  'Ranch shop near Redstone, Texas finished with Frontier Metals roofing and wall panels'

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
        The owners of a working ranch west of Redstone wanted one building that
        could do three jobs: trailer storage, a welding bay, and a place to work
        on equipment through the winter. They came to us with a sketch and a
        budget rather than a plan set.
      </Paragraph>

      <Paragraph>
        Open ground here means constant wind and blowing grit, so we walked them
        up to a heavier gauge on the walls and a finish rated for the exposure,
        then held the line on cost by keeping the color palette to two runs. The
        wainscot, corners, and openings all came off the same production run, so
        the finish matches across the building rather than close-enough.
      </Paragraph>

      <Paragraph>
        Everything left our floor together — panels, trim, closures, fasteners —
        and the crew set it without a single back-order call.
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
  title: 'Ranch Shop Project | Redstone, TX | Frontier Metals',
  description:
    'A three-purpose ranch shop west of Redstone, Texas, specified from a sketch and built with heavier-gauge wall panels, matched trim, and fasteners from our floor.',
  slug: 'projects/ranch-shop',
  date: '2026-05-27',
  categories: ['Shops'],
  featuredImage: '/image-4.jpg',
  publishDate: '2026-05-27T00:00:00Z',
  modifiedDate: '2026-05-27T00:00:00Z',
  alternates: { canonical: '/projects/ranch-shop' },
  openGraph: {
    type: 'article',
    image: {
      url: '/image-4.jpg',
      alt: 'Ranch shop near Redstone, Texas finished with Frontier Metals roofing and wall panels',
    },
  },
}
