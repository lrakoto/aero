import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useUIStore, THEMES } from '../store/uiStore'

// ─── Cursor reticle ───────────────────────────────────────────────────────────
// Always rendered. Subtle ring when HUD off; full crosshair when HUD on.

function CursorReticle() {
  const { hudVisible } = useUIStore()
  const [hovering, setHovering] = useState(false)

  // True position — no lag, this is where clicks actually land
  const trueX = useMotionValue(-200)
  const trueY = useMotionValue(-200)

  // Lagged position for the reticle
  const x = useSpring(trueX, { stiffness: 165, damping: 20, mass: 0.6 })
  const y = useSpring(trueY, { stiffness: 165, damping: 20, mass: 0.6 })

  useEffect(() => {
    const onMove = (e) => { trueX.set(e.clientX); trueY.set(e.clientY) }
    const onEnter = (e) => { if (e.target.closest('a, button, [role="button"]')) setHovering(true) }
    const onLeave = () => setHovering(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout',  onLeave)
    return () => {
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
      <motion.div
        style={{
          position: 'fixed', left: 0, top: 0,
          x: trueX, y: trueY,
          pointerEvents: 'none',
          zIndex: 9002,
        }}
      >
        <div style={{ position: 'relative', left: '-3px', top: '-3px' }}>
          <motion.div
            animate={{ scale: hovering ? 1.6 : 1, opacity: hovering ? 0.5 : 0.85 }}
            transition={{ duration: 0.15 }}
            style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--accent)',
            }}
          />
        </div>
      </motion.div>

      {/* ── Lagging reticle ── */}
      <motion.div
        style={{
          position: 'fixed', left: 0, top: 0,
          x, y,
          pointerEvents: 'none',
          zIndex: 9001,
        }}
      >
        <div style={{ position: 'relative', left: -reticleSize / 2, top: -reticleSize / 2 }}>
          <motion.svg
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
          </motion.svg>
        </div>
      </motion.div>

      {/* Hover ring */}
      <AnimatePresence>
        {hovering && (
          <motion.div
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Panel shell ──────────────────────────────────────────────────────────────

function Panel({ children, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        border: '1px solid var(--border-accent)',
        borderRadius: '6px',
        padding: '16px 18px',
        background: 'rgba(5,7,9,0.88)',
        backdropFilter: 'blur(12px)',
        minWidth: '180px',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}

function PanelLabel({ children }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)', fontSize: '9px',
      letterSpacing: '0.22em', color: 'var(--accent)',
      paddingBottom: '10px', marginBottom: '10px',
      borderBottom: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      {children}
      <span style={{
        width: '6px', height: '6px', borderRadius: '50%',
        background: 'var(--accent-green)',
        boxShadow: '0 0 6px var(--accent-green)',
        display: 'inline-block', flexShrink: 0,
      }} />
    </div>
  )
}

// ─── Theme switcher panel ─────────────────────────────────────────────────────

function ThemePanel() {
  const { activeTheme, setTheme } = useUIStore()

  return (
    <Panel>
      <PanelLabel>VISUAL THEME</PanelLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {Object.entries(THEMES).map(([key, t]) => {
          const active = key === activeTheme
          return (
            <button
              key={key}
              onClick={() => setTheme(key)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '7px 10px', borderRadius: '4px',
                border: `1px solid ${active ? t.accent + '60' : 'transparent'}`,
                background: active ? t.accent + '12' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                width: '100%',
              }}
            >
              {/* Swatch */}
              <div style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: t.accent,
                boxShadow: active ? `0 0 8px ${t.accent}` : 'none',
                flexShrink: 0,
                transition: 'box-shadow 0.2s',
              }} />
              {/* Warm accent swatch */}
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: t.warm, opacity: 0.6, flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px', letterSpacing: '0.16em',
                color: active ? t.accent : 'var(--text-muted)',
                transition: 'color 0.18s',
              }}>
                {t.label}
              </span>
              {active && (
                <span style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-mono)', fontSize: '8px',
                  color: t.accent, letterSpacing: '0.1em',
                }}>
                  ◆
                </span>
              )}
            </button>
          )
        })}
      </div>
    </Panel>
  )
}

// ─── Mission progress panel ───────────────────────────────────────────────────

function MissionPanel() {
  const { activeSection, activeEra, scrollProgress } = useUIStore()

  // Derive a readable era label from the section / era tracking
  const eraLabel = activeEra
    ? activeEra.replace('era-', '').replace(/-/g, ' ').toUpperCase()
    : activeSection === 'intro'
    ? 'PRE-MISSION'
    : '—'

  return (
    <Panel>
      <PanelLabel>MISSION SYS</PanelLabel>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Scroll progress */}
        <div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            color: 'var(--text-muted)', letterSpacing: '0.15em',
            marginBottom: '6px',
          }}>
            <span>PROGRESS</span>
            <span style={{ color: 'var(--accent)' }}>{scrollProgress}%</span>
          </div>
          {/* Progress bar */}
          <div style={{
            height: '3px', borderRadius: '2px',
            background: 'var(--border)',
            overflow: 'hidden',
          }}>
            <motion.div
              style={{
                height: '100%', borderRadius: '2px',
                background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
              }}
              animate={{ width: `${scrollProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* ERA */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: '4px',
          }}>
            CURRENT ERA
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '14px',
            fontWeight: 600, letterSpacing: '-0.01em',
            color: 'var(--text-primary)',
          }}>
            {eraLabel}
          </div>
        </div>

        {/* Section */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: '4px',
          }}>
            SECTION
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'var(--accent)',
          }}>
            {activeSection.toUpperCase()}
          </div>
        </div>
      </div>
    </Panel>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function HUDOverlay() {
  const { hudVisible } = useUIStore()

  return (
    <>
      {/* Cursor reticle — always rendered */}
      <CursorReticle />

      {/* HUD panels — only when toggled */}
      <AnimatePresence>
        {hudVisible && (
          <div
            style={{
              position: 'fixed', inset: 0,
              pointerEvents: 'none',
              zIndex: 80,
            }}
          >
            {/* Theme switcher — below nav, top left */}
            <div style={{
              position: 'absolute', top: '88px', left: '32px',
              pointerEvents: 'all',
            }}>
              <ThemePanel />
            </div>

            {/* Mission progress — below nav, top right */}
            <div style={{
              position: 'absolute', top: '88px', right: '32px',
              pointerEvents: 'all',
            }}>
              <MissionPanel />
            </div>

            {/* Bottom section label */}
            <div style={{
              position: 'absolute', bottom: '32px', left: '32px',
              fontFamily: 'var(--font-mono)', fontSize: '9px',
              letterSpacing: '0.22em', color: 'var(--text-muted)',
            }}>
              HUD // ACTIVE
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
