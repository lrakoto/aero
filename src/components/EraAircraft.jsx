/**
 * Top-down engineering schematic silhouettes.
 * All aircraft animate via pathLength so they "draw" on scroll entry.
 *
 * Usage: <EraAircraft era="Origins" animate={inView} color="var(--accent)" />
 */

import { motion } from 'framer-motion'

const DRAW = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: (delay = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.6, delay, ease: 'easeInOut' }, opacity: { duration: 0.3, delay } },
  }),
}

const DASH = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: (delay = 0) => ({
    pathLength: 1,
    opacity: 0.25,
    transition: { pathLength: { duration: 1.2, delay: delay + 0.3, ease: 'easeOut' }, opacity: { duration: 0.4, delay: delay + 0.3 } },
  }),
}

function Annotation({ x, y, label, anchor = 'start', delay = 0, animate }) {
  return (
    <motion.text
      x={x} y={y}
      textAnchor={anchor}
      fontFamily="'JetBrains Mono', monospace"
      fontSize="8"
      fill="currentColor"
      opacity={0}
      animate={animate ? { opacity: 0.35 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {label}
    </motion.text>
  )
}

// ─── Lockheed Vega (Origins) ─────────────────────────────────────────────────
// Top-down: high-wing monoplane, prop-driven, rounded fuselage
function Vega({ color, animate }) {
  return (
    <svg viewBox="0 0 320 360" fill="none" style={{ width: '100%', height: '100%', color }}>
      {/* Fuselage */}
      <motion.path
        d="M 160 18 C 172 18 182 45 182 160 C 182 280 172 348 160 360 C 148 348 138 280 138 160 C 138 45 148 18 160 18 Z"
        stroke="currentColor" strokeWidth="1.2"
        variants={DRAW} custom={0} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Left wing */}
      <motion.path
        d="M 138 148 L 22 172 L 22 188 L 138 166 Z"
        stroke="currentColor" strokeWidth="1.1"
        variants={DRAW} custom={0.3} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Right wing */}
      <motion.path
        d="M 182 148 L 298 172 L 298 188 L 182 166 Z"
        stroke="currentColor" strokeWidth="1.1"
        variants={DRAW} custom={0.3} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Left horizontal stabilizer */}
      <motion.path
        d="M 148 336 L 88 348 L 88 353 L 148 342 Z"
        stroke="currentColor" strokeWidth="0.9"
        variants={DRAW} custom={0.6} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Right horizontal stabilizer */}
      <motion.path
        d="M 172 336 L 232 348 L 232 353 L 172 342 Z"
        stroke="currentColor" strokeWidth="0.9"
        variants={DRAW} custom={0.6} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Propeller disc */}
      <motion.circle
        cx="160" cy="30" r="26"
        stroke="currentColor" strokeWidth="0.8"
        variants={DRAW} custom={0.8} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Prop blade */}
      <motion.line
        x1="134" y1="30" x2="186" y2="30"
        stroke="currentColor" strokeWidth="1.5"
        variants={DRAW} custom={0.85} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Centerline */}
      <motion.line
        x1="160" y1="18" x2="160" y2="356"
        stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 4"
        variants={DASH} custom={0} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Wingspan annotation */}
      <motion.line x1="22" y1="195" x2="298" y2="195" stroke="currentColor" strokeWidth="0.4"
        animate={animate ? { opacity: 0.2 } : { opacity: 0 }} transition={{ delay: 1.4 }} />
      <motion.line x1="22" y1="191" x2="22" y2="199" stroke="currentColor" strokeWidth="0.8"
        animate={animate ? { opacity: 0.2 } : { opacity: 0 }} transition={{ delay: 1.4 }} />
      <motion.line x1="298" y1="191" x2="298" y2="199" stroke="currentColor" strokeWidth="0.8"
        animate={animate ? { opacity: 0.2 } : { opacity: 0 }} transition={{ delay: 1.4 }} />
      <Annotation x={145} y={207} label="41 FT SPAN" anchor="middle" delay={1.5} animate={animate} />
    </svg>
  )
}

