import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { baseURL, businessId } from '@/app/metadata'
import { getPostSlugs } from '@/tools/get-post-slugs'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Pre-render every project at build time; reject unknown slugs.
export const dynamicParams = false

export async function generateStaticParams() {
  const { postSlugs } = await getPostSlugs()
  return postSlugs.map((post) => ({ slug: post.slug }))
}

/** Article + Breadcrumb schema for a project, built from its metadata. */
function buildStructuredData(
  metadata: PageMetadata,
  name: string,
  slug: string
): object[] {
  const url = `${baseURL}/projects/${slug}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: name,
      description: metadata.description,
      image: metadata.featuredImage,
      datePublished: metadata.date,
      dateModified: metadata.modifiedDate || metadata.date,
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
          name: 'Projects',
          item: `${baseURL}/projects`,
        },
        { '@type': 'ListItem', position: 3, name, item: url },
      ],
    },
  ]
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  try {
    const projectModule = await import(`@/projects/${slug}.tsx`)
    return generatePageMetadata(projectModule.metadata as PageMetadata, [
      'projects',
      slug,
    ])
  } catch {
    return {}
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  let projectModule
  try {
    projectModule = await import(`@/projects/${slug}.tsx`)
  } catch {
    notFound()
  }

  const Content = projectModule.default
  const metadata = projectModule.metadata as PageMetadata
  const name = (projectModule.TITLE as string) || metadata.title || ''

  return (
    <PageWrapper
      metadata={{
        ...metadata,
        structuredData: buildStructuredData(metadata, name, slug),
      }}
    >
      <Content />
    </PageWrapper>
  )
}
