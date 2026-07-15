import { PageWrapper } from '@/components/page-wrapper'
import { baseURL, businessId } from '@/app/metadata'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { INDUSTRIES } from '@/catalog'
import { company } from '@/config'

import Hero from './_blocks/hero'
import IndustriesGrid from './_blocks/industries-grid'
import Cta from './_blocks/cta'

function PageBody() {
  return (
    <>
      <Hero />
      <IndustriesGrid />
      <Cta />
    </>
  )
}

const metadata: PageMetadata = {
  title: `Industries We Serve | Metal Roofing & Steel Supply | ${company.name}`,
  description:
    'Metal panels, trim, structural components, and steel building packages for agricultural operations, contractors, industrial facilities, homebuilders, and public agencies.',
  slug: 'industries',
  focusKeyword: 'industries we serve',
  publishDate: '2026-07-15T00:00:00Z',
  modifiedDate: '2026-07-15T00:00:00Z',
  alternates: { canonical: '/industries' },
  openGraph: {
    image: {
      url: '/images/industries/industries-overview.jpg',
      alt: `Steel building materials supplied by ${company.name} on a working jobsite`,
    },
  },
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Industries We Serve',
      description:
        'The operations and trades supplied with metal panels, trim, structural components, and steel building packages.',
      url: `${baseURL}/industries`,
      about: { '@id': businessId },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: INDUSTRIES.map((industry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: industry.name,
          url: `${baseURL}/industries/${industry.slug}`,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseURL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Industries',
          item: `${baseURL}/industries`,
        },
      ],
    },
  ],
}

export const generateMetadata = () => generatePageMetadata(metadata)

export default function Page() {
  return (
    <PageWrapper metadata={metadata}>
      <PageBody />
    </PageWrapper>
  )
}
