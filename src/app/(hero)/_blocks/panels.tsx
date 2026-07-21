import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { PanelProfileCard } from '@/components/panel-profile-card'
import { FEATURED_PANELS } from '@/catalog'
import arrowRightIcon from '@iconify/icons-heroicons/arrow-right-20-solid'

export default function Panels() {
  return (
    <Section
      id="panels"
      className="bg-body2 py-20 md:py-28"
    >
      <div className="mb-12 max-w-3xl md:mb-16">
        <Heading as="h2">Panel Systems</Heading>
        <Heading as="h3">
          Profiles for Roofing, Walls, and Interior Applications
        </Heading>
        <Paragraph
          color="text-contrast-light"
          margin="mb-0"
        >
          Each profile is roll-formed to length in multiple gauges and finishes,
          and pairs with matching trim, closures, and fasteners so the roof,
          wall, or liner reads as one coordinated system.
        </Paragraph>
      </div>

      <Grid
        cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        gap="gap-6 lg:gap-8"
      >
        {FEATURED_PANELS.map((panel) => (
          <PanelProfileCard
            key={panel.slug}
            panel={panel}
          />
        ))}
      </Grid>

      <Buttons margin="mt-12 mb-0">
        <Button
          href="/panels"
          variant="outline"
          size="medium"
          icon={arrowRightIcon}
          iconPlacement="after"
          className="max-sm:w-full"
        >
          Compare All Panel Profiles
        </Button>
      </Buttons>
    </Section>
  )
}
