import { Section } from '@/components/section'
import { Columns, Column } from '@/components/columns'
import { Image } from '@/components/image'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { List, Li } from '@/components/list'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { BUILDING_TYPES } from '@/catalog'
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
          <div className="mb-6">
            <Heading as="h2">Complete Building Solutions</Heading>
            <Heading
              as="h3"
              margin="mb-0"
            >
              From Individual Components to Complete Steel Packages
            </Heading>
          </div>
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

          <List
            variant="unstyled"
            margin="mb-8"
            className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2"
          >
            {BUILDING_TYPES.map((type) => (
              <Li
                key={type}
                icon={checkIcon}
                iconSize="w-5 h-5"
                className="text-accent"
              >
                <Span
                  color="text-contrast-light"
                  fontSize="text-base"
                  fontWeight="font-medium"
                >
                  {type}
                </Span>
              </Li>
            ))}
          </List>

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
            src="/building-1.jpg"
            alt="Erected steel building frame with roof purlins and wall panels partially installed"
            size="large"
            rounded="rounded-none"
            aspect="aspect-[4/3]"
            className="w-full object-cover"
          />
        </Column>
      </Columns>
    </Section>
  )
}
