import { Section } from '@/components/section'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SectionHeading } from '@/components/section-heading'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import phoneIcon from '@iconify/icons-lucide/phone'
import { contact, cta } from '@/config'

export default function Hero() {
  return (
    <Section
      imageSrc="/images/categories/metal-roofing-panels.jpg"
      imageAlt=""
      overlayColor="bg-accent2/90"
      className="bg-accent2 pt-40 pb-16 md:pt-52 md:pb-20 lg:pt-64"
    >
      <Breadcrumbs
        dark
        className="mb-8"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Color Chart' },
        ]}
      />

      <SectionHeading
        as="h1"
        dark
        eyebrow="Panel Finishes"
        heading="Choose a Finish That Fits the Project"
        intro="Every color below is available across the panel, trim, and accessory lines, so an elevation reads as one system rather than three near-misses. Screens are approximate — ask us for physical samples before you commit."
        className="mb-8 max-w-3xl"
      />

      <Buttons margin="mt-0 mb-0">
        <Button
          href={cta.quote.href}
          size="medium"
          dark
          className="max-sm:w-full"
        >
          {cta.quote.label}
        </Button>
        <Button
          href={contact.phoneHref}
          variant="outline"
          size="medium"
          dark
          native
          icon={phoneIcon}
          iconPlacement="before"
          className="max-sm:w-full"
        >
          {`Call ${contact.phone}`}
        </Button>
      </Buttons>
    </Section>
  )
}
