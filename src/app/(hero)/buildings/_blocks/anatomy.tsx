import { Section } from '@/components/section'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { BuildingViewer } from '@/components/building-viewer'

/** Interactive 3D model of a 60 x 120 pre-engineered building frame. */
export default function Anatomy() {
  return (
    <Section className="bg-body2 py-20 md:py-28">
      <div className="mb-12 max-w-3xl md:mb-16">
        <Heading as="h2">See It in 3D</Heading>
        <Heading as="h3">An 80 × 140 Building Frame</Heading>
        <Paragraph
          color="text-contrast-light"
          margin="mb-0"
        >
          Rotate a typical primary-frame layout — rigid frames, purlins, girts,
          and eave struts — to see how a pre-engineered package goes together
          before the panels go on.
        </Paragraph>
      </div>

      <div className="border border-accent3-dark bg-body-light">
        <BuildingViewer />
      </div>
    </Section>
  )
}
