import { notFound } from 'next/navigation'
import { PageWrapper } from '@/components/page-wrapper'
import { baseURL, businessId } from '@/app/metadata'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { RESOURCES } from '@/catalog'

import Article, { getArticleBody, getResource } from './_blocks/article'
import Cta from './_blocks/cta'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Every article is known at build time from RESOURCES; reject unknown slugs.
export const dynamicParams = false

export async function generateStaticParams() {
  return RESOURCES.map((resource) => ({ slug: resource.slug }))
}

/** Page metadata for an article, built from its RESOURCES entry. */
function buildMetadata(slug: string): PageMetadata | undefined {
  const resource = getResource(slug)
  if (!resource) return undefined

  const url = `${baseURL}/resources/${slug}`
  const image = {
    url: '/images/resources/panel-specification-sheets.jpg',
    alt: 'Panel drawings and specification sheets spread across a workbench beside sample trim pieces',
  }

  return {
    title: `${resource.title} | ForgeSpan Metals`,
    description: resource.excerpt,
    slug: `resources/${slug}`,
    date: resource.date,
    categories: [resource.category],
    featuredImage: image.url,
    publishDate: `${resource.date}T00:00:00Z`,
    modifiedDate: `${resource.date}T00:00:00Z`,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: { type: 'article', image },
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: resource.title,
        description: resource.excerpt,
        image: image.url,
        datePublished: `${resource.date}T00:00:00Z`,
        dateModified: `${resource.date}T00:00:00Z`,
        articleSection: resource.category,
        author: { '@id': businessId },
        publisher: { '@id': businessId },
        mainEntityOfPage: url,
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
          {
            '@type': 'ListItem',
            position: 3,
            name: resource.title,
            item: url,
          },
        ],
      },
    ],
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const metadata = buildMetadata(slug)
  if (!metadata) return {}
  return generatePageMetadata(metadata, ['resources', slug])
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const resource = getResource(slug)
  const body = getArticleBody(slug)
  const metadata = buildMetadata(slug)

  if (!resource || !body || !metadata) notFound()

  return (
    <PageWrapper metadata={metadata}>
      <Article
        resource={resource}
        body={body}
      />
      <Cta />
    </PageWrapper>
  )
}
