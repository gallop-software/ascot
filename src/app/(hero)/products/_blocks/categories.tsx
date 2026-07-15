import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { SectionHeading } from '@/components/section-heading'
import { ProductCategoryCard } from '@/components/product-category-card'
import { PanelProfileCard } from '@/components/panel-profile-card'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { PRODUCT_CATEGORIES, FEATURED_PANELS } from '@/catalog'

/**
 * Descriptive per-category link labels, keyed by catalog slug. A screen-reader
 * user pulling up a list of links needs each one to stand on its own, so never
 * "Learn More" six times over.
 */
const LINK_LABELS: Record<string, string> = {
  'roofing-panels': 'View Roofing Panels',
  'wall-panels': 'View Wall and Liner Panels',
  'structural-components': 'View Structural Components',
  'trim-and-flashing': 'View Trim and Flashing',
  'fasteners-and-accessories': 'View Fasteners and Accessories',
  'building-packages': 'View Building Packages',
}

export default function Categories() {
  return (
    <>
      <Section
        id="categories"
        className="bg-body py-20 md:py-28"
      >
        <SectionHeading
          eyebrow="Product Lines"
          heading="Six Lines That Cover the Whole Envelope"
          intro="Order one profile or the entire package — the components are manufactured to the same specifications either way."
          className="mb-12 max-w-3xl md:mb-16"
        />

        <Grid
          cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          gap="gap-6 lg:gap-8"
        >
          {PRODUCT_CATEGORIES.map((category) => (
            <ProductCategoryCard
              key={category.slug}
              title={category.title}
              description={category.description}
              href={category.href}
              image={category.image}
              linkLabel={LINK_LABELS[category.slug] || `View ${category.title}`}
            />
          ))}
        </Grid>
      </Section>

      <Section
        id="featured-panels"
        className="bg-accent3 py-20 md:py-28"
      >
        <SectionHeading
          eyebrow="Most Requested"
          heading="Panel Profiles Contractors Order Most"
          intro="Three exposed-fastener profiles that cover the majority of roof, wall, and liner work. Each has an interactive model you can rotate and section."
          className="mb-12 max-w-3xl md:mb-16"
        />

        <Grid
          cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          gap="gap-6 lg:gap-8"
          className="mb-12"
        >
          {FEATURED_PANELS.map((panel) => (
            <PanelProfileCard
              key={panel.slug}
              panel={panel}
              href={`/panels/${panel.slug}`}
            />
          ))}
        </Grid>

        <Buttons margin="mt-0 mb-0">
          <Button
            href="/panels"
            size="medium"
            className="max-sm:w-full"
          >
            Compare All Six Panel Profiles
          </Button>
        </Buttons>
      </Section>
    </>
  )
}
