/**
 * Top-down schematic silhouettes.
 * drawProgress: MotionValue 0→1 — drives pathLength directly (scroll-mapped).
 * Each aircraft staggers its element groups by mapping drawProgress sub-ranges.
 */

import { motion, useTransform } from 'framer-motion'

// ─── Lockheed Vega (Origins) ──────────────────────────────────────────────────
function Vega({ color, drawProgress }) {
  const wings   = useTransform(drawProgress, [0.12, 0.72], [0, 1], { clamp: true })
  const stabs   = useTransform(drawProgress, [0.30, 0.85], [0, 1], { clamp: true })
  const details = useTransform(drawProgress, [0.50, 0.95], [0, 1], { clamp: true })
  const baseOp  = useTransform(drawProgress, [0,    0.08], [0, 1])
  const annotOp = useTransform(drawProgress, [0.65, 0.88], [0, 0.35])

  return (
    <svg viewBox="0 0 320 360" fill="none" style={{ width: '100%', height: '100%', color }}>
      {/* Fuselage */}
      <motion.path
        d="M 160 18 C 172 18 182 45 182 160 C 182 280 172 348 160 360 C 148 348 138 280 138 160 C 138 45 148 18 160 18 Z"
        stroke="currentColor" strokeWidth="1.2"
        style={{ pathLength: drawProgress, opacity: baseOp }}
      />
      {/* Left wing */}
      <motion.path
        d="M 138 148 L 22 172 L 22 188 L 138 166 Z"
        stroke="currentColor" strokeWidth="1.1"
        style={{ pathLength: wings, opacity: baseOp }}
      />
      {/* Right wing */}
      <motion.path
        d="M 182 148 L 298 172 L 298 188 L 182 166 Z"
        stroke="currentColor" strokeWidth="1.1"
        style={{ pathLength: wings, opacity: baseOp }}
      />
      {/* Left horizontal stab */}
      <motion.path
        d="M 148 336 L 88 348 L 88 353 L 148 342 Z"
        stroke="currentColor" strokeWidth="0.9"
        style={{ pathLength: stabs, opacity: baseOp }}
      />
      {/* Right horizontal stab */}
      <motion.path
        d="M 172 336 L 232 348 L 232 353 L 172 342 Z"
        stroke="currentColor" strokeWidth="0.9"
        style={{ pathLength: stabs, opacity: baseOp }}
      />
      {/* Prop disc */}
      <motion.circle cx="160" cy="30" r="26" stroke="currentColor" strokeWidth="0.8"
        style={{ pathLength: details, opacity: baseOp }} />
      <motion.line x1="134" y1="30" x2="186" y2="30" stroke="currentColor" strokeWidth="1.5"
        style={{ pathLength: details, opacity: baseOp }} />
      {/* Centerline */}
      <motion.line x1="160" y1="18" x2="160" y2="356"
        stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 4"
        style={{ pathLength: stabs, opacity: useTransform(drawProgress, [0.3, 0.5], [0, 0.22]) }} />
      {/* Wingspan annotation */}
      <motion.line x1="22" y1="196" x2="298" y2="196" stroke="currentColor" strokeWidth="0.4"
        style={{ opacity: annotOp }} />
      <motion.line x1="22" y1="192" x2="22" y2="200" stroke="currentColor" strokeWidth="0.8"
        style={{ opacity: annotOp }} />
      <motion.line x1="298" y1="192" x2="298" y2="200" stroke="currentColor" strokeWidth="0.8"
        style={{ opacity: annotOp }} />
      <motion.text x="160" y="210" textAnchor="middle"
        fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="currentColor"
        style={{ opacity: annotOp }}>
        41 FT SPAN
      </motion.text>
    </svg>
  )
}

