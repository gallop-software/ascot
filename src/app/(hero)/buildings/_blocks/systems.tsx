import { BUILDING_SYSTEMS, type BuildingSystem } from '@/catalog'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'
import { Section } from '@/components/section'

/**
 * Local card for a BuildingSystem. Not exported, per Canon rule 025, because content
 * components that only serve this block stay in the block.
 */
function SystemCard({ system }: { system: BuildingSystem }) {
  return (
    <article
      id={system.slug}
      className="flex flex-col rounded-none border border-accent3-dark bg-body-light scroll-mt-28"
    >
      <div className="overflow-hidden border-b border-accent3-dark">
        <Image
          src={system.image.src}
          alt={system.image.alt}
          width={system.image.width}
          height={system.image.height}
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
          {system.name}
        </Heading>

        <Paragraph
          fontSize="text-base"
          color="text-contrast-light"
          margin="mb-0"
        >
          {system.shortDescription}
        </Paragraph>
      </div>
    </article>
  )
}

/** Grid of every building system in the catalog. */
export default function Systems() {
  return (
    <Section className="py-20 lg:py-28">
      <div className="mb-12 lg:mb-16">
        <Heading as="h2">What We Package</Heading>
        <Heading as="h3">Steel Buildings We Supply</Heading>
        <Paragraph
          color="text-contrast-light"
          margin="mb-0"
        >
          Each package draws from the same manufactured panel, trim, and
          structural lines. What changes is how the pieces are specified for the
          work the building has to do.
        </Paragraph>
      </div>

      <Grid
        cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        gap="gap-6 lg:gap-8"
      >
        {BUILDING_SYSTEMS.map((system) => (
          <SystemCard
            key={system.slug}
            system={system}
          />
        ))}
      </Grid>
    </Section>
  )
}
