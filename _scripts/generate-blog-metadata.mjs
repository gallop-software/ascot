#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

const POSTS_DIR = path.join(ROOT_DIR, 'src/projects')
const OUTPUT_FILE = path.join(ROOT_DIR, '_data/_blog.json')

function extractMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')

    // Match `export const metadata: PageMetadata = { … }` (single-file shape).
    // Must be a pure literal — it is evaluated with no scope.
    const metadataMatch = content.match(
      /export const metadata[^=]*=\s*({[\s\S]*?^})/m
    )

    if (!metadataMatch) {
      console.warn(`No metadata export found in ${filePath}`)
      return null
    }

    const metadataCode = `return ${metadataMatch[1]}`
    return new Function(metadataCode)()
  } catch (error) {
    console.error(`Failed to extract metadata from ${filePath}:`, error.message)
    return null
  }
}

// Each project file keeps `const TITLE = '...'` as the plain card title.
// The SEO `metadata.title` is the full "Title | Subtitle" form; _blog.json
// should store the plain version so blog cards render the short name.
function extractPlainTitle(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const match =
    content.match(/const TITLE\s*=\s*"((?:[^"\\]|\\.)*)"/) ||
    content.match(/const TITLE\s*=\s*'((?:[^'\\]|\\.)*)'/) ||
    content.match(/const TITLE\s*=\s*`((?:[^`\\]|\\.)*)`/)
  return match ? match[1].replace(/\\(.)/g, '$1') : null
}

async function generateBlogMetadata() {
  console.log('🔍 Scanning posts directory...')

  const dataDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  if (!fs.existsSync(POSTS_DIR)) {
    console.log(`📁 No posts directory found at ${POSTS_DIR}`)
    console.log(`📝 Creating empty _blog.json`)
    fs.writeFileSync(OUTPUT_FILE, '[]', 'utf8')
    console.log(`✅ Generated empty blog metadata: ${OUTPUT_FILE}`)
    return
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.tsx') && !file.startsWith('_'))

  console.log(`📝 Found ${files.length} project files`)

  const posts = []

  for (const file of files) {
    const slug = file.replace(/\.tsx$/, '')
    const filePath = path.join(POSTS_DIR, file)
    const metadata = await extractMetadata(filePath)
    const plainTitle = extractPlainTitle(filePath)

    if (metadata) {
      posts.push({
        slug,
        metadata: {
          title: plainTitle || metadata.title || '',
          description: metadata.description || '',
          date: metadata.date || '',
          categories: metadata.categories || [],
          featuredImage: metadata.featuredImage || '',
          author: metadata.author || '',
        },
      })
    }
  }

  posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date)
    const dateB = new Date(b.metadata.date)
    return dateB.getTime() - dateA.getTime()
  })

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2), 'utf8')

  console.log(`✅ Generated blog metadata: ${OUTPUT_FILE}`)
  console.log(`📊 Total posts: ${posts.length}`)
}

generateBlogMetadata().catch((error) => {
  console.error('❌ Error generating blog metadata:', error)
  process.exit(1)
})
