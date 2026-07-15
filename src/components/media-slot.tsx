import { clsx } from 'clsx'
import { Image } from '@/components/image'
import { Icon } from '@/components/icon'
import { Label } from '@/components/label'
import imageIcon from '@iconify/icons-lucide/image'

interface MediaSlotProps {
  /** Image source. When omitted, a styled industrial placeholder renders instead. */
  src?: string
  alt?: string
  /** Iconify icon shown on the placeholder */
  icon?: { body: string; width?: number; height?: number }
  /** Caption shown on the placeholder */
  label?: string
  /** Aspect ratio utility class, e.g. 'aspect-[4/3]' */
  aspect?: string
  rounded?: string
  className?: string
}

/**
 * Drop-in media area for the homepage. Renders the real {@link Image}
 * component when a `src` is supplied, otherwise a clean charcoal/steel
 * placeholder so layouts stay polished until real photography is added.
 */
export function MediaSlot({
  src = '/placeholder.png',
  alt = '',
  icon = imageIcon,
  label,
  aspect = 'aspect-[4/3]',
  rounded = 'rounded-lg',
  className,
}: MediaSlotProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        size="large"
        aspect={aspect}
        rounded={rounded}
        className={clsx('w-full object-cover', className)}
      />
    )
  }

  return (
    <div
      className={clsx(
        'relative flex flex-col items-center justify-center overflow-hidden',
        'bg-accent2 bg-pattern-cross',
        aspect,
        rounded,
        className
      )}
      role="img"
      aria-label={alt || label || 'Image placeholder'}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent2-light/40 to-accent2-dark/70" />
      <span className="relative flex size-14 items-center justify-center rounded-full bg-accent text-accent-contrast">
        <Icon
          icon={icon}
          className="h-7 w-7"
        />
      </span>
      {label && (
        <Label
          color="text-accent4"
          margin="mt-4"
          textAlign="text-center"
          className="relative px-4"
        >
          {label}
        </Label>
      )}
    </div>
  )
}
