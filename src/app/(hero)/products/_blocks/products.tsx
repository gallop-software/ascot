import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { SectionHeading } from '@/components/section-heading'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { Image } from '@/components/image'
import { STRUCTURAL_COMPONENTS, ACCESSORY_PRODUCTS, type Product } from '@/catalog'

/**
 * The products page lists the manufactured line item by item. Panels have their
 * own comparison at /panels and trim lives at /trims, so this grid covers the
 * structural and accessory products that complete a package.
 */
const PRODUCTS: Product[] = [...STRUCTURAL_COMPONENTS, ...ACCESSORY_PRODUCTS]

/** Catalog card for a single product. Not exported — Canon rule 025. */
function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col rounded-none border border-accent3-dark bg-body-light">
      <div className="overflow-hidden border-b border-accent3-dark">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          size="medium"
          rounded="rounded-none"
          aspect="aspect-[3/2]"
          className="w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Heading
          as="h3"
          fontSize="text-lg"
          fontWeight="font-bold"
          letterSpacing="tracking-tight"
          lineHeight="leading-tight"
          color="text-contrast"
          margin="mb-2"
        >
          {product.name}
        </Heading>

        <Paragraph
          fontSize="text-base"
          color="text-contrast-light"
          margin="mb-4"
          className="flex-1"
        >
          {product.shortDescription}
        </Paragraph>

        <Span
          fontFamily="font-heading2"
          fontSize="text-sm"
          fontWeight="font-semibold"
          color="text-accent-dark"
          className="uppercase tracking-[0.16em]"
        >
          {product.applications.join(' · ')}
        </Span>
      </div>
    </article>
  )
}

/** Grid of the structural and accessory products we manufacture. */
export default function Products() {
  return (
    <Section
      id="products"
      className="bg-body py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Full Line"
        heading="Products We Manufacture"
        intro="Structural framing, fasteners, closures, and accessories — produced to the approved order and bundled with the rest of your package."
        className="mb-12 max-w-3xl md:mb-16"
      />

      <Grid
        cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        gap="gap-6 lg:gap-8"
      >
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
          />
        ))}
      </Grid>
    </Section>
  )
}
