import type { CSSProperties } from 'react'
import { clsx } from 'clsx'

import { panelColors } from '@/utils/panel-colors'

interface ColorChartProps {
  className?: string
}

/**
 * Labeled grid of every metal panel color — the printable "color chart"
 * counterpart to ColorSwatches (which is an interactive, name-on-hover
 * preview). Server component: hex values are static supplier data applied
 * via inline style, which Canon permits for components rendering dynamic
 * values.
 */
export function ColorChart({ className }: ColorChartProps) {
  return (
    <div
      className={clsx(
        'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
        className,
      )}
    >
      {panelColors.map((color) => {
        const style: CSSProperties = { backgroundColor: color.hex }
        return (
          <figure
            key={color.name}
            className="flex flex-col gap-2"
          >
            <div
              className="aspect-[4/3] rounded-lg shadow-sm ring-1 ring-inset ring-contrast/10"
              style={style}
            />
            <figcaption className="text-sm font-medium text-contrast">
              {color.name}
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}
