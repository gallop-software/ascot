'use client'

import type { CSSProperties } from 'react'
import { clsx } from 'clsx'
import { state, useSnapshot } from '@/state'
import { panelColors, type PanelColor } from '@/utils/panel-colors'

export { panelColors, type PanelColor }

interface ColorSwatchesProps {
  className?: string
}

/**
 * Responsive grid of metal panel color swatches. Each swatch has a minimum
 * size (so it stays consistent wherever it's used) but the columns expand to
 * fill the container width via auto-fill. Dynamic hex values are applied via
 * inline style (permitted for components rendering dynamic data).
 */
export function ColorSwatches({ className }: ColorSwatchesProps) {
  const snap = useSnapshot(state)

  return (
    <div
      className={clsx(
        'grid grid-cols-[repeat(auto-fill,minmax(3.75rem,1fr))] gap-3',
        className,
      )}
    >
      {panelColors.map((color) => {
        const selected = snap.panelColor === color.hex
        const style: CSSProperties = { backgroundColor: color.hex }
        if (selected) {
          // Match the reference: a same-color ring separated by a gap.
          ;(style as Record<string, string>)['--tw-ring-color'] = color.hex
        }
        return (
          <button
            key={color.name}
            type="button"
            title={color.name}
            aria-label={`Preview panels in ${color.name}`}
            aria-pressed={selected}
            onClick={() => {
              state.panelColor = color.hex
            }}
            className={clsx(
              'aspect-square cursor-pointer rounded-md transition',
              selected
                ? 'relative z-10 ring-2 ring-offset-2 ring-offset-body'
                : 'shadow-sm ring-1 ring-inset ring-contrast/10',
            )}
            style={style}
          />
        )
      })}
    </div>
  )
}
