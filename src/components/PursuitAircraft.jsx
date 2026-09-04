import { useEffect, useRef } from 'react'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const TRAIL_POINTS = 68

function shortestAngle(from, to) {
  let delta = to - from
  while (delta > 180) delta -= 360
  while (delta < -180) delta += 360
  return delta
}

export default function PursuitAircraft() {
  const aircraftRef = useRef(null)
  const modelRef = useRef(null)
  const trailGlowRefs = useRef([])
  const trailCoreRefs = useRef([])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(pointer: fine)')
    if (reducedMotion.matches || !finePointer.matches) return undefined

    const aircraft = aircraftRef.current
    const model = modelRef.current
    if (!aircraft || !model) return undefined

    const target = { x: window.innerWidth * 0.68, y: window.innerHeight * 0.38 }
    const position = { x: window.innerWidth * 0.25, y: window.innerHeight * 0.72 }
    const velocity = { x: 82, y: -54 }
    const trail = []
    let heading = Math.atan2(velocity.y, velocity.x) * 180 / Math.PI + 90
    let previousTime = performance.now()
    let previousTrailTime = 0
    let holdingPhase = Math.PI * 0.25
    let frameId
    let active = true

    const onPointerMove = ({ clientX, clientY }) => {
      target.x = clientX
      target.y = clientY
    }

    const onResize = () => {
      target.x = clamp(target.x, 0, window.innerWidth)
      target.y = clamp(target.y, 0, window.innerHeight)
    }

    const render = (now) => {
      if (!active) return

      const dt = Math.min((now - previousTime) / 1000, 0.034)
      previousTime = now

      const toCursorX = target.x - position.x
      const toCursorY = target.y - position.y
      const distance = Math.hypot(toCursorX, toCursorY)
      const arrivalBlend = 1 - clamp((distance - 72) / 170, 0, 1)
      holdingPhase += dt * (0.78 + arrivalBlend * 0.52)
      const pursuitWeave = Math.min(distance * 0.1, 54)
      const interceptX = target.x
        + Math.cos(holdingPhase) * (pursuitWeave * (1 - arrivalBlend) + 82 * arrivalBlend)
      const interceptY = target.y
        + Math.sin(holdingPhase) * (pursuitWeave * 0.5 * (1 - arrivalBlend) + 52 * arrivalBlend)
      const desiredX = interceptX - position.x
      const desiredY = interceptY - position.y
      const desiredLength = Math.max(Math.hypot(desiredX, desiredY), 0.001)
      const desiredSpeed = clamp(distance * 0.68, 104, 198)
      const desiredVelocityX = desiredX / desiredLength * desiredSpeed
      const desiredVelocityY = desiredY / desiredLength * desiredSpeed
      const steering = 1 - Math.exp(-2.15 * dt)

      velocity.x += (desiredVelocityX - velocity.x) * steering
      velocity.y += (desiredVelocityY - velocity.y) * steering
      position.x += velocity.x * dt
      position.y += velocity.y * dt

      const desiredHeading = Math.atan2(velocity.y, velocity.x) * 180 / Math.PI + 90
      const turn = shortestAngle(heading, desiredHeading)
      heading += turn * (1 - Math.exp(-7 * dt))
      heading = (heading + 540) % 360 - 180
      const bank = clamp(turn * 1.55, -48, 48)
      const pitch = clamp(-velocity.y * 0.055, -13, 13)
      const speed = Math.hypot(velocity.x, velocity.y)

      aircraft.style.opacity = '1'
      aircraft.style.transform = `translate3d(${position.x - 22}px, ${position.y - 25}px, 0) rotate(${heading}deg)`
      model.style.transform = `perspective(140px) rotateY(${bank}deg) rotateX(${pitch}deg) scale(${0.9 + speed / 1600})`
      model.style.setProperty('--flight-speed', `${clamp(speed / 145, 0.6, 1.35)}`)

      if (now - previousTrailTime > 34) {
        trail.push({ x: position.x, y: position.y })
        if (trail.length > TRAIL_POINTS) trail.shift()
        previousTrailTime = now

        for (let index = 0; index < TRAIL_POINTS - 1; index += 1) {
          const glow = trailGlowRefs.current[index]
          const core = trailCoreRefs.current[index]
          const start = trail[index]
          const end = trail[index + 1]

          if (!glow || !core) continue
          if (!start || !end) {
            glow.style.opacity = '0'
            core.style.opacity = '0'
            continue
          }

          const progress = (index + 1) / Math.max(trail.length - 1, 1)
          const fade = progress * progress
          const width = 0.35 + Math.pow(progress, 1.45) * 2.65
          for (const segment of [glow, core]) {
            segment.setAttribute('x1', start.x.toFixed(1))
            segment.setAttribute('y1', start.y.toFixed(1))
            segment.setAttribute('x2', end.x.toFixed(1))
            segment.setAttribute('y2', end.y.toFixed(1))
          }
          glow.style.opacity = `${fade * 0.16}`
          glow.style.strokeWidth = `${width * 4.4}`
          core.style.opacity = `${fade * 0.72}`
          core.style.strokeWidth = `${width}`
        }
      }

      frameId = requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', onResize)
    frameId = requestAnimationFrame(render)

    return () => {
      active = false
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="pursuit-flight" aria-hidden="true">
      <svg className="pursuit-trail" width="100%" height="100%">
        <g className="pursuit-trail__glow">
          {Array.from({ length: TRAIL_POINTS - 1 }, (_, index) => (
            <line key={index} ref={(node) => { trailGlowRefs.current[index] = node }} />
          ))}
        </g>
        <g className="pursuit-trail__core">
          {Array.from({ length: TRAIL_POINTS - 1 }, (_, index) => (
            <line key={index} ref={(node) => { trailCoreRefs.current[index] = node }} />
          ))}
        </g>
      </svg>

      <div ref={aircraftRef} className="pursuit-aircraft">
        <svg
          ref={modelRef}
          className="pursuit-aircraft__model"
          viewBox="-26 -29 52 62"
          width="44"
          height="52"
          fill="none"
        >
          <path
            className="pursuit-aircraft__silhouette"
            d="M 0 -27 C 2 -23 4 -15 5 -6 L 23 11 L 22 16 L 6 11 L 5 21 L 11 28 L 9 30 L 0 25 L -9 30 L -11 28 L -5 21 L -6 11 L -22 16 L -23 11 L -5 -6 C -4 -15 -2 -23 0 -27 Z"
          />
          <path className="pursuit-aircraft__spine" d="M 0 -24 L 0 23 M -19 12 L 19 12 M -7 27 L 7 27" />
          <path className="pursuit-aircraft__cockpit" d="M 0 -16 C 3 -12 3 -5 0 0 C -3 -5 -3 -12 0 -16 Z" />
          <path className="pursuit-aircraft__facet" d="M -5 -5 L 0 3 L 5 -5 M -18 12 L -4 8 M 18 12 L 4 8" />
          <g className="pursuit-aircraft__thruster">
            <path d="M -3 24 Q 0 36 3 24 Z" />
            <circle cx="0" cy="25" r="2.2" />
          </g>
        </svg>
      </div>
    </div>
  )
}