// ─── P-38 Lightning (Wartime) ─────────────────────────────────────────────────
function P38({ color, drawProgress }) {
  const wing    = useTransform(drawProgress, [0,    0.55], [0, 1], { clamp: true })
  const booms   = useTransform(drawProgress, [0.18, 0.72], [0, 1], { clamp: true })
  const details = useTransform(drawProgress, [0.40, 0.92], [0, 1], { clamp: true })
  const baseOp  = useTransform(drawProgress, [0,    0.08], [0, 1])
  const annotOp = useTransform(drawProgress, [0.70, 0.90], [0, 0.35])

  return (
    <svg viewBox="0 0 380 290" fill="none" style={{ width: '100%', height: '100%', color }}>
      <motion.path
        d="M 38 118 C 38 96 105 80 190 80 C 275 80 342 96 342 118 L 342 152 C 342 174 275 184 190 184 C 105 184 38 174 38 152 Z"
        stroke="currentColor" strokeWidth="1.2" style={{ pathLength: wing, opacity: baseOp }} />
      <motion.path d="M 90 178 L 78 268 L 116 268 L 124 178 Z"
        stroke="currentColor" strokeWidth="1.1" style={{ pathLength: booms, opacity: baseOp }} />
      <motion.path d="M 256 178 L 264 268 L 302 268 L 290 178 Z"
        stroke="currentColor" strokeWidth="1.1" style={{ pathLength: booms, opacity: baseOp }} />
      <motion.path d="M 78 260 L 302 260 L 302 272 L 78 272 Z"
        stroke="currentColor" strokeWidth="0.8" style={{ pathLength: booms, opacity: baseOp }} />
      <motion.ellipse cx="104" cy="132" rx="22" ry="46"
        stroke="currentColor" strokeWidth="1.1" style={{ pathLength: wing, opacity: baseOp }} />
      <motion.ellipse cx="276" cy="132" rx="22" ry="46"
        stroke="currentColor" strokeWidth="1.1" style={{ pathLength: wing, opacity: baseOp }} />
      <motion.ellipse cx="190" cy="132" rx="16" ry="38"
        stroke="currentColor" strokeWidth="1.1" style={{ pathLength: wing, opacity: baseOp }} />
      <motion.circle cx="104" cy="88" r="20" stroke="currentColor" strokeWidth="0.7"
        style={{ pathLength: details, opacity: baseOp }} />
      <motion.circle cx="276" cy="88" r="20" stroke="currentColor" strokeWidth="0.7"
        style={{ pathLength: details, opacity: baseOp }} />
      <motion.path d="M 78 222 L 60 268 L 78 268 Z"
        stroke="currentColor" strokeWidth="0.8" style={{ pathLength: details, opacity: baseOp }} />
      <motion.path d="M 302 222 L 320 268 L 302 268 Z"
        stroke="currentColor" strokeWidth="0.8" style={{ pathLength: details, opacity: baseOp }} />
      <motion.line x1="190" y1="80" x2="190" y2="184"
        stroke="currentColor" strokeWidth="0.4" strokeDasharray="4 4"
        style={{ pathLength: booms, opacity: useTransform(drawProgress, [0.2, 0.35], [0, 0.2]) }} />
      <motion.text x="190" y="283" textAnchor="middle"
        fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="currentColor"
        style={{ opacity: annotOp }}>
        52 FT SPAN  //  TWIN ALLISON V-1710
      </motion.text>
    </svg>
  )
}

