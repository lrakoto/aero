import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '../store/uiStore'
import { useState, useEffect } from 'react'

function Metric({ label, value, unit, color = 'var(--accent)' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        color: 'var(--text-muted)',
        letterSpacing: '0.15em',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '18px',
        fontWeight: 500,
        color,
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}>
        {value}
        <span style={{ fontSize: '10px', marginLeft: '3px', color: 'var(--text-muted)' }}>{unit}</span>
      </span>
    </div>
  )
}

export default function HUDOverlay() {
  const { hudVisible, activeMode, activeSection } = useUIStore()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!hudVisible) return
    const id = setInterval(() => setTick(t => t + 1), 1200)
    return () => clearInterval(id)
  }, [hudVisible])

  const mach   = (1.87 + Math.sin(tick * 0.4) * 0.04).toFixed(2)
  const alt    = (45200 + Math.floor(Math.sin(tick * 0.3) * 120)).toLocaleString()
  const temp   = (1840 + Math.floor(Math.sin(tick * 0.6) * 30))
  const radar  = activeMode === 'stealth' ? '< 0.001' : '4.2'
  const status = activeMode === 'stealth' ? 'MASKED' : 'NOMINAL'

  return (
    <AnimatePresence>
      {hudVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 50,
          }}
        >
          {/* Top-left panel */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            style={{
              position: 'absolute',
              top: '80px',
              left: '40px',
              border: '1px solid var(--border-accent)',
              borderRadius: '4px',
              padding: '16px 20px',
              background: 'rgba(5,7,9,0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              minWidth: '160px',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: 'var(--accent)',
              letterSpacing: '0.2em',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span>FLIGHT SYS</span>
              <span style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: 'var(--accent-green)',
                boxShadow: '0 0 6px var(--accent-green)',
                display: 'inline-block',
              }} />
            </div>
            <Metric label="MACH" value={mach} unit="" />
            <Metric label="ALTITUDE" value={alt} unit="ft" />
            <Metric label="TEMP" value={temp} unit="°C" color="var(--accent-warm)" />
          </motion.div>

          {/* Bottom-right panel */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              border: '1px solid var(--border-accent)',
              borderRadius: '4px',
              padding: '16px 20px',
              background: 'rgba(5,7,9,0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              minWidth: '160px',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: 'var(--accent)',
              letterSpacing: '0.2em',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '8px',
            }}>
              SIGNATURE
            </div>
            <Metric
              label="RADAR CROSS-SECTION"
              value={radar}
              unit="m²"
              color={activeMode === 'stealth' ? 'var(--accent-green)' : 'var(--accent)'}
            />
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--text-muted)',
                letterSpacing: '0.15em',
              }}>STATUS</span>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: activeMode === 'stealth' ? 'var(--accent-green)' : 'var(--text-secondary)',
                marginTop: '4px',
              }}>{status}</div>
            </div>
          </motion.div>

          {/* Center reticle */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px',
            opacity: 0.3,
          }}>
            <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
              <circle cx="20" cy="20" r="8" stroke="var(--accent)" strokeWidth="0.8" />
              <line x1="20" y1="0" x2="20" y2="12" stroke="var(--accent)" strokeWidth="0.8" />
              <line x1="20" y1="28" x2="20" y2="40" stroke="var(--accent)" strokeWidth="0.8" />
              <line x1="0" y1="20" x2="12" y2="20" stroke="var(--accent)" strokeWidth="0.8" />
              <line x1="28" y1="20" x2="40" y2="20" stroke="var(--accent)" strokeWidth="0.8" />
            </svg>
          </div>

          {/* Section label */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
          }}>
            SEC // {activeSection.toUpperCase()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
