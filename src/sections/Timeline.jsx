import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { MILESTONES, ERA_DATA, CATEGORY_COLORS } from '../data/milestones'
import EraAircraft from '../components/EraAircraft'

// ─── Milestone card (compact, under each era) ────────────────────────────────

function MilestoneCard({ milestone, index, accentColor }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [expanded, setExpanded] = useState(false)
  const { color, bg } = CATEGORY_COLORS[milestone.category]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '96px 1px 1fr',
        gap: '0 28px',
        alignItems: 'start',
        marginBottom: '4px',
      }}
    >
      {/* Year */}
      <div style={{ textAlign: 'right', paddingTop: '4px' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '26px',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: 'var(--text-primary)',
          lineHeight: 1,
        }}>
          {milestone.year}
        </span>
      </div>

      {/* Spine + node */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '1px', flex: 1, background: 'var(--border)', minHeight: '10px' }} />
        <div style={{
          width: '7px', height: '7px', borderRadius: '50%',
          border: `1px solid ${accentColor || color}`,
          background: expanded ? (accentColor || color) : 'transparent',
          flexShrink: 0,
          transition: 'background 0.2s',
        }} />
        <div style={{ width: '1px', flex: 999, background: 'var(--border)', minHeight: '28px' }} />
      </div>

      {/* Card */}
      <motion.div
        onClick={() => setExpanded(e => !e)}
        whileHover={{ borderColor: color + '55' }}
        style={{
          border: `1px solid ${expanded ? color + '45' : 'var(--border)'}`,
          borderRadius: '5px',
          padding: '16px 20px',
          marginBottom: '14px',
          background: expanded ? bg : 'rgba(10,13,18,0.5)',
          cursor: 'pointer',
          transition: 'border-color 0.25s, background 0.25s',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {expanded && (
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              transformOrigin: 'left',
            }}
          />
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '16px', fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)', lineHeight: 1.2,
          }}>
            {milestone.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginLeft: '12px' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.16em',
              padding: '3px 8px', borderRadius: '2px',
              border: `1px solid ${color}55`, color, background: bg,
              whiteSpace: 'nowrap',
            }}>
              {milestone.category}
            </span>
            <motion.span animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.2 }}
              style={{ opacity: 0.35, display: 'inline-block' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line x1="5" y1="0" x2="5" y2="10" stroke="currentColor" strokeWidth="1" />
                <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1" />
              </svg>
            </motion.span>
          </div>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {milestone.description}
        </p>
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div style={{
            marginTop: '12px', paddingTop: '12px',
            borderTop: `1px solid ${color}22`,
            display: 'flex', gap: '8px',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color, marginTop: '1px', flexShrink: 0 }}>//</span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              {milestone.detail}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ─── Era chapter (the main scroll-driven section) ────────────────────────────

function EraChapter({ era, eraData, milestones, eraIndex }) {
  const chapterRef = useRef(null)
  const panelRef   = useRef(null)
  const inView     = useInView(panelRef, { once: true, margin: '-15%' })

  // Parallax within the chapter panel
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ['start end', 'end start'],
  })
  const aircraftY = useTransform(scrollYProgress, [0, 1], [-24, 24])
  const bgY       = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  const isEven = eraIndex % 2 === 0
  // Accent colour per era
  const accentColors = ['var(--accent)', 'var(--accent-warm)', 'var(--accent)', 'var(--accent-danger)', 'var(--accent-green)']
  // Actually use the first milestone's category colour for the era
  const eraAccent = accentColors[eraIndex] || 'var(--accent)'

  // Text animation variants
  const textParent = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  }
  const textChild = {
    hidden:  { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  const TextBlock = () => (
    <motion.div
      variants={textParent}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 48px' }}
    >
      {/* Era index + name */}
      <motion.div variants={textChild} style={{
        fontFamily: 'var(--font-mono)', fontSize: '10px',
        letterSpacing: '0.3em', color: eraAccent,
        display: 'flex', alignItems: 'center', gap: '12px',
        marginBottom: '20px',
      }}>
        <span style={{ width: '28px', height: '1px', background: eraAccent }} />
        {String(eraIndex + 1).padStart(2, '0')} // {era.toUpperCase()}
      </motion.div>

      {/* Date range — large */}
      <motion.div variants={textChild} style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(42px, 5vw, 72px)',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        lineHeight: 0.92,
        color: eraAccent,
        marginBottom: '16px',
      }}>
        {eraData.dateRange}
      </motion.div>

      {/* Aircraft name */}
      <motion.div variants={textChild} style={{
        fontFamily: 'var(--font-mono)', fontSize: '11px',
        letterSpacing: '0.25em', color: 'var(--text-muted)',
        marginBottom: '24px',
      }}>
        {eraData.aircraft}
      </motion.div>

      {/* Tagline */}
      <motion.h2 variants={textChild} style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(22px, 2.5vw, 32px)',
        fontWeight: 600,
        letterSpacing: '-0.025em',
        lineHeight: 1.15,
        color: 'var(--text-primary)',
        marginBottom: '20px',
      }}>
        {eraData.tagline}
      </motion.h2>

      {/* Description */}
      <motion.p variants={textChild} style={{
        fontFamily: 'var(--font-body)', fontSize: '14px',
        color: 'var(--text-secondary)', lineHeight: 1.75,
        maxWidth: '420px',
      }}>
        {eraData.description}
      </motion.p>

      {/* Milestone count badge */}
      <motion.div variants={textChild} style={{
        marginTop: '28px',
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        alignSelf: 'flex-start',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.18em',
          padding: '5px 12px', borderRadius: '2px',
          border: `1px solid ${eraAccent}45`,
          color: eraAccent, background: `${eraAccent}0d`,
        }}>
          {milestones.length} RECORD{milestones.length !== 1 ? 'S' : ''}
        </span>
      </motion.div>
    </motion.div>
  )

  const AircraftBlock = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px', position: 'relative' }}>
      {/* Background radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${eraAccent}0a 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <motion.div
        style={{ width: '100%', maxWidth: '360px', aspectRatio: '1', y: aircraftY }}
      >
        <EraAircraft era={era} animate={inView} color={eraAccent} />
      </motion.div>
    </div>
  )

  return (
    <div ref={chapterRef} id={`era-${era.toLowerCase().replace(/\s+/g, '-')}`}>

      {/* Era chapter panel */}
      <div
        ref={panelRef}
        style={{
          minHeight: '88vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid var(--border)',
        }}
      >
        {/* Subtle moving background */}
        <motion.div style={{
          position: 'absolute', inset: '-10%',
          backgroundImage: `
            linear-gradient(rgba(99,179,237,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          y: bgY,
          zIndex: 0,
        }} />

        {isEven ? (
          <>
            <div style={{ position: 'relative', zIndex: 1 }}><TextBlock /></div>
            <div style={{ position: 'relative', zIndex: 1 }}><AircraftBlock /></div>
          </>
        ) : (
          <>
            <div style={{ position: 'relative', zIndex: 1 }}><AircraftBlock /></div>
            <div style={{ position: 'relative', zIndex: 1 }}><TextBlock /></div>
          </>
        )}
      </div>

      {/* Milestone cards for this era */}
      <div style={{ padding: '48px 80px 64px', position: 'relative' }}>
        {/* Section connector line */}
        <div style={{
          position: 'absolute', top: 0, left: '80px',
          width: '1px', height: '48px',
          background: `linear-gradient(180deg, var(--border) 0%, transparent 100%)`,
        }} />
        {milestones.map((m, i) => (
          <MilestoneCard key={m.year + m.title} milestone={m} index={i} accentColor={eraAccent} />
        ))}
      </div>
    </div>
  )
}

// ─── Filter bar ──────────────────────────────────────────────────────────────

function FilterBar({ active, setActive, count }) {
  const categories = ['ALL', ...Object.keys(CATEGORY_COLORS)]
  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
      {categories.map((cat) => {
        const isActive = active === cat
        const color = cat === 'ALL' ? 'var(--text-secondary)' : CATEGORY_COLORS[cat]?.color
        return (
          <button key={cat} onClick={() => setActive(cat)} style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.18em',
            padding: '5px 11px', borderRadius: '2px',
            border: `1px solid ${isActive ? color + '70' : 'var(--border)'}`,
            background: isActive ? (cat === 'ALL' ? 'rgba(138,154,176,0.08)' : CATEGORY_COLORS[cat]?.bg) : 'transparent',
            color: isActive ? color : 'var(--text-muted)',
            cursor: 'pointer', transition: 'all 0.2s ease',
          }}>
            {cat}
          </button>
        )
      })}
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', marginLeft: '6px' }}>
        {count} RECORDS
      </span>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function Timeline() {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const filtered = activeFilter === 'ALL'
    ? MILESTONES
    : MILESTONES.filter((m) => m.category === activeFilter)

  // Group by era, preserving era order
  const eraOrder = Object.keys(ERA_DATA)
  const byEra = eraOrder.reduce((acc, era) => {
    const items = filtered.filter((m) => m.era === era)
    if (items.length > 0) acc[era] = items
    return acc
  }, {})

  return (
    <section id="timeline" style={{ position: 'relative' }}>
      {/* Filter bar header */}
      <div style={{
        padding: '32px 80px 28px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: '64px', zIndex: 40,
        background: 'rgba(5,7,9,0.92)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          letterSpacing: '0.28em', color: 'var(--accent)',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ width: '20px', height: '1px', background: 'var(--accent)', opacity: 0.5 }} />
          TIMELINE
        </div>
        <FilterBar active={activeFilter} setActive={setActiveFilter} count={filtered.length} />
      </div>

      {/* Era chapters */}
      {Object.entries(byEra).map(([era, items]) => (
        <EraChapter
          key={era}
          era={era}
          eraData={ERA_DATA[era]}
          milestones={items}
          eraIndex={ERA_DATA[era].index}
        />
      ))}

      {/* Footer stamp */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          padding: '60px 80px',
          borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: '20px',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 22,20 2,20" fill="none" stroke="var(--accent)" strokeWidth="1.2" opacity="0.35" />
        </svg>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.25em', color: 'var(--text-muted)' }}>
          AERO // HISTORICAL RECORD // FOR EDUCATIONAL USE
        </span>
      </motion.div>
    </section>
  )
}