// ─── P-38 Lightning (Wartime) ────────────────────────────────────────────────
// Top-down: twin boom, twin engine, central nacelle
function P38({ color, animate }) {
  return (
    <svg viewBox="0 0 380 290" fill="none" style={{ width: '100%', height: '100%', color }}>
      {/* Main wing */}
      <motion.path
        d="M 38 118 C 38 96 105 80 190 80 C 275 80 342 96 342 118 L 342 152 C 342 174 275 184 190 184 C 105 184 38 174 38 152 Z"
        stroke="currentColor" strokeWidth="1.2"
        variants={DRAW} custom={0} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Left boom */}
      <motion.path
        d="M 90 178 L 78 268 L 116 268 L 124 178 Z"
        stroke="currentColor" strokeWidth="1.1"
        variants={DRAW} custom={0.25} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Right boom */}
      <motion.path
        d="M 256 178 L 264 268 L 302 268 L 290 178 Z"
        stroke="currentColor" strokeWidth="1.1"
        variants={DRAW} custom={0.25} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Connecting tail piece */}
      <motion.path
        d="M 78 260 L 302 260 L 302 272 L 78 272 Z"
        stroke="currentColor" strokeWidth="0.8"
        variants={DRAW} custom={0.5} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Left engine nacelle */}
      <motion.ellipse
        cx="104" cy="132" rx="22" ry="46"
        stroke="currentColor" strokeWidth="1.1"
        variants={DRAW} custom={0.2} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Right engine nacelle */}
      <motion.ellipse
        cx="276" cy="132" rx="22" ry="46"
        stroke="currentColor" strokeWidth="1.1"
        variants={DRAW} custom={0.2} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Central cockpit gondola */}
      <motion.ellipse
        cx="190" cy="132" rx="16" ry="38"
        stroke="currentColor" strokeWidth="1.1"
        variants={DRAW} custom={0.1} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Left prop disc */}
      <motion.circle cx="104" cy="88" r="20" stroke="currentColor" strokeWidth="0.7"
        variants={DRAW} custom={0.7} initial="hidden" animate={animate ? 'visible' : 'hidden'} />
      {/* Right prop disc */}
      <motion.circle cx="276" cy="88" r="20" stroke="currentColor" strokeWidth="0.7"
        variants={DRAW} custom={0.7} initial="hidden" animate={animate ? 'visible' : 'hidden'} />
      {/* Left vertical tail fins */}
      <motion.path d="M 78 222 L 60 268 L 78 268 Z" stroke="currentColor" strokeWidth="0.8"
        variants={DRAW} custom={0.55} initial="hidden" animate={animate ? 'visible' : 'hidden'} />
      {/* Right vertical tail fins */}
      <motion.path d="M 302 222 L 320 268 L 302 268 Z" stroke="currentColor" strokeWidth="0.8"
        variants={DRAW} custom={0.55} initial="hidden" animate={animate ? 'visible' : 'hidden'} />
      {/* Wingspan centerline */}
      <motion.line x1="190" y1="80" x2="190" y2="184" stroke="currentColor" strokeWidth="0.4" strokeDasharray="4 4"
        variants={DASH} custom={0} initial="hidden" animate={animate ? 'visible' : 'hidden'} />
      {/* Horizontal centerline */}
      <motion.line x1="38" y1="132" x2="342" y2="132" stroke="currentColor" strokeWidth="0.4" strokeDasharray="4 4"
        animate={animate ? { opacity: 0.2 } : { opacity: 0 }} transition={{ delay: 0.8 }} />
      <Annotation x={190} y={285} label="52 FT SPAN  //  TWIN ALLISON V-1710" anchor="middle" delay={1.4} animate={animate} />
    </svg>
  )
}

