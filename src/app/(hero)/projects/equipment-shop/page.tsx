import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { buildProjectStructuredData } from '@/utils/project-structured-data'
import { Content, TITLE } from './content'

const metadata: PageMetadata = {
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

export const generateMetadata = () =>
  generatePageMetadata(metadata, ['projects', 'equipment-shop'])

export default function Page() {
  return (
    <PageWrapper
      metadata={{
        ...metadata,
        structuredData: buildProjectStructuredData(metadata, TITLE, 'equipment-shop'),
      }}
    >
      <Content />
    </PageWrapper>
  )
}
