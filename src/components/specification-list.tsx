import { clsx } from 'clsx'
import type { Spec } from '@/catalog'
import { Span } from '@/components/span'

export interface SpecificationListProps {
  specs: Spec[]
  /**
   * 'list':  stacked label/value rows. Safe at any width; the default.
   * 'table': a real <table> for dense spec sheets, wrapped in an
   *           overflow-x-auto container so it scrolls itself instead of
   *           forcing the page sideways on mobile.
   */
  variant?: 'list' | 'table'
  /** Render for placement on a dark (accent2 / navy) surface. */
  dark?: boolean
  className?: string
}

/**
 * Technical specification rows, the spec-table treatment used across panel,
 * product, and structural component pages.
 */
export function SpecificationList({
  specs,
  variant = 'list',
  dark = false,
  className,
}: SpecificationListProps) {
  if (specs.length === 0) return null

  const labelColor = dark ? 'text-accent3' : 'text-contrast-light'
  const valueColor = dark ? 'text-overlay-text' : 'text-contrast'

  if (variant === 'table') {
    return (
      <dl
        className={clsx(
          'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4',
          className
        )}
      >
        {specs.map((spec) => (
          <div
            key={spec.label}
            className={clsx(
              'flex flex-col gap-y-1 border p-6',
              dark
                ? 'border-accent4-dark'
                : 'border-accent3-dark bg-body-light/50'
            )}
          >
            <dd className="order-1">
              <Span
                fontFamily="font-heading"
                fontSize="text-4xl"
                fontWeight="font-bold"
                color={valueColor}
                className="tracking-tight"
              >
                {spec.value}
              </Span>
            </dd>
            <dt className="order-2">
              <Span
                fontSize="text-base"
                color={labelColor}
              >
                {spec.label}
              </Span>
            </dt>
          </div>
        ))}
      </dl>
    )
  }

  return (
    <dl className={clsx('w-full', className)}>
      {specs.map((spec) => (
        <div
          key={spec.label}
          className={clsx(
            'flex flex-col gap-x-4 gap-y-1 py-1.5',
            'sm:flex-row sm:items-baseline sm:justify-between'
          )}
        >
          <dt>
            <Span
              fontSize="text-sm"
              color={labelColor}
            >
              {spec.label}
            </Span>
          </dt>
          <dd className="sm:text-right">
            <Span
              fontSize="text-sm"
              fontWeight="font-semibold"
              color={valueColor}
            >
              {spec.value}
            </Span>
          </dd>
        </div>
      ))}
    </dl>
  )
}