// ─── SR-71 Blackbird (Cold War) ──────────────────────────────────────────────
// Top-down: long needle, blended chines, delta wing, twin nacelles, twin tails
function SR71({ color, animate }) {
  return (
    <svg viewBox="0 0 380 360" fill="none" style={{ width: '100%', height: '100%', color }}>
      {/* Main body/wing silhouette */}
      <motion.path
        d="
          M 190 8
          L 202 62 L 215 98
          C 252 120, 320 168, 354 226
          L 244 278
          L 232 258 L 232 294 L 224 294 L 224 258
          L 204 284
          L 190 292
          L 176 284
          L 156 258 L 156 294 L 148 294 L 148 258
          L 136 278
          L 26 226
          C 60 168, 128 120, 165 98
          L 178 62
          Z
        "
        stroke="currentColor" strokeWidth="1.3"
        variants={DRAW} custom={0} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Left nacelle */}
      <motion.path
        d="M 74 210 C 68 192 76 172 90 172 C 104 172 114 192 108 210 C 102 228 80 228 74 210 Z"
        stroke="currentColor" strokeWidth="0.9"
        variants={DRAW} custom={0.5} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Right nacelle */}
      <motion.path
        d="M 272 210 C 266 192 274 172 288 172 C 302 172 312 192 306 210 C 300 228 278 228 272 210 Z"
        stroke="currentColor" strokeWidth="0.9"
        variants={DRAW} custom={0.5} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Centerline */}
      <motion.line x1="190" y1="8" x2="190" y2="296" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 4"
        variants={DASH} custom={0} initial="hidden" animate={animate ? 'visible' : 'hidden'} />
      {/* Nose spike detail */}
      <motion.circle cx="190" cy="14" r="3" fill="currentColor" opacity={0}
        animate={animate ? { opacity: 0.5 } : { opacity: 0 }} transition={{ delay: 1.8 }} />
      {/* Length annotation */}
      <motion.line x1="10" y1="320" x2="370" y2="320" stroke="currentColor" strokeWidth="0.4"
        animate={animate ? { opacity: 0.18 } : { opacity: 0 }} transition={{ delay: 1.6 }} />
      <motion.line x1="10" y1="315" x2="10" y2="325" stroke="currentColor" strokeWidth="0.8"
        animate={animate ? { opacity: 0.18 } : { opacity: 0 }} transition={{ delay: 1.6 }} />
      <motion.line x1="370" y1="315" x2="370" y2="325" stroke="currentColor" strokeWidth="0.8"
        animate={animate ? { opacity: 0.18 } : { opacity: 0 }} transition={{ delay: 1.6 }} />
      <Annotation x={190} y={340} label="107 FT LENGTH  //  2 × PRATT & WHITNEY J58" anchor="middle" delay={1.7} animate={animate} />
    </svg>
  )
}

// ─── F-117 Nighthawk (Stealth Era) ──────────────────────────────────────────
// Top-down: pure angular geometry, faceted diamond/arrowhead
function F117({ color, animate }) {
  return (
    <svg viewBox="0 0 380 310" fill="none" style={{ width: '100%', height: '100%', color }}>
      {/* Main silhouette — faceted arrowhead */}
      <motion.path
        d="
          M 190 10
          L 362 262
          L 226 278
          L 222 256 L 218 282 L 212 282 L 210 256
          L 190 288
          L 170 256 L 168 282 L 162 282 L 158 256
          L 154 278
          L 18 262
          Z
        "
        stroke="currentColor" strokeWidth="1.3"
        variants={DRAW} custom={0} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Facet panel lines — characteristic of stealth geometry */}
      <motion.line x1="190" y1="10" x2="190" y2="220" stroke="currentColor" strokeWidth="0.6"
        animate={animate ? { opacity: 0.3 } : { opacity: 0 }} transition={{ delay: 0.8, duration: 0.8 }} />
      <motion.line x1="190" y1="85" x2="362" y2="262" stroke="currentColor" strokeWidth="0.5"
        animate={animate ? { opacity: 0.18 } : { opacity: 0 }} transition={{ delay: 1.0 }} />
      <motion.line x1="190" y1="85" x2="18" y2="262" stroke="currentColor" strokeWidth="0.5"
        animate={animate ? { opacity: 0.18 } : { opacity: 0 }} transition={{ delay: 1.0 }} />
      <motion.line x1="150" y1="220" x2="230" y2="220" stroke="currentColor" strokeWidth="0.5"
        animate={animate ? { opacity: 0.2 } : { opacity: 0 }} transition={{ delay: 1.1 }} />
      {/* Engine inlet grilles (visible from above) */}
      <motion.rect x="168" y="110" width="48" height="58" rx="2"
        stroke="currentColor" strokeWidth="0.8"
        variants={DRAW} custom={0.7} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      <motion.line x1="192" y1="110" x2="192" y2="168" stroke="currentColor" strokeWidth="0.4"
        animate={animate ? { opacity: 0.25 } : { opacity: 0 }} transition={{ delay: 1.3 }} />
      {/* Centerline dashed */}
      <motion.line x1="190" y1="10" x2="190" y2="290" stroke="currentColor" strokeWidth="0.4" strokeDasharray="5 4"
        variants={DASH} custom={0} initial="hidden" animate={animate ? 'visible' : 'hidden'} />
      <Annotation x={190} y={305} label="43 FT SPAN  //  RCS ≈ 0.001 m²" anchor="middle" delay={1.6} animate={animate} />
    </svg>
  )
}

