import Link from 'next/link'
import { clsx } from 'clsx'
import { ArrowLink } from '@/components/arrow-link'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'

export interface ProductCategoryCardProps {
  title: string
  description: string
  href: string
  image: { src: string; alt: string }
  /**
   * Descriptive link text that must name the destination, e.g.
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

        <Paragraph
          fontSize="text-base"
          color="text-contrast-light"
          margin="mb-5"
          className="flex-1"
        >
          {description}
        </Paragraph>

        <ArrowLink>{linkLabel}</ArrowLink>
      </div>
    </article>
  )
}
