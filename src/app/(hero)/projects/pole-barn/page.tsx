import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { buildProjectStructuredData } from '@/utils/project-structured-data'
import { Content, TITLE } from './content'

const metadata: PageMetadata = {
  title: 'Pole Barn Project | Redstone, TX | Frontier Metals',
  description:
    'A phased post-frame pole barn near Redstone, Texas — roof and three walls first, with the remaining walls and enclosed bays specified to match the same color run.',
  slug: 'projects/pole-barn',
  date: '2026-03-24',
  categories: ['Pole Barns'],
  featuredImage: {
    url: 'https://ascot-cdn.gallop.software/images/building-1-lg.jpg',
    width: 1400,
    height: 1050,
  },
  publishDate: '2026-03-24T00:00:00Z',
  modifiedDate: '2026-03-24T00:00:00Z',
  alternates: { canonical: '/projects/pole-barn' },
  openGraph: {
    type: 'article',
    image: {
      url: 'https://ascot-cdn.gallop.software/images/building-1-lg.jpg',
      width: 1400,
      height: 1050,
      alt: 'Pole barn near Redstone, Texas covered with Frontier Metals roofing and wall panels',
    },
  },
}

export const generateMetadata = () =>
  generatePageMetadata(metadata, ['projects', 'pole-barn'])

export default function Page() {
  return (
    <PageWrapper
      metadata={{
        ...metadata,
        structuredData: buildProjectStructuredData(
          metadata,
          TITLE,
          'pole-barn'
        ),
      }}
    >
      <Content />
    </PageWrapper>
  )
}
