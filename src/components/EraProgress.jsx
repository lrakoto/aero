import { useUIStore } from '../store/uiStore'
import { ERA_DATA, eraId } from '../data/milestones'

export default function EraProgress() {
  const activeEra = useUIStore(state => state.activeEra)
  const section = useUIStore(state => state.activeSection)
  const entries = Object.entries(ERA_DATA)
  return <nav className={`chapter-nav ${section === 'intro' ? 'chapter-nav--intro' : ''}`} aria-label="Explore historical eras">
    <span className="chapter-nav__title">CHAPTERS</span>
    <ol>{entries.map(([name, data], index) => <li key={name}><a href={`#${eraId(name)}`} aria-current={activeEra === eraId(name) && section !== 'intro' ? 'location' : undefined}><span className="chapter-nav__index">0{index + 1}</span><span className="chapter-nav__name">{name === 'Stealth Era' ? 'Stealth' : name === 'Modern Era' ? 'Modern' : name}<small>{data.dateRange.split(' – ')[0]}</small></span><span className="chapter-nav__dot"/></a></li>)}</ol>
  </nav>
}
