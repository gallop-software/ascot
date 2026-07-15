import { baseURL } from '@/app/metadata'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // Explicitly welcome AI assistant / answer-engine crawlers so the site
      // can be indexed and cited by ChatGPT, Claude, Perplexity, Google AI, etc.
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'Applebot-Extended',
          'CCBot',
        ],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  }
}
