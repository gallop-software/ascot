import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { Icon } from '@/components/icon'
import { ColorSwatchGrid } from '@/components/color-swatch'
import { PANEL_COLORS, COLOR_DISCLAIMER } from '@/catalog'
import infoIcon from '@iconify/icons-lucide/info'

export default function Chart() {
  return (
    <Section
      id="chart"
      className="bg-body py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Standard Line"
        heading="Standard Panel Colors"
        intro="A preview of the standard color line. Panels, trim, closures, and touch-up paint are all matched to these finishes."
        className="mb-8 max-w-3xl"
      />

      {/* Disclaimer sits above the swatches — it has to be read before, not
          after, someone picks a color off a screen. */}
      <div className="mb-10 flex items-start gap-x-3 border-l-2 border-accent bg-accent3 p-5">
        <Icon
          icon={infoIcon}
          className="mt-0.5 h-5 w-5 flex-none text-accent-dark"
        />
        <Paragraph
          fontSize="text-base"
          color="text-contrast"
          margin="mb-0"
          className="max-w-3xl"
        >
          {COLOR_DISCLAIMER}
        </Paragraph>
      </div>

      <ColorSwatchGrid
        colors={PANEL_COLORS}
        className="mb-8"
      />

      <Span
        fontSize="text-sm"
        color="text-contrast-light"
      >
        Availability varies by profile, gauge, and finish. Contact us to confirm
        a color for your order and to request physical samples.
      </Span>
    </Section>
  )
}
