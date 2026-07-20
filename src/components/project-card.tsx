import Link from 'next/link'
import { clsx } from 'clsx'
import mapPin from '@iconify/icons-lucide/map-pin'
import ruler from '@iconify/icons-lucide/ruler'
import { ArrowLink } from '@/components/arrow-link'
import { Heading } from '@/components/heading'
import { Icon } from '@/components/icon'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'

export interface ProjectCardProps {
  title: string
  /** e.g. "Agricultural" — rendered as an uppercase eyebrow. */
  category: string
  /** e.g. "Levelland, TX" */
  location: string
  /** e.g. "18,000 sq ft" */
  size: string
  summary: string
  image: { src: string; alt: string }
  href: string
  /** Descriptive link text. Defaults to "View <title>". */
  linkLabel?: string
  className?: string
}

/**
 * Project / case-study card. The location and size metadata are icon-labelled
 * but each icon is paired with visible text, so nothing depends on the glyph
 * being understood.
 */
export function ProjectCard({
  title,
  category,
  location,
  size,
  summary,
  image,
  href,
  linkLabel,
  className,
}: ProjectCardProps) {
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
          src={image.src}
          alt={image.alt}
          size="medium"
          rounded="rounded-none"
          aspect="aspect-[3/2]"
          className="w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Span
          fontSize="text-sm"
          fontWeight="font-semibold"
          color="text-accent-dark"
          margin="mb-2"
        >
          {category}
        </Span>

        <Heading
          as="h4"
          margin="mb-3"
        >
          <Link
            href={href}
            className="no-underline! before:absolute before:inset-0 focus:outline-none"
          >
            {title}
          </Link>
        </Heading>

        <dl className="mb-4 flex flex-wrap gap-x-6 gap-y-2">
          <div className="flex items-center gap-x-2">
            <dt className="flex items-center gap-x-2">
              <Icon
                icon={mapPin}
                className="h-4 w-4 flex-none text-accent4"
              />
              <Span
                fontSize="text-sm"
                color="text-contrast-light"
              >
                Location:
              </Span>
            </dt>
            <dd>
              <Span
                fontSize="text-sm"
                fontWeight="font-medium"
                color="text-contrast"
              >
                {location}
              </Span>
            </dd>
          </div>

          <div className="flex items-center gap-x-2">
            <dt className="flex items-center gap-x-2">
              <Icon
                icon={ruler}
                className="h-4 w-4 flex-none text-accent4"
              />
              <Span
                fontSize="text-sm"
                color="text-contrast-light"
              >
                Size:
              </Span>
            </dt>
            <dd>
              <Span
                fontSize="text-sm"
                fontWeight="font-medium"
                color="text-contrast"
              >
                {size}
              </Span>
            </dd>
          </div>
        </dl>

        <Paragraph
          fontSize="text-base"
          color="text-contrast-light"
          margin="mb-5"
          className="flex-1"
        >
          {summary}
        </Paragraph>

        <ArrowLink>{linkLabel ?? `View ${title}`}</ArrowLink>
      </div>
    </article>
  )
}
