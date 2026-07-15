import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { ResourceCard } from '@/components/resource-card'
import { SectionHeading } from '@/components/section-heading'
import { RESOURCES } from '@/catalog'

/** Grid of every published resource, driven by `RESOURCES` in @/catalog. */
export default function Articles() {
  return (
    <Section className="bg-body py-20 md:py-28">
      <SectionHeading
        eyebrow="Articles and Guides"
        heading="Start With the Basics"
        intro="Written for contractors, builders, and property owners who want the reasoning, not just the answer."
        className="mb-12 max-w-3xl md:mb-16"
      />

      <Grid
        cols="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
        gap="gap-6 lg:gap-8"
      >
        {RESOURCES.map((resource) => (
          <ResourceCard
            key={resource.slug}
            resource={resource}
          />
        ))}
      </Grid>
    </Section>
  )
}
