import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { SectionHeading } from '@/components/section-heading'
import { ResourceCard } from '@/components/resource-card'
import { RESOURCES } from '@/catalog'

export default function Resources() {
  return (
    <Section
      id="resources"
      className="bg-body py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Guides and Resources"
        heading="Practical Reference Before You Order"
        intro="Selection guides, specification explainers, and planning checklists written for the decisions that come up on a real project."
        className="mb-12 max-w-3xl md:mb-16"
      />

      <Grid
        cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
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
