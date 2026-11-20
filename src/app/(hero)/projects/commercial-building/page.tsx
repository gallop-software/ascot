import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { buildProjectStructuredData } from '@/utils/project-structured-data'
import { Content, TITLE } from './content'

const metadata: PageMetadata = {
  title: 'Commercial Building Project | Redstone, TX | Frontier Metals',
  description:
    'A two-tone commercial metal building in Redstone, Texas with a standing seam roof, a full-length accent band run from one coil batch, and custom entry-canopy trim.',
  slug: 'projects/commercial-building',
  date: '2026-05-06',
  categories: ['Commercial'],
  featuredImage: {
    url: 'https://ascot-cdn.gallop.software/images/image-5-lg.jpg',
    width: 1400,
    height: 788,
  },
  publishDate: '2026-05-06T00:00:00Z',
  modifiedDate: '2026-05-06T00:00:00Z',
  alternates: { canonical: '/projects/commercial-building' },
  openGraph: {
    type: 'article',
    image: {
      url: 'https://ascot-cdn.gallop.software/images/image-5-lg.jpg',
      width: 1400,
      height: 788,
      alt: 'Commercial metal building in Redstone, Texas clad with Frontier Metals roof and wall panels',
    },
  },
}

export const generateMetadata = () =>
  generatePageMetadata(metadata, ['projects', 'commercial-building'])

export default function Page() {
  return (
    <PageWrapper
      metadata={{
        ...metadata,
        structuredData: buildProjectStructuredData(
          metadata,
          TITLE,
          'commercial-building'
        ),
      }}
    >
      <Content />
    </PageWrapper>
  )
}
