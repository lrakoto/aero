import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function NodeLine({ from, to, delay = 0 }) {
  return (
    <motion.line
      x1={from[0]} y1={from[1]}
      x2={to[0]} y2={to[1]}
      stroke="rgba(99,179,237,0.2)"
      strokeWidth="0.8"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
    />
  )
}

function AbstractDiagram() {
  const nodes = [
    { x: 240, y: 80,  label: 'SENSOR ARRAY' },
    { x: 80,  y: 180, label: 'FUSION ENGINE' },
    { x: 400, y: 180, label: 'AUTOPILOT AI' },
    { x: 160, y: 280, label: 'THREAT MODEL' },
    { x: 320, y: 280, label: 'RESPONSE SYS' },
    { x: 240, y: 360, label: 'ACTUATION' },
  ]
  const edges = [
    [0, 1], [0, 2],
    [1, 3], [2, 4],
    [3, 5], [4, 5],
  ]

  return (
    <div style={{ position: 'relative', width: '480px', height: '420px', margin: '0 auto' }}>
      <svg viewBox="0 0 480 420" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        {edges.map(([a, b], i) => (
          <NodeLine
            key={i}
            from={[nodes[a].x, nodes[a].y]}
            to={[nodes[b].x, nodes[b].y]}
            delay={i * 0.15}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x} cy={n.y} r="5"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 + 0.5, type: 'spring' }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 + 0.7 }}
          style={{
            position: 'absolute',
            left: `${(n.x / 480) * 100}%`,
            top: `${(n.y / 420) * 100}%`,
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
            marginTop: '18px',
          }}
        >
          {n.label}
        </motion.div>
      ))}
    </div>
  )
}

export default function Future() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="future"
      ref={ref}
      className="section"
      style={{
        padding: '120px 40px 160px',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(180deg, var(--bg) 0%, #020406 100%)',
      }}
    >
      {/* Dot grid background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(99,179,237,0.08) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        zIndex: 0,
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
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
              04 // FUTURE
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
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
              Beyond the<br />
              <span style={{ color: 'var(--accent)' }}>pilot.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '15px',
                lineHeight: 1.75,
                maxWidth: '420px',
                marginBottom: '40px',
              }}
            >
              Autonomous systems don&apos;t replace pilots — they extend human
              capability beyond biological limits. AI-assisted flight opens
              decision spaces no human reflex could navigate.
            </motion.p>

            {/* Capability list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {[
                'Adaptive mission replanning at 10ms intervals',
                'Collaborative swarm coordination',
                'Predictive threat avoidance via ML inference',
                'Real-time structural health monitoring',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span style={{
                    width: '4px', height: '4px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    marginTop: '6px',
                    flexShrink: 0,
                    boxShadow: '0 0 6px var(--accent)',
                  }} />
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: node diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AbstractDiagram />
          </motion.div>
        </div>

        {/* Bottom stamp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          style={{
            marginTop: '100px',
            textAlign: 'center',
            borderTop: '1px solid var(--border)',
            paddingTop: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <polygon points="12,2 22,20 2,20" fill="none" stroke="var(--accent)" strokeWidth="1.2" opacity="0.5" />
          </svg>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: 'var(--text-muted)',
          }}>
            AERO SYSTEMS // CLASSIFIED PROTOTYPE // NOT FOR DISTRIBUTION
          </div>
        </motion.div>
      </div>
    </section>
  )
}
