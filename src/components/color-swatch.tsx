import type { CSSProperties } from 'react'
import { clsx } from 'clsx'
import type { PanelColor } from '@/catalog'
import { Span } from '@/components/span'

export interface ColorSwatchProps extends PanelColor {
  className?: string
}

/**
 * A single panel color chip with its name.
 *
 * The fill is real product finish data, not a theme color, so it comes from the
 * `hex` field via an inline style — Canon rule 008 permits inline styles in
 * components for dynamic values (never in blocks). The name is always rendered
 * as visible text so the color is never the only carrier of meaning, and the
 * chip clears a 44px tap target on mobile.
 */
export function ColorSwatch({ name, hex, className }: ColorSwatchProps) {
  const fill: CSSProperties = { backgroundColor: hex }

  return (
    <figure className={clsx('flex flex-col gap-y-2', className)}>
      <div
        style={fill}
        className="min-h-11 aspect-[4/3] w-full rounded-sm border border-accent4/40"
      />
      <figcaption>
        <Span
          fontSize="text-sm"
          fontWeight="font-medium"
          color="text-contrast"
        >
          {name}
        </Span>
      </figcaption>
    </figure>
  )
}

export interface ColorSwatchGridProps {
  colors: PanelColor[]
  className?: string
}

/**
 * Responsive grid of ColorSwatch chips — the standard color-chart layout.
 * Pair with COLOR_DISCLAIMER from `@/catalog` at the call site: screen
 * rendering of finishes is approximate.
 */
export function ColorSwatchGrid({ colors, className }: ColorSwatchGridProps) {
  return (
    <div
      className={clsx(
        'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
        className
      )}
    >
      {colors.map((color) => (
        <ColorSwatch
          key={color.name}
          name={color.name}
          hex={color.hex}
        />
      ))}
    </div>
  )
}