// ─── F-35 Lightning II (Modern Era) ─────────────────────────────────────────
// Top-down: blended delta, DSI intake, twin canted tails
function F35({ color, animate }) {
  return (
    <svg viewBox="0 0 380 340" fill="none" style={{ width: '100%', height: '100%', color }}>
      {/* Main blended body/wing silhouette */}
      <motion.path
        d="
          M 190 12
          C 200 12, 218 28, 224 65
          C 252 95, 306 140, 338 208
          L 276 270
          L 248 256
          L 238 250 L 234 278 L 226 278 L 224 250
          L 206 272
          L 190 282
          L 174 272
          L 156 250 L 154 278 L 146 278 L 142 250
          L 132 256
          L 104 270
          L 42 208
          C 74 140, 128 95, 156 65
          C 162 28, 180 12, 190 12
          Z
        "
        stroke="currentColor" strokeWidth="1.3"
        variants={DRAW} custom={0} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* DSI intake (diverterless supersonic intake — visible from above as bump) */}
      <motion.ellipse cx="190" cy="108" rx="26" ry="36"
        stroke="currentColor" strokeWidth="0.9"
        variants={DRAW} custom={0.4} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Intake detail lines */}
      <motion.line x1="164" y1="108" x2="216" y2="108" stroke="currentColor" strokeWidth="0.5"
        animate={animate ? { opacity: 0.3 } : { opacity: 0 }} transition={{ delay: 1.2 }} />
      {/* Weapons bay outlines */}
      <motion.rect x="170" y="155" width="40" height="60" rx="2"
        stroke="currentColor" strokeWidth="0.7"
        variants={DRAW} custom={0.6} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Engine exhaust nozzle */}
      <motion.ellipse cx="190" cy="268" rx="16" ry="10"
        stroke="currentColor" strokeWidth="0.8"
        variants={DRAW} custom={0.8} initial="hidden" animate={animate ? 'visible' : 'hidden'}
      />
      {/* Centerline */}
      <motion.line x1="190" y1="12" x2="190" y2="282" stroke="currentColor" strokeWidth="0.4" strokeDasharray="5 4"
        variants={DASH} custom={0} initial="hidden" animate={animate ? 'visible' : 'hidden'} />
      {/* Wingspan annotation */}
      <motion.line x1="42" y1="216" x2="338" y2="216" stroke="currentColor" strokeWidth="0.4"
        animate={animate ? { opacity: 0.18 } : { opacity: 0 }} transition={{ delay: 1.5 }} />
      <motion.line x1="42" y1="211" x2="42" y2="221" stroke="currentColor" strokeWidth="0.8"
        animate={animate ? { opacity: 0.18 } : { opacity: 0 }} transition={{ delay: 1.5 }} />
      <motion.line x1="338" y1="211" x2="338" y2="221" stroke="currentColor" strokeWidth="0.8"
        animate={animate ? { opacity: 0.18 } : { opacity: 0 }} transition={{ delay: 1.5 }} />
      <Annotation x={190} y={230} label="35 FT SPAN" anchor="middle" delay={1.6} animate={animate} />
      <Annotation x={190} y={320} label="F135 ENGINE  //  70,000 LBF THRUST" anchor="middle" delay={1.7} animate={animate} />
    </svg>
  )
}

// ─── Exports ─────────────────────────────────────────────────────────────────

const AIRCRAFT = {
  Origins:       Vega,
  Wartime:       P38,
  'Cold War':    SR71,
  'Stealth Era': F117,
  'Modern Era':  F35,
}

export default function EraAircraft({ era, animate, color = 'var(--accent)' }) {
  const Component = AIRCRAFT[era]
  if (!Component) return null
  return <Component color={color} animate={animate} />
}
