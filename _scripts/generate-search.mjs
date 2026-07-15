import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { JSDOM } from 'jsdom'
import { slugifyWithCounter } from '@sindresorhus/slugify'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Get category slugs from _data/_blog.json
function getCategorySlugs() {
  const blogJsonPath = path.resolve(__dirname, '../_data/_blog.json')
  if (!fs.existsSync(blogJsonPath)) {
    console.warn('Blog data not found: _data/_blog.json')
    return []
  }

  try {
    const content = fs.readFileSync(blogJsonPath, 'utf8')
    const posts = JSON.parse(content)

    // Extract unique categories
    const categories = new Set()
    for (const post of posts) {
      const cats = post.metadata?.categories
      if (cats) {
        const catArray = Array.isArray(cats)
          ? cats
          : cats
              .split(/[,|/]/)
              .map((s) => s.trim())
              .filter(Boolean)
        catArray.forEach((cat) => {
          // Match getSlug(): lowercase, hyphenated, alphanumerics only.
          const slug = cat
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
          categories.add(`projects/category/${slug}`)
        })
      }
    }

    return Array.from(categories)
  } catch (error) {
    console.error('Failed to read blog data:', error.message)
    return []
  }
}

// Get project (case study) slugs. These render via the dynamic
// /projects/[slug] route, so the filesystem crawl skips them — enumerate the
// single-file sources in src/projects instead.
function getPostSlugs() {
  const projectsDir = path.resolve(__dirname, '../src/projects')
  if (!fs.existsSync(projectsDir)) {
    console.warn('Projects directory not found: src/projects')
    return []
  }

  const files = fs
    .readdirSync(projectsDir)
    .filter((file) => file.endsWith('.tsx') && !file.startsWith('_'))
  return files.map((file) => `projects/${file.replace(/\.tsx$/, '')}`)
}

// Get panel profile slugs. These render via the dynamic /panels/[profile]
// route (skipped by the filesystem crawl), so read PANEL_ORDER from the panel
// data source — the same list the sitemap uses.
function getPanelSlugs() {
  const dataPath = path.resolve(
    __dirname,
    '../src/components/panel-viewer/data.ts'
  )
  if (!fs.existsSync(dataPath)) {
    console.warn('Panel data not found: src/components/panel-viewer/data.ts')
    return []
  }

  const content = fs.readFileSync(dataPath, 'utf8')
  const match = content.match(/export const PANEL_ORDER[^=]*=\s*(\[[\s\S]*?\])/)
  if (!match) {
    console.warn('PANEL_ORDER not found in panel-viewer/data.ts')
    return []
  }

  try {
    const order = new Function(`return ${match[1]}`)()
    return order.map((profile) => `panels/${profile}`)
  } catch (error) {
    console.error('Failed to parse PANEL_ORDER:', error.message)
    return []
  }
}

