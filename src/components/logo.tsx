import clsx from 'clsx'
import { Image } from '@/components/image'
import { company } from '@/config'

interface LogoProps {
  className?: string
  /** Rendered height of the mark in px. Clamped to `maxHeight`. */
  height?: number
  /** Upper bound on the rendered height in px. */
  maxHeight?: number
  /** Rendered width in px. Takes precedence over `height` when set. */
  width?: number
  /** @deprecated Retained for call-site compatibility; the raster mark is fixed. */
  dark?: boolean
  /** @deprecated Retained for call-site compatibility; both variants render the mark. */
  variant?: 'full' | 'mark'
  /** @deprecated Retained for call-site compatibility; the raster mark is fixed. */
  monochrome?: boolean
}

/**
 * Company logo.
 *
 * Renders `public/logo.png` through the studio Image pipeline. Every call site
 * renders through this component, so swap the asset to rebrand.
 *
 * The asset carries the wordmark, so there is no separate text rendering and no
 * color variants: the mark must read on both light and dark surfaces on its own.
 */
export function Logo({
  className = '',
  height = 34,
  maxHeight = 72,
  width,
}: LogoProps) {
  // Inline sizing because the values are dynamic: Tailwind's preflight sets
  // `img { height: auto }`, which overrides the img height attribute, so the
  // size has to come from CSS on the wrapper.
  return (
    <span
      className={clsx('inline-flex', className)}
      style={width ? { width } : { height: Math.min(height, maxHeight) }}
    >
      <span className="sr-only">{company.name}</span>
      <Image
        src="/logo.png"
        alt=""
        size="small"
        lazy={false}
        rounded="rounded-none"
        className={clsx('flex-none', width ? 'h-auto w-full' : 'h-full w-auto')}
      />
    </span>
  )
}
