import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { SectionHeading } from '@/components/section-heading'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { Image } from '@/components/image'
import { TRIM_PRODUCTS, type Product } from '@/catalog'

/** Catalog card for a single trim piece. Not exported — Canon rule 025. */
function TrimCard({ trim }: { trim: Product }) {
  return (
    <article
      id={trim.slug}
      className="flex flex-col rounded-none border border-accent3-dark bg-body-light scroll-mt-28"
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
          as="h3"
          fontSize="text-lg"
          fontWeight="font-bold"
          letterSpacing="tracking-tight"
          lineHeight="leading-tight"
          color="text-contrast"
          margin="mb-2"
        >
          {trim.name}
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
          fontFamily="font-heading2"
          fontSize="text-sm"
          fontWeight="font-semibold"
          color="text-accent-dark"
          className="uppercase tracking-[0.16em]"
        >
          {trim.applications.join(' · ')}
        </Span>
      </div>
    </article>
  )
}

/** Grid of every trim piece in the catalog. */
export default function Trims() {
  return (
    <Section
      id="trims"
      className="bg-body py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Standard and Custom"
        heading="Trims We Form"
        intro="Each piece is bent to match the profile and finish of your panels so the elevation reads as one system. Custom shapes are formed to the condition when a standard piece does not fit."
        className="mb-12 max-w-3xl md:mb-16"
      />

      <Grid
        cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        gap="gap-6 lg:gap-8"
      >
        {TRIM_PRODUCTS.map((trim) => (
          <TrimCard
            key={trim.slug}
            trim={trim}
          />
        ))}
      </Grid>
    </Section>
  )
}
