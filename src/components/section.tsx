import React from 'react'
import { clsx } from 'clsx'
import { Container } from '@/components/container'

interface SectionProps {
  children: React.ReactNode
  className?: string
  innerAlign?: 'wide' | 'content' | 'none' | 'full' | 'navbar'
  /** Full address of the background image */
  imageSrc?: string
  imageWidth?: number
  imageHeight?: number
  imageAlt?: string
  imageClassName?: string
  overlayColor?: string
  id?: string
}

export function Section({
  children,
  className,
  innerAlign,
  imageSrc,
  imageWidth,
  imageHeight,
  imageAlt,
  imageClassName,
  overlayColor,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx('relative [&>*>*>*:last-child]:mb-0', className)}
    >
      {imageSrc && (
        <>
          <img
            src={imageSrc}
            width={imageWidth}
            height={imageHeight}
            alt={imageAlt || ''}
            className={clsx(
              'object-cover object-center absolute inset-0 w-full h-full -z-[2]',
              imageClassName
            )}
          />
          <div
            className={clsx(
              'absolute inset-0 -z-[1]',
              overlayColor || 'bg-overlay/30'
            )}
          ></div>
        </>
      )}
      <Container {...(innerAlign && { align: innerAlign })}>
        {children}
      </Container>
    </section>
  )
}
