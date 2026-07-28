import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Image } from '@/components/image'
import { ProjectCaseStudy } from '@/components/project-case-study'
import type { PageMetadata } from '@/utils/page-helpers'

export const TITLE = 'Metal Roof Installation'
const IMAGE = '/image-10.jpg'
const IMAGE_ALT =
  'Metal roof installation in Redstone, Texas using Frontier Metals roofing panels'

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
        A hailstorm ended the life of an old roof, and the installer needed
        replacement panels fast. We measured the existing runs, put the order on
        the roll former, and had panels cut to length and on the truck inside a
        week.
      </Paragraph>

      <Paragraph>
        Re-roofs rarely match the catalog. The existing rake and eave conditions
        didn&apos;t line up with a stock profile, so we formed trim to fit what was
        actually on the building and sent the closures and sealant that go with
        those details — the parts that decide whether wind-driven rain stays
        outside.
      </Paragraph>

      <Paragraph>
        Full-length panels meant no lap seams across the slope and very little
        scrap coming off the roof. The installer finished in two days.
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
  title: 'Metal Roof Installation | Redstone, TX | Frontier Metals',
  description:
    'A hail-damage re-roof in Redstone, Texas turned around in a week with full-length roofing panels and rake and eave trim formed to the existing roof conditions.',
  slug: 'projects/metal-roof-installation',
  date: '2026-04-15',
  categories: ['Metal Roofing'],
  featuredImage: '/image-10.jpg',
  publishDate: '2026-04-15T00:00:00Z',
  modifiedDate: '2026-04-15T00:00:00Z',
  alternates: { canonical: '/projects/metal-roof-installation' },
  openGraph: {
    type: 'article',
    image: {
      url: '/image-10.jpg',
      alt: 'Metal roof installation in Redstone, Texas using Frontier Metals roofing panels',
    },
  },
}
