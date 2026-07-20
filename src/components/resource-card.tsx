import Link from 'next/link'
import { clsx } from 'clsx'
import { DateTime } from 'luxon'
import type { Resource } from '@/catalog'
import { ArrowLink } from '@/components/arrow-link'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'

export interface ResourceCardProps {
  resource: Resource
  className?: string
}

/**
 * Text-led card for a guide, checklist, or comparison article.
 * The ISO `date` is formatted with Luxon per Canon rule 027 and exposed as a
 * machine-readable <time datetime> alongside the human-readable label.
 */
export function ResourceCard({ resource, className }: ResourceCardProps) {
  const published = DateTime.fromISO(resource.date)
  const publishedLabel = published.isValid
    ? published.toFormat('LLLL d, yyyy')
    : ''

  return (
    <article
      className={clsx(
        'group relative flex h-full flex-col rounded-none',
        'border border-accent3-dark bg-body-light p-6',
        'transition-shadow duration-200 hover:shadow-lg',
        'has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-dark',
        className
      )}
    >
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        <Span
          fontSize="text-sm"
          fontWeight="font-semibold"
          color="text-accent-dark"
        >
          {resource.category}
        </Span>
        {publishedLabel && (
          <>
            <span
              aria-hidden="true"
              className="h-3 w-px bg-accent4/50"
            />
            <time dateTime={resource.date}>
              <Span
                fontSize="text-sm"
                color="text-contrast-light"
              >
                {publishedLabel}
              </Span>
            </time>
          </>
        )}
      </div>

      <Heading
        as="h4"
        margin="mb-3"
      >
        <Link
          href={resource.href}
          className="no-underline! before:absolute before:inset-0 focus:outline-none"
        >
          {resource.title}
        </Link>
      </Heading>

      <Paragraph
        fontSize="text-base"
        color="text-contrast-light"
        margin="mb-5"
        className="flex-1"
      >
        {resource.excerpt}
      </Paragraph>

      <ArrowLink>{`Read ${resource.title}`}</ArrowLink>
    </article>
  )
}
