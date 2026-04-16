import { motion } from 'framer-motion'
import { useUIStore } from '../store/uiStore'

export default function Nav() {
  const { hudVisible, toggleHUD } = useUIStore()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        borderBottom: '1px solid var(--border)',
        background: 'rgba(5,7,9,0.92)',
        backdropFilter: 'blur(14px)',
      }}
    >
      {/* Constrained inner row */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 56px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <polygon points="12,2 22,20 2,20" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
            <line x1="12" y1="8" x2="12" y2="16" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
          </svg>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '0.22em',
            color: 'var(--text-primary)',
          }}>
            AERO
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
          }}>
            SYS/01
          </span>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>

          <button
            onClick={toggleHUD}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.14em',
              padding: '5px 13px',
              border: `1px solid ${hudVisible ? 'var(--accent-green)' : 'var(--border)'}`,
              borderRadius: '3px',
              background: hudVisible ? 'rgba(104,211,145,0.08)' : 'transparent',
              color: hudVisible ? 'var(--accent-green)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            HUD
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
