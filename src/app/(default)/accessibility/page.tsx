import { PageWrapper } from '@/components/page-wrapper'
import { LegalPlaceholder } from '@/components/legal-placeholder'
import { baseURL } from '@/app/metadata'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { company } from '@/config'

const TITLE = 'Accessibility'

const metadata: PageMetadata = {
  title: `${TITLE} | ${company.name}`,
  description: `Accessibility statement for ${company.name}.`,
  slug: 'accessibility',
  alternates: { canonical: '/accessibility' },
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
          item: `${baseURL}/accessibility`,
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
          'The conformance target you are committing to (for example WCAG 2.2 Level AA) and your current status against it',
          'Known limitations and areas still being remediated',
          'How someone reports an accessibility barrier, and your response time',
          'An alternative way to get the same information or place an order',
          'The date of the most recent accessibility review',
        ]}
      />
    </PageWrapper>
  )
}
