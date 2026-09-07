import { useEffect } from 'react'
import Lenis from 'lenis'

export function useSmoothScroll(enabled = true, paused = false) {
  useEffect(() => {
    if (!enabled || paused) return
    const lenis = new Lenis({ duration: .85, smoothWheel: true, anchors: true })
    let frame
    const tick = time => { lenis.raf(time); frame = requestAnimationFrame(tick) }
    frame = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [enabled, paused])
}
