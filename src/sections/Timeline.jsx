import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { MILESTONES, ERA_DATA, CATEGORY_COLORS } from '../data/milestones'
import EraAircraft from '../components/EraAircraft'
import { useUIStore } from '../store/uiStore'

// ─── Milestone card — auto-expands when centered in viewport ─────────────────

function MilestoneCard({ milestone, accentColor }) {
  const ref = useRef(null)
  // Active only while the card is in the center ~24% band of the viewport
  const isActive = useInView(ref, { margin: '-38% 0px -38% 0px' })
  const { color, bg } = CATEGORY_COLORS[milestone.category]

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        paddingLeft: '136px',
        paddingBottom: '36px',
        minHeight: '64px',
      }}
    >
      {/* Year — glows when active */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '96px',
        textAlign: 'right',
        fontFamily: 'var(--font-display)',
        fontSize: '28px',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        color: isActive ? accentColor : 'var(--text-muted)',
        transition: 'color 0.4s ease, text-shadow 0.4s ease',
        textShadow: isActive ? `0 0 24px ${accentColor}60` : 'none',
      }}>
        {milestone.year}
      </div>

      {/* Spine node */}
      <div style={{
        position: 'absolute',
        left: '108px',
        top: '9px',
        width: '9px',
        height: '9px',
        borderRadius: '50%',
        border: `1px solid ${isActive ? accentColor : 'var(--text-muted)'}`,
        background: isActive ? accentColor : 'transparent',
        boxShadow: isActive ? `0 0 0 3px ${accentColor}18, 0 0 12px ${accentColor}60` : 'none',
        transform: 'translateX(-50%)',
        transition: 'all 0.4s ease',
        zIndex: 2,
      }} />

      {/* Card */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.38 }}
        transition={{ duration: 0.4 }}
        style={{
          border: `1px solid ${isActive ? color + '50' : 'var(--border)'}`,
          borderRadius: '6px',
          padding: '18px 22px',
          background: isActive ? bg : 'transparent',
          transition: 'border-color 0.4s, background 0.4s',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Active top glow line */}
        <motion.div
          animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            transformOrigin: 'left',
          }}
        />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '17px',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            lineHeight: 1.2,
          }}>
            {milestone.title}
          </h3>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            letterSpacing: '0.18em',
            padding: '3px 9px',
            borderRadius: '2px',
            border: `1px solid ${color}55`,
            color,
            background: bg,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            marginLeft: '12px',
          }}>
            {milestone.category}
          </span>
        </div>

        {/* Description — always visible */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--text-secondary)',
          lineHeight: 1.75,
        }}>
          {milestone.description}
        </p>

        {/* Detail — auto-reveals when active, no click needed */}
        <motion.div
          animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <div style={{
            marginTop: '14px',
            paddingTop: '14px',
            borderTop: `1px solid ${color}22`,
            display: 'flex',
            gap: '10px',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color,
              marginTop: '2px',
              flexShrink: 0,
            }}>
              //
            </span>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
            }}>
              {milestone.detail}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─── Spine + cards container with scroll-fill line ───────────────────────────

