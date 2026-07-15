import { PageWrapper } from '@/components/page-wrapper'
import { LegalPlaceholder } from '@/components/legal-placeholder'
import { baseURL } from '@/app/metadata'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { company } from '@/config'

const TITLE = 'Terms'

const metadata: PageMetadata = {
  title: `${TITLE} | ${company.name}`,
  description: `Terms of use for ${company.name}.`,
  slug: 'terms',
  alternates: { canonical: '/terms' },
  // Unwritten placeholder — keep it out of search results until real content
  // is supplied and reviewed.
  robots: { index: false, follow: true },
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseURL },
        {
          '@type': 'ListItem',
          position: 2,
          name: TITLE,
          item: `${baseURL}/terms`,
        },
      ],
    },
  ],
}

export const generateMetadata = () => generatePageMetadata(metadata)

export default function Page() {
  return (
    <PageWrapper metadata={metadata}>
      <LegalPlaceholder
        title={TITLE}
        covers={[
          'Terms governing use of the website and its content',
          'That quotes are estimates — pricing, availability, and lead times are confirmed on a written order, not by the site',
          'Order, payment, and cancellation terms',
          'Warranty terms and their limits, and what voids them',
          'Limitation of liability and dispute resolution',
          'Intellectual property ownership of site content and imagery',
          'Governing law and jurisdiction',
        ]}
      />
    </PageWrapper>
  )
}
