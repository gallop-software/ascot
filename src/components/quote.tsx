import { clsx } from 'clsx'

export interface QuoteProps extends React.ComponentPropsWithoutRef<'blockquote'> {
  /** Variant of the quote - controls default styling */
  variant?: 'default' | 'large' | 'small'
  /** Font size override */
  fontSize?: string
  /** Text color override */
  color?: string
  /** Font family override */
  fontFamily?: string
  /** Font weight override */
  fontWeight?: string
  /** Font style override */
  fontStyle?: string
  /** Text alignment override */
  textAlign?: string
  /** Margin override */
  margin?: string
  /** Additional CSS classes */
  className?: string
}

export function Quote({
  className = '',
  variant = 'default',
  fontSize = '',
  color = '',
  fontFamily = '',
  fontWeight = '',
  fontStyle = '',
  textAlign = '',
  margin = '',
  children,
  ...props
}: QuoteProps) {
  // Size presets only, so otherwise the quote matches normal paragraph styling
  // (body font, upright, normal weight) rather than a stylised pull-quote.
  const variantClasses = {
    default: 'text-xl/normal',
    large: 'text-2xl/normal sm:text-2xl/normal',
    small: 'text-lg/normal',
  }

  // Use user-defined values if provided, otherwise use defaults
  const finalFontSize = fontSize || variantClasses[variant]
  const finalColor = color || 'text-contrast-light'
  const finalFontFamily = fontFamily || '' // inherit body font, like Paragraph
  const finalFontWeight = fontWeight || 'font-normal' // match Paragraph weight
  const finalFontStyle = fontStyle || '' // upright, like Paragraph
  const finalTextAlign = textAlign || '' // no default text alignment
  const finalMargin = margin || 'mb-8'

  return (
    <blockquote
      className={clsx(
        finalFontSize,
        finalColor,
        finalFontFamily,
        finalFontWeight,
        finalFontStyle,
        finalTextAlign,
        finalMargin,
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  )
}
