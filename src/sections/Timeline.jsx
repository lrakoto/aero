import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { MILESTONES, CATEGORY_COLORS, ERAS } from '../data/milestones'

// ─── Era divider ────────────────────────────────────────────────────────────

function EraDivider({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        margin: '72px 0 40px',
        paddingLeft: '140px',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        letterSpacing: '0.3em',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
    </motion.div>
  )
}

// ─── Single milestone card ───────────────────────────────────────────────────

function MilestoneCard({ milestone, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [expanded, setExpanded] = useState(false)
  const { color, bg } = CATEGORY_COLORS[milestone.category]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 1px 1fr',
        gap: '0 32px',
        alignItems: 'start',
        position: 'relative',
        marginBottom: '4px',
      }}
    >
      {/* Year column */}
      <div style={{ textAlign: 'right', paddingTop: '2px' }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: inView ? 'var(--text-primary)' : 'transparent',
            lineHeight: 1,
            display: 'block',
          }}
        >
          {milestone.year}
        </motion.span>
      </div>

      {/* Spine line + node */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Line above node */}
        <div style={{ width: '1px', flex: 1, background: 'var(--border)', minHeight: '12px' }} />
        {/* Node */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          style={{
            width: '8px', height: '8px',
            borderRadius: '50%',
            border: `1px solid ${color}`,
            background: expanded ? color : 'transparent',
            boxShadow: expanded ? `0 0 8px ${color}` : 'none',
            flexShrink: 0,
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
        />
        {/* Line below node — infinite */}
        <div style={{ width: '1px', flex: 999, background: 'var(--border)', minHeight: '32px' }} />
      </div>

      {/* Content card */}
      <motion.div
        onClick={() => setExpanded(e => !e)}
        style={{
          border: `1px solid ${expanded ? color + '40' : 'var(--border)'}`,
          borderRadius: '6px',
          padding: '20px 24px',
          background: expanded ? bg : 'rgba(10,13,18,0.6)',
          cursor: 'pointer',
          marginBottom: '16px',
          transition: 'border-color 0.25s, background 0.25s',
          position: 'relative',
          overflow: 'hidden',
        }}
        whileHover={{ borderColor: color + '55' }}
      >
        {/* Top accent line on hover/expand */}
        {expanded && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              transformOrigin: 'left',
            }}
          />
        )}

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            lineHeight: 1.2,
          }}>
            {milestone.title}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, marginLeft: '16px' }}>
            {/* Category badge */}
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              letterSpacing: '0.18em',
              padding: '4px 9px',
              borderRadius: '2px',
              border: `1px solid ${color}55`,
              color,
              background: bg,
              whiteSpace: 'nowrap',
            }}>
              {milestone.category}
            </span>

            {/* Expand toggle */}
            <motion.div
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              style={{
                width: '16px', height: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0.4,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1" />
                <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: 1.75,
        }}>
          {milestone.description}
        </p>

        {/* Expanded detail */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: `1px solid ${color}25`,
            display: 'flex',
            gap: '10px',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.15em',
              color,
              marginTop: '2px',
              flexShrink: 0,
            }}>
              //
            </span>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
            }}>
              {milestone.detail}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ─── Filter bar ──────────────────────────────────────────────────────────────

function FilterBar({ active, setActive }) {
  const categories = ['ALL', ...Object.keys(CATEGORY_COLORS)]

  return (
    <div style={{
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap',
      paddingLeft: '140px',
      marginBottom: '48px',
    }}>
      {categories.map((cat) => {
        const isActive = active === cat
        const color = cat === 'ALL' ? 'var(--text-secondary)' : CATEGORY_COLORS[cat]?.color
        return (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.18em',
              padding: '6px 12px',
              borderRadius: '2px',
              border: `1px solid ${isActive ? color + '70' : 'var(--border)'}`,
              background: isActive ? (cat === 'ALL' ? 'rgba(138,154,176,0.1)' : CATEGORY_COLORS[cat]?.bg) : 'transparent',
              color: isActive ? color : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function Timeline() {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const filtered = activeFilter === 'ALL'
    ? MILESTONES
    : MILESTONES.filter((m) => m.category === activeFilter)

  // Group by era in filtered order
  const byEra = filtered.reduce((acc, m) => {
    if (!acc[m.era]) acc[m.era] = []
    acc[m.era].push(m)
    return acc
  }, {})

  return (
    <section id="timeline" style={{ padding: '80px 40px 160px', position: 'relative' }}>
      {/* Faint radial bg */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 70% 100% at 15% 50%, rgba(99,179,237,0.02) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '960px', margin: '0 auto' }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: 'var(--accent)',
            marginBottom: '12px',
            paddingLeft: '140px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}
        >
          <span style={{ width: '24px', height: '1px', background: 'var(--accent)', opacity: 0.5 }} />
          TIMELINE // {filtered.length} RECORDS
        </motion.div>

        {/* Filter bar */}
        <FilterBar active={activeFilter} setActive={setActiveFilter} />

        {/* Timeline entries grouped by era */}
        {Object.entries(byEra).map(([era, items]) => (
          <div key={era}>
            <EraDivider label={era} />
            {items.map((m, i) => (
              <MilestoneCard key={m.year + m.title} milestone={m} index={i} />
            ))}
          </div>
        ))}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            paddingLeft: '140px',
            marginTop: '80px',
            paddingTop: '40px',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 22,20 2,20" fill="none" stroke="var(--accent)" strokeWidth="1.2" opacity="0.4" />
            </svg>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.25em',
              color: 'var(--text-muted)',
            }}>
              AERO // HISTORICAL RECORD // FOR EDUCATIONAL USE
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
