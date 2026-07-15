import { BlogClient } from '@/components/blog/blog-client'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { PageWrapper } from '@/components/page-wrapper'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { company } from '@/config'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { getSlug } from '@/tools/get-slug'
import { getTitle } from '@/tools/get-title'
import { getCategorySlugs } from '@/tools/get-category-slugs'
import { DateTime } from 'luxon'
import fs from 'fs'
import path from 'path'

interface PageProps {
  params: Promise<{
    slug?: string
  }>
}

function toCategoryArray(value?: string | string[]) {
  if (!value) return []
  if (Array.isArray(value)) return value
  return value
    .split(/[,\|/]/)
    .map((s: string) => s.trim())
    .filter(Boolean)
}

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
      : `Projects | ${company.name}`,
    description: categoryTitle
      ? `${categoryTitle} projects supplied by ${company.name} — the panels, trim, structural components, and building packages behind each one.`
      : `Projects supplied by ${company.name} — the panels, trim, structural components, and building packages behind each one.`,
    slug: `projects/category/${slug}`,
    alternates: { canonical: `/projects/category/${slug}` },
  }

  return generatePageMetadata(metadata, ['projects', 'category', slug || ''])
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const category = slug ? decodeURIComponent(slug) : ''

  // Load and filter posts from static JSON file
  let allPosts: {
    slug: string
    metadata: { categories?: string[]; date?: string }
  }[] = []
  try {
    const metadataPath = path.join(process.cwd(), '_data/_blog.json')
    if (fs.existsSync(metadataPath)) {
      const fileContent = fs.readFileSync(metadataPath, 'utf8')
      const posts = JSON.parse(fileContent)

      // Filter by category on server
      allPosts = category
        ? posts.filter((post: (typeof allPosts)[number]) =>
            toCategoryArray(post.metadata.categories)
              .map(getSlug)
              .includes(getSlug(category))
          )
        : posts

      // Sort by date desc (newest first)
      allPosts.sort(
        (a, b) =>
          (DateTime.fromISO(b.metadata.date || '').toMillis() || 0) -
          (DateTime.fromISO(a.metadata.date || '').toMillis() || 0)
      )
    }
  } catch (error) {
    console.error('Failed to read blog metadata:', error)
  }

  const categoryTitle = getTitle(category)

  const metadata: PageMetadata = {
    title: categoryTitle
      ? `${categoryTitle} Projects | ${company.name}`
      : `Projects | ${company.name}`,
  }

  return (
    <PageWrapper metadata={metadata}>
      <Section className="bg-body-light pt-40 pb-20 md:pt-52 md:pb-28 lg:pt-64">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: categoryTitle || 'Projects' },
          ]}
        />

        <SectionHeading
          as="h1"
          eyebrow="Our Work"
          heading={categoryTitle ? `${categoryTitle} Projects` : 'All Projects'}
          className="mb-12 max-w-3xl capitalize"
        />
        <BlogClient
          allPosts={allPosts}
          perPage={9}
          loadMoreText="Load More Projects"
        />
      </Section>
    </PageWrapper>
  )
}
