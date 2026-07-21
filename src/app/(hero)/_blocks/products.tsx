import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { ProductCategoryCard } from '@/components/product-category-card'
import { PRODUCT_CATEGORIES } from '@/catalog'

/**
 * Descriptive per-category link labels. Keyed by catalog slug so the copy stays
 * specific ("View Roofing Panels") instead of a generic "Learn More" repeated
 * six times, which would leave screen-reader users with six identical links.
 */
const LINK_LABELS: Record<string, string> = {
  'roofing-panels': 'View Roofing Panels',
  'wall-panels': 'View Wall and Liner Panels',
  'structural-components': 'View Structural Components',
  'trim-and-flashing': 'View Trim',
  'fasteners-and-accessories': 'View Fasteners and Accessories',
  'building-packages': 'View Building Packages',
}

export default function Products() {
  return (
    <Section
      id="products"
      className="bg-body py-20 md:py-28"
    >
      <div className="mb-12 max-w-3xl md:mb-16">
        <Heading as="h2">What We Manufacture</Heading>
        <Heading as="h3">Steel Products Built Around Real Projects</Heading>
        <Paragraph
          color="text-contrast-light"
          margin="mb-0"
        >
          From individual roofing panels to complete building packages, Frontier
          Metals supplies dependable components manufactured to project
          specifications.
        </Paragraph>
      </div>

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
  )
}
