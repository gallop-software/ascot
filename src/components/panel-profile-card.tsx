import Link from 'next/link'
import { clsx } from 'clsx'
import type { PanelProfile } from '@/catalog'
import { ArrowLink } from '@/components/arrow-link'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { PanelViewer } from '@/components/panel-viewer'
import { Paragraph } from '@/components/paragraph'
import { SpecificationList } from '@/components/specification-list'

export interface PanelProfileCardProps {
  panel: PanelProfile
  /** Where the card links. Defaults to /panels/<slug>. */
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
  const target = href ?? `/panels/${panel.slug}`

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
      {panel.viewerProfile ? (
        <PanelViewer
          profile={panel.viewerProfile}
          label={panel.name}
          aspect="aspect-[3/2]"
          className="border-b border-accent3-dark"
        />
      ) : (
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
      )}

      <div className="flex flex-1 flex-col p-6">
        <Heading
          as="h4"
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
        />

        <ArrowLink className="mt-auto pt-5">{`View ${panel.name}`}</ArrowLink>
      </div>
    </article>
  )
}
