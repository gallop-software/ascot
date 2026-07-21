import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { TrimViewer } from '@/components/trim-viewer'
import { getTrimModel } from '@/components/trim-viewer/data'
import { TRIM_PRODUCTS, type Product } from '@/catalog'

/** Catalog card for a single trim piece. Not exported, per Canon rule 025. */
function TrimCard({ trim }: { trim: Product }) {
  const model = getTrimModel(trim.slug)

  return (
    <article
      id={trim.slug}
      className="flex flex-col rounded-none border border-accent3-dark bg-body-light scroll-mt-28"
    >
      {model && (
        <TrimViewer
          trim={model}
          aspect="aspect-[3/2]"
          className="border-b border-accent3-dark"
        />
      )}

      <div className="flex flex-1 flex-col p-6">
        <Heading
          as="h4"
          margin="mb-2"
        >
          {trim.name}
        </Heading>

        <Paragraph
          fontSize="text-base"
          color="text-contrast-light"
          margin="mb-0"
        >
          {trim.shortDescription}
        </Paragraph>
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
      <div className="mb-12 max-w-3xl md:mb-16">
        <Heading as="h2">Standard and Custom</Heading>
        <Heading as="h3">Trim Formed to Match Your Panels</Heading>
        <Paragraph
          color="text-contrast-light"
          margin="mb-0"
        >
          Each piece is bent to match the profile and finish of your panels so
          the elevation reads as one system. Custom shapes are formed to the
          condition when a standard piece does not fit.
        </Paragraph>
      </div>

      <Grid
        cols="grid-cols-1 sm:grid-cols-2"
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
