'use client'

import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface ShineBorderProps {
  borderRadius?: number
  borderWidth?: number
  duration?: number
  shineColor?: string | string[]
  className?: string
  style?: CSSProperties
}

export function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  shineColor = '#000000',
  className,
  style,
}: ShineBorderProps) {
  const colorValue = Array.isArray(shineColor) ? shineColor.join(',') : shineColor

  return (
    <div
      style={{
        '--border-radius': `${borderRadius}px`,
        '--border-width': `${borderWidth}px`,
        '--shine-duration': `${duration}s`,
        '--background-radial-gradient': `radial-gradient(transparent, transparent, ${colorValue}, transparent, transparent)`,
        // mask properties set directly to avoid Tailwind comma-parsing bug
        borderRadius: `${borderRadius}px`,
        border: `${borderWidth}px solid transparent`,
        WebkitMaskImage: 'linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)',
        WebkitMaskClip: 'padding-box, border-box',
        WebkitMaskComposite: 'destination-in',
        maskImage: 'linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)',
        maskClip: 'padding-box, border-box',
        maskComposite: 'intersect',
        ...style,
      } as CSSProperties}
      className={cn(
        'pointer-events-none absolute inset-0 will-change-transform',
        'after:absolute after:[inset:calc(-1*var(--border-width))] after:[border-radius:var(--border-radius)] after:will-change-transform',
        'after:[animation:shine-pulse_var(--shine-duration)_infinite_linear]',
        'after:[background:var(--background-radial-gradient)]',
        'after:[background-size:300%_300%]',
        "after:content-['']",
        className
      )}
    />
  )
}
