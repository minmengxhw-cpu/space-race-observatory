import { useEffect, useState } from 'react'

export function useCountUp(target: number, duration = 1200, enabled = true) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setValue(target)
      return
    }

    let frame = 0
    const start = performance.now()
    const from = 0
    const isFloat = !Number.isInteger(target)

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const next = from + (target - from) * eased
      setValue(isFloat ? Number(next.toFixed(1)) : Math.round(next))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, enabled])

  return value
}
