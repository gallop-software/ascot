import { PageWrapper } from '@/components/page-wrapper'
import { baseURL, businessId } from '@/app/metadata'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { company } from '@/config'

import Hero from './_blocks/hero'
import Details from './_blocks/details'
import Hours from './_blocks/hours'
import Quote from './_blocks/quote'

function PageBody() {
  return (
    <>
      <Hero />
      <Details />
      <Hours />
      <Quote />
    </>
  )
}

const metadata: PageMetadata = {
  title: 'Contact Frontier Metals | Plant Location, Hours & Phone',
  description:
    'Reach Frontier Metals in Redstone, Texas: plant address, phone, email, business hours, and the regions we deliver to. Send us your project and we will price the material.',
  slug: 'contact',
  focusKeyword: 'contact Frontier Metals',
  publishDate: '2026-07-15T00:00:00Z',
  modifiedDate: '2026-07-15T00:00:00Z',
  alternates: { canonical: '/contact' },
  openGraph: {
    image: {
      url: '/logo.png',
      alt: `${company.name} logo`,
    },
  },
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: `Contact ${company.name}`,
      description:
        'Plant location, phone, email, business hours, and service area for Frontier Metals.',
      url: `${baseURL}/contact`,
      // The business entity itself is emitted site-wide in @/app/metadata,
      // reference it by @id rather than redefining address, hours, or phone.
      mainEntity: { '@id': businessId },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseURL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact',
          item: `${baseURL}/contact`,
        },
      ],
    },
  ],
}

export const generateMetadata = () => generatePageMetadata(metadata, ['contact'])

export default function Page() {
  return (
    <PageWrapper metadata={metadata}>
      <PageBody />
    </PageWrapper>
  )
}
