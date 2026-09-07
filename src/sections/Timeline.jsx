import { useRef, useState } from 'react'
import { motion as Motion, useScroll, useSpring, useMotionValue, useInView } from 'framer-motion'
import { MILESTONES, ERA_DATA, CATEGORY_COLORS, eraId } from '../data/milestones'
import { AIRCRAFT_NOTES } from '../data/aircraft'
import { AIRCRAFT_GEOMETRY } from '../data/aircraftGeometry'
import EraAircraft from '../components/EraAircraft'

function MilestoneCard({ milestone }) {
  const ref = useRef(null)
  const [expanded, setExpanded] = useState(null)
  const active = useInView(ref, { margin: '-38% 0px -38% 0px' })
  const open = expanded ?? active
  const id = `record-${milestone.year}`
  const category = CATEGORY_COLORS[milestone.category]
  return <article id={id} ref={ref} className={`record-card record-card--original${active ? ' is-current' : ''}`} style={{ '--record-color': category.color, '--record-bg': category.bg }}>
    <span className="record-card__year">{milestone.year}</span>
    <div className="record-card__surface">
      <div className="record-card__original-header"><h3>{milestone.title}</h3><span className="record-card__category">{milestone.category}</span></div>
      <p>{milestone.description}</p>
      <button className="record-disclosure" onClick={() => setExpanded(!open)} aria-expanded={open} aria-controls={`${id}-detail`}><span aria-hidden="true">//</span> Field note <span aria-hidden="true">{open ? '−' : '+'}</span></button>
      <div id={`${id}-detail`} className="record-card__detail" hidden={!open}><p>{milestone.detail}</p><a href={milestone.source} target="_blank" rel="noreferrer">Historical reference <span aria-hidden="true">↗</span></a></div>
    </div>
  </article>
}

function AircraftStudy({ era, reduced }) {
  const ref = useRef(null)
  const [selected, setSelected] = useState(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'start 42%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24 })
  const complete = useMotionValue(1)
  const aircraft = AIRCRAFT_NOTES[era]
  const geometry = AIRCRAFT_GEOMETRY[era]
  const [, , width, height] = geometry.viewBox.split(' ').map(Number)
  const id = `${eraId(era)}-inspection`
  const note = selected === null ? null : aircraft.notes[selected]
  return <div className="aircraft-study" ref={ref}>
    <div className="aircraft-study__header"><span>TECHNICAL STUDY / {geometry.model}</span><span aria-hidden="true">+</span></div>
    <div className="aircraft-study__drawing"><div className="aircraft-study__plate" style={{ '--aircraft-ratio': width / height }}><EraAircraft era={era} drawProgress={reduced || selected !== null ? complete : progress} color="var(--chapter-accent)" selectedPart={note?.part}/>
      {aircraft.notes.map((item, index) => <button key={item.part} className={`inspection-point${selected === index ? ' is-selected' : ''}`} style={{ left: `${geometry.points[index][0] / width * 100}%`, top: `${geometry.points[index][1] / height * 100}%` }} aria-label={`Inspect ${item.label}`} aria-pressed={selected === index} aria-controls={id} onClick={() => setSelected(selected === index ? null : index)}>0{index + 1}</button>)}
    </div></div>
    <div className="inspection-controls" role="group" aria-label={`Inspect the ${aircraft.model}`}>{aircraft.notes.map((item, index) => <button key={item.part} onClick={() => setSelected(selected === index ? null : index)} aria-pressed={selected === index} aria-controls={id}><span>0{index + 1}</span>{item.label}<span aria-hidden="true">{selected === index ? '−' : '+'}</span></button>)}</div>
    <div id={id} className="inspection-note" aria-live="polite">{note ? <><strong>{note.label}</strong><p>{note.text}</p><a href={aircraft.source} target="_blank" rel="noreferrer">Explore the source ↗</a></> : <><span className="technical-label">ENGINEERING, UP CLOSE</span><p>Select a numbered point or a component below the drawing to explore what made this aircraft different.</p></>}</div>
    <div className="aircraft-study__footer"><span>TOP VIEW</span><span>{geometry.span}</span></div>
    <a className="aircraft-reference" href={geometry.reference} target="_blank" rel="noreferrer">Drawing reference · {geometry.credit} ↗</a>
  </div>
}

function EraChapter({ era, index, reduced }) {
  const data = ERA_DATA[era]
  const records = MILESTONES.filter(item => item.era === era)
  const accents = ['var(--accent)', '#eac395', 'var(--accent)', '#c6b4e7', '#a1d1be']
  const next = Object.keys(ERA_DATA)[index + 1]
  return <section id={eraId(era)} data-chapter className={`era-chapter era-chapter--open${index % 2 ? ' era-chapter--reverse' : ''}`} aria-labelledby={`${eraId(era)}-title`} style={{ '--chapter-accent': accents[index] }}>
    <div className="chapter-opening">
      <Motion.header className="chapter-opening__copy" initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .7 }}>
        <div className="chapter-opening__index">0{index + 1} // {era.toUpperCase()}</div>
        <div className="chapter-opening__dates">{data.dateRange}</div>
        <span className="technical-label">{data.aircraft}</span>
        <h2 id={`${eraId(era)}-title`}>{data.tagline}</h2>
        <p>{data.description}</p>
        <a className="chapter-record-count" href={`#${eraId(era)}-records`}>{records.length} HISTORICAL RECORDS <span aria-hidden="true">↓</span></a>
      </Motion.header>
      <AircraftStudy era={era} reduced={reduced}/>
    </div>
    <div className="chapter-timeline-surface">
      <div id={`${eraId(era)}-records`} className="chapter-records chapter-records--spine">
        {records.map(record => <MilestoneCard key={record.year} milestone={record}/>)}
      </div>
    </div>
    <div className="chapter-end"><span>END OF CHAPTER 0{index + 1}</span><a href={next ? `#${eraId(next)}` : '#intro'}>{next ? `Continue to ${next}` : 'Return to the beginning'} <span aria-hidden="true">{next ? '↓' : '↑'}</span></a></div>
  </section>
}

export default function Timeline({ reduced }) {
  return <div id="timeline" className="historical-record historical-record--open">{Object.keys(ERA_DATA).map((era, index) => <EraChapter key={era} era={era} index={index} reduced={reduced}/>)}<footer className="aero-footer"><a href="#intro">△ AERO</a><p>An independent record of aircraft and the ideas behind them.<br/>For educational use. Not affiliated with Lockheed Martin.</p><a href="#intro">BACK TO TOP ↑</a></footer></div>
}
