'use client'

import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  delay?: number
  borderWidth?: number
  colorFrom?: string
  colorVia?: string
  colorTo?: string
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  delay = 0,
  borderWidth = 1.5,
  colorFrom = 'transparent',
  colorVia = '#a855f7',
  colorTo = 'transparent',
}: BorderBeamProps) {
  return (
    <div
      style={{
        '--size': size,
        '--duration': duration,
        '--delay': `-${delay}s`,
        '--border-width': borderWidth,
        '--color-from': colorFrom,
        '--color-via': colorVia,
        '--color-to': colorTo,
      } as CSSProperties}
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit]',
        '[border:calc(var(--border-width)*1px)_solid_transparent]',
        // border 영역만 보이도록 mask 처리
        '[-webkit-mask-clip:padding-box,border-box] [mask-clip:padding-box,border-box]',
        '[-webkit-mask-composite:destination-in] [mask-composite:intersect]',
        '[mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]',
        // 빔 요소: border 위를 따라 이동
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:content-['']",
        'after:[animation:border-beam_calc(var(--duration)*1s)_var(--delay)_infinite_linear]',
        'after:[background:linear-gradient(to_left,var(--color-from),var(--color-via),var(--color-to))]',
        'after:[offset-anchor:50%_50%]',
        'after:[offset-path:rect(0_auto_auto_0_round_28px)]',
        className
      )}
    />
  )
}
