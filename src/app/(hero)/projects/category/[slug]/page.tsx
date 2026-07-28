import { BlogClient } from '@/components/blog/blog-client'
import { Heading } from '@/components/heading'
import { PageWrapper } from '@/components/page-wrapper'
import { Section } from '@/components/section'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { getSlug } from '@/tools/get-slug'
import { getTitle } from '@/tools/get-title'
import { getCategorySlugs } from '@/tools/get-category-slugs'
import { company } from '@/config'
import blogData from '@/data/_blog.json'
import { DateTime } from 'luxon'

interface PageProps {
  params: Promise<{
    slug?: string
  }>
}

interface BlogPost {
  slug: string
  metadata: {
    title?: string
    date?: string
    categories?: string[]
    featuredImage?: string
  }
}

function toCategoryArray(value?: string | string[]) {
  if (!value) return []
  if (Array.isArray(value)) return value
  return value
    .split(/[,|/]/)
    .map((s: string) => s.trim())
    .filter(Boolean)
}

// Only the categories that actually have projects are real pages; anything
// else 404s rather than rendering an empty grid at a 200.
export const dynamicParams = false

export async function generateStaticParams() {
  const { categorySlugs } = await getCategorySlugs()
  return categorySlugs.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const category = slug ? decodeURIComponent(slug) : ''
  const categoryTitle = getTitle(category).replace(/\b\w/g, (c) =>
    c.toUpperCase()
  )

  const metadata: PageMetadata = {
    title: categoryTitle
      ? `${categoryTitle} Projects | ${company.name}`
      : `Our Projects | ${company.name}`,
    description: categoryTitle
      ? `Browse ${categoryTitle.toLowerCase()} projects supplied by ${company.name} across West Texas.`
      : `Browse all projects supplied by ${company.name} across West Texas.`,
    slug: `projects/category/${slug}`,
    alternates: { canonical: `/projects/category/${slug}` },
  }

  return generatePageMetadata(metadata, ['projects', 'category', slug || ''])
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const category = slug ? decodeURIComponent(slug) : ''

  // Generated at build time and bundled via the @/data alias — there is no
  // filesystem on the Workers runtime, so never read _blog.json with fs.
  const posts = blogData as BlogPost[]

  const allPosts = (
    category
      ? posts.filter((post) =>
          toCategoryArray(post.metadata.categories)
            .map(getSlug)
            .includes(getSlug(category))
        )
      : [...posts]
  ).sort(
    (a, b) =>
      (DateTime.fromISO(b.metadata.date || '').toMillis() || 0) -
      (DateTime.fromISO(a.metadata.date || '').toMillis() || 0)
  )

  const metadata: PageMetadata = {
    title: getTitle(category)
      ? `${getTitle(category)} Projects | ${company.name}`
      : `Our Projects | ${company.name}`,
  }

  return (
    <PageWrapper metadata={metadata}>
      <Section className="bg-body2 pt-40 pb-20 md:pt-52 md:pb-28 lg:pt-64">
        <div className="mb-12">
          <Heading as="h2">Our Work</Heading>
          <Heading
            as="h1"
            color="text-contrast"
            margin="mb-0"
            className="capitalize"
          >
            {getTitle(category) || 'Projects'}
          </Heading>
        </div>
        <BlogClient
          allPosts={allPosts}
          perPage={9}
          loadMoreText="Load More Projects"
        />
      </Section>
    </PageWrapper>
  )
}
