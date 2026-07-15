import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { SectionHeading } from '@/components/section-heading'
import { PanelProfileCard } from '@/components/panel-profile-card'
import { Paragraph } from '@/components/paragraph'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { ColorSwatchGrid } from '@/components/color-swatch'
import { PANEL_PROFILES, PANEL_COLORS, COLOR_DISCLAIMER } from '@/catalog'

/**
 * Every panel profile in the catalog, including the three without an
 * interactive 3D model — the card treatment is identical, so the grid does not
 * need to know which profiles the viewer supports.
 */
export default function Panels() {
  return (
    <>
      <Section
        id="panels"
        className="bg-body py-20 md:py-28"
      >
        <SectionHeading
          eyebrow="Compare Profiles"
          heading="Six Panel Profiles, One Coordinated System"
          intro="Each profile is manufactured to order and pairs with matching trim, closures, and fasteners so the package arrives complete."
          className="mb-12 max-w-3xl md:mb-16"
        />

        <Grid
          cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          gap="gap-6 lg:gap-8"
        >
          {PANEL_PROFILES.map((panel) => (
            <PanelProfileCard
              key={panel.slug}
              panel={panel}
              href={`/panels/${panel.slug}`}
            />
          ))}
        </Grid>
      </Section>

      <Section
        id="colors"
        className="bg-accent3 py-20 md:py-28"
      >
        <SectionHeading
          eyebrow="Finishes"
          heading="Factory-Applied Color on Every Profile"
          intro="Panels, trim, and accessories are matched from the same standard color line so an elevation reads as one system."
          className="mb-10 max-w-3xl md:mb-12"
        />

        <ColorSwatchGrid
          colors={PANEL_COLORS}
          className="mb-8"
        />

        <Paragraph
          fontSize="text-sm"
          color="text-contrast-light"
          margin="mb-8"
          className="max-w-3xl"
        >
          {COLOR_DISCLAIMER}
        </Paragraph>

        <Buttons margin="mt-0 mb-0">
          <Button
            href="/colorchart"
            size="medium"
            className="max-sm:w-full"
          >
            View the Full Color Chart
          </Button>
        </Buttons>
      </Section>
    </>
  )
}
