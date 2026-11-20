import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { buildProjectStructuredData } from '@/utils/project-structured-data'
import { Content, TITLE } from './content'

const metadata: PageMetadata = {
  title: 'Ranch Shop Project | Redstone, TX | Frontier Metals',
  description:
    'A three-purpose ranch shop west of Redstone, Texas, specified from a sketch and built with heavier-gauge wall panels, matched trim, and fasteners from our floor.',
  slug: 'projects/ranch-shop',
  date: '2026-05-27',
  categories: ['Shops'],
  featuredImage: {
    url: 'https://ascot-cdn.gallop.software/images/image-4-lg.jpg',
    width: 1400,
    height: 788,
  },
  publishDate: '2026-05-27T00:00:00Z',
  modifiedDate: '2026-05-27T00:00:00Z',
  alternates: { canonical: '/projects/ranch-shop' },
  openGraph: {
    type: 'article',
    image: {
      url: 'https://ascot-cdn.gallop.software/images/image-4-lg.jpg',
      width: 1400,
      height: 788,
      alt: 'Ranch shop near Redstone, Texas finished with Frontier Metals roofing and wall panels',
    },
  },
}

export const generateMetadata = () =>
  generatePageMetadata(metadata, ['projects', 'ranch-shop'])

export default function Page() {
  return (
    <PageWrapper
      metadata={{
        ...metadata,
        structuredData: buildProjectStructuredData(
          metadata,
          TITLE,
          'ranch-shop'
        ),
      }}
    >
      <Content />
    </PageWrapper>
  )
}
