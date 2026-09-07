import { motion as Motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'

function AirflowLines() {
  const lines = Array.from({ length: 14 }, (_, i) => i)
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }}
      preserveAspectRatio="none"
    >
      {lines.map((i) => {
        const y = 5 + (i / (lines.length - 1)) * 90
        const wave = Math.sin(i * 0.9) * 3
        return (
          <Motion.path
            key={i}
            d={`M -5 ${y + wave}% Q 30 ${y - wave * 2}% 55 ${y + wave}% T 105 ${y + wave * 0.5}%`}
            fill="none"
            stroke="var(--accent-warm)"
            strokeWidth={i % 3 === 0 ? '0.8' : '0.4'}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 + i * 0.06, ease: 'easeOut' }}
          />
        )
      })}
    </svg>
  )
}

function StatBox({ value, unit, label, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      style={{
        border: '1px solid var(--border)',
        borderRadius: '4px',
        padding: '28px 32px',
        background: 'rgba(10,13,18,0.8)',
        backdropFilter: 'blur(8px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--accent-warm), transparent)',
        opacity: 0.5,
      }} />
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '48px',
        fontWeight: 700,
        color: 'var(--accent-warm)',
        letterSpacing: '-0.03em',
        lineHeight: 1,
      }}>
        {value}
        <span style={{ fontSize: '18px', fontWeight: 400, marginLeft: '4px' }}>{unit}</span>
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '0.2em',
        color: 'var(--text-muted)',
        marginTop: '8px',
      }}>
        {label}
      </div>
    </Motion.div>
  )
}

export default function Speed() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const textX = useTransform(scrollYProgress, [0, 1], [-40, 40])

  return (
    <section id="speed" ref={ref} className="section" style={{ padding: '120px 40px', display: 'flex', alignItems: 'center' }}>
      <AirflowLines />

      {/* Noise bg */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(246,173,85,0.03) 0%, transparent 70%)',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* Left: text */}
          <Motion.div style={{ x: textX }}>
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.3em',
                color: 'var(--accent-warm)',
                marginBottom: '20px',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}
            >
              <span style={{ width: '30px', height: '1px', background: 'var(--accent-warm)' }} />
              01 // SPEED
            </Motion.div>

            <Motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 4vw, 56px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
                marginBottom: '24px',
              }}
            >
              Mach 3.2.<br />
              <span style={{ color: 'var(--accent-warm)' }}>Sustained.</span>
            </Motion.h2>

            <Motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '15px',
                lineHeight: 1.75,
                maxWidth: '400px',
              }}
            >
              At extreme velocities, conventional engineering breaks down. Thermal
              management, structural integrity, and propulsion converge into a
              singular engineering challenge — outlast the physics.
            </Motion.p>

            {/* Inline data row */}
            <Motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: '40px',
                display: 'flex',
                gap: '32px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border)',
              }}
            >
              {[
                { v: '3,500°F', l: 'Fuselage leading edge' },
                { v: 'J58', l: 'Turboramjet engine' },
              ].map(({ v, l }) => (
                <div key={l}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600, color: 'var(--accent-warm)' }}>{v}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.15em', color: 'var(--text-muted)', marginTop: '4px' }}>{l}</div>
                </div>
              ))}
            </Motion.div>
          </Motion.div>

          {/* Right: stat grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <StatBox value="2,200" unit="mph" label="TOP SPEED" delay={0.1} />
            <StatBox value="85,000" unit="ft" label="MAX ALTITUDE" delay={0.2} />
            <StatBox value="3.2" unit="M" label="CRUISE MACH" delay={0.3} />
            <StatBox value="−46°" unit="C" label="FUEL TEMP PUMP" delay={0.4} />
          </div>
        </div>
      </div>
    </section>
  )
}
