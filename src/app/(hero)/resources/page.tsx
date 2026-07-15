import { PageWrapper } from '@/components/page-wrapper'
import { baseURL, businessId } from '@/app/metadata'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { RESOURCES } from '@/catalog'

import Hero from './_blocks/hero'
import Articles from './_blocks/articles'
import Faq, { FAQS } from './_blocks/faq'
import Warranty from './_blocks/warranty'
import Cta from './_blocks/cta'

function PageBody() {
  return (
    <>
      <Hero />
      <Articles />
      <Faq />
      <Warranty />
      <Cta />
    </>
  )
}

const metadata: PageMetadata = {
  title: 'Metal Building Resources, Guides & FAQ | ForgeSpan Metals',
  description:
    'Guides on panel selection, gauges, measuring for metal roofing, and finishes — plus answers to the questions ForgeSpan Metals is asked most often.',
  slug: 'resources',
  focusKeyword: 'metal roofing resources',
  publishDate: '2026-07-15T00:00:00Z',
  modifiedDate: '2026-07-15T00:00:00Z',
  alternates: { canonical: '/resources' },
  openGraph: {
    image: {
      url: '/images/resources/panel-specification-sheets.jpg',
      alt: 'Panel drawings and specification sheets spread across a workbench beside sample trim pieces',
    },
  },
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Resources',
      description:
        'Guides, specifications, and frequently asked questions about metal panels and steel buildings.',
      url: `${baseURL}/resources`,
      about: { '@id': businessId },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: RESOURCES.map((resource, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: resource.title,
          url: `${baseURL}${resource.href}`,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      // Built from the same FAQS array the section renders, so the schema can
      // never drift from the answers a visitor actually sees.
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseURL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Resources',
          item: `${baseURL}/resources`,
        },
      ],
    },
  ],
}

export const generateMetadata = () =>
  generatePageMetadata(metadata, ['resources'])

export default function Page() {
  return (
    <PageWrapper metadata={metadata}>
      <PageBody />
    </PageWrapper>
  )
}
