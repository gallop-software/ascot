import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Image } from '@/components/image'
import {
  STRUCTURAL_COMPONENTS,
  ACCESSORY_PRODUCTS,
  type Product,
} from '@/catalog'

/**
 * The products page lists the manufactured line item by item. Panels have their
 * own comparison at /panels and trim lives at /trims, so this grid covers the
 * structural and accessory products that complete a package.
 */
const PRODUCTS: Product[] = [...STRUCTURAL_COMPONENTS, ...ACCESSORY_PRODUCTS]

/** Catalog card for a single product. Not exported, per Canon rule 025. */
function ProductCard({ product }: { product: Product }) {
  return (
    <article
      id={product.slug}
      className="flex flex-col scroll-mt-32 rounded-none border border-accent3-dark bg-body-light"
    >
      {product.image && (
        <div className="overflow-hidden border-b border-accent3-dark">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            rounded="rounded-none"
            aspect="aspect-[3/2]"
            className="w-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <Heading
          as="h4"
          margin="mb-2"
        >
          {product.name}
        </Heading>

        <Paragraph
          fontSize="text-base"
          color="text-contrast-light"
          margin="mb-0"
        >
          {product.shortDescription}
        </Paragraph>
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
      <div className="mb-12 max-w-3xl md:mb-16">
        <Heading as="h2">Full Line</Heading>
        <Heading as="h3">Products We Manufacture</Heading>
        <Paragraph
          color="text-contrast-light"
          margin="mb-0"
        >
          Structural framing, fasteners, closures, and accessories, all produced
          to the approved order and bundled with the rest of your package.
        </Paragraph>
      </div>

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
