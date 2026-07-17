import { Section } from '@/components/section'
import { Columns, Column } from '@/components/columns'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { SectionHeading } from '@/components/section-heading'
import { serviceArea } from '@/config'

/** Company narrative: how ForgeSpan grew from panels and trim into full packages. */
export default function Story() {
  return (
    <Section className="bg-body py-20 md:py-28">
      <Columns
        cols="grid-cols-1 lg:grid-cols-12"
        gap="gap-10 lg:gap-16"
        align="items-start"
      >
        <Column className="lg:col-span-7">
          <SectionHeading
            eyebrow="Our Story"
            heading="From a Regional Panel Shop to Complete Steel Packages"
            className="mb-6"
          />

          <Paragraph
            color="text-contrast-light"
            margin="mb-4"
            className="text-pretty"
          >
            ForgeSpan Metals began as a regional panel and trim operation serving
            contractors, farms, and ranches. Over more than 25 years, the company
            expanded its manufacturing capabilities to include roofing and wall
            panels, custom trim, structural components, and coordinated steel
            building packages.
          </Paragraph>

          <Paragraph
            color="text-contrast-light"
            margin="mb-0"
            className="text-pretty"
          >
            Today, ForgeSpan supports agricultural, commercial, industrial, and
            residential construction throughout West Texas and neighboring
            regions. Our team combines practical project knowledge with modern
            production equipment to deliver accurate components, dependable lead
            times, and straightforward service.
          </Paragraph>

          <div className="mt-8 flex flex-col items-start border-l-2 border-accent bg-accent3-light/40 px-6 py-5">
            <Span
              fontFamily="font-heading2"
              fontSize="text-sm"
              fontWeight="font-semibold"
              color="text-accent-dark"
              margin="mb-2"
              className="uppercase tracking-[0.16em]"
            >
              Where We Work
            </Span>
            <Paragraph
              fontSize="text-base"
              color="text-contrast"
              margin="mb-0"
            >
              {serviceArea.summary}
            </Paragraph>
          </div>
        </Column>

        <Column className="lg:col-span-5">
          <Image
            src="/placeholder.png"
            alt="ForgeSpan Metals operator forming a custom trim piece on a press brake"
            size="large"
            rounded="rounded-none"
            aspect="aspect-[4/5]"
            className="w-full border border-accent3-dark object-cover"
          />
        </Column>
      </Columns>
    </Section>
  )
}
