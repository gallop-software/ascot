import { Section } from '@/components/section'
import { Columns, Column } from '@/components/columns'
import { Image } from '@/components/image'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { List, Li } from '@/components/list'
import { serviceArea } from '@/config'
import checkIcon from '@iconify/icons-lucide/check'

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
          <div className="mb-6">
            <Heading as="h2">Our Story</Heading>
            <Heading
              as="h3"
              margin="mb-0"
            >
              From a Regional Panel Shop to Complete Steel Packages
            </Heading>
          </div>

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

          <div className="mt-8 flex flex-col items-start">
            <Heading
              as="h4"
              margin="mb-3"
            >
              Where We Work
            </Heading>
            <List
              variant="unstyled"
              margin="mb-0"
              className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2"
            >
              {serviceArea.areas.map((area) => (
                <Li
                  key={area}
                  icon={checkIcon}
                  iconSize="w-5 h-5"
                  className="text-accent"
                >
                  <Span
                    color="text-contrast-light"
                    fontSize="text-base"
                    fontWeight="font-medium"
                  >
                    {area}
                  </Span>
                </Li>
              ))}
            </List>
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
