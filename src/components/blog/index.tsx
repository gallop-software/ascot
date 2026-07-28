'use server'

import { BlogClient } from './blog-client'
import blogData from '@/data/_blog.json'
import { DateTime } from 'luxon'

interface BlogPost {
  slug: string
  metadata: {
    title?: string
    date?: string
    categories?: string[]
    featuredImage?: string
  }
}

export async function Blog({
  className,
  perPage = 9,
  categoriesInclude,
  categoriesExclude,
  loadMoreText = 'Load More Posts',
}: {
  className?: string
  perPage?: number
  categoriesInclude?: string[]
  categoriesExclude?: string[]
  loadMoreText?: string
}) {
  // Generated at build time and bundled via the @/data alias — there is no
  // filesystem on the Workers runtime, so never read _blog.json with fs.
  let allPosts = blogData as BlogPost[]

  // Filter by included categories (if specified), otherwise check excludes
  if (categoriesInclude && categoriesInclude.length > 0) {
    allPosts = allPosts.filter((post) =>
      (post.metadata.categories || []).some((cat) =>
        categoriesInclude.includes(cat)
      )
    )
  } else if (categoriesExclude && categoriesExclude.length > 0) {
    allPosts = allPosts.filter(
      (post) =>
        !(post.metadata.categories || []).some((cat) =>
          categoriesExclude.includes(cat)
        )
    )
  }

  // Sort by date, newest first
  allPosts = [...allPosts].sort(
    (a, b) =>
      (DateTime.fromISO(b.metadata.date || '').toMillis() || 0) -
      (DateTime.fromISO(a.metadata.date || '').toMillis() || 0)
  )

  return (
    <BlogClient
      allPosts={allPosts}
      perPage={perPage}
      className={className}
      loadMoreText={loadMoreText}
    />
  )
}
