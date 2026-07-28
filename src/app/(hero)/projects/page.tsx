import { PageWrapper } from '@/components/page-wrapper'
import { Section } from '@/components/section'
import { Blog } from '@/components/blog'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { baseURL, businessId } from '@/app/metadata'
import { company } from '@/config'

const metadata: PageMetadata = {
  title: `Our Projects | Metal Buildings & Roofing in West Texas | ${company.name}`,
  description:
    'Browse recent metal building and roofing projects supplied by Frontier Metals in Redstone, Texas — equipment shops, ranch shops, commercial buildings, pole barns, and metal roof installations across West Texas.',
  slug: 'projects',
  keywords: [
    'metal building projects Texas',
    'metal roofing projects West Texas',
    'pole barn projects Redstone TX',
    'steel building case studies',
  ],
  publishDate: '2026-07-01T00:00:00Z',
  modifiedDate: '2026-07-01T00:00:00Z',
  alternates: { canonical: '/projects' },
  openGraph: {
    image: {
      url: '/image-8.jpg',
      alt: 'Metal building project supplied by Frontier Metals in Redstone, Texas',
    },
  },
}

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Our Projects',
    description:
      'Recent metal building and roofing projects supplied by Frontier Metals across West Texas.',
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
      <Section className="bg-body2 pt-40 pb-20 md:pt-52 md:pb-28 lg:pt-64">
        <div className="mb-12">
          <Heading as="h2">Our Work</Heading>
          <Heading
            as="h1"
            color="text-contrast"
            margin="mb-6"
          >
            Our Projects
          </Heading>
          <Paragraph
            color="text-contrast-light"
            margin="mb-0"
            className="max-w-2xl"
          >
            From equipment shops and pole barns to commercial buildings and
            metal roof installations, here is a look at recent projects across
            West Texas built with materials from Frontier Metals.
          </Paragraph>
        </div>
        <Blog
          perPage={9}
          loadMoreText="Load More Projects"
        />
      </Section>
    </PageWrapper>
  )
}
