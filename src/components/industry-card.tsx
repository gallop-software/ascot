import Link from 'next/link'
import { clsx } from 'clsx'
import arrowRight from '@iconify/icons-lucide/arrow-right'
import checkIcon from '@iconify/icons-lucide/check'
import type { Industry } from '@/catalog'
import { Heading } from '@/components/heading'
import { Icon } from '@/components/icon'
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
        'transition-colors duration-200 hover:border-accent4',
        'focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent-dark',
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
          as="h3"
          fontSize="text-xl"
          fontWeight="font-bold"
          letterSpacing="tracking-tight"
          lineHeight="leading-tight"
          color="text-contrast"
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

        <Span
          fontSize="text-sm"
          fontWeight="font-semibold"
          color="text-accent-dark"
          className="inline-flex items-center gap-x-2"
        >
          {`View ${industry.name}`}
          <Icon
            icon={arrowRight}
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </Span>
      </div>
    </article>
  )
}