// ─── SR-71 Blackbird (Cold War) ───────────────────────────────────────────────
function SR71({ color, drawProgress }) {
  const nacelles = useTransform(drawProgress, [0.35, 0.80], [0, 1], { clamp: true })
  const baseOp   = useTransform(drawProgress, [0,    0.08], [0, 1])
  const annotOp  = useTransform(drawProgress, [0.68, 0.90], [0, 0.35])

  return (
    <svg viewBox="0 0 380 360" fill="none" style={{ width: '100%', height: '100%', color }}>
      <motion.path
        d="M 190 8 L 202 62 L 215 98 C 252 120 320 168 354 226 L 244 278
           L 232 258 L 232 294 L 224 294 L 224 258 L 204 284 L 190 292
           L 176 284 L 156 258 L 156 294 L 148 294 L 148 258 L 136 278
           L 26 226 C 60 168 128 120 165 98 L 178 62 Z"
        stroke="currentColor" strokeWidth="1.3"
        style={{ pathLength: drawProgress, opacity: baseOp }}
      />
      <motion.path
        d="M 74 210 C 68 192 76 172 90 172 C 104 172 114 192 108 210 C 102 228 80 228 74 210 Z"
        stroke="currentColor" strokeWidth="0.9"
        style={{ pathLength: nacelles, opacity: baseOp }}
      />
      <motion.path
        d="M 272 210 C 266 192 274 172 288 172 C 302 172 312 192 306 210 C 300 228 278 228 272 210 Z"
        stroke="currentColor" strokeWidth="0.9"
        style={{ pathLength: nacelles, opacity: baseOp }}
      />
      <motion.line x1="190" y1="8" x2="190" y2="296"
        stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 4"
        style={{ pathLength: nacelles, opacity: useTransform(drawProgress, [0.35, 0.5], [0, 0.22]) }} />
      <motion.circle cx="190" cy="14" r="3" fill="currentColor"
        style={{ opacity: useTransform(drawProgress, [0.75, 0.9], [0, 0.5]) }} />
      <motion.line x1="10" y1="320" x2="370" y2="320" stroke="currentColor" strokeWidth="0.4"
        style={{ opacity: annotOp }} />
      <motion.line x1="10" y1="315" x2="10" y2="325" stroke="currentColor" strokeWidth="0.8"
        style={{ opacity: annotOp }} />
      <motion.line x1="370" y1="315" x2="370" y2="325" stroke="currentColor" strokeWidth="0.8"
        style={{ opacity: annotOp }} />
      <motion.text x="190" y="340" textAnchor="middle"
        fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="currentColor"
        style={{ opacity: annotOp }}>
        107 FT LENGTH  //  2 × PRATT &amp; WHITNEY J58
      </motion.text>
    </svg>
  )
}

// ─── F-117 Nighthawk (Stealth Era) ────────────────────────────────────────────
function F117({ color, drawProgress }) {
  const facets  = useTransform(drawProgress, [0.20, 0.75], [0, 1], { clamp: true })
  const baseOp  = useTransform(drawProgress, [0,    0.08], [0, 1])
  const annotOp = useTransform(drawProgress, [0.65, 0.88], [0, 0.35])

  return (
    <svg viewBox="0 0 380 310" fill="none" style={{ width: '100%', height: '100%', color }}>
      <motion.path
        d="M 190 10 L 362 262 L 226 278
           L 222 256 L 218 282 L 212 282 L 210 256
           L 190 288 L 170 256 L 168 282 L 162 282 L 158 256
           L 154 278 L 18 262 Z"
        stroke="currentColor" strokeWidth="1.3"
        style={{ pathLength: drawProgress, opacity: baseOp }}
      />
      {/* Facet panel lines */}
      <motion.line x1="190" y1="10" x2="190" y2="220"
        stroke="currentColor" strokeWidth="0.6"
        style={{ pathLength: facets, opacity: useTransform(drawProgress, [0.2, 0.4], [0, 0.28]) }} />
      <motion.line x1="190" y1="85" x2="362" y2="262"
        stroke="currentColor" strokeWidth="0.5"
        style={{ pathLength: facets, opacity: useTransform(drawProgress, [0.25, 0.45], [0, 0.18]) }} />
      <motion.line x1="190" y1="85" x2="18" y2="262"
        stroke="currentColor" strokeWidth="0.5"
        style={{ pathLength: facets, opacity: useTransform(drawProgress, [0.25, 0.45], [0, 0.18]) }} />
      <motion.line x1="150" y1="220" x2="230" y2="220"
        stroke="currentColor" strokeWidth="0.5"
        style={{ pathLength: facets, opacity: useTransform(drawProgress, [0.3, 0.5], [0, 0.20]) }} />
      {/* Engine inlets */}
      <motion.rect x="168" y="110" width="48" height="58" rx="2"
        stroke="currentColor" strokeWidth="0.8"
        style={{ pathLength: facets, opacity: baseOp }} />
      <motion.line x1="192" y1="110" x2="192" y2="168"
        stroke="currentColor" strokeWidth="0.4"
        style={{ opacity: useTransform(drawProgress, [0.45, 0.6], [0, 0.25]) }} />
      {/* Centerline */}
      <motion.line x1="190" y1="10" x2="190" y2="290"
        stroke="currentColor" strokeWidth="0.4" strokeDasharray="5 4"
        style={{ pathLength: facets, opacity: useTransform(drawProgress, [0.2, 0.35], [0, 0.22]) }} />
      <motion.text x="190" y="305" textAnchor="middle"
        fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="currentColor"
        style={{ opacity: annotOp }}>
        43 FT SPAN  //  RCS ≈ 0.001 m²
      </motion.text>
    </svg>
  )
}

