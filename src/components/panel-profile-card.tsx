import Link from 'next/link'
import { clsx } from 'clsx'
import arrowRight from '@iconify/icons-lucide/arrow-right'
import type { PanelProfile } from '@/catalog'
import { Heading } from '@/components/heading'
import { Icon } from '@/components/icon'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'
import { SpecificationList } from '@/components/specification-list'
import { Span } from '@/components/span'

export interface PanelProfileCardProps {
  panel: PanelProfile
  /** Where the card links. Defaults to /products/panels/<slug>. */
  href?: string
  /** How many specs to show before the link. Defaults to 3. */
  specLimit?: number
  className?: string
}

/**
 * Catalog card for a panel profile: image, category, name, short description,
 * and a trimmed spec list. Consumes PanelProfile from `@/catalog` directly so
 * callers pass the record, not fifteen loose props.
 */
export function PanelProfileCard({
  panel,
  href,
  specLimit = 3,
  className,
}: PanelProfileCardProps) {
  const target = href ?? `/products/panels/${panel.slug}`

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
          src={panel.image.src}
          alt={panel.image.alt}
          size="medium"
          rounded="rounded-none"
          aspect="aspect-[3/2]"
          className="w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Span
          fontFamily="font-heading2"
          fontSize="text-sm"
          fontWeight="font-semibold"
          color="text-accent-dark"
          margin="mb-2"
          className="uppercase tracking-[0.16em]"
        >
          {panel.category}
        </Span>

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
            {panel.name}
          </Link>
        </Heading>

        <Paragraph
          fontSize="text-base"
          color="text-contrast-light"
          margin="mb-5"
        >
          {panel.shortDescription}
        </Paragraph>

        <SpecificationList
          specs={panel.specs.slice(0, specLimit)}
          variant="list"
          className="mt-auto mb-5"
        />

        <Span
          fontSize="text-sm"
          fontWeight="font-semibold"
          color="text-accent-dark"
          className="inline-flex items-center gap-x-2"
        >
          {`View ${panel.name}`}
          <Icon
            icon={arrowRight}
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </Span>
      </div>
    </article>
  )
}
