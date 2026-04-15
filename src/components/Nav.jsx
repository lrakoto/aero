import { motion } from 'framer-motion'
import { useUIStore } from '../store/uiStore'

const MODES = [
  { id: 'default',   label: 'SYS' },
  { id: 'speed',     label: 'SPD' },
  { id: 'stealth',   label: 'STL' },
  { id: 'precision', label: 'NVG' },
]

export default function Nav() {
  const { activeMode, setMode, hudVisible, toggleHUD } = useUIStore()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 40px',
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(5,7,9,0.95) 0%, transparent 100%)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 22,20 2,20" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="12" y1="8" x2="12" y2="16" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
        </svg>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: '15px',
          letterSpacing: '0.2em',
          color: 'var(--text-primary)',
        }}>
          AERO
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
        }}>
          SYS/01
        </span>
      </div>

      {/* Mode toggles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setMode(mode.id)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              padding: '6px 14px',
              border: `1px solid ${activeMode === mode.id ? 'var(--border-accent)' : 'var(--border)'}`,
              borderRadius: '3px',
              background: activeMode === mode.id
                ? 'rgba(99,179,237,0.08)'
                : 'transparent',
              color: activeMode === mode.id ? 'var(--accent)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {mode.label}
          </button>
        ))}

        <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 8px' }} />

        <button
          onClick={toggleHUD}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            padding: '6px 14px',
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
    </motion.nav>
  )
}