// ─── F-35 Lightning II (Modern Era) ──────────────────────────────────────────
function F35({ color, drawProgress }) {
  const details = useTransform(drawProgress, [0.25, 0.80], [0, 1], { clamp: true })
  const baseOp  = useTransform(drawProgress, [0,    0.08], [0, 1])
  const annotOp = useTransform(drawProgress, [0.65, 0.88], [0, 0.35])

  return (
    <svg viewBox="0 0 380 340" fill="none" style={{ width: '100%', height: '100%', color }}>
      <motion.path
        d="M 190 12 C 200 12 218 28 224 65 C 252 95 306 140 338 208
           L 276 270 L 248 256 L 238 250 L 234 278 L 226 278 L 224 250
           L 206 272 L 190 282 L 174 272 L 156 250 L 154 278 L 146 278 L 142 250
           L 132 256 L 104 270 L 42 208
           C 74 140 128 95 156 65 C 162 28 180 12 190 12 Z"
        stroke="currentColor" strokeWidth="1.3"
        style={{ pathLength: drawProgress, opacity: baseOp }}
      />
      {/* DSI intake */}
      <motion.ellipse cx="190" cy="108" rx="26" ry="36"
        stroke="currentColor" strokeWidth="0.9"
        style={{ pathLength: details, opacity: baseOp }} />
      <motion.line x1="164" y1="108" x2="216" y2="108"
        stroke="currentColor" strokeWidth="0.5"
        style={{ opacity: useTransform(drawProgress, [0.35, 0.5], [0, 0.28]) }} />
      {/* Weapons bay */}
      <motion.rect x="170" y="155" width="40" height="60" rx="2"
        stroke="currentColor" strokeWidth="0.7"
        style={{ pathLength: details, opacity: baseOp }} />
      {/* Exhaust nozzle */}
      <motion.ellipse cx="190" cy="268" rx="16" ry="10"
        stroke="currentColor" strokeWidth="0.8"
        style={{ pathLength: details, opacity: baseOp }} />
      {/* Centerline */}
      <motion.line x1="190" y1="12" x2="190" y2="282"
        stroke="currentColor" strokeWidth="0.4" strokeDasharray="5 4"
        style={{ pathLength: details, opacity: useTransform(drawProgress, [0.25, 0.4], [0, 0.22]) }} />
      {/* Wingspan annotation */}
      <motion.line x1="42" y1="216" x2="338" y2="216"
        stroke="currentColor" strokeWidth="0.4" style={{ opacity: annotOp }} />
      <motion.line x1="42" y1="211" x2="42" y2="221"
        stroke="currentColor" strokeWidth="0.8" style={{ opacity: annotOp }} />
      <motion.line x1="338" y1="211" x2="338" y2="221"
        stroke="currentColor" strokeWidth="0.8" style={{ opacity: annotOp }} />
      <motion.text x="190" y="228" textAnchor="middle"
        fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="currentColor"
        style={{ opacity: annotOp }}>
        35 FT SPAN
      </motion.text>
      <motion.text x="190" y="320" textAnchor="middle"
        fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="currentColor"
        style={{ opacity: annotOp }}>
        F135 ENGINE  //  70,000 LBF THRUST
      </motion.text>
    </svg>
  )
}

// ─── Exports ──────────────────────────────────────────────────────────────────
const AIRCRAFT = {
  'Origins':     Vega,
  'Wartime':     P38,
  'Cold War':    SR71,
  'Stealth Era': F117,
  'Modern Era':  F35,
}

export default function EraAircraft({ era, drawProgress, color = 'var(--accent)' }) {
  const Component = AIRCRAFT[era]
  if (!Component) return null
  return <Component drawProgress={drawProgress} color={color} />
}
