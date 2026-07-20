'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { ColorSwatches } from '@/components/color-swatches'
import { Span } from '@/components/span'
import { Label } from '@/components/label'
import { state, useSnapshot } from '@/state'
import { PanelStage } from './lazy-stage'
import type { ViewPreset } from './stage'
import { PANEL_PROFILES, type PanelProfileId } from './profiles'

interface PanelStudioProps {
  profile: PanelProfileId
}

/**
 * Full-page interactive studio for a single panel profile: a large, zoomable
 * model with controls for the wire view, the purlin-bearing-leg variant,
 * dimension callouts, and the full finish chart. This is where the detailed
 * controls live, keeping the homepage card uncluttered.
 */
export function PanelStudio({ profile }: PanelStudioProps) {
  const snap = useSnapshot(state)
  const spec = PANEL_PROFILES[profile]
  const [wire, setWire] = useState(false)
  const [purlin, setPurlin] = useState(spec.defaultPurlin)
  const [showDimensions, setShowDimensions] = useState(true)
  const [preset, setPreset] = useState<ViewPreset>('front')
  // Start at 1 so the default preset is applied on mount, keeping the camera
  // in sync with the selected option (rather than the plain front framing).
  const [presetNonce, setPresetNonce] = useState(1)

  const applyPreset = (next: ViewPreset) => {
    setPreset(next)
    setPresetNonce((n) => n + 1)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Stage */}
      <div className="relative h-[42vh] min-h-64 overflow-hidden rounded-xl bg-body2 ring-1 ring-inset ring-body-dark/50 sm:h-[55vh] sm:min-h-80 lg:h-[60vh] lg:min-h-100">
        <PanelStage
          profile={profile}
          color={snap.panelColor}
          purlin={purlin}
          wire={wire}
          showDimensions={showDimensions}
          interactive
          preset={preset}
          presetNonce={presetNonce}
        />
        <Span
          color="text-contrast-light"
          fontSize="text-xs"
          className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 rounded-full bg-body/70 px-3 py-1 backdrop-blur sm:block"
        >
          Drag to rotate · Scroll to zoom
        </Span>
      </div>

      {/* Controls */}
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-6">
          <ControlGroup title="View">
            <Segmented
              options={[
                { label: 'Solid', value: 'solid' },
                { label: 'Wireframe', value: 'wire' },
              ]}
              value={wire ? 'wire' : 'solid'}
              onChange={(v) => setWire(v === 'wire')}
            />
            <SwitchRow
              label="Dimensions"
              checked={showDimensions}
              onChange={() => setShowDimensions((v) => !v)}
            />
          </ControlGroup>

          <ControlGroup title="Camera">
            <Segmented
              options={[
                { label: 'Front', value: 'front' },
                { label: 'Iso', value: 'iso' },
                { label: 'Top', value: 'top' },
              ]}
              value={preset}
              onChange={(v) => applyPreset(v as ViewPreset)}
            />
          </ControlGroup>

          {spec.hasVariant && (
            <ControlGroup title="Profile variant">
              <Segmented
                options={[
                  { label: spec.baseLabel, value: 'base' },
                  { label: spec.purlinLabel, value: 'purlin' },
                ]}
                value={purlin ? 'purlin' : 'base'}
                onChange={(v) => setPurlin(v === 'purlin')}
              />
            </ControlGroup>
          )}
        </div>

        <ControlGroup title="Finish">
          <ColorSwatches />
        </ControlGroup>
      </div>
    </div>
  )
}

function ControlGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <Label
        color="text-contrast-light"
        fontSize="text-xs"
        fontWeight="font-semibold"
        margin="mb-2"
        className="uppercase tracking-wide"
      >
        {title}
      </Label>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

interface Option {
  label: string
  value: string
}

/** Refined segmented control: a single inset track with sliding selection. */
function Segmented({
  options,
  value,
  onChange,
}: {
  options: Option[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div
      role="tablist"
      className="flex w-full gap-1 rounded-lg bg-body2 p-1 ring-1 ring-inset ring-body-dark/50"
    >
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={clsx(
              'flex-1 cursor-pointer rounded-md px-3 py-2 text-sm transition-colors',
              active
                ? 'bg-body font-semibold text-accent shadow-sm ring-1 ring-inset ring-body-dark/40'
                : 'font-medium text-contrast-light hover:bg-body/50 hover:text-contrast'
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

/** Labeled toggle switch for on/off options. */
function SwitchRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={clsx(
          'relative h-6 w-11 rounded-full bg-body-dark transition-colors peer-checked:bg-accent',
          'after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full',
          'after:bg-body after:shadow-sm after:transition-transform peer-checked:after:translate-x-5'
        )}
      />
      <Span
        color="text-contrast"
        fontSize="text-sm"
        className="font-medium"
      >
        {label}
      </Span>
    </label>
  )
}
