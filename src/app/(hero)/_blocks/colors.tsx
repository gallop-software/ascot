import { Section } from '@/components/section'
import { Paragraph } from '@/components/paragraph'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { SectionHeading } from '@/components/section-heading'
import { ColorSwatchGrid } from '@/components/color-swatch'
import { PANEL_COLORS, COLOR_DISCLAIMER } from '@/catalog'
import arrowRightIcon from '@iconify/icons-heroicons/arrow-right-20-solid'
import downloadIcon from '@iconify/icons-lucide/download'

export default function Colors() {
  return (
    <Section
      id="colors"
      className="bg-body py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Finishes and Colors"
        heading="Choose a Finish That Fits the Project"
        intro="Select from 30 standard factory-applied colors designed for long-term performance across roofing, wall, trim, and building-component applications."
        className="mb-12 max-w-3xl md:mb-16"
      />

      <ColorSwatchGrid
        colors={PANEL_COLORS}
        className="mb-10"
      />

      <Buttons margin="mt-0 mb-6">
        <Button
          href="/colorchart"
          size="medium"
          icon={arrowRightIcon}
          iconPlacement="after"
          className="max-sm:w-full"
        >
          View Full Color Chart
        </Button>
        <Button
          href="/#quote"
          variant="outline"
          size="medium"
          className="max-sm:w-full"
        >
          Request Physical Samples
        </Button>
        <Button
          href="/colorchart"
          variant="text"
          size="medium"
          icon={downloadIcon}
          iconPlacement="before"
          className="max-sm:w-full"
        >
          Download Color Chart
        </Button>
      </Buttons>

      <Paragraph
        color="text-contrast-light"
        fontSize="text-xs"
        margin="mb-0"
        className="max-w-2xl"
      >
        {COLOR_DISCLAIMER}
      </Paragraph>
    </Section>
  )
}
