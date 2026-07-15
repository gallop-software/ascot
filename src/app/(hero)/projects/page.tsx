import { PageWrapper } from '@/components/page-wrapper'
import { Section } from '@/components/section'
import { Blog } from '@/components/blog'
import { SectionHeading } from '@/components/section-heading'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { baseURL, businessId } from '@/app/metadata'

const metadata: PageMetadata = {
  title: 'Projects | Steel Buildings & Metal Roofing | ForgeSpan Metals',
  description:
    'Recent agricultural, commercial, and industrial projects supplied by ForgeSpan Metals — the panels, trim, structural components, and building packages behind each one.',
  slug: 'projects',
  focusKeyword: 'steel building projects',
  publishDate: '2026-07-15T00:00:00Z',
  modifiedDate: '2026-07-15T00:00:00Z',
  alternates: { canonical: '/projects' },
  openGraph: {
    image: {
      url: '/images/projects/completed-steel-building.jpg',
      alt: 'Completed steel building supplied by ForgeSpan Metals',
    },
  },
}

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects',
    description:
      'Case studies covering the material packages ForgeSpan Metals supplied for recent agricultural, commercial, and industrial buildings.',
    url: `${baseURL}/projects`,
    isPartOf: { '@id': businessId },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseURL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: `${baseURL}/projects`,
      },
    ],
  },
]

export const generateMetadata = () =>
  generatePageMetadata(metadata, ['projects'])

export default function Page() {
  return (
    <PageWrapper metadata={{ ...metadata, structuredData }}>
      <Section className="bg-body-light pt-40 pb-20 md:pt-52 md:pb-28 lg:pt-64">
        <Breadcrumbs
          className="mb-8"
          items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
        />

        <SectionHeading
          as="h1"
          eyebrow="Our Work"
          heading="Projects We Supplied"
          intro="Equipment shops, distribution facilities, agricultural storage, and service buildings — what was specified, why, and how each package went together."
          className="mb-12 max-w-3xl"
        />

        <Blog
          perPage={9}
          loadMoreText="Load More Projects"
        />
      </Section>
    </PageWrapper>
  )
}
