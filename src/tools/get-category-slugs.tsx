import { getSlug } from '@/tools/get-slug'
import blogData from '@/data/_blog.json'

type CategorySlug = {
  slug: string
  uri: string
  /** ISO date of the newest post in this category (for sitemap lastModified). */
  lastModified: string
}

type BlogPost = {
  slug: string
  metadata: {
    categories?: string[]
    date?: string
  }
}

export async function getCategorySlugs(): Promise<{
  categorySlugs: CategorySlug[]
}> {
  // slug -> newest post date in that category
  const latestBySlug = new Map<string, string>()

  for (const post of blogData as BlogPost[]) {
    if (!Array.isArray(post.metadata.categories)) continue
    const date = post.metadata.date || ''
    for (const category of post.metadata.categories) {
      if (typeof category !== 'string' || !category.trim()) continue
      const slug = getSlug(category.trim())
      if (!slug) continue
      const prev = latestBySlug.get(slug)
      if (prev === undefined || (date && date > prev)) {
        latestBySlug.set(slug, date)
      }
    }
  }

  const categorySlugs: CategorySlug[] = Array.from(latestBySlug.keys())
    .sort((a, b) => a.localeCompare(b))
    .map((slug) => ({
      slug,
      uri: `/projects/category/${slug}`,
      lastModified: latestBySlug.get(slug) || '',
    }))

  return { categorySlugs }
}
