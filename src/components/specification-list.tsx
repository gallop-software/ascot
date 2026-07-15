import { clsx } from 'clsx'
import type { Spec } from '@/catalog'
import { Span } from '@/components/span'

export interface SpecificationListProps {
  specs: Spec[]
  /**
   * 'list'  — stacked label/value rows. Safe at any width; the default.
   * 'table' — a real <table> for dense spec sheets, wrapped in an
   *           overflow-x-auto container so it scrolls itself instead of
   *           forcing the page sideways on mobile.
   */
  variant?: 'list' | 'table'
  /** Render for placement on a dark (accent2 / navy) surface. */
  dark?: boolean
  className?: string
}

/**
 * Technical specification rows — the spec-table treatment used across panel,
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
  const ruleColor = dark ? 'border-accent4-dark' : 'border-accent3-dark'

  if (variant === 'table') {
    return (
      <div className={clsx('w-full overflow-x-auto', className)}>
        <table className="w-full min-w-md border-collapse text-left">
          <caption className="sr-only">Specifications</caption>
          <thead>
            <tr className={clsx('border-b-2', ruleColor)}>
              <th
                scope="col"
                className="px-4 py-3"
              >
                <Span
                  fontFamily="font-heading2"
                  fontSize="text-sm"
                  fontWeight="font-semibold"
                  color={labelColor}
                  className="uppercase tracking-[0.14em]"
                >
                  Specification
                </Span>
              </th>
              <th
                scope="col"
                className="px-4 py-3"
              >
                <Span
                  fontFamily="font-heading2"
                  fontSize="text-sm"
                  fontWeight="font-semibold"
                  color={labelColor}
                  className="uppercase tracking-[0.14em]"
                >
                  Value
                </Span>
              </th>
            </tr>
          </thead>
          <tbody>
            {specs.map((spec) => (
              <tr
                key={spec.label}
                className={clsx('border-b', ruleColor)}
              >
                <th
                  scope="row"
                  className="px-4 py-3 align-top font-normal"
                >
                  <Span
                    fontSize="text-base"
                    color={labelColor}
                  >
                    {spec.label}
                  </Span>
                </th>
                <td className="px-4 py-3 align-top">
                  <Span
                    fontSize="text-base"
                    fontWeight="font-semibold"
                    color={valueColor}
                  >
                    {spec.value}
                  </Span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <dl className={clsx('w-full', className)}>
      {specs.map((spec) => (
        <div
          key={spec.label}
          className={clsx(
            'flex flex-col gap-x-4 gap-y-1 border-b py-3',
            'sm:flex-row sm:items-baseline sm:justify-between',
            ruleColor
          )}
        >
          <dt>
            <Span
              fontFamily="font-heading2"
              fontSize="text-sm"
              fontWeight="font-medium"
              color={labelColor}
              className="uppercase tracking-[0.14em]"
            >
              {spec.label}
            </Span>
          </dt>
          <dd className="sm:text-right">
            <Span
              fontSize="text-base"
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
