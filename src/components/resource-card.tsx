import Link from 'next/link'
import { clsx } from 'clsx'
import { DateTime } from 'luxon'
import arrowRight from '@iconify/icons-lucide/arrow-right'
import type { Resource } from '@/catalog'
import { Heading } from '@/components/heading'
import { Icon } from '@/components/icon'
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
        'transition-colors duration-200 hover:border-accent4',
        'focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent-dark',
        className
      )}
    >
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        <Span
          fontFamily="font-heading2"
          fontSize="text-sm"
          fontWeight="font-semibold"
          color="text-accent-dark"
          className="uppercase tracking-[0.16em]"
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
        as="h3"
        fontSize="text-xl"
        fontWeight="font-bold"
        letterSpacing="tracking-tight"
        lineHeight="leading-tight"
        color="text-contrast"
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

      <Span
        fontSize="text-sm"
        fontWeight="font-semibold"
        color="text-accent-dark"
        className="inline-flex items-center gap-x-2"
      >
        {`Read ${resource.title}`}
        <Icon
          icon={arrowRight}
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        />
      </Span>
    </article>
  )
}
