import { motion as Motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

function ControlSpec({ label, value, detail, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '20px 24px',
        border: `1px solid ${hovered ? 'var(--border-accent)' : 'var(--border)'}`,
        borderRadius: '4px',
        background: hovered ? 'rgba(99,179,237,0.04)' : 'rgba(10,13,18,0.6)',
        cursor: 'default',
        transition: 'all 0.25s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {hovered && (
        <Motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
            transformOrigin: 'left',
          }}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>
          {label}
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, color: 'var(--accent)' }}>
          {value}
        </span>
      </div>
      <Motion.p
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: hovered ? 1 : 0, height: hovered ? 'auto' : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          marginTop: '8px',
          lineHeight: 1.6,
          overflow: 'hidden',
        }}
      >
        {detail}
      </Motion.p>
    </Motion.div>
  )
}

const SPECS = [
  { label: 'RESPONSE LATENCY', value: '< 2ms', detail: 'Fly-by-wire control surface actuation from pilot input to physical deflection.' },
  { label: 'POSITIONING ACCURACY', value: '±0.3m', detail: 'GPS/INS fusion with terrain-referenced navigation for sub-meter positioning.' },
  { label: 'CONTROL SURFACES', value: '7', detail: 'Independently actuated surfaces: elevons, rudder, canards, and adaptive winglets.' },
  { label: 'SENSOR FUSION RATE', value: '400Hz', detail: 'Data fusion loop combining IMU, air data, and GPS at 400 cycles per second.' },
  { label: 'AUTOPILOT MODES', value: '12', detail: 'From basic attitude hold to terrain-following and autonomous recovery.' },
  { label: 'G-LOAD TOLERANCE', value: '9.0G', detail: 'Sustained structural design limit with active load limiting via FCS.' },
]

export default function Precision() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="precision" ref={ref} className="section" style={{ padding: '120px 40px', display: 'flex', alignItems: 'center' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(99,179,237,0.03) 0%, transparent 70%)',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', width: '100%' }}>

        {/* Section header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '64px' }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: 'var(--accent)',
            marginBottom: '20px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ width: '30px', height: '1px', background: 'var(--accent)' }} />
            03 // PRECISION
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4vw, 56px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            marginBottom: '16px',
          }}>
            Control at the<br />
            <span style={{ color: 'var(--accent)' }}>limits of physics.</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '15px',
            lineHeight: 1.75,
            maxWidth: '540px',
          }}>
            Fly-by-wire systems don&apos;t just relay inputs — they interpret intent,
            compensate for physics, and deliver control authority that no mechanical
            linkage could provide.
          </p>
        </Motion.div>

        {/* Hover to reveal specs grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {SPECS.map((spec, i) => (
            <ControlSpec key={spec.label} {...spec} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: '32px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textAlign: 'center',
          }}
        >
          // HOVER EACH CARD TO EXPAND SPECIFICATION DETAIL
        </Motion.div>
      </div>
    </section>
  )
}
