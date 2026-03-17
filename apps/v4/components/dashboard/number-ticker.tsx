"use client"

import * as React from "react"

type NumberTickerProps = {
  value: number
  duration?: number
  className?: string
}

export function NumberTicker({
  value,
  duration = 900,
  className,
}: NumberTickerProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = React.useState(0)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    let frame = 0
    let started = false
    let start = 0

    const animate = (timestamp: number) => {
      if (!started) {
        started = true
        start = timestamp
      }

      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            frame = requestAnimationFrame(animate)
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [duration, value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
