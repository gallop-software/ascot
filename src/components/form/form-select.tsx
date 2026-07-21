import { Icon } from '@/components/icon'
import chevronDownIcon from '@iconify/icons-lucide/chevron-down'
import { inputBaseStyles } from './utils'

// ============================================================================
// FormSelect Component
// ============================================================================

export type FormSelectOption = { value: string; label: string }

export type FormSelectProps = {
  id?: string
  name: string
  /**
   * Either plain strings (value === label) or explicit {value, label} pairs.
   */
  options: string[] | FormSelectOption[]
  required?: boolean
  /**
   * Prompt shown as a disabled first option. Because it carries an empty
   * value, a `required` select rejects it, so the user must make a real choice.
   */
  placeholder?: string
  defaultValue?: string
  className?: string
  /**
   * Human-readable field name. Mirrors FormInput: emitted as `data-label`,
   * which the parent Form reads to title this field in the submission payload.
   */
  label?: string
}

function normalizeOptions(
  options: string[] | FormSelectOption[]
): FormSelectOption[] {
  return options.map((option) =>
    typeof option === 'string' ? { value: option, label: option } : option
  )
}

export function FormSelect({
  id,
  name,
  options,
  required,
  placeholder,
  defaultValue,
  className = '',
  label = '',
}: FormSelectProps) {
  const normalized = normalizeOptions(options)

  return (
    <div className="relative">
      <select
        id={id ?? name}
        name={name}
        required={required}
        defaultValue={defaultValue ?? (placeholder ? '' : undefined)}
        aria-label={label || undefined}
        data-label={label}
        className={`${inputBaseStyles} appearance-none pr-12 ${className}`}
      >
        {placeholder && (
          <option
            value=""
            disabled
          >
            {placeholder}
          </option>
        )}
        {normalized.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        icon={chevronDownIcon}
        className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-contrast/60"
      />
    </div>
  )
}
