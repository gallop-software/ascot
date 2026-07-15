import Link from 'next/link'
import { clsx } from 'clsx'
import arrowRight from '@iconify/icons-lucide/arrow-right'
import { Heading } from '@/components/heading'
import { Icon } from '@/components/icon'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'

export interface ProductCategoryCardProps {
  title: string
  description: string
  href: string
  image: { src: string; alt: string }
  /**
   * Descriptive link text — must name the destination, e.g.
   * "View Roofing Panels". Never "Learn More": a screen-reader user pulling up
   * a list of links needs each one to stand on its own.
   */
  linkLabel: string
  className?: string
}

/**
 * Image-led card for a product category. The whole card is one link (the title
 * carries the accessible name via the stretched overlay), so there is exactly
 * one tab stop per card.
 */
export function ProductCategoryCard({
  title,
  description,
  href,
  image,
  linkLabel,
  className,
}: ProductCategoryCardProps) {
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
          src={image.src}
          alt={image.alt}
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
            href={href}
            className="no-underline! before:absolute before:inset-0 focus:outline-none"
          >
            {title}
          </Link>
        </Heading>

        <Paragraph
          fontSize="text-base"
          color="text-contrast-light"
          margin="mb-5"
          className="flex-1"
        >
          {description}
        </Paragraph>

        <Span
          fontSize="text-sm"
          fontWeight="font-semibold"
          color="text-accent-dark"
          className="inline-flex items-center gap-x-2"
        >
          {linkLabel}
          <Icon
            icon={arrowRight}
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </Span>
      </div>
    </article>
  )
}
