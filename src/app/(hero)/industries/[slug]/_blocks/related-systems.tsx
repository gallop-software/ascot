import Link from 'next/link'
import arrowRight from '@iconify/icons-lucide/arrow-right'
import { BUILDING_SYSTEMS, type BuildingSystem, type Industry } from '@/catalog'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Icon } from '@/components/icon'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { Span } from '@/components/span'

/** Local card — kept in the block per Canon rule 025. */
function SystemCard({ system }: { system: BuildingSystem }) {
  return (
    <article className="group relative flex flex-col rounded-none border border-accent3-dark bg-body-light transition-colors duration-200 hover:border-accent4 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent-dark">
      <div className="overflow-hidden border-b border-accent3-dark">
        <Image
          src={system.image.src}
          alt={system.image.alt}
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
            href={`/building-systems/${system.slug}`}
            className="no-underline! before:absolute before:inset-0 focus:outline-none"
          >
            {system.name}
          </Link>
        </Heading>

        <Paragraph
          fontSize="text-base"
          color="text-contrast-light"
          margin="mb-5"
          className="flex-1"
        >
          {system.shortDescription}
        </Paragraph>

        <Span
          fontSize="text-sm"
          fontWeight="font-semibold"
          color="text-accent-dark"
          className="inline-flex items-center gap-x-2"
        >
          {`View ${system.name}`}
          <Icon
            icon={arrowRight}
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </Span>
      </div>
    </article>
  )
}

/** Building systems most often ordered by this industry. */
export default function RelatedSystems({ industry }: { industry: Industry }) {
  const systems = industry.relatedSystems
    .map((slug) => BUILDING_SYSTEMS.find((system) => system.slug === slug))
    .filter((system): system is BuildingSystem => system !== undefined)

  if (systems.length === 0) return null

  return (
    <Section className="py-20 lg:py-28">
      <SectionHeading
        eyebrow="Related Building Systems"
        heading="Packages This Work Usually Calls For"
        intro="Every package draws from the same manufactured lines. These are the ones this category tends to start with."
        className="mb-12 lg:mb-16"
      />

      <Grid
        cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        gap="gap-6 lg:gap-8"
      >
        {systems.map((system) => (
          <SystemCard
            key={system.slug}
            system={system}
          />
        ))}
      </Grid>
    </Section>
  )
}
