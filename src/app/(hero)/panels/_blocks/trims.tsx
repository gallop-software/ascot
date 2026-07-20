import Link from 'next/link'
import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { ArrowLink } from '@/components/arrow-link'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { Image } from '@/components/image'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { TRIM_PRODUCTS } from '@/catalog'

/**
 * Matching trim for the panel profiles above, driven by the catalog rather than
 * the retired 3D trim dataset — the trim library is a product list, not a
 * viewer, so a card grid links straight through to the category page.
 */
export default function Trims() {
  return (
    <Section
      id="trims"
      className="bg-body py-20 md:py-28"
    >
      <div className="mb-12 max-w-3xl md:mb-16">
        <Heading as="h2">Matching Trim</Heading>
        <Heading as="h3">Trims Formed to the Profile</Heading>
        <Paragraph
          color="text-contrast-light"
          margin="mb-0"
        >
          Ridge, rake, eave, corner, and base conditions formed from the same
          coil as the panels, plus custom flashing for anything a standard piece
          does not cover.
        </Paragraph>
      </div>

      <Grid
        cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        gap="gap-6 lg:gap-8"
        className="mb-12"
      >
        {TRIM_PRODUCTS.map((trim) => (
          <article
            key={trim.slug}
            className="group relative flex flex-col rounded-none border border-accent3-dark bg-body-light transition-shadow duration-200 hover:shadow-lg has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-dark"
          >
            <div className="overflow-hidden border-b border-accent3-dark">
              <Image
                src={trim.image.src}
                alt={trim.image.alt}
                size="medium"
                rounded="rounded-none"
                aspect="aspect-[3/2]"
                className="w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <Heading
                as="h4"
                margin="mb-2"
              >
                <Link
                  href={`/trims#${trim.slug}`}
                  className="no-underline! before:absolute before:inset-0 focus:outline-none"
                >
                  {trim.name}
                </Link>
              </Heading>

              <Paragraph
                fontSize="text-base"
                color="text-contrast-light"
                margin="mb-4"
                className="flex-1"
              >
                {trim.shortDescription}
              </Paragraph>

              <Span
                fontSize="text-sm"
                color="text-contrast-light"
                margin="mb-5"
              >
                {trim.applications.join(' · ')}
              </Span>

              <ArrowLink>{`View ${trim.name}`}</ArrowLink>
            </div>
          </article>
        ))}
      </Grid>

      <Buttons margin="mt-0 mb-0">
        <Button
          href="/trims"
          variant="outline"
          size="medium"
          className="max-sm:w-full"
        >
          View All Trims
        </Button>
      </Buttons>
    </Section>
  )
}