function SpineSection({ milestones, accentColor }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 28 })

  return (
    <div ref={ref} style={{ padding: '40px 0 56px' }}>
      <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative', paddingRight: '24px' }}>

        {/* Spine background (full height, faint) */}
        <div style={{
          position: 'absolute',
          left: '112px',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'var(--border)',
        }} />

        {/* Spine fill (scroll-driven) */}
        <motion.div
          style={{
            position: 'absolute',
            left: '112px',
            top: 0,
            width: '1px',
            height: '100%',
            background: `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}60 100%)`,
            transformOrigin: 'top',
            scaleY,
          }}
        />

        {/* Cards */}
        {milestones.map((m) => (
          <MilestoneCard
            key={m.year + m.title}
            milestone={m}
            accentColor={accentColor}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Era chapter panel — scroll-mapped animations ────────────────────────────

function EraChapter({ era, eraData, milestones, eraIndex }) {
  const panelRef    = useRef(null)
  const setActiveEra = useUIStore((s) => s.setActiveEra)

  // One-shot trigger for the aircraft path-drawing animation
  const drawTrigger = useInView(panelRef, { once: true, margin: '-10%' })

  // Track when era is visible for the HUD mission panel
  useInView(panelRef, {
    onChange: (v) => { if (v) setActiveEra(`era-${era.toLowerCase().replace(/\s+/g, '-')}`) },
  })

  // Enter progress: 0 when panel bottom enters viewport, 1 when panel top clears the nav
  const { scrollYProgress: enter } = useScroll({
    target: panelRef,
    offset: ['start 92%', 'start 14%'],
  })

  // Slow parallax for background and aircraft (full scroll through panel)
  const { scrollYProgress: through } = useScroll({
    target: panelRef,
    offset: ['start end', 'end start'],
  })
  const bgY       = useTransform(through, [0, 1], ['-5%', '5%'])
  const aircraftY = useTransform(through, [0, 1], [-32, 32])

  const isEven    = eraIndex % 2 === 0
  const eraAccents = ['var(--accent)', 'var(--accent-warm)', 'var(--accent)', 'var(--accent-danger)', 'var(--accent-green)']
  const eraAccent  = eraAccents[eraIndex] || 'var(--accent)'

  // --- Per-element scroll-mapped transforms (staggered) ---
  const eyebrowOp = useTransform(enter, [0.00, 0.24], [0, 1])
  const eyebrowY  = useTransform(enter, [0.00, 0.24], [16, 0])

  const dateOp    = useTransform(enter, [0.08, 0.32], [0, 1])
  const dateY     = useTransform(enter, [0.08, 0.32], [22, 0])

  const labelOp   = useTransform(enter, [0.16, 0.40], [0, 1])

  const tagOp     = useTransform(enter, [0.24, 0.48], [0, 1])
  const tagY      = useTransform(enter, [0.24, 0.48], [18, 0])

  const descOp    = useTransform(enter, [0.32, 0.56], [0, 1])
  const descY     = useTransform(enter, [0.32, 0.56], [14, 0])

  const badgeOp   = useTransform(enter, [0.40, 0.62], [0, 1])

  // Aircraft: slides in from outer edge, fades + scales up
  const aircraftSlide = useTransform(enter, [0.04, 0.64], [isEven ? 72 : -72, 0])
  const aircraftOp    = useTransform(enter, [0.04, 0.36], [0, 1])
  const aircraftScale = useTransform(enter, [0.04, 0.60], [0.92, 1])

  const TextBlock = () => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '72px 56px' }}>

      <motion.div style={{ opacity: eyebrowOp, y: eyebrowY, marginBottom: '20px',
        fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em',
        color: eraAccent, display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <span style={{ width: '26px', height: '1px', background: eraAccent }} />
        {String(eraIndex + 1).padStart(2, '0')} // {era.toUpperCase()}
      </motion.div>

      <motion.div style={{ opacity: dateOp, y: dateY, marginBottom: '14px',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(44px, 4.5vw, 68px)',
        fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.92,
        color: eraAccent,
      }}>
        {eraData.dateRange}
      </motion.div>

      <motion.div style={{ opacity: labelOp, marginBottom: '22px',
        fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.25em',
        color: 'var(--text-muted)',
      }}>
        {eraData.aircraft}
      </motion.div>

      <motion.h2 style={{ opacity: tagOp, y: tagY, marginBottom: '18px',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(20px, 2.2vw, 30px)',
        fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.18,
        color: 'var(--text-primary)',
      }}>
        {eraData.tagline}
      </motion.h2>

      <motion.p style={{ opacity: descOp, y: descY, marginBottom: '28px',
        fontFamily: 'var(--font-body)', fontSize: '14px',
        color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '400px',
      }}>
        {eraData.description}
      </motion.p>

      <motion.span style={{ opacity: badgeOp, alignSelf: 'flex-start',
        fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.18em',
        padding: '5px 12px', borderRadius: '2px',
        border: `1px solid ${eraAccent}45`, color: eraAccent,
        background: `${eraAccent}0d`,
        display: 'inline-block',
      }}>
        {milestones.length} RECORDS
      </motion.span>
    </div>
  )

  const AircraftBlock = () => (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '72px 48px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 65% 65% at 50% 50%, ${eraAccent}08 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <motion.div style={{
        width: '100%', maxWidth: '340px', aspectRatio: '1',
        x: aircraftSlide, y: aircraftY,
        opacity: aircraftOp, scale: aircraftScale,
      }}>
        <EraAircraft era={era} animate={drawTrigger} color={eraAccent} />
      </motion.div>
    </div>
  )

  return (
    <div id={`era-${era.toLowerCase().replace(/\s+/g, '-')}`}>

      {/* Full-bleed chapter panel */}
      <div ref={panelRef} style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border)' }}>

        {/* Parallax grid background */}
        <motion.div style={{
          position: 'absolute', inset: '-10%',
          backgroundImage: `
            linear-gradient(rgba(99,179,237,0.016) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.016) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          y: bgY, zIndex: 0,
        }} />

        {/* Constrained content grid */}
        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '1280px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          minHeight: '88vh',
        }}>
          {isEven
            ? <><TextBlock /><AircraftBlock /></>
            : <><AircraftBlock /><TextBlock /></>
          }
        </div>
      </div>

      {/* Milestone cards with scroll spine */}
      <div style={{
        background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)',
        borderBottom: '1px solid var(--border)',
      }}>
        <SpineSection milestones={milestones} accentColor={eraAccent} />
      </div>
    </div>
  )
}

// ─── Filter bar ───────────────────────────────────────────────────────────────

function FilterBar({ active, setActive, count }) {
  const cats = ['ALL', ...Object.keys(CATEGORY_COLORS)]
  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
      {cats.map((cat) => {
        const on = active === cat
        const c  = cat === 'ALL' ? 'var(--text-secondary)' : CATEGORY_COLORS[cat]?.color
        return (
          <button key={cat} onClick={() => setActive(cat)} style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.18em',
            padding: '5px 11px', borderRadius: '2px',
            border: `1px solid ${on ? c + '70' : 'var(--border)'}`,
            background: on ? (cat === 'ALL' ? 'rgba(138,154,176,0.08)' : CATEGORY_COLORS[cat]?.bg) : 'transparent',
            color: on ? c : 'var(--text-muted)',
            cursor: 'pointer', transition: 'all 0.2s ease',
          }}>
            {cat}
          </button>
        )
      })}
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '9px',
        color: 'var(--text-muted)', marginLeft: '6px',
      }}>
        {count} RECORDS
      </span>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function Timeline() {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const filtered = activeFilter === 'ALL'
    ? MILESTONES
    : MILESTONES.filter((m) => m.category === activeFilter)

  const eraOrder = Object.keys(ERA_DATA)
  const byEra = eraOrder.reduce((acc, era) => {
    const items = filtered.filter((m) => m.era === era)
    if (items.length > 0) acc[era] = items
    return acc
  }, {})

  return (
    <section id="timeline" style={{ position: 'relative' }}>

      {/* Sticky filter bar */}
      <div style={{
        position: 'sticky', top: '64px', zIndex: 40,
        background: 'rgba(5,7,9,0.94)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '14px 56px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.28em',
            color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ width: '18px', height: '1px', background: 'var(--accent)', opacity: 0.5 }} />
            TIMELINE
          </div>
          <FilterBar active={activeFilter} setActive={setActiveFilter} count={filtered.length} />
        </div>
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

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '56px 56px',
          display: 'flex', alignItems: 'center', gap: '18px',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 22,20 2,20" fill="none" stroke="var(--accent)" strokeWidth="1.2" opacity="0.35" />
        </svg>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.25em', color: 'var(--text-muted)' }}>
          AERO // HISTORICAL RECORD // FOR EDUCATIONAL USE
        </span>
      </motion.div>
    </section>
  )
}
