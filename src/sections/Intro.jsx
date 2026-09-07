import { motion as Motion } from 'framer-motion'
import { MILESTONES, ERAS } from '../data/milestones'

export default function Intro({ reduced = false }) {
  return (
    <section id="intro" data-chapter className="intro-section section scanlines" aria-labelledby="intro-title">
      <div className="intro-registration"><span>AERO / HISTORICAL RECORD</span><span>1912 — PRESENT</span></div>
      <div className="intro-content">
        <div className="intro-eyebrow"><span/> A LEGACY WRITTEN IN FLIGHT</div>
        <h1 id="intro-title" className="hero-title" aria-label="A Century of Engineering.">
          <span className="hero-title-mask" aria-hidden="true">
            <Motion.span className="hero-title-line"
              initial={reduced ? false : { clipPath: 'inset(0 100% 0 0)', filter: 'blur(2px)', letterSpacing: '.015em' }}
              animate={{ clipPath: 'inset(0 0% 0 0)', filter: 'blur(0px)', letterSpacing: '-.035em' }}
              transition={{ duration: reduced ? 0 : 1.8, delay: reduced ? 0 : .35, ease: [.55, 0, .22, 1] }}>
              A Century of
            </Motion.span>
          </span>
          <span className="hero-title-mask hero-title-mask--engineering" aria-hidden="true">
            <Motion.span className="hero-title-line hero-engineering"
              initial={reduced ? false : { clipPath: 'inset(0 100% 0 0)', filter: 'blur(1.5px)', letterSpacing: '.018em' }}
              animate={{ clipPath: 'inset(0 0% 0 0)', filter: 'blur(0px)', letterSpacing: '-.035em' }}
              transition={{ duration: reduced ? 0 : 2.7, delay: reduced ? 0 : .68, ease: [.48, .02, .2, 1] }}>
              Engineering.
              <span className="hero-engineering-sheen">Engineering.</span>
            </Motion.span>
          </span>
        </h1>
        <p className="intro-description">From wooden airframes to the edge of space. Explore the aircraft, ideas, and defining moments that shaped Lockheed’s history.</p>
        <div className="intro-actions"><a className="aero-button aero-button--primary" href="#era-origins">Begin the record <span aria-hidden="true">↓</span></a><a className="aero-button aero-button--quiet" href="#era-cold-war">Discover the Blackbird <span aria-hidden="true">↗</span></a></div>
      </div>
      <dl className="intro-facts">{[{value:'1912', label:'The first chapter'}, {value:String(MILESTONES.length).padStart(2,'0'),label:'Defining milestones'}, {value:String(ERAS.length).padStart(2,'0'),label:'Eras of innovation'}, {value:'1943',label:'Skunk Works founded'}].map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
      <div className="intro-footer"><span>INDEPENDENT EDUCATIONAL EXHIBITION</span><a href="#era-origins">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div>
    </section>
  )
}
