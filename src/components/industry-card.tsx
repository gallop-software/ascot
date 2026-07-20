import Link from 'next/link'
import { clsx } from 'clsx'
import checkIcon from '@iconify/icons-lucide/check'
import type { Industry } from '@/catalog'
import { ArrowLink } from '@/components/arrow-link'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { List, Li } from '@/components/list'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'

export interface IndustryCardProps {
  industry: Industry
  /** Where the card links. Defaults to /industries/<slug>. */
  href?: string
  /** Show the `needs` checklist. Defaults to true. */
  showNeeds?: boolean
  className?: string
}

/**
 * Card for an industry served. Consumes Industry from `@/catalog`.
 * The needs list is icon-marked as well as indented so the checklist reads
 * without relying on color.
 */
export function IndustryCard({
  industry,
  href,
  showNeeds = true,
  className,
}: IndustryCardProps) {
  const target = href ?? `/industries/${industry.slug}`

  return (
    <article
      className={clsx(
        'group relative flex flex-col rounded-none',
        'border border-accent3-dark bg-body-light',
        'transition-shadow duration-200 hover:shadow-lg',
        'has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-dark',
        className
      )}
    >
      <div className="overflow-hidden border-b border-accent3-dark">
        <Image
          src={industry.image.src}
          alt={industry.image.alt}
          size="medium"
          rounded="rounded-none"
          aspect="aspect-[3/2]"
          className="w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Heading
          as="h4"
          margin="mb-3"
        >
          <Link
            href={target}
            className="no-underline! before:absolute before:inset-0 focus:outline-none"
          >
            {industry.name}
          </Link>
        </Heading>

        <Paragraph
          fontSize="text-base"
          color="text-contrast-light"
          margin="mb-5"
        >
          {industry.shortDescription}
        </Paragraph>

        {showNeeds && industry.needs.length > 0 && (
          <List
            variant="unstyled"
            spacing="tight"
            fontSize="text-sm"
            color="text-contrast"
            margin="mt-auto mb-5"
          >
            {industry.needs.map((need) => (
              <Li
                key={need}
                icon={checkIcon}
                iconSize="w-4 h-4"
                className="text-accent-dark"
              >
                <Span
                  fontSize="text-sm"
                  color="text-contrast"
                >
                  {need}
                </Span>
              </Li>
            ))}
          </List>
        )}

        <ArrowLink>{`View ${industry.name}`}</ArrowLink>
      </div>
    </article>
  )
}
