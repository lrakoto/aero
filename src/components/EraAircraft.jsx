import { motion as Motion, useTransform } from 'framer-motion'
import { AIRCRAFT_GEOMETRY } from '../data/aircraftGeometry'

export default function EraAircraft({ era, drawProgress, color = 'var(--accent)', selectedPart }) {
  const aircraft = AIRCRAFT_GEOMETRY[era]
  const details = useTransform(drawProgress, [.25, .95], [0, 1], { clamp: true })
  const opacity = useTransform(drawProgress, [0, .08], [0, 1], { clamp: true })
  if (!aircraft) return null
  return <div className={`era-aircraft-schematic${selectedPart ? ' is-inspecting' : ''}`} data-inspection={selectedPart} aria-hidden="true">
    <svg viewBox={aircraft.viewBox} fill="none" style={{ width: '100%', height: '100%', color }}>
      {aircraft.paths.map((path, index) => <Motion.path key={index} data-part={path.name} d={path.d} transform={aircraft.transform}
        stroke="currentColor" strokeWidth={path.detail ? .65 : 1.2} vectorEffect="non-scaling-stroke"
        strokeLinejoin="round" strokeLinecap="round"
        style={{ pathLength: path.detail ? details : drawProgress, opacity }}/>) }
    </svg>
  </div>
}
