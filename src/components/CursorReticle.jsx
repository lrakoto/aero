import { useEffect, useState } from 'react'
import { motion as Motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useUIStore } from '../store/uiStore'

export default function CursorReticle() {
  const hudVisible = useUIStore((state) => state.hudVisible)
  const [hovering, setHovering] = useState(false)

  // True position — no lag, this is where clicks actually land
  const trueX = useMotionValue(-200)
  const trueY = useMotionValue(-200)

  // Lagged position for the reticle
  const x = useSpring(trueX, { stiffness: 165, damping: 20, mass: 0.6 })
  const y = useSpring(trueY, { stiffness: 165, damping: 20, mass: 0.6 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => { trueX.set(e.clientX); trueY.set(e.clientY); document.documentElement.dataset.cursor = 'reticle' }
    const onEnter = (e) => { if (e.target.closest('a, button, [role="button"]')) setHovering(true) }
    const onLeave = () => setHovering(false)
    const onExit = () => { trueX.set(-200); trueY.set(-200); delete document.documentElement.dataset.cursor }
    document.documentElement.addEventListener('mouseleave', onExit)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout',  onLeave)
    return () => {
      document.documentElement.removeEventListener('mouseleave', onExit)
      delete document.documentElement.dataset.cursor
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout',  onLeave)
    }
  }, [trueX, trueY])

  const reticleSize = hovering ? 42 : hudVisible ? 34 : 26
  const reticleOp   = hudVisible ? 0.7 : 0.28

  return (
    <>
      {/* ── True-position dot — shows exactly where clicks land ── */}
      <Motion.div
        style={{
          position: 'fixed', left: 0, top: 0,
          x: trueX, y: trueY,
          pointerEvents: 'none',
          zIndex: 9002,
        }}
      >
        <div style={{ position: 'relative', left: '-3px', top: '-3px' }}>
          <Motion.div
            animate={{ scale: hovering ? 1.6 : 1, opacity: hovering ? 0.5 : 0.85 }}
            transition={{ duration: 0.15 }}
            style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--accent)',
            }}
          />
        </div>
      </Motion.div>

      {/* ── Lagging reticle ── */}
      <Motion.div
        style={{
          position: 'fixed', left: 0, top: 0,
          x, y,
          pointerEvents: 'none',
          zIndex: 9001,
        }}
      >
        <div style={{ position: 'relative', left: -reticleSize / 2, top: -reticleSize / 2 }}>
          <Motion.svg
            viewBox="0 0 36 36" fill="none"
            animate={{ width: reticleSize, height: reticleSize, opacity: reticleOp }}
            transition={{ duration: 0.2 }}
          >
            {/* Corner brackets */}
            <path d="M 4 10 L 4 4 L 10 4"    stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 26 4 L 32 4 L 32 10"   stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 4 26 L 4 32 L 10 32"   stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 32 26 L 32 32 L 26 32" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
            {/* Center ring */}
            <circle cx="18" cy="18" r="5" stroke="var(--accent)" strokeWidth="0.9" />
            {/* Cross hairs — visible when HUD on or hovering */}
            {(hudVisible || hovering) && (
              <>
                <line x1="18" y1="1"  x2="18" y2="12" stroke="var(--accent)" strokeWidth="0.8" opacity="0.7" />
                <line x1="18" y1="24" x2="18" y2="35" stroke="var(--accent)" strokeWidth="0.8" opacity="0.7" />
                <line x1="1"  y1="18" x2="12" y2="18" stroke="var(--accent)" strokeWidth="0.8" opacity="0.7" />
                <line x1="24" y1="18" x2="35" y2="18" stroke="var(--accent)" strokeWidth="0.8" opacity="0.7" />
              </>
            )}
          </Motion.svg>
        </div>
      </Motion.div>

      {/* Hover ring */}
      <AnimatePresence>
        {hovering && (
          <Motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.18 }}
            style={{ position: 'fixed', left: 0, top: 0, x, y, pointerEvents: 'none', zIndex: 9000 }}
          >
            <div style={{ position: 'relative', left: '-24px', top: '-24px' }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="var(--accent)" strokeWidth="0.6" opacity="0.25" />
              </svg>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

