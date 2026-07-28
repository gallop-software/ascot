import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { buildProjectStructuredData } from '@/utils/project-structured-data'
import { Content, TITLE } from './content'

const metadata: PageMetadata = {
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

export const generateMetadata = () =>
  generatePageMetadata(metadata, ['projects', 'metal-roof-installation'])

export default function Page() {
  return (
    <PageWrapper
      metadata={{
        ...metadata,
        structuredData: buildProjectStructuredData(metadata, TITLE, 'metal-roof-installation'),
      }}
    >
      <Content />
    </PageWrapper>
  )
}
