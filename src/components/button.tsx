import { Paragraph } from '@/components/paragraph'
import { Button as HeadlessButton } from '@headlessui/react'
import { clsx } from 'clsx'
import NextLink from 'next/link'
import { Icon } from '@/components/icon'

// Primary buttons fill with `accent-dark`, not `accent`. White label text on
// raw Safety Orange is 3.70:1, below the 4.5:1 WCAG AA floor for normal text.
// `accent-dark` carries the same industrial orange at 5.90:1, and hovering
// softens it to `accent-dark/30` as the interaction state.
const variants = {
  primary: {
    light: clsx(
      'inline-flex items-center justify-center',
      'rounded-sm border border-transparent bg-accent-dark shadow-md',
      'text-accent-contrast font-semibold',
      'disabled:bg-accent-dark disabled:opacity-40 hover:bg-accent-dark/80',
      'transition-colors duration-200'
    ),
    dark: clsx(
      'inline-flex items-center justify-center',
      'rounded-sm border border-transparent bg-accent-dark shadow-md',
      'text-accent-contrast font-semibold',
      'disabled:bg-accent-dark disabled:opacity-40 hover:bg-accent-dark/80',
      'transition-colors duration-200'
    ),
  },
  secondary: {
    light: clsx(
      'relative inline-flex items-center justify-center',
      'rounded-sm border border-transparent bg-body/35 shadow-md ring-1 ring-accent4-light/15',
      'after:absolute after:inset-0 after:rounded-sm after:shadow-[inset_0_0_2px_1px_#ffffff4d]',
      'text-contrast-dark',
      'disabled:bg-body/25 disabled:opacity-40 hover:bg-body/25',
      'transition-colors duration-200'
    ),
    dark: clsx(
      'relative inline-flex items-center justify-center',
      'rounded-sm border border-transparent bg-contrast-dark/15 shadow-md ring-1 ring-body/15',
      'after:absolute after:inset-0 after:rounded-sm after:shadow-[inset_0_0_2px_1px_#00000040]',
      'text-body',
      'disabled:bg-contrast-dark/15 disabled:opacity-40 hover:bg-contrast-dark/20',
      'transition-colors duration-200'
    ),
  },
  outline: {
    light: clsx(
      'inline-flex items-center justify-center',
      'rounded-sm border border-transparent shadow-sm ring-2 ring-inset ring-contrast-dark',
      'text-contrast-dark',
      'disabled:bg-transparent disabled:opacity-40 hover:bg-contrast-dark/5',
      'transition-colors duration-200'
    ),
    dark: clsx(
      'inline-flex items-center justify-center',
      'rounded-sm border border-transparent shadow-sm ring-2 ring-inset ring-body',
      'text-body',
      'disabled:bg-transparent disabled:opacity-40 hover:bg-body/5',
      'transition-colors duration-200'
    ),
  },
  text: {
    light: clsx(
      'inline-flex items-center',
      'text-accent font-semibold',
      'hover:text-accent/80',
      'transition-colors duration-200'
    ),
    dark: clsx(
      'inline-flex items-center',
      'text-body font-semibold',
      'hover:text-body/80',
      'transition-colors duration-200'
    ),
  },
}

const sizes = {
  small: clsx('px-4 py-[calc(--spacing(1.5)-1px)]', 'text-sm font-medium'),
  default: clsx('px-6 py-[calc(--spacing(2)-1px)]', 'text-base font-medium'),
  medium: clsx(
    'px-6 lg:px-8 py-[calc(--spacing(2)-1px)] lg:py-[calc(--spacing(3)-1px)]',
    'text-lg font-medium'
  ),
  large: clsx(
    'px-8 lg:px-10 py-[calc(--spacing(3)-1px)] lg:py-[calc(--spacing(4)-1px)]',
    'text-xl font-medium'
  ),
}

type ButtonProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  icon?: { body: string; width?: number; height?: number } | undefined
  iconPlacement?: 'before' | 'after' | undefined
  iconSize?: string
  wrap?: boolean
  dark?: boolean
  target?: '_self' | '_blank'
  native?: boolean
} & (
  | React.ComponentPropsWithoutRef<typeof NextLink>
  | (React.ComponentPropsWithoutRef<typeof HeadlessButton> & {
      href?: undefined
    })
)

export function Button({
  variant = 'primary',
  size = 'default',
  className,
  icon,
  iconPlacement = 'before',
  iconSize = 'w-5 h-5',
  wrap = false,
  dark = false,
  target = '_self',
  native = false,
  children,
  ...props
}: ButtonProps) {
  const variantKey = variant as keyof typeof variants
  const sizeKey = size as keyof typeof sizes
  const variantClass = dark
    ? variants[variantKey].dark
    : variants[variantKey].light
  // Text variant doesn't use size padding
  const sizeClass = variant === 'text' ? 'text-sm' : sizes[sizeKey]
  className = clsx('gallop-button', className, variantClass, sizeClass)

  const iconElement = icon ? (
    <Icon
      icon={icon}
      className={clsx(
        iconSize,
        iconPlacement === 'before' && children ? 'mr-2' : '',
        iconPlacement === 'after' && children ? 'ml-2' : ''
      )}
    />
  ) : null

  const content = (
    <>
      {iconPlacement === 'before' && iconElement}
      {children}
      {iconPlacement === 'after' && iconElement}
    </>
  )

  const buttonElement =
    typeof props.href === 'undefined' ? (
      <HeadlessButton
        {...props}
        className={clsx('cursor-pointer', className)}
      >
        {content}
      </HeadlessButton>
    ) : native ? (
      <a
        href={props.href as string}
        target={target}
        className={clsx('cursor-pointer no-underline!', className)}
      >
        {content}
      </a>
    ) : (
      <NextLink
        {...props}
        target={target}
        className={clsx('cursor-pointer no-underline!', className)}
      >
        {content}
      </NextLink>
    )

  if (wrap) {
    return <Paragraph>{buttonElement}</Paragraph>
  }

  return buttonElement
}
