import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Image } from '@/components/image'
import { ProjectCaseStudy } from '@/components/project-case-study'
import type { PageMetadata } from '@/utils/page-helpers'

export const TITLE = 'Equipment Shop'
const IMAGE = '/image-8.jpg'
const IMAGE_ALT =
  'Steel equipment shop in Redstone, Texas built with Frontier Metals panels and trim'

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
        A contractor came to us with a 60&nbsp;× 100 equipment shop and a tight
        window between concrete and first freeze. We roll-formed the roof and
        wall panels to length in Redstone and shipped them with the trim,
        closures, and fasteners on a single load.
      </Paragraph>

      <Paragraph>
        Cutting to exact length is what makes a building this size go up fast —
        no field seams across the roof, no cut-off pile behind the shop, and one
        set of run numbers the crew could work straight off of. The wainscot
        break was set in the panel order rather than trimmed in later.
      </Paragraph>

      <Paragraph>
        The shop went dry a week ahead of schedule. It gives the operation a
        column-free bay deep enough to pull equipment fully inside, with an
        exterior that asks for nothing beyond an occasional wash.
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
  title: 'Equipment Shop Project | Redstone, TX | Frontier Metals',
  description:
    'A 60 x 100 equipment shop near Redstone, Texas, with roof and wall panels cut to length in our shop and delivered with trim, closures, and fasteners on one load.',
  slug: 'projects/equipment-shop',
  date: '2026-06-18',
  categories: ['Shops'],
  featuredImage: '/image-8.jpg',
  publishDate: '2026-06-18T00:00:00Z',
  modifiedDate: '2026-06-18T00:00:00Z',
  alternates: { canonical: '/projects/equipment-shop' },
  openGraph: {
    type: 'article',
    image: {
      url: '/image-8.jpg',
      alt: 'Steel equipment shop in Redstone, Texas built with Frontier Metals panels and trim',
    },
  },
}
