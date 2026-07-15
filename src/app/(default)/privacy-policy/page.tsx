import { PageWrapper } from '@/components/page-wrapper'
import { LegalPlaceholder } from '@/components/legal-placeholder'
import { baseURL } from '@/app/metadata'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { company } from '@/config'

const TITLE = 'Privacy Policy'

const metadata: PageMetadata = {
  title: `${TITLE} | ${company.name}`,
  description: `Privacy policy for ${company.name}.`,
  slug: 'privacy-policy',
  alternates: { canonical: '/privacy-policy' },
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
          item: `${baseURL}/privacy-policy`,
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
          'What personal information the quote form and analytics collect',
          'How submitted plans, measurements, and files are stored and retained',
          'Which third parties receive data (email delivery, analytics, spam protection, any AI assistant provider)',
          'Cookie and tracking disclosure, and how to opt out',
          'How to request access to or deletion of your information',
          'Applicable jurisdiction and the contact address for privacy requests',
        ]}
      />
    </PageWrapper>
  )
}
