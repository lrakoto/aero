import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Intro() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y       = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="intro"
      ref={ref}
      className="section scanlines"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    >
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(99,179,237,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,179,237,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />

      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: '45%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '900px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,179,237,0.05) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <motion.div style={{ y, opacity, position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: '800px' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.35em',
            color: 'var(--accent)',
            marginBottom: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
          }}
        >
          <span style={{ width: '48px', height: '1px', background: 'var(--accent)', opacity: 0.4 }} />
          AERO // HISTORICAL RECORD
          <span style={{ width: '48px', height: '1px', background: 'var(--accent)', opacity: 0.4 }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 7vw, 100px)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 0.96,
            color: 'var(--text-primary)',
            marginBottom: '36px',
          }}
        >
          A century of<br />
          <span style={{ WebkitTextStroke: '1px rgba(99,179,237,0.35)', color: 'transparent' }}>
            engineering
          </span>
          <br />velocity.
        </motion.h1>

        {/* Purpose statement */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            fontWeight: 300,
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            marginBottom: '16px',
          }}
        >
          This is a visual record of Lockheed&apos;s defining milestones — from a
          circus-tent workshop in Burbank to the hypersonic frontier. Every program
          here pushed the boundary of what was considered physically possible.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            fontWeight: 300,
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '52px',
          }}
        >
          Spanning 1912 to the present — speed records, stealth doctrine, the birth of
          the jet age, and the programs that defined Cold War deterrence.
        </motion.p>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            padding: '24px 0',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            marginBottom: '52px',
          }}
        >
          {[
            { v: '111+', l: 'Years of Operation' },
            { v: '15',   l: 'Milestones' },
            { v: 'Mach 3.2', l: 'Peak Velocity' },
            { v: '1944', l: 'Skunk Works Founded' },
          ].map(({ v, l }) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}>{v}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.18em',
                color: 'var(--text-muted)',
                marginTop: '4px',
              }}>{l}</div>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="#timeline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            padding: '14px 36px',
            border: '1px solid var(--accent)',
            borderRadius: '3px',
            color: 'var(--accent)',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(99,179,237,0.08)'
            e.currentTarget.style.boxShadow = '0 0 24px rgba(99,179,237,0.1)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          BEGIN RECORD
        </motion.a>
      </motion.div>

      {/* Scroll nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute', bottom: '36px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          zIndex: 2,
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.25em', color: 'var(--text-muted)' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '28px', background: 'linear-gradient(180deg, var(--accent) 0%, transparent 100%)' }}
        />
      </motion.div>
    </section>
  )
}
