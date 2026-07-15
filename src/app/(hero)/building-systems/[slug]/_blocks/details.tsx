import checkIcon from '@iconify/icons-lucide/check'
import type { BuildingSystem } from '@/catalog'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { List, Li } from '@/components/list'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { Span } from '@/components/span'

/**
 * A bordered panel holding one titled list. Not exported — per Canon rule 025
 * it stays local to this block.
 */
function ListPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col rounded-none border border-accent3-dark bg-body-light p-6 lg:p-8">
      <Heading
        as="h3"
        fontSize="text-lg"
        fontWeight="font-bold"
        letterSpacing="tracking-tight"
        lineHeight="leading-tight"
        color="text-contrast"
        margin="mb-5"
        className="border-b border-accent3-dark pb-4"
      >
        {title}
      </Heading>

      <List
        variant="unstyled"
        spacing="normal"
        margin="mb-0"
      >
        {items.map((item) => (
          <Li
            key={item}
            icon={checkIcon}
            iconSize="w-4 h-4"
            className="text-accent-dark"
          >
            <Span
              fontSize="text-base"
              color="text-contrast"
            >
              {item}
            </Span>
          </Li>
        ))}
      </List>
    </div>
  )
}

/**
 * The four catalog-driven detail lists for a building system: applications,
 * structural systems, components, and design options.
 */
export default function Details({ system }: { system: BuildingSystem }) {
  return (
    <Section className="py-20 lg:py-28">
      <SectionHeading
        eyebrow="What Is Included"
        heading={`Specifying ${system.name}`}
        intro="Where these buildings get used, the structural approaches they support, and the components and options that make up the package."
        className="mb-12 lg:mb-16"
      />

      <Grid
        cols="grid-cols-1 md:grid-cols-2"
        gap="gap-6 lg:gap-8"
      >
        <ListPanel
          title="Common Applications"
          items={system.applications}
        />
        <ListPanel
          title="Available Structural Systems"
          items={system.structuralSystems}
        />
        <ListPanel
          title="Building Components"
          items={system.components}
        />
        <ListPanel
          title="Design Options"
          items={system.designOptions}
        />
      </Grid>
    </Section>
  )
}
