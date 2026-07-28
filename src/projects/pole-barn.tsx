import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Image } from '@/components/image'
import { ProjectCaseStudy } from '@/components/project-case-study'
import type { PageMetadata } from '@/utils/page-helpers'

export const TITLE = 'Pole Barn'
const IMAGE = '/building-1.jpg'
const IMAGE_ALT =
  'Pole barn near Redstone, Texas covered with Frontier Metals roofing and wall panels'

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
        A family operation near Redstone needed hay and trailer cover on a
        budget that wouldn&apos;t stretch to an enclosed shop. Post-frame gave them
        the square footage; the panel package decides how long that cover
        actually lasts.
      </Paragraph>

      <Paragraph>
        We built the order in two phases on purpose. Phase one covered the roof
        and three walls so they could get hay under cover before cutting. Phase
        two, the fourth wall and a set of enclosed bays, is already priced and
        specified — same profile, same color run, so it will match when they&apos;re
        ready.
      </Paragraph>

      <Paragraph>
        Phasing let them spend against the season instead of all at once, and it
        keeps the finished building looking like one project rather than two.
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
  title: 'Pole Barn Project | Redstone, TX | Frontier Metals',
  description:
    'A phased post-frame pole barn near Redstone, Texas — roof and three walls first, with the remaining walls and enclosed bays specified to match the same color run.',
  slug: 'projects/pole-barn',
  date: '2026-03-24',
  categories: ['Pole Barns'],
  featuredImage: '/building-1.jpg',
  publishDate: '2026-03-24T00:00:00Z',
  modifiedDate: '2026-03-24T00:00:00Z',
  alternates: { canonical: '/projects/pole-barn' },
  openGraph: {
    type: 'article',
    image: {
      url: '/building-1.jpg',
      alt: 'Pole barn near Redstone, Texas covered with Frontier Metals roofing and wall panels',
    },
  },
}