// Get all slug paths from Next.js App Router pages
function getSlugPaths(dir, basePath = '') {
  const out = []

  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`)
    return out
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      // Skip dynamic route segments (folders with brackets like [slug] or [[...slug]])
      // These are handled separately via getPostSlugs() and getCategorySlugs()
      if (entry.name.includes('[') && entry.name.includes(']')) {
        continue
      }

      // Skip specific routes
      if (entry.name === 'block') {
        console.log(`Skipping route: ${basePath}/${entry.name}`)
        continue
      }

      // Skip route groups (folders starting with parentheses) but traverse into them
      if (entry.name.startsWith('(') && entry.name.endsWith(')')) {
        // Route group - traverse but don't add to path
        out.push(...getSlugPaths(fullPath, basePath))
      } else {
        // Regular directory - add to path
        const newPath = basePath ? `${basePath}/${entry.name}` : entry.name
        out.push(...getSlugPaths(fullPath, newPath))
      }
      continue
    }

    // Only look for page.tsx files (Next.js App Router convention)
    if (entry.name !== 'page.tsx') continue

    // The slug is the directory path
    const slugPath = basePath || 'index'
    out.push(slugPath)
  }

  return out
}

// Fetch HTML from local server
async function fetchPage(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.text()
  } catch (error) {
    throw new Error(`Failed to fetch ${url}: ${error.message}`)
  }
}

// Extract text content from an element, excluding script/style tags
function getTextContent(element) {
  const clone = element.cloneNode(true)
  // Remove script, style, nav, header, footer, and aside elements
  clone
    .querySelectorAll('script, style, nav, header, footer, aside')
    .forEach((el) => el.remove())
  return clone.textContent.trim().replace(/\s+/g, ' ')
}

// Parse HTML and extract sections based on headings
function extractSectionsFromHtml(html, url) {
  const dom = new JSDOM(html)
  const document = dom.window.document
  const sections = []

  // Focus only on content within main element
  const main = document.querySelector('main')
  if (!main) {
    console.warn(`No <main> element found on ${url}`)
    return sections
  }

  // Remove header, footer, and aside elements from main before processing
  main.querySelectorAll('header, footer, aside').forEach((el) => el.remove())

  // Find all headings (h1-h6) within main
  const headings = main.querySelectorAll('h1, h2, h3, h4, h5, h6')

  let pageTitle =
    main.querySelector('h1')?.textContent.trim() ||
    document.querySelector('title')?.textContent.trim() ||
    url.split('/').pop().replace(/-/g, ' ')

  // If there's only one heading (typical for blog posts), extract all main content
  if (headings.length === 1) {
    const heading = headings[0]
    const id = heading.id || ''
    const title = heading.textContent.trim()
    const headingUrl = `${url}${id ? `#${id}` : ''}`

    // Get all text content from main
    const mainContent = getTextContent(main)

    // Remove the heading from the beginning of the content if it exists
    let content = mainContent
    if (mainContent.startsWith(title)) {
      content = mainContent.slice(title.length).trim()
    }

    // Only add if there's actual content
    if (content.trim()) {
      sections.push({
        url: headingUrl,
        title: title,
        content: content,
        pageTitle: undefined,
      })
    }

    return sections
  }

  // For pages with multiple headings, parse by sections
  headings.forEach((heading, index) => {
    const id = heading.id || ''
    const title = heading.textContent.trim()
    const headingUrl = `${url}${id ? `#${id}` : ''}`

    // Collect content between this heading and the next
    let content = [] // Don't include the heading text in content
    let currentElement = heading.nextElementSibling
    const nextHeading = headings[index + 1]

    // Helper function to check if an element contains the next heading
    function containsNextHeading(element) {
      if (!nextHeading) return false
      return element === nextHeading || element.contains(nextHeading)
    }

    while (currentElement && !containsNextHeading(currentElement)) {
      // Skip nav, header, footer, aside, script, style
      if (
        !['NAV', 'HEADER', 'FOOTER', 'ASIDE', 'SCRIPT', 'STYLE'].includes(
          currentElement.tagName
        )
      ) {
        const text = getTextContent(currentElement)
        if (text) {
          content.push(text)
        }
      }
      currentElement = currentElement.nextElementSibling
    }

    const contentText = content.join(' ')
    // Only add if there's actual content
    if (contentText.trim()) {
      sections.push({
        url: headingUrl,
        title: title,
        content: contentText,
        pageTitle: id ? pageTitle : undefined,
      })
    }
  })

  return sections
}

async function crawlAndGenerateIndex() {
  console.log('🔍 Crawling local site to generate search index...\n')

  const baseDir = path.resolve(__dirname, '../src/app')

  // Get static pages from the filesystem crawl (skips dynamic [slug] routes).
  const staticPaths = getSlugPaths(baseDir)

  // Dynamic routes enumerated from _blog.json / src/projects / PANEL_ORDER.
  const postSlugs = getPostSlugs()
  const panelSlugs = getPanelSlugs()
  const categorySlugs = getCategorySlugs()

  // Combine all paths
  const slugPaths = [
    ...staticPaths,
    ...postSlugs,
    ...panelSlugs,
    ...categorySlugs,
  ]
  const baseUrl = 'http://localhost:3000'

  console.log(`Found ${staticPaths.length} static pages`)
  console.log(`Found ${postSlugs.length} projects`)
  console.log(`Found ${panelSlugs.length} panels`)
  console.log(`Found ${categorySlugs.length} categories`)
  console.log(`Total: ${slugPaths.length} pages to crawl\n`)

  const allSections = []
  let successCount = 0
  let errorCount = 0

  for (const slugPath of slugPaths) {
    const url = slugPath === 'index' ? '/' : `/${slugPath}`
    const fullUrl = `${baseUrl}${url}`

    try {
      console.log(`Crawling: ${url}`)
      const html = await fetchPage(fullUrl)
      const sections = extractSectionsFromHtml(html, url)
      allSections.push(...sections)
      successCount++
    } catch (error) {
      console.error(`✗ ${url}: ${error.message}`)
      errorCount++
    }
  }

  // Write to file
  const outputPath = path.resolve(__dirname, '../public/search-index.json')
  fs.writeFileSync(outputPath, JSON.stringify(allSections, null, 2))

  console.log(`\n✅ Search index generated with ${allSections.length} entries`)
  console.log(`📄 Saved to: ${outputPath}`)
  console.log(`📊 Successfully crawled ${successCount} pages`)
  if (errorCount > 0) {
    console.log(`❌ Failed to crawl ${errorCount} pages`)
  }
}

crawlAndGenerateIndex()
