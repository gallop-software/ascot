import { Section } from '@/components/section'
import { Columns, Column } from '@/components/columns'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { List, Li } from '@/components/list'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { SectionHeading } from '@/components/section-heading'
import { BUILDING_TYPES, BUILDING_BENEFITS } from '@/catalog'
import { cta } from '@/config'
import arrowRightIcon from '@iconify/icons-heroicons/arrow-right-20-solid'
import checkIcon from '@iconify/icons-lucide/check'

export default function Buildings() {
  return (
    <Section
      id="buildings"
      className="bg-body py-20 md:py-28"
    >
      <Columns
        cols="grid-cols-1 lg:grid-cols-2"
        gap="gap-12 lg:gap-16"
        align="items-center"
      >
        <Column>
          <SectionHeading
            eyebrow="Complete Building Solutions"
            heading="From Individual Components to Complete Steel Packages"
            className="mb-6"
          />
          <Paragraph
            variant="large"
            color="text-contrast-light"
            margin="mb-8"
            className="text-pretty"
          >
            Whether the project is a ranch shop, warehouse, commercial facility,
            equipment barn, or municipal building, our team coordinates the
            structural components, panels, trim, fasteners, and accessories
            required for an efficient build.
          </Paragraph>

          <div className="mb-8 border-l-2 border-accent pl-6">
            <Span
              fontFamily="font-heading2"
              fontSize="text-sm"
              fontWeight="font-semibold"
              color="text-accent"
              className="mb-3 block uppercase tracking-[0.2em]"
            >
              Building Types
            </Span>
            <List
              variant="unstyled"
              margin="mb-0"
              className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2"
            >
              {BUILDING_TYPES.map((type) => (
                <Li key={type}>
                  <Span
                    color="text-contrast"
                    fontSize="text-base"
                    fontWeight="font-medium"
                  >
                    {type}
                  </Span>
                </Li>
              ))}
            </List>
          </div>

          <Buttons margin="mt-0 mb-0">
            <Button
              href={cta.buildings.href}
              size="medium"
              icon={arrowRightIcon}
              iconPlacement="after"
              className="max-sm:w-full"
            >
              {cta.buildings.label}
            </Button>
          </Buttons>
        </Column>

        <Column>
          <Image
            src="/placeholder.png"
            alt="Erected steel building frame with roof purlins and wall panels partially installed"
            size="large"
            rounded="rounded-none"
            aspect="aspect-[4/3]"
            className="mb-8 w-full object-cover"
          />

          <div className="border border-accent4-dark bg-accent2-dark p-6 md:p-8">
            <Span
              fontFamily="font-heading2"
              fontSize="text-sm"
              fontWeight="font-semibold"
              color="text-accent-light"
              className="mb-4 block uppercase tracking-[0.2em]"
            >
              What Comes With the Package
            </Span>
            <List
              variant="unstyled"
              margin="mb-0"
              gap="gap-y-3"
            >
              {BUILDING_BENEFITS.map((benefit) => (
                <Li
                  key={benefit}
                  icon={checkIcon}
                  iconSize="w-5 h-5"
                  className="text-accent-light"
                >
                  <Span
                    color="text-accent3"
                    fontSize="text-base"
                  >
                    {benefit}
                  </Span>
                </Li>
              ))}
            </List>
          </div>
        </Column>
      </Columns>
    </Section>
  )
}
