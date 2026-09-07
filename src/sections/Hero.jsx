import { motion as Motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const y     = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      id="hero"
      ref={ref}
      className="section scanlines"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    >
      {/* Background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(99,179,237,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,179,237,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        zIndex: 0,
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,179,237,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <Motion.div
        style={{ y, opacity, position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px' }}
      >
        {/* Eyebrow */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.3em',
            color: 'var(--accent)',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <span style={{ width: '40px', height: '1px', background: 'var(--accent)', opacity: 0.5 }} />
          AERO SYSTEMS // ENGINEERING DIVISION
          <span style={{ width: '40px', height: '1px', background: 'var(--accent)', opacity: 0.5 }} />
        </Motion.div>

        {/* Headline */}
        <Motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 8vw, 112px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            color: 'var(--text-primary)',
            marginBottom: '32px',
          }}
        >
          Velocity
          <br />
          <span style={{
            WebkitTextStroke: '1px rgba(99,179,237,0.4)',
            color: 'transparent',
          }}>
            isn&apos;t achieved.
          </span>
          <br />
          It&apos;s engineered.
        </Motion.h1>

        {/* Sub */}
        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            fontWeight: 300,
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            margin: '0 auto 48px',
            lineHeight: 1.6,
          }}
        >
          Exploring the intersection of speed, stealth, and precision
          in high-performance aerospace engineering.
        </Motion.p>

        {/* CTA */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}
        >
          <a
            href="#speed"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.15em',
              padding: '14px 32px',
              border: '1px solid var(--accent)',
              borderRadius: '3px',
              color: 'var(--accent)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(99,179,237,0.08)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(99,179,237,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            EXPLORE SYSTEMS
          </a>
          <a
            href="#future"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.15em',
              padding: '14px 32px',
              border: '1px solid var(--border)',
              borderRadius: '3px',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--border-accent)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            MISSION BRIEF
          </a>
        </Motion.div>
      </Motion.div>

      {/* Scroll indicator */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 2,
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
        }}>
          SCROLL
        </span>
        <Motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '32px',
            background: 'linear-gradient(180deg, var(--accent) 0%, transparent 100%)',
          }}
        />
      </Motion.div>
    </section>
  )
}
