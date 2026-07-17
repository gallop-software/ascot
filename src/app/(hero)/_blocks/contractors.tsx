import { Section } from '@/components/section'
import { Columns, Column } from '@/components/columns'
import { Image } from '@/components/image'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { List, Li } from '@/components/list'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { SectionHeading } from '@/components/section-heading'
import { CONTRACTOR_BENEFITS } from '@/catalog'
import { cta } from '@/config'
import arrowRightIcon from '@iconify/icons-heroicons/arrow-right-20-solid'
import phoneIcon from '@iconify/icons-lucide/phone'
import checkIcon from '@iconify/icons-lucide/check'

export default function Contractors() {
  return (
    <Section
      id="contractors"
      className="bg-body py-20 md:py-28"
    >
      <Columns
        cols="grid-cols-1 lg:grid-cols-2"
        gap="gap-12 lg:gap-16"
        align="items-center"
      >
        <Column>
          <Image
            src="/placeholder.png"
            alt="Labeled bundles of metal panels and trim staged on a flatbed trailer for jobsite delivery"
            size="large"
            rounded="rounded-none"
            aspect="aspect-[4/3]"
            className="w-full object-cover"
          />
        </Column>

        <Column>
          <SectionHeading
            heading="A Supply Partner That Understands the Jobsite"
            className="mb-6"
          />
          <Paragraph
            variant="large"
            color="text-contrast-light"
            margin="mb-8"
            className="text-pretty"
          >
            Accurate orders, dependable lead times, organized material bundles,
            and responsive support help contractors keep projects moving.
          </Paragraph>

          <div className="mb-8 border border-accent3-dark bg-body-light p-6 md:p-8">
            <Span
              fontFamily="font-heading2"
              fontSize="text-sm"
              fontWeight="font-semibold"
              color="text-accent-dark"
              className="mb-4 block uppercase tracking-[0.2em]"
            >
              Contractor Program
            </Span>
            <List
              variant="unstyled"
              margin="mb-0"
              className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2"
            >
              {CONTRACTOR_BENEFITS.map((benefit) => (
                <Li
                  key={benefit}
                  icon={checkIcon}
                  iconSize="w-5 h-5"
                  className="text-accent-dark"
                >
                  <Span
                    color="text-contrast"
                    fontSize="text-base"
                  >
                    {benefit}
                  </Span>
                </Li>
              ))}
            </List>
          </div>

          <Buttons margin="mt-0 mb-0">
            <Button
              href={cta.contractor.href}
              size="medium"
              icon={arrowRightIcon}
              iconPlacement="after"
              className="max-sm:w-full"
            >
              {cta.contractor.label}
            </Button>
            <Button
              href={cta.sales.href}
              variant="outline"
              size="medium"
              native
              icon={phoneIcon}
              iconPlacement="before"
              className="max-sm:w-full"
            >
              {cta.sales.label}
            </Button>
          </Buttons>
        </Column>
      </Columns>
    </Section>
  )
}
