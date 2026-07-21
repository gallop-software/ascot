import { PageWrapper } from '@/components/page-wrapper'
import { baseURL, businessId } from '@/app/metadata'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { company } from '@/config'

import Hero from './_blocks/hero'
import Story from './_blocks/story'
import Values from './_blocks/values'
import Timeline from './_blocks/timeline'
import Stats from './_blocks/stats'
import Cta from './_blocks/cta'

function PageBody() {
  return (
    <>
      <Hero />
      <Story />
      <Values />
      <Timeline />
      <Stats />
      <Cta />
    </>
  )
}

const metadata: PageMetadata = {
  title: `About Frontier Metals | Steel Manufacturing Since ${company.founded}`,
  description:
    'Frontier Metals has manufactured metal roofing, wall panels, trim, and structural components since 1998, supporting construction across West Texas and neighboring regions.',
  slug: 'about',
  focusKeyword: 'about Frontier Metals',
  publishDate: '2026-07-15T00:00:00Z',
  modifiedDate: '2026-07-15T00:00:00Z',
  alternates: { canonical: '/about' },
  openGraph: {
    image: {
      url: '/logo.png',
      alt: `${company.name} logo`,
    },
  },
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: `About ${company.name}`,
      description:
        'The history, values, and manufacturing capabilities of Frontier Metals.',
      url: `${baseURL}/about`,
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
          name: 'About',
          item: `${baseURL}/about`,
        },
      ],
    },
  ],
}

export const generateMetadata = () => generatePageMetadata(metadata, ['about'])

export default function Page() {
  return (
    <PageWrapper metadata={metadata}>
      <PageBody />
    </PageWrapper>
  )
}
