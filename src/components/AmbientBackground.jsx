import { useEffect } from 'react'
import { motion as Motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import OceanCanvas from './OceanCanvas'

export default function AmbientBackground() {
  const pointerX = useMotionValue(-600)
  const pointerY = useMotionValue(-600)
  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)

  const glowX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.55 })
  const glowY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.55 })
  const gridX = useSpring(parallaxX, { stiffness: 55, damping: 24, mass: 0.8 })
  const gridY = useSpring(parallaxY, { stiffness: 55, damping: 24, mass: 0.8 })
  const oceanX = useTransform(gridX, (value) => value * 0.64)
  const oceanY = useTransform(gridY, (value) => value * 0.64)
  const { scrollYProgress } = useScroll()
  const oceanScrollY = useTransform(scrollYProgress, [0, 1], [78, -96])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(pointer: fine)')
    if (reducedMotion.matches || !finePointer.matches) return undefined

    const onPointerMove = ({ clientX, clientY }) => {
      pointerX.set(clientX)
      pointerY.set(clientY)
      parallaxX.set((clientX / window.innerWidth - 0.5) * 42)
      parallaxY.set((clientY / window.innerHeight - 0.5) * 34)
    }
    const onPointerLeave = () => {
      pointerX.set(-600)
      pointerY.set(-600)
      parallaxX.set(0)
      parallaxY.set(0)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onPointerLeave)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('mouseleave', onPointerLeave)
    }
  }, [parallaxX, parallaxY, pointerX, pointerY])

  return (
    <div className="ambient-background" aria-hidden="true">
      <Motion.div className="ambient-ocean-parallax" style={{ x: oceanX, y: oceanY }}>
        <Motion.div className="ambient-ocean-scroll" style={{ y: oceanScrollY }}>
          <div className="ambient-ocean-texture">
            <OceanCanvas />
          </div>
        </Motion.div>
      </Motion.div>
      <Motion.div className="ambient-grid-parallax" style={{ x: gridX, y: gridY }}>
        <div className="ambient-grid" />
      </Motion.div>
      <div className="ambient-glow ambient-glow--forward" />
      <div className="ambient-glow ambient-glow--aft" />
      <div className="ambient-track ambient-track--one" />
      <div className="ambient-track ambient-track--two" />
      <Motion.div className="ambient-cursor-glow" style={{ x: glowX, y: glowY }} />
    </div>
  )
}
