import { motion as Motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function RadarPing({ delay = 0 }) {
  return (
    <Motion.circle
      cx="50%"
      cy="50%"
      r="10"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="0.6"
      initial={{ r: 10, opacity: 0.6 }}
      animate={{ r: 180, opacity: 0 }}
      transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  )
}

function RadarDisplay() {
  return (
    <div style={{ position: 'relative', width: '340px', height: '340px', margin: '0 auto' }}>
      <svg viewBox="0 0 340 340" style={{ width: '100%', height: '100%' }}>
        {/* Rings */}
        {[1, 2, 3, 4].map((i) => (
          <circle
            key={i}
            cx="170" cy="170"
            r={i * 40}
            fill="none"
            stroke="rgba(99,179,237,0.08)"
            strokeWidth="1"
          />
        ))}

        {/* Cross hairs */}
        <line x1="170" y1="10" x2="170" y2="330" stroke="rgba(99,179,237,0.06)" strokeWidth="1" />
        <line x1="10" y1="170" x2="330" y2="170" stroke="rgba(99,179,237,0.06)" strokeWidth="1" />

        {/* Sweeper */}
        <Motion.line
          x1="170" y1="170" x2="170" y2="30"
          stroke="var(--accent)"
          strokeWidth="1"
          style={{ transformOrigin: '170px 170px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          opacity={0.6}
        />

        {/* Ping animations */}
        <RadarPing delay={0} />
        <RadarPing delay={1.5} />

        {/* No target marker */}
        <circle cx="170" cy="170" r="3" fill="rgba(104,211,145,0.8)" />
      </svg>

      {/* RCS label */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        color: 'var(--accent-green)',
        letterSpacing: '0.2em',
        whiteSpace: 'nowrap',
      }}>
        RCS &lt; 0.001 m²  //  NO TARGET
      </div>
    </div>
  )
}

export default function Stealth() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="stealth"
      ref={ref}
      className="section"
      style={{
        padding: '120px 40px',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(180deg, var(--bg) 0%, #020304 50%, var(--bg) 100%)',
      }}
    >
      {/* Faint hex grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zM28 100L0 84V66l28 16 28-16v18L28 100z' fill='none' stroke='%2363b3ed' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '56px 100px',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* Left: radar */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <RadarDisplay />
          </Motion.div>

          {/* Right: text */}
          <div>
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.3em',
                color: 'var(--accent)',
                marginBottom: '20px',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}
            >
              <span style={{ width: '30px', height: '1px', background: 'var(--accent)' }} />
              02 // STEALTH
            </Motion.div>

            <Motion.h2
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
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
              The best signature<br />
              <span style={{ color: 'var(--accent)' }}>is no signature.</span>
            </Motion.h2>

            <Motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '15px',
                lineHeight: 1.75,
                maxWidth: '400px',
                marginBottom: '40px',
              }}
            >
              Stealth isn&apos;t invisibility — it&apos;s geometry. Faceted surfaces,
              radar-absorbing materials, and thermal suppression work in concert
              to minimize every detectable signature.
            </Motion.p>

            <Motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {[
                { label: 'Radar Absorbing Material', status: 'ACTIVE' },
                { label: 'Thermal Suppression', status: 'ACTIVE' },
                { label: 'Emission Control', status: 'ACTIVE' },
                { label: 'ADS-B Transponder', status: 'MASKED' },
              ].map(({ label, status }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 16px',
                    border: '1px solid var(--border)',
                    borderRadius: '3px',
                    background: 'rgba(10,13,18,0.6)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.15em',
                    color: status === 'ACTIVE' ? 'var(--accent-green)' : 'var(--accent)',
                    padding: '3px 8px',
                    border: `1px solid ${status === 'ACTIVE' ? 'rgba(104,211,145,0.3)' : 'var(--border-accent)'}`,
                    borderRadius: '2px',
                  }}>
                    {status}
                  </span>
                </div>
              ))}
            </Motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
