import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Image } from '@/components/image'
import { TrimViewer } from '@/components/trim-viewer'
import { TRIM_CONTENT } from '@/components/trim-viewer/data'
import { TRIM_PRODUCTS, type Product } from '@/catalog'

/**
 * Maps each catalog trim slug to its formed cross-section in the trim viewer,
 * so the card shows a 3D model of the piece instead of a photo.
 */
const TRIM_MODELS: Record<string, string> = {
  'ridge-cap': 'sculptured-ridge',
  'rake-trim': 'sculptured-rake',
  'eave-trim': 'long-eave-trim',
  'valley-trim': 'valley',
  'corner-trim': 'outside-corner',
  'base-trim': 'base-trim',
}

/** Catalog card for a single trim piece. Not exported — Canon rule 025. */
function TrimCard({ trim }: { trim: Product }) {
  const modelId = TRIM_MODELS[trim.slug]
  const model = modelId
    ? TRIM_CONTENT.find((content) => content.id === modelId)
    : undefined

  return (
    <article
      id={trim.slug}
      className="flex flex-col rounded-none border border-accent3-dark bg-body-light scroll-mt-28"
    >
      {model ? (
        <TrimViewer
          trim={model}
          aspect="aspect-[3/2]"
          className="border-b border-accent3-dark"
        />
      ) : (
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
