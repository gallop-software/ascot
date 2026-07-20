import { PageWrapper } from '@/components/page-wrapper'
import { baseURL } from '@/app/metadata'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { company, seo } from '@/config'

import Hero from './_blocks/hero'
import TrustBar from './_blocks/trust-bar'
import Products from './_blocks/products'
import Panels from './_blocks/panels'
import Buildings from './_blocks/buildings'
import Process from './_blocks/process'
import Testimonials from './_blocks/testimonials'
import Cta from './_blocks/cta'
import QuoteForm from './_blocks/quote-form'

function Content() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Products />
      <Panels />
      <Buildings />
      <Process />
      <Testimonials />
      <Cta />
      <QuoteForm />
    </>
  )
}

const OG_IMAGE = {
  url: '/placeholder.png',
  alt: 'Stacked metal roofing panels and steel building components manufactured by Frontier Metals',
}

const metadata: PageMetadata = {
  title: seo.defaultTitle,
  description: seo.defaultDescription,
  keywords: [
    'metal roofing panels',
    'steel wall panels',
    'standing seam roofing',
    'structural steel components',
    'metal building packages',
    'trim',
    'steel building supplier',
  ],
  publishDate: '2024-01-01T00:00:00Z',
  modifiedDate: '2026-07-15T00:00:00Z',
  alternates: {
    canonical: '/',
  },
  authors: [{ name: company.name }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseURL}/`,
    siteName: seo.siteName,
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    image: OG_IMAGE,
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    image: OG_IMAGE.url,
  },
  category: seo.category,
  applicationName: company.name,
  // Organization / WebSite / LocalBusiness schema is emitted site-wide from
  // src/app/metadata.tsx — only the page-level breadcrumb belongs here.
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseURL,
        },
      ],
    },
  ],
}

export const generateMetadata = () => generatePageMetadata(metadata)

export default function Page() {
  return (
    <PageWrapper metadata={metadata}>
      <Content />
    </PageWrapper>
  )
}
